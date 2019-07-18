<template>
  <div class="wrapper">
    <InfoPanel :article="article" />
    <div class="container">
      <div class="one">
        <h2>1. Open web app in your phone browser.</h2>
        <h2>2. Scan this marker image.</h2>
        <img src="~/assets/sketch/arjs01/assets/qrmarker.png" alt="QR CODE" />
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (min-width: 768px) {
}
</style>
