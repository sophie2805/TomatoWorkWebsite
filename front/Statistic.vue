<template>
  <el-dialog :visible="show" width="600px" @close="closeDialog" v-if="show">
    <span slot="title" style="color: darkgrey;">
      <i class="el-icon-s-data" />访问统计
    </span>
    <el-tabs type="border-card" :stretch="true" id="statistic-tabs">
      <el-tab-pane label="每日访问">
        <span slot="lable" style="color: darkgrey;">
          <i class="el-icon-s-data" />qqq
        </span>
        <div name="wrapper-div">
          <el-table
            :data="dailyTable"
            style="width: 100%"
            :default-sort="{prop: 'v_date', order: 'descending'}"
            id="dailyTable"
            :height="tableHeight"
          >
            <el-table-column prop="item" label="日期" sortable min-width="240"></el-table-column>
            <el-table-column prop="cnt" label="数量" sortable width="180"></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalRows"
            :current-Page="currentPage"
            :page-size="pageSize"
            style="margin-top: 5px; float: right"
            v-on:current-change="goToPage"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="总访问量">
        <div name="wrapper-div">
          <el-row>
            <el-col :span="16">
              <img src="./asset/image/statistic.png" alt="Tomato Work" style="height: 220px;" />
            </el-col>
            <el-col :span="8" style="height: 220px; position: relative;">
              <span
                style="color: cadetblue; font-family: monospace; font-size: xxx-large; position: relative; top: 40px;"
              >{{visitorTotal}}</span>
              <div
                style="color: darkgray; font-style: italic; font-size: smaller; position: relative; top: 60px;"
              >
                <i class="el-icon-info" />注：统计口径为count distinct sessionID. 刷新页面时sessionID会更新，即为一次新的访问
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="操作统计">
        <div name="wrapper-div">
          <el-table
            :data="actionTable"
            style="width: 100%"
            :default-sort="{prop: 'cnt', order: 'descending'}"
            id="actionTable"
          >
            <el-table-column prop="item" label="操作" sortable min-width="180"></el-table-column>
            <el-table-column prop="cnt" label="总次数" sortable width="180"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
export default {
  props: ["show"],
  name: "statistic-modal",
  data() {
    return {
      visitorTotal: 0,
      dailyTable: [],
      actionTable: [],
      currentPage: 1,
      pageSize: 10,
      totalRows: 0,
      tableHeight: 0
    };
  },
  created() {},
  mounted() {
    var clientHeight = document.body.clientHeight;
    this.tableHeight = clientHeight * 0.3;
    this.pageSize = ((this.tableHeight * 3) / 170) | 0;
    if (this.pageSize < 1) this.pageSize = 1;
    this.getVisitorDailyCount();
    this.getVisitorTotalCount();
    this.getItemSummary();
  },
  methods: {
    goToPage(targetPageNum) {
      this.currentPage = targetPageNum;
      this.getVisitorDailyCount();
    },
    getVisitorDailyCount() {
      this.$axios
        .get("/api/statistic/visitorDailyCounts", {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.dailyTable = res.data.content;
          this.totalRows = this.pageSize * res.data.totalPages;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getVisitorTotalCount() {
      this.$axios
        .get("/api/statistic/visitorTotalCount")
        .then(res => {
          this.visitorTotal = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getItemSummary() {
      this.$axios
        .get("/api/statistic/popularItemSummary")
        .then(res => {
          console.log(res.data);
          this.actionTable = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    closeDialog() {
      this.$emit("update:show", false);
    }
  }
};
</script>
<style>
.el-table__body {
  font-size: small !important;
  color: cadetblue !important;
}
</style>