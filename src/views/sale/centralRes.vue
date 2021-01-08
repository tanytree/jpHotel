<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form ref="centerForm" inline size="small" :model="centerForm" label-width="110px">
          <el-col :span="9">
            <el-form-item :label="$t('manager.hp_hotelName')+':'">
              <el-select v-model="centerForm.storesNum" :placeholder="$t('login.sTip')">
                <!-- <el-option :label="$t('desk.home_all')" value=""></el-option> -->
                <el-option v-for="item in storeList" :key="item.storesNum" :label="item.storesName" :value="item.storesNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" style="margin-left: 25px" @click="onSubmit">{{$t('commons.queryBtn')}}</el-button>
              <el-button type="primary" style="margin-left: 25px" @click="innitData">{{$t('commons.resetBtn')}}</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>

    <!-- 酒店信息表格 -->
    <el-row>
      <h4>{{$t('manager.hp_hotelInformation')}}:</h4>
      <el-row v-for="(item, index) in infoArray" :key="index" style="margin-top: 30px" v-loading="loading">
        <div>
          <span>{{ item.name }}</span>
        </div>
        <el-table :data="tableData" style="width: 100%; margin-top: 10px" :header-cell-style="{ background: '#D9DDE2', color: '#606266' }" border>
          <el-table-column :label="$t('desk.home_roomType')" width="130" fixed>
            <template>
              <el-row>{{$t('boss.add_roomDetail')}}</el-row>
            </template>
          </el-table-column>
          <el-table-column v-for="(each, index) in item.array" :key="index" :label="each.roomTypeName" width="160">
            <template>
              <el-row>{{$t('boss.add_canBookNum')}}：{{ each.reserveTotal }}</el-row>
              <el-row v-if="each.personPrice && each.personPrice.split(',').length > 0">
                <el-col v-for="(price, secondIndex) in each.personPrice.split(',')" :key="secondIndex">
                  <div v-if="secondIndex==0"> {{$t('boss.add_onePeople')}}：{{ price|numFormate }}</div>
                  <div v-else> {{ secondIndex + 1 }}{{$t('boss.add_peopleLivePrice')}}：{{ price|numFormate }}</div>
                </el-col>
              </el-row>
              <el-row v-else>1{{$t('boss.add_peopleLivePrice')}}：{{ checkedPrice(each.onePersonPrice)  || checkedPrice(each.personPrice) }}</el-row>
            </template>
          </el-table-column>
          <el-table-column :label="$t('commons.operating')" fixed="right">
            <template>
              <el-button :disabled="item.array.length > 0 ? false : true" size="mini" type="text" @click="handleReserve(item)">{{$t('boss.add_normalBook')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
    <el-dialog top="0" :visible.sync="reserveShow" class="rowRoomDia" :title="$t('desk.rowHouse')" width="1400px">
      <normal :selectStoresNum="selectStoresNum" operCheckinType="b1" ref="normal" @cancel="cancel"></normal>
    </el-dialog>
  </div>
</template>
<script>
import normal from "@/views/market/reception/checkin/normal";
export default {
  components: { normal },
  data() {
    return {
      loading: false,
      selectStoresNum: "",
      reserveShow: false,
      vipname: "",
      unitname: "",
      dialogFormVisible: false,
      centerForm: {
        storesNum: "",
      },
      storeList: [],
      tableData: [{}], //表格数据
      num: "",
      infoArray: [],
    };
  },
  
  filters: {
    //对数据进行处理
    numFormate(num) {
      console.log(num);
      if (num) {
        return num.toString().replace(/\d+/, function (n) {
          // 先提取整数部分
          return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            // 对整数部分添加分隔符
            return $1 + ",";
          });
        });
      }
    },
  },
  mounted() {
    this.$F.doRequest(
      this,
      "/pms/freeuser/stores_list",
      {
        filterHeader: true,
      },
      (data) => {
        this.storeList = data;
      }
    );
    this.getInfoList();
  },

  methods: {
     checkedPrice(num) {
      if (num) {
        return num.toString().replace(/\d+/, function (n) {
          // 先提取整数部分
          return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
            // 对整数部分添加分隔符
            return $1 + ",";
          });
        });
      }
    },
    //子组件回调关键dialog方法
    cancel() {
      this.reserveShow = false;
    },
    innitData() {
      this.centerForm.storesNum = "";
      this.getInfoList();
    },
    /**获取表格数据 */
    getInfoList() {
      this.infoArray = [];
      let params = {
        changeType: 2,
        roomType: 1,
      };
      this.$F.merge(params, this.centerForm);
      this.$F.doRequest(
        this,
        "/pms/checkin/hotel_checkin_roominfo",
        params,
        (res) => {
          if (this.centerForm.storesNum) {
            if (res.roomTypeList.length > 0) {
              let number = res.roomTypeList[0].storesNum;
              let name = res.roomTypeList[0].storesName;
              let object = {};
              object.name = name;
              object.number = number;
              object.array = [];
              for (let y in res.roomTypeList) {
                object.array.push(res.roomTypeList[y]);
              }
              this.infoArray.push(object);
            } else {
              this.$message(this.$t("boss.add_noHaveInfo"));
            }
          } else {
            for (let i in this.storeList) {
              let number = this.storeList[i].storesNum;
              let name = this.storeList[i].storesName;
              let object = {};
              object.name = name;
              object.number = number;
              object.array = [];
              for (let t in res.roomTypeList) {
                if (number == res.roomTypeList[t].storesNum) {
                  object.array.push(res.roomTypeList[t]);
                }
              }
              this.infoArray.push(object);
            }
          }
          console.log(this.infoArray);
        }
      );
    },
    // 点击查询按钮
    onSubmit() {
      this.getInfoList();
    },
    handleChange(value) {
      console.log(value);
    },
    handleReserve(item) {
      this.reserveShow = true;
      this.selectStoresNum = item.number;
      if (this.$refs.normal) {
        this.$refs.normal.initModule(item.number, item.number);
      }
    },
  },
};
</script>
<style lang="less" scoped>
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
