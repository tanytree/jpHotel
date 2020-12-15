<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-15 17:47:46
 * @FilePath: \jiudian\src\views\market\reception\checkin\guestChoose.vue
 -->

<template>
  <div class="boss-index inRoom" v-if="guestTypeShow">
    <el-dialog
      top="0"
      :visible.sync="guestTypeShow"
      class="guestTypeDia"
      :title="$t('desk.order_sourceType')"
      width="500px"
    >
      <el-form :model="checkInForm" ref="checkInForm" style="margin-top: -20px" label-width="100px">
        <el-form-item
          :label="$t('desk.customer_guestType') + ':'"
          class=""
          style="margin-bottom: 0"
        >
          <el-radio-group
            v-model="checkInForm.guestType"
            @change="guestTypeChange"
          >
            <el-radio
              v-for="(item, key, index) of $t('commons.guestType')"
              :label="key"
              :key="index"
              >{{ item }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label=""
          class=""
          style="margin-bottom: 0"
          label-width="0"
          v-if="checkInForm.guestType == 2 || checkInForm.guestType == 3"
        >
          <el-autocomplete
            v-model="checkInForm.name"
            name="name"
            :fetch-suggestions="remoteMethodGuest"
            :highlight-first-item="true"
            popper-class="popper-class"
            :trigger-on-focus="false"
            :placeholder="$t('desk.book_inputContent')"
            @select="changeNameGuest($event)"
          ></el-autocomplete>
        </el-form-item>
        <!-- 当客人类型为团队时 -->
       <div v-if="checkInForm.guestType == 4" >
          <el-form-item label="团队名:"  >
          <el-input v-model="checkInForm.teamName" placeholder="团队名" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.teamPronunciation" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item>
         <el-form-item label="导游姓名:"  >
          <el-input v-model="checkInForm.guideName" placeholder="导游姓名" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.guidePronunciation" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="领队姓名:"  >
          <el-input v-model="checkInForm.leaderName" placeholder="领队姓名" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.leaderPronunciation" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item> 
        <el-form-item label="团体电话:"  >
          <el-input v-model="checkInForm.teamMobile" placeholder="团体电话" style="width:330px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="团体地址:"  >
          <el-input v-model="checkInForm.teamAdd1" minlength='3' maxlength='3'  style="width:75px" size="small"></el-input>
          <span style="margin:0 5px">-</span>
          <el-input v-model="checkInForm.teamAdd2" minlength='4' maxlength='4' @blur="checkAddress(checkInForm.teamAdd1,checkInForm.teamAdd2,'team')" style="width:75px;" size="small"></el-input>
          <el-input v-model="checkInForm.teamAdd3" placeholder="输入邮编检索出地址" style="width:160px;margin-left:5px;" size="small"></el-input>
        </el-form-item> 
        <el-form-item label="联络人姓名:"  >
          <el-input v-model="checkInForm.contactName" placeholder="联络人姓名" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.contactPinyin" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item> 
        <el-form-item label="联络人手机号:"  >
          <el-input v-model="checkInForm.contactPhone" placeholder="联络人手机号" style="width:330px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联络人信箱:"  >
          <el-input v-model="checkInForm.contactEmail" placeholder="联络人信箱" style="width:330px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="旅行社名称:"  >
          <el-input v-model="checkInForm.travelTeam" placeholder="旅行社名称" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.travelPronunciation" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item> 
         <el-form-item label="旅行社地址:"  >
          <el-input v-model="checkInForm.travelAdd1"  style="width:75px" size="small"></el-input>
          <span style="margin:0 5px">-</span>
          <el-input v-model="checkInForm.travelAdd2"  style="width:75px;" @blur="checkAddress(checkInForm.travelAdd1,checkInForm.travelAdd2,'travel')" size="small"></el-input>
          <el-input v-model="checkInForm.travelAdd3" placeholder="输入邮编检索出地址" style="width:160px;margin-left:5px;" size="small"></el-input>
        </el-form-item> 
         <el-form-item label="联络人姓名:"  >
          <el-input v-model="checkInForm.travelContactName" placeholder="联络人姓名" style="width:160px" size="small"></el-input>
          <el-input v-model="checkInForm.travelContactPinyin" placeholder="发音" style="width:160px;margin-left:10px;" size="small"></el-input>
        </el-form-item> 
        <el-form-item label="联络人手机号:"  >
          <el-input v-model="checkInForm.travelContactPhone" placeholder="联络人手机号" style="width:330px" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联络人信箱:"  >
          <el-input v-model="checkInForm.tarvelContactEmail" placeholder="联络人信箱" style="width:330px" size="small"></el-input>
        </el-form-item>
       </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="guestTypeShow = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button size="small" type="primary" @click="submit">{{
          $t("commons.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  // props: ['checkInForm'],
  data() {
    return {
      checkInForm: {
      },
      guestTypeShow: false,
    };
  },
  mounted() {
  },
  methods: {
    // 输入邮编检索地址
    checkAddress(code1,code2,type){
        this.$F.commons.zipCode(code1,code2).then(res=>{
         if(res.results.length>0){
            if(type=='team'){
           let addA =res.results[0].address1+res.results[0].address2+res.results[0].address3;
           this.$set(this.checkInForm,'teamAdd3',addA)
          }else{
            let addB =res.results[0].address1+res.results[0].address2+res.results[0].address3;
            this.$set(this.checkInForm,"travelAdd3",addB)
          }
         }
        })
    },
    
    guestTypeChange() {
      this.checkInForm.name = "";
    },
    submit() {
      if (this.checkInForm.guestType == 2 && this.checkInForm.memberCard) {
        this.$emit("guestChooseCallback", this.checkInForm);
      } else if (this.checkInForm.guestType == 3 && this.checkInForm.enterId) {
        this.$emit("guestChooseCallback", this.checkInForm);
      } else if (this.checkInForm.guestType == 1) {
        this.checkInForm.memberCard = "";
        this.checkInForm.enterId = "";
        this.$emit("guestChooseCallback", this.checkInForm);
      }
      this.guestTypeShow = false;
    },

    dialogOpen(data) {
      this.checkInForm = this.$F.deepClone(data);
      // checkInForm.name = '';
      this.guestTypeShow = true;
    },

    remoteMethodGuest(query, cb) {
      let params = {
        pageIndex: 1,
        pageSize: 999,
        paging: false,
        state: 1,
        status: 1,
        isBlacklist: 1,
        storesNum: "",
      };
      //会员
      if (this.checkInForm.guestType == 2) {
        this.$F.merge(params, {
          name: query,
        });
        this.$F.doRequest(this, "/pms/hotelmember/list", params, (res) => {
          this.options = res.list || [];
          this.options.forEach((element) => {
            element.value =
              element.name +
              "+" +
              (element.mobile || "") +
              "+" +
              (element.memberCard || "");
          });
          cb(this.options);
          this.$forceUpdate();
        });
      } else {
        //单位
        this.$F.merge(params, {
          enterName: query,
          state: 1,
        });
        this.$F.doRequest(this, "/pms/hotelenter/list", params, (res) => {
          this.options = res.list || [];
          this.options.forEach((element) => {
            element.value =
              element.enterName +
              "+" +
              (element.mobile || element.contactPhone) +
              "+" +
              (element.contractNum || "");
          });
          cb(this.options);
          this.$forceUpdate();
        });
      }
    },

    changeNameGuest(e) {
      if (e.name || e.enterName) {
        if (this.checkInForm.guestType == 2) {
          this.checkInForm.name = e.name;
          this.checkInForm.idcard = e.idcard;
          this.checkInForm.memberCard = e.memberCard;
          this.checkInForm.idcardType = e.idcardType.toString();
          this.checkInForm.mobile = e.mobile;
          this.checkInForm.sex = e.sex.toString();
        } else {
          this.checkInForm.name = e.enterName;
          this.checkInForm.enterId = e.id;
        }
      } else {
        this.checkInForm.name = e;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.normal {
  padding: 0 10px 10px !important;
}
.el-form-item{
  margin-bottom: 5px;
}
</style>
