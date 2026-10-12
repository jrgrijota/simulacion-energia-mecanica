// Traducciones al inglés (británico) de la interfaz: «texto en español» → «texto en inglés».
// Las usa js/i18n.js cuando la página se abre con ?lang=en.
window.I18N_EN = {
    // ── Cabecera ──
    'Energía Mecánica — Simulación Interactiva': 'Mechanical Energy — Interactive Simulation',
    'Energía Mecánica': 'Mechanical Energy',
    'Cinética, Potencial y Rozamiento': 'Kinetic, Potential and Friction',
    'Descripción y reglas rápidas': 'Description and quick rules',
    'nota-descripcion': 'Release a car on a roller coaster or a pendulum and watch potential energy turn into kinetic energy and back again. Switch on friction to see mechanical energy being degraded into heat.',
    'regla-conserva': 'No friction → E<sub>m</sub> = E<sub>k</sub> + E<sub>p</sub> = constant',
    'regla-rozamiento': 'With friction → E<sub>m</sub> decreases',
    'regla-balance': 'E<sub>m,initial</sub> = E<sub>k</sub> + E<sub>p</sub> + Q (heat)',

    // ── Selector de modo y reproducción ──
    'Montaña rusa': 'Roller coaster',
    'vagoneta en la vía': 'car on the track',
    'Péndulo': 'Pendulum',
    'bola y un hilo': 'bob on a string',
    '⏸ Pausar': '⏸ Pause',
    '▶ Continuar': '▶ Resume',
    '↺ Reiniciar': '↺ Reset',
    'Velocidad de reproducción': 'Playback speed',

    // ── Montaña rusa ──
    'Perfil de la vía': 'Track profile',
    'Clásica (varias colinas)': 'Classic (several hills)',
    'Colina más alta (27 m)': 'Taller hill (27 m)',
    'Valle en U': 'U-shaped valley',
    'Altura de salida': 'Starting height',
    'Velocidad inicial': 'Initial speed',
    'Masa de la vagoneta': 'Mass of the car',
    'ayuda-arrastrar-vagoneta': 'You can also drag the car with the mouse (or your finger) to any point on the track.',

    // ── Péndulo ──
    'Longitud del hilo': 'String length',
    'Ángulo inicial': 'Initial angle',
    'Masa de la bola': 'Mass of the bob',
    'ayuda-arrastrar-bola': 'You can also drag the bob with the mouse (or your finger) to release it from another angle.',

    // ── Entorno ──
    'Entorno': 'Surroundings',
    'Gravedad': 'Gravity',
    'Tierra (9,8 m/s²)': 'Earth (9.8 m/s²)',
    'Luna (1,62 m/s²)': 'Moon (1.62 m/s²)',
    'Marte (3,71 m/s²)': 'Mars (3.71 m/s²)',
    'Júpiter (24,79 m/s²)': 'Jupiter (24.79 m/s²)',
    'Rozamiento': 'Friction',
    '(fuerza no conservativa)': '(non-conservative force)',
    'Coeficiente de rozamiento (μ)': 'Coefficient of friction (μ)',
    'Resistencia del aire (b)': 'Air resistance (b)',

    // Valores iniciales escritos en el HTML (con coma decimal)
    '25,0 m': '25.0 m',
    '0,0 m/s': '0.0 m/s',
    '2,0 m': '2.0 m',
    '0,5 m': '0.5 m',
    '5,0 m': '5.0 m',
    '1,0 kg': '1.0 kg',
    '0,1 kg': '0.1 kg',
    '5,0 kg': '5.0 kg',
    '0,05': '0.05',
    '0,01': '0.01',
    '0,20': '0.20',
    '0,10 kg/s': '0.10 kg/s',
    '0,50 kg/s': '0.50 kg/s',
    '0,0': '0.0',

    // ── Métricas ──
    'Monitorización en tiempo real': 'Real-time readings',
    'Velocidad': 'Speed',
    'Altura': 'Height',
    'Tiempo': 'Time',
    'E. cinética': 'Kinetic E.',
    'E. potencial': 'Potential E.',
    'E. mecánica': 'Mechanical E.',
    'Balance de energía': 'Energy balance',
    'inicial': 'initial',
    'c': 'k',
    'Sin rozamiento la energía mecánica se conserva: Ec y Ep se intercambian, pero su suma no cambia.':
        'Without friction, mechanical energy is conserved: Ek and Ep swap back and forth, but their sum does not change.',
    'Con rozamiento queda el {p} % de la energía mecánica inicial; el resto ({q}) se ha transformado en calor.':
        'With friction, {p} % of the initial mechanical energy is left; the rest ({q}) has been transformed into heat.',
    'Detenida. Se ha disipado como calor el {p} % de la energía inicial ({q}).':
        'Stopped. {p} % of the initial energy ({q}) has been dissipated as heat.',

    // ── Fórmulas ──
    'Fórmulas esenciales': 'Key formulas',
    'E. cinética:': 'Kinetic E.:',
    'E. potencial:': 'Potential E.:',
    'E. mecánica:': 'Mechanical E.:',
    'Sin rozamiento:': 'No friction:',
    'Con rozamiento:': 'With friction:',
    'formula-rozamiento': 'E<sub>m,A</sub> = E<sub>m,B</sub> + |W<sub>fr</sub>|',
    'Rozamiento:': 'Friction:',
    'roz': 'fr',
    'Aire:': 'Air:',
    'aire': 'air',
    'Altura:': 'Height:',
    'Sin pérdidas:': 'No losses:',

    // ── Botones del lienzo y tema ──
    'Vector velocidad': 'Velocity vector',
    'Mostrar / ocultar el vector velocidad': 'Show / hide the velocity vector',
    'Cambiar tema': 'Change theme',
    'Tema visual': 'Visual theme',
    'Oscuro': 'Dark',
    'Claro': 'Light',
    'Alto contraste': 'High contrast',

    // ── Lienzo ──
    'MONTAÑA RUSA': 'ROLLER COASTER',
    'PÉNDULO SIMPLE': 'SIMPLE PENDULUM',
    'sin rozamiento': 'no friction',
    'salida': 'start',
    'h (m)': 'h (m)',
    'h = 0 (punto más bajo)': 'h = 0 (lowest point)',
    'altura máx. alcanzable = Em/(m·g) = {h} m': 'max. reachable height = Em/(m·g) = {h} m',
    'La vagoneta se ha detenido: el rozamiento ha transformado en calor la energía mecánica que le faltaba.':
        'The car has stopped: friction has turned the missing mechanical energy into heat.',
    'ENERGÍAS': 'ENERGIES',
    'Ec + Ep = Em      Em + Q = E inicial': 'Ek + Ep = Em      Em + Q = E initial',
    'E inicial = {e}': 'E initial = {e}',
    'Ec': 'Ek',
    'ENERGÍA FRENTE AL TIEMPO': 'ENERGY AGAINST TIME',
    't (s)': 't (s)',
};
