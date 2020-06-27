<template>
  <div>
    <el-dialog :visible.sync="urlShowDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="small" v-if="active==0">
      <el-form-item label="商品主图" prop="icon">
        <template slot-scope="scope">
          <el-upload
            :action="action"
            :data="uploadData" :limit="6"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="((file, fileList) => handleRemove(file, fileList))"
            :file-list="showIcons"
            accept=".png, .jpg, .gif"
            :on-success="(res, file, fileList) => mainPicSuccess(res, file, fileList)">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">尺寸建议750*422，大小2M以下，最多6张</div>
          </el-upload>
        </template>
      </el-form-item>
      <el-form-item label="商品规格" prop="spec">
        <div class="el-specItem" style="height:auto">
          <div v-for="(item, index) in form.spec" :key="index" class="specItem">
            <div>
              <i @click="form.spec.splice(index,1)" class="el-icon-error"></i>
              商品属性{{index+1}}
            </div>
            <div>
              <div class="specVal">
                <span class="valTit">名称</span>
                <el-input v-model="item.title" size="mini" style="width:100px"></el-input>
              </div>
              <div class="specVal">
                <span class="valTit">规格值</span>
                <div class="inputBox" v-for="(items,indexs) in item.list" :key="indexs">
                  <el-input v-model="items.name" @blur="updateTable(items.name)" style="width:100px"></el-input>
                  <i @click="form.spec[index].list.splice(indexs,1)" class="el-icon-error"></i>
                </div>
                <div>
                  <el-button type="primary" plain @click="addModel(index)">新增规格</el-button>
                </div>
              </div>
            </div>
          </div>
          <el-button class="addBtn" type="primary" plain @click="addSpecs">新增属性</el-button>
<!--           <el-button size="mini" @click="updateTable()">更新规格表</el-button>-->
          <el-button class="addBtn" type="primary" plain @click="updateTable">更新规格表</el-button>
          <el-table ref="multipleTable" :data="form.showJson" size="mini" border>
            <el-table-column prop="name" label="属性"></el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <el-input :disabled="scope.row.shelvesStatus == 1" v-model="scope.row.originalPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存">
              <template slot-scope="scope">
                <el-input-number :disabled="scope.row.shelvesStatus == 1 || form.seatStatus == 0" v-model="scope.row.showStock" @change="changeAllStock" :min="0" :max="100000"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="ceneter" label="操作">
              <template slot-scope="scope">
                <el-button  type="text" size="mini" @click="scope.row.specificationsTwoTitleContent = '';scope.row.originalPrice = '0';scope.row.showStock = 0">清空</el-button>
                <el-button v-if="scope.row.shelvesStatus == 1" type="text" size="mini" @click="scope.row.shelvesStatus=0" >启用</el-button>
                <el-button v-else type="text" size="mini" @click="scope.row.shelvesStatus=1">禁用</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <span>总库存</span>
            <el-input v-model="form.allStock"></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="作为录入" required>
        <template>
          <el-radio-group v-model="form.seatStatus" @change="seatStatusChange">
            <el-radio :label="0">有座位</el-radio>
            <el-radio :label="1">无座位</el-radio>
          </el-radio-group>
        </template>
      </el-form-item>
    </el-form>
    <seat v-if="form.seatStatus === 0" :form="form" ref="seat"/>
  </div>
</template>
<script>
import seat from "./seat";
import { mapState, mapActions } from "vuex";
export default {
  props: ['action', 'uploadData'],
  components: {
    seat
  },

  computed: {

    ...mapState({
      user: state => state.user
    }),
  },
  watch: {
  },
    activated() {
    },
    created() {
    },
  data() {
    return {
        disabled: {},
        showIcons: [],
        form:{},
        //显示图片
        urlShowDialogVisible: false,
        dialogImageUrl: '',
        item: {
          attributes: [],
          title:'',
          list: [],
        },
        categoryList: [], //商品类型
        co_categoryList: [], //商家商品类型
        imageUrl: "",
        active: 0,
        checked: false,
        rules: {
            icon : [ { required: true, message: "商品主图必填", trigger: "change" } ],
            spec : [ { required: true, message: "商品规格必填", trigger: "change" } ]
        },
    };
  },
  created() {
      this.init();
  },
  methods: {
      init() {
          this.showIcons = [];
          this.form = {
              seatStatus: 1, //是否有座位  0： 有座位  1：无座位
              seatDistribution: [], // 座位分布如 [[0,1,1,1,1,0],[1,1,1,1,1,1]]
              passage: {},  //过道分布 String 必填 eg：{"x":[1,3],"y":[1]}
              allStock: 0,  //总库存
              showStarttime: {
              },
              mainIcons: [],
              showCitys: {},
              showJson: [],  //后台需要的
              icon: [],  //商品主图list
              spec: [],   //规格
          }
      },
      initProduct(data) {
          debugger
          data = data.edtShow;
          this.init();
          this.form.icon = data.icon ? data.icon.split(',') : [];
          debugger
          this.form.icon.forEach((item)=> {
              if (item && item.startsWith('http')) {
                  this.showIcons.push({url: item})
              }
          })
          this.form.icon = this.showIcons;
          this.form.allStock  = data.allStock ;
          // this.$F.merge(this.form, data);
          if (data.showStarttime) {
              this.form.spec.push({title: '', list: []});
              let showStarttime = JSON.parse(data.showStarttime);
              for(let key in showStarttime) {
                  let value = showStarttime[key];
                  this.form.spec[0].title = key;
                  value.split(',').forEach((name)=> {
                      this.form.spec[0].list.push({name: name})
                  })
              }
          }
          if (data.showCitys) {
              this.form.spec.push({title: '', list: []});
              let showCitys = JSON.parse(data.showCitys);
              for(let key in showCitys) {
                  let value = showCitys[key];
                  this.form.spec[1].title = key;
                  value.split(',').forEach((name)=> {
                      this.form.spec[1].list.push({name: name})
                  })

              }
          }

          if (data.edtShowSpecsList) {
              data.edtShowSpecsList.forEach((item)=> {
                  this.form.showJson.push({
                      name: item.specificationsOneTitleContent + '-' + 'specificationsTwoTitleContent',
                      originalPrice: item.nowPrice,
                      showStock: item.showStock,
                      shelvesStatus: item.shelvesStatus,
                  })
              })
          }
          this.form.seatStatus = (data.edtShowSpecsList && data.edtShowSpecsList.length) > 0 ? 0 : 1;
          if (this.form.seatStatus === 0) {
              setTimeout(()=> {
                  this.$refs.seat.initProduct(data);
              }, 100)
          }
          this.$forceUpdate();
      },
      //禁用或启用
      openOrforbin(row, $index, type) {
          var object = {};
              Object.assign(object, row);
        if (type) {
            row.disabled=false; row.shelvesStatus=0
        } else {
            row.disabled=true; row.shelvesStatus=1
        }
        // this.$set(this.form.showJson[$index], object, row);
      },
      returnForm() {
          let validStatus = false;
          this.$refs["form"].validate(valid => {
              if (valid) validStatus = true;
          })
          if (validStatus) {
              var object = {};
              if (this.form.spec.length > 0) {
                  // var showJson = []
                  this.form.spec.forEach((item, index)=> {
                      var list = []
                      if (index == 0) {
                          item.list.forEach((nameObj)=> {
                              list.push(nameObj.name);
                          })
                          this.form.showStarttime = {};
                          this.form.showStarttime[item.title] = list.join(',');
                      } else if(index == 1){
                          item.list.forEach((nameObj)=> {
                              list.push(nameObj.name);
                          })
                          this.form.showCitys = {};
                          this.form.showCitys[item.title] = list.join(',');
                      }
                  })
              }
              Object.assign(object, this.form);
              if (this.$refs.seat) {
                  Object.assign(object, this.$refs.seat.returnForm());
              }
              return {
                  showStarttime: object.showStarttime,
                  showCitys: object.showCitys,
                  showJson: object.showJson,
                  seatStatus: object.seatStatus,
                  seatDistribution: object.seatDistribution,
                  passage: object.passage,
                  icon: this.form.icon,
                  allStock: object.allStock
              };
          } else
              return false;



      },

      seatStatusChange() {
          const seatStatus = this.form.seatStatus;
          if (seatStatus == 1) {  //无座位
              let allStock = 0;
              this.form.showJson.forEach(item=> {
                  allStock += item.showStock;
              })
              this.form.allStock = allStock;
          } else {
              if (this.form.showJson) {
                  this.form.showJson.forEach(item=> {
                      item.showStock = 0;
                  })
              }
              this.form.allStock = 60;
          }
          this.$forceUpdate()
      },
      //修改总库存
    changeAllStock() {
        let allStock = 0;
        this.form.showJson.forEach(item=> {
            allStock += item.showStock;
        })
        this.form.allStock = allStock;
    },
    /*新增规格*/
    addModel(index) {
      const array = this.form.spec[index].list.filter(item => {
        return !item.name
      })
      if (array.length == 0)
        this.form.spec[index].list.push({name: ''})
      else
        this.$message.info('请先将规格信息填写完整')
    },

    /**添加规格 */
    addSpecs() {
      // this.$set("form");
      const array = this.form.spec.filter(item => {
        let arr = item.list.filter(temp => {
          return !temp.name
        })
        return !item.title || arr.length > 0
      })
      if (array.length == 0) {
        this.form.spec.push({
          title: "",
          list: [{ name: "" }]
        });
        this.$forceUpdate();
      } else {
        this.$message.info('请先将规格值填写完整')
      }
    },

    /**生成规格表 */
    updateTable(value) {
      // if (!value) {return}
      let option = [ {
            title: "",
            name: "",
            specificationsTwoTitleContent: 0,
            originalPrice: "0",
            showStock: "0",
            shelvesStatus: "0",
        }
      ]; //初始
      var items = this.form.spec;
      console.log(items);
      for (var i = 0; i < items.length; i++) {
        option = this.addColumn(option, items[i].title, items[i].list);
      }
      // console.log(option)
        option.forEach(item=> {
            var flag = item.name.indexOf('-') > -1;
            let nameArray = item.name.split('-');
            item.specificationsOneTitle = items[0].title;
            item.specificationsOneTitleContent = nameArray[0];
            item.specificationsTwoTitle = flag ? items[1].title : items[0].title;
            item.specificationsTwoTitleContent = flag ? nameArray[1] : nameArray[0];
        })
        const object = {};
      this.form.showJson = option;
    },
    /**删除图片 */
    handleRemove(file, fileList, index) {
        this.form.icon = fileList;
    },

    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.urlShowDialogVisible = true;
    },

    addColumn(list, columnName, columnValues) {
      var newList = []; //新的集合
      for (var i = 0; i < list.length; i++) {
        var oldRow = list[i];
        for (var j = 0; j < columnValues.length; j++) {
          var newRow = JSON.parse(JSON.stringify(oldRow)); //深克隆
          newRow.name =  (newRow.name ? newRow.name + "-" : "") + columnValues[j].name;
          newList.push(newRow);
        }
      }
      return newList;
    },

    beforeUpload(file) {
      return this.$F.beforeUpload(this, file, 2)
    },

    mainPicSuccess: function (res, file, fileList, index) {
      if (res.code == 200) {
        this.form.icon.push({url: res.data});
      } else {
        this.$message.error(res.message);
        this.form.icon.pop();
      }
    },
    changeEditor(e) {
      //console.log(e)
      this.form.content = e;
    },
    handleChange(value) {
      // console.log(value[value.length-1]);
      this.form.categoryid = value[value.length - 1];
    },
    handleChanges(value) {
      // console.log(value[value.length-1]);
      this.form.co_categoryid = value[value.length - 1];
    },

    onSubmit() {
      console.log("submit!");
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },

    back() {
      this.active--;
    }
  }
};
</script>
<style lang="less" >
.el-specItem {
  height: auto;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;

  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  .addBtn {
    margin: 10px;
  }
}
.specItem {
  border-bottom: 1px solid #d8d8d8;
  padding: 0 10px;
}
.specVal {
  display: flex;
  flex-wrap: wrap;
  .valTit {
    width: 60px;
  }
  .inputBox {
    position: relative;
    margin-right: 10px;
    i {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}
.flexP {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
  .avatars {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    position: relative;
    display: inline-block;
    .deleteIcon {
      position: absolute;
      right: -0;
      top: -0;
      line-height: 20px;
      color: #fff;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.3);

      text-align: center;
      width: 20px;
      height: 20px;
    }
  }
}
.parmarBtn {
  position: relative;

  display: inline-block;
  margin-right: 8px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  line-height: 1;
  border: 1px solid rgba(199, 199, 199, 1);
  padding: 7px 15px;
  box-sizing: border-box;
  i {
    position: absolute;
    right: -5px;
    top: -5px;
    color: #d81e06;
    cursor: pointer;
  }
}
</style>
