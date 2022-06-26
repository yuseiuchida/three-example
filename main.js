import * as THREE from "three";

let scene, camera, renderer;

//シーン
scene = new THREE.Scene();

//カメラ
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 500);

//レンダラー
renderer = new THREE.WebGLRenderer({
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

//ジオメトリ作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

//マテリアル
let ballMaterial = new THREE.MeshPhysicalMaterial();

//メッシュ
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);

//レンダリングする
renderer.render(scene, camera);