<template>
  <div class="ErrorPage">
    <nuxt/>
  </div>
</template>

<script>
export default {
  head() {
    return {};
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
  filters: {},
  directives: {}
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    html, body{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background: #000f18;
    }
    .ErrorPage{
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow: inherit;
    }
</style>
