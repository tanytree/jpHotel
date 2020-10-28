<!--
 * @Date: 2020-01-04 15:46:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 13:19:18
 * @FilePath: \jiudian\src\views\menuAssert\menuAssert.vue
 -->
<template>
  <div>
    <el-tree
      :data="data"
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      @node-click="nodeClick"
      :props="defaultProps"
    ></el-tree>
    <el-dialog
      top="0"
      :title="$t('manager.hp_editor')"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="selected" label-width="130px">
        <el-form-item label="icon：" prop="abstract">
          <el-input v-model="selected.icon"></el-input>
        </el-form-item>
        <el-form-item label="path：">
          <el-input v-model="selected.path"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-input v-model="selected.status"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="submit()">{{$t('commons.determine')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    let params = {
      type: 3,
    };
    this.$F.doRequest(this, "/pms/role/menu_list", params, (res) => {
      this.data = res;
    });
  },
  data() {
    return {
      selected: {},
      data: [],
      dialogTableVisible: false,
      defaultProps: {
        children: "childList",
        label: "menuTitle",
      },
    };
  },
  methods: {
    nodeClick(item, a, b) {
      this.selected = item;
      this.dialogTableVisible = true;
    },
    submit() {
      this.dialogTableVisible = false;
      let params = {
        menuId: this.selected.id,
        icon: this.selected.icon,
        path: this.selected.path,
        status: this.selected.status,
      };
      this.$F.doRequest(this, "/pms/freeuser/update_menu", params, (data) => {
        this.dialogTableVisible = false;
        this.$message.success("success");
      });
    },
  },
};
</script>
