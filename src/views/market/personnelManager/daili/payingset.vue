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


        <el-col :span="5">
          <el-form-item label="员工名称">
            <el-input style="width:120px" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="所属门店">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预定" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-form-item >
          <el-button @click="queryCourseList(form)"  type="primary">查询</el-button>

        </el-form-item>
      </el-row>

    </el-form>
    <div>
         <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="职位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="所在部门" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="detail=true">详情</el-button>
                    <el-button type="text" size="mini" @click="setting=true">酬薪设置</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 200]"  layout=" sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <!-- 薪酬详情 -->
    <div>
        <el-dialog top="0" :title="'查看-'+'张三'" :visible.sync="detail">
          <el-form :model="form" label-width="120px">
              <h4>基本工资：</h4>
            <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item> -->

            <el-row>
                <el-col style="height:40px" :span="12">
                    <el-form-item label="基本工资:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12"  >
                    <el-form-item label="社保补助:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12">
                    <el-form-item label="其他:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12"  >
                    <el-form-item label="保密工资:">
                        3000
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col style="height:40px" :span="12">
                    <el-form-item label="岗位工资:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12"  >
                    <el-form-item label="绩效工资:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12">
                    <el-form-item label="奖金:">
                        3000
                    </el-form-item>
                </el-col>
            </el-row>
            <h4>补贴：</h4>
            <el-row>
                 <el-col style="height:40px" :span="12">
                    <el-form-item label="房补:">
                        3000
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12"  >
                    <el-form-item label="餐补:">
                        3000
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="detail = false">关 闭</el-button>
          </div>
        </el-dialog>

    </div>
    <!-- 薪酬设置 -->
    <div>
        <el-dialog top="0" :title="'酬薪设置-'+'张三'" :visible.sync="setting">
          <el-form :model="form" label-width="120px">
              <h4>基本工资：</h4>
            <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item> -->

            <el-row>
                <el-col style="height:40px;margin-top:20px" :span="12">
                    <el-form-item label="基本工资:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:40px;margin-top:20px" :span="12"  >
                    <el-form-item label="社保补助:">
                      <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:40px;margin-top:20px" :span="12">
                    <el-form-item label="其他:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:40px;margin-top:20px" :span="12"  >
                    <el-form-item label="保密工资:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col style="height:40px;margin-top:20px" :span="12">
                    <el-form-item label="岗位工资:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:40px;margin-top:20px" :span="12"  >
                    <el-form-item label="绩效工资:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:30px;margin-top:20px" :span="12">
                    <el-form-item label="奖金:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <h4>补贴：</h4>
            <el-row>
                 <el-col style="height:40px" :span="12">
                    <el-form-item label="房补:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="height:40px" :span="12"  >
                    <el-form-item label="餐补:">
                        <el-input style="width:120px" v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="setting = false">{{ $t('commons.cancel') }}</el-button>
            <el-button type="primary">确 定</el-button>
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
      setting: false,
      detail: false,
      loading: false,
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
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


