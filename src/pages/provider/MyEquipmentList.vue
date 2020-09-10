<template>
  <div class="">
    <el-footer
      ><layoutFooter
        :totalPost="totalReply"
        @changePage="changePage"
      ></layoutFooter
    ></el-footer>
  </div>
</template>

<script>
// import layoutFooter from "../components/LayoutFooter.vue";

export default {
  data() {
    return {
      postData: {
        title: "",
        page: 1,
        userId: "",
        size: "",
        postId: "",
        totalReply: 0
      }
    };
  },
  name: "myReply",
  components: {
    layoutFooter
  }
};
</script>

<style lang="scss" scoped></style>
