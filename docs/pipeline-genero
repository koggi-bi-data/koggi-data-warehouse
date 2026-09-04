# Pipeline: dimensión de género por `identification`

> Fuente: `dim_genero_iterativo.ipynb`. **Este proceso corre fuera de Dataform** (notebook Python/Colab con `google-cloud-bigquery`), así que no aparece en `compiled_graph.json` ni tiene assertions automáticas — ver `hallazgos-y-pendientes.md #6`.

## Qué hace

Infiere el género de cada lead a partir de su nombre, con una arquitectura de dos tablas para no tener que revisar manualmente las ~152.000 filas de leads sino solo los nombres únicos sin resolver:

| Tabla (según el notebook) | Grano | Rol |
|---|---|---|
| `BI.dim_genero_nombres` | 1 fila por nombre único | Diccionario que acumula conocimiento entre corridas |
| `BI.dim_persona_genero` | 1 fila por `identification` única | Dimensión final que consumen los reportes |

> ⚠️ Ver `hallazgos-y-pendientes.md #1` — ninguno de estos dos nombres coincide con `BI.dim_nombres_genero`, que es la tabla que sí está declarada en Dataform y que consume `profiling_dashboard_quick_win_v2`. Pendiente de confirmar la relación real entre las tres.

## Cómo funciona el ciclo iterativo

1. Se ejecuta todo el notebook (**Entorno de ejecución → Ejecutar todo**). No hay pasos que activar manualmente, excepto el paso 10.
2. El proceso normaliza texto (sin tildes, mayúsculas, filtra basura/partículas de apellido), calcula un diccionario de nombres con género inferido (librería `gender-guesser` + aprendizaje de sufijos con umbrales de soporte mínimo y pureza), y lo persiste en BigQuery — no en un diccionario hardcodeado en el código.
3. Exporta un CSV con los nombres pendientes de mayor impacto (los que afectan a más personas).
4. Un humano revisa y corrige ese CSV.
5. Se sube el CSV revisado (única celda interactiva del notebook, sección 10) y se vuelve a ejecutar todo.
6. La cobertura sube en cada corrida y nunca se pierde, porque el diccionario vive en BigQuery.

## Parámetros clave (ajustables en la celda de configuración)

| Parámetro | Valor actual | Efecto |
|---|---|---|
| `SUFIJO_SOPORTE_MIN` | 3 | Mínimo de nombres etiquetados para aceptar un patrón de sufijo |
| `SUFIJO_PUREZA_MIN` | 0.90 | % del sufijo que debe apuntar al mismo género para aceptarlo |
| `SUFIJO_LARGO_MAX` | 5 | Longitud máxima del sufijo considerado |
| `ACEPTAR_CONFIANZA_MEDIA` | `True` | Si `True`, entran a la dimensión final las inferencias por sufijo (~91% precisión); si `False`, solo alta confianza y el resto queda pendiente |

## Tabla fuente

`central_col_stream.tbl_sq_leads` (misma fuente declarada que usan `dim_ciudades`, `fact_leads_atribucion` y `stg_leads` en Dataform — ver `arquitectura-y-linaje.md`).

## Requisito de ejecución

Autenticación **antes** de cualquier llamada a BigQuery (`google.colab.auth` dentro de Colab, o Application Default Credentials fuera de Colab vía `gcloud auth application-default login`). El notebook incluye una prueba de humo (`SELECT 1`) que fuerza el error de credenciales en la celda 0 en vez de varias celdas más abajo.
