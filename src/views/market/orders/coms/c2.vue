<!--
 * @Date: 2020-07-07 16:59:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-05 10:30:14
 * @FilePath: \jiudian\src\views\market\orders\coms\c2.vue
-->
<template>
  <div class="roomDetails">
    <div class="cost margin-t-10">
      <div class="wrap">
        <span class="fee" v-if="detailData.payPrice - detailData.consumePrice > 0">{{ $t('desk.order_shouldBack') }}：{{detailData.payPrice - detailData.consumePrice}}</span>
        <span class="fee" v-else>{{ $t('desk.order_receivable') }}：{{detailData.consumePrice - detailData.payPrice}}</span>
        <div class="costNum">
          <el-row>{{ $t('desk.consumerTotal') }}：
              <span class="text-red">{{ detailData.consumePrice }}</span>
          </el-row>
          <el-row>{{ $t('desk.payTotal') }}：
              <span class="text-green">{{ detailData.payPrice }}</span>
          </el-row>
        </div>
      </div>
    </div>
    <div class="bd margin-t-10">
      <div class="wrap">
        <finance :currentRoomId="currentRoomId" :detailData="detailData" @getOrderDetail="getOrderDetail"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myMixin from "@/utils/filterMixin";
import finance from "./finance";
export default {
  components: {
    finance,
  },
  mixins: [myMixin],
  props: ["detailData", "currentRoomId"],
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      currentRoom: {
        personList: [],
      },
      loading: false,
      detail: {
        text: "",
      },
      searchForm: {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      },
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
    };
  },

  mounted() {
    let id = this.$route.query.id;
    this.consume_order_list();
  },

  methods: {
    consume_order_list(state = "") {
      let params = {
        state: state,
        checkInId: this.$route.query.id,
      };
      this.$F.doRequest(
        this,
        "/pms/consume/consume_order_list",
        params,
        (res) => {
          this.tableData = res.consumeOrderList;
          this.$forceUpdate();
        }
      );
    },

    consume_move(item) {
      let params = {
        orderId: item.id,
      };
      this.$confirm(this.$t('desk.order_ifDelete'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      })
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/consume/consume_move",
            params,
            (res) => {
              this.$message({
                type: "success",
                  message: this.$t('commons.request_success'),
              });
              this.consume_order_list();
            }
          );
        })
        .catch(() => {});
    },
    getOrderDetail() {
      console.log("c2");
      this.$emit("getOrderDetail");
    },
  },
};
</script>

<style lang="less" scoped>
    .cost {

        background: #fff;

        .wrap {
            padding: 20px 15px;

            span.fee {
                font-size: 26px;
                color: #DC3E3E;
                display: inline-block;
                vertical-align: middle;
                margin-right: 50px;
            }

            .costNum {
                display: inline-block;
                font-size: 16px;
                vertical-align: middle;
                border-left: 1px solid #eee;
                padding-left: 50px;
            }
        }
    }
</style>
