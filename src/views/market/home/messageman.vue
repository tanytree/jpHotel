<template>
  <div class="boss-index">
    <!-- 留言管理 -->
    <div class="content">
      <el-form :model="messageForm" inline size="small" ref="messageForm" class="term">
        <el-form-item label="留言类型：" style="display: block">
          <el-radio-group v-model="messageForm.type">
            <el-radio-button label="1">不限</el-radio-button>
            <el-radio-button label="2" style="margin-left:10px">我的留言</el-radio-button>
            <el-radio-button label="3" style="margin-left:10px">他人留言</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="留言内容：">
          <el-input v-model="messageForm.content"></el-input>
        </el-form-item>
        <el-form-item label="房间号：">
          <el-input v-model="messageForm.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="留言员工：">
          <el-input v-model="messageForm.creatorName"></el-input>
        </el-form-item>
        <el-form-item label="留言时间：">
          <el-date-picker type="date" v-model="messageForm.startTime"></el-date-picker>
          <span class="line">至</span>
          <el-date-picker type="date" v-model="messageForm.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="onSubmit">查询</el-button>
          <el-button class="white" @click="resetForm">重置</el-button>
        </el-form-item>
        <div>
          <el-button class="submit" size="small" type="primary" @click="newNote=true">新增留言</el-button>
        </div>
      </el-form>
      <el-table
        :data="messageContents"
        style="width: 100%"
        border
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column prop="content" label="留言内容" width="300"></el-table-column>
        <el-table-column label="房间号" width="180" prop="roomNum"></el-table-column>
        <el-table-column label="留言员工" width="180" prop="creatorName"></el-table-column>
        <el-table-column label="留言时间" width="180" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button size="small" type="text" @click="noteDdetail(row)">详情</el-button>
            <el-button size="small" type="text" @click="noteDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 留言详情 -->
    <el-dialog
      top="0"
      title="详情"
      style="text-align:left"
      v-if="notedetail"
      :visible.sync="notedetail"
    >
      <el-row>
        <el-col :span="3">房间号：</el-col>
        <el-col :span="12">{{messageDetail.roomNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">员工留言：</el-col>
        <el-col :span="12">{{messageDetail.creatorName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">留言内容：</el-col>
        <el-col :span="12">{{messageDetail.content}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button style="width:80px;" type="primary" @click="notedetail = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 新增留言 -->
    <el-dialog top="0" title="新增留言" style="text-align:left" :visible.sync="newNote">
      <el-form ref="noteForm" :model="noteForm" :rules="newAddRule" label-width="80px">
        <el-form-item label="房间号：">
          <el-input style="width:200px" v-model="noteForm.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="留言内容" prop="content">
          <el-input type="textarea" style="width:500px" v-model="noteForm.content"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button style="width:80px;" @click="newNote = false">取消</el-button>
          <el-button style="width:80px;" type="primary" @click="noteSubmit('noteForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      currentPage4: 1, //分页当前所在页数的位置
      notedetail: false, // 留言详情
      messageDetail: null,
      newNote: false, //新增留言按钮
      // 留言内容
      messageContents: [],
      newAddRule: {
        content: [
          {
            required: true,
            message: "请输入留言内容",
            trigger: "blur",
          },
        ],
      },
      // 新增留言
      noteForm: {
        roomNum: "",
        content: "",
      },
      messageForm: {
        type: 1,
        content: "",
        roomNum: null,
        creatorName: null,
        startTime: "",
        endTime: "",
      },
      formLabelWidth: "120px",
      display: true,
      input: "", //搜索框
      activeThree: "a",
      currentPage3: "",
    };
  },
  created() {
    this.getMessageList();
  },
  methods: {
    // 查询按钮
    onSubmit() {
      this.pageIndex = 1;
      this.getMessageList();
    },
    // 重置
    resetForm() {
      this.messageForm = {};
      this.messageForm.type = 1;
      this.pageIndex = 1;
      this.getMessageList();
    },
    //请求 留言列表 接口
    getMessageList(params = {}) {
      this.$F.merge(params, {
        paging: true,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.$F.merge(params, this.messageForm);
      this.$F.doRequest(this, "/pms/hotelguestnote/list", params, (data) => {
        console.log(data);
        this.messageContents = data.list;
        this.total = data.page.count;
      });
    },
    // 留言详情
    noteDdetail(row) {
      let params = {
        id: row.id,
      };
      this.$F.doRequest(this, "/pms/hotelguestnote/findone", params, (data) => {
        console.log(data);
        this.messageDetail = data;
      });
    },
    // 留言删除
    noteDelete(row) {
      this.$confirm("确认删除该单位", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          this.$F.doRequest(
            this,
            "/pms/hotelguestnote/delete",
            params,
            (data) => {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getMessageList();
            }
          );
        })
        .catch(() => {});
    },
    // 新增留言
    noteSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {};
          this.$F.merge(params, this.noteForm);
          this.$F.doRequest(
            this,
            "/pms/hotelguestnote/edit",
            params,
            (data) => {
              this.$message.success("新增留言成功");
              this.newNote = false;
              this.noteForm = {};
              this.getMessageList();
            }
          );
        } else {
          this.$message.error("留言失败");
          return false;
        }
      });
    },

    handleCurrentChange(val) {
      this.pageSize = 10;
      this.pageIndex = val;
      this.getMessageList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getMessageList();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
