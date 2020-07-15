<template>
  <div>
    <el-dialog top="0" :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="form" :model="form" label-width="80px" size="small" :rules="rules">
      <el-form-item label="商品主图" required>
        <el-upload
          :action="action"
          :data="uploadData" :limit="6"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="showIcons"
          accept=".png, .jpg, .gif"
          :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">尺寸建议750*1000，大小2M以下，最多6张</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="产品价格" prop="reserverPrice">
        <el-input v-model="form.reserverPrice" style="width: 100px"></el-input><span style="margin-left: 5px"> /天</span>
      </el-form-item>
      <el-form-item label="场地面积" prop="roomSize">
        <el-input v-model="form.roomSize" style="width: 100px"></el-input><span style="margin-left: 5px">平米</span>
      </el-form-item>
      <el-form-item label="容纳人数" prop="galleryful">
        <el-input v-model="form.galleryful" style="width: 100px"></el-input><span style="margin-left: 5px">人</span>
      </el-form-item>
      <el-form-item label="省市区" prop="city">
        <v-distpicker :province="form.city[0]" :city="form.city[1]" :area="form.city[2]" @selected="onSelected"></v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址" prop="reserverAddress">
        <el-input v-model="form.reserverAddress"></el-input>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import VDistpicker from 'v-distpicker'

export default {
  props: ['uploadData', 'action'],
  components: { VDistpicker },
  computed: {

  },
  watch: {
  },
  data() {
    return {
        selected: [],
        showIcons: [],
        form: {
            reserverPrice: '',
            roomSize: '',
            galleryful: '',
            reserverAddress: '',
            icon: [],
            city: ['省', '', ''],
        },
        //显示图片
        urlShowDialogVisible: false,
        dialogImageUrl: '',
        courseList: [],
        rules: {
            icon : [ { required: true, message: "商品主图必填", trigger: "change" } ],
            reserverPrice : [ { required: true, message: "产品价格必填", trigger: "change" } ],
            roomSize : [ { required: true, message: "场地面积必填", trigger: "change" } ],
            galleryful : [ { required: true, message: "容纳人数必填", trigger: "change" } ],
            city : [ { required: true, message: "省市区必填", trigger: "change" } ],
            reserverAddress : [ { required: true, message: "详细地址必填", trigger: "change" } ]
        },
    };
  },
  created() {

  },
  methods: {
      init() {
          this.form ={
              reserverPrice: '',
              roomSize: '',
              galleryful: '',
              reserverAddress: '',
              icon: [],
              city: ['省', '', ''],
          }
          this.showIcons = [];
      },
      initProduct(data) {
          this.init();
          if (data.edtReserver) {
          // * @param reserverPrice 场地价格 Double 必填
          //     * @param roomSize 场地大小 Double 必填
          //     * @param galleryful 容纳人数 long 必填
          //     * @param city 场地所在城市，存放城市名称 String 必填
          //     * @param reserverAddress 场地详细地址 String 必填
              this.form =  {
                  reserverPrice: data.edtReserver.reserverPrice,
                  roomSize: data.edtReserver.roomSize,
                  galleryful: data.edtReserver.galleryful,
                  reserverAddress: data.edtReserver.reserverAddress,
                  icon: data.icon ? data.icon.split(',') : [],
                  showCitys: data.edtReserver.showCitys ? data.edtReserver.showCitys : ['省', '', ''],
                  city: ['省', '', ''],
              };
              this.form.icon.forEach((item)=> {
                  if (item && item.startsWith('http')) {
                    this.showIcons.push({url: item})
                  }
              })
              this.form.icon = this.showIcons;
              this.form.icon = this.showIcons;
              if (this.form.showCitys) {
                  this.form.city = this.form.showCitys.split(',');
              }
          }

          this.$forceUpdate();
      },
      returnForm() {
          let validStatus = false;
          this.$refs["form"].validate(valid => {
              if (valid) validStatus = true;
          })
          if (validStatus) {
              let data = this.$F.deepClone(this.form);
              data.city = data.city.join(',');
              return data;
          } else {
              return false;
          }
      },
      onSelected(data) {
          this.form.city[0] = data.province.value;
          this.form.city[1] = data.city.value;
          this.form.city[2] = data.area.value;
      },
      /**添加规格 */
      addSpecs() {
        // this.$set("form");

        this.form.spec.push({
          title: "",
          list: [{ name: "" }]
        });
      },

      //上传图片需要用到方法
      //预览图片
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.urlShowDialogVisible = true;
      },

      //上传成功回调
      mainPicSuccess: function (res, file, fileList) {
          if (res.code == 200) {
              this.form.icon.push({url: res.data});
          } else {
              this.$message.error(res.message);
          }
      },

      beforeUpload (file) {
          return this.$F.beforeUpload(this, file, 2)
      },

      /**删除图片 */
      handleRemove(file, fileList, c) {
          this.form.icon = fileList;
      },
  }
};
</script>
<style lang="less" >
</style>
