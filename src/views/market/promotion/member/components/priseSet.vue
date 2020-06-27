<!--
 * @Date: 2020-04-22 13:16:45
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-23 10:18:54
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/components/priseSet.vue
 -->
<template>
  <el-dialog width="800px" :close-on-click-modal="false" :visible.sync="visible" title="编辑">
    <el-form size="mini" inline label-position="right">
      <el-table ref="multipleTable" :data="prizeList" size="mini">
        <el-table-column label="奖品名称" width="120px">
          <template slot-scope="{row}">
            <el-input size="small" v-model="row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="奖品图片" width="80px">
          <template slot-scope="{row,$index}">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :data="uploadData"
              :show-file-list="false"
              :on-success="(res, file)=>handleSuccess(res, file,$index)"
              :before-upload="beforeUpload"
            >
              <el-image v-if="row.image_url" style="width: 30px; height: 30px" :src="row.image_url"></el-image>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column label="奖品内容">
          <template slot-scope="{row}">
            <el-select size="small" style="width:120px" v-model="row.prize_type">
              <el-option
                v-for="(item,index) in enterprisesScales"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
            <span style="margin-left:5px"></span>
            <el-form-item v-if="row.prize_type==3" label="积分">
              <el-input style="width:60px" v-model="row.score"></el-input>
            </el-form-item>
            <el-form-item v-if="row.prize_type==2" label="优惠券">
              <el-select
                v-model="row.coupon_id"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in couponList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column label="奖品数量" width="80px">
          <template slot-scope="{row}">
            <el-input size="small" v-model="row.num"></el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column label="位置">
          <template slot-scope="{row}">
            <el-input size="small" disabled v-model="row.position"></el-input>
          </template>
        </el-table-column>-->
        <el-table-column label="中奖概率" width="80px">
          <template slot-scope="{row}">
            <el-input size="small" v-model="row.probability"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="editFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      action: "",
      uploadData: { type: "2" },
      prizeList: [],
      editForm: {},
      enterprisesScales: [
        { name: "物品奖品 ", value: 1 },
        { name: "优惠券", value: 2 },
        { name: "积分奖励", value: 3 },
        { name: "未中奖", value: 4 }
      ],
      loading: false,
      couponList: [],
      visible: false
    };
  },
  methods: {
    resetList() {
      for (let index = 0; index < 8; index++) {
        this.prizeList.push({
          name: "",
          image_url: "",
          num: 1,
          probability: 0,
          position: index + 1,
          score: "0.00",
          coupon_id: "",
          prize_type: 4
        });
      }
    },
    initData(id) {
      this.action = this.$http.adornUrl("/market/upload/upload");
      this.getCouponList("");
      if (id) {
        this.editForm.id = id;
        this.$http({
          url: this.$http.adornUrl("/market/score/get_prize_list"),
          method: "post",
          data: this.$http.adornData({ id: id })
        }).then(res => {
          if (res.code == 200) {
            this.prizeList = res.data.map(item => {
              return {
                id: item.id,
                name: item.name,
                image_url: item.image_url,
                num: item.num,
                probability: item.probability,
                position: item.position,
                score: item.score,
                coupon_id: item.coupon_id,
                prize_type: item.type == 2 ? 4 : item.prize_type
              };
            });
            if (res.data.length !== 8) {
              this.resetList();
            }
          } else {
            this.resetList();
            this.$message.error(res.message);
          }
          this.visible = true;
        });
      } else {
        /**初始化表单 */
        this.resetList();
        this.visible = true;
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 4;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return isLt2M;
    },
    getCouponList(keyword) {
      this.$http({
        url: this.$http.adornUrl("/market/coupon/get_coupon_list"),
        method: "post",
        data: this.$http.adornData({ keyword: keyword, page: 1, page_num: 20 })
      }).then(res => {
        this.couponList = res.data.list;
      });
    },
    remoteMethod(res) {
      // console.log(res);
      this.getCouponList(res);
    },
    handleSuccess(res, file, index) {
      if (res.code == 200) {
        this.prizeList.forEach((element, i) => {
          if (i == index) {
            this.$set(element, "image_url", res.data.file_url);
          }
        });
      } else {
        this.$message.error(res.message);
      }
    },
    editFormSubmit() {
      this.$http({
        url: this.$http.adornUrl("/market/score/edit_prize"),
        method: "post",
        data: this.$http.adornData({raffle_id:this.editForm.id, list: JSON.stringify(this.prizeList) })
      }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
        this.visible = false;
      });
    }
  }
};
</script>

<style>
</style>
