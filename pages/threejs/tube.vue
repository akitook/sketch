<template>
  <div class="threejs-child">
    <div id="stats-output" />
    <InfoPanel :article="article" />
    <div id="gui-output" class="gui-input" />
    <canvas id="threejs-canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import * as dat from 'dat.gui'
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import Canvas from '~/assets/sketch/tube'

export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      initCanvas: false,
      gui: false,
      article: articles.tube
    }
  },
  mounted() {
    this.initCanvas = new Canvas()
    this.initCanvas.init()
    this.gui = new dat.GUI({ autoPlace: false })
    this.gui
      .add(this.initCanvas.controls, 'radius', 0, 40)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'tube', 0, 40)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'radialSegments', 0, 400)
      .step(1)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'tubularSegments', 1, 20)
      .step(1)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'p', 1, 10)
      .step(1)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'q', 1, 15)
      .step(1)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'scale', 0, 5)
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))
    this.gui
      .add(this.initCanvas.controls, 'asParticles')
      .onChange(this.initCanvas.redraw.bind(this.initCanvas))

    document.getElementById('gui-output').appendChild(this.gui.domElement)
    window.addEventListener('resize', this.initCanvas.onResize(), false)
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
