let scene, camera, renderer, controls, videoTexture, videoMesh;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;

    document.getElementById('upload').addEventListener('change', handleUpload);

    animate();
}

function handleUpload(event) {
    let file = event.target.files[0];
    if (!file) return;

    let video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.loop = true;
    video.muted = true;
    video.play();

    videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    let material = new THREE.MeshBasicMaterial({ map: videoTexture });

    if (videoMesh) scene.remove(videoMesh);

    videoMesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), material);
    scene.add(videoMesh);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
