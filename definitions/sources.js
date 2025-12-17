// Declaración de fuentes (Sources)
// Esto conecta Dataform con las tablas existentes en Bigquery

// 1. Base de Leads y Perfilamiento
declare({
    database: "davinci-onegroup-prod",
    schema: "BI",
    name: "tbl_profiling",
    description: "Tabla de base de leads y perfilamiento construida anteriormente por BI"
});

// 2. Calculadora (Simulaciones)
declare({
  database: "davinci-onegroup-prod",
  schema: "firestore_calculator",
  name: "Calculator_table",
  description: "Resultados del motor de cálculo"
});

// 3. Usuarios (Asesores)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col",
  name: "tbl_user",
  description: "Usuarios del sistema"
});

// 4. Grupos (Roles)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col",
  name: "tbl_groups",
  description: "Grupos de usuarios"
});

// 5. Entidades (Constructoras)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col",
  name: "tbl_entity_database",
  description: "Base de datos de entidades"
});

// 6. Looker Board (Tablero)
declare({
  database: "davinci-onegroup-prod",
  schema: "central_col",
  name: "tbl_looker_board",
  description: "Tablero de Looker"
});

// 7. Edad Calculada
declare({
  database: "davinci-onegroup-prod",
  schema: "BI",
  name: "stg_hdc_parsed_age",
  description: "Tabla auxiliar con edad calculada"
});
