<!--
 * @Date: 2020-03-16 10:52:20
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 13:52:37
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/customer.vue
 -->
<template>
  <div>
    <el-card>
      <div class="customer">
        <div style="padding:10px">
          <el-button v-if="!editFlag" @click="editFlag=true">编辑</el-button>
          <el-button v-if="editFlag" @click="editFlag=false">取消</el-button>
          <el-button v-if="editFlag" type="primary" @click="saveEdit">保存</el-button>
        </div>
        <div class="top-info">会员卡信息</div>
        <el-form label-width="80px" size="small">
          <el-form-item label="开卡条件" class="second">
            <el-radio-group v-model="editForm.is_get" :disabled="!editFlag">
              <el-radio :label="1">购买一次商品领取</el-radio>
              <el-radio :label="2">
                累计消费满
                <el-input v-model="editForm.get_price" :disabled="!editFlag">
                  <template slot="append">元</template>
                </el-input>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开卡方式" class="second">
            <el-radio-group v-model="editForm.get_type" :disabled="!editFlag">
              <el-radio :label="1">自动发卡</el-radio>
              <el-radio :label="2">用户领卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开卡方式" class="second">
            <el-radio-group v-model="editForm.get_type" :disabled="!editFlag">
              <el-radio :label="1">自动发卡</el-radio>
              <el-radio :label="2">用户领卡</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="top-info">会员等级</div>
      <el-table
        class="top-grade"
        size="mini"
        :data="tableData"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column label="等级名称" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-input size="small" :disabled="!editFlag" style="width:130px" v-model="row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成长范围(即在本店铺累计消费)" width="320px">
          <template slot-scope="{row}">

            <el-input v-model="row.min_price"
                      size="small"
                      style="width:120px"
                      :disabled="!editFlag">
              <template slot="append">元</template>
            </el-input>
            <span style="margin:0 5px">-</span>
            <el-input
              size="small"
              :disabled="!editFlag"
              style="width:120px"
              v-model="row.max_price"
            ><template slot="append">元</template></el-input>
          </template>
        </el-table-column>
        <el-table-column label="会员折扣" placeholder="0-1之间的数值" show-overflow-tooltip>
          <template slot-scope="{row}">
            <el-input size="small" :disabled="!editFlag" style="width:100px" v-model="row.discount"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="!editFlag"
              @click="removeList(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:12px" :disabled="!editFlag" @click="addLevel" size="small">添加等级</el-button>
      <div style="font-size:16px;color:#000;margin:20px 0">会员权益</div>
      <el-row>
        <el-col :span="8">
          <el-card>
            <div
              style="display:flex;align-items:center"
              @click="$router.push({path:'/userIntegral'})"
            >
              <el-image
                style="width:32px;height:32px;margin-right:20px"
                :src="require('@/assets/images/market/promotion/jifen.png')"
              ></el-image>
              <div>
                <h5 style="margin:5px 0">积分管理</h5>
                <p>增加会员复购率</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {
  get_users_level_List,
  edit_level_info,
  del_users_level
} from "@/utils/api/market";
export default {
  data() {
    return {
      tableData: [],
      editFlag: false,
      editForm: {
        is_get: "",
        get_type: "",
        get_price: "",
        type: "1"
      }
    };
  },

  created() {
    // this.getTableList();
    // this.$http({
    //   url: this.$http.adornUrl("/market/score/add_module_all"),
    //   method: "post"
    // });
  },
  methods: {
    getTableList() {
      get_users_level_List({ type: 1 }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data;
          if (this.tableData[0]) {
            this.editForm.is_get = res.data[0].is_get;
            this.editForm.get_type = res.data[0].get_type;
            this.editForm.get_price =
              res.data[0].is_get == "1" ? 0 : res.data[0].get_price;
          }
        } else {
        }
      });
    },
    saveEdit() {
      let param = this.tableData.map(item => {
        return {
          name: item.name,
          min_price: item.min_price,
          max_price: item.max_price,
          discount: item.discount
        };
      });
      edit_level_info({
        is_get: this.editForm.is_get,
        get_type: this.editForm.get_type,
        get_price: this.editForm.get_price,
        type: "1",
        param: JSON.stringify(param)
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1500,
            onClose: () => {
              this.editFlag = false;
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    removeList(data, index) {
      if (!data.id) {
        this.tableData.splice(index, 1);
        return false;
      }
      del_users_level({ id: data.id }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1500,
            onClose: () => {
              this.editFlag = false;
              this.getTableList();
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    addLevel() {
      this.tableData.push({
        name: "",
        discount: "",
        min_price: "",
        max_price: ""
      });
    }
  }
};
</script>
<style>
.top-info {
  font-size:16px;
  color:#000;
  padding-bottom:10px;
  font-weight: 600;
}
.second .el-form-item__label {
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
}
.customer {
  margin-bottom: 10px;
}
.customer .el-form-item {
  margin-bottom: 0px;
}
.top-grade {
  width: 60%;
}
</style>
