# Energía Mecánica — Simulación Interactiva

Simulación para **Física y Química de ESO y Bachillerato** sobre la conservación y la degradación de
la energía mecánica: una vagoneta en una montaña rusa o un péndulo simple, con la energía cinética,
la potencial, la mecánica y el calor disipado en cada instante.

## Modos

- **Montaña rusa:** elige uno de tres perfiles de vía (clásica con varias colinas, una colina más
  alta que la salida o un valle en U), la altura de salida (5–30 m), la velocidad inicial
  (0–15 m/s) y la masa de la vagoneta (100–1000 kg). También se puede arrastrar la vagoneta a
  cualquier punto de la vía.
- **Péndulo:** ajusta la longitud del hilo (0,5–5 m), el ángulo inicial (5–90°) y la masa de la
  bola (0,1–5 kg), o arrastra la bola para soltarla desde otro ángulo.

En los dos modos se puede elegir la gravedad (Tierra, Luna, Marte o Júpiter) y activar el
**rozamiento** (coeficiente μ en la montaña rusa, resistencia del aire b en el péndulo) para ver
cómo la energía mecánica se transforma en calor. El lienzo muestra:

- la escena, con la altura del cuerpo y una línea con la **altura máxima alcanzable**
  (E<sub>m</sub> / m·g), que baja cuando hay rozamiento;
- unas **barras de energía** (E<sub>c</sub>, E<sub>p</sub>, E<sub>m</sub> y Q) a escala de la
  energía inicial;
- una **gráfica de energía frente al tiempo** de los últimos 20 s.

El botón «Vector velocidad» dibuja la velocidad, tangente a la trayectoria. Se puede pausar y ver
el movimiento a ×¼, ×½, ×1 o ×2.

## Uso

Abre `index.html` en un navegador (con `?lang=en`, la interfaz se muestra en inglés, con `?lang=ca`, en catalán, con `?lang=eu`, en euskera, y con `?lang=gl`, en gallego). No necesita instalación ni conexión: incluye
[p5.js](https://p5js.org/) en `js/vendor/`. Tiene temas oscuro, claro y alto contraste
(botón del engranaje).

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Panel de controles y métricas |
| `css/style.css` | Estilos y temas |
| `js/physics.js` | Modelos de la montaña rusa y del péndulo: integración, rozamiento y balance de energía |
| `js/sketch.js` | Dibujo de la escena, de las barras y de la gráfica; controles |
| `js/i18n.js`, `js/i18n-*.js` | Traducciones de la interfaz |
| `js/estadisticas.js` | Recuento anónimo de visitas (GoatCounter, sin cookies) |
| `guias/energia-mecanica.md` | Guía docente, lista para copiarse en `guias/` del portal |

## Licencia

Código bajo licencia MIT (`LICENSE`); contenidos didácticos bajo CC BY-SA 4.0
(`LICENSE-CONTENT.md`). Forma parte de [SimulaCiencia](https://simulaciencia.es).
