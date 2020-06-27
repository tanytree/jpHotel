import store from '@/store';
import {request } from "@/utils/request";
import merge from 'lodash/merge'
var code2Table = {};
let uploadUrl = 'http://xxyweeds.top:8895';
const $F = {
  getUploadUrl() {
    return uploadUrl;
  },
  deepClone(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
      return;
    } else if(window.JSON){
      str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for(var i in obj){
        newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
      }
    }
    return newobj;
  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  doRequest($instance, url, params, callback) {
    if ($instance)
      $instance.dataListLoading = true;
    request(url, params).then((res) => {
      if ($instance)
        $instance.dataListLoading = false;
      if (res.code === 200) {
        callback(res.data);
      } else {
        if ($instance)
          $instance.$message.error(res.message || res.data.message);
      }
    })
  },

  getCourseTypes($instance, typeId, callback) {
    if (code2Table[typeId])
      return callback(code2Table[typeId]);
    else {
      const params = { type: typeId }
      request('/edt/system/public_dict', params).then((res) => {
        if (res.code === 200) {
          code2Table[typeId] = res.data;
          callback(res.data);
        } else {
          if ($instance)
            $instance.$message.error(res.message || res.data.message);
        }
      })
    }
  },

  merge(origin={}, params={}) {
    merge(origin, params)
  },

  /*转换活动数据*/
  changeActivityDatas(array, leaf) {
    var newArray = []
    array.forEach(item => {
      newArray.push({label: item.activityName, value: item.id, leaf: leaf || false});
    })
    return newArray;
  },

  /**根据userAuth字段 组装用户菜单权限*/
  handleTree(userAuthString, routermsg) {
    const authTypes = userAuthString ? userAuthString.split(',') : [];
    var datas = [];
    routermsg.forEach(item =>{
      if (authTypes.includes(item.id)) {
        const object = this.deepClone(item);
        object.children = [];
        if (item.children.length > 0) {
          item.children.forEach(cTemp =>{
            if (authTypes.includes(cTemp.id)) {
              object.children.push(cTemp);
            }
          })
        }
        datas.push(object);
      }
    })
    return datas;
  },

  beforeUpload ($instance, file, size = 2) {
    const fileType = file.type,
      isImage = fileType.indexOf("image") != -1,
      isLt2M = file.size / 1024 / 1024 < size;
    if (!isImage) {
      $instance.$message.error("只能上传图片格式png、jpg、gif!");
    }
    if (!isLt2M) {
      $instance.$message.error("只能上传图片大小小于2M");
    }
    return isImage && isLt2M;
  },

  parseObjectBykey (object, key) {
    if ( object[key]&&  typeof(object[key]) == 'string') {
      object[key] = JSON.parse(object[key]);
    }
  },
}
export default $F;
