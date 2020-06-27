<!--
 * @Date: 2020-03-20 10:52:01
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-25 13:22:33
 * @FilePath: /cloudAdmin/src/views/sale/contract/back.vue
 -->

<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item label="问题名称">
          <el-input v-model="form.titleName"></el-input>
        </el-form-item>
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
        <el-form-item style="float:right">
          <el-button type="primary" @click="queryCourseList(form)" plain>查询</el-button>
          <el-button type="primary" @click="resetForm" plain>重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        height="280"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;padding: 8px 0 ! important;"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="mini"
      >
        <el-table-column type="index" label="问题" width="100px"></el-table-column>
        <el-table-column prop="edtUser.userName" label="发布用户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="total" label="收到回复" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="发布时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" @click="dayiDetail(row)" size="mini">详情</el-button>
            <el-button type="text" @click="addReply(row)" size="mini">添加回复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:10px"></div>
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
    </el-card>

    <el-dialog
      title="详情"
      :close-on-click-modal="false"
      v-if="tracesShow"
      :visible.sync="tracesShow"
    >
      <div>
        <div class="title">问题标题</div>
        <div class="publish">发布人：{{problemDetali.edtUser.userName}}</div>
        <div class="content">{{problemDetali.commentContent}}</div>
        <div class="img_div">
          <img class="div_img" :src="problemDetali.answerIcon" alt="图片404" />
        </div>
        <div class="publishTime">发布时间：{{problemDetali.createTime}}</div>
      </div>

      <div class="replay">
        <div class="totalNumber">{{problemDetali.total}}条回复</div>
        <div class="scrollBox">
          <div class="box" v-for="item in problemDetali.answerCommentList" :key="item.id">
            <div class="flexBox">
              <img v-if="item.edtUser" :src="item.edtUser.headimgurl" />
              <img
                v-if="!item.edtUser"
                src="http://xxyweeds.top:8895/report/default/heardDefult.png"
              />
              <span v-if="item.edtUser">{{item.edtUser.nickname}}</span>
              <span v-if="!item.edtUser">管理员</span>
            </div>
            <div class="commentContent">{{item.commentContent}}</div>
            <div>{{item.pushishTime}}</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="添加回复" :close-on-click-modal="false" :visible.sync="addBullet">
      <textarea
        v-model="replyContent"
        style="margin:0 auto;width:100%;height:335px;padding:20px;resize:none;"
        placeholder="请填写回复内容（必填）"
      ></textarea>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="addBullet = false">取 消</el-button>
        <el-button type="primary" @click="clickSure()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get_list_list } from "@/utils/api/sale";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      company: state => state.company
    })
  },
  data() {
    return {
      replyContent: "", //回复内容
      answerId: "", //答疑id
      addBullet: false, //添加回复弹框
      tracesShow: false, //详情弹框
      problemDetali: "", //用来接收详情弹框中内容
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      tableData: [],
      dataListSelections: [],
      form: {
        titleName: "", //答疑标题模糊查询
        userName: "", //用户模糊查询
        startTime: "", //发布开始时间
        endTime: "" //发布结束时间
      }
    };
  },
  created() {
    this.resetForm();
    this.fetchGoodList();
  },
  methods: {
    //操作  添加回复
    addReply(row) {
      this.addBullet = true;
      this.answerId = row.id;
    },
    // 添加回复弹框  点击保存
    clickSure(params = {}) {
      if (this.replyContent) {
        this.$F.merge(params, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
        this.$F.merge(params, {
          answerId: this.answerId,
          content: this.replyContent
        });
        this.$F.doRequest(
          this,
          "/edt/adminsystem/answer_comment_save",
          params,
          data => {
            this.replyContent = "";
            this.addBullet = false;
            this.fetchGoodList();
          }
        );
      } else {
        return false;
      }
    },
    // 操作  点击详情
    dayiDetail(row) {
      this.tracesShow = true;
      this.problemDetali = row;
    },
    //点击重置
    resetForm(query) {
      this.form = {
        titleName: "", //答疑标题模糊查询
        userName: "", //用户模糊查询
        startTime: "", //发布开始时间
        endTime: "" //发布结束时间
      };
      this.pageIndex = 1;
      this.pageSize = 8;
      this.totalPage = 0;
      if (query) this.fetchGoodList();
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
      this.$F.doRequest(this, "/edt/adminsystem/answer_list", params, data => {
        this.tableData = data.list;
        this.totalPage = data.totalSize;
      });
    },

    // 每页数
    handleSizeChange(val) {
      console.log(val);

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
.title {
  color: #3a3a3a;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 10px;
}
.publish {
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
  text-align: left;
  margin-bottom: 10px;
}
.content {
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  margin-bottom: 20px;
}
.img_div,
.div_img {
  width: 80px;
  height: 80px;
}
.div_img {
  margin-right: 10px;
}
.publishTime {
  margin-top: 9px;
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
}
.replay {
  padding: 10px;
  margin-top: 11px;
  border-radius: 4px;
  border: 1px solid rgba(215, 215, 215, 1);
}
.totalNumber {
  color: rgba(21, 112, 255, 1);
  font-size: 14px;
}
.flexBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}
.flexBox img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.flexBox span {
  color: rgba(102, 102, 102, 1);
  font-size: 14px;
}
.commentContent {
  color: rgba(30, 30, 30, 1);
  font-size: 14px;
  margin: 10px 0;
}
.box {
  border-bottom: 1px solid rgba(231, 231, 231, 1);
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.scrollBox {
  height: 200px;
  overflow: scroll;
}
</style>