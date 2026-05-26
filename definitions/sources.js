// Declaración de fuentes (Sources)
// Esto conecta Dataform con las tablas existentes en Bigquery

// 1. Base de Leads y Perfilamiento
// declare({
//     database: "davinci-onegroup-prod",
//     schema: "BI",
//     name: "tbl_profiling",
//     description: "Tabla de base de leads y perfilamiento construida anteriormente por BI"
// });

// 2. Calculadora (Simulaciones)
// declare({
//   database: "davinci-onegroup-prod",
//   schema: "firestore_calculator",
//   name: "Calculator_table",
//   description: "Resultados del motor de cálculo"
// });

// 3. Usuarios (Asesores)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_user",
  description: "Usuarios del sistema"
});

// 4. Grupos (Roles)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_groups",
  description: "Grupos de usuarios"
});

// 5. Entidades (Constructoras)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_entity_database",
  description: "Base de datos de entidades"
});

// 6. Looker Board (Tablero)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_looker_board",
  description: "Tablero de Looker"
});

// 7. Edad Calculada
// declare({
//   database: "davinci-onegroup-prod",
//   schema: "BI",
//   name: "stg_hdc_parsed_age",
//   description: "Tabla auxiliar con edad calculada"
// });

// 8. Base Leads Pro
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_leads",
  description: "Tabla principal de leads capturados en la plataforma Pro"
});

// 9. Validación Score Profiling Pro
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_score_validity",
  description: "Registro de validaciones de score crediticio para perfilamiento"
});

// 10. Tabla HDC Profiling Pro
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_hdc_validity",
  description: "Historias de crédito (HDC) validadas para el proceso de perfilamiento"
});

// 11. Tabla Grupos Familiares
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_familiar_groups",
  description: "Relación de leads que conforman grupos familiares para solicitudes conjuntas"
});

// 12. Fuente de datos crudos de la calculadora
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_calculator",
  name: "Calculator_raw_latest",
  description: "Datos crudos (JSON) de la calculadora provenientes de Firestore"
});

// 13. Tabla de Motor de Política (MPK)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_mpk",
  description: "Resultados del motor de política de crédito"
});

// 14. Proyectos de Constructoras
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_builder_projects",
  description: "Metadata de proyectos de vivienda"
});

// 15. Fuente cruda de Calculadora Familiar
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_collections",
  name: "FamilyGroupCalculator",
  description: "Datos crudos JSON de la calculadora de grupos familiares"
});

// 16. Leads Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_leads_light",
  description: "Tabla de leads simplificados (Lite)"
});

// 17. Changelog de la Calculadora (Crudo para auditoría de cambios)
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_calculator",
  name: "Calculator_raw_changelog",
  description: "Histórico de cambios (logs) de la calculadora en Firestore"
});

// 18. Fuente cruda de Calculadora Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_collections",
  name: "Calculator_light",
  description: "Datos crudos JSON de la calculadora Lite provenientes de Firestore"
});

// 19. Usuarios (Asesores)
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_collections",
  name: "CalculatorCol",
  description: "Nueva Calculadora Proceso BURO LATAM"
});

// 20. Nueva Coleccion Familiar
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_collections",
  name: "FamilyGroupCalculatorCol",
  description: "Datos crudos JSON de la nueva calculadora familiar"
});

// 21. Usuarios (Asesores)
declare({
  database: "davinci-onegroup-prod",
  schema: "BI",
  name: "dim_smlv",
  description: "Usuarios del sistema"
});

// 22. Usuarios (Asesores)
declare({
  database: "davinci-onegroup-prod",
  schema: "BI",
  name: "dim_nombres_genero",
  description: "Usuarios del sistema"
});

// 23. Parametros Score
declare({
  database: "davinci-onegroup-prod",
  schema: "BI",
  name: "dim_parametros_score",
  description: "Usuarios del sistema"
});

// 24. Reglas Calificacion
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_leads_lite_qualification_rules",
  description: "Reglas de Calificación para Profiling LITE"
});

// 25. Score Decision Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_int_score_decision",
  description: "Dimensiones Score Profiling LITE"
});

// 26. Dimensiones Ocupación Actividad Economica
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_int_occupations",
  description: "Dimensiones Ocupaciones - Actividad Economica - Profiling LITE"
});

// 27. Dimensiones Tipo de Identificación
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_int_identifications_types",
  description: "Dimensiones tipos de Identificacion - Profiling LITE"
});

// 28. Tabla Hechos de Leads Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_leads_lite",
  description: "Tabla Hechos Leads - Profiling LITE"
});

// 29. Resultados Financieros de Profiling Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_leads_lite_finantial_results",
  description: "Tabla Hechos Leads - Profiling LITE"
});
  
// 30. Motor de Decisiones de Profiling Lite
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col_stream",
  name: "tbl_sq_lite_decision_engine",
  description: "Tabla Hechos Ledas - Profiling LITE"
});

// --- NUEVO ENTORNO: STREAM (SHADOW TEST) ---

// declare({
//   database: "davinci-onegroup-prod",
//   schema: "central_col_stream",
//   name: "tbl_sq_leads",
//   description: "Tabla de leads replicada vía stream (Shadow Test de validación contra central_col)"
// });