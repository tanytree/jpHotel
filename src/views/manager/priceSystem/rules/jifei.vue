<template>
  <div>
    <el-row>
      <el-row :gutter="20">
        <el-row>
          <el-form class="demo-form-inline" inline size="small">
            <el-form-item :label="$t('manager.ps_memberType') + ':'">
              <el-input v-model="ruleForm_r.name" class="row-width"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100px"
                size="mini"
                @click="get_hotel_rule_member_price_list"
                >{{ $t("commons.queryBtn") }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-row>
        <div class="components-edit">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="{ background: '#F7F7F7', color: '#1E1E1E' }"
          >
            <el-table-column
              prop="name"
              :label="$t('manager.ps_memberType')"
            ></el-table-column>
            <el-table-column :label="$t('manager.ps_accountingRules')">
              <template slot-scope="{ row }">
                <span v-if="row.hotelRuleMemberPrice">{{ row.hotelRuleMemberPrice.alldayRuleName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" :label="$t('boss.loginDetail_state')">
              <template slot-scope="{ row }">
                <span>{{
                  row.state==1 ? $t("commons.enable") : $t("commons.disable")
                }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('commons.operating')" width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="popup('sit', scope.row)"
                  >{{ $t("manager.ps_setUp") }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="ruleForm_r.pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="ruleForm_r.pageSize"
            :total="ruleForm_r.totalSize"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-row>
    </el-row>

    <!-- 设置 -->
    <el-dialog
      top="0"
      :title="$t('manager.ps_setUp')"
      :visible.sync="dialogsit"
      :close-on-click-modal="false"
    >
      <el-row :gutter="20">
        <el-form :model="ruleForm" ref="ruleForm" label-width="150px">
          <el-col :span="18">
            <el-form-item :label="$t('manager.ps_memberType') + ':'">
              <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item :label="$t('boss.loginDetail_state') + ':'">
              <el-radio-group v-model="ruleForm.state">
                <el-radio :label="1">{{ $t("commons.enable") }}</el-radio>
                <el-radio :label="2">{{ $t("commons.disable") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item
              :label="$t('manager.ps_accountingRules') + ':'"
              class="margin-l-15"
            >
              <el-select
                v-model="ruleForm.alldayRuleId"
                :placeholder="ruleForm.alldayRuleName"
                style="width: 100%"
              >
                <el-option
                  :label="value.ruleName"
                  :value="value.id"
                  v-for="(value, index) in ruleList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogsit = false">{{
          $t("commons.cancel")
        }}</el-button>
        <el-button type="primary" @click="saveInfo">{{
          $t("commons.determine")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
	export default {
			data() {
				return {
					tab_show: true,
					tableData: [],
					ruleForm_r: {
						name: "",
						pageIndex: 1,
						pageSize: 10,
						totalSize: 0,
					},
					ruleForm: {
						name: '',
						memberId: '',
						state: 1,
						alldayRuleId: '',
						alldayRuleName: ''
					},
					dialogsit: false,
					alldayRuleId: "",
					alldayRuleId_name: "",
					ruleList: [], // 全天房计费规则
				};
			},
			created() {
				this.get_hotel_rule_member_price_list();
			},
			computed: {
				resetSuccess: {
					get() {
						return this.$t("manager.ps_resetSuccess");
					},
					set() {},
				},
			},
			watch: {
				resetSuccess(newValue, oldValue) {
					this.resetSuccess = newValue;
				},
			},
			methods: {
				popup(type, value) {
					// 
					switch (type) {
						case "sit":
							this.dialogsit = true;
							this.ruleForm = value;
							// 
							// this.ruleForm.alldayRuleId = this.ruleForm.hotelRuleMemberPrice.alldayRuleId;
							// this.ruleForm.alldayRuleName = this.ruleForm.hotelRuleMemberPrice.alldayRuleName;
							this.ruleList = [];
							this.get_hotel_rule_allday_list();
							break;
					}
				},
				// 查询
				searchBtn() {
					this.tableData = [];
					this.get_hotel_rule_member_price_list();
				},
				// changeRule(e) {
				// 	this.ruleForm.alldayRuleId = ""
				// 	this.ruleForm.alldayRuleId = '';
				// 	
				// },
				saveInfo() {
					let params = {
						id: this.ruleForm.hotelRuleMemberPrice.id,
						memberId: this.ruleForm.hotelRuleMemberPrice.memberId,
						alldayRuleId: this.ruleForm.alldayRuleId,
						state: this.ruleForm.state,
					};
					this.$F.doRequest(
						this,
						"/pms/hotel/hotel_rule_member_price_save",
						params,
						(res) => {
							this.tableData = [];
							this.dialogsit = false;
							this.get_hotel_rule_member_price_list();
							this.$message({
								message: this.resetSuccess,
								type: "success",
							});
						}
					);
				},
				// 获取 计费规则全天房计费列表
				get_hotel_rule_allday_list() {
					let params = {
						pageIndex: 1,
						pageSize: 999,
						totalSize: 0,
					};
					this.$F.doRequest(
						this,
						"/pms/hotel/hotel_rule_allday_list",
						params,
						(res) => {
							if (res.list.length != 0) {
								res.list.forEach((item) => {
									if (item.status != 2) {
										this.ruleList.push(item);
									}
								});
							}
						}
					);
				},
				// 获取 全部房型
				get_hotel_room_type_list() {
					let params = {
						roomType: 3,
						paging: false,
						pageIndex: 1,
						pageSize: 999,
					};
					this.$F.doRequest(
						this,
						"/pms/hotel/hotel_room_type_list",
						params,
						(res) => {
							if (res.list.length != 0) {
								res.list.forEach((item) => {
									item.startPrice = "";
									item.hourAddPrice = "";
									item.topPrice = "";
									item.remark = "";
								});
								this.allForm.roomStrategyJson = res.list;
								this.ruleForm_h.roomStrategyJson = res.list;
							}
						}
					);
				},
				// 获取 计费规则时租房计费列表
				get_hotel_rule_member_price_list() {
					let params = Object.assign({}, this.ruleForm_r);
					this.$F.doRequest(
						this,
						"/pms/hotel/hotel_rule_member_price_list",
						params,
						(res) => {
							if (res.list.length != 0) {
								this.tableData = res.list;
								this.ruleForm_r.totalSize = res.totalSize;
							}
						}
					);
				},
				back() {
					this.tab_show = true;
				},
				// 分页
				handleSizeChange(val) {
					this.ruleForm_r.pageSize = val;
					this.ruleForm_r.pageIndex = 1;
					this.get_hotel_rule_member_price_list();
				},
				handleCurrentChange(val) {
					console.log(`当前页: ${val}`);
					this.ruleForm_r.pageIndex = val;
					this.get_hotel_rule_member_price_list();
				},
			},
		};
</script>
