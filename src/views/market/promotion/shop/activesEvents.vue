<!--
 * @Date: 2020-03-17 17:39:47
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 09:52:37
 * @FilePath: /cloudAdmin/src/views/market/promotion/shop/activesEvents.vue
 -->
<template>
  <div>
    <el-dialog :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-card class="active-events">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/promotion' }">店铺营销</el-breadcrumb-item>
          <el-breadcrumb-item>活动项目</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form inline size="small">
        <el-form-item>
          <el-input
            placeholder="请输入活动名称"
            v-model="searchForm.activityName"
            class="input-with-select"
            style="width: 300px"
          >
            <el-button slot="append" @click="fetchActiveList">查询</el-button>
          </el-input>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button @click="addCoupon('')">新增活动</el-button>
        </el-form-item>
      </el-form>
      <el-table
        size="mini"
        :data="tableData"
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        height="100%"
      >
        <el-table-column type="index" width="55" label="序列"></el-table-column>
        <el-table-column prop="activityName" label="活动名称"></el-table-column>
        <el-table-column prop="activityRemark" label="活动简介"></el-table-column>
        <el-table-column prop="status" label="开启">
          <template slot-scope="{row}">
            <el-switch
              :active-value="0"
              :inactive-value="1"
              v-model="row.shelvesStatus"
              @change="val=>changeStatus(row, val)"
            />
          </template>
        </el-table-column>
        <el-table-column width="190px" label="操作">
          <template slot-scope="{row}">
            <!--            <el-button @click="addCoupon(row.id)" type="text">详情</el-button>-->
            <el-button @click="addCoupon(row.id)" v-if="row.status==1" type="text">编辑</el-button>
            <el-button @click="delCoupon(row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
    <el-dialog
      :title="handleName"
      width="80%"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="form" size="small" :model="form" label-width="90px" :rules="rules">
        <el-form-item label="活动名称" required prop="activityName">
          <el-input v-model="form.activityName"></el-input>
        </el-form-item>
        <el-form-item label="活动简介" required prop="activityRemark">
          <el-input v-model="form.activityRemark"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" required prop="activityIcon">
          <el-upload
            class="avatar-uploader"
            accept=".png, .jpg, .gif"
            :action="action"
            :data="uploadData"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)"
          >
            <img v-if="form.activityIcon" :src="form.activityIcon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--          <span>图片格式为png、jpg，大小为336*188，大小不超过1M</span>-->
        </el-form-item>
        <div class="el-activeItem" style="height:auto">
          <div v-for="(item,index) in form.edtActivitySubJson" :key="index" class="activeItem">
            <div>
              <i @click="form.edtActivitySubJson.splice(index,1)" class="el-icon-error"></i>
              子活动{{index+1}}
            </div>
            <div>
              <div class="activeVal">
                <span class="valTit">活动名称</span>
                <span style="color: red;margin-right:10px">*</span>
                <el-input v-model="item.subactivityName " size="mini" style="width:120px"></el-input>
              </div>
              <div class="activeVal">
                <span class="valTit">活动简介</span>
                <span style="color: red;margin-right:10px">*</span>
                <el-input v-model="item.subactivityRemark" size="mini" style="width:120px"></el-input>
              </div>
              <div class="activeVal">
                <span class="valTit">活动图标</span>
                <span style="color: red;margin-right:10px">*</span>
                <el-upload
                  class="avatar-uploader"
                  accept=".png, .jpg, .gif"
                  :action="action"
                  :data="uploadData"
                  :show-file-list="false"
                  :before-upload="beforeUpload"
                  :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList, 'subActive', item, index)"
                >
                  <img v-if="item.subactivityIcon" :src="item.subactivityIcon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="margin-left: 10px">图片格式为png、jpg，大小为60*60，大小不超过100KB</span>
              </div>
              <div class="activeVal">
                <span class="valTit">活动课程</span>
                <span style="color: red; margin-right: 10px;">*</span>
                <template v-if="courseImgs.length  > 0">
                  <div class="divBox" v-for="(item,index) in courseImgs" :key="index">
                    <img
                      @click="deletePng(index)"
                      class="deleteImg"
                      src="@/assets/images/close.png"
                    />
                    <img :src="item.img" class="slotImg" />
                  </div>
                </template>
                <el-button @click="addCourse()">添加课程</el-button>
              </div>
            </div>
          </div>
          <!--          <el-button class="addBtn" size="mini" @click="addSubActive">添加子活动</el-button>-->
          <el-button class="cancel" size="mini" icon="el-icon-plus" @click="addSubActive">添加子活动</el-button>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button size="small" type="primary" @click="activeSubmit()">确定</el-button>
      </span>
      <el-dialog width="60%" height="70%" title="选择课程" :visible.sync="innerVisible" append-to-body>
        <el-form inline class="top-body" size="small">
          <el-row>
            <el-col :span="8">
              <el-form-item label="课程名称">
                <el-input v-model="courseForm.contents"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="课程分类">
                <el-select v-model="courseForm.channelId">
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="(item,index) in courseTypes"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button @click="fetchCourseList()" plain type="primary">查询</el-button>
                <el-button @click="resetForm(true)" plain type="primary">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-card>
          <div class="components-edit">
            <div class="components-table">
              <el-table
                max-height="200"
                ref="multipleTable"
                :data="productList"
                tooltip-effect="dark"
                style="width: 100%;padding: 8px 0 ! important;height:400px"
                :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
                size="mini"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="选择" width="122px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="courseIcon" label="课程主图" show-overflow-tooltip>
                  <template slot-scope="{row}">
                    <img style="margin-right:8px" :src="row.courseIcon" class="goodsImg" />
                  </template>
                </el-table-column>
                <el-table-column prop="courseName" label="课程名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="edtCourseTypeName" label="课程类型" show-overflow-tooltip></el-table-column>
              </el-table>
              <el-pagination
                style="padding:20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="courseNumber"
                layout="total, sizes, prev, pager, next, jumper"
              ></el-pagination>
            </div>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button @click="clickSureBtn()">确定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_gift_info,
  add_gift,
  del_gift,
  edit_gift_status
} from "@/utils/api/market";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user
    }),
    selectId() {
      if (this.goodList && this.goodList.length > 0) {
        let arrIds = this.goodList.map(item => item.id);
        return arrIds;
      } else {
        return [];
      }
    }
  },
  watch: {
    selectId(nval, oval) {
      this.editForm.goods_id = nval.join(",");
    }
  },
  data() {
    return {
      //显示图片
      urlShowDialogVisible: false,
      dialogImageUrl: "",
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      searchForm: {
        activityName: ""
      },
      search: {},
      handleName: "新增活动",
      action: this.$F.getUploadUrl() + "/edt/upload/upload_img",
      uploadData: {},
      form: {
        activityName: "", //活动名称 String 必填
        activityRemark: "", //活动描述 String 必填
        activityIcon: "", //活动图片 String 必填 eg:http//:xxx
        shelvesStatus: "0", //活动上下架状态  0正常 1已下架 int
        status: "0", //0正常 1已删除 int
        edtActivitySubJson: [] //子活动json数据 必填 String
      },
      goodList: [],
      dataListLoading: false,
      innerVisible: false,
      dataListSelections: [],
      editForm: {},
      tableData: [],
      visible: false,
      rules: {
        activityName: [
          { required: true, message: "活动名称不能为空", trigger: "change" }
        ],
        activityRemark: [
          { required: true, message: "活动描述不能为空", trigger: "change" }
        ],
        activityIcon: [
          { required: true, message: "活动图片不能为空", trigger: "change" }
        ]
      },
      //................................
      ids: "", //批量删除 需要上传参数
      courseTypes: [], //课程分类列表
      productList: [], //点击添加课程弹框  数据列表
      courseNumber: 0,
      courseForm: {
        contents: "", //课程名称
        channelId: "", //课程分类
        courseType: 2
      },
      multipleSelection: [], //存放选择的课程
      courseIds: [], //用来存放选择的课程的id
      courseImgs: [] //用来存放选择的课程的图片的url
    };
  },
  created() {
    this.fetchActiveList();
    this.uploadData = {
      imgModel: "1",
      platSource: 1006,
      userId: this.user.userId
    };
  },

  methods: {
    //点击叉，删除图片
    deletePng(index) {
      this.courseImgs.splice(index, 1);
      this.courseIds.splice(index, 1);
    },
    //选择课程弹框  点击确认按钮
    clickSureBtn() {
      this.innerVisible = false;
      for (let item of this.multipleSelection) {
        this.courseIds.push(item.id); //取得选择的课程的id
        this.courseIds = [...new Set(this.courseIds)];
        let obj = {};
        obj.id = item.id;
        obj.img = item.courseIcon;
        let panDing = this.courseImgs.some(function(value) {
          return value.id == obj.id;
        });
        if (panDing) {
          this.courseImgs = this.courseImgs;
        } else {
          this.courseImgs.push(obj); //取得选择的课程的图片url路径
        }
      }
      console.log(this.courseImgs);
    },

    //点击选择，多选或者单选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //添加课程弹框  点击查询
    fetchCourseList() {
      this.chooseList();
    },

    //点击添加课程
    addCourse(params = {}) {
      console.log(this.courseImgs);
      this.resetForm();
      this.innerVisible = true;
      this.courseType(); //通过请求公共字典，获得课程分类
      this.chooseList();
    },
    //请求选择课程列表接口
    chooseList(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, this.courseForm);
      this.$F.doRequest(this, "/edt/Admincourse/course_list", params, data => {
        this.productList = data.list;
        this.courseNumber = data.totalSize;
        // this.$refs.multipleTable.toggleRowSelection(1, true);
      });
    },
    //请求公共字典接口
    courseType(params = {}) {
      // this.$F.merge(params, {
      //   type: 26
      // });
      // this.$F.doRequest(this, "/edt/system/public_dict", params, data => {
      //   this.courseTypes = data;
      // });
      this.$F.getCourseTypes(null, 1, data => {
        this.courseTypes = data;
      });
    },
    //添加课程弹框  点击重置
    resetForm(query) {
      this.courseForm = {
        contents: "", //课程名称
        channelId: "", //课程分类
        courseType: 2
      };
      this.pageIndex = 1;
      this.pageSize = 10;
      if (query) this.chooseList();
    },
    /**添加规格 */
    addSubActive() {
      if (this.checkActives()) {
        this.form.edtActivitySubJson.push({ courseIds: ["123"] });
      } else {
        this.$message.info("请先将子活动信息填写完整");
      }
    },

    /**显示 */
    addCoupon(id) {
      this.editForm = {
        name: "",
        goods_id: "",
        end_time: "",
        min_price: 0,
        type: 1,
        min_munber: 0,
        is_all: "",
        start_time: "",
        image_url: "",
        number: ""
      };
      this.goodList = [];
      if (id) {
        get_gift_info({ id: id }).then(res => {
          if (res.code == 200) {
            this.editForm = {
              id: res.data.id,
              co_id: res.data.co_id || "",
              name: res.data.name,
              image_url: res.data.image_url,
              goods_id: res.data.goods_id,
              number: res.data.number,
              min_munber: res.data.min_munber || 0,
              min_price: res.data.min_price || 0,
              status: res.data.status,
              is_all: res.data.is_all,
              type: res.data.type
            };
            if (res.data.list) {
              this.goodList = res.data.list;
            }
          }
        });
      }
      this.visible = true;
    },

    checkActives() {
      const array = this.form.edtActivitySubJson.filter(temp => {
        return (
          !temp.subactivityName ||
          !temp.subactivityRemark ||
          !temp.subactivityIcon
        );
      });
      return array.length == 0;
    },

    //操作  点击删除
    delCoupon(activeId, params = {}) {
      this.$F.merge(params, {
        ids: activeId,
        status: 1
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/edt_activity_delete",
        params,
        data => {
          this.fetchActiveList();
          this.$message.info("删除成功");
        }
      );
    },
    /**编辑活动提交 */
    activeSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.checkActives() && this.form.edtActivitySubJson.length > 0) {
            const params = Object.assign({}, this.form);
            params.edtActivitySubJson = JSON.stringify(
              params.edtActivitySubJson
            );
            this.$F.doRequest(
              this,
              "/edt/adminsystem/edt_activity_save",
              params,
              data => {
                this.visible = false;
                this.fetchActiveList();
              }
            );
          } else {
            this.$message.info("请先将子活动信息填写完整");
          }
        }
      });
    },

    //改变上架状态
    changeStatus(row, val, params = {}) {
      this.$F.merge(params, {
        ids: row.id,
        shelvesStatus: val
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/edt_activity_modify",
        params,
        data => {
        }
      );
    },

    /** */
    selectItem(item) {
      if (this.selectId.includes(item.id)) {
        //includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
        //filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
        this.goodList = this.goodList.filter(function(ele) {
          return ele.id != item.id;
        });
        //this.arr=this.arr.filter((ele)=>ele!=i);
        //filter()为假时删除
      } else {
        this.goodList.push(item);
      }
    },

    enterKeyup() {
      document.addEventListener("keyup", event => {
        const code = event.keyCode
          ? event.keyCode
          : event.which
          ? event.which
          : event.charCode;
        if (code == 13) {
          this.fetchActiveList();
        }
      });
    },

    fetchActiveList() {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      this.$F.merge(params, this.searchForm);
      this.$F.doRequest(
        "",
        "/edt/adminsystem/edt_activity_list",
        params,
        data => {
          this.totalPage = data.totalSize;
          this.tableData = data.list;
        }
      );
    },

    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.fetchActiveList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.fetchActiveList();
    },
    selectionChangeHandle(val) {
      this.multipleSelection = val;
      // letselectionChangeHandle array = [];
      // for (let item of val) {
      //   array.push(item.id);
      // }
      // this.ids = array.join(",");
    },

    //上传图片需要用到方法
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.urlShowDialogVisible = true;
    },
    //上传成功回调
    mainPicSuccess: function(res, file, fileList, type, item, index) {
      if (res.code == 200) {
        if (type) {
          this.form.edtActivitySubJson[index].subactivityIcon = res.data;
          this.$set(
            this.form.edtActivitySubJson,
            index,
            this.form.edtActivitySubJson[index]
          );
          console.log(this.form);
          // this.$set(item, "subactivityIcon", res.data);
        } else this.form.activityIcon = res.data;
      } else {
        this.$message.error(res.message);
      }
    },
    beforeUpload(file) {
      return this.$F.beforeUpload(this, file, 2);
    },

    /**删除图片 */
    handleRemove(file, fileList, c) {
      this.form.contentIcon = fileList;
    }
  }
};
</script>

<style lang="less">
.el-button {
  font-size: 14px;
  border-radius: 8px;
  width: 124px;
  margin: 0 0 10px 10px;
}
.line {
  text-align: center;
  vertical-align: bottom;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}
.goodsBox {
  display: flex;
  flex-wrap: wrap;
}
.goodsPosition {
  width: 120px;
}
.goodsItems {
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  // background-color: #fff;
  p {
    line-height: 1;
    margin: 0;
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
  }
  .img {
    width: 40px;
    height: 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      color: #eb3941;
    }
  }
}
.goodsItem {
  display: flex;
  padding: 10px;
  width: 133px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  align-items: center;
  font-size: 12px;
  margin: 5px;
  cursor: pointer;
  &.checked {
    border: 2px solid #096dd9;
  }
  .img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.el-activeItem {
  height: auto;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 100%;
  line-height: 40px;
  outline: 0;

  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  .addBtn {
    margin-left: 10px;
  }
}
.activeItem {
  border-bottom: 1px solid #d8d8d8;
  padding: 0 10px;
}
.activeVal {
  display: flex;
  flex-wrap: wrap;
  .valTit {
    min-width: 60px;
    margin-right: 10px;
  }
  .inputBox {
    position: relative;
    margin-right: 10px;
    i {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
.flexP {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .avatars {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    position: relative;
    display: inline-block;
    .deleteIcon {
      position: absolute;
      right: -0;
      top: -0;
      line-height: 20px;
      color: #fff;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);

      text-align: center;
      width: 20px;
      height: 20px;
    }
  }
}
.parmarBtn {
  position: relative;

  display: inline-block;
  margin-right: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  line-height: 1;
  border: 1px solid rgba(199, 199, 199, 1);
  padding: 7px 15px;
  box-sizing: border-box;
  i {
    position: absolute;
    right: -5px;
    top: -5px;
    color: #d81e06;
    cursor: pointer;
  }
}
.slotImg {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.deleteImg {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 0;
  right: 0;
}
.divBox {
  display: inline-block;
  position: relative;
  width: 46px;
  height: 46px;
}


.active-events {
  display: flex;
  flex-direction: column;
}

.active-events .el-card__body, .active-events .el-table {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
