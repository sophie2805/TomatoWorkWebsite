<template>
  <el-container>
    <el-header style="height: 150px;text-align: center;position: relative">
      <myHeader></myHeader>
    </el-header>
    <el-main style="padding: 50px">
      <el-radio v-model="radio" label="25" :disabled="radio25" @change="xxx">25分钟</el-radio>
      <el-radio v-model="radio" label="40" :disabled="radio40" @change="xxx">40分钟</el-radio>
      <div>{{this.timeRemain}}</div>
      <div>{{this.remainTimestamp}}</div>

      <el-button plain @click="start" :disabled="btnStart">开始</el-button>
      <el-button plain @click="stop" :disabled="btnStop">停止</el-button>
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
      radio: "25",
      radio25: false,
      radio40: false,
      btnStart: false,
      btnStop: false,
      timeRemain: "25:00",
      remainTimestamp: 0,
      duration: 25
    };
  },
  beforeDestroy() {
    this.worker = null;
  },
  components: {
    myHeader
  },
  created() {},
  mounted() {},
  methods: {
    xxx(label) {
      if (label === "25") {
        this.duration = 25;
      } else {
        this.duration = 40;
      }
      this.timeRemain = this.duration + ":00";
    },
    setTimer(val) {
      this.worker = new Worker();
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
      this.btnStart = true;
      if (this.duration === 25) this.radio40 = true;
      else this.radio25 = true;
      this.setTimer(this.duration);
    },
    stop() {
      this.$confirm("剩余时间将被重置，并且也不会得到番茄，确定停止？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.worker.terminate();
          this.timeRemain = this.duration + ":00";
          this.radio40 = false;
          this.radio25 = false;
          this.btnStart = false;
        })
        .catch(() => {});
    }
  }
};
</script>