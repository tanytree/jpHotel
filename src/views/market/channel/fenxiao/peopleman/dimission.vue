<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath: 
 -->
 <template>
  <div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
      <el-row>

        <el-col :span="4">
          <el-form-item label="所属门店">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预定" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="员工名称">
            <el-input style="width:120px" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="离职日期">
            <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            <span style="margin:0 5px">-</span>
            <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        

        <el-form-item >
          <el-button @click="queryCourseList(form)"  type="primary">查询</el-button>
        </el-form-item>
      </el-row>
      
    </el-form>
      <div>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="所属门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="入职时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="职位 " show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="离职时间" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="details=true">详情</el-button>
                    <el-button type="text" size="mini">重新入职</el-button>
                    <el-button type="text" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 200]"  layout=" sizes, prev, pager, next, jumper"></el-pagination>
    
      </div>
      <div>
           <el-dialog title="查看资料" :visible.sync="details" width="350px" >
          <el-row style="margin:10px 0">
            <label >姓名：</label>
            <span style="margin-left:30px">张三</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >状态:</label>
            <span style="margin-left:30px">正式工</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >联系电话:</label>
            <span style="margin-left:30px">1111111</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >所属部门:</label>
            <span style="margin-left:30px">大仓集团第一酒店</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >所属部门:</label>
            <span style="margin-left:30px">总办</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >职位:</label>
            <span style="margin-left:30px">总经理</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >银行账户:</label>
            <span style="margin-left:30px">999999999</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >企业邮箱:</label>
            <span style="margin-left:30px">111@qq。com</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >后台账号:</label>
            <span style="margin-left:30px">888</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >工号:</label>
            <span style="margin-left:30px">0923</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >分机号:</label>
            <span style="margin-left:30px">999-999</span>
          </el-row>
          <el-row style="margin:10px 0"> 
            <label >入职时间:</label>
            <span style="margin-left:30px">3019-7-1</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >证件类型:</label>
            <span style="margin-left:30px">护照</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >证件号:</label>
            <span style="margin-left:30px">88555</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >转正日期:</label>
            <span style="margin-left:30px">30055</span>
          </el-row>
          <el-row style="margin:10px 0">
            <label >离职文件:</label>
            <el-button>预览</el-button>
          </el-row>
          

          <div slot="footer" class="dialog-footer">
            <el-button @click="details = false">关闭</el-button>
          </div>
        </el-dialog>
      </div>
     
  </div>
</template>
<script>
// import {
//   get_goods_list,
//   edit_goods_status,
//   del_goods_info
// } from "@/utils/api/market";
export default {
  data() {
    return {
      details: false,
      loading: false,
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {
       orderType:'',
       name:'',
       startTime:'',
       endTime:''
      },
      tableData: [{}] //表格数据
    };
  },
  created() {
    // this.resetForm();
    // this.fetchGoodList();
  },
  methods: {
     /**每页数 */
        handleSizeChange(val) {
            // this.searchForm.page_num = val;
            // this.searchForm.page = 1;
            // this.getDataList();
            console.log(11111)
        },
        /**当前页 */
        handleCurrentChange(val) {
            // this.searchForm.page = val;
            // this.getDataList();
            console.log(222)
        }
 

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
//  .el-dialog__header {
//     background: red;
// }

.goodsImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.top-close {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
  padding-right: 10px;
  padding-top: 20px;
  font-size: 14px;
  i {
    margin-left: 8px;
  }
}
.shopStatus {
  color: rgba(9, 109, 217, 1);
  font-size: 12px;
}
.top-body {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(250, 250, 250, 1);
}

.components-edit {
  margin-top: 10px;

  .components-table {
    border: 1px solid #e6e6e6;
  }
  .block {
    padding: 10px 20px 0;
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
</style>


