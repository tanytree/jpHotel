<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-02 15:42:51
 * @FilePath: \jiudian\src\views\market\orders\coms\sideOrder.vue
 -->
<template>
  <el-dialog
    top="0"
    :title="$t('desk.side_sideBooked')"
    :visible.sync="visible"
    :lock-scroll="false"
    width="80%"
  >
    <el-dialog
      width="50%"
       :title="$t('desk.side_changePackage')"
      top="0"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form ref="innerForm" :model="innerForm">
        <el-form-item label="早餐:">
          <el-radio-group v-model="innerForm.breakfast">
            <el-radio label="">无</el-radio>
            <el-radio label="1">A套餐【¥2000】</el-radio>
            <el-radio label="2">B套餐【¥3000】</el-radio>
            <el-radio label="3">C套餐【¥4000】</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
    <div class="topBox">
      <div class="fontStyle">
        注：建议不要随意重新入账，容易出现重复的，建议仔细核对后再重新入账
      </div>
      <el-button type="primary">追加套餐</el-button>
    </div>
    <el-table
      header-row-class-name="default"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="就餐时间" width="150">
      </el-table-column>
      <el-table-column prop="name" label="客人类型" width="120">
      </el-table-column>
      <el-table-column prop="address" label="套餐类型" width="120">
      </el-table-column>
      <el-table-column prop="address" label="套餐【价格】" width="150">
      </el-table-column>
      <el-table-column prop="address" label="入账状态" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="text">重新入账</el-button>
          <el-button type="text" @click="innerVisible = true"
            >更换套餐</el-button
          >
          <el-button type="text">入账</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
  props: ["detailData", "currentRoom"],
  data() {
    return {
      visible: false,
      loading: true,
      innerVisible: false, //内层dialog  更换套餐
      checkInId: "",
      innerForm: {
        breakfast: "",
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  methods: {
    async init(checkInId) {
      this.checkInId = checkInId;
      this.getData();
      this.visible = true;
    },
    getData() {
      let params = {
        checkInId: this.checkInId,
      };
      this.$F.doRequest(this, "/pms/hotelattachmeal/check_in_meal_order_list", params, (res) => {
        console.log(res);
        // 这个接口需要后端改一下，暂时无法继续了
      });
    },
    
  },
};
</script>

<style lang='less' scoped>
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .fontStyle {
    color: rgba(126, 126, 126, 100);
    font-size: 13px;
  }
}
.dialog-footer {
  text-align: right;
}

</style>
