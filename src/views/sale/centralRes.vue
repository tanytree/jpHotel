<template>
  <div>
    <!-- <el-row>
      <el-col :span="20">
        <el-form
          ref="centerForm"
          inline
          size="small"
          :model="centerForm"
          :rules="rules"
          label-width="100px"
        >
          <el-col :span="8">
            <el-form-item :label="$t('desk.arrivalTime')" prop="date1">
              <el-date-picker
                v-model="centerForm.startTime"
                value-format="yyyy-MM-dd,HH-mm-ss"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$t('desk.checkInDays')">
              <el-input-number
                style="width: 220px"
                v-model="centerForm.nums"
                @change="handleChange"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('desk.order_departureTime')" prop="date1">
              <el-date-picker
                v-model="centerForm.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属酒店:">
              <el-select
                v-model="centerForm.storesNum"
                :placeholder="$t('login.sTip')"
              >
                <el-option
                  v-for="item in storeList"
                  :key="item.storesNum"
                  :label="item.storesName"
                  :value="item.storesNum"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button
                type="primary"
                style="margin-left: 25px"
                @click="onSubmit"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row> -->

    <!-- 酒店信息表格 -->
    <el-row >
      <h4>酒店信息:</h4>
      <el-row v-for="(item,index) in infoArray" :key="index" style="margin-top:30px">
        <label>{{item.name}}</label>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 10px"
          :header-cell-style="{ background: '#D9DDE2', color: '#606266' }"
        >
          <el-table-column :label="$t('desk.home_roomType')" width="130"   fixed>
            <template>
              <el-row>房间详情</el-row>
            </template>
          </el-table-column>
          <el-table-column v-for="(each,index) in item.array" :key="index" :label="each.roomTypeName"  width="160">
            <template >
              <el-row>可订数：{{each.reserveTotal}}</el-row>
              <el-row v-if="each.personPrice">1人总价：{{each.personPrice.split(",")[0]}}</el-row>
              <el-row v-if="each.personPrice&&each.personPrice.split(',').length>1">2人总价：{{each.personPrice.split(",")[1]}}</el-row>
            </template>
          </el-table-column>
          <el-table-column :label="$t('commons.operating')"   fixed="right" >
            <template   >
              <el-button
              :disabled='item.array.length>0?false:true'
                size="mini"
                type="text"
                @click="
                  handleEdit(scope.$index, scope.row),
                    (dialogFormVisible = true)
                "
                >普通预订</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>

    <!-- 预定 -->

    <el-dialog
      top="0"
      title="预定"
      :visible.sync="dialogFormVisible"
      width="100%"
    >
      <div>
        <el-row>
          <el-form inline size="small" label-width="100px" :rules="rules">
            <el-row>
              <el-form-item :label="$t('desk.customer_guestType') + ':'">
                <el-radio-group v-model="checkInForm.content">
                  <el-radio
                    v-for="(item, key, index) of $t('commons.guestType')"
                    :label="key"
                    :key="index"
                    >{{ item }}</el-radio
                  >
                </el-radio-group>
                <el-button @click="registerme = true" style="margin-left: 25px"
                  >注册会员</el-button
                >
                <el-select
                  style="margin-left: 10px"
                  v-model="vipname"
                  filterable
                  placeholder="请输入会员名/手机号/卡号"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  style="margin-left: 10px"
                  v-model="unitname"
                  filterable
                  placeholder="请输入单位名称/手机号"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.arrivalTime')" prop="date1">
                    <el-date-picker
                      v-model="checkInForm.startTime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      style="width: 246px"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.checkInDays')" prop="name">
                    <el-input-number
                      style="width: 246px"
                      v-model="num"
                      @change="handleChange"
                      :min="1"
                      :max="10"
                      label
                    ></el-input-number>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    :label="$t('desk.order_departureTime')"
                    prop="date1"
                  >
                    <el-date-picker
                      v-model="checkInForm.startTime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      style="width: 246px"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12" style="opacity: 0">1</el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.home_bookPeople')" prop="name">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('commons.mobile')">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item
                    :label="$t('desk.book_orderSoutce')"
                    prop="name"
                  >
                    <el-select
                      style="width: 246px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option
                        :label="$t('desk.home_all')"
                        value="3"
                      ></el-option>
                      <el-option label="已认证" value="1">已认证</el-option>
                      <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.order_salesman') + '：'">
                    <el-select
                      style="width: 246px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option label="正常" value="1"></el-option>
                      <el-option label="不正常" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.order_outOrder') + '：'">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.orderMarkInfo') + '：'">
                    <el-input
                      v-model="checkInForm.content"
                      style="width: 740px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row style="margin-bottom: 60px">
          <h3>{{ $t("desk.roomInfoDesc") }}</h3>
          <el-form inline size="mini">
            <el-row>
              <el-col :span="17">
                <div class="grid-content">
                  <!--                  <el-row>-->
                  <!--                    <el-button>可改房价</el-button>&nbsp;&nbsp;-->
                  <!--                    <el-button>不可改房价</el-button>&nbsp;&nbsp;-->
                  <!--                    <el-select-->
                  <!--                      v-model="checkInForm.enterStatus"-->
                  <!--                      placeholder="床位数"-->
                  <!--                    >-->
                  <!--                      <el-option :label="$t('desk.home_all')" value="3">床位数</el-option>-->
                  <!--                      <el-option label="已认证" value="1">已认证</el-option>-->
                  <!--                      <el-option label="未认证" value="2">未认证</el-option>-->
                  <!--                    </el-select>-->
                  <!--                  </el-row>-->
                  <br />
                  <el-row>
                    <el-col :span="8" v-for="v in 9" :key="v">
                      <div class="grid-content rooms">
                        <div class="grid-cell">
                          <div class="wrap">
                            <el-row class="row">
                              <el-col :span="14">
                                <span>标准间</span>
                              </el-col>
                              <el-col :span="10">
                                <div style="text-align: right">
                                  <el-input-number
                                    @change="handleChange"
                                    :min="1"
                                    :max="10"
                                    label
                                    size="mini"
                                    style="width: 100px"
                                  ></el-input-number>
                                </div>
                              </el-col>
                            </el-row>
                            <el-row class="row">
                              <el-col :span="14">
                                <el-button type="text" size="mini"
                                  >可订12</el-button
                                >
                              </el-col>
                              <el-col :span="10">
                                <div style="text-align: right">
                                  <el-input
                                    placeholder
                                    size="mini"
                                    style="width: 60px"
                                  ></el-input>
                                  <em>666</em>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="grid-content">
                  <el-row>
                    <el-button>{{ $t("desk.autoRowHouse") }}</el-button
                    >&nbsp;&nbsp;
                  </el-row>
                  <br />
                  <el-row class="roomSelect">
                    <ul>
                      <li v-for="v in 2" :key="v">
                        <div class="grid-content rooms">
                          <div class="grid-cell">
                            <div class="wrap">
                              <el-row class="row">
                                <el-col :span="14">
                                  <span>标准间</span>
                                </el-col>
                                <el-col :span="10">
                                  <div style="text-align: right">
                                    <el-button type="primary" size="mini">{{
                                      $t("desk.rowHouse")
                                    }}</el-button>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row class="row">
                                <el-button size="mini">A101</el-button>
                              </el-row>
                              <el-row class="row">
                                <el-col :span="14">
                                  <el-button type="text" size="mini"
                                    >可订12</el-button
                                  >
                                </el-col>
                                <el-col :span="10">
                                  <div style="text-align: right">
                                    <el-input-number
                                      @change="handleChange"
                                      :min="1"
                                      :max="10"
                                      label
                                      size="mini"
                                      style="width: 100px"
                                    ></el-input-number>
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >预定</el-button
        >
      </div>
    </el-dialog>

    <!-- 注册会员 -->
    <el-dialog top="0" title="会员注册" :visible.sync="registerme" width="100%">
      <el-row>
        <el-form inline size="small" label-width="100px">
          <el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="会员类型:">
                    <el-select
                      style="width: 246px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option
                        :label="$t('desk.home_all')"
                        value="3"
                      ></el-option>
                      <el-option label="已认证" value="1">已认证</el-option>
                      <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="会员卡号:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item>
                    <el-col>
                      <!-- <div class="grid-content"> -->
                      <el-form-item :label="$t('commons.idCardTypeDesc')">
                        <el-select
                          style="width: 120px"
                          v-model="checkInForm.enterStatus"
                        >
                          <el-option
                            :label="$t('desk.home_all')"
                            value="3"
                          ></el-option>
                          <el-option label="已认证" value="1">已认证</el-option>
                          <el-option label="未认证" value="2">未认证</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-input
                          style="width: 246px"
                          v-model="checkInForm.content"
                        ></el-input>
                      </el-form-item>
                      <!-- </div> -->
                    </el-col>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="姓名:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="电话:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-row>
              <!--              <el-col :span="6">-->
              <!--                <el-form-item label="性别:">-->
              <!--                  <el-radio-group v-model="checkInForm.content">-->
              <!--                    <el-radio label="男"></el-radio>-->
              <!--                    <el-radio label="女"></el-radio>-->
              <!--                  </el-radio-group>-->
              <!--                </el-form-item>-->
              <!--              </el-col>-->

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="生日:" prop="date1">
                    <el-date-picker
                      v-model="checkInForm.startTime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      style="width: 246px"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="邮箱:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="国籍:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content">
                  <el-form-item label="地址:">
                    <el-input
                      style="width: 620px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="车牌号:">
                    <el-input
                      style="width: 246px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content">
                  <el-form-item label="爱好:">
                    <el-input
                      style="width: 620px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="所属单位:">
                    <el-select
                      style="width: 246px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option
                        :label="$t('desk.home_all')"
                        value="3"
                      ></el-option>
                      <el-option label="已认证" value="1">已认证</el-option>
                      <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="14">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input
                      style="width: 620px"
                      v-model="checkInForm.content"
                    ></el-input
                    >&nbsp;&nbsp;
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-row>
          <el-divider></el-divider>

          <el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item :label="$t('desk.order_salesman') + ':'">
                    <el-select
                      style="width: 140px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option
                        :label="$t('desk.home_all')"
                        value="3"
                      ></el-option>
                      <el-option label="已认证" value="1">已认证</el-option>
                      <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="grid-content">
                  <el-form-item label="发展途径:">
                    <el-select
                      style="width: 140px"
                      v-model="checkInForm.enterStatus"
                    >
                      <el-option
                        :label="$t('desk.home_all')"
                        value="3"
                      ></el-option>
                      <el-option label="已认证" value="1">已认证</el-option>
                      <el-option label="未认证" value="2">未认证</el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item>
                <el-checkbox v-model="checked">立即发卡</el-checkbox>
              </el-form-item>
            </el-row>
          </el-row>
          <el-divider></el-divider>
          <el-row style="text-align: center">
            <el-form-item>
              <el-button>取 消</el-button>
              <el-button type="primary"{{ $t("commons.confirm") }}/el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
// import Reserve from "./reserve"
export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  // components: {Reserve },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      vipname: "",
      unitname: "",
      registerme: false,
      dialogFormVisible: false,
      centerForm: {
        region: "",
        startTime: "", //开始时间
        endTime: "", //结束时间
        nums: 1,
        // type: []
      },
      rules: {
        name: [{ required: true, trigger: "blur" }],
        date1: [{ type: "date", trigger: "change" }],
      },
      storeList: [],
      loading: false,
      checked: false,
      showEdit: false,
      showDetail: false,
      checkInForm: {
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
      tableData: [{}], //表格数据
      num: "",
      infoArray:[],
    };
  },
  mounted() {
    let params = {
      filterHeader:true,
    };
    this.$F.doRequest(this, "/pms/freeuser/stores_list", params, (data) => {
      this.storeList = data;
    });
    this.getInfoList();

  },

  methods: {
    getInfoList(){
      let params = {
         storesNum:'',
         changeType:1,
         roomType:1,
      }
       this.$F.doRequest(this, "/pms/checkin/hotel_checkin_roominfo", params, (res) => {
         for(let i in this.storeList){
           let number = this.storeList[i].storesNum;
           let name = this.storeList[i].storesName;
           let object = {}
           object.name = name;
           object.number = number;
           object.array = [];
           for(let t in res.roomTypeList){
             if(number==res.roomTypeList[t].storesNum){
               object.array.push(res.roomTypeList[t])
             }
           }
           this.infoArray.push(object)
         }
        this.infoArray=this.infoArray.filter((item)=>{
        return item.number!="0000000000"
      })
          console.log(this.infoArray);
    });

    },
    onSubmit() {
      console.log("submit!");
    },
    handleChange(value) {
      console.log(value);
    },
    handleEdit(row) {
      console.log(row);
    },
    initForm() {
      this.checkInForm = {
        searchType: 1,
        content: "",
        enterStatus: "",
        pageIndex: 1, //当前页
        pageSize: 10, //页数
        startTime: "", //考试时件
        endTime: "", //结束时间
      };
      this.getDataList();
    },
    /**获取表格数据 */
    getDataList() {
      this.checkInForm.token = this.token;
      this.checkInForm.plat_source = this.plat_source;
      this.checkInForm.userId = this.userId;
      console.log(JSON.stringify(this.checkInForm));
      this.loading = true;
      enterprise_list(this.checkInForm).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.tableData = res.data;
          this.listTotal = res.data.total;
        }
      });
    },
    /**编辑 */
    editRowItem(row) {
      // 加载组件
      this.showEdit = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.editRef.initdata(row.id);
      });
    },

    handelRowItem(row) {
      // 加载组件
      this.showDetail = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.detailRef.initdata(row.id);
      });
    },

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.checkInForm.page_num = val;
      this.checkInForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.checkInForm.page = val;
      this.getDataList();
    },
    handleChange() {},
  },
};
</script>
<style scoped>
.fixedFoot {
  text-align: right;
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 20px;
  background: #fff;
  border-top: 1px solid #eee;
  z-index: 9;
}

.fixedFoot .wrap {
  padding: 10px 20px;
}

.fixedFoot .wrap button {
  margin-left: 20px;
}

.rooms {
  margin-right: 10px;
  margin-bottom: 10px;
}

.rooms .grid-cell {
  border: 1px solid #eee;
  border-radius: 5px;
}

.rooms .grid-cell:active {
  background: #e3eeff;
  border-color: #126eff;
}

.rooms .grid-cell .wrap {
  padding: 10px 5px;
}

.rooms .grid-cell .wrap .row:last-child {
  margin-top: 10px;
}

.rooms .grid-cell .wrap em {
  font-style: normal;
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 5px;
}

.roomSelect {
  background: #f6f7f7;
}

.roomSelect ul li .rooms {
  margin: 0;
}

.roomSelect ul li .rooms .grid-cell {
  border: 0;
}

.roomSelect ul {
  padding: 0 20px;
}

.roomSelect ul li {
  border-bottom: 1px solid #d7d7d7;
  padding: 10px 0;
}

.roomSelect ul li:last-child {
  border-bottom: 0;
}
</style>
