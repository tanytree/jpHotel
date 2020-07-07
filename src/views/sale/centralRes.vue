<!--
 * @Date: 
 * @LastEditors: 魏轩
 * @LastEditTime: 2020-07-06 
 * @FilePath: jiudian\src\views\sale\centralRes.vue
 -->


<template>
 <div>
    <el-row>
     <el-col :span="20">
       <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="8">
            <div class="grid-content">
                <el-form-item label="预抵时间：">
                    <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </div>
        </el-col>
         
        <el-col :span="8">
         <el-form-item label="入住天数:">
           <el-input-number v-model="num" @change="handleChange" :min="1"  ></el-input-number>
         </el-form-item>
         </el-col>
         <el-col :span="8">
            <div class="grid-content">
                <el-form-item label="预离时间：" prop="resource">
                    <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" style="width:140px" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </div>

         </el-col>
         <el-col :span="8">
         <el-form-item label="位置筛选:">
           <el-select v-model="form.region" placeholder="请选择">
             <el-option label="全部" value="3">全部</el-option>
             <el-option label="已认证" value="1">已认证</el-option>
             <el-option label="未认证" value="2">未认证</el-option>
           </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="8">
         <el-form-item label="所属酒店:">
           <el-select v-model="form.region" placeholder="请选择">
             <el-option label="全部" value="3">全部</el-option>
             <el-option label="已认证" value="1">已认证</el-option>
             <el-option label="未认证" value="2">未认证</el-option>
           </el-select>
         </el-form-item>
         </el-col>
         <el-form-item>
           <el-button type="primary" @click="onSubmit">立即创建</el-button>
         </el-form-item>
       </el-form>
       </el-col>
    </el-row>

    <!-- 酒店信息表格 -->
    <el-row>
      <h4>酒店信息:</h4>
      <el-row>
         <label>大仓集团第一酒店（地址：安徽省合肥市蜀山区）</label>
          <el-table
           :data="tableData"
           style="width: 100%">
           <el-table-column
             label="房型"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="标准间"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="大床房"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>

           <el-table-column
             label="总统套房"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="单间"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleEdit(scope.$index, scope.row)">普通预订</el-button>
             </template>
           </el-table-column>
         </el-table>
      </el-row>

       <el-row>
         <label>大仓集团第一酒店（地址：安徽省合肥市蜀山区）</label>
          <el-table
           :data="tableData"
           style="width: 100%">
           <el-table-column
             label="房型"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="标准间"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="大床房"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>

           <el-table-column
             label="总统套房"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column
             label="单间"
             width="180">
             <!-- <template slot-scope="scope">
               <i class="el-icon-time"></i>
               <span style="margin-left: 10px">{{ scope.row.date }}</span>
             </template> -->
             
           </el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleEdit(scope.$index, scope.row)">普通预订</el-button>
             </template>
           </el-table-column>
         </el-table>
      </el-row>
    </el-row>
 </div>
</template>
<script>
export default {
  data() {
   return {
     form: {
          region: '',
          startTime:"",//开始时间
          endTime:"",//结束时间
          type: []
        },
        num: 1,
        tableData:[]
   }
   
  },
  methods: {
     onSubmit() {
        console.log('submit!');
      },
    handleChange(value) {
      console.log(value);
    }
   }
}
</script>