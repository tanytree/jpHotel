<template>
  <div class="boss-index">
    <el-card shadow="never">
      <el-tabs v-model="activeName" @tab-click="tabChange" class="tabCenter incomes">
        <el-tab-pane v-for="item in paneArr" :key="item.name" :label="item.label" :name="item.name">
          <div class="setup-top">
            <el-form ref="form" size="small" inline label-width="60px" class="term line">
              <el-form-item :label="$t('manager.finance_kind')+':'" v-if="item.name!='certificate'">
                <el-radio-group v-model="cate" @change="radioChange">
                  <el-radio-button v-for="(c, i) in cates" :key="i" :label="c.id">{{c.name}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <div class="export">
                <el-button size="small" class="submit" @click="addNew">{{$t('commons.newAdd')}}</el-button>
<!--                <el-button-->
<!--                  size="small"-->
<!--                  class="submit"-->
<!--                  v-if="item.name=='sub'"-->
<!--                >{{$t('commons.exportBtn')}}</el-button>-->
              </div>
            </el-form>
            <el-table
              v-if="item.name=='sub'"
              :data="subData"
              size="small"
              border
              height="100%"
              header-row-class-name="default"
              @selection-change="selectionChange"
              row-key="code"
              default-expand-all
              :tree-props="{children: 'childList', hasChildren: 'hasChildList'}"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column
                header-align="center"
                prop="subjectsCode"
                :label="$t('manager.finance_coding')"
                width="180"
              ></el-table-column>
              <el-table-column header-align="center" prop="accountName" :label="$t('commons.name')"></el-table-column>
              <el-table-column
                header-align="center"
                prop="typeId"
                :label="$t('manager.finance_kind')"
              ></el-table-column>
              <el-table-column
                header-align="center"
                :label="$t('manager.finance_balanceDirection')"
                width="180"
              >
                <template
                  slot-scope="scope"
                >{{scope.row.direction == 1 ? $t('manager.finance_borrrow') : $t('manager.finance_credit')}}</template>
              </el-table-column>
              <el-table-column
                header-align="center"
                :label="$t('boss.loginDetail_state')"
                width="180"
              >
                <template
                  slot-scope="scope"
                >{{scope.row.status == 1 ? $t('manager.finance_normal') : $t('manager.finance_deleted')}}</template>
              </el-table-column>
              <el-table-column align="center" :label="$t('commons.operating')" width="240">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    v-if="scope.row.level==1"
                    @click="addNew('add', scope.row)"
                  >{{$t('manager.finance_addLower')}}</el-button>
                  <el-button type="text" @click="addNew('edit', scope.row)">{{$t('commons.modify')}}</el-button>
                  <el-popconfirm
                    :title="$t('manager.grsl_sureDelete')+'？'"
                    icon="el-icon-warning-outline"
                    iconColor="#FF8C00"
                    @onConfirm="handleDelete('sub', scope.row)"
                  >
                    <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="item.name=='certificate'"
              :data="cateData"
              size="small"
              border
              height="100%"
              header-row-class-name="default"
            >
              <el-table-column
                header-align="center"
                prop="credentailWord"
                :label="$t('manager.finance_proofWords')"
                width="180"
              ></el-table-column>
              <el-table-column
                header-align="center"
                prop="printTitle"
                :label="$t('manager.finance_printTitle')"
              ></el-table-column>
              <el-table-column header-align="center" :label="$t('manager.finance_chooseDefault')">
                <template
                  slot-scope="scope"
                >{{scope.row.state == 1 ? $t('manager.hk_yes') : $t('manager.hk_no')}}</template>
              </el-table-column>
              <el-table-column align="center" :label="$t('commons.operating')" width="240">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    v-if="scope.row.state==2"
                    @click="addNew('edit', scope.row)"
                  >{{$t('manager.finance_setDefault')}}</el-button>
                  <el-button type="text" @click="addNew('edit', scope.row)">{{$t('commons.modify')}}</el-button>
                  <el-popconfirm
                    :title="$t('manager.grsl_sureDelete')+'？'"
                    icon="el-icon-warning-outline"
                    iconColor="#FF8C00"
                    @onConfirm="handleDelete('cate', scope.row)"
                  >
                    <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="item.name=='account'"
              :data="accountData"
              size="small"
              border
              height="100%"
              header-row-class-name="default"
            >
              <el-table-column prop="accountCode" :label="$t('manager.finance_accoutCode')"></el-table-column>
              <el-table-column
                align="center"
                prop="accountName"
                :label="$t('manager.finance_accoutName')"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="account"
                :label="$t('manager.finance_accountNum')"
              ></el-table-column>
              <el-table-column
                header-align="center"
                prop="subjectsId"
                :label="$t('manager.finance_project')"
              ></el-table-column>
              <el-table-column align="center" :label="$t('commons.operating')" width="140">
                <template slot-scope="scope">
                  <el-button type="text" @click="addNew('edit', scope.row)">{{$t('commons.modify')}}</el-button>
                  <el-popconfirm
                    :title="$t('manager.grsl_sureDelete')+'？'"
                    icon="el-icon-warning-outline"
                    iconColor="#FF8C00"
                    @onConfirm="handleDelete('account', scope.row)"
                  >
                    <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      top="0"
      :title="subTitle"
      :visible.sync="subVisible"
      width="30%"
      :before-close="handleClose"
      class="editBox"
    >
      <el-form size="small" ref="addForm" :model="addForm" label-width="100px" :rules="addRule">
        <el-form-item :label="$t('manager.finance_projectNum')+':'" prop="subjectsCode">
          <el-input v-model="addForm.subjectsCode"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_projectName')+':'" prop="accountName">
          <el-input v-model="addForm.accountName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_superiorSubject')+':'">{{addForm.pDesc}}</el-form-item>
        <el-form-item :label="$t('manager.finance_projectKind')+':'" prop="typeId">
          <el-select
            v-model="addForm.typeId"
            clearable
            :placeholder="$t('manager.hk_pleaseSelect')"
          >
            <el-option
              v-for="(item, index) in cates"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_direction')+':'">
          <el-radio-group v-model="addForm.direction">
            <el-radio :label="1">{{$t('manager.finance_borrrow')}}</el-radio>
            <el-radio :label="2">{{$t('manager.finance_credit')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" class="submit" @click="submit('sub')">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      top="0"
      :title="cateTitle"
      :visible.sync="cateVisible"
      width="30%"
      :before-close="handleClose"
      class="editBox"
    >
      <el-form size="small" ref="cateForm" :model="cateForm" label-width="100px" :rules="cateRule">
        <el-form-item :label="$t('manager.finance_proofWords')+':'" prop="credentailWord">
          <el-input v-model="cateForm.credentailWord"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_printTitle')+':'" prop="printTitle">
          <el-input v-model="cateForm.printTitle"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_chooseDefault')+':'">
          <el-radio-group v-model="cateForm.state">
            <el-radio :label="1">{{$t('manager.hk_yes')}}</el-radio>
            <el-radio :label="2">{{$t('manager.hk_no')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cateVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" class="submit" @click="submit('cate')">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      top="0"
      :title="accountTitle"
      :visible.sync="accountVisible"
      width="30%"
      :before-close="handleClose"
      class="editBox"
    >
      <el-form
        size="small"
        ref="accountForm"
        :model="accountForm"
        label-width="100px"
        :rules="accountRule"
      >
        <el-form-item :label="$t('manager.finance_coding')+':'" prop="accountCode">
          <el-input v-model="accountForm.accountCode"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_accoutName')+':'" prop="accountName">
          <el-input v-model="accountForm.accountName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_accountNum')+':'" prop="account">
          <el-input v-model="accountForm.account"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_accountantCourse')+':'" prop="subjectsId">
          <el-input v-model="accountForm.subjectsId" readonly>
            <el-button slot="append" icon="el-icon-more" @click="selectSub"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        top="0"
        width="25%"
        :title="$t('manager.finance_chooseSubject')"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-form size="small" inline ref="innerForm" :model="innerForm">
          <el-form-item>
            <el-input v-model="innerForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit">{{$t('commons.queryBtn')}}</el-button>
          </el-form-item>
        </el-form>
        <el-tree
          :data="subData"
          :props="defaultProps"
          default-expand-all
          @node-click="handleNodeClick"
        ></el-tree>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" class="submit" @click>{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      activeName: "sub",
      cate: "",
      paneArr: [
        { label: "科目", name: "sub" },
        { label: "凭证字", name: "certificate" },
        { label: "账户", name: "account" },
      ],
      cates: [],
      subTitle: "",
      subVisible: false,
      cateTitle: "",
      cateVisible: false,
      accountTitle: "",
      accountVisible: false,
      innerVisible: false,
      addForm: {
        subjectsCode: "",
        accountName: "",
        pid: "",
        pDesc: "",
        typeId: "",
        direction: 1,
      },
      cateForm: { credentailWord: "", printTitle: "", state: 2 },
      accountForm: {
        accountCode: "",
        accountName: "",
        account: "",
        subjectsId: "",
      },
      innerForm: { name: "" },
      addRule: {
        subjectsCode: [
          { required: true, message: "请填写编码", trigger: "blur" },
        ],
        accountName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
        typeId: [{ required: true, message: "请选择类别", trigger: "blur" }],
      },
      cateRule: {
        credentailWord: [
          { required: true, message: "请填写编码", trigger: "change" },
        ],
        printTitle: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
      },
      accountRule: {
        accountCode: [
          { required: true, message: "请填写编码", trigger: "blur" },
        ],
        accountName: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
        subjectsId: [
          { required: true, message: "请选择科目", trigger: "blur" },
        ],
      },
      subData: [],
      cateData: [],
      accountData: [],
      defaultProps: { children: "childList", label: "accountName" },
    };
  },
  mounted() {
    this.tabChange();
  },
  methods: {
    tabChange() {
      if (this.activeName == "sub") {
        this.$F.doRequest(
          this,
          "/pms/system/public_dict",
          { type: 25 },
          (res) => {
            this.cates = res;
            this.cate = res[0].id;
            this.getSubjectData();
          }
        );
      } else if (this.activeName == "account") {
        this.cates = [
          { name: "现金", value: "1" },
          { name: "银行存款", value: "2" },
        ];
        this.cate = 1;
        this.getAccountData();
      } else {
        this.getWordData();
      }
    },
    getSubjectData() {
      this.$F.doRequest(
        this,
        "/pms/credentailsubjects/list",
        { typeId: this.cate },
        (res) => {
          this.subData = res.list;
        }
      );
    },
    getWordData() {
      this.$F.doRequest(
        this,
        "/pms/hotelCredentailWord/list",
        this.pageForm,
        (res) => {
          this.cateData = res.list;
        }
      );
    },
    getAccountData() {
      const params = {
        accountType: this.cate,
      };
      this.$F.merge(params, this.pageForm);
      this.$F.doRequest(
        this,
        "/pms/hotelCredentailAccount/list",
        params,
        (res) => {
          this.accountData = res.list;
        }
      );
    },
    radioChange() {
      this.getSubjectData();
    },
    addNew(type, row) {
      if (this.activeName == "sub") {
        if (this.$refs && this.$refs["addForm"]) {
          this.$refs["addForm"].clearValidate();
        }
        if (type == "edit") {
          this.subTitle = "编辑科目";
          this.addForm = row;
        } else if (type == "add") {
          this.refs["addForm"].clearValidate();
          this.subTitle = "添加下级科目";
          this.addForm = {
            subjectsCode: "",
            accountName: "",
            pid: "",
            typeId: "",
            upDesc: "",
            direction: 1,
          };
        } else {
          this.subTitle = "新增科目";
          this.addForm = {
            subjectsCode: "",
            accountName: "",
            pid: "",
            typeId: "",
            upDesc: "",
            direction: 1,
          };
        }
        this.subVisible = true;
      } else if (this.activeName == "certificate") {
        if (type == "edit") {
          this.subTitle = "修改凭证字";
          this.cateForm = row;
        } else {
          this.subTitle = "新增凭证字";
          this.cateForm = { credentailWord: "", printTitle: "", state: 2 };
        }
        this.cateVisible = true;
      } else {
        if (type == "edit") {
          this.accountTitle = "修改现金账户";
          this.accountForm = row;
        } else {
          this.accountTitle = "新增现金账户";
          this.accountForm = {
            accountCode: "",
            accountName: "",
            account: "",
            subjectsId: "",
          };
        }
        this.accountVisible = true;
      }
    },
    selectionChange(val) {},
    handleDelete(type, row) {
      if (type == "sub") {
        this.$F.doRequest(
          this,
          "/pms/credentailsubjects/delete",
          { id: row.id },
          (res) => {
            this.getSubjectData();
          }
        );
      } else if (type == "cate") {
        this.$F.doRequest(
          this,
          "/pms/hotelCredentailWord/delete",
          { id: row.id },
          (res) => {
            this.getWordData();
          }
        );
      } else {
        this.$F.doRequest(
          this,
          "/pms/hotelCredentailAccount/delete",
          { id: row.id },
          (res) => {
            this.getAccountData();
          }
        );
      }
    },
    handleClose() {
      this.subVisible = false;
      this.cateVisible = false;
      this.accountVisible = false;
    },
    selectSub() {
      this.innerVisible = true;
    },
    handleNodeClick() {},
    submit(type) {
      if (type == "sub") {
        const params = {
          id: this.addForm.id,
          accountName: this.addForm.accountName,
          subjectsCode: this.addForm.subjectsCode,
          typeId: this.addForm.typeId,
          upTypeId: this.addForm.upTypeId,
          pid: this.addForm.pid,
          direction: this.addForm.direction,
        };
        this.$F.doRequest(
          this,
          "/pms/credentailsubjects/edit",
          params,
          (res) => {
            this.getSubjectData();
            this.subVisible = false;
          }
        );
      } else if (type == "cate") {
        const params = {
          id: this.cateForm.id,
          credentailWord: this.cateForm.credentailWord,
          printTitle: this.cateForm.printTitle,
          state: this.cateForm.state,
        };
        this.$F.doRequest(
          this,
          "/pms/hotelCredentailWord/edit",
          params,
          (res) => {
            this.getWordData();
            this.cateVisible = false;
          }
        );
      } else {
        const params = {
          id: this.accountForm.id,
          accountType: this.cate,
          accountCode: this.accountForm.accountCode,
          accountName: this.accountForm.accountName,
          account: this.accountForm.account,
          subjectsId: this.accountForm.subjectsId,
        };
        this.$F.doRequest(
          this,
          "/pms/hotelCredentailAccount/edit",
          params,
          (res) => {
            this.getAccountData();
            this.accountVisible = false;
          }
        );
      }
    },
  },
};
</script>

<style lang="scss">
.setup-top {
  height: 100%;
  display: flex;
  flex-direction: column;

  .term {
    background: transparent;
    padding: 0;
  }
}
</style>
