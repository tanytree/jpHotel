<!--
 * @Date: 2020-04-22 10:20:45
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 15:50:11
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/userIntegral.vue
 -->
<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/promotion' }">会员营销</el-breadcrumb-item>
          <el-breadcrumb-item>积分管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card>
        <el-table :data="integralGet" size="mini">
          <el-table-column prop="title" label="积分获取"></el-table-column>
          <el-table-column prop="content" label="权益内容"></el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="{row, $index}">
              <el-button v-if="row.title.indexOf('签到送积分')>-1" type="text" @click="setSign(row)">签到设置</el-button>
              <el-button type="text" @click="getdataDetail(row, $index)">权益内容修改</el-button>
              <el-switch
                style="margin-left:10px"
                v-model="row.status"
                :active-value="0"
                :inactive-value="1"
                :active-text="row.status == 0 ? '启用' : '禁用'"
                @change="val=>changeStatus(row, val)"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <el-table :data="integralUse" size="mini">
          <el-table-column prop="title" label="积分用途"></el-table-column>
          <el-table-column prop="content" label="权益内容"></el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="{row, $index}">
              <el-button  v-if="$index == 0" type="text" @click="getdataDetail(row, $index + 2)">权益内容修改</el-button>
               <el-button v-if="$index == 1" type="text" @click="$router.push({path:'/userActivity'})">活动管理</el-button>
              <el-switch
                style="margin-left:10px;"
                v-model="row.status"
                :active-value="0"
                :inactive-value="1"
                :active-text="row.status == 0 ? '启用' : '禁用'"
                @change="val=>changeStatus(row, val)"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
    <moduleDetail v-if="showDetail" ref="detailRef" />
    <singSet v-if="singShow" ref="singRef" />
  </div>
</template>

<script>
import moduleDetail from "./components/moduleDetail";
import singSet from "./components/singSet";
export default {
  components: { moduleDetail, singSet },
  data() {
    return {
        integralList: [],

      integralGet: [
      ],
      integralUse: [

      ],
      showDetail: false,
      singShow: false
    };
  },
  activated() {
      this.$F.doRequest(this, '/edt/adminsystem/edt_score_rule_list', {}, (data) => {
          this.integralGet = data.splice(0,2);
          this.integralUse = data;
          this.$forceUpdate();
      })
  },

  methods: {
      /**查看详情 */
      getdataDetail(row, index) {
          this.showDetail = true;
          this.$nextTick(() => {
              this.$refs.detailRef.initData(row, index + 1);
          });
      },
    /**开启/关闭 */
    changeStatus(row, val) {
        row.status = val;
        this.$F.doRequest(this, '/edt/adminsystem/edt_score_rule_save', row, (data) => {
            this.$message.success('状态切换成功');
        })
    },
    /**签到设置 */
    setSign() {
      this.singShow = true;
      this.$nextTick(() => {
        this.$refs.singRef.initData({});
      });
    }
  }
};
</script>

<style>
  .el-table--mini td, .el-table--mini th {
    padding: 8px 0;
  }
</style>
