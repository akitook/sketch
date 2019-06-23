import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer'
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera'
import { Scene } from 'three/src/scenes/Scene'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry'
import { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial'
import { Mesh } from 'three/src/objects/Mesh'

export default class Canvas {
  constructor() {
    // ウィンドウサイズ
    this.w = window.innerWidth
    this.h = window.innerHeight

    // レンダラーを作成
    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas'),
      alpha: true
    })
    this.renderer.setSize(this.w, this.h) // 描画サイズ
    this.renderer.setPixelRatio(window.devicePixelRatio) // ピクセル比

    // カメラを作成 (視野角, 画面のアスペクト比, カメラに映る最短距離, カメラに映る最遠距離)
    this.camera = new PerspectiveCamera(60, this.w / this.h, 1, 10)
    this.camera.position.z = 3 // カメラを遠ざける

    // シーンを作成
    this.scene = new Scene()

    // 立方体のジオメトリを作成(幅, 高さ, 奥行き)
    const geo = new BoxGeometry(1, 1, 1)

    // マテリアルを作成
    const mat = new MeshNormalMaterial()

    // ジオメトリとマテリアルからメッシュを作成
    this.mesh = new Mesh(geo, mat)

    // メッシュをシーンに追加
    this.scene.add(this.mesh)

    // 描画ループ開始
    this.render()
  }

  render() {
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })

    // ミリ秒から秒に変換
    const sec = performance.now() / 1000

    // 1秒で30° = 180 / 6 回転する
    this.mesh.rotation.y = sec * (Math.PI / 6)
    this.mesh.rotation.z = sec * (Math.PI / 6)

    // 画面に表示
    this.renderer.render(this.scene, this.camera)
  }
}
