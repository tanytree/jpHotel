<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 13:15:21
 * @FilePath: /cloudAdmin/src/views/sale/SaleBussness.vue
 -->

<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item label="发布用户">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="form.startTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
          <span style="margin:0 5px">--</span>
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyy-MM-dd"
            type="date"
            style="width:140px"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发布类型">
          <el-select v-model="form.videoTypeid">
            <el-option
              v-for="(item,index) in videoList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button @click="queryCourseList(form)" plain type="primary">查询</el-button>
          <el-button @click="resetForm" plain type="primary">重置</el-button>
        </el-form-item>
      </el-form>
      <el-tabs class="subTab" v-model="status" @tab-click="handleClick(status)">
        <el-tab-pane label="待审核" name="0"></el-tab-pane>
        <el-tab-pane label="未通过" name="2"></el-tab-pane>
        <el-tab-pane label="已通过" name="1"></el-tab-pane>
      </el-tabs>
      <div class="components-edit">
        <div class="components-table">
          <el-table
            height="280"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;padding: 8px 0 ! important;"
            :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
            v-loading="dataListLoading"
            size="mini"
            @selection-change="selectionChangeHandle"
          >
            <el-table-column type="index" label="主题" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="edtUser" label="发布用户" show-overflow-tooltip>
              <template slot-scope="{row}">
                <div>{{row.edtUser.userName}}</div>
                <div v-if="row.edtUser.memberType==0">普通用户</div>
                <div v-else-if="row.edtUser.memberType==2">超级会员</div>
                <div v-else>会员</div>
              </template>
            </el-table-column>
            <el-table-column prop="type_2" label="发布类型">
              <template slot-scope="{row}">
                <div>{{row.videoTypeName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="发布时间" show-overflow-tooltip></el-table-column>
            <el-table-column width="200" align="ceneter" label="操作">
              <template slot-scope="{row}">
                <el-button type="text" size="mini" @click="lookButton(row)">查看</el-button>
                <el-button v-if="status==0" type="text" size="mini" @click="auditButton(row)">审核</el-button>
                <el-button
                  v-if="status==2 || status == 1"
                  type="text"
                  size="mini"
                  @click="clickDelete(row)"
                {{$t('commons.delete')}}/el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="padding:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total,  prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog top="0" title="查看" v-if="lookBullet" :visible.sync="lookBullet">
      <div class="shareTitle">分享标题</div>
      <div class="publishPeople">发布人：{{lookRow.edtUser.nickName}}</div>
      <div>
        <video class="video" :src="lookRow.videoUrl"></video>
      </div>
      <div class="publishTime">发布时间：{{lookRow.createTime}}</div>
    </el-dialog>

    <el-dialog top="0" title="审核" :visible.sync="auditBullet">
      <el-radio-group v-model="radio" class="radioGroup">
        <el-radio :label="1" style="margin-right:40px">通过</el-radio>
        <el-radio :label="2">未通过</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditBullet = false">取 消</el-button>
        <el-button type="primary" @click="saveBtn()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_goods_list,
  edit_goods_status,
  del_goods_info
} from "@/utils/api/market";
export default {
  data() {
    return {
      videoId:"", //删除上传参数
      radio: 1, //审核弹框选择
      lookBullet: false, //查看弹框
      auditBullet: false, //审核弹框
      lookRow: "", //用来存放查看详情内容
      auditRow: "", //用来存放审核需要的参数
      videoList: [], //视频列表
      dialogTableVisible: false, //弹框
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      tableData: [],
      dataListLoading: false,
      dataListSelections: [],
      status: 0,
      form: {
        userName: "", //发布用户
        startTime: "",
        endTime: "",
        videoTypeid: "", //视频类型id 通过公共字典表接口 type= 7获取 id
        videoCheckType: 0 //审核状态 0待审核 1审核通过 2审核失败
      }
    };
  },
  created() {
    this.fetchGoodList();
    this.resetForm(); //一进来就要重置所有数据
    this.videoType(); //通过请求公共字典，获得视频类型id
  },
  methods: {
    //审核弹框  点击保存按钮
    saveBtn(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, {
        videoId: this.auditRow.id,
        videoCheckType: this.radio
      });
      this.$F.doRequest(this, "/edt/adminsystem/video_save", params, data => {
        this.auditBullet = false;
        this.fetchGoodList();
      });
    },
    //操作  查看
    lookButton(row) {
      this.lookBullet = true;
      this.lookRow = row;
    },
    //操作  审核
    auditButton(row) {
      this.radio = 1;
      this.auditRow = row;
      this.auditBullet = true;
    },
    //操作  删除
   clickDelete(row,params = {}) {
      this.videoId = row.id;
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, {
       videoId:this.videoId,
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/video_delete",
        params,
        data => {
         this.fetchGoodList();
        }
      );
    },
    //请求公共字典接口
    videoType(params = {}) {
      this.$F.merge(params, {
        type: 7
      });
      this.$F.doRequest(this, "/edt/system/public_dict", params, data => {
        this.videoList = data;
      });
    },
    //点击重置
    resetForm(query) {
      console.log(query);
      this.form = {
        userName: "", //发布用户
        startTime: "",
        endTime: "",
        videoTypeid: "", //视频类型id 通过公共字典表接口 type= 7获取 id
        videoCheckType: this.status, //审核状态 0待审核 1审核通过 2审核失败
      };
      console.log(this.form);
      this.pageIndex = 1;
      this.pageSize = 8;
      this.totalPage = 0;
      if (query) this.fetchGoodList();
    },

    /**删除 */
    deleteHandle(data) {
      var ids =
        data && data.id
          ? [data.id]
          : this.dataListSelections.map(item => {
              return item.id;
            });
      var nameS =
        data && data.title
          ? [data.title]
          : this.dataListSelections.map(item => {
              return item.title;
            });
      this.$confirm(
          (data && data.id) ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        this.$t('commons.tip_desc'),
        {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.newApi("/home/market/goods/del_goods_info"),
            method: "post",
            data: this.$http.adornData({ id: ids })
          }).then(data => {
            if (data && data.code == 200) {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.fetchGoodList();
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        })
        .catch(() => {});
    },
    changeMStatus(status) {
      var ids = this.dataListSelections.map(item => {
        return item.id;
      });
      this.changeStatus(ids.join(","), status);
    },

    /*点击切换*/
    handleClick(status) {
      this.form.videoCheckType = status;
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    //点击查询
    queryCourseList(form) {
      console.log(form);
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    /**获取列表数据 */
    fetchGoodList(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, this.form);
      this.$F.doRequest(this, "/edt/adminsystem/video_list", params, data => {
        this.tableData = data.list;
        this.totalPage = data.totalSize;
      });
    },
    // 每页数
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.fetchGoodList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.pageSize = 8;
      this.pageIndex = val;
      this.fetchGoodList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },

    authCheckAble(row) {
      return row.shelvesStatus !== 0;
    }
  }
};
</script>
<style lang="less" scoped>
.components-edit {
  margin-top: 10px;

  .components-table {
    border: 1px solid #e6e6e6;
  }
  .block {
    padding: 10px 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-all {
      font-size: 12px;
      color: #666666;
      letter-spacing: 2px;
    }
  }
}
.shareTitle {
  color: rgba(51, 51, 51, 1);
  font-size: 16px;
  margin-bottom: 10px;
}
.publishPeople {
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
}
.video {
  width: 100%;
  height: 370px;
}
.publishTime {
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
}
.radioGroup {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
