<template>
    <el-container class="provider">
        <el-aside style="width: 200px; height: 100% "><ProviderNav></ProviderNav></el-aside>
        <el-main><ProviderMain></ProviderMain></el-main>
  </el-container>
</template>

<script>
import ProviderNav from "./ProviderNav"
import ProviderMain from "./providerMain"


export default {
  data() {
    return {
    };
  },
  name: "Provider",
  components: {
    ProviderNav,
    ProviderMain
  }
};
</script>

<style lang="scss" scoped>
el-container{
    height: 100%;
}
</style>
