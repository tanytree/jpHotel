<!--
 * @Date: 2020-02-15 21:08:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-02 16:29:05
 * @FilePath: \jiudian\src\views\manager\guestCenter\AddRoom.vue
 -->
<template>
    <div
        id="page1"
        class="infinite-list-wrapper"
        style="height: 500px; overflow-y:auto; overflow-x: hidden;"
    >
        <el-row>
            <el-row style="padding: 20px 0px;">
                <el-page-header @back="back" content></el-page-header>
            </el-row>
            <el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
                <el-col
                    style="font-size: 13px; font-weight: bolder;"
                >{{$t('manager.hk_basicInformation')}}</el-col>
            </el-row>
            <el-row :gutter="20">
                <el-form :model="selectFrom" :rules="rules" ref="selectFrom" label-width="100px">
                    <el-col :span="8">
                        <el-form-item :label="$t('manager.hp_room')+':'" prop="roomTypeId">
                            <el-cascader
                                v-model="selectFrom.roomTypeId"
                                :options="roomType"
                                @change="handleChange"
                                :placeholder="selectFrom.roomTypeId_name"
                                style="width: 100%;"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item
                            :label="$t('manager.hp_storiedBuildingA')+':'"
                            prop="buildingId"
                        >
                            <el-select
                                v-model="selectFrom.buildingId"
                                :placeholder="selectFrom.buildingId_name"
                                style="width: 100%;"
                                :disabled="true"
                            >
                                <el-option
                                    :label="value.name"
                                    :value="value.id"
                                    v-for="(value, index) in dongList"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('manager.hp_floor')+':'" prop="buildingFloorId">
                            <el-select
                                v-model="selectFrom.buildingFloorId"
                                :placeholder="selectFrom.buildingFloorId_name"
                                style="width: 100%;"
                            >
                                <el-option
                                    :label="value.name"
                                    :value="value.id"
                                    v-for="(value, index) in cengList"
                                    :key="index"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('manager.hk_roomNumber')+':'" prop="houseNum">
                            <el-input v-model="selectFrom.houseNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$t('manager.hk_ext')+':'" prop="extension">
                            <el-input v-model="selectFrom.extension"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <el-row>
                <el-col
                    style="font-size: 13px; font-weight: bolder;"
                >{{$t('manager.hk_roomStructure')}}</el-col>
            </el-row>
            <el-row style="padding: 20px 0px;">
                <el-col style="font-size: 13px;width: 130px;text-align: right;margin-right: 20px;">
                    <span style="color: red;">*</span>
                    {{$t('manager.hk_roomIMg')+':'}}
                </el-col>

                <el-upload
                    list-type="picture-card"
                    action="aa"
                    ref="upload"
                    :file-list="files"
                    :auto-upload="false"
                    multiple
                    accept="image/png, image/gif, image/jpg, image/jpeg"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :title="$t('manager.hp_img')" top="0" :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>

                <!--				<el-upload list-type="picture-card" action="aa" ref="upload" :auto-upload="false" :http-request="uploadFile"-->
                <!--				 multiple :on-preview="handlePictureCardPreview" :on-remove="handleRemove" accept="image/png,image/gif,image/jpg,image/jpeg">-->
                <!--					<i slot="default" class="el-icon-plus"></i>-->
                <!--					<div slot="file" slot-scope="{file}">-->
                <!--						<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">-->
                <!--						<span class="el-upload-list__item-actions">-->
                <!--							<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">-->
                <!--								<i class="el-icon-zoom-in"></i>-->
                <!--							</span>-->
                <!--							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">-->
                <!--								<i class="el-icon-download"></i>-->
                <!--							</span>-->
                <!--							<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">-->
                <!--								<i class="el-icon-delete"></i>-->
                <!--							</span>-->
                <!--						</span>-->
                <!--					</div>-->
                <!--				</el-upload>-->
                <!--				<el-dialog top="0" :visible.sync="dialogVisible">-->
                <!--					<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--				</el-dialog>-->
            </el-row>
            <el-row>
                <el-form :model="selectFrom" :rules="rules" ref="selectFrom" label-width="150px">
                    <el-form-item :label="$t('manager.hk_toward')+':'" prop="toward">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.toward">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in towardList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item v-if="1==2" :label="$t('manager.hk_byRoad')+':'" prop="roadFlag">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.roadFlag">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in roadFlagList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('manager.hk_ifWindow')+':'" prop="windowFlag">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.windowFlag">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in windowFlagList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('manager.hk_smokeRoom')+':'" prop="smokeFlag">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.smokeFlag">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in smokeFlagList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('boss.loginDetail_state')+':'" prop="name">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.state">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in stateList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item :label="$t('manager.hk_ifNoiseRoom')+':'" prop="noiseFlag" v-if="1==2">
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.noiseFlag">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in noiseFlagList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item
                        v-if="1==2"
                        :label="$t('manager.hk_ifTemperatureRoom')+':'"
                        prop="temperatureFlag"
                    >
                        <el-row :gutter="20" class="row-center">
                            <el-col :span="20">
                                <el-radio-group v-model="selectFrom.temperatureFlag">
                                    <el-radio
                                        :label="value.status"
                                        v-for="(value, index) in temperatureFlagList"
                                        :key="index"
                                    >{{value.name}}</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-row>
                <el-button
                    type="primary"
                    style="width: 80px;"
                    @click="saveInfo('selectFrom')"
                >{{$t('commons.save')}}</el-button>
                <el-button
                    style="width: 80px;margin-left: 20px;"
                    @click="back"
                >{{$t('commons.back')}}</el-button>
            </el-row>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    props: [
        "add_show",
        "selectRedio",
        "currentDong",
        "selectFrom",
        "roomType",
        "dongList",
    ],

    data() {
        return {
            files: [],
            rules: {
                roomTypeId: [
                    { required: true, message: this.$t('commons.placeChoose'), trigger: "blur" },
                ],
                buildingId: [
                    { required: true, message: this.$t('commons.placeChoose'), trigger: "blur" },
                ],
                buildingFloorId: [
                    { required: true, message: this.$t('commons.placeChoose'), trigger: "blur" },
                ],
                houseNum: [
                    {
                        required: true,
                        // message: "请输入房间号",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
                extension: [
                    {
                        required: true,
                        // message: "请输入电话分机",
                        message: this.$t('commons.mustInput'),
                        trigger: "blur",
                    },
                ],
            },
            towardList: [
                {
                    name: "朝南",
                    status: 1,
                },
                {
                    name: "朝北",
                    status: 2,
                },
                {
                    name: "朝东",
                    status: 3,
                },
                {
                    name: "朝西",
                    status: 4,
                },
            ],
            roadFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            windowFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            noiseFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            smokeFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            stateList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            noiseFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            temperatureFlagList: [
                {
                    name: "是",
                    status: 1,
                },
                {
                    name: "否",
                    status: 2,
                },
            ],
            cengList: [],
            formData: {},
            fileList: [],
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
        };
    },
    created() {
        this.selectFrom.buildingId = this.selectRedio;
        this.files = [];
        if (this.selectFrom.roomIcon) {
            const arr = this.selectFrom.roomIcon.split(",");
            arr.map((i) => {
                this.files.push({ url: i });
            });
        }
        this.get_ceng_list();
    },
    computed: {
        selectRoomImg: {
            get() {
                return this.$t("manager.hp_selectRoomImg");
            },
            set() {},
        },
    },
    watch: {
        selectRoomImg(newValue, oldValue) {
            this.selectRoomImg = newValue;
        },
    },
    methods: {
        // 获取联级选择--房屋类型
        handleChange(value) {
            this.selectFrom.roomTypeId = value[1];
        },
        // 选择的图片
        uploadFile(file) {
            this.formData.append("uploadFile", file.file);
        },
        // 选择图片--放大
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file) {
            this.files = this.files.filter((item) => item.url != file.url);
            this.$refs.upload.uploadFiles = this.$F.deepClone(this.files);
        },
        // 保存
        saveInfo(ruleForm) {
            if (this.selectFrom.id) this.selectFrom.roomId = this.selectFrom.id;
            this.formData = new FormData();
            let imgList = this.$refs.upload.uploadFiles || [];
            if (imgList.length == 0) {
                return this.$message({
                    message: this.selectRoomImg,
                    type: "warn",
                });
            }
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.$F.doUploadBatch(this, imgList, (data) => {
                        this.selectFrom.roomIcon = data;
                        let params = Object.assign({}, this.selectFrom);
                        this.$F.doRequest(
                            this,
                            "/pms/hotel/hotel_room_save",
                            params,
                            (res) => {
                                this.$message({
                                    message: "Save success",
                                    type: "success",
                                });
                                this.back();
                            }
                        );
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //切换到房屋信息
        back() {
            let status = false;
            this.$emit("changeShow", status);
        },
        // 获取 楼层列表
        get_ceng_list() {
            let params = {};
            if (this.selectFrom.id) {
                params.buildingId = this.selectFrom.buildingId;
            } else {
                params.buildingId = this.selectRedio;
            }
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_building_floor_list",
                params,
                (res) => {
                    this.cengList = res;
                }
            );
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.row-center {
    display: flex;
    align-items: center;
}
</style>
