<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-08-04 16:15:00
 * @FilePath: /jiudian/src/views/market/home/unitedRoomHandle.vue
 -->
<template>
<el-dialog top="0" title="联房" :visible.sync="visible" width="60%">
    <el-row>
        <el-input style="width:334px" placeholder="姓名/房号"></el-input>
    </el-row>
    <el-row>
        <el-col :span="15">
            <el-row class="padding-tb-10">
                选择列表({{totalLength}})
                <span>点击选择房间</span>
            </el-row>
            <el-row style="text-align:center;max-height:350px;min-height:350px;overflow:auto;background:#f9f9f9;border:1px solid #eee" v-loading="loading">
                <el-row v-if="!loading">
                    <div class="row" v-for="(item,index) in roomList" :key="index">
                        <template v-for="(room, i) in item.roomList">
                            <el-col :span="6" style="margin-top:10px" :key="i" v-if="room.id!=id&&room.checkInRoomType==1">
                                <el-tag :type="checkItem(room.id)?'danger':''" @click="handleAdd(room)" style="min-width:100px">{{room.houseNum}}&nbsp;&nbsp;
                                    {{room.livingPersonList&&room.livingPersonList.length?room.livingPersonList[0].name:''}}
                                </el-tag>
                            </el-col>

                        </template>
                    </div>
                </el-row>
            </el-row>
        </el-col>
        <el-col :span="8">
            <el-row style="margin-left:20px">
                <el-row class="padding-tb-10">
                    联房列表 现有联房
                    <span>{{roomJoinList.length}}</span>间
                </el-row>
                <el-row style="max-height:350px;min-height:350px;overflow:auto;background:#f9f9f9;border:1px solid #eee">
                    <el-col :span="12" style="margin-top:10px;text-align:center" v-for="(room,index) in roomJoinList" :key="room.id">
                        <el-button style="min-width:100px" class="roomNumTag">{{room.houseNum||room.roomNum}} <span class="del" @click="handleDel(index,room)" v-if="room.roomId!=id">✕ 移除</span></el-button>
                    </el-col>
                </el-row>
            </el-row>
        </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible=false">{{ $t('commons.cancel') }}</el-button>
        <el-button type="primary" @click="dataFormSubmit"{{ $t('commons.confirm') }}/el-button>
    </span>
</el-dialog>
</template>

<script>
Array.prototype.push2 = function () {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
import myMixin from '@/utils/filterMixin';

export default {
    mixins: [myMixin],
    data() {
        return {
            id: '',
            type: '',
            visible: false,
            loading: true,
            totalLength: 0,
            roomList: [],
            roomJoinList: [],
            searchForm: {}
        };
    },
    computed: {},
    methods: {
        async init(id) {
            this.id = id
            await this.already_room_join(id)
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
                let data = res.floorList;
                this.roomList = data;
                this.roomList.forEach(element => {
                    if (element.roomList && element.roomList.length) {
                        for (let k in element.roomList) {
                            if (element.roomList[k].id == this.id) {
                                let item = {
                                    houseNum: element.roomList[k].houseNum,
                                    id: element.roomList[k].id
                                }
                                this.roomJoinList.length < 1 && this.roomJoinList.push(item)
                            }
                        }
                    }
                    this.totalLength += element.roomList ? element.roomList.length : 0
                });
                this.loading = false
            })
        },
        already_room_join(id) {
            return new Promise((resolve, reject) => {
                this.$F.doRequest(this, '/pms/checkin/already_room_join', {
                    roomId: id
                }, (res) => {
                    this.roomJoinList = res || []
                    resolve(res)
                })
            })
        },
        dataFormSubmit() {
            let joinRoomIds = [];
            joinRoomIds.push()
            this.roomJoinList.forEach(element => {
                joinRoomIds.push(element.id || element.roomId)
            });
            let params = {
                roomId: this.id,
                joinRoomIds: joinRoomIds,
            }
            this.$confirm('请确认联房', this.$t('commons.tip_desc'), {
                confirmButtonText: this.$t('commons.confirm'),
                cancelButtonText: this.$t('commons.cancel'),
                type: 'warning'
            }).then(() => {
                this.$F.doRequest(this, '/pms/checkin/check_in_room_join', params, (res) => {
                    this.visible = false
                    this.$message({
                        type: 'success',
                        message: this.$t('commons.request_success')
                    });
                })
            }).catch(() => {

            });

        },
        handleAdd(item) {
            let room = {
                houseNum: item.houseNum,
                roomId: item.id
            }
            this.roomJoinList.push2(room)
        },
        handleDel(i, item) {
            console.log(item)
            if (item.id) {
                this.$F.doRequest(this, '/pms/checkin/move_room_join', {
                    joinId: item.id
                }, (res) => {
                    this.$message({
                        type: 'success',
                        message: this.$t('commons.request_success')
                    });
                    this.already_room_join(this.id)
                })
            } else if (item.roomId) {
                this.roomJoinList.splice(i, 1)
            }
        },
        checkItem(id) {
            if (JSON.stringify(this.roomJoinList).indexOf(id) != -1) {
                return true
            }
            return false
        }

    }
};
</script>

<style scoped>
.roomNumTag {
    position: relative;
    min-width: 100px;
}

.roomNumTag .del {
    display: none;
}

.roomNumTag:hover .del {
    display: block;
    z-index: 9;
    width: 100%;
    border-radius: 5px;
    font-size: 12px;
    font-style: normal;
    margin: 0;
    line-height: 38px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.66);
    color: #fff
}
</style>
