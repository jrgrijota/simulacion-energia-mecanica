// Interfazearen euskarazko itzulpenak: «texto en español» → «euskarazko testua».
// js/i18n.js-k erabiltzen ditu orria ?lang=eu-rekin irekitzen denean.
window.I18N_EU = {
    // ── Goiburua ──
    'Energía Mecánica — Simulación Interactiva': 'Energia mekanikoa — Simulazio interaktiboa',
    'Energía Mecánica': 'Energia mekanikoa',
    'Cinética, Potencial y Rozamiento': 'Zinetikoa, potentziala eta marruskadura',
    'Descripción y reglas rápidas': 'Deskribapena eta arau azkarrak',
    'nota-descripcion': 'Askatu bagoneta bat mendi errusiar batean edo pendulu bat, eta ikusi nola bihurtzen den energia potentziala zinetiko eta alderantziz. Aktibatu marruskadura energia mekanikoa beroan nola degradatzen den ikusteko.',
    'regla-conserva': 'Marruskadurarik gabe → E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = konstantea',
    'regla-rozamiento': 'Marruskadurarekin → E<sub>m</sub> txikitu egiten da',
    'regla-balance': 'E<sub>m,hasierakoa</sub> = E<sub>c</sub> + E<sub>p</sub> + Q (beroa)',

    // ── Modu-hautatzailea eta erreprodukzioa ──
    'Montaña rusa': 'Mendi errusiarra',
    'vagoneta en la vía': 'bagoneta trenbidean',
    'Péndulo': 'Pendulua',
    'bola y un hilo': 'bola eta hari bat',
    '⏸ Pausar': '⏸ Pausatu',
    '▶ Continuar': '▶ Jarraitu',
    '↺ Reiniciar': '↺ Berrabiarazi',
    'Velocidad de reproducción': 'Erreprodukzio-abiadura',

    // ── Mendi errusiarra ──
    'Perfil de la vía': 'Trenbidearen profila',
    'Clásica (varias colinas)': 'Klasikoa (zenbait muino)',
    'Colina más alta (27 m)': 'Muino garaiagoa (27 m)',
    'Valle en U': 'U itxurako harana',
    'Altura de salida': 'Irteera-altuera',
    'Velocidad inicial': 'Hasierako abiadura',
    'Masa de la vagoneta': 'Bagonetaren masa',
    'ayuda-arrastrar-vagoneta': 'Bagoneta saguarekin (edo hatzarekin) trenbideko edozein puntutara ere eraman dezakezu.',

    // ── Pendulua ──
    'Longitud del hilo': 'Hariaren luzera',
    'Ángulo inicial': 'Hasierako angelua',
    'Masa de la bola': 'Bolaren masa',
    'ayuda-arrastrar-bola': 'Bola saguarekin (edo hatzarekin) ere eraman dezakezu, beste angelu batetik askatzeko.',

    // ── Ingurunea ──
    'Entorno': 'Ingurunea',
    'Gravedad': 'Grabitatea',
    'Tierra (9,8 m/s²)': 'Lurra (9,8 m/s²)',
    'Luna (1,62 m/s²)': 'Ilargia (1,62 m/s²)',
    'Marte (3,71 m/s²)': 'Marte (3,71 m/s²)',
    'Júpiter (24,79 m/s²)': 'Jupiter (24,79 m/s²)',
    'Rozamiento': 'Marruskadura',
    '(fuerza no conservativa)': '(indar ez-kontserbakorra)',
    'Coeficiente de rozamiento (μ)': 'Marruskadura-koefizientea (μ)',
    'Resistencia del aire (b)': 'Airearen erresistentzia (b)',

    // ── Neurketak ──
    'Monitorización en tiempo real': 'Denbora errealeko jarraipena',
    'Velocidad': 'Abiadura',
    'Altura': 'Altuera',
    'Tiempo': 'Denbora',
    'E. cinética': 'E. zinetikoa',
    'E. potencial': 'E. potentziala',
    'E. mecánica': 'E. mekanikoa',
    'Balance de energía': 'Energia-balantzea',
    'inicial': 'hasierakoa',
    'Sin rozamiento la energía mecánica se conserva: Ec y Ep se intercambian, pero su suma no cambia.':
        'Marruskadurarik gabe energia mekanikoa kontserbatu egiten da: Ec eta Ep elkarrekin trukatzen dira, baina haien batura ez da aldatzen.',
    'Con rozamiento queda el {p} % de la energía mecánica inicial; el resto ({q}) se ha transformado en calor.':
        'Marruskadurarekin hasierako energia mekanikoaren % {p} geratzen da; gainerakoa ({q}) bero bihurtu da.',
    'Detenida. Se ha disipado como calor el {p} % de la energía inicial ({q}).':
        'Geldituta. Hasierako energiaren % {p} ({q}) bero gisa xahutu da.',

    // ── Formulak ──
    'Fórmulas esenciales': 'Funtsezko formulak',
    'E. cinética:': 'E. zinetikoa:',
    'E. potencial:': 'E. potentziala:',
    'E. mecánica:': 'E. mekanikoa:',
    'Sin rozamiento:': 'Marruskadurarik gabe:',
    'Con rozamiento:': 'Marruskadurarekin:',
    'formula-rozamiento': 'E<sub>m,A</sub> = E<sub>m,B</sub> + |W<sub>marr</sub>|',
    'Rozamiento:': 'Marruskadura:',
    'roz': 'marr',
    'Aire:': 'Airea:',
    'aire': 'airea',
    'Altura:': 'Altuera:',
    'Sin pérdidas:': 'Galerarik gabe:',

    // ── Oihaleko botoiak eta gaia ──
    'Vector velocidad': 'Abiadura-bektorea',
    'Mostrar / ocultar el vector velocidad': 'Erakutsi / ezkutatu abiadura-bektorea',
    'Cambiar tema': 'Aldatu gaia',
    'Tema visual': 'Gai bisuala',
    'Oscuro': 'Iluna',
    'Claro': 'Argia',
    'Alto contraste': 'Kontraste handia',

    // ── Oihala ──
    'MONTAÑA RUSA': 'MENDI ERRUSIARRA',
    'PÉNDULO SIMPLE': 'PENDULU SINPLEA',
    'sin rozamiento': 'marruskadurarik gabe',
    'salida': 'irteera',
    'h = 0 (punto más bajo)': 'h = 0 (punturik baxuena)',
    'altura máx. alcanzable = Em/(m·g) = {h} m': 'irits daitekeen altuera max. = Em/(m·g) = {h} m',
    'La vagoneta se ha detenido: el rozamiento ha transformado en calor la energía mecánica que le faltaba.':
        'Bagoneta gelditu egin da: marruskadurak bero bihurtu du falta zitzaion energia mekanikoa.',
    'ENERGÍAS': 'ENERGIAK',
    'Ec + Ep = Em      Em + Q = E inicial': 'Ec + Ep = Em      Em + Q = E hasierakoa',
    'E inicial = {e}': 'E hasierakoa = {e}',
    'ENERGÍA FRENTE AL TIEMPO': 'ENERGIA DENBORAREN ARABERA',
};
