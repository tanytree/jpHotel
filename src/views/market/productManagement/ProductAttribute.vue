<!--
 * @Date: 2020-02-16 14:34:08
 * @LastEditors: Dana
 * @LastEditTime: 2020-04-09 15:05:48
 * @FilePath: /cloudAdmin/src/views/market/productManagement/ProductAttribute.vue
 -->
<template>
  <el-dialog width="500px" title="修改" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="form" ref="ruleForm" :rules="rules" label-width="100px" prop="title">
      <el-form-item label="属性名称：" prop="title">
        <el-input v-model="form.title" placeholder="例如：材质"></el-input>
      </el-form-item>
      <el-form-item label="属性内容：" prop="description">
        <el-input v-model="form.description" placeholder="例如：纯棉"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit('ruleForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        title: "",
        description: ""
      },
      rules: {
        title: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        description: [{ required: true, message: "属性内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(data) {
      if (data) {
        this.form = data;
      } else {
        this.form = {
          title: "",
          description: ""
        };
      }
      this.visible = true;
    },
    dataFormSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.visible = false;
          this.$emit("saveAttribute", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
