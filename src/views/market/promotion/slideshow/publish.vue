<template>
  <div class="flexPage">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/promotion' }">限时抢购</el-breadcrumb-item>
          <el-breadcrumb-item>商品发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form inline size="mini" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品分类">
          <el-cascader
            v-model="categoryid"
            :options="categoryList"
            style="width:300px"
            @change="handleChange"
          ></el-cascader>（平台分类）
          </el-form-item>-->
          <el-form-item label="商品分类">
            <el-cascader v-model="categoryid" :options="co_categoryList" @change="handleChange"></el-cascader>（卖家设置的分类）
          </el-form-item>
          <br />

          <el-form-item label="商品主图" style="width:238px">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :data="uploadData"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="form.thumb" :src="form.thumb" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播图">
            <div style="display:inline-block" v-if="form.thumb_url">
              <span class="avatars" v-for="(item,index) in form.thumb_url.split(',')" :key="index">
                <img :src="item" class="avatar" />
                <span class="deleteIcon" @click="handleRemove(index)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <span style="display: inline-block;">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :data="uploadData"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </span>
          </el-form-item>
        </el-form>

        <el-form-item label="商品详情">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="详情图片">
          <div style="display:inline-block" v-if="form.content_img">
            <span class="avatars" v-for="(item,index) in form.content_img.split(',')" :key="index">
              <img :src="item" class="avatar" />
              <span class="deleteIcon" @click="handleRemoveC(index)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <span style="display: inline-block;">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :data="uploadData"
              :show-file-list="false"
              :on-success="handleAvatarSucce"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </span>
        </el-form-item>

        <el-form inline size="mini" label-width="80px">
          <el-form-item label="价格">
            <el-input v-model="form.price" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="form.old_price" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item label="成本价">
            <el-input v-model="form.cost_price" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="总库存">
            <el-input v-model="form.stock" style="width:100px;margin-right:10px"></el-input>
          </el-form-item>
          <el-form-item label="商品运费">
            <el-input v-model="form.postage" style="width:100px;margin-right:10px"></el-input>
            <el-checkbox v-model="checked">包邮</el-checkbox>
          </el-form-item>
        </el-form>
        <el-form-item label="库存计算方式">
          <el-radio-group v-model="form.type_stock">
            <el-radio :label="1">下单减库存</el-radio>
            <el-radio :label="2">支付减库存</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上架时间">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">立即上架</el-radio>
            <el-radio :label="2">暂时不上传</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限购时间">
          <el-date-picker
            placeholder="请选择"
            style="width:200px"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="dateBox"
            v-model="form.start_time"
          ></el-date-picker>
          <span style="margin:0 5px">-</span>
          <el-date-picker
            placeholder="请选择"
            style="width:200px"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="dateBox"
            v-model="form.end_time"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-button @click="next">取消</el-button>
      <el-button @click="finsh">保存</el-button>
    </el-card>
  </div>
</template>
<script>
import vEditor from "@/components/vEditor/vEditor";

import httpRequest from "@/utils/httpRequest";
import { mapState, mapActions } from "vuex";

import {
  get_category_list_all,
  get_ac_goods_info,
  add_goods_info,
  edit_ac_goods_info
} from "@/utils/api/market";
export default {
  components: {
    vEditor
  },

  computed: {
    ...mapState({
      company: state => state.company
    })
  },
  data() {
    return {
      categoryList: [], //商品类型
      co_categoryList: [], //商家商品类型
      imageUrl: "",
      active: 0,
      checked: false,
      action: httpRequest.adornUrl("/market/upload/upload"),
      uploadData: { type: "2" },
      categoryid: "",
      categoryid: "",
      form: {}
    };
  },
  created() {
    /**  获取产品类型 **/
    // console.log(this.$route.query.id);

    this.getCagteGry();
  },
  activated() {
    let id = "";
    if (this.$route.query.id) {
      id = this.$route.query.id;
    }
    this.initProduct(id);
  },
  methods: {
    /**初始化数据 */
    getCagteGry() {
      get_category_list_all({ to_co_id: this.company.id }).then(res => {
        if (res.code == 200) {
          let data = res.data;
          let bbb = JSON.parse(
            JSON.stringify(data)
              .replace(/two/g, "children")
              .replace(/name/g, "label")
              .replace(/id/g, "value")
          );
          this.co_categoryList = bbb;
        }
      });
      // get_category_list_all({ to_co_id: "pingtai" }).then(res => {
      //   console.log(res);
      //   if (res.code == 200) {
      //     let data = res.data;
      //     let bbb = JSON.parse(
      //       JSON.stringify(data)
      //         .replace(/two/g, "children")
      //         .replace(/three/g, "children")
      //         .replace(/name/g, "label")
      //         .replace(/id/g, "value")
      //     );
      //     this.categoryList = bbb;
      //   }
      // });
    },
    initProduct(id) {
      if (id) {
        get_ac_goods_info({ id: id }).then(res => {
          if (res.code == 200) {
            this.form = Object.assign({}, this.form, res.data); 
            this.form.goods_id = id;
            // this.categoryid = this.form.categoryid;
            this.categoryid = this.form.categoryid;
          }
        });
      } else {
        this.form = {
          id: "",
          goods_id: "",
          categoryid: "",
          categoryid: "",
          title: "",
          thumb: "",
          thumb_url: "",
          old_price: "",
          postage: "",
          content: "",
          content_img: "",
          stock: "",
          type_stock: 1,
          status: 1,
          is_save: 1,
          use_price: "",
          cost_price: 0,
          start_time: "",
          price: 0,
          option: []
        };
      }
    },
    /**新增/编辑 */
    finsh() {
      let formData = {
        categoryid: this.form.categoryid,
        goods_id: this.form.goods_id,
        title: this.form.title,
        thumb: this.form.thumb,
        thumb_url: this.form.thumb_url,
        postage: this.form.postage,
        content: this.form.content,
        content_img: this.form.content_img,
        stock: this.form.stock,
        type_stock: this.form.type_stock,
        status: this.form.status,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        price: this.form.price,
        old_price: this.form.old_price,
        cost_price: this.form.cost_price
      };

      edit_ac_goods_info(formData).then(res => {
        if (res.code == 200) {
          this.$router.back();
        } else {
          this.$message.error(res.message);
        }
      });
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
    /**添加规格 */
    addSpecs() {
      // this.$set("form");
      this.form.spec.push({
        title: "",
        list: [{ name: "" }]
      });
    },
    /**生成规格表 */
    updateTable() {
      // console.log(this.form.spec); 
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
          stock: "0"
        }
      ]; //初始
      console.log(option);

      var items = this.form.spec;

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
      let thumb_url = this.form.thumb_url ? this.form.thumb_url.split(",") : [];

      thumb_url.splice(index, 1);
      this.form.thumb_url = thumb_url.join(",");
    },
    handleRemoveC(index) {
      let thumb_url = this.form.content_img
        ? this.form.content_img.split(",")
        : [];

      thumb_url.splice(index, 1);
      this.form.content_img = thumb_url.join(",");
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
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        let thumb_url = this.form.thumb_url
          ? this.form.thumb_url.split(",")
          : [];
        thumb_url.push(res.data.file_url);
        this.form.thumb_url = thumb_url.join(",");
      } else {
        this.$message.error(res.message);
      }
    },
    handleAvatarSucce(res, file) {
      if (res.code == 200) {
        let thumb_url = this.form.content_img
          ? this.form.content_img.split(",")
          : [];

        thumb_url.push(res.data.file_url);

        this.form.content_img = thumb_url.join(",");
      } else {
        this.$message.error(res.message);
      }
    },
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.form.thumb = res.data.file_url;
      } else {
        this.$message.error(res.message);
      }
    },
    addColumn(list, columnName, columnValues) {
      var newList = []; //新的集合
      for (var i = 0; i < list.length; i++) {
        //list中的每一个对象,每一条SKU
        var oldRow = list[i];
        //给当前SKU添加规格
        for (var j = 0; j < columnValues.length; j++) {
          var newRow = JSON.parse(JSON.stringify(oldRow)); //深克隆
          newRow.title =
            (newRow.title ? newRow.title + "-" : "") + columnValues[j].name;
          newList.push(newRow);
        }
      }
      return newList;
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    changeEditor(e) {
      //console.log(e)
      this.form.content = e;
    },
    handleChange(value) {
      // console.log(value[value.length-1]);
      this.form.categoryid = value[value.length - 1];
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
.flexPage {
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
</style>