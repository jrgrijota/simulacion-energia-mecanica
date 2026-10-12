// ═══════════════════════════════════════════════════════════════════
//  SIMULACIÓN: ENERGÍA MECÁNICA EN UNA MONTAÑA RUSA O UN PÉNDULO
//  Física y Química para Secundaria y Bachillerato
//  La física está en physics.js; aquí se dibuja y se conectan los controles.
// ═══════════════════════════════════════════════════════════════════

// Números con coma decimal, como se escriben en clase (punto en inglés).
function fmt(x, d) {
    return i18n.num(x, d);
}

// Energía con unidad adecuada: kJ a partir de 10 000 J.
function fmtE(E) {
    const a = Math.abs(E);
    if (a >= 10000) return { v: fmt(E / 1000, 1), u: 'kJ' };
    if (a >= 100)   return { v: fmt(E, 0), u: 'J' };
    if (a >= 10)    return { v: fmt(E, 1), u: 'J' };
    return { v: fmt(E, 2), u: 'J' };
}
function fmtEStr(E) {
    const f = fmtE(E);
    return `${f.v} ${f.u}`;
}

// --- MODELOS FÍSICOS ---
const coaster  = new Coaster();
const pendulum = new Pendulum();
let currentMode = 'coaster';   // 'coaster' | 'pendulum'
let coasterS0 = coaster.track.sForHeight(25);   // punto de salida actual
let pendTheta0 = Math.PI / 4;                  // ángulo de salida (con signo)

// --- REPRODUCCIÓN ---
let running   = true;
let simSpeed  = 1;
const DT_MAX  = 1 / 1200;     // paso máximo de integración (s)
const HIST_DT = 1 / 30;       // un punto de la gráfica cada 1/30 s
const HIST_WINDOW = 20;       // segundos visibles en la gráfica
let energyHist = [];
let nextSample = 0;

// --- INTERACCIÓN ---
let dragging   = false;
let showVector = false;
let THEME = {};

// --- LAYOUT DEL CANVAS ---
const CV_W = 1050, CV_H = 700;
const SCENE = { x: 16, y: 16, w: 698, h: 438 };
const BARS  = { x: 730, y: 16, w: 304, h: 438 };
const GRAPH = { x: 16, y: 470, w: 1018, h: 214 };

// Escala de la montaña rusa (metros → píxeles)
const CK = 10.4;                                  // px por metro
const C_X0 = SCENE.x + (SCENE.w - TRACK_LEN_X * CK) / 2;
const C_GROUND = SCENE.y + SCENE.h - 46;          // y del nivel h = 0

// --- DOM ---
let sliderH0, sliderV0, sliderMc, sliderLen, sliderAng, sliderMp, sliderMu, sliderB;
let trackSelect, gravitySelect, frictionToggle, playBtn;

// ─────────────────────────────────────────────────────────────────
function setup() {
    const canvas = createCanvas(CV_W, CV_H);
    canvas.parent('canvas-container');
    frameRate(60);
    textFont('monospace');

    sliderH0  = select('#slider-h0');
    sliderV0  = select('#slider-v0');
    sliderMc  = select('#slider-mc');
    sliderLen = select('#slider-len');
    sliderAng = select('#slider-ang');
    sliderMp  = select('#slider-mp');
    sliderMu  = select('#slider-mu');
    sliderB   = select('#slider-b');
    trackSelect    = select('#track-profile');
    gravitySelect  = select('#gravity-select');
    frictionToggle = document.getElementById('friction-toggle');
    playBtn        = document.getElementById('btn-play');

    // Deslizadores: actualizan su etiqueta y reinician el movimiento
    sliderH0.input(() => { coasterS0 = coaster.track.sForHeight(parseFloat(sliderH0.value())); resetSim(); });
    sliderV0.input(resetSim);
    sliderMc.input(resetSim);
    sliderLen.input(resetSim);
    sliderAng.input(() => { pendTheta0 = radians(parseFloat(sliderAng.value())); resetSim(); });
    sliderMp.input(resetSim);
    // El rozamiento se puede cambiar sin reiniciar: así se ve el efecto en marcha
    sliderMu.input(applyFriction);
    sliderB.input(applyFriction);
    frictionToggle.addEventListener('change', applyFriction);

    trackSelect.changed(() => {
        coaster.setProfile(trackSelect.value());
        coasterS0 = coaster.track.sForHeight(parseFloat(sliderH0.value()));
        resetSim();
    });
    gravitySelect.changed(resetSim);

    select('#mode-coaster').mousePressed(() => setMode('coaster'));
    select('#mode-pendulum').mousePressed(() => setMode('pendulum'));

    playBtn.addEventListener('click', () => setRunning(!running));
    document.getElementById('btn-reset').addEventListener('click', resetSim);

    document.querySelectorAll('.seg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            simSpeed = parseFloat(btn.dataset.speed);
            document.querySelectorAll('.seg-btn').forEach(b => b.classList.toggle('active', b === btn));
        });
    });

    const vecBtn = document.getElementById('vec-toggle');
    vecBtn.addEventListener('click', () => {
        showVector = !showVector;
        vecBtn.setAttribute('aria-pressed', String(showVector));
        vecBtn.classList.toggle('active', showVector);
    });

    setupThemePanel();
    applyFriction();
    resetSim();
}

function setupThemePanel() {
    const themeBtn   = document.getElementById('theme-btn');
    const themePanel = document.getElementById('theme-panel');
    const themeOpts  = document.querySelectorAll('.theme-opt');

    const close = () => {
        themePanel.classList.remove('open');
        themeBtn.classList.remove('active');
        themeBtn.setAttribute('aria-expanded', 'false');
        themePanel.setAttribute('aria-hidden', 'true');
    };

    themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = themePanel.classList.toggle('open');
        themeBtn.classList.toggle('active', isOpen);
        themeBtn.setAttribute('aria-expanded', String(isOpen));
        themePanel.setAttribute('aria-hidden', String(!isOpen));
    });
    document.addEventListener('click', (e) => {
        if (!themeBtn.contains(e.target) && !themePanel.contains(e.target)) close();
    });
    themeOpts.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.body.classList.remove('theme-light', 'theme-contrast');
            if (theme !== 'dark') document.body.classList.add('theme-' + theme);
            themeOpts.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            close();
        });
    });
}

// ─────────────────────────────────────────────────────────────────
//  ESTADO Y CONTROLES
// ─────────────────────────────────────────────────────────────────
function activeModel() {
    return currentMode === 'coaster' ? coaster : pendulum;
}

function setMode(mode) {
    currentMode = mode;
    document.body.classList.toggle('mode-coaster', mode === 'coaster');
    document.body.classList.toggle('mode-pendulum', mode === 'pendulum');
    document.getElementById('mode-coaster').classList.toggle('active', mode === 'coaster');
    document.getElementById('mode-pendulum').classList.toggle('active', mode === 'pendulum');
    resetSim();
}

function setRunning(on) {
    running = on;
    playBtn.textContent = i18n.t(running ? '⏸ Pausar' : '▶ Continuar');
}

// Lee los controles, coloca el cuerpo en el punto de salida y borra la gráfica.
function resetSim() {
    const g = GRAVEDADES[gravitySelect.value()];
    if (currentMode === 'coaster') {
        coaster.g = g;
        coaster.m = parseFloat(sliderMc.value());
        coaster.reset(coasterS0, parseFloat(sliderV0.value()));
    } else {
        pendulum.g = g;
        pendulum.L = parseFloat(sliderLen.value());
        pendulum.m = parseFloat(sliderMp.value());
        pendulum.reset(pendTheta0);
    }
    applyFriction();
    energyHist = [];
    nextSample = 0;
    sampleHistory();
    updateLabels();
}

function applyFriction() {
    const on = frictionToggle.checked;
    coaster.friction = on;
    pendulum.friction = on;
    coaster.mu = parseFloat(sliderMu.value());
    pendulum.b = parseFloat(sliderB.value());
    // Si estaba parada por rozamiento y se quita, puede volver a moverse
    if (!on) coaster.stopped = false;
    sliderMu.elt.disabled = !on;
    sliderB.elt.disabled = !on;
    document.getElementById('wrap-mu').classList.toggle('is-disabled', !on);
    document.getElementById('wrap-b').classList.toggle('is-disabled', !on);
    updateLabels();
}

function updateLabels() {
    select('#val-h0').html(`${fmt(parseFloat(sliderH0.value()), 1)} m`);
    select('#val-v0').html(`${fmt(parseFloat(sliderV0.value()), 1)} m/s`);
    select('#val-mc').html(`${sliderMc.value()} kg`);
    select('#val-len').html(`${fmt(parseFloat(sliderLen.value()), 1)} m`);
    select('#val-ang').html(`${sliderAng.value()}°`);
    select('#val-mp').html(`${fmt(parseFloat(sliderMp.value()), 1)} kg`);
    select('#val-mu').html(fmt(parseFloat(sliderMu.value()), 2));
    select('#val-b').html(`${fmt(parseFloat(sliderB.value()), 2)} kg/s`);
    [[sliderH0, 5, 30], [sliderV0, 0, 15], [sliderMc, 100, 1000], [sliderLen, 0.5, 5],
     [sliderAng, 5, 90], [sliderMp, 0.1, 5], [sliderMu, 0.01, 0.2], [sliderB, 0.01, 0.5]]
        .forEach(([s, a, b]) => setSliderFill(s, a, b));
}

function setSliderFill(slider, minV, maxV) {
    const pct = ((parseFloat(slider.value()) - minV) / (maxV - minV)) * 100;
    slider.elt.style.setProperty('--fill', pct.toFixed(1) + '%');
}

function sampleHistory() {
    const m = activeModel();
    energyHist.push({ t: m.t, ec: m.ec(), ep: m.ep(), em: m.em(), q: m.Q });
    nextSample = m.t + HIST_DT;
    while (energyHist.length > 2 && energyHist[0].t < m.t - HIST_WINDOW - 1) energyHist.shift();
}

// ─────────────────────────────────────────────────────────────────
function draw() {
    updateTheme();
    background(THEME.canvasBg);

    // 1. AVANZAR LA FÍSICA (varios pasos pequeños por fotograma)
    if (running && !dragging) {
        const m = activeModel();
        const frameDt = Math.min(deltaTime / 1000, 1 / 20) * simSpeed;
        const n = Math.max(1, Math.ceil(frameDt / DT_MAX));
        for (let i = 0; i < n; i++) {
            m.step(frameDt / n);
            if (m.t >= nextSample) sampleHistory();
        }
    }

    // 2. DIBUJO
    if (currentMode === 'coaster') drawCoasterScene();
    else                           drawPendulumScene();
    drawEnergyBars();
    drawGraph();

    // 3. PANEL HTML
    updateUI();
}

// ═══════════════════════════════════════════════════════════════════
//  TEMAS DEL LIENZO
// ═══════════════════════════════════════════════════════════════════
function updateTheme() {
    const isLight    = document.body.classList.contains('theme-light');
    const isContrast = document.body.classList.contains('theme-contrast');
    if (isLight) {
        THEME = {
            canvasBg: '#ccd6e8', panelBg: '#b8c8dc', panelBorder: '#6888a0',
            sky: ['#dce8f6', '#c4d4ea'], ground: '#9aa88a', groundLine: '#5a6a4a',
            rail: '#3a4858', railTie: '#6a7888', pillar: '#7a8898',
            text: '#0d1520', textDim: '#3a4a5a', textFaint: '#5a6a7a', grid: color(30, 50, 80, 40),
            car: '#d03030', carDark: '#901818', wheel: '#202830', bob: '#c02828', string: '#2a3440',
            beam: '#5a4a3a',
            ec: '#16a34a', ep: '#0284c7', em: '#ca8a04', q: '#ea580c', vec: '#7c3aed',
            msgBg: color(255, 255, 255, 210),
        };
    } else if (isContrast) {
        THEME = {
            canvasBg: '#000000', panelBg: '#000000', panelBorder: '#ffff00',
            sky: ['#000000', '#000000'], ground: '#1a1a00', groundLine: '#ffff00',
            rail: '#ffffff', railTie: '#888888', pillar: '#666666',
            text: '#ffffff', textDim: '#ffff00', textFaint: '#cccccc', grid: color(255, 255, 0, 60),
            car: '#ff3333', carDark: '#ffffff', wheel: '#ffffff', bob: '#ff3333', string: '#ffffff',
            beam: '#ffff00',
            ec: '#00ff66', ep: '#00ffff', em: '#ffff00', q: '#ff9900', vec: '#ff66ff',
            msgBg: color(0, 0, 0, 230),
        };
    } else {
        THEME = {
            canvasBg: '#141414', panelBg: '#141c24', panelBorder: '#22303c',
            sky: ['#16202c', '#121820'], ground: '#1d2418', groundLine: '#3a4a30',
            rail: '#b8c4d0', railTie: '#4a5866', pillar: '#2e3a46',
            text: '#e0e8f0', textDim: '#8a9aaa', textFaint: '#5a6a7a', grid: color(255, 255, 255, 22),
            car: '#ff4d4d', carDark: '#a02020', wheel: '#0a0a0a', bob: '#ff5a5a', string: '#9aa8b8',
            beam: '#6a5a48',
            ec: '#4ade80', ep: '#38bdf8', em: '#facc15', q: '#fb923c', vec: '#c084fc',
            msgBg: color(10, 16, 24, 220),
        };
    }
}

function drawSceneFrame() {
    noStroke();
    const c1 = color(THEME.sky[0]), c2 = color(THEME.sky[1]);
    for (let i = 0; i < SCENE.h; i += 4) {
        fill(lerpColor(c1, c2, i / SCENE.h));
        rect(SCENE.x, SCENE.y + i, SCENE.w, 4);
    }
    noFill();
    stroke(THEME.panelBorder);
    strokeWeight(1);
    rect(SCENE.x, SCENE.y, SCENE.w, SCENE.h, 8);
}

// ═══════════════════════════════════════════════════════════════════
//  MONTAÑA RUSA
// ═══════════════════════════════════════════════════════════════════
function cx(x) { return C_X0 + x * CK; }
function cy(h) { return C_GROUND - h * CK; }

function drawCoasterScene() {
    drawSceneFrame();
    const tr = coaster.track;

    // Suelo
    noStroke();
    fill(THEME.ground);
    rect(SCENE.x + 1, C_GROUND + 8, SCENE.w - 2, SCENE.y + SCENE.h - C_GROUND - 9, 0, 0, 8, 8);
    stroke(THEME.groundLine);
    strokeWeight(1.5);
    line(SCENE.x + 1, C_GROUND + 8, SCENE.x + SCENE.w - 1, C_GROUND + 8);

    // Eje de alturas
    drawHeightAxis();

    // Pilares
    stroke(THEME.pillar);
    strokeWeight(3);
    for (let x = 1.5; x < TRACK_LEN_X; x += 3) {
        const h = profileHeight(tr.key, x);
        if (h > 0.6) line(cx(x), cy(h) + 4, cx(x), C_GROUND + 8);
    }

    // Altura máxima alcanzable: Em / (m·g). Con rozamiento baja con el tiempo.
    drawReachLines(coaster.E0 / (coaster.m * coaster.g), coaster.em() / (coaster.m * coaster.g),
                   cx(0) - 6, cx(TRACK_LEN_X) + 6, cy);

    // Raíles: dos líneas paralelas y traviesas
    const step = 2;
    stroke(THEME.railTie);
    strokeWeight(2);
    for (let i = 0; i <= tr.N; i += 12) {
        const x = tr.x[i], h = tr.h[i];
        const g = tr.geom(tr.s[i]);
        const nx = -g.sin, ny = g.cos;   // normal hacia arriba (en metros)
        line(cx(x) - nx * 5, cy(h) + ny * 5, cx(x) + nx * 1, cy(h) - ny * 1);
    }
    noFill();
    stroke(THEME.rail);
    strokeWeight(2.5);
    beginShape();
    for (let i = 0; i <= tr.N; i += step) vertex(cx(tr.x[i]), cy(tr.h[i]));
    endShape();
    strokeWeight(1.5);
    beginShape();
    for (let i = 0; i <= tr.N; i += step) {
        const g = tr.geom(tr.s[i]);
        vertex(cx(tr.x[i]) + g.sin * 5, cy(tr.h[i]) + g.cos * 5);
    }
    endShape();

    // Topes en los extremos
    fill(THEME.textFaint);
    noStroke();
    rect(cx(0) - 6, cy(tr.h[0]) - 10, 6, 14, 2);
    rect(cx(TRACK_LEN_X), cy(tr.h[tr.N]) - 10, 6, 14, 2);

    // Punto de salida
    const g0 = tr.geom(coasterS0);
    stroke(THEME.textDim);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(cx(g0.x), cy(g0.h) - 22, cx(g0.x), cy(g0.h) - 6);
    drawingContext.setLineDash([]);
    noStroke();
    fill(THEME.textDim);
    textSize(10);
    textAlign(RIGHT, BOTTOM);
    text(i18n.t('salida'), cx(g0.x) - 4, cy(g0.h) - 14);

    // Vagoneta
    const geo = tr.geom(coaster.s);
    drawHeightMarker(cx(geo.x), cy(geo.h) - 10, C_GROUND, geo.h, 'right');
    drawCart(cx(geo.x), cy(geo.h), Math.atan2(-geo.sin, geo.cos));

    if (showVector) {
        const sc = 80 / vRef(coaster);                               // px por m/s
        drawVelocity(cx(geo.x) - geo.sin * 12, cy(geo.h) - geo.cos * 12,
                     geo.cos * coaster.v * sc, -geo.sin * coaster.v * sc, coaster.speed());
    }

    // Rótulos
    drawSceneTitle(i18n.t('MONTAÑA RUSA'),
        `m = ${fmt(coaster.m, 0)} kg · g = ${fmt(coaster.g, 2)} m/s²` +
        (coaster.friction ? ` · μ = ${fmt(coaster.mu, 2)}` : ` · ${i18n.t('sin rozamiento')}`));

    if (coaster.stopped) {
        drawMessage(i18n.t('La vagoneta se ha detenido: el rozamiento ha transformado en calor la energía mecánica que le faltaba.'));
    }
}

function drawHeightAxis() {
    stroke(THEME.textFaint);
    strokeWeight(1);
    const ax = SCENE.x + 22;
    line(ax, cy(0), ax, cy(32));
    textSize(9);
    textAlign(RIGHT, CENTER);
    for (let h = 0; h <= 30; h += 5) {
        stroke(THEME.textFaint);
        line(ax - 3, cy(h), ax + 3, cy(h));
        stroke(THEME.grid);
        line(ax + 4, cy(h), SCENE.x + SCENE.w - 6, cy(h));
        noStroke();
        fill(THEME.textFaint);
        text(h, ax - 5, cy(h));
        stroke(THEME.textFaint);
    }
    noStroke();
    textAlign(LEFT, BOTTOM);
    text(i18n.t('h (m)'), ax - 14, cy(32) - 6);
}

// Líneas de «altura máxima alcanzable»: la inicial (tenue) y la actual (Em / m·g).
function drawReachLines(hInit, hNow, x1, x2, toY, dec = 1, hTop = 33.5, labelLeft = false) {
    textSize(10);
    if (hInit <= hTop) {
        stroke(THEME.textFaint);
        strokeWeight(1);
        drawingContext.setLineDash([2, 5]);
        line(x1, toY(hInit), x2, toY(hInit));
        drawingContext.setLineDash([]);
    }
    if (hNow <= hTop) {
        stroke(THEME.em);
        strokeWeight(1.5);
        drawingContext.setLineDash([7, 5]);
        line(x1, toY(hNow), x2, toY(hNow));
        drawingContext.setLineDash([]);
        noStroke();
        fill(THEME.em);
        textAlign(labelLeft ? LEFT : RIGHT, BOTTOM);
        text(i18n.t('altura máx. alcanzable = Em/(m·g) = {h} m', { h: fmt(hNow, dec) }),
             labelLeft ? x1 + 4 : x2 - 4, toY(hNow) - 3);
    } else {
        noStroke();
        fill(THEME.em);
        textAlign(RIGHT, TOP);
        text(i18n.t('altura máx. alcanzable = Em/(m·g) = {h} m', { h: fmt(hNow, dec) }) + ' ↑', x2 - 4, SCENE.y + 40);
    }
}

function drawCart(px, py, ang) {
    push();
    translate(px, py);
    rotate(ang);
    scale(1.3);
    // ruedas
    noStroke();
    fill(THEME.wheel);
    circle(-9, -3, 7);
    circle(9, -3, 7);
    // caja
    fill(THEME.car);
    stroke(THEME.carDark);
    strokeWeight(1.5);
    rect(-16, -20, 32, 15, 4, 4, 2, 2);
    // pasajero
    noStroke();
    fill(THEME.carDark);
    rect(-4, -27, 9, 8, 3);
    fill(THEME.text);
    circle(0.5, -30, 7);
    pop();
}

// Línea discontinua desde el cuerpo al nivel h = 0 con el valor de la altura.
function drawHeightMarker(px, pyTop, pyGround, h, side) {
    if (h < 0.05) return;
    stroke(THEME.ep);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(px, pyTop, px, pyGround);
    drawingContext.setLineDash([]);
    noStroke();
    fill(THEME.ep);
    textSize(11);
    textAlign(side === 'right' ? LEFT : RIGHT, CENTER);
    text(`h = ${fmt(h, 2)} m`, px + (side === 'right' ? 6 : -6), (pyTop + pyGround) / 2 + 10);
}

// Rapidez máxima posible (toda la energía inicial como cinética): fija la escala
// del vector velocidad para que la flecha más larga mida siempre lo mismo.
function vRef(m) {
    return Math.max(Math.sqrt(2 * m.E0 / m.m), 0.5);
}

function drawVelocity(px, py, dx, dy, v) {
    if (v < 0.02) return;
    const len = Math.hypot(dx, dy);
    stroke(THEME.vec);
    strokeWeight(2.5);
    fill(THEME.vec);
    line(px, py, px + dx, py + dy);
    if (len > 4) {
        const a = Math.atan2(dy, dx);
        push();
        translate(px + dx, py + dy);
        rotate(a);
        noStroke();
        triangle(0, 0, -9, -4.5, -9, 4.5);
        pop();
    }
    noStroke();
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(`v = ${fmt(v, 1)} m/s`, px + dx, py + dy - 8);
}

function drawSceneTitle(title, sub) {
    noStroke();
    fill(THEME.textDim);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(title, SCENE.x + 48, SCENE.y + 12);
    textStyle(NORMAL);
    fill(THEME.textFaint);
    textSize(10);
    text(sub, SCENE.x + 48, SCENE.y + 27);
}

function drawMessage(msg) {
    const w = SCENE.w - 140;
    textSize(12);
    textAlign(CENTER, CENTER);
    fill(THEME.msgBg);
    stroke(THEME.q);
    strokeWeight(1.5);
    rect(SCENE.x + 70, SCENE.y + 50, w, 44, 8);
    noStroke();
    fill(THEME.q);
    text(msg, SCENE.x + 80, SCENE.y + 52, w - 20, 40);
}

// ═══════════════════════════════════════════════════════════════════
//  PÉNDULO
// ═══════════════════════════════════════════════════════════════════
const P_PIVOT = { x: SCENE.x + SCENE.w / 2, y: SCENE.y + 64 };

// Longitud dibujada del hilo: crece con L, pero sin salirse de la escena.
function pendPixelLen() {
    return 150 + 36 * pendulum.L;
}

function drawPendulumScene() {
    drawSceneFrame();
    const Lpx = pendPixelLen();
    const k = Lpx / pendulum.L;                  // px por metro en esta escena
    const yLow = P_PIVOT.y + Lpx;                // nivel h = 0
    const toY = (h) => yLow - h * k;

    // Soporte
    noStroke();
    fill(THEME.beam);
    rect(P_PIVOT.x - 90, P_PIVOT.y - 14, 180, 12, 3);
    stroke(THEME.beam);
    strokeWeight(1);
    for (let x = -84; x < 90; x += 10) line(P_PIVOT.x + x, P_PIVOT.y - 14, P_PIVOT.x + x + 6, P_PIVOT.y - 20);

    // Arco de la trayectoria posible
    noFill();
    stroke(THEME.grid);
    strokeWeight(1.5);
    drawingContext.setLineDash([3, 5]);
    arc(P_PIVOT.x, P_PIVOT.y, 2 * Lpx, 2 * Lpx, 0, PI);
    drawingContext.setLineDash([]);

    // Nivel de referencia h = 0
    stroke(THEME.textFaint);
    strokeWeight(1);
    line(P_PIVOT.x - Lpx - 20, yLow, P_PIVOT.x + Lpx + 20, yLow);
    noStroke();
    fill(THEME.textFaint);
    textSize(10);
    textAlign(LEFT, TOP);
    text(i18n.t('h = 0 (punto más bajo)'), P_PIVOT.x + 12, yLow + 4);

    // Altura máxima alcanzable con la energía mecánica actual
    drawReachLines(pendulum.E0 / (pendulum.m * pendulum.g), pendulum.em() / (pendulum.m * pendulum.g),
                   SCENE.x + 40, SCENE.x + SCENE.w - 12, toY, 3, pendulum.L * 1.02, true);

    // Hilo y bola
    const bx = P_PIVOT.x + Lpx * Math.sin(pendulum.theta);
    const by = P_PIVOT.y + Lpx * Math.cos(pendulum.theta);
    stroke(THEME.string);
    strokeWeight(1.5);
    line(P_PIVOT.x, P_PIVOT.y, bx, by);
    fill(THEME.text);
    noStroke();
    circle(P_PIVOT.x, P_PIVOT.y, 7);

    // Ángulo
    stroke(THEME.textFaint);
    strokeWeight(1);
    drawingContext.setLineDash([3, 4]);
    line(P_PIVOT.x, P_PIVOT.y, P_PIVOT.x, P_PIVOT.y + 70);
    drawingContext.setLineDash([]);
    noFill();
    const th = pendulum.theta;
    if (Math.abs(th) > 0.02) {
        arc(P_PIVOT.x, P_PIVOT.y, 90, 90, HALF_PI - Math.max(th, 0), HALF_PI - Math.min(th, 0));
        noStroke();
        fill(THEME.textDim);
        textSize(11);
        textAlign(CENTER, CENTER);
        text(`θ = ${fmt(degrees(Math.abs(th)), 1)}°`, P_PIVOT.x - Math.sin(th / 2) * 58 + (th >= 0 ? -22 : 22), P_PIVOT.y + Math.cos(th / 2) * 40);
    }

    // Longitud del hilo
    noStroke();
    fill(THEME.textFaint);
    textSize(10);
    textAlign(CENTER, CENTER);
    const mx = P_PIVOT.x + 0.62 * (bx - P_PIVOT.x), my = P_PIVOT.y + 0.62 * (by - P_PIVOT.y);
    const side = th >= 0 ? 1 : -1;
    // fuera del ángulo: perpendicular al hilo, hacia el lado contrario a la vertical
    text(`L = ${fmt(pendulum.L, 1)} m`, mx + side * 40 * Math.cos(th), my - side * 40 * Math.sin(th));

    drawHeightMarker(bx, by, yLow, pendulum.height(), th >= 0 ? 'right' : 'left');

    const r = 9 + 5 * Math.sqrt(pendulum.m);
    stroke(THEME.carDark);
    strokeWeight(1.5);
    fill(THEME.bob);
    circle(bx, by, 2 * r);
    noStroke();
    fill(255, 255, 255, 90);
    circle(bx - r * 0.3, by - r * 0.3, r * 0.6);

    if (showVector) {
        // Tangente a la trayectoria en el sentido de θ creciente: (cos θ, −sin θ) en pantalla
        const v = pendulum.omega * pendulum.L;
        const sc = 80 / vRef(pendulum);
        drawVelocity(bx, by, Math.cos(th) * v * sc, -Math.sin(th) * v * sc, Math.abs(v));
    }

    const period = 2 * Math.PI * Math.sqrt(pendulum.L / pendulum.g);
    drawSceneTitle(i18n.t('PÉNDULO SIMPLE'),
        `m = ${fmt(pendulum.m, 1)} kg · g = ${fmt(pendulum.g, 2)} m/s²` +
        (pendulum.friction ? ` · b = ${fmt(pendulum.b, 2)} kg/s` : ` · ${i18n.t('sin rozamiento')}`) +
        ` · T ≈ ${fmt(period, 2)} s`);
}

// ═══════════════════════════════════════════════════════════════════
//  BARRAS DE ENERGÍA
// ═══════════════════════════════════════════════════════════════════
function drawEnergyBars() {
    const m = activeModel();
    const P = BARS;
    fill(THEME.panelBg);
    stroke(THEME.panelBorder);
    strokeWeight(1);
    rect(P.x, P.y, P.w, P.h, 8);

    noStroke();
    fill(THEME.textDim);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(i18n.t('ENERGÍAS'), P.x + 14, P.y + 12);
    textStyle(NORMAL);

    const E0 = Math.max(m.E0, 1e-9);
    const top = P.y + 62, bottom = P.y + P.h - 74;
    const H = bottom - top;
    const bars = [
        { key: 'Ec', val: m.ec(), col: THEME.ec },
        { key: 'Ep', val: m.ep(), col: THEME.ep },
        { key: 'Em', val: m.em(), col: THEME.em },
        { key: 'Q',  val: m.Q,    col: THEME.q, hatch: true },
    ];
    const bw = 44, gap = (P.w - 28 - bars.length * bw) / (bars.length - 1);

    // Línea de la energía inicial
    stroke(THEME.textFaint);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(P.x + 10, top, P.x + P.w - 10, top);
    drawingContext.setLineDash([]);
    noStroke();
    fill(THEME.textFaint);
    textSize(10);
    textAlign(LEFT, BOTTOM);
    text(i18n.t('E inicial = {e}', { e: fmtEStr(m.E0) }), P.x + 14, top - 4);

    bars.forEach((b, i) => {
        const x = P.x + 14 + i * (bw + gap);
        const hh = constrain(b.val / E0, 0, 1.05) * H;
        // fondo
        fill(THEME.grid);
        rect(x, top, bw, H, 4);
        // valor
        fill(b.col);
        rect(x, bottom - hh, bw, hh, 3);
        if (b.hatch && hh > 2) {
            stroke(THEME.panelBg);
            strokeWeight(2);
            drawingContext.save();
            drawingContext.beginPath();
            drawingContext.rect(x, bottom - hh, bw, hh);
            drawingContext.clip();
            for (let k = -bw; k < hh + bw; k += 9) line(x, bottom - k, x + bw, bottom - k - bw);
            drawingContext.restore();
            noStroke();
        }
        // rótulos
        fill(b.col);
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER, TOP);
        text(b.key === 'Q' ? 'Q' : b.key[0] + b.key[1], x + bw / 2, bottom + 8);
        textStyle(NORMAL);
        textSize(10);
        const f = fmtE(b.val);
        text(f.v, x + bw / 2, bottom + 27);
        text(f.u, x + bw / 2, bottom + 40);
        fill(THEME.textFaint);
        text(`${fmt(100 * b.val / E0, 0)} %`, x + bw / 2, bottom + 54);
    });

    noStroke();
    fill(THEME.textFaint);
    textSize(9.5);
    textAlign(LEFT, TOP);
    text(i18n.t('Ec + Ep = Em      Em + Q = E inicial'), P.x + 14, P.y + 30);
}

// ═══════════════════════════════════════════════════════════════════
//  GRÁFICA ENERGÍA – TIEMPO
// ═══════════════════════════════════════════════════════════════════
function drawGraph() {
    const m = activeModel();
    const G = GRAPH;
    fill(THEME.panelBg);
    stroke(THEME.panelBorder);
    strokeWeight(1);
    rect(G.x, G.y, G.w, G.h, 8);

    const L = G.x + 64, R = G.x + G.w - 16, T = G.y + 34, B = G.y + G.h - 30;
    const tNow = energyHist.length ? energyHist[energyHist.length - 1].t : 0;
    const t0 = Math.max(0, tNow - HIST_WINDOW);
    const t1 = t0 + HIST_WINDOW;
    const E0 = Math.max(m.E0, 1e-9);
    const X = (t) => map(t, t0, t1, L, R);
    const Y = (e) => map(e / E0, 0, 1, B, T);

    noStroke();
    fill(THEME.textDim);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text(i18n.t('ENERGÍA FRENTE AL TIEMPO'), G.x + 14, G.y + 10);
    textStyle(NORMAL);

    // Leyenda
    const leg = [['Ec', THEME.ec], ['Ep', THEME.ep], ['Em', THEME.em], ['Q', THEME.q]];
    textSize(11);
    let lx = R - 4 * 70;
    leg.forEach(([k, c]) => {
        stroke(c);
        strokeWeight(3);
        line(lx, G.y + 17, lx + 18, G.y + 17);
        noStroke();
        fill(c);
        textAlign(LEFT, CENTER);
        text(i18n.t(k), lx + 24, G.y + 17);
        lx += 70;
    });

    // Rejilla
    textSize(9.5);
    for (let p = 0; p <= 1.0001; p += 0.25) {
        stroke(THEME.grid);
        strokeWeight(1);
        line(L, Y(p * E0), R, Y(p * E0));
        noStroke();
        fill(THEME.textFaint);
        textAlign(RIGHT, CENTER);
        text(fmtEStr(p * E0), L - 6, Y(p * E0));
    }
    for (let t = Math.ceil(t0 / 2) * 2; t <= t1 + 1e-6; t += 2) {
        stroke(THEME.grid);
        line(X(t), T, X(t), B);
        noStroke();
        fill(THEME.textFaint);
        textAlign(CENTER, TOP);
        text(fmt(t, 0), X(t), B + 5);
    }
    textAlign(RIGHT, TOP);
    text(i18n.t('t (s)'), R, B + 16);

    // Curvas
    const series = [['q', THEME.q], ['ep', THEME.ep], ['ec', THEME.ec], ['em', THEME.em]];
    noFill();
    series.forEach(([k, c]) => {
        stroke(c);
        strokeWeight(k === 'em' ? 2.5 : 2);
        beginShape();
        for (const p of energyHist) if (p.t >= t0) vertex(X(p.t), Y(p[k]));
        endShape();
    });
}

// ═══════════════════════════════════════════════════════════════════
//  PANEL HTML
// ═══════════════════════════════════════════════════════════════════
let uiTick = 0;
function updateUI() {
    if (++uiTick % 4 !== 0 && running && !dragging) return;   // ~15 veces por segundo
    const m = activeModel();
    const E0 = Math.max(m.E0, 1e-9);
    select('#metric-v').html(fmt(m.speed(), 1));
    select('#metric-h').html(fmt(m.height(), currentMode === 'coaster' ? 1 : 2));
    select('#metric-t').html(fmt(m.t, 1));
    [['ec', m.ec()], ['ep', m.ep()], ['em', m.em()]].forEach(([k, v]) => {
        const f = fmtE(v);
        select('#metric-' + k).html(f.v);
        select('#unit-' + k).html(f.u);
    });
    select('#metric-e0').html(fmtEStr(m.E0));

    const pEc = 100 * m.ec() / E0, pEp = 100 * m.ep() / E0, pQ = 100 * m.Q / E0;
    select('#bb-ec').style('width', pEc.toFixed(2) + '%');
    select('#bb-ep').style('width', pEp.toFixed(2) + '%');
    select('#bb-q').style('width', pQ.toFixed(2) + '%');
    select('#pct-ec').html(`${fmt(pEc, 0)} %`);
    select('#pct-ep').html(`${fmt(pEp, 0)} %`);
    select('#pct-q').html(`${fmt(pQ, 0)} %`);

    let note;
    if (!m.friction) {
        note = i18n.t('Sin rozamiento la energía mecánica se conserva: Ec y Ep se intercambian, pero su suma no cambia.');
    } else if (currentMode === 'coaster' && coaster.stopped) {
        note = i18n.t('Detenida. Se ha disipado como calor el {p} % de la energía inicial ({q}).',
                      { p: fmt(pQ, 0), q: fmtEStr(m.Q) });
    } else {
        note = i18n.t('Con rozamiento queda el {p} % de la energía mecánica inicial; el resto ({q}) se ha transformado en calor.',
                      { p: fmt(100 - pQ, 0), q: fmtEStr(m.Q) });
    }
    select('#balance-note').html(note);
}

// ═══════════════════════════════════════════════════════════════════
//  ARRASTRAR LA VAGONETA O LA BOLA
// ═══════════════════════════════════════════════════════════════════
function bodyScreenPos() {
    if (currentMode === 'coaster') {
        const g = coaster.track.geom(coaster.s);
        return { x: cx(g.x), y: cy(g.h) - 12 };
    }
    const Lpx = pendPixelLen();
    return { x: P_PIVOT.x + Lpx * Math.sin(pendulum.theta), y: P_PIVOT.y + Lpx * Math.cos(pendulum.theta) };
}

function mousePressed() {
    if (mouseX < SCENE.x || mouseX > SCENE.x + SCENE.w || mouseY < SCENE.y || mouseY > SCENE.y + SCENE.h) return;
    const p = bodyScreenPos();
    if (dist(mouseX, mouseY, p.x, p.y) < 34) {
        dragging = true;
        dragTo();
        return false;
    }
}

function mouseDragged() {
    if (!dragging) return;
    dragTo();
    return false;
}

function mouseReleased() {
    if (!dragging) return;
    dragging = false;
    resetSim();
}

function dragTo() {
    if (currentMode === 'coaster') {
        const x = constrain((mouseX - C_X0) / CK, 0, TRACK_LEN_X);
        const h = (C_GROUND - mouseY) / CK;
        coasterS0 = coaster.track.nearestS(x, h);
        coaster.reset(coasterS0, 0);
        energyHist = [];
        sampleHistory();
        const hs = coaster.height();
        sliderH0.value(constrain(Math.round(hs * 2) / 2, 5, 30));
    } else {
        let th = Math.atan2(mouseX - P_PIVOT.x, mouseY - P_PIVOT.y);
        th = constrain(th, -HALF_PI, HALF_PI);
        const deg = constrain(Math.round(degrees(Math.abs(th))), 5, 90);
        sliderAng.value(deg);
        pendTheta0 = (th < 0 ? -1 : 1) * radians(deg);
        pendulum.reset(pendTheta0);
        energyHist = [];
        sampleHistory();
    }
    updateLabels();
}
