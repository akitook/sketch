<template>
  <div class="threejs-child">
    <div id="stats-output" />
    <div id="gui-output" class="gui-input" />
    <InfoPanel :article="article" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import * as dat from 'dat.gui'
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import Canvas from '~/assets/sketch/learningThreejs01'

export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      initCanvas: false,
      gui: false,
      article: articles.learningThreejs01
    }
  },
  mounted() {
    this.gui = new dat.GUI({ autoPlace: false })
    this.initCanvas = new Canvas()
    this.gui.add(this.initCanvas.controls, 'rotationSpeed', 0, 0.5)
    this.gui.add(this.initCanvas.controls, 'bouncingSpeed', 0, 0.5)
    document.getElementById('gui-output').appendChild(this.gui.domElement)
  },
  destroyed() {
    this.initCanvas.scene.remove(this.initCanvas.scene.children)
    this.initCanvas.scene.children.length = 0
    this.initCanvas = false
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
