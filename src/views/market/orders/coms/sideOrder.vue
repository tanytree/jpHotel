<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 17:38:47
 * @FilePath: \jiudian\src\views\market\orders\coms\sideOrder.vue
 -->
<template>
  <el-dialog
    top="0"
    :title="$t('desk.side_sideBooked')"
    :visible.sync="visible"
    :lock-scroll="false"
    width="80%"
  >
    <el-dialog
      width="50%"
       :title="$t('desk.side_changePackage')"
      top="0"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form ref="innerForm" :model="innerForm">
        <el-form-item label="早餐:">
          <el-radio-group v-model="innerForm.breakfast">
            <el-radio label="">无</el-radio>
            <el-radio label="1">A套餐【¥2000】</el-radio>
            <el-radio label="2">B套餐【¥3000】</el-radio>
            <el-radio label="3">C套餐【¥4000】</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </el-dialog>
    <div class="topBox">
      <div class="fontStyle">
      {{$t('desk.add_sureBil')}}
      </div>
      <el-button type="primary"> {{$t('desk.add_addMeal')}}</el-button>
    </div>
    <el-table
      header-row-class-name="default"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" :label="$t('desk.add_eatTime')" width="150">
      </el-table-column>
      <el-table-column prop="name" :label="$t('desk.customer_guestTypeA')" width="120">
      </el-table-column>
      <el-table-column  :label="$t('desk.add_mealType')" >
           <template slot-scope="scope">
               {{scope.row.mealTime == 1 ? $t('manager.hk_breakfast') : $t('manager.hk_dinner')}}
           </template>
      </el-table-column>
      <el-table-column :label="$t('desk.add_mealPri')" width="200">
          <template slot-scope="scope">
              {{ scope.row.mealName}}【￥{{ scope.row.mealPrice}}】
          </template>

      </el-table-column>
      <el-table-column prop="address" :label="$t('desk.customer_billState')" width="180">
      </el-table-column>
      <el-table-column :label="$t('commons.operating')">
        <template>
          <el-button type="text"> {{$t('desk.add_againBill')}}</el-button>
          <el-button type="text" @click="innerVisible = true"
            >{{$t('desk.side_changePackageA')}}</el-button
          >
          <el-button type="text">{{$t('desk.add_ruzhang')}}</el-button>
          <el-button type="text" @click="clickDelete">{{$t('commons.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
export default {
  mixins: [myMixin],
  props: ["detailData", "currentRoom"],
  data() {
    return {
      visible: false,
      loading: true,
      innerVisible: false, //内层dialog  更换套餐
      checkInId: "",
      innerForm: {
        breakfast: "",
      },
      tableData: [],
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  methods: {
    async init(checkInId) {
      this.checkInId = checkInId;
      this.getData();
      this.visible = true;
    },
    clickDelete(){
        this.$confirm(this.$t('manager.grsl_ifSureDeleteA'),  this.$t("commons.tip_desc"), {
          confirmButtonText:  this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: 'warning'
        }).then(() => {
        
        }).catch(() => {
      
        });
    },
    getData() {
      let params = {
        checkInId: this.checkInId,
      };
      this.$F.doRequest(this, "/pms/hotelattachmeal/list", params, (res) => {
          this.tableData = res.list
        console.log(res);
        // 这个接口需要后端改一下，暂时无法继续了
      });
    },

  },
};
</script>

<style lang='less' scoped>
.topBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .fontStyle {
    color: rgba(126, 126, 126, 100);
    font-size: 13px;
  }
}
.dialog-footer {
  text-align: right;
}

</style>
