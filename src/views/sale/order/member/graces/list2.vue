<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->

<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
            <el-row>
                <div class="header">房费获得</div>
                <el-form-item label="是否开启：" prop="house_get_flag">
                    <el-radio-group v-model="ruleForm.house_get_flag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="获取比例：" prop="house_get_ratio">
                    <el-input style="width:200px" v-model="ruleForm.house_get_ratio" placeholder="0到1之间的数"></el-input>
                    <span style="color:#666666">获取积分=实际房费*获取比例*换算比例</span>
                </el-form-item>
            </el-row>

            <el-row>
                <div class="header">会议厅获得</div>
                <el-form-item label="是否开启：" prop="chamber_get_flag">
                    <el-radio-group v-model="ruleForm.chamber_get_flag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>

            <el-row>
                <div class="header">餐费获得</div>
                <el-form-item label="是否开启：" prop="meeting_get_flag">
                    <el-radio-group v-model="ruleForm.meeting_get_flag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-row>
            <el-row>
                <div class="header">商品费获得</div>
                <el-form-item label="是否开启：" prop="shop_get_flag">
                    <el-radio-group v-model="ruleForm.shop_get_flag">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="折扣比例：" prop="shop_get_ratio">
                    <el-input style="width:200px;" v-model="ruleForm.shop_get_ratio" placeholder="0到1之间的数"></el-input>
                    <span style="color:#666666;margin-left:5px;">获取积分=实际商品费*获取比例*换算比例</span>
                </el-form-item>
            </el-row>
            <el-form-item>
                <el-button type="primary" v-loading="loading" @click="save('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        ruleForm: {
          house_get_flag: '2',
          house_get_ratio: '2',
          chamber_get_flag: '2',
          meeting_get_flag: '2',
          shop_get_flag: '2',
          shop_get_ratio: '',
        },
        rules: {
          shop_get_ratio: [
            { required: true, trigger: 'blur' },
          ]
        },
      }
    },
    mounted () {
      this.$F.doRequest(this, '/pms/hotelparam/getfind', {}, (res) => {
        this.$F.merge(this.ruleForm, res);
      })
    },
    methods: {
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$F.doRequest(this, '/pms/hotelparam/integralget', this.ruleForm, (res) => {
              this.$message.success('Success')
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
    .header {
        color: rgba(30, 30, 30, 1);
        font-size: 16px;
        font-weight: 800;
    }
</style>
