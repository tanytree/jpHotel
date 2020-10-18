<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-14 20:32:18
 * @FilePath: /cloudAdmin/src/views/sale/order/Personer.vue
 -->
 <template>
  <div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="买家名称">
            <el-input v-model="form.userName" style="width:100px" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单类型">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预订" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单编号">
            <el-input v-model="form.orderNumber" style="width:110px" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="创建时间">
            <el-date-picker
              type="date"
              placeholder="请选择"
              style="width:140px"
              value-format="yyyy-MM-dd"
              class="dateBox"
              v-model="form.startTime"
            ></el-date-picker>
            <span>-</span>
            <el-date-picker
              type="date"
              placeholder="请选择"
              style="width:140px"
              value-format="yyyy-MM-dd"
              class="dateBox"
              v-model="form.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-left:16px">
        <el-button @click="queryCourseList(form)" plain type="primary">查询</el-button>
        <el-button @click="resetForm" plain type="primary">重置</el-button>
      </el-form-item>
    </el-form>
    <el-tabs class="subTab" v-model="status" @tab-click="handleClick(status)">
      <el-tab-pane label="全部" name></el-tab-pane>
      <el-tab-pane label="待付款" name="1"></el-tab-pane>
      <el-tab-pane label="交易成功" name="2"></el-tab-pane>
    </el-tabs>
    <div class="components-edit">
      <div class="components-table">
        <el-table
          height="250px"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;padding: 8px 0 ! important;"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="mini"
        >
          <el-table-column prop="courseName" width="150" label="产品" show-overflow-tooltip>
            <template slot-scope="{row}">
              <img style="margin-right:8px" :src="chooseIcon(row)" class="goodsImg" />
              <span v-if="row.modelType==1&&row.activityId">{{row.edtCourse.courseName}}</span>
              <span v-if="row.modelType==1&&!row.activityId">{{row.edtCourse.courseName}}</span>
              <span v-if="row.modelType==2">{{row.edtReserver.reserverName}}</span>
              <span v-if="row.modelType==3">{{row.edtShow.showName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" width="100" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderNumber" width="100" label="订单编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderPrice" align="center" label="价格" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orderTotal" width="100" label="数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="edtUser" width="100" label="买家" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div>{{row.edtUser.nickname}}</div>
              <div v-if="row.memberType==0">普通用户</div>
              <div v-else-if="row.memberType==2">超级会员</div>
              <div v-else>会员</div>
            </template>
          </el-table-column>
          <el-table-column prop="modelType" width="120" label="订单类型">
            <template slot-scope="{row}">
              <div v-if="row.modelType==1">当前课程</div>
              <div v-else-if="row.modelType==3">演出门票</div>
              <div v-else-if="row.modelType==2">场地预订</div>
              <div v-else>活动项目课程</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderStatus" width="100" label="订单状态">
            <template slot-scope="{row}">
              <div v-if="row.orderStatus==1">待支付</div>
              <div v-else-if="row.orderStatus==2">交易成功</div>
              <div v-else-if="row.orderStatus==3">交易关闭</div>
              <div v-else-if="row.orderStatus==4">申请退款</div>
            </template>
          </el-table-column>
          <el-table-column prop="orderRealPay" width="100" label="付款价格"></el-table-column>
          <el-table-column align="ceneter" label="操作">
            <template slot-scope="{row}">
              <el-button type="text" size="mini" @click="getOrderDetail(row)">订单详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="padding:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total,  prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  get_goods_list,
  edit_goods_status,
  del_goods_info
} from "@/utils/api/market";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      tableData: [],
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {}
    };
  },
  created() {
    this.resetForm();
    this.fetchGoodList();
  },
  methods: {
    //选择产品图片
    chooseIcon(row) {
      if (row.modelType == 1) {
        return row.edtCourse.courseIcon;
      }
      if (row.modelType == 2) {
        return row.edtReserver.reserverIcon;
      }
      if (row.modelType == 3) {
        return row.edtShow.showIcon;
      }
    },
    resetForm(query) {
      console.log(query);
      this.form = {
        userName: "", //买家名称
        orderType: "", //订单类型
        orderNumber: "", //订单编号
        startTime: "", //交易开始时间
        endTime: "", //交易结束时间
        orderStatus: "", //订单状态
        listType: 1
      };
      console.log(this.form);
      this.pageIndex = 1;
      this.pageSize = 8;
      this.totalPage = 0;
      if (query) this.fetchGoodList();
    },

    /**新增 / 修改 */
    addOrUpdateHandle(id) {
      this.$emit("editShop", id);
    },
    /**删除 */
    deleteHandle(data) {
      var ids =
        data && data.id
          ? [data.id]
          : this.dataListSelections.map(item => {
              return item.id;
            });
      var nameS =
        data && data.title
          ? [data.title]
          : this.dataListSelections.map(item => {
              return item.title;
            });
      this.$confirm((data && data.id) ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.newApi("/home/market/goods/del_goods_info"),
            method: "post",
            data: this.$http.adornData({ id: ids })
          }).then(data => {
            if (data && data.code == 200) {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.fetchGoodList();
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        })
        .catch(() => {});
    },
    changeMStatus(status) {
      var ids = this.dataListSelections.map(item => {
        return item.id;
      });
      this.changeStatus(ids.join(","), status);
    },
    /**商品上下架 */
    changeStatus(id, status) {
      this.$http({
        url: this.$http.newApi("/home/market/goods/edit_goods_status"),
        method: "post",
        data: this.$http.adornData({ id: id, status: status })
      }).then(res => {
        if (res.code == 200) {
          this.fetchGoodList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /*点击切换*/
    handleClick(status) {
      console.log(status);
      if (status == 0) {
        this.form.orderStatus = "";
      } else {
        this.form.orderStatus = this.status;
      }
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    //点击查询
    queryCourseList(form) {
      this.form.listType = 1;
      console.log(form);
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    /**获取列表数据 */
    fetchGoodList(params = {}) {
      console.log(this.pageIndex);
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
        // shelvesStatus: this.form.shelvesStatus,
      });
      this.$F.merge(params, this.form);
      this.$F.doRequest(
        this,
        "/edt/adminsystem/scores_order_list",
        params,
        data => {
          this.tableData = data.list;
          this.totalPage = data.totalSize;
        }
      );
    },
    //点击详情跳转
    getOrderDetail(data) {
      // this.$router.push("./orderInfo",)
      this.$router.push({ path: "/orderInfo", query: { index: data } });
    },
    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageSize = 8;
      this.pageIndex = val;
      this.fetchGoodList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },

    authCheckAble(row) {
      return row.shelvesStatus !== 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodsImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.top-close {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 20px;
  font-size: 14px;
  i {
    margin-left: 8px;
  }
}
.shopStatus {
  color: rgba(9, 109, 217, 1);
  font-size: 12px;
}
.top-body {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 1);
}

.components-edit {
  margin-top: 10px;

  .components-table {
    border: 1px solid #e6e6e6;
  }
  .block {
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-all {
      font-size: 12px;
      color: #666666;
      letter-spacing: 2px;
    }
  }
}
</style>


