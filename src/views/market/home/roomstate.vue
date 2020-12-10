<template>
    <div class="boss-index" v-loading="loading">
        <!-- 房间动态 -->
        <div class="content">
            <div class="left">
                <el-form class="room" v-model="searchForm" inline size="small">
                    <el-form-item>
                        <el-input v-model="searchForm.keyword" class="search" :placeholder="$t('desk.home_nameAroom')" @keyup.native="handleChange">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="searchForm.checkInType" @change="handleChange">
<!--                            <el-checkbox-button label="1">{{-->
<!--                                    $t("desk.home_idCard")-->
<!--                                }}-->
<!--                            </el-checkbox-button>-->
<!--                            <el-checkbox-button label="2">{{-->
<!--                                    $t("desk.home_roomCard")-->
<!--                                }}-->
<!--                            </el-checkbox-button>-->
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <!-- 房态 -->
                <div class="room">
                    <div class="tag-top">
                        <span class="fang">{{ $t("desk.home_toRoom") }}</span>
                        <span class="reset" @click="clearnSelectAttr('roomStatus')">
                            {{ $t("commons.resetBtn") }}
                        </span>
                    </div>
                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomStatus" @change="handleChange">
                            <el-checkbox v-for="(item, index) in $t('commons.roomStatus')" :key="index" :label="item.value">
                                <el-tag :type="item.type" effect="plain" size="mini">
                                    <span>{{ item.name + " " + F_roomStatus(item.value) }}</span>
                                </el-tag>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <!-- 房型 -->
                <div class="room">
                    <div class="tag-top">
                        <div>
                            <span class="fang">{{ $t("desk.home_roomType") }}</span>
                            <span class="all">{{ $t("desk.home_roomType") }}</span>
                        </div>
                        <span class="reset" @click="clearnSelectAttr('roomTypeId')">
                            {{ $t("commons.resetBtn") }}
                        </span>
                    </div>

                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.roomTypeId" @change="handleChange">
                            <el-checkbox class="roomType" v-for="item of roomTypeList" :key="item.roomTypeId" :label="item.roomTypeId">
                                {{ item.houseName ? item.houseName : $t("desk.home_unknown") }}
                                <span class="total">{{ item.reserveCount }}/{{ item.total }}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>

                <!-- 楼栋楼层 -->
                <el-form class="room" v-model="searchForm" size="small">
                    <el-form-item :label="$t('desk.home_floorBuilding') + ':'">
                        <el-select v-model="searchForm.buildingId" :placeholder="$t('desk.home_building')" class="row-width" @change="buildingSelectChange">
                            <el-option v-for="item in hotel_building_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="searchForm.buildingFloorId" :placeholder="$t('desk.home_floor')" class="row-width margin-l-8" @change="floorSelectChange">
                            <el-option v-for="item in hotel_building_floor_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <!-- 渠道 -->
                <div class="room">
                    <div class="tag-top">
                        <span class="fang">{{ $t("desk.home_channel") }}</span>
                        <span class="reset" @click="clearnSelectAttr('channel')">{{ $t("commons.resetBtn") }}</span>
                    </div>
                    <div class="tag-btm">
                        <el-checkbox-group v-model="searchForm.channel" @change="handleChange">
                            <el-checkbox class="roomType" v-for="item of channel" :key="item.channel" :label="item.channel">
                                {{ item.name ? item.name : $t("desk.home_unknown") }}
                                <span class="total">{{ item.total }}</span>
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

            <el-container class="right" v-loading="roomloading">
                <el-header>
                    <el-row>
                        <el-checkbox-group v-model="searchForm.personRoom" @change="handleChange">
                            <el-checkbox v-for="(item, index) in personRoom" :value="item.eName" :label="item.eName" :key="index">
                                {{ item.name }}({{ item.total }})
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                </el-header>
                <el-main>
                    <div v-for="(item, index) in roomList" :key="index">
                        <div v-if="item.floorRoomCount > 0">
                            <div class="floor">
                <span class="title">{{ item.building ? item.building.name : "" }}
                    <span>{{ item.floor }}</span>
                    <span>{{ $t("desk.home_layer") }}</span>
                </span>
                <span class="count">
                  <span style="color: #126eff">{{ item.reserveFloorRoomCount }}</span>/{{ item.floorRoomCount }}
                </span>
                            </div>
                            <div class="floor-box">
                                <div @click="hostelmess(room, item)" class="tag-margin" v-for="(room, i) in item.roomList" :key="i">
                                    <div :style="`background:${F_roomStatusColor(room.roomStatus)};`">
                                        <div class="line">
                                            <span>{{ room.houseNum }}</span>
                                            <span>{{ room.hotelRoomType.houseName }}</span>
                                        </div>
                                        <!--                                    && (room.roomStatus==3 || room.roomStatus==4)-->
                                        <div class="line" v-if=" room.livingPersonList && room.livingPersonList.length > 0 && (room.checkInRoomType == 1 || room.checkInRoomType == 2)">
                                            <span>{{ room.livingPersonList[0].name }}</span>
                                            <span>{{ F_sex(room.livingPersonList[0].sex) }}</span>
                                        </div>
                                        <!-- 清扫图标后期加 -->
                                        <div class="placeIcon text-center">
                                            <img v-if="room.roomStatus == 5" :src="require('@/assets/images/frontdesk/fix.png')"/>
                                            <img v-if="room.roomStatus == 2 || room.roomStatus == 4" :src="require('@/assets/images/frontdesk/clearn.png')"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button class="white" size="small" @click="batchRoomHaldel">{{
                            $t("desk.home_batchSet")
                        }}
                    </el-button>
                    <!--          <el-button class="white" size="small">{{ $t("desk.home_printRoomState")  }}</el-button>-->
                    <!--          <el-button type="primary"  class="submit" size="small" @click="print = true"  icon="el-icon-message-solid">-->
                    <!--              {{ $t("desk.home_pushAnd") }}</el-button>-->
                    <!-- 催押 -->
                    <el-dialog top="0" :title="$t('desk.home_nowCall')" width="1160px" :visible.sync="print">
                        <el-form :model="form">
                            <el-row>
                                <el-col :span="6">
                                    <el-form-item :label="$t('desk.home_roomNum') + ':'">
                                        <el-input v-model="form.roomname" style="width: 160px" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item :label="$t('desk.home_phoneNum') + ':'" :label-width="formLabelWidth">
                                        <el-input v-model="form.phonenum" style="width: 160px" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item :label="$t('desk.home_name') + ':'" :label-width="formLabelWidth">
                                        <el-input v-model="form.peoplename" style="width: 160px" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item>
                                        <el-button style="width: 80px; margin-left: 20px" type="primary" @click="submitForm('form')">{{ $t("commons.queryBtn") }} </el-button>
                                        <el-button style="width: 80px" @click="resetForms('form')">{{ $t("commons.resetBtn") }}</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">{{ $t("desk.home_all") }} 120</el-checkbox>
                                </el-col>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">{{ $t("desk.home_pushAnd") }} 20</el-checkbox>
                                </el-col>
                                <el-col :span="2">
                                    <el-checkbox v-model="checked">{{ $t("desk.home_owe") }} 120</el-checkbox>
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
                                <el-table-column :label="$t('desk.home_roomNum')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.customer_livePeople')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.customer_totalConsum')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.order_theDeposit')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.home_balanceOf')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('food.common.status')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.home_name')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('desk.home_phoneNum')" width="120">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            {{ scope.row.name }}
                                        </div>
                                    </template>
                                </el-table-column>

                                <el-table-column :label="$t('commons.operating')">
                                    <template slot-scope="scope">
                                        <!-- <el-button
                                                                        size="mini"
                                        @click="Edit(scope.$index, scope.row)">账单详情</el-button>-->
                                        <el-button
                                            type="text"
                                            @click="Edit(scope.$index, scope.row)"
                                            size="mini"
                                        >{{$t('desk.home_accountDetail')}}
                                        </el-button
                                        >
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <div slot="footer" class="dialog-footer" style="text-align: center">
                            <el-button type="primary" @click="print = false">{{$t('commons.close')}}</el-button>
                        </div>
                    </el-dialog>

                    <!-- <el-button type="primary"><i class="el-icon-message-solid"></i>催押</el-button> -->
                    <!-- 图标 -->
                    <el-popover placement="top-start" width="840" trigger="hover">
                        <!-- <p>hdfkhajkghgh</p> -->
                        <div class="icondesc">
                            <h3>{{$t('desk.home_iconShows')}}</h3>
<!--                            <el-col :span="4" class="item">-->
<!--                                <span class="inco">钟</span>-->
<!--                                <span>钟点房</span>-->
<!--                            </el-col>-->
                            <el-col :span="4" class="item">
                                <span class="inco">{{$t('desk.home_drawUp')}}</span>
                                <span>{{$t('desk.home_bookRoom')}}</span>
                            </el-col>
                            <el-col :span="4" class="item">
                                <span class="inco">{{$t('desk.home_form')}}</span>
                                <span>{{$t('desk.home_todayDeparture')}}</span>
                            </el-col>
<!--                            <el-col :span="4" class="item">-->
<!--                                <span class="inco">长</span>-->
<!--                                <span>长租房</span>-->
<!--                            </el-col>-->
                            <el-col :span="4" class="item">
                <span class="inco i_img">
                  <img
                      :src="require('@/assets/images/frontdesk/minClearn.png')"
                  />
                </span>
                                <span>{{$t('desk.home_dirtyRoom')}}</span>
                            </el-col>
                            <el-col :span="4" class="item">
                <span class="inco i_img">
                  <img :src="require('@/assets/images/frontdesk/minFix.png')"/>
                </span>
                                <span>{{$t('desk.home_maintenanceRoom')}}</span>
                            </el-col>
                            <el-col :span="4" class="item">
                <span class="inco i_img">
                  <img :src="require('@/assets/images/frontdesk/lian.png')"/>
                </span>
                                <!--                <span>联房</span>-->
                            </el-col>
                        </div>

                        <el-button
                            type="text"
                            class="icon"
                            size="small"
                            slot="reference"
                            icon="el-icon-question"
                        >{{$t('desk.home_iconImg')}}
                        </el-button
                        >
                    </el-popover>
                    <!--                    <div style="float:right">80</div>-->
                </el-footer>
            </el-container>
        </div>
        <!-- 房间信息 -->
       <room-info :currentRoom='currentRoom' ref="roomInfo"></room-info>
        <!-- 续住 -->
        <el-dialog top="0" :title="$t('desk.home_stayOver')" :visible.sync="stayoer" width="80%">
            <el-alert
                :title="$t('desk.home_needLeave')"
                type="error"
                :closable="false"
                show-icon
            ></el-alert>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                header-row-class-name="default"
                size="small"
            >
                <el-table-column :label="$t('desk.home_roomNum')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_name')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_orignLeaveTime')" width="100">
                    <template>A100</template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_stayOverDay')">
                    <template>
                        <el-input-number v-model="stayoernum" :step="1"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_newLeaveTime')">
                    <template class="block">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            :placeholder="$t('desk.serve_chooseDate')"
                        ></el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('desk.home_hejiRoomPrice')">
                    <template>A100</template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="stayoer = false">{{$t('commons.cancel')}}</el-button>
                <el-button size="small" type="primary" class="submit" @click="stayoer = false">{{$t('commons.determine')}}</el-button>
            </div>
        </el-dialog>
        <!-- 换房 -->
        <el-dialog top="0" :title="$t('desk.home_changeRoom')" :visible.sync="roomchange" width="1200px">
            <!-- <el-card>
                      <el-form>
                        <el-row>
                          <span>{{$t('desk.home_roomNum')}}：A100</span>
                          <span>客人姓名：战三</span>
                          <span>房价：300</span>
                          <span>换房原因：</span>
                          <el-input style="width:100px"></el-input>
                        </el-row>
                      </el-form>
                      <el-col :span="18">
                        <el-card>
                          <el-col class="col">
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
            </el-card>-->
            <el-form size="small" inline class="inline">
                <el-form-item :label="$t('desk.home_roomNum') + ':'">A100</el-form-item>
                <el-form-item :label="$t('desk.order_guestName')">战三</el-form-item>
                <el-form-item label="房价：">300</el-form-item>
                <el-form-item label="换房原因:">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <h3>{{ $t('desk.roomInfoDesc') }}</h3>
            <div class="mainer">
                <div class="left">
                    <el-form class="inline" inline size="medium">
                        <!--            <el-form-item>-->
                        <!--              <el-button class="white">不可改房价</el-button>-->
                        <!--            </el-form-item>-->
                        <el-form-item>
                            <el-select v-model="checkInForm.enterStatus" placeholder="床位数">
                                <el-option :label="$t('desk.home_all')" value="3"
                                >床位数
                                </el-option
                                >
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="main">
                        <div class="main-item" v-for="v in 10" :key="v">
                            <div class="rooms">
                                <div class="row">
                                    <span>标准间</span>
                                    <div>
                                        <el-input-number
                                            @change="handleChange"
                                            :min="1"
                                            :max="10"
                                            label
                                            size="mini"
                                            style="width: 100px"
                                        ></el-input-number>
                                    </div>
                                </div>
                                <div class="row">
                                    <span class="allow">可订12</span>
                                    <div>
                                        <el-input
                                            placeholder
                                            size="mini"
                                            style="width: 70px"
                                        ></el-input>
                                        <del>666</del>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <el-button class="white">{{ $t('desk.autoRowHouse') }}</el-button>
                    <div class="main">
                        <div class="row">
                            <div>
                                <span>标准间</span>
                                <span class="count">{{}}间</span>
                            </div>
                            <el-button type="primary" class="submit" size="small"
                            >排房
                            </el-button
                            >
                        </div>
                        <div>
                            <el-button size="small" class="disabled">A1001</el-button>
                            <el-button size="small" class="delete">
                                <i class="el-icon-close el-icon--left"></i>移除
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="white">{{ $t('commons.cancel') }}</el-button>
                <el-button class="submit" type="primary">{{ $t('commons.confirm') }}</el-button>
            </div>
        </el-dialog>
        <!-- 制卡 -->
        <el-dialog
            top="0"
            :show-close="false"
            :title="$t('desk.home_roomCardOpreat')"
            :visible.sync="mackcade"
            width="60%"
        >
            <el-row>
                <span>{{$t('desk.home_haveOne')}}&nbsp;&nbsp;{{$t('desk.home_haveCardNum')}}：{{ liveCardData.done }}</span>
                <el-col :span="8" style="float: right">
                    <el-button @click="make_card_status">{{$t('desk.home_makeCard')}}</el-button>
                    <el-button>{{$t('desk.home_clearCard')}}</el-button>
                    <el-button>{{$t('desk.home_readCard')}}</el-button>
                </el-col>
            </el-row>
            <el-table
                ref="multipleTable"
                :data="liveCardData.checkInRoomList"
                @selection-change="handleSelectionChange"
                height="100%"
                header-row-class-name="default"
                size="small"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column :label="$t('desk.home_roomNum')" width="200">
                    <template slot-scope="{ row }">{{
                            row.room ? row.room.houseNum : ""
                        }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('desk.home_nowMakeState')">
                    <template slot-scope="{ row }">{{
                            F_markCard(row.markCard)
                        }}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="mackcadeCancel">{{ $t('commons.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 修改备注 -->
        <el-dialog top="0" :title="$t('desk.home_resetRemark')" :visible.sync="remark" width="600px">
            <el-form>
                <el-form-item :label="$t('desk.home_note') + ':'">
                    <el-input type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" class="white" @click="remark = false"
                >{{$t('commons.cancel')}}
                </el-button
                >
                <el-button
                    size="small"
                    type="primary"
                    class="submit"
                    @click="remark = false"
                >{{$t('commons.determine')}}
                </el-button
                >
            </div>
        </el-dialog>
        <roomStatusHandle ref="roomStatusHandle" @initForm="initForm"/>
        <unitedRoomHandle ref="unitedRoomHandle"/>
        <rowRoomHandle ref="rowRoomHandle"/>
    </div>
</template>

<script>
import unitedRoomHandle from "./unitedRoomHandle";
import roomInfo from "./roomInfo";
import roomStatusHandle from "./roomStatusHandle";
import rowRoomHandle from "./rowRoomHandle";
import myMixin from "@/utils/filterMixin";
import { getLanguage, setLanguage } from "@/utils/auth";
export default {
    components: {
        roomStatusHandle,
        unitedRoomHandle,
        rowRoomHandle,
        roomInfo
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

            ],
            billList: [], //点击开票按钮的数据
            checkInForm: {
                searchType: 1,
                content: "",
                enterStatus: "",
                pageIndex: 1, //当前页
                pageSize: 10, //页数
                startTime: "", //考试时件
                endTime: "", //结束时间
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
                hostel: "",
            },
            billForm: {
                resource: "", //单选按钮
            },
            formLabelWidth: "120px",
            form: {
                //催押
                roomname: "",
                peoplename: "",
                phonenum: "",
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
                keyword: "",
                checkInType: [],
                state: 1,
                roomStatus: [],
                roomTypeId: [],
                buildingId: "",
                buildingFloorId: "",
                channel: [],
                personRoom: [],
            },
            personRoom: "",
            roomTypeList: [],
            channel: "",
            iconDesList: "",
            hotel_building_list: "",
            hotel_building_floor_list: "",
            currentRoom: {
                currentRoomData: {personList: []},
                livingPersonList: [],
            },
            liveCardData: [],
            liveCardLoading: false,
            multipleSelection: [],
        };
    },

    async mounted() {
        await this.getChannel();
        await this.getPersonRoom();
        // await this.getRoomStatus()
        await this.getIconDes();
        this.realtime_room_statistics();
        this.get_hotel_building_list();
        this.initForm();
    },
    methods: {
     
        initForm() {
            this.searchForm = {
                keyword: "",
                checkInType: [],
                state: 1,
                roomStatus: [],
                roomTypeId: [],
                buildingId: "",
                buildingFloorId: "",
                channel: [],
                personRoom: [],
            };
            this.getDataList();
        },
        /**获取表格数据 */
        getDataList() {
            this.roomloading = true;
            this.roomList = [];
            this.$F.doRequest(
                null,
                "/pms/realtime/realtime_hotel_room_list",
                this.searchForm,
                (res) => {
                    this.roomloading = false;
                    this.roomList = res.floorList;
                    this.$forceUpdate();
                }
            );
        },
        getChannel() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 1, (res) => {
                    this.dict_channel = res;
                    resolve(res);
                });
            });
        },
        getPersonRoom() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 7, (res) => {
                    this.dict_personRoom = res;
                    this.personRoom = res;
                    resolve(res);
                });
            });
        },
        getRoomStatus() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 15, (res) => {
                    // this.dict_roomStatus= res
                    resolve(res);
                });
            });
        },
        //获取图标说明
        getIconDes() {
            return new Promise((resolve, reject) => {
                this.$F.getPublicDictByType(this, 15, (res) => {
                    this.iconDesList = res;
                    resolve(res);
                });
            });
        },
        realtime_room_statistics() {
            let that = this;
            this.$F.doRequest(
                this,
                "/pms/realtime/realtime_room_statistics",
                this.searchForm,
                (res) => {
                    let menu = {
                        0: "orders_today_out", //今日预离
                        1: "orders_individual", //散客
                        2: "orders_member", //会员
                        3: "orders_enter", //单位
                        //'4':'',//
                        5: "orders_clock", //钟点房
                        // 6: "orders_night", //午夜房
                        // 7: "orders_free", //免费
                    };
                    this.roomStatusList = res.roomStatusList;
                    this.personRoom = res.personRoomList;
                    this.roomTypeList = res.roomTypeList;
                    this.channel = res.channelList;
                    this.channel.forEach((element) => {
                        element.name = checkIdInDict(element.channel, this.dict_channel);
                    });
                    this.personRoom.forEach((element) => {
                        element.eName = menu[element.personRoomType];
                        element.name = checkIdInDict(
                            element.eName,
                            this.dict_personRoom,
                            "icon"
                        );
                    });

                    function checkIdInDict(id, arr, eName) {
                        for (let k in arr) {
                            if (eName) {
                                if (arr[k].eName == id) {
                                    return getLanguage() == "ri" ? arr[k].japanese  : arr[k].name;
                                }
                            } else {
                                if (arr[k].dictNum == id) {
                                    return getLanguage() == "ri" ? arr[k].japanese : arr[k].name;
                                }
                            }
                        }
                        return "";
                    }

                    // console.log(this.channel)
                    // console.log(this.roomStatus)
                    console.log(this.personRoom);
                }
            );
        },
        get_hotel_building_list() {
            this.$F.doRequest(this, "/pms/hotel/hotel_building_list", {}, (res) => {
                this.hotel_building_list = res;
            });
        },
        get_hotel_building_floor_list(id) {
            this.$F.doRequest(
                this,
                "/pms/hotel/hotel_building_floor_list",
                {
                    buildingId: id,
                },
                (res) => {
                    this.hotel_building_floor_list = res;
                }
            );
        },
        buildingSelectChange(e) {
            console.log(e);
            this.searchForm.buildingId = e;
            this.searchForm.buildingFloorId = "";
            this.get_hotel_building_floor_list(e);
            this.getDataList();
        },
        floorSelectChange(e) {
            console.log(e);
            this.searchForm.buildingFloorId = e;
            this.getDataList();
        },
        clearnSelectAttr(attr) {
            this.searchForm[attr] = [];
            this.getDataList();
        },
        F_roomStatusColor(value) {
            let enums = {
                1: "#27AE76",
                2: "#C0512B",
                3: "#276BBA",
                4: "#C0512B",
                5: "#27AE76",
            };
            return enums[value] ? enums[value] : "#276BBA";
        },

        F_roomStatus(value) {
            let enums = this.roomStatusList;
            var array = enums.filter((item) => {
                return item.roomStatus == value;
            });
            return array.length > 0 ? array[0].total : 0;
        },

       
        handleChange(e) {
            this.getDataList();
        },
        hostelmess(room, parent) {
          console.log(room);
          console.log(parent);
            this.currentRoom = room || {};
            this.$F.merge(this.currentRoom, {currentRoomData: {personList: []}});
            this.currentRoom.label = this.currentRoom.checkInRoomType == 1 ? this.$t('frontOffice.checkInfoDesc') : this.$t('desk.order_bookOrderInfo')
            this.$F.merge(this.currentRoom, {livingPersonList: []});

            // this.hosteldis = true;
            console.log(this.$refs.roomInfo);
            this.$refs.roomInfo.changeVisible();
            if (room.checkInRoomType == 1) {
                let id = room.checkInObj.id;
                this.getDetail(id, res => {
                   if ( res.inRoomList &&  res.inRoomList.length > 0) {
                       res.inRoomList.forEach((value) => {
                           if (value.roomId == room.id)
                               this.currentRoom.currentRoomData = value;
                       })
                   }
                    this.$F.merge(this.currentRoom, res);
                    this.currentRoom.personLength = 0;;
                    if (this.currentRoom.currentRoomData.personList.length > 0) {
                        this.currentRoom.personLength = this.currentRoom.currentRoomData.personList.length - 1;
                        this.currentRoom.currentRoomData.personList = this.currentRoom.currentRoomData.personList.slice(0,1);
                    }
                    console.log(JSON.parse(JSON.stringify(this.currentRoom)));
                })
            } else if (room.checkInRoomType == 2) {

            }

        },

        //获取订单详情
        getDetail(id, callback) {
            this.$F.doRequest(this,"/pms/checkin/check_in_detail", {checkInId: id,}, (res) => {
                    callback(res);
                }
            );
        },

        yokeplateHandle(item) {
            this.$refs.unitedRoomHandle.init(item.id);
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

        rowRoomHandle(item) {
            if (item.livingPersonList.length) {
                this.$refs.rowRoomHandle.initForm(item.livingPersonList[0].checkinId);
            } else {
                this.$message.error(this.$t('desk.home_noPeopleLive'));
                return;
            }
        },
        //获取制卡房间表
        liveCard_in_person_list(item) {
            console.log(item);
            if (!item.livingPersonList || !item.livingPersonList.length) {
                this.$message.error(this.$t('desk.home_noPeopleLive'));
                return;
            }
            let params = {
                type: 3,
                checkinId: item.livingPersonList[0].checkinId,
                pageIndex: 1,
                pageSize: 999,
            };
            this.liveCardLoading = true;
            this.$F.doRequest(
                this,
                "/pms/checkin/live_in_person_list",
                params,
                (res) => {
                    // this.liveCardData = res.checkInRoomList
                    this.liveCardData = res;
                    this.liveCardData.done = 0;
                    this.liveCardData.unfinished = 0;
                    let list = res.checkInRoomList;
                    for (let k in list) {
                        if (list[k].markCard == 2) {
                            this.liveCardData.done++;
                        }
                        if (list[k].markCard == 1) {
                            this.liveCardData.unfinished++;
                        }
                    }
                    this.liveCardLoading = false;
                    this.mackcade = true;
                    this.$forceUpdate();
                }
            );
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val);
        },
        mackcadeCancel() {
            this.mackcade = false;
        },
        make_card_status() {
            let arr = [];
            if (!this.multipleSelection.length) {
                this.$message.error(this.$t('desk.home_shouldSelectRoom'));
                return;
            }
            this.multipleSelection.forEach((element) => {
                arr.push(element.id);
            });
            let params = {
                checkInRoomIds: arr,
            };
            this.$F.doRequest(
                this,
                "/pms/checkin/make_card_status",
                params,
                (res) => {
                    this.$message({
                        message: this.$t('commons.request_success'),
                        type: "success",
                    });
                    this.liveCard_in_person_list();
                    this.$forceUpdate();
                }
            );
        },
        F_markCard(value) {
            let enums = this.$t("commons.markCard");
            return value && enums[value] ? enums[value] : "";
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: row;
    height: 100%;
    background: transparent;
    padding: 0;

    > div,
    section {
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
                    height: 150px;
                    width: 20%;
                    padding: 10px;
                    margin: 0;

                    & > div {
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        padding: 10px;
                        color: #fff;
                        border-radius: 5px;
                    }

                    .line {
                        margin-bottom: 10px;

                        span + span {
                            margin-left: 20px;
                        }
                    }

                    .placeIcon {
                        margin-top: 15px;
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
    border: 0;
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

.mainer {
    max-height: 350px;
    display: flex;

    .left {
        flex: 3;
        overflow: auto;
        margin-right: 10px;

        .main {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            background: #f6f7f7;
            margin-top: 20px;

            .main-item {
                padding: 5px;

                .rooms {
                    width: 200px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    padding: 8px 5px;
                    background: #fff;

                    &.active {
                        background: #e3eeff;
                        border-color: #126eff;
                    }

                    .row {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        & + .row {
                            margin-top: 10px;
                        }

                        del {
                            color: #bbb;
                            margin-left: 5px;
                        }

                        .allow {
                            color: #126eff;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .main {
            flex: 1;
            border-radius: 5px;
            padding: 10px;
            background: #f6f7f7;
            margin-top: 20px;

            .row {
                display: flex;
                align-items: center;
                justify-content: space-between;

                & + .row {
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
