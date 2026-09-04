# Diccionario de datos — BigQuery `davinci-onegroup-prod`

> Fuente de columnas: `_Proyecto_Koggi - Tablas.xlsx` (export de `INFORMATION_SCHEMA.COLUMNS`). Fuente de descripción/linaje: `compiled_graph.json`. Última actualización: 14 de agosto de 2026.

Convención de nombres observada: `dim_` = dimensión, `fact_`/`tbl_` = hechos, `stg_` = staging (capa silver), `src_` = vista puente.

## `BI.dim_ciudades`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla de dimensiones de ciudades creada usando la función central de utils
- **SQLX:** `definitions/dim_ciudades.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `projectCity` | STRING | YES |
| 2 | `projectCity_clean` | STRING | YES |

## `BI.dim_nombres_genero`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Usuarios del sistema

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `fullName` | STRING | YES |
| 2 | `firstName` | STRING | YES |
| 3 | `middleName` | STRING | YES |
| 4 | `lastName` | STRING | YES |
| 5 | `secondLastName` | STRING | YES |
| 6 | `identification` | STRING | YES |
| 7 | `gender_inferred` | STRING | YES |

## `BI.dim_parametros_score`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Usuarios del sistema

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `rango_nombre` | STRING | YES |
| 2 | `min_val` | NUMERIC | YES |
| 3 | `max_val` | NUMERIC | YES |

## `BI.dim_smlv`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Usuarios del sistema

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `anio` | INT64 | YES |
| 2 | `valor_smlv` | INT64 | YES |
| 3 | `auxilio_transporte` | INT64 | YES |
| 4 | `total` | INT64 | YES |
| 5 | `norma` | STRING | YES |

## `BI.dim_usuarios`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla Maestra de Usuarios y Roles unificados por email y Constructora
- **SQLX:** `definitions/dim_usuarios.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `fecha_creacion` | DATE | YES |
| 2 | `user_pk` | STRING | YES |
| 3 | `email` | STRING | YES |
| 4 | `nombre_usuario` | STRING | YES |
| 5 | `constructora_key` | STRING | YES |
| 6 | `nombre_constructora` | STRING | YES |
| 7 | `rol_negocio` | STRING | YES |
| 8 | `es_activo` | INT64 | YES |
| 9 | `fecha_actualizacion` | DATETIME | YES |

## `BI.fact_leads_atribucion`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla de hechos de leads con enriquecimiento de atribución de asesores, proyectos y seguridad RLS. Versión Incremental Segura.
- **SQLX:** `definitions/gold/fact_leads_atribucion.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_lead` | INT64 | YES |
| 2 | `mes_ano` | DATE | YES |
| 3 | `dia_nombre` | STRING | YES |
| 4 | `fecha` | DATE | YES |
| 5 | `origen` | STRING | YES |
| 6 | `proyecto` | STRING | YES |
| 7 | `ciudad_proyecto` | STRING | YES |
| 8 | `constructora` | STRING | YES |
| 9 | `calificacion` | STRING | YES |
| 10 | `email` | STRING | YES |
| 11 | `entity_key` | STRING | YES |
| 12 | `usuario` | STRING | YES |
| 13 | `tipo_usuario` | STRING | YES |
| 14 | `city` | STRING | YES |
| 15 | `Sector` | STRING | YES |
| 16 | `Zona` | STRING | YES |
| 17 | `ventas_efectivas` | STRING | YES |
| 18 | `uid_looker` | STRING | YES |

## `BI.fact_leads_followup`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla maestra de hechos que calcula el delta de evolución entre el perfilamiento inicial (Pro) y el último seguimiento registrado para cada lead.
- **SQLX:** `definitions/gold/fact_leads_followup.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_lead` | INT64 | YES |
| 2 | `identificacion` | INT64 | YES |
| 3 | `nombre_completo` | STRING | YES |
| 4 | `uid_looker` | STRING | YES |
| 5 | `proyecto` | STRING | YES |
| 6 | `ciudad_proyecto` | STRING | YES |
| 7 | `constructora` | STRING | YES |
| 8 | `tipo_vivienda` | STRING | YES |
| 9 | `venta_efectiva` | INT64 | YES |
| 10 | `label_actual` | STRING | YES |
| 11 | `id_seguimiento` | INT64 | YES |
| 12 | `total_seguimientos_realizados` | INT64 | YES |
| 13 | `total_leads_calificacion_inicial` | INT64 | YES |
| 14 | `fecha_actual` | DATE | YES |
| 15 | `ocupacion_actual` | STRING | YES |
| 16 | `edad_aproximada_actual` | INT64 | YES |
| 17 | `ingresos_estimados_actual` | FLOAT64 | YES |
| 18 | `cuotas_titular_actual` | INT64 | YES |
| 19 | `endeudamiento_financiero_actual` | FLOAT64 | YES |
| 20 | `fecha_entrega_inmueble_actual` | DATE | YES |
| 21 | `valor_inmueble_actual` | INT64 | YES |
| 22 | `valor_credito_actual` | INT64 | YES |
| 23 | `score_actual` | INT64 | YES |
| 24 | `calificacion_sugerida_actual` | STRING | YES |
| 25 | `koggi_profiling_actual` | STRING | YES |
| 26 | `indicador_endeudamiento_financiero_actual` | STRING | YES |
| 27 | `disponible_cuota_segun_ingresos_actual` | INT64 | YES |
| 28 | `relacion_cuota_ingresos_actual` | FLOAT64 | YES |
| 29 | `maximo_cuota_ley_vivienda_actual` | INT64 | YES |
| 30 | `credito_maximo_segun_disponible_COP_actual` | INT64 | YES |
| 31 | `credito_maximo_segun_disponible_UVR_actual` | INT64 | YES |
| 32 | `cuota_mensual_total_actual` | NUMERIC | YES |
| 33 | `saldo_total_actual` | NUMERIC | YES |
| 34 | `calificacion_actual` | STRING | YES |
| 35 | `fecha_original` | DATE | YES |
| 36 | `ocupacion_original` | STRING | YES |
| 37 | `edad_aproximada_original` | INT64 | YES |
| 38 | `ingresos_estimados_original` | FLOAT64 | YES |
| 39 | `cuotas_titular_original` | INT64 | YES |
| 40 | `endeudamiento_financiero_original` | FLOAT64 | YES |
| 41 | `fecha_entrega_inmueble_original` | DATE | YES |
| 42 | `valor_inmueble_original` | INT64 | YES |
| 43 | `valor_credito_original` | INT64 | YES |
| 44 | `score_original` | INT64 | YES |
| 45 | `calificacion_sugerida_original` | STRING | YES |
| 46 | `koggi_profiling_original` | STRING | YES |
| 47 | `indicador_endeudamiento_financiero_original` | STRING | YES |
| 48 | `disponible_cuota_segun_ingresos_original` | INT64 | YES |
| 49 | `relacion_cuota_ingresos_original` | FLOAT64 | YES |
| 50 | `maximo_cuota_ley_vivienda_original` | INT64 | YES |
| 51 | `credito_maximo_segun_disponible_COP_original` | INT64 | YES |
| 52 | `credito_maximo_segun_disponible_UVR_original` | INT64 | YES |
| 53 | `cuota_mensual_total_original` | NUMERIC | YES |
| 54 | `saldo_total_original` | NUMERIC | YES |
| 55 | `calificacion_original` | STRING | YES |
| 56 | `email_creador` | STRING | YES |
| 57 | `usuario_creador` | STRING | YES |
| 58 | `tipo_usuario_creador` | STRING | YES |
| 59 | `usuario_ultimo_ejecutor` | STRING | YES |
| 60 | `tipo_usuario_ultimo_ejecutor` | STRING | YES |
| 61 | `usuario_ejecutor_original` | STRING | YES |
| 62 | `tipo_usuario_ejecutor_original` | STRING | YES |
| 63 | `delta_edad_aproximada` | INT64 | YES |
| 64 | `delta_ingresos` | FLOAT64 | YES |
| 65 | `delta_cuotas_titular` | INT64 | YES |
| 66 | `delta_endeudamiento_financiero` | FLOAT64 | YES |
| 67 | `delta_valor_inmueble` | INT64 | YES |
| 68 | `delta_valor_credito` | INT64 | YES |
| 69 | `delta_score` | INT64 | YES |
| 70 | `delta_disponible_cuota_segun_ingresos` | INT64 | YES |
| 71 | `delta_relacion_cuota_ingresos` | FLOAT64 | YES |
| 72 | `delta_maximo_cuota_ley_vivienda` | INT64 | YES |
| 73 | `delta_credito_maximo_COP` | INT64 | YES |
| 74 | `delta_credito_maximo_UVR` | INT64 | YES |
| 75 | `delta_cuota_mensual_total` | NUMERIC | YES |
| 76 | `dias_transcurridos_totales` | INT64 | YES |

## `BI.fact_lite_reporte`

- **Origen:** Construida por Dataform
- **Descripción:** One Big Table (OBT) para Looker Studio. Contiene resultados de Profiling Lite y seguridad RLS.
- **SQLX:** `definitions/fact_profiling_lite_reporte.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `looker_security_uid` | STRING | YES |
| 2 | `constructora_nombre` | STRING | YES |
| 3 | `fecha_perfilamiento` | DATETIME | YES |
| 4 | `lead_id` | STRING | YES |
| 5 | `tipo_documento` | STRING | YES |
| 6 | `documento_cliente` | STRING | YES |
| 7 | `nombre_cliente` | STRING | YES |
| 8 | `correo_cliente` | STRING | YES |
| 9 | `telefono_cliente` | STRING | YES |
| 10 | `ocupacion` | STRING | YES |
| 11 | `proyecto_nombre` | STRING | YES |
| 12 | `proyecto_ciudad` | STRING | YES |
| 13 | `proyecto_tipo_vivienda` | STRING | YES |
| 14 | `asesor_nombre` | STRING | YES |
| 15 | `calificacion_medalla` | STRING | YES |
| 16 | `estado_viabilidad` | STRING | YES |
| 17 | `score_motor` | INT64 | YES |
| 18 | `rango_score` | STRING | YES |
| 19 | `rango_salarios` | STRING | YES |
| 20 | `porcentaje_endeudamiento` | FLOAT64 | YES |
| 21 | `valor_inmueble` | FLOAT64 | YES |
| 22 | `valor_credito` | FLOAT64 | YES |
| 23 | `ingresos_mensuales` | FLOAT64 | YES |
| 24 | `valor_endeudamiento` | FLOAT64 | YES |
| 25 | `cuota_disponible` | FLOAT64 | YES |
| 26 | `cuota_inicial` | FLOAT64 | YES |
| 27 | `max_credito_pesos` | FLOAT64 | YES |
| 28 | `max_credito_uvr` | FLOAT64 | YES |
| 29 | `rango_credito_max_pesos` | STRING | YES |
| 30 | `rango_credito_max_uvr` | STRING | YES |
| 31 | `flag_financiero` | BOOL | YES |
| 32 | `flag_motor` | BOOL | YES |

## `BI.profiling_dashboard_quick_win`

- **Origen:** Construida por Dataform
- **Descripción:** Quick Win V2: Paridad 1:1 con la tabla Legacy garantizada.
- **SQLX:** `definitions/profiling_dashboard_quick_win.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `lead_id` | INT64 | YES |
| 2 | `Fecha_creacion` | DATETIME | YES |
| 3 | `fullname` | STRING | YES |
| 4 | `Constructora` | STRING | YES |
| 5 | `identification` | STRING | YES |
| 6 | `gender` | STRING | YES |
| 7 | `venta_efectiva` | INT64 | YES |
| 8 | `createdEmail` | STRING | YES |
| 9 | `calificacion_sugerida` | STRING | YES |
| 10 | `fecha_entrega_proyecto` | DATETIME | YES |
| 11 | `valor_a_financiar` | INT64 | YES |
| 12 | `ciudad_proyecto` | STRING | YES |
| 13 | `nombre_proyecto` | STRING | YES |
| 14 | `tipo_vivienda` | STRING | YES |
| 15 | `valor_vivienda` | INT64 | YES |
| 16 | `score` | INT64 | YES |
| 17 | `preselectaDecision` | STRING | YES |
| 18 | `preselectaStatus` | STRING | YES |
| 19 | `sarlaftStatus` | STRING | YES |
| 20 | `identificationStatus` | STRING | YES |
| 21 | `housingLawIndicator` | STRING | YES |
| 22 | `idFamilyGroup` | INT64 | YES |
| 23 | `scoring` | INT64 | YES |
| 24 | `score_date` | DATETIME | YES |
| 25 | `INGRESO_FINAL` | FLOAT64 | YES |
| 26 | `CUOTAS_TITULAR` | FLOAT64 | YES |
| 27 | `ENDEUDAMIENTO` | FLOAT64 | YES |
| 28 | `ocupacion` | STRING | YES |
| 29 | `rol` | STRING | YES |
| 30 | `es_intento_principal` | INT64 | YES |
| 31 | `edad_promedio` | FLOAT64 | YES |
| 32 | `usuario_nombre` | STRING | YES |
| 33 | `tipo_usuario` | STRING | YES |
| 34 | `observacion` | STRING | YES |
| 35 | `document_id` | STRING | YES |
| 36 | `ingresos` | FLOAT64 | YES |
| 37 | `valor_credito` | INT64 | YES |
| 38 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 39 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 40 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 41 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 42 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 43 | `fam_document_id` | STRING | YES |
| 44 | `fam_calificacion` | STRING | YES |
| 45 | `fam_indicador_ley_vivienda` | STRING | YES |
| 46 | `fam_ingresos` | INT64 | YES |
| 47 | `fam_cuotas_titular` | INT64 | YES |
| 48 | `fam_gastos_familiares` | INT64 | YES |
| 49 | `fam_maximo_cuota_ley_vivienda` | INT64 | YES |
| 50 | `fam_valor_credito` | INT64 | YES |
| 51 | `fam_cred_max_segun_disp_pesos` | INT64 | YES |
| 52 | `fam_cred_max_segun_disp_uvr` | INT64 | YES |
| 53 | `fam_valor_credito_pesos_20_anios` | INT64 | YES |
| 54 | `fam_valor_credito_uvr_20_anios` | INT64 | YES |
| 55 | `fam_valor_credito_uvr_30_anios` | INT64 | YES |
| 56 | `fam_koggi_profiling` | STRING | YES |
| 57 | `rango_salarios` | STRING | YES |
| 58 | `rango_endeudamiento` | STRING | YES |
| 59 | `rango_score` | STRING | YES |
| 60 | `rango_credito_max_pesos_15` | STRING | YES |
| 61 | `rango_credito_max_uvr_15` | STRING | YES |
| 62 | `rango_credito_max_pesos_20` | STRING | YES |
| 63 | `rango_credito_max_uvr_20` | STRING | YES |
| 64 | `rango_credito_max_uvr_30` | STRING | YES |
| 65 | `fam_rango_salarios` | STRING | YES |
| 66 | `fam_rango_endeudamiento` | STRING | YES |
| 67 | `fam_rango_score` | STRING | YES |
| 68 | `fam_rango_credito_max_pesos_15` | STRING | YES |
| 69 | `fam_rango_credito_max_uvr_15` | STRING | YES |
| 70 | `fam_rango_credito_max_pesos_20` | STRING | YES |
| 71 | `fam_rango_credito_max_uvr_20` | STRING | YES |
| 72 | `fam_rango_credito_max_uvr_30` | STRING | YES |
| 73 | `uid_looker` | STRING | YES |
| 74 | `unidades_vivienda` | STRING | YES |
| 75 | `fila_hash` | STRING | YES |
| 76 | `fecha_ultima_actualizacion_bi` | DATETIME | YES |

## `BI.profiling_dashboard_quick_win_v2`

- **Origen:** Construida por Dataform
- **Descripción:** Quick Win V2 (Refactorizado). Consumo desde Staging, eliminación de hash, SMMLV dinámico, inferencia de género y score paramétrico.
- **SQLX:** `definitions/profiling_dashboard_quick_win_v2.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `lead_id` | STRING | YES |
| 2 | `Fecha_creacion` | DATE | YES |
| 3 | `fullname` | STRING | YES |
| 4 | `Constructora` | STRING | YES |
| 5 | `identification` | STRING | YES |
| 6 | `gender` | STRING | YES |
| 7 | `venta_efectiva` | INT64 | YES |
| 8 | `createdEmail` | STRING | YES |
| 9 | `calificacion_sugerida` | STRING | YES |
| 10 | `fecha_entrega_proyecto` | DATE | YES |
| 11 | `valor_a_financiar` | INT64 | YES |
| 12 | `ciudad_proyecto` | STRING | YES |
| 13 | `nombre_proyecto` | STRING | YES |
| 14 | `tipo_vivienda` | STRING | YES |
| 15 | `valor_vivienda` | INT64 | YES |
| 16 | `score` | INT64 | YES |
| 17 | `preselectaDecision` | STRING | YES |
| 18 | `preselectaStatus` | STRING | YES |
| 19 | `sarlaftStatus` | STRING | YES |
| 20 | `identificationStatus` | STRING | YES |
| 21 | `housingLawIndicator` | STRING | YES |
| 22 | `idFamilyGroup` | INT64 | YES |
| 23 | `scoring` | INT64 | YES |
| 24 | `score_date` | DATE | YES |
| 25 | `INGRESO_FINAL` | FLOAT64 | YES |
| 26 | `CUOTAS_TITULAR` | FLOAT64 | YES |
| 27 | `ENDEUDAMIENTO` | FLOAT64 | YES |
| 28 | `ocupacion` | STRING | YES |
| 29 | `rol` | STRING | YES |
| 30 | `es_intento_principal` | INT64 | YES |
| 31 | `edad_promedio` | FLOAT64 | YES |
| 32 | `usuario_nombre` | STRING | YES |
| 33 | `tipo_usuario` | STRING | YES |
| 34 | `observacion` | STRING | YES |
| 35 | `document_id` | STRING | YES |
| 36 | `ingresos` | FLOAT64 | YES |
| 37 | `valor_credito` | INT64 | YES |
| 38 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 39 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 40 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 41 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 42 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 43 | `fam_document_id` | STRING | YES |
| 44 | `fam_calificacion` | STRING | YES |
| 45 | `fam_indicador_ley_vivienda` | STRING | YES |
| 46 | `fam_ingresos` | INT64 | YES |
| 47 | `fam_cuotas_titular` | INT64 | YES |
| 48 | `fam_gastos_familiares` | INT64 | YES |
| 49 | `fam_maximo_cuota_ley_vivienda` | INT64 | YES |
| 50 | `fam_valor_credito` | INT64 | YES |
| 51 | `fam_cred_max_segun_disp_pesos` | INT64 | YES |
| 52 | `fam_cred_max_segun_disp_uvr` | INT64 | YES |
| 53 | `fam_valor_credito_pesos_20_anios` | INT64 | YES |
| 54 | `fam_valor_credito_uvr_20_anios` | INT64 | YES |
| 55 | `fam_valor_credito_uvr_30_anios` | INT64 | YES |
| 56 | `fam_koggi_profiling` | STRING | YES |
| 57 | `rango_salarios` | STRING | YES |
| 58 | `fam_rango_salarios` | STRING | YES |
| 59 | `rango_score` | STRING | YES |
| 60 | `fam_rango_score` | STRING | YES |
| 61 | `rango_endeudamiento` | STRING | YES |
| 62 | `fam_rango_endeudamiento` | STRING | YES |
| 63 | `rango_credito_max_pesos_15` | STRING | YES |
| 64 | `rango_credito_max_uvr_15` | STRING | YES |
| 65 | `rango_credito_max_pesos_20` | STRING | YES |
| 66 | `rango_credito_max_uvr_20` | STRING | YES |
| 67 | `rango_credito_max_uvr_30` | STRING | YES |
| 68 | `fam_rango_credito_max_pesos_15` | STRING | YES |
| 69 | `fam_rango_credito_max_uvr_15` | STRING | YES |
| 70 | `fam_rango_credito_max_pesos_20` | STRING | YES |
| 71 | `fam_rango_credito_max_uvr_20` | STRING | YES |
| 72 | `fam_rango_credito_max_uvr_30` | STRING | YES |
| 73 | `uid_looker` | STRING | YES |
| 74 | `unidades_vivienda` | STRING | YES |
| 75 | `fecha_ultima_actualizacion_bi` | DATETIME | YES |

## `BI.src_calculator_fam`

- **Origen:** Construida por Dataform
- **Descripción:** Vista puente para leer la tabla conflictiva de Collections
- **SQLX:** `definitions/src_calculator_fam.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `timestamp_registro` | DATETIME | YES |
| 2 | `document_id` | STRING | YES |
| 3 | `timestamp` | TIMESTAMP | YES |
| 4 | `id_unico` | STRING | YES |
| 5 | `id_lead` | INT64 | YES |
| 6 | `valor_inmueble` | INT64 | YES |
| 7 | `calificacion` | STRING | YES |
| 8 | `personas_cargo` | INT64 | YES |
| 9 | `proyecto` | STRING | YES |
| 10 | `constructora` | STRING | YES |
| 11 | `koggi_profiling` | STRING | YES |
| 12 | `score` | INT64 | YES |
| 13 | `identificacion` | INT64 | YES |
| 14 | `idFamilyGroup` | INT64 | YES |
| 15 | `fecha` | STRING | YES |
| 16 | `tipo_vivienda` | STRING | YES |
| 17 | `nombre` | STRING | YES |
| 18 | `diferencia_credito_maximo` | INT64 | YES |
| 19 | `indicador_ley_vivienda` | STRING | YES |
| 20 | `indicador_causales` | STRING | YES |
| 21 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 22 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 23 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 24 | `projectBankNIT` | STRING | YES |
| 25 | `ingresos` | INT64 | YES |
| 26 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 27 | `ciudad` | STRING | YES |
| 28 | `cuotas_titular` | INT64 | YES |
| 29 | `gastos_familiares` | INT64 | YES |
| 30 | `valor_credito` | INT64 | YES |
| 31 | `es_followup_origen` | BOOL | YES |
| 32 | `tipo_registro_origen` | STRING | YES |
| 33 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 34 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 35 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 36 | `prestamo_maximo_tasa_mediana_15_anios` | INT64 | YES |
| 37 | `prestamo_maximo_tasa_baja_15_anios` | INT64 | YES |
| 38 | `prestamo_maximo_tasa_baja_20_anios` | INT64 | YES |
| 39 | `prestamo_maximo_tasa_mediana_30_anios` | INT64 | YES |
| 40 | `prestamo_maximo_tasa_baja_30_anios` | INT64 | YES |
| 41 | `fecha_registro` | DATE | YES |
| 42 | `mes_registro` | STRING | YES |
| 43 | `ciudad_estandarizada` | STRING | YES |
| 44 | `endeudamiento` | FLOAT64 | YES |
| 45 | `rango_endeudamiento` | STRING | YES |
| 46 | `rango_score` | STRING | YES |
| 47 | `rango_salarios` | STRING | YES |
| 48 | `credito_max_pesos` | FLOAT64 | YES |
| 49 | `rango_credito_max_pesos_15` | STRING | YES |
| 50 | `credito_max_uvr` | FLOAT64 | YES |
| 51 | `rango_credito_max_uvr_15` | STRING | YES |
| 52 | `credito_max_pesos_20` | FLOAT64 | YES |
| 53 | `rango_credito_max_pesos_20` | STRING | YES |
| 54 | `credito_max_uvr_20` | FLOAT64 | YES |
| 55 | `rango_credito_max_uvr_20` | STRING | YES |
| 56 | `credito_max_uvr_30` | FLOAT64 | YES |
| 57 | `rango_credito_max_uvr_30` | STRING | YES |
| 58 | `ultima_actualizacion` | DATETIME | YES |

## `BI.stg_calculadora_lite_matrix`

- **Origen:** Construida por Dataform
- **Descripción:** Anexo Financiero. Parsing único + Lógica de Negocio + Redondeo a 2 decimales.
- **SQLX:** `definitions/stg_calculadora_lite_matrix.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp_registro` | DATETIME | YES |
| 3 | `id_lead` | INT64 | YES |
| 4 | `identificacion` | INT64 | YES |
| 5 | `constructora` | STRING | YES |
| 6 | `proyecto` | STRING | YES |
| 7 | `calificacion_financiera` | STRING | YES |
| 8 | `koggi_profiling` | STRING | YES |
| 9 | `causales_raw` | STRING | YES |
| 10 | `causal_rechazo_categoria` | STRING | YES |
| 11 | `ingresos` | FLOAT64 | YES |
| 12 | `obligaciones_financieras` | FLOAT64 | YES |
| 13 | `disponible_ingresos_pesos` | FLOAT64 | YES |
| 14 | `endeudamiento_financiero` | FLOAT64 | YES |
| 15 | `relacion_cuota_ingreso_preselecta` | FLOAT64 | YES |
| 16 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 17 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 18 | `tope_ley_vivienda_pesos` | FLOAT64 | YES |
| 19 | `indicador_endeudamiento_financiero` | STRING | YES |
| 20 | `capacidad_endeudamiento_pct` | FLOAT64 | YES |
| 21 | `cuota_pesos_15` | FLOAT64 | YES |
| 22 | `cupo_pesos_15` | INT64 | YES |
| 23 | `cuota_pesos_20` | FLOAT64 | YES |
| 24 | `cupo_pesos_20` | INT64 | YES |
| 25 | `cuota_pesos_30` | FLOAT64 | YES |
| 26 | `cupo_pesos_30` | INT64 | YES |
| 27 | `cuota_uvr_20` | FLOAT64 | YES |
| 28 | `cupo_uvr_20` | INT64 | YES |
| 29 | `cupo_uvr_30` | INT64 | YES |

## `BI.stg_calculator_v1_legacy`

- **Origen:** Construida por Dataform
- **Descripción:** Staging Histórico. JSON anterior a 21-Abr-2026.
- **SQLX:** `definitions/stg_calculator_v1_legacy.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp` | TIMESTAMP | YES |
| 3 | `data` | STRING | YES |
| 4 | `is_deleted` | BOOL | YES |
| 5 | `version_esquema` | STRING | YES |
| 6 | `tipo_registro_origen` | STRING | YES |
| 7 | `id_lead` | INT64 | YES |
| 8 | `id_proyecto` | INT64 | YES |
| 9 | `idFamilyGroup` | INT64 | YES |
| 10 | `identificacion` | INT64 | YES |
| 11 | `tipo_identificacion` | STRING | YES |
| 12 | `nombre_completo` | STRING | YES |
| 13 | `edad_aproximada` | INT64 | YES |
| 14 | `ocupacion` | STRING | YES |
| 15 | `personas_a_cargo` | INT64 | YES |
| 16 | `ingresos_estimados` | FLOAT64 | YES |
| 17 | `gastos_familiares` | FLOAT64 | YES |
| 18 | `endeudamiento_financiero` | FLOAT64 | YES |
| 19 | `descripcion_endeudamiento_financiero` | STRING | YES |
| 20 | `proyecto` | STRING | YES |
| 21 | `ciudad_proyecto` | STRING | YES |
| 22 | `constructora` | STRING | YES |
| 23 | `project_bank_nit` | STRING | YES |
| 24 | `tipo_vivienda` | STRING | YES |
| 25 | `fecha_entrega_inmueble` | STRING | YES |
| 26 | `valor_inmueble` | INT64 | YES |
| 27 | `valor_credito` | INT64 | YES |
| 28 | `score` | INT64 | YES |
| 29 | `calificacion_sugerida` | STRING | YES |
| 30 | `color_score` | STRING | YES |
| 31 | `decision_score` | STRING | YES |
| 32 | `koggi_profiling` | STRING | YES |
| 33 | `es_followup_origen` | BOOL | YES |
| 34 | `indicador_edad` | STRING | YES |
| 35 | `indicador_endeudamiento_financiero` | STRING | YES |
| 36 | `indicador_ley_vivienda` | STRING | YES |
| 37 | `edad_minima_datacredito` | INT64 | YES |
| 38 | `edad_maxima_datacredito` | INT64 | YES |
| 39 | `fecha_expedicion_documento` | STRING | YES |
| 40 | `obligaciones_financieras` | FLOAT64 | YES |
| 41 | `bank_id` | INT64 | YES |
| 42 | `bank_all_risk_value` | FLOAT64 | YES |
| 43 | `bank_life_insurance` | FLOAT64 | YES |
| 44 | `bank_max_to_finance` | FLOAT64 | YES |
| 45 | `cuotas_titular` | INT64 | YES |
| 46 | `cuota_minima_disponible` | INT64 | YES |
| 47 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 48 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 49 | `credito_maximo_segun_disponible_COP` | INT64 | YES |
| 50 | `diferencia_credito_maximo_COP` | INT64 | YES |
| 51 | `credito_maximo_segun_disponible_UVR` | INT64 | YES |
| 52 | `diferencia_credito_maximo_UVR` | INT64 | YES |
| 53 | `tasa_COP_15_baja` | FLOAT64 | YES |
| 54 | `MaximoPrestamo_COP_15_baja` | INT64 | YES |
| 55 | `cuota_COP_15_baja` | INT64 | YES |
| 56 | `ingresos_faltantes_COP_15_baja` | INT64 | YES |
| 57 | `ingresos_ideales_COP_15_baja` | INT64 | YES |
| 58 | `porc_capacidad_pago_COP_15_baja` | FLOAT64 | YES |
| 59 | `relacion_cuota_ingresos_COP_15_baja` | FLOAT64 | YES |
| 60 | `total_gastos_COP_15_baja` | INT64 | YES |
| 61 | `tasa_COP_15_mediana` | FLOAT64 | YES |
| 62 | `MaximoPrestamo_COP_15_mediana` | INT64 | YES |
| 63 | `cuota_COP_15_mediana` | INT64 | YES |
| 64 | `ingresos_faltantes_COP_15_mediana` | INT64 | YES |
| 65 | `ingresos_ideales_COP_15_mediana` | INT64 | YES |
| 66 | `porc_capacidad_pago_COP_15_mediana` | FLOAT64 | YES |
| 67 | `relacion_cuota_ingresos_COP_15_mediana` | FLOAT64 | YES |
| 68 | `total_gastos_COP_15_mediana` | INT64 | YES |
| 69 | `tasa_COP_20_baja` | FLOAT64 | YES |
| 70 | `MaximoPrestamo_COP_20_baja` | INT64 | YES |
| 71 | `cuota_COP_20_baja` | INT64 | YES |
| 72 | `ingresos_faltantes_COP_20_baja` | INT64 | YES |
| 73 | `ingresos_ideales_COP_20_baja` | INT64 | YES |
| 74 | `porc_capacidad_pago_COP_20_baja` | FLOAT64 | YES |
| 75 | `relacion_cuota_ingresos_COP_20_baja` | FLOAT64 | YES |
| 76 | `total_gastos_COP_20_baja` | INT64 | YES |
| 77 | `tasa_COP_20_mediana` | FLOAT64 | YES |
| 78 | `MaximoPrestamo_COP_20_mediana` | INT64 | YES |
| 79 | `cuota_COP_20_mediana` | INT64 | YES |
| 80 | `ingresos_faltantes_COP_20_mediana` | INT64 | YES |
| 81 | `ingresos_ideales_COP_20_mediana` | INT64 | YES |
| 82 | `porc_capacidad_pago_COP_20_mediana` | FLOAT64 | YES |
| 83 | `relacion_cuota_ingresos_COP_20_mediana` | FLOAT64 | YES |
| 84 | `total_gastos_COP_20_mediana` | INT64 | YES |
| 85 | `tasa_COP_30_baja` | FLOAT64 | YES |
| 86 | `MaximoPrestamo_COP_30_baja` | INT64 | YES |
| 87 | `cuota_COP_30_baja` | INT64 | YES |
| 88 | `ingresos_faltantes_COP_30_baja` | INT64 | YES |
| 89 | `ingresos_ideales_COP_30_baja` | INT64 | YES |
| 90 | `porc_capacidad_pago_COP_30_baja` | FLOAT64 | YES |
| 91 | `relacion_cuota_ingresos_COP_30_baja` | FLOAT64 | YES |
| 92 | `total_gastos_COP_30_baja` | INT64 | YES |
| 93 | `tasa_COP_30_mediana` | FLOAT64 | YES |
| 94 | `MaximoPrestamo_COP_30_mediana` | INT64 | YES |
| 95 | `cuota_COP_30_mediana` | INT64 | YES |
| 96 | `ingresos_faltantes_COP_30_mediana` | INT64 | YES |
| 97 | `ingresos_ideales_COP_30_mediana` | INT64 | YES |
| 98 | `porc_capacidad_pago_COP_30_mediana` | FLOAT64 | YES |
| 99 | `relacion_cuota_ingresos_COP_30_mediana` | FLOAT64 | YES |
| 100 | `total_gastos_COP_30_mediana` | INT64 | YES |
| 101 | `tasa_UVR_15_baja` | FLOAT64 | YES |
| 102 | `MaximoPrestamo_UVR_15_baja` | INT64 | YES |
| 103 | `cuota_UVR_15_baja` | INT64 | YES |
| 104 | `ingresos_faltantes_UVR_15_baja` | INT64 | YES |
| 105 | `ingresos_ideales_UVR_15_baja` | INT64 | YES |
| 106 | `porc_capacidad_pago_UVR_15_baja` | FLOAT64 | YES |
| 107 | `relacion_cuota_ingresos_UVR_15_baja` | FLOAT64 | YES |
| 108 | `total_gastos_UVR_15_baja` | INT64 | YES |
| 109 | `tasa_UVR_15_mediana` | FLOAT64 | YES |
| 110 | `MaximoPrestamo_UVR_15_mediana` | INT64 | YES |
| 111 | `cuota_UVR_15_mediana` | INT64 | YES |
| 112 | `ingresos_faltantes_UVR_15_mediana` | INT64 | YES |
| 113 | `ingresos_ideales_UVR_15_mediana` | INT64 | YES |
| 114 | `porc_capacidad_pago_UVR_15_mediana` | FLOAT64 | YES |
| 115 | `relacion_cuota_ingresos_UVR_15_mediana` | FLOAT64 | YES |
| 116 | `total_gastos_UVR_15_mediana` | INT64 | YES |
| 117 | `tasa_UVR_20_baja` | FLOAT64 | YES |
| 118 | `MaximoPrestamo_UVR_20_baja` | INT64 | YES |
| 119 | `cuota_UVR_20_baja` | INT64 | YES |
| 120 | `ingresos_faltantes_UVR_20_baja` | INT64 | YES |
| 121 | `ingresos_ideales_UVR_20_baja` | INT64 | YES |
| 122 | `porc_capacidad_pago_UVR_20_baja` | FLOAT64 | YES |
| 123 | `relacion_cuota_ingresos_UVR_20_baja` | FLOAT64 | YES |
| 124 | `total_gastos_UVR_20_baja` | INT64 | YES |
| 125 | `tasa_UVR_20_mediana` | FLOAT64 | YES |
| 126 | `MaximoPrestamo_UVR_20_mediana` | INT64 | YES |
| 127 | `cuota_UVR_20_mediana` | INT64 | YES |
| 128 | `ingresos_faltantes_UVR_20_mediana` | INT64 | YES |
| 129 | `ingresos_ideales_UVR_20_mediana` | INT64 | YES |
| 130 | `porc_capacidad_pago_UVR_20_mediana` | FLOAT64 | YES |
| 131 | `relacion_cuota_ingresos_UVR_20_mediana` | FLOAT64 | YES |
| 132 | `total_gastos_UVR_20_mediana` | INT64 | YES |
| 133 | `tasa_UVR_30_baja` | FLOAT64 | YES |
| 134 | `MaximoPrestamo_UVR_30_baja` | INT64 | YES |
| 135 | `cuota_UVR_30_baja` | INT64 | YES |
| 136 | `ingresos_faltantes_UVR_30_baja` | INT64 | YES |
| 137 | `ingresos_ideales_UVR_30_baja` | INT64 | YES |
| 138 | `porc_capacidad_pago_UVR_30_baja` | FLOAT64 | YES |
| 139 | `relacion_cuota_ingresos_UVR_30_baja` | FLOAT64 | YES |
| 140 | `total_gastos_UVR_30_baja` | INT64 | YES |
| 141 | `tasa_UVR_30_mediana` | FLOAT64 | YES |
| 142 | `MaximoPrestamo_UVR_30_mediana` | INT64 | YES |
| 143 | `cuota_UVR_30_mediana` | INT64 | YES |
| 144 | `ingresos_faltantes_UVR_30_mediana` | INT64 | YES |
| 145 | `ingresos_ideales_UVR_30_mediana` | INT64 | YES |
| 146 | `porc_capacidad_pago_UVR_30_mediana` | FLOAT64 | YES |
| 147 | `relacion_cuota_ingresos_UVR_30_mediana` | FLOAT64 | YES |
| 148 | `total_gastos_UVR_30_mediana` | INT64 | YES |

## `BI.stg_calculator_v2_current`

- **Origen:** Construida por Dataform
- **Descripción:** Staging Actual. JSON post 21-Abr-2026. Extracción Total (150+ Columnas).
- **SQLX:** `definitions/stg_calculator_v2_current.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp` | TIMESTAMP | YES |
| 3 | `data` | STRING | YES |
| 4 | `is_deleted` | BOOL | YES |
| 5 | `version_esquema` | STRING | YES |
| 6 | `tipo_registro_origen` | STRING | YES |
| 7 | `id_lead` | INT64 | YES |
| 8 | `id_proyecto` | INT64 | YES |
| 9 | `idFamilyGroup` | INT64 | YES |
| 10 | `identificacion` | INT64 | YES |
| 11 | `tipo_identificacion` | STRING | YES |
| 12 | `nombre_completo` | STRING | YES |
| 13 | `edad_aproximada` | INT64 | YES |
| 14 | `ocupacion` | STRING | YES |
| 15 | `personas_a_cargo` | INT64 | YES |
| 16 | `ingresos_estimados` | FLOAT64 | YES |
| 17 | `gastos_familiares` | FLOAT64 | YES |
| 18 | `endeudamiento_financiero` | FLOAT64 | YES |
| 19 | `descripcion_endeudamiento_financiero` | STRING | YES |
| 20 | `proyecto` | STRING | YES |
| 21 | `ciudad_proyecto` | STRING | YES |
| 22 | `constructora` | STRING | YES |
| 23 | `project_bank_nit` | STRING | YES |
| 24 | `tipo_vivienda` | STRING | YES |
| 25 | `fecha_entrega_inmueble` | STRING | YES |
| 26 | `valor_inmueble` | INT64 | YES |
| 27 | `valor_credito` | INT64 | YES |
| 28 | `score` | INT64 | YES |
| 29 | `calificacion_sugerida` | STRING | YES |
| 30 | `color_score` | STRING | YES |
| 31 | `decision_score` | STRING | YES |
| 32 | `koggi_profiling` | STRING | YES |
| 33 | `es_followup_origen` | BOOL | YES |
| 34 | `indicador_edad` | STRING | YES |
| 35 | `indicador_endeudamiento_financiero` | STRING | YES |
| 36 | `indicador_ley_vivienda` | STRING | YES |
| 37 | `edad_minima_datacredito` | INT64 | YES |
| 38 | `edad_maxima_datacredito` | INT64 | YES |
| 39 | `fecha_expedicion_documento` | STRING | YES |
| 40 | `obligaciones_financieras` | FLOAT64 | YES |
| 41 | `bank_id` | INT64 | YES |
| 42 | `bank_all_risk_value` | FLOAT64 | YES |
| 43 | `bank_life_insurance` | FLOAT64 | YES |
| 44 | `bank_max_to_finance` | FLOAT64 | YES |
| 45 | `cuotas_titular` | INT64 | YES |
| 46 | `cuota_minima_disponible` | INT64 | YES |
| 47 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 48 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 49 | `credito_maximo_segun_disponible_COP` | INT64 | YES |
| 50 | `diferencia_credito_maximo_COP` | INT64 | YES |
| 51 | `credito_maximo_segun_disponible_UVR` | INT64 | YES |
| 52 | `diferencia_credito_maximo_UVR` | INT64 | YES |
| 53 | `tasa_COP_15_baja` | FLOAT64 | YES |
| 54 | `MaximoPrestamo_COP_15_baja` | INT64 | YES |
| 55 | `cuota_COP_15_baja` | INT64 | YES |
| 56 | `ingresos_faltantes_COP_15_baja` | INT64 | YES |
| 57 | `ingresos_ideales_COP_15_baja` | INT64 | YES |
| 58 | `porc_capacidad_pago_COP_15_baja` | FLOAT64 | YES |
| 59 | `relacion_cuota_ingresos_COP_15_baja` | FLOAT64 | YES |
| 60 | `total_gastos_COP_15_baja` | INT64 | YES |
| 61 | `tasa_COP_15_mediana` | FLOAT64 | YES |
| 62 | `MaximoPrestamo_COP_15_mediana` | INT64 | YES |
| 63 | `cuota_COP_15_mediana` | INT64 | YES |
| 64 | `ingresos_faltantes_COP_15_mediana` | INT64 | YES |
| 65 | `ingresos_ideales_COP_15_mediana` | INT64 | YES |
| 66 | `porc_capacidad_pago_COP_15_mediana` | FLOAT64 | YES |
| 67 | `relacion_cuota_ingresos_COP_15_mediana` | FLOAT64 | YES |
| 68 | `total_gastos_COP_15_mediana` | INT64 | YES |
| 69 | `tasa_COP_20_baja` | FLOAT64 | YES |
| 70 | `MaximoPrestamo_COP_20_baja` | INT64 | YES |
| 71 | `cuota_COP_20_baja` | INT64 | YES |
| 72 | `ingresos_faltantes_COP_20_baja` | INT64 | YES |
| 73 | `ingresos_ideales_COP_20_baja` | INT64 | YES |
| 74 | `porc_capacidad_pago_COP_20_baja` | FLOAT64 | YES |
| 75 | `relacion_cuota_ingresos_COP_20_baja` | FLOAT64 | YES |
| 76 | `total_gastos_COP_20_baja` | INT64 | YES |
| 77 | `tasa_COP_20_mediana` | FLOAT64 | YES |
| 78 | `MaximoPrestamo_COP_20_mediana` | INT64 | YES |
| 79 | `cuota_COP_20_mediana` | INT64 | YES |
| 80 | `ingresos_faltantes_COP_20_mediana` | INT64 | YES |
| 81 | `ingresos_ideales_COP_20_mediana` | INT64 | YES |
| 82 | `porc_capacidad_pago_COP_20_mediana` | FLOAT64 | YES |
| 83 | `relacion_cuota_ingresos_COP_20_mediana` | FLOAT64 | YES |
| 84 | `total_gastos_COP_20_mediana` | INT64 | YES |
| 85 | `tasa_COP_30_baja` | FLOAT64 | YES |
| 86 | `MaximoPrestamo_COP_30_baja` | INT64 | YES |
| 87 | `cuota_COP_30_baja` | INT64 | YES |
| 88 | `ingresos_faltantes_COP_30_baja` | INT64 | YES |
| 89 | `ingresos_ideales_COP_30_baja` | INT64 | YES |
| 90 | `porc_capacidad_pago_COP_30_baja` | FLOAT64 | YES |
| 91 | `relacion_cuota_ingresos_COP_30_baja` | FLOAT64 | YES |
| 92 | `total_gastos_COP_30_baja` | INT64 | YES |
| 93 | `tasa_COP_30_mediana` | FLOAT64 | YES |
| 94 | `MaximoPrestamo_COP_30_mediana` | INT64 | YES |
| 95 | `cuota_COP_30_mediana` | INT64 | YES |
| 96 | `ingresos_faltantes_COP_30_mediana` | INT64 | YES |
| 97 | `ingresos_ideales_COP_30_mediana` | INT64 | YES |
| 98 | `porc_capacidad_pago_COP_30_mediana` | FLOAT64 | YES |
| 99 | `relacion_cuota_ingresos_COP_30_mediana` | FLOAT64 | YES |
| 100 | `total_gastos_COP_30_mediana` | INT64 | YES |
| 101 | `tasa_UVR_15_baja` | FLOAT64 | YES |
| 102 | `MaximoPrestamo_UVR_15_baja` | INT64 | YES |
| 103 | `cuota_UVR_15_baja` | INT64 | YES |
| 104 | `ingresos_faltantes_UVR_15_baja` | INT64 | YES |
| 105 | `ingresos_ideales_UVR_15_baja` | INT64 | YES |
| 106 | `porc_capacidad_pago_UVR_15_baja` | FLOAT64 | YES |
| 107 | `relacion_cuota_ingresos_UVR_15_baja` | FLOAT64 | YES |
| 108 | `total_gastos_UVR_15_baja` | INT64 | YES |
| 109 | `tasa_UVR_15_mediana` | FLOAT64 | YES |
| 110 | `MaximoPrestamo_UVR_15_mediana` | INT64 | YES |
| 111 | `cuota_UVR_15_mediana` | INT64 | YES |
| 112 | `ingresos_faltantes_UVR_15_mediana` | INT64 | YES |
| 113 | `ingresos_ideales_UVR_15_mediana` | INT64 | YES |
| 114 | `porc_capacidad_pago_UVR_15_mediana` | FLOAT64 | YES |
| 115 | `relacion_cuota_ingresos_UVR_15_mediana` | FLOAT64 | YES |
| 116 | `total_gastos_UVR_15_mediana` | INT64 | YES |
| 117 | `tasa_UVR_20_baja` | FLOAT64 | YES |
| 118 | `MaximoPrestamo_UVR_20_baja` | INT64 | YES |
| 119 | `cuota_UVR_20_baja` | INT64 | YES |
| 120 | `ingresos_faltantes_UVR_20_baja` | INT64 | YES |
| 121 | `ingresos_ideales_UVR_20_baja` | INT64 | YES |
| 122 | `porc_capacidad_pago_UVR_20_baja` | FLOAT64 | YES |
| 123 | `relacion_cuota_ingresos_UVR_20_baja` | FLOAT64 | YES |
| 124 | `total_gastos_UVR_20_baja` | INT64 | YES |
| 125 | `tasa_UVR_20_mediana` | FLOAT64 | YES |
| 126 | `MaximoPrestamo_UVR_20_mediana` | INT64 | YES |
| 127 | `cuota_UVR_20_mediana` | INT64 | YES |
| 128 | `ingresos_faltantes_UVR_20_mediana` | INT64 | YES |
| 129 | `ingresos_ideales_UVR_20_mediana` | INT64 | YES |
| 130 | `porc_capacidad_pago_UVR_20_mediana` | FLOAT64 | YES |
| 131 | `relacion_cuota_ingresos_UVR_20_mediana` | FLOAT64 | YES |
| 132 | `total_gastos_UVR_20_mediana` | INT64 | YES |
| 133 | `tasa_UVR_30_baja` | FLOAT64 | YES |
| 134 | `MaximoPrestamo_UVR_30_baja` | INT64 | YES |
| 135 | `cuota_UVR_30_baja` | INT64 | YES |
| 136 | `ingresos_faltantes_UVR_30_baja` | INT64 | YES |
| 137 | `ingresos_ideales_UVR_30_baja` | INT64 | YES |
| 138 | `porc_capacidad_pago_UVR_30_baja` | FLOAT64 | YES |
| 139 | `relacion_cuota_ingresos_UVR_30_baja` | FLOAT64 | YES |
| 140 | `total_gastos_UVR_30_baja` | INT64 | YES |
| 141 | `tasa_UVR_30_mediana` | FLOAT64 | YES |
| 142 | `MaximoPrestamo_UVR_30_mediana` | INT64 | YES |
| 143 | `cuota_UVR_30_mediana` | INT64 | YES |
| 144 | `ingresos_faltantes_UVR_30_mediana` | INT64 | YES |
| 145 | `ingresos_ideales_UVR_30_mediana` | INT64 | YES |
| 146 | `porc_capacidad_pago_UVR_30_mediana` | FLOAT64 | YES |
| 147 | `relacion_cuota_ingresos_UVR_30_mediana` | FLOAT64 | YES |
| 148 | `total_gastos_UVR_30_mediana` | INT64 | YES |

## `BI.stg_hdc_parsed`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Silver: Staging de HDC. Extracción plana del nodo summary. Granularidad 1:1 estricta para cruce seguro con OBT.
- **SQLX:** `definitions/stg_hdc_parsed.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_hdc` | STRING | YES |
| 2 | `identificacion` | STRING | YES |
| 3 | `fecha_consulta_hdc` | DATETIME | YES |
| 4 | `updated_at_auto` | DATETIME | YES |
| 5 | `creditos_vigentes` | INT64 | YES |
| 6 | `creditos_negativos` | INT64 | YES |
| 7 | `saldo_total` | NUMERIC | YES |
| 8 | `saldo_en_mora` | NUMERIC | YES |
| 9 | `cuota_mensual_total` | NUMERIC | YES |
| 10 | `antiguedad_desde` | DATE | YES |

## `BI.stg_hdc_parsed_age`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Silver: Consolidado de Edad (HDC Nuevo, HDC Viejo y Calculadora V2).
- **SQLX:** `definitions/stg_hdc_parsed_age.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `identificacion` | STRING | YES |
| 2 | `edad_min` | INT64 | YES |
| 3 | `edad_max` | INT64 | YES |
| 4 | `edad_promedio` | FLOAT64 | YES |
| 5 | `fuente_ultimo_dato` | STRING | YES |
| 6 | `fecha_ultima_actualizacion` | DATETIME | YES |

## `BI.stg_leads`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Silver: Staging de Leads. Limpieza, estandarización y casteo de tipos. Fuente principal de datos demográficos y de proyecto.
- **SQLX:** `definitions/stg_leads.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_lead` | STRING | YES |
| 2 | `idFamilyGroup` | INT64 | YES |
| 3 | `idScoreValidity` | STRING | YES |
| 4 | `idHdc` | STRING | YES |
| 5 | `idProject` | STRING | YES |
| 6 | `isMpkLead` | STRING | YES |
| 7 | `createdAt` | DATE | YES |
| 8 | `updated_at_auto` | DATETIME | YES |
| 9 | `propertyDelivery` | DATE | YES |
| 10 | `expeditionDate` | DATE | YES |
| 11 | `followUpDate` | DATE | YES |
| 12 | `identification` | STRING | YES |
| 13 | `identificationType` | STRING | YES |
| 14 | `fullName` | STRING | YES |
| 15 | `createdEmail` | STRING | YES |
| 16 | `email` | STRING | YES |
| 17 | `phone` | STRING | YES |
| 18 | `dependents` | INT64 | YES |
| 19 | `builderKey` | STRING | YES |
| 20 | `constructora` | STRING | YES |
| 21 | `projectName` | STRING | YES |
| 22 | `projectCity` | STRING | YES |
| 23 | `propertyType` | STRING | YES |
| 24 | `projectBankNIT` | STRING | YES |
| 25 | `financeValue` | INT64 | YES |
| 26 | `propertyValue` | INT64 | YES |
| 27 | `preselectaScore` | INT64 | YES |
| 28 | `monthlyQuota` | INT64 | YES |
| 29 | `updatedIncome` | INT64 | YES |
| 30 | `venta_efectiva` | INT64 | YES |
| 31 | `qualification` | STRING | YES |
| 32 | `preselectaDecision` | STRING | YES |
| 33 | `preselectaStatus` | STRING | YES |
| 34 | `sarlaftStatus` | STRING | YES |
| 35 | `identificationStatus` | STRING | YES |
| 36 | `housingLawIndicator` | STRING | YES |
| 37 | `HDCStatus` | STRING | YES |
| 38 | `followUpCounter` | INT64 | YES |
| 39 | `followUpActivated` | INT64 | YES |
| 40 | `is_not_recent` | INT64 | YES |
| 41 | `datetime_act_BI` | DATETIME | YES |

## `BI.stg_profiling_lite`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla de hechos Silver para Profiling Lite. Consolidación de métricas transaccionales y llaves foráneas.
- **SQLX:** `definitions/stg_profiling_lite.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `lead_id` | STRING | YES |
| 2 | `project_id` | INT64 | YES |
| 3 | `user_id` | INT64 | YES |
| 4 | `qualification_id` | STRING | YES |
| 5 | `occupation_id` | STRING | YES |
| 6 | `identification_type_id` | STRING | YES |
| 7 | `score_decision_id` | STRING | YES |
| 8 | `builderkey` | INT64 | YES |
| 9 | `fecha_creacion` | DATETIME | YES |
| 10 | `documento_cliente` | STRING | YES |
| 11 | `nombre_completo` | STRING | YES |
| 12 | `email` | STRING | YES |
| 13 | `telefono` | STRING | YES |
| 14 | `ingresos_declarados` | FLOAT64 | YES |
| 15 | `valor_inmueble` | FLOAT64 | YES |
| 16 | `valor_credito` | FLOAT64 | YES |
| 17 | `cuota_disponible` | FLOAT64 | YES |
| 18 | `cuota_inicial` | FLOAT64 | YES |
| 19 | `max_credito_pesos` | FLOAT64 | YES |
| 20 | `max_credito_uvr` | FLOAT64 | YES |
| 21 | `score_motor` | INT64 | YES |
| 22 | `ingresos_validados` | FLOAT64 | YES |
| 23 | `endeudamiento` | FLOAT64 | YES |
| 24 | `decision_motor_raw` | STRING | YES |
| 25 | `flag_financiero` | BOOL | YES |
| 26 | `flag_motor` | BOOL | YES |

## `BI.tbl_MPK_v2`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla unificada de Motor de Política de Crédito (MPK). Versión incremental optimizada.
- **SQLX:** `definitions/tbl_MPK_v2.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `fecha_ejecucion` | DATETIME | YES |
| 2 | `id_calculadora` | STRING | YES |
| 3 | `id_mpk` | INT64 | YES |
| 4 | `idFamilyGroup` | STRING | YES |
| 5 | `FechaCambio` | DATE | YES |
| 6 | `estado` | STRING | YES |
| 7 | `identificacion` | STRING | YES |
| 8 | `identification_type` | STRING | YES |
| 9 | `score` | FLOAT64 | YES |
| 10 | `ingresos` | NUMERIC | YES |
| 11 | `viabilidad` | STRING | YES |
| 12 | `cuotas_titular` | INT64 | YES |
| 13 | `endeudamiento_financiero` | NUMERIC | YES |
| 14 | `viable_pesos_20` | STRING | YES |
| 15 | `viable_uvr_20` | STRING | YES |
| 16 | `viable_uvr_30` | STRING | YES |
| 17 | `aplica_bbva` | STRING | YES |
| 18 | `aplica_itau` | STRING | YES |
| 19 | `aplica_occidente` | STRING | YES |
| 20 | `aplica_bancolombia` | STRING | YES |
| 21 | `aplica_caja_social` | STRING | YES |
| 22 | `aplica_banco_bogota` | STRING | YES |
| 23 | `aplica_credifamilia` | STRING | YES |
| 24 | `necesita_codeudor` | STRING | YES |
| 25 | `cumple_con_bancos_koggi` | STRING | YES |
| 26 | `banco_constructor_nombre` | STRING | YES |
| 27 | `banco_constructor_nit` | STRING | YES |
| 28 | `causales_banco_constructor` | STRING | YES |
| 29 | `cumple_con_banco_constructor` | STRING | YES |
| 30 | `proyecto` | STRING | YES |
| 31 | `constructora` | STRING | YES |
| 32 | `nombre` | STRING | YES |
| 33 | `id_lead` | INT64 | YES |
| 34 | `document_id` | STRING | YES |
| 35 | `tipo_vivienda` | STRING | YES |
| 36 | `valor_credito` | INT64 | YES |
| 37 | `valor_inmueble` | INT64 | YES |
| 38 | `email` | STRING | YES |
| 39 | `phone` | STRING | YES |
| 40 | `id` | INT64 | YES |
| 41 | `rol` | STRING | YES |
| 42 | `qualification` | STRING | YES |
| 43 | `uid_entity` | STRING | YES |
| 44 | `delivery_at` | DATETIME | YES |
| 45 | `resumen_viabilidad_banco` | STRING | YES |
| 46 | `total_bancos_aplica` | INT64 | YES |
| 47 | `validacion_unidades_vivienda` | STRING | YES |
| 48 | `proyecto_normalizado` | STRING | YES |
| 49 | `causal_no_cumplimiento` | STRING | YES |
| 50 | `causales_banco_constructor_normalizado` | STRING | YES |
| 51 | `causal_banco_constructor_dashboard` | STRING | YES |
| 52 | `viabilidad_general_koggi_dashboard` | STRING | YES |
| 53 | `ultima_actualizacion` | DATETIME | YES |

## `BI.tbl_calculator_master`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla Silver Maestra V10 (SCD Tipo 2) con herencia de Seguridad Looker.
- **SQLX:** `definitions/tbl_calculator_master.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `event_id` | STRING | YES |
| 2 | `document_id` | STRING | YES |
| 3 | `timestamp` | TIMESTAMP | YES |
| 4 | `estado_ciclo_vida` | STRING | YES |
| 5 | `timestamp_registro_calculado` | DATETIME | YES |
| 6 | `id_lead` | INT64 | YES |
| 7 | `identificacion` | INT64 | YES |
| 8 | `proyecto` | STRING | YES |
| 9 | `constructora` | STRING | YES |
| 10 | `ciudad` | STRING | YES |
| 11 | `nombre` | STRING | YES |
| 12 | `idFamilyGroup` | INT64 | YES |
| 13 | `projectBankNIT` | STRING | YES |
| 14 | `ingresos` | INT64 | YES |
| 15 | `score` | INT64 | YES |
| 16 | `valor_credito` | INT64 | YES |
| 17 | `cuotas_titular` | INT64 | YES |
| 18 | `valor_inmueble` | INT64 | YES |
| 19 | `personas_cargo` | INT64 | YES |
| 20 | `gastos_familiares` | INT64 | YES |
| 21 | `diferencia_credito_maximo` | INT64 | YES |
| 22 | `calificacion` | STRING | YES |
| 23 | `koggi_profiling` | STRING | YES |
| 24 | `tipo_vivienda` | STRING | YES |
| 25 | `indicador_ley_vivienda` | STRING | YES |
| 26 | `indicador_causales` | STRING | YES |
| 27 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 28 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 29 | `credito_max_disp_pesos` | INT64 | YES |
| 30 | `credito_max_disp_uvr` | INT64 | YES |
| 31 | `cupo_pesos_20` | INT64 | YES |
| 32 | `cupo_uvr_20` | INT64 | YES |
| 33 | `cupo_uvr_30` | INT64 | YES |
| 34 | `prestamo_maximo_tasa_mediana_15_anios` | INT64 | YES |
| 35 | `prestamo_maximo_tasa_baja_15_anios` | INT64 | YES |
| 36 | `prestamo_maximo_tasa_baja_20_anios` | INT64 | YES |
| 37 | `prestamo_maximo_tasa_mediana_30_anios` | INT64 | YES |
| 38 | `prestamo_maximo_tasa_baja_30_anios` | INT64 | YES |
| 39 | `es_followup_json` | BOOL | YES |
| 40 | `fecha_ultima_actualizacion` | DATETIME | YES |
| 41 | `fecha_registro` | DATE | YES |
| 42 | `uid_looker` | STRING | YES |

## `BI.tbl_calculator_master_v2`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Silver V2 (Unificada). Incluye deduplicación defensiva priorizando V2 Current sobre V1 Legacy.
- **SQLX:** `definitions/tbl_calculator_master_v2.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp` | TIMESTAMP | YES |
| 3 | `data` | STRING | YES |
| 4 | `is_deleted` | BOOL | YES |
| 5 | `version_esquema` | STRING | YES |
| 6 | `tipo_registro_origen` | STRING | YES |
| 7 | `id_lead` | INT64 | YES |
| 8 | `id_proyecto` | INT64 | YES |
| 9 | `idFamilyGroup` | INT64 | YES |
| 10 | `identificacion` | INT64 | YES |
| 11 | `tipo_identificacion` | STRING | YES |
| 12 | `nombre_completo` | STRING | YES |
| 13 | `edad_aproximada` | INT64 | YES |
| 14 | `ocupacion` | STRING | YES |
| 15 | `personas_a_cargo` | INT64 | YES |
| 16 | `ingresos_estimados` | FLOAT64 | YES |
| 17 | `gastos_familiares` | FLOAT64 | YES |
| 18 | `endeudamiento_financiero` | FLOAT64 | YES |
| 19 | `descripcion_endeudamiento_financiero` | STRING | YES |
| 20 | `proyecto` | STRING | YES |
| 21 | `ciudad_proyecto` | STRING | YES |
| 22 | `constructora` | STRING | YES |
| 23 | `project_bank_nit` | STRING | YES |
| 24 | `tipo_vivienda` | STRING | YES |
| 25 | `fecha_entrega_inmueble` | STRING | YES |
| 26 | `valor_inmueble` | INT64 | YES |
| 27 | `valor_credito` | INT64 | YES |
| 28 | `score` | INT64 | YES |
| 29 | `calificacion_sugerida` | STRING | YES |
| 30 | `color_score` | STRING | YES |
| 31 | `decision_score` | STRING | YES |
| 32 | `koggi_profiling` | STRING | YES |
| 33 | `es_followup_origen` | BOOL | YES |
| 34 | `indicador_edad` | STRING | YES |
| 35 | `indicador_endeudamiento_financiero` | STRING | YES |
| 36 | `indicador_ley_vivienda` | STRING | YES |
| 37 | `edad_minima_datacredito` | INT64 | YES |
| 38 | `edad_maxima_datacredito` | INT64 | YES |
| 39 | `fecha_expedicion_documento` | STRING | YES |
| 40 | `obligaciones_financieras` | FLOAT64 | YES |
| 41 | `bank_id` | INT64 | YES |
| 42 | `bank_all_risk_value` | FLOAT64 | YES |
| 43 | `bank_life_insurance` | FLOAT64 | YES |
| 44 | `bank_max_to_finance` | FLOAT64 | YES |
| 45 | `cuotas_titular` | INT64 | YES |
| 46 | `cuota_minima_disponible` | INT64 | YES |
| 47 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 48 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 49 | `credito_maximo_segun_disponible_COP` | INT64 | YES |
| 50 | `diferencia_credito_maximo_COP` | INT64 | YES |
| 51 | `credito_maximo_segun_disponible_UVR` | INT64 | YES |
| 52 | `diferencia_credito_maximo_UVR` | INT64 | YES |
| 53 | `tasa_COP_15_baja` | FLOAT64 | YES |
| 54 | `MaximoPrestamo_COP_15_baja` | INT64 | YES |
| 55 | `cuota_COP_15_baja` | INT64 | YES |
| 56 | `ingresos_faltantes_COP_15_baja` | INT64 | YES |
| 57 | `ingresos_ideales_COP_15_baja` | INT64 | YES |
| 58 | `porc_capacidad_pago_COP_15_baja` | FLOAT64 | YES |
| 59 | `relacion_cuota_ingresos_COP_15_baja` | FLOAT64 | YES |
| 60 | `total_gastos_COP_15_baja` | INT64 | YES |
| 61 | `tasa_COP_15_mediana` | FLOAT64 | YES |
| 62 | `MaximoPrestamo_COP_15_mediana` | INT64 | YES |
| 63 | `cuota_COP_15_mediana` | INT64 | YES |
| 64 | `ingresos_faltantes_COP_15_mediana` | INT64 | YES |
| 65 | `ingresos_ideales_COP_15_mediana` | INT64 | YES |
| 66 | `porc_capacidad_pago_COP_15_mediana` | FLOAT64 | YES |
| 67 | `relacion_cuota_ingresos_COP_15_mediana` | FLOAT64 | YES |
| 68 | `total_gastos_COP_15_mediana` | INT64 | YES |
| 69 | `tasa_COP_20_baja` | FLOAT64 | YES |
| 70 | `MaximoPrestamo_COP_20_baja` | INT64 | YES |
| 71 | `cuota_COP_20_baja` | INT64 | YES |
| 72 | `ingresos_faltantes_COP_20_baja` | INT64 | YES |
| 73 | `ingresos_ideales_COP_20_baja` | INT64 | YES |
| 74 | `porc_capacidad_pago_COP_20_baja` | FLOAT64 | YES |
| 75 | `relacion_cuota_ingresos_COP_20_baja` | FLOAT64 | YES |
| 76 | `total_gastos_COP_20_baja` | INT64 | YES |
| 77 | `tasa_COP_20_mediana` | FLOAT64 | YES |
| 78 | `MaximoPrestamo_COP_20_mediana` | INT64 | YES |
| 79 | `cuota_COP_20_mediana` | INT64 | YES |
| 80 | `ingresos_faltantes_COP_20_mediana` | INT64 | YES |
| 81 | `ingresos_ideales_COP_20_mediana` | INT64 | YES |
| 82 | `porc_capacidad_pago_COP_20_mediana` | FLOAT64 | YES |
| 83 | `relacion_cuota_ingresos_COP_20_mediana` | FLOAT64 | YES |
| 84 | `total_gastos_COP_20_mediana` | INT64 | YES |
| 85 | `tasa_COP_30_baja` | FLOAT64 | YES |
| 86 | `MaximoPrestamo_COP_30_baja` | INT64 | YES |
| 87 | `cuota_COP_30_baja` | INT64 | YES |
| 88 | `ingresos_faltantes_COP_30_baja` | INT64 | YES |
| 89 | `ingresos_ideales_COP_30_baja` | INT64 | YES |
| 90 | `porc_capacidad_pago_COP_30_baja` | FLOAT64 | YES |
| 91 | `relacion_cuota_ingresos_COP_30_baja` | FLOAT64 | YES |
| 92 | `total_gastos_COP_30_baja` | INT64 | YES |
| 93 | `tasa_COP_30_mediana` | FLOAT64 | YES |
| 94 | `MaximoPrestamo_COP_30_mediana` | INT64 | YES |
| 95 | `cuota_COP_30_mediana` | INT64 | YES |
| 96 | `ingresos_faltantes_COP_30_mediana` | INT64 | YES |
| 97 | `ingresos_ideales_COP_30_mediana` | INT64 | YES |
| 98 | `porc_capacidad_pago_COP_30_mediana` | FLOAT64 | YES |
| 99 | `relacion_cuota_ingresos_COP_30_mediana` | FLOAT64 | YES |
| 100 | `total_gastos_COP_30_mediana` | INT64 | YES |
| 101 | `tasa_UVR_15_baja` | FLOAT64 | YES |
| 102 | `MaximoPrestamo_UVR_15_baja` | INT64 | YES |
| 103 | `cuota_UVR_15_baja` | INT64 | YES |
| 104 | `ingresos_faltantes_UVR_15_baja` | INT64 | YES |
| 105 | `ingresos_ideales_UVR_15_baja` | INT64 | YES |
| 106 | `porc_capacidad_pago_UVR_15_baja` | FLOAT64 | YES |
| 107 | `relacion_cuota_ingresos_UVR_15_baja` | FLOAT64 | YES |
| 108 | `total_gastos_UVR_15_baja` | INT64 | YES |
| 109 | `tasa_UVR_15_mediana` | FLOAT64 | YES |
| 110 | `MaximoPrestamo_UVR_15_mediana` | INT64 | YES |
| 111 | `cuota_UVR_15_mediana` | INT64 | YES |
| 112 | `ingresos_faltantes_UVR_15_mediana` | INT64 | YES |
| 113 | `ingresos_ideales_UVR_15_mediana` | INT64 | YES |
| 114 | `porc_capacidad_pago_UVR_15_mediana` | FLOAT64 | YES |
| 115 | `relacion_cuota_ingresos_UVR_15_mediana` | FLOAT64 | YES |
| 116 | `total_gastos_UVR_15_mediana` | INT64 | YES |
| 117 | `tasa_UVR_20_baja` | FLOAT64 | YES |
| 118 | `MaximoPrestamo_UVR_20_baja` | INT64 | YES |
| 119 | `cuota_UVR_20_baja` | INT64 | YES |
| 120 | `ingresos_faltantes_UVR_20_baja` | INT64 | YES |
| 121 | `ingresos_ideales_UVR_20_baja` | INT64 | YES |
| 122 | `porc_capacidad_pago_UVR_20_baja` | FLOAT64 | YES |
| 123 | `relacion_cuota_ingresos_UVR_20_baja` | FLOAT64 | YES |
| 124 | `total_gastos_UVR_20_baja` | INT64 | YES |
| 125 | `tasa_UVR_20_mediana` | FLOAT64 | YES |
| 126 | `MaximoPrestamo_UVR_20_mediana` | INT64 | YES |
| 127 | `cuota_UVR_20_mediana` | INT64 | YES |
| 128 | `ingresos_faltantes_UVR_20_mediana` | INT64 | YES |
| 129 | `ingresos_ideales_UVR_20_mediana` | INT64 | YES |
| 130 | `porc_capacidad_pago_UVR_20_mediana` | FLOAT64 | YES |
| 131 | `relacion_cuota_ingresos_UVR_20_mediana` | FLOAT64 | YES |
| 132 | `total_gastos_UVR_20_mediana` | INT64 | YES |
| 133 | `tasa_UVR_30_baja` | FLOAT64 | YES |
| 134 | `MaximoPrestamo_UVR_30_baja` | INT64 | YES |
| 135 | `cuota_UVR_30_baja` | INT64 | YES |
| 136 | `ingresos_faltantes_UVR_30_baja` | INT64 | YES |
| 137 | `ingresos_ideales_UVR_30_baja` | INT64 | YES |
| 138 | `porc_capacidad_pago_UVR_30_baja` | FLOAT64 | YES |
| 139 | `relacion_cuota_ingresos_UVR_30_baja` | FLOAT64 | YES |
| 140 | `total_gastos_UVR_30_baja` | INT64 | YES |
| 141 | `tasa_UVR_30_mediana` | FLOAT64 | YES |
| 142 | `MaximoPrestamo_UVR_30_mediana` | INT64 | YES |
| 143 | `cuota_UVR_30_mediana` | INT64 | YES |
| 144 | `ingresos_faltantes_UVR_30_mediana` | INT64 | YES |
| 145 | `ingresos_ideales_UVR_30_mediana` | INT64 | YES |
| 146 | `porc_capacidad_pago_UVR_30_mediana` | FLOAT64 | YES |
| 147 | `relacion_cuota_ingresos_UVR_30_mediana` | FLOAT64 | YES |
| 148 | `total_gastos_UVR_30_mediana` | INT64 | YES |
| 149 | `fecha_registro` | DATE | YES |
| 150 | `fecha_ultima_actualizacion` | DATETIME | YES |
| 151 | `uid_looker` | STRING | YES |

## `BI.tbl_contador_unificado`

- **Origen:** Construida por Dataform
- **Descripción:** Consolidado de interacciones analíticas unificando flujos de leads Pro, Lite v1, Lite v2 y seguimientos. Versión Completa con deduplicación diaria.
- **SQLX:** `definitions/gold/tbl_contador_unificado.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `fecha_evento` | DATE | YES |
| 3 | `mes_ano` | DATE | YES |
| 4 | `dia_nombre` | STRING | YES |
| 5 | `identificacion` | INT64 | YES |
| 6 | `constructora` | STRING | YES |
| 7 | `llave` | STRING | YES |
| 8 | `email` | STRING | YES |
| 9 | `preselectastatus` | STRING | YES |
| 10 | `tipo_interaccion` | STRING | YES |
| 11 | `es_followup_flag` | BOOL | YES |
| 12 | `contador_sq_snapshot` | INT64 | YES |
| 13 | `proyecto` | STRING | YES |
| 14 | `ciudad_proyecto` | STRING | YES |
| 15 | `ciudad_homologada` | STRING | YES |
| 16 | `sector` | STRING | YES |
| 17 | `zona` | STRING | YES |
| 18 | `calificacion` | STRING | YES |
| 19 | `ventas_efectivas` | STRING | YES |
| 20 | `nombre_usuario` | STRING | YES |
| 21 | `tipo_usuario` | STRING | YES |
| 22 | `origen_usuario` | STRING | YES |
| 23 | `uid_looker` | STRING | YES |
| 24 | `cantidad_eventos` | INT64 | YES |

## `BI.tbl_family_calculator_master`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla de Hechos (Snapshot Puro) unificada para Family Group (Legacy + Current)
- **SQLX:** `definitions/tbl_family_calculator_master.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `id_lead` | INT64 | YES |
| 3 | `identificacion` | INT64 | YES |
| 4 | `idFamilyGroup` | INT64 | YES |
| 5 | `nombre` | STRING | YES |
| 6 | `constructora` | STRING | YES |
| 7 | `proyecto` | STRING | YES |
| 8 | `tipo_vivienda` | STRING | YES |
| 9 | `ciudad` | STRING | YES |
| 10 | `edad_aproximada` | INT64 | YES |
| 11 | `timestamp` | TIMESTAMP | YES |
| 12 | `ultima_actualizacion` | TIMESTAMP | YES |
| 13 | `fecha_registro_co` | DATETIME | YES |
| 14 | `calificacion` | STRING | YES |
| 15 | `koggi_profiling` | STRING | YES |
| 16 | `indicador_cap_pago` | STRING | YES |
| 17 | `indicador_endeudamiento` | STRING | YES |
| 18 | `indicador_ley_vivienda` | STRING | YES |
| 19 | `valor_inmueble` | INT64 | YES |
| 20 | `valor_credito` | INT64 | YES |
| 21 | `score` | INT64 | YES |
| 22 | `ingresos` | INT64 | YES |
| 23 | `personas_cargo` | INT64 | YES |
| 24 | `cuotas_titular` | INT64 | YES |
| 25 | `gastos_familiares` | INT64 | YES |
| 26 | `credito_max_disp_pesos` | INT64 | YES |
| 27 | `credito_max_disp_uvr` | INT64 | YES |
| 28 | `pres_max_pesos_15_anios` | INT64 | YES |
| 29 | `pres_max_pesos_20_anios` | INT64 | YES |
| 30 | `pres_max_pesos_30_anios` | INT64 | YES |
| 31 | `pres_max_uvr_15_anios` | INT64 | YES |
| 32 | `pres_max_uvr_20_anios` | INT64 | YES |
| 33 | `pres_max_uvr_30_anios` | INT64 | YES |

## `BI.tbl_monitoreo_calculator`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Gold OBT: Monitoreo Histórico Vectorizado con tipado estricto y seguridad Looker
- **SQLX:** `definitions/tbl_monitoreo_calculator.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `uid_looker` | STRING | YES |
| 2 | `id_lead` | INT64 | YES |
| 3 | `identificacion` | INT64 | YES |
| 4 | `valor_inmueble` | INT64 | YES |
| 5 | `proyecto` | STRING | YES |
| 6 | `constructora` | STRING | YES |
| 7 | `nombre` | STRING | YES |
| 8 | `tipo_vivienda` | STRING | YES |
| 9 | `valor_credito` | INT64 | YES |
| 10 | `fecha_registro_reciente` | DATE | YES |
| 11 | `fecha_registro_anterior` | DATE | YES |
| 12 | `calificacion_reciente` | STRING | YES |
| 13 | `calificacion_anterior` | STRING | YES |
| 14 | `koggi_profiling_reciente` | STRING | YES |
| 15 | `koggi_profiling_anterior` | STRING | YES |
| 16 | `indicador_ley_vivienda_reciente` | STRING | YES |
| 17 | `indicador_ley_vivienda_anterior` | STRING | YES |
| 18 | `indicador_causales_reciente` | STRING | YES |
| 19 | `indicador_causales_anterior` | STRING | YES |
| 20 | `score_reciente` | INT64 | YES |
| 21 | `score_anterior` | INT64 | YES |
| 22 | `ingresos_reciente` | INT64 | YES |
| 23 | `ingresos_anterior` | INT64 | YES |
| 24 | `personas_cargo_reciente` | INT64 | YES |
| 25 | `personas_cargo_anterior` | INT64 | YES |
| 26 | `diferencia_credito_maximo_reciente` | INT64 | YES |
| 27 | `diferencia_credito_maximo_anterior` | INT64 | YES |
| 28 | `credito_maximo_segun_disponible_reciente` | INT64 | YES |
| 29 | `credito_maximo_segun_disponible_anterior` | INT64 | YES |
| 30 | `disponible_cuota_segun_ingresos_reciente` | INT64 | YES |
| 31 | `disponible_cuota_segun_ingresos_anterior` | INT64 | YES |
| 32 | `maximo_cuota_ley_vivienda_reciente` | INT64 | YES |
| 33 | `maximo_cuota_ley_vivienda_anterior` | INT64 | YES |
| 34 | `gastos_familiares_reciente` | INT64 | YES |
| 35 | `gastos_familiares_anterior` | INT64 | YES |
| 36 | `cuotas_titular_reciente` | INT64 | YES |
| 37 | `cuotas_titular_anterior` | INT64 | YES |

## `BI.tbl_profiling`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla maestra de perfilamiento. Incluye cálculo de endeudamiento, roles (Titular/Codeudor) y conteo de causales de rechazo.
- **SQLX:** `definitions/tbl_profiling.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `numberConsultBacks` | INT64 | YES |
| 3 | `idMassiveLoad` | INT64 | YES |
| 4 | `idFamilyGroup` | INT64 | YES |
| 5 | `registraduriaStatus` | STRING | YES |
| 6 | `registraduriaReused` | INT64 | YES |
| 7 | `identification` | STRING | YES |
| 8 | `identificationType` | STRING | YES |
| 9 | `birthdate` | DATE | YES |
| 10 | `expeditionDate` | DATETIME | YES |
| 11 | `identificationStatus` | STRING | YES |
| 12 | `email` | STRING | YES |
| 13 | `phone` | STRING | YES |
| 14 | `countryCallingCode` | STRING | YES |
| 15 | `dependents` | INT64 | YES |
| 16 | `fullName` | STRING | YES |
| 17 | `firstName` | STRING | YES |
| 18 | `middleName` | STRING | YES |
| 19 | `lastName` | STRING | YES |
| 20 | `secondLastName` | STRING | YES |
| 21 | `gender` | STRING | YES |
| 22 | `builderKey` | STRING | YES |
| 23 | `idProject` | INT64 | YES |
| 24 | `projectName` | STRING | YES |
| 25 | `projectBankNIT` | STRING | YES |
| 26 | `projectCity` | STRING | YES |
| 27 | `propertyType` | STRING | YES |
| 28 | `propertyDelivery` | DATETIME | YES |
| 29 | `propertyValue` | INT64 | YES |
| 30 | `financeValue` | INT64 | YES |
| 31 | `monthlyQuota` | INT64 | YES |
| 32 | `followUpActivated` | INT64 | YES |
| 33 | `followUpCounter` | INT64 | YES |
| 34 | `followUpDate` | DATETIME | YES |
| 35 | `updatedIncome` | INT64 | YES |
| 36 | `updatedIncomeCounter` | INT64 | YES |
| 37 | `sarlaftStatus` | STRING | YES |
| 38 | `sarlaftReused` | INT64 | YES |
| 39 | `sarlaftRisk` | INT64 | YES |
| 40 | `sarlaftDate` | DATETIME | YES |
| 41 | `preselectaStatus` | STRING | YES |
| 42 | `idScoreValidity` | INT64 | YES |
| 43 | `preselectaScore` | INT64 | YES |
| 44 | `preselectaDecision` | STRING | YES |
| 45 | `preselectaReused` | INT64 | YES |
| 46 | `qualification` | STRING | YES |
| 47 | `housingLawIndicator` | STRING | YES |
| 48 | `HDCStatus` | STRING | YES |
| 49 | `HDCReused` | INT64 | YES |
| 50 | `idHdc` | INT64 | YES |
| 51 | `venta_efectiva` | INT64 | YES |
| 52 | `createdAt` | DATETIME | YES |
| 53 | `createdEmail` | STRING | YES |
| 54 | `followUpMonitoringDate` | DATE | YES |
| 55 | `houseType` | STRING | YES |
| 56 | `etapa` | STRING | YES |
| 57 | `torre` | STRING | YES |
| 58 | `incomeRtaID` | STRING | YES |
| 59 | `constructorIdMpk` | STRING | YES |
| 60 | `propertieDeliveryDateMpk` | DATE | YES |
| 61 | `isApprovedMpk` | INT64 | YES |
| 62 | `currentApprovedCreditBankMpk` | STRING | YES |
| 63 | `isMpkLead` | INT64 | YES |
| 64 | `dateMpk` | DATE | YES |
| 65 | `statusMpk` | STRING | YES |
| 66 | `constructorBankMpk` | STRING | YES |
| 67 | `originPartner` | STRING | YES |
| 68 | `leadUniqueKeyFG` | STRING | YES |
| 69 | `is_not_recent` | INT64 | YES |
| 70 | `updated_at_auto` | DATETIME | YES |
| 71 | `FechaCambio` | DATETIME | YES |
| 72 | `score_date` | DATETIME | YES |
| 73 | `score_date_end` | DATETIME | YES |
| 74 | `original_response` | STRING | YES |
| 75 | `scoring` | INT64 | YES |
| 76 | `fecha_expedicion` | STRING | YES |
| 77 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 78 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 79 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 80 | `document_id` | STRING | YES |
| 81 | `prestamo_maximo_tasa_mediana_15_anios` | INT64 | YES |
| 82 | `prestamo_maximo_tasa_baja_15_anios` | INT64 | YES |
| 83 | `prestamo_maximo_tasa_baja_20_anios` | INT64 | YES |
| 84 | `prestamo_maximo_tasa_mediana_30_anios` | INT64 | YES |
| 85 | `prestamo_maximo_tasa_baja_30_anios` | INT64 | YES |
| 86 | `ACTIVIDAD_ECONOMICA` | STRING | YES |
| 87 | `Rol` | STRING | YES |
| 88 | `score_agrupado` | STRING | YES |
| 89 | `VALOR_INGRESO_FINAL` | FLOAT64 | YES |
| 90 | `CUOTAS_TITULAR` | FLOAT64 | YES |
| 91 | `VALOR_INGRESO_2` | FLOAT64 | YES |
| 92 | `INGRESO_FINAL` | FLOAT64 | YES |
| 93 | `QUANTO3` | FLOAT64 | YES |
| 94 | `INGRESOS_TOTALES_ULTIMO_MES` | FLOAT64 | YES |
| 95 | `ENDEUDAMIENTO` | FLOAT64 | YES |
| 96 | `CAUSAL_1` | STRING | YES |
| 97 | `CAUSAL_2` | STRING | YES |
| 98 | `CAUSAL_3` | STRING | YES |
| 99 | `CAUSAL_4` | STRING | YES |
| 100 | `CAUSAL_5` | STRING | YES |
| 101 | `CAUSAL_6` | STRING | YES |
| 102 | `CAUSAL_7` | STRING | YES |
| 103 | `CAUSAL_8` | STRING | YES |
| 104 | `CAUSAL_9` | STRING | YES |
| 105 | `CAUSAL_10` | STRING | YES |
| 106 | `CAUSAL_11` | STRING | YES |
| 107 | `CAUSAL_12` | STRING | YES |
| 108 | `CAUSAL_13` | STRING | YES |
| 109 | `CAUSAL_14` | STRING | YES |
| 110 | `CAUSAL_15` | STRING | YES |
| 111 | `CAUSAL_16` | STRING | YES |
| 112 | `CAUSAL_17` | STRING | YES |
| 113 | `CAUSAL_18` | STRING | YES |
| 114 | `CAUSAL_19` | STRING | YES |
| 115 | `total_causales` | INT64 | YES |

## `BI_Staging.stg_score_parsed`

- **Origen:** Construida por Dataform
- **Descripción:** Capa Curada de Score. Normaliza financieras, demografía, extrae array de causales, categoriza y calcula endeudamiento.
- **SQLX:** `definitions/stg_score_parsed.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_score` | INT64 | YES |
| 2 | `identificacion` | STRING | YES |
| 3 | `fecha_registro_score` | DATETIME | YES |
| 4 | `fecha_score` | DATE | YES |
| 5 | `fecha_fin_score` | DATE | YES |
| 6 | `scoring` | INT64 | YES |
| 7 | `valor_ingreso_final` | FLOAT64 | YES |
| 8 | `cuotas_titular` | FLOAT64 | YES |
| 9 | `valor_ingreso_2` | FLOAT64 | YES |
| 10 | `ingreso_final` | FLOAT64 | YES |
| 11 | `quanto3` | FLOAT64 | YES |
| 12 | `ingresos_totales_ultimo_mes` | FLOAT64 | YES |
| 13 | `actividad_economica` | STRING | YES |
| 14 | `edad_promedio_estimada` | FLOAT64 | YES |
| 15 | `rango_edad_texto` | STRING | YES |
| 16 | `lista_causales` | ARRAY<STRING> | NO |
| 17 | `updated_at_auto` | DATETIME | YES |
| 18 | `endeudamiento` | FLOAT64 | YES |
| 19 | `causales_concatenadas` | STRING | YES |
| 20 | `total_causales` | INT64 | YES |
| 21 | `categoria_rechazo_principal` | STRING | YES |
| 22 | `flag_capacidad_pago` | BOOL | YES |
| 23 | `flag_score` | BOOL | YES |
| 24 | `flag_mora_general` | BOOL | YES |
| 25 | `flag_sin_experiencia` | BOOL | YES |
| 26 | `fecha_actualizacion_etl` | DATETIME | YES |

## `central_col_stream.tbl_builder_projects`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Metadata de proyectos de vivienda

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `entity_key` | STRING | YES |
| 3 | `entity_id` | INT64 | YES |
| 4 | `name` | STRING | YES |
| 5 | `apartments_number` | INT64 | YES |
| 6 | `zone` | STRING | YES |
| 7 | `sector` | STRING | YES |
| 8 | `dane_city` | STRING | YES |
| 9 | `city` | STRING | YES |
| 10 | `url_ico` | STRING | YES |
| 11 | `status` | STRING | YES |
| 12 | `deleted_at` | DATETIME | YES |
| 13 | `department` | STRING | YES |
| 14 | `barrio` | STRING | YES |
| 15 | `builder_bank` | STRING | YES |
| 16 | `builder_amount` | INT64 | YES |
| 17 | `horizontal_property_url` | STRING | YES |
| 18 | `property_tax_url` | STRING | YES |
| 19 | `sales_permit_url` | STRING | YES |
| 20 | `building_permission_url` | STRING | YES |
| 21 | `chamber_of_commerce_url` | STRING | YES |
| 22 | `total_value` | INT64 | YES |
| 23 | `units` | INT64 | YES |
| 24 | `manager_name` | STRING | YES |
| 25 | `manager_document` | STRING | YES |
| 26 | `manager_correo` | STRING | YES |
| 27 | `manager_phone` | STRING | YES |
| 28 | `stratum` | INT64 | YES |
| 29 | `apartment_value` | INT64 | YES |
| 30 | `bank_list` | STRING | YES |
| 31 | `type_dwelling` | STRING | YES |
| 32 | `house_type` | STRING | YES |
| 33 | `parking` | STRING | YES |
| 34 | `parking_type` | STRING | YES |
| 35 | `delivery_at` | DATETIME | YES |
| 36 | `idProyectoOrigen` | INT64 | YES |
| 37 | `updated_at_auto` | DATETIME | YES |
| 38 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_entity_database`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Base de datos de entidades

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_entity_database` | INT64 | YES |
| 2 | `entity_type` | STRING | YES |
| 3 | `key` | STRING | YES |
| 4 | `connection` | STRING | YES |
| 5 | `id_entity` | INT64 | YES |
| 6 | `nit` | STRING | YES |
| 7 | `codigo_verificacion` | INT64 | YES |
| 8 | `id_actor` | INT64 | YES |
| 9 | `img_profile` | STRING | YES |
| 10 | `ready` | INT64 | YES |
| 11 | `created_at` | DATETIME | YES |
| 12 | `entity_name` | STRING | YES |
| 13 | `enabled` | INT64 | YES |
| 14 | `updated_at_auto` | DATETIME | YES |
| 15 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_groups`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Grupos de usuarios

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `name` | STRING | YES |
| 3 | `entity_key` | STRING | YES |
| 4 | `observation` | STRING | YES |
| 5 | `default` | INT64 | YES |
| 6 | `updated_at` | DATETIME | YES |
| 7 | `created_at` | DATETIME | YES |
| 8 | `updated_at_auto` | DATETIME | YES |
| 9 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_int_identifications_types`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Dimensiones tipos de Identificacion - Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `abbrevition` | STRING | YES |
| 3 | `nationality` | STRING | YES |
| 4 | `name` | STRING | YES |
| 5 | `regex` | STRING | YES |
| 6 | `regexAlternative` | STRING | YES |
| 7 | `active` | INT64 | YES |
| 8 | `createdAt` | DATETIME | YES |
| 9 | `updatedAt` | DATETIME | YES |
| 10 | `updated_at_auto` | DATETIME | YES |
| 11 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_int_occupations`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Dimensiones Ocupaciones - Actividad Economica - Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `name` | STRING | YES |
| 3 | `showIncomeModal` | INT64 | YES |
| 4 | `active` | INT64 | YES |
| 5 | `createdAt` | DATETIME | YES |
| 6 | `updatedAt` | DATETIME | YES |
| 7 | `updated_at_auto` | DATETIME | YES |
| 8 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_int_score_decision`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Dimensiones Score Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `provider` | STRING | YES |
| 3 | `rangeText` | STRING | YES |
| 4 | `minScore` | INT64 | YES |
| 5 | `maxScore` | INT64 | YES |
| 6 | `color` | STRING | YES |
| 7 | `conditionText` | STRING | YES |
| 8 | `decision` | STRING | YES |
| 9 | `originalScoreService` | STRING | YES |
| 10 | `active` | INT64 | YES |
| 11 | `createdAt` | DATETIME | YES |
| 12 | `updatedAt` | DATETIME | YES |
| 13 | `updated_at_auto` | DATETIME | YES |
| 14 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_looker_board`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tablero de Looker

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `uid_entity` | STRING | YES |
| 3 | `entity_id` | INT64 | YES |
| 4 | `dashboard_url` | STRING | YES |
| 5 | `updated_at_auto` | DATETIME | YES |
| 6 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_familiar_groups`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Relación de leads que conforman grupos familiares para solicitudes conjuntas

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `principalIdentification` | INT64 | YES |
| 3 | `principalIdLead` | INT64 | YES |
| 4 | `principalName` | STRING | YES |
| 5 | `cosigner1Identification` | INT64 | YES |
| 6 | `cosigner1IdLead` | INT64 | YES |
| 7 | `cosigner1Name` | STRING | YES |
| 8 | `cosigner2Identification` | INT64 | YES |
| 9 | `cosigner2IdLead` | INT64 | YES |
| 10 | `cosigner2Name` | STRING | YES |
| 11 | `cosigner3Identification` | INT64 | YES |
| 12 | `cosigner3IdLead` | INT64 | YES |
| 13 | `cosigner3Name` | STRING | YES |
| 14 | `cosigner4Identification` | INT64 | YES |
| 15 | `cosigner4IdLead` | INT64 | YES |
| 16 | `cosigner4Name` | STRING | YES |
| 17 | `idProject` | INT64 | YES |
| 18 | `builderKey` | STRING | YES |
| 19 | `createdEmail` | STRING | YES |
| 20 | `createdAt` | DATETIME | YES |
| 21 | `updatedAt` | DATETIME | YES |
| 22 | `updated_at_auto` | DATETIME | YES |
| 23 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_followup_states`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla de parametria cruda que mapea los códigos de estado de seguimiento con sus etiquetas textuales correspondientes.

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `code` | INT64 | YES |
| 2 | `label` | STRING | YES |
| 3 | `description` | STRING | YES |
| 4 | `enabled` | STRING | YES |
| 5 | `updated_at_auto` | DATETIME | YES |
| 6 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_hdc_validity`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Historias de crédito (HDC) validadas para el proceso de perfilamiento

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_hdc` | INT64 | YES |
| 2 | `id_user` | INT64 | YES |
| 3 | `hdc_date` | DATETIME | YES |
| 4 | `hdc_date_end` | DATETIME | YES |
| 5 | `original_response` | STRING | YES |
| 6 | `user_identification_number` | STRING | YES |
| 7 | `expedition_date_from_HDC` | DATE | YES |
| 8 | `current_debts` | STRING | YES |
| 9 | `summary` | STRING | YES |
| 10 | `origin` | STRING | YES |
| 11 | `identificationType` | STRING | YES |
| 12 | `updated_at_auto` | DATETIME | YES |
| 13 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla principal de leads capturados en la plataforma Pro

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `numberConsultBacks` | INT64 | YES |
| 3 | `idMassiveLoad` | INT64 | YES |
| 4 | `idFamilyGroup` | INT64 | YES |
| 5 | `registraduriaStatus` | STRING | YES |
| 6 | `registraduriaReused` | INT64 | YES |
| 7 | `identification` | STRING | YES |
| 8 | `identificationType` | STRING | YES |
| 9 | `birthdate` | DATE | YES |
| 10 | `expeditionDate` | DATETIME | YES |
| 11 | `identificationStatus` | STRING | YES |
| 12 | `email` | STRING | YES |
| 13 | `phone` | STRING | YES |
| 14 | `countryCallingCode` | STRING | YES |
| 15 | `dependents` | INT64 | YES |
| 16 | `fullName` | STRING | YES |
| 17 | `firstName` | STRING | YES |
| 18 | `middleName` | STRING | YES |
| 19 | `lastName` | STRING | YES |
| 20 | `secondLastName` | STRING | YES |
| 21 | `gender` | STRING | YES |
| 22 | `builderKey` | STRING | YES |
| 23 | `idProject` | INT64 | YES |
| 24 | `projectName` | STRING | YES |
| 25 | `projectBankNIT` | STRING | YES |
| 26 | `projectCity` | STRING | YES |
| 27 | `propertyType` | STRING | YES |
| 28 | `propertyDelivery` | DATETIME | YES |
| 29 | `propertyValue` | INT64 | YES |
| 30 | `financeValue` | INT64 | YES |
| 31 | `monthlyQuota` | INT64 | YES |
| 32 | `followUpActivated` | INT64 | YES |
| 33 | `followUpCounter` | INT64 | YES |
| 34 | `followUpDate` | DATETIME | YES |
| 35 | `updatedIncome` | INT64 | YES |
| 36 | `updatedIncomeCounter` | INT64 | YES |
| 37 | `sarlaftStatus` | STRING | YES |
| 38 | `sarlaftReused` | INT64 | YES |
| 39 | `sarlaftRisk` | INT64 | YES |
| 40 | `sarlaftDate` | DATETIME | YES |
| 41 | `preselectaStatus` | STRING | YES |
| 42 | `idScoreValidity` | INT64 | YES |
| 43 | `preselectaScore` | INT64 | YES |
| 44 | `preselectaDecision` | STRING | YES |
| 45 | `preselectaReused` | INT64 | YES |
| 46 | `qualification` | STRING | YES |
| 47 | `housingLawIndicator` | STRING | YES |
| 48 | `HDCStatus` | STRING | YES |
| 49 | `HDCReused` | INT64 | YES |
| 50 | `idHdc` | INT64 | YES |
| 51 | `venta_efectiva` | INT64 | YES |
| 52 | `createdAt` | DATETIME | YES |
| 53 | `createdEmail` | STRING | YES |
| 54 | `followUpMonitoringDate` | DATE | YES |
| 55 | `houseType` | STRING | YES |
| 56 | `etapa` | STRING | YES |
| 57 | `torre` | STRING | YES |
| 58 | `incomeRtaID` | STRING | YES |
| 59 | `constructorIdMpk` | STRING | YES |
| 60 | `propertieDeliveryDateMpk` | DATE | YES |
| 61 | `isApprovedMpk` | INT64 | YES |
| 62 | `currentApprovedCreditBankMpk` | STRING | YES |
| 63 | `isMpkLead` | INT64 | YES |
| 64 | `dateMpk` | DATE | YES |
| 65 | `statusMpk` | STRING | YES |
| 66 | `constructorBankMpk` | STRING | YES |
| 67 | `originPartner` | STRING | YES |
| 68 | `leadUniqueKeyFG` | STRING | YES |
| 69 | `is_not_recent` | INT64 | YES |
| 70 | `updated_at_auto` | DATETIME | YES |
| 71 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads_followup`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla cruda que registra las interacciones y estados de seguimiento (follow-up) de los leads.

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `lead_id` | INT64 | YES |
| 3 | `score_id` | INT64 | YES |
| 4 | `hdc_id` | INT64 | YES |
| 5 | `calculator_id` | STRING | YES |
| 6 | `laft_id` | INT64 | YES |
| 7 | `created_at` | DATETIME | YES |
| 8 | `user_id` | INT64 | YES |
| 9 | `updated_at` | DATETIME | YES |
| 10 | `state` | INT64 | YES |
| 11 | `origin` | STRING | YES |
| 12 | `json_details` | STRING | YES |
| 13 | `updated_at_auto` | DATETIME | YES |
| 14 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads_light`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla de leads simplificados (Lite)

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `numberConsultBacks` | INT64 | YES |
| 3 | `idMassiveLoad` | INT64 | YES |
| 4 | `identification` | STRING | YES |
| 5 | `identificationType` | STRING | YES |
| 6 | `birthdate` | DATE | YES |
| 7 | `expeditionDate` | DATETIME | YES |
| 8 | `identificationStatus` | STRING | YES |
| 9 | `email` | STRING | YES |
| 10 | `phone` | STRING | YES |
| 11 | `countryCallingCode` | STRING | YES |
| 12 | `dependents` | INT64 | YES |
| 13 | `fullName` | STRING | YES |
| 14 | `firstName` | STRING | YES |
| 15 | `middleName` | STRING | YES |
| 16 | `lastName` | STRING | YES |
| 17 | `secondLastName` | STRING | YES |
| 18 | `gender` | STRING | YES |
| 19 | `builderKey` | STRING | YES |
| 20 | `idProject` | INT64 | YES |
| 21 | `projectName` | STRING | YES |
| 22 | `projectCity` | STRING | YES |
| 23 | `projectBankNIT` | STRING | YES |
| 24 | `propertyType` | STRING | YES |
| 25 | `propertyDelivery` | DATETIME | YES |
| 26 | `propertyValue` | INT64 | YES |
| 27 | `financeValue` | INT64 | YES |
| 28 | `monthlyQuota` | INT64 | YES |
| 29 | `updatedIncome` | INT64 | YES |
| 30 | `preselectaStatus` | STRING | YES |
| 31 | `idScoreValidity` | INT64 | YES |
| 32 | `preselectaScore` | INT64 | YES |
| 33 | `preselectaDecision` | STRING | YES |
| 34 | `qualification` | STRING | YES |
| 35 | `housingLawIndicator` | STRING | YES |
| 36 | `createdAt` | DATETIME | YES |
| 37 | `createdEmail` | STRING | YES |
| 38 | `etapa` | STRING | YES |
| 39 | `torre` | STRING | YES |
| 40 | `updated_at_auto` | DATETIME | YES |
| 41 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads_lite`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla Hechos Leads - Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `active` | INT64 | YES |
| 2 | `birthdate` | DATE | YES |
| 3 | `builderId` | INT64 | YES |
| 4 | `createdAt` | DATETIME | YES |
| 5 | `decisionEngineId` | STRING | YES |
| 6 | `email` | STRING | YES |
| 7 | `firstName` | STRING | YES |
| 8 | `id` | STRING | YES |
| 9 | `identification` | STRING | YES |
| 10 | `identificationTypeId` | STRING | YES |
| 11 | `income` | FLOAT64 | YES |
| 12 | `lastName` | STRING | YES |
| 13 | `massiveLoadId` | INT64 | YES |
| 14 | `middleName` | STRING | YES |
| 15 | `occupationId` | STRING | YES |
| 16 | `phoneNumber` | STRING | YES |
| 17 | `phonePrefix` | STRING | YES |
| 18 | `projectId` | INT64 | YES |
| 19 | `qualificationId` | STRING | YES |
| 20 | `restrictiveListId` | STRING | YES |
| 21 | `secondLastName` | STRING | YES |
| 22 | `updated_at_auto` | DATETIME | YES |
| 23 | `updatedAt` | DATETIME | YES |
| 24 | `userId` | INT64 | YES |
| 25 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads_lite_finantial_results`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla Hechos Leads - Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `leadId` | STRING | YES |
| 3 | `availableMonthlyValue` | NUMERIC | YES |
| 4 | `propertyValue` | NUMERIC | YES |
| 5 | `initialPayment` | NUMERIC | YES |
| 6 | `amountToFinance` | NUMERIC | YES |
| 7 | `createdAt` | DATETIME | YES |
| 8 | `maximumCreditAccordingToAvailablePesos` | NUMERIC | YES |
| 9 | `maximumCreditAccordingToAvailableUvr` | NUMERIC | YES |
| 10 | `creditValue` | NUMERIC | YES |
| 11 | `updated_at_auto` | DATETIME | YES |
| 12 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_leads_lite_qualification_rules`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Reglas de Calificación para Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `name` | STRING | YES |
| 3 | `description` | STRING | YES |
| 4 | `img` | STRING | YES |
| 5 | `backgroundColor` | STRING | YES |
| 6 | `borderColor` | STRING | YES |
| 7 | `textColor` | STRING | YES |
| 8 | `active` | INT64 | YES |
| 9 | `createdAt` | DATETIME | YES |
| 10 | `updatedAt` | DATETIME | YES |
| 11 | `minPercentage` | NUMERIC | YES |
| 12 | `maxPercentage` | NUMERIC | YES |
| 13 | `updated_at_auto` | DATETIME | YES |
| 14 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_lite_decision_engine`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Tabla Hechos Ledas - Profiling LITE

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | STRING | YES |
| 2 | `idLead` | STRING | YES |
| 3 | `originalStatus` | STRING | YES |
| 4 | `scoring` | STRING | YES |
| 5 | `scoreDecisionId` | STRING | YES |
| 6 | `provider` | STRING | YES |
| 7 | `income` | STRING | YES |
| 8 | `indebtedness` | STRING | YES |
| 9 | `paymentCapacity` | STRING | YES |
| 10 | `decision` | STRING | YES |
| 11 | `createdAt` | DATETIME | YES |
| 12 | `updatedAt` | DATETIME | YES |
| 13 | `updated_at_auto` | DATETIME | YES |
| 14 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_mpk`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Resultados del motor de política de crédito

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id_mpk` | INT64 | YES |
| 2 | `id_calculadora` | STRING | YES |
| 3 | `response` | STRING | YES |
| 4 | `fecha_ejecucion` | DATETIME | YES |
| 5 | `idFamilyGroup` | INT64 | YES |
| 6 | `IdLead` | INT64 | YES |
| 7 | `createdAt` | DATETIME | YES |
| 8 | `updatedAt` | DATETIME | YES |
| 9 | `status` | STRING | YES |
| 10 | `updated_at_auto` | DATETIME | YES |
| 11 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_sq_score_validity`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Registro de validaciones de score crediticio para perfilamiento

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `id_user` | INT64 | YES |
| 3 | `score_date` | DATETIME | YES |
| 4 | `score_date_end` | DATETIME | YES |
| 5 | `active` | STRING | YES |
| 6 | `scoring` | INT64 | YES |
| 7 | `identification_number` | STRING | YES |
| 8 | `last_name` | STRING | YES |
| 9 | `total_balance` | STRING | YES |
| 10 | `obligation_fee_day` | STRING | YES |
| 11 | `obligation_fee_due` | STRING | YES |
| 12 | `ingresos` | STRING | YES |
| 13 | `endeudamiento` | STRING | YES |
| 14 | `capacidad_pago` | STRING | YES |
| 15 | `decision` | STRING | YES |
| 16 | `causales` | STRING | YES |
| 17 | `cuotas_titular` | STRING | YES |
| 18 | `original_response` | STRING | YES |
| 19 | `origin` | STRING | YES |
| 20 | `updated_at_auto` | DATETIME | YES |
| 21 | `FechaCambio` | DATETIME | YES |

## `central_col_stream.tbl_user`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Usuarios del sistema

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `id` | INT64 | YES |
| 2 | `entity_key` | STRING | YES |
| 3 | `entity_id` | INT64 | YES |
| 4 | `identification` | INT64 | YES |
| 5 | `name` | STRING | YES |
| 6 | `image` | STRING | YES |
| 7 | `email` | STRING | YES |
| 8 | `delete_at` | DATETIME | YES |
| 9 | `active` | INT64 | YES |
| 10 | `created_at` | DATETIME | YES |
| 11 | `phone` | STRING | YES |
| 12 | `ubication` | STRING | YES |
| 13 | `authentication_methods` | STRING | YES |
| 14 | `id_group` | INT64 | YES |
| 15 | `updated_at_auto` | DATETIME | YES |
| 16 | `FechaCambio` | DATETIME | YES |

## `firestore_calculator.Calculator_raw_changelog`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Histórico de cambios (logs) de la calculadora en Firestore

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `timestamp` | TIMESTAMP | NO |
| 2 | `event_id` | STRING | NO |
| 3 | `document_name` | STRING | NO |
| 4 | `operation` | STRING | NO |
| 5 | `data` | STRING | YES |
| 6 | `old_data` | STRING | YES |
| 7 | `document_id` | STRING | YES |

## `firestore_calculator.Calculator_raw_latest`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Datos crudos (JSON) de la calculadora provenientes de Firestore

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_name` | STRING | YES |
| 2 | `document_id` | STRING | YES |
| 3 | `timestamp` | TIMESTAMP | YES |
| 4 | `event_id` | STRING | YES |
| 5 | `operation` | STRING | YES |
| 6 | `data` | STRING | YES |
| 7 | `old_data` | STRING | YES |

## `firestore_calculator.Calculator_table`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla Calculadora Maestra V5.1. Versión TEST Incremental pura (sin RN físico).
- **SQLX:** `definitions/bronze/calculator_table.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp` | TIMESTAMP | YES |
| 3 | `id_unico` | STRING | YES |
| 4 | `id_lead` | INT64 | YES |
| 5 | `identificacion` | INT64 | YES |
| 6 | `valor_inmueble` | INT64 | YES |
| 7 | `calificacion` | STRING | YES |
| 8 | `personas_cargo` | INT64 | YES |
| 9 | `proyecto` | STRING | YES |
| 10 | `constructora` | STRING | YES |
| 11 | `koggi_profiling` | STRING | YES |
| 12 | `score` | INT64 | YES |
| 13 | `idFamilyGroup` | INT64 | YES |
| 14 | `fecha` | STRING | YES |
| 15 | `tipo_vivienda` | STRING | YES |
| 16 | `nombre` | STRING | YES |
| 17 | `diferencia_credito_maximo` | INT64 | YES |
| 18 | `indicador_ley_vivienda` | STRING | YES |
| 19 | `indicador_causales` | STRING | YES |
| 20 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 21 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 22 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 23 | `projectBankNIT` | STRING | YES |
| 24 | `ingresos` | INT64 | YES |
| 25 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 26 | `ciudad` | STRING | YES |
| 27 | `cuotas_titular` | INT64 | YES |
| 28 | `gastos_familiares` | INT64 | YES |
| 29 | `valor_credito` | INT64 | YES |
| 30 | `es_followup_origen` | BOOL | YES |
| 31 | `tipo_registro_origen` | STRING | YES |
| 32 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 33 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 34 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 35 | `prestamo_maximo_tasa_mediana_15_anios` | INT64 | YES |
| 36 | `prestamo_maximo_tasa_baja_15_anios` | INT64 | YES |
| 37 | `prestamo_maximo_tasa_baja_20_anios` | INT64 | YES |
| 38 | `prestamo_maximo_tasa_mediana_30_anios` | INT64 | YES |
| 39 | `prestamo_maximo_tasa_baja_30_anios` | INT64 | YES |
| 40 | `timestamp_registro` | DATETIME | YES |
| 41 | `fecha_registro` | DATE | YES |
| 42 | `mes_registro` | STRING | YES |
| 43 | `ciudad_estandarizada` | STRING | YES |
| 44 | `endeudamiento` | FLOAT64 | YES |
| 45 | `rango_endeudamiento` | STRING | YES |
| 46 | `rango_score` | STRING | YES |
| 47 | `rango_salarios` | STRING | YES |
| 48 | `credito_max_pesos` | FLOAT64 | YES |
| 49 | `rango_credito_max_pesos_15` | STRING | YES |
| 50 | `credito_max_uvr` | FLOAT64 | YES |
| 51 | `rango_credito_max_uvr_15` | STRING | YES |
| 52 | `credito_max_pesos_20` | FLOAT64 | YES |
| 53 | `rango_credito_max_pesos_20` | STRING | YES |
| 54 | `credito_max_uvr_20` | FLOAT64 | YES |
| 55 | `rango_credito_max_uvr_20` | STRING | YES |
| 56 | `credito_max_uvr_30` | FLOAT64 | YES |
| 57 | `rango_credito_max_uvr_30` | STRING | YES |
| 58 | `ultima_actualizacion` | DATETIME | YES |

## `firestore_collections.CalculatorCol`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Nueva Calculadora Proceso BURO LATAM

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `created_at` | TIMESTAMP | YES |
| 3 | `updated_at` | TIMESTAMP | YES |
| 4 | `document_name` | STRING | YES |
| 5 | `data` | STRING | YES |

## `firestore_collections.Calculator_light`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Datos crudos JSON de la calculadora Lite provenientes de Firestore

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `created_at` | TIMESTAMP | YES |
| 3 | `updated_at` | TIMESTAMP | YES |
| 4 | `document_name` | STRING | YES |
| 5 | `data` | STRING | YES |

## `firestore_collections.Calculator_table`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla Calculadora Family Group V1. Versión TEST Incremental con columna de auditoría.
- **SQLX:** `definitions/firestore_collections_Calculator_table.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `timestamp_registro` | DATETIME | YES |
| 2 | `document_id` | STRING | YES |
| 3 | `timestamp` | TIMESTAMP | YES |
| 4 | `id_unico` | STRING | YES |
| 5 | `id_lead` | INT64 | YES |
| 6 | `valor_inmueble` | INT64 | YES |
| 7 | `calificacion` | STRING | YES |
| 8 | `personas_cargo` | INT64 | YES |
| 9 | `proyecto` | STRING | YES |
| 10 | `constructora` | STRING | YES |
| 11 | `koggi_profiling` | STRING | YES |
| 12 | `score` | INT64 | YES |
| 13 | `identificacion` | INT64 | YES |
| 14 | `idFamilyGroup` | INT64 | YES |
| 15 | `fecha` | STRING | YES |
| 16 | `tipo_vivienda` | STRING | YES |
| 17 | `nombre` | STRING | YES |
| 18 | `diferencia_credito_maximo` | INT64 | YES |
| 19 | `indicador_ley_vivienda` | STRING | YES |
| 20 | `indicador_causales` | STRING | YES |
| 21 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 22 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 23 | `disponible_cuota_segun_ingresos` | INT64 | YES |
| 24 | `projectBankNIT` | STRING | YES |
| 25 | `ingresos` | INT64 | YES |
| 26 | `maximo_cuota_ley_vivienda` | INT64 | YES |
| 27 | `ciudad` | STRING | YES |
| 28 | `cuotas_titular` | INT64 | YES |
| 29 | `gastos_familiares` | INT64 | YES |
| 30 | `valor_credito` | INT64 | YES |
| 31 | `es_followup_origen` | BOOL | YES |
| 32 | `tipo_registro_origen` | STRING | YES |
| 33 | `valor_credito_pesos_20_anios` | INT64 | YES |
| 34 | `valor_credito_uvr_20_anios` | INT64 | YES |
| 35 | `valor_credito_uvr_30_anios` | INT64 | YES |
| 36 | `prestamo_maximo_tasa_mediana_15_anios` | INT64 | YES |
| 37 | `prestamo_maximo_tasa_baja_15_anios` | INT64 | YES |
| 38 | `prestamo_maximo_tasa_baja_20_anios` | INT64 | YES |
| 39 | `prestamo_maximo_tasa_mediana_30_anios` | INT64 | YES |
| 40 | `prestamo_maximo_tasa_baja_30_anios` | INT64 | YES |
| 41 | `fecha_registro` | DATE | YES |
| 42 | `mes_registro` | STRING | YES |
| 43 | `ciudad_estandarizada` | STRING | YES |
| 44 | `endeudamiento` | FLOAT64 | YES |
| 45 | `rango_endeudamiento` | STRING | YES |
| 46 | `rango_score` | STRING | YES |
| 47 | `rango_salarios` | STRING | YES |
| 48 | `credito_max_pesos` | FLOAT64 | YES |
| 49 | `rango_credito_max_pesos_15` | STRING | YES |
| 50 | `credito_max_uvr` | FLOAT64 | YES |
| 51 | `rango_credito_max_uvr_15` | STRING | YES |
| 52 | `credito_max_pesos_20` | FLOAT64 | YES |
| 53 | `rango_credito_max_pesos_20` | STRING | YES |
| 54 | `credito_max_uvr_20` | FLOAT64 | YES |
| 55 | `rango_credito_max_uvr_20` | STRING | YES |
| 56 | `credito_max_uvr_30` | FLOAT64 | YES |
| 57 | `rango_credito_max_uvr_30` | STRING | YES |
| 58 | `ultima_actualizacion` | DATETIME | YES |

## `firestore_collections.FamilyGroupCalculator`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Datos crudos JSON de la calculadora de grupos familiares

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `created_at` | TIMESTAMP | YES |
| 3 | `updated_at` | TIMESTAMP | YES |
| 4 | `document_name` | STRING | YES |
| 5 | `data` | STRING | YES |

## `firestore_collections.FamilyGroupCalculatorCol`

- **Origen:** Fuente declarada (externa)
- **Descripción:** Datos crudos JSON de la nueva calculadora familiar

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `created_at` | TIMESTAMP | YES |
| 3 | `updated_at` | TIMESTAMP | YES |
| 4 | `document_name` | STRING | YES |
| 5 | `data` | STRING | YES |

## `firestore_collections.calculator_table_lite`

- **Origen:** Construida por Dataform
- **Descripción:** Tabla Maestra Profiling Lite. Simulaciones rápidas y causales aplanadas.
- **SQLX:** `definitions/bronze/Calculator_table_lite.sqlx`

| # | Columna | Tipo | Nullable |
|---|---|---|---|
| 1 | `document_id` | STRING | YES |
| 2 | `timestamp_registro` | DATETIME | YES |
| 3 | `id_lead` | INT64 | YES |
| 4 | `id_unico` | STRING | YES |
| 5 | `identificacion` | INT64 | YES |
| 6 | `constructora` | STRING | YES |
| 7 | `proyecto` | STRING | YES |
| 8 | `ingresos` | INT64 | YES |
| 9 | `score` | INT64 | YES |
| 10 | `calificacion` | STRING | YES |
| 11 | `indicador_ley_vivienda` | STRING | YES |
| 12 | `endeudamiento_financiero` | STRING | YES |
| 13 | `tasa_pesos_15_mediana` | FLOAT64 | YES |
| 14 | `tasa_uvr_20_mediana` | FLOAT64 | YES |
| 15 | `cuotas_titular` | INT64 | YES |
| 16 | `relacion_cuota_ingreso_preselecta` | FLOAT64 | YES |
| 17 | `relacion_cuota_ingreso` | FLOAT64 | YES |
| 18 | `credito_maximo_segun_disponible_pesos` | INT64 | YES |
| 19 | `credito_maximo_segun_disponible_uvr` | INT64 | YES |
| 20 | `ciudad_estandarizada` | STRING | YES |
| 21 | `motivos_rechazo_concatenados` | STRING | YES |
| 22 | `fecha_actualizacion` | DATETIME | YES |
