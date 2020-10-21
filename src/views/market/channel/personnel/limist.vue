<!--
 * @Date:
 * @LastEditors: 魏轩
 * @LastEditTime: 2020-07-06
 * @FilePath: jiudian\src\views\sale\EmployeeRights.vue
 -->

<template>
 <div>
             <el-row>
              <div v-if="display">
                <h4>前台部</h4>
                <el-divider></el-divider>
                <span>
                  <el-avatar style="vertical-align: middle;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  <label style="margin:0 10px">张鑫</label><span class="duty">部门负责人</span>
                  </span>
                <el-dropdown @command="handleCommand" style="float:right">
                <span class="el-dropdown-link">
                  {{$t('commons.operating')}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="checkData">查看资料</el-dropdown-item>
                  <el-dropdown-item command="jurisdiction">权限设置</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
                <el-divider></el-divider>
              </div>
            </el-row>

            <el-row v-if="!display">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item ><span @click="management()" style="cursor: pointer;">员工权限</span></el-breadcrumb-item>
                  <el-breadcrumb-item>权限设置</el-breadcrumb-item>
                </el-breadcrumb>
                <el-divider></el-divider>
                <div>
                    <span style="font-size:18px">具体权限设置(人事部)</span><span style="margin-left:20px">开启后就有该项权限</span>

                    <!-- 首页 -->
                    <el-row style="margin-top:30px">
                        <span>{{$t('commons.home')}}</span>
                        <el-checkbox style="margin-left:30px">{{$t('boss.report_openAll')}}</el-checkbox>
                        <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
                        <div style="margin-top:10px;">
                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>人员查询</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>

                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>工资查询</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>

                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>部门管理</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>

                        </div>
                    </el-row>

                    <!-- 人员管理 -->
                    <el-row style="margin-top:30px">
                        <span>人员管理</span>
                        <el-checkbox style="margin-left:30px">{{$t('boss.report_openAll')}}</el-checkbox>
                        <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
                        <div style="margin-top:10px;">
                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>人员管理</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>
                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>已离职员工</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>
                        </div>
                    </el-row>

                    <!-- 酬薪管理 -->
                    <el-row style="margin-top:30px">
                        <span>酬薪管理</span>
                        <el-checkbox style="margin-left:30px">{{$t('boss.report_openAll')}}</el-checkbox>
                        <!--  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" -->
                        <div style="margin-top:10px;">
                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span>酬薪管理</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>
                          <el-col :span="5" style="border:1px solid #ccc;padding:20px 10px;margin-right:20px">
                            <i class="el-icon-more"></i>
                            <span> 酬薪设置</span>
                            <el-switch
                            style="margin-left:170px"
                              v-model="Oswitch"
                              >
                            </el-switch>
                          </el-col>
                        </div>
                    </el-row>
                </div>
               <el-row class="fixedFoot">
                  <div class="wrap">
                    <el-button type="primary">{{ $t('commons.save') }}</el-button>
                    <el-button>返回</el-button>
                  </div>
                </el-row>
            </el-row>
 </div>
</template>

<script>
export default {
   data() {
    return {
     display:true,
     Oswitch:false,
    }
   },
   methods:{
    handleCommand(command) {
        // this.$message('click on item ' + command);
        if(command=='jurisdiction'){
          // alert(11111)
          this.display=!this.display;

        }
      },
      management(){
       this.display=!this.display;;
      }
   }
}
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
 .duty{
  border:1px solid #1B80FF;
  font-size: 12px;
  padding: 3px 10px;

}
</style>
