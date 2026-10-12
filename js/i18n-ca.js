// Traduccions al català de la interfície: «texto en español» → «text en català».
// Les fa servir js/i18n.js quan la pàgina s'obre amb ?lang=ca.
window.I18N_CA = {
    // ── Capçalera ──
    'Energía Mecánica — Simulación Interactiva': 'Energia Mecànica — Simulació Interactiva',
    'Energía Mecánica': 'Energia Mecànica',
    'Cinética, Potencial y Rozamiento': 'Cinètica, Potencial i Fregament',
    'Descripción y reglas rápidas': 'Descripció i regles ràpides',
    'nota-descripcion': 'Deixa anar una vagoneta en una muntanya russa o un pèndol i observa com l\'energia potencial es converteix en cinètica i a l\'inrevés. Activa el fregament per veure com l\'energia mecànica es degrada en calor.',
    'regla-conserva': 'Sense fregament → E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = constant',
    'regla-rozamiento': 'Amb fregament → E<sub>m</sub> disminueix',
    'regla-balance': 'E<sub>m,inicial</sub> = E<sub>c</sub> + E<sub>p</sub> + Q (calor)',

    // ── Selector de mode i reproducció ──
    'Montaña rusa': 'Muntanya russa',
    'vagoneta en la vía': 'vagoneta a la via',
    'Péndulo': 'Pèndol',
    'bola y un hilo': 'bola i un fil',
    '⏸ Pausar': '⏸ Pausa',
    '▶ Continuar': '▶ Continua',
    '↺ Reiniciar': '↺ Reinicia',
    'Velocidad de reproducción': 'Velocitat de reproducció',

    // ── Muntanya russa ──
    'Perfil de la vía': 'Perfil de la via',
    'Clásica (varias colinas)': 'Clàssica (diversos turons)',
    'Colina más alta (27 m)': 'Turó més alt (27 m)',
    'Valle en U': 'Vall en U',
    'Altura de salida': 'Altura de sortida',
    'Velocidad inicial': 'Velocitat inicial',
    'Masa de la vagoneta': 'Massa de la vagoneta',
    'ayuda-arrastrar-vagoneta': 'També pots arrossegar la vagoneta amb el ratolí (o el dit) a qualsevol punt de la via.',

    // ── Pèndol ──
    'Longitud del hilo': 'Longitud del fil',
    'Ángulo inicial': 'Angle inicial',
    'Masa de la bola': 'Massa de la bola',
    'ayuda-arrastrar-bola': 'També pots arrossegar la bola amb el ratolí (o el dit) per deixar-la anar des d\'un altre angle.',

    // ── Entorn ──
    'Entorno': 'Entorn',
    'Gravedad': 'Gravetat',
    'Tierra (9,8 m/s²)': 'Terra (9,8 m/s²)',
    'Luna (1,62 m/s²)': 'Lluna (1,62 m/s²)',
    'Marte (3,71 m/s²)': 'Mart (3,71 m/s²)',
    'Júpiter (24,79 m/s²)': 'Júpiter (24,79 m/s²)',
    'Rozamiento': 'Fregament',
    '(fuerza no conservativa)': '(força no conservativa)',
    'Coeficiente de rozamiento (μ)': 'Coeficient de fregament (μ)',
    'Resistencia del aire (b)': 'Resistència de l\'aire (b)',

    // ── Mètriques ──
    'Monitorización en tiempo real': 'Monitoratge en temps real',
    'Velocidad': 'Velocitat',
    'Altura': 'Altura',
    'Tiempo': 'Temps',
    'E. cinética': 'E. cinètica',
    'E. potencial': 'E. potencial',
    'E. mecánica': 'E. mecànica',
    'Balance de energía': 'Balanç d\'energia',
    'inicial': 'inicial',
    'Sin rozamiento la energía mecánica se conserva: Ec y Ep se intercambian, pero su suma no cambia.':
        'Sense fregament l\'energia mecànica es conserva: Ec i Ep s\'intercanvien, però la seva suma no canvia.',
    'Con rozamiento queda el {p} % de la energía mecánica inicial; el resto ({q}) se ha transformado en calor.':
        'Amb fregament queda el {p} % de l\'energia mecànica inicial; la resta ({q}) s\'ha transformat en calor.',
    'Detenida. Se ha disipado como calor el {p} % de la energía inicial ({q}).':
        'Aturada. S\'ha dissipat com a calor el {p} % de l\'energia inicial ({q}).',

    // ── Fórmules ──
    'Fórmulas esenciales': 'Fórmules essencials',
    'E. cinética:': 'E. cinètica:',
    'E. potencial:': 'E. potencial:',
    'E. mecánica:': 'E. mecànica:',
    'Sin rozamiento:': 'Sense fregament:',
    'Con rozamiento:': 'Amb fregament:',
    'formula-rozamiento': 'E<sub>m,A</sub> = E<sub>m,B</sub> + |W<sub>freg</sub>|',
    'Rozamiento:': 'Fregament:',
    'roz': 'freg',
    'Aire:': 'Aire:',
    'aire': 'aire',
    'Altura:': 'Altura:',
    'Sin pérdidas:': 'Sense pèrdues:',

    // ── Botons del llenç i tema ──
    'Vector velocidad': 'Vector velocitat',
    'Mostrar / ocultar el vector velocidad': 'Mostra / amaga el vector velocitat',
    'Cambiar tema': 'Canvia el tema',
    'Tema visual': 'Tema visual',
    'Oscuro': 'Fosc',
    'Claro': 'Clar',
    'Alto contraste': 'Contrast alt',

    // ── Llenç ──
    'MONTAÑA RUSA': 'MUNTANYA RUSSA',
    'PÉNDULO SIMPLE': 'PÈNDOL SIMPLE',
    'sin rozamiento': 'sense fregament',
    'salida': 'sortida',
    'h = 0 (punto más bajo)': 'h = 0 (punt més baix)',
    'altura máx. alcanzable = Em/(m·g) = {h} m': 'altura màx. assolible = Em/(m·g) = {h} m',
    'La vagoneta se ha detenido: el rozamiento ha transformado en calor la energía mecánica que le faltaba.':
        'La vagoneta s\'ha aturat: el fregament ha transformat en calor l\'energia mecànica que li faltava.',
    'ENERGÍAS': 'ENERGIES',
    'Ec + Ep = Em      Em + Q = E inicial': 'Ec + Ep = Em      Em + Q = E inicial',
    'E inicial = {e}': 'E inicial = {e}',
    'ENERGÍA FRENTE AL TIEMPO': 'ENERGIA EN FUNCIÓ DEL TEMPS',
};
