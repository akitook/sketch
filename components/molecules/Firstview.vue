<template>
  <div class="Firstview">
    <canvas id="firstview-canvas" class="canvas"></canvas>
    <div class="text">
      <h1 class="title">Akito Okubo</h1>
      <p class="subtitle">Front end developer</p>
      <ul class="link">
        <li><a href="https://github.com/akitook">GitHub</a></li>
        <li><a href="https://www.instagram.com/akito.okubo/">Instagram</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
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
        canvas: document.querySelector('#firstview-canvas'),
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
.Firstview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.text {
  z-index: 1;
  text-align: center;
}
.title {
  font-size: 48px;
}
.subtitle {
  font-size: 24px;
  color: $dark-054;
}
.link {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    padding: 8px;
    a {
      color: $dark-087;
    }
  }
}
</style>
