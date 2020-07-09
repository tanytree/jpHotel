
<!--

 * @LastEditors: 魏轩

 * 
 -->
<template>
  <div>
    <!-- 房间动态 -->
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
              <el-checkbox v-model="checked" style="width:100%;position: relative;margin-top:10px">
                标准间
                <span style="position: absolute;right:0">4/16</span>
              </el-checkbox>
              <el-checkbox v-model="checked" style="width:100%;position: relative;margin-top:10px">
                总统套房
                <span style="position: absolute;right:0">4/16</span>
              </el-checkbox>
              <el-checkbox v-model="checked" style="width:100%;position: relative;margin-top:10px">
                大床房
                <span style="position: absolute;right:0">4/16</span>
              </el-checkbox>
              <el-checkbox v-model="checked" style="width:100%;position: relative;margin-top:10px">
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
              @click.native="hostelmess()"
              :span="4"
              class="tag-margin"
              :style="`height:120px;background:${value.bgColor};cursor: pointer;`"
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
                <el-row>
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
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-checkbox v-model="checked">全部 120</el-checkbox>
                  </el-col>
                  <el-col :span="8">
                    <el-checkbox v-model="checked">催押 20</el-checkbox>
                  </el-col>
                  <el-col :span="8">
                    <el-checkbox v-model="checked">欠费 120</el-checkbox>
                  </el-col>
                </el-row>

                <el-row style="margin-top:10px">
                  <el-card>
                    <el-row>
                      <el-row>
                        <span>请选择需要置脏/置净的房间</span>
                        <span>已选（1）</span>
                        <el-form-item style="float:right">
                          <el-checkbox v-model="checked">全选</el-checkbox>
                        </el-form-item>
                      </el-row>

                      <el-form-item>
                        <el-row>
                          <el-form-item>
                            <el-checkbox v-model="checked">博超精选酒店（蜀山区）3层</el-checkbox>
                          </el-form-item>
                        </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                        </el-row>
                      </el-form-item>

                      <el-form-item>
                        <el-row>
                          <el-form-item>
                            <el-checkbox v-model="checked">博超精选酒店（蜀山区）3层</el-checkbox>
                          </el-form-item>
                        </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                          <el-col :span="6">
                            <el-checkbox v-model="checked">A101（住净）</el-checkbox>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-row>
                  </el-card>
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
                    <el-button type="text" @click="Edit(scope.$index, scope.row)" size="mini">账单详情</el-button>
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

    <!-- 房间信息 -->
    <div>
      <el-dialog :visible.sync="hosteldis" width="50%">
        <!-- <span>这是一段信息</span> -->
        <el-row style="font-size:18px">A01房间--全天房</el-row>
        <el-tabs type="border-card" style="margin-top:10px">
          <el-tab-pane label="入住信息">
            <el-row>
              <el-col :span="8">
                入住时间：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住类型：
                <span>正常</span>
              </el-col>
              <el-col :span="8">
                消费合计：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住时间：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住类型：
                <span>正常</span>
              </el-col>
              <el-col :span="8">
                消费合计：
                <span>5465465</span>
              </el-col>
            </el-row>

            <el-table :data="hosteldata" style="width: 100%">
              <!-- <el-table-column
                          label="日期"
                          width="180">
                          <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                          </template>
              </el-table-column>-->
              <el-table-column label="姓名" width="100">
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="手机号" width="150">
                <template slot-scope="scope">{{scope.row.phonenum}}</template>
              </el-table-column>
              <el-table-column label="性别" width="50">
                <template slot-scope="scope">{{scope.row.sex}}</template>
              </el-table-column>
              <el-table-column label="客源" width="50">
                <template slot-scope="scope">{{scope.row.sex}}</template>
              </el-table-column>
              <el-table-column label="同来客" width="80">
                <template slot-scope="scope">{{scope.row.sex}}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="text">查看</el-button>
                  <!--  @click="handleEdit(scope.$index, scope.row)" -->
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <label>
                备注：
                <span>提醒客户起床</span>
              </label>
              <el-button type="text">修改</el-button>
            </el-row>
            <el-row style="margin-top:10px">
              <el-button style="width:60px;" @click="stayoer=true">续住</el-button>
              <el-button style="width:60px;" @click="yokeplate=true">联房</el-button>
              <el-button style="width:60px;" @click="roomchange=true">换房</el-button>
              <el-button style="width:60px;" @click="mackcade=true">制卡</el-button>
              <el-button style="width:60px;">置脏</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="房间信息">
            <el-row>
              <el-col :span="8">
                入住时间：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住类型：
                <span>正常</span>
              </el-col>
              <el-col :span="8">
                消费合计：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住时间：
                <span>5465465</span>
              </el-col>
              <el-col :span="8">
                入住类型：
                <span>正常</span>
              </el-col>
              <el-col :span="8">
                消费合计：
                <span>5465465</span>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <!-- 续住 -->
    <div>
      <el-dialog title="续住" :visible.sync="stayoer" width="80%">
        <el-alert title="如果需要提前离店，需要在续住天数中输入负数" type="error" :closable="false" show-icon></el-alert>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="房间号" width="100">
            <template slot-scope="scope">A100</template>
          </el-table-column>
          <el-table-column label="姓名" width="100">
            <template slot-scope="scope">A100</template>
          </el-table-column>
          <el-table-column label="原预离时间" width="100">
            <template slot-scope="scope">A100</template>
          </el-table-column>
          <el-table-column label="续住天数">
            <div>
              <el-input-number v-model="stayoernum" :step="1"></el-input-number>
            </div>
          </el-table-column>
          <el-table-column label="新预离时间">
            <div class="block">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-table-column>

          <el-table-column label="合计房价">
            <template slot-scope="scope">A100</template>
          </el-table-column>
        </el-table>

        <el-row>
          <el-checkbox v-model="stayoerchecked">
            按入住时房价续住
            <span style="color:red">(午夜房不可按入住时房价入住)</span>
          </el-checkbox>
        </el-row>

        <div slot="footer" class="dialog-footer">
          <el-button style="width:80px;">取消</el-button>
          <el-button style="width:80px;" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 联房 -->
    <div>
      <el-dialog title="联房" :visible.sync="yokeplate" width="60%">
        <el-card>
          <el-col :span="16">
            <el-row>
              选择列表(100)
              <span>点击选择房间</span>
            </el-row>
            <el-card style="text-align:center">
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="5">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
              <el-col :span="4">
                <el-tag style="padding:0 30px">标签一</el-tag>
              </el-col>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-row>
              联房列表 现有联房
              <span>5</span>间
            </el-row>

            <el-card>
              <el-col :span="12">
                <el-tag>标签一</el-tag>
              </el-col>
              <el-col :span="12">
                <el-tag>标签一</el-tag>
              </el-col>
            </el-card>
          </el-col>
        </el-card>
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </el-dialog>
    </div>
    <!-- 换房 -->
    <div>
      <el-dialog title="换房" :visible.sync="roomchange" width="80%">
        <el-card>
          <el-form>
            <el-row>
              <span>房间号：A100</span>
              <span>客人姓名：战三</span>
              <span>房价：300</span>
              <span>换房原因：</span>
              <el-input style="width:100px"></el-input>
            </el-row>
          </el-form>
          <el-col :span="18">
            <el-card>
              <el-col :span="8">
                <el-card>
                  <el-row>标准间</el-row>
                  <el-row>
                    <span>可订 12</span>
                    <el-input style="width:80px" disabled value="130"></el-input>
                    <span>400</span>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <el-row>标准间</el-row>
                  <el-row>
                    <span>可订 12</span>
                    <el-input style="width:80px" disabled value="130"></el-input>
                    <span>400</span>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <el-row>标准间</el-row>
                  <el-row>
                    <span>可订 12</span>
                    <el-input style="width:80px" disabled value="130"></el-input>
                    <span>400</span>
                  </el-row>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card>
                  <el-row>
                    <span>大床房</span>
                    <el-input-number v-model="num" :min="1"></el-input-number>
                  </el-row>
                  <el-row>
                    <span>可订 12</span>
                    <el-input style="width:80px" disabled value="130"></el-input>
                    <span>400</span>
                  </el-row>
                </el-card>
              </el-col>
            </el-card>
          </el-col>
          <el-col :span="5" style="padding-left:10px">
            <el-row>
              总统 套房1间
              <el-button style="width:60px;float:right" type="primary">排房</el-button>
            </el-row>
            <el-row>
              <el-tag style="margin:0 5px">标签一</el-tag>
              <el-tag style="margin:0 5px">标签一</el-tag>
              <el-tag style="margin:0 5px">标签一</el-tag>
            </el-row>
          </el-col>
        </el-card>
        <el-row>
          <el-button style="width:60px;float:right">取消</el-button>
          <el-button style="width:60px;float:right" type="primary">确定</el-button>
        </el-row>
      </el-dialog>
    </div>
    <!-- 制卡 -->
    <div>
      <el-dialog title="房卡操作" :visible.sync="mackcade" width="60%">
        <el-card>
          <el-form>
            <el-row>
              <el-form-item>
                <span>共一间&nbsp;&nbsp;本次已制卡数：0</span>
                <el-button>制卡</el-button>
                <el-button>清卡</el-button>
                <el-button>读卡</el-button>
              </el-form-item>
            </el-row>

            <el-form-item>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="房间号" width="200"></el-table-column>
                <el-table-column prop="name" label="本次制卡状态"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      currentPage4: 4, //分页当前所在页数的位置
      stayoernum: "1", //续住天数
      stayoerchecked: false, //续住  勾选
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
      checkdetail: false, //物品寄存 详情
      editBill: false, //已开票  编辑
      newCheck: false, //新增寄存按钮
      checkPatch: false, //寄存补打 按钮
      hosteldis: false, //
      stayoer: false, //续住
      yokeplate: false, //联房
      roomchange: false, //换房
      mackcade: false, //制卡
      dirty: false, // 置脏
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
      noteForm: {
        content: "",
        room: "",
        staff: "",
        value2: ""
      },
      // 物品寄存
      leftLuggage: {
        name: "",
        room: "",
        num: "",
        time: "",
        goodsname: ""
      },
      // 新增 寄存
      newCheckForm: {
        name: "",
        roomnum: "",
        phoennum: "",
        goodsname: "",
        remark: ""
      },
      // 物品寄存表格
      checkTables: [
        {
          name: "噢噢噢噢",
          roomnum: "a14",
          phonenum: 111111,
          goodsname: "行李箱",
          leavetime: 222,
          gettime: 222,
          getnum: 55555,
          status: "待领取",
          operator: "张三"
        }
      ],
      hosteldata: [{}],
      display: true,
      activeName: "one",
      roomStatus: {
        dong: "", //楼栋
        tag: "" //楼层
      },
      Oswitch: false,
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
      currentPage3: "",
      value1: "" //时间
      // value2: '',
      // value3: ''
    };
  },
  methods: {
    hostelmess() {
      this.hosteldis = true;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
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
    Save() {
      console.log("新增寄存保存");
      this.newCheck = false;
    },

    // 员工管理
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == "jurisdiction") {
        // alert(11111)
        this.display = !this.display;
      }
    },
    management() {
      this.display = !this.display;
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
.duty {
  border: 1px solid #1b80ff;
  font-size: 12px;
  padding: 3px 10px;
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
