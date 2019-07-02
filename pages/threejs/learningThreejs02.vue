<template>
  <div class="threejs-child">
    <div id="stats-output" />
    <div id="gui-output" class="gui-input" />
    <InfoPanel :article="article" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import Canvas from '~/assets/sketch/learningThreejs02'

export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      initCanvas: false,
      gui: false,
      article: articles.learningThreejs02
    }
  },
  mounted() {
    this.initCanvas = new Canvas()
  },
  methods: {}
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
.gui-input {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
