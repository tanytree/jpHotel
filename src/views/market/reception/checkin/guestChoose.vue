<!--
 * @Date: 2020-05-08 08:01:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-26 17:59:04
 * @FilePath: \jiudian\src\views\market\reception\checkin\guestChoose.vue
 -->

<template>
    <div class="boss-index inRoom" v-if="guestTypeShow">
        <el-dialog top="0" :visible.sync="guestTypeShow" class="guestTypeDia" :title="$t('desk.order_sourceType')" width="40%">
            <el-form :model="checkInForm" ref="checkInForm" style="margin-top: -20px" :rules="checkRules"
                     label-width="150px">
                <el-form-item :label="$t('desk.customer_guestType') + ':'" class="" style="margin-bottom: 0">
                    <el-radio-group v-model="checkInForm.guestType" @change="guestTypeChange">
                        <el-radio v-for="(item, key, index) of $t('commons.guestType')" :label="key" :key="index">{{ item }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" class="" style="margin-bottom: 0" label-width="0" v-if="checkInForm.guestType == 2 ">
                    <el-autocomplete
                        v-model="checkInForm.name"
                        name="name"
                        :fetch-suggestions="remoteMethodGuest"
                        :highlight-first-item="true"
                        popper-class="popper-class"
                        :trigger-on-focus="false"
                        :placeholder="$t('desk.book_inputContent')"
                        @select="changeNameGuest($event)"
                    ></el-autocomplete>
                </el-form-item>
                <!-- 当客人类型为团队时 -->
                <div v-if="checkInForm.guestType == 4">
                    <el-row>
                        <el-col :span="14">
                            <el-form-item :label="$t('desk.book_teamName')+':'" prop="teamName">
<!--                                <el-input v-model="checkInForm.teamName" :placeholder="$t('desk.book_teamName')" style="width:160px" size="small"></el-input>-->
                                <el-autocomplete
                                    v-model="checkInForm.teamName"
                                    name="name"
                                    :fetch-suggestions="remoteMethodGuest"
                                    :highlight-first-item="true"
                                    popper-class="popper-class"
                                    :trigger-on-focus="false"
                                    :placeholder="$t('desk.book_teamName')"
                                    @select="changeNameGuest($event)"
                                ></el-autocomplete>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label-width="0" prop="teamPronunciation">
                                <el-input v-model="checkInForm.teamPronunciation" :placeholder="$t('desk.customer_faying')" style="width:160px;margin-left:5px;" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item :label="$t('desk.book_guideName')+':'">
                        <el-input v-model="checkInForm.guideName" :placeholder="$t('desk.book_guideName')"
                                  style="width:160px" size="small"></el-input>
                        <el-input v-model="checkInForm.guidePronunciation" :placeholder="$t('desk.customer_faying')"
                                  style="width:160px;margin-left:10px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_leaderName')+':'">
                        <el-input v-model="checkInForm.leaderName" :placeholder="$t('desk.book_leaderName')"
                                  style="width:160px" size="small"></el-input>
                        <el-input v-model="checkInForm.leaderPronunciation" :placeholder="$t('desk.customer_faying')"
                                  style="width:160px;margin-left:10px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_teamMoible')+':'">
                        <el-input v-model="checkInForm.teamMobile" :placeholder="$t('desk.book_teamMoible')"
                                  style="width:330px" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_teamAddress')+':'">
                        <el-input v-model="checkInForm.teamAdd1" minlength='3' maxlength='3'
                                  @blur="checkNextcode(checkInForm.teamAdd1)" style="width:75px"
                                  size="small"></el-input>
                        <span style="margin:0 5px">-</span>
                        <el-input v-model="checkInForm.teamAdd2" minlength='4' maxlength='4'
                                  @blur="checkAddress(checkInForm.teamAdd1,checkInForm.teamAdd2,'team')"
                                  style="width:75px;" size="small"></el-input>
                        <el-input v-model="checkInForm.teamAdd3" :placeholder="$t('desk.customer_zipcodeTo')"
                                  style="width:160px;margin-left:5px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactName')+':'">
                        <el-input v-model="checkInForm.contactName" :placeholder="$t('desk.book_contactName')"
                                  style="width:160px" size="small"></el-input>
                        <el-input v-model="checkInForm.contactPinyin" :placeholder="$t('desk.customer_faying')"
                                  style="width:160px;margin-left:10px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactPhone')+':'">
                        <el-input v-model="checkInForm.contactPhone" :placeholder="$t('desk.book_contactPhone')"
                                  style="width:330px" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactEmail')+':'">
                        <el-input v-model="checkInForm.contactEmail" :placeholder="$t('desk.book_contactEmail')"
                                  style="width:330px" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_travelName')+':'">
                        <el-input v-model="checkInForm.travelTeam" :placeholder="$t('desk.book_travelName')"
                                  style="width:160px" size="small"></el-input>
                        <el-input v-model="checkInForm.travelPronunciation" :placeholder="$t('desk.customer_faying')"
                                  style="width:160px;margin-left:10px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_travelAddress')+':'">
                        <el-input v-model="checkInForm.travelAdd1" minlength='3' maxlength='3'
                                  @blur="checkNextcode(checkInForm.travelAdd1)" style="width:75px"
                                  size="small"></el-input>
                        <span style="margin:0 5px">-</span>
                        <el-input v-model="checkInForm.travelAdd2" minlength='4' maxlength='4' style="width:75px;"
                                  @blur="checkAddress(checkInForm.travelAdd1,checkInForm.travelAdd2,'travel')"
                                  size="small"></el-input>
                        <el-input v-model="checkInForm.travelAdd3" :placeholder="$t('desk.customer_zipcodeTo')"
                                  style="width:160px;margin-left:5px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactName')+':'">
                        <el-input v-model="checkInForm.travelContactName" :placeholder="$t('desk.book_contactName')"
                                  style="width:160px" size="small"></el-input>
                        <el-input v-model="checkInForm.travelContactPinyin" :placeholder="$t('desk.customer_faying')"
                                  style="width:160px;margin-left:10px;" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactPhone')+':'">
                        <el-input v-model="checkInForm.travelContactPhone" :placeholder="$t('desk.book_contactPhone')"
                                  style="width:330px" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_contactEmail')+':'">
                        <el-input v-model="checkInForm.tarvelContactEmail" :placeholder="$t('desk.book_contactEmail')"
                                  style="width:330px" size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('desk.book_orderSoutce')" prop="orderSource" v-if="checkInForm.changeGuest">
                        <el-select v-model="checkInForm.orderSource" style="width:330px">
                            <el-option :value="key" v-for="(item, key, index) of $t('commons.orderSource')" :label="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="OTA" prop="orderSource" v-if="checkInForm.orderSource == 5" >
                        <el-select  v-model="checkInForm.otaChannelId"  style="width:330px">
                            <el-option :value="item.id" v-for="(item, index) of otaList" :label="item.otaName" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>

            <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="guestTypeShow = false">{{ $t("commons.cancel") }}</el-button>
        <el-button size="small" type="primary" @click="submit('checkInForm')">{{ $t("commons.confirm") }}</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {},
    // props: ['checkInForm'],
    data() {
        return {
            otaList: [],
            oldName: '',
            checkInForm: {},
            guestTypeShow: false,
        };
    },
    computed: {
        checkRules() {
            return {
                teamName: [
                    {required: true, message: this.$t('desk.book_inputTeamName'), trigger: 'blur'},
                ],
                teamPronunciation: [
                    {required: true, message: this.$t('desk.book_inputFayin'), trigger: 'blur'},
                ],
            }
        }
    },
    mounted() {
        this.$F.commons.fetchOtaList({}, (list)=> {
            this.otaList = list;
            this.$forceUpdate();
        })
    },
    methods: {
        checkNextcode(code1) {
            if (!code1 || code1.length !== 3) {
                this.$message({
                    message: this.$t('desk.customer_sureZipcode'),
                    type: 'warning'
                })
            }
        },
        // 输入邮编检索地址
        checkAddress(code1, code2, type) {
            if (code1 && code2) {
                if (code1.length == 3 && code2.length == 4) {
                    this.$F.commons.zipCode(code1, code2, res => {
                        if (res.results.length > 0) {
                            if (type == 'team') {
                                let addA = res.results[0].address1 + res.results[0].address2 + res.results[0].address3;
                                this.$set(this.checkInForm, 'teamAdd3', addA)
                            } else {
                                let addB = res.results[0].address1 + res.results[0].address2 + res.results[0].address3;
                                this.$set(this.checkInForm, "travelAdd3", addB)
                            }
                        }
                    })
                } else {
                    this.$message({
                        message: this.$t('desk.customer_sureZipcode'),
                        type: 'warning'
                    })
                }
            } else {
                this.$message({
                    message: this.$t('desk.customer_sureZipcode'),
                    type: 'warning'
                })
            }
        },

        guestTypeChange() {
            this.checkInForm.name = "";
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.checkInForm.name)
                        this.checkInForm.name = this.oldName;
                    if (this.checkInForm.guestType == 2) {
                        if (this.checkInForm.memberCard) {
                            this.$emit("guestChooseCallback", this.checkInForm);
                        }
                    } else {
                        if (this.checkInForm.guestType == 1) {
                            this.checkInForm.memberCard = "";
                            this.checkInForm.enterId = "";
                        }
                        this.$emit("guestChooseCallback", this.checkInForm);
                    }
                    this.guestTypeShow = false;
                } else {
                    return false;
                }
            });
        },

        dialogOpen(data) {
            this.checkInForm = this.$F.deepClone(data);
            this.oldName = this.checkInForm.name;
            // checkInForm.name = '';
            this.guestTypeShow = true;
        },

        remoteMethodGuest(query, cb) {
            let params = {
                pageIndex: 1,
                pageSize: 999,
                paging: false,
                // state: 1,
                status: 1,
                isBlacklist: 1,
                storesNum: "",
            };
            //会员
            if (this.checkInForm.guestType == 2) {
                this.$F.merge(params, {
                    name: query,
                });
                this.$F.doRequest(this, "/pms/hotelmember/list", params, (res) => {
                    this.options = res.list || [];
                    this.options.forEach((element) => {
                        element.value =
                            element.name +
                            "+" +
                            (element.mobile || "") +
                            "+" +
                            (element.memberCard || "");
                    });
                    cb(this.options);
                    this.$forceUpdate();
                });
            } else if (this.checkInForm.guestType == 4) {
                //团体
                params = {
                    pageIndex: 1,
                    pageSize: 999,
                    paging: false,
                    storesNum: "",
                };
                this.$F.merge(params, {
                    enterName: query,
                });
                this.$F.doRequest(this, "/pms/reserve/reserve_order_list", params, (res) => {
                    this.options = res.resreveList || [];
                    this.options.forEach((element) => {
                        element.value =
                            element.teamName +
                            "+" +
                            (element.teamMobile || element.contactPhone) +
                            "+" +
                            (element.contractNum || "");
                    });
                    cb(this.options);
                    this.$forceUpdate();
                });
            }
        },

        changeNameGuest(e) {
            debugger
            if (e.name || e.enterName) {
                if (this.checkInForm.guestType == 2) {
                    this.checkInForm.name = e.name;
                    this.checkInForm.idcard = e.idcard;
                    this.checkInForm.memberCard = e.memberCard;
                    this.checkInForm.idcardType = e.idcardType.toString();
                    this.checkInForm.mobile = e.mobile;
                    this.checkInForm.sex = e.sex.toString();
                } else if (this.checkInForm.guestType == 4){
                    this.$F.merge(this.checkInForm, e);
                } else {
                    this.checkInForm.name = e.enterName;
                    this.checkInForm.enterId = e.id;
                }
            } else {
                this.checkInForm.name = e;
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.normal {
    padding: 0 10px 10px !important;
}

.el-form-item {
    margin-bottom: 12px;
}
</style>
