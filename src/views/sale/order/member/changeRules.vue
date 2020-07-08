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
          <el-form-item label="起始类型:">
            <el-select v-model="form.orderType" style="width:100px">
              <el-option label="当前课程" value="1"></el-option>
              <el-option label="演出" value="3"></el-option>
              <el-option label="场地预定" value="2"></el-option>
              <el-option label="活动项目课程" value="4"></el-option>
            </el-select>
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
       

        <el-form-item >
          <el-button @click="queryCourseList(form)"  type="primary">查询</el-button>
          
        </el-form-item>
        <el-form-item style="float:right">
          <el-button  type="primary" @click="newvip=true">+新增</el-button>
          <!-- @click="resetForm"  -->
        </el-form-item>
      </el-row>
      
    </el-form>

     <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="会员起始类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="变更方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="目标会员类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="等级变更 " show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="修改时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="修改人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="details=true">详情</el-button>
                    <el-button type="text" size="mini">禁用</el-button>
                    <el-button type="text" size="mini">删除</el-button>
                    <el-button type="text" size="mini">修改</el-button>
                    <el-button type="text" size="mini">启用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 详情 -->
        <el-dialog title="会员详情" :visible.sync="details">
            <el-row>
                <el-col :span="8">起始会员类型：<span>黄金卡</span></el-col>
                <el-col :span="8">目标会员类型：<span>黄金卡</span></el-col>
                <el-col :span="8">变更方式：<span>升级</span></el-col>
            </el-row>
            <el-row>
                <el-col :span="8">创始人：<span>张三</span></el-col>
                <el-col :span="8">创建时间：<span>2020-04-22 19:23:20</span></el-col>
            </el-row>
            <el-row>
              <div style="font-size: 16px;margin-top:30px">手动变更时间</div>
              <ul>
                <li>支付费用100日元</li>
              </ul>
            </el-row>
            <el-row>
              <div style="font-size: 16px;margin-top:30px">自动变更条件（满足任意条件）</div>
              <ul>
                <li>累计消费1000日元</li>
                <li>单次入住消费500日元</li>
              </ul>
            </el-row>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="details = false">关闭</el-button>
            </div>
          </el-dialog>

            <!-- 新增 -->
            <el-dialog title="会员类型升降级配置" :visible.sync="newvip" width="70%">
              <el-form :model="newform" :inline="true" class="top-body" size="small" label-width="120px">
                <el-row>
                  <el-row>

                  <el-col :span="5">
                    <el-form-item label="起始会员类型:">
                      <el-select v-model="newform.orderType" style="width:100px">
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预定" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="目标会员类型:">
                      <el-select v-model="newform.orderType" style="width:100px">
                        <el-option label="当前课程" value="1"></el-option>
                        <el-option label="演出" value="3"></el-option>
                        <el-option label="场地预定" value="2"></el-option>
                        <el-option label="活动项目课程" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                      变更类型：升级
                  </el-col>
                  </el-row>

                  <el-row>
                       <el-col >
                        <el-form-item label="手动独立升级" prop="name">
                          :支付费用
                          <el-input style="width:200px" v-model="newform.name"></el-input>日元 
                          <span style="color:#666666">支付费用可直接升级</span>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>

                    <el-form-item label="自动升级条件:">
                      <el-form-item label="自动升级条件:">
                      <el-checkbox-group v-model="newform.type">
                        <el-form-item>

                          <el-checkbox label="累计入住消费达到" name="type"></el-checkbox>
                          <el-input style="width:80px"></el-input>日元
                        </el-form-item>
                        <el-form-item>
                          <el-checkbox label="单次入住消费达到" name="type"></el-checkbox>
                          <el-input style="width:80px"></el-input>日元
                        </el-form-item>
                        <el-row>
                          <el-form-item>
                        <el-checkbox label="入住消费达到次数" name="type"></el-checkbox>
                        <el-input style="width:80px"></el-input>次
                        </el-form-item>
                        </el-row>
                      </el-checkbox-group>
                    </el-form-item>
                        
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-col >
                          <el-form-item  label="自动升级满足条件:">
                            <el-radio-group v-model="newform.name">
                                <el-radio label="任意"></el-radio>
                                <el-radio label="全部已选"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                      </el-col>
                  </el-row>

                  
                </el-row>
                
              </el-form>
            <div slot="footer" class="dialog-footer" center>
              <el-button @click="newvip= false">取消  </el-button>
              <el-button type="primary">确定</el-button>
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
      newvip:false,
      details:false,
      loading: false,
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {},
      newform:{
        orderType:'',
        type:false
      },
      tableData: [{}] //表格数据
    };
  },
  created() {
    // this.resetForm();
    // this.fetchGoodList();
  },
  methods: {

 

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
ul{
  list-style-type:disc;
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


