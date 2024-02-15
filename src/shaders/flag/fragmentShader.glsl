
varying vec2 vUv;
uniform sampler2D uDiffuse;

void main() {
    gl_FragColor = texture2D(uDiffuse, vUv);


}