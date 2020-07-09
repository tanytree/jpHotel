<!--
 * @Date: 2020-05-21 11:38:08
 * @LastEditors: 董林
 * @LastEditTime: 2020-05-27 11:31:56
 * @FilePath: /cloudAdmin/src/views/organization/components/collapse.vue
--> 
<template>
  <div class="DepartmentCollapse">
   
      <div class="chd">
         <div class="wrap">
        <div class="btns fr">
          <i class="el-icon-s-tools"></i>
          <i class="el-icon-delete"></i>
        </div>
        <div class="name">
          <i class="el-icon-caret-right"></i> 人事部门
        </div>
        </div>
      </div>
      
    
    <div class="hideMod" v-if="hidemod">
        <div class="">
            <ul>
                <li>
                    <div class="liWrap">
                        <div class="flex">
                            <div class="liCell">
                                
                                <div class="text-left"><img src="@/assets/images/mainIcon1.png" />张萌萌</div>
                            </div>
                            <div class="liCell">
                                <div class="text-left">张萌萌</div>
                            </div>
                            <div class="liCell">
                                <div class="text-left">张萌萌</div>
                            </div>
                            <div class="liCell">
                              <div class="text-right">
                              <el-button type="text">操作<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                              </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props:['employeesList'],
  data() {
    return {
      hidemod: true,
      showIndent: false
    };
  },
  computed: {
    ...mapState({
      companyInfo: state => state.company
    })
  },
  methods: {
    showChange() {
      this.showIndent = true;
      this.$nextTick(() => {
        this.$refs.indentEle.initData(this.companyInfo);
      });
    },
    editCompany() {
      this.showEdit = true;
      this.$nextTick(() => {
        this.$refs.editRef.initData();
      });
    }
  }
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
  .hideMod{
    ul{
      
    li{padding: 0 0px 0 30px;
      &:hover{background: #eee;}
      .liWrap{border-top: 1px solid #eee;padding: 0 20px 0 45px;}
    }
    }
    .liCell>div{display: block;width:100%;height: 50px;line-height: 50px;
      img{width: 30px;height:30px;overflow: hidden;border-radius: 100%;vertical-align: middle;margin-right: 10px;}
    }
  }
}
</style>