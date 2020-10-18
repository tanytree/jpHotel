/* * @Author: Dana  * @fileName: 投放广告  *@Date: 2020-03-11 14:11:43  * @Last Modified by:   Dana  * @Last Modified time: 2020-03-11 14:11:43  */
  <template>
  <div class="yun-edit">
    <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
      <el-form-item label="村名称">
        <el-input v-model="form.keywords">
          <el-button slot="append" size="small" type="primary" @click="getDataList">查询</el-button>
        </el-input>
      </el-form-item>

      <!-- <el-button size="small" style="float:right" type="primary" @click="toAdd">投放广告</el-button> -->
    </el-form>
    <div class="components-edit">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;padding: 8px 0 ! important;"

        size="mini"
        v-loading="dataListLoading"
      >
        <el-table-column prop="group_name" label="村名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="group_popularity_count" sortable label="人气指数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ranking" label="村排名" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="position_num" label="广告位剩余" show-overflow-tooltip></el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="getDetail(scope.row)">加入投放车</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.page_num"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <el-dialog top="0" title="投放详情" :close-on-click-modal="false" width="700px" :visible.sync="visible">
      <el-form size="small" label-width="110px" :model="detail" class="demo-form-inline">
        <el-form-item label="广告连接">
          <el-input v-model="detail.link_url"></el-input>
        </el-form-item>
        <el-form-item label="广告图">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :data="uploadData"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="detail.image_url" :src="detail.image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="广告位">
          <el-radio-group v-model="detail.position" size="small">
            <el-radio label="1" border :disabled="positionList.one==1">村详情广告位</el-radio>
            <el-radio label="2" border :disabled="positionList.two==1">村长选举广告位</el-radio>
            <el-radio label="3" border :disabled="positionList.three==1">村商业区广告位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="付费方式">
          <el-radio-group v-model="detail.price_type">
            <el-radio :label="1">时长</el-radio>
            <el-radio :label="2">次数</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="detail.price_type==1" label="投放时间">
          <el-date-picker
            v-model="detail.start_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <el-date-picker
            v-model="detail.end_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="detail.price_type==2" label="展现天数">
          <el-input v-model="detail.number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit('ruleForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
</template>

<script>
import {
  get_group_list,
  get_group_position,
  add_advert
} from "@/utils/api/market";
import httpRequest from "@/utils/httpRequest";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      action: httpRequest.adornUrl("/market/upload/upload"),
      uploadData: { type: "2" },
      form: {
        page: 1,
        page_num: 10,
        keywords: "",
        status: "", //1 投放车 2 已投放 3 继续投放
        type: "", //1 进行中 2 已结束
        price_type: "" //1 时长 2 次数
      },
      positionList: {},
      detail: {
        group_id: ""
      },
      input3: "",
      editId: "",
      tableData: [],
      categoryid: "",
      visible: false,
      editPrice: "",
      start_time: "",
      end_time: "",
      pageIndex: 1,
      page_num: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.dataListLoading = true;
      get_group_list(this.form)
        .then(data => {
          this.dataListLoading = false;
          if (data.code == 200) {
            this.tableData = data.data.list;
            this.totalPage = data.data.total;
          } else {
            this.tableData = [];
            this.totalPage = 0;
          }
        })
        .catch(() => {
          this.dataListLoading = false;
          this.$message.error("服务器错误，请联系管理员");
        });
    },
    getDetail(item) {
      get_group_position({ group_id: item.group_id }).then(res => {
        if (res.code == 200) {
          this.detail = {
            group_id: item.group_id,
            link_url: "",
            position: "",
            price_type: "",
            number: "",
            status: "1",
            image_url: "",
            start_time: "",
            end_time: ""
          };
          this.positionList = res.data;
          this.visible = true;
        }
      });
    },
    handleSuccess(res, file) {
      this.detail.image_url = res.data.file_url;
    },

    dataFormSubmit() {
      add_advert(this.detail).then(res => {
        if (res.code == 200) {
          this.visible = false;
          this.getDataList();
        }
      });
    },
    editPriceF(row) {
      this.editId = row.id;
      this.editPrice = row.use_price;
      this.visible = true;
    },
    toAdd() {
      this.$router.push("/@/page/nav6/tab3");
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    // 每页数
    handleSizeChange(val) {
      this.form.page_num = val;
      this.form.page = 1;
      this.getDataList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.form.page = val;
      this.getDataList();
    },
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
          id ? this.$t('commons.delete_single') : this.$t('commons.delete_batch'),
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/sys/role/delete"),
            method: "post",
            data: this.$http.adornData(ids, false)
          }).then(data => {
            if (data && data.code ==200) {
              this.$message({
                message: this.$t('commons.request_success'),
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.getDataList();
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}
</style>
