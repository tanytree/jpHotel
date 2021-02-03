<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-03 11:50:55
 * @FilePath: \jiudian\src\views\market\orders\coms\sideOrder.vue
 -->
<template>
  <el-dialog top="0" :title="$t('desk.side_sideBooked')" :visible.sync="visible" :lock-scroll="false" width="50%">
    <div class="topBox">
      <span>房间号：A001</span><span>入住人：张三</span>
    </div>
    <div class="title_one">预订时选择的套餐：</div>
    <div class="flexBox" v-for="i in 3" :key="i">
      <div class="name">张三</div>
      <div class="breakfast">早餐-套餐1【￥2000】</div>
      <div class="dinner">晚餐-套餐1【￥2000】</div>
    </div>
    <div class="title_one" style="margin-bottom:10px">入账附餐：</div>
    <el-form :model="sideForm" ref="sideForm" label-width="100px" style="margin-left:-30px;" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收费套餐:" prop="region">
            <el-select v-model="sideForm.region" placeholder="请选择活动区域" size="small">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="10px">
            <el-input-number size="small" v-model="sideForm.number" @change="handleChange" :min="1" label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="金额:" prop="desc">
          <el-input disabled v-model="sideForm.money" size="small" style="width:120px"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注:" prop="desc">
          <el-input type="textarea" v-model="sideForm.remark" style="width:350px"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dimissionClose">{{ $t('commons.close') }}</el-button>
      <el-button  type="primary">入账</el-button>
    </div>
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
      sideForm: {
        number: 1,
      },
      checkInId: "",

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
    clickDelete() {
      this.$confirm(
        this.$t("manager.grsl_ifSureDeleteA"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {})
        .catch(() => {});
    },
    getData() {
      let params = {
        checkInId: this.checkInId,
      };
      this.$F.doRequest(
        this,
        "/pms/hotelattachmeal/check_in_meal_order_list",
        params,
        (res) => {
          debugger;
          this.tableData = res.list;
          console.log(res);
        }
      );
    },
  },
};
</script>

<style lang='less' scoped>
.topBox {
  margin-top: -16px;
  span {
    &:nth-last-child(-n + 1) {
      margin-left: 50px;
    }
  }
}
.title_one {
  font-weight: 600;
  margin-top: 15px;
}
.flexBox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 12px;
  .name {
    width: 120px;
  }
  .breakfast {
    width: 200px;
  }
  .dinner {
    width: 200px;
  }
}
.dialog-footer {
  text-align: center;
}
</style>
