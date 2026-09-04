# Arquitectura y linaje de datos — Koggi Data Warehouse

> Generado a partir de `compiled_graph.json` (salida de `dataform compile --json`, Dataform Core 3.0.35, proyecto `davinci-onegroup-prod`). Última actualización: **14 de agosto de 2026**. Si el grafo cambia, este documento debe regenerarse — no editar los datos de tablas a mano, solo el texto narrativo.
>
> ✅ **Auditado contra el repo real** (`koggi-data-warehouse-main.zip`, commit del 6-ago-2026): los 27 archivos `.sqlx` del repo coinciden 1:1 con los `fileName` de `compiled_graph.json`, sin faltantes ni sobrantes. Verificado adicionalmente que el SQL compilado de `dim_ciudades` reproduce exactamente la macro `utils.cleanCity()` de `includes/utils.js` — confirma que el grafo no está desactualizado respecto al código fuente.

## 0. Cobertura de tests (assertions) — actualizado con datos reales del repo

Solo **9 de las 26 tablas evaluables** (`tbl_contador_unificado_2` comparte target con otra, se excluye) tienen al menos una assertion de Dataform (`rowConditions` y/o `uniqueKey`): `fact_leads_followup`, `fact_lite_reporte`, `stg_hdc_parsed`, `stg_hdc_parsed_age`, `stg_leads`, `stg_score_parsed`, `tbl_calculator_master`, `tbl_family_calculator_master`, `tbl_monitoreo_calculator`.

**17 tablas sin ninguna assertion**, incluyendo piezas gold consumidas directo por Looker: `fact_leads_atribucion`, `profiling_dashboard_quick_win_v2`, `tbl_MPK_v2`, `tbl_calculator_master_v2`, `tbl_contador_unificado`, `tbl_profiling`. Esto es insumo directo para el paso 5 de `hoja-de-ruta-ai-ready.md`.

## 1. Cómo leer este documento

Dataform separa dos tipos de nodos en el grafo compilado:

- **`tables` (27)**: se construyen con SQL dentro del repositorio (`definitions/*.sqlx`). Son las que este manual documenta con su SQL, dependencias y estado.
- **`declarations` (29)**: tablas que Dataform **consume pero no construye** — viven en BigQuery por fuera del repo (alimentadas por Firestore, la app de Koggi, o procesos externos como el notebook `dim_genero_iterativo.ipynb`). Se documentan solo como fuente, sin SQL.

## 2. Estado de la organización en capas (medallion)

El repo usa carpetas `bronze/`, `gold/` para parte de las tablas, pero **la mayoría (22 de 27) vive suelta en `definitions/`** sin carpeta de capa. La capa real de cada una hay que inferirla de sus `tags` (`gold`, `silver`, `staging`) o del nombre (`stg_`, `dim_`, `fact_`, `tbl_`), no de la carpeta física.

| Capa (por carpeta física) | # tablas |
|---|---|
| `definitions/bronze/` | 2 |
| `definitions/gold/` | 3 |
| `definitions/` (sin subcarpeta) | 22 |

**Hallazgo para la hoja de ruta AI-ready (sección 6):** reorganizar físicamente en `bronze/silver/gold/` ayudaría a que un agente (o cualquier persona nueva) infiera la capa por convención de carpeta en vez de tener que leer tags o SQL.

## 3. Inventario completo de tablas construidas por Dataform (27)

| Tabla destino | Tipo | Estado | Tags | Descripción | Archivo SQLX |
|---|---|---|---|---|---|

| `BI.dim_ciudades` | table | 🟢 activa | — | Tabla de dimensiones de ciudades creada usando la función central de utils | `definitions/dim_ciudades.sqlx` |

| `BI.dim_usuarios` | table | 🟢 activa | identidad, diario | Tabla Maestra de Usuarios y Roles unificados por email y Constructora | `definitions/dim_usuarios.sqlx` |

| `BI.fact_leads_atribucion` | incremental | 🟢 activa | diario | Tabla de hechos de leads con enriquecimiento de atribución de asesores, proyectos y seguridad RLS. Versión Incremental Segura. | `definitions/gold/fact_leads_atribucion.sqlx` |

| `BI.fact_leads_followup` | table | 🟢 activa | gold, followup, looker | Tabla maestra de hechos que calcula el delta de evolución entre el perfilamiento inicial (Pro) y el último seguimiento registrado para cada lead. | `definitions/gold/fact_leads_followup.sqlx` |

| `BI.fact_lite_reporte` | table | 🟢 activa | profiling, gold, looker | One Big Table (OBT) para Looker Studio. Contiene resultados de Profiling Lite y seguridad RLS. | `definitions/fact_profiling_lite_reporte.sqlx` |

| `BI.profiling_dashboard_quick_win` | incremental | 🔴 DESHABILITADA | dashboard, diario | Quick Win V2: Paridad 1:1 con la tabla Legacy garantizada. | `definitions/profiling_dashboard_quick_win.sqlx` |

| `BI.profiling_dashboard_quick_win_v2` | incremental | 🟢 activa | dashboard, diario | Quick Win V2 (Refactorizado). Consumo desde Staging, eliminación de hash, SMMLV dinámico, inferencia de género y score paramétrico. | `definitions/profiling_dashboard_quick_win_v2.sqlx` |

| `BI.src_calculator_fam` | view | 🟢 activa | — | Vista puente para leer la tabla conflictiva de Collections | `definitions/src_calculator_fam.sqlx` |

| `BI.stg_calculadora_lite_matrix` | table | 🔴 DESHABILITADA | profiling, lite, finance_matrix | Anexo Financiero. Parsing único + Lógica de Negocio + Redondeo a 2 decimales. | `definitions/stg_calculadora_lite_matrix.sqlx` |

| `BI.stg_calculator_v1_legacy` | table | 🟢 activa | diario | Staging Histórico. JSON anterior a 21-Abr-2026. | `definitions/stg_calculator_v1_legacy.sqlx` |

| `BI.stg_calculator_v2_current` | incremental | 🟢 activa | diario | Staging Actual. JSON post 21-Abr-2026. Extracción Total (150+ Columnas). | `definitions/stg_calculator_v2_current.sqlx` |

| `BI.stg_hdc_parsed` | incremental | 🟢 activa | staging, diario | Capa Silver: Staging de HDC. Extracción plana del nodo summary. Granularidad 1:1 estricta para cruce seguro con OBT. | `definitions/stg_hdc_parsed.sqlx` |

| `BI.stg_hdc_parsed_age` | table | 🟢 activa | — | Capa Silver: Consolidado de Edad (HDC Nuevo, HDC Viejo y Calculadora V2). | `definitions/stg_hdc_parsed_age.sqlx` |

| `BI.stg_leads` | incremental | 🟢 activa | staging, diario | Capa Silver: Staging de Leads. Limpieza, estandarización y casteo de tipos. Fuente principal de datos demográficos y de proyecto. | `definitions/stg_leads.sqlx` |

| `BI.stg_profiling_lite` | incremental | 🟢 activa | profiling, silver, daily | Tabla de hechos Silver para Profiling Lite. Consolidación de métricas transaccionales y llaves foráneas. | `definitions/stg_profiling_lite.sqlx` |

| `BI.tbl_MPK_v2` | incremental | 🔴 DESHABILITADA | diario, mpk | Tabla unificada de Motor de Política de Crédito (MPK). Versión incremental optimizada. | `definitions/tbl_MPK_v2.sqlx` |

| `BI.tbl_calculator_master` | incremental | 🔴 DESHABILITADA | diario | Tabla Silver Maestra V10 (SCD Tipo 2) con herencia de Seguridad Looker. | `definitions/tbl_calculator_master.sqlx` |

| `BI.tbl_calculator_master_v2` | incremental | 🟢 activa | diario | Capa Silver V2 (Unificada). Incluye deduplicación defensiva priorizando V2 Current sobre V1 Legacy. | `definitions/tbl_calculator_master_v2.sqlx` |

| `BI.tbl_contador_unificado` | table | 🟢 activa | diario | Consolidado de interacciones analíticas unificando flujos de leads Pro, Lite v1, Lite v2 y seguimientos. Versión Completa con deduplicación diaria. | `definitions/gold/tbl_contador_unificado.sqlx` |

| `BI.tbl_contador_unificado_2` | table | 🔴 DESHABILITADA | diario | Tabla Unificada de Eventos. Fuente: Changelog + Leads. Incluye deduplicación técnica, limpieza de borrados y detección de huérfanos. | `definitions/tbl_contador_unificado.sqlx` |

| `BI.tbl_family_calculator_master` | incremental | 🟢 activa | diario, family_group, facts | Tabla de Hechos (Snapshot Puro) unificada para Family Group (Legacy + Current) | `definitions/tbl_family_calculator_master.sqlx` |

| `BI.tbl_monitoreo_calculator` | table | 🟢 activa | — | Capa Gold OBT: Monitoreo Histórico Vectorizado con tipado estricto y seguridad Looker | `definitions/tbl_monitoreo_calculator.sqlx` |

| `BI.tbl_profiling` | incremental | 🟢 activa | — | Tabla maestra de perfilamiento. Incluye cálculo de endeudamiento, roles (Titular/Codeudor) y conteo de causales de rechazo. | `definitions/tbl_profiling.sqlx` |

| `BI_Staging.stg_score_parsed` | incremental | 🟢 activa | staging, score, diario | Capa Curada de Score. Normaliza financieras, demografía, extrae array de causales, categoriza y calcula endeudamiento. | `definitions/stg_score_parsed.sqlx` |

| `firestore_calculator.Calculator_table` | incremental | 🔴 DESHABILITADA | diario | Tabla Calculadora Maestra V5.1. Versión TEST Incremental pura (sin RN físico). | `definitions/bronze/calculator_table.sqlx` |

| `firestore_collections.Calculator_table` | incremental | 🟢 activa | — | Tabla Calculadora Family Group V1. Versión TEST Incremental con columna de auditoría. | `definitions/firestore_collections_Calculator_table.sqlx` |

| `firestore_collections.calculator_table_lite` | incremental | 🟢 activa | diario, profiling, lite | Tabla Maestra Profiling Lite. Simulaciones rápidas y causales aplanadas. | `definitions/bronze/Calculator_table_lite.sqlx` |


## 4. Dependencias (linaje) por tabla

Lista de qué lee cada tabla. Las fuentes marcadas `[declaración]` no tienen SQL en el repo — ver sección 5.


**`BI.dim_ciudades`**
- central_col_stream.tbl_sq_leads `[declaración]`

**`BI.dim_usuarios`**
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- central_col_stream.tbl_entity_database `[declaración]`

**`BI.fact_leads_atribucion`**
- central_col_stream.tbl_sq_leads `[declaración]`
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_builder_projects `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.fact_leads_followup`**
- central_col_stream.tbl_user `[declaración]`
- BI.tbl_calculator_master_v2 `[tabla Dataform]`
- central_col_stream.tbl_sq_leads `[declaración]`
- central_col_stream.tbl_sq_leads_followup `[declaración]`
- central_col_stream.tbl_sq_followup_states `[declaración]`
- central_col_stream.tbl_sq_score_validity `[declaración]`
- BI.stg_hdc_parsed `[tabla Dataform]`
- BI.stg_leads `[tabla Dataform]`
- central_col_stream.tbl_groups `[declaración]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.fact_lite_reporte`**
- BI.dim_smlv `[declaración]`
- BI.stg_profiling_lite `[tabla Dataform]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`
- central_col_stream.tbl_builder_projects `[declaración]`
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_sq_leads_lite_qualification_rules `[declaración]`
- central_col_stream.tbl_int_score_decision `[declaración]`
- central_col_stream.tbl_int_occupations `[declaración]`
- central_col_stream.tbl_int_identifications_types `[declaración]`

**`BI.profiling_dashboard_quick_win`**
- central_col_stream.tbl_sq_leads `[declaración]`
- central_col_stream.tbl_sq_score_validity `[declaración]`
- central_col_stream.tbl_sq_familiar_groups `[declaración]`
- BI.tbl_calculator_master_v2 `[tabla Dataform]`
- BI.tbl_family_calculator_master `[tabla Dataform]`
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- BI.stg_hdc_parsed_age `[tabla Dataform]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.profiling_dashboard_quick_win_v2`**
- BI.dim_smlv `[declaración]`
- BI.dim_nombres_genero `[declaración]`
- BI.stg_leads `[tabla Dataform]`
- BI_Staging.stg_score_parsed `[tabla Dataform]`
- central_col_stream.tbl_sq_familiar_groups `[declaración]`
- BI.tbl_calculator_master_v2 `[tabla Dataform]`
- BI.tbl_family_calculator_master `[tabla Dataform]`
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- BI.stg_hdc_parsed_age `[tabla Dataform]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`
- BI.dim_parametros_score `[declaración]`

**`BI.src_calculator_fam`**
- *(sin dependencias — lee de una fuente externa embebida en su propio SQL, ver el archivo)*

**`BI.stg_calculadora_lite_matrix`**
- firestore_collections.Calculator_light `[declaración]`

**`BI.stg_calculator_v1_legacy`**
- firestore_calculator.Calculator_raw_changelog `[declaración]`

**`BI.stg_calculator_v2_current`**
- firestore_collections.CalculatorCol `[declaración]`

**`BI.stg_hdc_parsed`**
- central_col_stream.tbl_sq_hdc_validity `[declaración]`

**`BI.stg_hdc_parsed_age`**
- central_col_stream.tbl_sq_hdc_validity `[declaración]`
- BI.tbl_calculator_master_v2 `[tabla Dataform]`

**`BI.stg_leads`**
- central_col_stream.tbl_sq_leads `[declaración]`

**`BI.stg_profiling_lite`**
- central_col_stream.tbl_sq_leads_lite `[declaración]`
- central_col_stream.tbl_sq_leads_lite_finantial_results `[declaración]`
- central_col_stream.tbl_sq_lite_decision_engine `[declaración]`

**`BI.tbl_MPK_v2`**
- firestore_calculator.Calculator_table `[tabla Dataform]`
- BI.tbl_family_calculator_master `[tabla Dataform]`
- central_col_stream.tbl_sq_familiar_groups `[declaración]`
- central_col_stream.tbl_sq_mpk `[declaración]`
- BI.tbl_profiling `[tabla Dataform]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`
- central_col_stream.tbl_builder_projects `[declaración]`

**`BI.tbl_calculator_master`**
- firestore_calculator.Calculator_raw_changelog `[declaración]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.tbl_calculator_master_v2`**
- BI.stg_calculator_v1_legacy `[tabla Dataform]`
- BI.stg_calculator_v2_current `[tabla Dataform]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.tbl_contador_unificado`**
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- central_col_stream.tbl_builder_projects `[declaración]`
- central_col_stream.tbl_sq_leads_light `[declaración]`
- central_col_stream.tbl_sq_leads_lite `[declaración]`
- central_col_stream.tbl_entity_database `[declaración]`
- central_col_stream.tbl_sq_leads `[declaración]`
- BI.tbl_calculator_master_v2 `[tabla Dataform]`
- central_col_stream.tbl_looker_board `[declaración]`

**`BI.tbl_contador_unificado_2`**
- central_col_stream.tbl_user `[declaración]`
- central_col_stream.tbl_groups `[declaración]`
- central_col_stream.tbl_sq_leads_light `[declaración]`
- central_col_stream.tbl_sq_leads `[declaración]`
- firestore_calculator.Calculator_raw_changelog `[declaración]`

**`BI.tbl_family_calculator_master`**
- firestore_collections.FamilyGroupCalculator `[declaración]`
- firestore_collections.FamilyGroupCalculatorCol `[declaración]`

**`BI.tbl_monitoreo_calculator`**
- BI.tbl_calculator_master `[tabla Dataform]`

**`BI.tbl_profiling`**
- central_col_stream.tbl_sq_leads `[declaración]`
- central_col_stream.tbl_sq_score_validity `[declaración]`
- central_col_stream.tbl_sq_hdc_validity `[declaración]`
- firestore_calculator.Calculator_table `[tabla Dataform]`
- central_col_stream.tbl_sq_familiar_groups `[declaración]`

**`BI_Staging.stg_score_parsed`**
- central_col_stream.tbl_sq_score_validity `[declaración]`

**`firestore_calculator.Calculator_table`**
- firestore_calculator.Calculator_raw_latest `[declaración]`

**`firestore_collections.Calculator_table`**
- firestore_collections.FamilyGroupCalculator `[declaración]`

**`firestore_collections.calculator_table_lite`**
- firestore_collections.Calculator_light `[declaración]`

## 5. Fuentes declaradas (no construidas por Dataform) — 29

| Fuente | Descripción declarada | Observación |
|---|---|---|

| `BI.dim_nombres_genero` | Usuarios del sistema | ⚠️ **Descripción placeholder** — parece copiada de `tbl_user`, no describe la tabla real. Pendiente de confirmar con el equipo. |

| `BI.dim_parametros_score` | Usuarios del sistema | ⚠️ **Descripción placeholder** — parece copiada de `tbl_user`, no describe la tabla real. Pendiente de confirmar con el equipo. |

| `BI.dim_smlv` | Usuarios del sistema | ⚠️ **Descripción placeholder** — parece copiada de `tbl_user`, no describe la tabla real. Pendiente de confirmar con el equipo. |

| `central_col_stream.tbl_builder_projects` | Metadata de proyectos de vivienda |  |

| `central_col_stream.tbl_entity_database` | Base de datos de entidades |  |

| `central_col_stream.tbl_groups` | Grupos de usuarios |  |

| `central_col_stream.tbl_int_identifications_types` | Dimensiones tipos de Identificacion - Profiling LITE |  |

| `central_col_stream.tbl_int_occupations` | Dimensiones Ocupaciones - Actividad Economica - Profiling LITE |  |

| `central_col_stream.tbl_int_score_decision` | Dimensiones Score Profiling LITE |  |

| `central_col_stream.tbl_looker_board` | Tablero de Looker |  |

| `central_col_stream.tbl_sq_familiar_groups` | Relación de leads que conforman grupos familiares para solicitudes conjuntas |  |

| `central_col_stream.tbl_sq_followup_states` | Tabla de parametria cruda que mapea los códigos de estado de seguimiento con sus etiquetas textuales correspondientes. |  |

| `central_col_stream.tbl_sq_hdc_validity` | Historias de crédito (HDC) validadas para el proceso de perfilamiento |  |

| `central_col_stream.tbl_sq_leads` | Tabla principal de leads capturados en la plataforma Pro |  |

| `central_col_stream.tbl_sq_leads_followup` | Tabla cruda que registra las interacciones y estados de seguimiento (follow-up) de los leads. |  |

| `central_col_stream.tbl_sq_leads_light` | Tabla de leads simplificados (Lite) |  |

| `central_col_stream.tbl_sq_leads_lite` | Tabla Hechos Leads - Profiling LITE |  |

| `central_col_stream.tbl_sq_leads_lite_finantial_results` | Tabla Hechos Leads - Profiling LITE |  |

| `central_col_stream.tbl_sq_leads_lite_qualification_rules` | Reglas de Calificación para Profiling LITE |  |

| `central_col_stream.tbl_sq_lite_decision_engine` | Tabla Hechos Ledas - Profiling LITE |  |

| `central_col_stream.tbl_sq_mpk` | Resultados del motor de política de crédito |  |

| `central_col_stream.tbl_sq_score_validity` | Registro de validaciones de score crediticio para perfilamiento |  |

| `central_col_stream.tbl_user` | Usuarios del sistema |  |

| `firestore_calculator.Calculator_raw_changelog` | Histórico de cambios (logs) de la calculadora en Firestore |  |

| `firestore_calculator.Calculator_raw_latest` | Datos crudos (JSON) de la calculadora provenientes de Firestore |  |

| `firestore_collections.CalculatorCol` | Nueva Calculadora Proceso BURO LATAM |  |

| `firestore_collections.Calculator_light` | Datos crudos JSON de la calculadora Lite provenientes de Firestore |  |

| `firestore_collections.FamilyGroupCalculator` | Datos crudos JSON de la calculadora de grupos familiares |  |

| `firestore_collections.FamilyGroupCalculatorCol` | Datos crudos JSON de la nueva calculadora familiar |  |
