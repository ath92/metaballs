import Regl from "regl";
import { mat4, quat } from "gl-matrix";
import vert from "./pass-through-vert.glsl";
import frag from "./balls.glsl";

const regl = Regl();

// screen-filling rectangle
const position = regl.buffer([
    [-1, -1],
    [1, -1],
    [1,  1],
    [-1, -1],   
    [1, 1,],
    [-1, 1]
]);

const drawBalls = regl({
    vert,
    frag,
    uniforms: {
        screenSize: regl.prop('screenSize'),
        time: regl.prop('time'),
        cameraPosition: regl.prop('cameraPosition'),
        cameraDirection: regl.prop('cameraDirection'),
    },
    attributes: {
        position
    },
    count: 6,
});

regl.frame(({
    viewportWidth,
    viewportHeight,
    time,
}) => {
    drawBalls({
        time,
        screenSize: [viewportWidth, viewportHeight],
        cameraPosition: [0, 0, -2.5],
        cameraDirection: mat4.fromQuat(mat4.create(), quat.create()),
    });
});