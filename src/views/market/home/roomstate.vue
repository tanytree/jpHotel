<!--

 * @LastEditors: 董林

 *
 -->
<template>
    <div class="boss-index" v-loading="loading">
        <!-- 房间动态 -->
        <div class="content">
            <div class="left">
                <el-form class="room" v-model="searchForm" inline size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.keyword" class="search" placeholder="姓名/房号" @keyup.native="handleChange"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="searchForm.checkInType" @change="handleChange">
                            <el-checkbox-button label="1">身份证</el-checkbox-button>
                            <el-checkbox-button label="2">房卡</el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <!-- 房态 -->
                <div class="room">
                    <div class="tag-top">
                        <span class="fang">房态</span>
                        <!-- <span class="all">全部100</span> -->
                        <span class="reset" @click="clearnSelectAttr('roomStatus')">重置</span>
                    </div>
                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomStatus" @change="handleChange">
                            <el-checkbox v-for="(item,index) in $t('commons.roomStatus')" :key="index" :label="item.value">
                                <el-tag :type="item.type" effect="plain" size="mini">{{ item.name + ' ' + F_roomStatus(item.value) }}</el-tag>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <!-- 房型 -->
                <div class="room">
                    <div class="tag-top">
                        <div>
                            <span class="fang">房型</span>
                            <span class="all">可订数/总房数</span>
                        </div>
                        <span class="reset" @click="clearnSelectAttr('roomTypeId')">重置</span>
                    </div>

                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomTypeId" @change="handleChange">
                            <el-checkbox class="roomType" v-for="item of roomTypeId" :key="item.roomTypeId" :label="item.roomTypeId">
                                {{item.houseName?item.houseName:'未知'}}
                                <span class="total">{{item.reserveCount}}/{{item.total}}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>

                <!-- 楼栋楼层 -->
                <el-form class="room" v-model="searchForm" size="small">
                    <el-form-item label="楼层楼栋:">
                        <el-select v-model="searchForm.buildingId" placeholder="楼栋" class="row-width" @change="buildingSelectChange">
                            <el-option v-for="item in hotel_building_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="searchForm.buildingFloorId" placeholder="楼层" class="row-width margin-l-8" @change="floorSelectChange">
                            <el-option v-for="item in hotel_building_floor_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <!-- 渠道 -->
                <div class="room">
                    <div class="tag-top">
                        <span class="fang">渠道</span>
                        <span class="reset" @click="clearnSelectAttr('channel')">重置</span>
                    </div>
                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.channel" @change="handleChange">
                            <el-checkbox class="roomType" v-for="item of channel" :key="item.channel" :label="item.channel">
                                {{item.name?item.name:'未知'}}
                                <span class="total">{{item.total}}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

            <el-container class="right" v-loading="roomloading">
                <el-header>
                    <el-row>
                        <el-checkbox-group v-model="searchForm.personRoom" @change="handleChange">
                            <el-checkbox v-for="(item,index) in personRoom" :value="item.eName" :label="item.eName" :key="index">{{item.name}}({{item.total}})</el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                </el-header>
                <el-main>
                    <div v-for="(item, index) in roomList" :key="index" v-if="item.floorRoomCount>0">
                        <div class="floor">
                        <span class="title">
                            {{item.building?item.building.name:''}}
                            <span>{{item.floor}}</span>层
                        </span>
                            <span class="count">
                            <span style="color: #126eff;">{{item.reserveFloorRoomCount}}</span>/{{item.floorRoomCount}}
                        </span>
                        </div>
                        <div class="floor-box">
                            <div @click="hostelmess(room)" class="tag-margin" v-for="(room, i) in item.roomList" :key="i">
                                <div :style="`background:${F_roomStatusColor(room.roomStatus)};`">
                                    <div class="line">
                                        <span>{{room.houseNum}}</span>
                                        <span>{{room.hotelRoomType.houseName}}</span>
                                    </div>
                                    <div class="line" v-if="room.livingPersonList && room.livingPersonList.length && (room.roomStatus==3 || room.roomStatus==4)">
                                        <span>{{room.livingPersonList[0].name}}</span>
                                        <span>{{room.livingPersonList[0].sex | F_sex}}</span>
                                    </div>
                                    <!-- 清扫图标后期加 -->
                                    <div class="placeIcon text-center">
                                        <img v-if="room.roomStatus==5" :src="require('@/assets/images/frontdesk/fix.png')"/>
                                        <img v-if="room.roomStatus==2" :src="require('@/assets/images/frontdesk/clearn.png')"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button class="white" size="small" @click="batchRoomHaldel">批量置脏/置净</el-button>
                    <el-button class="white" size="small">打印房态盘</el-button>
                    <el-button type="primary" class="submit" size="small" @click="print = true" icon="el-icon-message-solid">催押</el-button>
                    <!-- 催押 -->
                    <el-dialog top="0" title="当前催交" width="1160px" :visible.sync="print">
                        <el-form :model="form">
                            <el-row>
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
                                        <el-button style="width:80px;margin-left:20px" type="primary" @click="submitForm('form')">查询</el-button>
                                        <el-button style="width:80px" @click="resetForms('form')">重置</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">全部 120</el-checkbox>
                                </el-col>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">催押 20</el-checkbox>
                                </el-col>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">欠费 120</el-checkbox>
                                </el-col>

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
                        <div class="icondesc">
                            <h3>图标说明</h3>
                            <el-col :span="4" class="item">
                                <span class="inco">钟</span>
                                <span>钟点房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">免</span>
                                <span>免费房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">午</span>
                                <span>午夜房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">订</span>
                                <span>预订房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">离</span>
                                <span>今日预离</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">长</span>
                                <span>长租房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                            <span class="inco i_img">
                                <img :src="require('@/assets/images/frontdesk/minClearn.png')"/>
                            </span>
                                <span>脏房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco i_img"><img :src="require('@/assets/images/frontdesk/minFix.png')"/></span>
                                <span>维修房</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco i_img"><img :src="require('@/assets/images/frontdesk/lian.png')"/></span>
                                <span>联房</span>
                            </el-col>
                        </div>

                        <el-button type="text" class="icon" size="small" slot="reference" icon="el-icon-question">图标</el-button>
                    </el-popover>
                </el-footer>
            </el-container>
        </div>

        <!-- 房间信息 -->
        <el-dialog top="0" :visible.sync="hosteldis" width="800px" :title="`${currentRoom.houseNum}房间-${currentRoom.hotelRoomType?currentRoom.hotelRoomType.houseName:''}`">
            <el-tabs type="border-card">
                <el-tab-pane :label="currentRoom.checkInRoomType==1?'入住信息':'预订信息'" v-if="currentRoom.checkInRoomType==1||currentRoom.checkInRoomType==2">
                    <div class="inMsg">
                        <div class="row">
                            <div class="col">入住时间：<span>{{currentRoom.createTime}}</span></div>
                            <div class="col">入住类型：<span>正常</span></div>
                            <div class="col">消费合计：<span>{{currentRoom.total}}</span></div>
                            <div class="col">预离时间：<span>5465465</span></div>
                            <div class="col">制卡数量：<span>正常</span></div>
                            <div class="col">余额：<span>5465465</span></div>
                            <div class="col">入住天数：<span>5465465</span></div>
                            <div class="col">付款合计：<span>5465465</span></div>
                            <div class="col">联房余额：<span>5465465</span></div>
                        </div>
                        <el-table :data="currentRoom.livingPersonList" style="width: 100%" border header-row-class-name="default" size="small">
                            <el-table-column label="姓名" width="100">
                                <template slot-scope="scope">{{scope.row.name}}</template>
                            </el-table-column>
                            <el-table-column label="手机号" width="">
                                <template slot-scope="scope">{{scope.row.mobile}}</template>
                            </el-table-column>
                            <el-table-column label="性别" width="">
                                <template slot-scope="scope">{{scope.row.sex | F_sex}}</template>
                            </el-table-column>
                            <el-table-column label="客源类型" width="">
                                <template slot-scope="scope">{{F_guestType(scope.row.checkIn.guestType)}}</template>
                            </el-table-column>
                            <el-table-column label="同来客" width="">
                                <template slot-scope="scope">{{currentRoom.livingPersonList ? currentRoom.livingPersonList.length-1 : ''}}</template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="text">查看</el-button>
                                    <!--  @click="handleEdit(scope.$index, scope.row)" -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="remark">
                            <label>备注：<span>{{currentRoom.remark}}</span></label>
                            <el-button type="text" @click="remark=true">修改</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="房间信息">
                    <el-row>
                        <el-col :span="8">
                            门市价：
                            <span>{{currentRoom.extension}}</span>
                        </el-col>
                        <el-col :span="8">
                            窗户：
                            <span>{{currentRoom.windowFlag | F_is1or2}}</span>
                        </el-col>
                        <el-col :span="8">
                            靠马路：
                            <span>{{currentRoom.roadFlag | F_is1or2}}</span>
                        </el-col>
                        <el-col :span="8">
                            噪音房：
                            <span>{{currentRoom.noiseFlag | F_is1or2}}</span>
                        </el-col>
                        <el-col :span="8">
                            无烟房：
                            <span>{{currentRoom.smokeFlag | F_is1or2}}</span>
                        </el-col>
                        <el-col :span="8">
                            高温房：
                            <span>{{currentRoom.temperatureFlag | F_is1or2}}</span>
                        </el-col>
                        <el-col :span="8">
                            朝向：
                            <span>{{currentRoom.toward | F_toward}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            房间备注：
                            <span>{{currentRoom.remark}}</span>
                        </el-col>

                    </el-row>
                </el-tab-pane>

            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <template v-if="currentRoom.checkInRoomType==1">
                    <el-button style="width:60px;" @click="stayoer=true">续住</el-button>
                    <el-button style="width:60px;" @click="yokeplateHandle(currentRoom)">联房</el-button>
                    <el-button style="width:60px;" @click="roomchange=true">换房</el-button>
                    <el-button style="width:60px;" @click="liveCard_in_person_list(currentRoom)">制卡</el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus=='null'||currentRoom.roomStatus==null||currentRoom.roomStatus==1||currentRoom.roomStatus==3" @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">
                        置脏
                    </el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus==2||currentRoom.roomStatus==4" @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">置净</el-button>
                </template>
                <template v-else-if="currentRoom.checkInRoomType==2">
                    <el-button style="width:60px;">入住</el-button>
                    <el-button style="width:60px;" @click="liveCard_in_person_list(currentRoom)">制卡</el-button>
                    <el-button style="width:60px;" @click="handleFix(currentRoom)">维修</el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus=='null'||currentRoom.roomStatus==null||currentRoom.roomStatus==1|| currentRoom.roomStatus==3" @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">
                        置脏
                    </el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus==2 || currentRoom.roomStatus==4" @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">置净</el-button>
                </template>
                <template v-else>
                    <el-button style="width:60px;" @click="stayoer=true">入住</el-button>
                    <el-button style="width:60px;" @click="handleFix(currentRoom)">维修</el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus=='null' ||currentRoom.roomStatus==null ||currentRoom.roomStatus==1 || currentRoom.roomStatus==3"
                               @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">置脏
                    </el-button>
                    <el-button style="width:60px;" v-if="currentRoom.roomStatus==2 || currentRoom.roomStatus==4" @click="handleOperRoomStatus(currentRoom.roomStatus,currentRoom)">置净</el-button>
                </template>
            </div>
        </el-dialog>
        <!-- 续住 -->
        <el-dialog top="0" title="续住" :visible.sync="stayoer" width="80%">
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
        <!-- 换房 -->
        <el-dialog top="0" title="换房" :visible.sync="roomchange" width="80%">
            <!-- <el-card>
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
        </el-card> -->

            <el-row style="margin-bottom:60px">
                <el-form>
                    <el-row>
                        <el-col :span="12">
                            <el-col :span="5">房间号：A100</el-col>
                            <el-col :span="5">客人姓名：战三</el-col>
                            <el-col :span="5">房价：300</el-col>
                            <el-col :span="9" style="margin-top:-10px">
                                <el-form-item label="换房原因:">
                                    <el-input style="width:112px;"></el-input>
                                </el-form-item>

                            </el-col>
                        </el-col>

                    </el-row>
                </el-form>
                <h3>房间信息</h3>
                <el-form inline size="mini">
                    <el-row>
                        <el-col :span="17">
                            <div class="grid-content">
                                <el-row>
                                    <el-button>不可改房价</el-button>&nbsp;&nbsp;
                                    <el-select v-model="checkInForm.enterStatus" placeholder="床位数">
                                        <el-option label="全部" value="3">床位数</el-option>
                                        <el-option label="已认证" value="1">已认证</el-option>
                                        <el-option label="未认证" value="2">未认证</el-option>
                                    </el-select>
                                </el-row>
                                <br/>
                                <el-row>
                                    <el-col :span="8" v-for="v in 10" :key="v">
                                        <div class="grid-content rooms">
                                            <div class="grid-cell">
                                                <div class="wrap">
                                                    <el-row class="row">
                                                        <el-col :span="14">
                                                            <span>标准间</span>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <div style="text-align: right">
                                                                <el-input-number @change="handleChange" :min="1" :max="10" label="" size="mini" style="width:100px"></el-input-number>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class="row">
                                                        <el-col :span="14">
                                                            <el-button type="text" size="mini">可订12</el-button>
                                                        </el-col>
                                                        <el-col :span="10">
                                                            <div style="text-align: right">
                                                                <el-input placeholder="" size="mini" style="width:60px"></el-input>
                                                                <em>666</em>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </div>

                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content">
                                <el-row>
                                    <el-button>自动排房</el-button>&nbsp;&nbsp;
                                </el-row>
                                <br/>
                                <el-row class="roomSelect">
                                    <ul>
                                        <li v-for="v in 2" :key="v">
                                            <div class="grid-content rooms">
                                                <div class="grid-cell">
                                                    <div class="wrap">
                                                        <el-row class="row">
                                                            <el-col :span="14">
                                                                <span>标准间</span>
                                                            </el-col>
                                                            <el-col :span="10">
                                                                <div style="text-align: right">
                                                                    <el-button type="primary" size="mini">排房</el-button>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="row">
                                                            <el-button size="mini">A101</el-button>
                                                        </el-row>
                                                        <el-row class="row">
                                                            <el-col :span="14">
                                                                <el-button type="text" size="mini">可订12</el-button>
                                                            </el-col>
                                                            <el-col :span="10">
                                                                <div style="text-align: right">
                                                                    <el-input-number @change="handleChange" :min="1" :max="10" label="" size="mini" style="width:100px"></el-input-number>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>

                                </el-row>

                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>
            <el-row>
                <el-button style="width:60px;float:right">取消</el-button>
                <el-button style="width:60px;float:right" type="primary">确定</el-button>
            </el-row>
        </el-dialog>
        <!-- 制卡 -->
        <el-dialog top="0" :show-close='false' title="房卡操作" :visible.sync="mackcade" width="60%">
            <el-row>
                <span>共一间&nbsp;&nbsp;本次已制卡数：{{liveCardData.done}}</span>
                <el-col :span="8" style="float:right">
                    <el-button @click="make_card_status">制卡</el-button>
                    <el-button>清卡</el-button>
                    <el-button>读卡</el-button>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="liveCardData.checkInRoomList" @selection-change="handleSelectionChange" height="100%" header-row-class-name="default" size="small">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="房间号" width="200">
                    <template slot-scope="{row}">
                        {{row.room?row.room.houseNum:''}}
                    </template>
                </el-table-column>
                <el-table-column label="本次制卡状态">
                    <template slot-scope="{row}">
                        {{F_markCard(row.markCard)}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="mackcadeCancel">取消</el-button>
            </div>
        </el-dialog>

        <!-- 修改备注 -->
        <el-dialog top="0" title="修改备注" :visible.sync="remark" width="600px">
            <el-form>
                <el-form-item label="备注:">
                    <el-input type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="remark = false">取 消</el-button>
                <el-button size="small" type="primary" class="submit" @click="remark = false">确 定</el-button>
            </div>
        </el-dialog>
        <roomStatusHandle ref="roomStatusHandle" @initForm="initForm"/>
        <unitedRoomHandle ref="unitedRoomHandle"/>
    </div>
</template>

<script>
    let personRoom = [{
        name: '今日预离',
        value: 'today_out'
    },
        {
            name: '散客',
            value: 'homepage_individual'
        },
        {
            name: '会员',
            value: 'homepage_member'
        },
        {
            name: '单位',
            value: 'homepage_enter'
        },
    ];
    let roomStatus = [{
        type: "success",
        name: '空净',
        value: '1'
    }, {
        type: "danger",
        name: '空脏',
        value: '2'
    }, {
        type: "",
        name: '住静',
        value: '3'
    }, {
        type: "warning",
        name: '住脏',
        value: '4'
    }, {
        type: "info",
        name: '维修',
        value: '5'
    }]
    import unitedRoomHandle from "./unitedRoomHandle";
    import roomStatusHandle from "./roomStatusHandle";
    import myMixin from '@/utils/filterMixin';

    export default {
        components: {
            roomStatusHandle,
            unitedRoomHandle
        },
        mixins: [myMixin],
        data() {
            return {
                remark: false,
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
                checkInForm: {
                    searchType: 1,
                    content: '',
                    enterStatus: '',
                    pageIndex: 1, //当前页
                    pageSize: 10, //页数
                    startTime: "", //考试时件
                    endTime: "" //结束时间
                },
                print: false, //催押
                batch: false,
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
                hosteldata: [{}],
                display: true,
                activeName: "one",
                Oswitch: false,
                input: "", //搜索框
                checked1: false,
                checked2: false,
                checked3: false,
                roomStatusList: [], //房态
                roomList: [],
                checked: false,
                activeThree: "a",
                currentPage3: "",
                value1: "", //时间
                loading: true,
                roomloading: true,
                searchForm: {
                    keyword: '',
                    checkInType: [],
                    state: 1,
                    roomStatus: [],
                    roomTypeId: [],
                    buildingId: '',
                    buildingFloorId: '',
                    channel: [],
                    personRoom: []
                },
                personRoom: '',
                roomTypeId: '',
                channel: '',
                iconDesList: '',
                hotel_building_list: '',
                hotel_building_floor_list: '',
                currentRoom: '',
                liveCardData: [],
                liveCardLoading: false,
                multipleSelection: []

            };
        },
        filters: {

            F_roomStatusColor(value) {
                let enums = {
                    '1': '#276BBA',
                    '2': '#C0512B',
                    '3': '#276BBA',
                    '4': '#e6a23c',
                    '5': '#27AE76'
                }
                return enums[value] ? enums[value] : '#276BBA'
            }
        },
        async mounted() {
            await this.getChannel()
            await this.getPersonRoom()
            // await this.getRoomStatus()
            await this.getIconDes()
            this.realtime_room_statistics()
            this.get_hotel_building_list()
            this.initForm();
        },
        methods: {
            initForm() {
                this.searchForm = {
                    keyword: '',
                    checkInType: [],
                    state: 1,
                    roomStatus: [],
                    roomTypeId: [],
                    buildingId: '',
                    buildingFloorId: '',
                    channel: [],
                    personRoom: []
                };
                this.getDataList();
            },
            /**获取表格数据 */
            getDataList() {
                this.roomloading = true
                this.roomList = []
                return new Promise((resolve, reject) => {
                    this.$F.doRequest(this, '/pms/realtime/realtime_hotel_room_list', this.searchForm, (res) => {
                        this.roomloading = false
                        this.roomList = res.floorList;
                        resolve(res)
                    })
                })
            },
            getChannel() {
                return new Promise((resolve, reject) => {
                    this.$F.getPublicDictByType(this, 1, (res) => {
                        this.dict_channel = res
                        resolve(res)
                    })
                })

            },
            getPersonRoom() {
                return new Promise((resolve, reject) => {
                    this.$F.getPublicDictByType(this, 7, (res) => {
                        this.dict_personRoom = res;
                        this.personRoom = res
                        resolve(res)
                    })
                })

            },
            getRoomStatus() {
                return new Promise((resolve, reject) => {
                    this.$F.getPublicDictByType(this, 15, (res) => {
                        // this.dict_roomStatus= res
                        resolve(res)
                    })
                })
            },
            //获取图标说明
            getIconDes() {
                return new Promise((resolve, reject) => {
                    this.$F.getPublicDictByType(this, 15, (res) => {
                        this.iconDesList = res
                        resolve(res)
                    })
                })
            },
            realtime_room_statistics() {
                let that = this
                this.$F.doRequest(this, '/pms/realtime/realtime_room_statistics', this.searchForm, (res) => {
                    let menu = {
                        '0': 'orders_today_out', //今日预离
                        '1': 'orders_individual', //散客
                        '2': 'orders_member', //会员
                        '3': 'orders_enter', //单位
                        //'4':'',//
                        '5': 'orders_clock', //钟点房
                        '6': 'orders_night', //午夜房
                        '7': 'orders_free' //免费
                    }
                    // debugger;
                    this.roomStatusList = res.roomStatusList;
                    this.personRoom = res.personRoomList
                    this.roomTypeId = res.roomTypeList
                    this.channel = res.channelList
                    this.channel.forEach(element => {
                        element.name = checkIdInDict(element.channel, this.dict_channel)
                    });
                    this.personRoom.forEach(element => {
                        element.eName = menu[element.personRoomType]
                        element.name = checkIdInDict(element.eName, this.dict_personRoom, 'icon')
                    });

                    function checkIdInDict(id, arr, eName) {
                        for (let k in arr) {
                            if (eName) {
                                if (arr[k].eName == id) {
                                    return that.$i18n.locale == 'ri' ? arr[k].japanese : arr[k].name
                                }
                            } else {
                                if (arr[k].dictNum == id) {
                                    return that.$i18n.locale == 'ri' ? arr[k].japanese : arr[k].name
                                }

                            }

                        }
                        return ''
                    }

                    // console.log(this.channel)
                    // console.log(this.roomStatus)
                    console.log(this.personRoom)
                })
            },
            get_hotel_building_list() {
                this.$F.doRequest(this, '/pms/hotel/hotel_building_list', {}, (res) => {
                    this.hotel_building_list = res
                })
            },
            get_hotel_building_floor_list(id) {
                this.$F.doRequest(this, '/pms/hotel/hotel_building_floor_list', {
                    buildingId: id
                }, (res) => {
                    this.hotel_building_floor_list = res
                })

            },
            buildingSelectChange(e) {
                console.log(e)
                this.searchForm.buildingId = e
                this.searchForm.buildingFloorId = ''
                this.get_hotel_building_floor_list(e)
                this.getDataList()

            },
            floorSelectChange(e) {
                console.log(e)
                this.searchForm.buildingFloorId = e;
                this.getDataList()
            },
            clearnSelectAttr(attr) {
                this.searchForm[attr] = '';
                this.getDataList()
            },
            F_roomStatusColor(value) {
                let enums = {
                    '1': '#27AE76',
                    '2': '#C0512B',
                    '3': '#276BBA',
                    '4': '#C0512B',
                    '5': '#27AE76'
                }
                return enums[value] ? enums[value] : '#276BBA'
            },

            F_roomStatus(value) {
                let enums = this.roomStatusList;
                var array = enums.filter((item) => {
                    return item.roomStatus == value;
                })
                return array.length > 0 ? array[0].total : 0;
            },

            handleOperRoomStatus(s, item) {
                console.log(s)
                let status = '';
                if (s == 1 || s == null || s == 'null') {
                    status = 2
                }
                if (s == 3) {
                    status = 4
                }
                if (s == 2) {
                    status = 1
                }
                if (s == 4) {
                    status = 3
                }
                this.$F.doRequest(this, '/pms/hotel/oper_room_status', {
                    roomIds: item.id,
                    roomStatus: status
                }, (res) => {
                    this.hosteldis = false
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.getDataList()
                })
            },
            handleChange(e) {
                this.getDataList()
            },
            hostelmess(room) {
                this.hosteldis = true;
                this.currentRoom = room
            },
            yokeplateHandle(item) {
                this.$refs.unitedRoomHandle.init(item.id);
            },
            handleFix(item) {
                this.$confirm('请确认房间维修', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$F.doRequest(this, '/pms/hotel/oper_room_status', {
                        roomStatus: 5,
                        roomIds: item.id
                    }, (res) => {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    })
                }).catch(() => {
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 待开票
            handleEdit(index, row) {
                // console.log(index, row);
                this.billList = row;
                console.log(this.billList, 11111);
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
            },
            batchRoomHaldel() {
                this.$refs.roomStatusHandle.init();
            },
            //获取制卡房间表
            liveCard_in_person_list(item) {
                console.log(item)
                if (!item.livingPersonList || !item.livingPersonList.length) {
                    this.$message.error('暂无入住人，请添加入住人后操作')
                    return
                }
                let params = {
                    type: 3,
                    checkinId: item.livingPersonList[0].checkinId,
                    pageIndex: 1,
                    pageSize: 999
                };
                this.liveCardLoading = true;
                this.$F.doRequest(this, '/pms/checkin/live_in_person_list', params, (res) => {
                    // this.liveCardData = res.checkInRoomList
                    this.liveCardData = res
                    this.liveCardData.done = 0;
                    this.liveCardData.unfinished = 0;
                    let list = res.checkInRoomList;
                    for (let k in list) {
                        if (list[k].markCard == 2) {
                            this.liveCardData.done++
                        }
                        if (list[k].markCard == 1) {
                            this.liveCardData.unfinished++
                        }
                    }
                    this.liveCardLoading = false
                    this.mackcade = true
                    this.$forceUpdate()
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            mackcadeCancel() {

                this.mackcade = false

            },
            make_card_status() {
                let arr = []
                if (!this.multipleSelection.length) {
                    this.$message.error('至少选择一间房间')
                    return
                }
                this.multipleSelection.forEach(element => {
                    arr.push(element.id)
                });
                let params = {
                    checkInRoomIds: arr,
                };
                this.$F.doRequest(this, '/pms/checkin/make_card_status', params, (res) => {
                    this.$message({
                        message: '制卡成功',
                        type: 'success'
                    });
                    this.liveCard_in_person_list()
                    this.$forceUpdate()
                })
            },
            F_markCard(value) {
                let enums = this.$t('commons.markCard')
                return value && enums[value] ? enums[value] : ''
            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
    .content {
        display: flex;
        flex-direction: row;
        height: 100%;

        > div, section {
            background: #fff;
            border-radius: 10px;
            height: 100%;
            overflow: auto;
        }

        .left {
            flex: 1;
            margin-right: 20px;
            padding: 20px;

            .room {
                border-bottom: 1px dashed #ccc;
                padding: 10px 0;

                &.el-form {
                    padding-top: 0;

                    .el-form-item {
                        margin-bottom: 0;

                        .search {
                            width: 137px !important;
                            height: 30px !important;
                            line-height: 30px !important;
                        }
                    }
                }

                .row-width {
                    width: 100px;
                }

                .tag-top {
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .fang {
                        color: #1e1e1e;
                    }

                    .all {
                        margin-left: 10px;
                        color: #999;
                        font-size: 12px;
                    }

                    .reset {
                        border-radius: 2px;
                        padding: 4px;
                        color: #999;
                        font-size: 12px;
                        border: 1px solid #ccc;
                    }
                }

                .tag-btm {
                    .el-checkbox-group {
                        display: flex;
                        flex-wrap: wrap;

                        .el-checkbox {
                            margin: 0 0 10px;
                            width: 50%;

                            &.roomType {
                                width: 100%;
                                position: relative;

                                .total {
                                    position: absolute;
                                    right: 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        .right {
            flex: 3;

            .el-header {
                margin: 0 20px;
                border-bottom: 1px solid #dedede;
                display: flex;
                align-items: center;
            }

            .el-footer {
                display: flex;
                align-items: center;
                background-color: #fff;
                box-shadow: 0px -5px 8px 0px rgba(0, 0, 0, 0.19);

                .icondesc {
                    span {
                        vertical-align: middle;
                    }

                    .item {
                        margin: 0 0 10px 0;
                    }
                }
            }

            .el-main {
                .floor .count {
                    margin-left: 100px;
                }

                .floor-box {
                    display: flex;
                    flex-wrap: wrap;

                    .tag-margin {
                        height: 140px;
                        width: 250px;
                        padding: 10px;

                        & > div {
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            padding: 10px;
                            color: #fff;
                        }

                        .line {
                            margin-bottom: 10px;

                            span + span {
                                margin-left: 20px;
                            }
                        }

                        .placeIcon {
                            margin-top: 25px
                        }
                    }
                }
            }
        }
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
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        margin-right: 4px;
    }

    .inco.i_img {
        background: none;
        border: 0
    }

    .inco.i_img img {
        width: 100%;
        height: 100%;
    }

    .el-checkbox.is-bordered {
        border: none;
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

    .rooms {
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .rooms .grid-cell {
        border: 1px solid #eee;
        border-radius: 5px;
    }

    .rooms .grid-cell:active {
        background: #E3EEFF;
        border-color: #126EFF;
    }

    .rooms .grid-cell .wrap {
        padding: 10px 5px;
    }

    .rooms .grid-cell .wrap .row:last-child {
        margin-top: 10px;
    }

    .rooms .grid-cell .wrap em {
        font-style: normal;
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
        margin-left: 5px;
    }

    .roomSelect {
        background: #F6F7F7;
    }

    .roomSelect ul li .rooms {
        margin: 0
    }

    .roomSelect ul li .rooms .grid-cell {
        border: 0
    }

    .roomSelect ul {
        padding: 0 20px
    }

    .roomSelect ul li {
        border-bottom: 1px solid #D7D7D7;
        padding: 10px 0;
    }

    .roomSelect ul li:last-child {
        border-bottom: 0;
    }

    .inMsg {
        padding: 20px;

        .row {
            display: flex;
            flex-wrap: wrap;
            line-height: 26px;

            .col {
                width: 33%;

                span {
                    margin-left: 5px;
                }
            }
        }

        .el-table {
            margin: 10px 0;
        }
        .remark {
            padding: 0 20px;
            display: flex;
            align-items: center;
            line-height: 30px;

            .el-button {
                font-size: 14px;
            }
        }
    }


</style>
