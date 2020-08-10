<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-21 10:36:23
 * @FilePath: /jiudian/src/views/market/personnelManager/peopleman/peopleman.vue
 -->
<template>
    <el-dialog top="0" title="查看详情" :visible.sync="details" width="500px" v-loading="loading">
        <el-form :model="detailsData">
            <el-row style="margin:10px 0">
                <el-col :span="8">姓名:</el-col>
                <el-col :span="14">{{detailsData.userName}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">状态:</el-col>
                <el-col :span="14">{{detailsData.userStatus | F_userStatus}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">联系电话:</el-col>
                <el-col :span="14">{{detailsData.userPhone || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0" v-if="isPersonnelManager && storesNum == $F.getHQCode()">
                <el-col :span="8">所属门店:</el-col>
                <el-col :span="14">{{F_storeName(detailsData.storesNum)}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">所属部门:</el-col>
                <el-col :span="14">{{detailsData.department?detailsData.department.name:'' || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">职位:</el-col>
                <el-col :span="14">{{detailsData.position || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">银行账户:</el-col>
                <el-col :span="14">{{detailsData.bankcard || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">企业邮箱:</el-col>
                <el-col :span="14">{{detailsData.email || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">后台账号:</el-col>
                <el-col :span="14">{{detailsData.associatedAccount || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">工号:</el-col>
                <el-col :span="14">{{detailsData.worknum || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">分机号:</el-col>
                <el-col :span="14">{{detailsData.extension || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">入职时间:</el-col>
                <el-col :span="14">{{detailsData.inTime || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">证件类型:</el-col>
                <el-col :span="14">{{$t('commons.idCardType')[detailsData.idcardType || ''] || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">证件号:</el-col>
                <el-col :span="14">{{detailsData.idcard || '暂无'}}</el-col>
            </el-row>
            <el-row style="margin:10px 0">
                <el-col :span="8">转正日期:</el-col>
                <el-col :span="14">{{detailsData.positiveTime || '暂无'}}</el-col>
            </el-row>

            <el-row style="margin:10px 0">
                <el-col :span="8">备注:</el-col>
                <el-col :span="14">{{detailsData.remark || '暂无'}}</el-col>
            </el-row>
        </el-form>

        <div slot="footer" class="dialog-footer">
            <el-button @click="details = false">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  export default {
    props: ['account', 'employeeId', 'storeList'],
    data () {
      return {
        loading: false,
        isPersonnelManager: false,
        detailsData: {},
        details: false,
        storesNum2:'', //如果是总部后台 可以查看其他门店的员工， 这个时候要传当前门店过来， 如不是总部后台 则门店信息不要显示
      }
    },

    computed: {
      ...mapState({
        token: state => state.user.token,
        userId: state => state.user.id,
        storesNum: state => state.user.storesInfo.storesNum
      })
    },
    mounted () {
      this.isPersonnelManager = this.$route.name == 'employeeList'
    },
    methods: {
      //当未查询到该成员 提示信息
      getEmployeesDetails (item) {
        this.$alert('该成员暂无资料（资料需要在员工管理添加，然后绑定该成员的后台账号即可）', '提示', {
          confirmButtonText: '关闭',
          callback: action => {
          }
        })
      },
      getDetails (account, employeeId, item) {
        if (item) {
          this.details = true;
          this.detailsData = item;
        } else {
          let params = {
            employeeId: employeeId || '',
            account: account || ''
          }
          this.$F.doRequest(this, '/pms/employee/detail_employee', params, (res) => {
            if (res) {
              this.details = true;
              this.detailsData = res;
            } else
              this.getEmployeesDetails();
          })
        }
      },

      F_storeName (v) {
        let that = this
        for (let k in that.storeList) {
          if (that.storeList[k].storesNum == v) {
            return that.storeList[k].storesName
          }
        }
        return '未知门店'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
    .goodsImg {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }

    .top-close {
        display: flex;
        align-items: center;
        float: right;
        cursor: pointer;
        padding-right: 10px;
        padding-top: 20px;
        font-size: 14px;

    i {
        margin-left: 8px;
    }

    }

    .shopStatus {
        color: rgba(9, 109, 217, 1);
        font-size: 12px;
    }

    .top-body {
        background-color: #f2f2f2;
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(250, 250, 250, 1);
    }

    .components-edit {
        margin-top: 10px;

    .components-table {
        border: 1px solid #e6e6e6;
    }

    .block {
        padding: 10px 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

    .page-all {
        font-size: 12px;
        color: #666666;
        letter-spacing: 2px;
    }

    }
    }
</style>
<style scoped>
    .dimission >>> .el-upload {
        overflow: initial;
        outline: none;
    }

    .dimission >>> .el-upload-list {
        display: none;
    }
</style>
