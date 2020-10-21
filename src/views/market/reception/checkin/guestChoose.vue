<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-12 17:00:22
 * @FilePath: \jiudian\src\views\market\reception\checkin\guestChoose.vue
 -->

<template>
  <div class="boss-index inRoom" v-if="guestTypeShow">
    <el-dialog
      top="0"
      :visible.sync="guestTypeShow"
      class="guestTypeDia"
      title="客源类型"
      width="500px"
    >
      <el-form :model="checkInForm" style="margin-top: -20px">
        <el-form-item label="客人类型:" class="" style="margin-bottom: 0">
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
            placeholder="请输入内容"
            @select="changeNameGuest($event)"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="guestTypeShow = false">{{ $t('commons.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="submit">{{ $t('commons.confirm') }}</el-button>
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
      checkInForm: {},
      guestTypeShow: false,
    };
  },
  mounted() {},
  methods: {
    guestTypeChange() {
      this.checkInForm.name = "";
    },

    submit() {
      this.$emit("guestChooseCallback", this.checkInForm);
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
      };
      if (this.checkInForm.guestType == 2) {
        this.$F.merge(params, {
          name: query,
          searchType: 1,
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
      //
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
<style lang="scss">
.normal {
  padding: 0 10px 10px !important;
}
</style>
