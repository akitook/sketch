import * as THREE from 'three'
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
// ==========
// Define common variables
//

let renderer

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

camera.position.set(20, 0, 2000)
camera.lookAt(new THREE.Vector3(0, 0, 300))
// ==========
// Define unique variables
//

let mouseX = 0
let mouseY = 0
let rotX = 0
let rotY = 0

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
    this.step = 0
    this.mouseX = 0
    this.mouseY = 0
  }

  init() {
    this.scene = new THREE.Scene()
    document.addEventListener('mousemove', this.onMouseMove, false)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
    this.scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 0.01)
    camera.add(pointLight)
    this.scene.add(camera)
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      '/sketch/assets/textures/Tokyo_BigSight_preview.jpg',
      texture => {
        texture.mapping = THREE.UVMapping
        this.meshLoad(texture)
      }
    )
  }

  meshLoad(texture) {
    const geo = new THREE.SphereGeometry(505, 32, 16)
    geo.scale(-1, 1, 1)
    const mat = new THREE.MeshBasicMaterial({
      map: texture
    })
    const sphere = new THREE.Mesh(geo, mat)
    this.scene.add(sphere)
    THREE.Loader.Handlers.add(/\.dds$/i, new DDSLoader())
    const mtLoader = new MTLLoader()
    mtLoader.load('/sketch/assets/models/male02/male02.mtl', materials => {
      materials.preload()
      new OBJLoader().setMaterials(materials).load(
        '/sketch/assets/models/male02/male02.obj',
        object => {
          object.position.y = -500
          object.scale.x = 3.6
          object.scale.y = 3.6
          object.scale.z = 3.6
          this.scene.add(object)
        },
        function(xhr) {
          if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100
            window.console.log(Math.round(percentComplete, 2) + '% downloaded')
          }
        },
        function() {}
      )
    })
    this.render()
  }

  onMouseMove(e) {
    mouseX = (e.clientX - window.innerWidth / 2) / 2
    mouseY = (e.clientY - window.innerHeight / 2) / 2
  }

  onResize() {
    window.console.log('onresize')
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.step += 1
    // マウスの位置に応じて角度を設定
    // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    const targetRotX = (mouseX / window.innerWidth) * 360
    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    rotX += (targetRotX - rotX) * 0.02

    const targetRotY = (mouseY / window.innerHeight) * 360
    rotY += (targetRotY - rotY) * 0.02

    // ラジアンに変換する
    const radianX = (rotX * Math.PI) / 180
    const radianY = (rotY * Math.PI) / 180

    // 角度に応じてカメラの位置を設定
    camera.position.x = 500 * Math.sin(radianX)
    camera.position.z = 500 * Math.cos(radianX)
    camera.position.y = 500 * Math.sin(radianY)

    camera.lookAt(this.scene.position)
    // 画面に表示
    renderer.render(this.scene, camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
