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
    return {
      scrollY: 0
    }
  },
  mounted() {
    this.init()
    /*
    window.addEventListener('mousemove', e => {
      this.mouseMoved(e.clientX, e.clientY)
    })
    */
    window.addEventListener('scroll', e => {
      this.scrolled(window.scrollY)
    })
  },
  methods: {
    init() {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const width = windowWidth
      const height = windowHeight

      const renderer = new this.$THREE.WebGLRenderer({
        canvas: document.querySelector('#firstview-canvas'),
        alpha: true
      })
      renderer.shadowMap.enabled = true
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      const scene = new this.$THREE.Scene()

      const camera = new this.$THREE.PerspectiveCamera(90, width / height)
      camera.position.set(0, 0, 1000)

      const geometry = new this.$THREE.BoxGeometry(400, 400, 400)
      const material = new this.$THREE.MeshNormalMaterial()
      const box = new this.$THREE.Mesh(geometry, material)
      box.castshadow = true
      scene.add(box)
      const tick = () => {
        const scaleRate = this.scrollY * 0.001 + 1
        if (scaleRate < 2.5) {
          box.rotation.y += 0.01
          box.rotation.z += 0.01

          box.scale.x = scaleRate
          box.scale.y = scaleRate
          box.scale.z = scaleRate
        } else {
          box.rotation.y += 0.005
          box.rotation.z += 0.005

          box.scale.x = 2.5
          box.scale.y = 2.5
          box.scale.z = 2.5
        }

        renderer.render(scene, camera)

        requestAnimationFrame(tick)
      }
      tick()
    },
    scrolled(y) {
      this.scrollY = y
    },
    mouseMoved() {
      window.console.log('mouse moved.')
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.text {
  z-index: 1;
  text-align: center;
}
.title {
  font-size: 48px;
  font-weight: 500;
}
.subtitle {
  font-size: 24px;
  color: $dark-054;
  font-weight: 300;
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
