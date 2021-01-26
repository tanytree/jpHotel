<template>
  <div class="boss-index">
    <!-- 留言管理 -->
    <div class="content">
      <el-form :model="messageForm" inline size="small" ref="messageForm" class="term">
        <el-form-item :label="$t('desk.home_messageType') + ':'" style="display: block">
          <el-radio-group v-model="messageForm.type">
            <el-radio-button label="1">{{
              $t("desk.home_noLimit")
            }}</el-radio-button>
            <el-radio-button label="2" style="margin-left: 10px">{{
              $t("desk.home_myMessage")
            }}</el-radio-button>
            <el-radio-button label="3" style="margin-left: 10px">{{
              $t("desk.home_othersMessage")
            }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('desk.home_messContent') + ':'">
          <el-input v-model="messageForm.content"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_roomNum') + ':'">
          <el-input v-model="messageForm.roomNum"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_messEmployees') + ':'">
          <el-input v-model="messageForm.creatorName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_messTime') + ':'">
          <el-date-picker type="date" v-model="messageForm.startTime" value-format="yyyy-MM-dd"></el-date-picker>
          <span class="line">{{ $t("boss.report_toText") }}</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="messageForm.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="onSubmit">{{
            $t("commons.queryBtn")
          }}</el-button>
          <el-button class="white" @click="resetForm">{{
            $t("commons.resetBtn")
          }}</el-button>
        </el-form-item>
        <div>
          <el-button class="submit" size="small" type="primary" @click="newNote = true">{{ $t("desk.home_newAddMess") }}</el-button>
        </div>
      </el-form>
      <el-table :data="messageContents" style="width: 100%" border height="100%" header-row-class-name="default" size="small">
        <el-table-column prop="content" :label="$t('desk.home_messContent')" width="300"></el-table-column>
        <el-table-column :label="$t('desk.home_roomNum')" prop="roomNum"></el-table-column>
        <el-table-column :label="$t('desk.home_messEmployees')" prop="creatorName"></el-table-column>
        <el-table-column :label="$t('desk.home_messTime')" prop="createTime"></el-table-column>
        <el-table-column :label="$t('commons.operating')">
          <template slot-scope="{ row }">
            <el-button size="small" type="text" @click="noteDdetail(row)">{{
              $t("commons.detail")
            }}</el-button>
            <el-button size="small" type="text" @click="noteDelete(row)">{{
              $t("commons.delete")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </div>

    <!-- 留言详情 -->
    <el-dialog top="0" :title="$t('commons.detail')" style="text-align: left" v-if="notedetail" :visible.sync="notedetail">
      <el-row>
        <el-col :span="3">{{ $t("desk.home_roomNum") + ":" }}</el-col>
        <el-col :span="12">{{ messageDetail.roomNum }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">{{ $t("desk.home_messEmployees") + ":" }}</el-col>
        <el-col :span="12">{{ messageDetail.creatorName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">{{ $t("desk.home_messContent") + ":" }}</el-col>
        <el-col :span="12">{{ messageDetail.content }}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button style="width: 80px" type="primary" @click="notedetail = false">{{ $t("commons.close") }}</el-button>
      </div>
    </el-dialog>
    <!-- 新增留言 -->
    <el-dialog top="0" :title="$t('desk.home_newAddMess')" style="text-align: left" :visible.sync="newNote">
      <el-form ref="noteForm" :model="noteForm" :rules="newAddRule" label-width="100px">
        <el-form-item :label="$t('desk.home_roomNum') + ':'">
          <el-input style="width: 200px" v-model="noteForm.roomNum"></el-input>
        </el-form-item>
        <el-form-item :label="$t('desk.home_messContent') + ':'" prop="content">
          <el-input type="textarea" style="width: 500px" v-model="noteForm.content"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button style="width: 80px" @click="newNote = false">{{
            $t("commons.cancel")
          }}</el-button>
          <el-button style="width: 80px" type="primary" @click="noteSubmit('noteForm')">{{ $t("commons.determine") }}</el-button>
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
  computed: {
    newAddRule() {
      return {
        content: [
          {
            required: true,
            message: this.$t("desk.home_inputMessContent"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    // 查询按钮
    onSubmit() {
      this.pageIndex = 1;
      this.getMessageList();
    },
    // 重置
    resetForm() {
      this.messageForm = {
        type: 1,
        content: "",
        roomNum: null,
        creatorName: null,
        startTime: "",
        endTime: "",
      };
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
        this.notedetail = true;
      });
    },
    // 留言删除
    noteDelete(row) {
      this.$confirm(
        this.$t("desk.home_sureDelete"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.determine"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
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
                message: this.$t("desk.home_deleteSuccess"),
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
              this.$message.success(this.$t("desk.home_addSuccess"));
              this.newNote = false;
              this.noteForm = {};
              this.getMessageList();
            }
          );
        } else {
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
