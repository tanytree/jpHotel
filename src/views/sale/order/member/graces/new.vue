<!--
 * @Date: 2020-05-07 20:49:20
 * @LastEditors:魏轩
 * @LastEditTime:
 * @FilePath: 
 -->
<template>
<div>

    <div class="el-card">
        <div class="el-card__header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/saleOrder' }">会员类型管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增会员类型</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-left:20px">
             <el-form :model="newvip" :inline="true" :rules="rules" class="top-body" size="small" label-width="100px">
          <el-row>
           <h3>基本信息</h3>
          </el-row>
          <el-row>
            <el-form-item label="会员类型:" prop="name">
              <el-input v-model="newvip.name" style="width:264px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="等级:" prop="name">
              <el-input v-model="newvip.name" style="width:264px"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="购买价格" >
              <el-input v-model="newvip.name" style="width:264px" placeholder="大于等于1的整数"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
             <el-form-item label="有效期" >
               <el-radio-group  v-model="newvip.resource">
                 <el-radio label="永久"></el-radio>
                 <!-- <el-form-item> -->
                 <el-radio label="开卡日期起"></el-radio>
                    <el-date-picker
                        v-model="newvip.startTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        ></el-date-picker>
                 <!-- </el-form-item> -->
               </el-radio-group>
             </el-form-item>

          </el-row>
          <el-row>
             <h3>配置权益</h3>
             <el-form-item >
                 <el-checkbox v-model="newvip.checked">入住免押金</el-checkbox>
             </el-form-item>
          </el-row>
          <el-divider></el-divider>
           <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button @click="cancel">取消</el-button>
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
         newvip:{
          checked:false,
          resource:"",
          name:"",
          startTime:''
         },
         rules: {
          name: [
            { required: true, trigger: 'blur' },
          ]
          },
        };
    },

    mounted() {},

    methods: {
      cancel(){
       this.$router.push('/saleOrder')
      }
    }
};
</script>

<style scoped>
.detailTab {
    border: 0
}

.detailTab>>>.el-tabs__header {
    margin: 0;
}
</style>
<style lang="less" scoped>
.bodyInfo {
    .customerInfo {
        background: #fff;

        .wrap {
            padding: 0 10px;

            .hd {
                overflow: hidden;
                padding: 10px 0;
                line-height: 2;

                h3 {
                    font-size: 16px;
                    padding: 0;
                    margin: 0;
                }
            }

            .bd {
                background: #F3F3F3;
                padding: 10px 0;
                margin-bottom: 10px;

                .row {
                    font-size: 14px;
                    padding: 5px 10px;

                    .cell {
                        padding: 5px 0
                    }
                }
            }
        }

        .customerCtrl {
            ul {
                li {
                    line-height: 2;
                    padding: 10px 0;
                    font-size: 12px;

                    span {
                        color: #126EFF;
                        cursor: pointer;

                        i {
                            font-size: 18px;
                            color: #DC3E3E
                        }
                    }

                    &:hover {
                        background: #E3EEFF
                    }
                }

            }
        }

    }

    .thisOrderInfo {
        background: #fff;
        padding: 30px 0;

        .wrap {
            padding: 0 20px;

            h3 {
                margin: 0;
                font-size: 15px;
                color: #333
            }

            .cell {
                font-size: 12px;
                color: #333
            }

        }
    }
}
</style>
