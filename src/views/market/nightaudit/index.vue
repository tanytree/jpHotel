<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:11:55
 * @FilePath: /jiudian/src/views/market/nightaudit/index.vue
 -->

<template>
    <div id="page1" class="boss-index">
        <el-tabs class="pageTab" v-model="activeName">
            <el-tab-pane v-for="item in menuList" :label="$i18n.locale == 'ri' ? item.japanese : item.menuTitle"
                         :name="item.path"
                         :key="item.path"
                         v-if="$F.filterThirdMenu('frontOffice', item.path, true)">
                <!-- 首页-->
                <total v-if="item.path == 'total'" @getCurrentItem="getCurrentItem" :totalObject="totalObject"/>
                <!-- 应到未到订单-->
                <notyet :data="notyetData" v-if="item.path == 'notyet'"/>
                <!-- 应离未离订单-->
                <notleaving  :data="notLivingData" v-if="item.path == 'notleaving'" />
                <!-- 走结订单-->
<!--                <leave :data="leaveData"  v-if="item.path == 'leave'" />-->
                <!-- 房价预审订单-->
                <verify :data="verifyData"  v-if="item.path == 'verify' && verifyDataShow" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import total from "./total";
import notyet from "./notyet";
import notleaving from "./notleaving";
import leave from "./leave";
import verify from "./verify";

export default {
    components: {total, notyet, notleaving, leave, verify},
    data() {
        return {
            notyetData: {page: {count: 0}},
            notyetShow: false,
            notLivingData: {page: {count: 0}},
            notLivingDataShow: false,
            leaveData: {page: {count: 0}},
            leaveDataShow: false,
            verifyData: {page: {count: 0}},
            verifyDataShow: false,
            activeName: "",
            totalObject: {
                notyetCount: 0,
                notLivingCount: 0,
                leaveCount: 0,
                verifyCount: 0,
            }
        };
    },
    mounted() {
        // this.getNotyetDataList();
        // this.getNotLivingDataList();
        // this.getLeaveList();
        // this.getVerifyList();
    },
    created() {
        this.$F.handleThirdMenu(this);
    },

    methods: {
        /**获取应到未到订单 */
        getNotyetDataList() {
            this.$F.doRequest(
                this,
                "/pms/reserve/reserve_order_list",
                {
                    searchType: 1,
                    content: "",
                    enterStatus: "",
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    startTime: "", //考试时件
                    endTime: "", //结束时间
                },
                (res) => {
                    this.totalObject.notyetCount = res.page.count;
                    this.notyetShow = true;
                    this.notyetData = res;
                }
            );
        },

        /**获取应离未离订单 */
        getNotLivingDataList() {
            this.$F.doRequest(
                this,
                "/pms/checkin/checkin_order_list",
                {
                    mobile: "",
                    idcard: "",
                    name: "",
                    searchType: 2,
                    outType: 1,
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    paging: true,
                },
                (res) => {
                    this.totalObject.notLivingCount = res.page.count;
                    this.notLivingData = res;
                    this.notLivingDataShow = true;
                }
            );
        },

        /**获取走结订单 */
        getLeaveList() {
            this.$F.doRequest(
                this,
                '/pms/checkin/checkin_order_list',
                {
                    mobile: '',
                    idcard: '',
                    name: '',
                    searchType: 2,
                    outType: 4,
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    paging: true
                },
                (res) => {
                    this.totalObject.leaveCount = res.page.count;
                    this.leaveData = res;
                    this.leaveDataShow = true;
                }
            );
        },

        /**获取房屋预审订单*/
        getVerifyList() {
            this.$F.doRequest(this, '/pms/checkin/pretrial_order_list', {
                pageIndex: 1, //当前页
                pageSize: 100000, //页数
                pageing: false
            }, (res) => {
                this.totalObject.verifyCount = res.page ? res.page.count : res.roomPersonList.length;
                this.verifyData = res;
                this.verifyDataShow = true;
            })
        },

        getCurrentItem(v) {
            this.activeName = v
        },
        //二级tab切片
        handleClick(tab, event) {
            // console.log(tab.index);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
