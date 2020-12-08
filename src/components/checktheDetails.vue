<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 18:20:25
 * @FilePath: \jiudian\src\components\checktheDetails.vue
 -->
<template>
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header">
        <div class="headerBox">
          <span class="point">预订单信息</span>
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
            <el-col :span="6"
              ><el-form-item label="住宿价:">
                <el-input
                  placeholder="请填写纯住宿价格"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="入住人:">
                <el-input
                  placeholder="请输入姓名"
                  v-model="form.name"
                  size="small"
                  style="width: 95px"
                ></el-input>
                <el-input
                  placeholder="请输入发音"
                  v-model="form.name"
                  size="small"
                  style="width: 95px; margin-left: 5px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="性别:">
                <el-radio-group v-model="form.resource">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                  <el-radio label="其他"></el-radio>
                </el-radio-group> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="客人分类:">
                <el-select
                  v-model="form.region"
                  placeholder="请选择客人类型"
                  size="small"
                  style="width: 180px"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"
              ><el-form-item label="证件类型:">
                <el-select
                  v-model="form.region"
                  placeholder="请选择证件类型"
                  size="small"
                  style="width: 180px"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="证件号:">
                <el-input
                  placeholder="请输入证件号"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="E-mail:">
                <el-input
                  placeholder="请输入"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="地区:">
                <el-input
                  placeholder="请填写"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"
              ><el-form-item label="住家地址:">
                <el-input
                  v-model="form.name"
                  size="small"
                  style="width: 80px"
                ></el-input>
                <span style="margin: 0 5px">-</span>
                <el-input
                  v-model="form.name"
                  size="small"
                  style="width: 80px"
                ></el-input
                ><el-input
                  placeholder="可输入前面的邮编检索出地址"
                  v-model="form.name"
                  size="small"
                  style="width: 280px; margin-left: 10px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="住家号码:">
                <el-input
                  placeholder="请填写"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="手机号:">
                <el-input
                  placeholder="请填写"
                  v-model="form.name"
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
                  v-model="form.name"
                  size="small"
                  style="width: 95px"
                ></el-input>
                <el-input
                  placeholder="发音"
                  v-model="form.name"
                  size="small"
                  style="width: 95px; margin-left: 5px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="单位电话:">
                <el-input
                  placeholder="请输入"
                  v-model="form.name"
                  size="small"
                  style="width: 180px"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="单位地址:">
                <el-input
                  v-model="form.name"
                  size="small"
                  style="width: 80px"
                ></el-input>
                <span style="margin: 0 5px">-</span>
                <el-input
                  v-model="form.name"
                  size="small"
                  style="width: 80px"
                ></el-input
                ><el-input
                  placeholder="可输入前面的邮编检索出地址"
                  v-model="form.name"
                  size="small"
                  style="width: 280px; margin-left: 10px"
                ></el-input> </el-form-item
            ></el-col>
          </el-row>
          <el-row>
            <el-col :span="6"
              ><el-form-item label="附餐-早:">
                <el-select
                  v-model="form.region"
                  placeholder="请选择证件类型"
                  size="small"
                  style="width: 180px"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option
                    label="区域二"
                    value="beijing"
                  ></el-option> </el-select></el-form-item
            ></el-col>
            <el-col :span="6"
              ><el-form-item label="附餐-晚:">
                <el-select
                  v-model="form.region"
                  placeholder="请选择证件类型"
                  size="small"
                  style="width: 180px"
                >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select> </el-form-item
            ></el-col>
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
        <el-button type="primary">确认</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        resource: "",
        desc: "",
      },
      tableData: [],
    };
  },

  methods: {
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
