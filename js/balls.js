import * as OIMO from '../node_modules/oimo/build/oimo.module.js';
import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";




const FPS = 120;
const table_x = 31;
const table_z = 17;
const raio_ball = 0.524;
const raio_t = 0.674
const playing_balls = [];
const tables_parts = [];
const elements_page = [];
var floor;
var f;
var world;


// Cria Cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Physijs WORLD
world = new OIMO.World({
    timestep: 1 / FPS,
    iterations: 8,
    broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: 100, // scale full world 
    random: false,  // randomize sample
    info: false,   // calculate statistic or not
    gravity: [0, -9.8, 0]
});


// Haja Luz
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

// Mesa 
const geometry = new THREE.BoxBufferGeometry(table_x, 1, table_z);
const material = new THREE.MeshPhongMaterial({ color: 0x00cc00 });
const ground = []
ground.push(new THREE.Mesh(geometry, material));
var options1 = {
    type: 'box',
    size: [table_x, 1, table_z],
    pos: [0, 0, 0],
    density: 100,
    belongsTo: 1,
    collidesWith: 0xffffffff,
    move: false
};
ground.push(world.add(options1))
elements_page.push(ground);
scene.add(ground[0]);




// Pos inicial CAMERA
camera.position.z = -5;
camera.position.y = 20;

// White Ball
const wgeo = new THREE.SphereBufferGeometry(raio_ball, 8, 8);
const wmat = new THREE.MeshPhongMaterial({ color: 0xCC0000 });
var options = {
    type: 'sphere',
    size: [raio_ball],
    pos: [10, 5000, 10],
    density: 1,
    move: true,
    friction: 0.9,
    belongsTo: 0x01,
    restitution: 0.1
};
elements_page.push([new THREE.Mesh(wgeo, wmat), world.add(options)]);
scene.add(elements_page[1][0]);














var create_world = function () {
    requestAnimationFrame(animate);
};

function animate() {
    setTimeout(function () {

        requestAnimationFrame(animate);

    }, 1000 / FPS);
    controls.update();
    world.step()
    moveElements();
    renderer.render(scene, camera);
    console.log("SSS");
}


function moveElements() {
    console.log("------------------");
    for (var i in elements_page) {
        elements_page[i][0].position.x = elements_page[i][1].position.x;
        elements_page[i][0].position.y = elements_page[i][1].position.y;
        elements_page[i][0].position.z = elements_page[i][1].position.z;
        console.log("))");
        console.log(elements_page[i][0].position);
        console.log(elements_page[i][1].position);
        
    }
}

export { create_world };