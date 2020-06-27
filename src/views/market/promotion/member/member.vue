<!--
 * @Date: 2020-03-16 10:52:20
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-22 13:52:37
 * @FilePath: /cloudAdmin/src/views/market/promotion/member/member.vue
 -->
<template>
    <div class="bigBox">
      <div class="member">
        <div style="padding:10px">
          <el-button v-if="!editFlag" @click="editFlag=true">编辑</el-button>
          <el-button v-if="editFlag" @click="editFlag=false">取消</el-button>
          <el-button v-if="editFlag" type="primary" @click="saveEdit">保存</el-button>
        </div>

        <div class="top-info">会员卡信息</div>
        <el-form label-width="80px" size="small">
          <el-form-item label="开卡条件" class="second">
            <el-radio-group v-model="condite" :disabled="!editFlag">
              <el-radio :label="1">后台审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开卡方式" class="second">
            <el-radio-group v-model="editForm.openCardWay" :disabled="!editFlag">
              <el-radio :label="2">用户申请</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="成长方式" class="second">
            <el-radio-group v-model="editForm.memberLevelType" :disabled="!editFlag">
              <el-radio :label="2">按总获取积分数量</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="top-info">会员等级</div>
      <el-table
        class="top-grade"
        size="mini"
        :data="levels"
        tooltip-effect="dark"
        :header-cell-style="{background:'#F7F7F7',color:'#1E1E1E'}"
      >
        <el-table-column label="等级名称" show-overflow-tooltip width="170px">
          <template slot-scope="{row}">
            <el-input
              size="small"
              :disabled="!editFlag"
              style="width:150px"
              v-model="row.level"
              placeholder="请填写等级名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成长范围(即在本店铺累计消费)" width="320px">
          <template slot-scope="{row}">
            <el-input v-model="row.start" size="small" style="width:120px" :disabled="!editFlag">
              <!--              <template slot="append">元</template>-->
            </el-input>
            <span style="margin:0 5px">-</span>
            <el-input size="small" :disabled="!editFlag" style="width:120px" v-model="row.end">
              <!--              <template slot="append">元</template>-->
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="会员折扣" placeholder="0-1之间的数值" width="320px">
          <template slot-scope="{row}">
            <el-radio-group v-model="row.discountFlag" :disabled="!editFlag">
              <el-radio :label="1">有</el-radio>
              <el-radio :label="2">无</el-radio>
              <template>
                <el-input
                  v-model="row.discount"
                  v-if="row.discountFlag == 1"
                  placeholder="0-1之间的数值"
                  size="small"
                  style="width:140px"
                  :disabled="!editFlag"
                ></el-input>
              </template>
            </el-radio-group>
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
      levels: [],
      condite: 1,
      editFlag: false,
      editForm: {
        condite: 1,
        openCardWay: 2,
        memberLevelType: 2,
        type: "1"
      }
    };
  },

  activated() {
    this.editFlag = false;
    this.$F.doRequest(
      this,
      "/edt/adminsystem/edt_user_member_select",
      {},
      data => {
        this.editForm = data;
        this.levels = JSON.parse(data.levelSet) || [];
      }
    );
  },
  methods: {
    saveEdit() {
      const params = {};
      this.$F.merge(params, this.editForm);
      params.levelSet = JSON.stringify(this.levels);
      this.$F.doRequest(
        this,
        "/edt/adminsystem/edt_user_member_save",
        params,
        data => {
          this.$message.success("保存会员信息成功");
          this.editFlag = false;
        }
      );
    },
    removeList(data, index) {
      if (!data.id) {
        this.levels.splice(index, 1);
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
      const array = this.levels.filter(item => {
        return !item.level;
      });
      if (array.length > 0) {
        this.$message.info("请先将等级信息填写完整");
        return;
      }
      this.levels.push({
        discountFlag: 2,
        level: "",
        start: "",
        end: "",
        discount: "",
        isOpen: 0
      });
    }
  }
};
</script>
<style>
.top-info {
  font-size: 16px;
  color: #000;
  padding-bottom: 10px;
  font-weight: 600;
}
.second .el-form-item__label {
  font-weight: 550;
  color: rgba(51, 51, 51, 1);
}
.member {
  margin-bottom: 10px;
}
.member .el-form-item {
  margin-bottom: 0px;
}
.top-grade {
  width: 85%;
}
/*.bigBox{*/
/*  width: 100%;*/
/* height: 500px;*/
/*  overflow: auto;*/
/*}*/

.bigBox {
  height: 100%;
  overflow: auto;
}

</style>
