<!--
 * @Date: 2020-12-24 16:54:56
 * @Author: 陶子
 * @LastEditTime: 2020-12-25 10:32:01
 * @FilePath: \jiudian\src\components\cardTao.vue
-->
<template>
  <!-- 挂账dialog -->
  <el-dialog
    top="0"
    width="40%"
    title="挂账"
    :visible.sync="paymentVisible"
    append-to-body
  >
    <div class="innerBoxTop">
      <span>房型：{{ currentRoom.roomTypeName }} </span>
      <span>房间号：{{ currentRoom.houseNum }}</span
      ><span
        >入住人：{{
          currentRoom.personList &&
          currentRoom.personList.length &&
          currentRoom.personList[0].name
        }}</span
      >
    </div>

    <el-form
      ref="paymentForm"
      :rules="paymentRules"
      :model="paymentForm"
      label-width="110px"
    >
      <el-form-item label="挂账金额" prop="payPrice">
        <el-input
          v-model="paymentForm.payPrice"
          style="width: 260px"
        ></el-input>
      </el-form-item>
      <el-form-item label="挂账方式" prop="putUp">
        <el-select
          v-model="paymentForm.putUp"
          placeholder="请选择挂账方式"
          style="width: 260px"
        >
          <el-option
            v-for="(item, index) in $t('commons.paymentWay')"
            :key="index"
            :value="index"
            :label="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂账单位" prop="enterId">
        <el-select
          v-model="paymentForm.enterId"
          filterable
          remote
          reserve-keyword
          @change="enterNameChange"
          style="width: 260px"
          :placeholder="$t('commons.pleaseEnter')"
        >
          <el-option
            v-for="item in hotelenterList"
            :key="item.id"
            :value="item.id"
            :label="item.enterName"
          >
            {{ item.enterName }}【{{ item.enterPinyin }}】
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="paymentForm.remark"
          style="width: 260px"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="paymentVisible = false">取消</el-button>
      <el-button type="primary" @click="consume_oper('paymentForm')"
        >确认</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ["detailData", "currentRoom"],
  data() {
    return {
      paymentVisible: false,
      paymentForm: {},
      hotelenterList: [], //挂账企业列表
      paymentForm: {
        payPrice: "", //挂账金额
        putUp: "", //挂账方式
        enterId: "", //挂账单位
        priceType: 13, // 13代表挂账
        payType: 0, //挂账无需支付方式
        state: 1, //1未结；2已结
        /////////////
        checkInId: "",
        roomId: "",
        roomNum: "",
      },
    };
  },
  computed: {
    paymentRules() {
      return {
        payPrice: [
          { required: true, message: "请填写挂账金额", trigger: "blur" },
        ],
        putUp: [
          { required: true, message: "请选择挂账方式", trigger: "change" },
        ],
        enterId: [
          { required: true, message: "请选择挂账单位", trigger: "change" },
        ],
      };
    },
  },
  created() {
    this.hotelenter_list();
  },
  methods: {
    resetVisibel(checkInId) {
      this.paymentForm.checkInId = checkInId;
      this.paymentVisible = true;
    },
    consume_oper(formName) {
      if (this.currentRoom.id) {
        this.paymentForm.roomId = this.currentRoom.id;
        this.paymentForm.roomNum = this.currentRoom.houseNum;
      } else {
        if (this.detailData.inRoomList.length > 0) {
          this.paymentForm.roomId = this.detailData.inRoomList[0].id;
          this.paymentForm.roomNum = this.detailData.inRoomList[0].houseNum;
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/consume/consume_oper",
            this.paymentForm,
            (res) => {
              this.paymentForm = {
                payPrice: "", //挂账金额
                putUp: "", //挂账方式
                enterId: "", //挂账单位
                priceType: 13, // 13代表挂账
                payType: 0, //挂账无需支付方式
                state: 1, //1未结；2已结
                /////////////
                checkInId: "",
                roomId: "",
                roomNum: "",
              };
              this.paymentVisible = false;
              this.$emit("refreshFatherData");
            }
          );
        } else {
          return false;
        }
      });
    },
    enterNameChange(e) {
      console.log(e);
      this.paymentForm.enterId = e;
      this.hotelenterList.forEach((element) => {
        if (e == element.id) {
          this.paymentForm.creditName = element.enterName;
        }
      });
    },
    /**获取挂账企业 */
    hotelenter_list() {
      let searchForm = {
        id: "",
        state: "",
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: false,
        pageIndex: 1,
        pageSize: 10,
      };
      this.loading = true;
      this.$F.doRequest(this, "/pms/hotelenter/list", searchForm, (res) => {
        this.loading = false;
        console.log(res);
        this.hotelenterList = res.list;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.innerBoxTop {
  > span {
    margin-right: 40px;
  }
  margin-bottom: 10px;
}
</style>