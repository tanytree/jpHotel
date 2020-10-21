<!--
 * @Date: 2020-03-10 14:09:08
 * @LastEditors: 魏轩
 * @LastEditTime:
 * @FilePath:
 -->
<template>
    <div class="sec1">
        <el-form :model="form" :inline="true" class="top-body" size="small" label-width="100px">
            <el-form-item label="会员类型:">
                <el-select v-model="form.startTypeId">
                    <el-option :label="$t('commons.all')" value=""></el-option>
                    <el-option
                        v-for="item in memberTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态:">
                <el-select v-model="form.state">
                    <el-option :label="$t('commons.all')" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="getMemberTypeUpdateList()" type="primary">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" @click="popup('add')">+新增</el-button>
                <!-- @click="resetForm"  -->
            </el-form-item>
        </el-form>
        <!--表格数据 -->
        <el-table ref="multipleTable" v-loading="loading" :data="tableData"
                  :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}" size="medium">
            <el-table-column prop="startTypeName" label="会员起始类型" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="updateType" label="等级变更 " show-overflow-tooltip>
                <template slot-scope="{row}">
                    <span>{{row.updateType == 1 ? "升级" : "降级"}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="endTypeName" label="目标会员类型" show-overflow-tooltip>

            </el-table-column>
            <el-table-column prop="changeLevel" label="等级变更" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" label="修改时间" show-overflow-tooltip>
                <template slot-scope="{row}">
                    {{row.updateTime || row.createTime}}
                </template>
            </el-table-column>
            <el-table-column prop="updateName" label="修改人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createName" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterType" :label="$t('food.common.status')" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <el-switch
                        style="margin-left:10px;"
                        v-model="row.state"
                        :active-value="1"
                        :inactive-value="2"
                        :active-text="row.state == 1 ? '启用' : '禁用'"
                        @change="val=>changeStatus(row, val)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commons.operating')" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" size="mini" @click="details=true">{{$t('commons.detail')}}</el-button>
                    <el-button type="text" size="mini" v-if="row.statu == 1">禁用</el-button>
                    <el-button type="text" size="mini"  @click="onDelete(row)">{{$t('commons.delete')}}</el-button>
                    <el-button type="text" size="mini" @click="popup('update', row)">修改</el-button>
                    <el-button type="text" size="mini" v-if="row.statu == 2">启用</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 详情 -->
        <el-dialog top="0" title="会员详情" :visible.sync="details">
            <el-row>
                <el-col :span="8">起始会员类型：<span>黄金卡</span></el-col>
                <el-col :span="8">目标会员类型：<span>黄金卡</span></el-col>
                <el-col :span="8">变更方式：<span>升级</span></el-col>
            </el-row>
            <el-row style="margin-top:10px">
                <el-col :span="8">创始人：<span>张三</span></el-col>
                <el-col :span="8">创建时间：<span>2020-04-22 19:23:20</span></el-col>
            </el-row>
            <el-row>
                <div style="font-size: 16px;margin-top:30px">手动变更条件</div>
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
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button @click="details = false">关闭</el-button>
            </div>
        </el-dialog>

        <!-- 新增 -->
        <el-dialog top="0" title="会员类型升降级配置" :visible.sync="newvipVisable" width="50%" >
            <el-form :model="newForm" :inline="true" :rules="rules" class="top-body" size="small" label-width="130px">
                <el-row>
                    <el-row>
                        <el-form-item label="起始会员类型:" prop="name">
                            <el-select v-model="newForm.startTypeId">
                                <el-option
                                    v-for="item in memberTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="目标会员类型:" prop="name">
                            <el-select v-model="newForm.endTypeId">
                                <el-option
                                    v-for="item in memberTypeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="变更类型:" prop="updateType">
                            {{newForm.updateType == 1 ? '升级' : '降级'}}
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-col>
                            <el-form-item label="手动独立升级:">
                                支付费用
                                <el-input style="width:200px;;margin:0 5px" v-model="newForm.prices"></el-input>
                                日元
                                <span style="color:#666666;margin-left:10px">支付费用可直接升级</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="自动升级条件:">
                            <el-form-item>
                                <el-checkbox-group v-model="newForm.type">
                                    <el-form-item>
                                        <span>累计入住消费达到</span>
                                        <el-input style="width:80px;margin:0 5px" v-model="newForm.orderContent.cumulativeCheckInPrice" ></el-input>
                                        日元
                                    </el-form-item>
                                    <el-form-item>
<!--                                        <el-checkbox label=""></el-checkbox>-->
                                        <span>单次入住消费达到</span>
                                        <el-input style="width:80px;margin:0 5px" v-model="newForm.orderContent.ontimeCheckInPrice"></el-input>
                                        日元
                                    </el-form-item>
                                    <el-row>
                                        <el-form-item>
                                            <span>入住消费达到次数</span>
                                            <el-input style="width:80px;margin:10px 5px 0" v-model="newForm.orderContent.consumption"></el-input>
                                            次
                                        </el-form-item>
                                    </el-row>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form-item>
                    </el-row>
<!--                    <el-row>-->
<!--                        <el-col>-->
<!--                            <el-form-item label="自动升级满足条件:">-->
<!--                                <el-radio-group v-model="newForm.name">-->
<!--                                    <el-radio label="任意"></el-radio>-->
<!--                                    <el-radio label="全部已选"></el-radio>-->
<!--                                </el-radio-group>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer" center>
                <el-button @click="newvipVisable = false">{{ $t('commons.cancel') }}</el-button>
                <el-button type="primary" @click="editItem" v-loading="loading">{{ $t('commons.confirm') }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
  import {
    get_goods_list,
    edit_goods_status,
    del_goods_info
  } from '@/utils/api/market'

  export default {
    props: ['memberTypeList'], //会员类型列表
    data () {
      return {
        newvipVisable: false,
        details: false,
        loading: false,
        pageTotal: 0,
        showTop: false,
        dataListSelections: [],
        status: '',
        form: {
          // name: '',
          startTypeId: '', //会员类型
          state: '',  //会员状态
          pageIndex: 1,
          pageSize: 10,
          paging: true
        },
        newForm: {
          updateType: '1',
          orderContent: {
            cumulativeCheckInPrice: '',
            ontimeCheckInPrice: '',
            consumption: '',
          }
        },
        tableData: [],//表格数据
        rules: {
          name: [
            { required: true, trigger: 'blur' },
          ]
        },
        orderContent: {
          cumulativeCheckInPrice: '',
          ontimeCheckInPrice: '',
          consumption: '',
        }
      }
    },
    mounted () {
      this.getMemberTypeUpdateList();
    },
    methods: {
      popup(type, value) {
        switch (type) {
          case 'update':
            this.newForm = value;
            this.$F.parseObjectBykey(this.newForm, 'orderContent');
            this.newvipVisable = true;
            break
          case 'add':
            this.newForm = {
                updateType: '1',
                  orderContent: {
                    cumulativeCheckInPrice: '',
                    ontimeCheckInPrice: '',
                    consumption: '',
                }
            };
            this.newvipVisable = true;
            break
          case 'ch_change':
            break
        }
      },
      //禁用/启用
      changeStatus(row, val) {
        this.$F.doRequest(this, '/pms/membertypeupdate/enable_disable', { id: row.id, state: val}, (res) => {
          this.$message.success('Success');
        })
      },

      onDelete (row) {
        this.$confirm(this.$t('commons.confirm_delete'), this.$t('commons.tip_desc'), {
          confirmButtonText: this.$t('commons.confirm'),
          cancelButtonText: this.$t('commons.cancel'),
          type: 'warning'
        }).then(res => {
          this.$F.doRequest(this, '/pms/membertypeupdate/delete', { id: row.id }, (res) => {
            this.$message.success('Delete Success');
            this.form.pageIndex = 1;
            this.getMemberTypeUpdateList();
          })
        })
      },
      editItem(row) {
        var params = this.$F.deepClone(this.newForm);
        params.orderContent = JSON.stringify(params.orderContent);
        this.$F.doRequest(this, '/pms/membertypeupdate/edit', params, (res) => {
          this.newvipVisable = false;
          this.$message.success("edit success");
          setTimeout(()=> {
            this.getMemberTypeUpdateList({pageIndex: 1});
          }, 1000)
        })
      },
      getMemberTypeUpdateList() {
        if (this.memberTypeList.length > 0) {
          this.fetchRuleList(this.memberTypeList);
        } else {
          this.$F.commons.fetchMemberTypeList({}, (memberTypeList) => {
            this.fetchRuleList(memberTypeList.list);
          })
        }
      },

      fetchRuleList(memberTypeList, params = {}) {
        this.$F.merge(params, this.form);
        this.$F.doRequest(this, '/pms/membertypeupdate/list', params, (res) => {
          this.tableData = res.list;
          this.tableData.forEach((tableItem) => {
            var startLevel = '', endLevel = '';
            memberTypeList.filter((item)=>{
              if (item.id == tableItem.startTypeId) {
                tableItem.startTypeName = item.name;
                startLevel = item.level;
              }
              if (item.id == tableItem.endTypeId) {
                tableItem.endTypeName = item.name;
                endLevel = item.level;
              }
            })
            tableItem.changeLevel = `${startLevel}->${endLevel}`;
          })
          this.totalPage = res.page.count;
          this.$forceUpdate()
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>


