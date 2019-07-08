import * as clmtrackr from 'clmtrackr'

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
      canvas: document.querySelector('#threejs-canvas')
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    this.group = {}
    this.step = 0
  }

  init() {
    this.scene = new THREE.Scene()
    renderer.setClearColor(new THREE.Color(0x000000, 1))

    this.createSprites()

    this.render()
  }

  createSprites() {
    this.group = new THREE.Object3D()
    const range = 200
    // 6 x 6の組み合わせを10回まわす
    for (let h = 0; h < 10; h++) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          this.group.add(this.createSprite(8, false, 1, 0xffffff, i, j, range))
        }
      }
    }
    this.scene.add(this.group)
  }

  getTexture() {
    const loader = new THREE.TextureLoader()
    return loader.load('/sketch/assets/textures/sns-sprite.png')
  }

  createSprite(
    size,
    transparent,
    opacity,
    color,
    spriteNumberX,
    spriteNumberY,
    range
  ) {
    const spriteMaterial = new THREE.SpriteMaterial({
      opacity: opacity,
      color: color,
      map: this.getTexture()
    })
    // スプライトは6行6列
    spriteMaterial.map.offset = new THREE.Vector2(
      0.16666667 * spriteNumberX,
      0.16666667 * spriteNumberY
    )
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 6, 1 / 6)
    // オブジェクトは全面に表示
    spriteMaterial.depthTest = false

    spriteMaterial.blending = THREE.AdditiveBlending

    const sprite = new THREE.Sprite(spriteMaterial)
    sprite.scale.set(size, size, size)
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2
    )
    sprite.velocityX = 5
    return sprite
  }
  onResize() {
    window.console.log('onresize')
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    this.step += 0.005
    this.group.rotation.x = this.step
    this.group.rotation.y = this.step
    // 画面に表示
    renderer.autoClear = false
    renderer.render(this.scene, camera)
    // 次のフレームを要求
    requestAnimationFrame(() => {
      this.render()
    })
  }
}
