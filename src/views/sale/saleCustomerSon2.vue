<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 15:35:46
 * @FilePath: /cloudAdmin/src/views/sale/SaleCustomer.vue
 -->
<template>
  <div>
    <el-card>
      <el-form inline size="small">
        <el-form-item>
          <el-input placeholder="请输入用户名称" v-model="form.content" class="input-with-select">
            <el-button slot="append" @click="queryCourseList(form)">查询</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="form.applyType" @change="queryCourseList(form)">
            <el-radio :label="0">待审核</el-radio>
            <el-radio :label="2">审核未通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-table
        height="400"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;padding: 8px 0 ! important;"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
        size="mini"
      >

        <el-table-column type="index"  width="100px" label="全选" style="width:200px"></el-table-column>
        <el-table-column prop="edtUser.userName" label="用户姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="edtUser.phone" label="联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="edtUser.createTime" label="申请时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="applyType" label="审核状态" show-overflow-tooltip>
          <template slot-scope="{row}">
            <div v-if="row.applyType==0">待审核</div>
            <div v-if="row.applyType==2">审核未通过</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope={row}>
            <el-button size="mini"  v-if="row.applyType==0" @click="clickCheck(row)">审核</el-button>
            <el-button size="mini" v-if="row.applyType==2" @click="clickDelete(row)">{{$t('commons.delete')}}</el-button>
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
    <el-dialog top="0" title="审核" :visible.sync="checkButton"  width="746px">
      <el-radio-group v-model="bulletApplyType" style="text-align:center">
        <el-radio :label="1">通过</el-radio>
        <el-radio :label="2">未通过</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="checkButton = false">取 消</el-button>
        <el-button type="primary" @click="determine()">确 定</el-button>
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
      checkId:"",  //申请ID
      checkButton:false,   //点击审核弹框
      bulletApplyType:1,
      userInformation: "", //点击详情时，用来存放详情内容
      dialogTableVisible: false, //弹框
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      tableData: [],
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {
        applyType: 0, //审核状态  刚进来就是待审核状态
        content: "" //模糊查询
      }
    };
  },
  created() {
    this.fetchGoodList();
  },
  methods: {
    //点击删除
    clickDelete(row,params = {}) {
      this.checkId = row.id;
      console.log(this.checkId);
      console.log(this.checkId);
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, {
        applyType:this.bulletApplyType,
        id:this.checkId,
        status:2,
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/user_member_save",
        params,
        data => {
         this.fetchGoodList();
        }
      );
    },
    //审核弹框，点击确定
    determine(params = {}) {
      this.$F.merge(params, {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.$F.merge(params, {
        applyType:this.bulletApplyType,
        id:this.checkId,
      });
      this.$F.doRequest(
        this,
        "/edt/adminsystem/user_member_save",
        params,
        data => {
         this.checkButton = false;
         this.fetchGoodList();
        }
      );
    },
    //点击审核
    clickCheck(row){
      this.checkButton = true;
      this.checkId = row.id;
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
      this.$F.doRequest(
        this,
        "/edt/adminsystem/user_member_list",
        params,
        data => {
          this.tableData = data.list;
          this.totalPage = data.totalSize;
        }
      );
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
