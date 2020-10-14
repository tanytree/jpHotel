<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-12 20:28:06
 * @FilePath: \jiudian\src\views\market\orders\coms\invoicing.vue
 -->

<template>
  <div id="page1" class="boss-index" v-if="openInvoiceShow">
    <!--开发票-->
    <el-dialog
      top="0"
      title="开发票"
      :visible.sync="openInvoiceShow"
      width="900px"
    >
      <el-form
        :model="openInvoiceForm"
        ref="openInvoice"
        :rules="rules"
        size="mini"
        label-width="130px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="消费金额：">
              <el-input
                class="width150"
                type="text"
                v-model="openInvoiceForm.consumePrice"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已开票金额：">
              <el-input
                class="width150"
                type="text"
                v-model="openInvoiceForm.invoicePrice"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="付款公司名称：" prop="companyName">
              <el-input
                class="width150"
                type="text"
                v-model="openInvoiceForm.companyName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目：" prop="projectName">
              <el-input
                class="width150"
                type="text"
                v-model="openInvoiceForm.projectName"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额：" prop="prices">
              <el-input
                class="width150"
                type="text"
                v-model="openInvoiceForm.prices"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="日期：" prop="invoiceTime">
              <el-date-picker
                style="width: 150px"
                v-model="openInvoiceForm.invoiceTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注：">
              <el-input
                style="width: 400px"
                type="textarea"
                v-model="openInvoiceForm.remark"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openInvoiceShow = false">取消</el-button>
        <el-button type="primary" @click="openInvoiceSubmit('openInvoice')"
          >确定</el-button
        >
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
        checkInId: "",
        consumePrice: 0,
        invoicePrice: 0,
        companyName: "",
        projectName: "",
        prices: "",
        invoiceTime: "",
        remark: "",
      },
      rules: {
        companyName: [
          { required: true, message: "请填写付款公司名称", trigger: "blur" },
        ],
        projectName: [
          { required: true, message: "请填写项目名称", trigger: "blur" },
        ],
        prices: [{ required: true, message: "请填写金额", trigger: "blur" }],
        invoiceTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },

  created() {
    this.$F.handleThirdMenu(this);
    let type = this.$route.query.type;
    if (type) this.activeName = type;
  },
  mounted() {},
  methods: {
    //开发票按钮点击
    init(item) {
      this.openInvoiceForm.checkInId = item.id;
      this.openInvoiceForm.consumePrice = item.consumeTotalPrice;
      // this.openInvoiceForm.invoicePrice = item. 这里卡住

      this.openInvoiceShow = true;
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
