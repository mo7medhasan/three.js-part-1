import * as THREE from 'three';    
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const renderer =new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight)


document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
    45, 
    window.innerWidth/window.innerHeight,
    0.1,1000
);

// to control
const orbit =new OrbitControls(camera,renderer.domElement)

const axesHelper=new THREE.AxesHelper(3)

scene.add(axesHelper)

camera.position.set(-10,30,30);

orbit.update();

// to create box
const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshBasicMaterial({color:0x00ff00});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box)

// to create plane ورقة
const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshBasicMaterial({color:0xffffff});
const plane=new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane);

box.rotation.set(5,5,0);
// 

const gridHelper=new THREE.GridHelper(30);
scene.add(gridHelper)

// to move box
const animate=(time)=>{
    box.rotation.x=time /1000;
    box.rotation.y=time /1000;

renderer.render(scene,camera)}


renderer.setAnimationLoop(animate)