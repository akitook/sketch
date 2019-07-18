<template>
  <div class="wrapper">
    <InfoPanel :article="article" />
    <div class="container">
      <div class="one">
        <h2>1. Scan this QR code to open web app in your phone browser.</h2>
        <h2>2. Scan this marker image.</h2>
        <img src="~/assets/sketch/arjs01/assets/qrmarker.jpg" alt="QR CODE" />
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
h2 {
  font-size: 14px;
}
.container {
  width: 100vw;
  height: 100vh;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.one {
  max-width: 100%;
  img {
    max-width: 100%;
  }
}
@media screen and (min-width: 768px) {
  .container {
    align-items: center;
  }
  .one {
    max-width: 512px;
  }
  h2 {
    text-align: center;
    margin-bottom: 16px;
  }
}
</style>
