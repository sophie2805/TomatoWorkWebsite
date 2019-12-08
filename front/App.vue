<template>
<el-container>
  <el-header>
  <myHeader></myHeader>
  </el-header>
  <el-main></el-main>
  <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
import myHeader from './Header.vue'

export default{
  name: 'app',
    data(){
        return{        }
    },
    components:{
      myHeader
    },
    created(){},
        mounted(){}
        
}
</script>