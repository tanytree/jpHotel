import store from '@/store'
import axios from 'axios'
import { request } from '@/utils/request'
import merge from 'lodash/merge'
import httpRequest from "@/utils/httpRequest";

var publicDict = {}
const uploadUrl = 'http://39.104.116.153:8887'
// const uploadUrl = 'https://pms-api-dev.sgi-smacha.tokyo/'
var tabsName = {}
const languageObject = {
  'ri': '日本语',
  'zh': '中文'
}
const HQCODE = '0000000000'  //总部账号定义
const platSource = 1005;
var NATIONALITYLIST = []  //国籍列表
const $F = {
  makeStoresNum($instance, params) {
    if ($instance.storesNum) {
      merge(params, {
        storesNum: $instance.storesNum
      })
    }
  },
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
  // 打印表格
  doPrint(idName) {
    let oldstr = document.body.innerHTML;
    let printhtml = document.getElementById(idName).innerHTML;
    let f = document.getElementById('printf');
    if (idName == 'checkTheTwo') {      // 寄存打印   表格
      f.contentDocument.write(`<style type="text/css"> 
    .innerDialogBox {
      border-radius: 6px;
      width: 1000px;
      background-color: #fff;
    }
    .innerDialogBox .headerTitle {
      box-sizing: border-box;
      width: 1000px;
      background-color: #c8d8f1;
      padding: 0px 20px 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    .innerDialogBox .headerTitle .header_leftTitle {
      font-size: 22px;
      font-weight: 600;
    }
    .innerDialogBox .headerTitle .header_rightTitle {
      font-size: 14px;
      color: #b0b0b0;
      cursor: default;
    }
    .innerDialogBox .contentBox {
      box-sizing: border-box;
      padding: 20px;
    }
    .innerDialogBox .contentBox .dialog_headBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    .innerDialogBox .contentBox .dialog_headBox img {
      width: 260px;
      height: 73px;
    }
    .innerDialogBox .contentBox .flexBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
    }
    .innerDialogBox .contentBox .flexBox .flexBox_left {
      flex: 1;
    }
    .innerDialogBox .contentBox .flexBox .flexBox_right {
      flex: 1;
    }
    .innerDialogBox .contentBox .responsible {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
    }
    .innerDialogBox .contentBox .responsible .innerBox {
      width: 400px;
      font-weight: 600;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid black;
    }
    .innerDialogBox .contentBox .imgBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .innerDialogBox .contentBox .imgBox img {
      width: 260px;
      height: 73px;
    }
    .noprint{
      display:none;
    }
    </style>`);
    } else if (idName == 'customerInfo') {    //打印客户资讯  表格
      f.contentDocument.write(`<style type="text/css"> 
      .innerDialogBox {
        border-radius: 6px;
       widht:1000px;
        background-color: #fff;
      }
      .innerDialogBox .headerTitle {
        widht:1000px;
        box-sizing: border-box;
        background-color: #c8d8f1;
        padding: 0px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .headerTitle .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .innerDialogBox .headerTitle .header_rightTitle {
        font-size: 14px;
        color: #b0b0b0;
        cursor: default;
      }
      .innerDialogBox .contentBox {
        box-sizing: border-box;
        padding:0 20px 20px;
      }
      .innerDialogBox .contentBox .dialog_headBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .dialog_headBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .contentBox .tableTitle {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #d9d9d9;
        padding: 20px 0;
      }
      .innerDialogBox .contentBox table {
        margin-top: 20px;
        border-collapse: collapse;
       width:1000px;
      }
      .innerDialogBox .contentBox table tr td {
        width: 80px;
        height: 40px;
        text-align: center;
      }
      .innerDialogBox .contentBox table tr .checkBox label {
        margin-left: 20px;
      }
      .innerDialogBox .contentBox .bottomImg {
        text-align: right;
      }
      .innerDialogBox .contentBox .bottomImg img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .contentBox .responsible {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 30px;
      }
      .innerDialogBox .contentBox .responsible .innerBox {
        width: 400px;
        font-weight: 600;
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
      }
      .innerDialogBox .bottomBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding: 20px;
        border-top: 1px solid #dfe2e8;
      }
      .innerDialogBox .bottomBox .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid #dfe2e8;
        border-radius: 6px;
      }
      .innerDialogBox .bottomBox .bottomBox_right {
        padding: 10px 30px;
        background-color: #409eff;
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
      }
      .noprint{
        display:none;
      }
      </style>`);
    } else if (idName == 'priviewDocuments') {    //单据预览  表格
      f.contentDocument.write(`<style type="text/css"> 
      .innerDialogBox {
        border-radius: 6px;
        width:1000px;
        background-color: #fff;
      }
      .innerDialogBox .headerTitle {
        width:1000px;
        background-color: #c8d8f1;
        padding: 0px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .headerTitle .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .innerDialogBox .headerTitle .header_rightTitle {
        font-size: 14px;
        color: rgba(31, 31, 31, 0.8);
        cursor: default;
      }
      .innerDialogBox .contentBox {
        box-sizing: border-box;
        padding:0 20px 20px;
      
      }
      .innerDialogBox .contentBox .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox .urlPath {
        margin-left: 10px;
        font-size: 14px;
      }
      .innerDialogBox .contentBox .titleBox .title_centerBox {
        align-self: flex-end;
        margin-bottom: -35px;
      }
      .innerDialogBox .contentBox .titleBox .title_rightBox {
        font-size: 14px;
        color: #333333;
        align-self: flex-end;
        margin-bottom: -25px;
      }
      .innerDialogBox .contentBox .firstTable {
        margin-top: 50px;
      }
      .innerDialogBox .contentBox .firstTable .nameInfo {
        font-weight: 500;
      }
      .innerDialogBox .contentBox .firstTable .firstBox {
        margin-top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table {
        border-collapse: collapse;
        text-align: center;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table tr td {
        width: 100px;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_one {
        background: #ededed;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_two td {
        word-break: break-all;
      }
      .innerDialogBox .contentBox .firstTable .firstBox .rightOfTable {
        margin-left: 25px;
      }
      .innerDialogBox .contentBox .secondTable {
        margin-top: 20px;
      }
      .innerDialogBox .contentBox .secondTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .secondTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .secondTable table .second_rowOne {
        background: #ededed;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .secondTable .second_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .thirdTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne {
        border-bottom: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .thirdTable .third_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .fourthTable {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .fourthTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .fourthTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .fourthTable table .fourth_rowOne {
        border-bottom: none;
      }
      .innerDialogBox .contentBox .fourthTable table .fourth_rowOne td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .fourthTable table .fourth_rowOne td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .fourthTable .third_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .lastBox {
        text-align: right;
      }
      .innerDialogBox .contentBox .lastBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .bottomBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding: 20px;
        border-top: 1px solid #dfe2e8;
      }
      .innerDialogBox .bottomBox .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid #dfe2e8;
        border-radius: 6px;
        cursor: pointer;
      }
      .innerDialogBox .bottomBox .bottomBox_right {
        padding: 10px 30px;
        background-color: #409eff;
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
        cursor: pointer;
      }
      .noprint{
        display:none;
      }
      </style>`);
    } else if (idName == 'expenseDetail') {    //消费明细预览  表格
      f.contentDocument.write(`<style type="text/css"> 
      .innerDialogBox {
        border-radius: 6px;
        width: 1000px;
        background-color: #fff;
      }
      .innerDialogBox .headerTitle {
        width: 1000px;
        background-color: #c8d8f1;
        padding: 0px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .headerTitle .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .innerDialogBox .headerTitle .header_rightTitle {
        font-size: 14px;
        color: rgba(31, 31, 31, 0.8);
        cursor: default;
      }
      .innerDialogBox .contentBox {
        box-sizing: border-box;
        padding: 0 20px 20px;
      }
      .innerDialogBox .contentBox .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox .urlPath {
        margin-left: 10px;
        font-size: 14px;
      }
      .innerDialogBox .contentBox .titleBox .title_centerBox {
        align-self: flex-end;
        margin-bottom: -35px;
      }
      .innerDialogBox .contentBox .titleBox .title_rightBox {
        font-size: 14px;
        color: #333333;
        align-self: flex-end;
        margin-bottom: -25px;
      }
      .innerDialogBox .contentBox .firstTable {
        margin-top: 50px;
      }
      .innerDialogBox .contentBox .firstTable .nameInfo {
        font-weight: 500;
      }
      .innerDialogBox .contentBox .firstTable .firstBox {
        margin-top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table {
        border-collapse: collapse;
        text-align: center;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table tr td {
        width: 100px;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_one {
        background: #ededed;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_two td {
        word-break: break-all;
      }
      .innerDialogBox .contentBox .firstTable .firstBox .rightOfTable {
        margin-left: 25px;
      }
      .innerDialogBox .contentBox .secondTable {
        margin-top: 20px;
      }
      .innerDialogBox .contentBox .secondTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .secondTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .secondTable table .second_rowOne {
        background: #ededed;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .secondTable .second_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .thirdTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne {
        border-bottom: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .fourthTable {
        margin-top: 10px;
      }
      .innerDialogBox .contentBox .fourthTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .fourthTable table tr td {
        width: calc(100%/6);
        padding: 5px 0;
      }
      .innerDialogBox .contentBox .fourthTable table tr td:nth-child(2n+1) {
        background: #ededed;
      }
      .innerDialogBox .contentBox .fifthTable {
        margin-top: 10px;
      }
      .innerDialogBox .contentBox .fifthTable table {
        text-align: center;
        width: 100%;
        border-collapse: collapse;
      }
      .innerDialogBox .contentBox .fifthTable table .fifth_rowOne td {
        padding: 10px 0;
      }
      .innerDialogBox .contentBox .fifthTable table .fifth_rowOne td:nth-child(1) {
        background: #ededed;
      }
      .innerDialogBox .contentBox .fifthTable table .fifth_rowTwo td {
        padding: 10px 0;
      }
      .innerDialogBox .contentBox .fifthTable table .fifth_rowTwo td:nth-child(1) {
        background: #ededed;
      }
      .innerDialogBox .contentBox .fifthTable .fifth_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .lastBox {
        text-align: right;
      }
      .innerDialogBox .contentBox .lastBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .bottomBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding: 20px;
        border-top: 1px solid #dfe2e8;
      }
      .innerDialogBox .bottomBox .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid #dfe2e8;
        border-radius: 6px;
      }
      .innerDialogBox .bottomBox .bottomBox_right {
        padding: 10px 30px;
        background-color: #409eff;
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
      }
      
      .noprint{
        display:none;
      }
      </style>`);
    } else {
      f.contentDocument.write(`<style type="text/css"> 
      .innerDialogBox {
        border-radius: 6px;
        width:1000px;
        background-color: #fff;
      }
      .innerDialogBox .headerTitle {
        width:1000px;
        background-color: #c8d8f1;
        padding: 0px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .headerTitle .header_leftTitle {
        font-size: 22px;
        font-weight: 600;
      }
      .innerDialogBox .headerTitle .header_rightTitle {
        font-size: 14px;
        color: rgba(31, 31, 31, 0.8);
        cursor: default;
      }
      .innerDialogBox .contentBox {
        box-sizing: border-box;
        padding:0 20px 20px;
      
      }
      .innerDialogBox .contentBox .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .contentBox .titleBox .title_leftBox .urlPath {
        margin-left: 10px;
        font-size: 14px;
      }
      .innerDialogBox .contentBox .titleBox .title_centerBox {
        align-self: flex-end;
        margin-bottom: -35px;
      }
      .innerDialogBox .contentBox .titleBox .title_rightBox {
        font-size: 14px;
        color: #333333;
        align-self: flex-end;
        margin-bottom: -25px;
      }
      .innerDialogBox .contentBox .firstTable {
        margin-top: 50px;
      }
      .innerDialogBox .contentBox .firstTable .nameInfo {
        font-weight: 500;
      }
      .innerDialogBox .contentBox .firstTable .firstBox {
        margin-top: 5px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table {
        border-collapse: collapse;
        text-align: center;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table tr td {
        width: 100px;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_one {
        background: #ededed;
      }
      .innerDialogBox .contentBox .firstTable .firstBox table .row_two td {
        word-break: break-all;
      }
      .innerDialogBox .contentBox .firstTable .firstBox .rightOfTable {
        margin-left: 25px;
        font-weight: 500;
      }
      .innerDialogBox .contentBox .secondTable {
        margin-top: 20px;
      }
      .innerDialogBox .contentBox .secondTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .secondTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .secondTable table .second_rowOne {
        background: #ededed;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .secondTable table .second_roTwo td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .secondTable .second_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .thirdTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .thirdTable table tr td {
        width: 10%;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne {
        border-bottom: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td {
        border-bottom: none;
        border-top: none;
      }
      .innerDialogBox .contentBox .thirdTable table .third_rowOne td div {
        margin-bottom: 5px;
        word-break: break-all;
      }
      .innerDialogBox .contentBox .fourthTable {
        margin-top: 10px;
      }
      .innerDialogBox .contentBox .fourthTable table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
      }
      .innerDialogBox .contentBox .fourthTable table tr td {
        width: calc(100%/6);
        padding: 5px 0;
      }
      .innerDialogBox .contentBox .fourthTable table tr td:nth-child(2n+1) {
        background: #ededed;
      }
      .innerDialogBox .contentBox .fourthTable .fourth_bottom {
        margin-top: 5px;
      }
      .innerDialogBox .contentBox .cutOff {
        margin-top: 15px;
        margin-left: -30px;
        margin-right: -30px;
        border: 1px dashed rgba(186, 186, 186, 0.5);
      }
      .fifthTabel {
        margin-top: 25px;
      }
      .fifthTabel .fifth_titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
      }
      .fifthTabel .fifth_titleBox .fifthTitle_left {
        text-align: left;
        font-weight: 500;
      }
      .fifthTabel .fifth_titleBox .fifthTitle_right {
        text-align: center;
        font-weight: 500;
        margin-right: 100px;
      }
      .fifthTabel .fifth_titleBox .fifthTitle_right .boldText {
        font-weight: bold;
        font-size: 22px;
      }
      .fifthTabel .fifth_container {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: row;
      }
      .fifthTabel .fifth_container div {
        width: 55%;
      }
      .fifthTabel .fifth_container div .boxDiv {
        border: 1px solid #727272;
        width: 100%;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv {
        width: 100%;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv table {
        width: 100%;
        border-bottom: 1px solid #727272;
        border-spacing: 0;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv table tr {
        margin: 0;
        padding: 0;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv table tr td {
        word-break: break-all;
        padding: 5px 0;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv table tr td:nth-child(1) {
        width: 75%;
        border-right: 1px solid #727272;
        padding-left: 15px;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv table tr td:nth-child(2) {
        width: 25%;
        text-align: center;
      }
      .fifthTabel .fifth_container div .boxDiv .itemDiv:nth-last-child(1) table {
        border: none;
      }
      .fifthTabel .fifth_container .fifth_rightBox {
        margin-left: 70px;
      }
      .fifthTabel .fifth_container .fifth_rightBox .fifthRight_top {
        font-size: 14px;
        color: #333333;
        margin-top: 10px;
      }
      .fifthTabel .fifth_container .fifth_rightBox .fifthRight_middle {
        font-weight: 500;
        margin-top: 20px;
      }
      .fifthTabel .fifth_container .fifth_rightBox .fifthRight_bottom {
        margin-top: 15px;
        margin-left: -50px;
        font-size: 14px;
        color: #333333;
        width: 100px;
        height: 100px;
        background: #fefd00;
        border: 1px solid #505050;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }      
      .innerDialogBox .contentBox .inscribeBox .inscribe_top {
        width: 55%;
        border-bottom: 1px solid black;
        padding-bottom: 7px;
        padding-left: 15px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .innerDialogBox .contentBox .inscribeBox .inscribe_bottom {
        font-size: 14px;
        color: #333333;
      }
      .innerDialogBox .contentBox .lastBox {
        text-align: right;
      }
      .innerDialogBox .contentBox .lastBox img {
        width: 260px;
        height: 73px;
      }
      .innerDialogBox .bottomBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        padding: 20px;
        border-top: 1px solid #dfe2e8;
      }
      .innerDialogBox .bottomBox .bottomBox_left {
        padding: 10px 30px;
        border: 1px solid #dfe2e8;
        border-radius: 6px;
        cursor: pointer;
      }
      .innerDialogBox .bottomBox .bottomBox_right {
        padding: 10px 30px;
        background-color: #409eff;
        border-radius: 6px;
        margin-left: 15px;
        color: #fff;
        cursor: pointer;
      }
      .noprint{
        display:none;
      }
      </style>`);
    }
    f.contentDocument.write(printhtml);
    f.contentDocument.close();
    f.contentWindow.print();
    return true;
  },
  // 一些多个页面都会用到的方法 统一写到commons里面
  commons: {
    //获取ota列表
    fetchOtaList(params = {}, callback) {
      $F.doRequest(null, '/pms/oat/oat_list', params, res => {
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
