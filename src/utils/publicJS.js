import store from '@/store'
import axios from 'axios'
import { request } from '@/utils/request'
import merge from 'lodash/merge'

// eslint-disable-next-line no-unused-vars
var publicDict = {}
const uploadUrl = 'http://115.29.143.91:8887'
const platSource = '1005'
// eslint-disable-next-line no-unused-vars
var tabsName = {}
const languageObject = {
    'ri': '日本語',
    'zh': '中文'
}
const HQCODE = '0000000000'  //总部账号定义
var NATIONALITYLIST = []  //国籍列表
const $F = {
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

    deepClone (obj) {
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
    },

    doUploadBatch ($instance, imgList = [], callback) {
        let formData = new FormData()
        imgList.forEach((file) => {
            formData.append('files', file.raw, file.raw.name)
        })
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
                callback(res.data.data)
            } else {
                if ($instance) {
                    $instance.$message.error(res.message || res.data.message)
                }
            }
        })
    },

    doRequest ($instance, url, params, callback) {
        if ($instance) {
            $instance.dataListLoading = true
            $instance.loading = true
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
        this.doRequest(null, '/pms/membertype/list', params, (data) => {
            callback(data)
        })
    },
    //获取国籍list
    fetchNationality (callback) {
        if (NATIONALITYLIST.length > 0) {
            callback(NATIONALITYLIST)
            return;
        }
        this.doRequest(null, '/pms/system/country_list', {}, (data) => {
            NATIONALITYLIST = data;
            callback(NATIONALITYLIST)
        })
    },

}
export default $F
