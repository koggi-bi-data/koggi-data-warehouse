# Documentación — Koggi Data Warehouse

Manual de referencia del proyecto Dataform/BigQuery que alimenta los tableros de Looker Studio de Koggi (Profiling, Followup, MPK, FP&A, Dirección). Vive dentro de `docs/koggi/` junto al resto de la documentación del repo (ver `docs/setup-cloudshell.md` para el setup de Cloud Shell del proyecto).

## Índice

| Documento | Para qué sirve |
|---|---|
| [`arquitectura-y-linaje.md`](./arquitectura-y-linaje.md) | Inventario de las 27 tablas que construye Dataform + las 29 fuentes que declara, con SQL, dependencias y estado (activa/deshabilitada). Es el mapa completo del linaje. |
| [`diccionario-datos.md`](./diccionario-datos.md) | Columna por columna, tipo de dato y nullability de las 55 tablas del dataset `BI`, `BI_Staging`, `central_col_stream` y `firestore_*`. |
| [`mapeo-tableros-looker.md`](./mapeo-tableros-looker.md) | Qué tabla de BigQuery alimenta a cada tablero de Looker Studio. |
| [`pipeline-genero.md`](./pipeline-genero.md) | El proceso (fuera de Dataform) que infiere género por nombre/identificación. |
| [`hallazgos-y-pendientes.md`](./hallazgos-y-pendientes.md) | Inconsistencias detectadas al construir este manual que aún no tienen respuesta — léelo antes de asumir que un nombre de tabla es la fuente de verdad. |
| [`hoja-de-ruta-ai-ready.md`](./hoja-de-ruta-ai-ready.md) | Propuesta de pasos para que esta base pueda ser consultada de forma confiable por un agente de IA (no solo por personas). |

## Arquitectura en una frase

BigQuery (`davinci-onegroup-prod`) recibe datos crudos de Firestore y de la plataforma central (`central_col_stream`), Dataform los transforma en capas (staging → tablas de negocio → OBTs "gold" para Looker), y Looker Studio se conecta directo a esas tablas gold vía el conector nativo de BigQuery.

```
Firestore / App  ──┐
                    ├──▶  central_col_stream / firestore_*  (fuentes declaradas)
Sistema central  ──┘                │
                                     ▼
                         Dataform (definitions/*.sqlx)
                    stg_* (staging) → tbl_*/dim_*/fact_* (negocio) → *_gold / OBT
                                     │
                                     ▼
                          Looker Studio (conector BigQuery nativo)
```

## Antes de editar SQLX

1. Revisar `arquitectura-y-linaje.md` para entender qué depende de la tabla que vas a tocar (columna "Dependencias").
2. Si la tabla tiene `disabled: true`, confirmar con el equipo antes de reactivarla — puede que esté apagada a propósito.
3. Si tocas una tabla listada en `mapeo-tableros-looker.md`, avisar al dueño del tablero: un cambio de esquema ahí rompe visualizaciones en producción sin aviso.
4. Después de compilar (`dataform compile --json`), regenerar `arquitectura-y-linaje.md` y `diccionario-datos.md` — están derivados automáticamente del grafo, no se editan a mano.

## Setup y ejecución
Para clonar el repositorio y compilar el grafo de Dataform desde Cloud Shell, consulta la guía en [`docs/setup-cloudshell.md`](docs/setup-cloudshell.md).x