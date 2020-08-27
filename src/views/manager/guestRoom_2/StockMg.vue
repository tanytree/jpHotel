<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" class="tabCenter">
      <el-tab-pane :label="$t('manager.grsl_inventoryStatistical')" name="count">
        <div class="content">
          <el-form class="term line demo-form-inline" inline size="small" v-model="form">
            <el-form-item :label="$t('manager.grsl_goodsName')+':'">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('manager.grsl_inventoryState')+':'" class="margin-l-15">
              <el-select v-model="form.status">
                <el-option :label="$t('commons.enable')" value="1"></el-option>
                <el-option :label="$t('commons.disable')" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submit" @click="search">{{$t('commons.queryBtn')}}</el-button>
              <el-button class="grey" @click="reset">{{$t('commons.resetBtn')}}</el-button>
            </el-form-item>
            <el-form-item class="form-inline-flex">
              <el-button class="white" @click="exportcount">{{$t('commons.exportBtn')}}</el-button>
            </el-form-item>
          </el-form>
          <div class="components-edit">
            <el-table
              ref="multipleTable"
              :data="list"
              height="100%"
              header-row-class-name="default"
              size="small"
              @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="70"></el-table-column>
              <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
              <el-table-column prop="inventoryWarning" :label="$t('manager.grsl_warningQuantity')"></el-table-column>
              <el-table-column prop="inventoryCount" :label="$t('manager.grsl_inventoryNum')"></el-table-column>
              <el-table-column :label="$t('commons.operating')" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="popup('changeStock', scope.row)"
                  >{{$t('manager.grsl_resetInventory')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="currentChange"
                :page-size="pageSize"
                :total="total"
                layout="total, prev, pager, next, jumper"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('manager.grsl_warehousingAudit')" name="examine">
        <el-row :gutter="20" style="display: flex;justify-content: center;align-items: center;">
          <div class="btn-click" @click="popup('info')">
            <div style="display: flex;justify-content: center;align-items: center;">
              <img src="../../../assets/images/house.png" alt />
              <span>{{$t('manager.grsl_commodityWarehousing')}}</span>
            </div>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 修改库存 -->
    <el-dialog
      top="0"
      :title="$t('manager.grsl_resetInventory')"
      :visible.sync="changeStockVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="stock" :rules="rules" label-width="150px">
        <el-form-item :label="$t('manager.grsl_inventoryQuantity')+':'" prop="name">
          <el-input v-model="stock.count"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeStockVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="submit('stockNum')">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
    <!-- 商品入库 -->
    <el-dialog
      top="0"
      :title="$t('manager.grsl_commodityWarehousing')"
      :visible.sync="goodsInVisible"
      width="1000px"
      class="goodin"
      :close-on-click-modal="false"
    >
      <el-form :model="goodInForm" :rules="rules" size="small" inline label-width="100px">
        <el-form-item :label="$t('manager.grsl_wareType')+':'" prop="name">
          <el-select v-model="goodInForm.type" :placeholder="$t('manager.grsl_selectWareType')">
            <el-option :label="1">{{$t('manager.grsl_procurementWarehousing')}}</el-option>
            <el-option :label="2">{{$t('manager.grsl_putIn')}}</el-option>
            <el-option :label="3">{{$t('manager.grsl_putOther')}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-inline-flex">
          <el-button
            type="primary"
            class="submit"
            @click="popup('addPi')"
          >{{$t('manager.grsl_bulkAdd')}}</el-button>
        </el-form-item>
      </el-form>
      <el-card shadow="never">
        <el-table
          ref="multipleTable"
          :data="list"
          height="100%"
          border
          header-row-class-name="default"
          size="small"
        >
          <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
          <el-table-column prop="costPrice" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
          <el-table-column :label="$t('manager.grsl_rukuNum')">
            <template slot-scope="scope">
              <el-input v-model="scope.row.inventoryCount" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column :label="$t('commons.operating')" width="100">
            <template slot-scope="scope">
              <el-popconfirm
                :title="$t('manager.grsl_sureToMove')"
                @onConfirm="goodsDelete(scope.row)"
              >
                <el-button slot="reference" type="text" size="small">{{$t('manager.grsl_move')}}</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-form :model="goodInForm" size="small" :rules="rules" ref="goodInForm" label-width="100px">
        <el-col :span="8">
          <el-form-item :label="$t('manager.grsl_agent')+':'" prop="person">
            <el-input v-model="goodInForm.person"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manager.grsl_applyDate')+':'" prop="date">
            <el-date-picker
              v-model="goodInForm.date"
              type="date"
              :placeholder="$t('commons.selectDate')"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item :label="$t('manager.grsl_treasuryNote')+':'">
            <el-input
              type="textarea"
              :rows="2"
              :placeholder="$t('boss.department_placeEnterContent')"
              v-model="goodInForm.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsInVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="submit('goodsin')">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
    <!-- 批量添加商品 -->
    <el-dialog
      top="0"
      :title="$t('manager.grsl_bulkAdd')"
      width="1000px"
      :visible.sync="addGoodsVisible"
      :close-on-click-modal="false"
    >
      <el-form v-model="addGoods" class="demo-form-inline" inline size="small">
        <el-form-item :label="$t('manager.grsl_goodsName')+':'">
          <el-input v-model="addGoods.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.grsl_goodsType')+':'" class="margin-l-15">
          <el-cascader
            v-model="addGoods.category"
            :options="category"
            :props="categoryProps"
            @change="casChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="search">{{$t('commons.queryBtn')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="components-edit">
        <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          height="250px"
          :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
          @selection-change="addSelection"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" :label="$t('manager.grsl_goodsName')"></el-table-column>
          <el-table-column prop="time" :label="$t('manager.grsl_goodsKind')"></el-table-column>
          <el-table-column prop="job_status" :label="$t('manager.grsl_costNoPrice')"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{$t('commons.cancel')}}</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">{{$t('commons.determine')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "count",
      form: { name: "", status: "" },
      stock: { count: "" },
      goodInForm: { type: "", person: "", date: "", remark: "" },
      addGoods: { name: "", categoryId: "" },
      categoryProps: { value: "id", label: "name", children: "child" },
      rules: {
        count: [{ required: true, message: "请输入库存", trigger: "blur" }],
      },
      changeStockVisible: false,
      goodsInVisible: false, //商品入库弹框
      addGoodsVisible: false, // 修改库存
      section: [],
    };
  },
  props: {
    list: Array,
    category: Array,
    total: Number,
    pageSize: Number,
    currentPage: Number,
    initData: Function,
  },
  mounted() {},
  methods: {
    popup(type, row) {
      if (type == "changeStock") {
        this.stock.id = row.id;
        this.stock.count = row.inventoryCount;
        this.changeStockVisible = true;
      }
      switch (type) {
        case "info":
          this.goodsInVisible = true;
          break;
        case "addPi":
          this.addGoodsVisible = true;
          break;
      }
    },
    search() {
      this.getHotelGoodsData(
        this.form.name,
        this.form.category,
        this.form.status
      );
    },
    reset() {
      this.form = { name: "", status: "", category: "" };
      this.getHotelGoodsData();
    },
    casChange(value) {
      this.rowData.categoryId = value[value.length - 1];
    },
    currentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    submit(type) {
      if (type == "stockNum") {
        this.$F.doRequest(
          this,
          "/pms/hotelgoods/upcounts",
          {
            id: this.stock.id,
            counts: this.stock.count,
          },
          (res) => {
            this.changeStockVisible = false;
            this.initData();
          }
        );
      } else if (type == "goodsin") {
        const params = {
          id: "",
          soteageType: this.goodInForm.type,
          agentName: this.goodInForm.person,
          applyTime: this.goodInForm.date,
          remark: this.goodInForm.remark,
          content: "",
        };
        this.$F.doRequest(
          this,
          "/pms/hotelstorage/applyStorage",
          params,
          (res) => {
            this.changeStockVisible = false;
            this.initData();
          }
        );
      }
    },
    goodsDelete(row) {},
    exportcount() {
      this.$F.doRequest(
        this,
        "/pms/hotelgoods/upcounts",
        {
          categoryId: "",
          name: "",
        },
        (res) => {
          this.initData();
        }
      );
    },
    selectionChange(val) {
      this.selection = val;
    },
    addSelection(val) {},
  },
};
</script>

<style lang="less" scoped>
.btn-click {
  height: 200px;
  width: 300px;
  background: #e5e5e5;
  // background-color: linear-gradient(toright, #e5e5e5, #e5e5e5);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
  }

  span {
    font-size: 20px;
    color: #666666;
    margin-left: 10px;
  }
}

.btn-click:hover {
  height: 200px;
  width: 300px;
  background: #4db8ff;
  // background: linear-gradient(toright, #4db8ff, #1aa3ff);
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 30px;
    color: #fff;
  }

  span {
    font-size: 20px;
    color: #fff;
    margin-left: 10px;
  }
}

.goodin {
  .el-card {
    border: 1px solid #c2c2c2;
    margin-bottom: 20px;
  }
}
</style>
