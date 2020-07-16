<template>
    <div class="boss-index">
        <el-card shadow="never">
            <el-form ref="form" inline :model="form" label-width="80px" class="term line">
                <el-form-item label="日期：">
                    <el-select v-model="form.type" clearable placeholder="请选择">
                        <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submit">查询</el-button>
                </el-form-item>
                <div class="export">
                    <el-button type="primary" class="submit">导出</el-button>
                </div>
            </el-form>
            <el-table :data="tableData" size="small" border height="100%" header-row-class-name="default"
                default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                <el-table-column header-align="center" prop="code" label="科目编码" width="120"></el-table-column>
                <el-table-column header-align="center" prop="name" label="科目名称" width="180"></el-table-column>
                <el-table-column header-align="center" prop="direct" label="方向" width="180"></el-table-column>
                <el-table-column header-align="center" label="期初余额">
                    <el-table-column header-align="center" prop="province" label="借方" width="140"></el-table-column>
                    <el-table-column header-align="center" prop="city" label="贷方" width="140"></el-table-column>
                </el-table-column>
                <el-table-column header-align="center" label="本期发生额">
                    <el-table-column header-align="center" prop="province" label="借方" width="140"></el-table-column>
                    <el-table-column header-align="center" prop="city" label="贷方" width="140"></el-table-column>
                </el-table-column>
                <el-table-column header-align="center" label="本年累计发生额">
                    <el-table-column header-align="center" prop="province" label="借方" width="140"></el-table-column>
                    <el-table-column header-align="center" prop="city" label="贷方" width="140"></el-table-column>
                </el-table-column>
                <el-table-column header-align="center" label="期末余额">
                    <el-table-column header-align="center" prop="province" label="借方" width="140"></el-table-column>
                    <el-table-column header-align="center" prop="city" label="贷方" width="140"></el-table-column>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import {get_recharge_info, pay_weixinpc} from "@/utils/api/finance";

    export default {
        data() {
            return {
                form: {type: 1,},
                type: [{value: 1, label: '2020年第4期'}],
                tableData: [
                    {code: '1001', name: '库存现金', direct: '借',}
                ],
            };
        },
        methods: {
            /**初始化数据 */
            initData(balance) {
                this.editForm = {

                    balance: balance,
                    price: 0
                };
                this.visible = true;
            },
            /**新增/编辑 数据 */
            editFormSubmit() {

                get_recharge_info(this.editForm).then(res => {
                    if (res.code == 200) {
                        pay_weixinpc({id: res.data.id}).then(res1 => {
                            if (res1.code == 200) {
                                this.qcodeUrl = res1.data.weixin_url;
                                this.queryReqult(res.data.id);
                            } else {
                                this.$message.error(res1.message);
                            }
                        });
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            queryReqult(id) {
                quertPayInfo({id: id}).then(res => {
                    this.chargeStep = 3;
                });
            }
        }
    };
</script>

<style lang="less">
    .centerBox {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;

        img {
            width: 100px;
            height: 100px;
        }
    }
</style>
