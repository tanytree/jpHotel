import store from '@/store'
import axios from 'axios'
import { request } from '@/utils/request'
import merge from 'lodash/merge'

// eslint-disable-next-line no-unused-vars
var publicDict = {}
const uploadUrl = 'http://39.104.116.153:8887'
const platSource = '1005'
// eslint-disable-next-line no-unused-vars
var tabsName = {}
const languageObject = {
    'ri': '日本语',
    'zh': '中文'
}
const HQCODE = '0000000000'  //总部账号定义
var NATIONALITYLIST = []  //国籍列表
const $F = {
    translate (zh, ri) {
       return sessionStorage.locale == 'zh' ? zh : ri;
    },

    //获取总部后台的代码code
    getHQCode () {
        return HQCODE
    },
    getLangDesc (langKey) {
        return languageObject[langKey]
    },

    getUploadUrl () {
        return uploadUrl
    },

    deepClone (obj, copyObject) {
        if (copyObject) {
            for (let i in obj) {
                copyObject[i] = obj[i];
            }
        } else {
            let newObject = obj.constructor === Array ? [] : {}
            if (typeof obj !== 'object') {
                return
            } else if (window.JSON) {
                newObject = JSON.parse(JSON.stringify(obj)) // 还原
            } else {
                for (let i in obj) {
                    newObject[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i]
                }
            }
            return newObject
        }

    },

    doUploadBatch ($instance, imgList = [], callback) {
        let formData = new FormData();
        let newImageList = [];
        imgList.forEach((file) => {
            if (file.raw && file.raw.name)
                formData.append('files', file.raw, file.raw.name);
            else
                newImageList.push(file.url);
        })
        debugger
        if (newImageList.length == imgList.length) {
            callback(newImageList.join(','))
            return;
        }
        formData.append('imgModel', '2')
        formData.append('platSource', platSource)
        if ($instance) {
            $instance.dataListLoading = true
            $instance.loading = true
        }
        axios.post(uploadUrl + '/pms/upload/batch_upload_img', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => {
            if (res.data.code === 200) {
                let array = newImageList.concat(res.data.data.split(','));
                callback(array.join(','))
            } else {
                if ($instance) {
                    $instance.$message.error(res.message || res.data.message)
                }
            }
        })
    },

    doRequest ($instance, url, params = {}, callback) {
        if ($instance) {
            $instance.dataListLoading = true
            $instance.loading = true
        }
        params = this.deepClone(params);
        for (let key in params) {
            let value = params[key];
            if ((value === '' || value === null || value === undefined || value == 'undefined' || value == 'null') && key != 'storesNum') {
                delete params[key];
            }
        }
        request(url, params).then((res) => {
            if ($instance) {
                $instance.dataListLoading = false
                $instance.loading = false
            }
            if (res.code === 200) {
                callback(res.data)
            } else {
                if ($instance) {
                    $instance.$message.error(res.message || res.data.message)
                }
            }
        })
    },

    merge (origin = {}, params = {}) {
        merge(origin, params)
    },

    beforeUpload ($instance, file, size = 2) {
        const fileType = file.type
        const isImage = fileType.indexOf('image') != -1
        const isLt2M = file.size / 1024 / 1024 < size
        if (!isImage) {
            $instance.$message.error('只能上传图片格式png、jpg、gif!')
        }
        if (!isLt2M) {
            $instance.$message.error('只能上传图片大小小于2M')
        }
        return isImage && isLt2M
    },

    getPublicDictByType ($instance, type, callback, forceRefresh) {
        var data = publicDict[type]
        if (data && !forceRefresh) {
            data.forEach((dict) => {
                dict.name = sessionStorage.locale == 'ri' ? dict.japanese : dict.name
            })
            callback(data)
            return
        }
        let url = '/pms/system/public_dict'
        this.doRequest($instance, url, { type: type }, (data) => {
            if (data && data.length > 0) {
                data.forEach((dict) => {
                    dict.name = sessionStorage.locale == 'ri' ? dict.japanese : dict.name
                })
            }
            callback(data || [])
        })
    },

    formatJsonNumberToString(object) {
        for(var p in object){//遍历json对象的每个key/value对,p为key
            if (object[p] && typeof(object[p] == 'number')) {
                object[p] = object[p] + '';
            }
        }
    },

    parseObjectBykey (object, key) {
        if (object[key] && typeof (object[key]) === 'string') {
            object[key] = JSON.parse(object[key])
        }
    },
    filterThirdMenu: function (firstLevelMenuName, thirdMenuPath, showFlag, fetchFirstThird) {
        if (sessionStorage.subMenul) {
            let thirdMenuList = JSON.parse(sessionStorage.subMenul).childList || []
            if (thirdMenuList.length > 0) {
                if (fetchFirstThird) {
                    return thirdMenuList[0]
                }
                if (tabsName[firstLevelMenuName] && tabsName[firstLevelMenuName][thirdMenuPath]) {
                    return showFlag ? tabsName[firstLevelMenuName][thirdMenuPath].path : tabsName[firstLevelMenuName][thirdMenuPath]
                }
                let menul = thirdMenuList.filter((menul) => {
                    menul.thirdMenu = sessionStorage.locale == 'ri' ? menul.japanese : (menul.menuAliasTitle || menul.menuTitle)
                    return menul.path == thirdMenuPath
                })
                tabsName[firstLevelMenuName] = tabsName[firstLevelMenuName] || {}
                tabsName[firstLevelMenuName][thirdMenuPath] = menul[0] || {}
                if (showFlag) {
                    return menul.length > 0
                } else {
                    return tabsName[firstLevelMenuName][thirdMenuPath]
                }
            }
        }
        return null
    },

    //获取三级菜单 并默认设置当前tab值
    handleThirdMenu($instance) {
        if (sessionStorage.subMenul) {
            $instance.menuList = JSON.parse(sessionStorage.subMenul).childList || []
            $instance.$forceUpdate()
        }
        $instance.activeName = this.filterThirdMenu(null, null, false, true).path;
    },

    //
    formatDate(fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    // 一些多个页面都会用到的方法 统一写到commons里面
    commons: {

        //获取会员类型列表 这里封装统一方法 很多地方用到
        fetchMemberTypeList (requestParams = {}, callback) {
            let params = {
                name: '',
                pageIndex: 1,
                pageSize: 10,
                paging: false,
                id: ''
            }
            merge(params, requestParams)
            $F.doRequest(null, '/pms/membertype/list', params, (data) => {
                callback(data)
            })
        },
        //获取国籍list
        fetchNationality (callback) {
            if (NATIONALITYLIST.length > 0) {
                callback(NATIONALITYLIST)
                return;
            }
            $F.doRequest(null, '/pms/system/country_list', {}, (data) => {
                NATIONALITYLIST = data;
                callback(NATIONALITYLIST)
            })
        }
    }

}
export default $F
