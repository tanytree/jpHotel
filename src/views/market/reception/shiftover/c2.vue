<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-14 20:14:30
 * @FilePath: \jiudian\src\views\market\reception\shiftover\c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking flex_column">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item label="班次时间">
          <el-date-picker
            v-model="searchForm.workStarTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            placeholder="选择日期"
          ></el-date-picker>
          <span> 至 </span>
          <el-date-picker
            v-model="searchForm.workEndTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 200px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="当班人">
          <el-input v-model="searchForm.employer" class="width200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList"
            >查询</el-button
          >
          <el-button type="primary" class="white" @click="initForm"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" class="submit">合计</el-button>
          <el-button type="primary" class="submit">补打</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          label="基本信息"
          fixed="left"
          align="center"
          width="255px"
        >
          <el-table-column prop="createTime" label="班次"> </el-table-column>
          <el-table-column label="开始-结束" width="100px">
            <template slot-scope="{ row }">
              <div>
                <span style="color: #126eff; margin-right: 2px">开</span
                >{{ row.workStarTime }}
              </div>
              <div>
                <span style="color: #df1e1e; margin-right: 2px">结</span
                >{{ row.workEndTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="handoveEmployeedId" label="当班人">
          </el-table-column>
        </el-table-column>
        <el-table-column label="本班全责汇总" align="center">
          <el-table-column label="现金"
            ><template slot-scope="{ row }">
              <div>
                {{ row.nowMoneyRetained }}
                <span @click="lookDetail(row)"
                  ><i class="el-icon-view"></i
                ></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="挂账"> </el-table-column>
          <el-table-column prop="nowWeixinRetained" label="微信">
          </el-table-column>
          <el-table-column prop="nowAliRetained" label="支付宝">
          </el-table-column>
          <el-table-column prop="createTime" label="其它"> </el-table-column>
          <el-table-column prop="createTime" label="房费"> </el-table-column>
          <el-table-column prop="createTime" label="迷你吧"> </el-table-column>
          <el-table-column prop="createTime" label="会员卡卡费" width="100px ">
          </el-table-column>
          <el-table-column prop="createTime" label="餐饮费"> </el-table-column>
          <el-table-column prop="createTime" label="商品费"> </el-table-column>
          <el-table-column prop="createTime" label="其他收入">
          </el-table-column>
        </el-table-column>
        <el-table-column label="现金模式" align="center">
          <el-table-column
            prop="nowMoneyHandin"
            label="本班现金上交"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="nowWeixinHandin"
            label="本班微信上交"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="nowAliHandin"
            label="本班支付宝上交"
            width="120px"
          >
          </el-table-column>
          <el-table-column
            prop="goSettlement"
            label="本班走结订单金额"
            width="140px"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="实际交班存留金额"
            width="140px"
          >
          </el-table-column>
          <el-table-column prop="createTime" label="下放实际金额" width="120px">
          </el-table-column>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        layout="total, prev, pager, next, jumper"
        :page-size="searchForm.pageSize"
        :total="listTotal"
      ></el-pagination>
    </div>
    <!-- 现金统计查看dialog -->

    <el-dialog
      top="0"
      :visible.sync="lookMoney"
      class="liveInPersonDia"
      title="现金统计查看"
      width="80%"
    >
      <div class="dialog_top">
        PMS统计本班现金收入：<span>1000.00</span>日元
      </div>
      <div class="dialog_middle">
        <div class="middle_text">五百日元：<span>1</span>张</div>
        <div class="middle_text">一百日元：<span>4</span>张</div>
        <div class="middle_text">五十日元：<span>2</span>张</div>
      </div>
      <el-divider></el-divider>
      <div class="dialog_bot">
        平衡数=<span>0</span>（平衡数=实际现金收入-PMS统计现金收入）
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="lookMoney = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      lookMoney: false,
      loading: false,
      searchForm: {
        workStarTime: "",
        workEndTime: "",
        employer: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      },
      listTotal: 0, //总条数
      tableData: [], //表格数据
      itemInfo: null,
    };
  },

  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      this.searchForm = {
        workStarTime: "",
        workEndTime: "",
        employer: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.$F.doRequest(
        this,
        "/pms/handover/handover_list_list",
        this.searchForm,
        (res) => {
          console.log(res);
          this.tableData = res.handoverListList;
          this.listTotal = res.page.count;
        }
      );
    },
    //点击眼睛图标
    lookDetail(row) {
      this.itemInfo = row;
      this.lookMoney = true;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.searchForm.pageIndex = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.pageIndex = val;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped>
.dialog_top {
  color: rgba(51, 51, 51, 100);
  font-size: 16px;
  font-weight: 500;
  span {
    color: #1872ff;
  }
  margin-bottom: 25px;
}
.dialog_middle {
  color: rgba(30, 30, 30, 100);
  font-size: 16px;
  .middle_text {
    margin-bottom: 15px;
    span {
      color: #1872ff;
      margin-left: 20px;
    }
  }
}
.dialog_bot {
  color: rgba(51, 51, 51, 100);
  font-size: 16px;
  font-weight: 500;
  span {
    color: red;
    margin-right: 12px;
  }
}
</style>