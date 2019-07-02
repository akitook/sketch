// http://glslsandbox.com/e#55696.0
uniform vec2 resolution;
uniform float time;

void main()
{
	vec3 p = vec3((gl_FragCoord.xy)/(resolution.y),sin(time * 0.2));
	for (int i = 0; i < 100; i++)
  {
    p.xzy = vec3(1.3,0.9,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.1,1.0,cos(time * 0.2)*0.6))));
  }
  gl_FragColor.rgb = p;gl_FragColor.a = 1.0;
}
