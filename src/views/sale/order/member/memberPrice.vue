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
          <el-form-item label="会员类型：">
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

     <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="mini">
            <el-table-column prop="enterName" label="会员类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="折扣比例" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="修改时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="修改人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini"  @click="discount=true">编辑折扣</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑折扣 -->
        <el-dialog top="0" title="编辑折扣" :visible.sync="discount" width="450px">
              <el-form ref="discountform" :model="form" label-width="80px" :rules="rules">

                <el-form-item label="是否折扣:" style="margin:0 auto;">
                  <el-radio-group v-model="discountform.resource">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="折扣比例" style="margin:0 auto;" prop="name">
                  <el-input v-model="discountform.name" style="width:200px" placeholder="请填写"></el-input>
                </el-form-item>
                    <el-divider></el-divider>


                <el-form-item >

                  <el-button type="primary" >确定</el-button>
                  <el-button @click="discount = false">取消</el-button>
                </el-form-item>
              </el-form>

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
      discount:false,
      loading: false,
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      showTop: false,
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {},
      discountform:{},
      tableData: [{}], //表格数据
      rules: {
          name: [
            { required: true, trigger: 'blur' },
          ]
          },
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


