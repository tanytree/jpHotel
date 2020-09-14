<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-06 16:25:34
 * @FilePath: /jiudian/src/views/market/customer/children/detail.vue
 -->
<template>
  <div>
    <el-card v-loading="loading">
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            @click.native="goMemberManag()"
            style=" font-weight: 700;cursor: pointer;"
          >会员管理</el-breadcrumb-item>
          <el-breadcrumb-item
            v-if="type != 'add'"
          >{{detailForm.memberCard}}-{{detailForm.name}}-{{F_memberTypeId(detailForm.memberTypeId)}}</el-breadcrumb-item>
          <el-breadcrumb-item v-else>新增会员</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form
                inline
                size="small"
                label-width="120px"
                :model="detailForm"
                ref="detailForm"
                :rules="type!='detail'?rules:{}"
              >
                <el-row v-if="type=='edit'">
                  <el-form-item label>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(1)">换卡</el-button>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(2)">修改类型</el-button>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(3)">注销</el-button>
                    <el-button type="primary" size="mini" @click="setCardFormBtnClick(4)">挂失补卡</el-button>
                  </el-form-item>
                </el-row>
                <el-row v-if="type=='add'">
                  <el-form-item label>
                    <el-button type="primary" size="mini">读会员号</el-button>
                  </el-form-item>
                </el-row>
                <el-row class="row" style="background:#EFEFEF" v-if="type!='add'">
                  <div class="wrap">
                    <p>
                      剩余积分：
                      <span class="text-blue">{{detailForm.score?detailForm.score:0}}</span>
                    </p>
                    <p>
                      <span class="text-blue" style="cursor:pointer;" @click="toIntegralDetail">明细</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        style="cursor:pointer;"
                        class="text-blue"
                        v-if="type=='edit'"
                        @click="exchangeClick()"
                      >积分兑换</span>
                    </p>
                  </div>
                </el-row>
                <br />

                <el-row class="row">
                  <el-row class="cell">
                    <template v-if="type=='add'">
                      <el-col :span="8" class="col">
                        <el-form-item label="会员类型" prop="memberTypeId">
                          <el-select v-model="detailForm.memberTypeId" v-if="type!='detail'" class>
                            <el-option
                              v-for="item in smembertypeList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" class="col">
                        <el-form-item label="会员卡号" prop="memberCard">
                          <el-input v-model="detailForm.memberCard" v-if="type!='detail'"></el-input>
                        </el-form-item>
                      </el-col>
                    </template>
                    <el-col :span="8" class="col">
                      <el-form-item label="姓名" prop="name">
                        <el-input v-model="detailForm.name" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.name}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="电话" prop="mobile">
                        <el-input v-model="detailForm.mobile" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.mobile}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="证件类型" prop="idcardType">
                        <el-select v-model="detailForm.idcardType" v-if="type!='detail'" class>
                          <el-option
                            v-for="(label, value) in $t('commons.idCardType')"
                            :label="label"
                            :value="value"
                            :key="value"
                          ></el-option>
                        </el-select>
                        <template v-if="type=='detail'">{{detailForm.idcardType | F_idcardType}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="证件号码" prop="idcard">
                        <el-input v-model="detailForm.idcard" v-if="type!='detail'" class></el-input>
                        <template v-if="type=='detail'">{{detailForm.idcard}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell" v-if="type!='add'">
                    <el-col :span="8" class="col">
                      <el-form-item label="会员卡号">{{detailForm.memberCard}}</el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="会员类型">{{F_memberTypeId(detailForm.memberTypeId)}}</el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="是否黑名单">{{detailForm.isBlacklist | F_isBlacklist}}</el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="detailForm.sex" v-show="type!='detail'">
                          <el-radio
                            v-for="(item,key,index) of $t('commons.F_sex')"
                            :label="key"
                            :key="index"
                          >{{item}}</el-radio>
                        </el-radio-group>
                        <template v-if="type=='detail'">{{detailForm.sex | F_sex}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                          v-model="detailForm.birthday"
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="选择日期"
                          v-if="type!='detail'"
                        ></el-date-picker>
                        <template v-if="type=='detail'">{{detailForm.birthday}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model="detailForm.email" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.email}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="国籍" prop="nationality">
                        <el-select v-model="detailForm.nationality" class v-if="type!='detail'">
                          <el-option
                            v-for="item in nationalityList"
                            :key="item.id"
                            :label="$i18n.locale == 'ri' ?item.jName:item.cName"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                        <template v-if="type=='detail'">{{F_nationality(detailForm.nationality)}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="地址" prop="address">
                        <el-input v-model="detailForm.address" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.address}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="车牌号" prop="carNum">
                        <el-input v-model="detailForm.carNum" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.carNum}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="爱好" prop="hobby">
                        <el-input v-model="detailForm.hobby" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.hobby}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="所属单位" prop="enterId">
                        <el-select v-model="detailForm.enterId" class v-if="type!='detail'">
                          <el-option
                            v-for="item in hotelenterList"
                            :key="item.id"
                            :label="item.enterName"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                        <template v-if="type=='detail'">{{F_enterId(detailForm.enterId)}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="备注">
                        <el-input v-model="detailForm.remark" v-if="type!='detail'"></el-input>
                        <template v-if="type=='detail'">{{detailForm.remark}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="销售员" prop="salesId">
                        <el-select v-model="detailForm.salesId" v-if="type!='detail'">
                          <el-option
                            v-for="item in salesList"
                            :key="item.id"
                            :label="item.userName"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                        <template v-if="type=='detail'">{{F_salesId(detailForm.salesId)}}</template>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="发展途径" prop="getWay">
                        <el-select v-model="detailForm.getWay" v-if="type!='detail'">
                          <el-option
                            v-for="(value, key) in $t('frontOffice.getWay')"
                            :label="value"
                            :key="value"
                            :value="key"
                          ></el-option>
                        </el-select>
                        <template v-if="type=='detail'">{{detailForm.mobile}}</template>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row" v-if="type=='add'">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="立即发卡" prop="state">
                        <el-select v-model="detailForm.state">
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="待启用" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <template v-if="type != 'detail'">
      <el-row style="height:60px"></el-row>
      <el-row class="fixedFoot">
        <div class="wrap">
          <el-button type="primary" @click="addItem('detailForm')" v-loading="loading">保存</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </el-row>
    </template>

    <el-dialog
      top="0"
      :title="cardForm.titleName"
      :visible.sync="setCardFormVisible"
      class="setCardForm"
    >
      <el-form :model="cardForm" ref="cardForm" :rules="rules" :label-width="formLabelWidth">
        <el-form-item
          label
          class="require"
          label-width="80px"
        >原卡号：{{detailForm.memberCard}} 姓名：{{detailForm.name}} 会员类型：{{F_memberTypeId(detailForm.memberTypeId)}}</el-form-item>
        <template v-if="cardForm.type==1">
          <el-form-item label="新卡号" class prop="memberCard">
            <el-input style="width:300px" v-model="cardForm.memberCard" placeholder></el-input>
          </el-form-item>
          <el-form-item label="备注" class prop="remark">
            <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
          <el-form-item label="立即发卡" class prop="state">
            <el-checkbox v-model="cardForm.state"></el-checkbox>
          </el-form-item>
        </template>
        <template v-if="cardForm.type==2">
          <el-form-item label="修改为" class prop="memberTypeId">
            <el-select
              v-model="cardForm.memberTypeId"
              style="width:300px"
              @change="memberTypeIdChange"
            >
              <template v-for="item in smembertypeList">
                <el-option
                  v-if="item.id!=detailForm.memberTypeId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <template v-if="cardForm.payPrices">
            <el-form-item label="支付方式" class prop="payWay">
              <el-select v-model="cardForm.payWay" style="width:300px">
                <el-option label="现金" :value="1"></el-option>
                <el-option label="微信" :value="2"></el-option>
                <el-option label="支付宝" :value="3"></el-option>
                <el-option label="银联" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付费用" class prop="payPrices">
              <el-input style="width:300px" v-model="cardForm.payPrices" disabled placeholder></el-input>
            </el-form-item>
          </template>
          <el-form-item label="修改原因" class prop="remark">
            <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type==3">
          <el-form-item label="备注" class prop="remark">
            <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
        </template>
        <template v-if="cardForm.type==4">
          <el-form-item label="操作类型" class prop="operType">
            <el-radio-group v-model="cardForm.operType">
              <el-radio :label="2">挂失并补卡</el-radio>
              <el-radio :label="3">仅挂失</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="cardForm.operType==2">
            <el-form-item label="新卡号" class>
              <el-input style="width:300px" v-model="cardForm.memberCard" placeholder></el-input>
            </el-form-item>
            <el-form-item label="支付方式" class prop="payWay">
              <el-select v-model="cardForm.payWay" style="width:300px">
                <el-option label="现金" :value="1"></el-option>
                <el-option label="微信" :value="2"></el-option>
                <el-option label="支付宝" :value="3"></el-option>
                <el-option label="银联" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付费用" class prop="payPrices">
              <el-input style="width:300px" v-model="cardForm.payPrices" placeholder></el-input>
            </el-form-item>
          </template>
          <el-form-item label="备注" class prop="remark">
            <el-input style="width:300px" type="textarea" v-model="cardForm.remark" placeholder></el-input>
          </el-form-item>
          <el-form-item label="立即发卡" class prop="state" v-if="cardForm.operType==1">
            <el-checkbox v-model="detailForm.state"></el-checkbox>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setCardFormVisible=false">关闭</el-button>
        <el-button type="primary" @click="setCardFrormChange('cardForm')">确认</el-button>
      </div>
    </el-dialog>
    <!-- 积分兑换弹窗 -->
    <el-dialog title="积分兑换" :visible.sync="exchangeDialog" width="90%" top="0">
      <el-row :gutter="20">
        <!-- 左边 -->
        <el-col :span="14">
          <div class="ex_border">
            <div class="ex15_top">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称:">
                  <el-input v-model="formInline.name" size="small" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="商品类别:">
                  <el-select v-model="formInline.categoryId" placeholder="活动区域" size="small">
                    <el-option label="全部" value></el-option>
                    <el-option
                      v-for="item in goodsKind"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="ex_lookFor" size="small">查询</el-button>
                  <el-button type="primary" @click="ex_reset" size="small">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="chooseList"
              :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
              size="mini"
            >
              <el-table-column prop="name" label="商品名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryName" label="商品类别" show-overflow-tooltip></el-table-column>
              <el-table-column prop="score" label="消耗积分" show-overflow-tooltip width="280px"></el-table-column>
              <el-table-column prop="inventoryCount" label="库存" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="{row}">
                  <el-button type="text" size="mini" @click="addGoods(row)">添加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <!-- 右边 -->
        <el-col :span="10">
          <div class="ex_border">
            <div class="ex9_top">已选商品</div>
            <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="selectList"
              :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
              size="mini"
            >
              <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="score" label="消耗积分" show-overflow-tooltip></el-table-column>
              <el-table-column label="数量" align="center" show-overflow-tooltip width="120px">
                <template slot-scope="{row}">
                  <el-input-number
                    v-model="row.number"
                    @change="handleChange"
                    :min="1"
                    :max="row.inventoryCount"
                    style="width:100px"
                    size="mini"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="合计" show-overflow-tooltip>
                <template slot-scope="{row}">
                  <div>{{addUpTo(row)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="{row}">
                  <el-button type="text" size="mini" @click="removeClick(row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin:20px 0 40px 0">
              共{{common(selectList)}}件，
              <span class="hejiClass">合计：{{combined}}</span>
            </div>
            <el-button type="primary" @click="sureExchange" style="margin:0 0 16px 16px;">确认兑换</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

export default {
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
      combined: 0,
      goodsKind: [],
      chooseList: [],
      selectList: [],
      formInline: {
        name: "",
        categoryId: "",
      },
      exchangeDialog: false,
      loading: false,
      type: "edit",
      setCardFormVisible: false,
      formLabelWidth: "120px",
      nationalityList: [],
      storeList: "",
      smembertypeList: "",
      salesList: "",
      hotelenterList: "",
      cardForm: {
        titleName: "",
        type: "",
        name: "",
      },
      detailForm: {
        id: "",
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        idcardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请填入证件编号",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        memberCard: [
          {
            required: true,
            message: "请输入会员卡号",
            trigger: "blur",
          },
        ],
        memberTypeId: [
          {
            required: true,
            message: "请选择会员类型",
            trigger: "change",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择是否立即发卡",
            trigger: "change",
          },
        ],
        remark: [
          {
            required: true,
            message: "请填写备注",
            trigger: "blur",
          },
        ],
        payPrices: [
          {
            required: true,
            message: "请填写支付金额",
            trigger: "blur",
          },
        ],
        payWay: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change",
          },
        ],
        operType: [
          {
            required: true,
            message: "请选择操作类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.detailForm.id = this.$route.query.id ? this.$route.query.id : "";
    // debugger
    if (this.$route.name == "customeradd") {
      this.type = "add";
    } else if (this.$route.name == "customeredit") {
      this.type = "edit";
    } else {
      this.type = "detail";
    }
    if (this.$route.query.id) {
      this.findone(this.$route.query.id);
    }
    this.stores_list();
    this.nationality();
    this.$F.commons.fetchSalesList({ salesFlag: 1 }, (data) => {
      this.salesList = data.hotelUserList;
    });
    this.hotelenter_list();
    this.smembertype_list();
  },

  methods: {
    ...mapMutations({
      resetActive: "resetActive",
    }),

    //计算 共   多少件
    common(selectList) {
      let total = 0;
      let gongji = 0;
      for (let item of selectList) {
        total += item.number;
        gongji += item.heji;
      }
      this.combined = gongji;
      return total;
    },
    //积分兑换  点击 确认兑换
    sureExchange(params = {}) {
      this.$F.merge(params, {
        memberCard: this.detailForm.memberCard,
        content: JSON.stringify(this.selectList),
      });
      this.$F.doRequest(
        this,
        "/pms/hotelmemberscore/get_total_member",
        params,
        (res) => {
          console.log(res);
          this.$message.success("兑换成功");
          this.exchangeDialog = false;
        }
      );
    },

    //积分兑换  点击查询
    ex_lookFor() {
      let params = {
        name: "",
        categoryId: "",
        state: 1,
        status: 1,
      };
      this.$F.merge(params, this.formInline);
      this.$F.doRequest(this, "/pms/hotelgoods/list", params, (res) => {
        console.log(res);
        this.chooseList = res.list;
      });
    },
    //积分兑换  点击重置
    ex_reset() {
      this.formInline = { name: "", categoryId: "" };
      this.ex_lookFor();
    },
    //点击 积分兑换
    exchangeClick() {
      let params = {
        name: "",
        categoryId: "",
        state: 1,
        status: 1,
      };
      this.$F.doRequest(this, "/pms/hotelgoods/list", params, (res) => {
        console.log(res);
        this.chooseList = res.list;
        this.goodsType();
      });
    },
    //商品分裂接口
    goodsType() {
      this.$F.doRequest(this, "/pms/hotelcategory/list", {}, (res) => {
        console.log(res);
        this.goodsKind = res.list;
        this.exchangeDialog = true;
      });
    },
    //积分兑换  点击移除
    removeClick(row) {
      this.selectList = this.selectList.filter((item) => {
        return item.goodsId != row.goodsId;
      });
      console.log(this.selectList.length);
    },

    //积分兑换  点击添加
    addGoods(row) {
      console.log(row);
      let each = {
        goodsId: row.id,
        goodsName: row.name,
        score: row.score,
        number: row.buyCount,
        inventoryCount: row.inventoryCount,

        heji: 0,
      };
      let id = row.id;
      for (let item = 0; item < this.selectList.length; item++) {
        if (id == this.selectList[item].goodsId) {
          this.selectList[item].number += row.buyCount;
          return false;
        }
      }
      this.selectList.push(each);
    },
    //跳转  会员信息管理
    goMemberManag() {
      this.resetActive("member");
      this.$router.push("/customer");
    },
    //跳转  积分明细  页面
    toIntegralDetail() {
      if (this.$route.query.buttonName == "详情") {
        return false;
      } else {
        this.$router.push({
          path: "/integralDetail",
          query: {
            id: this.detailForm.id,
          },
        });
      }
    },
    //计算合计
    addUpTo(row) {
      let heji = 0;
      heji = row.score * row.number;
      row.heji = heji;
      return heji;
    },
    //计数器改变
    handleChange(value) {
      console.log(value);
    },
    findone(id) {
      this.$F.doRequest(
        this,
        "/pms/hotelmember/findone",
        {
          id: id,
        },
        (res) => {
          for (var key in res) {
            //遍历json对象的每个key/value对,p为key
            if (res[key] && typeof res[key] == "number") {
              res[key] = res[key].toString();
            }
          }
          console.log(res);
          this.detailForm = res;
        }
      );
    },
    setCardFormBtnClick(v) {
      let enums = {
        1: "换卡操作",
        2: "修改会员类型",
        3: "会员停用",
        4: "挂失/补卡操作",
      };
      this.cardForm.type = v;
      this.cardForm.titleName = v && enums[v] ? enums[v] : "其它";
      this.setCardFormVisible = true;
    },
    setCardFrormChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {},
            url = "";
          if (this.cardForm.type == 1) {
            url = "/pms/hotelmember/changecard";
            params = {
              id: this.detailForm.id,
              remark: this.cardForm.remark,
              memberCard: this.cardForm.memberCard,
              state: this.cardForm.state ? 1 : 3,
            };
          }
          if (this.cardForm.type == 2) {
            url = "/pms/hotelmember/change_type";
            params = {
              memberId: this.detailForm.id,
              remark: this.cardForm.remark,
              oldTypeId: this.detailForm.memberTypeId,
              newTypeId: this.cardForm.memberTypeId,
              operType: 1,
              oldCardNum: this.detailForm.memberCard,
              cardNum: this.detailForm.memberCard,
              payWay: this.cardForm.payWay,
              payPrices: this.cardForm.payPrices,
            };
          }
          if (this.cardForm.type == 3) {
            url = "/pms/hotelmember/delete";
            params = {
              id: this.detailForm.id,
              remark: this.cardForm.remark,
            };
          }
          if (this.cardForm.type == 4) {
            if (this.cardForm.operType == 2) {
              params = {
                memberId: this.detailForm.id,
                remark: this.cardForm.remark,
                oldTypeId: this.detailForm.memberTypeId,
                newTypeId: this.detailForm.memberTypeId,
                operType: 2,
                oldCardNum: this.detailForm.memberCard,
                cardNum: this.cardForm.memberCard,
                payWay: this.cardForm.payWay,
                payPrices: this.cardForm.payPrices,
              };
              url = "/pms/hotelmember/change_type";
            } else {
              params = {
                id: this.detailForm.id,
                remark: this.cardForm.remark,
                state: 2,
              };
              url = "/pms/hotelmember/enable_disable";
            }
          }
          this.$F.doRequest(this, url, params, (data) => {
            if (this.cardForm.type != 3 || this.cardForm.type != 4) {
              this.setCardFormVisible = false;
              this.findone(this.detailForm.id);
            } else {
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    smembertype_list() {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.smembertypeList = res.list;
      });
    },

    hotelenter_list() {
      let params = {
        id: "",
        enterName: "",
        state: 1,
        shareFlag: "",
        contactName: "",
        contactPhone: "",
        salesId: "",
        startCreditLimit: "",
        endCreditLimit: "",
        paging: false,
        salesFlag: 1,
        pageIndex: 1,
        pageSize: 10,
      };
      this.$F.doRequest(null, "/pms/hotelenter/list", params, (data) => {
        this.hotelenterList = data.list;
      });
    },
    stores_list() {
      this.$F.doRequest(null, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/hotelmember/edit",
            this.detailForm,
            (res) => {
              this.$message({
                message: "success",
                type: "success",
              });
              setTimeout(() => {
                this.$router.replace("/customer");
              }, 1200);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    memberTypeIdChange(e) {
      let that = this;
      console.log(e);
      for (let k in that.smembertypeList) {
        if (that.smembertypeList[k].id == e) {
          this.cardForm.payPrices = that.smembertypeList[k].prices || "";
        }
      }
    },
    F_memberTypeId(v) {
      let that = this;
      for (let k in that.smembertypeList) {
        if (that.smembertypeList[k].id == v) {
          return that.smembertypeList[k].name;
        }
      }
      return "";
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return "";
    },
    F_nationality(v) {
      let that = this;
      for (let k in that.nationalityList) {
        if (that.nationalityList[k].id == v) {
          return this.$i18n.locale == "ri"
            ? that.nationalityList[k].jName
            : that.nationalityList[k].cName;
        }
      }
      return "";
    },
    F_salesId(v) {
      let that = this;
      for (let k in that.salesList) {
        if (that.salesList[k].id == v) {
          return that.salesList[k].userName;
        }
      }
      return "";
    },
    F_enterId(v) {
      let that = this;
      for (let k in that.hotelenterList) {
        if (that.hotelenterList[k].id == v) {
          return that.hotelenterList[k].enterName;
        }
      }
      return "";
    },
  },
};
</script>

<style lang="less" scoped>
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

.thisOrderInfo {
  background: #fff;
  padding-bottom: 30px;

  .wrap {
    padding: 0 20px;

    h3 {
      margin: 0;
      font-size: 15px;
      color: #333;
    }

    .cell {
      padding: 5px 0;
      font-size: 14px;
      color: #333;
    }
  }
}
.ex15_top {
  background-color: rgba(250, 250, 250, 1);
  padding-top: 20px;
  margin-bottom: 10px;
}
.ex9_top {
  padding: 15px;
  border-bottom: 1px solid rgba(226, 226, 226, 1);
  margin-bottom: 10px;
}
.hejiClass {
  color: black;
  font-size: 16px;
  font-weight: 500;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.ex_border {
  border-radius: 8px;

  border: 1px solid rgba(211, 211, 211, 1);
}
</style>
