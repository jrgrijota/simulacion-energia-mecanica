// Traducións ao galego da interface: «texto en español» → «texto en galego».
// Úsaas js/i18n.js cando a páxina se abre con ?lang=gl.
window.I18N_GL = {
    // ── Cabeceira ──
    'Energía Mecánica — Simulación Interactiva': 'Enerxía mecánica — Simulación interactiva',
    'Energía Mecánica': 'Enerxía Mecánica',
    'Cinética, Potencial y Rozamiento': 'Cinética, Potencial e Rozamento',
    'Descripción y reglas rápidas': 'Descrición e regras rápidas',
    'nota-descripcion': 'Solta unha vagoneta nunha montaña rusa ou un péndulo e observa como a enerxía potencial se converte en cinética e ao revés. Activa o rozamento para ver como a enerxía mecánica se degrada en calor.',
    'regla-conserva': 'Sen rozamento → E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> = constante',
    'regla-rozamiento': 'Con rozamento → E<sub>m</sub> diminúe',
    'regla-balance': 'E<sub>m,inicial</sub> = E<sub>c</sub> + E<sub>p</sub> + Q (calor)',

    // ── Selector de modo e reprodución ──
    'Montaña rusa': 'Montaña rusa',
    'vagoneta en la vía': 'vagoneta na vía',
    'Péndulo': 'Péndulo',
    'bola y un hilo': 'bóla e un fío',
    '⏸ Pausar': '⏸ Pausar',
    '▶ Continuar': '▶ Continuar',
    '↺ Reiniciar': '↺ Reiniciar',
    'Velocidad de reproducción': 'Velocidade de reprodución',

    // ── Montaña rusa ──
    'Perfil de la vía': 'Perfil da vía',
    'Clásica (varias colinas)': 'Clásica (varios outeiros)',
    'Colina más alta (27 m)': 'Outeiro máis alto (27 m)',
    'Valle en U': 'Val en U',
    'Altura de salida': 'Altura de saída',
    'Velocidad inicial': 'Velocidade inicial',
    'Masa de la vagoneta': 'Masa da vagoneta',
    'ayuda-arrastrar-vagoneta': 'Tamén podes arrastrar a vagoneta co rato (ou co dedo) a calquera punto da vía.',

    // ── Péndulo ──
    'Longitud del hilo': 'Lonxitude do fío',
    'Ángulo inicial': 'Ángulo inicial',
    'Masa de la bola': 'Masa da bóla',
    'ayuda-arrastrar-bola': 'Tamén podes arrastrar a bóla co rato (ou co dedo) para soltala desde outro ángulo.',

    // ── Contorno ──
    'Entorno': 'Contorno',
    'Gravedad': 'Gravidade',
    'Tierra (9,8 m/s²)': 'Terra (9,8 m/s²)',
    'Luna (1,62 m/s²)': 'Lúa (1,62 m/s²)',
    'Marte (3,71 m/s²)': 'Marte (3,71 m/s²)',
    'Júpiter (24,79 m/s²)': 'Xúpiter (24,79 m/s²)',
    'Rozamiento': 'Rozamento',
    '(fuerza no conservativa)': '(forza non conservativa)',
    'Coeficiente de rozamiento (μ)': 'Coeficiente de rozamento (μ)',
    'Resistencia del aire (b)': 'Resistencia do aire (b)',

    // ── Métricas ──
    'Monitorización en tiempo real': 'Monitorización en tempo real',
    'Velocidad': 'Velocidade',
    'Altura': 'Altura',
    'Tiempo': 'Tempo',
    'E. cinética': 'E. cinética',
    'E. potencial': 'E. potencial',
    'E. mecánica': 'E. mecánica',
    'Balance de energía': 'Balance de enerxía',
    'inicial': 'inicial',
    'Sin rozamiento la energía mecánica se conserva: Ec y Ep se intercambian, pero su suma no cambia.':
        'Sen rozamento a enerxía mecánica consérvase: Ec e Ep intercámbianse, pero a súa suma non cambia.',
    'Con rozamiento queda el {p} % de la energía mecánica inicial; el resto ({q}) se ha transformado en calor.':
        'Con rozamento queda o {p} % da enerxía mecánica inicial; o resto ({q}) transformouse en calor.',
    'Detenida. Se ha disipado como calor el {p} % de la energía inicial ({q}).':
        'Detida. Disipouse como calor o {p} % da enerxía inicial ({q}).',

    // ── Fórmulas ──
    'Fórmulas esenciales': 'Fórmulas esenciais',
    'E. cinética:': 'E. cinética:',
    'E. potencial:': 'E. potencial:',
    'E. mecánica:': 'E. mecánica:',
    'Sin rozamiento:': 'Sen rozamento:',
    'Con rozamiento:': 'Con rozamento:',
    'formula-rozamiento': 'E<sub>m,A</sub> = E<sub>m,B</sub> + |W<sub>roz</sub>|',
    'Rozamiento:': 'Rozamento:',
    'Aire:': 'Aire:',
    'Altura:': 'Altura:',
    'Sin pérdidas:': 'Sen perdas:',

    // ── Botóns do lenzo e tema ──
    'Vector velocidad': 'Vector velocidade',
    'Mostrar / ocultar el vector velocidad': 'Mostrar / ocultar o vector velocidade',
    'Cambiar tema': 'Cambiar o tema',
    'Tema visual': 'Tema visual',
    'Oscuro': 'Escuro',
    'Claro': 'Claro',
    'Alto contraste': 'Alto contraste',

    // ── Lenzo ──
    'MONTAÑA RUSA': 'MONTAÑA RUSA',
    'PÉNDULO SIMPLE': 'PÉNDULO SIMPLE',
    'sin rozamiento': 'sen rozamento',
    'salida': 'saída',
    'h = 0 (punto más bajo)': 'h = 0 (punto máis baixo)',
    'altura máx. alcanzable = Em/(m·g) = {h} m': 'altura máx. alcanzable = Em/(m·g) = {h} m',
    'La vagoneta se ha detenido: el rozamiento ha transformado en calor la energía mecánica que le faltaba.':
        'A vagoneta detívose: o rozamento transformou en calor a enerxía mecánica que lle faltaba.',
    'ENERGÍAS': 'ENERXÍAS',
    'ENERGÍA FRENTE AL TIEMPO': 'ENERXÍA FRONTE AO TEMPO',
};
