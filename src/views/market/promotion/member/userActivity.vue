<!--
 * @Date: 2020-04-22 10:22:13
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 17:16:00
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/userActivity.vue
 -->
<template>
  <div>
    <el-dialog :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/promotion' }">会员营销</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/userIntegral' }">积分管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" style="margin-top: 10px">
      <el-tab-pane label="进行中" name="ing">
        <el-form inline size="small">
          <el-form-item label="商品名称">
            <el-input v-model="productionForm.goodsTitle" style="width:130px"></el-input>
          </el-form-item>
          <el-form-item label="兑换积分">
            <el-input v-model="productionForm.startPrice" style="width:110px"></el-input>
            <span style="margin:0 5px">--</span>
            <el-input v-model="productionForm.endPrice" style="width:110px"></el-input>
          </el-form-item>
          <el-form-item label="产品库存">
            <el-input v-model="productionForm.startStock" style="width:110px"></el-input>
            <span style="margin:0 5px">-</span>
            <el-input v-model="productionForm.endStock" style="width:110px"></el-input>
          </el-form-item>
          <el-form-item label="上架状态">
            <el-select v-model="productionForm.goodsStatus" style="width:110px">
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" :value="1"></el-option>
              <el-option label="下架" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="queryCourseList()" plain type="primary">查询</el-button>
            <el-button @click="resetForm(true)" plain type="primary">重置</el-button>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" @click="handleProduct('')">新增产品</el-button>
          </el-form-item>
        </el-form>
        <el-row
          type="flex"
          justify="start"
          style="margin:0px 0  10px 0"
          align="middle"
          :gutter="20"
        >
          <el-col :span="4">
            <el-button :disabled="multipleSelection.length == 0" @click="deleteGoods()">删除商品</el-button>
          </el-col>
          <el-col>
            <div class="grid-content bg-purple">已选（{{multipleSelection.length}}）</div>
          </el-col>
        </el-row>

        <el-table
          max-height="600"
          ref="multipleTable"
          :data="nowData"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="handleSelectionChange"
          size="mini"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="goodsTitle" label="产品名称" show-overflow-tooltip>
            <template slot-scope="{row}">
              <img style="margin-right:8px" :src="row.coverImage" class="goodsImg" />
              <span>{{row.goodsTitle}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="presentPrice" label="兑换价格（积分）" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goodStock" label="产品库存" show-overflow-tooltip></el-table-column>
          <el-table-column prop="goodsStatus" label="上架" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-switch
                style="margin-left:10px;"
                v-model="row.goodsStatus"
                :active-value="1"
                :inactive-value="2"
                @change="val=>changeStatus(row, val)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="{row}">
              <el-button
                v-if="row.goodsStatus==2"
                type="text"
                size="mini"
                @click="handleProduct(row)"
              >修改商品</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="padding:20px;"
          :current-page="productionForm.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="nowTotalPage"
        ></el-pagination>
        <activityAddOrUpdate v-if="showDetail" ref="addOrupdate" @refreshDataList="getDataList" />
        <priseSet v-if="showSetPrise" ref="setPriseRef" @refreshDataList="getDataList" />
      </el-tab-pane>
      <!-- 上面是进行中，下面是兑换记录 -->
      <el-tab-pane label="兑换记录" name="record">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          size="mini"
          max-height="1000"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="edtUser.nickname" label="用户名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="scoresGoodsInfo.createTime" label="兑换时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="scoresGoodsInfo.goodsTitle" label="兑换产品" show-overflow-tooltip></el-table-column>
          <el-table-column prop="shippingAddress" label="收货地址" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div v-if="row.edtUser.nickname">{{row.edtUser.nickname}}</div>
              <div
                v-if="row.shippingAddress&&row.shippingAddress.recipientPhone"
              >{{row.shippingAddress.recipientPhone}}</div>
              <div
                v-if="row.shippingAddress&&row.shippingAddress.recipientDetail"
              >{{row.shippingAddress.recipientDetail}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="{row}">
              <el-button
                type="primary"
                v-if="row.scoresGoodsInfo.goodsType==1&&row.orderStatus==1"
                size="mini"
                @click="sureShip(row)"
              >确认发货</el-button>
              <el-button
                v-if="row.scoresGoodsInfo.goodsType==1&&row.orderStatus==2"
                disabled
                size="mini"
              >发货完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:10px"></div>
        <el-pagination
          @size-change="handleSizeChange_D"
          @current-change="handleCurrentChange_D"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
        ></el-pagination>
        <activityAddOrUpdate v-if="showDetail" ref="addOrupdate" @refreshDataList="getDataList" />
        <priseSet v-if="showSetPrise" ref="setPriseRef" @refreshDataList="getDataList" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog width="1000px" @close="editFormClose" title="编辑活动商品" :visible.sync="amendBullet">
      <el-form label-width="100px" class="editForm" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="产品名称" prop="goodsTitle">
          <el-input v-model="editForm.goodsTitle"></el-input>
        </el-form-item>
        <el-form-item label="产品主图" prop="coverImage">
          <div class="specVal">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :data="uploadData"
              :show-file-list="false"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList,'main')"
            >
              <img v-if="editForm.coverImage" :src="editForm.coverImage" class="avatar" style="height:74px;width:74px;margin-right:5px;display:inline-block"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="产品详情" prop="coverIcon">
            <el-upload
              :action="action"
              :data="uploadData" :limit="6"
              list-type="picture-card"
              :before-upload="beforeUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="((file, fileList) => handleRemove(file, fileList))"
              :file-list="editForm.coverIcon2"
              accept=".png, .jpg, .gif"
              :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">尺寸建议750*422，大小2M以下，最多6张</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="产品类型" prop="goodsType">
          <template>
            <el-radio v-model="editForm.goodsType" label="1">实物商品</el-radio>
            <el-radio v-model="editForm.goodsType" label="2">虚拟物品</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="积分价格" prop="presentPrice">
          <el-input v-model="editForm.presentPrice"></el-input>
        </el-form-item>
        <el-form-item label="产品库存" prop="goodStock">
          <el-input v-model="editForm.goodStock"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="editFormSubmit()">确认</el-button>
        <el-button size="small" @click="visible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import activityAddOrUpdate from "./components/activityAddOrUpdate";
import priseSet from "./components/priseSet";
import httpRequest from "@/utils/httpRequest";
import { mapState, mapActions } from "vuex";
export default {
  components: { activityAddOrUpdate, priseSet },

  data() {
    return {
      editForm: {}, //修改商品  接收内容
      mainPng: "", //修改商品时，用来存放主图
      bannerPng: [], //修改商品时，用来存放轮播图
      detailPng: [], //修改商品时，用来存放详情图片
      amendBullet: false,
      activeName: "ing",
      showDetail: false,
      showSetPrise: false,
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      action: '',
      uploadData: {},
      //++++++++++++++++++++++++
      ids: "", //批量删除 需要上传参数
      pageIndex: 1,
      pageSize: 10,
      nowTotalPage: 0,
      nowData: [],
      status: "",
      productionForm: {
        goodsTitle: "", //商品名称模糊查询
        startPrice: "", // 起始兑换价格
        endPrice: "", // 结束兑换价格
        startStock: "", //起始库存
        endStock: "", //结束库存
        goodsStatus: "" //上架状态 1正常  2下架
      },
        //显示图片
        urlShowDialogVisible: false,
        dialogImageUrl: '',
        rules: {
            goodsTitle: [
                { required: true, message: "商品名称不能为空", trigger: "change" }
            ],
            presentPrice : [
                { required: true, message: "价格不能为空", trigger: "change" }
            ],
            coverImage : [ { required: true, message: "封面图片不能为空", trigger: "change" } ],
            coverIcon : [ { required: true, message: "产品详情图片不能为空", trigger: "change" } ],
            goodStock : [ { required: true, message: "库存不能为空", trigger: "change" } ]
        },
    };
  },
    computed: {
        ...mapState({
            user: state => state.user
        }),
    },
  activated() {
      this.action = 'http://xxyweeds.top:8895/edt/upload/upload_img';
      this.uploadData = { imgModel: "3", platSource: 1006, userId: this.user.userId };
      this.resetForm();
      this.getDataList(); //进行中请求的接口
      this.orderList(); //兑换记录请求的接口
  },
  methods: {
    //确认发货
      sureShip(row, params = {}) {
        let orderId = row.id;
        this.$F.merge(params, {
          orderId: orderId
        });

        this.$F.doRequest(
          this,
          "/edt/adminsystem/shop_order_modify",
          params,
          data => {
            this.orderList();
          }
        );
      },
      //点击叉，删除主图
      deleteMainPng() {
        this.mainPng = "";
      },
      //点击叉，删除轮播图
      deleteBannerPng(index) {
        this.bannerPng.splice(index, 1);
      },
      //点击叉，删除详情图
      deleteDetailPng(index) {
        this.detailPng.splice(index, 1);
      },
      //进行中   点击查询
      queryCourseList() {
        this.pageIndex = 1;
        this.getDataList();
      },
      //重置productionForm
      resetForm(query) {
        console.log(query);
        this.productionForm = {
          goodsTitle: "", //商品名称模糊查询
          startPrice: "", // 起始兑换价格
          endPrice: "", // 结束兑换价格
          startStock: "", //起始库存
          endStock: "", //结束库存
          goodsStatus: "" //上架状态 1正常  2下架
        };
        console.log(this.form);
        this.pageIndex = 1;
        this.pageSize = 10;
        this.totalPage = 0;
        if (query) this.getDataList();
      },

      /**主图上传回调 */

      handleSuccess(res, file) {
        if (res.code == 200) {
          this.mainPng = res.data.file_url;
        } else {
          this.$message.error(res.message);
        }
      },

      //请求 积分管理活动管理列表
      getDataList(params = {}) {
        console.log(this.pageIndex);
        this.$F.merge(params, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
        this.$F.merge(params, this.productionForm);
        this.$F.doRequest(
          this,
          "/edt/adminsystem/score_goods_list",
          params,
          data => {
            this.nowData = data.list;
            this.nowTotalPage = data.totalSize;
          }
        );
      },
      //兑换记录请求接口
      orderList(params = {}) {
        console.log(this.pageIndex);
        this.$F.merge(params, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
        this.$F.doRequest(
          this,
          "/edt/adminsystem/shop_order_list",
          params,
          data => {
            this.tableData = data.list;
            this.listTotal = data.totalSize;
          }
        );
      },
      // 修改商品
      handleProduct(row) {
        console.log(row);
          this.editForm = row || {
              "goodsTitle":"",
              "presentPrice": '',
              "coverImage":"",
              "soldTotal":"",
              "goodsStatus":"",
              "status": '0',
              "coverIcon": '',
              "goodsType":1,
              "goodStock":'',
              "bannerIcon":""
          };
          this.editForm.goodsType =  this.editForm.goodsType.toString();
          debugger;
        if (this.editForm.coverIcon) {
            let array = [];
            if (typeof(this.editForm.coverIcon) == 'object') {
                this.editForm.coverIcon2 = this.editForm.coverIcon;
            } else {
                this.editForm.coverIcon.split(",").forEach((item) => {
                    array.push({url: item})
                })
                this.editForm.coverIcon = array;
                this.editForm.coverIcon2 = array;
            }
        } else {
            this.editForm.coverIcon = [];
            this.editForm.coverIcon2 = [];
        }
        // if (row.bannerIcon) {
        //   this.bannerPng = row.bannerIcon.split(",");
        // }
        this.amendBullet = true;
      },
      setPrise(id) {
        this.showSetPrise = true;
        this.$nextTick(() => {
          this.$refs.setPriseRef.initData(id);
        });
      },

      editFormClose() {
          this.amendBullet = false;
          this.$refs["editForm"].resetFields();
      },

      //新建或更新商品
      editFormSubmit(params={}) {
          this.$refs["editForm"].validate(valid => {
              if (valid) {
                  this.$F.merge(params, this.editForm);
                  debugger;
                  let coverIcons = [];
                  this.editForm.coverIcon.forEach(item=> {
                      coverIcons.push(item.url);
                  })
                  this.editForm.coverIcon = coverIcons.join(',');
                  this.doSave(this.editForm, ()=> {
                      this.$message.success('编辑商品成功');
                      this.pageIndex = 1;
                      this.editFormClose();
                      this.getDataList();
                  });
              }
          });
      },
      //改变上架状态
      changeStatus(row, val, params = {}) {
        this.$F.merge(params, {
          id: row.id,
          goodsTitle: row.goodsTitle,
          presentPrice: row.presentPrice,
          goodStock: row.goodStock,
          goodsType: row.goodsType,
          goodsStatus: val
        });
        this.doSave(params);
      },

      doSave(params, callback) {
          this.$F.doRequest(
              this,
              "/edt/adminsystem/score_goods_save",
              params,
              data => {
                if (callback) callback();
              }
          );
      },
      // 批量删除
      deleteGoods(params = {}) {
        this.$F.merge(params, {
          ids: this.ids,
          status: 1
        });
        this.$F.doRequest(
          this,
          "/edt/adminsystem/score_goods_delete",
          params,
          data => {
            this.getDataList();
          }
        );
      },
      /**多选 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let array = [];
        for (let item of val) {
          array.push(item.id);
        }
        this.ids = array.join(",");
      },
      /**每页数 */
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList();
      },
      /**当前页 */
      handleCurrentChange(val) {
        this.pageSize = 10;
        this.pageIndex = val;
        this.getDataList();
      },
      //兑换记录  每页数
      handleSizeChange_D(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.orderList();
      },
      //兑换记录  当前页
      handleCurrentChange_D(val) {
        this.pageSize = 10;
        this.pageIndex = val;
        this.orderList();
      },


      /**删除图片 */
      handleRemove(file, fileList, index) {
          this.form.icon = fileList;
      },

      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.urlShowDialogVisible = true;
      },

      beforeUpload(file) {
          return this.$F.beforeUpload(this, file, 2)
      },

      mainPicSuccess: function (res, file, fileList, type) {
          if (res.code == 200) {
              if(! type)
                  this.editForm.coverIcon.push({url: res.data});
              else
                  this.editForm.coverImage = res.data;
          } else {
              this.$message.error(res.message);
              this.form.icon.pop();
          }
      },
  }
};
</script>
<style lang="less" scoped>
.deleteImg {
  width: 12px;
  height: 12px;
  position: absolute;
  top: -6px;
  right: 0;
}
.divBox {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
  .editForm img {
  }
</style>


