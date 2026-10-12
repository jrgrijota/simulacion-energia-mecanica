# Guía docente: simulación de energía mecánica

## Ficha rápida

La simulación de energía mecánica suelta una vagoneta en una montaña rusa o un péndulo y muestra en cada instante la energía cinética, la potencial, la mecánica y el calor disipado, con rozamiento opcional. Su uso principal es 4.º ESO y 1.º Bachillerato, con aplicación en 3.º ESO y uso puntual en 2.º Bachillerato Física.

| Dato | Detalle |
| --- | --- |
| Enlace | [jrgrijota.github.io/simulacion-energia-mecanica](https://jrgrijota.github.io/simulacion-energia-mecanica/) |
| Cursos | 4.º ESO y 1.º Bachillerato (uso principal), 3.º ESO; uso puntual en 2.º Bachillerato Física |
| Materia | Física y Química; Física de 2.º Bachillerato |
| Duración orientativa | 15–20 minutos de explicación con la simulación proyectada |
| Material | Proyector o pizarra digital; funciona en navegador, también en móvil y tableta, sin instalar nada. En pantallas estrechas los controles pasan arriba y el lienzo debajo; para explicar es mejor una pantalla grande |
| Conocimientos previos | Velocidad, masa y peso (P = m · g). Para el rozamiento, la fuerza de rozamiento y el trabajo de una fuerza |
| Accesibilidad | Tema oscuro, claro y de alto contraste (botón del engranaje). Botón de pausa y velocidad de reproducción ×¼, ×½, ×1 y ×2 |

## Cómo funciona la simulación

La simulación tiene dos modos, «Montaña rusa» y «Péndulo», que se eligen arriba del panel izquierdo. En los dos se ve la escena a la izquierda, las barras de energía a la derecha y, debajo, la gráfica «ENERGÍA FRENTE AL TIEMPO» con los últimos 20 s. Los botones «⏸ Pausar» y «↺ Reiniciar» y la fila «Velocidad de reproducción» controlan el movimiento. Cualquier cambio en un deslizador del modo, en la gravedad o en el perfil de la vía vuelve a soltar el cuerpo desde el punto de salida; el rozamiento, en cambio, se puede activar y ajustar en marcha.

| Modo | Qué controla el docente | Qué muestra |
| --- | --- | --- |
| Montaña rusa | «Perfil de la vía»: «Clásica (varias colinas)», «Colina más alta (27 m)» y «Valle en U». «Altura de salida» (5–30 m, en pasos de 0,5), «Velocidad inicial» (0–15 m/s) y «Masa de la vagoneta» (100–1000 kg). Valores iniciales: clásica, 25,0 m, 0,0 m/s y 500 kg. La vagoneta también se puede arrastrar a cualquier punto de la vía | Una vía de 60 m de ancho con el eje de alturas de 0 a 30 m. La vía clásica baja de 32 m a un valle a 0 m y tiene colinas de 18 m y 12 m y valles de 4 m y 1 m. La vía con colina sube a 27 m entre dos valles a 0 m; el valle en U es una parábola. Los dos extremos de la vía suben a 32 m y tienen topes |
| Péndulo | «Longitud del hilo» (0,5–5,0 m), «Ángulo inicial» (5–90°) y «Masa de la bola» (0,1–5,0 kg). Valores iniciales: 2,0 m, 45° y 1,0 kg. La bola también se puede arrastrar para soltarla desde otro ángulo, a uno u otro lado | El soporte, el hilo, la bola y el arco de la trayectoria, con el ángulo θ, la longitud L y el nivel «h = 0 (punto más bajo)». Arriba se lee el período T ≈ 2π√(L/g) |
| «Entorno» (en los dos modos) | «Gravedad»: Tierra (9,8), Luna (1,62), Marte (3,71) y Júpiter (24,79 m/s²). Interruptor «Rozamiento» con «Coeficiente de rozamiento (μ)» de 0,01 a 0,20 en la montaña rusa (empieza en 0,05) y «Resistencia del aire (b)» de 0,01 a 0,50 kg/s en el péndulo (empieza en 0,10) | Con rozamiento aparece la barra Q y la curva naranja de la gráfica, y la energía mecánica baja. Si la vagoneta se para, un aviso explica que el rozamiento ha transformado en calor la energía mecánica que le faltaba |

Cuatro elementos sostienen la explicación:

- **Las barras «ENERGÍAS».** Ec (verde), Ep (azul), Em (amarillo) y Q (naranja rayado) se dibujan a escala de la energía inicial, marcada con una línea discontinua. Debajo de cada barra se lee su valor y su porcentaje. Arriba se recuerda «Ec + Ep = Em» y «Em + Q = E inicial».
- **La línea de altura máxima alcanzable.** Una línea amarilla discontinua marca la altura «Em/(m·g)», a la que llegaría el cuerpo si toda su energía mecánica fuera potencial. Sin rozamiento coincide con la altura de salida y no se mueve; con rozamiento baja poco a poco y se separa de una línea tenue que marca la altura inicial.
- **La gráfica energía–tiempo.** Las cuatro curvas usan los mismos colores. Sin rozamiento Ec y Ep se cruzan y suben y bajan en espejo, y Em es una recta horizontal. Con rozamiento Em desciende y Q sube en la misma cantidad.
- **El vector velocidad.** El botón «Vector velocidad», arriba a la derecha del lienzo, dibuja una flecha violeta tangente a la trayectoria con el valor de v. Su escala se ajusta para que la flecha más larga posible mida siempre lo mismo.

El desplegable «Monitorización en tiempo real» está abierto al inicio. Da la velocidad, la altura, el tiempo y las tres energías, y el bloque «Balance de energía» con E inicial, una barra que reparte el 100 % entre Ec, Ep y Q y una frase que resume el balance. El desplegable «Fórmulas esenciales» reúne Ec = ½ · m · v², Ep = m · g · h, Em = Ec + Ep, Em,A = Em,B sin rozamiento, Em,A = Em,B + |Wroz| con rozamiento, la fuerza de rozamiento (μ · N o b · v), la altura del péndulo h = L · (1 − cos θ) y v = √(2 · g · Δh). En la cabecera, «Descripción y reglas rápidas» resume las tres ideas clave.

## Uso en cada curso

En 4.º ESO la simulación sirve para presentar la energía cinética, la potencial y la conservación de la energía mecánica, y para introducir el trabajo de rozamiento. En 1.º Bachillerato trabaja los sistemas conservativos y no conservativos, el teorema del trabajo y la energía y la degradación de la energía. En 3.º ESO sirve para describir de forma cualitativa las transformaciones de la energía. En 2.º Bachillerato Física su uso es puntual, para la energía del péndulo como oscilador. Los saberes citados son los del currículo LOMLOE de la Comunidad de Madrid.

### 4.º ESO: energía cinética, potencial y su conservación

**Saberes básicos.** Bloque E: «La energía: formulación y comprobación de hipótesis sobre las distintas formas y aplicaciones de la energía, a partir de sus propiedades y del principio de conservación, como base para la experimentación y la resolución de problemas relacionados con la energía mecánica en situaciones cotidianas», «Energía cinética y energía potencial», «Energía mecánica. Conservación de la energía mecánica» y «El trabajo y la energía mecánica. Potencia». Bloque D: «Principales fuerzas del entorno cotidiano: reconocimiento del peso, la normal, el rozamiento, la tensión o el empuje». Bloque A: «el laboratorio o los entornos virtuales».

**Objetivos.** Calcular la energía cinética y la potencial gravitatoria. Explicar que, sin rozamiento, la energía mecánica se conserva aunque Ec y Ep cambien. Calcular velocidades a partir de diferencias de altura. Reconocer que el rozamiento transforma energía mecánica en calor.

**Secuencia de explicación (15–20 min).**

1. Montaña rusa con los valores iniciales: pulsar «↺ Reiniciar» y «⏸ Pausar». La vagoneta, de 500 kg, está a 25,0 m. Calcular en la pizarra Ep = m · g · h = 500 × 9,8 × 25 = 122 500 J y comprobar «E inicial = 122,5 kJ». Como sale del reposo, Ec = 0 y toda la energía es potencial.
2. Pedir una predicción de la velocidad en el primer valle (h = 0) y pulsar «▶ Continuar». Con todo convertido en cinética, ½ · m · v² = 122 500 J y v = √(2 · 9,8 · 25) = 22,1 m/s. Con ×¼ es fácil pausar en el valle y leerlo en «Velocidad».
3. Pausar en la cima de la colina de 18 m. Ep = 500 × 9,8 × 18 = 88 200 J, así que Ec = 122 500 − 88 200 = 34 300 J y v = 11,7 m/s. Las barras Ec y Ep cambian, pero Em sigue llena: 122,5 kJ.
4. Dejar correr la simulación. La vagoneta llega al extremo derecho y vuelve justo hasta 25,0 m, la línea amarilla «altura máx. alcanzable». En la gráfica, Em es una recta y Ec y Ep se cruzan.
5. Subir la masa a 1000 kg. La energía inicial se duplica (245,0 kJ), pero la vagoneta se mueve igual y la velocidad en el valle sigue siendo 22,1 m/s: la masa se simplifica en ½ · m · v² = m · g · h.
6. Volver a 500 kg y activar «Rozamiento» con μ = 0,05. En cada viaje la vagoneta se queda más baja (22,4 m, 20,0 m, 17,5 m…), la línea amarilla baja y crece la barra Q. Cerrar con el balance: Em,inicial = Em,final + |Wroz|. La energía no desaparece: se transforma en calor.

### 1.º Bachillerato: sistemas conservativos y no conservativos

**Saberes básicos.** Bloque F: «Energía potencial y energía cinética de un sistema sencillo: aplicación a la conservación de la energía mecánica en sistemas conservativos y no conservativos y al estudio de las causas que producen el movimiento de los objetos en el mundo real», «Energía cinética. Teorema del trabajo-energía», «Fuerzas conservativas. Energía potencial: gravitatoria y elástica», «La fuerza de rozamiento: una fuerza no conservativa», «Principio de conservación de la energía mecánica en sistemas conservativos y no conservativos» y «Conservación y degradación de la energía. Segundo principio de la termodinámica». Bloque D: «Estudio y elaboración de gráficas de movimientos a partir de observaciones experimentales y/o simulaciones interactivas».

**Objetivos.** Aplicar el principio de conservación de la energía mecánica con y sin fuerzas no conservativas. Calcular el trabajo de rozamiento. Predecir si un cuerpo supera un obstáculo a partir de su energía. Interpretar la degradación de la energía en una gráfica energía–tiempo.

**Secuencia de explicación (15–20 min).**

1. Perfil «Colina más alta (27 m)» con salida a 25,0 m y sin rozamiento. Preguntar si la vagoneta pasará la colina. No: la línea amarilla queda por debajo de la cima y la vagoneta da la vuelta a 25,0 m, antes de llegar arriba.
2. Calcular la velocidad inicial mínima para pasar: ½ · v₀² ≥ g · (27 − 25), luego v₀ ≥ 6,26 m/s. Comprobarlo: con 6,0 m/s la vagoneta da la vuelta a 26,8 m; con 6,5 m/s pasa y llega a 27,2 m en el otro lado. La masa no interviene.
3. Volver a «Clásica (varias colinas)», salida a 25,0 m, y activar el rozamiento con μ = 0,05. Pausar al llegar al primer valle: Q ≈ 2,37 kJ. Con N = m · g · cos θ, el trabajo de rozamiento es μ · m · g · cos θ · Δs = μ · m · g · Δx, con Δx el recorrido en horizontal. Desde la salida (x ≈ 4,3 m) hasta el valle (x = 14 m): 0,05 × 500 × 9,8 × 9,7 ≈ 2370 J.
4. Usar la gráfica: Em baja más deprisa donde la vagoneta va más rápida, porque recorre más vía en cada segundo, y Q crece exactamente lo que baja Em. Leer en «Balance de energía» qué porcentaje queda en cada momento. Relacionarlo con el teorema del trabajo y la energía: Wroz = ΔEm.
5. Dejar que la vagoneta se pare (algo más de 2 min a ×1, la mitad a ×2). Termina en el valle de 1 m con Ep = 4,9 kJ: solo el 4 % de la energía sigue siendo mecánica y el 96 % se ha convertido en calor. Aunque la energía total se conserva, el calor no se puede volver a convertir del todo en energía mecánica: es la degradación de la energía.
6. Pasar al péndulo con rozamiento, b = 0,10 kg/s. La amplitud y Em bajan cada vez menos en cada oscilación: tras 5 s queda el 62 % y tras 10 s el 37 %. Subir la masa a 2,0 kg: ahora queda el 79 % y el 61 %. Con resistencia del aire la pérdida relativa depende de b/m; con el rozamiento de la vía, en cambio, no depende de la masa.

### 3.º ESO: transformaciones de la energía

**Saberes básicos.** Bloque E: «Diseño y comprobación experimental de hipótesis relacionadas con el uso doméstico e industrial de la energía en sus distintas formas y las transformaciones entre ellas» y «Concienciación sobre la necesidad del ahorro energético y conservación del medio ambiente. Uso racional de la energía». Bloque A: «Registro de datos y resultados empleando tablas, gráficos y expresiones matemáticas».

**Objetivos.** Reconocer la energía de movimiento y la energía debida a la altura. Describir cómo se transforma una en otra. Entender que la energía no se pierde, sino que se transforma en otras formas menos útiles.

**Secuencia de explicación (15–20 min).**

1. Péndulo con los valores iniciales. Sin hablar de fórmulas, señalar las barras: arriba toda la energía es azul (potencial) y abajo es verde (cinética). La amarilla, la suma, no cambia.
2. Pausar en el punto más bajo y en un extremo. Leer en el bloque «Balance de energía» cómo se reparte el 100 % entre Ec y Ep.
3. Montaña rusa con los valores iniciales. Preguntar dónde va más rápida la vagoneta: en los valles, donde es menor la altura. Comprobarlo con «Vector velocidad».
4. Activar el rozamiento. La vagoneta no vuelve a la altura de salida y aparece la barra naranja Q: parte de la energía se ha convertido en calor en las ruedas y la vía. La energía se transforma, no se destruye.
5. Elegir «Luna (1,62 m/s²)» con 25,0 m de salida. La energía inicial baja a 20,3 kJ y la vagoneta va mucho más despacio (9,0 m/s en el valle). Relacionarlo con el peso.
6. Pedir al alumnado que copie una tabla con altura, velocidad, Ec y Ep en cuatro puntos de la vía (pausando en cada uno) y que compruebe que Ec + Ep da siempre lo mismo.

### 2.º Bachillerato Física: uso puntual

En el bloque C aparece «Movimiento oscilatorio: variables cinemáticas de un cuerpo oscilante. Energía cinética y potencial del movimiento armónico simple y conservación de energía en estos sistemas. Representación gráfica en función del tiempo.». El péndulo con ángulos pequeños (5–10°) es un oscilador casi armónico. En la gráfica, Ec y Ep oscilan con la mitad del período del péndulo y siempre suman lo mismo. Con resistencia del aire se ve un oscilador amortiguado: la energía decae de forma exponencial, Em ∝ e^(−b·t/m). La simulación usa g · h y no −GMm/r, así que no sirve para la energía en el campo gravitatorio a gran escala; para eso es mejor la simulación de órbitas.

## Concepciones alternativas que ayuda a corregir

La simulación ataca sobre todo la idea de que la energía «se gasta» o desaparece y la de que los cuerpos más pesados caen más deprisa por una rampa. Cada fila indica la idea previa frecuente y cómo desmontarla con la simulación.

| Idea del alumnado | Idea correcta | Cómo mostrarlo |
| --- | --- | --- |
| «La energía se gasta y desaparece» | La energía se transforma: con rozamiento la mecánica pasa a calor, y Ec + Ep + Q es siempre la energía inicial | Montaña rusa con rozamiento: la barra Q crece lo mismo que baja Em, y el bloque «Balance de energía» siempre suma 100 % |
| «Una vagoneta más pesada baja más rápido» | Sin rozamiento, la velocidad solo depende del desnivel: v = √(2 · g · Δh) | Masa de 100 kg y de 1000 kg con salida a 25,0 m: en los dos casos 22,1 m/s en el valle |
| «Con más velocidad en el valle, puede subir más alto que de donde salió» | Sin rozamiento ni velocidad inicial, nunca supera la altura de salida | Perfil «Colina más alta (27 m)» con salida a 25,0 m: da la vuelta en 25,0 m |
| «En el punto más alto no hay energía» | Arriba la energía es potencial; solo es nula la cinética | Péndulo en pausa en un extremo: Ec = 0 y Ep = Em = 5,74 J |
| «La energía potencial es una propiedad absoluta del cuerpo» | Depende del nivel de referencia que se elija; lo que importa son las diferencias | Señalar «h = 0 (punto más bajo)»: con el nivel cero en el suelo del aula, todas las Ep cambiarían en la misma cantidad y v no |
| «Si no hay rozamiento, el péndulo acabará parándose igual» | Sin fuerzas no conservativas oscila para siempre con la misma amplitud | Péndulo sin rozamiento a ×2 durante un minuto: la línea amarilla y la amplitud no cambian |
| «El rozamiento solo actúa cuando el cuerpo va despacio» | El trabajo de rozamiento depende del recorrido; actúa durante todo el movimiento | Montaña rusa con μ = 0,05: la curva Q de la gráfica sube durante todo el trayecto |

## Simplificaciones que conviene conocer

La simulación prioriza que se vea el balance de energía y para ello simplifica la vía, el rozamiento y el péndulo. Conviene conocer estas licencias para no reforzar ideas incorrectas sin querer.

1. **La vagoneta es un punto sobre el raíl.** No tiene tamaño ni ruedas que giren, y va sujeta a la vía, como en las montañas rusas reales: nunca se despega, aunque vaya muy rápido por una cima. No hay bucles.
2. **Normal sin parte centrípeta.** El rozamiento usa N = m · g · cos θ, como en los problemas de clase. En las curvas reales la normal es mayor en los valles y menor en las cimas; aquí se ignora. Por eso el trabajo de rozamiento es exactamente μ · m · g por el recorrido horizontal.
3. **Un único coeficiente μ.** El mismo coeficiente vale para el rozamiento estático y el dinámico. La vagoneta se para cuando su velocidad llega a cero en un punto donde la pendiente cumple tan θ ≤ μ, aunque no esté en el fondo de un valle.
4. **Rozamientos distintos en cada modo.** En la montaña rusa la fuerza es constante, μ · N. En el péndulo es una resistencia del aire proporcional a la velocidad, b · v, sin rozamiento en el punto de suspensión. Por eso en el péndulo la pérdida relativa depende de b/m y en la montaña rusa no depende de la masa.
5. **El calor no calienta nada.** La barra Q solo cuenta la energía disipada. No se calcula a qué temperatura llegan la vía, las ruedas o el aire, ni se pierde energía por sonido o vibraciones.
6. **Péndulo ideal.** El hilo es inextensible y sin masa, y la bola es puntual. El ángulo inicial va de 5 a 90°: un hilo no aguanta ángulos mayores. El período «T ≈ 2π√(L/g)» es el de oscilaciones pequeñas; a 45° el período real es unos 2,95 s en vez de 2,84 s.
7. **La escala del péndulo cambia con L.** El hilo dibujado crece con la longitud, pero menos que ella para que quepa en pantalla. Las alturas de un mismo péndulo están a escala; las de dos longitudes distintas no se pueden comparar en la pantalla.
8. **Nivel de referencia fijo.** La energía potencial se mide siempre desde el punto más bajo de la vía o de la trayectoria. No se puede cambiar el nivel cero.
9. **Energía calculada por balance.** El programa calcula la velocidad a partir de Ec = E inicial − Ep − Q, de modo que las barras siempre suman exactamente el 100 %. Los extremos de la vía tienen topes que devuelven la vagoneta sin pérdidas; solo se alcanzan con velocidad inicial.
