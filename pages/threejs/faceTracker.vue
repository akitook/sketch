<template>
  <div class="wrapper">
    <InfoPanel :article="article" />
    <div class="container">
      <video
        id="video"
        class="video"
        :width="videoWidth"
        :height="videoHeight"
        preload="auto"
        loop
        playsinline
        autoplay
      ></video>
      <canvas
        id="overlay"
        class="canvas"
        :width="videoWidth"
        :height="videoHeight"
      ></canvas>
    </div>
    <input
      id="start-button"
      class="start-button"
      type="button"
      @click="startVideo()"
    />
  </div>
</template>

<script>
import InfoPanel from '~/components/molecules/InfoPanel'
import articles from '~/assets/json/articles.json'
import clm from 'clmtrackr'
export default {
  components: {
    InfoPanel
  },
  data() {
    return {
      video: null,
      videoWidth: 0,
      videoHeight: 0,
      overlay: null,
      overlayCC: null,
      ctrack: null,
      trackingStarted: false,
      article: articles.faceTracker
    }
  },
  mounted() {
    window.console.log(window.innerWidth)

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
        .getUserMedia({ video: true })
        .then(this.gumSuccess)
        .catch(this.gumFail)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, this.gumSuccess, null)
    } else {
      alert(
        'Your browser does not seem to support getUserMedia, using a fallback video instead.'
      )
    }
    this.video.addEventListener('canplay', this.enablestart, false)

    // eslint-disable-next-line new-cap
    this.ctrack = new clm.tracker({
      faceDetection: {
        useWebWorkers: false
      }
    })
    this.ctrack.init()
    this.trackingStarted = false
  },
  beforeDestroy() {
    window.console.log('destroyed')
    window.console.log(this.video.srcObject)
    const tracks = this.video.srcObject.getTracks()
    tracks.forEach(track => {
      track.stop()
    })
    const cancel = window.requestAnimationFrame(this.drawLoop)
    window.cancelAnimationFrame(cancel)
    this.video.srcObject = null
    this.trackingStarted = false
    this.video.src = null
    this.ctrack = null
  },
  methods: {
    enablestart() {
      const startbutton = document.getElementById('start-button')
      startbutton.value = 'start'
      startbutton.disabled = null
    },
    adjustVideoProportions() {
      const trimSize = 640
      window.innerWidth > trimSize
        ? (this.videoWidth = trimSize)
        : (this.videoWidth = window.innerWidth)

      window.innerHeight > trimSize
        ? (this.videoHeight = trimSize)
        : (this.videoHeight = window.innerHeight)

      // const proportion = this.video.videoWidth / this.video.videoHeight
      // this.videoWidth = Math.round(this.videoHeight * proportion)
      this.video.width = this.videoWidth
      this.overlay.width = this.videoWidth
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
        this.video.play()
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
      this.video.play()
      // start tracking
      this.ctrack.start(this.video)
      this.trackingStarted = true
      // start loop to draw face
      this.drawLoop()
    },
    drawLoop() {
      requestAnimationFrame(this.drawLoop)
      this.overlayCC.clearRect(0, 0, this.videoWidth, this.videoHeight)
      if (this.ctrack.getCurrentPosition()) {
        this.ctrack.draw(this.overlay)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
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
.start-button {
  display: block;
  width: 300px;
  padding: 24px 48px;
  top: 50%;
  left: calc(50% - 150px);
}
.gui-input {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
</style>
