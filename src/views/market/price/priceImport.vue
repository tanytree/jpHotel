<template>
  <el-dialog top="0" title="导入价格" :close-on-click-modal="false" :visible.sync="visible">
    <el-upload
      v-if="!uploadDone"
      action="https://www.i2b2b.com/public/index.php/market/goods_price/add_goods_excel_price"
      :on-success="onSsuccess"
      :show-file-list="false"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传xls,xlsx,csv格式文件，且不超过10M</div>
    </el-upload>
    <div v-if="uploadDone" style="text-align:center">
      <div v-if="uploadSuccess">
        <i class="el-icon-success" style="font-size:50px;color:#126EFF"></i>
        <span></span>
      </div>
      <div v-if="!uploadDone">
        <i class="el-icon-error" style="font-size:50px;color:#FF684A"></i>
      </div>
      <div>{{uploadMeg}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="downLoadTemp">下载模版</el-button>
      <el-button type="primary" v-if="uploadDone" @click="uploadDone = false">重新导入</el-button>
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      uploadDone: false,
      uploadSuccess: false,

      dataListSelections: [],
      uploadMeg: ""
    };
  },
  methods: {
    init(data) {
      this.uploadDone = false;
      this.dataListSelections = data;
      this.visible = true;
    },
    // 下载模版
    downLoadTemp() {
      var ids = this.dataListSelections.map(item => {
        return item.id;
      });
      this.$http.exportFile("/market/goods_price/export2Excel", {
        goods_id: ids.join(",")
      });
    },
    //上传成功回掉
    onSsuccess(res, file, fileList) {
      this.uploadMeg = res.message;
      this.uploadDone = true;
      if (res.code == 200) {
        this.uploadSuccess = true;
        this.$emit("refreshDataList");
      } else {
        this.uploadSuccess = false;
      }
    }
  }
};
</script>

<style>
</style>
