import * as THREE from "three";
import {
  OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer, pointLight, controls;

window.addEventListener("load", init);

function init() {
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
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);


  renderer.render(scene, camera);

  //テクスチャを追加
  const texture = new THREE.TextureLoader().load("./textures/earth.jpg");

  //ジオメトリ作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);

  //マテリアル
  let ballMaterial = new THREE.MeshPhysicalMaterial({
    map: texture
  });

  //メッシュ
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  //平行光源
  let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //ポイント光源
  pointLight = new THREE.PointLight(0xfffff, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  //ポイント光源の位置の特定
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  //マウス操作させる
  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

//ブラウザのリサイズに対応させる
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//ポイント光源を巡回
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  requestAnimationFrame(animate);
  //レンダリングする
  renderer.render(scene, camera);
}