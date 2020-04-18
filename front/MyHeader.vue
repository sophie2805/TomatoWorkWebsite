<template>
  <div>
    <img src="./asset/image/header.png" alt="Tomato Work" style="height: 120px" />
    <el-tooltip effect="light" placement="bottom-start" :content="this.tooltip"></el-tooltip>
    <el-popover placement="bottom-start" width="300" trigger="hover" :content="this.tooltip">
      <el-button
        type="text"
        slot="reference"
        style="position: relative; bottom: 80px; color: lightcoral;"
      >
        <i class="el-icon-info"></i>
      </el-button>
    </el-popover>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect"></el-menu>
  </div>
</template>

<script>
import VueBus from "vue-bus";

export default {
  name: "myHeader",
  data() {
    return {
      tooltip:
        "番茄工作法是简单易行的时间管理方法。将番茄时间设为25/40/自定义时长(分钟)，专注工作，中途不做任何与该任务无关的事，直到番茄时间结束。结束后可以短暂休息（5或15分钟）。番茄工作法可以极大提高工作效率，长期坚持下来还会有意想不到的成就感哦！"
    };
  },
  methods: {
    handleSelect() {}
  }
};
</script>