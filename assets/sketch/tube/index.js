import * as THREE from 'three'
import Stats from 'stats.js'
// ==========
// Define common variables
//

let renderer, scene
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(-30, 40, 50)
camera.lookAt(new THREE.Vector3(10, 0, 0))

// ==========
// Define unique variables
//

// ==========
// Define functions
//

export default class Canvas {
  constructor() {
    this.stats = Canvas.initStats()
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#threejs-canvas')
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    this.group = {}
    this.step = 0
    this.knot = false
    this.controls = new (function() {
      // we need the first child, since it's a multimaterial
      this.radius = 13
      this.tube = 1.7
      this.radialSegments = 156
      this.tubularSegments = 12
      this.p = 5
      this.q = 4
      this.scale = 1
      this.asParticles = true
    })()
  }
  redraw() {
    // remove the old plane
    if (this.knot) scene.remove(this.knot)
    // create a new one
    const geom = new THREE.TorusKnotGeometry(
      this.controls.radius,
      this.controls.tube,
      Math.round(this.controls.radialSegments),
      Math.round(this.controls.tubularSegments),
      Math.round(this.controls.p),
      Math.round(this.controls.q)
    )
    geom.scale(this.controls.scale, 1, 1)

    if (this.controls.asParticles) {
      this.knot = this.createPointCloud(geom)
    } else {
      this.knot = this.createMesh(geom)
    }

    // add it to the scene.
    scene.add(this.knot)
  }
  init() {
    scene = new THREE.Scene()
    renderer.setClearColor(0x000000, 1)
    this.redraw()
    this.render()
  }

  generateSprite() {
    const canvas = document.createElement('canvas')
    canvas.width = 8
    canvas.height = 8

    const context = canvas.getContext('2d')
    const gradient = context.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)')
    gradient.addColorStop(1, 'rgba(0,0,0,1)')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
  }

  createPointCloud(geom) {
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: this.generateSprite()
    })

    const cloud = new THREE.Points(geom, material)
    cloud.sortParticles = true
    return cloud
  }

  createMesh(geom) {
    // assign two materials
    const meshMaterial = new THREE.MeshNormalMaterial({})
    meshMaterial.side = THREE.DoubleSide

    // create a multimaterial
    const mesh = this.createMultiMaterialObject(geom, [meshMaterial])

    return mesh
  }

  createMultiMaterialObject(geometry, materials) {
    const group = new THREE.Group()

    for (let i = 0, l = materials.length; i < l; i++) {
      group.add(new THREE.Mesh(geometry, materials[i]))
    }

    return group
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
    window.console.log('onresize')
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.stats.update()
    this.knot.rotation.y = this.step += 0.01

    renderer.render(scene, camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
