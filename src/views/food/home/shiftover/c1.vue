<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 18:03:15
 * @FilePath: /jiudian/src/views/market/reception/shiftover/c1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div class="shiftOver" v-loading="loading">
    <el-row>
        <h3>预交班基本信息</h3>
        <el-row>
            <el-col :span="12">
                <div class="item">班次时间：2020/04/20 06:01:03 至 2020/04/20 16:10:00</div>
            </el-col>
            <el-col :span="12">
                <div class="item">班次号：2020-04-20-1</div>
            </el-col>
            <el-col :span="12">
                <div class="item">交班操作员：张三</div>
            </el-col>
            <el-col :span="12">
                <div class="item">当前模式：应收模式</div>
            </el-col>
        </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <h3>本班账务汇总信息</h3>
        <div class="total">收入总计：10000.00日元</div>
        <el-row>
            <el-col :span="6">
                <div class="item">餐饮费：<span class="red">8000.00</span>日元</div>
            </el-col>
        </el-row>
        <div class="total">结算总计：6000.00日元</div>
        <el-row>

            <el-col :span="4">
                <div class="item">现金：<span class="blue">8000.00</span>日元</div>
            </el-col>
            <el-col :span="4">
                <div class="item">微信：<span class="blue">8000.00</span>日元</div>
            </el-col>
            <el-col :span="4">
                <div class="item">支付宝：<span class="blue">8000.00</span>日元</div>
            </el-col>
            <el-col :span="4">
                <div class="item">其它：<span class="blue">8000.00</span>日元</div>
            </el-col>
        </el-row>
    </el-row>
    <el-row>
        <h3>本班现金上交&nbsp;&nbsp;<el-tag size="mini">当前交班模式：现金流模式</el-tag></h3>
        <div class="handInCash">
            <el-row>
                <el-col :span="6" class="li">
                    <div class="item">本班现金上交：-100.00</div>
                    <div class="item">本班现金留存：-10000.00</div>
                </el-col>
                <el-col :span="6" class="li">
                    <div class="item">本班微信上交：100.00</div>
                    <div class="item">本班下方备用金：100.00</div>
                </el-col>
                <el-col :span="6" class="li">
                    <div class="item">本班支付宝上交：100.00</div>
                </el-col>
            </el-row>
            <el-row class="ftRow">本班走结订单金额：6000.00</el-row>
        </div>
    </el-row>
    <el-row>
        <h3>本班报表</h3>
        <el-row>
            <el-col :span="4">
                <div class="item">交班报表(按班次)&nbsp; &nbsp;<el-button size="mini" @click="openReport(1)">预览</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="item">交班报表(按收银员)&nbsp; &nbsp;<el-button size="mini" @click="openReport(2)">预览</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="item">消费明细表&nbsp; &nbsp;<el-button size="mini" @click="openReport(3)">预览</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="item">收款明细表&nbsp; &nbsp;<el-button size="mini" @click="openReport(4)">预览</el-button>
                </div>
            </el-col>
        </el-row>
    </el-row>
    <el-divider></el-divider>
    <el-row style="text-align:center">
        <elForm inline size="small">
            <el-form-item label="请选择接班员工：">
                <el-select v-model="form.text">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="不正常" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接班员工密码：">
                <el-input v-model="form.password" placeholder="接班员工密码"></el-input>
            </el-form-item>

            <el-form-item label="">
                <el-button type="primary">确认</el-button>
            </el-form-item>
        </elForm>
    </el-row>

    <el-dialog
        top="0"
        width="60%"
        :title="$t('food.reportType.'+ reportType)"
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
    >
        <classes v-if="reportType == 1" />
        <cashier v-if="reportType == 2" />
        <consume v-if="reportType == 3" />
        <collections v-if="reportType == 4" />
    </el-dialog>




</div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import classes from "./report/classes.vue"; //交班报表(按班次)
import cashier from "./report/cashier.vue";//交班报表(按收银员）
import consume from "./report/consume.vue"; //消费明细表
import collections from "./report/collections.vue"; //收款明细表
import mixin from '../../mixin.js';
export default {
	mixins: [mixin],

    components:{classes,cashier,consume,collections},
    data() {
        return {
            loading: true,
            form: {
                text: '',
                password:''
            },
            reportType:1,
            dialogShow:false,
			info:{}

        };
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },

    mounted() {
        this.getList();
    },
    methods: {
        getList(){
			this.loading = false
			let params = {}
			params.userId = this.userId
			params.storesNum = this.storesNum
			// this.$F.doRequest(this, "/pms/dishes/handover/handover_base_info", params, (res) => {
			//    console.log(res)
			//     this.loading = false
			// 	this.info = res
			// });


        },
        openReport(v){
           this.reportType = v
           this.dialogShow = true
        }
    }
};
</script>

<style scoped>
.shiftOver h3{font-size:16px}
.shiftOver .red{color:red}
.shiftOver .blue{color: #126EFF;}
.shiftOver .total{background: #F7F7F7;color:#333;padding: 10px 10px;}
.shiftOver .item {
    font-size: 14px;padding: 10px 0;
}
.shiftOver .handInCash{border:1px solid #eee}
.shiftOver .handInCash .li{border-right: 1px solid #eee;padding: 0 10px;}
.shiftOver .handInCash .li:last-child{border:0}
.shiftOver .handInCash .ftRow{background: #F6F7F7;color: #333;padding: 10px 10px;}


</style>
