<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 13:26:45
 * @FilePath: \jiudian\src\views\sale\order\member\graces\new.vue
 -->
<template>
  <div>
    <div class="el-card">
      <div class="el-card__header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <template>
              <span @click="back()" style="cursor: pointer">{{
                $t("boss.add_memtypeManage")
              }}</span>
            </template>
          </el-breadcrumb-item>
          <el-breadcrumb-item
            class="last-breadcrumb"
            style="font-weight: 800 !important"
            >{{ $t("boss.add_addMemType") }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="margin-left: 20px">
        <el-form
          :model="newMemberType"
          :inline="true"
          :rules="rules"
          ref="newMemberType"
          class="top-body"
          size="small"
          label-width="100px"
        >
          <el-row>
            <h3>{{ $t("boss.add_basicInfo") }}</h3>
          </el-row>
          <el-row>
             <div class="nextLevel" v-if="$route.query.type">
              上级：<span
                >{{ itemNode.parent.parent.data.name }} > {{ itemNode.parent.data.name }}</span
              >
            </div>
            <div class="nextLevel" v-else>
              上级：<span
                >{{ itemNode.parent.data.name }} > {{ itemData.name }}</span
              >
            </div>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_memType') + ':'" prop="name">
              <el-input
                v-model="newMemberType.name"
                style="width: 264px"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_levelA') + ':'">
              <el-input
                v-model="newMemberType.level"
                style="width: 264px"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_yearPrice') + ':'">
              <el-input
                v-model.number="newMemberType.prices"
                min="0"
                style="width: 264px"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-divider></el-divider>
          <el-form-item>
            <el-button
              type="primary"
              @click="saveMemberType('newMemberType')"
              >{{ $t("commons.save") }}</el-button
            >
            <el-button @click="back()">{{ $t("commons.back") }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemNode: null, //用来接收传递过来的node信息
      itemData: null, //用来接收传递过来的data信息
      newMemberType: {
        name: "",
        level: "",
        prices: "",
        ////////
        id: "",
        parentId: "",
        hierarchy: 3,
      },
     
      nameSecond:'',
    };
  },

  created() {
    this.itemNode = this.$route.query.node;
    this.itemData = this.$route.query.data;
    console.log(this.$route.query.type);
    if (this.$route.query.type) {
      this.newMemberType.name = this.itemData.name;
      this.newMemberType.level = this.itemData.level;
      this.newMemberType.prices = this.itemData.prices;
    }
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("boss.add_inputMemtypeName"),
          },
        ],
      };
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    saveMemberType(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.type) {
            this.newMemberType.hierarchy = 3;
            this.newMemberType.parentId = this.itemNode.parent.data.id;
            this.newMemberType.id = this.itemData.id;
            this.$F.doRequest(
              this,
              "/pms/membertype/edit",
              this.newMemberType,
              (res) => {
                this.$message.success("修改成功");
                setTimeout(() => {
                  this.back();
                }, 500);
              }
            );
          } else {
            this.newMemberType.id = '';
            this.newMemberType.hierarchy = 3;
            this.newMemberType.parentId = this.itemData.id;
            this.$F.doRequest(
              this,
              "/pms/membertype/edit",
              this.newMemberType,
              (res) => {
                this.$message.success("新增成功");
                setTimeout(() => {
                  this.back();
                }, 500);
              }
            );
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.detailTab {
  border: 0;
}

.detailTab >>> .el-tabs__header {
  margin: 0;
}
</style>
<style lang="less" scoped>
.last-breadcrumb .el-breadcrumb__inner {
  font-weight: 800 !important;
}
.nextLevel {
  margin-left: 50px;
  margin-bottom: 20px;
  color: rgba(30, 30, 30, 100);
  font-size: 15px;
  span {
    color: rgba(136, 136, 136, 100);
  }
}
</style>
