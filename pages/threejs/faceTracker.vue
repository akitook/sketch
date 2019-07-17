<template>
  <div class="faceTracker">
    <InfoPanel :article="article" />
    <div class="visual">
      <div class="video-container">
        <video
          id="video"
          class="video"
          preload="auto"
          loop
          playsinline
          autoplay
          :width="vw"
          :height="vh"
          :style="`top: ${vy}px; left: ${vx}px;`"
        ></video>
        <canvas
          id="overlay"
          class="canvas"
          :width="vw"
          :height="vh"
          :style="`top: ${vy}px; left: ${vx}px;`"
        ></canvas>
      </div>
    </div>
    <div id="dat" class="dat" />
    <canvas id="threejs-canvas" class="threejs-canvas" />
  </div>
</template>

<script>
import clm from 'clmtrackr'
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import EmotionClassifier from '~/assets/sketch/faceTracker/EmotionClassifier'
import { emotionModel } from '~/assets/sketch/faceTracker/emotionModel'
import Canvas from '~/assets/sketch/faceTracker/'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      video: null,
      vw: 0,
      vh: 0,
      vx: 0,
      vy: 0,
      overlay: null,
      overlayCC: null,
      ctrack: null,
      trackingStarted: false,
      classifier: null,
      animationFrame: false,
      article: articles.faceTracker,
      threeCanvas: null
    }
  },
  mounted() {
    this.video = document.getElementById('video')
    this.overlay = document.getElementById('overlay')
    this.overlayCC = this.overlay.getContext('2d')

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL

    // set up video
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: { faingMode: 'user' }, audio: false })
        .then(this.gumSuccess)
        .catch(this.gumFail)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, this.gumSuccess, null)
    } else {
      alert(
        'Your browser does not seem to support getUserMedia, using a fallback video instead.'
      )
    }
    // eslint-disable-next-line new-cap
    this.ctrack = new clm.tracker({
      faceDetection: {
        useWebWorkers: false
      }
    })
    this.ctrack.init()
    this.trackingStarted = false
    this.threeCanvas = new Canvas()
    this.startVideo()
  },
  destroyed() {
    window.console.log('destroyed')
    const tracks = this.video.srcObject.getTracks()
    tracks.forEach(track => {
      track.stop()
    })
    cancelAnimationFrame(this.animationFrame)
    this.video.srcObject = null
    this.trackingStarted = false
    this.video.src = null
    this.ctrack = null

    this.threeCanvas.scene.remove(this.threeCanvas.scene.children)
    this.threeCanvas.scene.children.length = 0
    this.threeCanvas = false
  },
  methods: {
    adjustVideoProportions() {
      const trimSize = 480
      if (this.video.videoWidth > this.video.videoHeight) {
        this.vh = trimSize
        this.vw = this.video.videoWidth * (trimSize / this.video.videoHeight)
        this.vx = -(this.vw - trimSize) / 2
        this.vy = 0
      } else {
        this.vw = trimSize
        this.vh = this.video.videoHeight * (trimSize / this.video.videoHeight)
        this.vy = -(this.vh - trimSize) / 2
        this.vx = 0
      }
    },
    gumSuccess(stream) {
      // add camera stream if getUserMedia succeeded
      if ('srcObject' in this.video) {
        this.video.srcObject = stream
      } else {
        this.video.src = window.URL && window.URL.createObjectURL(stream)
      }
      this.video.onloadedmetadata = () => {
        this.adjustVideoProportions()
      }
      this.video.onresize = () => {
        this.adjustVideoProportions()
        if (this.trackingStarted) {
          this.ctrack.stop()
          this.ctrack.reset()
          this.ctrack.start(this.video)
        }
      }
    },
    startVideo() {
      // start video
      // start tracking
      this.ctrack.start(this.video)
      this.trackingStarted = true

      this.classifier = new EmotionClassifier()
      this.classifier.init(emotionModel)
      // start loop to draw face
      this.drawLoop()
    },
    drawLoop() {
      this.animationFrame = requestAnimationFrame(this.drawLoop)
      this.overlayCC.clearRect(0, 0, this.vw, this.vh)
      if (this.ctrack.getCurrentPosition()) {
        this.ctrack.draw(this.overlay)
      }
      const cp = this.ctrack.getCurrentParameters()
      const emo = this.classifier.meanPredict(cp)

      this.showEmotionData(emo)
      const happyScore = emo ? Number(emo[5].value) : 0.5
      this.threeCanvas.render(happyScore)
    },
    showEmotionData(emo) {
      let str = ''
      for (let i = 0; i < emo.length; i++) {
        str += emo[i].emotion + ': ' + emo[i].value.toFixed(1) + '<br>'
      }
      const dat = document.getElementById('dat')
      dat.innerHTML = str
    }
  }
}
</script>

<style scoped lang="scss">
.faceTracker {
}
.visual {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.video-container {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 300px;
  border-radius: 150px;
}
.video {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.threejs-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.start-button {
  display: block;
  width: 300px;
  padding: 24px 48px;
  top: 50%;
  left: calc(50% - 150px);
}
.dat {
  position: absolute;
  top: 0;
  left: 0;
}
.gui-input {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
@media screen and (min-width: 768px) {
  .video-container {
    width: 480px;
    height: 480px;
    border-radius: 240px;
  }
}
</style>
