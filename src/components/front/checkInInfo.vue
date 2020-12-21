<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-11 17:37:38
 * @FilePath: \jiudian\src\components\front\customer.vue
 -->
<template>
<div>
    <div class="item-info" v-if="showOrderInfo">
        <div class="public">
            <div class="itemDetail">
                <el-row>
                    <el-col :span="6">{{$t('desk.order_bookOrderNum') + ': ' + (orderInfo.reserveOrderNum || '')}}</el-col>
                    <el-col :span="6" :offset="1">
                        <span>{{ $t('desk.book_orderSoutce') + ': ' + $t('commons.orderSource')[orderInfo.orderSource + ''] }}</span>
<!--                        <span v-if="orderInfo.orderSource == 5"></span>-->
                    </el-col>
                    <el-col :span="6" :offset="1">{{ $t('desk.order_outOrder') + ': ' + (orderInfo.thirdOrdernum || '') }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"> {{$t('desk.customer_region') + ': ' + (orderInfo.region || '')}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">{{$t('desk.order_checkinDate') + ': ' + orderInfo.checkinTime}}</el-col>
                    <el-col :span="6">{{$t('desk.order_departureTime') + ': ' + orderInfo.checkoutTime}}</el-col>
                    <el-col :span="6">{{$t('desk.checkInDays') + ': ' + (orderInfo.checkinDays || '')}}</el-col>
                </el-row>
            </div>
        </div>
        <div class="public otherStyle">
            <div class="infoTitle">预约内容/住宿plan：</div>
            <div class="itemDetail">
                <el-row>
                    <el-col :span="6">消费合计：80000</el-col>
                    <el-col :span="6" :offset="1">付款合计：9000</el-col>
                </el-row>
                <el-row>
                    <el-col :span="18"
                    >付款方式：现金（2000）；信用卡（4000）；挂账（1000）；其他（2000））</el-col
                    >
                </el-row>
                <el-row>
                    <el-col :span="6">{{ `${$t('desk.reservePersonDesc')}: ${orderInfo.name}【${orderInfo.pronunciation}】` }}</el-col>
                    <el-col :span="8" :offset="1">预约人电话：（手）{{ orderInfo.mobile || orderInfo.homeMobile }}</el-col>
                </el-row>
            </div>
        </div>
    </div>

    <!--表格数据 -->
    <el-table :data="checkInPersonList" header-row-class-name="default" border style="width: 100%" :span-method="arraySpanMethod">
        <el-table-column prop="name" label="入住人/单位名称/团队名">
            <template slot-scope="{ row, $index }">
                <div v-if="$index < 3">{{ row.name }}</div>
                <div v-if="$index == 3">备注</div>
                <div v-if="$index == 4">留言</div>
            </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
            <template slot-scope="{ row, $index }">
                <div v-if="$index < 3">{{ row.id }}</div>
                <div v-if="$index == 3"></div>
                <div v-if="$index == 4" class="messageBox">
                    <div v-if="!inputMessage">{{ row.remark }}</div>
                    <el-input v-model="row.remark" v-if="inputMessage" placeholder="请输入内容">{{ row.remark }}</el-input>
                    <el-button type="text" @click="resetMessage(inputMessage)">{{ inputMessage ? "保存" : "修改" }}</el-button>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="性别" align="center" width="120"></el-table-column>
        <el-table-column label="客源类型" prop="amount1" align="center">
        </el-table-column><el-table-column align="center" prop="amount2" label="会员号码/单位号码"></el-table-column>
        <el-table-column prop="amount2" label="同来宾客" align="center">
            <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
            <el-table-column prop="amount3" label="性别" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="类型" width="100" align="center"></el-table-column>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import myMixin from '@/utils/filterMixin';
export default {
    mixins: [myMixin],
    props: ['checkInPersonList', 'currentRoom', 'showOrderInfo', 'orderInfo'],
    data() {
        return {
        };
    },

    methods: {
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
    }
};
</script>

<style scoped>

</style>
