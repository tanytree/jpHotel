/*
* @Author: 管理部首页
* @Date: 2020-03-10 13:45:16
* @Last Modified by:
* @Last Modified time: 2020-03-11 16:59:58
*/
<template>
	<div class="boss-index">
		<el-tabs class="pageTab" v-model="activeName">
			<!-- 房间动态 -->
			<el-tab-pane label="房间动态" name="one">
				<div class="demo-form-inline">
					<div class="tag-group">
						<span class="tag-group__title">房态:</span>
						<el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" class="tag-width margin-l-8">
							{{ item.label }}
						</el-tag>
					</div>
					<el-form class="demo-form-inline" inline size="small" style="margin-left: 100px;">
						<el-form-item label="楼层楼栋:" class="margin-l-8">
							<el-select v-model="roomStatus.dong" placeholder="楼栋" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
							<el-select v-model="roomStatus.tag" placeholder="楼层" class="row-width">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
							<el-button plain style="width: 100px;" size="mini">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="demo-form-inline">
					<div class="tag-group">
						<span class="tag-group__title">房型:</span>
						<el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" class="tag-width margin-l-8">
							{{ item.label }}
						</el-tag>
					</div>
				</div>
				<div>
					<el-row :gutter="20" style="margin-top: 10px;">
						<el-col :span="4">大仓集团第一酒店 3层</el-col>
						<el-col :span="1" :offset="0.5" style="color: #999;"><span style="color: #126eff;">9</span>/12</el-col>
					</el-row>
					<el-row :gutter="20" style="margin-top: 10px;">
						<el-col :span="4" class="tag-margin" :style="`height:120px;background:${value.bgColor}`" v-for="(value, index) in roomList"
						 :key="index">
							<el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
								<el-col :span="3">A001</el-col>
								<el-col :span="8" :offset="2">标准间</el-col>
							</el-row>
							<!-- 清扫图标后期加 -->
						</el-col>
					</el-row>
				</div>
				<div>
					<el-row :gutter="20" style="margin-top: 10px;">
						<el-col :span="4">大仓集团第一酒店 1层</el-col>
						<el-col :span="1" :offset="0.5" style="color: #999;"><span style="color: #126eff;">9</span>/12</el-col>
					</el-row>
					<el-row :gutter="20" style="margin-top: 10px;">
						<el-col :span="4" class="tag-margin" :style="`height:120px;background:${value.bgColor}`" v-for="(value, index) in roomList"
						 :key="index">
							<el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
								<el-col :span="3">A001</el-col>
								<el-col :span="8" :offset="2">标准间</el-col>
							</el-row>
							<!-- 清扫图标后期加 -->
						</el-col>
					</el-row>
				</div>
			</el-tab-pane>
			<!-- 夜审设置 -->
			<el-tab-pane label="夜审设置" name="two" class="font">
				<div class="tag-top">
					<el-col :span="2">
						<el-checkbox v-model="checked">处理应到未到</el-checkbox>
					</el-col>
					<el-col :span="8" offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
				</div>
				<div class="tag-top">
					<el-col :span="2">
						<el-checkbox v-model="checked">处理应离未离</el-checkbox>
					</el-col>
					<el-col :span="8" offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
				</div>
				<div class="tag-top">
					<el-col :span="2">
						<el-checkbox v-model="checked">处理走结订单</el-checkbox>
					</el-col>
					<el-col :span="8" offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
				</div>
				<div class="tag-top">
					<el-col :span="2">
						<el-checkbox v-model="checked">夜审房间状态OD</el-checkbox>
					</el-col>
					<el-col :span="8" offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
				</div>
				<div class="tag-top">
					<el-col :span="2">
						<el-checkbox v-model="checked">夜审自动交班</el-checkbox>
					</el-col>
					<el-col :span="8" offset="1" style="color: #888888;">如果勾选,则不处理应到未到订单将无法处理</el-col>
				</div>
				<div class="tag-top" style="padding: 20px 0px;">
					<el-col :span="2">夜审方式:</el-col>
					<el-col :span="4">
						<el-radio v-model="radio" label="1">手动夜审+自动夜审</el-radio>
					</el-col>
					<el-col :span="3">
						<el-radio v-model="radio" label="1" offset="1">手动夜审</el-radio>
					</el-col>
					<el-col :span="3">
						<el-radio v-model="radio" label="1" offset="1">自动夜审</el-radio>
					</el-col>
				</div>
				<div class="demo-form-inline" style="padding: 20px 0px;">
					<el-col :span="2.5">允许夜审时间段:</el-col>
					<el-col :span="6">
						<el-time-picker is-range v-model="two.time" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
						 placeholder="选择时间范围" style="width: 400px;">
						</el-time-picker>
					</el-col>
				</div>
				<div class="demo-form-inline" style="padding: 20px 0px;">
					<el-col :span="2.5">自动夜审时间:</el-col>
					<el-col :span="4.5">
						<el-time-picker v-model="two.time" :picker-options="{selectableRange: '18:30:00 - 20:30:00'}" placeholder="任意时间点">
						</el-time-picker>
					</el-col>
					<el-col :span="8" offset="0.5" style="color: #888888;">系统将在设定的夜审时间五分钟内自动执行夜审</el-col>
				</div>
				<el-button type="primary" style="width: 80px;">保存</el-button>
			</el-tab-pane>
			<!-- 发票维护 -->
			<el-tab-pane label="发票维护" name="three">
				<el-row>
					<el-tabs v-model="activeThree">
						<el-tab-pane label="开票信息设置" name="a">
							<el-row :gutter="20">
								<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
									<el-col :span="8">
										<el-form-item label="纳税人识别号:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="税控盘口令:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="税务数字证书密码:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="电子设备类型:" prop="name">
											<el-select v-model="threeForm.kinds" placeholder="请电子设备类型" style="width: 200px;">
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="电子税控盘编号:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="电子开票点编号:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="纸质设备类型:" prop="name">
											<el-select v-model="threeForm.kinds" placeholder="请电子设备类型" style="width: 200px;">
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="纸质开票点编码:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="国家商品编码:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="税率:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="开票人:" prop="name">
											<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="是否允许:" prop="name">
											<el-checkbox v-model="checked">是否允许开票金额超过消费金额</el-checkbox>
										</el-form-item>
									</el-col>
								</el-form>
							</el-row>
							<el-row>
								<el-button type="primary" style="width: 80px;">保存</el-button>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="扫描开票" name="b">
							<el-row style="display: flex;justify-content: center;">
								<el-card class="box-card">
									<el-button type="primary" icon="el-icon-search" style="width: 200px;background-color: #126EFF;display: flex;align-items: center;justify-content: center;">微信扫码开票</el-button>
									<el-col style="height: 200px; width: 200px;background-color: #CCCCCC;display: flex;align-items: center;margin-top: 20px;"></el-col>
								</el-card>
								<el-row>
									<el-button type="warning" icon="el-icon-star-off" circle class="fix-circle"></el-button>
								</el-row>
							</el-row>
							<el-row :gutter="20" style="display: flex;justify-content: center;">
								<el-col :span="20">
									<el-steps active="0" finish-status="success" align-center style="padding: 40px 0px;">
										<el-step description="请顾客使用手机微信扫描以上二维码"></el-step>
										<el-step description="请顾客填写开票信息 并提交开票申请"></el-step>
										<el-step description="进入前台部 > 首页 >发票申请 完成开票"></el-step>
									</el-steps>
								</el-col>
							</el-row>
						</el-tab-pane>
					</el-tabs>
				</el-row>
			</el-tab-pane>
			<!-- 损物赔偿 -->
			<el-tab-pane label="损物赔偿" name="four">
				<el-row>
					<el-tabs v-model="activeFour">
						<el-tab-pane label="损物赔偿类型" name="four_a">
							<el-row :gutter="20">
								<el-col :span="6" :offset="20">
									<el-button type="primary" style="width: 100px;" size="small" @click="popup_kinds">新增类型</el-button>
								</el-col>
							</el-row>
							<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
							 @selection-change="handleSelectionChange">
								<el-table-column prop="name" label="名称" show-overflow-tooltip></el-table-column>
								<el-table-column label="操作" width="300">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="popup_kinds">修改</el-button>
										<el-popconfirm :title="$t('commons.confirm_delete')" @onConfirm="onConfirm">
											<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)"{{$t('commons.delete')}}/el-button>
										</el-popconfirm>
									</template>
								</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="损物赔偿物品" name="four_b">
							<el-row :gutter="24" class="demo-form-inline">
								<el-col :span="18">
									<el-form class="demo-form-inline" inline size="small">
										<el-form-item label="物品名称:">
											<el-input v-model="fourForm.name" class="row-width"></el-input>
										</el-form-item>
										<el-form-item label="物品类型:" class="margin-l-8">
											<el-select v-model="fourForm.name" placeholder="请选择状态" class="row-width">
												<el-option label="区域一" value="shanghai"></el-option>
												<el-option label="区域二" value="beijing"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item>
											<el-button type="primary" style="width: 80px;">查询</el-button>
											<el-button style="width: 80px;">重置</el-button>
										</el-form-item>
									</el-form>
								</el-col>
								<el-col :span="2" :offset="5">
									<el-button type="primary" size="small" style="width: 80px; margin-bottom: 18px;" @click="popup_thing">+ 新增</el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
								 @selection-change="handleSelectionChange">
									<el-table-column prop="name" label="物品类型" show-overflow-tooltip></el-table-column>
									<el-table-column prop="name" label="物品名称" show-overflow-tooltip></el-table-column>
									<el-table-column prop="name" label="赔偿单价"></el-table-column>
									<el-table-column prop="name" label="状态" show-overflow-tooltip></el-table-column>
									<el-table-column label="操作" width="150">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="popup_thing(scope.row)">修改</el-button>
											<el-popconfirm :title="$t('commons.confirm_delete')" @onConfirm="onConfirm">
												<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)"{{$t('commons.delete')}}/el-button>
											</el-popconfirm>
										</template>
									</el-table-column>
								</el-table>
								<div class="block">
									<div class="page-all">
										共
										<span style="font-weight:600;font-size: 14px;">400</span>条记录
									</div>
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
									 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
								</div>
							</el-row>
						</el-tab-pane>
					</el-tabs>
				</el-row>
			</el-tab-pane>
			<!-- 交班设置 -->
			<el-tab-pane label="交班设置" name="five">
				<el-row>
					<el-tabs v-model="activeFive">
						<el-tab-pane label="交版模式" name="five_a">
							<el-row :gutter="20" class="tag-top" style="padding: 20px 0px;">
								<el-col :span="3">交班模式:</el-col>
								<el-col :span="4" v-for="(value, index) in five_redioList" :key="index">
									<el-checkbox v-model="value.redio" @change="changeRedio_five(value,index)">{{value.name}}</el-checkbox>
								</el-col>
							</el-row>
							<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;" v-if="beiYong_show">
								<el-col :span="3">备用金:</el-col>
								<el-col :span="8">
									<el-input v-model="five_money" placeholder="请输入备用金"></el-input>
								</el-col>
								<el-col :span="8" offset="0.5" style="color: #888888;">日元</el-col>
							</el-row>
							<el-row :gutter="18" class="demo-form-inline" style="padding: 20px 0px;">
								<el-col :span="3">模式说明:</el-col>
								<el-col :span="8">
									<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="five_money"></el-input>
								</el-col>
							</el-row>
							<el-row>
								<el-button type="primary" style="width: 80px;">保存</el-button>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="班次管理" name="five_b">
							<el-row :gutter="24" class="demo-form-inline">
								<el-col :span="2" :offset="22">
									<el-button type="primary" size="small" style="width: 80px; margin-bottom: 18px;" @click="popup_thing">+ 新增</el-button>
								</el-col>
							</el-row>
							<el-row>
								<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
								 @selection-change="handleSelectionChange">
									<el-table-column prop="name" label="班次名称">
										<template slot-scope="name">
											<el-input v-model="five_money"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="开始时间">
										<template slot-scope="name">
											<el-time-select v-model="five_money" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
											 placeholder="选择时间"></el-time-select>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="结束时间">
										<template slot-scope="name">
											<el-time-select v-model="five_money" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
											 placeholder="选择时间"></el-time-select>
										</template>
									</el-table-column>
									<el-table-column label="操作" width="150">
										<template slot-scope="scope">
											<el-button type="text" size="small" @click="popup_thing(scope.row)">编辑</el-button>
											<el-popconfirm :title="$t('commons.confirm_delete')" @onConfirm="onConfirm">
												<el-button slot="reference" type="text" size="small" @click="deleteRow(scope.row)"{{$t('commons.delete')}}/el-button>
											</el-popconfirm>
										</template>
									</el-table-column>
								</el-table>
								<div class="block">
									<div class="page-all">
										共
										<span style="font-weight:600;font-size: 14px;">400</span>条记录
									</div>
									<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
									 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout=" sizes, prev, pager, next, jumper" :total="400"></el-pagination>
								</div>
							</el-row>
							<el-row>
								<el-button type="primary" style="width: 80px;">保存</el-button>
							</el-row>
						</el-tab-pane>
					</el-tabs>
				</el-row>
			</el-tab-pane>
			<!-- 酒店服务 -->
			<el-tab-pane label="酒店服务" name="six">
				<el-row>
					<el-col style="font-size: 13px; font-weight: bolder;">酒店图片</el-col>
				</el-row>
				<el-row style="padding: 20px 0px;">
					<el-upload action="#" list-type="picture-card" :auto-upload="false" :multiple="true">
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{file}">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
							<span class="el-upload-list__item-actions">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
									<i class="el-icon-zoom-in"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
									<i class="el-icon-download"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
									<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
					<el-dialog top="0" :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-row>
				<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
					<el-col style="font-size: 13px; font-weight: bolder;">酒店信息</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-form :model="threeForm" :rules="threerules" ref="ruleForm" label-width="100px">
						<el-col :span="8">
							<el-form-item label="酒店名称:" prop="name">
								<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="酒店地址:" prop="name">
								<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="前台电话:" prop="name">
								<el-input v-model="threeForm.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="入住时间:" prop="name">
								<el-date-picker v-model="threeForm.name" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"
								 style="width: 200px;"></el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="退房时间:" prop="name">
								<el-date-picker v-model="threeForm.name" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions"
								 style="width: 200px;"></el-date-picker>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-row style="border-top: 1px solid #e5e5e5;padding: 20px 0px;">
					<el-col style="font-size: 13px; font-weight: bolder;">酒店简介</el-col>
				</el-row>
				<el-row :gutter="22" class="demo-form-inline">
					<el-col :span="2" style="font-size: 14px;">酒店简介:</el-col>
					<el-col :span="20">
						<el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="five_money" style="width: 100%;"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary" style="width: 80px;">保存</el-button>
				</el-row>
			</el-tab-pane>
			<!-- 打印管理 -->
			<el-tab-pane label="打印管理" name="seven">
				<el-row>
					<el-tabs v-model="activeFive">
						<el-tab-pane label="打印参数" name="five_a">
							<el-row :gutter="20" class="tag-top" style="padding: 20px 0px;">
								<el-row style="padding: 20px 0px;">打印单据选择:</el-row>
								<el-col :span="4" v-for="(value, index) in seven_redioList" :key="index">
									<el-checkbox v-model="value.redio" @change="changeRedio_five(value,index)">{{value.name}}</el-checkbox>
								</el-col>
							</el-row>
							<el-row>
								<el-button type="primary" style="width: 80px;">保存</el-button>
							</el-row>
						</el-tab-pane>
						<el-tab-pane label="打印格式" name="five_b">
							<el-row>
								<el-table ref="multipleTable" :data="four_tableData" tooltip-effect="dark" :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
								 @selection-change="handleSelectionChange">
									<el-table-column prop="name" label="单据名称" show-overflow-tooltip></el-table-column>
									<el-table-column prop="name" label="打印份数">
										<template slot-scope="name">
											<el-input v-model="five_money"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="单据备注">
										<template slot-scope="name">
											<el-input type="textarea" :rows="2" v-model="five_money"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="打印格式" width="400">
										<template slot-scope="name">
											<el-radio v-model="radio" label="1">A4</el-radio>
											<el-radio v-model="radio" label="2">A4-1/2</el-radio>
											<el-radio v-model="radio" label="3">A4-1/3</el-radio>
											<el-radio v-model="radio" label="4">POS(76mm)</el-radio>
										</template>
									</el-table-column>
								</el-table>
							</el-row>
							<el-row>
								<el-button type="primary" style="width: 80px;">保存</el-button>
							</el-row>
						</el-tab-pane>
					</el-tabs>
				</el-row>
			</el-tab-pane>
			<!-- 员工权限 -->
			<el-tab-pane label="员工权限" name="eight">
				<div class="second-body">
					<div class="title">
						<span>管理部</span>
					</div>
					<div class="row-body">
						<div class="row-line">
							<div class="row-item">
								<img class="row-img" src="../../assets/images/caigou/kuai01.png" alt="">
								<span class="default-text">章欣</span>
								<span class="active-facus">总经理</span>
							</div>
							<div class="row-item">
								<el-dropdown @command="handleCommand">
									<span class="el-dropdown-link">
										操作<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item command="a">查看资料</el-dropdown-item>
										<el-dropdown-item command="b">权限设置</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 损物赔偿-新增/修改类型 -->
		<el-dialog top="0" title="新增类型" :visible.sync="dialogAdd_kinds" :close-on-click-modal="false">
			<el-form :model="fourForm" :rules="fourrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row class="demo-form-inline">
					<el-col>
						<el-form-item label="类型名称" prop="name">
							<el-input v-model="fourForm.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 损物赔偿-新增/修改物品 -->
		<el-dialog top="0" title="新增" :visible.sync="dialogAdd_thing" :close-on-click-modal="false">
			<el-form :model="fourForm" :rules="fourrules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-form-item label="物品类型:" prop="name">
						<el-select v-model="fourForm.name" placeholder="请选择物品类型" style="width: 100%;">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="物品名称:" prop="name">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="赔偿单价:" prop="name">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="成本价格">
						<el-input v-model="fourForm.name"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio v-model="radio" label="1">启用</el-radio>
						<el-radio v-model="radio" label="2">禁用</el-radio>
					</el-form-item>
					<el-form-item label="状态">
						<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="fourForm.name"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'one',
				roomStatus: {
					dong: '', //楼栋
					tag: '' //楼层
				},
				items: [{
						type: '',
						label: '全部(200)'
					},
					{
						type: 'success',
						label: '空净(20)'
					},
					{
						type: 'info',
						label: '空脏(20)'
					},
					{
						type: 'danger',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					},
					{
						type: 'warning',
						label: '空脏(20)'
					}
				],
				roomList: [{
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#27ae76'
					},
					{
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '单间',
						bgColor: '#b07b2e'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#c0512b'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}, {
						hao: 'A001',
						status: 1,
						status_name: '标准间',
						bgColor: '#276bba'
					}
				],
				checked: true,
				two: {
					time: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
				},
				activeThree: 'a',
				threeForm: {
					name: '',
					kinds: ''
				},
				threerules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				activeFour: 'four_a',
				four_tableData: [{
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}, {
					name: '张十三',
					time: '2020-5-20',
					job_status: '实习期',
					job: '普通员工',
					number: '11223',
					parts: '销售部'
				}],
				fourForm: {
					name: ''
				},
				fourrules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				},
				dialogAdd_kinds: false,
				dialogAdd_thing: false,

				activeFive: 'five_a',
				beiYong_show: true,
				five_redioList: [{
					name: '现金流模式',
					radio: true
				}, {
					name: '实收模式',
					radio: false
				}, {
					name: '应收模式',
					radio: false
				}],
				five_money: '',

				seven_redioList: [{
					name: '寄存单',
					radio: true
				}, {
					name: '预收款单',
					radio: false
				}, {
					name: '定金单',
					radio: false
				}, {
					name: '商品消费单',
					radio: true
				}, {
					name: '入住消费单',
					radio: false
				}, {
					name: '餐饮消费单',
					radio: false
				}],

				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		methods: {
			popup_thing() {
				this.dialogAdd_thing = true;
			},
			popup_kinds() {
				this.dialogAdd_kinds = true;
			},
			// 交班模式选择,非现金流时不显示备用金
			changeRedio_five(value, index) {
				this.five_redioList.forEach((value, index) => {
					value.redio = false
				})
				this.five_redioList[index].redio = true
				if (this.five_redioList[0].redio == true) {
					this.beiYong_show = true
				} else {
					this.beiYong_show = false
				}
			},
			//上传图片
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.tag-width {
		width: 80px;
		display: flex;
		justify-content: center;
	}

	.tag-margin {
		margin-right: 8px;
		margin-top: 8px;
	}

	.row-width {
		width: 120px;
	}

	.font {
		font-size: 13px;
	}

	.tag-top {
		margin-top: 10px;
	}

	.tag-group {
		display: flex;
		align-items: center;
		margin-bottom: 18px;
	}

	.box-card {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 350px;
		height: auto;
		padding: 10px 20px;
	}

	.fix-circle {
		height: 45px;
		width: 45px;
		position: absolute;
		bottom: -20px;
		right: -20px;
	}

	// 下拉标题
	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	// ========
	.second-body {
		.title {
			border-bottom: 1px solid #E4E7ED;

			span {
				display: flex;
				padding: 15px 0px;
				font-weight: bolder;
			}
		}

		.row-body {
			.row-line {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 15px 0px;
				border-bottom: 1px solid #e5e5e5;

				.row-item {
					display: flex;
					align-items: center;
					font-size: 12px;

					.row-img {
						height: 40px;
						width: 40px;
						border-radius: 50%;
						background-color: #F2F2F2;
					}

					.default-text {
						padding: 0px 15px;
					}

					.active-facus {
						border: 1px solid #126eff;
						padding: 3px 15px;
						border-radius: 5px;
						color: #126eff;
					}
				}
			}
		}
	}
</style>
