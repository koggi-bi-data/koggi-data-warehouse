# Configuración de tracking (GTM + GA4) para un sitio nuevo — Alohome

> Reconstruido a partir de la grabación y las notas de Gemini de la reunión **"Ajustes realdellago"** (12-nov-2025, Diana Marcela Catolico y Alexander Boada Sotelo), usando el sitio `maqueta.realdellago.com` como caso guía. Es la capa de captura de datos que después alimenta los tableros de `directorio-tableros.md` — no cubre cómo se arma el tablero en sí (ver sección "Después del tracking" al final).

## Cuándo se usa esta guía

Cada vez que se lanza un sitio/maqueta nuevo bajo la cuenta **GTM Alo Home Client Sites** y necesita su propia propiedad de GA4.

## Paso a paso

### 1. Crear el contenedor en Google Tag Manager
En la cuenta **GTM Alo Home Client Sites**, crear un contenedor nuevo con el nombre del sitio (ej. `realdellago.com`). Enviar el **ID de contenedor GTM** (`GTM-XXXXXXX`) a quien vaya a configurar GA4, para que pueda continuar el proceso desde ahí.

### 2. Crear la propiedad en Google Analytics 4
Dentro de la cuenta de GA existente, crear una propiedad nueva con estos datos:
- **Nombre:** `<nombre del sitio> <nombre del proyecto>` (ej. "maqueta.com real del lago")
- **País/ubicación:** el país del proyecto (México, Colombia, etc. — enviarlo junto con el link del sitio antes de empezar, porque cambia zona horaria y moneda)
- **Zona horaria:** la del país (ej. Ciudad de México)
- **Moneda:** la del país (ej. peso mexicano)
- **Objetivos de negocio:** al menos "generar oportunidades de venta" y "ver la interacción de los usuarios"

Al final de este paso queda el **ID de medición de GA4** (`G-XXXXXXXXXX`).

### 3. Clonar la configuración de un contenedor GTM existente
En vez de armar las etiquetas desde cero:
1. Exportar la configuración de un contenedor GTM "plantilla" ya probado (en la reunión se usó **"Condado"**, es decir Condado de Sayavedra).
2. Importarla al contenedor nuevo, eligiendo la opción **"añadir espacio de trabajo"**.
3. Actualizar, dentro del contenedor importado, la **variable de Google Analytics** y el **ID de medición de GA4** con el que se generó en el paso 2 (el importado trae el ID del sitio plantilla, hay que reemplazarlo).
4. **Publicar** los cambios en GTM — sin este paso nada de lo anterior queda activo en el sitio.
5. Verificar con la vista previa de GTM que el contenedor conecta bien contra el sitio real (URL de prueba).

### 4. Replicar las dimensiones personalizadas de GA4 (paso manual, no se puede exportar)
Las **dimensiones personalizadas de evento** de GA4 no viajan con la exportación del contenedor GTM — hay que recrearlas a mano, una por una, en la propiedad nueva. Abrir la propiedad plantilla y la propiedad nueva en paralelo (dos pestañas de *Definiciones personalizadas → Dimensiones personalizadas*) y copiar cada dimensión con su mismo *scope* (Evento) y su mismo parámetro de evento asociado.

Dimensiones observadas en la plantilla "Condado de Sayavedra" (replicar estas como mínimo):

| Nombre de dimensión | Parámetro de evento |
|---|---|
| Chosen Option | `chosen_option` |
| Funnel Step | `funnel_step` |
| Lead | `lead` |
| Location | `location` |
| Most Reserved Typology | `most_reserved_typology` |
| Most Resulted Typology | `most_resulted_typology` |
| Most visited typology | `most_visited_typology` |

> Estas dimensiones son las que después llenan los tableros `Features`/`Funnel`/`Usuarios` de `directorio-tableros.md` — si falta alguna, el tablero clonado va a tener paneles vacíos o con error de referencia.

## Después del tracking: cuándo armar el tablero

- **No se crea el tablero de inmediato.** El equipo espera **~1 semana** después de publicar el tracking, para que GA4 acumule datos suficientes antes de conectarlo a Looker Studio.
- Para una **maqueta simple**, copiar la plantilla de tablero es suficiente.
- Para un **showroom completo**, copiar la plantilla *no basta*: si el sitio incluye un flujo tipo "busca tu depa" (preguntas/respuestas para filtrar unidades), hay que agregar esos filtros específicos al tablero — eso requiere reunión aparte con quien arma el tablero.

## Pendiente de esta reunión (no resuelto en la grabación)

- Diana debía enviar a Alexander el link del sitio y el país para configurar GA4 (dato de entrada del paso 2).
- Alexander debía compartir los links de la maqueta con Diana.
- No quedó definido en la grabación quién ni cuándo crea el tablero de Looker una vez pase la semana de espera — ver `hallazgos-y-pendientes.md`.
