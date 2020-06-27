<template>
  <div class="goodsType">
    <div class="goods-top">
      <div class="left">
        <div class="inner">
          <div class="card title">
            <span class="cur-course-left">{{courseList[2].name}}</span>
            <el-button class="submit cur-course-right" @click="handleCourseCategory('add', 2)">新增分类</el-button>
          </div>
          <div
            class="card"
            v-for="(item, index) in courseList[2].list"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          >
            <span class="cur-course-left">{{item.name}}</span>
            <div>
              <el-button
                type="text"
                class="cur-course-right"
                @click="handleCourseCategory('edit', 2, item, index)"
              >编辑</el-button>
              <el-button
                type="text"
                class="cur-course-right"
                @click="deleteCategory(2, item, index)"
              >删除</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="inner">
          <div class="card title">
            <span class="cur-course-left">{{courseList[1].name}}</span>
            <el-button class="submit cur-course-right" @click="handleCourseCategory('add', 1)">新增分类</el-button>
          </div>
          <div
            class="card"
            v-for="(item, index) in courseList[1].list"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          >
            <span class="cur-course-left">{{item.name}}</span>
            <div>
              <el-button
                type="text"
                class="cur-course-right"
                @click="handleCourseCategory('edit', 1, item, index)"
              >编辑</el-button>
              <el-button
                type="text"
                class="cur-course-right"
                @click="deleteCategory(1, item, index)"
              >删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="courseTitle"
      :visible.sync="typeVisible"
      width="400px"
      class="adminBox"
      top="0"
      @close="visClose"
    >
      <el-form
        label-position="right"
        label-width="120px"
        size="medium"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="分类名称" required prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="blueBtn mini" @click="submit">确认</el-button>
        <el-button class="defaultBtn mini" @click="visClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpRequest from "@/utils/httpRequest";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({})
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "change" }]
      },
      selectedIndex: "",
      courseList: [{}, {}, {}, {}],
      eventsList: [],
      courseTitle: "新增分类",
      form: {},
      tableData: [],
      allTree: [],
      treeData: [],
      action: httpRequest.adornUrl("/market/upload/upload"),
      uploadData: { type: "2" },
      treeProps: { children: "child", label: "name" },
      isexpand: true,
      type: {
        thumb: "",
        group: "",
        name: "",
        second: "",
        third: "",
        parentid: "",
        level: ""
      },
      typeTitle: "一级分组名称",
      typeVisible: false,
      firstOpt: [],
      secondOpt: []
    };
  },
  activated() {
    this.fecthList();
  },
  methods: {
    fecthList() {
      this.$F.doRequest(this, "/edt/adminsystem/public_dicr_list", {}, data => {
        this.courseList = data;
        this.$forceUpdate();
      });
    },
    visClose() {
      this.$refs["form"].resetFields();
      this.typeVisible = false;
      this.form = {};
    },
    deleteCategory(type, item, index) {
      this.$confirm(`确定删除分类【${item.name}】`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$F.doRequest(
            this,
            "/edt/adminsystem/publicdict_delete",
            { id: item.id },
            data => {
              this.$message.success(`删除分类【${item.name}】成功`);
              this.courseList[type].list.splice(index, 1);
            }
          );
        })
        .catch(() => {});
    },
    handleCourseCategory(handleType, type, item, index) {
      this.form = item || {};
      this.form.selectedIndex = index;
      this.form.type = type;
      if (handleType == "add") {
        this.courseTitle = "新增分类";
      } else this.courseTitle = "编辑分类";
      this.typeVisible = true;
    },
    handleEventsCategory() {
      this.typeVisible = true;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {};
          this.$F.merge(params, this.form);
          params.pDictNum = this.courseList[this.form.type].dictNum;
          params.dictLevel = 2;
          this.$F.doRequest(
            this,
            "/edt/adminsystem/publicdict_save",
            params,
            data => {
              this.visClose();
              this.$message.success("编辑分类成功");
              this.fecthList();
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="less">
.goodsType {
  height: 100%;

  .goods-top {
    height: 100%;
    display: flex;
    flex-direction: row;

    .left {
      flex: 1;
      margin-right: 20px;
    }
    .right {
      flex: 1;
    }
    .inner {
      background: #e4e7ea;
      border-radius: 6px;
      padding: 14px;

      .card {
        background: #fff;
        border-radius: 6px;
        padding: 10px;
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        &:first-child {
          margin-top: 0;
        }

        &.title {
          font-size: 18px;
        }
        .cur-course-right {
          width: auto;
          padding: 8px 12px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
