<template>
    <div class="boss-index sec1">
        <div class="form">
            <el-radio-group v-model="mealTime" class="mealTime" size="medium" @change="mealChange">
                <el-radio-button :label="0" >{{$t('desk.home_noLimit')}}</el-radio-button>
                <el-radio-button :label="1">{{$t('manager.hk_breakfast')}}</el-radio-button>
                <el-radio-button :label="2">{{$t('manager.hk_dinner')}}</el-radio-button>
            </el-radio-group>
            <el-button size="medium" type="primary" class="submit" icon="el-icon-plus" @click="addMeal">{{$t('desk.customer_newAdd')}}</el-button>
        </div>
        <div class="components-edit">
            <el-table ref="multipleTable" :data="list" height="100%" header-row-class-name="default" size="small" >
                <el-table-column prop="mealName" :label="$t('manager.add_packageName')"></el-table-column>
                <el-table-column prop="mealTime" :label="$t('manager.add_packageType')" align="center" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.mealTime == 1">{{$t('manager.hk_breakfast')}}</span>
                        <span v-if="scope.row.mealTime == 2">{{$t('manager.hk_dinner')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mealPrice" :label="$t('manager.add_packagePri')" align="center" width="150"></el-table-column>
                <el-table-column :label="$t('boss.loginDetail_state')" align="center" width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.state == 2 ? $t('commons.disable') : $t('commons.enable')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" :label="$t('desk.home_note')" align="center" width="250"></el-table-column>
                <el-table-column :label="$t('commons.operating')" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('bin', scope.row)">{{scope.row.state == 1 ? $t('commons.disable') : $t('commons.enable')}}</el-button>
                        <el-button type="text" size="small" :disabled="scope.row.status == 2" @click="popup('change', scope.row)">{{$t('commons.modify')}}</el-button>
                        <el-popconfirm v-if="scope.row.status == 1" :title="$t('manager.grsl_sureDelete')+'？'" icon="el-icon-warning-outline" iconColor="#FF8C00" @confirm="handleDelete(scope.row)">
                            <el-button slot="reference" type="text">{{$t('commons.delete')}}</el-button>
                        </el-popconfirm>
                        <el-button v-if="scope.row.status == 2" type="text" size="small" disabled>{{$t('manager.grsl_hasFailure')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination @current-change="currentChange" :current-page="pageForm.pageIndex" :page-size="pageForm.pageSize" :total="total" layout="total, prev, pager, next, jumper"></el-pagination>
        </div>

        <el-dialog :title="mealTitle" :visible.sync="mealVisible" top="0" width="600px" :close-on-click-modal="false">
            <el-form label-position="right" label-width="100px" size="medium" :rules="rules" :model="meal">
                <el-form-item :label="$t('manager.add_packageName')+':'" prop="mealName">
                    <el-input v-model="meal.mealName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.add_unitPrice')+':'" prop="mealPrice">
                    <el-input v-model="meal.mealPrice"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.grsl_costNoPrice')+':'" prop="costPrice">
                    <el-input v-model="meal.costPrice"></el-input>
                </el-form-item>
                <el-form-item :label="$t('manager.add_packageType')+':'" prop="mealTime">
                    <el-radio-group v-model="meal.mealTime">
                        <el-radio :label="1">{{$t('manager.hk_breakfast')}}</el-radio>
                        <el-radio :label="2">{{$t('manager.hk_dinner')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!--<el-form-item :label="$t('boss.loginDetail_state')+ '：'">
                    <el-radio-group v-model="meal.ctype">
                        <el-radio :label="1">{{$t('commons.enable')}}</el-radio>
                        <el-radio :label="2">{{$t('commons.disable')}}</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item :label="$t('desk.home_note') + '：'">
                    <el-input type="textarea" :rows="4" resize="none" v-model="meal.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" class="blueBtn mini" @click="submit">{{$t('commons.confirm')}}</el-button>
                <el-button class="defaultBtn mini" @click="mealVisible = false">{{$t('commons.cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                pageForm: {
                    pageIndex: 1,
                    pageSize: 10,
                    paging: true
                },
                mealTime: 0, list: [], total: 0,
                mealTitle: this.$t('desk.customer_newAdd'), mealVisible: false,
                meal: {mealName: '', mealPrice: '', costPrice: '', mealTime: 1, remark: ''},
                rules: {
                    mealName: [{ required: true, message: this.$t('manager.add_inputPackageName'), trigger: 'blur' }],
                    mealPrice: [{ required: true, message: this.$t('manager.add_inputPackagePrice'), trigger: 'blur' }],
                    mealTime: [{ required: true, message: this.$t('manager.add_inputPackageType'), trigger: 'change' }]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getMealList(this.pageForm)
            },
            getMealList(page, mealTime, state) {
                const params = {
                    mealName: '',
                    mealTime: mealTime == 0 ? '': mealTime,
                    state: state,
                }
                this.$F.merge(params, page);
                this.$F.doRequest(this, "/pms/hotelattachmeal/list", params, (res) => {
                    this.list = res.list;
                    if (res.page) {
                        this.total = res.page.count;
                    }
                });
            },
            mealChange(val) {
                this.getMealList(this.pageForm, val);
            },
            currentChange(val) {
                this.pageForm.pageIndex = val;
                this.getMealList(this.pageForm, this.mealTime);
            },
            addMeal() {
                this.meal = {mealName: '', mealPrice: '', costPrice: '', mealTime: 1, remark: ''};
                this.mealVisible = true;
            },
            popup(type, row) {
                if(type == 'bin'){
                    this.$F.doRequest(this, "/pms/hotelattachmeal/delete", {
                        id: row.id,
                        ctype: 2,
                    }, (res) => {
                        this.getMealList(this.pageForm, this.mealTime);
                    });
                } else if(type == 'change') {
                    this.meal = {id: row.id, mealName: row.mealName, mealPrice: row.mealPrice, costPrice: row.costPrice, mealTime: row.mealTime, remark: row.remark};
                    this.mealVisible = true;
                }
            },
            handleDelete(row) {
                this.$F.doRequest(this, "/pms/hotelattachmeal/delete", {
                    id: row.id,
                    ctype: 1,
                }, (res) => {
                    this.getMealList(this.pageForm, this.mealTime);
                });
            },
            submit() {
                const params = {
                    id: this.meal.id,
                    mealName: this.meal.mealName,
                    mealPrice: this.meal.mealPrice,
                    costPrice: this.meal.costPrice,
                    mealTime: this.meal.mealTime,
                    remark: this.meal.remark
                }
                this.$F.doRequest(this, "/pms/hotelattachmeal/edit", params, (res) => {
                    this.getMealList(this.pageForm, this.mealTime);
                    this.mealVisible = false;
                });
            }
        }
    }
</script>

<style lang="scss">
    .sec1 {
        padding: 10px;
        .form {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .mealTime {
                .el-radio-button__orig-radio:checked+.el-radio-button__inner {
                    background: #fff;
                    border: 1px solid #126EFF;
                    color: #126EFF;
                    box-shadow: none;
                }
                .el-radio-button__inner {
                    background: #fff;
                    border: 1px solid #d6d6d6;
                    color: #333;
                    border-radius: 4px;
                }
                .el-radio-button + .el-radio-button {
                    margin-left: 12px;
                }
            }
        }
    }
</style>
