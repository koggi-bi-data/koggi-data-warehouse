// Archivo utils.js el cual tiene la funcion de limpieza y estandarizado para ciudades.

function cleanCity(column) {
  return `
    CASE 
      /* 1. Manejo de Nulos */
      WHEN ${column} IS NULL OR LOWER(CAST(${column} AS STRING)) = 'null' THEN NULL
      
      ELSE 
        (
          SELECT 
            CASE 
              /* Diccionario de mapeo sobre el texto sin espacios ni acentos */
              WHEN REGEXP_REPLACE(norm, r"[^A-Z]", "") IN ('BOGOTADC', 'BOGOTAD C') THEN 'BOGOTA'
              WHEN REGEXP_REPLACE(norm, r"[^A-Z]", "") = 'SANJOSEDECUCUTA' THEN 'CUCUTA'
              WHEN REGEXP_REPLACE(norm, r"[^A-Z]", "") = 'CARTAGENADEINDIAS' THEN 'CARTAGENA'
              
              /* Limpieza general para el resto */
              ELSE TRIM(REGEXP_REPLACE(REGEXP_REPLACE(norm, r"[^A-Z\\s]", " "), r"\\s+", " "))
            END
          FROM (
            SELECT REGEXP_REPLACE(NORMALIZE(UPPER(TRIM(${column})), NFD), r"\\pM", "") AS norm
          )
        )
    END`;
}

module.exports = { cleanCity };