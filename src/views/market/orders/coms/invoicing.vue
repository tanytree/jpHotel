<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-13 09:12:02
 * @FilePath: /jiudian/src/views/market/orders/index.vue
 -->

<template>
    <div id="page1" class="boss-index">
        <!--开发票-->
        <el-dialog top='0' title="开发票" :visible.sync="openInvoiceShow" width="900px">
            <el-form :model="openInvoiceForm" ref="openInvoice" :rules="rules" size="mini" label-width="130px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="消费金额：">
                            <el-input class="width150" type="text" v-model="openInvoiceForm.consumePrice"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="已开票金额：">
                            <el-input class="width150" type="text" v-model="openInvoiceForm.invoicePrice"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="付款公司名称：" prop="companyName">
                            <el-input class="width150" type="text" v-model="openInvoiceForm.companyName"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="项目：" prop="projectName">
                            <el-input class="width150" type="text" v-model="openInvoiceForm.projectName"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="金额：" prop="prices">
                            <el-input class="width150" type="text" v-model="openInvoiceForm.prices"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="日期：" prop="invoiceTime">
                            <el-date-picker style="width:150px" v-model="openInvoiceForm.invoiceTime" type="date"
                                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="备注：">
                            <el-input style="width:400px" type="textarea" v-model="openInvoiceForm.remark"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="openInvoiceShow = false">取消</el-button>
                <el-button type="primary" @click="openInvoiceSubmit('openInvoice')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['currentRoom', 'detailData'],
    data() {
        return {
            openInvoiceShow: false,
            openInvoiceForm: {}
        };
    },

    created() {
        this.$F.handleThirdMenu(this);
        let type = this.$route.query.type;
        if (type)
            this.activeName = type;
    },
    mounted() {
    },
    methods: {
        //开发票按钮点击
        init(checkInId) {
            this.openInvoiceForm.checkInId = checkInId;
            if (this.currentRoom) {
                this.openInvoiceForm.name = this.currentRoom.name
                this.openInvoiceForm.consumePrice = this.currentRoom.roomMarkPrice
                this.openInvoiceForm.invoicePrice = ''
                this.openInvoiceForm.roomNum =  this.currentRoom.houseNum
                this.openInvoiceForm.mobile = this.currentRoom.mobile
            } else if (this.detailData){
                if (this.detailData.inRoomList.length) {
                    this.openInvoiceForm.name = this.detailData.inRoomList[0].name
                    this.openInvoiceForm.consumePrice = this.detailData.inRoomList[0].roomMarkPrice
                    this.openInvoiceForm.invoicePrice = ''
                    this.openInvoiceForm.roomNum = this.detailData.inRoomList[0].houseNum
                    this.openInvoiceForm.mobile = this.detailData.inRoomList[0].mobile
                } else {
                    this.$message.error('暂无入住人');
                    return;
                }
            }
            this.openInvoiceShow = true
        },

        //开发票提交
        openInvoiceSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$F.doRequest(this, '/pms/invoice/open_invoice', this.openInvoiceForm, (res) => {
                        this.openInvoiceShow = false
                        this.$emit('consume_order_list');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
