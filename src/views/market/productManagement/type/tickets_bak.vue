<template>
  <div>
    <el-dialog :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="form" :model="form" label-width="80px" size="small" v-if="active==0">
      <el-form-item label="商品主图" required>
<!--        <el-upload class="upload-demo"-->
<!--                   :action="action"-->
<!--                   :file-list="form.mainPicList"-->
<!--                   accept=".png, .jpg, .gif"-->
<!--                   :http-request="uploadSectionFile"-->
<!--                   :show-file-list="false">-->
<!--                    <i class="el-icon-plus"></i>-->
<!--&lt;!&ndash;          <el-input v-model="agreement.fileName" readonly></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-button type="primary" class="defaultBtn" @click="">选择协议</el-button>&ndash;&gt;-->
<!--          &lt;!&ndash; <el-button @click="">浏览</el-button> &ndash;&gt;-->
<!--        </el-upload>-->

        <el-upload
          :action="action"
           :data="uploadData" :limit="6"
           list-type="picture-card" :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
           :file-list="form.mainPicList" accept=".png, .jpg, .gif"
           :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">尺寸建议750*422，大小2M以下，最多6张</div>
        </el-upload>
      </el-form-item>
<!--      <el-form-item label="商品属性" required>-->
<!--        <div></div>-->
<!--        <div class="el-input__inner" style="height:auto">-->
<!--            <div class="specVal">-->
<!--              <span class="valTit">名称</span>-->
<!--              <el-input v-model="title" size="mini" style="width:100px"></el-input>-->
<!--            </div>-->
<!--            <div class="specVal">-->
<!--              <span class="valTit">属性值</span>-->
<!--&lt;!&ndash;              <el-input style="width:100px;margin-right: 10px;" v-model="form.showStarttime.key"></el-input>&ndash;&gt;-->
<!--              <div class="inputBox" v-for="(item, index) in form.showStarttime.values" :key="item">-->
<!--                <el-input style="width:100px" v-model="item.name"></el-input>-->
<!--                <i @click="form.showStarttime.values.splice(index,1)" class="el-icon-error"></i>-->
<!--              </div>-->
<!--              <div>-->
<!--                <el-button type="primary" plain @click="addAttribles">新增属性</el-button>-->
<!--              </div>-->
<!--            </div>-->
<!--        </div>-->
<!--      </el-form-item>-->
      <el-form-item label="商品规格"  required>
        <div class="el-specItem" style="height:auto">
          <div v-for="(item, index) in form.spec" :key="index" class="specItem">
            <div>
              <i @click="form.spec.splice(index,1)" class="el-icon-error"></i>
              商品属性{{index+1}}
            </div>
            <div>
              <div class="specVal">
                <span class="valTit">名称</span>
                <el-input v-model="item.title" size="mini" style="width:100px"></el-input>
              </div>
              <div class="specVal">
                <span class="valTit">规格值</span>
                <div class="inputBox" v-for="(items,indexs) in item.list" :key="indexs">
                  <el-input v-model="items.name" @blur="updateTable(items.name)" style="width:100px"></el-input>
                  <i @click="form.spec[index].list.splice(indexs,1)" class="el-icon-error"></i>
                </div>
                <div>
                  <el-button type="primary" plain @click="addModel(index)">新增型号</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-button class="addBtn" type="primary" plain @click="addSpecs">新增属性</el-button>
           <el-button size="mini" @click="updateTable()">更新规格表</el-button>
          <el-table ref="multipleTable" :data="form.option" size="mini" border>
            <el-table-column prop="name" label="属性"></el-table-column>
            <el-table-column label="商品编码">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled" v-model="scope.row.goods_no"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled" v-model="scope.row.old_price"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled || seatFlag == 1" v-model="scope.row.stock"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="ceneter" label="操作">
              <template slot-scope="scope">
                <el-button  type="text" size="mini" @click="scope.row = {}">清空</el-button>
                <el-button
                  v-if="scope.row.disabled"
                  type="text"
                  size="mini"
                  @click="scope.row.disabled=false"
                >启用</el-button>
                <el-button v-else type="text" size="mini" @click="scope.row.disabled=true">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <span>总库存</span>
            <el-input v-model="totalStock"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="作为录入" required>
        <template>
          <el-radio v-model="seatFlag" label="1">有座位</el-radio>
          <el-radio v-model="seatFlag" label="2">无座位</el-radio>
        </template>
      </el-form-item>
    </el-form>
    <ProductAttribute ref="attributeEdit" @saveAttribute="saveAttribute" />
    <seat v-if="seatFlag == 1" />
  </div>
</template>
<script>
import vEditor from "@/components/vEditor/vEditor";
import ProductAttribute from "../ProductAttribute";
import seat from "./seat";
import axios from "axios";
import httpRequest from "@/utils/httpRequest";
import { mapState, mapActions } from "vuex";


import {
  get_goods_info,
  add_goods_info,
  edit_goods_info
} from "@/utils/api/market";
export default {
  props: ['action'],
  components: {
    vEditor,
    ProductAttribute,
    seat
  },

  computed: {
    ...mapState({
      company: state => state.company,
      user: state => state.user
    }),
    specChang() {
      return JSON.stringify(this.form.spec);
    },
    stockTotal() {
      let totalPrice = 0;
      if (this.form.option) {
        totalPrice = this.form.option.reduce(
          (total, item) => total + (item.stock - 0),
          0
        );
      }

      return totalPrice;
    }
  },
  watch: {
    specChang(newVal, oldVal) {
      console.log(newVal, oldVal);

      // this.updateTable();
    },
    stockTotal(newVal, oldVal) {
      this.form.stock = this.stockTotal;
    }
  },
  data() {
    return {
      //显示图片
      urlShowDialogVisible: false,
      dialogImageUrl: '',
      totalStock: 0,  //总库存
      item: {
        attributes: [],
        title:'',
        list: [],
      },
      title: '',
      seatFlag: '2',
      radio: '1',
      categoryList: [], //商品类型
      co_categoryList: [], //商家商品类型
      imageUrl: "",
      active: 0,
      checked: false,
      uploadData: {
        imgModel: 1,
        platSource: 1005
      },
      categoryid: "",
      co_categoryid: "",
      form: {
        showStarttime: {
          key: '',
          values: []
        },
        mainPicList: [],  //商品主图list
        goods_id: "",
        categoryid: "",
        co_categoryid: "",
        title: "",
        thumb: "",
        thumbUrl: "",
        postage: "",
        content: "",
        contentImg: "",
        stock: "",
        typeStock: 1,
        status: 1,
        is_save: 1,
        use_price: "",
        param: [],
        spec: [],
        option: []
      }
    };
  },
  created() {
    this.uploadData = { imgModel: "1", platSource: 1005, userId: this.user.userId };
  },
  methods: {
    /**初始化数据 */
    /*新增属性*/
    // addAttribles() {
    //   debugger
    //   const array = this.form.showStarttime.values.filter(item => {
    //     return !item.name
    //   })
    //   if (array.length  == 0) {
    //     this.form.showStarttime.values.push({name: '111'});
    //     console.log(this.form.showStarttime.values)
    //   } else
    //     this.$message.info('请先将规格值填写完整')
    // },
    /*删除型号*/
    // deleteModel(index, indexs) {
    //   this.form.spec[index].list.splice(indexs,1);
    //   this.updateTable();
    // },
    /*新增型号*/
    addModel(index) {
      const array = this.form.spec[index].list.filter(item => {
        return !item.name
      })
      if (array.length == 0)
        this.form.spec[index].list.push({name: ''})
      else
        this.$message.info('请先将型号信息填写完整')
    },

    /**添加规格 */
    addSpecs() {
      // this.$set("form");
      const array = this.form.spec.filter(item => {
        let arr = item.list.filter(temp => {
          return !temp.name
        })
        return !item.title || arr.length > 0
      })
      if (array.length == 0) {
        this.form.spec.push({
          title: "",
          list: [{ name: "" }]
        });
      } else {
        this.$message.info('请先将规格值填写完整')
      }
    },




    initProduct(id) {
      if (id) {
        get_goods_info({ id: id }).then(res => {
          if (res.code == 200) {
            this.form = Object.assign({}, this.form, res.data);
            this.form.goods_id = id;
            this.form.option.forEach(element => {
              this.$set(element, "disabled", false);
            });
            this.categoryid = this.form.categoryid;
            this.co_categoryid = this.form.co_categoryid;
          }
        });
      } else {
        this.form = {
          goods_id: "",
          categoryid: "",
          co_categoryid: "",
          oneCategoryid: "",
          twoCategoryid: "",
          coCategoryid: "",
          title: "",
          thumb: "",
          thumbUrl: "",
          postage: "",
          content: "",
          contentImg: "",
          stock: "",
          typeStock: 1,
          status: 1,
          is_save: 1,
          param: [],
          spec: [],
          option: []
        };
      }
    },
    /**新增/编辑 */
    finsh() {
      let formData = JSON.parse(JSON.stringify(this.form));
      formData.option = JSON.stringify(
        formData.option.filter(item => !item.disabled)
      );
      formData.spec = JSON.stringify(formData.spec);
      formData.param = JSON.stringify(formData.param);

      // formData.co_categoryid = this.co_categoryid;

      if (this.form.id) {
        edit_goods_info({
          goods_id: formData.goods_id,
          categoryid: formData.categoryid,
          co_categoryid: formData.co_categoryid,
          title: formData.title,
          thumb: formData.thumb,
          thumbUrl: formData.thumbUrl,
          postage: formData.postage,
          content: formData.content,
          contentImg: formData.contentImg,
          stock: formData.stock,
          typeStock: formData.typeStock,
          status: formData.status,
          is_save: formData.is_save,
          use_price: formData.use_price,
          param: formData.param,
          spec: formData.spec,
          option: formData.option
        }).then(res => {
          if (res.code == 200) {
            this.active = 0;
            this.$emit("freshTable");
            this.initProduct();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
      } else {
        add_goods_info(formData).then(res => {
          if (res.code == 200) {
            this.active = 0;
            this.$emit("freshTable");
            this.initProduct();
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    /**打开属性弹框 */
    openAttribute(index) {
      let val = "";
      this.parmarIndex = "";
      if (index) {
        this.parmarIndex = index;
        val = this.form.param[index];
      }
      this.$refs.attributeEdit.init(val);
    },
    /**保存属性 */
    saveAttribute(val) {
      if (this.parmarIndex) {
        this.form.param[this.parmarIndex] = val;
      } else {
        this.form.param.push(val);
      }
    },

    /**生成规格表 */
    updateTable(value) {
      // if (!value) {return}
      let option = [
        {
          title: "",
          name: "",
          thumb: "",
          goods_no: 0,
          price: 100,
          old_price: "0",
          purchase_price: "0",
          cost_price: "0",
          stock: "0",
          disabled: false
        }
      ]; //初始
      console.log(option);

      var items = this.form.spec;
      console.log(items);
      for (var i = 0; i < items.length; i++) {
        //循环得到每一个item对象
        //{"attributeName":"网络","attributeValue":["移动4G","联通4G","电信4G"]}
        option = this.addColumn(option, items[i].title, items[i].list);
      }
      // console.log(option)
      this.form.option = option;
    },
    /**删除图片 */
    handleRemove(index) {
      let thumbUrl = this.form.thumbUrl ? this.form.thumbUrl.split(",") : [];

      thumbUrl.splice(index, 1);
      this.form.thumbUrl = thumbUrl.join(",");
    },
    handleRemoveC() {
      let contentImg = this.form.contentImg
        ? this.form.contentImg.split(",")
        : [];

      contentImg.splice(index, 1);
      this.form.contentImg = contentImg.join(",");
    },
    /**上传回调 */
    specsSuccess(res, file, index) {
      console.log(index);
      if (res.code == 200) {
        this.$set(this.form.option[index], "thumb", res.data.file_url);
      } else {
        this.$message.error(res.message);

        return;
      }
    },
    /**主图上传回调 */

    handleSuccess(res, file) {
      if (res.code == 200) {
        this.form.thumb = res.data.file_url;
      } else {
        this.$message.error(res.message);
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        let thumbUrl = this.form.thumbUrl ? this.form.thumbUrl.split(",") : [];
        thumbUrl.push(res.data.file_url);
        this.form.thumbUrl = thumbUrl.join(",");
      } else {
        this.$message.error(res.message);
      }
    },
    handleAvatarSucce(res, file) {
      if (res.code == 200) {
        let contentImg = this.form.contentImg
          ? this.form.contentImg.split(",")
          : [];
        contentImg.push(res.data.file_url);
        this.form.contentImg = contentImg.join(",");
      } else {
        this.$message.error(res.message);
      }
    },

    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.urlShowDialogVisible = true;
    },

    addColumn(list, columnName, columnValues) {
      var newList = []; //新的集合
      for (var i = 0; i < list.length; i++) {
        //list中的每一个对象,每一条SKU
        var oldRow = list[i];
        //给当前SKU添加规格
        for (var j = 0; j < columnValues.length; j++) {
          var newRow = JSON.parse(JSON.stringify(oldRow)); //深克隆
          newRow.name =
            (newRow.name ? newRow.name + "-" : "") + columnValues[j].name;
          newList.push(newRow);
        }
      }

      return newList;
    },


    uploadSectionFile(param, callback) {
      debugger
      var a = this;
      var file = param.file;
      const isLt10M = file.size / 1024 / 1024 < 20;
      if (! isLt10M)
        return this.$message.error('上传文件不能超过 20MB!');
      if (file.name.split('.')[1] == 'exe') {
        return this.$message.error('不能上传exe文件');
      }
      this.$F.doRequest(this, '/edt/upload/upload_img', {userId: this.selectedRecord.userId, userAuth: assertArray.join(',')}, (data)=> {
        this.selectedRecord.userAuth = assertArray.join(',');
        this.selectedRecord.userAuthDesc = this.getUserAuthDesc(this.selectedRecord.userAuth);
        this.tableData[this.selectedIndex] = this.selectedRecord;
        this.$set(this.tableData, this.selectedIndex, this.selectedRecord)
        this.$message.success({
          message: '权限设置成功',
          duration: 1300
        })
      })
    },

    beforeUpload(file) {
      // let fd = new FormData()
      // fd.append('file', file)
      // fd.append('imgModel', 1)
      // fd.append('platSource', 1005)
      // axios.post('http://xxyweeds.top:8895/edt/upload/upload_img', fd, {})
      //   .then(res=>{
      //     console.log(res.data);
      //   }, (res) => {
      //   debugger;
      //   console.log(res)
      // })
      return this.$F.beforeUpload(this, file, 2)
    },

    mainPicSuccess: function (res, file, fileList, index) {
        debugger;
      if (res.code == 200) {
        this.form.mainPicList.push({ url: res.data });
      } else {
        this.$message.error(res.message);
        this.form.mainPicList.pop();
      }
    },
    changeEditor(e) {
      //console.log(e)
      this.form.content = e;
    },
    handleChange(value) {
      // console.log(value[value.length-1]);
      this.form.categoryid = value[value.length - 1];
    },
    handleChanges(value) {
      // console.log(value[value.length-1]);
      this.form.co_categoryid = value[value.length - 1];
    },

    onSubmit() {
      console.log("submit!");
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },

    back() {
      this.active--;
    }
  }
};
</script>
<style lang="less" >
.el-specItem {
  height: auto;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;

  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  .addBtn {
    margin-left: 10px;
  }
}
.specItem {
  border-bottom: 1px solid #d8d8d8;
  padding: 0 10px;
}
.specVal {
  display: flex;
  flex-wrap: wrap;
  .valTit {
    width: 60px;
  }
  .inputBox {
    position: relative;
    margin-right: 10px;
    i {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
.flexP {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .avatars {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    position: relative;
    display: inline-block;
    .deleteIcon {
      position: absolute;
      right: -0;
      top: -0;
      line-height: 20px;
      color: #fff;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);

      text-align: center;
      width: 20px;
      height: 20px;
    }
  }
}
.parmarBtn {
  position: relative;

  display: inline-block;
  margin-right: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  line-height: 1;
  border: 1px solid rgba(199, 199, 199, 1);
  padding: 7px 15px;
  box-sizing: border-box;
  i {
    position: absolute;
    right: -5px;
    top: -5px;
    color: #d81e06;
    cursor: pointer;
  }
}
</style>
