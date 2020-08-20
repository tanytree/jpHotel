<template>
  <div class="boss-index">
    <div class="tag-top">
      <span class="label">
        <el-checkbox v-model="findOne.arriveStatus">{{$t('manager.hp_dealNotArrive')}}</el-checkbox>
      </span>
      <span class="tips">{{$t('manager.hp_selectExplain')}}</span>
    </div>
    <div class="tag-top">
      <span class="label">
        <el-checkbox v-model="findOne.leaveStatus">{{$t('manager.hp_dealNotLeave')}}</el-checkbox>
      </span>
      <span class="tips">{{$t('manager.hp_selectExplain')}}</span>
    </div>
    <div class="tag-top">
      <span class="label">
        <el-checkbox v-model="findOne.leaveOrder">{{$t('manager.hp_dealGoOrder')}}</el-checkbox>
      </span>
      <span class="tips">{{$t('manager.hp_selectExplain')}}</span>
    </div>
    <div class="tag-top">
      <span class="label">
        <el-checkbox v-model="findOne.isOd">{{$t('manager.hp_roomState')}}</el-checkbox>
      </span>
      <span class="tips">{{$t('manager.hp_selectExplain')}}</span>
    </div>
    <div class="tag-top">
      <span class="label">
        <el-checkbox v-model="findOne.trialType">{{$t('manager.hp_autoSuccession')}}</el-checkbox>
      </span>
      <span class="tips">{{$t('manager.hp_selectExplain')}}</span>
    </div>
    <div class="tag-top">
      <span class="label">{{$t('manager.hp_auditWay')+':'}}</span>
      <span class="tips">
        <el-radio-group v-model="findOne.state">
          <el-radio :label="1">{{$t('manager.hp_auditManual')}} + {{$t('manager.hp_auditAuto')}}</el-radio>
          <el-radio :label="2">{{$t('manager.hp_auditManual')}}</el-radio>
          <el-radio :label="3">{{$t('manager.hp_auditAuto')}}</el-radio>
        </el-radio-group>
      </span>
    </div>
    <div class="tag-top">
      <span class="label">{{$t('manager.hp_allwAuditTime')+':'}}</span>
      <span class="value">
        <el-time-picker
          size="small"
          v-model="findOne.trialStartTime"
          value-format="HH-mm"
          clearable
        ></el-time-picker>
        <span class="line">--</span>
        <el-time-picker size="small" v-model="findOne.trialEndTime" value-format="HH-mm" clearable></el-time-picker>
      </span>
    </div>
    <div class="tag-top">
      <span class="label">{{$t('manager.hp_auditAutoTime')+':'}}</span>
      <span class="value">
        <el-time-picker size="small" v-model="findOne.trialAutoTime" value-format="HH-mm" clearable></el-time-picker>
      </span>
      <span class="tips">{{$t('manager.hp_auditInstructions')}}</span>
    </div>
    <div class="tag-top">
      <el-button type="primary" class="submit" size="small" @click="submit">{{$t('commons.save')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: this.today,
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: this.yesterday,
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: this.weekGo,
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  computed: {
    today: {
      get() {
        return this.$t("manager.hp_today");
      },
      set() {},
    },
    yesterday: {
      get() {
        return this.$t("manager.hp_yesterday");
      },
      set() {},
    },
    weekGo: {
      get() {
        return this.$t("manager.hp_weekGo");
      },
      set() {},
    },
  },
  watch: {
    today(newValue, oldValue) {
      this.today = newValue;
    },
    yesterday(newValue, oldValue) {
      this.yesterday = newValue;
    },
    weekGo(newValue, oldValue) {
      this.weekGo = newValue;
    },
  },
  props: { findOne: Object, initData: Function },
  methods: {
    submit() {
      const param = {
        arriveStatus: this.findOne.arriveStatus ? 1 : 2,
        leaveStatus: this.findOne.leaveStatus ? 1 : 2,
        leaveOrder: this.findOne.leaveOrder ? 1 : 2,
        isOd: this.findOne.isOd ? 1 : 2,
        trialType: this.findOne.trialType ? 1 : 2,
        state: this.findOne.state,
        trialStartTime: this.findOne.trialStartTime,
        trialEndTime: this.findOne.trialEndTime,
        trialAutoTime: this.findOne.trialAutoTime,
      };
      this.$F.doRequest(this, "/pms/nighttrial/edit", param, (res) => {
        this.initData();
      });
    },
  },
};
</script>

<style lang="scss">
</style>
