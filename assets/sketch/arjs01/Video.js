import * as THREE from 'three'
import vs from './glsl/background.vs'
import fs from './glsl/background.fs'

export default class Video {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
      force: {
        type: 'f',
        value: 0
      },
      textureVideo: {
        type: 't',
        value: 0
      },
      facing: {
        type: 'f',
        value: 0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2()
      }
    }
    this.obj = null
  }

  createObj(w) {
    window.console.log(webcam)
    const geometry = new THREE.PlaneBufferGeometry(50, 50, 2, 2)
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide
    })

    const videoTexture = new THREE.VideoTexture(webcam)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBFormat
    this.uniforms.textureVideo.value = videoTexture
    this.uniforms.facing.value = webcam.facingMode === 'user' ? 1 : 0
    this.uniforms.resolution.value.set(webcam.resolution.x, webcam.resolution.y)

    this.obj = new THREE.Mesh(geometry, material)
    const radians = (-90 * Math.PI) / 180
    this.obj.rotation.set(radians, 0, 0)
  }

  render(time, force) {
    this.uniforms.force.value = force
    this.uniforms.time.value -= time * 5000 * (force * 8)
  }
}
