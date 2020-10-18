<!--
 * @Date: 2019-12-25 22:12:46
 * @LastEditors: Dana
 * @LastEditTime: 2020-03-24 15:35:46
 * @FilePath: /cloudAdmin/src/views/sale/SaleCustomer.vue
 -->
<template>
  <div>
    <el-card>
      <el-form inline size="medium " style="margin:10px 0">
        <el-form-item>
          <el-select v-model="form.balances"  placeholder="会员等级">
            <el-option  v-for="(item,index) in levelData" :key="index" :label="item.level" :value="item.balance"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.content" placeholder="用户姓名/联系电话" class="input-with-select">
            <el-button slot="append" @click="queryCourseList(form)" plain >查询</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <el-table
          height="400"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;padding: 8px 0 ! important;"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="medium"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index" width="100px" label="全选" ></el-table-column>
        <el-table-column prop="edtUser.userName" label="用户姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="edtUser.phone" label="联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="memberResult.levelname" label="会员等级" show-overflow-tooltip></el-table-column>
        <el-table-column prop="memberResult.edtbalance" label="会员积分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="edtUser.sumConsumption" label="累计消费（元）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="edtUser.createTime" label="加入时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="text" size="mini" @click="memberDatail(row)">详情</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div style="margin-top:10px"></div>
       <el-pagination
          style="padding:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.page_num"
          :total="totalPage"
          layout="total,  prev, pager, next, jumper"
        ></el-pagination>
    </el-card>
    <el-dialog top="0" title="详情" v-if="dialogTableVisible" :visible.sync="dialogTableVisible">
      <div >
        <div class="partOne" style="margin:0">基本信息</div>
        <ul>
          <li>姓名：{{userInformation.edtUser.nickname}}</li>
          <li>性别：{{userInformation.edtUser.sex}}</li>
          <li>年龄：{{userInformation.edtUser.age }}</li>
          <li>特长：{{userInformation.edtUser.speciality }}</li>
        </ul>
      </div>
      <div>
        <div class="partOne">学历信息</div>
        <ul>
          <li>学校：{{userInformation.edtUser.school }}</li>
          <li>年级：{{userInformation.edtUser.classRoom }}</li>
        </ul>
      </div>
      <div>
        <div class="partOne">联系地址</div>
        <ul>
          <li>电话：{{userInformation.edtUser.phone}}</li>
          <li>邮箱：{{userInformation.edtUser.email }}</li>
          <li>地址：{{userInformation.edtUser.addressDetail }}</li>
        </ul>
      </div>
      <div>
        <div class="partOne">用户信息</div>

        <ul>
          <li>用户名称：{{userInformation.edtUser.nickname}}</li>
          <li>注册时间：{{userInformation.edtUser.createTime}}</li>
        </ul>
      </div>
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
      levelData:null,  //会员等级
      userInformation:'',  //点击详情时，用来存放详情内容
      dialogTableVisible:false,  //弹框
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      tableData: [],
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {
        userName: "", //买家名称
        phone: "", //联系电话
        level: "", //会员等级
        applyType: 1 ,//审核状态  会员信息页面传1
        content:"",   //模糊查询
        balances:"",  //模糊查询
      }
    };
  },
  created() {
    this.fetchGoodList();
    this.memberLive();   //请求会员等级接口
  },
  methods: {
    //点击详情
    memberDatail(row){
      this.userInformation = row;
      this.dialogTableVisible = true;
    },

    /**删除 */
    deleteHandle(data) {
      var ids =
        data && data.id
          ? [data.id]
          : this.dataListSelections.map(item => {
              return item.id;
            });
      var nameS =
        data && data.title
          ? [data.title]
          : this.dataListSelections.map(item => {
              return item.title;
            });
      this.$confirm(
          (data && data.id) ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        this.$t('commons.tip_desc'),
        {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.newApi("/home/market/goods/del_goods_info"),
            method: "post",
            data: this.$http.adornData({ id: ids })
          }).then(data => {
            if (data && data.code == 200) {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.fetchGoodList();
                }
              });
            } else {
              this.$message.error(data.message);
            }
          });
        })
        .catch(() => {});
    },
    changeMStatus(status) {
      var ids = this.dataListSelections.map(item => {
        return item.id;
      });
      this.changeStatus(ids.join(","), status);
    },
    /**商品上下架 */
    changeStatus(id, status) {
      this.$http({
        url: this.$http.newApi("/home/market/goods/edit_goods_status"),
        method: "post",
        data: this.$http.adornData({ id: id, status: status })
      }).then(res => {
        if (res.code == 200) {
          this.fetchGoodList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    /*点击切换*/
    handleClick(status) {
      console.log(status);
      if (status == 0) {
        this.form.orderStatus = "";
      } else {
        this.form.orderStatus = this.status;
      }
      this.pageIndex = 1;
      this.fetchGoodList();
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
    //请求会员等级区间接口
    memberLive(params = {}) {
      this.$F.merge(params, {

      });
      this.$F.merge(params);
      this.$F.doRequest(
        this,
        "/edt/adminsystem/get_member_live",
        params,
        data => {
          this.levelData = data;
          console.log(this.levelData);


        }
      );
    },
    //点击详情跳转
    getOrderDetail(data) {
      // this.$router.push("./orderInfo",)
      this.$router.push({ path: "/orderInfo", query: { index: data } });
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
<style scoped>
li{
  margin: 10px 0;
color: rgba(102, 102, 102, 1);
font-size: 14px;

}
.partOne{
  margin-top: 20px;

color: rgba(51, 51, 51, 1);
font-size: 16px;

}
</style>
