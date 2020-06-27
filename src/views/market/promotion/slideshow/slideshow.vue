<!--
    限时购
 * @Date: 2020-03-16 10:52:48
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 09:59:47
 * @FilePath: /cloudAdmin/src/views/market/promotion/slideshow/slideshow.vue
 -->

<template>
  <!-- 产品列表 -->
  <div class="sec1">
    <el-card  v-loading="dataListLoading">
      <el-form :model="form" :inline="true" size="small">
        <el-form-item label="轮播图标题">
          <el-input v-model="form.content" style="width:150px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="fetchSlideList" type="primary">查询</el-button>
          <el-button @click="resetForm(true)" type="primary">重置</el-button>
        </el-form-item>
        <el-form-item class="add">
          <el-button @click="handle('')" type="primary">新增轮播图</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px"></div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        size="mini"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column align="left" prop="title" label="轮播图标题" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" prop="imgOrder" label="轮播图序列" show-overflow-tooltip></el-table-column>
        <el-table-column align="left" label="开启">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
              @change="val=>changeStatus(scope.row, scope.$index, val)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="操作" >
          <template slot-scope="scope">
<!--            <el-button type="text" size="mini" @click="handle(scope.row, 'show')">详情</el-button>-->
            <el-button type="text" size="mini" @click="handle(scope.row, scope.$index)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteHandle(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>

      <el-dialog :title="handleTitle" width="650px" @close="formClose" :visible.sync="visible">
        <el-form ref="editForm" size="small" :rules="rules" :model="editForm" label-width="120px">
          <el-form-item label="轮播图标题" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="轮播图链接" prop="paras">
            <el-input v-model="editForm.paras"></el-input>
          </el-form-item>
          <el-form-item label="轮播图序号" prop="imgOrder">
            <el-input v-model="editForm.imgOrder"></el-input>
          </el-form-item>
          <el-form-item label="轮播图图片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              accept=".png, .jpg, .gif"
              :action="action"
              :data="uploadData"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)"
            >
              <img v-if="editForm.imgUrl" :src="editForm.imgUrl" class="avatar" style="height:146px;width:146px;margin-right:5px;display:inline-block"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="editForm.status">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">不开启</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose">取消</el-button>
        <el-button size="small" type="primary" @click="submit()">确定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  get_ac_goods_list,
  edit_goods_status,
  del_goods_info
} from "@/utils/api/market";
import httpRequest from "@/utils/httpRequest";
export default {
  props: ['action', 'uploadData'],
  data() {
    return {
        visible: false,
        checked: false,
        tableData: [],
        handleTitle: '新增轮播图',
        editForm: {
          imgUrl: ''
        },
        dataListLoading: false,
        dataListSelections: [],
        form: {
            content: ''
        },
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        rules: {
            title: [
                { required: true, message: "标题不能为空", trigger: "change" }
            ],
            imgUrl: [
                { required: true, message: "图片不能为空", trigger: "change" }
            ],
            imgOrder: [
                { required: true, message: "序号不能为空", trigger: "change" }
            ],
            paras: [
                { required: true, message: "链接不能为空", trigger: "change" }
            ],
        }
    };
  },
  created() {
      this.resetForm();
      this.fetchSlideList()
      this.enterKeyup();
  },
  methods: {
      submit() {
          this.$refs["editForm"].validate(valid => {
              if (valid) {
                  this.onSave(()=> {
                      this.formClose()
                      this.$message.success('保存轮播图成功');
                      this.pageIndex = 1;
                      setTimeout(()=>{
                          this.fetchSlideList();
                      }, 1200)
                  })
              }
          })
      },

      //轮播图状态切换
      changeStatus(item, index, val) {
          item.status = val;
          this.onSave(()=> {
            this.$set(this.tableData, index, item);
          }, item);
      },

      onSave(callback, params) {
          this.$F.doRequest(this, '/edt/adminsystem/bannerSave', params || this.editForm, (data) => {
              callback();
          })
      },
      formClose() {
          this.visible = false;
          this.$refs['editForm'].resetFields();
      },
    /**新增 / 修改 */
    handle(item, index) {
        if (! item) {
            this.handleTitle = '新增轮播图';
            this.editForm.status = 1;
            this.editForm.imgUrl = '';
        } else {
            this.handleTitle = '修改轮播图';
            this.editForm.index = index;
            this.editForm = item;
        }
        this.visible = true;
    },
    /**删除 */
    deleteHandle(row, index) {
      this.$confirm(
            `确定删除轮播图[${row.title}]`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
          this.$F.doRequest(this, '/edt/adminsystem/bannerDelete', {id: row.id}, (data) => {
              this.tableData.splice(index, 1);
              this.$message.success('删除成功');
          })
        })
        .catch(() => {});
    },


      enterKeyup () {
          document.addEventListener('keyup', (event) => {
              const code = event.keyCode
                  ? event.keyCode
                  : event.which
                      ? event.which
                      : event.charCode
              if (code == 13) {
                  this.fetchSlideList()
              }
          })
      },

      resetForm(query) {
          this.form = {};
          this.pageIndex = 1;
          this.pageSize = 10;
          this.totalPage = 0;
          if (query)
              this.fetchSlideList();
      },

      fetchSlideList () {
          const params = {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
          }
          this.$F.merge(params, this.form);
          this.$F.doRequest(this, '/edt/adminsystem/bannerList', params, (data) => {
              this.totalPage = data.totalSize
              this.tableData = data.list
          })
      },

      // 每页数
      handleSizeChange (val) {
          this.pageSize = val
          this.pageIndex = 1
          this.fetchSlideList()
      },
      // 当前页
      handleCurrentChange (val) {
          this.pageSize = 10
          this.pageIndex = val
          this.fetchSlideList()
      },

      //上传图片需要用到方法
      //预览图片
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.urlShowDialogVisible = true;
      },
      //上传成功回调
      mainPicSuccess: function (res, file, fileList) {
          if (res.code == 200) {
              this.editForm.imgUrl = res.data;
          } else {
              this.$message.error(res.message);
          }
      },
      beforeUpload (file) {
          return this.$F.beforeUpload(this, file, 2)
      },

      /**删除图片 */
      handleRemove(file, fileList, c) {
          this.form.contentIcon = fileList;
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .add {
    float: right;
  }
  .add .el-button {
    font-size: 16px;
    padding: 12px;
  }
</style>
