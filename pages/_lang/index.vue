<template>
  <div class="DefaultPage">
    <p>Loaded with <b>$axios.users.firstLoadFixPirce(1)</b> in SSR context</p>
    <p class="code">{{ user }}</p>
    <button @click="loadTwo">
      Load <b>$axios.users.firstLoadFixPirce(2)</b> from client
    </button>
  </div>
</template>
<script src="https://s13.cnzz.com/z_stat.php?id=1273759983&web_id=1273759983" language="JavaScript"></script>
<script>
// import Index from '~/API/index';
export default {
  components: {},
  async asyncData ({ $api }) {
    // $api available in SSR context
    // const response = await $api.users.firstLoadFixPirce()
    // return {
    //   user: response.data
    // }
  },
  data: () => ({
    user: {}
  }),
  beforeCreate() {},
  mounted() {
    // let data = this.$axios.$post('/api/v1/bitbuy/fixprice/common/firstLoadFixPirce')
    // let data2 = this.$axios.$post('/api2/v1/bitbuy/fixprice/common/firstLoadFixPirce')
    // console.log(this)
  },
  methods: {
    async loadTwo() {
      // this.$api available in the client context
      console.log(this)
      // let obj = {
      //   pageNum: 1,
      //   pageSize: 10
      // }
      // this.$API.User.index(obj)
      const response = await this.$api.users.firstLoadFixPirce()
      const response2 = await this.$api.users.firstLoadFixPirce2()
      // this.user = response.data
    }
  }
};
</script>

<style>
  .DefaultPage{
    height: 100%;
    width: 100%;
    position: relative;
    overflow: inherit;
  }
</style>
