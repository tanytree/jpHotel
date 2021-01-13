<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 17:34:41
 * @FilePath: \jiudian\src\views\market\channel\daili\compensationman.vue
 -->
 <template>
  <div class="sec1">
    <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('boss.staff_name')">
            <el-input style="width:150px" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-form-item label="入住日期">
            <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
            <span style="margin:0 5px">-</span>
            <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
        </el-form-item> -->
        <el-col :span="5">
          <el-form-item :label="$t('boss.compensation_payMonth')">
            <el-select v-model="form.orderType" style="width:150px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预订" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('boss.staff_staffState')">
            <el-select v-model="form.orderType" style="width:150px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预订" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-form-item >
          <el-button @click="queryCourseList(form)"  type="primary">查询</el-button>

        </el-form-item>
      </el-row>

    </el-form>

     <!--表格数据 -->
        <!-- <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" :label="$t('desk.customer_belongStore')" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="员工姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="入职时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="职位 " show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="工号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="所在部门" show-overflow-tooltip></el-table-column>
            <el-table-column :label="$t('commons.operating')" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini">{{$t('commons.detail')}}</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            :label="$t('desk.customer_belongStore')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.personnel_department')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.add_workFor')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.loginDetail_name')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.staff_staffState')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('desk.customer_belongStore')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.compensation_payMonth')"
            width="150">
          </el-table-column>
          <!-- <el-table-column label="配送信息"> -->
            <!-- <el-table-column
              prop="name"
              :label="$t('boss.loginDetail_name')"
              width="120">
            </el-table-column> -->
            <el-table-column :label="$t('boss.compensation_basicSalary')">
              <el-table-column
                prop="province"
                :label="$t('boss.compensation_baseSalary')"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                :label="$t('boss.compensation_benefits')"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                :label="$t('desk.book_other')"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                :label="$t('boss.compensation_confidentialSalary')"
                width="120">
              </el-table-column>
            </el-table-column>
            <el-table-column
            prop="date"
            :label="$t('boss.compensation_postSalary')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.compensation_meritPay')"
            width="150">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('boss.compensation_bonus')"
            width="150">
          </el-table-column>

           <el-table-column :label="$t('boss.compensation_subsides')">
              <el-table-column
                prop="province"
                :label="$t('boss.compensation_subsidizedMeals')"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                :label="$t('boss.compensation_housingAllowances')"
                width="120">
              </el-table-column>
            </el-table-column>

             <el-table-column :label="$t('boss.compensation_attendanceDays')">
              <el-table-column
                prop="province"
                :label="$t('boss.compensation_attendanceShoudDay')"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                :label="$t('boss.compensation_attendanceActualDay')"
                width="120">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="$t('commons.operating')" width="220">
                <template >
                    <el-button type="text" size="mini">员工详情</el-button>
                </template>
            </el-table-column>
          <!-- </el-table-column> -->
        </el-table>




        <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 200]"  layout=" sizes, prev, pager, next, jumper"></el-pagination>

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


