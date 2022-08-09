import * as THREE from 'three';    
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
// to more control server
import * as dat from 'dat.gui';



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

const axesHelper=new THREE.AxesHelper(10)

scene.add(axesHelper)

camera.position.set(-10,30,30);

orbit.update();

// to create box
const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshStandardMaterial({color:0x00ff00});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box)

// to create plane ورقة
const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshStandardMaterial({color:0xffffff,
side:THREE.DoubleSide});
const plane=new THREE.Mesh(planeGeometry,planeMaterial)
scene.add(plane);
plane.rotation.x=-0.5*Math.PI;
box.rotation.set(5,5,0);
// to create شبكة

const gridHelper=new THREE.GridHelper(30);
scene.add(gridHelper)
// to create circler 
const sphereGeometry=new THREE.SphereGeometry(4,40,50)
// wireframe to شبكة
const sphereMaterial=new THREE.MeshStandardMaterial({color:0x0000ff,wireframe:false });
// MeshBasicMaterial to besic
// MeshStandardMaterial to sharp full color
//MeshLambertMaterial to sharp full color
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial)
scene.add(sphere)

sphere.position.set(-10,4.2,0);


// to control light

const ambientLight= new THREE.AmbientLight(0x333333);
scene.add(ambientLight)
// to shadow in body 
const directionalLight=new THREE.DirectionalLight(0xffffff,0.8);
 scene.add(directionalLight)
directionalLight.position.set(30,50,0)
 // 
const dLightHelper=new THREE.DirectionalLightHelper(directionalLight,5)
scene.add(dLightHelper)


// to give control to color
const gui = new dat.GUI();
 
const options={
    sphereColor:"#ffea00",
    wireframe:false,
    speed: 0.01 ,
    move:0.01
}


gui.addColor(options,'sphereColor').onChange((e)=>{
    sphere.material.color.set(e)
})
// to show full or frame
gui.add(options,'wireframe').onChange((e)=>{
    sphere.material.wireframe=e;
})
gui.add(options,'speed',0,0.1);
gui.add(options,'move',0,0.10);
let step= 0;
let stepX= 0;


// to gep move box
const animate=(time)=>{
    box.rotation.x=time /1000;
    box.rotation.y=time /1000;

    step+=options.speed;
    stepX+=options.move;

    sphere.position.y =(10 * (Math.abs(Math.sin(step))));
    sphere.position.x =(10 * (Math.abs(Math.sin(stepX))));

renderer.render(scene,camera)}


renderer.setAnimationLoop(animate)