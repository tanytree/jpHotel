<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-08 13:35:07
 * @FilePath: \jiudian\src\views\market\orders\coms\invoicing.vue
 -->

<template>
  <div id="page1" class="boss-index" v-if="openInvoiceShow">
    <!--开发票-->
    <el-dialog top="0" :title="$t('desk.order_invoice')" :visible.sync="openInvoiceShow" width="65%">
      <el-form :model="openInvoiceForm" ref="openInvoice" :rules="rules" size="mini" label-width="130px">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('desk.add_receiptNo')+':'" >
              <el-input v-model="openInvoiceForm.prefix" style="width: 150px" :placeholder="$t('desk.customer_numBefore')" @blur="requestnumDetail"></el-input>
              <span style="margin-left: 10px">{{ date_serial }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_receiptTime') + ':'" prop="invoiceTime">
              <el-date-picker style="width: 150px" v-model="openInvoiceForm.invoiceTime" type="date" :placeholder="$t('desk.serve_chooseDate')">
              </el-date-picker>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item :label="$t('desk.order_payCompanyName') + ':'" prop="companyName">-->
<!--              <el-input class="width150" type="text" v-model="openInvoiceForm.companyName" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_constProject') + ':'" prop="projectName">
              <el-input class="width150" type="text" v-model="openInvoiceForm.projectName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('desk.customer_sumA') + ':'" prop="prices">
              <el-input class="width150" type="text" v-model="openInvoiceForm.prices" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_invoicedAmount') + ':'">
              <el-input class="width150" type="number" v-model="openInvoiceForm.invoicePrice" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-form-item :label="$t('desk.customer_constPrice') + ':'">-->
<!--              <el-input class="width150" type="number" v-model="openInvoiceForm.consumePrice" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row>
           <el-col :span="12">
            <el-form-item :label="$t('desk.home_note')">
              <el-input v-model="openInvoiceForm.remark" style="width: 150px" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openInvoiceShow = false">{{
                    $t("commons.cancel")
                }}</el-button>
        <el-button type="primary" @click="openInvoiceSubmit('openInvoice')">{{ $t("commons.confirm") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["currentRoom", "detailData"],
  data() {
    return {
      openInvoiceShow: false,
      openInvoiceForm: {
        mobile: "",
        checkInId: "",
        consumePrice: 0,
        invoicePrice: 0,
        roomNum: "-",
        companyName: "",
        projectName: "",
        prices: "",
        invoiceTime: "",
        remark: "",
        receiptNumber: "",
      },
      date_serial: null,
    };
  },
  computed: {
    rules() {
      return {
        companyName: [
          {
            required: true,
            message: this.$t("desk.order_inputCompanyName"),
            trigger: "blur",
          },
        ],
        projectName: [
          {
            required: true,
            message: this.$t("desk.order_inputProjectName"),
            trigger: "blur",
          },
        ],
        prices: [
          {
            required: true,
            message: this.$t("desk.order_inputMoney"),
            trigger: "blur",
          },
        ],
        invoiceTime: [
          {
            type: "date",
            required: true,
            message: this.$t("desk.order_chooseDate"),
            trigger: "change",
          },
        ],
      };
    },
  },
  created() {
    this.$F.handleThirdMenu(this);
    let type = this.$route.query.type;
    if (type) this.activeName = type;
  },
  mounted() {},
  methods: {
    //开发票按钮点击
    init(item, openInvoiceForm) {
      //
      this.$F.merge(this.openInvoiceForm, openInvoiceForm || {});
      if (item.id) {
        this.openInvoiceForm.checkInId = item.id;
        this.openInvoiceForm.consumePrice = item.consumeTotalPrice;
        this.openInvoiceForm.mobile = item.mobile;
        this.openInvoiceForm.name = item.name;
        this.openInvoiceForm.roomNum = item.hotelCheckInRoom.houseNum;
      }
      // this.openInvoiceForm.invoicePrice = item. 这里卡住
      this.openInvoiceShow = true;
    },
    requestnumDetail() {
      if (this.openInvoiceForm.prefix) {
        let params = {
          prefix: this.openInvoiceForm.prefix,
        };
        this.$F.doRequest(
          this,
          "/pms/invoice/invoice_account_serial",
          params,
          (res) => {
            this.openInvoiceForm.receiptNumber = res.prefix_date_serial;
            this.date_serial = res.date_serial;
          }
        );
      }
    },
    //开发票提交
    openInvoiceSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/invoice/open_invoice",
            this.openInvoiceForm,
            (res) => {
              this.openInvoiceShow = false;
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
              this.$emit("consume_order_list");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
