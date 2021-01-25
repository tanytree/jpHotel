<template>
  <div class="boss-index">
    <el-tabs v-model="activeFour" @tab-click="changeTab" class="tabCenter">
      <el-tab-pane :label="$t('manager.hp_compensationType')" name="type">
        <div class="content">
          <div class="right">
            <el-button type="primary" class="submit" size="small" @click="popup_kinds('add')">{{ $t("manager.hp_addType") }}</el-button>
          </div>
          <el-table ref="multipleTable" :data="list" border height="100%" header-row-class-name="default" size="small">
            <el-table-column prop="name" :label="$t('commons.name')" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('commons.operating')" width="300">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="popup_kinds('edit', scope.row)">{{ $t("commons.modify") }}</el-button>
                <el-popconfirm :title="$t('manager.hp_bulletTitle')" @confirm="onConfirm(scope.row)">
                  <el-button slot="reference" type="text" size="small">{{ $t("commons.delete") }}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="currentChange" :current-page="typeForm.pageIndex" :page-size="typeForm.pageSize" :total="typeTotal" layout="total, prev, pager, next, jumper"></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('manager.hp_compensationGoods')" name="goods">
        <div class="content">
          <el-form v-model="form" class="term line demo-form-inline" inline size="small">
            <el-form-item :label="$t('manager.hp_goodsName') + ':'">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.hp_goodsType') + ':'">
              <el-select v-model="form.category" :placeholder="
                                    $t('boss.compensation_selectState')
                                ">
                <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submit" @click="search">{{ $t("commons.queryBtn") }}</el-button>
              <el-button class="grey" @click="reset">{{
                                $t("commons.resetBtn")
                            }}</el-button>
            </el-form-item>
            <el-form-item class="form-inline-flex">
              <el-button type="primary" class="submit" @click="popup_thing">+ {{ $t("commons.newAdd") }}</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable" :data="damageData" border height="100%" header-row-class-name="default" size="small">
            <el-table-column prop="damageTypeName" :label="$t('manager.hp_goodsType')"></el-table-column>
            <el-table-column prop="name" :label="$t('manager.hp_goodsName')"></el-table-column>
            <el-table-column prop="damagePrice" :label="$t('manager.hp_compensationPrice')"></el-table-column>
            <el-table-column :label="$t('manager.hp_loginDetail_state')">
              <template slot-scope="scope">{{
                                scope.row.state == 1
                                    ? $t("commons.enable")
                                    : $t("commons.disable")
                            }}</template>
            </el-table-column>
            <el-table-column :label="$t('commons.operating')" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="popup_thing(scope.row)">{{ $t("commons.modify") }}
                </el-button>
                <el-popconfirm :title="$t('manager.hp_bulletTitleA')" @confirm="onDeleteData(scope.row)">
                  <el-button slot="reference" type="text" size="small">{{ $t("commons.delete") }}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 损物赔偿-新增/修改类型 -->
    <el-dialog top="0" :title="addTypeTitle" :visible.sync="addTypeVisible" :close-on-click-modal="false">
      <el-form :model="typeData" label-width="100px" class="demo-ruleForm" ref="addType">
        <el-form-item :label="$t('manager.hp_typeName') + ':'" prop="name">
          <el-input v-model="typeData.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="white" @click="addTypeVisible = false">{{
                    $t("commons.cancel")
                }}</el-button>
        <el-button class="submit" type="primary" @click="submit('addType')">{{ $t("commons.determine") }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 损物赔偿-新增/修改物品 -->
    <el-dialog top="0" :title="addGoodsTitle" :visible.sync="addGoodsVisible" :close-on-click-modal="false">
      <el-form :model="goodsData" :rules="fourrules" size="small" label-width="100px" class="demo-ruleForm" ref="addGoods">
        <el-form-item :label="$t('manager.hp_goodsType') + ':'" prop="damageTypeId">
          <el-select v-model="goodsData.damageTypeId" :placeholder="$t('boss.compensation_selectState')">
            <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('manager.hp_goodsName') + ':'" prop="name">
          <el-input v-model="goodsData.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.hp_compensationPrice') + ':'" prop="damagePrice">
          <el-input v-model="goodsData.damagePrice"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.hp_costPrice') + ':'">
          <el-input v-model="goodsData.costPrice"></el-input>
        </el-form-item>
        <el-form-item :label="$t('boss.loginDetail_state') + ':'" prop="state">
          <el-radio-group v-model="goodsData.state">
            <el-radio :label="1">{{
                            $t("commons.enable")
                        }}</el-radio>
            <el-radio :label="2">{{
                            $t("commons.disable")
                        }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('boss.loginDetail_note') + ':'">
          <el-input type="textarea" :rows="3" :placeholder="$t('boss.department_placeEnterContent')" v-model="goodsData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="white" @click="addGoodsVisible = false">{{
                    $t("commons.cancel")
                }}</el-button>
        <el-button type="primary" class="submit" @click="submit('addGoods')">{{ $t("commons.determine") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      activeFour: "type",
      radio: "",
      typeData: { name: "" },
      damageData: [],
      form: { name: "", category: "" },
      total: 1,

      addTypeVisible: false,
      addTypeTitle: this.addType,
      addGoodsVisible: false,
      addGoodsTitle: this.newAdd,
      goodsData: {
        damageTypeId: "",
        name: "",
        damagePrice: "",
        costPrice: "",
        state: 1,
        remark: "",
      },
    };
  },
  computed: {
    fourrules() {
      return {
        damageTypeId: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: this.$t("manager.hp_inputActiveName"),
            trigger: "blur",
          },
        ],
        damagePrice: [
          {
            required: true,
            message: this.$t("manager.hp_inputActivePrice"),
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: this.$t("manager.placeChoose"),
            trigger: "change",
          },
        ],
      };
    },

    addType: {
      get() {
        return this.$t("manager.hp_addType");
      },
      set() {},
    },
    newAdd: {
      get() {
        return this.$t("commons.newAdd");
      },
      set() {},
    },

    editore: {
      get() {
        return this.$t("manager.hp_editor");
      },
      set() {},
    },
  },
  watch: {
    addType(newValue, oldValue) {
      this.addType = newValue;
    },
    newAdd(newValue, oldValue) {
      this.newAdd = newValue;
    },
    editore(newValue, oldValue) {
      this.editore = newValue;
    },
  },
  props: { list: Array, typeTotal: Number, initData: Function },
  mounted() {
    this.initData("", "", "", this.typeForm);
  },
  methods: {
    changeTab(tab) {
      if (tab.name == "type") {
        this.typeForm.pageSize = 10;
        this.initData("", "", "", this.typeForm, (res) => {
          this.typeForm.pageIndex = res.pageIndex;
          this.typeTotal = res.count;
        });
      } else {
        this.typeForm.pageSize = 99999;
        this.initData("", "", "", this.typeForm);
        this.getDamageData();
      }
    },
    getDamageData(id, name) {
      const params = {
        damageTypeId: id,
        name: name,
      };
      this.$F.merge(params, this.pageForm);
      this.$F.doRequest(this, "/pms/hoteldamage/list", params, (res) => {
        this.damageData = res.list;
        this.pageForm.pageIndex = res.page.pageIndex;
        this.total = res.page.count;
      });
    },
    search() {
      this.getDamageData(this.form.category, this.form.name);
    },
    reset() {
      this.form = { name: "", category: "" };
    },
    popup_thing(row) {
      this.addGoodsVisible = true;
      if (row.id) {
        this.goodsData = row;
        this.addGoodsTitle = this.editore;
      } else {
        this.goodsData = {
          damageTypeId: "",
          name: "",
          damagePrice: "",
          costPrice: "",
          state: 1,
          remark: "",
        };
        this.addGoodsTitle = this.newAdd;
      }
    },
    popup_kinds(type, row) {
      this.addTypeVisible = true;
      if (type == "edit") {
        this.typeData = row;
        this.addTypeTitle = this.editore;
      } else {
        this.typeData = { name: "" };
        this.addTypeTitle = this.addType;
      }
    },
    // 交班模式选择,非现金流时不显示备用金
    changeRedio_five(value, index) {
      this.five_redioList.forEach((value, index) => {
        value.redio = false;
      });
      this.five_redioList[index].redio = true;
      if (this.five_redioList[0].redio == true) {
        this.beiYong_show = true;
      } else {
        this.beiYong_show = false;
      }
    },
    currentChange(val) {
      if (this.activeFour == "type") {
        this.typeForm.pageIndex = val;
        this.initData("", "", "", this.typeForm, (res) => {
          this.typeTotal = res.count;
        });
      } else {
        this.pageForm.pageIndex = val;
        this.getDamageData();
      }
    },
    onConfirm(row) {
      this.$F.doRequest(
        this,
        "/pms/hoteldamagetype/delete",
        { id: row.id },
        (res) => {
          this.initData("", "", "", this.typeForm, (res) => {
            this.typeForm.pageIndex = res.pageIndex;
            this.typeTotal = res.count;
          });
        }
      );
    },
    onDeleteData(row) {
      this.$F.doRequest(
        this,
        "/pms/hoteldamage/delete",
        { id: row.id },
        (res) => {
          this.getDamageData();
        }
      );
    },
    submit(type) {
      this.$refs[type].validate((valid) => {
        if (valid) {
          if (type == "addType") {
            const params = {
              id: this.typeData.id,
              name: this.typeData.name,
            };
            this.$F.doRequest(
              this,
              "/pms/hoteldamagetype/edit",
              params,
              (res) => {
                this.initData("", "", "", this.typeForm, (res) => {
                  this.typeForm.pageIndex = res.pageIndex;
                  this.typeTotal = res.count;
                });
                this.addTypeVisible = false;
              }
            );
          } else if (type == "addGoods") {
            const params = {
              id: this.goodsData.id,
              damageTypeId: this.goodsData.damageTypeId,
              name: this.goodsData.name,
              damagePrice: this.goodsData.damagePrice,
              state: this.goodsData.state,
              costPrice: this.goodsData.costPrice,
              remark: this.goodsData.remark,
            };
            this.$F.doRequest(this, "/pms/hoteldamage/edit", params, (res) => {
              this.getDamageData();
              this.addGoodsVisible = false;
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabCenter {
  padding: 10px;

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .right {
      text-align: right;
      margin-bottom: 20px;
    }
  }
}
</style>
