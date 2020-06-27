<template>
  <div class="membership-management">
    <!--供应商-->
    <div class="content">
      <div class="search">
        <div class="search-item">
          <div class="search-part">
            <input type="text" v-model="field.keyword" placeholder="供应商名称/联系人" />
            <el-button size="small" type="text" @click="getTableDataList()">查询</el-button>
          </div>
          <div class="kinds">
            <el-dropdown>
              <el-button type="primary" style="margin-right: 10px;">
                行业分类
                <i class="iconfont icon-shangxia"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(value,index) in jobList"
                  :key="index"
                  @click.native="handleJob(value)"
                >{{value.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <el-button type="primary" style="margin-right: 10px;">
                关联状态
                <i class="iconfont icon-shangxia"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(value,index) in linkList"
                  :key="index"
                  @click.native="handleLink(value)"
                >{{value.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="add-item">
          <el-button type="primary" style="margin-right: 10px;">添加客户</el-button>
          <el-badge :value="12" class="item">
            <el-button size="small" type="text">关联申请列表</el-button>
          </el-badge>
        </div>
      </div>
      <div class="components-edit">
        <div class="delate-item">
          <el-button
            style="margin: 10px 0px;"
            type="danger"
            :disabled="dataListSelections.length <= 0"
          >批量删除</el-button>
          <span class="delate-select">已选（{{ number }}）</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="goods_kinds" label="供应商名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_time" label="联系人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_people" label="联系电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_people" label="职位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="行业分类" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goods_price" label="关联状态" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small">详情</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">续期</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <div class="page-all">
            共
            <span style="font-weight:600;font-size: 14px;">400</span>条记录
          </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout=" sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      number: "",
      currentPage1: 1,
      tableData: [],
      dataListSelections: [],
      field: {
        type: "",
        keywords: "",
        is_link: "",
        industry: "",
        page: 1,
        page_num: 10
      },
      jobList: [],
      linkList: [
        {
          name: "未关联商家",
          is_link: 1
        },
        {
          name: "已关联",
          is_link: 2
        },
        {
          name: "关联中",
          is_link: 3
        }
      ]
    };
  },
  created() {
    this.getTableDataList();
    this.getJobList(); //行业类型
  },
  methods: {
    //选择了关联id
    handleLink(e) {
      this.field.is_link = e.is_link;
      this.getTableDataList();
    },
    //选择了什么行业
    handleJob(e) {
      this.field.is_link = e.id;
      this.getTableDataList();
    },
    //行业类型
    getJobList() {
      this.$http({
        url: this.$http.adornUrl("/sale/customer/get_customer_list"),
        method: "post"
      }).then(res => {
        let { data } = res;

        let { data: rows, code, message } = data;

        switch (code) {
          case 200:
            this.jobList = rows;
            break;
        }
      });
    },
    //获取供应商列表
    getTableDataList() {
      this.$http({
        url: this.$http.adornUrl("/sale/customer/get_customer_list"),
        method: "post",
        data: this.$http.adornData(this.field)
      }).then(res => {
        let { data } = res;

        let { data: rows, code, message } = data;

        switch (code) {
          case 200:
            this.tableData = rows.list;
            break;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
   
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.membership-management {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
  > .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px 20px 0px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .components-edit {
      display: flex;
      flex-direction: column;
      flex: 1;
      .delate-item {
        display: flex;
        align-items: center;
        margin: 15px 0px;
        .delate {
          padding: 6px 10px;
          border: 1px solid #999999;
          border-radius: 5px;
          margin-right: 10px;
        }
        > .delate-select {
          margin-left: 10px;
        }
      }
      .block {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .page-all {
          font-size: 12px;
          color: #666666;
          letter-spacing: 2px;
        }
      }
    }
    > .search {
      display: flex;
      justify-content: space-between;
      > .search-item {
        display: flex;
        .search-part {
          display: flex;
          align-items: center;
          border: 1px solid #999999;
          border-radius: 5px;
          height: 40px;
          input {
            border: none;
            border-radius: 5px;
            padding: 10px 10px;
          }
          button {
            background-color: #dfdfdf;
            height: 100%;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            width: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #000000;
            font-size: 16px;
          }
          .el-select {
            width: 120px;
          }
        }
        > .kinds {
          display: flex;
          align-items: center;
          margin-left: 20px;
          i {
            font-size: 12px;
          }
        }
      }
      > .add-item {
        display: flex;
        align-items: center;
        padding-right: 20px;
        > .add {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          width: 100px;
          color: #126eff;
          border-radius: 6px;
          border: 1px solid #126eff;
          margin-right: 20px;
        }
        .el-button--small,
        .el-button--small.is-round {
          height: 40px;
        }
      }
    }
  }
}
</style>