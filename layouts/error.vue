<template>
  <section class="container Error bk29">
    <section class="content">
      <section v-if="error.statusCode === 404" class="logo tc">
        <img src="~assets/img/404.jpg" alt="BuyBit Logo" />
      </section>
      <h1 class="title tc fs30">
        {{ error.statusCode }}
      </h1>
      <!-- <h2 class="info tc fs28">
        {{ error.message }}
      </h2> -->
      <nuxt-link class="button tc fs22 cl09" :to="`/${locale}/`" v-if="error.statusCode === 404 || error.statusCode === 500">
        HomePage
      </nuxt-link>
    </section>
  </section>
</template>
<script>
export default {
  props: ['error'],
  data(){
    return{
      locale: this.$store.state.locale
    }
  },
  mounted() {
    if(this.error.statusCode == 500){
      // window.location.reload();
    }
  },
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .Error{
    .content{
      min-height: 680px;
      .logo{
        padding-top: 100px;
        margin-bottom: 100px;
      }
      h1, h2, a{
        padding: 10px 0;
      }
      a{
        display: block;
        text-decoration: underline;
      }
    }
  }
</style>
