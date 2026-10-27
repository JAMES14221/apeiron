/**
 * APERIO RESEARCH - PURE MATHEMATICAL COSMIC ENGINE (ABOUT PAGE)
 * Implements the 6 Cosmic Pillars:
 * 1. 6-DoF Zero-Gravity Tarot Cards (180° phase offset, 8-pointed star CCW rotation, specular sheen, harmonious dossier)
 * 2. Cosmic Energy Ribbon (3D parametric Mobius strip, UV plasma flow, aurora wave breathing, chromatic aberration)
 * 3. Orbital Rings & Planets (Concentric elliptical armillary rings + orbiting Saturn-like planet with dynamic shading & rings)
 * 4. Mystic Compass Core (Central pulsing point light + 3.5s periodic expanding shockwave ripples)
 * 5. Particles & Astral Stars (Brownian motion stardust + 45° rotating twinkle cross-stars with lens flare glints)
 * 6. Camera & Depth of Field (Micro-orbit dolly camera drift, parallax depth sorting, and soft bokeh DoF)
 *
 * Rock-solid 60 FPS performance, ZERO layout thrashing, single unified animation loop, ZERO crashes.
 */

(function initCosmicAboutStage() {
    'use strict';

    // 1. DATA & STATE MANAGEMENT
    const DEPT_ORDER = ['council', 'program', 'content', 'media', 'er', 'hr', 'tech', 'all'];
    let currentDept = 'council';
    let currentCards = [];
    let N = 0;
    let stepAngle = 0;
    const cardElements = [];
    let cardStates = [];

    // DOM Elements
    const cardsStage = document.getElementById('gachaCardsStage');
    const viewport = document.getElementById('gachaViewport');
    const cosmicCanvas = document.getElementById('cosmicStageCanvas');
    if (!cosmicCanvas || !cardsStage) return;
    const ctx = cosmicCanvas.getContext('2d');

    // Easter Egg Audio HUD Elements
    const easterAudio = document.getElementById('founderEasterEggAudio');
    const easterPlayer = document.getElementById('easterEggPlayer');
    const playerToggleBtn = document.getElementById('playerToggleBtn');
    const playerVibesBars = document.getElementById('playerVibesBars');
    let isEasterPlaying = false;

    // Interaction States
    let currentFocalIndex = 0;
    let targetFocalIndex = 0;
    let momentum = 0;
    let isDragging = false;
    let startPointerX = 0;
    let lastPointerX = 0;
    let dragVelocity = 0;
    let hasDragged = false;
    let focusedIndex = null;
    let activeCardIndex = 0;
    let pendingRevealIndex = null;

    // Camera & Parallax Variables
    let currentParallaxX = 0;
    let currentParallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    // Responsive Canvas & Geometry Radii
    let canvasW = 1400;
    let canvasH = 800;
    let stageScale = 1.0;
    let radiusX = 460;
    let radiusZ = 290;
    let tiltY = 48;
    let tiltX = 14;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    // 2. PILLAR 5: TWINKLE STARS & DEPARTMENT HIERARCHY THEMES
    const DEPT_THEMES = {
        council: {
            name: "Founding Council",
            isCouncil: true,
            primary: "#fbbf24",
            secondary: "#00f0ff",
            accent: "#c084fc",
            outerGlow: "rgba(251, 191, 36, 0.60)",
            midGlow: "rgba(0, 240, 255, 0.75)",
            innerGlow: "rgba(192, 132, 252, 0.55)",
            coreVein: "#ffffff",
            starColor: "#fbbf24",
            photonColors: ['#fbbf24', '#00f0ff', '#ffffff', '#c084fc', '#f59e0b']
        },
        program: {
            name: "Program & PM",
            primary: "#38bdf8",
            secondary: "#2563eb",
            accent: "#93c5fd",
            outerGlow: "rgba(37, 99, 235, 0.50)",
            midGlow: "rgba(56, 189, 248, 0.70)",
            innerGlow: "rgba(147, 197, 253, 0.40)",
            coreVein: "#f0f9ff",
            starColor: "#38bdf8",
            photonColors: ['#38bdf8', '#2563eb', '#ffffff', '#93c5fd']
        },
        content: {
            name: "Content & Moderation",
            primary: "#c084fc",
            secondary: "#7c3aed",
            accent: "#ec4899",
            outerGlow: "rgba(124, 58, 237, 0.50)",
            midGlow: "rgba(192, 132, 252, 0.70)",
            innerGlow: "rgba(236, 72, 153, 0.40)",
            coreVein: "#faf5ff",
            starColor: "#c084fc",
            photonColors: ['#c084fc', '#7c3aed', '#ffffff', '#ec4899']
        },
        media: {
            name: "Media & Design",
            primary: "#fb7185",
            secondary: "#e11d48",
            accent: "#f43f5e",
            outerGlow: "rgba(225, 29, 72, 0.50)",
            midGlow: "rgba(251, 113, 133, 0.70)",
            innerGlow: "rgba(244, 63, 94, 0.40)",
            coreVein: "#fff1f2",
            starColor: "#fb7185",
            photonColors: ['#fb7185', '#e11d48', '#ffffff', '#f43f5e']
        },
        er: {
            name: "External Relations",
            primary: "#fbbf24",
            secondary: "#d97706",
            accent: "#f59e0b",
            outerGlow: "rgba(217, 119, 6, 0.50)",
            midGlow: "rgba(251, 191, 36, 0.70)",
            innerGlow: "rgba(245, 158, 11, 0.40)",
            coreVein: "#fffbeb",
            starColor: "#fbbf24",
            photonColors: ['#fbbf24', '#d97706', '#ffffff', '#fde68a']
        },
        hr: {
            name: "HR & Operations",
            primary: "#34d399",
            secondary: "#059669",
            accent: "#10b981",
            outerGlow: "rgba(5, 150, 105, 0.50)",
            midGlow: "rgba(52, 211, 153, 0.70)",
            innerGlow: "rgba(16, 185, 129, 0.40)",
            coreVein: "#ecfdf5",
            starColor: "#34d399",
            photonColors: ['#34d399', '#059669', '#ffffff', '#6ee7b7']
        },
        tech: {
            name: "Tech & Portal",
            primary: "#00f0ff",
            secondary: "#0284c7",
            accent: "#38bdf8",
            outerGlow: "rgba(2, 132, 199, 0.50)",
            midGlow: "rgba(0, 240, 255, 0.75)",
            innerGlow: "rgba(56, 189, 248, 0.40)",
            coreVein: "#ffffff",
            starColor: "#00f0ff",
            photonColors: ['#00f0ff', '#0284c7', '#ffffff', '#7dd3fc']
        },
        all: {
            name: "All Scholars",
            isRainbow: true,
            primary: "#00f0ff",
            secondary: "#c084fc",
            accent: "#fbbf24",
            outerGlow: "rgba(168, 85, 247, 0.50)",
            midGlow: "rgba(0, 240, 255, 0.70)",
            innerGlow: "rgba(251, 191, 36, 0.40)",
            coreVein: "#ffffff",
            starColor: "#00f0ff",
            photonColors: ['#00f0ff', '#c084fc', '#fbbf24', '#ffffff', '#fb7185']
        }
    };

    const TWINKLE_COUNT = 16;
    const twinkleStars = [];
    for (let i = 0; i < TWINKLE_COUNT; i++) {
        twinkleStars.push({
            normX: Math.random(),
            normY: Math.random(),
            baseSize: Math.random() * 3.2 + 2.0,
            angle: Math.random() * Math.PI,
            rotSpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
            twinkleSpeed: Math.random() * 1.5 + 1.0,
            phase: Math.random() * Math.PI * 2,
            flareLen: Math.random() * 14 + 10,
            color: Math.random() > 0.35 ? '#ffffff' : (Math.random() > 0.5 ? '#38bdf8' : '#e0e7ff')
        });
    }

    // PILLAR 2: COSMIC ENERGY RIBBON PLASMA PHOTONS (Optimized count for 60 FPS)
    const RIBBON_PHOTON_COUNT = 14;
    const ribbonPhotons = [];
    for (let i = 0; i < RIBBON_PHOTON_COUNT; i++) {
        ribbonPhotons.push({
            progress: i / RIBBON_PHOTON_COUNT,
            speed: (i % 2 === 0 ? 0.0026 : -0.0022) * (0.85 + Math.random() * 0.3),
            size: Math.random() * 2.4 + 1.8,
            color: i % 3 === 0 ? '#00f0ff' : (i % 3 === 1 ? '#ffffff' : '#c084fc'),
            glowBlur: Math.random() * 8 + 6
        });
    }

    // PILLAR 4: SHOCKWAVE PULSES & CLICK VFX
    let clickVfxParticles = [];

    function spawnParticleBurst(x, y) {
        clickVfxParticles = [];
        const colors = ['#00f0ff', '#38bdf8', '#c084fc', '#ffffff', '#a855f7'];
        for (let i = 0; i < 55; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 9 + 3;
            clickVfxParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3.8 + 1.6,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1.0,
                decay: Math.random() * 0.024 + 0.016
            });
        }
    }

    // 3. RESPONSIVE RESIZE ENGINE (CACHED DIMENSIONS - NO LAYOUT THRASHING)
    function updateStageDimensions() {
        const parent = cosmicCanvas.parentElement;
        canvasW = parent.clientWidth || window.innerWidth;
        canvasH = parent.clientHeight || 780;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        cosmicCanvas.width = canvasW * dpr;
        cosmicCanvas.height = canvasH * dpr;
        ctx.scale(dpr, dpr);

        stageScale = Math.min(canvasW / 1300, canvasH / 780);

        if (canvasW < 768) {
            radiusX = 240;
            radiusZ = 150;
            tiltY = 26;
            tiltX = 8;
        } else if (canvasW < 1024) {
            radiusX = 350;
            radiusZ = 220;
            tiltY = 38;
            tiltX = 10;
        } else {
            radiusX = 460;
            radiusZ = 290;
            tiltY = 48;
            tiltX = 14;
        }
    }
    window.addEventListener('resize', updateStageDimensions);
    updateStageDimensions();

    // 4. PILLAR 1: TAROT CARDS 6-DoF DOM BUILDER & HARMONIOUS DOSSIER
    function buildOrbitCards(deptCode) {
        const scholars = window.ALL_SCHOLARS || [];
        if (deptCode === 'all') {
            currentCards = scholars;
        } else {
            currentCards = scholars.filter(m => m.deptCode === deptCode);
        }

        const theme = DEPT_THEMES[deptCode] || DEPT_THEMES.council;

        N = currentCards.length;
        stepAngle = N > 0 ? (2 * Math.PI) / N : 0;

        cardsStage.innerHTML = '';
        cardElements.length = 0;

        currentFocalIndex = 0;
        targetFocalIndex = 0;
        momentum = 0;
        focusedIndex = null;
        activeCardIndex = 0;

        const dialRoman = document.getElementById('dialRoman');
        const dialTotal = document.getElementById('dialTotal');
        if (dialRoman && currentCards[0]) {
            dialRoman.textContent = `CODEX ${currentCards[0].roman}`;
        }
        if (dialTotal && currentCards.length > 0) {
            dialTotal.textContent = `${currentCards.length} SCHOLARS`;
        }

        cardStates = currentCards.map(() => ({
            focusP: 0.0,
            targetFocus: 0.0,
            flipP: 0.0,
            targetFlip: 0.0
        }));

        currentCards.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'gacha-card' + (idx === 0 ? ' is-active-card' : '');
            card.dataset.index = idx;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Reveal ${item.name}'s scholar codex`);

            const avatarHtml = `<div class="gacha-monogram-inner">
                    <span class="gacha-avatar-monogram">${item.initials}</span>
                 </div>`;

            const nicknameHtml = item.nickname ? 
                `<div class="gacha-nickname">✦ Alias: “${item.nickname}” ✦</div>` : '';

            card.innerHTML = `
                <div class="gacha-card-flipper">
                    <!-- Back Face: Sacred Geometry Pure SVG Astral Tarot Card (NO PNGs!) -->
                    <div class="gacha-card-face gacha-card-back">
                        <div class="gacha-card-sacred-seal">
                            <svg viewBox="0 0 200 320" class="card-seal-svg" width="100%" height="100%">
                                <rect x="8" y="8" width="184" height="304" rx="12" fill="none" stroke="rgba(160, 150, 255, 0.35)" stroke-width="1.2" />
                                <rect x="14" y="14" width="172" height="292" rx="8" fill="none" stroke="rgba(0, 240, 255, 0.22)" stroke-width="0.8" stroke-dasharray="4,6" />
                                <circle cx="100" cy="160" r="72" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1" stroke-dasharray="3,5" />
                                <circle cx="100" cy="160" r="52" fill="none" stroke="rgba(168, 85, 247, 0.25)" stroke-width="0.8" />
                                <polygon points="100,90 160,195 40,195" fill="none" stroke="rgba(0, 240, 255, 0.22)" stroke-width="0.8" />
                                <polygon points="100,230 160,125 40,125" fill="none" stroke="rgba(168, 85, 247, 0.22)" stroke-width="0.8" />
                                <line x1="100" y1="20" x2="100" y2="300" stroke="rgba(255, 255, 255, 0.18)" stroke-width="0.7" stroke-dasharray="3,6" />
                                <line x1="20" y1="160" x2="180" y2="160" stroke="rgba(255, 255, 255, 0.18)" stroke-width="0.7" stroke-dasharray="3,6" />
                            </svg>
                        </div>
                        <div class="card-back-top-badge">
                            <span class="card-back-badge-text">CODEX ${item.roman}</span>
                        </div>
                        <!-- 8-pointed star in center rotating CCW with breathing glow -->
                        <div class="gacha-card-center-star">
                            <svg viewBox="0 0 100 100" class="star-8-svg">
                                <polygon points="50,0 55,35 85,15 65,45 100,50 65,55 85,85 55,65 50,100 45,65 15,85 35,55 0,50 35,45 15,15 45,35" fill="${theme.starColor || 'rgba(0, 240, 255, 0.88)'}"/>
                            </svg>
                        </div>
                        <div class="card-back-bottom-crest">
                            <span class="card-crest-roman">${item.roman}</span>
                            <span class="card-crest-label">APERIO RESEARCH</span>
                        </div>
                        <div class="gacha-card-sheen"></div>
                        <div class="gacha-card-crystal-overlay"></div>
                    </div>

                    <!-- Front Face: Harmonious Crystal Scholar Dossier (Pure Vector & Typography, NO PNGs!) -->
                    <div class="gacha-card-face gacha-card-front">
                        <button class="gacha-card-close-btn" onclick="closeCardDetail(event)" aria-label="Close card">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div class="gacha-front-content">
                            <div class="gacha-card-badge-wrap">
                                <span class="badge-star">✦</span>
                                <span class="gacha-card-badge">CODEX ${item.roman}</span>
                                <span class="badge-sep">·</span>
                                <span class="badge-org">APERIO</span>
                                <span class="badge-star">✦</span>
                            </div>
                            
                            <div class="gacha-avatar-frame is-monogram">
                                ${avatarHtml}
                                <div class="avatar-orbit-ring"></div>
                            </div>

                            <h3 class="gacha-card-name">${item.name}</h3>
                            ${nicknameHtml}
                            <div class="gacha-card-role">
                                <span class="role-symbol">◈</span>
                                <span>${item.role}</span>
                                <span class="role-symbol">◈</span>
                            </div>

                            <div class="gacha-card-quote-box">
                                <p class="gacha-card-quote">“${item.quote}”</p>
                            </div>

                            <div class="gacha-card-tags-row">
                                <div class="gacha-card-tag tag-focus">
                                    <span class="tag-spark">✦</span>
                                    <span class="tag-text">${item.focus}</span>
                                </div>
                                <div class="gacha-card-tag tag-dept">
                                    <span class="tag-spark">❖</span>
                                    <span class="tag-text">${item.dept}</span>
                                </div>
                            </div>
                        </div>
                        <div class="gacha-card-sheen"></div>
                        <div class="gacha-card-crystal-overlay"></div>
                    </div>
                </div>
            `;

            cardsStage.appendChild(card);
            cardElements.push(card);

            card.addEventListener('click', (e) => onCardClicked(idx, e));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCardClicked(idx, e);
                }
            });
        });
    }

    function selectOrbitDept(deptCode) {
        if (currentDept === deptCode && cardElements.length > 0) return;
        currentDept = deptCode;

        cardsStage.dataset.dept = deptCode;
        const stageEl = cardsStage.closest('.gacha-stage');
        if (stageEl) stageEl.dataset.dept = deptCode;

        document.querySelectorAll('.orbit-pill').forEach(pill => {
            pill.classList.toggle('is-active', pill.dataset.dept === deptCode);
        });

        spawnParticleBurst(canvasW / 2, canvasH / 2);
        buildOrbitCards(deptCode);
    }

    function cycleOrbitDept(dir) {
        let idx = DEPT_ORDER.indexOf(currentDept);
        if (idx === -1) idx = 0;
        let nextIdx = (idx + dir + DEPT_ORDER.length) % DEPT_ORDER.length;
        selectOrbitDept(DEPT_ORDER[nextIdx]);
    }

    window.selectOrbitDept = selectOrbitDept;
    window.cycleOrbitDept = cycleOrbitDept;

    // 5. INTERACTION & WHEEL CONTROLS
    function rotateWheelStep(direction) {
        if (N <= 0) return;
        targetFocalIndex = (targetFocalIndex - direction + N) % N;
    }

    function rotateWheelTo(idx) {
        if (N <= 0) return;
        targetFocalIndex = (idx % N + N) % N;
    }

    window.rotateWheelTo = rotateWheelTo;
    window.rotateWheelStep = rotateWheelStep;

    function revealCardIndex(idx) {
        focusedIndex = idx;
        if (cardStates[idx]) {
            cardStates[idx].targetFocus = 1.0;
            cardStates[idx].targetFlip = 1.0;
        }
        if (cardElements[idx]) {
            cardElements[idx].classList.add('is-revealed');
        }

        spawnParticleBurst(canvasW / 2, canvasH / 2);

        const item = currentCards[idx];
        if (item && item.isFounder) {
            playFounderEasterEgg();
        }
    }

    function onCardClicked(idx, e) {
        if (hasDragged) return;
        if (e) e.stopPropagation();

        if (focusedIndex === idx) {
            closeCardDetail();
            return;
        }

        if (focusedIndex !== null) {
            closeCardDetail();
        }

        rotateWheelTo(idx);
        revealCardIndex(idx);
    }

    function closeCardDetail(e) {
        if (e) e.stopPropagation();
        if (focusedIndex === null) return;

        const prev = focusedIndex;
        focusedIndex = null;
        if (cardStates[prev]) {
            cardStates[prev].targetFocus = 0.0;
            cardStates[prev].targetFlip = 0.0;
        }
        if (cardElements[prev]) {
            cardElements[prev].classList.remove('is-revealed');
        }
    }

    window.onCardClicked = onCardClicked;
    window.closeCardDetail = closeCardDetail;

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.gacha-card') && !e.target.closest('.orbit-selector') && !e.target.closest('.easter-egg-player')) {
            closeCardDetail();
        }
    });

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            rotateWheelStep(1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            rotateWheelStep(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            cycleOrbitDept(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            cycleOrbitDept(1);
        } else if (e.key === 'Escape') {
            closeCardDetail();
        }
    });

    // Drag Interaction (Pointer Events)
    viewport.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.gacha-card-close-btn') || e.target.closest('.easter-egg-player')) return;
        isDragging = true;
        hasDragged = false;
        startPointerX = e.clientX;
        lastPointerX = e.clientX;
        dragVelocity = 0;
    });

    window.addEventListener('pointermove', (e) => {
        const rect = viewport.getBoundingClientRect();
        targetParallaxX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
        targetParallaxY = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
        targetParallaxX = Math.max(-1, Math.min(1, targetParallaxX));
        targetParallaxY = Math.max(-1, Math.min(1, targetParallaxY));

        if (!isDragging) return;

        const deltaX = e.clientX - lastPointerX;
        lastPointerX = e.clientX;

        if (Math.abs(e.clientX - startPointerX) > 6) {
            hasDragged = true;
        }

        const dragSens = 0.0035 / (stageScale || 1.0);
        currentFocalIndex = (currentFocalIndex - deltaX * dragSens + N) % N;
        targetFocalIndex = currentFocalIndex;
    });

    window.addEventListener('pointerup', () => {
        if (isDragging) {
            isDragging = false;
            targetFocalIndex = Math.round(targetFocalIndex);
            setTimeout(() => { hasDragged = false; }, 60);
        }
    });

    // Wheel Scroll Handling (Smooth Perspective Stride)
    let isStageWheelLocked = false;
    let stageWheelAccum = 0;
    const gachaStageEl = document.getElementById('gachaStage');
    if (gachaStageEl) {
        gachaStageEl.addEventListener('wheel', (e) => {
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const rect = viewport.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const inDeckZone = Math.abs(e.clientX - centerX) < 380 && Math.abs(e.clientY - centerY) < 260;

            if (!inDeckZone && !isHorizontal) return; // Allow normal vertical scroll

            e.preventDefault();
            const delta = isHorizontal ? e.deltaX : e.deltaY;
            if (Math.abs(delta) < 2 || isStageWheelLocked) return;

            stageWheelAccum += delta;
            if (Math.abs(stageWheelAccum) >= 15) {
                isStageWheelLocked = true;
                if (focusedIndex !== null) closeCardDetail();
                rotateWheelStep(stageWheelAccum > 0 ? 1 : -1);
                stageWheelAccum = 0;
                setTimeout(() => { isStageWheelLocked = false; }, 160);
            }
        }, { passive: false });
    }

    // 6. FOUNDER EASTER EGG AUDIO HUD
    function playFounderEasterEgg() {
        if (!easterAudio) return;
        if (easterPlayer) easterPlayer.style.display = 'flex';
        easterAudio.play().then(() => {
            isEasterPlaying = true;
            if (playerToggleBtn) playerToggleBtn.textContent = '❚❚';
            if (playerVibesBars) playerVibesBars.classList.add('is-playing');
        }).catch((err) => {
            isEasterPlaying = false;
            if (playerToggleBtn) playerToggleBtn.textContent = '▶';
            if (playerVibesBars) playerVibesBars.classList.remove('is-playing');
            console.log('Autoplay deferred until user interaction:', err);
        });
    }

    function toggleEasterEggAudio(e) {
        if (e) e.stopPropagation();
        if (!easterAudio) return;

        if (isEasterPlaying) {
            easterAudio.pause();
            isEasterPlaying = false;
            if (playerToggleBtn) playerToggleBtn.textContent = '▶';
            if (playerVibesBars) playerVibesBars.classList.remove('is-playing');
        } else {
            easterAudio.play().then(() => {
                isEasterPlaying = true;
                if (easterPlayer) easterPlayer.style.display = 'flex';
                if (playerToggleBtn) playerToggleBtn.textContent = '❚❚';
                if (playerVibesBars) playerVibesBars.classList.add('is-playing');
            }).catch(() => {});
        }
    }

    function closeEasterEggPlayer(e) {
        if (e) e.stopPropagation();
        if (easterAudio) {
            easterAudio.pause();
            easterAudio.currentTime = 0;
        }
        isEasterPlaying = false;
        if (easterPlayer) easterPlayer.style.display = 'none';
    }

    window.playFounderEasterEgg = playFounderEasterEgg;
    window.toggleEasterEggAudio = toggleEasterEggAudio;
    window.closeEasterEggPlayer = closeEasterEggPlayer;

    // 7. 60 FPS UNIFIED MATHEMATICAL SIMULATION & RENDER ENGINE
    let lastFrameTime = performance.now();
    let simTime = 0;

    function renderCosmicScene(currentTime) {
        requestAnimationFrame(renderCosmicScene);

        const deltaMs = currentTime - lastFrameTime;
        lastFrameTime = currentTime;
        const delta = Math.min(2.0, Math.max(0.4, deltaMs / 16.667));
        simTime += (prefersReducedMotion ? 0.004 : 0.016) * delta;

        // Smooth Camera Micro-Orbit & Parallax (Pillar 6)
        currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
        currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;

        const camDollyX = Math.sin(simTime * 0.28) * 16 + currentParallaxX * 24;
        const camDollyY = Math.cos(simTime * 0.22) * 10 + currentParallaxY * 18;

        const cx = canvasW * 0.5;
        const cy = canvasH * 0.48;

        // Clear Canvas Buffer
        ctx.clearRect(0, 0, canvasW, canvasH);

        // ======================================================================
        // B. PILLAR 5: ROTATING TWINKLE STARS
        // ======================================================================
        // Twinkle Cross-Stars (4-pointed stars with 45° rotation & lens flares)
        twinkleStars.forEach(s => {
            s.angle += s.rotSpeed * delta;
            const sx = s.normX * canvasW + camDollyX * 0.15;
            const sy = s.normY * canvasH + camDollyY * 0.15;
            const brightness = Math.sin(simTime * s.twinkleSpeed + s.phase) * 0.4 + 0.6;
            const sz = s.baseSize * brightness * stageScale;

            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(s.angle);
            ctx.globalAlpha = Math.min(1.0, brightness * 0.9);
            ctx.fillStyle = s.color;
            ctx.shadowColor = s.color;
            ctx.shadowBlur = 8;

            // 4-Pointed Star Polygon
            ctx.beginPath();
            ctx.moveTo(0, -sz * 2.2);
            ctx.lineTo(sz * 0.35, -sz * 0.35);
            ctx.lineTo(sz * 2.2, 0);
            ctx.lineTo(sz * 0.35, sz * 0.35);
            ctx.lineTo(0, sz * 2.2);
            ctx.lineTo(-sz * 0.35, sz * 0.35);
            ctx.lineTo(-sz * 2.2, 0);
            ctx.lineTo(-sz * 0.35, -sz * 0.35);
            ctx.closePath();
            ctx.fill();

            // Lens Flare Beams when brightness peaks
            if (brightness > 0.82) {
                const flare = s.flareLen * stageScale * (brightness - 0.7);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(-flare, 0);
                ctx.lineTo(flare, 0);
                ctx.moveTo(0, -flare);
                ctx.lineTo(0, flare);
                ctx.stroke();
            }
            ctx.restore();
        });

        // ======================================================================
        // C. PILLAR 3: ARMILLARY RINGS & ORBITING SATURN-LIKE PLANET
        // ======================================================================
        const armillaryCX = cx + camDollyX * 0.35;
        const armillaryCY = cy + camDollyY * 0.35;

        // Concentric Elliptical Armillary Rings with Differential Rotations
        const armillaryRings = [
            { rx: 500 * stageScale, ry: 175 * stageScale, tilt: -0.42, speed: 0.006, color: 'rgba(0, 240, 255, 0.42)', dash: [6, 12] },
            { rx: 420 * stageScale, ry: 148 * stageScale, tilt: 0.32, speed: -0.005, color: 'rgba(168, 85, 247, 0.38)', dash: [4, 8] },
            { rx: 560 * stageScale, ry: 195 * stageScale, tilt: -0.18, speed: 0.0035, color: 'rgba(56, 189, 248, 0.32)', dash: [8, 16] },
            { rx: 340 * stageScale, ry: 120 * stageScale, tilt: 0.55, speed: -0.004, color: 'rgba(192, 132, 252, 0.35)', dash: [3, 9] }
        ];

        armillaryRings.forEach(ring => {
            ctx.save();
            ctx.translate(armillaryCX, armillaryCY);
            ctx.rotate(ring.tilt);
            ctx.strokeStyle = ring.color;
            ctx.lineWidth = 1.6;
            ctx.setLineDash(ring.dash);
            ctx.lineDashOffset = -simTime * ring.speed * 800;
            ctx.shadowColor = ring.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Traveling Celestial Node Beads
            for (let b = 0; b < 3; b++) {
                const beadAngle = (simTime * ring.speed * 2 + b * (Math.PI * 2 / 3)) % (Math.PI * 2);
                const bx = Math.cos(beadAngle) * ring.rx;
                const by = Math.sin(beadAngle) * ring.ry;
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(bx, by, 2.5 * stageScale, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        // Saturn-like Planet revolving along an elliptical orbit with independent ring rotation & shading
        const orbitAngle = simTime * 0.038;
        const orbitRx = 430 * stageScale;
        const orbitRy = 180 * stageScale;
        const planetTiltOrbit = -0.38;

        const rawOx = Math.cos(orbitAngle) * orbitRx;
        const rawOy = Math.sin(orbitAngle) * orbitRy;
        const planetX = armillaryCX + rawOx * Math.cos(planetTiltOrbit) - rawOy * Math.sin(planetTiltOrbit);
        const planetY = armillaryCY + rawOx * Math.sin(planetTiltOrbit) + rawOy * Math.cos(planetTiltOrbit);
        const planetZ = Math.sin(orbitAngle);
        const planetScale = (0.85 + 0.3 * ((planetZ + 1) / 2)) * stageScale;
        const planetRadius = 26 * planetScale;
        const planetAxisTilt = 0.45; // 26 degrees

        // Dynamic Shading Vector from Central Mystic Core
        const lightDirX = armillaryCX - planetX;
        const lightDirY = armillaryCY - planetY;
        const lightAngle = Math.atan2(lightDirY, lightDirX);

        ctx.save();
        ctx.translate(planetX, planetY);

        // 1. Back half of Saturn's rings (drawn behind the planet sphere)
        ctx.save();
        ctx.rotate(planetAxisTilt + simTime * 0.06);
        ctx.strokeStyle = 'rgba(216, 180, 254, 0.65)';
        ctx.lineWidth = 3.5 * planetScale;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(0, 0, 56 * planetScale, 16 * planetScale, 0, Math.PI, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(147, 197, 253, 0.45)';
        ctx.lineWidth = 1.8 * planetScale;
        ctx.beginPath();
        ctx.ellipse(0, 0, 46 * planetScale, 13 * planetScale, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // 2. Planet Sphere with Dynamic Directional Shading
        const sphereGrad = ctx.createRadialGradient(
            Math.cos(lightAngle) * (planetRadius * 0.5),
            Math.sin(lightAngle) * (planetRadius * 0.5),
            planetRadius * 0.1,
            0,
            0,
            planetRadius
        );
        sphereGrad.addColorStop(0, '#bae6fd');
        sphereGrad.addColorStop(0.35, '#38bdf8');
        sphereGrad.addColorStop(0.7, '#1e3a8a');
        sphereGrad.addColorStop(1, '#030712');

        ctx.fillStyle = sphereGrad;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric Rayleigh Scattering Rim facing the core
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius - 1, lightAngle - Math.PI * 0.4, lightAngle + Math.PI * 0.4);
        ctx.stroke();

        // 3. Ring Shadow cast across the planet's surface
        ctx.save();
        ctx.rotate(planetAxisTilt);
        ctx.fillStyle = 'rgba(2, 6, 23, 0.65)';
        ctx.beginPath();
        ctx.rect(-planetRadius, -1.8 * planetScale, planetRadius * 2, 3.6 * planetScale);
        ctx.clip();
        ctx.beginPath();
        ctx.arc(0, 0, planetRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 4. Front half of Saturn's rings (passing in front of the sphere)
        ctx.save();
        ctx.rotate(planetAxisTilt + simTime * 0.06);
        ctx.strokeStyle = 'rgba(216, 180, 254, 0.85)';
        ctx.lineWidth = 3.5 * planetScale;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.ellipse(0, 0, 56 * planetScale, 16 * planetScale, 0, 0, Math.PI);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(147, 197, 253, 0.65)';
        ctx.lineWidth = 1.8 * planetScale;
        ctx.beginPath();
        ctx.ellipse(0, 0, 46 * planetScale, 13 * planetScale, 0, 0, Math.PI);
        ctx.stroke();
        ctx.restore();

        ctx.restore();

        // ======================================================================
        // D. PILLAR 2: COSMIC ENERGY RIBBON (MOBIUS STRIP) WITH UV PLASMA FLOW
        // ======================================================================
        const mobiusCX = cx + camDollyX * 0.55;
        const mobiusCY = cy + camDollyY * 0.55;
        const mobiusTilt = -0.44;
        const ribbonBaseR = 490 * stageScale;
        const steps = 44;
        const theme = DEPT_THEMES[currentDept] || DEPT_THEMES.council;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        if (theme.isCouncil) {
            // FOUNDING COUNCIL: Vibrant, Majestic Multi-chromatic Energy Ribbon
            // 1. Solar Amber / Gold Aura Fringe
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const wave = Math.sin(3 * theta - simTime * 2.2) * (7 * stageScale) + Math.cos(5 * theta + simTime * 1.6) * (3.5 * stageScale);
                const r = ribbonBaseR + wave - 2.5;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.60)';
            ctx.lineWidth = 18 * stageScale;
            ctx.shadowColor = 'rgba(245, 158, 11, 0.9)';
            ctx.shadowBlur = 28 * stageScale;
            ctx.stroke();

            // 2. Electric Cyan Aberration Fringe
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const wave = Math.sin(3 * theta - simTime * 2.2) * (7 * stageScale) + Math.cos(5 * theta + simTime * 1.6) * (3.5 * stageScale);
                const r = ribbonBaseR + wave + 2.5;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.70)';
            ctx.lineWidth = 13 * stageScale;
            ctx.shadowColor = 'rgba(0, 240, 255, 0.95)';
            ctx.shadowBlur = 22 * stageScale;
            ctx.stroke();

            // 3. Imperial Amethyst Accent Band
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const wave = Math.sin(3 * theta - simTime * 2.2) * (7 * stageScale) + Math.cos(5 * theta + simTime * 1.6) * (3.5 * stageScale);
                const r = ribbonBaseR + wave;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = 'rgba(192, 132, 252, 0.55)';
            ctx.lineWidth = 7 * stageScale;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.85)';
            ctx.shadowBlur = 16 * stageScale;
            ctx.stroke();

            // 4. White Diamond Core Vein
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const caustic = Math.sin(4 * theta - simTime * 3.2) * (4 * stageScale);
                const r = ribbonBaseR + caustic;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2.8 * stageScale;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 16 * stageScale;
            ctx.stroke();
        } else {
            // OTHER DEPARTMENTS: Unique Custom Single/Dual-Hue Astral Energy Ribbon
            // 1. Outer Department Glow
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const wave = Math.sin(3 * theta - simTime * 2.2) * (7 * stageScale) + Math.cos(5 * theta + simTime * 1.6) * (3.5 * stageScale);
                const r = ribbonBaseR + wave - 2.0;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = theme.outerGlow;
            ctx.lineWidth = 15 * stageScale;
            ctx.shadowColor = theme.primary;
            ctx.shadowBlur = 24 * stageScale;
            ctx.stroke();

            // 2. Middle Department Resonance
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const wave = Math.sin(3 * theta - simTime * 2.2) * (7 * stageScale) + Math.cos(5 * theta + simTime * 1.6) * (3.5 * stageScale);
                const r = ribbonBaseR + wave + 2.0;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = theme.midGlow;
            ctx.lineWidth = 10 * stageScale;
            ctx.shadowColor = theme.secondary;
            ctx.shadowBlur = 18 * stageScale;
            ctx.stroke();

            // 3. Central Core Vein
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const caustic = Math.sin(4 * theta - simTime * 3.2) * (4 * stageScale);
                const r = ribbonBaseR + caustic;
                const px = Math.cos(theta) * r;
                const py = Math.sin(theta) * (r * 0.38);
                const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
                const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
                const fx = mobiusCX + rx;
                const fy = mobiusCY + ry;
                if (s === 0) ctx.moveTo(fx, fy);
                else ctx.lineTo(fx, fy);
            }
            ctx.strokeStyle = theme.coreVein;
            ctx.lineWidth = 2.4 * stageScale;
            ctx.shadowColor = theme.primary;
            ctx.shadowBlur = 14 * stageScale;
            ctx.stroke();
        }

        // 4. Flowing Plasma Photons racing endlessly along the spline curve
        const pColors = theme.photonColors || ['#00f0ff', '#ffffff', '#c084fc'];
        ribbonPhotons.forEach((p, pIdx) => {
            p.progress += p.speed * delta;
            if (p.progress > 1) p.progress -= 1;
            if (p.progress < 0) p.progress += 1;

            const curPhotonColor = pColors[pIdx % pColors.length];
            const theta = p.progress * Math.PI * 2;
            const px = Math.cos(theta) * ribbonBaseR;
            const py = Math.sin(theta) * (ribbonBaseR * 0.38);
            const rx = px * Math.cos(mobiusTilt) - py * Math.sin(mobiusTilt);
            const ry = px * Math.sin(mobiusTilt) + py * Math.cos(mobiusTilt);
            const fx = mobiusCX + rx;
            const fy = mobiusCY + ry;

            // Trailing plasma comet tail (2 light passes)
            for (let t = 1; t <= 2; t++) {
                const trailTheta = (p.progress - p.speed * t * 2.2) * Math.PI * 2;
                const tpx = Math.cos(trailTheta) * ribbonBaseR;
                const tpy = Math.sin(trailTheta) * (ribbonBaseR * 0.38);
                const trx = tpx * Math.cos(mobiusTilt) - tpy * Math.sin(mobiusTilt);
                const try_ = tpx * Math.sin(mobiusTilt) + tpy * Math.cos(mobiusTilt);
                ctx.fillStyle = curPhotonColor;
                ctx.globalAlpha = 0.40 / t;
                ctx.beginPath();
                ctx.arc(mobiusCX + trx, mobiusCY + try_, p.size * (1 - t * 0.22) * stageScale, 0, Math.PI * 2);
                ctx.fill();
            }

            // Photon Head
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = curPhotonColor;
            ctx.shadowBlur = p.glowBlur * stageScale;
            ctx.beginPath();
            ctx.arc(fx, fy, p.size * 0.8 * stageScale, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore(); // end screen mode

        // ======================================================================
        // E. PILLAR 4: MYSTIC COMPASS CORE (PULSING POINT LIGHT & SHOCKWAVE RIPPLES)
        // ======================================================================
        const coreCX = cx + camDollyX * 0.70;
        const coreCY = cy + camDollyY * 0.70;

        // Pulsing Point Light Illuminating Scene
        const corePulse = 0.55 + 0.25 * Math.sin(simTime * 2.4);
        const coreLightGrad = ctx.createRadialGradient(coreCX, coreCY, 0, coreCX, coreCY, 240 * stageScale);
        coreLightGrad.addColorStop(0, `rgba(255, 255, 255, ${(0.85 * corePulse).toFixed(2)})`);
        coreLightGrad.addColorStop(0.2, `rgba(0, 240, 255, ${(0.45 * corePulse).toFixed(2)})`);
        coreLightGrad.addColorStop(0.55, `rgba(147, 51, 234, ${(0.22 * corePulse).toFixed(2)})`);
        coreLightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = coreLightGrad;
        ctx.beginPath();
        ctx.arc(coreCX, coreCY, 240 * stageScale, 0, Math.PI * 2);
        ctx.fill();

        // Expanding Cosmic Shockwave Ripple (Every 3.5 Seconds)
        const shockPeriod = 3.5;
        const shockProgress = (simTime % shockPeriod) / shockPeriod;
        const shockRadius = shockProgress * 540 * stageScale;
        const shockAlpha = Math.max(0, (1 - shockProgress) * 0.65);

        if (shockAlpha > 0.01) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${shockAlpha.toFixed(2)})`;
            ctx.lineWidth = 2.4 * stageScale;
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 18 * stageScale;
            ctx.beginPath();
            ctx.arc(coreCX, coreCY, shockRadius, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Click / Department VFX Particle Bursts
        if (clickVfxParticles.length > 0) {
            for (let i = clickVfxParticles.length - 1; i >= 0; i--) {
                const p = clickVfxParticles[i];
                p.x += p.vx * delta;
                p.y += p.vy * delta;
                p.vx *= Math.pow(0.94, delta);
                p.vy *= Math.pow(0.94, delta);
                p.alpha -= p.decay * delta;

                if (p.alpha <= 0) {
                    clickVfxParticles.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();

        // ======================================================================
        // F. PILLAR 1 & 6: 6-DoF TAROT CARDS ORBITING ENGINE WITH DoF BOKEH BLUR
        // ======================================================================
        // Continuous Perspective Focal Index Interpolation
        if (!isDragging) {
            let diff = targetFocalIndex - currentFocalIndex;
            if (diff > N / 2) diff -= N;
            if (diff < -N / 2) diff += N;
            currentFocalIndex = (currentFocalIndex + diff * 0.12 * delta + N) % N;
        }

        const activeIdx = Math.round(currentFocalIndex) % N;
        if (activeIdx !== activeCardIndex) {
            activeCardIndex = activeIdx;
            cardElements.forEach((card, idx) => {
                card.classList.toggle('is-active-card', idx === activeCardIndex);
            });
            const dialRoman = document.getElementById('dialRoman');
            if (dialRoman && currentCards[activeCardIndex]) {
                dialRoman.textContent = `CODEX ${currentCards[activeCardIndex].roman}`;
            }
        }

        const mouseShiftX = currentParallaxX * 18;
        const mouseShiftY = currentParallaxY * 18;
        const mouseRotX = currentParallaxY * 6;
        const mouseRotY = currentParallaxX * 6;

        for (let i = 0; i < N; i++) {
            const card = cardElements[i];
            const state = cardStates[i];
            if (!card || !state) continue;

            const lerpSpd = prefersReducedMotion ? 0.35 : (0.22 * delta);
            const flipSpd = prefersReducedMotion ? 0.35 : (0.20 * delta);

            const focusDiff = state.targetFocus - state.focusP;
            state.focusP += Math.abs(focusDiff) < 0.004 ? focusDiff : focusDiff * lerpSpd;

            const flipDiff = state.targetFlip - state.flipP;
            state.flipP += Math.abs(flipDiff) < 0.004 ? flipDiff : flipDiff * flipSpd;

            const fp = state.focusP;
            const flipDeg = state.flipP * 180;

            // Compute relative perspective coordinate k (Luật xa gần)
            let k = (i - currentFocalIndex) % N;
            if (k > N / 2) k -= N;
            if (k < -N / 2) k += N;

            const absK = Math.abs(k);
            const sign = k > 0 ? 1 : (k < 0 ? -1 : 0);

            // Smart Culling: completely detach cards outside frustum from render tree
            if (absK > 2.8 && fp < 0.01) {
                if (card.style.display !== 'none') {
                    card.style.display = 'none';
                    card.style.pointerEvents = 'none';
                }
                continue;
            }
            if (card.style.display !== 'block') {
                card.style.display = 'block';
                card.style.pointerEvents = 'auto';
            }

            // 1. LATERAL POSITION (Guaranteed non-overlapping distance in perspective)
            const baseSpacing = canvasW < 768 ? 190 : (canvasW < 1024 ? 230 : 275);
            const stride = canvasW < 768 ? 140 : (canvasW < 1024 ? 175 : 210);
            const posX = sign * (absK === 0 ? 0 : baseSpacing + (absK - 1) * stride) * stageScale;

            // 2. DEPTH OF FIELD (Receding into cosmic distance)
            const posZ = -Math.pow(absK, 1.25) * 165 * stageScale;

            // 3. PERSPECTIVE SCALE (Luật xa gần: S = 1 / (1 + distance * factor))
            const baseScale = 1.0 / (1.0 + absK * 0.17);

            // 4. PERSPECTIVE CONVERGENCE (Yaw inward toward focal vanishing point)
            const baseRotY = -sign * Math.min(54, (28 + (absK - 1) * 10));

            // 5. 6-DoF ZERO-GRAVITY FLOATING WITH 180° PHASE OFFSET (Card I vs Card III)
            const phase = (i === 0 ? 0 : (i === 2 ? Math.PI : i * 1.618));
            const floatBobY = Math.sin(simTime * 1.1 + phase) * 10.0 + Math.cos(simTime * 0.55 + phase) * 4.0;
            const floatDriftX = Math.sin(simTime * 0.75 + phase) * 6.0;
            const floatDepthZ = Math.cos(simTime * 0.85 + phase) * 7.5;
            const floatPitchX = Math.cos(simTime * 0.8 + phase) * 4.0;
            const floatYawY = Math.sin(simTime * 0.6 + phase) * 3.5;
            const floatRollZ = Math.sin(simTime * 0.7 + phase) * 4.5;

            // 6. TRAJECTORY ALONG COSMIC ENERGY RIBBON (Hovering along strip slope & curve)
            const stripSlopeY = posX * Math.tan(mobiusTilt) * 0.72;
            const stripSagY = (Math.pow(posX, 2) / (2.2 * ribbonBaseR)) * 0.22;
            const stripTrajectoryY = stripSlopeY + stripSagY;
            const stripRollZ = (mobiusTilt * (180 / Math.PI) * 0.40) * (1.0 - Math.min(2.5, absK) * 0.12);

            // Combining Ribbon Trajectory + Float + Mouse Parallax
            const orbitX = posX + floatDriftX + mouseShiftX;
            const orbitY = stripTrajectoryY + floatBobY + mouseShiftY;
            const orbitZ = posZ + floatDepthZ;
            const orbitRotX = floatPitchX + mouseRotX;
            const orbitRotY = baseRotY + floatYawY + mouseRotY;
            const orbitRotZ = stripRollZ + floatRollZ;
            const orbitScale = baseScale;

            // Focused / Revealed State (when clicked)
            const focusX = mouseShiftX * 0.4;
            const focusY = -35 + mouseShiftY * 0.4;
            const focusZ = 60;
            const focusRotX = 0 + mouseRotX * 0.2;
            const focusRotY = mouseRotY * 0.2;
            const focusRotZ = 0;
            const focusScale = 1.05;

            // Smooth fluid interpolation between orbit and focus
            const curX = orbitX * (1 - fp) + focusX * fp;
            const curY = orbitY * (1 - fp) + focusY * fp;
            const curZ = orbitZ * (1 - fp) + focusZ * fp;
            const curRotX = orbitRotX * (1 - fp) + focusRotX * fp;
            const curRotY = orbitRotY * (1 - fp) + focusRotY * fp;
            const curRotZ = orbitRotZ * (1 - fp) + focusRotZ * fp;
            const curScale = orbitScale * (1 - fp) + focusScale * fp;

            // Card flipper
            const flipper = card.querySelector('.gacha-card-flipper');
            if (flipper) {
                flipper.style.transform = `rotateY(${flipDeg.toFixed(2)}deg)`;
            }

            card.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, ${curZ.toFixed(2)}px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) rotateZ(${curRotZ.toFixed(2)}deg) scale(${curScale.toFixed(3)})`;

            // HARDWARE-ACCELERATED PERSPECTIVE FALLOFF (Zero Gaussian shader cost)
            const atmosphericOpacity = Math.max(0.18, 1.0 - absK * 0.24);
            const zIndex = Math.round((500 - absK * 80) * (1 - fp) + 900 * fp);

            card.style.opacity = (atmosphericOpacity * (1 - fp) + 1.0 * fp).toFixed(3);
            card.style.zIndex = zIndex;
            if (card.style.filter) card.style.filter = '';
        }
    }

    window.revealCardIndex = revealCardIndex;
    window.onCardClicked = onCardClicked;
    window.closeCardDetail = closeCardDetail;

    // 8. INITIALIZE ENGINE
    let initDept = 'council';
    let autoRevealIdx = null;

    if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const parts = hash.split('-');
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'dept' && parts[i+1]) {
                initDept = parts[i+1];
            }
            if (parts[i] === 'reveal' && parts[i+1] !== undefined) {
                autoRevealIdx = parseInt(parts[i+1], 10);
            }
        }
    }

    selectOrbitDept(initDept);
    requestAnimationFrame(renderCosmicScene);

    if (autoRevealIdx !== null && !isNaN(autoRevealIdx)) {
        setTimeout(() => {
            rotateWheelTo(autoRevealIdx);
            revealCardIndex(autoRevealIdx);
        }, 350);
    }

})();
