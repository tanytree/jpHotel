<template>
  <div class="boss-index">
    <!--商品管理-->
    <div class="content" v-if="tab_show">
      <el-form class="term line demo-form-inline" v-model="form" inline size="small">
        <el-form-item :label="$t('manager.grsl_goodsNameB')+':'">
          <el-input v-model="form.name" :placeholder="$t('manager.grsl_goodsNameC')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.hk_goodsTypeA')+':'">
          <el-select v-model="form.categoryType" :placeholder="$t('manager.hk_pleaseSelect')" @change="geProductType">
            <el-option :label="$t('manager.grsl_matter')" :value="1"></el-option>
            <el-option :label="$t('manager.grsl_service')" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.categoryType" :label="$t('manager.grsl_goodsTypeA')+':'">
          <el-cascader :placeholder="$t('manager.hk_pleaseSelect')" v-model="form.category" :options="category" :props="categoryProps" @change="casChange"></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('manager.grsl_goodsState')+':'">
          <el-select v-model="form.status" :placeholder="$t('manager.hk_pleaseSelect')">
            <el-option :label="$t('manager.hk_enable')" :value="1"></el-option>
            <el-option :label="$t('manager.hk_disable')" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="search">{{$t('commons.queryBtn')}}</el-button>
          <el-button class="grey" @click="reset">{{$t('commons.resetBtn')}}</el-button>
        </el-form-item>
        <el-form-item class="form-inline-flex">
          <el-row class="form-inline-flex">
            <!--<el-button class="white" @click="downModel('dynamicValidateForm')">{{$t('commons.downloadTemplate')}}</el-button>
                        <el-upload class="button_upload" ref="upload" action="123" :limit="1" :http-request='importModel'>
                            <el-button class="white">{{$t('manager.grsl_import')}}</el-button>
                        </el-upload>-->
            <el-button @click="popup('add')" class="submit">{{$t('manager.grsl_addGoods')}}</el-button>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="components-edit">
        <el-table ref="multipleTable" :data="list" border height="100%" header-row-class-name="default" size="small">
          <el-table-column prop="name" :label="$t('manager.grsl_goodsNameA')"></el-table-column>
          <el-table-column :label="$t('manager.grsl_defaultTetailPriceA')">
            <template slot-scope="scope">
              ¥ {{$F.numFormate(scope.row.retailPrice)}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('manager.grsl_costPrice')">
            <template slot-scope="scope">
              ¥ {{$F.numFormate(scope.row.costPrice)}}
            </template>
          </el-table-column>
          <!--                    <el-table-column prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')"></el-table-column>-->
          <el-table-column :label="$t('commons.operating')" width="350">
            <template slot-scope="scope">
              <el-popconfirm v-if="scope.row.status == 1" :title="$t('manager.grsl_sureHk')" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="popup('bin', scope.row)">
                <el-button slot="reference" type="text" :disabled="scope.row.status == 2">{{scope.row.state == 1 ? $t('manager.hk_disable') :  $t('manager.hk_enableA')}}</el-button>
              </el-popconfirm>
              <el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
              <el-popconfirm v-if="scope.row.status == 1" :title="$t('manager.grsl_sureDeleteB')" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="handleDelete(scope.row)">
                <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
              </el-popconfirm>
              <el-button v-if="scope.row.status == 2" type="text" size="small" disabled>{{$t('manager.grsl_hasFailure')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
        </div>
      </div>
    </div>
    <div class="content" v-if="!tab_show">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <a @click="back">{{$t('manager.grsl_goodsManagerment')}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{edit?$t('manager.grsl_resetGoods'):$t('manager.grsl_addGoods')}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="rowData" size="small" :rules="threerules" ref="rowForm" label-width="100px" class="rowForm">
        <el-form-item :label="$t('manager.grsl_goodsMode')+':'">
          <el-radio-group v-model="rowData.categoryType" @change="changeType">
            <el-radio :label="1">{{$t('manager.grsl_matter')}}</el-radio>
            <el-radio :label="2">{{$t('manager.grsl_service')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('manager.grsl_goodsNameB')+':'" prop="name">
              <el-input v-model="rowData.name" :placeholder="$t('manager.grsl_goodsNameC')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('manager.grsl_belongType')+':'" prop="categoryId">
              <el-cascader v-model="rowData.categoryId" :options="categoryArr" :props="categoryProps" @change="casChange"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" :label="$t('manager.grsl_goodsTax')+':'" prop="taxStatus">
              <el-radio-group v-model="rowData.taxStatus">
                <!-- <el-radio :label="1">{{$t('manager.grsl_goodsTaxN')}}</el-radio> -->
                <el-radio :label="2">{{$t('manager.grsl_goodsTaxY')}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="120px" :label="$t('manager.grsl_goodsService')+':'" prop="seviceStatus">
              <el-radio-group v-model="rowData.seviceStatus">
                <el-radio :label="1">{{$t('manager.grsl_goodsServiceN')}}</el-radio>
                <!-- <el-radio :label="2">{{$t('manager.grsl_goodsServiceY')}}</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="rowData.categoryType == 2" :label="$t('manager.grsl_billingMode')+':'">
          <el-radio-group v-model="rowData.priceModel">
            <el-radio :label="1">{{$t('manager.grsl_billingPer')}}</el-radio>
            <el-radio :label="2">{{$t('manager.grsl_billingTime')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="rowData.categoryType == 2 && rowData.priceModel == 2" :label="$t('manager.grsl_startFee')+':'" prop="name">
          <el-input v-model="rowData.priceStartMinute" style="width: 80px; display: inline-block; margin-right: 10px;"></el-input>
          <span>{{$t('manager.grsl_startMinute')}}</span>
        </el-form-item>
        <el-form-item v-if="rowData.categoryType == 2 && rowData.priceModel == 2" :label="$t('manager.grsl_chargeTime')+':'" :label-width="$i18n.locale == 'ri' ?'155px':''" prop="name">
          <el-input v-model="rowData.priceTime" style="width: 80px; display: inline-block; margin: 0 10px;"></el-input>
          <span>{{$t('manager.grsl_chargeMinute')}}</span>
          <el-checkbox v-model="rowData.capsPriceFlag" style="margin: 0 15px">{{$t('manager.ps_addSky')}}</el-checkbox>
          <span class="tip">{{$t('manager.hk_addGetContent')}}</span>
        </el-form-item>
        <el-col :span="16">
          <el-form-item :label="$t('manager.grsl_goodsDescription')+':'">
            <el-input type="textarea" resize="none" :rows="3" v-model="rowData.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="flex_1">
        <el-form :model="rowData" size="small" inline :rules="threerules" ref="priceForm" label-position="top" class="price">
          <el-form-item v-if="rowData.priceModel != 2" class="cost" prop="retailPrice" :label="$t('manager.grsl_defaultNoPrice')">
            <el-input v-model="rowData.retailPrice" class="row-width">
              <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
            </el-input>
          </el-form-item>
          <el-form-item v-if="rowData.categoryType == 1" prop="costPrice" :label="$t('manager.grsl_costNoPrice')">
            <el-input v-model="rowData.costPrice" class="row-width">
              <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
            </el-input>
          </el-form-item>
          <div v-if="rowData.categoryType == 2 && rowData.priceModel == 2">
            <el-form-item prop="startPrice" :label="$t('manager.hk_startAt')">
              <el-input v-model="rowData.startPrice" class="row-width">
                <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
              </el-input>
            </el-form-item>
            <el-form-item prop="minutePrice">
              <span slot="label">
                {{$t('manager.hk_mei')}}
                （{{rowData.priceTime}}）
                {{$t('manager.hk_getPriceRule')}}
              </span>
              <el-input v-model="rowData.minutePrice" class="row-width">
                <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
              </el-input>
            </el-form-item>
            <el-form-item prop="capsPrice" v-if="rowData.capsPriceFlag" :label="$t('manager.ps_skyPriceA')">
              <el-input v-model="rowData.capsPrice" class="row-width">
                <svg slot="prefix" t="1611640798495" class="svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3317" width="128" height="128"><path d="M798.848 512C817.216 512 832.064 497.728 832 480 832.064 462.336 817.216 448 798.848 448L576 448 576 429.248l246.016-246.016c12.992-12.992 13.376-33.6 0.896-46.08-12.352-12.544-33.152-12.096-46.144 0.832L544 370.688 311.232 137.984c-12.928-12.928-33.664-13.376-46.08-0.832-12.48 12.416-12.16 33.088 0.896 46.08L512 429.248 512 448 289.152 448C270.848 448 255.936 462.336 256 480 256 497.6 270.784 512 289.216 512L512 512l0 128L289.152 640C270.848 640 255.936 654.4 256 672 256 689.6 270.784 704 289.216 704L512 704l0 158.848C512 881.152 526.272 896 544 896 561.6 896 576 881.152 576 862.848L576 704l222.848 0c18.304 0 33.216-14.272 33.152-32 0.064-17.6-14.784-32-33.152-32L576 640 576 512 798.848 512z" p-id="3318"></path></svg>
              </el-input>
            </el-form-item>
            <!-- <el-form-item prop="depositPrice" :label="$t('manager.hk_deposit')">
                            <el-input v-model="rowData.depositPrice" class="row-width"></el-input>
                        </el-form-item> -->
          </div>

          <!--<el-form-item prop="employeePrice" :label="$t('manager.grsl_defaultEmployeePrice')">
                        <el-input v-model="rowData.employeePrice" class="row-width"></el-input>
                    </el-form-item>
                    <el-form-item prop="buyCount" :label="$t('manager.grsl_defaultBuyNum')">
                        <el-input v-model="rowData.buyCount" class="row-width"></el-input>
                    </el-form-item>-->
          <!--                    <el-form-item class="cost" prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')">-->
          <!--                        <el-input v-model="rowData.inventoryWarning" class="row-width"></el-input>-->
          <!--                    </el-form-item>-->
        </el-form>
      </div>

      <div class="footer">
        <el-button type="primary" size="small" class="submit" @click="submit(1)">{{$t('commons.save')}}
        </el-button>
        <el-button type="primary" size="small" v-if="!edit" class="submit" @click="submit">{{$t('manager.grsl_saveAndAddA')}}
        </el-button>
        <el-button size="small" class="cancel" @click="back">{{$t('commons.back')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      form: {
        name: "",
        status: "",
        categoryType: "",
        category: [],
      },
      categoryArr: [],
      category: [],
      categoryProps: { value: "id", label: "name", children: "child" },
      rowData: {
        name: "",
        categoryId: "",
        remark: "",
        retailPrice: "",
        costPrice: "",
        // employeePrice: "",
        buyCount: "0",
        inventoryWarning: "1000",
        categoryType: 1,
        priceModel: 1,
        priceStartMinute: "",
        priceTime: "",
        capsPriceFlag: false,
        startPrice: "",
        minutePrice: "",
        capsPrice: "",
        depositPrice: "",
        taxStatus:2,
        seviceStatus: 1,
      },
      threerules: {
        name: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        categoryId: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
        retailPrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        costPrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        // employeePrice: [
        //     {required: true, message: this.$t('commons.mustInput'), trigger: "blur"},
        // ],
        buyCount: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        inventoryWarning: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        startPrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        minutePrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        capsPrice: [
          {
            required: true,
            message: this.$t("commons.mustInput"),
            trigger: "blur",
          },
        ],
        taxStatus: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
        seviceStatus: [
          {
            required: true,
            message: this.$t("commons.placeChoose"),
            trigger: "change",
          },
        ],
      },
      tab_show: true,
      edit: true,
    };
  },
  props: {
    list: Array,
    cateList: Array,
    serviceList: Array,
    total: Number,
    initData: Function,
    cateData: Function,
  },
  mounted() {
    this.categoryArr = this.cateList;
    this.category = this.cateList;
  },
  computed: {
    downloadSuccessful: {
      get() {
        return this.$t("manager.grsl_downloadSuccessful");
      },
      set() {},
    },

    importSuccess: {
      get() {
        return this.$t("manager.grsl_importSuccess");
      },
      set() {},
    },
  },
  watch: {
    downloadSuccessful(newValue, oldValue) {
      this.downloadSuccessful = newValue;
    },
    importSuccess(newValue, oldValue) {
      this.importSuccess = newValue;
    },
  },
  methods: {
    search() {
      this.initData(
        this.pageForm,
        this.form.name,
        this.form.category,
        this.form.status,
        this.form.categoryType
      );
    },
    reset() {
      this.form = { name: "", status: "", categoryType: "", category: "" };
      this.category = [];
      this.initData(this.pageForm, "", "", "");
    },
    casChange(value) {
      if (this.tab_show) {
        this.form.category = value[value.length - 1];
      } else {
        this.rowData.categoryId = value[value.length - 1];
      }
    },
    hideRow({ row, rowIndex }) {
      if (row.status !== 1) {
        return { display: "none" };
      }
    },
    changeType(type) {
      this.cateData(type);
      this.rowData.categoryType = type;
      if (type == 1) {
        this.categoryArr = this.cateList;
      } else {
        this.categoryArr = this.serviceList;
        this.rowData.priceModel = 1;
      }
    },
    popup(type, row) {
      if (type == "add") {
        //添加商品
        this.edit = false;
        this.tab_show = false;
        this.rowData.categoryType = 1;
        this.categoryArr = this.cateList;
      } else if (type == "bin") {
        this.$F.doRequest(
          this,
          "/pms/hotelgoods/up_status",
          {
            id: row.id,
            state: row.state == 1 ? 2 : 1,
          },
          (res) => {
            this.$message.success("success");
            this.initData();
          }
        );
      } else if (type == "change") {
        this.edit = true;
        this.tab_show = false;
        row.capsPriceFlag = row.capsPriceFlag == 2 ? true : false;
        this.rowData = row;
        this.changeType(row.categoryType);
      }
    },
    //切换到商品管理
    back() {
      this.tab_show = true;
      this.initData(
        this.pageForm,
        this.form.name,
        this.form.category,
        this.form.status,
        this.form.categoryType
      );
    },
    submit(type) {
      const a = this;
      const param = {
        name: this.rowData.name,
        categoryId: this.rowData.categoryId,
        remark: this.rowData.remark,
        retailPrice:
          this.rowData.priceModel == 2 ? 0 : this.rowData.retailPrice,
        costPrice: this.rowData.categoryType == 2 ? 0 : this.rowData.costPrice,
        // employeePrice: this.rowData.employeePrice,
        buyCount: this.rowData.categoryType == 2 ? 0 : this.rowData.buyCount,
        inventoryWarning: this.rowData.inventoryWarning,
        categoryType: this.rowData.categoryType,
        priceModel: this.rowData.priceModel,
        priceStartMinute: this.rowData.priceStartMinute,
        priceTime: this.rowData.priceTime,
        capsPriceFlag: this.rowData.capsPriceFlag ? 2 : 1,
        startPrice: this.rowData.startPrice,
        minutePrice: this.rowData.minutePrice,
        capsPrice: this.rowData.capsPrice,
        depositPrice: this.rowData.depositPrice,
        taxStatus: this.rowData.taxStatus,
        seviceStatus: this.rowData.seviceStatus,
      };
      if (this.edit) {
        param.id = this.rowData.id;
      }
      this.$F.doRequest(this, "/pms/hotelgoods/edit", param, (res) => {
        a.$message.success(this.$t("commons.saveSuccess"));
        a.initData(
          a.pageForm,
          a.form.name,
          a.form.category,
          a.form.status,
          a.form.categoryType
        );
        if (a.edit || type) {
          a.tab_show = true;
        } else {
          a.tab_show = false;
        }
        a.rowData = {
          name: "",
          categoryId: "",
          remark: "",
          retailPrice: "",
          costPrice: "",
          buyCount: "0",
          inventoryWarning: "1000",
          categoryType: 1,
          priceModel: 1,
          priceStartMinute: "",
          priceTime: "",
          capsPriceFlag: false,
          startPrice: "",
          minutePrice: "",
          capsPrice: "",
          depositPrice: "",
          taxStatus: 2,
          seviceStatus: 1,
        };
      });
    },
    currentChange(val) {
      this.pageForm.pageIndex = val;
      this.initData(
        this.pageForm,
        this.form.name,
        this.form.category,
        this.form.status,
        this.form.categoryType
      );
    },
    downModel() {
      // this.$F.doRequest(this, "/pms/hotelgoods/download", {}, (res) => {
      //     this.$message.success(this.downloadSuccessful);
      // });
      this.$F.commons.downloadTemplate("/pms/hotelgoods/download");
    },
    importModel(params) {
      var a = this;
      console.log(params);
      let formData = new FormData();
      formData.append("filename", params.file);
      formData.append("platSource", 1005);
      axios
        .post(this.$F.getUploadUrl("pms/hotelgoods/upload"), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          this.$message.success(this.importSuccess);
        });
    },
    handleDelete(row) {
      this.$F.doRequest(
        this,
        "/pms/hotelgoods/up_status",
        {
          id: row.id,
          state: "",
        },
        (res) => {
          this.$message.success(this.$t("commons.delete_success"));
          this.initData(
            this.pageForm,
            this.form.name,
            this.form.category,
            this.form.status,
            this.form.categoryType
          );
        }
      );
    },
    geProductType(v) {
      this.cateData(v);
      if (v === 1) {
        this.category = this.cateList;
      } else {
        this.category = this.serviceList;
      }
    },
  },
};
</script>

<style lang="less" >

.row-width {
  width: 120px;
}
.content {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  .components-edit {
    display: flex;
    flex-direction: column;
    flex: 1;

    .block {
      display: flex;
      align-items: center;
    }
  }

  .button_upload {
    margin: 0 10px;
    height: 35px;

    .el-upload-list {
      display: none;
    }
  }

  .footer {
    padding-top: 20px;
    border-top: 1px solid #e2e2e2;
  }
}
.rowForm {
  .el-cascader {
    display: block;
  }
  .tip {
    color: #888888;
  }
}
</style>
