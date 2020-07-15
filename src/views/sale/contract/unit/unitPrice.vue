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
           <el-form-item label="规则名称：" prop="name">
             <el-input style="width:120px" v-model="form.name"></el-input>
           </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态:">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预定" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="所属门店:">
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
        <el-form-item style="float:right">
          <el-button   type="primary" @click="newupdata=true">+新增</el-button>
          <!-- @click="resetForm" -->
        </el-form-item>
      </el-row>
      
    </el-form>

     <!--表格数据 -->
     <div>
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="规则名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="所属门店" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="规则 " show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="checkrules=true">查看</el-button>
                    <el-button type="text" size="mini">删除</el-button>
                    <el-button type="text" size="mini"  @click="updatas= true">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
      </div>
        <!-- 新增 -->
        <div>
          <el-dialog title="新增" :visible.sync="newupdata">
                <el-form ref="discountform" :model="updataform" :rules="rules" label-width="80px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="规则名称" prop="name">
                        <el-input v-model="updataform.name" ></el-input>
                      </el-form-item>
                    </el-col>
                      
                    <el-col :span="8">
                      <el-form-item label="状态:">
                        <el-radio-group v-model="updataform.resource">
                          <el-radio label="启用"></el-radio>
                          <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-form-item label="选择时间"  prop="date1">
                        <el-date-picker v-model="updataform.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        <span style="margin:0 5px">至</span>
                        <el-date-picker v-model="updataform.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="选择星期">
                        <el-checkbox :indeterminate="updataform.isIndeterminate" v-model="updataform.checkAll" @change="handleCheckAllChange">全选</el-checkbox>

                        <el-checkbox-group v-model="updataform.checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="city in updataform.cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-form-item label="折扣率"  prop="name">
                        <el-input style="width:240px" v-model="updataform.name" ></el-input>
                        <span style="margin-left:5px">实际价格=门市价*折扣率</span>
                      </el-form-item>
                      <el-form-item>
                        <el-radio-group v-model="updataform.resource">
                          <el-radio label="向上取整"></el-radio>
                          <el-radio label="向下取整"></el-radio>
                          <el-radio label="四舍五入（取整）"></el-radio>
                          <el-radio label="保持不变"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form-item>
                  </el-row>
                  <el-divider></el-divider>

                  
                  
                  <el-form-item style="text-align:right">

                    <el-button type="primary" >确定</el-button>
                    <el-button @click="newupdata = false">取消</el-button>
                  </el-form-item>
                </el-form>

          </el-dialog>
        </div>

      <!-- 修改 -->
      <div>
        <el-dialog title="修改" :visible.sync="updatas">
                <el-form ref="discountform" :rules="rules" :model="updata" label-width="80px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="规则名称"  prop="name">
                        <el-input v-model="updata.name" ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="状态:">
                        <el-radio-group v-model="updata.resource">
                          <el-radio label="启用"></el-radio>
                          <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-form-item label="选择日期"   prop="date1" >
                        <el-date-picker v-model="updata.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                        <span style="margin:0 5px">-</span>
                        <el-date-picker v-model="updata.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="选择日期">
                        <el-checkbox :indeterminate="updata.isIndeterminate" v-model="updata.checkAll" @change="handleCheckAllChanges">全选</el-checkbox>

                        <el-checkbox-group v-model="updata.checkedCities" @change="handleCheckedCitiesChanges">
                          <el-checkbox v-for="city in updata.cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-form-item label="折扣率" prop="name">
                        <el-input style="width:240px" v-model="updata.name"  prop="name"></el-input>
                        <span>实际价格=门市价*折扣率</span>
                      </el-form-item>
                      <el-form-item>
                        <el-radio-group v-model="updata.resource">
                          <el-radio label="向上取整"></el-radio>
                          <el-radio label="向下取整"></el-radio>
                          <el-radio label="四舍五入（取整）"></el-radio>
                          <el-radio label="保持不变"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form-item>
                  </el-row>
                  <el-divider></el-divider>

                  
                  
                  <el-form-item style="text-align:right">

                    <el-button type="primary" >确定</el-button>
                    <el-button @click="updatas = false" >取消</el-button>
                  </el-form-item>
                </el-form>

        </el-dialog>
      </div>
            <!-- 查看 -->
      <div>
        <el-dialog title="查看" :visible.sync="checkrules">
          <el-row>
              <el-col :span="6">规则名称：</el-col>
              <el-col :span="18">规则2</el-col>
          </el-row> 
          <el-row>
              <el-col :span="6" >状态：</el-col>
              <el-col :span="18">禁用</el-col>
          </el-row>
          <el-row>
              <el-col :span="6">时间：</el-col>
              <el-col :span="18">2020-04-17至2021-04-17</el-col>
          </el-row>
          <el-row>
              <el-col :span="6" >星期：</el-col>
              <el-col :span="18">每天</el-col>
          </el-row> 
          <el-row>
              <el-col :span="6" >折扣率：</el-col>
              <el-col :span="18">0.9（向上取整）</el-col>
          </el-row>
          

          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="checkrules = false">关闭</el-button>
          </div>
        </el-dialog>
      </div>
  
  
  
  </div>
</template>
<script>
import {
  get_goods_list,
  edit_goods_status,
  del_goods_info
} from "@/utils/api/market";
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {
  data() {
    return {
      checkrules:false,
      newupdata:false,
      updatas:false,
      loading: false,
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {
       name:"",
       orderType:''
      },
      updataform:{
        startTime:'',
       endTime:'',
       resource:'',
       name:'',
       checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      },
      updata:{
        startTime:'',
       endTime:'',
       resource:'',
       name:'',
       checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      },
      tableData: [{}], //表格数据
      rules: {
          name: [
            { required: true, trigger: 'blur' },
          ],
          date1: [
            { type: 'date',trigger: 'change'}
          ],
          },
    };
  },
  created() {
    // this.resetForm();
    // this.fetchGoodList();
  },
  methods: {
    // 新增 
      handleCheckAllChange(val) {
        this.updataform.checkedCities = val ? cityOptions : [];
        this.updataform.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.updataform.checkAll = checkedCount === this.updataform.cities.length;
        this.updataform.isIndeterminate = checkedCount > 0 && checkedCount < this.updataform.cities.length;
      },
      // 修改
      handleCheckAllChanges(val) {
        this.updata.checkedCities = val ? cityOptions : [];
        this.updata.isIndeterminate = false;
      },
      handleCheckedCitiesChanges(value) {
        let checkedCount = value.length;
        this.updata.checkAll = checkedCount === this.updata.cities.length;
        this.updata.isIndeterminate = checkedCount > 0 && checkedCount < this.updata.cities.length;
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


