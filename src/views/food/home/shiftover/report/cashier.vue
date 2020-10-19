<template>
    <div class="reporPanel">
        <div class="reprot_head">
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                  <el-radio-group v-model="status" style="margin-bottom: 30px;">
                      <el-radio-button label="1">{{$t('commons.all')}}</el-radio-button>
                      <el-radio-button label="2">已结</el-radio-button>
                      <el-radio-button label="3">未结</el-radio-button>
                  </el-radio-group>
              </el-col>
              <el-col :span="3">
                  <el-button type="primary">返回本班</el-button>
              </el-col>
              <el-col :span="5">
                  <el-button type="primary">打印</el-button>
              </el-col>
              <el-col :span="6">
                  <el-button type="primary">关闭</el-button>
              </el-col>
            </el-row>
        </div>
        <div class="reprot_head">
            <el-row>
              <el-col class="text-center" :span="12">2020-07-13</el-col>
              <el-col class="text-center" :span="12">2020-07-14</el-col>
            </el-row>
        </div>

        <div class="reprot_head margin-t-20 margin-b-20">
            <el-row :gutter="5">
              <el-col class="text-center" :span="4">
                <span class="timePanel">中班（跨天）</span>
                <i class="l">17:55</i>
                <i class="r">10:55</i>
              </el-col>
              <el-col class="text-center" :span="3">
                  <span class="timePanel">早班</span>
              </el-col>
              <el-col class="text-center" :span="8">
                 <span class="timePanel">中班（跨天）</span>
                 <i class="l">15:55</i>
                 <i class="r">10:55</i>
              </el-col>
              <el-col class="text-center" :span="3">
                 <span class="timePanel">早班</span>
              </el-col>
              <el-col class="text-center" :span="3">
                 <span class="timePanel on">午班</span>
                 <i class="l">15:55</i>
                 <i class="r">17:55</i>
              </el-col>
              <el-col class="text-center" :span="3">
                 <span class="timePanel">晚班</span>
                 <i class="r">18:55</i>
              </el-col>
            </el-row>
        </div>

        <div class="reprot_head margin-t-20 margin-b-20 text-center">
            <b class="text-size16">交班基本信息（按班次）</b>
        </div>
        <div class="margin-b-20 text-center">
            <span>2020-07-14 18:55:58 至 2020-07-14 23:24:16</span>
            <span class="margin-lr-10">打印人：张三</span>
            <span>班次号：2020-07-14-6</span>
            <span class="margin-lr-10">营业日：2020-07-14</span>
            <span>打印时间：2020-07-14 16:24:32</span>
        </div>

        <el-row class="repotInfo">
            <el-col :span="12"><div class="item item_head"><b class="text-size16">消费名称</b></div></el-col>
            <el-col :span="12"><div class="item item_head"><b class="text-size16">发生金额</b></div></el-col>
            <el-col :span="12"><div class="item">餐饮费</div></el-col>
            <el-col :span="12"><div class="item text-blue">7435</div></el-col>
            <el-col :span="12"><div class="item ">消费合计</div></el-col>
            <el-col :span="12"><div class="item text-blue">550</div></el-col>
            <!--  -->
            <el-col :span="12"><div class="item item_head"><b class="text-size16">付款名称</b></div></el-col>
            <el-col :span="12"><div class="item item_head"><b class="text-size16">发生金额</b></div></el-col>
            <!-- 常规收退款 -->
            <el-col :span="24"><div class="item item_t"><b class="text-size14">常规收退款</b></div></el-col>
            <el-col :span="12"><div class="item ">现金</div></el-col>
            <el-col :span="12"><div class="item">0</div></el-col>
            <el-col :span="12"><div class="item ">支付宝</div></el-col>
            <el-col :span="12"><div class="item">1000</div></el-col>
            <el-col :span="12"><div class="item ">微信</div></el-col>
            <el-col :span="12"><div class="item">0</div></el-col>
            <el-col :span="24"><div class="item item_t"><b class="text-size14">其他收退款</b></div></el-col>
            <el-col :span="12"><div class="item">挂账</div></el-col>
            <el-col :span="12"><div class="item text-blue">1000</div></el-col>
            <el-col :span="12"><div class="item ">积分抵现</div></el-col>
            <el-col :span="12"><div class="item text-blue">1000</div></el-col>
            <el-col :span="12"> <div class="item ">结算到房间</div></el-col>
            <el-col :span="12"><div class="item text-blue">10000</div></el-col>
            <el-col :span="12"> <div class="item "><b>付款合计</b></div></el-col>
            <el-col :span="12"><div class="item text-blue">10000</div></el-col>
        </el-row>

        <el-row class="recordBottom margin-t-20">
            <el-col :span="24">
                <div class="item"><span class="text-size14">交班模式：现金流模式</span></div>
            </el-col>
            <el-col :span="8">
                <div class="item"><span class="text-size14">本班现金上交：-100.00</span></div>
            </el-col>
            <el-col :span="8">
                <div class="item"><span class="text-size14">本班微信上交：100.00</span></div>
            </el-col>
            <el-col :span="8">
                <div class="item"><span class="text-size14">本班支付宝上交：100.00</span></div>
            </el-col>
            <el-col :span="8">
                <div class="item"><span class="text-size14">上班留存备用金：-10000.00</span></div>
            </el-col>
            <el-col :span="8">
                <div class="item"><span class="text-size14">本班下放备用金：100.00</span></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {

    components:{},
    data() {
        return {
            status:1
        };
    },

    computed: {

    },
    mounted() {
    },
    methods: {


    }
};
</script>

<style scoped  lang="less" >
.reporPanel{
    padding-right: 20px;
    .text-size16{
        font-size: 16px;
    }
    .timePanel{
       position: relative;
       background-color: #B5B5B6;
       color: #fff;
       height: 36px;
       line-height: 36px;
       display: block;
    }

    .timePanel::before{
        content: '';
        display: block;
        border: 17px solid #B5B5B6;
        border-left-color: #fff;
        width: 0;
        height: 0;
        position: absolute;
        left: 0;
        top: 1px;
        z-index: 0;
    }

    .timePanel::after{
        content: '';
        display: block;
       /* border: 10px solid #B5B5B6;
        border-left-color: #f00; */
        background-color: #B5B5B6;
        width: 26px;
        height: 26px;
        transform: rotate(45deg);
        position: absolute;
        top: 5px;
        right:-12px;
        z-index: 500;
    }

    .timePanel.on{
        background: #126EFF;
    }

    .timePanel.on::before,{
         border: 17px solid #126EFF;
         border-left-color: #fff;
    }
    .timePanel.on::after,{
        background: #126EFF;
    }
    .el-col{
        position: relative;
    }
    .el-col .l,.el-col .r{
        position: absolute;
        font-style: normal;
        padding-top: 5px;
    }
    .el-col:first-child .l{
        left: 0;
    }
    .el-col .l{
        left: -20px;
    }
    .el-col .r{
        right: -20px;
    }
    .el-col:last-child .timePanel::after{
        right: -13px;
        top: 6px;
        width: 26px;
        height: 24px;
    }

    .repotInfo{
        border:1px solid #D5D5D5;
        border-right: none;
        border-bottom: none;
        .item{
            padding:10px 0 10px 10%;
            border-bottom: 1px solid #D5D5D5;
            border-right: 1px solid #D5D5D5;
        }
        .item_t{
            padding-left: 5%;
        }
        .item_head{
            background-color: #E9EDF3;
        }
    }
    .recordBottom{
        .item{
            padding:5px 0;

        }
    }

}

</style>
