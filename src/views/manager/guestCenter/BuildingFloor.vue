<!-- 楼栋楼层 -->
<template>
    <div id="page1">
        <el-row :gutter="20" style="font-size: 14px; font-weight: bolder;">
            <el-col :span="2.5">{{hotel_name || ''}}</el-col>
            <el-col
                    :span="2"
            >{{$t('manager.hk_total')}}{{dongList.length || ''}}{{$t('manager.hk_building')}}</el-col>
        </el-row>
        <el-row style="padding: 20px 0px;">
            <el-radio-group v-model="selectRedio">
                <el-radio-button
                        :label="value.id"
                        v-for="(value, index) in dongList"
                        :key="index"
                >{{value.name}}</el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row
                :gutter="20"
                class="demo-form-inline"
                style="background-color: #e6eaed;padding: 10px 0px;"
        >
            <el-col :span="6">
                {{currentDong}}{{$t('manager.hk_total')}}
                <span
                        style="color: #126EFF;"
                >{{dongInfo.buildingTotal}}</span>
                {{$t('manager.hp_layer')}} {{$t('manager.hk_totalRoom')}}:
                <span
                        style="color: #126EFF;"
                >{{dongInfo.roomTotal}}</span>
                {{$t('manager.hk_space')}}
            </el-col>
            <el-col :span="6">
                <el-button type="text" @click="popup('changeDong')">{{$t('commons.modify')}}</el-button>
                <span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>
                <el-popconfirm :title="$t('manager.hk_sureDelete')+'？'" @confirm="houseFloor_delete">
                    <el-button
                            slot="reference"
                            type="text"
                            size="small"
                            
                    >{{$t('commons.delete')}}</el-button>
                </el-popconfirm>
<!--                <span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>-->
<!--                <el-button type="text" @click="forward">{{$t('manager.hk_forward')}}</el-button>-->
<!--                <span style="border-left: 1px solid #CCCCCC;height: 15px;"></span>-->
<!--                <el-button type="text" @click="back">{{$t('manager.hk_moveBack')}}</el-button>-->
            </el-col>
            <el-col :span="8" :offset="8">
                <el-button type="primary" @click="popup('addDong')">{{$t('manager.hk_newBuilding')}}</el-button>
                <el-button type="primary" @click="popup('addCeng')">{{$t('manager.hk_newFloor')}}</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;margin-left: 40px;">
            <el-row v-for="(value, index) in cengList" :key="index">
                <el-popover placement="right" width="400" trigger="hover" @show="showroom_list(value)">
                    <el-button slot="reference">{{value.name}}</el-button>
                    <el-row>
                        <el-row :gutter="20" style="border-bottom: 1px solid #e5e5e5;padding: 10px 0px;">
                            <el-col :span="10">{{value.building.name}}{{value.name}}</el-col>
                            <el-col :span="14" style="display: flex;justify-content: flex-end;">
                                <el-button type="text" @click="popup('changeCeng',value)">{{$t('commons.modify')}}</el-button>
                                <el-popconfirm
                                        :title="$t('manager.hk_sureDelete')+'？'"
                                        @confirm="houseRoom_delete(value)"
                                >
                                    <el-button
                                            slot="reference"
                                            type="text"
                                            size="small"
                                    >{{$t('commons.delete')}}</el-button>
                                </el-popconfirm>
                            </el-col>
                        </el-row>
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                        >
                            <el-table-column prop="typeName" :label="$t('manager.hp_room')"></el-table-column>
                            <el-table-column prop="total" :label="$t('manager.hk_roomNum')"></el-table-column>
                        </el-table>
                        <el-row
                                style="padding:20px 0px 10px 0px;"
                        >{{$t('manager.hk_floorNote')+':'}} {{value.remark}}</el-row>
                        <el-row v-if="!selectRedio">
                            <el-input
                                    :placeholder="$t('manager.hk_placeEnterContentC')"
                                    v-model="value.building.remark"
                            ></el-input>
                        </el-row>
                    </el-row>
                </el-popover>
            </el-row>
        </el-row>
        <!-- 新增楼栋 -->
        <el-dialog
                top="0"
                :title="dong_title"
                :visible.sync="addDong_show"
                :close-on-click-modal="false"
        >
            <el-row :gutter="20">
                <el-form :model="ruleForm_dong" :rules="rules" ref="ruleForm_dong" label-width="150px">
                    <el-col :span="20">
                        <el-form-item :label="$t('manager.hk_buildingName')+':'" prop="name">
                            <el-input :placeholder="$t('manager.hk_inputBuildName')" v-model="ruleForm_dong.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item :label="$t('manager.hk_buildingNote')+':'">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    :placeholder="$t('manager.hk_placeEnterContent')"
                                    v-model="ruleForm_dong.remark"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDong_show = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="defineDong">{{$t('commons.determine')}}</el-button>
      </span>
        </el-dialog>
        <!-- 新增楼层 -->
        <el-dialog
                top="0"
                :title="ceng_title"
                :visible.sync="addCeng_show"
                :close-on-click-modal="false"
        >
            <el-row :gutter="20">
                <el-form :model="ruleForm_ceng" :rules="rules" ref="ruleForm_ceng" label-width="150px">
                    <el-col :span="20">
                        <el-form-item :label="$t('manager.hp_floor')+':'" prop="name">
                            <el-input
                                    :placeholder="$t('manager.hk_placeEnterContentA')"
                                    v-model="ruleForm_ceng.floor"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item :label="$t('manager.hk_floorName')+':'" prop="name">
                            <el-input
                                    :placeholder="$t('manager.hk_placeEnterContentB')"
                                    v-model="ruleForm_ceng.name"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="20">
                        <el-form-item :label="$t('manager.hk_floorNote')+':'">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    :placeholder="$t('manager.hk_placeEnterContentC')"
                                    v-model="ruleForm_ceng.remark"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addCeng_show = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="defineCeng">{{$t('commons.determine')}}</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import HouseMaintain from "./HouseMaintain";
    import BuildingFloor from "./BuildingFloor";
    import { mapState, mapActions } from "vuex";
    export default {
        components: {
            HouseMaintain,
            BuildingFloor,
        },
        computed: {
            ...mapState({
                user: (state) => state.user,
            }),
            newBuilding: {
                get() {
                    return this.$t("manager.hk_newBuilding");
                },
                set() {},
            },
            modifyBuilding: {
                get() {
                    return this.$t("manager.hk_modifyBuilding");
                },
                set() {},
            },
            newFloor: {
                get() {
                    return this.$t("manager.hk_newFloorA");
                },
                set() {},
            },
            modifyFloor: {
                get() {
                    return this.$t("manager.hk_modifyFloor");
                },
                set() {},
            },
            success: {
                get() {
                    return this.$t("manager.hk_success");
                },
                set() {},
            },
            newSuccess: {
                get() {
                    return this.$t("manager.hk_newSuccess");
                },
                set() {},
            },
            deleteSuccess: {
                get() {
                    return this.$t("manager.hk_deleteSuccess");
                },
                set() {},
            },
        },
        data() {
            return {
                selectRedio: "",
                hotel_name: "",
                addDong_show: false,
                addCeng_show: false,
                ruleForm_dong: {
                    name: "",
                    hotelBuildingId: "",
                    remark: "",
                },
                ruleForm_ceng: {
                    buildingId: "", // 楼栋id
                    buildingFloorId: "", //楼层id
                    name: "", //楼层名称
                    floor: "", //楼层数字
                    remark: "",
                },
                rules: {
                    name: [
                        {
                            required: true,
                            // message: "请输入楼栋名称",
                            message: this.$t('commons.mustInput'),
                            trigger: "blur",
                        },
                    ],
                },
                currentDong: "",
                select_type: "",
                dong_title: "新增楼栋",
                ceng_title: "新增楼层",
                dongList: [], //楼栋列表
                cengList: [], // 楼层列表
                roomList: [],
                tableData: [],
                dongInfo: {}, //每栋楼层和房间信息
            };
        },
        created() {
            this.hotel_name = JSON.parse(
                sessionStorage.getItem("userData")
            ).storesInfo.storesName;
            this.get_dong_list();
        },
        watch: {
            selectRedio() {
                if (this.dongList.length != 0) {
                    this.dongList.forEach((value) => {
                        if (value.id == this.selectRedio) {
                            this.currentDong = value.name;
                        }
                    });
                    this.get_ceng_list();
                    this.get_room_list();
                    this.get_current_ceng_info();
                }
            },
            newBuilding(newValue, oldValue) {
                this.newBuilding = newValue;
            },
            modifyBuilding(newValue, oldValue) {
                this.modifyBuilding = newValue;
            },
            newFloor(newValue, oldValue) {
                this.newFloor = newValue;
            },
            modifyFloor(newValue, oldValue) {
                this.modifyFloor = newValue;
            },
            success(newValue, oldValue) {
                this.success = newValue;
            },
            newSuccess(newValue, oldValue) {
                this.newSuccess = newValue;
            },
            deleteSuccess(newValue, oldValue) {
                this.deleteSuccess = newValue;
            },
        },
        methods: {
            popup(type, value) {
                this.select_type = type;
                switch (type) {
                    case "addDong":
                        this.addDong_show = true;
                        this.dong_title = this.newBuilding;
                        break;
                    case "changeDong":
                        this.dongList.forEach((value, index) => {
                            if (this.selectRedio == value.id) {
                                this.ruleForm_dong = value;
                                this.ruleForm_dong.hotelBuildingId = value.id;
                            }
                        });
                        this.addDong_show = true;
                        this.dong_title = this.modifyBuilding;
                        break;
                    case "addCeng":
                        this.addCeng_show = true;
                        this.ceng_title = this.newFloor;
                        this.ruleForm_ceng = {
                            buildingId: "", // 楼栋id
                            buildingFloorId: "", //楼层id
                            name: "", //楼层名称
                            floor: "", //楼层数字
                            remark: "",
                        };
                        break;
                    case "changeCeng":
                        this.addCeng_show = true;
                        this.ceng_title = this.modifyFloor;
                        this.ruleForm_ceng = value;
                        break;
                }
            },
            // 添加楼栋--确认
            defineDong() {
                let params = Object.assign({}, this.ruleForm_dong);
                switch (this.select_type) {
                    case "changeDong":
                        params.hotelBuildingId = this.ruleForm_dong.hotelBuildingId;
                        break;
                }
                this.$F.doRequest(
                    this,
                    "/pms/hotel/hotel_building_save",
                    params,
                    (res) => {
                        this.get_dong_list();
                        this.addDong_show = false;
                        this.$message({
                            message: this.success,
                            type: "success",
                        });
                    }
                );
            },
            // 添加楼层 -- 确认
            defineCeng() {
                if (this.ruleForm_ceng.id) {
                    this.ruleForm_ceng.buildingFloorId = this.ruleForm_ceng.id;
                }
                this.ruleForm_ceng.buildingId = this.selectRedio;
                let params = Object.assign({}, this.ruleForm_ceng);
                this.$F.doRequest(
                    this,
                    "/pms/hotel/hotel_building_floor_save",
                    params,
                    (res) => {
                        this.get_ceng_list();
                        this.addCeng_show = false;
                        this.$message({
                            message: this.newSuccess,
                            type: "success",
                        });
                    }
                );
            },
   //          deleteRow(value) {
			// },
			// 删除--楼栋
            houseFloor_delete() {
                let params = {
                    hotelBuildingId: this.selectRedio,
                };
                this.$F.doRequest(
                    this,
                    "/pms/hotel/hotel_building_delete",
                    params,
                    (res) => {
                        this.get_dong_list();
                        this.$message({
                            message: this.deleteSuccess,
                            type: "success",
                        });
                    }
                );
            },
            // 删除--楼层
            houseRoom_delete(value) {
                let params = {
                    buildingFloorId: value.id,
                };
                this.$F.doRequest(
                    this,
                    "/pms/hotel/hotel_building_floor_delete",
                    params,
                    (res) => {
                        this.get_ceng_list();
                        this.$message({
                            message: this.deleteSuccess,
                            type: "success",
                        });
                    }
                );
            },
            // 点击哪层展示哪层的房间信息
            showroom_list(value) {
                this.get_room_list(value.id);
            },
            // 获取 楼层 -- 房型列表
            get_room_list(buildingFloorId) {
                let params = {
                    buildingId: this.selectRedio,
                    buildingFloorId: buildingFloorId,
                };
                this.$F.doRequest(
                    this,
                    "/pms/hotel/gethotel_building_room_type_total",
                    params,
                    (res) => {
                        this.tableData = res;
                    }
                );
            },
            // 获取 楼层列表
            get_ceng_list() {
                let params = {
                    buildingId: this.selectRedio,
                };
                this.$F.doRequest(
                    this,
                    "/pms/hotel/hotel_building_floor_list",
                    params,
                    (res) => {
                        this.cengList = res;
                    }
                );
            },
            // 获取 当前楼栋楼层数房间数信息
            get_current_ceng_info() {
                let params = {
                    buildingId: this.selectRedio,
                };
                this.$F.doRequest(
                    this,
                    "/pms/hotel/gethotel_building_room_total",
                    params,
                    (res) => {
                        this.dongInfo = res;
                    }
                );
            },
            // 获取 楼栋列表
            get_dong_list() {
                this.$F.doRequest(this, "/pms/hotel/hotel_building_list", {}, (res) => {
                    this.dongList = res;
                    this.selectRedio = this.dongList[0].id;
                    this.currentDong = this.dongList[0].name;
                    this.get_ceng_list();
                    this.get_current_ceng_info();
                });
            },
            // 前移
            forward() {
                if (this.selectRedio >= 0) {
                    let temp = this.dongList[this.selectRedio - 1];
                    this.dongList.splice(this.selectRedio - 1, 1);
                    this.dongList.splice(this.selectRedio, 0, temp);
                }
            },
            // 后退
            back() {
                if (this.selectRedio >= 0) {
                    let temp = this.dongList[this.selectRedio + 1];
                    this.dongList.splice(this.selectRedio + 1, 1);
                    this.dongList.splice(this.selectRedio, 0, temp);
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
