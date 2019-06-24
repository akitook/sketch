import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'
import { Scene } from 'three/src/scenes/Scene'
import { Mesh } from 'three/src/objects/Mesh'
import {
  DirectionalLight,
  DoubleSide,
  Geometry,
  MeshLambertMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
  TextureLoader,
  Vector3
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as url from './assets/earthmap1k.jpg'

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth
    this.h = window.innerHeight
    // 角度
    this.rotX = 0
    this.rotY = 0
    // マウス座標
    this.mouseX = 0
    this.mouseY = 0

    // レンダラーを作成
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas')
    })
    this.renderer.setSize(this.w, this.h) // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio) // ピクセル比

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(60, this.w / this.h, 1, 10000)
    this.camera.position.set(0, 0, +1000) // カメラを遠ざける
    // カメラコントローラーを作成
    this.controls = new OrbitControls(this.camera)
    // 滑らかにカメラコントローラーを制御する
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.2

    // シーンを作成
    this.scene = new Scene()

    // 球体を作成
    const geo = new SphereGeometry(300, 30, 30)

    // 画像の読み込み
    const loader = new TextureLoader()
    const texture = loader.load(url)

    // マテリアルを作成
    const mat = new MeshLambertMaterial({ map: texture, side: DoubleSide })

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new Mesh(geo, mat)

    // メッシュをシーンに追加
    this.scene.add(this.mesh)

    // 平行光源
    const directionalLight = new DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    // シーンに追加
    this.scene.add(directionalLight)

    // 星屑
    this.createStarField()

    // マウス座標はマウスが動いた時のみ取得できる
    document.addEventListener('mousemove', event => {
      this.mouseX = event.pageX
      this.mouseY = event.pageY
    })

    // 描画ループ開始
    // this.render()
  }

  render() {
    // マウスの位置に応じて角度を設定
    // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    const targetRotX = (this.mouseX / window.innerWidth) * 360
    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    this.rotX += (targetRotX - this.rotX) * 0.02

    const targetRotY = (this.mouseY / window.innerHeight) * 360
    this.rotY += (targetRotY - this.rotY) * 0.02

    // ラジアンに変換する
    const radianX = (this.rotX * Math.PI) / 180
    const radianY = (this.rotY * Math.PI) / 180

    // 角度に応じてカメラの位置を設定
    this.camera.position.x = 1000 * Math.sin(radianX)
    this.camera.position.z = 1000 * Math.cos(radianX)
    this.camera.position.y = 1000 * Math.sin(radianY)
    // カメラコントローラーを更新
    this.controls.update()
    // 原点方向を見つめる
    this.camera.lookAt(new Vector3(0, 0, 0))
    // ミリ秒から秒に変換
    const sec = performance.now() / 1000

    // 1秒で5° = 180 / 36 回転する
    this.mesh.rotation.y = sec * (Math.PI / 36)

    // 画面に表示
    this.renderer.render(this.scene, this.camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }

  createStarField() {
    // 形状データを作成
    const geo = new Geometry()
    for (let i = 0; i < 1000; i++) {
      geo.vertices.push(
        new Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      )
    }
    // マテリアルを作成
    const mat = new PointsMaterial({
      size: 10,
      color: 0xffffff
    })
    // 物体を作成
    const mesh = new Points(geo, mat)
    this.scene.add(mesh)
  }
}
