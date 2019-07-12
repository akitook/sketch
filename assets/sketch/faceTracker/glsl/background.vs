attribute vec3 position;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
uniform float force;

varying vec3 vColor;

vec3 convertHsvToRgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main(void) {
  // calculate gradation
  vec3 hsv = vec3(0.1 + sin(radians(uv.y * 180.0 * 4.0)) * 0.12 - time * 0.1, 0.12 + force * 0.3, 0.96 - force * 0.03);
  vec3 rgb = convertHsvToRgb(hsv);

  // coordinate transformation
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  vColor = rgb;

  gl_Position = projectionMatrix * mvPosition;
}
