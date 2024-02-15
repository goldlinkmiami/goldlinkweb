
uniform float time;
varying vec2 vUv;
void main() {
    vUv = uv;

    vec3 newPosition = position;
    newPosition.z = .1 *sin(newPosition.x * 5. + time *200.)  ;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
}