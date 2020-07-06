<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-06 14:56:35
 * @FilePath: /jiudian/src/views/market/reception/reporting/c1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div class="documenList">
    <h3>前台报表</h3>
    <el-divider></el-divider>
    <ul>
        <li v-for="(item,index) of list" :key="index">
            <i class="el-icon-document-copy"></i>{{item.name}}
        </li>
    </ul>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            loading: false,
            list:[
                {
                    type:'',
                    name:'营业日报'
                },
                {
                    type:'',
                    name:'营业月报'
                },
                {
                    type:'',
                    name:'营业年报'
                },
                {
                    type:'',
                    name:'现金流明细表'
                },
                {
                    type:'',
                    name:'迷你吧销售报表'
                },
                {
                    type:'',
                    name:'结账汇总报表'
                },
                {
                    type:'',
                    name:'结账明细报表'
                },
                {
                    type:'',
                    name:'会员卡积分兑换报表'
                },
                {
                    type:'',
                    name:'单位挂账明细表'
                },
                {
                    type:'',
                    name:'单位挂账汇总表'
                },
                {
                    type:'',
                    name:'销售员业绩明细表'
                },
                {
                    type:'',
                    name:'销售员业绩汇总表'
                },
            ]
        };
    },

    mounted() {
        // this.initForm();
    },
    methods: {
        initForm() {
            this.searchForm = {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.searchForm.token = this.token
            this.searchForm.plat_source = this.plat_source
            this.searchForm.userId = this.userId
            console.log(JSON.stringify(this.searchForm))
            this.loading = true;
            enterprise_list(this.searchForm).then(res => {
                this.loading = false
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
            this.searchForm.page_num = val;
            this.searchForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.searchForm.page = val;
            this.getDataList();
        }
    }
};
</script>
<style scoped>
    .documenList ul li{padding:10px 0}
        .documenList ul li i{margin-right: 5px;}
</style>
