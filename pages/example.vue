<template>
  <canvas id="canvas" />
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    mounted() {
      this.init()
    },
    init() {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      // サイズを指定
      const width = windowWidth
      const height = windowHeight

      // レンダラーを作成
      const renderer = new this.$THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)

      // シーンを作成
      const scene = new this.$THREE.Scene()

      // カメラを作成
      const camera = new this.$THREE.PerspectiveCamera(45, width / height)
      camera.position.set(0, 0, +1500)

      // 箱を作成
      const geometry = new this.$THREE.BoxGeometry(400, 400, 400)
      const material = new this.$THREE.MeshNormalMaterial()
      const box = new this.$THREE.Mesh(geometry, material)
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

<style></style>
