<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{children: 'departmentList', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="storesName" :label="$t('boss.store_storeName')" width="300">
          <template slot-scope="scope">{{scope.row.storesName || scope.row.name}}</template>
        </el-table-column>
        <el-table-column prop="groupName" :label="$t('boss.personnel_department')"></el-table-column>
        <el-table-column :label="$t('commons.operating')" width="220">
          <template slot-scope="{row}">
            <el-button
              type="text"
              v-if="!row.isChild"
              size="mini"
              @click="addHandle(row)"
            >{{$t('boss.personnel_addDepart')}}</el-button>
            <el-button
              type="text"
              v-if="row.isChild"
              size="mini"
              @click="editHandle(row)"
            >{{$t('manager.hp_editor')}}</el-button>
            <el-button
              type="text"
              v-if="row.isChild"
              size="mini"
              @click="deleteItem(row)"
            >{{$t('commons.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加部门 -->
    <el-dialog
      top="0"
      :title="addAndEditForm.type=='add'?$t('boss.personnel_addDepart'):$t('boss.personnel_editDepart')"
      :visible.sync="adddepart"
      width="30%"
    >
      <el-form :rules="rules" :model="addAndEditForm" ref="adddepart">
        <el-row>{{addAndEditForm.storeName}}:</el-row>
        <el-form-item
          :label="$t('boss.department_name')+':'"
          style="margin-left:10px;margin-top:30px"
          prop="name"
        >
          <el-input style="width:200px" autocomplete="off" v-model="addAndEditForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddepart = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="submitFn">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      adddepart: false,
      tableData: [],
      addAndEditForm: {
        type: "add",
        storeName: "",
        storesNum: "",
        name: "",
        departmentId: null,
      },
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "请输入部门名称",
          },
        ],
      },
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    initForm() {
      this.getDataList();
    },
    getDataList() {
      let that = this;
      this.$F.doRequest(
        this,
        "/pms/department/department_store_list",
        this.searchForm,
        (res) => {
          let data = res;
          for (let k in data) {
            data[k].id = k;
            if (data[k].departmentList.length) {
              data[k].hasChildren = false;
              for (let j in data[k].departmentList) {
                data[k].departmentList[j].stores_Name = data[k].storesName;
                data[k].departmentList[j].isChild = true;
                data[k].departmentList[j].hasChildren = false;
              }
            } else {
              data[k].hasChildren = true;
            }
          }
          this.tableData = data;
          console.log(this.tableData);
          that.$forceUpdate();
        }
      );
    },
    addHandle(item) {
      this.addAndEditForm.storesNum = item.storesNum;
      this.addAndEditForm.departmentId = "";
      this.addAndEditForm.name = "";
      this.addAndEditForm.type = "add";
      this.addAndEditForm.storeName = item.storesName;
      this.adddepart = true;
    },
    editHandle(item) {
      this.addAndEditForm.storesNum = item.storesNum;
      this.addAndEditForm.departmentId = item.id;
      this.addAndEditForm.name = item.name;
      this.addAndEditForm.storeName = item.stores_Name;
      this.addAndEditForm.type = "edit";
      this.adddepart = true;
    },
    deleteItem(item) {
      this.$confirm("请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$F.doRequest(
            this,
            "/pms/department/delete_department",
            {
              departmentId: item.id,
            },
            (res) => {
              console.log(res);
              this.initForm();
              this.adddepart = false;
              that.$forceUpdate();
            }
          );
        })
        .catch(() => {});
    },
    submitFn() {
      this.$refs.adddepart.validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/department/edit_department",
            this.addAndEditForm,
            (res) => {
              console.log(res);
              this.initForm();
              this.adddepart = false;
              that.$forceUpdate();
            }
          );
        }
      });
    },
  },
};
</script>
