import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  Vector2,
  ShaderMaterial,
  Mesh,
  Vector3,
  AmbientLight,
  SpotLight,
  BoxGeometry
} from 'three'
import Stats from 'stats.js'

import vs from './glsl/index.vs'
import one from './glsl/one.fs'
import two from './glsl/two.fs'
import three from './glsl/three.fs'
import four from './glsl/four.fs'
import five from './glsl/five.fs'
import six from './glsl/six.fs'

export default class Canvas {
  constructor() {
    // ==========
    // Define common variables
    //
    this.scene = new Scene()

    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(30, 30, 30)
    this.camera.lookAt(new Vector3(0, 0, 0))

    this.renderer = new WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas')
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(new Color(0x000000))
    this.renderer.shadowMap.enabled = true

    this.stats = Canvas.initStats()
    window.addEventListener('resize', this.onResize.bind(this), false)

    // ==========
    // Define unique variables
    //

    this.cubeGeo = new BoxGeometry(20, 20, 20)
    // this.cubeGeo = new TetrahedronGeometry(20)

    const meshMaterial1 = this.createMaterial(vs, one)
    const meshMaterial2 = this.createMaterial(vs, two)
    const meshMaterial3 = this.createMaterial(vs, three)
    const meshMaterial4 = this.createMaterial(vs, four)
    const meshMaterial5 = this.createMaterial(vs, five)
    const meshMaterial6 = this.createMaterial(vs, six)
    // eslint-disable-next-line no-undef
    this.materials = [
      meshMaterial1,
      meshMaterial2,
      meshMaterial3,
      meshMaterial4,
      meshMaterial5,
      meshMaterial6
    ]

    this.cube = new Mesh(this.cubeGeo, this.materials)

    this.scene.add(this.cube)

    this.ambientLight = new AmbientLight(0x0c0c0c)
    this.scene.add(this.ambientLight)
    this.spotLight = new SpotLight(0xffffff)
    this.spotLight.position.set(-40, 60, -10)
    this.spotLight.castShadow = true
    this.scene.add(this.spotLight)

    this.step = 0
    this.oldContext = null
    this.controls = new (function() {
      this.rotationSpeed = 0.02
      this.bouncingSpeed = 0.03
      this.opacity = meshMaterial1.opacity
      this.transparent = meshMaterial1.transparent
      this.visible = meshMaterial1.visible
      this.side = 'front'
      this.wireframe = meshMaterial1.wireframe
      this.wireframeLinewidth = meshMaterial1.wireframeLinewidth
      this.selectedMesh = 'cube'
      this.shadow = 'flat'
    })()

    this.render()
  }

  createMaterial(vs, fs) {
    const vertex = vs
    const fragment = fs

    const uniforms = {
      time: { type: 'f', value: 0.2 },
      scale: { type: 'f', value: 0.2 },
      alpha: { type: 'f', value: 0.6 },
      resolution: { type: 'v2', value: new Vector2() }
    }

    uniforms.resolution.value.x = window.innerWidth
    uniforms.resolution.value.y = window.innerHeight

    const meshMaterial = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })

    return meshMaterial
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

    this.cube.rotation.y = this.step += 0.001
    this.cube.rotation.x = this.step += 0.001
    this.cube.rotation.z = this.step += 0.001
    this.cube.material.forEach(function(e) {
      e.uniforms.time.value += 0.01
    })

    // 画面に表示
    this.renderer.render(this.scene, this.camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
