<template>
  <div class="threejs-child">
    <InfoPanel :article="article" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import Canvas from '~/assets/sketch/first'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      Canvas
    }
  },
  async asyncData({ params }) {
    const articles = await import('~/assets/json/articles.json')
    return {
      article: articles[params.id]
    }
  },
  mounted() {
    const initCanvas = new this.Canvas()
    window.console.log(initCanvas)
  }
}
</script>

<style scoped lang="scss">
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
