import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'
import { Scene } from 'three/src/scenes/Scene'
import { Mesh } from 'three/src/objects/Mesh'
import {
  AxesHelper,
  BoxGeometry,
  Color,
  MeshLambertMaterial,
  PlaneGeometry,
  SphereGeometry,
  SpotLight
} from 'three'
import Stats from 'stats.js'

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth
    this.h = window.innerHeight

    // レンダラーを作成
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas')
    })

    this.renderer.setSize(this.w, this.h) // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio) // ピクセル比
    this.renderer.setClearColor(new Color(0xeeeeee))
    this.renderer.shadowMap.enabled = true
    // シーンを作成
    this.scene = new Scene()

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(45, this.w / this.h, 0.1, 1000)
    this.camera.position.set(-30, 40, 30)
    // sceneのデフォルト(0,0,0)を向く
    this.camera.lookAt(this.scene.position)

    this.axes = new AxesHelper(20)

    this.scene.add(this.axes)

    const geo = new PlaneGeometry(60, 20)
    const mat = new MeshLambertMaterial({ color: 0xcccccc })
    const plane = new Mesh(geo, mat)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    this.scene.add(plane)

    const cubeGeo = new BoxGeometry(4, 4, 4)
    const cubeMat = new MeshLambertMaterial({
      color: 0xff0000
    })
    this.cube = new Mesh(cubeGeo, cubeMat)
    this.cube.castShadow = true
    this.cube.position.x = -4
    this.cube.position.y = 3
    this.cube.position.z = 0
    this.scene.add(this.cube)

    const sphereGeo = new SphereGeometry(4, 20, 20)
    const sphereMat = new MeshLambertMaterial({
      color: 0x7777ff
    })
    this.sphere = new Mesh(sphereGeo, sphereMat)
    this.sphere.castShadow = true
    this.sphere.position.x = 20
    this.sphere.position.y = 4
    this.sphere.position.z = 2

    this.scene.add(this.sphere)
    this.step = 0
    // 平行光源
    const spotLight = new SpotLight(0xffffff)
    spotLight.castShadow = true
    spotLight.position.set(-20, 30, -5)
    // シーンに追加
    this.scene.add(spotLight)

    this.stats = Canvas.initStats()

    this.controls = new (function() {
      this.rotationSpeed = 0.02
      this.bouncingSpeed = 0.03
    })()
    // 描画ループ開始
    this.render()

    // リサイズでonTesizeを発火。イベントリスナなのでthisをbindしておく
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  static initStats() {
    const stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.getElementById('stats-output').appendChild(stats.domElement)
    return stats
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.stats.update()
    this.cube.rotation.x += this.controls.rotationSpeed
    this.cube.rotation.y += this.controls.rotationSpeed
    this.cube.rotation.z += this.controls.rotationSpeed

    this.step += this.controls.bouncingSpeed
    this.sphere.position.x = 20 + 10 * Math.cos(this.step)
    this.sphere.position.y = 2 + 10 * Math.abs(Math.sin(this.step))
    // 画面に表示
    this.renderer.render(this.scene, this.camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
