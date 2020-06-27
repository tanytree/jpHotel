<!--
 * @Date: 2020-03-16 11:36:13
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 09:42:05
 * @FilePath: /cloudAdmin/src/views/market/promotion/shop/coupon1.vue
 -->
<template>
  <div>
    <el-card v-loading="dataListLoading">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/promotion' }">店铺营销</el-breadcrumb-item>
          <el-breadcrumb-item>奖学金管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="奖学金" name="scholarship">
          <el-button @click="handleScholarship()" class="add-scholarship">新增奖学金</el-button>
          <el-table
              size="mini"
              :data="tableData"
              :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
            >
            <el-table-column prop="awardsTitle" label="奖学金标题"></el-table-column>
            <el-table-column label="奖学金金额" prop="awardsMoney"></el-table-column>
            <el-table-column prop="awardsRange" label="使用条件"></el-table-column>
            <el-table-column width="160px" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleScholarship(scope.row, scope.$index)" type="text">编辑</el-button>
                <el-button @click="deleteScholarship(scope.row)" type="text">删除</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="发放记录" name="scholarshipRecord">
          <scholarshipSendRecord ref="sendRecord"/>
        </el-tab-pane>
      </el-tabs>

    </el-card>
    <el-dialog :title="dialogTitle" width="650px" @close="formClose" :visible.sync="visible">
      <el-form ref="form" size="small" :rules="dataRule" :model="form" label-width="120px">
        <el-form-item label="奖学金标题" prop="awardsTitle">
          <el-input v-model="form.awardsTitle"></el-input>
        </el-form-item>
        <el-form-item label="奖学金金额  " prop="awardsMoney">
          <el-input v-model="form.awardsMoney" >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="使用条件" prop="awardsRange">
          <el-input style="width:100$" v-model="form.awardsRange">
            <template slot="prepend">订单总价满</template>
            <template slot="append">元</template>
          </el-input>
          <span>奖学金只限当前课程和活动课程使用哦</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="formClose">取消</el-button>
        <el-button size="small" type="primary" @click="scholarshopSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_coupon_info,
  addOredit_coupon,
  del_coupon
} from "@/utils/api/market";
import scholarshipSendRecord from "./scholarshipSendRecord";
export default {
    components: { scholarshipSendRecord},
    data() {
      return {
          dialogTitle: '新增奖学金',
          // 分页要素
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
          activeName: 'scholarship',
          handleType: 'add',   //操作类型 新增还是修改
          form: {
              awardsTitle: '', //标题
              awardsMoney: '', //获奖金额
              awardsRange: '', //使用范围
          },
          dataListLoading: false,
          dataListSelections: [],
          tableData: [],
          visible: false,
          dataRule: {
              awardsTitle: [
              { required: true, message: "标题不能为空", trigger: "change" }
            ],
              awardsMoney: [
              { required: true, message: "获奖金额不能为空", trigger: "change" }
            ],
              awardsRange: [
              { required: true, message: "使用范围不能为空", trigger: "change" }
            ],
          }
        };
    },
    activated() {
        this.fetchScholarshipList()
        this.enterKeyup();
    },
    methods: {
        /**显示 */
        handleScholarship(row = {}, index) {
            this.form = row;
            if (JSON.stringify(row) == '{}') {
                this.dialogTitle = '新增奖学金';
                this.form.index = index;
            } else
                this.dialogTitle = '编辑奖学金';
            this.visible = true;
        },

        formClose() {
            this.visible = false;
            this.$refs["form"].resetFields();
        },
        /**添加/修改 奖学金*/
        scholarshopSubmit() {
            console.log(this.form);
          this.$refs["form"].validate(valid => {
            if (valid) {
                // if () {}
                this.$F.doRequest(this, '/edt/Admincourse/edt_awards_save', this.form, (data) => {
                    this.pageIndex = 1;
                    this.formClose();
                    this.fetchScholarshipList();
                })
            }
          });
        },
        /**删除奖学金*/
        deleteScholarship(row) {
          this.$confirm(
            `确定删除奖学金【${row.awardsTitle}】?`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
              this.$F.doRequest(this, '/edt/Admincourse/edt_awards_delete', {edtAwardId: row.id}, (data) => {
                  this.$message.success(`删除奖学金【${row.awardsTitle}】成功`);
                  this.pageIndex = 1;
                  this.fetchScholarshipList()
              })
          });
        },

        enterKeyup () {
            document.addEventListener('keyup', (event) => {
                const code = event.keyCode
                    ? event.keyCode
                    : event.which
                        ? event.which
                        : event.charCode
                if (code == 13) {
                    this.fetchScholarshipList()
                }
            })
        },

        fetchScholarshipList () {
            const params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$F.doRequest(this, '/edt/Admincourse/edt_awards_list', params, (data) => {
                this.totalPage = data.totalSize
                this.tableData = data.list
                // this.totalPage = data
                // this.tableData = data
            })
        },

        // 每页数
        handleSizeChange (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.fetchScholarshipList()
        },
        // 当前页
        handleCurrentChange (val) {
            this.pageSize = 10
            this.pageIndex = val
            this.fetchScholarshipList()
        },
    }
};
</script>

<style>
  .add-scholarship {
    border: 1px solid #898b8e;
    margin: 10px 0;
  }
.line {
  text-align: center;
  vertical-align: bottom;
}
</style>
