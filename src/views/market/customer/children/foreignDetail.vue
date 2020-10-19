<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-19 17:36:42
 * @FilePath: \jiudian\src\views\market\customer\children\foreignDetail.vue
 -->
<template>
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click.native="goBack" style="cursor: pointer">{{
            $t("desk.customer_guestsDetail")
          }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ titleNmae }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <div class="mianInfo">
          <div class="thisOrderInfo">
            <div class="wrap">
              <el-form
                inline
                size="small"
                label-width="120px"
                :model="detailForm"
              >
                <el-row class="row">
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.home_name') + ':'">
                        {{ detailForm.name }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_sex') + ':'">
                        {{ detailForm.sex | F_sex }}
                      </el-form-item>
                    </el-col>

                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_documentType') + ':'"
                      >
                        {{ detailForm.idcardType | F_idcardType }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_idNo') + ':'">
                        {{ detailForm.idcard }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.customer_visaType') + ':'">
                        {{ detailForm.visaType | F_visaType }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_validTime') + ':'"
                      >
                        {{ detailForm.dueTime }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col">
                      <el-form-item
                        :label="$t('desk.customer_international') + ':'"
                      >
                        {{ F_nationality(detailForm.nationality) }}
                      </el-form-item>
                    </el-col>

                    <el-col :span="6" class="col">
                      <el-form-item :label="$t('desk.home_phoneNum') + ':'">
                        {{ detailForm.phone }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class="cell">
                    <el-col :span="8" class="col">
                      <el-form-item :label="$t('desk.home_note') + ':'">
                        {{ detailForm.remark }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-card>
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
      titleNmae: "",
      storeList: "",
      nationalityList: "",
      formLabelWidth: "120px",
      cardForm: {
        titleName: "",
        type: "",
        name: "",
      },
      detailForm: {
        name: "",
      },
    };
  },
  filters: {},
  mounted() {
    let id = this.$route.query.id;
    this.$F.doRequest(
      this,
      "/pms/foreignguest/findone",
      {
        id: id,
      },
      (res) => {
        this.detailForm = res;
        this.titleNmae = res.name;
      }
    );
    this.stores_list();
    this.nationality();
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    F_storeName(v) {
      let that = this;
      for (let k in that.storeList) {
        if (that.storeList[k].storesNum == v) {
          return that.storeList[k].storesName;
        }
      }
      return this.$t("desk.customer_unknowStore");
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
      return this.$t("desk.home_unknown");
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
