<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" class="tabCenter">
      <el-tab-pane :label="$t('manager.hp_printingParams')" name="params">
        <div class="params_box">
          <div class="printTitle">{{$t('manager.hp_printDocumentSelection')+':'}}</div>
          <el-checkbox-group v-model="printMsg" @change="changeCheck">
            <el-checkbox v-for="item in printData" :key="item.id" :label="item.id">{{$i18n.locale == 'ri'?item.ename:item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="footer">
          <el-button type="primary" class="submit" @click="submit('params')">{{$t('commons.save')}}</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('manager.hp_printFormat')" name="format">
        <div class="content">
          <el-table ref="multipleTable" :data="printData" border height="100%" header-row-class-name="default" size="small">
            <el-table-column :prop="$i18n.locale == 'ri'?'ename':'name'" :label="$t('manager.hp_documentName')"></el-table-column>
            <el-table-column :label="$t('manager.hp_copies')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.hp_documentNote')">
              <template slot-scope="scope">
                <el-input type="textarea" :rows="3" resize="none" v-model="scope.row.remark" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.hp_printFormat')" width="400">
              <template slot-scope="scope">
                <el-popover v-model="scope.row.pop" placement="bottom" width="400" trigger="click">
                  <div class="pop">
                    <div class="pop-title">{{popover.name}}</div>
                    <ul class="printMsg">
                      <li><span class="label">{{$t('desk.home_printTime')+':'}}</span><span>{{popover.updateTime}}</span></li>
                      <el-divider></el-divider>
                      <li><span class="label">{{$t('manager.hp_goodsName')+':'}}</span><span>{{popover.ename}}</span></li>
                      <li><span class="label">{{$t('desk.home_getNum')+':'}}</span><span>{{popover.storesNum}}</span></li>
                      <el-divider></el-divider>
                      <li><span class="label">{{$t('desk.home_checkTheTime')+':'}}</span><span>{{popover.createTime}}</span></li>
                    </ul>
                    <div class="remark" v-html="popover.remark" />
                  </div>
                  <el-radio-group v-model="scope.row.format" slot="reference" @change="showDetail(scope.row)">
                    <el-radio :label="1">A4</el-radio>
                    <el-radio :label="2">A4-1/2</el-radio>
                    <el-radio :label="3">A4-1/3</el-radio>
                    <el-radio :label="4">POS(76mm)</el-radio>
                  </el-radio-group>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-button type="primary" class="submit" @click="submit('format')">{{$t('commons.save')}}</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "params",
      printMsg: [],
      five_money: "",
      beiYong_show: true,
      radio: "",
      popover: {},
    };
  },
  props: { printData: Array, initData: Function },
  methods: {
  
    // 交班模式选择,非现金流时不显示备用金
    changeCheck(value) {
      this.printMsg = value;
    },
    showDetail(row) {
      this.printData.map((item) => {
        item.pop = false;
      });
      row.pop = true;
      this.popover = row;
    },
    submit(type) {
      const params = [];
      if (type == "params") {
        this.printData.map((item) => {
          if (this.printMsg.indexOf(item.id) < 0) {
            item.depositFlag = 2;
          }
          const obj = { id: item.id, depositFlag: item.depositFlag };
          params.push(obj);
        });
      } else if (type == "format") {
        this.printData.map((item) => {
          const obj = {
            id: item.id,
            name: item.name,
            remark: item.remark,
            number: item.number,
            format: item.format,
            depositFlag: item.depositFlag,
          };
          params.push(obj);
        });
      }
      this.$F.doRequest(
        this,
        "/pms/documentsparams/batchedit",
        { params: JSON.stringify(params) },
        (res) => {
          this.$message.success("success");
        }
      );
    },
  },
};
</script>

<style lang="scss">
.params_box {
  line-height: 40px;

  .printTitle {
    color: #1e1e1e;
    font-weight: bold;
    font-size: 18px;
  }

  .el-checkbox-group {
    width: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .el-checkbox {
      width: 50%;
      margin: 0;
    }
  }
}
.footer {
  margin-top: 50px;
  border-top: 1px solid #e2e2e2;
  padding: 20px 0;
}
.pop {
  padding: 10px;
  color: #1e1e1e;

  .pop-title {
    font-size: 18px;
    padding: 20px 0;
    text-align: center;
  }
  .printMsg {
    line-height: 30px;

    .el-divider--horizontal {
      margin: 14px 0;
    }
  }
  .remark {
    margin-top: 30px;
    line-height: 26px;
  }
}
</style>
