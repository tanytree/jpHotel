<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 16:57:16
 * @FilePath: \jiudian\src\components\front\checkInInfo.vue
 -->
<template>
  <div>
    <div class="item-info" v-if="showOrderInfo">
      <div
        class="public"
        v-if="
          checkinInfo.checkInRoomType == 1 || checkinInfo.checkInRoomType == 2
        "
      >
        <div class="itemDetail">
          <div class="infoTitle">入住信息：</div>
          <el-row>
            <!--                        订单号-->
            <el-col :span="6">{{
              $t("desk.book_orderNum") +
              ": " +
              (checkinInfo.checkIn.reserveOrderNum ||
                checkinInfo.checkIn.orderNum)
            }}</el-col>
            <el-col :span="6">
              <!--                            来源-->
              <span>{{
                $t("desk.book_orderSoutce") +
                ": " +
                F_orderSource(checkinInfo.checkIn.orderSource)
              }}</span>
            </el-col>
            <!--                        外部订单号-->
            <el-col :span="6">{{
              $t("desk.order_outOrder") +
              ": " +
              (checkinInfo.checkIn.thirdOrdernum || "")
            }}</el-col>
          </el-row>
          <el-row>
            <!--                        地区-->
            <el-col :span="6">{{
              $t("desk.customer_region") +
              ": " +
              (checkinInfo.checkIn.region || "")
            }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">{{
              $t("desk.order_checkinDate") +
              ": " +
              checkinInfo.checkIn.checkinTime
            }}</el-col>
            <el-col :span="6">{{
              $t("desk.order_departureTime") +
              ": " +
              checkinInfo.checkIn.checkoutTime
            }}</el-col>
            <el-col :span="6">{{
              $t("desk.checkInDays") +
              ": " +
              (checkinInfo.checkIn.checkinDays || "")
            }}</el-col>
          </el-row>
        </div>
      </div>
      <div
        class="public otherStyle"
        v-if="
          checkinInfo.checkInRoomType == 1 || checkinInfo.checkInRoomType == 2
        "
      >
        <div class="infoTitle">预约内容/住宿plan：</div>
        <div class="itemDetail">
          <el-row>
            <el-col :span="6">消费合计：{{ checkinInfo.totalPrice }}</el-col>
            <el-col :span="6">付款合计：{{ checkinInfo.payPrice }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="18"
              >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000）
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">{{
              `${$t("desk.reservePersonDesc")}: ${checkinInfo.checkIn.name}【${
                checkinInfo.checkIn.pronunciation
              }】`
            }}</el-col>
            <el-col :span="8"
              >预约人电话：（手）{{
                checkinInfo.checkIn.mobile || checkinInfo.checkIn.homeMobile
              }}</el-col
            >
          </el-row>
        </div>
      </div>
    </div>

    <!--表格数据 -->
    <el-table :data="checkinInfo.inRoomList" header-row-class-name="default" border style="width: 100%">
      <el-table-column prop="name" label="入住人/单位名称/团队名" width="120px">
        <template slot-scope="{ row, $index }">
          <!--                    显示入住人  入主入住人没有 则显示订单外的订单信息-->
          <span v-if="row.headerObj">{{ row.headerObj.name }}【{{ row.headerObj.pronunciation }}】</span>
          <span v-else>{{ checkinInfo.checkIn.name }}【{{ checkinInfo.checkIn.pronunciation }}】</span>
          <!--                    显示单位信息-->
          <br v-if="checkinInfo.checkIn.guestType == 3 && row.headerObj.enterName"/>
            <span v-if="checkinInfo.checkIn.guestType == 3 && row.headerObj.enterName">
            {{ row.headerObj.enterName }}【{{ row.headerObj.enterPinyin }}】
          </span>
          <!--                    显示团体信息-->
          <br v-if="checkinInfo.checkIn.guestType == 4" />
          <span v-if="checkinInfo.checkIn.guestType == 4">
            {{ checkinInfo.checkIn.teamName }}【{{
              checkinInfo.checkIn.teamPronunciation
            }}】
          </span>
        </template>
      </el-table-column>
      <el-table-column label="房间号/房型" align="center" width="80px">
        <template slot-scope="{ row, $index }">
          <span>{{ row.houseNum }} / {{ row.roomTypeName }} </span>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" align="center" width="100px">
        <template slot-scope="{ row, $index }">
          <span v-if="row.headerObj">
            ({{
              $t("commons.idCardType")[
                row.headerObj.idcardType ? row.headerObj.idcardType + "" : "1"
              ]
            }}) {{ row.headerObj.idcard }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" align="center" width="90px">
        <template slot-scope="{ row, $index }">
          <div v-if="row.headerObj">
            <p v-if="row.headerObj.homeMobile">(家) {{ row.headerObj.homeMobile }}</p>
            <p v-if="row.headerObj.enterMobile">(单位) {{ row.headerObj.enterMobile }}</p>
            <p v-if=" checkinInfo.checkIn.guestType == 4 && checkinInfo.checkIn.contactPhone">(团体) {{ checkinInfo.checkIn.contactPhone }}</p>
            <p v-if="row.headerObj.mobile">(手机) {{ row.headerObj.mobile }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" width="50">
        <template slot-scope="{ row, $index }">
          <span v-if="row.headerObj && row.headerObj.sex">
            {{ F_sex(row.headerObj.sex) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客源类型" align="center" width="80px">
        <template slot-scope="{ row, $index }">
          <span>
            {{ F_guestType(checkinInfo.checkIn.guestType) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员号码/单位号码" width="120px">
        <template slot-scope="{ row, $index }">
          <span v-if=" row.headerObj && row.headerObj.guestType == 2 && row.headerObj.memberCard">
            {{ row.headerObj.memberCard }}
          </span>
          <span v-if=" row.headerObj && row.headerObj.guestType == 3 && row.headerObj.enterId">
            {{ row.headerObj.enterId }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="amount2" label="同来宾客" align="center">
        <template slot-scope="{ row, $index }">
          <p v-for="(person, index) in row.personList" :key-="index" v-if="row.personList">
            {{ person.name }}【{{ person.pronunciation }}】
            {{ F_sex(person.sex) }} {{ F_customerTypes(person.customerType) }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80px">
        <template slot-scope="{ row, $index }">
          <el-button @click="customerDetail(row)" type="text">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-dialog top="0" width="80%" title="客户详情" :visible.sync="currentCustomerVisible" append-to-body>
          <el-form ref="currentCustomerForm" :model="currentCustomer" label-width="110px" inline>
              <el-row><el-col :span="6"><el-form-item label="入住人：">{{ currentCustomer.headerObj.name }}【{{currentCustomer.headerObj.pronunciation}}】</el-form-item></el-col>
                  <el-col :span="6">
                      <el-form-item label="（证件）号码：">
                          ({{
                              $t("commons.idCardType")[currentCustomer.headerObj.idcardType ? currentCustomer.headerObj.idcardType + "" : "1"]
                          }}) {{ currentCustomer.headerObj.idcard }}
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <el-form-item label="性别：">  {{ F_sex(currentCustomer.headerObj.sex) }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="客人分类："> {{ F_customerTypes(currentCustomer.headerObj.customerType) }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="邮箱："> {{ currentCustomer.headerObj.email }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="地区："> {{ currentCustomer.headerObj.region }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="住家地址："> {{ currentCustomer.headerObj.homeAddress }}  </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="住家号码："> {{ currentCustomer.headerObj.homeMobile }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="手机号："> {{ currentCustomer.headerObj.phone }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="单位名：">
                          {{ currentCustomer.headerObj.enterName }}【{{currentCustomer.headerObj.enterPinyin}}】
                      </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="单位电话：">  {{ currentCustomer.headerObj.enterMobile }} </el-form-item></el-col
                  >
                  <el-col :span="6">
                      <el-form-item label="单位地址：">  {{ currentCustomer.headerObj.enterAddress }} </el-form-item></el-col
                  >
              </el-row>
          </el-form>

          <div>
              <div class="sameTo">同来宾客</div>
              <el-table ref="multipleTable" :data="currentCustomer.headerObj.personList" border height="100%" header-row-class-name="default" size="small">
                  <el-table-column prop="姓名" label="name" show-overflow-tooltip></el-table-column>
                  <el-table-column label="证件号码" prop="idcard" width="300">
                  </el-table-column>
                  <el-table-column prop="sex" label="性别" show-overflow-tooltip>
                      <template slot-scope="{ row, $index }">
                          {{ F_sex(row.sex) }}
                      </template>
                  </el-table-column>
                  <el-table-column prop="type" label="类型" show-overflow-tooltip>
                      <template slot-scope="{ row, $index }">
                          {{ F_customerTypes(row.customerType) }}
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button @click="currentCustomerVisible = false">关闭</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
import myMixin from "@/utils/filterMixin";

export default {
  mixins: [myMixin],
  props: ["currentRoom", "showOrderInfo", "orderInfo"],
  data() {
    return {
        currentCustomer: {
            headerObj: {},
            personList: [],
        },
        currentCustomerVisible: false, // 客户详情弹框
      customerList:[{
        name:'张三',
        idNum:'123456',
        sex:'男',
        type:'儿童A'
      },{
        name:'张三',
        idNum:'123456',
        sex:'男',
        type:'儿童A'
      },{
        name:'张三',
        idNum:'123456',
        sex:'男',
        type:'儿童A'
      },{
        name:'张三',
        idNum:'123456',
        sex:'男',
        type:'儿童A'
      }],
      customerForm: {},
      checkinInfo: {
        checkIn: {},
        inRoomList: [],
      },
    };
  },

  mounted() {
    this.handleData(this.orderInfo);
    console.log(this.checkinInfo.inRoomList);
  },
  methods: {
      customerDetail(row) {
          this.currentCustomer = {
              headerObj: {},
              personList: [],
          }
          debugger
          if (row.headerObj) {
              this.$F.merge(this.currentCustomer, row);
              this.currentCustomerVisible = true;
          }
      },

    handleData(orderInfo) {
      this.checkinInfo = this.$F.deepClone(orderInfo);
      console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
      ;
      if (this.currentRoom) {
        // this.checkinInfo.inRoomList = (this.checkinInfo.inRoomList.forEach((item) => {
        //     return item.roomId == this.currentRoom.roomId
        // }) || []) || {};
      }
      this.checkinInfo.inRoomList.forEach((item) => {
        if (item.personList && item.personList.length > 0) {
          item.personList.forEach((person, index) => {
            if (person.personType == 2) {
              item.headerObj = person; //主入住人
              item.personList.splice(index, 1);
            }
          });
        } else {
          item.personList = [];
        }
      });
    },
    init(type, checkinInfo) {
      this.handleData(checkinInfo);
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex <= 4) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
      if (rowIndex > 2) {
        if (columnIndex > 0) {
          return {
            rowspan: 1,
            colspan: 7,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
.otherStyle {
  margin-top: 15px;
}

.infoTitle {
  color: rgba(30, 30, 30, 100);
  font-weight: 600;
}

.el-row {
  margin: 8px 0;
}
.el-col-6 {
  height: 45px;
}
.sameTo{

color: rgba(30, 30, 30, 100);
font-size: 16px;
font-weight: 500;
margin-bottom: 20px;
padding-top: 15px;
border-top:  1px solid rgba(227, 227, 227, 1);
}
</style>
