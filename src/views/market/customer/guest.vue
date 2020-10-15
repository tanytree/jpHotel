<!--
 * @Date: 2020-05-08 08:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-15 14:42:12
 * @FilePath: \jiudian\src\views\market\customer\guest.vue
 -->

<template>
  <!-- 统一的列表格式 -->
  <div class="boss-index">
    <div class="booking">
      <!-- 查询部分 -->
      <el-form class="term" inline size="small" label-width="80px">
        <el-form-item label="登记门店">
          <el-select v-model="searchForm.storesNum">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in storeList"
              :key="item.storesNum"
              :label="item.storesName"
              :value="item.storesNum"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宾客籍贯">
          <el-select v-model="searchForm.nationality" class="width150">
            <el-option
              v-for="item in nationalityList"
              :key="item.id"
              :label="$i18n.locale == 'ri' ? item.jName : item.cName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签证种类">
          <el-select v-model="searchForm.visaType" class="width150">
            <el-option label="普通签证" :value="1"></el-option>
            <el-option label="外交签证" :value="2"></el-option>
            <el-option label="公务签证" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" class="width150"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="searchForm.idcardType" class="width150">
            <el-option label="身份证" :value="1"></el-option>
            <el-option label="护照" :value="2"></el-option>
            <el-option label="驾驶证" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="searchForm.idcard" class="width150"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit" @click="getDataList"
            >查询</el-button
          >
          <el-button type="primary" class="white" @click="initForm"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item style="float: right">
          <el-button
            type="primary"
            class="white"
            @click="addAndEditItemClick('add')"
            >登记外宾</el-button
          >
        </el-form-item>
      </el-form>
      <!--表格数据 -->
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        height="100%"
        header-row-class-name="default"
        size="small"
      >
        <el-table-column
          prop="name"
          label="姓名"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="sex" label="性别" width="100" align="center">
          <template slot-scope="{ row }">
            {{ row.sex | F_sex }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="nationality"
          label="宾客籍贯"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ F_nationality(row.nationality) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="idcardType"
          label="证件类型"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.idcardType | F_idcardType }}
          </template>
        </el-table-column>
        <el-table-column prop="idcard" label="证件号"></el-table-column>
        <el-table-column
          prop="visaType"
          label="签证种类"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.visaType | F_visaType }}
          </template>
        </el-table-column>
        <el-table-column prop="storesNum" label="登记门店">
          <template slot-scope="{ row }">
            {{ F_storeName(row.storesNum) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="登记时间"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column label="累计消费" width="120" align="center">
          <template slot-scope="{ row }">
            {{ row.cumulativePrice ? row.cumulativePrice : 0 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="现入住状态"
          width="120"
          align="center"
        >
          <template slot-scope="{ row }">
            <div v-if="row.checkInFlag">入住中</div>
            <div v-if="!row.checkInFlag">未入住</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="handleHistory(row)"
              >客史</el-button
            >
            <el-button type="text" size="mini" @click="handleDetail(row)"
              >详情</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="addAndEditItemClick('edit', row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px"></div>
      <!--分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-size="searchForm.page_num"
          :total="listTotal"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑or详情弹窗 -->
    <el-dialog
      top="0"
      :title="foreignForm.type == 'add' ? '登记外宾' : '编辑外宾'"
      :visible.sync="setForeignFormVisible"
      class="setForeignForm"
      width="1200px"
    >
      <el-form
        :model="foreignForm"
        label-width="80px"
        size="mini"
        :rules="rules"
        ref="setForeignForm"
      >
        <el-row class="row">
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item label="外宾姓名" class="" prop="name">
                <el-input
                  v-model="foreignForm.name"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="性别" class="" prop="sex">
                <el-radio-group v-model="foreignForm.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                  <el-radio :label="3">保密</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="证件类型" class="" prop="idcardType">
                <el-select v-model="foreignForm.idcardType" class="width150">
                  <el-option label="身份证" :value="1"></el-option>
                  <el-option label="护照" :value="2"></el-option>
                  <el-option label="驾驶证" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="证件编号" class="" prop="idcard">
                <el-input
                  v-model="foreignForm.idcard"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="6" class="col">
              <el-form-item label="签证种类" class="" prop="visaType">
                <el-select v-model="foreignForm.visaType" class="width150">
                  <el-option label="普通签证" :value="1"></el-option>
                  <el-option label="外交签证" :value="2"></el-option>
                  <el-option label="公务签证" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="有效时间" class="" prop="dueTime">
                <el-date-picker
                  v-model="foreignForm.dueTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  style="width: 150px"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="宾客国籍" class="" prop="nationality">
                <el-select v-model="foreignForm.nationality" class="width150">
                  <el-option
                    v-for="item in nationalityList"
                    :key="item.id"
                    :label="$i18n.locale == 'ri' ? item.jName : item.cName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="col">
              <el-form-item label="手机号码" class="" prop="phone">
                <el-input
                  v-model="foreignForm.phone"
                  class="width150"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="cell">
            <el-col :span="24" class="col">
              <el-form-item label="备注" class="" prop="remark">
                <el-input
                  type="textarea"
                  v-model="foreignForm.remark"
                  style="display: block; width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setForeignFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="addItem('setForeignForm')"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      msgKey: (state) => state.config.msgKey,
      plat_source: (state) => state.config.plat_source,
    }),
  },
  data() {
    return {
      loading: false,
      showEdit: false,
      showDetail: false,
      searchForm: {
        storesNum: "",
        nationality: "",
        visaType: "",
        name: "",
        idcardType: "",
        idcard: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      },
      storeList: "",
      listTotal: 0, //总条数
      multipleSelection: [], //多选
      tableData: [], //表格数据
      setForeignFormVisible: false,
      nationalityList: "",
      foreignForm: {
        name: "",
        sex: "",
        idcardType: "",
        idcard: "",
        visaType: "",
        dueTime: "",
        nationality: "",
        phone: "",
        remark: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入外宾姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        idcardType: [
          {
            required: true,
            message: "请选择证件类型",
            trigger: "change",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请填入证件编号",
            trigger: "blur",
          },
        ],
        visaType: [
          {
            required: true,
            message: "请选择签证种类",
            trigger: "change",
          },
        ],
        dueTime: [
          {
            required: true,
            message: "请选择到期时间",
            trigger: "change",
          },
        ],
        nationality: [
          {
            required: true,
            message: "请选择国籍",
            trigger: "change",
          },
        ],
      },
    };
  },
  filters: {},
  mounted() {
    this.stores_list();
    this.nationality();
    this.initForm();
  },
  methods: {
    initForm() {
      this.searchForm = {
        storesNum: "",
        nationality: "",
        visaType: "",
        name: "",
        idcardType: "",
        idcard: "",
        paging: true,
        pageIndex: 1, //当前页
        pageSize: 10, //页数
      };
      this.getDataList();
    },
    handleHistory(item) {
      console.log(item.idcard);
      this.$router.push({
        name: "customerhistory",
        query: {
          idcard: item.idcard,
        },
      });
    },
    /**获取表格数据 */
    getDataList() {
      this.loading = true;
      this.$F.doRequest(
        this,
        "/pms/foreignguest/list",
        this.searchForm,
        (res) => {
          this.loading = false;
          this.tableData = res.list;
          this.listTotal = res.page.count;
        }
      );
    },
    stores_list() {
      this.$F.doRequest(this, "/pms/freeuser/stores_list", {}, (data) => {
        this.storeList = data;
      });
    },
    nationality() {
      this.$F.commons.fetchNationality((res) => {
        this.nationalityList = res;
      });
    },
    // 点击修改或者新增按钮
    addAndEditItemClick(type, row) {
      this.foreignForm.type = type;
      if (type == "add") {
        for (let k in this.foreignForm) {
          this.foreignForm[k] = "";
        }
        this.setForeignFormVisible = true;
      } else {
        this.$F.doRequest(
          this,
          "/pms/foreignguest/findone",
          {
            id: row.id,
          },
          (res) => {
            for (let k in this.foreignForm) {
              this.foreignForm[k] = res[k];
            }
            this.foreignForm.id = res.id;
            this.setForeignFormVisible = true;
          }
        );
      }
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$F.doRequest(
            this,
            "/pms/foreignguest/edit",
            this.foreignForm,
            (res) => {
              this.getDataList();
              this.setForeignFormVisible = false;
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return "未知门店";
    },
    F_nationality(v) {
      let that = this;
      for (let k in that.nationalityList) {
        if (that.nationalityList[k].id == v) {
          return this.$i18n.locale == "ri"
            ? that.nationalityList[k].jName
            : that.nationalityList[k].cName;
        }
      }
      return "未知";
    },
    handleDetail(item) {
      this.$router.push({
        name: "foreignDetail",
        query: {
          id: item.id,
        },
      });
    },
    /**编辑 */
    editRowItem(row) {
      // 加载组件
      this.showEdit = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.editRef.initdata(row.id);
      });
    },

    handelRowItem(row) {
      // 加载组件
      this.showDetail = true;
      //   组件加载完成调用组件内initdata 方法
      this.$nextTick(() => {
        //   可能没有详情接口的直接传row显示
        this.refs.detailRef.initdata(row.id);
      });
    },

    /**多选 */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**每页数 */
    handleSizeChange(val) {
      this.searchForm.page_num = val;
      this.searchForm.page = 1;
      this.getDataList();
    },
    /**当前页 */
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getDataList();
    },
  },
};
</script>
