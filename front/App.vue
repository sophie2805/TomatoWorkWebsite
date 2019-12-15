<template>
  <el-container>
    <el-header style="height: 150px;text-align: center;position: relative">
      <myHeader></myHeader>
    </el-header>
    <el-main style="padding: 50px">
      <div>{{this.timeRemain}}</div>
      <div>{{this.remainTimestamp}}</div>
      <el-button plain @click="start">开始</el-button>
      <el-button plain @click="stop">停止</el-button>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import myHeader from "./MyHeader.vue";
import Worker from "./Component/timer.worker.js";
import Numeral from "numeral";

export default {
  name: "app",
  data() {
    return {
      timeRemain: "00:00",
      remainTimestamp: 0,
      duration: 0,
      worker: new Worker()
    };
  },
  beforeDestroy() {
    this.worker = null;
  },
  components: {
    myHeader
  },
  created() {
    this.$bus.$on("select25", data => {
      this.duration = data.value;
    });
    this.$bus.$on("select40", data => {
      this.duration = data.value;
    });
  },
  mounted() {},
  methods: {
    setTimer(val) {
      this.worker.postMessage({ value: val * 60 * 1000 });
      const that = this;
      this.worker.onmessage = function(e) {
        that.remainTimestamp = e.data.value;
        that.timeRemain = Numeral(e.data.value / 1000)
          .format("00:00")
          .slice(2);
      };
    },
    start() {
      this.setTimer(this.duration);
    },
    stop() {
      this.worker.terminate();
    }
  }
};
</script>