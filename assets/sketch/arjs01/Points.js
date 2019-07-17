import * as THREE from 'three'
import vs from './glsl/points.vs'
import fs from './glsl/points.fs'
export default class Points {
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
    const geometry = new THREE.BufferGeometry()
    const positions = []
    const delays = []
    for (let i = 0; i < 1000; i += 3) {
      const radius = Math.random() * Math.random() * 60
      const radian = (Math.random() * 360 * Math.PI) / 180
      positions[i + 0] = Math.cos(radian) * radius
      positions[i + 1] = Math.sin(radian) * radius
      positions[i + 2] = 0
      delays[i / 3] = Math.random() * 8
    }
    const baPositions = new THREE.BufferAttribute(
      new Float32Array(positions),
      3
    )
    const baDelays = new THREE.BufferAttribute(new Float32Array(delays), 1)
    geometry.addAttribute('position', baPositions)
    geometry.addAttribute('delay', baDelays)

    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      depthWrite: false
    })

    this.obj = new THREE.Points(geometry, material)
  }

  render(time, force) {
    this.uniforms.force.value = force
    this.uniforms.time.value += time * 1000 * (force * 5)
  }
}
