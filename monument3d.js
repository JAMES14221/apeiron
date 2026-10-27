/**
 * APERIO RESEARCH - REAL 3D SAPPHIRE CRYSTAL MONUMENT (THREE.JS)
 * 1:1 Grounded in Master Reference (media_1790501899989.jpg).
 * Features:
 * - True 3D Multi-Layered Volumetric Crystal Refraction (Core, Front Specular Glaze, Back Depth).
 * - Calibrated Sapphire Cobalt Material (MeshPhysicalMaterial) without blown-out additive glare.
 * - Subtle, delicate dark navy celestial armillary sphere in background (NO cartoon hoops).
 * - Interactive 6-DoF physics, inertia drag, dynamic cursor point light tracking, and click shockwave.
 */

(function initAperioMonument3D() {
    const container = document.getElementById('monumentContainer');
    if (!container || typeof THREE === 'undefined') return;

    container.innerHTML = '<canvas id="monument3dCanvas" class="monument-3d-canvas" style="width:100%;height:100%;display:block;cursor:grab;outline:none;"></canvas>';
    const canvas = document.getElementById('monument3dCanvas');

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 560;
    const height = container.clientHeight || 520;
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Master 3D Transform Group
    const masterRig = new THREE.Group();
    scene.add(masterRig);

    // 1. BALANCED SAPPHIRE & DIAMOND LIGHTING (NO BLOWN-OUT WHITE GLARE)
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.2);
    scene.add(ambientLight);

    const keyDirectionalLight = new THREE.DirectionalLight(0xffffff, 1.35);
    keyDirectionalLight.position.set(3, 4, 5);
    scene.add(keyDirectionalLight);

    const blueRimLight = new THREE.DirectionalLight(0x0284c7, 1.5);
    blueRimLight.position.set(-3, -2, -3);
    scene.add(blueRimLight);

    const cursorPointLight = new THREE.PointLight(0x38bdf8, 1.2, 14);
    cursorPointLight.position.set(0, 0, 4.5);
    scene.add(cursorPointLight);

    // 2. 3D MULTI-LAYER VOLUMETRIC CRYSTAL MESHES
    const tex = new THREE.Texture();
    const img = new Image();
    img.src = window.APERIO_3D_DIFFUSE_URI || 'monument_diffuse_clean.png';
    img.onload = () => {
        tex.image = img;
        tex.needsUpdate = true;
    };

    const planeH = 4.4;
    const planeW = planeH * (784 / 1024);
    const planeGeo = new THREE.PlaneGeometry(planeW, planeH, 64, 64);

    // Core 3D Sapphire Crystal Mesh
    const coreMat = new THREE.MeshPhysicalMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.02,
        roughness: 0.12,
        metalness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.95,
        side: THREE.DoubleSide
    });
    const coreMesh = new THREE.Mesh(planeGeo, coreMat);
    masterRig.add(coreMesh);

    // Front Specular Glaze Facet Plate (Z = +0.08) - gives true 3D crystal refraction depth
    const frontMat = new THREE.MeshPhysicalMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.05,
        opacity: 0.65,
        roughness: 0.05,
        metalness: 0.20,
        clearcoat: 1.0,
        side: THREE.FrontSide
    });
    const frontMesh = new THREE.Mesh(planeGeo, frontMat);
    frontMesh.position.z = 0.08;
    frontMesh.scale.set(1.008, 1.008, 1);
    masterRig.add(frontMesh);

    // Back Depth Facet Plate (Z = -0.08) - royal sapphire refraction
    const backMat = new THREE.MeshPhysicalMaterial({
        map: tex,
        transparent: true,
        alphaTest: 0.05,
        opacity: 0.75,
        roughness: 0.18,
        color: new THREE.Color(0x0f2b66),
        clearcoat: 0.8,
        side: THREE.BackSide
    });
    const backMesh = new THREE.Mesh(planeGeo, backMat);
    backMesh.position.z = -0.08;
    backMesh.scale.set(1.012, 1.012, 1);
    masterRig.add(backMesh);

    // 3. SUBTLE CELESTIAL ASTROLABE SPHERE (Faint hairline navy grid from reference image)
    const sphereGeo = new THREE.IcosahedronGeometry(3.3, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x1e40af,
        wireframe: true,
        transparent: true,
        opacity: 0.22
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    masterRig.add(sphereMesh);

    // Click Shockwave
    const shockwaveGeo = new THREE.TorusGeometry(0.6, 0.022, 12, 80);
    const shockwaveMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI * 0.35;
    masterRig.add(shockwaveMesh);
    let shockwaveProgress = 1.0;

    // 4. INTERACTIVE 6-DoF INERTIA & PARALLAX ENGINE
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    function onPointerMove(e) {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        targetRotY = normX * 0.32;
        targetRotX = -normY * 0.22;

        cursorPointLight.position.x = normX * 3.5;
        cursorPointLight.position.y = normY * 2.5;

        if (isPointerDown) {
            const dx = e.clientX - lastPointerX;
            const dy = e.clientY - lastPointerY;
            lastPointerX = e.clientX;
            lastPointerY = e.clientY;

            dragVelocityX = dx * 0.005;
            dragVelocityY = dy * 0.005;

            currentRotY += dragVelocityX;
            currentRotX += dragVelocityY;
        }
    }

    container.addEventListener('pointerdown', (e) => {
        isPointerDown = true;
        pointerStartX = e.clientX;
        pointerStartY = e.clientY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('pointermove', onPointerMove);

    window.addEventListener('pointerup', (e) => {
        if (!isPointerDown) return;
        isPointerDown = false;
        canvas.style.cursor = 'grab';

        const dist = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
        if (dist < 6) {
            shockwaveProgress = 0.0;
        }
    });

    function onResize() {
        const w = container.clientWidth || 560;
        const h = container.clientHeight || 520;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // 5. RENDER ANIMATION LOOP
    let clock = 0;
    function animate() {
        requestAnimationFrame(animate);
        clock += 0.016;

        if (!isPointerDown) {
            currentRotX += (targetRotX - currentRotX) * 0.06;
            currentRotY += (targetRotY - currentRotY) * 0.06;
        } else {
            dragVelocityX *= 0.92;
            dragVelocityY *= 0.92;
            currentRotY += dragVelocityX;
            currentRotX += dragVelocityY;
        }

        // Zero-gravity harmonic float
        const bobY = Math.sin(clock * 1.4) * 0.06;
        const bobZ = Math.cos(clock * 0.9) * 0.04;
        const rollZ = Math.sin(clock * 0.8) * 0.02;

        masterRig.position.y = bobY;
        masterRig.position.z = bobZ;
        masterRig.rotation.x = currentRotX;
        masterRig.rotation.y = currentRotY;
        masterRig.rotation.z = rollZ;

        sphereMesh.rotation.y = clock * 0.08;

        // Shockwave pulse
        if (shockwaveProgress < 1.0) {
            shockwaveProgress += 0.032;
            const ease = 1 - Math.pow(1 - shockwaveProgress, 3);
            const scale = 0.6 + ease * 3.6;
            shockwaveMesh.scale.set(scale, scale, scale);
            shockwaveMat.opacity = Math.max(0, (1 - ease) * 0.85);
        } else {
            shockwaveMat.opacity = 0;
        }

        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
})();
