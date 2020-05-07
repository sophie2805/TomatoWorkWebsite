<template>
  <el-container>
    <el-header style="height: 150px;text-align: center;position: relative">
      <myHeader></myHeader>
    </el-header>
    <el-main>
      <statisticModal :show.sync="statisticShow" v-if="statisticShow"></statisticModal>
      <el-row name="arrow-btn-down" style="text-align: center;">
        <el-button type="text" style="font-size: xx-large; color: coral;" @click="clickArrowBtn">
          <i class="el-icon-arrow-down" />
        </el-button>
      </el-row>

      <el-row name="reward-row" style="text-align: center;">
        <el-col>
          <svg
            v-for="n in records.tomato1"
            class="icon"
            aria-hidden="true"
            style="color:red;font-size:30px"
            :key="'K'+n"
          >
            <use xlink:href="#icon-tomatofanqie" />
          </svg>
          <svg
            v-for="n in records.tomato2"
            class="icon"
            aria-hidden="true"
            style="color:red;font-size:40px"
            :key="'Q'+n"
          >
            <use xlink:href="#icon-tomatofanqie" />
          </svg>
          <svg
            v-for="n in records.potato"
            class="icon"
            aria-hidden="true"
            style="color:red;font-size:40px"
            :key="'J'+n"
          >
            <use xlink:href="#icon-tomatotudou" />
          </svg>
        </el-col>
      </el-row>
      <el-row name="radio-selection-row" style="text-align: center">
        <el-col :span="24">
          <el-radio-group v-model="radio">
            <el-radio label="25" @change="xxx" :disabled="radio25">25分钟</el-radio>
            <el-radio label="40" @change="xxx" :disabled="radio40">40分钟</el-radio>
            <el-radio label="66" @change="xxx" :disabled="radio66">
              <el-input
                id="userInput"
                v-model="input"
                placeholder="1-60分钟..."
                :disabled="inputDisable"
                class="customizedInput"
              ></el-input>
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row name="count-down-row">
        <el-col :span="24" style="text-align: center; font-size: 200px; color: gray;">
          <div>{{this.timeRemain}}</div>
        </el-col>
      </el-row>
      <el-row name="operation-btn-row">
        <el-col :span="24" style="text-align: center;">
          <el-button
            plain
            @click="start"
            :disabled="btnStart || this.duration === 0"
            id="startBtn"
          >开始</el-button>
          <el-button plain @click="stop" :disabled="btnStop" id="stopBtn">停止</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row style="text-align: center; position: relativel; margin-top:70px;">
        <el-col>
          <span>
            <el-link
              type="info"
              :underline="false"
              href="https://github.com/sophie2805/TomatoWorkBackend.git"
              target="_blank"
            >Github Backend Repo /</el-link>
            <el-link
              type="info"
              :underline="false"
              href="https://github.com/sophie2805/TomatoWorkWebsite.git"
              target="_blank"
            >Github Frontend Repo</el-link>
          </span>
        </el-col>
      </el-row>
      <el-row style="text-align: center; position: relativel">
        <el-col>
          <span
            style="color: cadetblue;font-size: medium;font-family: fantasy;"
          >Powered by Vue + SprintBoot + MySql(docker)</span>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<style scoped>
#userInput {
  border: none;
  background: transparent;
  border-bottom: 1px solid #fff;
  background-image: none;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.el-link.el-link--info {
  font-size: medium !important;
  color: darkgrey !important;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>

<script>
import myHeader from "./MyHeader.vue";
import Worker from "./Component/timer.worker.js";
import Numeral from "numeral";
import statisticModal from "./Statistic.vue";

export default {
  name: "app",
  data() {
    return {
      radio: "25",
      input: "",
      inputDisable: true,
      radio25: false,
      radio40: false,
      radio66: false,
      btnStart: false,
      btnStop: false,
      timeRemain: "25:00",
      remainTimestamp: 0,
      duration: 25,
      records: {
        tomato1: 0,
        tomato2: 0,
        potato: 0
      },
      actionItem: "Load",
      statisticShow: false
    };
  },
  components: {
    statisticModal,
    myHeader
  },
  watch: {
    input(val) {
      var temp = parseInt(val);
      if (temp > 60) {
        this.$message.info("大于60，将对60取模进行计时哦！");
      }
      this.duration = temp % 60;
      this.input = this.duration;
      if (this.duration <= 9) {
        this.timeRemain = "0" + this.duration + ":00";
      } else {
        this.timeRemain = this.duration + ":00";
      }
    },
    radio(val) {
      if (val === "66") this.inputDisable = false;
      else {
        this.inputDisable = true;
        this.input = "";
      }
    }
  },
  beforeDestroy() {
    this.worker = null;
  },
  created() {
    this.$axios.defaults.headers.get["Pragma"] = "no-cache";
    this.$axios.defaults.headers.get["Cache-Control"] = "no-cache, no-store";
  },
  mounted() {
    this.getTomatoToken();
  },
  methods: {
    clickArrowBtn() {
      this.statisticShow = !this.statisticShow;
      this.addVisitorEntry("查看统计数据");
    },
    addVisitorEntry(aa) {
      this.$axios({
        method: "post",
        url: "/api/statistic/addVisitorEntry",
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        },
        params: {
          actionItem: aa
        }
      })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    getTomatoToken() {
      this.$axios
        .post("/api/statistic/load", {})
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    xxx(label) {
      if (label === "25") {
        this.duration = 25;
        this.timeRemain = this.duration + ":00";
      } else if (label === "40") {
        this.duration = 40;
        this.timeRemain = this.duration + ":00";
      } else {
        this.duration = 0;
        this.timeRemain = "00:00";
      }
      this.actionItem = "Radio";
      this.addVisitorEntry("选择时长");
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
        if (e.data.value === 0) {
          var reward = "";
          if (that.radio === "66") {
            reward = "土豆一枚，奖励客官认真工作" + that.duration + "分钟！";
          } else if (that.radio === "25") {
            that.records.tomato1 += 1;
            reward = "小番茄一枚，奖励客官认真工作25分钟！";
          } else {
            that.records.tomato2 += 1;
            reward = "大番茄一枚，奖励客官认真工作40分钟！";
          }
          that.$alert(reward, "", {
            confirmButtonText: "收下",
            callback: () => {
              if (reward.indexOf("土豆") > -1) {
                that.records.potato += 1;
              } else if (reward.indexOf("小番茄") > -1) {
                that.records.tomato1 += 1;
              } else that.records.potato += 1;
              that.radio25 = false;
              that.radio40 = false;
              that.radio66 = false;
              that.btnStart = false;
            }
          });
        }
      };
    },
    start() {
      this.btnStart = true;
      this.radio25 = true;
      this.radio40 = true;
      this.radio66 = true;
      if (this.input !== "") {
        this.duration = parseInt(this.input);
      }
      console.log(this.duration);
      this.setTimer(this.duration);
      this.actionItem = "Start";
      this.addVisitorEntry("开始计时");
    },
    stop() {
      this.actionItem = "Stop";
      this.addVisitorEntry("停止计时");
      this.$confirm("剩余时间将被重置，确定停止？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.worker.terminate();
          if (this.duration <= 9) {
            this.timeRemain = "0" + this.duration + ":00";
          } else {
            this.timeRemain = this.duration + ":00";
          }
          this.radio40 = false;
          this.radio25 = false;
          this.radio66 = false;
          this.btnStart = false;
          if (this.radio === "66") this.inputDisable = false;
          else this.inputDisable = true;
          document.getElementById("stopBtn").blur();
          his.addVisitorEntry("结束计时");
        })
        .catch(() => {});
    }
  }
};
</script>