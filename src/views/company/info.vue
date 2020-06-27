<template>
  <div>
    <el-card header="企业信息">
      <!-- <div class="listItem">
        <img src alt />
        <el-button type="text">更改LOGO</el-button>
      </div>-->
      <div class="listItem">
        <div class="leftList">企业名称</div>
        <div class="rightList">{{companyInfo.enterName}}</div>
      </div>
      <div class="listItem">
        <div class="leftList">团队规模</div>
        <div class="rightList">{{companyInfo.enterSize}}</div>
      </div>
      <div class="listItem">
        <div class="leftList">所属行业</div>
        <div class="rightList">{{companyInfo.tradeLevelOne}}</div>
      </div>
      <div class="listBix">
        <div class="listItem">
          <div class="leftList">企业所在地</div>
          <div class="rightList">{{companyInfo.enterAddress}}</div>
        </div>
        <div class="listItem">
          <div class="leftList">联系人</div>
          <div class="rightList">{{companyInfo.legalIdcardName}}</div>
        </div>
        <div class="listItem">
          <div class="leftList">联系电话</div>
          <div class="rightList">{{companyInfo.legalIdcardPhone}}</div>
        </div>
      </div>

      <div class="listItem">
        <div class="leftList">信用代码</div>
        <div class="rightList">{{companyInfo.enterCode}}</div>
      </div>
      <div class="listBix">
        <div class="listItem">
          <div class="leftList">法定代表人</div>
          <div class="rightList">{{companyInfo.legalIdcardName}}</div>
        </div>
        <div class="listItem">
          <div class="leftList">证件号码</div>
          <div class="rightList">{{companyInfo.legalIdcardCode}}</div>
        </div>
        <div class="listItem">
          <div class="leftList">认证状态</div>
          <div class="rightList">{{companyInfo.enterStatus}}</div>
        </div>
      </div>
      <div class="listBix">
        <el-button type="primary" plain @click="showChange">更换法人</el-button>
        <el-button type="primary" plain @click="editCompany">编辑企业信息</el-button>
      </div>
    </el-card>
    <infoEdit ref="editRef" v-if="showEdit" />
    <indent v-if="showIndent" ref="indentEle" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import infoEdit from "./infoEdit";
import indent from "./indent";

export default {
  components: {
    infoEdit,
    indent
  },
  data() {
    return {
      showEdit: false,
      showIndent:false
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
.listBix {
  display: flex;
}
.listItem {
  display: flex;
  padding-bottom: 15px;
  .leftList {
    width: 120px;
    color: #666;
  }
  .rightList {
    color: #000;
    padding-right: 120px;
  }
}
</style>