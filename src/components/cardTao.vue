<!--
 * @Date: 2020-12-24 16:54:56
 * @Author: 陶子
 * @LastEditTime: 2020-12-24 17:37:23
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
      <span>房型：{{dataInfo.roomTypeName}} </span>
      <span>房间号：{{dataInfo.houseNum}}</span><span>入住人：{{dataInfo.personList && dataInfo.personList.length && dataInfo.personList[0].name}}</span>
    </div>

    <el-form
      ref="paymentForm"
      :rules="paymentRules"
      :model="paymentForm"
      label-width="110px"
    >
      <el-form-item label="挂账金额" prop="name">
        <el-input v-model="paymentForm.name" style="width: 260px"></el-input>
      </el-form-item>
      <el-form-item label="挂账方式" prop="region">
        <el-select
          v-model="paymentForm.region"
          placeholder="请选择活动区域"
          style="width: 260px"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂账单位" prop="date1">
        <el-select
          v-model="paymentForm.date1"
          placeholder="请选择活动区域"
          style="width: 260px"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="paymentForm.desc"
          style="width: 260px"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="paymentVisible = false">取消</el-button>
      <el-button type="primary" @click="paymentVisible = false">确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props:['dataInfo'],
  data() {
    return {
      paymentVisible: false,
      paymentForm: {},
    };
  },
  computed: {
    paymentRules() {
      return {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        resource: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      };
    },
  },
  methods: {
    resetVisibel() {
      this.paymentVisible = true;
       console.log(this.dataInfo);
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