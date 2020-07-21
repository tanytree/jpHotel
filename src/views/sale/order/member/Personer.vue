<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
    <div>
        <div class="sec1" v-if="!secondShow">
            <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
                <el-form-item label="会员类型:">
                    <el-select v-model="form.id">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="item in tableData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getMemberList(form)" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                    <el-button type="primary" @click="Newdata()">+新增</el-button>
                    <!-- @click="resetForm"  -->
                </el-form-item>
            </el-form>

            <!--表格数据 -->
            <el-table ref="multipleTable" v-loading="loading" :data="tableData"
                      :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="medium">
                <el-table-column prop="name" label="会员类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column prop="level" label="对应等级" show-overflow-tooltip></el-table-column>
                <el-table-column prop="duration" label="有效期 " show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <span v-if="row.duration == '9999'">永久</span>
                        <span v-else>{{row.duration}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" show-overflow-tooltip>
                    <template slot-scope="{row}">
                        <span>{{row.createTime || row.updateTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateId" label="修改人" show-overflow-tooltip>


                </el-table-column>
                <el-table-column prop="creatorId" label="创建人" show-overflow-tooltip>

                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="{row}">
                        <el-button type="text" size="mini" v-if="row.statu == 1">禁用</el-button>
                        <el-button type="text" size="mini" v-if="row.statu == 2">启用</el-button>
                        <el-button type="text" size="mini" @click="onDelete(row)">删除</el-button>
                        <el-button type="text" size="mini" @click="Newdata(row, 'edit')">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="secondShow">
            <NewDetail @addShowFunc="addShowFunc" :selected="selected"/>
        </div>
    </div>
</template>
<script>
  import NewDetail from './graces/new'

  export default {
    components: { NewDetail },
    data () {
      return {
        secondShow: false,
        loading: false,
        pageIndex: 1,
        pageSize: 8,
        totalPage: 0,
        showTop: false,
        dataListLoading: false,
        dataListSelections: [],
        status: '',
        form: {
          id: '',
          // name: '',
          pageIndex: 1,
          pageSize: 10,
          paging: true
        },
        tableData: [{}], //表格数据
        selected: {},
      }
    },
    mounted () {
      this.getMemberList()
    },
    methods: {
      onDelete (row) {
        this.$confirm(`是否删除【${row.name}】？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.$F.doRequest(this, '/pms/membertype/delete', { id: row.id }, (res) => {
            this.$message.success('Delete Success')
            this.getMemberList()
          })
        })
      },

      addShowFunc (flag) {
        this.getMemberList()
        this.secondShow = flag
      },

      getMemberList (params = {}) {
        // this.$F.merge(params, { storesNum: '' })
        this.$F.merge(params, this.form)
        this.$F.doRequest(this, '/pms/membertype/list', params, (res) => {
          this.tableData = res.list
          this.$forceUpdate()
        })
      },
      Newdata (row = {}, type) {
        this.selected = row;
        if (type) {
          this.selected =  {
            name: row.name,
            level: row.level,
            prices: row.prices,
            interests: row.interests,
            duration: row.duration,
            id: row.id
          }
        }
        this.secondShow = true;
        // this.$router.push('/newdetail')
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>


