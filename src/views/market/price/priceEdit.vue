<template>
  <el-dialog top="0" title="价格编辑" width="920px" :close-on-click-modal="false" :visible.sync="visible">
    <el-table border size="mini" :data="dataList">
      <el-table-column prop="title" label="规格" show-overflow-tooltip></el-table-column>
      <el-table-column label="零售价">
        <template slot-scope="{row}">
          <el-input class="inputBox" size="mini" v-model="row.old_price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="一口价">
        <template slot-scope="{row}">
          <el-input class="inputBox" size="mini" min="0" type="number" v-model="row.price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="成本价">
        <template slot-scope="{row}">
          <el-input class="inputBox" size="mini" v-model="row.cost_price" placeholder="请输入"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="partner_price" width="150px" label="代理价" show-overflow-tooltip>
        <template slot-scope="{row}">
          <div v-for="(item,index) in row.agent_price" :key="index" style="margin-bottom:5px">
            <span>等级{{index+1}}</span>
            <el-input class="inputBox" size="mini" v-model="item.agent_price" placeholder="请输入"></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
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
      dataList: [],
      dataListSelections: [],
      uploadMeg: "",
      goods_id: ""
    };
  },
  methods: {
    init(id) {
      this.goods_id = id;
      this.$http({
        url: this.$http.adornUrl("/market/goods_price/get_goods_option_all"),
        method: "post",
        data: this.$http.adornData({
          goods_id: id
        })
      }).then(data => {
        console.log(data);
        if (data.code == 200) {
          this.dataList = data.data;
        }

        this.visible = true;
      });
    },
    // 下载模版
    dataFormSubmit() {
      this.$http({
        url: this.$http.adornUrl("/market/goods_price/edit_goods_option"),
        method: "post",
        data: this.$http.adornData({
          goods_id: this.goods_id,
          option: JSON.stringify(this.dataList)
        })
      }).then(data => {
        if (data && data.code == 200) {
          this.$message({
            message: this.$t('commons.request_success'),
            type: "success",
            duration: 1500,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            }
          });
        } else {
          this.$message.error(data.message);
        }
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
.inputBox {
  width: 100px;
}
</style>
