<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 14:46:47
 * @FilePath: \jiudian\src\views\market\home\roomStatusHandle.vue
 -->
<template>
<el-dialog top="0" :title="$t('desk.home_batchSet')" width="700px" :visible.sync="visible">
    <el-row style="margin:10px 20px">

        <el-form>
            <el-row>
                <el-col :span="16">
                    <el-form-item :label="$t('desk.home_chooseRoom')" label-width="120px">
                        <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                        <el-input autocomplete="off" v-model="searchForm.keyword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-button style="width:80px;margin-left:20px" type="primary" @click="getDataList">{{$t('commons.queryBtn')}}</el-button>
                        <el-button style="width:80px" @click="initForm">{{$t('commons.resetBtn')}}</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <div style="margin-top:10px">
                <el-row>
                    <el-checkbox-group v-model="searchForm.roomStatus" @change="handleChange">
                        <el-col :span="4" v-for="(item,index) in $t('commons.roomStatus')" :key="index" style="margin-bottom:5px">
                            <el-checkbox :label="item.value">
                                <el-tag :type="item.type" effect="plain" size="mini">{{ item.name }}</el-tag>
                            </el-checkbox>
                        </el-col>
                    </el-checkbox-group>
                </el-row>
                <div style="border-bottom: 1px dashed #ccc;margin:10px 0"></div>
            </div>

            <el-row style="margin-top:10px" v-loading="loading">
                <el-card>
                    <el-row>
                        <el-row>
                            <span>{{$t('desk.home_chooseNeedRoom')}}</span>
                            <span style="color:red;margin-left:5px">{{$t('desk.home_selected')}}（{{chooseNum}}）</span>
                            <el-form-item style="float:right">
                                <el-checkbox @change="handleAll">{{$t('desk.home_allSelected')}}</el-checkbox>
                            </el-form-item>
                        </el-row>
                        <template v-for="(item,index) of roomList">
                            <el-form-item :key="index" v-if="item.roomList&&item.roomList.length">
                                <el-row style="background:#D9DDE2;padding:0 10px">
                                    <el-form-item>
                                        <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange($event,item)">{{item.building?item.building.name:''}} <span>{{item.floor}}</span>层</el-checkbox>
                                    </el-form-item>
                                </el-row>
                                <el-row style="padding-left:15px">
                                    <el-checkbox-group v-model="item.checkedItems" @change="handleCheckedCitiesChange($event,item)">
                                        <el-checkbox v-for="(room, i) in item.roomList" :key="i" :label="room.id">{{room.houseNum}}（{{F_roomStatus(room.roomStatus)}}）</el-checkbox>
                                    </el-checkbox-group>
                                </el-row>
                            </el-form-item>
                        </template>
                    </el-row>
                </el-card>
            </el-row>
        </el-form>
    </el-row>
    <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button style="width:80px;" @click="dataFormSubmit(2)">{{$t('desk.home_bulkDirty')}}</el-button>
        <el-button style="width:80px;" type="primary" @click="dataFormSubmit(1)">{{$t('desk.home_bulkClear')}}</el-button>
<!--        <el-button :class="type==2?'active':''" @click="dataFormSubmit(2)">批量置脏</el-button>-->
<!--        <el-button :class="type==1?'active':''" @click="typeChange(1)">批量置净</el-button>-->
<!--        <el-row style="text-align:center; margin-bottom: 10px;">-->
<!--            -->
<!--        </el-row>-->
    </div>
</el-dialog>
</template>

<script>
import myMixin from '@/utils/filterMixin';

export default {
    mixins: [myMixin],
    data() {
        return {
            type: '',
            visible: false,
            loading: false,
            roomList: [],
            checked: '',
            form: {
                title: "",
                description: ""
            },
            searchForm: {}
        };
    },
    computed: {
        chooseNum() {
            let num = 0;
            for (let k in this.roomList) {
                num += this.roomList[k].checkedItems? this.roomList[k].checkedItems.length : 0
            }
            return num
        }
    },
    methods: {
        init(data) {
            this.initForm()
            this.visible = true;
        },
        initForm() {
            this.searchForm = {
                keyword: '',
                checkInType: [],
                state: 1,
                roomStatus: [],
                roomTypeId: [],
                buildingId: '',
                buildingFloorId: '',
                channel: [],
                personRoom: []
            };
            this.getDataList();
        },
        getDataList() {
            this.loading = true
            this.$F.doRequest(this, '/pms/realtime/realtime_hotel_room_list', this.searchForm, (res) => {
                this.loading = false
                let data = res.floorList;
                console.log(data)
                for (let k in data) {
                    data[k].checkAll = false;
                    data[k].isIndeterminate = false;
                    data[k].checkedItems = []
                }
                console.log(data)
                this.roomList = data;
            })
        },
        dataFormSubmit(type) {
            // if(this.type == ''){
            //   this.$message.error('请选择操作类型');
            //   return
            // }
            let errTip = type== 2 ? this.$t('desk.home_bulkDirty'):this.$t('desk.home_bulkClear')
            let roomIds = [];
            for (let k in this.roomList) {
              console.log(this.roomList[k].checkedItems)
                roomIds = roomIds.concat(this.roomList[k].checkedItems)
            }
            console.log(roomIds)
            let params = {
              roomStatus: type,
              roomIds:roomIds
            }

            this.$confirm(this.$t('desk.home_thisOperate')+errTip, this.$t('commons.tip_desc'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/hotel/oper_room_status', params, (res) => {
                  this.$emit("initForm",'');
                  this.visible = false
                  this.$message({
                    type: 'success',
                    message: this.$t('commons.request_success')
                });
            })

                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });

            // this.$refs[formName].validate(valid => {
            //     if (valid) {
            //         this.visible = false;
            //         this.$emit("saveAttribute", this.form);
            //     } else {
            //         console.log("error submit!!");
            //         return false;
            //     }
            // });
        },
        typeChange(t) {
            this.type = t
        },
        handleChange() {
            this.getDataList()
        },
        handleAll(v) {
            if (v == true) {
                for (let k in this.roomList) {
                    this.roomList[k].isIndeterminate = false
                    this.roomList[k].checkAll = true
                    this.roomList[k].checkedItems = []
                    if (this.roomList[k].roomList && this.roomList[k].roomList.length) {
                        this.roomList[k].roomList.map(s => {
                            this.roomList[k].checkedItems.push(s.id)
                        })
                    }
                }
            } else {
                for (let k in this.roomList) {
                    this.roomList[k].isIndeterminate = false
                    this.roomList[k].checkAll = false
                    this.roomList[k].checkedItems = []
                }
            }
        },
        handleCheckAllChange(v, item) {
            console.log(v)
            console.log(item)
            if (v == true) {
                item.checkedItems = []
                item.roomList.map(s => {
                    item.checkedItems.push(s.id)
                })
            } else {
                item.checkedItems = []
            }
            item.isIndeterminate = false;
            this.$forceUpdate()
        },
        handleCheckedCitiesChange(value, item) {
            let checkedCount = value.length;
            item.checkAll = checkedCount === item.roomList.length;
            item.isIndeterminate = checkedCount > 0 && checkedCount < item.roomList.length;
        }

    }
};
</script>

<style scoped>
.active {
    border: 1px solid #b3d8ff;
    background: #ecf5ff;
    color: #409eff
}
</style>
