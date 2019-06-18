<template>
  <div class="threejs-child">
    <canvas id="threejs-canvas" class="canvas"></canvas>
    <div class="info" :class="`bg-${article.bg}`">
      <h1 class="info-title">{{ article.title }}</h1>
      <p class="info-desc">{{ article.desc }}</p>
      <time class="info-date" :datetime="article.date"
        >posted: {{ article.date }}</time
      >
      <div class="info-category">#{{ article.category }}</div>
      <div class="back-button"><nuxt-link to="/">← HOME</nuxt-link></div>
    </div>
  </div>
</template>

<script>
import articles from '~/assets/json/articles.json'
export default {
  components: {},
  data() {
    return {}
  },
  asyncData({ params }) {
    return {
      article: articles[params.id]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      // サイズを指定
      const width = windowWidth
      const height = windowHeight

      // レンダラーを作成
      const renderer = new this.$THREE.WebGLRenderer({
        canvas: document.querySelector('#threejs-canvas'),
        alpha: true
      })
      renderer.shadowMap.enabled = true
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      // シーンを作成
      const scene = new this.$THREE.Scene()

      // カメラを作成
      const camera = new this.$THREE.PerspectiveCamera(90, width / height)
      camera.position.set(0, 0, 1000)

      // 箱を作成
      const geometry = new this.$THREE.BoxGeometry(400, 400, 400)
      const material = new this.$THREE.MeshNormalMaterial()
      const box = new this.$THREE.Mesh(geometry, material)
      box.castshadow = true
      scene.add(box)
      tick()
      // 毎フレーム時に実行されるループイベントです
      function tick() {
        box.rotation.y += 0.01
        box.rotation.z += 0.01
        renderer.render(scene, camera) // レンダリング

        requestAnimationFrame(tick)
      }
    }
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
.info {
  position: absolute;
  bottom: 48px;
  left: 48px;
  max-width: 640px;
  z-index: 1;
  &.bg-white {
    color: $dark-087;
    .info-category {
      color: $dark-054;
    }
    .back-button {
      a {
        color: $dark-087;
        border-color: $dark-087;
      }
    }
  }
  &.bg-black {
    color: $light-100;
    .info-category {
      color: $light-070;
    }
    .back-button {
      a {
        color: $light-100;
        border-color: $light-100;
      }
    }
  }
}
.info-title {
  font-size: 64px;
  letter-spacing: -2px;
}
.info-category {
  font-size: 14px;
  margin-bottom: 16px;
}
.info-desc {
  font-size: 14px;
  margin-bottom: 6px;
}
.info-date {
  font-size: 14px;
  display: block;
  margin-bottom: 6px;
}
.back-button {
  z-index: 1;
  a {
    font-size: 14px;
    display: inline-block;
    padding: 4px 16px;
    text-decoration: none;
    border: 1px solid $light-100;
    border-radius: 16px;
  }
}
</style>
