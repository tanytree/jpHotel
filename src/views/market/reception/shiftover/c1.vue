<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-15 19:43:31
 * @FilePath: \jiudian\src\views\market\reception\shiftover\c1.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="shiftOver">
    <el-row>
      <h3>预交班基本信息</h3>
      <el-row>
        <el-col :span="12">
          <div class="item">
            班次时间：2020/04/20 06:01:03 至 2020/04/20 16:10:00
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">班次号：2020-04-20-1</div>
        </el-col>
        <el-col :span="12">
          <div class="item">交班操作员：张三</div>
        </el-col>
        <el-col :span="12">
          <div class="item">当前模式：应收模式</div>
        </el-col>
      </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <h3>本班账务汇总信息</h3>
      <div class="total">收入总计：10000.00日元</div>
      <el-row class="padding-tb-10">
        <el-col :span="4">
          <div class="item">房费：<span class="red">8000.00</span>日元</div>
        </el-col>
        <el-col :span="4">
          <div class="item">
            迷你吧商品：<span class="red">8000.00</span>日元
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item">
            会员卡卡费：<span class="red">8000.00</span>日元
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item">其他：<span class="red">8000.00</span>日元</div>
        </el-col>
      </el-row>
      <div class="total">结算总计：6000.00日元</div>
      <el-row class="padding-tb-10">
        <el-col :span="3">
          <div class="item">挂账：<span class="blue">8000.00</span>日元</div>
        </el-col>
        <el-col :span="3">
          <div class="item">现金：<span class="blue">8000.00</span>日元</div>
        </el-col>
        <el-col :span="3">
          <div class="item">银行卡：<span class="blue">8000.00</span>日元</div>
        </el-col>
        <el-col :span="3">
          <div class="item">微信：<span class="blue">8000.00</span>日元</div>
        </el-col>
        <el-col :span="3">
          <div class="item">支付宝：<span class="blue">8000.00</span>日元</div>
        </el-col>
        <el-col :span="3">
          <div class="item">其它：<span class="blue">8000.00</span>日元</div>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <h3>
        本班现金上交&nbsp;&nbsp;<el-tag size="mini"
          >当前交班模式：应收模式</el-tag
        >
      </h3>
      <div class="handInCash margin-tb-10">
        <el-row class="padding-tb-10">
          <el-col :span="4" class="li">
            <div class="item">上班现金留存：-9900.00</div>
            <div class="item">本班现金上交：-100.00</div>
            <div class="item">本班现金留存：-10000.00</div>
          </el-col>
          <el-col :span="4" class="li">
            <div class="item">上班微信留存：0.00</div>
            <div class="item">本班微信上交：100.00</div>
            <div class="item">本班微信留存：100.00</div>
          </el-col>
          <el-col :span="4" class="li">
            <div class="item">上班支付宝留存：0.00</div>
            <div class="item">本班支付宝上交：100.00</div>
            <div class="item">本班支付宝留存：100.00</div>
          </el-col>
          <el-col :span="4" class="li">
            <div class="item">上班银行卡留存：0.00</div>
            <div class="item">本班银行卡上交：100.00</div>
            <div class="item">本班银行卡留存：100.00</div>
          </el-col>
        </el-row>
        <el-row class="ftRow">本班走结订单金额：6000.00</el-row>
      </div>
    </el-row>
    <el-row>
      <h3>本班报表</h3>
      <el-row>
        <el-col :span="4">
          <div class="item">
            交班报表(按班次)&nbsp; &nbsp;<el-button size="mini">预览</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="item">
            交班报表(按收银员)&nbsp; &nbsp;<el-button size="mini"
              >预览</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row style="text-align: center">
      <elForm inline size="small">
<!--        <el-form-item :label="$t('commons.checkInTypeDesc')">-->
<!--          <el-select v-model="form.text">-->
<!--            <el-option label="正常" value="1"></el-option>-->
<!--            <el-option label="不正常" value="2"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="">
          <el-button type="primary" class="submit">{{ $t('commons.confirm') }}</el-button>
        </el-form-item>
      </elForm>
    </el-row>
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
      loading: false,
      form: {
        text: "",
      },
      list: [
        {
          type: "",
          name: "营业日报",
        },
        {
          type: "",
          name: "营业月报",
        },
        {
          type: "",
          name: "营业年报",
        },
        {
          type: "",
          name: "现金流明细表",
        },
        {
          type: "",
          name: "迷你吧销售报表",
        },
        {
          type: "",
          name: "结账汇总报表",
        },
        {
          type: "",
          name: "结账明细报表",
        },
        {
          type: "",
          name: "会员卡积分兑换报表",
        },
        {
          type: "",
          name: "单位挂账明细表",
        },
        {
          type: "",
          name: "单位挂账汇总表",
        },
        {
          type: "",
          name: "销售员业绩明细表",
        },
        {
          type: "",
          name: "销售员业绩汇总表",
        },
      ],
    };
  },

  mounted() {
    // this.initForm();
  },
  methods: {
    initForm() {
      this.searchForm = {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.searchForm.token = this.token;
      this.searchForm.plat_source = this.plat_source;
      this.searchForm.userId = this.userId;
      console.log(JSON.stringify(this.searchForm));
      this.loading = true;
      enterprise_list(this.searchForm).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data;
          this.listTotal = res.data.total;
        }
      });
    },
    /**编辑 */
    editRowItem(row) {
      // 加载组件
      this.showEdit = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.editRef.initdata(row.id);
      });
    },

    handelRowItem(row) {
      // 加载组件
      this.showDetail = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.detailRef.initdata(row.id);
      });
    },

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0 0 10px;
}

.shiftOver h3 {
  margin: 0;
  font-size: 16px;
  line-height: 40px;
}

.shiftOver .red {
  color: red;
}

.shiftOver .blue {
  color: #126eff;
}

.shiftOver .total {
  background: #f7f7f7;
  color: #333;
  padding: 10px 10px;
}

.shiftOver .item {
  font-size: 14px;
  padding: 10px 0;
}

.shiftOver .handInCash {
  border: 1px solid #eee;

  .el-row {
    width: auto;
  }
}

.shiftOver .handInCash .li {
  border-right: 1px solid #eee;
  padding: 0 10px;
}

.shiftOver .handInCash .li:last-child {
  border: 0;
}

.shiftOver .handInCash .ftRow {
  background: #f6f7f7;
  color: #333;
  padding: 10px 10px;
}
</style>
