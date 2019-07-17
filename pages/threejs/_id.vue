<template>
  <div class="threejs-child">
    <InfoPanel :article="article" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import Canvas from '~/assets/sketch/first'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      Canvas,
      article: articles.first
    }
  },
  mounted() {
    const initCanvas = new this.Canvas()
    initCanvas.render()
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
