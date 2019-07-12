import * as THREE from 'three'
import vs from './glsl/background.vs'
import fs from './glsl/background.fs'

export default class Background {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
      force: {
        type: 'f',
        value: 0
      }
    }
    this.obj = null
  }

  createObj() {
    const geometry = new THREE.SphereBufferGeometry(
      150,
      128,
      128,
      0,
      6.3,
      0,
      1.6
    )
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide
    })

    this.obj = new THREE.Mesh(geometry, material)
    const radians = (-90 * Math.PI) / 180
    this.obj.rotation.set(radians, 0, 0)
  }

  render(time, force) {
    this.uniforms.force.value = force
    this.uniforms.time.value -= time * 1000 * (force * 8)
  }
}
