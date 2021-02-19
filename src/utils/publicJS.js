import store from '@/store'
import axios from 'axios'
import { request } from '@/utils/request'
import merge from 'lodash/merge'
import httpRequest from "@/utils/httpRequest";

// eslint-disable-next-line no-unused-vars
var publicDict = {}
const uploadUrl = 'http://39.104.116.153:8887'
// const uploadUrl = 'https://pms-api-dev.sgi-smacha.tokyo/'
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
  translate(zh, ri) {
    return sessionStorage.locale == 'zh' ? zh : ri;
  },

  //获取总部后台的代码code
  getHQCode() {
    return HQCODE
  },
  getLangDesc(langKey) {
    return languageObject[langKey]
  },

  getUploadUrl() {
    return uploadUrl
  },

  deepClone(obj, copyObject) {
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
          if (obj[i] instanceof File) {
            return obj
          }
          newObject[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i]
        }
      }
      return newObject
    }

  },

  replaceWeekDay(weekdayStr) {
    this.$t('commons.weeks').forEach((item, i) => {

    })
  },

  doUploadBatch($instance, imgList = [], callback) {
    let formData = new FormData();
    let newImageList = [];
    imgList.forEach((file) => {
      if (file.raw && file.raw.name)
        formData.append('files', file.raw, file.raw.name);
      else
        newImageList.push(file.url);
    })
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

  doImportFile($instance, data, callback) {
    let formData = new FormData();
    formData.append('storesNum', sessionStorage.storesNum);
    formData.append('imgModel', '2');
    formData.append('platSource', platSource);
    formData.append('filename', data.filename, data.filename.name);

    axios.post(uploadUrl + '/pms/upload/batch_upload_img', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(res => {
      if (res.data.code === 200) {
        callback(res.data)
      } else {
        if ($instance) {
          $instance.$message.error(res.message || res.data.message)
        }
      }
    })
  },

  removeNullKey(params, toString, toJSONStringify) {
    for (let key in params) {
      let value = params[key];
      if ((value === '' || value === null || value === undefined || value == 'undefined' || value == 'null') && key != 'storesNum'
        || ((value instanceof Array) && value.length == 0)) {
        delete params[key];
      } else {
        if (toString) {
          params[key] = params[key].toString();
        }
        if (toJSONStringify) {
          if (typeof params[key] == 'object') {
            if (params[key] instanceof Array) {
              if (typeof params[key][0] != 'object') {
                continue
              }
            }
            params[key] = JSON.stringify(params[key]);
          }
        }
      }
    }
  },

  doRequest($instance, url, params = {}, callback, errorCallback) {
    if ($instance) {
      $instance.dataListLoading = true
      $instance.loading = true
    }
    params = this.deepClone(params);
    this.removeNullKey(params, false, true);
    request(url, params).then((res) => {
      if ($instance) {
        $instance.dataListLoading = false
        $instance.loading = false
      }
      if (res.code === 200) {
        if (res.data) {
          callback(res.data)
        } else {
          callback()
        }

      } else {
        if (errorCallback) {
          errorCallback(res);
        } else {
          if ($instance) {
            $instance.$message.error(res.message || res.data.message)
          }
        }

      }
    })
  },

  merge(origin = {}, params = {}) {
    merge(origin, params)
  },

  beforeUpload($instance, file, size = 2) {
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

  getPublicDictByType($instance, type, callback, forceRefresh) {
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
    for (var p in object) {//遍历json对象的每个key/value对,p为key
      if (object[p] && typeof (object[p] == 'number')) {
        object[p] = object[p] + '';
      }
    }
  },

  parseObjectBykey(object, key) {
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
      $instance.activeName = $instance.menuList[0].path;
      $instance.$forceUpdate()
    }
  },

  getWeekNumber(node, date, splitKey) {
    let arys1 = date.split(splitKey || '-');
    var ssdate;
    if (arys1.length == 2) {
      ssdate = new Date(new Date().getFullYear(), parseInt(arys1[0] - 1), arys1[1]);
    } else {
      ssdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
    }
    let weeks = node.$t('commons.weeks');
    return String(ssdate.getDay()).replace("0", weeks[6])
      .replace("1", weeks[0])
      .replace("2", weeks[1])
      .replace("3", weeks[2])
      .replace("4", weeks[3])
      .replace("5", weeks[4])
      .replace("6", weeks[5])//就是你要的星期几
  },

  //
  formatDate(fmt, days, dateString) {
    let nowDate = new Date();
    if (dateString) {
      nowDate = new Date(dateString)
    }
    if (days) {
      nowDate.setDate(nowDate.getDate() + days)
    }
    var o = {
      "M+": nowDate.getMonth() + 1,                 //月份
      "d+": nowDate.getDate(),                    //日
      "h+": nowDate.getHours(),                   //小时
      "m+": nowDate.getMinutes(),                 //分
      "s+": nowDate.getSeconds(),                 //秒
      "q+": Math.floor((nowDate.getMonth() + 3) / 3), //季度
      "S": nowDate.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (nowDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  importExcel(url, file) {

  },

  getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    return days;
  },
  //千进位处理
  numFormate(num) {
    // console.log(num);
    if (num) {
      return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
          return $1 + ",";
        });
      });
    } else {
      return num;
    }
  },
  //将yyyy-MM-dd HH:mm:ss格式的时间分割成数组
  formatTime(time) {
    if (time) {
      let array = time.split(" ");
      return array;
    } else {
      return time;
    }
  },
  // 一些多个页面都会用到的方法 统一写到commons里面
  commons: {
    //获取ota列表
    fetchOtaList(params = {}, callback) {
      $F.doRequest(this, '/pms/oat/oat_list', params, res => {
        callback(res.oatList || [])
      })
    },

    //获取销售员
    fetchSalesList(params = {}, callback) {
      $F.merge(params, {
        searchType: 1,
        paging: false,
        pageIndex: 1,
        pageSize: 999
      })
      $F.doRequest(null, '/pms/workuser/login_user_list', params, (data) => {
        callback(data);
      })
    },
    // //邮编检索promise方法
    // zipCode(code1, code2) {
    //   let code = code1 + code2;
    //   let params = {
    //     zipcode: code,
    //   };
    //   let interfance =  new Promise((resolve, reject) => {
    //     $F.doRequest(null, '/pms/system/j_code_address', params, (res) => {
    //       resolve(res);
    //       reject('not find');
    //     })
    //   })
    //   return interfance;
    // },

    //邮编检索 回调函数方法
    zipCode(code1, code2, callBack) {
      let code = code1 + code2;
      let params = {
        zipcode: code,
      };
      $F.doRequest(null, '/pms/system/j_code_address', params, (res) => {
        callBack(res)
      })
    },


    //获取会员类型列表 这里封装统一方法 很多地方用到
    fetchMemberTypeList(requestParams = {}, callback) {
      let params = {
        name: '',
        pageIndex: 1,
        pageSize: 10,
        paging: false,
        id: ''
      }
      merge(params, requestParams)
      $F.doRequest(null, '/pms/membertype/list', params, (data) => {
        let memberList = data.list;
        console.log(memberList);
        let memberArray = {
          list: []
        };
        if (memberList.length > 0) {
          for (let item of memberList) {
            if (item.memberTypeList.length > 0) {
              for (let each of item.memberTypeList) {
                if (each.memberTypeList.length > 0) {
                  for (let i of each.memberTypeList) {
                    memberArray.list.push(i)
                  }
                }
              }
            }
          }
        }
        console.log(memberArray);
        callback(memberArray)
      })
    },
    //获取国籍list
    fetchNationality(callback) {
      if (NATIONALITYLIST.length > 0) {
        callback(NATIONALITYLIST)
        return;
      }
      $F.doRequest(null, '/pms/system/country_list', {}, (data) => {
        NATIONALITYLIST = data;
        callback(NATIONALITYLIST)
      })
    },
    downloadTemplate(action) {
      let url = httpRequest.systemUrl(action) + `?userId=${sessionStorage.userId}&platSource=1005`;
      axios.get(url, {
        headers: {
          "accessToken": sessionStorage.accessToken
        },
        responseType: 'blob', //二进制流
      }).then(function (res) {

        if (!res) return
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel;charset=utf-8' })
        let url = window.URL.createObjectURL(blob);
        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = url;
        aLink.setAttribute("download", "excel.xls");
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        window.URL.revokeObjectURL(url);
      }).catch(function (error) {
        console.log(error)
      });
    },
  }

}
export default $F
