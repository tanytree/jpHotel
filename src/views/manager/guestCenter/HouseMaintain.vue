<template>
  <!-- 房型维护 -->
  <el-row class="boss-index">
    <el-tabs v-model="active_tag" v-if="tab_show">
      <el-tab-pane :label="$t('manager.hk_guestRoom')" name="one">
        <el-container direction="vertical" class="boss-index">
          <el-row :gutter="20">
            <el-col style="display: flex;justify-content: flex-end;margin: 10px 0px;">
              <el-button
                type="primary"
                style="width: 100px;"
                size="small"
                @click="addHouse('house','')"
              >{{$t('commons.newAdd')}}</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            height="100%"
            header-row-class-name="default"
          >
            <el-table-column prop="houseName" :label="$t('manager.hk_roomName')"></el-table-column>
            <el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
            <el-table-column prop="bedNum" :label="$t('manager.hk_beds')"></el-table-column>
            <el-table-column prop="checkinNum" :label="$t('manager.hk_availabilityPeople')"></el-table-column>
            <el-table-column prop="status" :label="$t('boss.loginDetail_state')"></el-table-column>
            <el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
            <el-table-column :label="$t('commons.operating')" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="stop('kefang', scope.row)"
                >{{scope.row.state==1? $t('commons.disable'): $t('commons.enable')}}</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="addHouse('change', scope.row)"
                >{{$t('commons.modify')}}</el-button>
                <el-popconfirm
                  :title="$t('manager.hp_bulletTitle')"
                  @onConfirm="houseConfirm_delete"
                >
                  <el-button
                    slot="reference"
                    type="text"
                    size="small"
                    @click="deleteRow(scope.row)"
                  >{{$t('commons.delete')}}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="form.pageSize"
            :total="form.totalSize"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-container>
      </el-tab-pane>
      <el-tab-pane :label="$t('manager.hk_drawingRoomType')" name="two">
        <el-container direction="vertical" class="boss-index">
          <el-row :gutter="20">
            <el-col :span="6" :offset="20">
              <el-button
                type="primary"
                style="width: 100px;"
                size="small"
                @click="addHouse('house', '')"
              >{{$t('commons.newAdd')}}</el-button>
            </el-col>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            height="100%"
            :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          >
            <el-table-column prop="houseName" :label="$t('manager.hk_roomName')"></el-table-column>
            <el-table-column prop="marketPrice" :label="$t('manager.hk_doorPrice')"></el-table-column>
            <el-table-column prop="bedNum" :label="$t('manager.hk_seating')"></el-table-column>
            <el-table-column prop="status" :label="$t('boss.loginDetail_state')"></el-table-column>
            <el-table-column prop="remark" :label="$t('boss.loginDetail_note')"></el-table-column>
            <el-table-column :label="$t('commons.operating')" width="250">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="stop('huiyi', scope.row)"
                >{{scope.row.state==1? $t('commons.disable'):$t('commons.enable')}}</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="addHouse('change', scope.row)"
                >{{$t('commons.modify')}}</el-button>
                <el-popconfirm
                  :title="$t('manager.hp_bulletTitle')"
                  @onConfirm="houseConfirm_delete"
                >
                  <el-button
                    slot="reference"
                    type="text"
                    size="small"
                    @click="deleteRow(scope.row)"
                  >{{$t('commons.delete')}}</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="form.pageSize"
            :total="form.totalSize"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </el-container>
      </el-tab-pane>
    </el-tabs>
    <div
      class="infinite-list-wrapper"
      style="height: 500px; overflow-y:auto; overflow-x: hidden;"
      v-if="!tab_show"
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
            <el-col :span="6">
              <el-form-item :label="$t('manager.hp_room')+':'" prop="houseName">
                <el-input v-model="ruleForm.houseName" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('manager.hk_doorPrice')+':'" prop="marketPrice">
                <el-input v-model="ruleForm.marketPrice" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_preferentialPrice')+':'" prop="discountPrice">
                <el-row style="display: flex;align-items: center;">
                  <el-input v-model="ruleForm.discountPrice" style="width: 200px;"></el-input>
                  <el-col
                    style="color: #999999;margin-left: 10px;"
                  >{{$t('manager.hk_preferentialUse')}}(H5)</el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_availableNum')+':'" prop="checkinNum">
                <el-input v-model="ruleForm.checkinNum" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <!-- 床位数/座位 -->
            <el-col :span="6" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_beds')+':'" prop="bedNum">
                <el-input v-model="ruleForm.bedNum" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="active_tag == 'two'">
              <el-form-item :label="$t('manager.hk_seating')+':'" prop="bedNum">
                <el-input v-model="ruleForm.bedNum" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_bedWidth')+'(cm):'" prop="bedSizeH">
                <el-row style="display: flex;align-items: center;">
                  <el-input
                    v-model="ruleForm.bedSizeW"
                    :placeholder="$t('manager.hk_longitudinalWidth')"
                    style="width: 100px;"
                  />
                  <el-col style="width: 30px;height: 1px; background: #CCCCCC;margin: 0px 10px;"></el-col>
                  <el-input
                    v-model="ruleForm.bedSizeH"
                    :placeholder="$t('manager.hk_horizontalWidth')"
                    style="width: 100px;"
                  />
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_roomArea')+'(㎡):'" prop="houseSizeW">
                <el-row style="display: flex;align-items: center;">
                  <el-input
                    v-model="ruleForm.houseSizeW"
                    :placeholder="$t('manager.hk_roomAreaLon')"
                    style="width: 100%;"
                  />
                  <el-col style="width: 30px;height:  1px; background: #CCCCCC;margin: 0px 10px;"></el-col>
                  <el-input
                    v-model="ruleForm.houseSizeH"
                    :placeholder="$t('manager.hk_roomAreaHor')"
                    style="width: 100%;"
                  />
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="active_tag == 'one'">
              <el-form-item :label="$t('manager.hk_bedType')+':'" prop="bedType">
                <el-input v-model="ruleForm.bedType" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row>
          <el-col style="font-size: 13px; font-weight: bolder;">{{$t('manager.hk_otherInfomation')}}</el-col>
        </el-row>
        <el-row :gutter="22" style="padding: 20px 0px;">
          <el-col :span="2" style="font-size: 14px;">{{$t('manager.hk_roomImg')+':'}}</el-col>
          <el-col :span="20">
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
          </el-col>
          <el-dialog top="0" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-row>
        <el-row :gutter="22" class="demo-form-inline">
          <el-col :span="2" style="font-size: 14px;">{{$t('boss.loginDetail_note')+':'}}</el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="3"
              :placeholder="$t('boss.department_placeEnterContent')"
              v-model="ruleForm.remark"
              style="width: 100%;"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="padding: 20px 0px;">
          <el-button
            type="primary"
            style="width: 80px;"
            @click="saveInfo('ruleForm')"
          >{{$t('commons.save')}}</el-button>
          <el-button
            style="width: 80px;margin-left: 20px;"
            @click="tab_show = true"
          >{{$t('commons.back')}}</el-button>
        </el-row>
      </el-row>
    </div>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tab_show: true,
      active_tag: "one",
      tableData: [],
      form: {
        pageIndex: 1,
        pageSize: 10,
        totalSize: 0,
        roomType: 1, //房屋类型  1客房类型  2会议室房型
      },
      ruleForm: {
        roomType: 1, //房屋类型  1客房类型  2会议室房型
        houseName: "",
        marketPrice: "",
        discountPrice: "",
        checkinNum: "",
        bedNum: "",
        bedSizeW: "",
        bedSizeH: "",
        bedSize: "",
        houseSizeW: "",
        houseSizeH: "",
        houseSize: "",
        bedType: "",
        houseIcon: "",
        remark: "",
      },
      rules: {
        houseName: [
          {
            required: true,
            message: "请输入房型",
            trigger: "blur",
          },
        ],
        marketPrice: [
          {
            required: true,
            message: "请输入门市价",
            trigger: "blur",
          },
        ],
        discountPrice: [
          {
            required: true,
            message: "请输入优惠价",
            trigger: "blur",
          },
        ],
        checkinNum: [
          {
            required: true,
            message: "请输入可入住数",
            trigger: "blur",
          },
        ],
        bedNum: [
          {
            required: true,
            message: "请输入床位数/座位",
            trigger: "blur",
          },
        ],
        bedSizeH: [
          {
            required: true,
            message: "请输入床宽",
            trigger: "blur",
          },
        ],
        houseSizeW: [
          {
            required: true,
            message: "请输入房屋面积",
            trigger: "blur",
          },
        ],
        houseSizeH: [
          {
            required: true,
            message: "请输入房屋面积",
            trigger: "blur",
          },
        ],
        bedType: [
          {
            required: true,
            message: "请输入床型",
            trigger: "blur",
          },
        ],
      },
      selectedInfo: {}, // 选中的某条
      formData: {},
      files: [],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    deleteSuccess: {
      get() {
        return this.$t("manager.hk_deleteSuccess");
      },
      set() {},
    },
    selectRoomImg: {
      get() {
        return this.$t("manager.hp_selectRoomImg");
      },
      set() {},
    },
  },
  watch: {
    active_tag() {
      if (this.active_tag == "one") {
        this.form.roomType = 1;
        this.ruleForm.roomType = 1;
        this.get_house_list();
      } else {
        this.form.roomType = 2;
        this.ruleForm.roomType = 2;
        this.get_house_list();
      }
    },
    deleteSuccess(newValue, oldValue) {
      this.deleteSuccess = newValue;
    },
    selectRoomImg(newValue, oldValue) {
      this.selectRoomImg = newValue;
    },
  },
  created() {
    this.get_house_list();
  },
  methods: {
    addHouse(type, value) {
      switch (type) {
        case "house":
          this.ruleForm = {};
          this.tab_show = false;
          break;
        case "change":
          this.tab_show = false;
          this.ruleForm = value;
          this.files = [];
          if (value.houseIcon) {
            const arr = value.houseIcon.split(",");
            arr.map((i) => {
              this.files.push({ url: i });
            });
          }
          break;
      }
    },
    // 客房禁用
    stop(type, item) {
      let params = {
        id: item.id,
      };
      if (item.state === 1) {
        params.state = 2;
      } else {
        params.state = 1;
      }
      params.roomTypeId = item.id;
      debugger;
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_type_state",
        params,
        (res) => {
          this.tableData = [];
          this.get_house_list();
        }
      );
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
    // 房屋/会议 删除
    houseConfirm_delete(value) {
      let params = {
        roomTypeId: this.selectedInfo.id,
      };
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_type_delete",
        params,
        (res) => {
          this.get_house_list();
          this.$message({
            message: this.deleteSuccess,
            type: "success",
          });
        }
      );
    },
    // 保存
    saveInfo(ruleForm) {
      if (this.ruleForm.id) {
        this.ruleForm.roomTypeId = this.ruleForm.id;
      }
      if (this.active_tag == "one") {
        this.form.roomType = 1;
        this.ruleForm.roomType = 1;
        this.get_house_list();
      } else {
        this.form.roomType = 2;
        this.ruleForm.roomType = 2;
      }
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
            this.ruleForm.houseIcon = data;
            let params = Object.assign({}, this.ruleForm);
            this.$F.doRequest(
              this,
              "/pms/hotel/hotel_room_type_save",
              params,
              (res) => {
                this.$message({
                  message: "Save success",
                  type: "success",
                });
                this.tab_show = true;
              }
            );
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取 房间类型类型列表
    get_house_list() {
      let params = Object.assign({}, this.form);
      // debugger
      this.$F.doRequest(
        this,
        "/pms/hotel/hotel_room_type_list",
        params,
        (res) => {
          this.tableData = res.list;
          this.form.totalSize = res.totalSize;
        }
      );
    },
    deleteRow(value) {
      this.selectedInfo = value;
    },
    //切换到房屋/会议
    back() {
      this.tab_show = true;
      this.ruleForm = {};
      this.get_house_list();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.form.pageIndex = 1;
      this.get_house_list();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = 1;
      this.get_house_list();
    },
  },
};
</script>

<style>
</style>
