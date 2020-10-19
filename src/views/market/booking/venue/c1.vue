<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: 董林
 * @LastEditTime: 2020-07-10 17:43:21
 * @FilePath: /jiudian/src/views/market/booking/venue/c1.vue
 -->

<template>
<!-- 统一的列表格式 -->
<div>
    <el-row>
        <h3>会议登记信息</h3>
        <el-form inline size="small" label-width="100px">
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="预订人：">
                            <el-input v-model="checkInForm.content"  class="width200"></el-input> &nbsp;&nbsp;
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="手机号码：">
                            <el-input v-model="checkInForm.content"  class="width200"></el-input> &nbsp;&nbsp;
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="订单来源：" prop="resource">
                            <el-select v-model="checkInForm.enterStatus"  class="width200">
                                <el-option :label="$t('commons.all')" value="3"></el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="销售员：">
                            <el-select v-model="checkInForm.enterStatus"  class="width200">
                                <el-option :label="$t('commons.all')" value="3"></el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="到店时间：">
                            <el-date-picker v-model="checkInForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="预离时间：">
                            <el-date-picker v-model="checkInForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="会议名称：">
                            <el-input v-model="checkInForm.content" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="单位名称：">
                            <el-input v-model="checkInForm.content" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="客源类型：" prop="resource">
                            <el-input type="input" v-model="checkInForm.content" class="width200">
                                <template slot="append">…</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="保留时间：">
                            <el-date-picker v-model="checkInForm.startTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-form-item label="订单备注：">
                            <el-input v-model="checkInForm.content" class="width200"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
        </el-form>
    </el-row>
    <el-row style="margin-bottom:60px">
        <h3>房间信息</h3>
        <el-form inline size="mini">
            <el-row>
                <el-col :span="17">
                    <div class="grid-content">
                        <el-row>
                            <el-button>可改房价</el-button>&nbsp;&nbsp;
                            <el-select v-model="checkInForm.enterStatus" placeholder="床位数">
                                <el-option :label="$t('commons.all')" value="3"></el-option>
                                <el-option label="已认证" value="1">已认证</el-option>
                                <el-option label="未认证" value="2">未认证</el-option>
                            </el-select>
                        </el-row>
                        <br />
                        <el-row>
                            <el-col :span="8" v-for="v in 20" :key="v">
                                <div class="grid-content rooms">
                                    <div class="grid-cell">
                                        <div class="wrap">
                                            <el-row class="row">
                                                <el-col :span="14">
                                                    <span>标准间</span>
                                                </el-col>
                                                <el-col :span="10">
                                                    <div style="text-align: right">
                                                        <el-input-number @change="handleChange" :min="1" :max="10" label="" size="mini" style="width:100px"></el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="row">
                                                <el-col :span="14">
                                                    <el-button type="text" size="mini">可订12</el-button>
                                                </el-col>
                                                <el-col :span="10">
                                                    <div style="text-align: right">
                                                        <el-input placeholder="" size="mini" style="width:60px"></el-input><em>666</em>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>

                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content">
                        <el-row>
                            <el-button>自动排房</el-button>&nbsp;&nbsp;
                            <el-button>制卡</el-button>&nbsp;&nbsp;
                        </el-row>
                        <br />
                        <el-row class="roomSelect">
                            <ul>
                                <li v-for="v in 10" :key="v">
                                    <div class="grid-content rooms">
                                        <div class="grid-cell">
                                            <div class="wrap">
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <span>标准间</span>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">
                                                            <el-button type="primary" size="mini">排房</el-button>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row class="row">
                                                    <el-button size="mini">A101</el-button>
                                                </el-row>
                                                <el-row class="row">
                                                    <el-col :span="14">
                                                        <el-button type="text" size="mini">可订12</el-button>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <div style="text-align: right">
                                                            <el-input-number @change="handleChange" :min="1" :max="10" label="" size="mini" style="width:100px"></el-input-number>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </el-row>

                    </div>
                </el-col>
            </el-row>
        </el-form>
    </el-row>
    <!-- 编辑or详情弹窗 -->
    <el-row class="fixedFoot">
        <div class="wrap">
            <el-button type="primary">保存</el-button>
            <el-button>保存后继续办理新入住</el-button>
        </div>
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
            loading: false,
            showEdit: false,
            showDetail: false,
            checkInForm: {
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
            tableData: [{}] //表格数据
        };
    },

    mounted() {
        // this.initForm();
    },
    methods: {
        initForm() {
            this.checkInForm = {
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
            this.checkInForm.token = this.token
            this.checkInForm.plat_source = this.plat_source
            this.checkInForm.userId = this.userId
            console.log(JSON.stringify(this.checkInForm))
            this.loading = true;
            enterprise_list(this.checkInForm).then(res => {
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
            this.checkInForm.page_num = val;
            this.checkInForm.page = 1;
            this.getDataList();
        },
        /**当前页 */
        handleCurrentChange(val) {
            this.checkInForm.page = val;
            this.getDataList();
        },
        handleChange() {

        }

    }
};
</script>

<style scoped>
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
    padding: 10px 20px
}

.fixedFoot .wrap button {
    margin-left: 20px;
}

.rooms {
    margin-right: 10px;
    margin-bottom: 10px;
}

.rooms .grid-cell {
    border: 1px solid #eee;
    border-radius: 5px;
}

.rooms .grid-cell:active {
    background: #E3EEFF;
    border-color: #126EFF;
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
    background: #F6F7F7;
}

.roomSelect ul li .rooms {
    margin: 0
}

.roomSelect ul li .rooms .grid-cell {
    border: 0
}

.roomSelect ul {
    padding: 0 20px
}

.roomSelect ul li {
    border-bottom: 1px solid #D7D7D7;
    padding: 10px 0;
}

.roomSelect ul li:last-child {
    border-bottom: 0;
}
</style>
