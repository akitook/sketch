import * as THREE from 'three'
// ==========
// Define common variables
//

let renderer
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(20, 0, 150)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// ==========
// Define unique variables
//

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
    this.group = {}
    this.step = 0
    this.sphere = null
  }

  init() {
    this.scene = new THREE.Scene()
    this.videoSphere()

    this.render()
  }

  videoSphere() {
    const video = document.getElementById('video')
    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBFormat

    const geo = new THREE.SphereGeometry(40, 32, 32)
    const mat = new THREE.MeshBasicMaterial({
      map: texture
    })
    this.sphere = new THREE.Mesh(geo, mat)
    this.scene.add(this.sphere)
  }
  onResize() {
    window.console.log('onresize')
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.step += 0.005
    this.sphere.rotation.x = this.step
    this.sphere.rotation.y = this.step
    // 画面に表示
    renderer.render(this.scene, camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
