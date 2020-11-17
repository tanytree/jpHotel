<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-13 12:01:18
 * @FilePath: \jiudian\src\views\sale\order\member\Personer.vue
 -->
<template>
  <div>
    <div class="sec1" v-if="!secondShow">
      <el-form
        :model="form"
        :inline="true"
        class="top-body"
        size="small"
        label-width="100px"
      >
<!--        <el-form-item :label="$t('desk.customer_memType')+':'">-->
<!--          <el-select v-model="form.id">-->
<!--            <el-option :label="$t('desk.home_all')" value=""></el-option>-->
<!--            <el-option-->
<!--              v-for="item in memberKind"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button @click="getMemberList(form)" type="primary"-->
<!--            >{{$t('commons.queryBtn')}}</el-button-->
<!--          >-->
<!--        </el-form-item>-->
        <el-form-item style="float: right">
          <el-button type="primary" @click="Newdata()">{{$t('commons.newAdd')}}</el-button>
          <!-- @click="resetForm"  -->
        </el-form-item>
      </el-form>

      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
        size="medium"
      >
        <el-table-column
          prop="name"
          :label="$t('desk.customer_memType')"
          show-overflow-tooltip
        ></el-table-column>
        <!--                <el-table-column prop="remark" :label="$t('desk.home_note')" show-overflow-tooltip></el-table-column>-->
        <el-table-column
          prop="level"
          :label="$t('boss.add_level')"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="duration" :label="$t('boss.add_usefulTime')" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span v-if="row.duration == '9999'">{{$t('boss.add_permanent')}}</span>
            <span v-else>{{ row.duration }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          :label="$t('boss.add_resetTime')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.createTime || row.updateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateName" :label="$t('boss.add_resetPeople')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createName" :label="$t('boss.add_creator')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="state"
          :label="$t('boss.loginDetail_state')"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              style="margin-left: 10px"
              v-model="row.state"
              :active-value="1"
              :inactive-value="2"
              :active-text="row.state == 1 ?$t('desk.customer_enable'): $t('desk.customer_disable')"
              @change="(val) => changeStatus(row, val)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="onDelete(row)"
              >{{$t('commons.delete')}}</el-button
            >
            <el-button type="text" size="mini" @click="Newdata(row, 'edit')"
              >{{$t('commons.modify')}}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="secondShow">
      <NewDetail
        @addShowFunc="addShowFunc"
        :selected="selected"
        :memberTypeList="memberTypeList"
      />
    </div>
  </div>
</template>
<script>
import NewDetail from "./graces/new";
export default {
  components: { NewDetail },
  props: ["memberTypeList"], //会员类型列表
  data() {
    return {
      memberKind:[],
      secondShow: false,
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      form: {
        id: "",
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      tableData: [{}], //表格数据
      selected: {},
    };
  },
  mounted() {
    console.log(this.memberTypeList);
    this.getMembeType();
    this.getMemberList();
  },
  methods: {
    //禁用/启用
    changeStatus(row, val) {
      this.$F.doRequest(
        this,
        "/pms/membertype/enable_disable",
        { id: row.id, state: val },
        (res) => {
          this.$message.success("Success");
        }
      );
    },
    onDelete(row) {
      this.$confirm(this.$t('boss.staff_sureDelete'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.determine'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      }).then((res) => {
        this.$F.doRequest(
          this,
          "/pms/membertype/delete",
          { id: row.id },
          (res) => {
            this.$message.success("Delete Success");
            this.getMemberList();
          }
        );
      });
    },
    //请求会员类型接口
    getMembeType() {
       this.$F.doRequest(
          this,
          "/pms/membertype/list",
          {  },
          (res) => {
           console.log(res);
           this.memberKind = res.list;
          }
        );
    },
    addShowFunc(flag) {
      this.getMemberList();
      this.secondShow = flag;
    },

    getMemberList(params = {}) {
      // this.$F.merge(params, { storesNum: '' })
      this.$F.merge(params, this.form);
      this.$F.commons.fetchMemberTypeList(params, (res) => {
        this.tableData = res.list;
        this.$forceUpdate();
      });
    },
    Newdata(row = {}, type) {
      this.selected = row;
      if (type) {
        this.selected = {
          name: row.name,
          level: row.level,
          prices: row.prices,
          interests: row.interests,
          duration: row.duration,
          id: row.id,
        };
      }
      this.secondShow = true;
      // this.$router.push('/newdetail')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>


