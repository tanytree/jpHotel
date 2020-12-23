<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 18:20:25
 * @FilePath: \jiudian\src\components\checktheDetails.vue
 -->
<template>
  <div v-if="">
    <el-card>
      <!-- 头部导航 -->
      <div slot="header">
        <div class="headerBox">
          <span class="point" @click="goBack">预订单信息</span>
          <span style="margin: 0 5px">></span>
          <span style="font-size: 16px">入住人管理</span>
        </div>
      </div>
      <div class="infoBlock">
        <div class="roomItem">A1001/总统套房</div>
        <el-form
          ref="form"
          :model="form"
          label-width="75px"
          label-position="right"
          inline
        >
          <el-row>
            <el-col :span="6">
                <el-form-item label="住宿价:">
                    <el-input placeholder="请填写纯住宿价格" v-model="checkinInfo.headerObj.housePrice" size="small" style="width: 180px"></el-input>
                </el-form-item >
            </el-col>
            <el-col :span="6">
                <el-form-item label="入住人:">
                <el-input placeholder="请输入姓名" v-model="checkinInfo.headerObj.name" size="small" style="width: 95px"></el-input>
                <el-input
                  placeholder="请输入发音"
                  v-model="form.name"
                  size="small"
                  style="width: 95px; margin-left: 5px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="性别:">
                <el-radio-group v-model="checkinInfo.headerObj.sex">
                  <el-radio v-for="(item,key,index) of $t('commons.F_sex')" :label="item" :key="index" ></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="客人分类:">
                    <el-select v-model="checkinInfo.headerObj.customerType" style="width:100%">
                        <el-option :value="key" v-for="(item,key,index) of $t('commons.customerTypes')" :label="item" :key="index" ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item label="证件类型:">
                    <el-select v-model="checkinInfo.headerObj.idcardType" :placeholder="$t('commons.selectIdCardType')" class="width200">
                        <el-option v-for="(value, key) in $t('commons.idCardType')" :label="value" :value="key" :key="key"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6"
              ><el-form-item label="证件号:">
                <el-input placeholder="请输入证件号" v-model="checkinInfo.headerObj.idcard" size="small" style="width: 180px"></el-input>
            </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="E-mail:">
                <el-input placeholder="请输入" v-model="checkinInfo.headerObj.email" size="small" style="width: 180px"></el-input>
            </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="地区:">
                <el-input
                  placeholder="请填写"
                  v-model="checkinInfo.headerObj.region"
                  size="small"
                  style="width: 180px"
                ></el-input>
            </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><el-form-item label="住家地址:">
                <el-input v-model="checkinInfo.headerObj.homeAddressZip1" size="small" style="width: 80px"></el-input>
                <span style="margin: 0 5px">-</span>
                <el-input v-model="checkinInfo.headerObj.homeAddressZip2" size="small" style="width: 80px"></el-input>
                <el-input
                  placeholder="可输入前面的邮编检索出地址"
                  v-model="checkinInfo.headerObj.homeAddress"
                  size="small"
                  style="width: 280px; margin-left: 10px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="住家号码:">
                <el-input
                  placeholder="请填写"
                  v-model="checkinInfo.headerObj.homeMobile"
                  size="small"
                  style="width: 180px"
                ></el-input>
            </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="手机号:">
                <el-input
                  placeholder="请填写"
                  v-model="checkinInfo.headerObj.phone"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"
              ><el-form-item label="单位名称:">
                <el-input
                  placeholder="请输入"
                  v-model="checkinInfo.headerObj.enterName"
                  size="small"
                  style="width: 95px"
                ></el-input>
                <el-input
                  placeholder="发音"
                  v-model="checkinInfo.headerObj.enterPinyin"
                  size="small"
                  style="width: 95px; margin-left: 5px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="单位电话:">
                <el-input
                  placeholder="请输入"
                  v-model="checkinInfo.headerObj.enterMobile"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="单位地址:">
                <el-input
                  v-model="checkinInfo.headerObj.enterAddressZip1"
                  size="small"
                  style="width: 80px"
                ></el-input>
                <span style="margin: 0 5px">-</span>
                <el-input
                  v-model="checkinInfo.headerObj.enterAddressZip2"
                  size="small"
                  style="width: 80px"
                ></el-input
                ><el-input
                  placeholder="可输入前面的邮编检索出地址"
                  v-model="checkinInfo.headerObj.enterAddress"
                  size="small"
                  style="width: 280px; margin-left: 10px"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item label="附餐-早:">
                    <el-select v-model="checkinInfo.headerObj.attachMealId" style="width:100%">
                        <el-option
                            v-for="item in breakfastList"
                            :key="item.id"
                            :label="item.mealName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6"
              ><el-form-item label="附餐-晚:">
                <el-select v-model="checkinInfo.headerObj.attachMealIdDinner" style="width:100%">
                    <el-option
                        v-for="item in dinnerList"
                        :key="item.id"
                        :label="item.mealName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="overLine"></div>
        <!--表格数据 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          max-height="500px;"
          header-row-class-name="default"
          size="small"
        >
          <el-table-column label="姓名" align="center" width="200px;">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.name"
                size="small"
                style="width: 85px"
              ></el-input>
              <el-input
                placeholder="发音"
                v-model="row.pinyin"
                size="small"
                style="width: 85px; margin-left: 5px"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="证件类型" width="100px;">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.cardType"
                size="small"
                style="width: 90px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="证件号码" width="130px;">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.cardNum"
                size="small"
                style="width: 120px"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="性别" width="100px;">
            <template slot-scope="{ row }">
              <el-select v-model="row.sex" size="small" style="width: 90px">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="客人分类" width="180px;">
            <template slot-scope="{ row }">
              <el-select
                v-model="row.custormer"
                size="small"
                style="width: 170px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="附餐-早餐" width="180px;">
            <template>
              <el-select
                v-model="form.region"
                size="small"
                style="width: 170px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="附餐-晚餐" width="180px;">
            <template>
              <el-select
                v-model="form.region"
                size="small"
                style="width: 170px"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="{ row }">
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addPeople" style="margin-top: 10px"
          >+同来宾客</el-button
        >
      </div>
      <div class="bottomBottom">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addPersonSubmit">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    mounted() {
        debugger
        this.detailData = this.$route.params.detailData;
        this.currentRoom = this.$route.params.currentRoom || '';
    },
  data() {

    return {
        detailData: {},   //订单信息
        currentRoom: '',    //当前房间
      form: {
        name: "",
        region: "",
        resource: "",
        desc: "",

      },
        checkinInfo: {
            checkinId: '',  //预订单或订单id
            checkInRoomJson: [],  //入住人列表
            headerObj: {  //  主入住人对象   json字符串
                checkinRoomId: '', //房间id  int必填
                name: '', //          姓名  String必填
                pronunciation: '', // 姓名发音String必填
                idcardType: '1', //    证件类型 1身份证  2护照  Integer必填
                idcard : '', //       证件号码  String必填
                sex: '1', //           性别 1男  2女 3保密  Integer必填
                mobile: '', //        手机号  String必填
                id: '', //            入住人表id  传改值可以编辑入住人信息  String选填
                housePrice: '', //    住宿价格   double必填
                customerType: '', //  客人分类  1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
                attachMealId: '', //  附餐id-早餐 （附餐列表中获取） string选填
                attachMealIdDinner: '', //  附餐id-晚餐 （附餐列表中获取） string选填
                email: '', //      邮箱  String选填
                region: '', //      地区  String选填
                homeAddressZip1: '', //      住家地址邮编1  String选填
                homeAddressZip2: '', //      住家地址邮编2  String选填
                homeAddress: '', //      住家地址  String选填
                homeMobile: '', //      住家号码  String选填
                phone: '', //      手机号  String选填
                enterName: '', //      单位名称  String选填
                enterPinyin: '', //      单位发音  String选填
                enterMobile: '', //      单位电话  String选填
                enterAddressZip1: '', //      单位地址邮编1  String选填
                enterAddressZip2: '', //      单位地址邮编2  String选填
                enterAddress: '', //      单位地址  String选填
            },
            personList: [],
            //
            //         checkinRoomId 房间id  int必填
            //         *                                           name          姓名  String必填
            //             *                                           pronunciation 姓名发音String必填
            //         *                                           idcardType    证件类型 1身份证  2护照  Integer必填
            //             *                                           idcard        证件号码  String必填
            //             *                                           sex           性别 1男  2女 3保密  Integer必填
            //             *                                           mobile        手机号  String必填
            //             *                                           id            入住人表id  传改值可以编辑入住人信息  String选填
            //         *                                           housePrice    住宿价格   double必填
            //             *                                           customerType  客人分类  1大人 2儿童A（小学5年级以上）  3儿童B（3岁至小学5年级） 4儿童C（0至3岁不占床）   int必填
            // *                                           attachMealId  附餐id-早餐 （附餐列表中获取） string选填
            // *                                           attachMealIdDinner  附餐id-晚餐 （附餐列表中获取）

        },
      tableData: [],
        //附餐列表
        breakfastList: [],  //早餐
        dinnerList: [],    //晚餐
    };
  },

    created() {
        this.fetchHotelattaChmealList();
    },

  methods: {
        //提交添加入住人
      addPersonSubmit() {
          let params = {};
          this.$F.merge(params, {
              checkInReserveId: this.detailData.checkIn.id,
          });
          //预定房办理入住
          this.$F.doRequest(this, '/pms/reserve/reserve_to_checkin', params, (res) => {
              debugger
              //然后立即办理入住
              let checkInRoomJson = [];
              this.checkinInfo.headerObj.roomId = this.detailData.inRoomList[0].roomId;
              this.checkinInfo.headerObj.roomTypeId = this.detailData.inRoomList[0].roomTypeId;
              checkInRoomJson.push(this.checkinInfo);
              params = {
                  checkinId: res.checkinId,
                  checkInRoomJson: JSON.stringify(checkInRoomJson)
              }
              debugger
              this.$F.doRequest(this, '/pms/checkin/live_in_person_batch', params, (data) => {
                  debugger
                  // this.$emit('checkInCallback', res.checkinId);
              })
          })
      },
      fetchHotelattaChmealList() {
          this.$F.doRequest(this, '/pms/hotelattachmeal/list', {
              pageIndex: 1,
              pageSize: 999,
              state: 1,  //1启用 2禁用
          }, (res) => {
              let hotelattaChmealList = res.list;
              this.breakfastList = hotelattaChmealList.filter( (item) => {
                  return item.mealTime == 1;
              }) || [];
              this.dinnerList = hotelattaChmealList.filter( (item) => {
                  return item.mealTime == 2;
              }) || [];
              this.$forceUpdate();
          })
      },
      goBack(){
          this.$router.go(-1);
      },
    addPeople() {
      console.log(this.tableData);
      let t = {};
      this.tableData.push(t);
    },
  },
};
</script>

<style lang="less" scoped>
.headerBox {
  color: rgba(102, 102, 102, 100);
  font-size: 18px;
  span:nth-of-type(3) {
    font-weight: 600;
  }
  .point {
    cursor: pointer;
  }
}
.infoBlock {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(252, 252, 252, 1);
  border: 1px solid rgba(211, 211, 211, 1);
  .overLine {
    margin-bottom: 10px;
    height: 1px;
    border: 1px solid rgba(227, 227, 227, 1);
  }
  .roomItem {
    color: rgba(51, 51, 51, 100);
    font-size: 16px;
    font-weight: 500;
    margin: 10px 0;
    margin-top: 5px;
  }
}
.bottomBottom{
  text-align: right;
  margin-top: 10px;
  margin-right: 20px;
}
/***** */
.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
