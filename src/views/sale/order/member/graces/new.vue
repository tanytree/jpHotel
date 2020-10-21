<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-20 17:38:52
 * @FilePath: /jiudian/src/views/sale/order/member/graces/new.vue
 -->
<template>
    <div>
        <div class="el-card">
            <div class="el-card__header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>
                        <template>
                            <span @click="back()" style="cursor: pointer;">会员类型管理</span>
                        </template>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item class="last-breadcrumb" style="font-weight: 800 !important;">新增会员类型
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="margin-left:20px">
                <el-form :model="newvip" :inline="true" :rules="rules" ref="newvip" class="top-body" size="small"
                         label-width="100px">
                    <el-row>
                        <h3>基本信息</h3>
                    </el-row>
                    <el-row>
                        <el-form-item label="会员类型:" prop="name">
                            <el-input v-model="newvip.name" style="width:264px"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="等级:" prop="level">
                            <el-input v-model="newvip.level" style="width:264px"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="购买价格">
                            <el-input v-model.number="newvip.prices" min="0" style="width:264px"
                                      placeholder="大于等于1的整数"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="有效期">
                            <el-radio-group v-model="durationType" @change="durationchange">
                                <el-radio label="1">永久</el-radio>
                                <el-row style="margin-top: 10px">
                                    <el-radio label="2">开卡日期起</el-radio>
                                    <el-date-pickerinterests
                                        v-if="durationType == 2"
                                        v-model="newvip.duration"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-pickerinterests>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <h3>配置权益</h3>
                        <el-form-item>
                            <el-checkbox @change="interestsChange" v-model="newvip.interests == 1">
                                入住免押金
                            </el-checkbox>
                        </el-form-item>
                    </el-row>
                    <el-divider></el-divider>
                    <el-form-item>
                        <el-button type="primary" @click="editItem('newvip')">{{ $t('commons.save') }}</el-button>
                        <el-button @click="back()">{{ $t('commons.cancel') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['selected'],
  data () {
    return {
      memberTypeList: [],
      durationType: '1', // 1永久  2固定日期
      newvip: {
        name: '',
        level: '',
        prices: '',
        interests: '',
        duration: ''
      },
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入会员类型名称' }
        ],
        level: [
          { required: true, trigger: 'blur', message: '请输入会员类型等级' }

        ],
        prices: [
          { required: true, trigger: 'blur', message: '请输入购买价格' }
        ]
      }
    }
  },

  mounted () {
    this.$F.merge(this.newvip, this.selected)
    console.log(this.newvip)
    if (this.newvip.duration != 9999) {
      this.durationType = '2'
    }
    this.getMemberTypeList()
  },

  methods: {
    durationchange (val) {
      if (val == 2) {
        this.newvip.duration = ''
      } else {
        this.newvip.duration = '9999'
      }
    },
    interestsChange (value) {
      this.newvip.interests = value ? 1 : 0
    },
    back () {
      this.$emit('addShowFunc', false)
    },

    editItem (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var array = this.memberTypeList.filter((row) => {
            return (row.level == this.newvip.level && row.id != this.newvip.id)
          })
          if (array.length == 0) {
            console.log(this.newvip)
            this.$F.doRequest(this, '/pms/membertype/edit', this.newvip, (res) => {
              this.$message.success('edit success')
              setTimeout(() => {
                this.back()
              }, 1000)
            })
          } else {
            this.$message.error('Level can not repeat')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    getMemberTypeList () {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.memberTypeList = res.list
      })
    }
  }
}
</script>

<style scoped>
    .detailTab {
        border: 0
    }

    .detailTab >>> .el-tabs__header {
        margin: 0;
    }
</style>
<style lang="less" scoped>
    .last-breadcrumb .el-breadcrumb__inner {
        font-weight: 800 !important;
    }
</style>
