<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 14:23:13
 * @FilePath: \jiudian\src\views\market\customer\history.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item :label="$t('desk.customer_guestNum') + ':'">
          <el-input v-model="searchForm.guestNum" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_name') + ':'" label-width="50px">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>

        <el-form-item :label="$t('desk.order_moblePhone') + ':'">
          <el-input v-model="searchForm.mobile" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="white" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="name" align="left" :label="$t('desk.editor_nameAenter')">
          <template slot-scope="{ row }">
            <div>
              {{ row.name }}
              <span v-if="row.pronunciation">【{{ row.pronunciation }}】</span>
            </div>
            <div>
              {{ row.enterName }}
              <span v-if="row.enterPinyin">【{{ row.enterPinyin }}】</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="guestNum" align="center" :label="$t('desk.customer_guestNum')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sex" align="center" :label="$t('desk.customer_sex')" >
          <template slot-scope="{ row }">{{ row.sex | F_sex }}</template>
        </el-table-column>
        <el-table-column :label="$t('desk.home_telNum')" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <div v-if="row.mobile">({{$t('desk.editor_hand')}}){{ row.mobile }}</div>
            <div v-if="row.mobile2">({{$t('desk.editor_home')}}){{ row.mobile2 }}</div>
            <div v-if="row.enterMobile1">({{$t('desk.editor_only')}}){{ row.enterMobile1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="age" align="center" :label="$t('desk.editor_age')"></el-table-column>
        <el-table-column align="center" :label="$t('desk.customer_cumulative')">
          <template slot-scope="{ row }">{{
            row.consumTotal ? row.consumTotal : "0"
          }}</template>
        </el-table-column>
        <el-table-column prop :label="$t('commons.operating')">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleHistory(row)">
              {{ $t("desk.customer_guestHistory") }}</el-button>
            <el-button type="text" size="mini" @click="handleDetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button type="text" size="mini" @click.native="handleEdit(row)">{{ $t("commons.modify") }}</el-button>
            <!-- <el-dropdown v-if="1 == 2">
                            <span class="el-dropdown-link">
                                {{ $t("desk.customer_more") }}
                                <i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    @click.native="handleEdit(row)"
                                    >{{
                                        $t("commons.modify")
                                    }}</el-dropdown-item
                                >
                                <el-dropdown-item
                                    v-if="!row.memberCard"
                                    @click.native="changeIntoMember(row)"
                                >
                                    {{
                                        $t("desk.customer_changeMem")
                                    }}</el-dropdown-item
                                >
                                <el-dropdown-item
                                    @click.native="handelblacklist(row)"
                                    >{{
                                        $t("desk.customer_pullBlack")
                                    }}</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown> -->
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="searchForm.page" :page-size="searchForm.page_num" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog top="0" :title="$t('commons.detail')" :visible.sync="setMemberFormVisible" class="setMemberForm" width="70%">
      <el-form :model="detailForm" ref="setMemberForm" label-width="90px" size="mini">
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.home_name') + ':'" class prop="name">
                <template>{{ detailForm.name
                  }}<span v-if="detailForm.pronunciation">【{{ detailForm.pronunciation }}】</span></template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.home_idCardNum') + ':'" class prop="idcard">
                <template>({{ detailForm.idcardType | F_idcardType }}){{
                    detailForm.idcard
                  }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="col">
              <el-form-item :label="$t('desk.home_telNum1') + ':'" class prop="mobile">
                <template>{{ detailForm.mobile }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="col">
              <el-form-item :label="$t('desk.home_telNum2') + ':'">
                <template>{{ detailForm.mobile2 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item :label="$t('desk.customer_guestNum') + ':'" class prop="guestNum">
                <template>{{ detailForm.guestNum }}</template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_region') + ':'">
                <template>{{ detailForm.addressCountries }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_address') + '1:'">
                <template>{{ detailForm.address }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_address') + '2:'">
                <template>{{ detailForm.address2 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_sex') + ':'">
                <template>{{ detailForm.sex | F_sex }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_brithday') + ':'">
                <template>{{ detailForm.birthday }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.editor_age')+':'">
                <template>{{ detailForm.age }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_email') + ':'">
                <template>{{ detailForm.email }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_unitNameA')+':'">
                <template>{{ detailForm.enterName }} <span v-if="detailForm.enterPinyin">【{{detailForm.enterPinyin}}】</span></template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_unitPhoneNum')+'1:'">
                <template>{{ detailForm.enterMobile1 }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_unitPhoneNum')+'2:'">
                <template>{{ detailForm.enterMobile2 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_unitAddress')+'1:'">
                <template>{{ detailForm.enterAddress1 }}</template>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="col">
              <el-form-item :label="$t('desk.customer_unitAddress')+'2:'">
                <template>{{ detailForm.enterAddress2 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="24" class="col">
              <el-form-item label="memo1:">
                <template>{{ detailForm.memo1 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="24" class="col">
              <el-form-item label="memo2:">
                <template>{{ detailForm.memo2 }}</template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="detailForm.type == 'add'">
        <el-button @click="setMemberFormVisible = false">{{
          $t("commons.close")
        }}</el-button>
        <el-button type="primary" @click="addItem('setMemberForm')">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('desk.customer_newCusBlackName')" :visible.sync="setBlackShow" top="0">
      <el-form :model="setBlackForm" ref="setBlackForm">
        <el-form-item :label="$t('desk.customer_pullBlackRemark') + ':'" required="true">
          <el-input type="textarea" v-model="setBlackForm.remark" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addblacklist">{{
          $t("commons.determine")
        }}</el-button>
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
        guestNum: "",
        name: "",
        mobile: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        // guestType: 1,
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

      setBlackForm: {
        remark: "",
      },
      setBlackShow: false,

      currentItem: "",
    };
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.$t("desk.customer_inputName"),
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: this.$t("desk.customer_chooseSex"),
            trigger: "change",
          },
        ],
        idcardType: [
          {
            required: true,
            message: this.$t("desk.customer_chooseCard"),
            trigger: "change",
          },
        ],
        idcard: [
          {
            required: true,
            message: this.$t("desk.customer_inputCardNum"),
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: this.$t("desk.customer_inputPhone"),
            trigger: "blur",
          },
        ],
        memberCard: [
          {
            required: true,
            message: this.$t("desk.customer_inputMemNum"),
            trigger: "blur",
          },
        ],
        memberTypeId: [
          {
            required: true,
            message: this.$t("desk.customer_chooseMemType"),
            trigger: "change",
          },
        ],
        state: [
          {
            required: true,
            message: this.$t("desk.customer_chooseIfcard"),
            trigger: "change",
          },
        ],
        remark: [
          {
            required: true,
            message: this.$t("desk.customer_inputRemark"),
            trigger: "blur",
          },
        ],
        payPrices: [
          {
            required: true,
            message: this.$t("desk.customer_inputPayPrice"),
            trigger: "blur",
          },
        ],
        payWay: [
          {
            required: true,
            message: this.$t("desk.customer_choosePayType"),
            trigger: "change",
          },
        ],
        operType: [
          {
            required: true,
            message: this.$t("desk.customer_chooseOpearType"),
            trigger: "change",
          },
        ],
      };
    },
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
        guestNum: "",
        name: "",
        mobile: "",
        // guestType: 1,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        paging: true,
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.$F.doRequest(
        this,
        "/pms/guestarchives/guest_archives_list",
        this.searchForm,
        (res) => {
          this.tableData = res.guestList;
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
        this.$message.error(this.$t("desk.customer_inputRemark"));
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
                message: this.$t("commons.request_success"),
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
      console.log(item);
      this.detailForm = item;
      this.detailForm.type = "detail";
      this.setMemberFormVisible = true;
    },
    handleHistory(item) {
      console.log(item.idcard);
      this.$router.push({
        name: "customerhistory",
        query: {
          item: item,
        },
      });
    },
    handleEdit(item) {
      console.log(item);
      this.$router.push({
        name: "hsitorydetailTao",
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
