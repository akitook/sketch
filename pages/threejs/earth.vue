<template>
  <div class="threejs-child">
    <InfoPanel :article="article" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import Canvas from '~/assets/sketch/earth'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      initCanvas: null,
      article: articles.earth
    }
  },
  mounted() {
    this.initCanvas = new Canvas()
    this.initCanvas.render()
  },
  destroyed() {
    this.initCanvas.scene.remove(this.initCanvas.scene.children)
    this.initCanvas.scene.children.length = 0
    this.initCanvas = false
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
