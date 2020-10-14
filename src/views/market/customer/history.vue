<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 10:56:04
 * @FilePath: \jiudian\src\views\market\customer\history.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item label="创建门店">
          <el-select v-model="searchForm.storesNum" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="item in storeList"
              :key="item.storesNum"
              :label="item.storesName"
              :value="item.storesNum"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客人类型">
          <el-radio-group v-model="searchForm.guestType" class="width300">
            <el-radio
              v-for="(value, key, index) of $t('commons.guestType')"
              :label="key"
              :key="index"
              >{{ value }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="黑名单">
          <el-select v-model="searchForm.isBlacklist" class="width150">
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(label, value) in $t('frontOffice.isBlacklist')"
              :label="label"
              :value="value"
              :key="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="手机号">
          <el-input v-model="searchForm.mobile" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            v-model="searchForm.idcardType"
            placeholder="请选择证件类型"
            class="width300"
          >
            <el-option label="全部" value></el-option>
            <el-option
              v-for="(label, value) in $t('commons.idCardType')"
              :label="label"
              :value="value"
              :key="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="searchForm.idcard" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">查询</el-button>
          <el-button type="primary" class="white" @click="initForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain>读会员卡</el-button>
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
          prop="name"
          align="center"
          label="姓名"
          width="120"
        ></el-table-column>
        <el-table-column prop="sex" align="center" label="性别" width="100">
          <template slot-scope="{ row }">{{ row.sex | F_sex }}</template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="idcardType"
          align="center"
          label="证件类型"
          width="120"
        >
          <template slot-scope="{ row }">{{
            row.idcardType | F_idcardType
          }}</template>
        </el-table-column>
        <el-table-column
          prop="idcard"
          label="证件号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="birthday"
          align="center"
          label="生日"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="guestType"
          align="center"
          label="客人类型"
          width="100"
        >
          <template slot-scope="{ row }">{{
            F_guestType(row.guestType)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="memberCard"
          align="center"
          label="会员卡卡号"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="storesNum" label="所属门店">
          <template slot-scope="{ row }">{{
            F_storeName(row.storesNum)
          }}</template>
        </el-table-column>
        <el-table-column align="center" label="累计消费" width="100">
          <template slot-scope="{ row }">{{
            row.consumeTotalPrice ? row.consumeTotalPrice : "0"
          }}</template>
        </el-table-column>
        <el-table-column
          prop="isBlacklist"
          align="center"
          label="是否黑名单"
          width="120"
        >
          <template slot-scope="{ row }">{{
            row.isBlacklist == 2 ? "是" : "否"
          }}</template>
        </el-table-column>
        <el-table-column prop label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleHistory(row)"
              >客史</el-button
            >
            <el-button type="text" size="mini" @click="handleDetail(row)"
              >详情</el-button
            >
            <el-dropdown>
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleEdit(row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="!row.memberCard"
                  @click.native="changeIntoMember(row)"
                  >转为会员</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="handelblacklist(row)"
                  v-if="row.isBlacklist != 2"
                  >拉黑</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-size="searchForm.page_num"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑or详情弹窗 -->
    <el-dialog
      top="0"
      :title="detailForm.type == 'add' ? '转为会员' : '详情'"
      :visible.sync="setMemberFormVisible"
      class="setMemberForm"
      width="60%"
    >
      <el-form
        :model="detailForm"
        :rules="detailForm.type == 'add' ? rules : {}"
        ref="setMemberForm"
        label-width="100px"
        size="mini"
      >
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="姓名：" class prop="name">
                <el-input
                  v-model="detailForm.name"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.name }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="电话：" class prop="mobile">
                <el-input
                  v-model="detailForm.mobile"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.mobile }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="证件类型：" class prop="idcardType">
                <el-select
                  v-model="detailForm.idcardType"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="(label, value) in $t('commons.idCardType')"
                    :label="label"
                    :value="value"
                    :key="value"
                  ></el-option>
                </el-select>
                <template v-else>{{
                  detailForm.idcardType | F_idcardType
                }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="证件号：" class prop="idcard">
                <el-input
                  v-model="detailForm.idcard"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.idcard }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="会员卡号：" class prop="memberCard">
                <el-input
                  v-model="detailForm.memberCard"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.memberCard }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="会员类型：" class prop="memberTypeId">
                <el-select
                  v-model="detailForm.memberTypeId"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="item in smembertypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <template v-else>{{
                  F_memberTypeId(detailForm.memberTypeId)
                }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell"></el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="性别：">
                <el-radio-group
                  v-model="detailForm.sex"
                  v-if="detailForm.type == 'add'"
                >
                  <el-radio
                    v-for="(item, key, index) of $t('commons.F_sex')"
                    :label="key"
                    :key="index"
                    >{{ item }}</el-radio
                  >
                </el-radio-group>
                <template v-else>{{ detailForm.sex | F_sex }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="生日：">
                <el-date-picker
                  v-model="detailForm.birthday"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-date-picker>
                <template v-else>{{ detailForm.birthday }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="邮箱：">
                <el-input
                  v-model="detailForm.email"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.email }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="国籍：">
                <el-select
                  v-model="detailForm.nationality"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="item in nationalityList"
                    :key="item.id"
                    :label="$i18n.locale == 'ri' ? item.jName : item.cName"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <template v-else>{{
                  F_nationality(detailForm.nationality)
                }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="地址：">
                <el-input
                  v-model="detailForm.address"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.address }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="车牌号：">
                <el-input
                  v-model="detailForm.carNum"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.carNum }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="爱好：">
                <el-input
                  v-model="detailForm.hobby"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.hobby }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="所属单位：">
                <el-select
                  v-model="detailForm.enterId"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="item in hotelenterList"
                    :key="item.id"
                    :label="item.enterName"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <template v-else>{{ F_enterId(detailForm.enterId) }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  v-model="detailForm.remark"
                  class="width200"
                  v-if="detailForm.type == 'add'"
                ></el-input>
                <template v-else>{{ detailForm.remark }}</template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="销售员：">
                <el-select
                  v-model="detailForm.salesId"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="item in salesList"
                    :key="item.id"
                    :label="item.userName"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <template v-else>{{ F_salesId(detailForm.salesId) }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item label="发展途径：">
                <el-select
                  v-model="detailForm.getWay"
                  v-if="detailForm.type == 'add'"
                >
                  <el-option
                    v-for="(value, key) in $t('frontOffice.getWay')"
                    :label="value"
                    :key="value"
                    :value="key"
                  ></el-option>
                </el-select>
                <template v-else>{{ F_getWay(detailForm.getWay) }}</template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item label="立即发卡：" prop="state">
                <el-radio-group
                  v-model="detailForm.state"
                  v-if="detailForm.type == 'add'"
                >
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">待启用</el-radio>
                </el-radio-group>
                <template v-else>{{
                  detailForm.state == 1 ? "是" : "待启用"
                }}</template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="detailForm.type == 'add'">
        <el-button @click="setMemberFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addItem('setMemberForm')"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="新增客人黑名单" :visible.sync="setBlackShow" top="0">
      <el-form :model="setBlackForm" ref="setBlackForm">
        <el-form-item label="拉黑备注：" prop="blackRemark">
          <el-input
            type="textarea"
            v-model="setBlackForm.remark"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addblacklist">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
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
      showEdit: false,
      showDetail: false,
      setMemberFormVisible: false,
      searchForm: {
        isBlacklist: "",
        mobile: "",
        idcard: "",
        name: "",
        searchType: 3,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      storeList: [],
      nationalityList: [],
      smembertypeList: [],
      salesList: "",
      hotelenterList: "",
      detailForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        idcardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请填入证件编号",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        memberCard: [
          {
            required: true,
            message: "请输入会员卡号",
            trigger: "blur",
          },
        ],
        memberTypeId: [
          {
            required: true,
            message: "请选择会员类型",
            trigger: "change",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择是否立即发卡",
            trigger: "change",
          },
        ],
        remark: [
          {
            required: true,
            message: "请填写备注",
            trigger: "blur",
          },
        ],
        payPrices: [
          {
            required: true,
            message: "请填写支付金额",
            trigger: "blur",
          },
        ],
        payWay: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change",
          },
        ],
        operType: [
          {
            required: true,
            message: "请选择操作类型",
            trigger: "change",
          },
        ],
      },
      setBlackForm: {
        remark: "",
      },
      setBlackShow: false,
      setBlackRules: {
        blackRemark: [
          {
            required: true,
            message: "not emply",
            trigger: "change",
          },
        ],
      },
      currentItem: "",
    };
  },
  mounted() {
    this.initForm();
    this.stores_list();
    this.smembertype_list();
    this.$F.commons.fetchSalesList(this.employeesForm, (data) => {
      this.salesList = data.hotelUserList;
    });
    this.hotelenter_list();
    this.nationality();
  },
  methods: {
    initForm() {
      this.searchForm = {
        isBlacklist: "",
        mobile: "",
        idcard: "",
        name: "",
        searchType: 1,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/checkin/checkin_order_list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.roomPersonList;
          console.log(this.tableData);
          this.listTotal = res.page.count;
        }
      );
    },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    handelblacklist(row) {
      this.setBlackForm.id = row.id;
      this.setBlackShow = true;
    },
    addblacklist() {
      if (!this.setBlackForm.remark) {
        this.$message.error("请输入备注信息");
        return;
      }
      this.$F.doRequest(
        this,
        "/pms/hotelmember/addblacklist",
        this.setBlackForm,
        (data) => {
          this.setBlackShow = false;
          this.getDataList();
          this.$message({
            message: "success",
            type: "success",
          });
        }
      );
    },
    smembertype_list() {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.smembertypeList = res.list;
      });
    },
    hotelenter_list() {
      let params = {
        id: "",
        enterName: "",
        state: 1,
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: false,
        salesFlag: 1,
        pageIndex: 1,
        pageSize: 10,
      };
      this.$F.doRequest(null, "/pms/hotelenter/list", params, (data) => {
        this.hotelenterList = data.list;
      });
    },
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },

    changeIntoMember(item) {
      let data = {
        name: "",
        memberTypeId: "",
        idcardType: "",
        idcard: "",
        mobile: "",
        sex: "",
        email: "",
        salesId: "",
      };
      for (var key in item) {
        if (item[key] && typeof item[key] == "number") {
          item[key] = item[key].toString();
        }
      }
      for (var key in data) {
        this.detailForm[key] = item[key];
      }
      this.detailForm.type = "add";
      this.setMemberFormVisible = true;
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/hotelmember/edit",
            this.detailForm,
            (res) => {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              this.setMemberFormVisible = false;
              this.getDataList();
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDetail(item) {
      this.detailForm = item;
      this.detailForm.type = "detail";
      this.setMemberFormVisible = true;
    },
    handleHistory(item) {
      console.log(item.idcard);
      this.$router.push({
        name: "customerhistory",
        query: {
          idcard: item.idcard,
        },
      });
    },
    handleEdit(item) {
      this.$router.push({
        name: "historydetail",
        query: {
          item: item,
        },
      });
    },
    F_memberTypeId(v) {
      let that = this;
      for (let k in that.smembertypeList) {
        if (that.smembertypeList[k].id == v) {
          return that.smembertypeList[k].name;
        }
      }
      return "";
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return "";
    },
    F_nationality(v) {
      let that = this;
      for (let k in that.nationalityList) {
        if (that.nationalityList[k].id == v) {
          return this.$i18n.locale == "ri"
            ? that.nationalityList[k].jName
            : that.nationalityList[k].cName;
        }
      }
      return "";
    },
    F_salesId(v) {
      let that = this;
      for (let k in that.salesList) {
        if (that.salesList[k].id == v) {
          return that.salesList[k].userName;
        }
      }
      return "";
    },
    F_enterId(v) {
      let that = this;
      for (let k in that.hotelenterList) {
        if (that.hotelenterList[k].id == v) {
          return that.hotelenterList[k].enterName;
        }
      }
      return "";
    },
    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.getDataList();
    },
  },
};
</script>

<style lang="less" scoped>
.el-select {
  display: inline-block;
}
</style>
