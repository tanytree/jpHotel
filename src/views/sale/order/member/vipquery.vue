<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 魏轩
 * @LastEditTime: 
 * @FilePath: 
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-card>
        <!-- 查询部分 -->
        <el-form inline size="small">
            <el-form-item label="开卡门店">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发展途径">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会员类型">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="已认证" value="1">已认证</el-option>
                    <el-option label="未认证" value="2">未认证</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <br />
            <el-form-item label="卡号">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.content"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="挂失" value="2"></el-option>
                    <el-option label="停用" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="黑名单">
                <el-select v-model="searchForm.enterStatus">
                    <el-option label="全部" value="3">全部</el-option>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDataList">查询</el-button>
                <el-button type="primary" @click="initForm">重置</el-button>
            </el-form-item>
            <el-row>
                <el-form-item>
                    <el-button plain>读会员卡</el-button>
                    <el-button type="primary">新增会员</el-button>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item>
                    <el-button type="text">开卡总数：999</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="卡号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column label="会员类型" show-overflow-tooltip>
                <!-- <template slot-scope="{row}">
                {{row.tradeLevelOne}} - {{row.tradeLevelTwo}}
            </template> -->
            </el-table-column>
            <el-table-column prop="enterType" label="手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="剩余积分" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="可用额度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="消费次数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="累计实付" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="开卡门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="发展途径" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="开卡日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="是否黑名单" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">详情</el-button>
                    <el-button type="text" size="mini">修改</el-button>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>收卡费</el-dropdown-item>
                            <el-dropdown-item>拉黑</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <!--分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.page" :page-sizes="[10, 50, 100, 200]" :page-size="searchForm.page_num" layout=" sizes, prev, pager, next, jumper" :total="listTotal"></el-pagination>
    </el-card>
    <!-- 编辑or详情弹窗 -->
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
            tableData: [
                {}
            ] //表格数据
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
