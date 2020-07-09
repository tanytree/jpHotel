<template>
  <div>
    <el-dialog :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-form label-width="80px" size="small" :rules="rules" ref="currentform" :model="form" >
      <el-form-item label="课程分类" prop="channelId">
        <el-select v-model="form.channelId">
          <el-option v-for="item in courseTypes" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程价格" prop="coursePrice">
        <el-input v-model="form.coursePrice"></el-input>
      </el-form-item>

      <el-form-item label="商品主图" prop="icon">
        <el-upload
          :action="action"
          :data="uploadData"
          :limit="6"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="showIcons"
          accept=".png, .jpg, .gif"
          :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">尺寸建议750*1000，大小2M以下，最多6张</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="主讲老师">
        <div class="el-specItem">
          <div v-for="(item, index) in form.teachers" :key="index" class="specItem">
            <div>
              <i @click="form.teachers.splice(index, 1)" class="el-icon-error"></i>
              主讲老师{{index + 1}}
            </div>
            <div>
              <div class="specVal">
                <span class="valTit">姓名</span>
                <el-input v-model="item.name" size="mini" style="width:100px"></el-input>
              </div>
              <div class="specVal">
                <span class="valTit">教师职称</span>
                <el-input v-model="item.teacherTitle" size="mini" style="width:100px"></el-input>
              </div>
              <div class="specVal">
                <span class="valTit">头像</span>
                <el-upload
                  class="avatar-uploader"
                  :action="action"
                  :data="uploadData"
                  :show-file-list="false"
                  :on-remove="handleRemove"
                  :on-preview="handlePictureCardPreview"
                  :before-upload="beforeUpload"
                  :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList,'teachers', index)"
                >
                  <img v-if="item.headimgurl" :src="item.headimgurl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </div>
          <el-button class="cancel" size="mini" icon="el-icon-plus" @click="addTeachers">新增讲师</el-button>
        </div>
      </el-form-item>

      <el-form-item label="座位录入" prop="arrangs">
        <div class="el-specItem">
          <div>
            <el-radio v-model="form.tryStatus" label="1">不可试看</el-radio>
            <el-radio v-model="form.tryStatus" label="2">可试看</el-radio>
            <label v-if="form.tryStatus == 2">
              <el-input
                style="width:200px;margin:0 10px"
                placeholder="填写可试看课时数"
                v-model="form.tryLength"
                :disabled="form.tryStatus != 2"
              ></el-input>默认从前往后
            </label>
          </div>
          <div v-for="(item,index) in form.arrangs" :key="index" class="specItem">
            <div>
              <i @click="form.arrangs.splice(index,1)" class="el-icon-error"></i>
              课程{{index+1}}
            </div>
            <div>
              <div class="specVal">
                <span class="valTit">名称</span>
                <el-input v-model="item.lectureTitle" size="mini" style="width:100px"></el-input>
              </div>
              <div class="specVal">
                <span class="valTit">文件</span>
                 <div style="margin-right:10px" v-if="item.lectureLink">{{item.lectureLink}}</div>
                <el-upload
                  class="upload-demo"
                  :action="fileAction"
                  accept=".mp4"
                  :data="fileUploadData"
                  :show-file-list="false"
                  :before-upload="beforeUploadFile"
                  :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList,'course', index, item)"
                >
                  <el-button v-if="!item.lectureLink" type="primary" class="defaultBtn" >上传课程</el-button>
                  <el-button v-if="item.lectureLink" type="primary" class="defaultBtn" >更新课程</el-button>
                  <!-- <el-button @click="browseAgreement(agreement, null, 'platformOnline')">浏览</el-button> -->
                </el-upload>

              </div>
            </div>
          </div>
          <el-button class="cancel" size="mini" icon="el-icon-plus" @click="addCourse">新增课程</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  props: ["courseTypes", "action", "uploadData"],
  components: {},
  computed: {
    ...mapState({
      user: state => state.user,
      token: state => state.user.token
    })
  },
  watch: {},
  data() {
    return {
      showIcons: [],
      fileAction: 'http://xxyweeds.top:8895/edt/upload/upload_video',   //文件上传的地址
      // fileAction: "", //文件上传的地址
      form: {
        tryStatus: "1",
        tryLength: "0",
        icon: [], //主图
        teachers: [], //老师
        arrangs: [], //课程
        channelId: "", //课程id
        coursePrice: "" //课程价格
      },
      //显示图片
      urlShowDialogVisible: false,
      dialogImageUrl: "",
      courseList: [],
        rules: {
            channelId : [ { required: true, message: "课程分类必选", trigger: "change" } ],
            icon : [ { required: true, message: "商品主图必填", trigger: "change" } ],
            coursePrice : [ { required: true, message: "课程价格必填", trigger: "change" } ],
            arrangs : [ { required: true, message: "课程安排必填", trigger: "change" } ]
        },
        fileUploadData: {},
    };
  },
  created() {
      this.fileUploadData = {
          imgModel: 2,
          platSource: 1005,
          userId: this.user.userId,
          videoModel: 2
      };
  },
  methods: {
    init() {
      this.showIcons = [];
      this.form = {
        tryStatus: "1",
        tryLength: "0",
        icon: [], //主图
        teachers: [], //老师
        arrangs: [], //课程
        channelId: "", //课程id
        coursePrice: "" //课程价格
      };
    },
    initProduct(data) {
        this.$refs["currentform"].resetFields();
        this.init();
      // * （2）****** 当前课程参数、活动项目课程参数 ********
      //     * @param channelId 课程分类 String 必填 从公共字典接口获取 type==1
      //     * @param coursePrice 课程价格 Double 必填
      //     * @param teachers 主讲老师json String ed:[{"name":"张三","headimgurl":"http://xxx","teacherTitle":"讲师"}]
      //     * 主讲老师json参数说明start****
      //     *  name 教师姓名 String 必填 多个教师按“,”分隔
      //     *  headimgurl 教师头像 String 必填  多个教师按“,”分隔
      //     *  teacherTitle 教师职称 String
      //     *  主讲老师json参数说明end****
      //     * @param arrangs 课程安排json String ed:[{"lectureTitle":"张三","lectureLink":"http://xxx"}]
      //     * 课程安排json参数说明start****
      //     *  lectureTitle 课程安排名称  String 必填
      //     *  lectureLink 视屏链接 String 必填 调用视屏上传接口获得路径
      //     * 课程安排json参数说明end****
      //     * @param tryStatus 试看状态 int 0不可试看 1可试看 必填
      //     * @param tryLength 可试看章节 ，可试看时必填
      if (data.edtCourse) {
        this.form = {
          icon: data.icon ? data.icon.split(",") : [],
          channelId: data.edtCourse.channelId,
          tryStatus: data.edtCourse.tryStatus ? data.edtCourse.tryStatus.toString() : '1',
          tryLength: data.edtCourse.tryLength || 0,
          coursePrice: data.edtCourse.coursePrice,
          arrangs: data.edtCourse.arranges || [],
          teachers: data.edtCourse.teachers || []
        };
        this.form.icon.forEach(item => {
          if (item && item.startsWith("http")) {
            this.showIcons.push({ url: item });
          }
        });
        this.form.icon = this.showIcons;
      }
      this.$forceUpdate();
    },

    returnForm() {
        debugger;
        let validStatus = false;
        this.$refs["currentform"].validate(valid => {
            if (valid) validStatus = true;
        })
        if (validStatus) {
            var object = {};
            Object.assign(object, this.form);
            object.teachers = JSON.stringify(this.form.teachers);
            object.arrangs = JSON.stringify(this.form.arrangs);
            return object;
        } else
            return false;
    },

    /**添加老师 */
    addTeachers() {
      this.form.teachers.push({ name: "", headimgurl: "", teacherTitle: "" });
    },
    /**添加课程 */
    addCourse() {
      this.form.arrangs.push({
        lectureTitle: "",
          lectureLink: ""
      });
    },
    //上传图片需要用到方法
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.urlShowDialogVisible = true;
    },

    //上传成功回调
    mainPicSuccess: function(res, file, fileList, type, index, item) {
      if (res.code == 200) {
        if (type) {
            debugger
            if (type == 'teachers') {
                this.form.teachers[index].headimgurl = res.data;
            } else {
                this.form.arrangs[index].lectureLink = res.data;
                this.$set(this.form.arrangs, index, this.form.arrangs[index]);
            }
        } else {
          this.form.icon.push({ url: res.data });
        }
      } else {
        this.$message.error(res.message);
      }
    },
      /*上传视频前*/
    beforeUploadFile(file) {
        const fileType = file.type,
            isMp4 = fileType.indexOf("mp4") != -1,
            isLt100M = file.size / 1024 / 1024 < 100;
        if (!isMp4) {
            this.$message.error("只能上传.mp4文件");
        }
        if (!isLt100M) {
            this.$message.error("只能上传小于100M视频");
        }
        return isMp4 && isLt100M;
    },
    beforeUpload(file) {
      return this.$F.beforeUpload(this, file, 2);
    },

    /**删除图片 */
    handleRemove(file, fileList) {
      this.form.icon = fileList;
    }
  }
};
</script>
<style lang="less">
</style>
