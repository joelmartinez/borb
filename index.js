import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const body = new THREE.Group();
scene.add(body);

function addCube(dim, position, g)
{
    const geometry = new THREE.BoxGeometry( dim.x, dim.y, dim.z );
    var material = new THREE.MeshBasicMaterial({
        color: 0x0095DD,
        wireframe: true,
        wireframeLinewidth: 2
    });
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = position.x;

    // make pivot group
    var pivot = new THREE.Group();
    pivot.add(cube);
    
    // add to parent group
    g.add(pivot);

    pivot.geo = dim;

    return pivot;
}

var bodyBox = addCube(
    {x:2, y:1.5, z:5},
    {x:0, y:0, z:0},
    body
)
var rWing = addCube(
    {x:4,y:.5,z:2},
    {x:3,y:-10,z:-11},
    body
);

var lWing = addCube(
    {x:4,y:.5,z:2},
    {x:-3,y:-10,z:-11},
    body
);

body.position.z = -10;

// floor
var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geo, mat);
plane.rotateX( - Math.PI / 2);
scene.add(plane);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

camera.position.z = 5;
var clock = new THREE.Clock();

function animate() {
	requestAnimationFrame( animate );

    var t = clock.getElapsedTime ();
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    var speed = 5;
    var amount = .5;
    lWing.rotation.z = Math.sin(t*speed) * amount;
    rWing.rotation.z = Math.sin(t*-speed) * amount;

    //lWing.position.z += .001;
    //rWing.position.z += .001;

    body.rotation.y += .005;

	renderer.render( scene, camera );
}
animate();