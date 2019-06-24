import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'
import { Scene } from 'three/src/scenes/Scene'
import { Mesh } from 'three/src/objects/Mesh'
import {
  DirectionalLight,
  MeshLambertMaterial,
  SphereGeometry,
  TextureLoader
} from 'three'
import * as url from './assets/moonmap1k.jpg'

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

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(60, this.w / this.h, 1, 10000)
    this.camera.position.set(0, 0, +1000) // カメラを遠ざける

    // シーンを作成
    this.scene = new Scene()

    // 球体を作成
    const geo = new SphereGeometry(300, 30, 30)

    // 画像の読み込み
    const loader = new TextureLoader()
    const texture = loader.load(url)

    // マテリアルを作成
    const mat = new MeshLambertMaterial({ map: texture })

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new Mesh(geo, mat)

    // メッシュをシーンに追加
    this.scene.add(this.mesh)

    // 平行光源
    const directionalLight = new DirectionalLight(0xffffff, 1)
    directionalLight.position.set(-1, -0.8, -0.2)
    // シーンに追加
    this.scene.add(directionalLight)

    // 描画ループ開始
    // this.render()
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000

    // 1秒で5° = 180 / 36 回転する
    this.mesh.rotation.y = sec * (Math.PI / 36)

    // 画面に表示
    this.renderer.render(this.scene, this.camera)
  }
}
