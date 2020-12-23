<template>
  <div class="boss-index">
    <div class="flex_row">
      <div class="goodsType">
        <div class="goodsTop" style="margin-bottom: 20px">
          <el-button
            class="cancel"
            :icon="!isexpand ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"
            @click="expanded(1)"
            >{{ $t("manager.grsl_foldAll") }}</el-button
          >
          <el-button class="cancel" @click="addFirstClass">{{
            $t("manager.grsl_addFirstGroup")
          }}</el-button>
        </div>
        <div class="accountBtm">
          <el-tree
            :data="memberTypeList"
            :props="treeProps"
            node-key="id"
            ref="treeType"
            default-expand-all
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  v-if="data.hierarchy == 1"
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="addSecond(node, data)"
                  @click.stop
                  >{{$t('manager.grsl_addSecondGroup')}}</el-button
                >
                <el-button
                  v-if="data.hierarchy == 2"
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="Newdata(node, data)"
                  @click.stop
                  >{{$t('manager.grsl_newMemberType')}}</el-button
                >
                <el-button
                  v-if="data.state == 2 && data.hierarchy == 3"
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="() => startUse(node, data)"
                  @click.stop
                  >{{$t('manager.hk_enable')}}</el-button
                >
                <el-button
                  v-if="data.state == 1 && data.hierarchy == 3"
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="disabledUse(node, data)"
                  @click.stop
                  >{{$t('manager.hk_disable')}}</el-button
                >
                <el-button
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="editNode(node, data)"
                  @click.stop
                  >{{ $t("manager.hp_editor") }}</el-button
                >
                <el-button
                  class="btn-text"
                  type="text"
                  size="mini"
                  @click="() => deleteNode(data)"
                  @click.stop
                  >{{ $t("commons.delete") }}</el-button
                >
              </span>
            </div>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 新增分类 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="addVisible"
      top="0"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form
        label-position="right"
        :model="addForm"
        label-width="120px"
        size="medium"
      >
        <el-form-item :label="$t('manager.grsl_firstGroupName')+':'">
          <el-input
            v-model="addForm.first"
            :disabled="addForm.hierarchy == 1 ? false : true"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.grsl_secondGroupName')+':'" v-if="addForm.hierarchy == 2">
          <el-input v-model="addForm.second"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="blueBtn mini" @click="submit()">{{
          $t("commons.confirm")
        }}</el-button>
        <el-button class="defaultBtn mini" @click="addVisible = false">{{
          $t("commons.cancel")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemNode: null, //每一个节点的node信息
      itemData: null, //每一个节点的数据
      type: null,
      memberTypeList: [],
      treeProps: { children: "memberTypeList", label: "name" },
      addVisible: false, // 新增分类弹框
      dialogTitle: "", //dialog 的 title
      addForm: {
        //新增表单
        first: "", //一级目录
        second: "", //二级目录
        hierarchy: null, //目录级别 1为一级目录；2为二级目录；3为会员类型
        name: "",
        level: null,
        prices: "",
        /////////
        id: "",
        parentId: "",
      },
      itemInfo: null,
      isexpand: true,
    };
  },

  mounted() {
    this.getMemTypeList();
  },
  methods: {
    getMemTypeList() {
      this.$F.doRequest(this, "/pms/membertype/list", {}, (res) => {
        console.log(res);
        this.memberTypeList = res.list;
      });
    },
    innitData() {
      this.addForm = {
        //新增表单
        first: "", //一级目录
        second: "", //二级目录
        hierarchy: null, //目录级别 1为一级目录；2为二级目录；3为会员类型
        name: "",
        level: null,
        prices: "",
        /////////
        id: "",
        parentId: "",
      };
    },
    //点击新增一级分类按钮
    addFirstClass() {
      this.innitData();
      this.type = "addFirst";
      this.addVisible = true;
      this.addForm.hierarchy = 1;
      this.dialogTitle = this.$t('manager.grsl_addFirstGroup');
    },
    //点击新增二级分类按钮
    addSecond(node, data) {
      this.innitData();
      this.type = "addSecond";
      this.addVisible = true;
      this.addForm.hierarchy = 2;
      this.addForm.first = data.name;
      this.dialogTitle = this.$t('manager.grsl_addSecondGroup');
      this.itemInfo = data;
    },
    //点击 编辑 按钮
    editNode(node, data) {
      this.innitData();
      console.log(data);
      this.type = "editor";
      this.itemNode = node;
      this.itemData = data;
      if (data.hierarchy == 1) {
        this.addVisible = true;
        this.addForm.hierarchy = 1;
        this.dialogTitle = this.$t('manager.grsl_editorOneClass');
        this.addForm.first = data.name;
      } else if (data.hierarchy == 2) {
        this.addVisible = true;
        this.addForm.hierarchy = 2;
        this.dialogTitle =  this.$t('manager.grsl_editorTwoClass');
        this.addForm.first = node.parent.data.name;
        this.addForm.second = data.name;
      } else {
        this.$router.push({
          path: "/newdetail",
          query: {
            node: node,
            data: data,
            type: "editor",
          },
        });
      }
    },
    //点击启用按钮
    startUse(node, data) {
      this.$confirm(this.$t('manager.grsl_sureEnable'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      }).then(() => {
        let params = {
          id: data.id,
          state: 2,
        };
        this.$F.doRequest(
          this,
          "/pms/membertype/enable_disable",
          params,
          (res) => {
            this.getMemTypeList();
          }
        );
      });
    },
    //点击禁用按钮
    disabledUse(node, data) {
      this.$confirm(this.$t('manager.grsl_sureDisable'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      }).then(() => {
        let params = {
          id: data.id,
          state: 1,
        };
        this.$F.doRequest(
          this,
          "/pms/membertype/enable_disable",
          params,
          (res) => {
            this.getMemTypeList();
          }
        );
      });
    },

    addThird(node, data, type) {
      this.cateVisible = true;
      this.category.categoryLevel = 3;
      this.category.pCategoryId = data.id;
      this.category.first = node.parent.data.name;
      this.category.second = data.name;
      this.category.third = "";
      this.cateTitle = this.addThridGroup;
      this.categoryType = type;
      this.add = true;
    },
    Newdata(node, data) {
      this.$router.push({
        path: "/newdetail",
        query: {
          node: node,
          data: data,
        },
      });
    },
    expanded: function (type) {
      console.log(this.isexpand);
      this.isexpand = !this.isexpand;
      if (type == 1) {
        for (
          var i = 0;
          i < this.$refs.treeType.store._getAllNodes().length;
          i++
        ) {
          this.$refs.treeType.store._getAllNodes()[i].expanded = this.isexpand;
        }
      } else {
        for (
          var i = 0;
          i < this.$refs.serviceType.store._getAllNodes().length;
          i++
        ) {
          this.$refs.serviceType.store._getAllNodes()[
            i
          ].expanded = this.isexpand;
        }
      }
    },

    //删除
    deleteNode: function (data) {
      this.$confirm(this.$t('manager.grsl_ifSureDelete'), this.$t('commons.tip_desc'), {
        confirmButtonText: this.$t('commons.confirm'),
        cancelButtonText: this.$t('commons.cancel'),
        type: "warning",
      }).then(() => {
        this.$F.doRequest(
          this,
          "/pms/membertype/delete",
          { id: data.id },
          (res) => {
          	this.$message.success(this.$t('commons.delete_success'));
            this.getMemTypeList();
          }
        );
      });
    },
    submit() {
      if (this.type == "editor") {
        if (this.addForm.hierarchy == 1) {
          this.addForm.name = this.addForm.first;
          this.addForm.id = this.itemData.id;
        } else if (this.addForm.hierarchy == 2) {
          this.addForm.name = this.addForm.second;
          this.addForm.parentId = this.itemNode.parent.data.id;
          this.addForm.id = this.itemData.id;
        }
        this.$F.doRequest(this, "/pms/membertype/edit", this.addForm, (res) => {
          this.$message.success(this.$t('manager.hk_resetSuccess'));
          this.addVisible = false;
          this.getMemTypeList();
        });
      } else {
        if (this.addForm.hierarchy == 1) {
          this.addForm.id = "";
          this.addForm.name = this.addForm.first;
        } else if (this.addForm.hierarchy == 2) {
          this.addForm.id = "";
          this.addForm.name = this.addForm.second;
          this.addForm.parentId = this.itemInfo.id;
        }
        this.$F.doRequest(this, "/pms/membertype/edit", this.addForm, (res) => {
             this.$message.success(this.$t('manager.hk_newSuccess'));
          this.addVisible = false;
          this.getMemTypeList();
        });
      }
    },
  },
};
</script>

<style lang="less" scope>
.goodsType {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #e4e7ea;
  border-radius: 8px;
  padding: 20px;
  margin: 0 10px;
  max-height: 100%;

  .el-tree {
    background: transparent;

    & > .el-tree-node {
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 6px;
    }

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }

    .el-tree-node__content {
      height: 54px;
      border-bottom: 1px solid #dfdfdf;
      color: #333;
    }
  }

  .goodsTop {
    padding: 20px;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    line-height: 38px;

    > span {
      margin-right: 20px;
    }
  }

  .accountBtm {
    padding: 0;
    overflow: auto;
  }
}
</style>
