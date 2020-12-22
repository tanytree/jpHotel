<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-22 16:38:41
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
          :model="newvip"
          :inline="true"
          :rules="rules"
          ref="newvip"
          class="top-body"
          size="small"
          label-width="100px"
        >
          <el-row>
            <h3>{{ $t("boss.add_basicInfo") }}</h3>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_memType') + ':'" prop="name">
              <el-input v-model="newvip.name" style="width: 264px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_levelA') + ':'">
              <el-input v-model="newvip.level" style="width: 264px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item :label="$t('boss.add_yearPrice') + ':'">
              <el-input
                v-model.number="newvip.prices"
                min="0"
                style="width: 264px"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- <el-row>
            <el-form-item label="有效期">

              <el-checkbox v-model="checked">永久</el-checkbox>
            </el-form-item>
          </el-row> -->
          <el-divider></el-divider>
          <el-form-item>
            <el-button type="primary" @click="editItem('newvip')">{{
              $t("commons.save")
            }}</el-button>
            <el-button @click="back()">{{ $t("commons.back") }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["selected"],
  data() {
    return {
      memberTypeList: [],
      durationType: "1", // 1永久  2固定日期
      newvip: {
        name: "",
        level: "",
        prices: "",
        interests: "",
        duration: "",
      },
    };
  },

  mounted() {
    this.$F.merge(this.newvip, this.selected);
    console.log(this.newvip);
    if (this.newvip.duration != 9999) {
      this.durationType = "2";
    }
    this.getMemberTypeList();
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t('boss.add_inputMemtypeName'),
          },
        ],
      };
    },
  },
  methods: {
    durationchange(val) {
      if (val == 2) {
        this.newvip.duration = "";
      } else {
        this.newvip.duration = "9999";
      }
    },
    interestsChange(value) {
      this.newvip.interests = value ? 1 : 0;
    },
    back() {
     this.$router.go(-1);
    },

    editItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // var array = this.memberTypeList.filter((row) => {
          //   return row.level == this.newvip.level && row.id != this.newvip.id;
          // });
            let params = this.$F.deepClone(this.newvip);
            if (!params.level) {
                params.level = 0;
            }
            this.$F.doRequest(
                this,
                "/pms/membertype/edit",
                params,
                (res) => {
                    this.$message.success("edit success");
                    setTimeout(() => {
                        this.back();
                    }, 500);
                }
            );
          // if (array.length == 0) {
          //   console.log(this.newvip);
          //
          // } else {
          //  // this.$message.error("Level can not repeat");
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getMemberTypeList() {
      this.$F.commons.fetchMemberTypeList({}, (res) => {
        this.memberTypeList = res.list;
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
</style>
