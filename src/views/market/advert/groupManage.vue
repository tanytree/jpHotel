/* * @Author: Dana     *@Date: 2020-03-13 13:50:56  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-13 13:50:56  */
<template>
  <div class="sec1">
    <el-card>
      <el-form :model="form" :inline="true" class="top-body" size="small" label-width="80px">
        <el-form-item label="买家名称">
          <el-input v-model="form.keywords" style="width:150px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.out_trade_no" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="请选择"
            style="width:140px"
            value-format="yyyy-MM-dd"
            class="dateBox"
            v-model="form.start_time"
          ></el-date-picker>
          <span>-</span>
          <el-date-picker
            type="date"
            placeholder="请选择"
            style="width:140px"
            value-format="yyyy-MM-dd"
            class="dateBox"
            v-model="form.end_time"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button @click="form.page=1;getDataList()" type="primary">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <el-tabs class="subTab" v-model="form.status" @tab-click="handleClick">
        <el-tab-pane label="已入住" name="2"></el-tab-pane>
        <el-tab-pane label="申请中" name="1"></el-tab-pane>
        <el-tab-pane label="被拒绝" name="3"></el-tab-pane>
      </el-tabs>
      <div class="components-edit">
        <div class="components-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;padding: 8px 0 ! important;"
            :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandle"
          >
            <el-table-column prop="out_trade_no" label="商品" width="220" show-overflow-tooltip>
              <template slot-scope="{row}">
                <div>订单编号{{ row.out_trade_no }}</div>
                <img
                  style="margin-right:8px"
                  v-for="(item,index) in row.list"
                  :key="index"
                  :src="item.thumb"
                  class="goodsImg"
                />
              </template>
            </el-table-column>
            <el-table-column prop="number" sortable label="数量" show-overflow-tooltip></el-table-column>
            <el-table-column prop="group_popularity_count" label="人气指数" show-overflow-tooltip></el-table-column>

            <el-table-column prop="group_status" sortable label="村状态">
              <template slot-scope="{row}">
                <el-button type="danger" size="mini" v-if="row.group_status==2">已解体</el-button>
                <el-button type="success" size="mini" v-else-if="row.group_status==1">正常</el-button>
              </template>
            </el-table-column>
            <el-table-column width="200" align="ceneter" label="操作">
              <template slot-scope="{row}">
                <el-button
                  type="text"
                  v-if="row.group_status==1&&row.status==1"
                  @click="deleGroup(row.id)"
                  size="mini"
                >取消入驻</el-button>
                <el-button type="text" v-if="row.group_status==2&&row.status==2" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="padding:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="form.page_num"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
      <el-dialog title="收货地址" :close-on-click-modal="false" :visible.sync="addressShow">
        <el-form size="small">
          <el-form-item label>{{addressInfo.name}} {{addressInfo.phone}}</el-form-item>
          <el-form-item label>{{addressInfo.address}}</el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="立即发货" :close-on-click-modal="false" :visible.sync="postShow">
        <el-form
          :model="editform"
          validate-on-rule-change
          :rules="dataRule"
          ref="dataForm"
          size="small"
        >
          <el-form-item label="物流公司" prop="shipper_code">
            <el-select v-model="editform.shipper_code" style="width:200px" placeholder="请选择">
              <el-option
                v-for="item in logisticList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号" prop="logistic_code">
            <el-input style="width:200px" v-model="editform.logistic_code" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="postShow = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="物流信息" :close-on-click-modal="false" :visible.sync="tracesShow">
        <el-timeline reverse>
          <el-timeline-item
            v-for="(activity, index) in Traces"
            :key="index"
            :timestamp="activity.AcceptTime"
          >{{activity.AcceptStation}}</el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { get_co_group_list, del_co_group } from "@/utils/api/market";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      logisticList: state => state.config.logisticList
    }),
    logistic() {
      let name = "";
      let nameList = this.logisticList.filter(
        item => item.value == this.editform.shipper_code
      );
      if (nameList[0] && nameList[0].name) {
        name = nameList[0].name;
      }
      return name;
    }
  },
  data() {
    return {
      editform: {
        logistic_code: "",
        shipper_code: ""
      },
      Traces: [], //物流信息
      tracesShow: false, //物流信息
      showTop: false,
      tableData: [],
      addressInfo: {},
      postShow: false,
      shipper_code: "",
      logistic_code: "",
      orderId: "",
      addressShow: false,

      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      form: {},
      dataRule: {
        logistic_code: [
          { required: true, message: "快递单号不能为空", trigger: "blur" }
        ],
        shipper_code: [
          { required: true, message: "请选择物流公司", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.resetForm();
    this.getDataList();
    console.log(this.logistic);
  },
  methods: {
    resetForm() {
      this.form = {
        page: 1,
        page_num: 10,
        start_time: "",
        status: "2",
        keywords: "",
        end_time: "",
        out_trade_no: ""
      };
    },
    /**获取列表数据 */
    getDataList() {
      this.dataListLoading = true;
      get_co_group_list(this.form)
        .then(data => {
          this.dataListLoading = false;
          if (data.code == 200) {
            this.tableData = data.data.list;
            this.totalPage = data.data.total;
          } else {
            this.tableData = [];
            this.totalPage = 0;
          }
        })
        .catch(() => {
          this.dataListLoading = false;
          this.$message.error("服务器错误，请联系管理员");
        });
    },
    handleClick(val) {
      this.form.page = 1;
      this.getDataList();
    },
    /**取消  / 删除入驻 */
    deleGroup(id) {
      del_co_group({ id: id }).then(res => {
        if (res.code == 200) {
          this.postShow = false;
          this.getDataList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /**发货 */
    dataFormSubmit() {
      //   console.log(this.orderId);
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          del_co_group({
            co_order_id: this.orderId,
            logistic_code: this.editform.logistic_code,
            logistic: this.logistic,
            shipper_code: this.editform.shipper_code
          }).then(res => {
            if (res.code == 200) {
              this.postShow = false;
              this.getDataList();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    /**查看收货地址 */
    lookAddress(item) {
      this.addressInfo = item;
      this.addressShow = true;
    },
    /**新增 / 修改 */
    addOrUpdateHandle(id) {
      this.$emit("editShop", id);
    },
    /**删除 */
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          del_goods_info({ id: ids }).then(data => {
            if (data && data.code == 200) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        })
        .catch(() => {});
    },
    /**商品上下架 */
    changeStatus(data) {
      edit_goods_status({
        id: data.id,
        status: data.status == "1" ? "2" : "1"
      }).then(res => {
        if (res.code == 200) {
          this.getDataList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 每页数
    handleSizeChange(val) {
      this.form.page_num = val;
      this.form.page = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.form.page = val;
      this.getDataList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
