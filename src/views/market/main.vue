/*
前台部
*/
<template>
  <div>
    <el-tabs class="pageTab" v-model="activeName">
      <!-- 房间动态 -->
      <el-tab-pane label="房间动态" name="one">
        <el-row>
          <el-col :span="5">
            <div>
              <div>
                <el-input v-model="input" class="search" placeholder="姓名/房号"></el-input>
                <span class="card">身份证</span>
                <span class="card">房卡</span>
              </div>
              <!-- <div  style="border-bottom: 1px dashed #ccc;"></div> -->
            </div>
            <!-- <div style="border:border:1px dashed #ccc"></div> -->
            <!-- 房态 -->
            <div>
              <div style="margin-top:20px">
                <span class="fangtai">房态</span>
                <span class="all">全部100</span>
                <span class="rescet">重置</span>
              </div>
              <!-- <div class="tag-width margin-l"> -->
              <!-- <el-tag v-for="item in items" :key="item.label" :type="item.type" effect="plain" >
                  {{ item.label }}
              </el-tag>-->
              <div style="margin-top:10px">
                <el-row>
                  <el-col>
                    <el-checkbox v-model="checked1" v-for="item in items" :key="item.label">
                      <el-tag :type="item.type" effect="plain" size="mini">{{ item.label }}</el-tag>
                    </el-checkbox>
                  </el-col>
                </el-row>
                <div style="border-bottom: 1px dashed #ccc;margin:10px 0"></div>
              </div>
            </div>
            <!-- 房型 -->
            <div>
              <div style="margin-top:20px">
                <span class="fangtai">房型</span>
                <span class="all">可订数/总房数</span>
                <span class="rescet">重置</span>
              </div>

              <el-row style="margin-top:12px">
                <el-col>
                  <el-checkbox
                    v-model="checked"
                    style="width:100%;position: relative;margin-top:10px"
                  >
                    标准间
                    <span style="position: absolute;right:0">4/16</span>
                  </el-checkbox>
                  <el-checkbox
                    v-model="checked"
                    style="width:100%;position: relative;margin-top:10px"
                  >
                    总统套房
                    <span style="position: absolute;right:0">4/16</span>
                  </el-checkbox>
                  <el-checkbox
                    v-model="checked"
                    style="width:100%;position: relative;margin-top:10px"
                  >
                    大床房
                    <span style="position: absolute;right:0">4/16</span>
                  </el-checkbox>
                  <el-checkbox
                    v-model="checked"
                    style="width:100%;position: relative;margin-top:10px"
                  >
                    单间
                    <span style="position: absolute;right:0">4/16</span>
                  </el-checkbox>
                </el-col>
              </el-row>
              <div style="border-bottom: 1px dashed #ccc;margin:10px 0"></div>
            </div>

            <!-- 楼栋楼层 -->
            <el-row>
              <el-form inline size="small">
                <el-form-item label="楼层楼栋:">
                  <el-select v-model="roomStatus.dong" placeholder="楼栋" class="row-width">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="roomStatus.tag" placeholder="楼层" class="row-width margin-l">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div style="border-bottom: 1px dashed #ccc;margin:10px 0"></div>
            </el-row>

            <!-- 渠道 -->
            <div>
              <div style="margin-top:20px">
                <span class="fangtai">渠道</span>
                <span class="rescet">重置</span>
              </div>

              <div style="margin-top:10px">
                <el-checkbox v-model="checked2">
                  飞猪
                  <span>0</span>
                </el-checkbox>
                <el-checkbox v-model="checked2">
                  去哪儿
                  <span>0</span>
                </el-checkbox>
                <el-checkbox v-model="checked2">
                  携程
                  <span>0</span>
                </el-checkbox>
                <el-checkbox v-model="checked2">
                  美团
                  <span>0</span>
                </el-checkbox>
              </div>
            </div>
          </el-col>

          <el-col :span="19" style="padding-left:25px">
            <el-row>
              <el-row>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
                <el-checkbox v-model="checked3">
                  钟点房
                  <span>20</span>
                </el-checkbox>
              </el-row>

              <el-row :gutter="20" style="margin-top: 10px;">
                <el-col :span="5">
                  大仓集团第一酒店
                  <span>3</span>层
                </el-col>
                <el-col :span="1" :offset="0.5" style="color: #999;">
                  <span style="color: #126eff;">9</span>/12
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top: 10px;">
                <el-col
                  :span="4"
                  class="tag-margin"
                  :style="`height:120px;background:${value.bgColor}`"
                  v-for="(value, index) in roomList"
                  :key="index"
                >
                  <el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
                    <el-col :span="3">A001</el-col>
                    <el-col :span="8" :offset="2">标准间</el-col>
                  </el-row>
                  <!-- 清扫图标后期加 -->
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-row :gutter="20" style="margin-top: 10px;">
                <el-col :span="5">大仓集团第一酒店 1层</el-col>
                <el-col :span="1" :offset="0.5" style="color: #999;">
                  <span style="color: #126eff;">9</span>/12
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top: 10px;">
                <el-col
                  :span="4"
                  class="tag-margin"
                  :style="`height:120px;background:${value.bgColor}`"
                  v-for="(value, index) in roomList"
                  :key="index"
                >
                  <el-row style="color: #FFFFFF;font-size: 13px;margin-top: 10px;">
                    <el-col :span="3">A001</el-col>
                    <el-col :span="8" :offset="2">标准间</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
            <el-row>
              <!-- <el-button>批量置脏/置净</el-button>  -->
              <el-button @click="batch = true">批量置脏/置净</el-button>

              <el-dialog title="批量置脏/置净" width="700px" :visible.sync="batch">
                <el-row style="margin:10px 20px">
                  <el-row style="text-align:center; margin-bottom: 10px;">
                    <el-button>批量置脏</el-button>
                    <el-button>批量置净</el-button>
                  </el-row>

                  <el-form>
                    <el-col :span="16">
                      <el-form-item label="选择房间" :label-width="formLabelWidth">
                        <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                        <el-input autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item>
                        <el-button
                          style="width:80px;margin-left:20px"
                          type="primary"
                          @click="batchForm('batchform')"
                        >提交</el-button>
                        <el-button style="width:80px" @click="resetbatch('batchform')">重置</el-button>
                      </el-form-item>
                    </el-col>

                    <el-row style="margin-left:40px">
                      <el-checkbox v-model="checked">全部 120</el-checkbox>
                      <el-checkbox v-model="checked">催押 20</el-checkbox>
                      <el-checkbox v-model="checked">欠费 120</el-checkbox>
                    </el-row>
                  </el-form>
                </el-row>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button style="width:80px;" @click="batch = false">取 消</el-button>
                  <el-button style="width:80px;" type="primary" @click="batch = false">确 定</el-button>
                </div>
              </el-dialog>

              <el-button>打印房态盘</el-button>

              <el-button type="primary" @click="print = true">
                <i class="el-icon-message-solid"></i>催押
              </el-button>

              <el-dialog title="当前催交" width="1160px" :visible.sync="print">
                <el-form :model="form">
                  <!-- :model="form" -->
                  <el-col :span="6">
                    <el-form-item label="房间号：">
                      <el-input v-model="form.roomname" style="width:160px" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                      <el-input v-model="form.phonenum" style="width:160px" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="姓名：" :label-width="formLabelWidth">
                      <el-input v-model="form.peoplename" style="width:160px" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item>
                      <el-button
                        style="width:80px;margin-left:20px"
                        type="primary"
                        @click="submitForm('form')"
                      >提交</el-button>
                      <el-button style="width:80px" @click="resetForms('form')">重置</el-button>
                    </el-form-item>
                  </el-col>

                  <el-row>
                    <el-checkbox v-model="checked">全部 120</el-checkbox>
                    <el-checkbox v-model="checked">催押 20</el-checkbox>
                    <el-checkbox v-model="checked">欠费 120</el-checkbox>
                  </el-row>

                  <el-row>
                    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>-->
                  </el-row>
                </el-form>

                <el-row>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="房间号" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="入住人" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="总消费" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="押金" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="余额" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="状态" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="手机号" width="120">
                      <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <!-- <el-button
                            size="mini"
                        @click="Edit(scope.$index, scope.row)">账单详情</el-button>-->
                        <el-button
                          type="text"
                          @click="Edit(scope.$index, scope.row)"
                          size="mini"
                        >账单详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-row>
                <div slot="footer" class="dialog-footer" style="text-align:center">
                  <el-button type="primary" @click="print = false">关闭</el-button>
                </div>
              </el-dialog>

              <!-- <el-button type="primary"><i class="el-icon-message-solid"></i>催押</el-button> -->
              <!-- 图标 -->
              <el-popover placement="top-start" width="840" trigger="hover">
                <!-- <p>hdfkhajkghgh</p> -->
                <div>
                  <h3>图标说明</h3>
                  <el-col :span="3">
                    <span class="inco">钟</span>
                    <span>钟点房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">免</span>
                    <span>免费房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">午</span>
                    <span>午夜房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">订</span>
                    <span>预定房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">离</span>
                    <span>今日预离</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">免</span>
                    <span>免费房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">午</span>
                    <span>午夜房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">订</span>
                    <span>预定房</span>
                  </el-col>
                  <el-col :span="3">
                    <span class="inco">离</span>
                    <span>今日预离</span>
                  </el-col>
                </div>

                <el-button slot="reference">
                  <i class="el-icon-question"></i>图标
                </el-button>
              </el-popover>
            </el-row>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- 开票申请 -->
      <el-tab-pane label="开票申请" name="two" class="font" style=" text-align: center;">
        <el-row>
          <el-tabs v-model="activeThree">
            <el-tab-pane label="待开票" name="a">
              <div style="text-align: left;">
                <span>发票类型：</span>
                <el-button>不限</el-button>
                <el-button>增值税专用发票</el-button>
                <el-button>增值税普通发票</el-button>
                <el-button>增值税电子发票</el-button>
              </div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="客户名称">
                  <el-input v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item label="房间号">
                  <el-input v-model="formInline.hostel"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button style="width:80px" type="primary" @click="onSubmit">查询</el-button>
                  <el-button style="width:80px" @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
              </el-form>

              <div>
                <el-table :data="tableData" style="width: 100%">
                  <el-table-column label="客户名称" width="100">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                  </el-table-column>
                  <el-table-column label="房间号" width="100">
                    <template slot-scope="scope">{{ scope.row.roomNum }}</template>
                  </el-table-column>
                  <el-table-column label="电话号码" width="100">
                    <template slot-scope="scope">{{ scope.row.phonenum }}</template>
                  </el-table-column>
                  <el-table-column label="发票类型" width="100">
                    <template slot-scope="scope">{{ scope.row.billType }}</template>
                  </el-table-column>
                  <el-table-column label="发票抬头" width="100">
                    <template slot-scope="scope">{{ scope.row.invoiceTitle }}</template>
                  </el-table-column>
                  <el-table-column label="税号" width="180">
                    <template slot-scope="scope">{{ scope.row.invoiceAmount }}</template>
                  </el-table-column>
                  <el-table-column label="开票金额" width="180">
                    <template slot-scope="scope">{{ scope.row.taxes }}</template>
                  </el-table-column>
                  <el-table-column label="邮箱" width="180">
                    <template slot-scope="scope">{{ scope.row.billNum }}</template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        style="width:60px;"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row),awaitBill=true"
                      >开票</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000"
                  ></el-pagination>
                </div>
              </div>

              <!-- 开票弹出框 -->
              <el-dialog
                title="确认开票"
                style="text-align:left"
                width="1180px"
                :visible.sync="awaitBill"
              >
                <el-row style="margin:10px 20px">
                  <el-form label-width="90px">
                    <!-- ref="billForm" :model="billForm"  -->
                    <el-form-item label="发票类型：">
                      <el-radio-group v-model="billForm.resource">
                        <!--   -->
                        <el-radio label="增值税专用发票"></el-radio>
                        <el-radio label="增值税普通发票"></el-radio>
                        <el-radio label="增值税电子发票"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="客户名称：">
                          <el-input disabled v-model="billList.name"></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="手机号：">
                          <el-input></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="房间号：">
                          <el-input disabled v-model="billList.roomNum"></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="发票抬头：">
                          <el-input></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="税号：">
                          <el-input></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="开票金额：">
                          <el-input></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="电子邮箱：">
                          <el-input></el-input>
                          <!-- v-model="billForm.name" -->
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-row>
                <div slot="footer" class="dialog-footer">
                  <el-button style="width:80px;" @click="awaitBill = false">取消</el-button>
                  <el-button style="width:80px;" type="primary" @click="awaitBill = false">确认</el-button>
                </div>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="已开票" name="b">
              <div style="text-align: left;">
                <span>发票类型：</span>
                <el-button>不限</el-button>
                <el-button>增值税专用发票</el-button>
                <el-button>增值税普通发票</el-button>
                <el-button>增值税电子发票</el-button>
              </div>

              <el-row style="margin-top:10px">
                <el-form class="demo-form-inline" :inline="true">
                  <el-col :span="9">
                    <el-form-item>
                      <div class="block">
                        <span class="demonstration">开票日期：</span>
                        <el-date-picker
                          v-model="value1"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        ></el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="客户名称">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item>
                      <el-button style="width:80px" type="primary" @click="onSubmit">查询</el-button>
                      <el-button style="width:80px" @click="resetForm('formInline')">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-form>

                <el-row>
                  <el-table :data="tableDatas" style="width: 100%">
                    <el-table-column label="客户名称" width="120">
                      <template slot-scope="scope">{{ scope.row.clientName }}</template>
                    </el-table-column>
                    <el-table-column label="房间号" width="80">
                      <template slot-scope="scope">{{ scope.row.roomNum }}</template>
                    </el-table-column>
                    <el-table-column label="电话号码" width="120">
                      <template slot-scope="scope">{{ scope.row.phonenum }}</template>
                    </el-table-column>
                    <el-table-column label="发票类型" width="150">
                      <template slot-scope="scope">{{ scope.row.billType }}</template>
                    </el-table-column>
                    <el-table-column label="发票抬头" width="150">
                      <template slot-scope="scope">{{ scope.row.invoiceTitle }}</template>
                    </el-table-column>
                    <el-table-column label="开票金额" width="50">
                      <template slot-scope="scope">{{ scope.row.invoiceAmount }}</template>
                    </el-table-column>
                    <el-table-column label="税金" width="50">
                      <template slot-scope="scope">{{ scope.row.taxes }}</template>
                    </el-table-column>
                    <el-table-column label="发票号码" width="100">
                      <template slot-scope="scope">{{ scope.row.billNum }}</template>
                    </el-table-column>
                    <el-table-column label="开票时间" width="100">
                      <template slot-scope="scope">{{ scope.row.time }}</template>
                    </el-table-column>
                    <el-table-column label="操作人" width="80">
                      <template slot-scope="scope">{{ scope.row.operator }}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="text"
                          @click="details(scope.$index, scope.row),detailsBill=true"
                        >详情</el-button>
                        <el-button
                          size="mini"
                          type="text"
                          @click="openEdit(scope.$index, scope.row),editBill=true"
                        >编辑</el-button>
                        <el-button
                          size="mini"
                          type="text"
                          @click="openDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <!-- 点击详情弹出框 -->
                  <el-dialog
                    title="详情"
                    style="text-align:left"
                    width="1180px"
                    :visible.sync="detailsBill"
                  >
                    <el-row style="margin:10px 20px">
                      <el-col :span="12">
                        <el-col :span="12">
                          <span style="color:#888888">客户名称：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">客户名称：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">客户名称：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">客户名称：</span>tom
                        </el-col>
                        <el-col>
                          <span style="color:#888888">备注：</span>
                        </el-col>
                      </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer" style="text-align:center">
                      <el-button style="width:80px;" type="primary" @click="detailsBill = false">关闭</el-button>
                    </div>
                  </el-dialog>

                  <!-- 点击编辑 -->
                  <el-dialog
                    title="编辑"
                    style="text-align:left"
                    width="1180px"
                    :visible.sync="editBill"
                  >
                    <el-row style="margin:10px 20px">
                      <el-form ref="form" :model="form" label-width="90px">
                        <el-row>
                          <el-col :span="9">
                            <el-form-item label="客户姓名：">
                              <el-input v-model="form.name" disabled></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="9">
                            <el-form-item label="手机号：">
                              <el-input v-model="form.name"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="9">
                            <el-form-item label="发票号码：">
                              <el-input v-model="form.name"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="9">
                            <el-form-item label="税金：">
                              <el-input v-model="form.name"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-form-item style="text-align:right">
                          <el-button type="primary" style="width:80px;" @click="editSubmit">确定</el-button>
                          <el-button style="width:80px;" @click="editBill = false">取消</el-button>
                        </el-form-item>
                      </el-form>
                    </el-row>
                    <!-- <div slot="footer" class="dialog-footer" style="text-align:center">
                        <el-button style="width:80px;" type="primary" @click="editBill = false">取消</el-button>

                    </div>-->
                  </el-dialog>
                </el-row>
              </el-row>
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage3"
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="1000"
                ></el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-tab-pane>
      <!-- 留言管理 -->
      <el-tab-pane label="留言管理" name="three">
        <el-form :model="noteForm" :rules="rules" ref="noteForm" label-width="100px" class="demo-ruleForm">
         
          <el-row>
            <label>留言类型：</label>
            <el-button>不限</el-button>
            <el-button>我的留言</el-button>
            <el-button>他人留言</el-button>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="4">
              <el-form-item label="留言内容：">
                  <el-input v-model="noteForm.content" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                 <el-form-item label="房间号：">
                    <el-input v-model="noteForm.room" ></el-input>
                  </el-form-item>
            </el-col>  
                 
            <el-col :span="4">
                  <el-form-item label="留言员工：">
                    <el-input v-model="noteForm.staff" ></el-input>
                  </el-form-item>
            </el-col>
              <el-col :span="7">
                <el-form-item label="留言时间："> 
                    <div class="block">
                      <!-- <span class="demonstration">留言时间：</span> -->
                      <el-date-picker
                        v-model="noteForm.value2"
                        type="daterange"
                        range-separator="至"
                      ></el-date-picker>
                    </div>
                  </el-form-item>
              </el-col>

            <el-col :span="5" style="float:right">
              <el-form-item>
                <el-button style="width:60px;" type="primary">查询</el-button>
                <el-button style="width:60px;">重置</el-button>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item>
              <el-button type="primary" @click="newNote=true">新增留言</el-button>
            </el-form-item> 
            </el-col>
          </el-row>
        </el-form>

        <div>
          <el-table :data="messageContents" style="width: 100%">
            <!--:data="tableData"  -->
            <el-table-column label="留言内容" width="500">
              <template slot-scope="scope">{{scope.row.content}}</template>
            </el-table-column>
            <el-table-column label="房间号" width="180">
              <template slot-scope="scope">{{scope.row.room}}</template>
            </el-table-column>
            <el-table-column label="留言员工" width="180">
              <template slot-scope="scope">{{scope.row.employee}}</template>
            </el-table-column>
            <el-table-column label="留言时间" width="180">
              <template slot-scope="scope">{{scope.row.time}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  style="width:60px;"
                  type="text"
                  @click="noteDdetail(scope.$index, scope.row),notedetail=true"
                >详情</el-button>
                <el-button size="mini" type="text" @click="noteDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </div>

        <!-- 留言详情 -->
        <el-dialog title="详情" style="text-align:left" :visible.sync="notedetail">
          <el-row>
            <label>房间号：</label>A1001
          </el-row>
          <el-row>
            <label>员工留言：</label>张三
          </el-row>
          <el-row>
            <label>留言内容：</label>挖空房间爱读书卡还款
          </el-row>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button style="width:80px;" type="primary" @click="notedetail = false">关闭</el-button>
          </div>
        </el-dialog>
        <!-- 新增留言 -->
        <el-dialog title="新增留言" style="text-align:left" :visible.sync="newNote">
          <el-form ref="noteForm" :model="noteForm" label-width="80px">
            <el-form-item label="房间号：">
              <el-input v-model="noteForm.room"></el-input>
            </el-form-item>
            <el-form-item label="留言内容">
              <el-input type="textarea" v-model="noteForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:80px;" type="primary" @click="noteSubmit">确定</el-button>
              <el-button style="width:80px;" @click="newNote = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>


      <!-- 物品寄存 -->
      <el-tab-pane label="物品寄存" name="four">
            <el-form :model="leftLuggage" :rules="rules" ref="leftLuggage" label-width="100px" class="demo-ruleForm">
         
              <el-row>
                <label>留言类型：</label>
                <el-button>不限</el-button>
                <el-button>我的留言</el-button>
                <el-button>他人留言</el-button>
              </el-row>
              <el-row style="margin-top:20px">
                <el-col :span="4">
                  <el-form-item label="客户名称：">
                      <el-input v-model="noteForm.name" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="房间号：">
                        <el-input v-model="noteForm.room" ></el-input>
                      </el-form-item>
                </el-col>  
                    
                <el-col :span="4">
                      <el-form-item label="领取编号：">
                        <el-input v-model="noteForm.num" ></el-input>
                      </el-form-item>
                </el-col>
                  <el-col :span="8">
                    <el-form-item label="寄放日期：">
                        <div class="block">
                          <el-date-picker
                            v-model="noteForm.time"
                            type="daterange"
                            range-separator="至"
                          ></el-date-picker>
                        </div>
                      </el-form-item>
                  </el-col>
                  <el-col :span="5">
                      <el-form-item label="物品名称">
                        <el-input v-model="noteForm.goodsname" ></el-input>
                      </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item>
                    <el-button style="width:60px;text-align: center;" type="primary">查询</el-button>
                    <el-button style="width:60px;text-align: center;">重置</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="5" style="float:right">
                  <el-form-item>
                  <el-button type="primary" @click="newCheck=true">新增寄存</el-button>
                </el-form-item> 
                </el-col>
              </el-row>
            </el-form>

        <div>
         
          <el-table :data="checkTables" style="width: 100%">
            <!--:data="tableData"  -->
            <el-table-column label="客户名称" width="80">
              <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="房间号" width="80">
              <template slot-scope="scope">{{scope.row.roomnum}}</template>
            </el-table-column>
            <el-table-column label="手机号" width="100">
              <template slot-scope="scope">{{scope.row.phonenum}}</template>
            </el-table-column>
            <el-table-column label="物品名称" width="80">
              <template slot-scope="scope">{{scope.row.goodsname}}</template>
            </el-table-column>
            <el-table-column label="寄放时间" width="120">
              <template slot-scope="scope">{{scope.row.leavetime}}</template>
            </el-table-column>
            <el-table-column label="领取时间" width="120">
              <template slot-scope="scope">{{scope.row.gettime}}</template>
            </el-table-column>
            <el-table-column label="领取编号" width="180">
              <template slot-scope="scope">{{scope.row.getnum}}</template>
            </el-table-column>
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">{{scope.row.status}}</template>
            </el-table-column>
            <el-table-column label="操作人" width="80">
              <template slot-scope="scope">{{scope.row.operator}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" style="width:60px;">领取</el-button>
                <el-button
                  size="mini"
                  style="width:60px;"
                  type="text"
                  @click="noteDdetail(scope.$index, scope.row),checkdetail=true"
                >详情</el-button>
                <el-button size="mini" type="text">作废 </el-button>
                <el-button size="mini" type="text" @click="checkPatch=true"> 寄存补打 </el-button>

              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </div>


        <!-- newCheck新增寄存 -->
        <el-dialog title="新增寄存" style="text-align:left" :visible.sync="newCheck">
          <el-form ref="newCheckForm" :model="newCheckForm" label-width="80px">
            <el-col :span="8">
              <el-form-item label="客户姓名:">
                <el-input v-model="newCheckForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item label="房间号：">
                <el-input v-model="newCheckForm.roomnum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item label="手机号：">
                <el-input v-model="newCheckForm.phoennum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">

              <el-form-item label="物品名称:">
                <el-input v-model="newCheckForm.goodsname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">

              <el-form-item label="备注：">
                <el-input v-model="newCheckForm.remark"></el-input>
              </el-form-item>
            </el-col>
              <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item> -->
            </el-form>


          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button style="width:80px;" @click="newCheck = false">取消</el-button>
            <el-button style="width:110px;" >保存并打印</el-button>
            <el-button style="width:80px;" type="primary" @click="Save">保存</el-button>
          </div>
        </el-dialog>
        <!-- 新增寄存 详情 -->
        <el-dialog title="详情" style="text-align:left" :visible.sync="checkdetail">
             
                    <el-row style="margin:10px 20px">
                      <el-col :span="12">
                        <el-col :span="12">
                          <span style="color:#888888">客户名称：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">房间号：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">电话号码：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">物品名称：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">领取编号：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">领取状态：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">寄存时间：</span>tom
                        </el-col>
                        <el-col :span="12">
                          <span style="color:#888888">领取时间：</span>tom
                        </el-col>
                        <el-col>
                          <span style="color:#888888">备注：</span>
                        </el-col>
                      </el-col>
                    </el-row>


          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button style="width:80px;" @click="checkdetail = false">关闭</el-button>
          </div>
        </el-dialog>

        <!-- checkPatch  寄存补打-->
            <el-dialog title="详情" style="text-align:left" :visible.sync="checkPatch">
             
                    <el-row style="margin:10px 20px">
                      <h2 style="text-align:center">大仓集团第一酒店物品寄存领取单</h2>
                      <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
                        <label>打印时间：</label>2020-04-04 14.01
                      </el-row>

                      <el-row style="border-bottom:1px solid #333;padding-bottom:10px;margin-bottom:10px;">
                        <p><label>物品名称：</label>行李箱</p>
                        <label>领取编号:</label>555515646465
                      </el-row>
                      <el-row style="margin-bottom:10px"> 
                          <label>寄存时间:</label>2020-04-04 14.01
                      </el-row>
                      <el-row style="color:red">
                          请您务必保管好此票，凭此票  领取东西
                      </el-row>
                      <el-row>
                          <span>前台电话：888888</span>
                          <span>酒店地址：蜀山区</span>
                      </el-row>
                     
                    </el-row>


              <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button style="width:80px;" @click="checkPatch = false">取消</el-button>
                <el-button style="width:80px;" type="primary">打印</el-button>
              </div>
            </el-dialog>

      </el-tab-pane>
      <!-- 员工管理 -->
      <el-tab-pane label="员工管理" name="five"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        //待开票表格字段
        {
          name: "王小虎",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554
        }
      ],
      billList: [], //点击开票按钮的数据
      tableDatas: [
        //已开票表格
        {
          clientName: "tom",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
          time: "2020/1/10",
          operator: "张三"
        },
        {
          clientName: "tom",
          roomNum: 12,
          phonenum: 1111111,
          billType: "增值税电子发票",
          invoiceTitle: "全购网络技术有限公司",
          invoiceAmount: 150,
          taxes: 0,
          billNum: 5545554,
          time: "2020/1/10",
          operator: "张三"
        }
      ],
      print: false, //催押
      batch: false,
      detailsBill: false, //已开票  详情
      awaitBill: false, //待开票
      checkdetail:false,//物品寄存 详情
      editBill: false, //已开票  编辑
      newCheck:false,//新增寄存按钮
      checkPatch:false,//寄存补打 按钮
      formInline: {
        //待开票
        user: "",
        hostel: ""
      },
      notedetail: false, // 留言详情
      newNote: false, //新增留言按钮
      // 留言内容
      messageContents: [
        {
          content: "身份和骄傲股市的看法",
          room: "A100",
          employee: "刘洋",
          time: "2020/10/10"
        }
      ],
      // 新增留言
      noteForm: {
        room: "",
        desc: ""
      },
      billForm: {
        resource: "" //单选按钮
      },
      formLabelWidth: "120px",
      form: {
        //催押
        roomname: "",
        peoplename: "",
        phonenum: ""
      },
      // 留言管理
      noteForm:{
        content:'',
        room:'',
        staff:'',
        value2:''
      },
      // 物品寄存
      leftLuggage:{
        name:'',
        room:'',
        num:'',
        time:'',
        goodsname:''

      },
      // 新增 寄存
     newCheckForm:{
        name:'',
        roomnum:'',
        phoennum:'',
        goodsname:'',
        remark:''
     },
      // 物品寄存表格
      checkTables:[
        {
          name:"噢噢噢噢",
          roomnum:"a14",
          phonenum:111111,
          goodsname:'行李箱',
          leavetime:222,
          gettime:222,
          getnum:55555,
          status:"待领取",
          operator:'张三'
          }
      ],
      activeName: "one",
      roomStatus: {
        dong: "", //楼栋
        tag: "" //楼层
      },
      input: "", //搜索框
      checked1: false,
      checked2: false,
      checked3: false,
      items: [
        {
          type: "success",
          label: "空净(20)"
        },
        {
          type: "info",
          label: "空脏(20)"
        },
        {
          type: "danger",
          label: "空脏(20)"
        },
        {
          type: "warning",
          label: "空脏(20)"
        },
        {
          type: "warning",
          label: "空脏(20)"
        }
      ],
      roomList: [
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#27ae76"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "单间",
          bgColor: "#b07b2e"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#c0512b"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        },
        {
          hao: "A001",
          status: 1,
          status_name: "标准间",
          bgColor: "#276bba"
        }
      ],
      checked: false,
      activeThree: "a",
      currentPage3:'',
      // value1: '',//时间
      // value2: '',
      // value3: ''
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 待开票
    handleEdit(index, row) {
      // console.log(index, row);
      this.billList = row;
      console.log(this.billList, 11111);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 已开票
    details(index, row) {
      // console.log(index, row.time);
      console.log(row, 1111);
    },
    openEdit(index, row) {
      console.log(index, row);
    },
    openDelete(index, row) {
      console.log(index, row);
    },
    editSubmit() {
      console.log(111);
    },
    // 账单详情
    Edit() {
      console.log("submit!");
    },
    // 留言详情
    noteDdetail(index, row) {
      console.log(index, row);
    },
    // 留言删除
    noteDelete(index, row) {
      console.log(index, row);
    },
    // 新增留言
    noteSubmit() {
      console.log("新增留言");
      this.newNote = false;
    },
    // 新增寄存
    Save(){
      console.log("新增寄存保存");
      this.newCheck = false
    },
    // 查询按钮
    onSubmit() {
      console.log("submit!");
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 催交重置
    resetForms(formNames) {
      this.$refs[formNames].resetFields();
    },
    // 批量置脏/置净
    resetbatch(formbatch) {
      this.$refs[formbatch].resetFields();
    },
    // 批量置脏/置净
    batchForm() {
      console.log("批量置脏/置净");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-dialog__header {
  background-color: #c8d8f1 !important;
}
.card {
  border: 1px solid #ccc;
  margin: 0 5px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 4px;
  padding: 3px;
  
}
.inco {
  border: 1px solid #333;
  background: #666;
  color: #fff;
}
.search {
  width: 137px !important;
  height: 30px !important;
  line-height: 30px !important;
}
.fangtai {
  left: 180px;
  top: 300px;
  width: 36px;
  height: 25px;
  color: rgba(30, 30, 30, 1);
  // font-size: 18px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.all {
  // left: 230px;
  // top: 303px;
  margin-left: 10px;
  width: 51px;
  height: 20px;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.rescet {
  border-radius: 0;
  width: 28px;
  height: 20px;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  text-align: left;
  border: 1px solid #ccc;
  font-family: PingFangSC-Regular;
  float: right;
}
.el-checkbox.is-bordered {
  border: none;
}

.tag-width {
  width: 80px;
  display: flex;
  justify-content: center;
}

.margin-l {
  margin-left: 8px;
}

.tag-margin {
  margin-right: 8px;
  margin-top: 8px;
}

.row-width {
  width: 100px;
}

.demo-form-inline {
  display: flex;
  align-items: center;
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
  margin-top: 10px;
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
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

// ========
.second-body {
  .title {
    border-bottom: 1px solid #e4e7ed;
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
          background-color: #f2f2f2;
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
