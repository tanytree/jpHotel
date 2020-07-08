<template>
 <div>
   <div>
       <el-table
         :data="tableData"
         style="width: 100%;margin-bottom: 20px;"
         row-key="id"
         border
         default-expand-all
         :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
         <el-table-column
           prop="date"
           label="日期"
           sortable
           width="180">
         </el-table-column>
         <el-table-column
           prop="name"
           label="姓名"
           sortable
           width="180">
         </el-table-column>
         <el-table-column
           prop="address"
           label="地址">
         </el-table-column>
         <el-table-column label="操作" width="220">
                <template slot-scope="{row}">
                    <el-button type="text" v-if="!row.isChild" size="mini" @click="adddepart=true">添加部门</el-button>
                    <el-button type="text" v-if="row.isChild" size="mini" @click="editdepart=true">编辑</el-button>
                    <el-button type="text" v-if="row.isChild" size="mini">删除</el-button>
                   
                </template>
            </el-table-column>

       </el-table>
    </div>
    <div>
      <!-- 添加部门 -->
      <el-dialog title="添加部门" :visible.sync="adddepart" width='30%'>
        <el-form >
          <el-row > 
            大仓集团第二酒店:
          </el-row>
          <el-form-item label="部门名称" hide-required-asterisk>
            <el-input style="width:200px"  autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="adddepart = false">取 消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <!--编辑 -->
      <el-dialog title="编辑部门" :visible.sync="editdepart" width='30%'>
        <el-form >
          <el-row > 
            大仓集团第二酒店:
          </el-row>
          <el-form-item label="部门名称" hide-required-asterisk>
            <el-input style="width:200px"  autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editdepart = false">取 消</el-button>
          <el-button type="primary">确定</el-button>

        </div>
      </el-dialog>
    </div>
 </div>
</template>

<script>
export default {
   data() {
    return {
      adddepart:false,
      editdepart:false,
     tableData: [
      {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                isChild:true
              }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                isChild:true
            }]
          }
        ],
     
    }
   },
   methods: {
    
   },
}
</script>