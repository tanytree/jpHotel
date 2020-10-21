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
              <el-select v-model="form.id">
                  <el-option :label="$t('commons.all')" value=""></el-option>
                  <el-option
                      v-for="item in memberTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                  </el-option>
              </el-select>
          </el-form-item>
        </el-col>

        <el-form-item >
          <el-button @click="getMemberTypeUpdateList()"  type="primary">查询</el-button>

        </el-form-item>
      </el-row>

    </el-form>

     <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="medium">
            <el-table-column prop="enterName" label="会员类型" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{memberTypeList.length > 0 ? memberTypeList.filter((item)=>{
                    return item.id == row.id;
                    })[0].name : ''}}
                </template>
            </el-table-column>
            <el-table-column label="是否折扣" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span v-if="row.discountStatus == 1">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="折扣比例" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span> {{row.discount || '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="修改时间" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span> {{row.updateTime || row.createTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="修改人" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.updateName || row.createName}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commons.operating')" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini"  @click="discountEdit(row)">编辑折扣</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑折扣 -->
        <el-dialog top="0" title="编辑折扣" :visible.sync="discountVisable" width="450px" @close="discountFormClose('discountForm')">
              <el-form ref="discountForm" :model="discountForm" label-width="80px">
                <el-form-item label="是否折扣:" style="margin:0 auto;">
                  <el-radio-group v-model="discountForm.discountStatus">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="折扣比例" style="margin:0 auto;" prop="discount">
                  <el-input v-model="discountForm.discount" style="width:100%" placeholder="请填写"></el-input>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer" right>
                <el-button type="primary" v-loading="loading" @click="editSave('discountForm')">{{ $t('commons.confirm') }}</el-button>
                <el-button @click="discountFormClose('discountForm')">{{ $t('commons.cancel') }}</el-button>
            </div>
          </el-dialog>
  </div>
</template>
<script>

export default {
  props: ['memberTypeList'], //会员类型列表
  data() {
    return {
      discountVisable:false,
      loading: false,
      totalPage: 0,
      showTop: false,
      dataListLoading: false,
      dataListSelections: [],
      status: "",
      form: {
        id: '',
        pageIndex: 1,
        pageSize: 10,
        paging: true
      },
      discountForm: {
        discountStatus: "1", //1:是 2： 否
        discount: '',
      },
      selected: {},
      tableData: [{}], //表格数据
      rules: {
        discount: [
            { required: true, trigger: 'change' },
          ]
      },
    };
  },
  mounted() {
    this.getMemberTypeUpdateList();
  },
  methods: {
    discountEdit(row) {
      this.$F.formatJsonNumberToString(row)
      this.selected = row;
      this.discountForm = this.$F.deepClone(row);
      // this.discountForm = row;
      this.$F.merge(this.discountForm, {
        discountStatus: "1"
      })
      this.discountVisable = true;
    },
    discountFormClose(formName) {
      // this.$refs[formName].resetFields();
      this.discountForm = {
        discountStatus: "1", //1:是 2： 否
          discount: '',
      }
      this.discountVisable = false;
    },

    //会员类型价格列表
    getMemberTypeUpdateList(params = {}) {
      this.$F.merge(params, this.form);
      this.$F.commons.fetchMemberTypeList(params, (res) => {
        this.tableData = res.list;
        this.totalPage = res.page.count;
      })
    },

    editSave(formName, params = {}) {
      if (!this.discountForm.discount) {
        this.$message.info('discount is required');
        return;
      }
      params.id = this.discountForm.id;
      this.$F.merge(params, this.discountForm);
      this.$F.doRequest(this, '/pms/membertype/editprices', params, (res) => {
        this.discountForm.discount = params.discount;
        this.$F.deepClone(this.discountForm, this.selected);
        this.discountFormClose(formName);
      })
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


