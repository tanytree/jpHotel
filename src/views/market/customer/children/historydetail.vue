<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 11:17:01
 * @FilePath: \jiudian\src\views\market\customer\children\historydetail.vue
 -->
<template>
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goBack" style="cursor: pointer"
            >客史档案</el-breadcrumb-item
          >
          <el-breadcrumb-item>张三</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form inline size="small" label-width="120px">
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="姓名:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" class="col">
                      <el-form-item label="电话:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" class="col">
                      <el-form-item label="证件类型:">
                        <el-select
                          style="width: 100px; margin-right: 4px"
                          v-model="editorForm.value"
                          placeholder="请选择"
                          size="small"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        <el-input
                          v-model="editorForm.name"
                          style="width: 200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="性别:">
                        <el-radio-group v-model="editorForm.radio">
                          <el-radio :label="1">男</el-radio>
                          <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7" class="col">
                      <el-form-item label="生日:">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="editorForm.date1"
                          style="width: 200px"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" class="col">
                      <el-form-item label="邮箱:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="国籍:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item label="地址:">
                        <el-input
                          v-model="editorForm.name"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="车牌号:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item label="爱好:">
                        <el-input
                          v-model="editorForm.name"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="7" class="col">
                      <el-form-item label="所属单位:">
                        <el-select
                          style="width: 200px"
                          v-model="editorForm.value"
                          placeholder="请选择"
                          size="small"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="17" class="col">
                      <el-form-item label="备注:">
                        <el-input
                          v-model="editorForm.name"
                          style="width: 530px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
                <el-divider></el-divider>
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item label="销售员:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" class="col">
                      <el-form-item label="发展途径:">
                        <el-input v-model="editorForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
              </el-form>
            </div>
            <div style="text-align: right">
              <el-button type="primary">保存</el-button>
              <el-button>返回</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import {
//     get_user_enterprise
// } from "@/utils/api/company";

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
      editorForm: {
        radio: 1,
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },

  mounted() {
    this.itemInfo = this.$route.query.item;
    console.log(this.itemInfo);
  },

  methods: {
    goBack() {
      this.$router.history.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.fixedFoot {
  text-align: right;
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 20px;
  background: #fff;
  border-top: 1px solid #eee;
  z-index: 9;
}

.fixedFoot .wrap {
  padding: 10px 20px;
}

.fixedFoot .wrap button {
  margin-left: 20px;
}

.bodyInfo {
  .mianInfo {
  }
}

.thisOrderInfo {
  background: #fff;
  padding-bottom: 30px;

  .wrap {
    padding: 0 20px;

    h3 {
      margin: 0;
      font-size: 15px;
      color: #333;
    }

    .cell {
      padding: 5px 0;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
