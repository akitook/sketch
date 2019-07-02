import {
  Color,
  DirectionalLight,
  FontLoader,
  Group,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  TextGeometry,
  Vector3,
  WebGLRenderer
} from 'three'

export default class Canvas {
  constructor() {
    this.fonts = []
    this.loadFonts()
  }

  loadFonts() {
    const fontLoader = new FontLoader()
    fontLoader.load('/assets/fonts/pupupu-free.json', pupupu => {
      this.fonts.pupupu = pupupu
      this.init()
    })
  }

  init() {
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(100, 200, 350)
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas')
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(new Color(0xffffff))
    this.renderer.shadowMap.enabled = true

    window.addEventListener('resize', this.onResize.bind(this), false)

    // ==========
    // Define unique variables
    //

    const dirLight = new DirectionalLight()
    dirLight.position.set(25, 23, 15)
    this.scene.add(dirLight)

    const dirLight2 = new DirectionalLight()
    dirLight2.position.set(-25, 23, 15)
    this.scene.add(dirLight2)

    this.options = {
      size: 90,
      height: 90,
      weight: 'normal',
      font: this.fonts.pupupu,
      bevelThickness: 10,
      bevelSegments: 1,
      bevelEnabled: true,
      curveSegments: 20,
      steps: 1
    }

    this.text1 = this.createMesh(new TextGeometry('ギラギラ', this.options))
    this.text1.position.x = -220
    this.text1.position.z = 0
    this.text1.position.y = 0
    this.scene.add(this.text1)

    this.step = 0

    this.render()
  }

  createMesh(geom) {
    const meshMaterial = new MeshPhongMaterial({
      specular: 0xffffff,
      color: 0xb58a1e,
      shininess: 30
    })
    return this.createMultiMaterialObject(geom, [meshMaterial])
  }

  createMultiMaterialObject(geometry, materials) {
    const group = new Group()
    for (let i = 0, l = materials.length; i < l; i++) {
      group.add(new Mesh(geometry, materials[i]))
    }

    return group
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.text1.rotation.x = this.step += 0.01
    // 画面に表示
    this.renderer.render(this.scene, this.camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
