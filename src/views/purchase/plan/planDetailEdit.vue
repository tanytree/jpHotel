<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/purchasePlan' }">采购计划</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'planDetail' ,query:{id:planId}}">计划详情</el-breadcrumb-item>
          <el-breadcrumb-item>添加产品</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="content-size" v-for="(arr,i) in editForm" :key="i">
        <el-form ref="form" label-width="80px">
          <el-form-item>
            产品{{i+1}}
            <el-button type="text" @click="editForm.splice(i,1)">删除</el-button>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="arr.title" style="width:300px" placeholder="请填写"></el-input>
          </el-form-item>
          <el-form-item label="产品类别">
            <el-cascader v-model="arr.categoryid" :options="categoryList" style="width:300px"></el-cascader>
          </el-form-item>
          <el-form-item label="产品规格" class="ui-form-item">
            <div v-for="(item,j) in arr.spec" :key="j">
              <el-tag closable type="danger" @close="arr.spec.splice(l,1)">商品规格{{j+1}}</el-tag>
              <el-form ref="form" label-width="80px">
                <el-form-item label="名称" label-width="80px" class="ui-form-item">
                  <el-input v-model="item.title" placeholder="请填写" style="width:120px" size="small"></el-input>
                </el-form-item>
                <el-form-item label="规格值" label-width="80px" class="ui-form-item">
                  <el-tag
                    type="info"
                    v-for="(value,k) in item.list"
                    :key="k"
                    closable
                    @close="item.list.splice(k,1)"
                    style="margin-right:8px;width:120px"
                  >
                    <input
                      v-model="value.name"
                      @blur="updateTable(i)"
                      placeholder="请填写"
                      style="width: 80px;"
                    />
                  </el-tag>
                  <el-button
                    type="primary"
                    size="small"
                    plain
                    class="ui-button"
                    @click="item.list.push({name:''});updateTable(j)"
                  >
                    <i class="iconfont icon-jia1"></i>新增规格值
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-button
              type="primary"
              size="mini"
              plain
              @click="arr.spec.push({'title':'','list':[]})"
            >
              <i class="iconfont icon-jia1"></i>新增规格
            </el-button>
          </el-form-item>
          <el-table ref="multipleTable" :data="arr.option" size="mini" border>
            <el-table-column prop="name" label="规格"></el-table-column>
            <el-table-column label="采购数量">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.disabled" v-model="scope.row.number"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="ceneter" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.disabled"
                  type="text"
                  size="mini"
                  @click="scope.row.disabled=false"
                >启用</el-button>
                <el-button v-else type="text" size="mini" @click="scope.row.disabled=true">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <el-button type="primary" @click="addProduct">
        <i class="iconfont icon-jia1"></i>新增产品
      </el-button>

      <div style="margin-top:20px"></div>
      <el-button type="primary" @click="onSave">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import { get_category_list_all } from "@/utils/api/market";
export default {
  data() {
    return {
      planId: "",
      editForm: [],
      categoryList: []
    };
  },
  created() {
    get_category_list_all({ to_co_id: "pingtai" }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let data = res.data;
        let bbb = JSON.parse(
          JSON.stringify(data)
            .replace(/two/g, "children")
            .replace(/three/g, "children")
            .replace(/name/g, "label")
            .replace(/id/g, "value")
        );
        this.categoryList = bbb;
      }
    });
  },
  activated() {
    if (this.$route.query.planId) {
      this.planId = this.$route.query.planId;
    } else {
      //  console.log(JSON.parse(sessionStorage.planGoods))
      //  this.editForm=[JSON.parse(sessionStorage.planGoods)]
    }
  },
  methods: {
    //新增产品
    addProduct() {
      this.editForm.push({
        goods_id: "",
        title: "询盘商品2",
        categoryid: 24,
        spec: [{ id: "", title: "", list: [{ name: "" }] }],
        option: []
      });
    },

    /**生成规格表 */
    updateTable(index) {
      // console.log(this.form.spec);

      let option = [
        {
          title: "",
          name: "",
          number: "0",
          disabled: false
        }
      ]; //初始

      for (let j = 0; j < this.editForm.length; j++) {
        if (index == j) {
          var items = this.editForm[j].spec;
          console.log(items);
          for (var i = 0; i < items.length; i++) {
            //循环得到每一个item对象
            //{"attributeName":"网络","attributeValue":["移动4G","联通4G","电信4G"]}
            option = this.addColumn(option, items[i].title, items[i].list);
          }
          // console.log(option)
          // this.editForm[j].option = option;
          this.$set(this.editForm[j], "option", option);
        }
      }
    },
    addColumn(list, columnName, columnValues) {
      var newList = []; //新的集合
      for (var i = 0; i < list.length; i++) {
        //list中的每一个对象,每一条SKU
        var oldRow = list[i];
        //给当前SKU添加规格
        for (var j = 0; j < columnValues.length; j++) {
          var newRow = JSON.parse(JSON.stringify(oldRow)); //深克隆
          newRow.name =
            (newRow.name ? newRow.name + "-" : "") + columnValues[j].name;
          newList.push(newRow);
        }
      }

      return newList;
    },
    onSave() {
      this.$http({
        url: this.$http.adornUrl("/purchase/plan/edit_plan_goods"),
        data: this.$http.adornData({
          plan_id: this.planId,
          goods: JSON.stringify(this.editForm)
        }),
        method: "post"
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>