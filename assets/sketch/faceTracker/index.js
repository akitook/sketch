import * as THREE from 'three'
import Background from './Background'
import Points from './Points'
// ==========
// Define common variables
//
let renderer
const clock = new THREE.Clock({ autoStart: false })
// ==========
// Define unique variables
//
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// ==========
// Define functions
//

export default class Canvas {
  constructor() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas'),
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xeeeeee, 1.0)
    this.scene = new THREE.Scene()

    camera.position.set(0, 0, 100)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.step = 0
    this.sphere = null
    clock.start()
    this.time = clock.getDelta()
    this.bg = new Background()
    this.bg.createObj()
    this.scene.add(this.bg.obj)

    this.points = new Points()
    this.points.createObj()
    this.scene.add(this.points.obj)
  }

  render(happy) {
    // const landmarks = ctrack.getCurrentPosition()
    this.bg.render(this.time, happy)
    this.points.render(this.time, happy)
    renderer.render(this.scene, camera)
  }

  renderLoop = async () => {
    this.step += 0.005
    await this.render()
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.renderLoop()
    })
  }
}
