<template>
  <div class="record">
    <div class="recordTop">
      <div class="recordCate">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in list" :key="index" :span="3">
            <el-tag
              class="cate-content"
              :class="cur.id==item.id ? 'active': ''"
              :closable="item.financialTag!=1"
              :disable-transitions="false"
              @close="handleClose(item, 1)"
              @click="chooseCate(item)"
            >
              <span>{{item.title}}</span>
              <span v-if="item.payment==2" class="tip in">{{$t('manager.finance_income')}}</span>
              <span v-if="item.payment==1" class="tip ex">{{$t('manager.finance_spending')}}</span>
            </el-tag>
          </el-col>
          <el-col :span="3">
            <el-tag class="cate-content" @click="addCate(1)">
              <i class="el-icon-plus"></i>
            </el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in secondLevel" :key="index" :span="2">
            <el-tag
              class="cate-content second"
              :class="curSubId == item.id ? 'active' : ''"
              closable
              :disable-transitions="false"
              @close="handleClose(item, 2)"
              @click="change(item)"
            >{{item.msg}}</el-tag>
          </el-col>
          <el-col :span="2">
            <el-tag
              class="cate-content second"
              :class="curSubId == '' ? 'active' : ''"
              @click="addCate(2)"
            >
              <i class="el-icon-plus"></i>
            </el-tag>
          </el-col>
        </el-row>
      </div>
      <div class="addBox" v-if="addSub">
        <div class="current">
          {{$t('manager.finance_nowChoose')}}{{cur.title}}
          <el-tag
            class="tip"
            :class="cur.payment==2 ? 'in' : 'ex'"
          >{{cur.payment == 2 ? $t('manager.finance_income') : $t('manager.finance_spending')}}</el-tag>
        </div>
        <el-form ref="form" :model="form" label-width="130px" :rules="rules">
          <el-form-item :label="$t('manager.finance_abstract')+':'" prop="msg">
            <el-input v-model="form.msg"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manager.finance_account')+':'">
            <el-select v-model="form.accountId">
              <el-option
                v-for="(item, index) in account"
                :key="index"
                :label="item.id"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('boss.loginDetail_note')+':'" prop="remark">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item :label="$t('manager.finance_nowSpend')+':'" prop="amount">
            <el-input v-model="form.amount">
              <template slot="append">{{$t('manager.ps_japanYen')}}</template>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('manager.finance_payTime')+':'" prop="payTime">
            <el-date-picker
              type="date"
              :placeholder="$t('manager.finance_payTime')"
              v-model="form.payTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-cord"
              list-type="picture"
              action="aa"
              ref="upload"
              :file-list="form.files"
              :auto-upload="false"
              multiple
              :on-remove="handleRemove"
              accept="image/png, image/gif, image/jpg, image/jpeg"
            >
              <el-button size="small" class="submit">{{$t('manager.finance_uploadImg')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="recordBtm" v-if="addSub">
      <el-button class="submit" @click="submit('sub')">{{$t('manager.grsl_saveAndAdd')}}</el-button>
      <el-button class="cancel">{{$t('manager.finance_clearContent')}}</el-button>
    </div>
    <el-dialog
      :title="$t('commons.newAdd')"
      :visible.sync="cateVisible"
      top="0"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-form label-position="right" label-width="120px" size="medium">
        <el-form-item :label="$t('manager.finance_typeName')+':'">
          <el-input v-model="category.title "></el-input>
        </el-form-item>
        <el-form-item :label="$t('manager.finance_incomeType')+':'">
          <el-radio-group v-model="category.payment">
            <el-radio :label="1">{{$t('manager.finance_spending')}}</el-radio>
            <el-radio :label="2">{{$t('manager.finance_income')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="blueBtn mini" @click="submit">{{$t('commons.confirm')}}</el-button>
        <el-button class="defaultBtn mini" @click="cateVisible = false">{{$t('commons.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      secondLevel: [],
      cateVisible: false,
      form: {
        msg: "",
        accountId: "",
        remark: "",
        amount: "",
        payTime: "",
        imgPath: "",
      },
      cur: {},
      category: { title: "", payment: 1 },
      addSub: false,
      account: [],
      curSubId: "",
      rules: {
        msg: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }],
        payTime: [{ required: true, message: "请选择日期", trigger: "blur" }],
      },
    };
  },
  props: {
    list: Array,
    initData: Function,
  },
  methods: {
    chooseCate(item) {
      this.$F.doRequest(
        this,
        "/pms/remeber/remeber_sub_list",
        { remeberId: item.id, pageIndex: 1, pageSize: 10 },
        (res) => {
          this.secondLevel = res.remeberSubList;
          this.cur = item;
        }
      );
    },
    addCate(level) {
      if (level == 1) {
        this.cateVisible = true;
        this.category = { title: "", payment: 1 };
      } else {
        this.addSub = true;
        this.curSubId = "";
        this.form = {
          msg: "",
          accountId: "",
          remark: "",
          amount: "",
          payTime: "",
          imgPath: "",
        };
        this.$refs.form.clearValidate();
      }
    },
    handleClose(item, level) {
      if (level == 1) {
        this.$F.doRequest(
          this,
          "/pms/remeber/remeber_delete",
          { remeberId: item.id },
          (res) => {
            this.initData();
          }
        );
      } else {
        this.$F.doRequest(
          this,
          "/pms/remeber/remeber_sub_delete",
          { remeberSubId: item.id },
          (res) => {
            this.chooseCate(this.cur);
          }
        );
      }
    },
    change(item) {
      this.addSub = true;
      this.form = item;
      this.curSubId = item.id;
    },
    submit(type) {
      if (type == "sub") {
        const a = this;
        const params = {
          remeberId: this.cur.id,
          financialTitle: this.cur.title,
          msg: this.form.msg,
          payment: this.cur.payment,
          accountId: this.form.accountId,
          amount: this.form.amount,
          payTime: this.form.payTime,
          remark: this.form.remark,
          imagesJson: "",
          remeberSubId: this.form.id,
        };
        a.formData = new FormData();
        let imgList = a.$refs.upload.uploadFiles || [];
        if (imgList.length == 0) {
          return a.$message.warning("请选择图片");
        }
        a.$F.doUploadBatch(a, imgList, (data) => {
          params.imagesJson = data;
          a.$F.doRequest(a, "/pms/remeber/remeber_sub_edit", params, (res) => {
            a.chooseCate(this.cur);
            a.curSubId = res.remeberId;
            a.$message.success("success");
            this.addSub = false;
          });
        });
      } else {
        this.$F.doRequest(
          this,
          "/pms/remeber/remeber_edit",
          this.category,
          (res) => {
            this.initData();
            this.cateVisible = false;
          }
        );
      }
    },
    handleRemove(file, fileList) {},
  },
};
</script>

<style lang="scss">
.record {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .recordTop {
    flex: 1;
    height: 0;
    overflow: auto;

    .recordCate {
      .el-row {
        margin: 0 0 20px !important;
      }
      .cate-content {
        position: relative;
        height: 90px;
        color: #333;
        font-size: 16px;
        border: 1px solid #ababab;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.second {
          height: auto;
          min-height: 30px;
          font-size: 14px;
        }

        &.active {
          background: #fff;
          border-color: #136fff;
        }
      }

      .el-tag__close {
        position: absolute;
        right: 5px;
        top: 5px;
        background: #ea4b5f;
        color: #fff;
      }
    }
    .tip {
      margin-top: 4px;
      font-size: 12px;
      padding: 0 10px;
      border-radius: 5px;
      color: #fff;
      line-height: 26px;

      &.in {
        background: #29bd7d;
      }
      &.ex {
        background: #ce5433;
      }
    }

    .addBox {
      border-top: 1px solid #d7d7d7;
      padding: 10px 0 0;

      .current {
        display: flex;
        align-items: center;
        font-size: 14px;

        .tip {
          margin-left: 5px;
          margin-top: 0;
        }
      }

      .el-form {
        margin-top: 10px;

        .el-form-item {
          .el-input,
          .el-select,
          .upload-cord {
            width: 450px;
          }
        }
      }
    }
  }

  .recordBtm {
    border-top: 1px solid #e2e2e2;
    line-height: 60px;
    padding: 0 20px;

    .el-button {
      margin-right: 30px;
    }
  }
}
</style>
