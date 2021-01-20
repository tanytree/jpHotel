<!--
 * @Date: 2020-05-21 11:38:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:05:03
 * @FilePath: \jiudian\src\views\organization\components\employees.vue
-->
<template>
  <div class="DepartmentCollapse">
    <div class="hideMod">
      <ul>
        <li v-for="(item,index) of employee" :key="index">
          <div class="liWrap">
            <div class="flex">
              <div class="liCell">
                <div class="text-left">
                  <img src="@/assets/images/people.png" />
                  {{item.userName}}
                </div>
              </div>
              <div class="liCell">
                <div class="text-left">{{item.account}}</div>
              </div>
              <div class="liCell">
                <!--                <div class="text-left">{{item.userType==1 ? "员工" : ''}}</div>-->
                <div v-for="role in $t('commons.userRoleList')" :key="role.value" :label="role.value" v-if="role.value == item.userType">{{role.label}}
                </div>
              </div>
              <div class="liCell">
                <div class="text-right">
                  <el-dropdown>
                    <span class="el-dropdownBox">
                      <span class="enterName">{{$t('commons.operating')}}</span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="getDeaprtmentEdit(item)">
                        {{$t('boss.add_editorDepart')}}
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="getDetailEdit(item)">
                        {{$t('boss.add_editorEmploy')}}
                      </el-dropdown-item>
                      <!-- <el-dropdown-item @click.native="getDetails(item)">
                                                查看资料
                                            </el-dropdown-item> -->
                      <el-dropdown-item @click.native="deleteItem(item)" style="color: red">
                        {{$t('boss.add_deleteEmploy')}}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["employee"],
  data() {
    return {
      hidemod: true,
      showIndent: false,
    };
  },
  computed: {
    ...mapState({
      companyInfo: (state) => state.company,
    }),
  },
  methods: {
    getDetail(item) {
      this.$emit("getEmployeesDetails", item);
    },
    getDetailEdit(data) {
      let item = data;
      item.editType = 1;
      this.$emit("getEmployeesDetailsEdit", item);
    },
    getDeaprtmentEdit(data) {
      let item = data;
      item.editType = 2;
      this.$emit("getEmployeesDetailsEdit", item);
    },
    getDetails(data) {
      this.$emit("getDetails", data);
    },
    deleteItem(item) {
      this.$confirm(
        this.$t("commons.confirm_delete"),
        this.$t("commons.tip_desc"),
        {
          confirmButtonText: this.$t("commons.confirm"),
          cancelButtonText: this.$t("commons.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$emit("getEmployeesDelete", item);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less">
.DepartmentCollapse {
  border-bottom: 1px solid #eee;

  .wrap {
    padding: 0 15px;
  }

  .chd {
    height: 60px;
    line-height: 60px;

    .name {
      font-size: 16px;

      i {
        font-size: 20px;
      }
    }
  }
  .hideMod {
    ul {
      li {
        padding: 0 0px 0 30px;

        & :hover {
          background: #eee;
        }

        .liWrap {
          border-bottom: 1px solid #eee;
          padding: 0 20px 0 45px;
        }

        & :last-child .liWrap {
          border: 0;
        }
      }
    }
    .liCell > div {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;

      img {
        width: 30px;
        height: 30px;
        overflow: hidden;
        border-radius: 100%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
</style>
