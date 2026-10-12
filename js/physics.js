// ═══════════════════════════════════════════════════════════════════
//  FÍSICA: MONTAÑA RUSA Y PÉNDULO
//  Energía cinética, potencial y mecánica, con rozamiento opcional.
//  No dibuja nada: sketch.js lee el estado y lo representa.
// ═══════════════════════════════════════════════════════════════════

const GRAVEDADES = { tierra: 9.8, luna: 1.62, marte: 3.71, jupiter: 24.79 };

// ── Perfiles de la montaña rusa ──────────────────────────────────────
// Cada perfil es h(x) en metros para x de 0 a 60 m. Los tramos entre puntos
// clave se unen con medio coseno: pendiente nula en cimas y valles, sin picos.
// La altura 0 es el punto más bajo de la vía (nivel de referencia de Ep).
const TRACK_LEN_X = 60;
const TRACK_PROFILES = {
    clasica: [[0, 32], [14, 0], [24, 18], [32, 4], [40, 12], [48, 1], [60, 32]],
    colina:  [[0, 32], [14, 0], [28, 27], [42, 0], [60, 32]],
    valle:   null,   // parábola: h = 32 · ((x − 30) / 30)²
};

function profileHeight(key, x) {
    if (key === 'valle') {
        const u = (x - 30) / 30;
        return 32 * u * u;
    }
    const pts = TRACK_PROFILES[key];
    if (x <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) {
        const [x1, h1] = pts[i];
        if (x <= x1) {
            const [x0, h0] = pts[i - 1];
            const f = (1 - Math.cos(Math.PI * (x - x0) / (x1 - x0))) / 2;
            return h0 + (h1 - h0) * f;
        }
    }
    return pts[pts.length - 1][1];
}

// Vía muestreada: posición sobre la vía s (longitud de arco) ↔ (x, h).
class Track {
    constructor(key) {
        this.key = key;
        const N = 1500;
        this.N = N;
        this.dx = TRACK_LEN_X / N;
        this.x = new Float64Array(N + 1);
        this.h = new Float64Array(N + 1);
        this.s = new Float64Array(N + 1);
        for (let i = 0; i <= N; i++) {
            this.x[i] = i * this.dx;
            this.h[i] = profileHeight(key, this.x[i]);
            if (i > 0) {
                const dh = this.h[i] - this.h[i - 1];
                this.s[i] = this.s[i - 1] + Math.hypot(this.dx, dh);
            }
        }
        this.length = this.s[N];
        this.hMax = Math.max(...this.h);
    }

    // Índice del tramo que contiene s y fracción dentro de él.
    locate(s) {
        s = Math.min(Math.max(s, 0), this.length);
        let lo = 0, hi = this.N;
        while (hi - lo > 1) {
            const mid = (lo + hi) >> 1;
            if (this.s[mid] <= s) lo = mid; else hi = mid;
        }
        const ds = this.s[hi] - this.s[lo];
        return { i: lo, f: ds > 0 ? (s - this.s[lo]) / ds : 0 };
    }

    xAt(s) {
        const { i, f } = this.locate(s);
        return this.x[i] + f * this.dx;
    }

    // Altura, pendiente y curvatura analíticas a partir de h(x).
    geom(s) {
        const x = this.xAt(s);
        const e = 1e-3;
        const h  = profileHeight(this.key, x);
        const hp = (profileHeight(this.key, x + e) - profileHeight(this.key, x - e)) / (2 * e);
        const hpp = (profileHeight(this.key, x + e) - 2 * h + profileHeight(this.key, x - e)) / (e * e);
        const k = Math.sqrt(1 + hp * hp);
        return {
            x, h,
            sin: hp / k,             // seno del ángulo de la vía con la horizontal
            cos: 1 / k,
            curv: hpp / (k * k * k), // curvatura con signo (> 0 en los valles)
        };
    }

    // s del punto de la primera bajada (de x = 0 al primer valle) con altura h0.
    sForHeight(h0) {
        let i = 0;
        while (i < this.N && this.h[i + 1] < this.h[i]) i++;
        // tramo 0..i descendente
        for (let j = 0; j < i; j++) {
            if (this.h[j] >= h0 && this.h[j + 1] <= h0) {
                let a = this.s[j], b = this.s[j + 1];
                for (let k = 0; k < 40; k++) {
                    const mid = (a + b) / 2;
                    if (this.geom(mid).h > h0) a = mid; else b = mid;
                }
                return (a + b) / 2;
            }
        }
        return this.s[i];
    }

    // s del punto de la vía más cercano a (x, h), en metros.
    nearestS(x, h) {
        let best = 0, bestD = Infinity;
        for (let i = 0; i <= this.N; i += 2) {
            const d = (this.x[i] - x) ** 2 + (this.h[i] - h) ** 2;
            if (d < bestD) { bestD = d; best = i; }
        }
        return this.s[best];
    }
}

// ── Modelo de la montaña rusa ────────────────────────────────────────
// La vagoneta va sujeta al raíl (como en las montañas rusas reales), así que
// nunca se despega. Con rozamiento, la fuerza de rozamiento es μ·N con
// N = m·g·cos θ, el modelo de clase. Se ignora la parte centrípeta de la normal
// (m·v²·κ): con valles tan cerrados concentraría casi toda la pérdida en ellos.
class Coaster {
    constructor() {
        this.track = new Track('clasica');
        this.m = 500; this.g = 9.8; this.mu = 0; this.friction = false;
        this.reset(this.track.sForHeight(25), 0);
    }

    setProfile(key) { this.track = new Track(key); }

    reset(s0, v0) {
        this.s = s0;
        this.v = v0;            // velocidad con signo a lo largo de la vía (m/s)
        this.Q = 0;             // energía disipada por rozamiento (J)
        this.t = 0;
        this.stopped = false;
        this.E0 = this.ep() + 0.5 * this.m * v0 * v0;
        this.distance = 0;
    }

    height() { return this.track.geom(this.s).h; }
    ep() { return this.m * this.g * this.height(); }
    // Ec se obtiene del balance (Em = E0 − Q) para que Ec + Ep + Q = E0 exactamente.
    em() { return this.E0 - this.Q; }
    ec() { return Math.max(0, this.em() - this.ep()); }
    speed() { return Math.abs(this.v); }
    muEff() { return this.friction ? this.mu : 0; }

    step(dt) {
        if (this.stopped) { this.t += dt; return; }
        const g = this.g, m = this.m, mu = this.muEff();
        const geo = this.track.geom(this.s);
        const N = m * g * geo.cos;
        const fr = mu * N;
        const aGrav = -g * geo.sin;

        // Reposo con rozamiento: la vagoneta solo arranca si la gravedad vence
        // al rozamiento (tan θ > μ, con μ estático = μ dinámico).
        if (Math.abs(this.v) < 1e-6) {
            if (Math.abs(aGrav) <= fr / m) {
                this.v = 0;
                if (mu > 0) this.stopped = true;
                this.t += dt;
                return;
            }
        }

        const dir = Math.abs(this.v) > 1e-6 ? Math.sign(this.v) : -Math.sign(geo.sin);
        const a = aGrav - dir * fr / m;
        let vNew = this.v + a * dt;

        // El rozamiento frena pero no invierte el movimiento: si la velocidad
        // cambia de signo por su culpa, la vagoneta se detiene en ese punto.
        if (mu > 0 && Math.sign(vNew) !== dir && Math.abs(this.v) > 1e-6) {
            if (Math.abs(aGrav) <= fr / m) {
                const sNew = this.s + this.v * dt / 2;
                this.Q += fr * Math.abs(sNew - this.s);
                this.distance += Math.abs(sNew - this.s);
                this.s = sNew;
                this.Q = this.E0 - this.ep();   // en reposo toda la Em es Ep
                this.v = 0;
                this.stopped = true;
                this.t += dt;
                return;
            }
        }

        let sNew = this.s + vNew * dt;
        const ds = Math.abs(sNew - this.s);
        this.Q += fr * ds;
        this.distance += ds;

        // Topes elásticos en los dos extremos de la vía.
        if (sNew < 0) { sNew = -sNew; vNew = -vNew; }
        if (sNew > this.track.length) { sNew = 2 * this.track.length - sNew; vNew = -vNew; }
        this.s = sNew;

        // Corrección por energía: la rapidez sale del balance Em = E0 − Q, así
        // la integración numérica no crea ni destruye energía.
        const ecT = this.em() - this.ep();
        if (ecT > 1e-9 * this.E0 && Math.abs(vNew) > 1e-3) {
            vNew = Math.sign(vNew) * Math.sqrt(2 * ecT / m);
        }
        this.v = vNew;
        this.t += dt;
    }
}

// ── Modelo del péndulo ───────────────────────────────────────────────
// Péndulo simple (hilo inextensible y sin masa) con resistencia del aire
// proporcional a la velocidad: F = −b·v. Potencia disipada: b·v².
class Pendulum {
    constructor() {
        this.L = 2; this.m = 1; this.g = 9.8; this.b = 0; this.friction = false;
        this.reset(45 * Math.PI / 180);
    }

    reset(theta0) {
        this.theta = theta0;
        this.omega = 0;
        this.Q = 0;
        this.t = 0;
        this.E0 = this.ep();
    }

    height() { return this.L * (1 - Math.cos(this.theta)); }
    ep() { return this.m * this.g * this.height(); }
    em() { return this.E0 - this.Q; }
    ec() { return Math.max(0, this.em() - this.ep()); }
    speed() { return Math.abs(this.omega) * this.L; }
    bEff() { return this.friction ? this.b : 0; }

    deriv(th, om) {
        return [om, -(this.g / this.L) * Math.sin(th) - (this.bEff() / this.m) * om];
    }

    step(dt) {
        const th = this.theta, om = this.omega;
        const k1 = this.deriv(th, om);
        const k2 = this.deriv(th + k1[0] * dt / 2, om + k1[1] * dt / 2);
        const k3 = this.deriv(th + k2[0] * dt / 2, om + k2[1] * dt / 2);
        const k4 = this.deriv(th + k3[0] * dt, om + k3[1] * dt);
        const thN = th + dt * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6;
        let omN = om + dt * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6;

        // Energía disipada en el paso (regla del trapecio sobre b·v²).
        const b = this.bEff(), L2 = this.L * this.L;
        this.Q += b * L2 * (om * om + omN * omN) / 2 * dt;
        this.Q = Math.min(this.Q, this.E0);
        this.theta = thN;

        const ecT = this.em() - this.ep();
        if (ecT > 1e-9 * Math.max(this.E0, 1e-9) && Math.abs(omN) > 1e-4) {
            omN = Math.sign(omN) * Math.sqrt(2 * ecT / (this.m * L2));
        }
        this.omega = omN;
        this.t += dt;
    }
}

if (typeof module !== 'undefined') {
    module.exports = { GRAVEDADES, TRACK_PROFILES, profileHeight, Track, Coaster, Pendulum };
}
