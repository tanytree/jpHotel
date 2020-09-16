<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 陶子修改于2020/9/14
 * @LastEditTime: 2020-07-10 17:43:49
 * @FilePath: /jiudian/src/views/market/booking/venue/c2.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div>
    <div>
      <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small" label-width="80px">
          <el-row>
            <el-form-item label="会议时间:">
              <el-radio-group v-model="searchForm.searchType">
                <el-radio-button label style="margin-right:10px">不限</el-radio-button>
                <el-radio-button label="1" style="margin-right:10px">当天</el-radio-button>
                <el-radio-button label="2" style="margin-right:10px">明天</el-radio-button>
                <el-radio-button label="3" style="margin-right:10px">后天</el-radio-button>
                <el-radio-button label="4" style="margin-right:10px">近7天</el-radio-button>
                <el-radio-button label="自定义" style="margin-right:10px">自定义</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="searchForm.searchType=='自定义'">
              <el-date-picker
                v-model="searchForm.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
              <span style="margin:0 5px">至</span>
              <el-date-picker
                v-model="searchForm.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:140px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="登记日期:">
              <el-date-picker
                v-model="searchForm.startTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:200px"
                placeholder="选择日期"
              ></el-date-picker>
              <span style="margin:0 5px">-</span>
              <el-date-picker
                v-model="searchForm.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                style="width:200px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="订单来源:">
              <el-select v-model="searchForm.orderSource" class="width150">
                <el-option
                  :value="key"
                  v-for="(item,key,index) of $t('commons.orderSource')"
                  :label="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客源类别:">
              <el-select v-model="searchForm.guestType" class="width150">
                <el-option
                  :value="key"
                  v-for="(item,key,index) of $t('commons.guestType')"
                  :label="item"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="预订人:">
              <el-input v-model="searchForm.content" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="房间号:">
              <el-input v-model="searchForm.content" class="width200"></el-input>
            </el-form-item>
            <el-form-item label="订单号:">
              <el-input v-model="searchForm.content" class="width200"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList">查询</el-button>
              <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="mini"
        >
          <el-table-column prop="enterName" label="名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="会议名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="会议开始-会议结束" show-overflow-tooltip width="180px"></el-table-column>
          <el-table-column prop="enterType" label="房间号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="会议厅" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="客源类别" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="订单来源" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterType" label="会议状态" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="{row}">
              <el-button type="text" @click="goDetail(row)" size="mini">详情</el-button>
              <el-button type="text" @click="meetClick(row)" size="mini">会议登记</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.pageIndex"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="searchForm.pageSize"
          layout=" sizes, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
      </el-card>
      <!-- 会议签到dialog -->
      <el-dialog top="0" title="会议签到" :visible.sync="dialogMeet" class="setCompanyForm">
        <el-form
          :model="addCompanyForm"
          ref="addCompanyForm"
          :rules="rules"
          label-width="100px"
          size="mini"
        >
          <el-row class="row">
            <el-col :span="11">
              <el-form-item label="来客姓名:" prop="enterName">
                <el-input v-model="addCompanyForm.enterName" style="width:180px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别:">
                <el-radio-group v-model="addCompanyForm.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-col :span="11" class="col">
              <el-form-item label="证件类型:" prop required>
                <el-select v-model="addCompanyForm.ruleAlldayId" style="width:180px">
                  <el-option
                    :label="item.ruleName"
                    :value="item.id"
                    v-for="(item,index) of alldayList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="证件号:" prop="creditLimit">
                <el-input v-model="addCompanyForm.creditLimit" style="width:180px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="手机号:">
            <el-input v-model="addCompanyForm.enterName" style="width:180px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:right">
          <el-button @click="dialogMeet=false">取消</el-button>
          <el-button type="primary" @click="dialogMeet_sure">确认</el-button>
        </div>
      </el-dialog>
    </div>
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
      dialogMeet: false,
      loading: false,
      searchForm: {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [{}], //表格数据
      addCompanyForm: {
        id: "",
        type: "",
        enterName: "",
        contactName: "",
        contactPhone: "",
        enterStrategyId: "",
        ruleAlldayId: "",
        creditLimit: "",
        shareFlag: "",
        state: "",
        effectiveStartTime: "",
        effectiveEndTime: "",
        getWay: "",
        salesId: "",
        bankCard: "",
        taxNum: "",
        contractNum: "",
        email: "",
        remark: "",
      },
      rules: {
        enterName: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
        ],
        contactName: [
          {
            required: true,
            message: "请填写联系人",
            trigger: "blur",
          },
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        enterStrategyId: [
          {
            required: true,
            message: "请选择价格策略",
            trigger: "change",
          },
        ],
        ruleAlldayId: [
          {
            required: true,
            message: "请选择计费规则",
            trigger: "change",
          },
        ],
        creditLimit: [
          {
            required: true,
            message: "请输入挂账额度",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择是否停用",
            trigger: "blur",
          },
        ],
      },
      alldayList: [],
      hotelenterAddAndEdit: false,
    };
  },

  created() {
    // this.initForm();
  },
  methods: {
    //点击会议签到  确认 按钮
    dialogMeet_sure() {
      this.dialogMeet = false;
    },
    //点击  会议登记 按钮
    meetClick(row) {
      this.dialogMeet = true;
    },
    //点击  详情  按钮
    goDetail(row) {
      this.$router.push({
        name: "c2detail",
        query: {
          id: "123456",
        },
      });
    },
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
      console.log("哎，接口没调");
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数据 */
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
