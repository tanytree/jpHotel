<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-27 14:57:09
 * @FilePath: \jiudian\src\views\market\orders\bookingcoms\base.vue
 -->
<template>
  <div class="boss-index base">
    <el-row class="clearfix">
      <div class="fr">
        <!--            :disabled="checkinInfo.state != 1 && checkinInfo.state != 2"-->
        <el-button size="small" plain @click="addRoom" :disabled="roomLeaves">{{$t('desk.order_addRoom')}}</el-button>
        <el-button size="small" plain @click="goCheckinDetail(1)" :disabled="roomLeaves">{{$t('desk.order_livePeopleManegerment')}}</el-button>
        <el-button size="small" plain @click="goCheckinDetail(2)" :disabled="roomLeaves">{{ $t("desk.batchCheckin") }}</el-button>
        <el-button size="small" plain @click="baseInfoChangeHandle('baseInfoChangeShow')"
                   :disabled="roomLeaves && checkinInfo.state != 1 && checkinInfo.state != 2">{{ $t("desk.updateOrder") }}</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-dropdown size="small" split-button type="primary">
          {{ $t("commons.moreOperating") }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="baseInfoChangeHandle('gustTypeChangeShow')" :disabled="roomLeaves">
                {{ $t("desk.order_changeSource") }}</el-dropdown-item>
            <el-dropdown-item @click.native="handleCancel(8)" :disabled="roomLeaves || hasCheckinFlag || (checkinInfo.state != 1 && checkinInfo.state != 2 && checkinInfo.state != 5)">
                {{ $t("desk.order_cancelOrder") }}</el-dropdown-item>
            <el-dropdown-item @click.native="handleNoshow(4)" v-if="!roomLeaves && !hasCheckinFlag && (checkinInfo.state == 1 || checkinInfo.state == 2 || checkinInfo.state == 5)">NOSHOW</el-dropdown-item>
            <el-dropdown-item @click.native="handleNoshow(5)" v-if="checkinInfo.state == 4">{{ $t("commons.cancel") }}NOSHOW</el-dropdown-item>
<!--            <el-dropdown-item @click.native="rowRoomHandle" v-if="!inRoomList || inRoomList.length == 0">{{ $t("desk.rowHouse") }}</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
    <!-- 下面是基本信息 -->
    <el-row>
      <!--客房信息-->
      <h4>{{ $t("desk.serve_basicInfo") }}</h4>
      <el-row>
        <el-col :span="6">
          <div style="margin-bottom:10px;">
            {{$t('desk.book_bookPeople')}}：{{ checkinInfo.name }}【{{ checkinInfo.pronunciation }}】
          </div>
        </el-col>
        <el-col :span="6">
          <div class="concatBox">
            <div>{{$t('desk.book_bookPeoPhone')}}：</div>
            <div>
              <div v-if="checkinInfo.mobile">
                ({{$t('desk.editor_hand')}}){{ checkinInfo.mobile }}
              </div>
              <div v-if="checkinInfo.homeMobile">
                ({{$t('desk.editor_home')}}){{ checkinInfo.homeMobile }}
              </div>
              <div v-if="checkinInfo.enterMobile">
                ({{$t('desk.editor_only')}}){{ checkinInfo.enterMobile }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>{{$t('desk.order_bookTime')}}：{{ checkinInfo.createTime }}</div>
        </el-col>
        <el-col :span="6">
          <div>{{$t('desk.book_orderNum')}}：{{ checkinInfo.reserveOrderNum }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>{{$t('desk.book_orderSoutce')}}：{{ F_orderSource(checkinInfo.orderSource) }}</div>
        </el-col>
        <el-col :span="12">
          <div>
            {{$t('desk.nightAudit.arriveTimeA')}}：{{ checkinInfo.checkinTime }} -
            {{ checkinInfo.checkoutTime }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>{{$t('desk.order_sourceType')}}：{{ F_guestType(checkinInfo.guestType) }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_teamName')}}：{{ checkinInfo.teamName }}【{{checkinInfo.teamPronunciation}}】</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_guideText')}}：{{ checkinInfo.guideName }}【{{checkinInfo.guidePronunciation}}】</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_leaderText')}}：{{ checkinInfo.leaderName }}【{{checkinInfo.leaderPronunciation}}】</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_teamMoible')}}：{{ checkinInfo.teamMobile }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_teamAddress')}}：{{ checkinInfo.teamAdd3 }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactName')}}：{{ checkinInfo.contactName }}【{{checkinInfo.contactPinyin}}】</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactPhone')}}：{{ checkinInfo.contactPhone }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactEmail')}}：{{ checkinInfo.contactEmail }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_travelName')}}：{{ checkinInfo.travelTeam }}【{{checkinInfo.travelPronunciation}}】</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_travelAddress')}}：{{ checkinInfo.travelAdd3 }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactName')}}：{{ checkinInfo.travelContactName }}【{{checkinInfo.travelContactPinyin}}】</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactPhone')}}：{{ checkinInfo.travelContactPhone }}</div>
        </el-col>
        <el-col :span="6" v-if="checkinInfo.guestType == 4">
          <div>{{$t('desk.book_contactEmail')}}：{{ checkinInfo.tarvelContactEmail }}</div>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <h4>{{ $t('desk.reserveInfoDesc') }}</h4>
      <el-row>
          <el-col>
              <div>
                  <span>{{$t('desk.book_bookProject')}}：</span>
                  <span v-for="(item, key, index) of checkinInfo.reserveProjectList" :key="index" style="margin-left: 15px">
                      {{`${item.projectName} (${item.projectCount}) * ${item.price}  `}}
                  </span>
              </div>
          </el-col>
<!--        <el-col :span="24" v-for="(item, key) of inRoomList" :key="index">-->
<!--          <p>-->
<!--            {{ checkKey(key) }}（{{ item.length }}{{ $t("manager.hk_space") }}）； {{ $t("desk.home_roomType") }}：-->
<!--            <el-button type="primary" size="mini" plain>{{ item[0].roomTypeName }}({{ item.length }})</el-button>-->
<!--          </p>-->
<!--        </el-col>-->
      </el-row>
    </el-row>
    <el-row>
      <h4>{{ $t("desk.order_saleInfo") }}</h4>
      <el-row>
        <el-col :span="8">
          <p>
            {{ $t("desk.order_outOrder") }}：{{
              checkinInfo.thirdOrdernum ? checkinInfo.thirdOrdernum : $t("desk.order_noText")
            }}
          </p>
        </el-col>
          <el-col :span="8">
              <p>
                  {{ $t("desk.customer_region") }}：{{
                      checkinInfo.region
                  }}
              </p>
          </el-col>
          <el-col :span="8">
              <p>
                  {{ $t("desk.customer_payType") }}：{{ F_payType(checkinInfo.payType) }}
              </p>
          </el-col>
      </el-row>
    </el-row>
      <el-row>
          <h4>{{ $t("desk.orderMarkInfo") }}</h4>
          <span>{{checkinInfo.remark}}</span>
      </el-row>
    <!-- 上面是基本信息 -->
    <el-dialog top="0" :visible.sync="liveInPersonShow" class="liveInPersonDia" :title="$t('desk.order_rowHouses')" width="90%">
      <customer2 :liveData="liveData" :checkinInfo="checkinInfo" type="reserve" @checkInCallback="checkInCallback"></customer2>
    </el-dialog>
    <el-dialog top="0" :title="$t('desk.updateOrder')" :visible.sync="baseInfoChangeShow" width="900px" center>
      <el-form :model="baseInfoChangeForm" ref="baseInfoChange" :rules="rules" style="margin-top: -10px" size="mini" label-width="100px">
        <el-row>
          <!--                订单来源-->
          <el-col :span="8">
            <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource">
              <el-select v-model="baseInfoChangeForm.orderSource" :placeholder="$t('commons.placeChoose')">
                <el-option :value="key" v-for="(item, key, index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--                地区-->
          <el-col :span="8">
            <el-form-item :label="$t('desk.customer_region')" prop="region">
              <el-input type="text" v-model="baseInfoChangeForm.region" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.home_bookPeople')" class="" prop="name">
              <el-input type="text" v-model="baseInfoChangeForm.region" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_moblePhone')" prop="mobile">
              <el-input v-model="baseInfoChangeForm.mobile" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.home_liveMobile')" prop="prop">
              <el-input v-model="baseInfoChangeForm.homeMobile" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.home_unitMobile')" prop="prop">
              <el-input v-model="baseInfoChangeForm.enterMobile" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_outOrder') + '：'" label-width="120px">
              <el-input v-model="baseInfoChangeForm.thirdOrdernum" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('desk.home_note') + ':'" class="">
              <el-input type="textarea" v-model="baseInfoChangeForm.remark" style="width: 450px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('desk.book_bookProject') + ':'">
              <template>
                <div v-for="(value, index) in baseInfoChangeForm.reserveProjects" :key="index">
                  <el-input :placeholder="$t('desk.book_projectName') + (index + 1)" size="small" v-model="value.projectName" style="width: 300px"
                            @keyup.native="reserveProjectsChange('projectName', value.projectName, index)"></el-input>
                  <el-input :placeholder="$t('desk.book_projectCount')" size="small" v-model.number="value.projectCount" style="width: 100px; margin: 10px"
                            @keyup.native="reserveProjectsChange('projectCount', value.projectCount, index)"></el-input>
                  <el-input :placeholder="$t('desk.book_price')" size="small" v-model="value.price" style="width: 100px; margin-left: 10px"
                            @keyup.native="reserveProjectsChange('price', value.price, index)"></el-input>
                  <!--                            <img src="~@/assets/images/close.png" @click="deleteProject(index)" v-if="baseInfoChangeForm.reserveProjects.length>1" class="closePng">-->
                </div>
              </template>
              <el-button type="text" @click="addProject()">{{
                $t("desk.book_addProject")
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="baseInfoChangeShow = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary" @click="hotel_check_inChange">{{
          $t("commons.determine")
        }}</el-button>
      </span>
    </el-dialog>

    <el-dialog top="0" title="NOSHOW" :visible.sync="noShowDiaShow" width="600px" center>
      <el-form :model="currentItem" style="margin-top: -20px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('desk.order_bookOrderNum') + '：'" class="">
              {{ currentItem.orderNum }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('desk.home_bookPeople')" class="">
              {{ currentItem.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('desk.order_accountingService') + '：'" class="">
              NOSHOW{{ $t("desk.serve_roomPrice") }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('desk.customer_sum') + '：'" class="">
              <el-input type="text" disabled v-model="currentItem.deposit" style="width: 150px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('desk.home_note') + ':'" class="">
              <el-input type="textarea" v-model="currentItem.remark" style="width: 450px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noShowDiaShow = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary" @click="confirmNoShow">{{
          $t("commons.determine")
        }}</el-button>
      </span>
    </el-dialog>
      <!--      更改客源dialog  客源类型-->
      <guestChoose @guestChooseCallback="guestChooseCallback" ref="guestChoose" :checkInForm="baseInfoChangeForm"></guestChoose>
    <!--      排房组件-->
    <rowRoomHandle ref="rowRoomHandle" @baseInfoChange="baseInfoChange" :title="$t('desk.order_addRoom')"/>
    <!--    <checkTheDetails ref="checkTheDetails" @baseInfoChange="baseInfoChange" :checkinInfo="checkinInfo" :inRoomList="inRoomList" />-->
  </div>
</template>

<script>

import myMixin from "@/utils/filterMixin";
import customer2 from "@/components/front/customer2";
//入住人
import checkTheDetails from "@/components/checktheDetails";
import rowRoomHandle from "@/views/market/home/rowRoomHandle";
import guestChoose from "@/views/market/reception/checkin/guestChoose";
export default {
  components: {
    customer2,
    rowRoomHandle,
      guestChoose,
    checkTheDetails, //入住人管理
  },
  mixins: [myMixin],
  props: ["checkinInfo", "inRoomList", "detailData"],
  data() {
    return {
      checkTheDetailsShow: false,
      reserveId: "",
      currentSale: {},
      loading: false,
      liveInPersonShow: false,
      noShowDiaShow: false,
      baseInfoChangeShow: false,
      gustTypeChangeShow: false,
      activeName: "first",
      salesList: [],
      currentItem: {},
      liveData: [],
      baseInfoChangeForm: {},
        roomLeaves: false,   //【是否都离店】  是否有离店的房间
        hasCheckinFlag: false,  //是否有入住房间
        noCheckinFlag: false,  //是否还有未入住房间
    };
  },

  created() {
    console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
  },
    computed: {
        rules() {
            return {
                name: [
                    {
                        required: true,
                        // message: '请输入姓名',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                sex: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择性别',请选择性别
                        trigger: "blur",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        // message: '请输入手机号',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                idcardType: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择护照类型',
                        trigger: "blur",
                    },
                ],
                idcard: [
                    {
                        required: true,
                        // message: '请输入证件号',
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                checkinTime: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择入住时间',
                        trigger: "change",
                    },
                ],
                checkoutTime: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择预离时间',
                        trigger: "change",
                    },
                ],
                checkinDays: [
                    {
                        required: true,
                        // message: '请输入入住天数',
                        message: this.$t("commons.mustInput"),
                        trigger: "change",
                    },
                ],
                guestType: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择客源类型',
                        trigger: "blur",
                    },
                ],
                orderSource: [
                    {
                        required: true,
                        message: this.$t("desk.book_orderSoutce"),
                        trigger: "change",
                    },
                ],
                 region: [
                    {
                        required: true,
                        message: this.$t("commons.mustInput"),
                        trigger: "blur",
                    },
                ],
                checkinType: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择入住类型',
                        trigger: "change",
                    },
                ],
                ruleHourId: [
                    {
                        required: true,
                        message: this.$t("commons.placeChoose"),
                        // message: '请选择计费规则',
                        trigger: "change",
                    },
                ],
            };
        },
    },

  mounted() {
      //查询出是否所有的房间都已经离店
      let length = 0;
      if (this.detailData.inRoomList && this.detailData.inRoomList.length > 0) {
          this.detailData.inRoomList.forEach((room => {
              if (room.state == 2) {length ++;}
              if (room.state == 3) {this.noCheckinFlag = true;}
              if (room.state == 1) {this.hasCheckinFlag = true;}
          }))
          // this.roomLeaves = length == this.detailData.inRoomList.length;
          this.roomLeaves = length > 0;
      }
    this.reserveId = this.$route.query.id;
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
      let tempArray = this.salesList.filter((sale) => {
        return sale.id == this.checkinInfo.salesId;
      }) || [{}];
      this.currentSale = tempArray[0] || {};
    });
  },

  methods: {
      //选择客源类型组件的确认回调
      guestChooseCallback(data) {
          this.baseInfoChangeForm = data;
          console.log(data);
          this.hotel_check_inChange();
      },

      //预定项目输入change事件
      reserveProjectsChange(key, value, index) {
          this.baseInfoChangeForm.reserveProjects[index][key] = value;
          this.$forceUpdate()
      },
    //新需求 添加项目
    addProject() {
      if (this.baseInfoChangeForm.reserveProjects && this.baseInfoChangeForm.reserveProjects.length > 0) {
        let lastObject = this.baseInfoChangeForm.reserveProjects[
          this.baseInfoChangeForm.reserveProjects.length - 1
        ];

        if (lastObject.projectName && lastObject.price && lastObject.projectName) {
          this.baseInfoChangeForm.reserveProjects.push({});
        } else {
          this.$message({
            message: this.$t("desk.book_canAdd"),
            type: "warning",
          });
        }
          this.$forceUpdate()
      } else {
        this.baseInfoChangeForm.reserveProjects = [];
        this.baseInfoChangeForm.reserveProjects.push({
            projectName: '',
            projectCount: '',
            price: '',
        });
        this.$forceUpdate()
      }
    },
    //预定项目，点击删除
    deleteProject(index) {
      this.baseInfoChangeForm.reserveProjects.splice(index, 1);
    },
    //添加房间
    addRoom() {
      let arr = [];
      if (this.currentRoom) arr.push(this.currentRoom);
      this.$refs.rowRoomHandle.initForm(this.reserveId, this.checkinInfo, arr, 1, 2);
    },
    //跳转到入住详情
    goCheckinDetail(type) {
        if (this.noCheckinFlag) {
            this.$router.push({
                name: "checktheDetails",
                params: {
                    detailData: this.detailData,
                    currentRoom: this.currentRoom,
                    type: type,
                },
            });
        } else {
            this.$message(this.$t('desk.book_checkin'));
        }
    },
    checkInCallback(id) {
      this.liveInPersonShow = false;
      this.$router.push("/orderdetail?id=" + id);
    },
    batchCheckId() {
      console.log(JSON.parse(JSON.stringify(this.checkinInfo)));
      console.log(JSON.parse(JSON.stringify(this.inRoomList)));
      this.inRoomList.forEach((item, i) => {
        let object = {
          checkinRoomId: this.checkinInfo.id,
          name: this.checkinInfo.name,
          pronunciation: this.checkinInfo.pronunciation,
          idcardType: this.checkinInfo.idcardType || "2",
          idcard: this.checkinInfo.idcard,
          sex: this.checkinInfo.sex || "1",
          mobile: this.checkinInfo.mobile,
          checkinId: "",
          checkInPersonId: "",
          houseNum: item.houseNum,
          realPrice: item.realPrice,
          reservePrice: item.reservePrice,
          roomId: item.roomId,
          roomTypeId: item.roomTypeId,
          roomTypeName: item.roomTypeName,
          personList: [],
        };
        this.liveData.push(object);
      });
      this.liveInPersonShow = true;
    },
    checkKey(key) {
      console.log(key);
      if (key.indexOf("checkIn") != -1) {
        return this.$t("desk.hadRowHouses");
      }
      if (key.indexOf("notYet") != -1) {
        return this.$t("desk.noRowHouses");
      }
    },
    handleCancel() {
      let params = {
        checkInReserveId: this.$route.query.id || "",
        state: 8,
      };
      this.$confirm(
        this.$t("desk.order_sureDelete"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/reserve/reserve_oper",
            params,
            (res) => {
              this.$router.go(-1);
              this.$message({
                message: this.$t("commons.request_success"),
                type: "success",
              });
            }
          );
        })
        .catch(() => {});
    },
    confirmNoShow() {
      let params = {
        checkInReserveId: this.currentItem.id,
        state: 4,
      };
      this.$F.doRequest(this, "/pms/reserve/reserve_oper", params, (res) => {
        this.noShowDiaShow = false;
        this.$message({
          message: this.$t("commons.request_success"),
          type: "success",
        });
        this.$router.go(-1);
      });
    },

    hotel_check_inChange() {
        this.baseInfoChangeForm.checkInReserveId = this.$route.query.id;
        let params = this.$F.deepClone(this.baseInfoChangeForm);
        params.reserveProjects = JSON.stringify(params.reserveProjects);
        this.$F.doRequest(this, "/pms/reserve/reserve_check_in", params,
            (data) => {
                this.baseInfoChangeShow = false;
                this.gustTypeChangeShow = false;
                this.$emit("baseInfoChange", this.$route.query.id);
            }
        );
    },
    baseInfoChangeHandle(type) {
        this.baseInfoChangeForm = this.$F.deepClone(this.checkinInfo);
        this.baseInfoChangeForm.checkinType = this.baseInfoChangeForm.checkinType.toString();
        this.baseInfoChangeForm.orderSource = this.baseInfoChangeForm.orderSource.toString();
        this.baseInfoChangeForm.guestType = this.baseInfoChangeForm.guestType.toString();
        this.baseInfoChangeForm.reserveProjects =
            this.baseInfoChangeForm.reserveProjects ||
            this.baseInfoChangeForm.reserveProjectList ||
            [];
        if (type == "gustTypeChangeShow") {
            // this.guestTypeShow = true;
            this.baseInfoChangeForm.changeGuest = true;
            console.log(this.baseInfoChangeForm);
            this.$refs.guestChoose.dialogOpen(this.baseInfoChangeForm);
        } else {
            console.log(this.baseInfoChangeForm);
            this[type] = true;
        }
    },
    baseInfoChange() {
      this.$emit("baseInfoChange", "");
    },
    //将订单变为NOSHOW状态
    handleNoshow(state) {
      let params = {
        checkInReserveId: this.$route.query.id || "",
        state: state,
      };
      this.$F.doRequest(this, "/pms/reserve/reserve_oper", params, (res) => {
        this.$router.go(-1);
        this.$message({
          message: this.$t("commons.request_success"),
          type: "success",
        });
      });
    },
    rowRoomHandle() {
      if (!this.$route.query.id) {
        return;
      }
      this.$refs.rowRoomHandle.initForm(
        this.$route.query.id,
        this.checkinInfo,
        this.roomInfo || []
      );
    },
  },
};
</script>
<style lang="less" scoped>
.base {
  & > div {
    font-size: 14px;
  }

  h4 {
    margin: 10px 0;
    line-height: 30px;
    font-weight: 600;
    font-size: 14px;
  }
  .el-row {
    line-height: 30px;
  }
}
.concatBox {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
