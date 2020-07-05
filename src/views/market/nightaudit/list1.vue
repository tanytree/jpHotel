<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-05 12:17:16
 * @FilePath: /jiudian/src/views/market/nightaudit/list1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>建议夜审前处理以下业务</span>
            <el-button style="float: right; padding: 3px 0" type="text">夜审记录</el-button>
        </div>
        <el-row>
            <el-col :span="6">
                <div class="grid-content">
                    <el-badge value="99" class="item">
                        <el-button size="small" icon="el-icon-document" @click="setCurrentItem('second')">应到未到订单</el-button>
                    </el-badge>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-badge value="99" class="item">
                        <el-button size="small" icon="el-icon-document" @click="setCurrentItem('third')">应离未离订单</el-button>
                    </el-badge>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-badge value="99" class="item">
                        <el-button size="small" icon="el-icon-document" @click="setCurrentItem('four')">走结订单</el-button>
                    </el-badge>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content">
                    <el-badge value="99" class="item">
                        <el-button size="small" icon="el-icon-document" @click="setCurrentItem('five')">房价预审订单</el-button>
                    </el-badge>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <br />
        <el-row>
            <el-button type="primary">夜审</el-button>
        </el-row>

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
            loading: true,
            showEdit: false,
            showDetail: false,
            searchForm: {
                searchType: 1,
                content: '',
                enterStatus: '',
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "" //结束时间
            },
            listTotal: 0, //总条数
            multipleSelection: [], //多选
            tableData: [] //表格数据
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
        setCurrentItem(v){
            this.$emit('getCurrentItem',v)
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
.grid-content {text-align: center;border-right:1px solid #eee;padding: 80px 0;}
.grid-content >>> .el-button{
    border:0
}
.grid-content >>> .el-badge__content.is-fixed{
    left: -10px;
    right:inherit;
}
</style>
