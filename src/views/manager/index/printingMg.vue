<template>
  <div class="boss-index">
    <el-tabs v-model="activeName" class="tabCenter">
      <el-tab-pane :label="$t('manager.hp_printingParams')" name="params">
        <div class="tag-top">
          <div class="printTitle">{{$t('manager.hp_printDocumentSelection')+':'}}</div>
          <el-checkbox-group v-model="printMsg" @change="changeCheck">
            <el-checkbox v-for="item in printData" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="footer">
          <el-button type="primary" class="submit" @click="submit('params')">{{$t('commons.save')}}</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('manager.hp_printFormat')" name="format">
        <div class="content">
          <el-table
            ref="multipleTable"
            :data="printData"
            border
            height="100%"
            header-row-class-name="default"
            size="small"
          >
            <el-table-column prop="name" :label="$t('manager.hp_documentName')"></el-table-column>
            <el-table-column :label="$t('manager.hp_copies')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('manager.hp_documentNote')">
              <template slot-scope="scope">
                <el-input type="textarea" :rows="3" v-model="scope.row.remark" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('manager.hp_printFormat')" width="400">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.format">
                  <el-radio :label="1">A4</el-radio>
                  <el-radio :label="2">A4-1/2</el-radio>
                  <el-radio :label="3">A4-1/3</el-radio>
                  <el-radio :label="4">POS(76mm)</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer">
            <el-button
              type="primary"
              class="submit"
              @click="submit('format')"
            >{{$t('commons.save')}}</el-button>
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
      four_tableData: [
        {
          name: "张十三",
          time: "2020-5-20",
          job_status: "实习期",
          job: "普通员工",
          number: "11223",
          parts: "销售部",
        },
        {
          name: "张十三",
          time: "2020-5-20",
          job_status: "实习期",
          job: "普通员工",
          number: "11223",
          parts: "销售部",
        },
      ],
    };
  },
  props: { printData: Array, initData: Function },
  methods: {
    // 交班模式选择,非现金流时不显示备用金
    changeCheck(value) {
      this.printMsg = value;
    },
    submit(type) {},
  },
};
</script>

<style>
</style>
