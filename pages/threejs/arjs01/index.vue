<template>
  <div class="wrapper">
    <InfoPanel :article="article" />
    <div class="container">
      <div class="one">
        <h2>1. Open web app in your phone browser.</h2>
        <img src="~/assets/sketch/arjs01/assets/qr.png" alt="QR CODE" />
      </div>
      <div class="two">
        <h2>2. Scan this marker image.</h2>
        <img src="~/assets/sketch/arjs01/assets/hiro.jpg" alt="hiro marker" />
      </div>
    </div>
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      article: articles.arjs01
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
@media screen and (min-width: 768px) {
}
</style>
