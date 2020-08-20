<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" @tab-click="changeTab" class="tabCenter">
      <el-tab-pane :label="$t('manager.hp_patternsSuccession')" name="handover">
        <div class="content">
          <div class="manage">
            <div class="manage-item" v-for="(item, index) in handData" :key="index">
              <div class="handTitle">
                <span class="square"></span>
                {{item.handoverType == 1 ? '前台部' : item.handoverType == 2 ? '餐饮部' : '商店部'}}交班设置
              </div>
              <el-form size="small" inline label-position="left">
                <div>
                  <el-form-item label="交班模式：">
                    <el-radio-group v-model="item.handoverStatus">
                      <el-radio :label="1">现金流模式</el-radio>
                      <el-radio :label="2">实收模式</el-radio>
                      <el-radio :label="3">应收模式</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="备用金：" v-if="item.handoverStatus == 1">
                    <el-input v-model="item.pettyCash"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="模式说明：" class="inline">
                  <el-input type="textarea" resize="none" :rows="3" v-model="item.remark"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="footer">
            <el-button type="primary" class="submit" @click="submit('hand')">保存</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班次管理" name="handManage">
        <div class="content">
          <div class="demo-form-inline">
            <el-radio-group v-model="handType.id" size="small" @change="radioChange">
              <el-radio-button
                v-for="(item, index) in handData"
                :key="index"
                :label="item.id"
              >{{item.handoverType == 1 ? '前台部' : item.handoverType == 2 ? '餐饮部' : '商店部'}}班次</el-radio-button>
            </el-radio-group>
            <el-button type="primary" class="submit" size="small" @click="popup_thing">新增</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="manageData"
            border
            height="100%"
            header-row-class-name="default"
            size="small"
            v-loading="loading"
          >
            <el-table-column prop="name" label="班次名称"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="popup_thing(scope.row)">编辑</el-button>
                <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="onConfirm(scope.row)">
                  <el-button slot="reference" type="text" size="small">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageForm.pageIndex"
              :page-size="pageForm.pageSize"
              :total="total"
              layout="total, prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </div>
        <el-dialog
          top="0"
          :title="addTypeTitle"
          :visible.sync="addTypeVisible"
          :close-on-click-modal="false"
        >
          <el-form :model="typeData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="班次名称" prop="name">
              <el-input v-model="typeData.name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-time-picker v-model="typeData.startTime" format="HH:mm" value-format="HH:mm"></el-time-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
              <el-time-picker v-model="typeData.endTime" format="HH:mm" value-format="HH:mm"></el-time-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="white" @click="addTypeVisible = false">取 消</el-button>
            <el-button class="submit" type="primary" @click="saveInfo">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "handover",
      handType: {},
      pageForm: {
        pageIndex: 1,
        pageSize: 10,
        paging: true,
      },
      loading: false,
      total: 0,
      manageData: [],
      addTypeVisible: false,
      typeData: {},
      addTypeTitle: "",
    };
  },
  props: {
    handData: Array,
    initData: Function,
  },
  methods: {
    changeTab(tab) {
      this.activeName = tab.name;
      debugger;
      if (tab.name == "handover") {
        this.initData();
      } else {
        this.handType = this.$F.deepClone(this.handData[0]);
        this.getDamageData();
      }
    },
    radioChange(val) {
      this.handType = this.$F.deepClone(
        this.handData.find((item) => item.id === val)
      );
      this.getDamageData();
    },
    getDamageData() {
      const params = {
        // id: this.handType.id,
        // handoverStatus: this.handType.handoverStatus,
        // pettyCash: this.handType.pettyCash,
        handoverType: this.handType.handoverType,
        // state: this.handType.state,
        // status: this.handType.status
      };
      this.$F.merge(params, this.pageForm);
      this.$F.doRequest(this, "/pms/handoverlog/list", params, (res) => {
        this.manageData = res.list;
        this.pageForm = {
          pageIndex: res.page.pageIndex,
          pageSize: res.page.pageSize,
          paging: true,
        };
        this.total = res.page.count;
      });
    },
    popup_thing(row) {
      this.addTypeVisible = true;
      if (row.id) {
        this.typeData = row;
        this.addTypeTitle = "编辑";
      } else {
        this.typeData = { name: "", startTime: "", endTime: "" };
        this.addTypeTitle = "新增";
      }
    },
    saveInfo() {
      const params = {
        id: this.typeData.id,
        name: this.typeData.name,
        handoverType: this.handType.handoverType,
        startTime: this.typeData.startTime,
        endTime: this.typeData.endTime,
      };
      this.$F.doRequest(this, "/pms/handoverlog/edit", params, (res) => {
        this.addTypeVisible = false;
        this.getDamageData();
      });
    },
    popup_kinds() {
      this.dialogAdd_kinds = true;
    },

    handleSizeChange() {},
    handleCurrentChange() {},
    onConfirm(row) {
      this.$F.doRequest(
        this,
        "/pms/handoverlog/delete",
        { id: row.id },
        (res) => {
          this.getDamageData();
        }
      );
    },
    submit(type) {
      if (type == "hand") {
        let arr = [];
        // debugger
        // this.handData.map(item => {
        // 	const obj = {handoverStatus: item.handoverStatus, pettyCash: item.pettyCash, handoverType: item.handoverType}
        // 	arr.push(obj);
        // })
        const params = {
          content: JSON.stringify(this.handData),
        };
        this.$F.doRequest(this, "/pms/handover/edit", params, (res) => {
          this.initData();
          this.$message({ message: "保存成功", type: "success" });
        });
      } else {
      }
    },
  },
};
</script>

<style lang="scss">
.tabCenter {
  padding: 10px;

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .demo-form-inline {
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .manage {
      flex: 1;
      height: 0;
      overflow: auto;

      .handTitle {
        color: #1e1e1e;
        margin-bottom: 12px;

        .square {
          height: 13px;
          width: 3px;
          border-radius: 5px;
          background: #126eff;
          display: inline-block;
          margin-right: 10px;
        }
      }
      .el-form-item.inline {
        width: 100%;
        margin-right: 0;

        .el-form-item__content {
          width: 1000px;
        }
      }
    }

    .footer {
      border-top: 1px solid #e2e2e2;
      line-height: 60px;
      padding: 0 20px;
    }
  }
}
</style>
