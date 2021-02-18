 <!-- 前台部 > 客户管理 > 会员管理 > 会员信息管理 -->
<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking" v-if="showPageType == 'main'">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="100px">
        <el-form-item :label="$t('desk.customer_memType')">
          <el-select v-model="searchForm.memberTypeId" :placeholder="$t('commons.placeChooseA')" class="width150">
            <!-- <el-option :label="$t('desk.home_all')" value></el-option> -->
            <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.home_telNum')">
          <el-input v-model="searchForm.mobile" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_membermun')">
          <el-input v-model="searchForm.memberCard" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.editor_memberName')">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_state')">
          <el-select v-model="searchForm.state" class="width150">
            <el-option :label="$t('desk.home_allC')" value></el-option>
            <el-option v-for="(label, value) in $t('frontOffice.state')" :label="label" :value="value" :key="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="submit" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <el-row>
          <el-form-item>
            <!--                        <el-button plain>{{ $t("desk.customer_readMemCard") }}</el-button>-->
            <el-button v-if="type == 'header'" type="primary" class="submit" @click="handleAdd">{{ $t("desk.customer_addMem") }}</el-button>
            <el-button v-if="type == 'header'" type="primary" class="submit" @click="importMember">{{ $t("desk.add_importMem") }}</el-button>
            <el-button v-if="type == 'header'" type="primary" class="submit" @click="downloadTemplate">{{$t('commons.downloadTemplate')}}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!--表格数据 -->
      <el-table ref="multipleTable" v-loading="loading" :data="tableData" height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="memberCard" :label="$t('desk.customer_membermun')" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" :label="$t('desk.editor_memAenter')">
          <template slot-scope="{ row }">
            <div>{{ row.name }} <span v-if="row.pronunciation">【{{ row.pronunciation }}】</span></div>
            <div>{{ row.enterName }} <span v-if="row.enterPinyin">【{{row.enterPinyin}}】</span></div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_memType')">
          <template slot-scope="{ row }">{{
            F_memberTypeId(row.memberTypeId)
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('desk.home_telNumA')">
          <template slot-scope="{ row }">
            <div v-if="row.mobile">({{$t('desk.editor_hand')}}){{ row.mobile }}</div>
            <div v-if="row.mobile2">({{$t('desk.editor_home')}}){{ row.mobile2 }}</div>
            <div v-if="row.enterMobile1">({{$t('desk.editor_only')}}){{ row.enterMobile1 }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.customer_sex')" width="80px">
          <template slot-scope="{ row }">
            <div v-if="row.sex == 1">{{$t('desk.customer_man')}}</div>
            <div v-if="row.sex == 2">{{$t('desk.customer_woman')}}</div>
            <div v-if="row.sex == 3">{{$t('desk.book_other')}}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('desk.editor_age')" prop="age" width="80px">
        </el-table-column>
        <el-table-column prop="state" :label="$t('desk.home_state')">
          <template slot-scope="{ row }">{{
            row.state | F_cardState
          }}</template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleDetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button type="text" size="mini" @click="handleEdit(row)">{{ $t("commons.modify") }}</el-button>
            <el-button type="text" size="mini" @click="handleRecovery(row)" v-if="row.state == 2">
              {{ $t("desk.customer_restore") }}
            </el-button>
            <el-button type="text" size="mini" @click="handleHistory(row)">{{
              $t("desk.customer_guestHistory")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-size="searchForm.pageSize" :total="listTotal" layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
    <!-- 导入会员dialog -->
    <el-dialog :title="$t('desk.add_importMem')" :visible.sync="importMemDialog" top="0" width="42%">
      <div style="margin:-10px 0 10px 20px;">{{$t('desk.add_chooseImportType')}}</div>
      <el-form :model="memImportForm" ref="memImportForm" :rules="importRules">
        <el-form-item :label="$t('desk.customer_memType')+':'" prop="memberTypeId" label-width="90px">
          <el-select v-model="memImportForm.memberTypeId" :placeholder="$t('desk.customer_chooseMemType')" size="small" style="width:320px;">
            <el-option v-for="item in smembertypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.add_membership')+':'" label-width="100px" required>
          <el-upload ref="upload" action="aa" :on-remove="handleRemove" :before-remove="beforeRemove" :auto-upload='false' :on-change='changeFile' :limit="1" :multiple="false" accept=".xls,.xlsx" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="middle" slot="trigger" style="width:120px;" type="text">{{$t('desk.add_selectFile')}}</el-button>
            <div slot="tip" style="marginTop:-15px;"><span>{{$t('commons.tip_desc')}}：</span> {{$t('desk.add_onlySupport')}}</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="textAlign:right">
        <el-button @click="cancelImport">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary" @click="confirmImport('memImportForm')">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 编辑or详情弹窗 -->
    <el-dialog :title="$t('desk.customer_newCusBlackName')" :visible.sync="setBlackShow" top="0">
      <el-form :model="setBlackForm" ref="setBlackForm">
        <el-form-item :label="$t('desk.customer_pullBlackRemark') + ':'" prop="blackRemark">
          <el-input type="textarea" v-model="setBlackForm.remark" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addblacklist">{{
          $t("commons.determine")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 补收卡费弹框 -->
    <el-dialog top="0" :title="$t('desk.customer_chargeCard')" :visible.sync="setCardVisible" width="470px">
      <div class="dialogDiv" v-if="dialogInfo">
        <span>{{ $t("desk.customer_cardNum") + ":"
          }}{{ dialogInfo.memberCard }}</span>
        <span>{{ $t("desk.home_name") + ":" }}{{ dialogInfo.name }}</span>
        <span>{{ $t("desk.customer_memType") + ":"
          }}{{ F_memberTypeId(dialogInfo.memberTypeId) }}</span>
      </div>
      <el-form :model="cardForm" ref="cardForm">
        <el-form-item :label="$t('desk.customer_chargeType')" class prop="memberTypeId">
          <el-radio-group v-model="cardForm.operType">
            <el-radio :label="4">{{ $t("desk.customer_cardPri") }}</el-radio>
            <el-radio :label="5">{{
              $t("desk.customer_upgradeCard")
            }}</el-radio>
            <el-radio :label="6">{{ $t("desk.customer_cardCost") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_payType')" class prop="payWay">
          <el-select v-model="cardForm.payWay" style="width: 300px">
            <el-option :label="$t('desk.serve_cash')" :value="1"></el-option>
            <el-option :label="$t('desk.serve_wechat')" :value="2"></el-option>
            <el-option :label="$t('desk.serve_alipay')" :value="3"></el-option>
            <el-option :label="$t('desk.customer_unionpay')" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_payPrice')" class prop="payPrices">
          <el-input style="width: 300px" v-model="cardForm.payPrices" placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setCardFrormChange()">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import httpRequest from "@/utils/httpRequest";
import axios from "axios";

export default {
  props: ["type"],
  data() {
    return {
      memImportForm: {
        memberTypeId: "",
      },
      fileList: [], //上传的文件列表
      changeFileList: [], //添加文件的列表
      importMemDialog: false, //导入会员弹框
      setCardVisible: false,
      cardForm: {
        operType: 4,
        payWay: 1,
        payPrices: "",
        //不改变
        cardNum: "",
        memberId: "",
        cardTypeId: "",
      },
      showPageType: "main", //页面显示类型
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        state: "1",
        storesNum: "",
      },
      dialogInfo: null,
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [{}], //表格数据
      storeList: "",
      smembertypeList: [],
      setBlackForm: {
        remark: "",
      },
      setBlackShow: false,
      setBlackRules: {
        blackRemark: [
          {
            required: true,
            message: "not empty",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.id,
      storesNum: (state) => state.user.storesInfo.storesNum,
    }),
    importRules() {
      return {
        memberTypeId: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
      };
    },
  },
  mounted() {
    this.initForm();
    this.stores_list();
    this.getMemberTypeList();
  },
  methods: {
    //确定导入会员
    confirmImport(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.changeFileList.length > 0) {
            let file = this.changeFileList[0].raw;
            console.log(file);
            let memberTypeId = this.memImportForm.memberTypeId;
            let accessToken = this.token;
            let userId = this.userId;
            let storesNum = this.storesNum;
            let formData = new FormData();
            formData.append("filename", file);
            formData.append("platSource", 1005);
            formData.append("memberTypeId", memberTypeId);
            formData.append("userId", userId);
            formData.append("storesNum", storesNum);
            axios
              .post(
                this.$F.getUploadUrl() + "/pms/hotelmember/upload",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    // 'accessToken':accessToken,
                  },
                }
              )
              .then((res) => {
                console.log(res);
                let code = res.data.code;
                if (code == 200) {
                  let temText = `${this.$t("desk.add_importSuccess")}${
                    res.data.data.insert
                  }${this.$t("desk.add_memberDate")}，${this.$t(
                    "desk.add_theCover"
                  )}${res.data.data.update}${this.$t(
                    "desk.add_tiao"
                  )}，${this.$t("desk.add_have")}${
                    res.data.data.false
                  }${this.$t("desk.add_memberImportFail")}`;
                  this.$alert(temText, this.$t("commons.tip_desc"), {
                    confirmButtonText: this.$t("commons.confirm"),
                    callback: (action) => {
                      this.cancelImport();
                    },
                  });
                } else {
                  this.$message({
                    message: this.$t("desk.add_importFail"),
                    type: "error",
                  });
                  this.fileList = [];
                }
              });
          } else {
            this.$message(this.$t("desk.add_chooseImportFile"));
          }
        } else {
          return false;
        }
      });
    },
    //下载模板
    downloadTemplate() {
      this.$F.commons.downloadTemplate("/pms/hotelmember/download");
    },
    cancelImport() {
      this.memImportForm.memberTypeId = "";
      this.fileList = [];
      this.importMemDialog = false;
    },
    importMember() {
      this.importMemDialog = true;
    },
    getMemberTypeList() {
      this.$F.commons.fetchMemberTypeList({ state: 1 }, (res) => {
        this.smembertypeList = res.list;
        this.$forceUpdate();
      });
    },
    //点击客史
    handleHistory(item) {
      console.log(item);
      console.log(this.type);
      if (this.type == "footer") {
        this.$router.push({
          name: "customerhistory",
          query: {
            item: item,
            // form: "member",
          },
        });
      } else if (this.type == "header") {
        this.$router.push({
          name: "historyTao",
          query: {
            item: item,
          },
        });
      }
    },
    //补收卡费弹框，点击确定按钮
    setCardFrormChange() {
      this.cardForm.cardNum = this.dialogInfo.memberCard;
      this.cardForm.memberId = this.dialogInfo.id;
      this.cardForm.cardTypeId = this.dialogInfo.memberTypeId;
      if (this.cardForm.payPrices > 0) {
        this.$F.doRequest(
          this,
          "/pms/hotelmember/replenish_fee",
          this.cardForm,
          (res) => {
            this.$message({
              message: this.$t("desk.customer_payCardSucc"),
              type: "success",
            });
            this.setCardVisible = false;
            this.cardForm = {
              operType: 4,
              payWay: 1,
              payPrices: "",
              //不改变
              cardNum: "",
              memberId: "",
              cardTypeId: "",
            };
            this.getDataList();
          }
        );
      } else {
        this.$message(this.$t("desk.customer_payShould"));
      }
    },
    // 点击补收卡费
    chargeCard(row) {
      console.log(row);
      this.dialogInfo = row;
      this.setCardVisible = true;
    },
    initForm() {
      this.searchForm = {
        id: "",
        getWay: "",
        memberTypeId: "",
        mobile: "",
        memberCard: "",
        name: "",
        state: "1",
        isBlacklist: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        storesNum: "",
      };
      this.getMemberTypeList();
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/hotelmember/list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.list;
          this.listTotal = res.page.count;
        }
      );
    },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    //点击新增会员按钮
    handleAdd(item) {
      this.$router.push({
        name: "memberEditorTao",
        query: {
          isHeader: "1",
          role: "add", //作用：新增会员
        },
      });
    },
    //点击详情按钮
    handleDetail(item) {
      console.log(this.type);
      if (this.type == "footer") {
        this.$router.push({
          name: "customerdetails",
          query: {
            id: item.id,
            buttonName: this.$t("commons.detail"),
          },
        });
      } else if (this.type == "header") {
        this.$router.push({
          name: "memberEditorTao",
          query: {
            id: item.id,
            buttonName: this.$t("commons.detail"),
            role: "lookDetail", //作用：详情
          },
        });
      }
    },
    //点击修改按钮
    handleEdit(item) {
      console.log(this.type);
      if (this.type == "footer") {
        this.$router.push({
          name: "customeredit",
          query: {
            id: item.id,
          },
        });
      } else if (this.type == "header") {
        this.$router.push({
          name: "memberEditorTao",
          query: {
            id: item.id,
            role: "modify", //作用：修改
          },
        });
      }
    },
    handleRecovery(item) {
      let params = {
        id: item.id,
        remark: "",
        state: 1,
      };

      this.$prompt(
        this.$t("desk.customer_inputReason"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.determine"),
          cancelButtonText: this.$t("commons.cancel"),
          inputPattern: /\S/,
          inputErrorMessage: this.$t("commons.customer_notBlink"),
        }
      )
        .then(({ value }) => {
          params.remark = value;
          this.$F.doRequest(
            this,
            "/pms/hotelmember/enable_disable",
            params,
            (data) => {
              this.getDataList();
            }
          );
        })
        .catch(() => {
          console.log("cancel");
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
      return this.$t("desk.customer_unknowStore");
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
      return this.$t("desk.home_unknown");
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
      this.searchForm.pageIndex = val;
      this.getDataList();
      this.searchForm.pageIndex = 1;
    },
    //upload的几个方法
    // 文件移除调用
    handleRemove(file, fileList) {
      this.changeFileList = fileList;
    },
    // 上传文件超出limit调用
    handleExceed(files, fileList) {
      this.$message.warning(this.$t("desk.add_onlyOneImport"));
    },
    // 移除之前调用
    beforeRemove(file, fileList) {
      return this.$confirm(`${this.$t("desk.add_sureDelete")} ${file.name}？`);
    },
    changeFile(file, fileList) {
      this.changeFileList = fileList;
    },
  },
};
</script>

<style lang="scss" scoped>
.open {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;

  .count {
    color: #333;
  }
}
.dialogDiv span {
  margin-right: 15px;
}
.dialogDiv {
  margin-bottom: 15px;
}
</style>
