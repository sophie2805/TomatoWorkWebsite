<template>
  <div>
    <img src="./asset/image/header.png" alt="Tomato Work" style="height: 120px" />

    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect"></el-menu>
  </div>
</template>

<script>
import VueBus from "vue-bus";

export default {
  name: "myHeader",
  data() {
    return {};
  },
  methods: {
    handleSelect() {}
  }
};
</script>