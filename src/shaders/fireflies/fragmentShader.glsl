

void main(){


    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    // gl_FragColor = vec4(1., 1., 1., strength);

    gl_FragColor = vec4(1., 0.839, 0.004, strength);
}