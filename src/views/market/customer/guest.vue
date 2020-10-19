<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-19 17:29:50
 * @FilePath: \jiudian\src\views\market\customer\guest.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item :label="$t('desk.customer_registerStore') + ':'">
          <el-select v-model="searchForm.storesNum">
            <el-option :label="$t('desk.home_all')" value=""></el-option>
            <el-option
              v-for="item in storeList"
              :key="item.storesNum"
              :label="item.storesName"
              :value="item.storesNum"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_guestsNative') + ':'">
          <el-select
            v-model="searchForm.nationality"
            class="width150"
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option
              v-for="item in nationalityList"
              :key="item.id"
              :label="$i18n.locale == 'ri' ? item.jName : item.cName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_visaType') + ':'">
          <el-select
            v-model="searchForm.visaType"
            class="width150"
            :placeholder="$t('commons.placeChoose')"
          >
            <el-option
              :label="$t('desk.customer_ordinaryVisas')"
              :value="1"
            ></el-option>
            <el-option
              :label="$t('desk.customer_diplomaticVisas')"
              :value="2"
            ></el-option>
            <el-option
              :label="$t('desk.customer_businessVisa')"
              :value="3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.home_name') + ':'">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item :label="$t('desk.order_moblePhone') + ':'">
          <el-input v-model="searchForm.phone" class="width150"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_documentType') + ':'">
          <el-select v-model="searchForm.idcardType" class="width150">
            <el-option :label="$t('desk.home_idCard')" :value="1"></el-option>
            <el-option
              :label="$t('desk.customer_passport')"
              :value="2"
            ></el-option>
            <el-option
              :label="$t('desk.customer_driveLicence')"
              :value="3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('desk.customer_idNo') + ':'">
          <el-input v-model="searchForm.idcard" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button type="primary" class="white" @click="initForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            type="primary"
            class="white"
            @click="addAndEditItemClick('add')"
            >{{ $t("desk.customer_registrationGusets") }}</el-button
          >
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
          :label="$t('desk.home_name')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sex"
          :label="$t('desk.customer_sex')"
          width="100"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.sex | F_sex }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          :label="$t('desk.order_moblePhone')"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="nationality"
          :label="$t('desk.customer_guestsNative')"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ F_nationality(row.nationality) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="idcardType"
          :label="$t('desk.customer_documentType')"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.idcardType | F_idcardType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="idcard"
          :label="$t('desk.customer_idNo')"
        ></el-table-column>
        <el-table-column
          prop="visaType"
          :label="$t('desk.customer_visaType')"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.visaType | F_visaType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="storesNum"
          :label="$t('desk.customer_registerStore')"
        >
          <template slot-scope="{ row }">
            {{ F_storeName(row.storesNum) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('desk.customer_registrationTime')"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          :label="$t('desk.customer_cumulative')"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.cumulativePrice ? row.cumulativePrice : 0 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          :label="$t('desk.customer_nowLiveState')"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            <div v-if="row.checkInFlag">{{ $t("desk.customer_stayIn") }}</div>
            <div v-if="!row.checkInFlag">
              {{ $t("desk.customer_notStayIn") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="160">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleHistory(row)">{{
              $t("desk.customer_guestHistory")
            }}</el-button>
            <el-button type="text" size="mini" @click="handleDetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button
              type="text"
              size="mini"
              @click="addAndEditItemClick('edit', row)"
              >{{ $t("commons.modify") }}</el-button
            >
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
      :title="
        foreignForm.type == 'add'
          ? $t('desk.customer_registrationGusets')
          : $t('desk.customer_editorGuests')
      "
      :visible.sync="setForeignFormVisible"
      class="setForeignForm"
      width="1200px"
    >
      <el-form
        :model="foreignForm"
        label-width="80px"
        size="mini"
        :rules="rules"
        ref="setForeignForm"
      >
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_guestsName')"
                class=""
                prop="name"
              >
                <el-input
                  v-model="foreignForm.name"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_sex')"
                class=""
                prop="sex"
              >
                <el-radio-group v-model="foreignForm.sex">
                  <el-radio :label="1">{{ $t("desk.customer_man") }}</el-radio>
                  <el-radio :label="2">{{
                    $t("desk.customer_woman")
                  }}</el-radio>
                  <el-radio :label="3">{{
                    $t("desk.customer_secret")
                  }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_documentType')"
                class=""
                prop="idcardType"
              >
                <el-select v-model="foreignForm.idcardType" class="width150">
                  <el-option
                    :label="$t('desk.home_idCard')"
                    :value="1"
                  ></el-option>
                  <el-option
                    :label="$t('desk.customer_passport')"
                    :value="2"
                  ></el-option>
                  <el-option
                    :label="$t('desk.customer_driveLicence')"
                    :value="3"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_idNumber')"
                class=""
                prop="idcard"
              >
                <el-input
                  v-model="foreignForm.idcard"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_visaType')"
                class=""
                prop="visaType"
              >
                <el-select v-model="foreignForm.visaType" class="width150">
                  <el-option
                    :label="$t('desk.customer_ordinaryVisas')"
                    :value="1"
                  ></el-option>
                  <el-option
                    :label="$t('desk.customer_diplomaticVisas')"
                    :value="2"
                  ></el-option>
                  <el-option
                    :label="$t('desk.customer_businessVisa')"
                    :value="3"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_validTime')"
                class=""
                prop="dueTime"
              >
                <el-date-picker
                  v-model="foreignForm.dueTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width: 150px"
                  :placeholder="$t('desk.serve_chooseDate')"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.customer_guestNationality')"
                class=""
                prop="nationality"
              >
                <el-select v-model="foreignForm.nationality" class="width150">
                  <el-option
                    v-for="item in nationalityList"
                    :key="item.id"
                    :label="$i18n.locale == 'ri' ? item.jName : item.cName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item
                :label="$t('desk.order_moblePhone')"
                class=""
                prop="phone"
              >
                <el-input
                  v-model="foreignForm.phone"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="24" class="col">
              <el-form-item
                :label="$t('desk.home_note')"
                class=""
                prop="remark"
              >
                <el-input
                  type="textarea"
                  v-model="foreignForm.remark"
                  style="display: block; width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setForeignFormVisible = false">{{
          $t("commons.close")
        }}</el-button>
        <el-button type="primary" @click="addItem('setForeignForm')">{{
          $t("commons.confirm")
        }}</el-button>
      </div>
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
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        storesNum: "",
        nationality: "",
        visaType: "",
        name: "",
        idcardType: "",
        idcard: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      },
      storeList: "",
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      setForeignFormVisible: false,
      nationalityList: "",
      foreignForm: {
        name: "",
        sex: "",
        idcardType: "",
        idcard: "",
        visaType: "",
        dueTime: "",
        nationality: "",
        phone: "",
        remark: "",
      },
    };
  },
  filters: {},
  mounted() {
    this.stores_list();
    this.nationality();
    this.initForm();
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
            message: this.$t("commons.selectIdCardType"),
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
        visaType: [
          {
            required: true,
            message: this.$t("desk.customer_chooseVisaType"),
            trigger: "change",
          },
        ],
        dueTime: [
          {
            required: true,
            message: this.$t("desk.customer_selectDueDate"),
            trigger: "change",
          },
        ],
        nationality: [
          {
            required: true,
            message: this.$t("desk.customer_selectNationality"),
            trigger: "change",
          },
        ],
      };
    },
  },
  methods: {
    initForm() {
      this.searchForm = {
        storesNum: "",
        nationality: "",
        visaType: "",
        name: "",
        idcardType: "",
        idcard: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      };
      this.getDataList();
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
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/foreignguest/list",
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
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },
    // 点击修改或者新增按钮
    addAndEditItemClick(type, row) {
      this.foreignForm.type = type;
      if (type == "add") {
        for (let k in this.foreignForm) {
          this.foreignForm[k] = "";
        }
        this.setForeignFormVisible = true;
      } else {
        this.$F.doRequest(
          this,
          "/pms/foreignguest/findone",
          {
            id: row.id,
          },
          (res) => {
            for (let k in this.foreignForm) {
              this.foreignForm[k] = res[k];
            }
            this.foreignForm.id = res.id;
            this.setForeignFormVisible = true;
          }
        );
      }
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/foreignguest/edit",
            this.foreignForm,
            (res) => {
              this.getDataList();
              this.setForeignFormVisible = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    handleDetail(item) {
      this.$router.push({
        name: "foreignDetail",
        query: {
          id: item.id,
        },
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
