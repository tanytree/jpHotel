<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors: 董林
 * @LastEditTime: 2020-06-05 22:54:18
 * @FilePath: /cloudAdmin/Users/dforest/Documents/workspace/mine/cunAdmin/src/views/company/detail.vue
 -->
<template>
  <div>
    <el-card>
      <!-- 头部导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/company' }">企业管理</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bodyInfo">
        <h2>{{detailData.enterName}}</h2>
        <p>({{detailData.tradeLevelOne}}-{{detailData.tradeLevelTwo}}人    {{detailData.enterName}})</p>
        <div class="mianInfo">
            <div class="outerWrap">
                <el-card  size="small" style="margin-bottom:15px">
                    <div class="tit">
                        <h3>基本资料</h3>
                    </div>
                    <div class="lists">
                        <div class="row">
                            企业类型：{{detailData.enterType}}
                        </div>
                        <div class="row">
                            创建时间：{{detailData.createTime}}
                        </div>
                        <div class="row">
                            法人认证：{{detailData.enterStatus | F_enterStatus}}
                        </div>
                        <div class="row">
                            统一社会信用代码：{{detailData.enterCode}}
                        </div>
                        <div class="row">
                            企业地址：
                        </div>
                    </div>
                </el-card>
                <el-card  size="small" style="margin-bottom:15px">
                    <div class="tit">
                        <h3>法人信息</h3>
                    </div>
                    <div class="lists">
                        <div class="row">
                            姓名：{{detailData.nickname}}
                        </div>
                        <div class="row">
                            身份证：{{detailData.legalIdcardCode}}
                        </div>
                    </div>
                </el-card>
                <el-card  size="small" style="margin-bottom:15px">
                    <div class="tit">
                        <h3>资质信息</h3>
                    </div>
                    <div class="lists">
                        <div class="row">
                            信誉分：
                        </div>
                        <div class="row">
                            保证金：
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import {
    get_user_enterprise
} from "@/utils/api/company";

export default {
    computed: {
        ...mapState({
            token: state => state.user.token,
            userId: state => state.user.userId,
            msgKey: state => state.config.msgKey,
            plat_source: state => state.config.plat_source
        })
    },
    data() {
        return {
            detailData: ''
        };
    },

    mounted(){
        let id = this.$route.query.id
        this.get_user_enterprise(id)
    },

    methods: {
        get_user_enterprise(id) {
            // 加载组件
            let params = {
                token: this.token,
                userId: this.userId,
                plat_source: this.plat_source,
                enterCode: id
            }
            get_user_enterprise(params).then(res => {
                    if (res.code == 200) {
                        this.detailDialogFormVisible = true;
                        this.detailData = res.data
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch(err => {
                    this.$message.error(err.message);
                });

        },

       
    }
};
</script>


<style lang="less" scoped>
  .bodyInfo{
      .mianInfo{
          .outerWrap{
            
          }
      }
    .tit{border-left:6px solid rgb(32, 117, 255);
        h3{padding-left:20px;line-height: 1;}
    }
    .lists{
        .row{padding:10px 0}
    }
  }
</style>