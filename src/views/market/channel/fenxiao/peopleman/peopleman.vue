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
          <el-form-item label="所属门店:">
            <el-select v-model="form.orderType" style="width:150px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预订" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="员工名称:">
            <el-input style="width:150px" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="入职日期:">
              <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:120px" placeholder="选择日期"></el-date-picker>
              <span style="margin:0 5px">-</span>
              <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" style="width:120px" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-form-item >
          <el-button @click="queryCourseList(form)"  type="primary">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button   type="primary">下载模板</el-button>
          <el-button   type="primary">批量导入</el-button>
          <el-button   type="primary" @click="adddstaff=true">添加员工</el-button>

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
              <el-table-column prop="enterType" label="所在部门" show-overflow-tooltip></el-table-column>
              <el-table-column :label="$t('commons.operating')" width="220">
                  <template slot-scope="{row}">
                      <el-button type="text" size="mini" @click="editstaff=true">修改</el-button>
                      <el-button type="text" size="mini">{{$t('commons.detail')}}</el-button>
                      <el-button type="text" size="mini" @click="dimission=true">办理离职</el-button>
                      <el-button type="text" size="mini" @click="correct=true">转正</el-button>
                      <el-button type="text" size="mini">{{$t('commons.delete')}}</el-button>
                  </template>
              </el-table-column>
          </el-table>

          <!--分页 :current-page="searchForm.page"   :page-size="searchForm.page_num"  :total="listTotal"-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :page-sizes="[10, 50, 100, 200]"  layout=" sizes, prev, pager, next, jumper"></el-pagination>

        </div>

         <div>
            <!-- 添加员工 -->
            <el-dialog top="0" title="添加员工" :visible.sync="adddstaff" >
              <el-form :model="form" :inline="true"  :required="true" class="top-body" label-width="120px" size="small">
                  <el-row>
                    <el-form-item label="所属门店:">
                      <el-select v-model="form.orderType" >
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="姓名:" >
                        <el-input style="width:200px" placeholder="请输入姓名"  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('commons.idCardTypeDesc')">
                      <el-select v-model="form.orderType" :placeholder="$t('commons.selectIdCardType')" >
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="证件号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="所属部门:">
                      <el-select v-model="form.orderType" :placeholder="$t('commons.selectIdCardType')">
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="  职位:" >
                        &nbsp;&nbsp;<el-input style="width:200px" placeholder="请填写职位"  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="工号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="银行卡号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="企业邮箱:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="分机号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                      <el-col :span="12">
                        <div class="grid-content">
                          <el-form-item label="入职时间:">
                            <el-date-picker
                              v-model="form.startTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              style="width:140px"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="关联后台账号:" >
                          <el-input style="width:200px" placeholder="请输入正确的后台账号"  autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                  </el-row>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="adddstaff = false">取 消</el-button>
                <el-button type="primary"{{ $t('commons.confirm') }}/el-button>
              </div>
            </el-dialog>
          </div>


          <div>
            <!-- 添加员工 -->
            <el-dialog top="0" title="编辑员工" :visible.sync="editstaff" >
              <el-form :model="form" :inline="true"  :required="true" class="top-body" label-width="120px" size="small">
                  <el-row>
                    <el-form-item label="所属门店:">
                      <el-select v-model="form.orderType" >
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="姓名:" >
                        <el-input style="width:200px" placeholder="请输入姓名"  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('commons.idCardTypeDesc')">
                      <el-select v-model="form.orderType" :placeholder="$t('commons.selectIdCardType')" >
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="证件号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="所属部门:">
                      <el-select v-model="form.orderType" :placeholder="$t('commons.selectIdCardType')">
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预订" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="  职位:" >
                        &nbsp;&nbsp;<el-input style="width:200px" placeholder="请填写职位"  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="工号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="银行卡号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="企业邮箱:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="分机号:" >
                        <el-input style="width:200px"   autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                      <el-col :span="12">
                        <div class="grid-content">
                          <el-form-item label="入职时间:">
                            <el-date-picker
                              v-model="form.startTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              style="width:140px"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="关联后台账号:" >
                          <el-input style="width:200px" placeholder="请输入正确的后台账号"  autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>

                  </el-row>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editstaff = false">取 消</el-button>
                <el-button type="primary"{{ $t('commons.confirm') }}/el-button>
              </div>
            </el-dialog>
          </div>

          <div>
            <!-- 办理离职 -->
             <el-dialog top="0" title="办理离职" :visible.sync="dimission" width="500px">
                  <el-form>

                   <el-row>
                      <el-col >
                        <div class="grid-content">
                          <el-form-item label="离职时间:">
                            <el-date-picker
                              v-model="form.startTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              style="width:305px"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col >
                        <el-form-item label="离职原因:" >
                          <el-input style="width:305px"  autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                      <el-col >
                        <el-form-item label="离职文件:" >
                          <el-input :placeholder="$t('commons.placeChoose')" style="width:220px" autocomplete="off"></el-input><el-button>选择文件</el-button>
                        </el-form-item>
                    </el-col>

                  </el-row>
                </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dimission = false">关闭</el-button>
                    <el-button type="primary"{{ $t('commons.confirm') }}/el-button>

                  </div>
                </el-dialog>
          </div>

          <div>
            <!-- 转正 -->
             <el-dialog top="0" title="转正" :visible.sync="correct" width="500px">
                  <el-form>

                   <el-row>
                      <el-col >
                        <div class="grid-content">
                          <el-form-item label="转正时间:">
                            <el-date-picker
                              v-model="form.startTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              style="width:305px"
                              placeholder="选择日期"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>


                </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="correct = false">关闭</el-button>
                    <el-button type="primary"{{ $t('commons.confirm') }}/el-button>

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
      correct:false,
      dimission:false,
      editstaff:false,
      adddstaff:false,
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


