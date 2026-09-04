# Mapeo de tableros Looker Studio (Koggi) → tabla fuente

> Fuente: `Directorio_Dashboards_Analitica.xlsx`, hoja *Looker Koggi*. Última actualización: 14 de agosto de 2026.

| # | Tablero | Uso | Conexión | Tabla / fuente | Link |
|---|---|---|---|---|---|
| 1 | DB - Follow Up | Clientes (Koggi) | Bigquery | `davinci-onegroup-prod.BI.fact_leads_followup` | [General](https://datastudio.google.com/s/hq3p0_imCr4) |
| 2 | DB Interno - Follow Up | Interno | Bigquery | `davinci-onegroup-prod.BI.fact_leads_followup` | [General](https://datastudio.google.com/s/mmO-pL06dWw) |
| 3 | DB Koggi - Follow Up - Cusezar | Clientes (Koggi) | Sheets | `https://docs.google.com/spreadsheets/d/1awrjakKKmWm6Ev1sml0K_2_Xbtx0S_frUu1621lpB4w/edit?usp=sharing` | [General](https://datastudio.google.com/s/h3uPy1xLWJE) |
| 4 | Db Profiling Interno Koggi | Interno | Bigquery | `davinci-onegroup-prod.BI.profiling_dashboard_quick_win_v2` | [General](https://datastudio.google.com/s/hsXJwxEnu8M) |
| 5 | Db Profiling Pro | Clientes (Koggi) | Bigquery | `davinci-onegroup-prod.BI.profiling_dashboard_quick_win_v2` | [General](https://datastudio.google.com/s/kpYfeU2aluQ) |
| 6 | Db Profiling Lite | Clientes (Koggi) | Bigquery | `davinci-onegroup-prod.BI.fact_lite_reporte` | [General](https://datastudio.google.com/s/tm_MqlRmsq8) |
| 7 | Db Profiling Lite - Interno | Interno | Bigquery | `davinci-onegroup-prod.BI.fact_lite_reporte` | [General](https://datastudio.google.com/s/gIx71yl3Mjo) |
| 8 | Reporte Usabilidad | Clientes (Koggi) | SQL Usabilidad -> Pendiente Migración | `⚠️ *Pendiente de migración — sin tabla BigQuery aún*` | [General](https://datastudio.google.com/s/vgKOPDUXJuQ) |
| 9 | Reporte Usabilidad Interno | Interno | SQL Usabilidad -> Pendiente Migración | `⚠️ *Pendiente de migración — sin tabla BigQuery aún*` | [General](https://datastudio.google.com/s/vgKOPDUXJuQ) |
| 10 | Tablero Control | Interno | Bigquery | `davinci-onegroup-prod.BI.tbl_contador_unificado` | [Uso Productos](https://datastudio.google.com/s/pdvBqRUQrdk) |
| 11 | Tablero Control | Interno | SQL Control Contratos > Pendiente Migración | `⚠️ *Pendiente de migración — sin tabla BigQuery aún*` | [Analisis CS](https://datastudio.google.com/s/pdvBqRUQrdk) |
| 12 | Tablero MPK | Clientes (Koggi) | Bigquery | `davinci-onegroup-prod.BI.tbl_MPK_v2` | [General](https://datastudio.google.com/s/gRRfV4e4DMU) |
| 13 | Tablero MPK Interno | Interno | Bigquery | `davinci-onegroup-prod.BI.tbl_MPK_v2` | [General](https://datastudio.google.com/s/tQ9Hnvvhl2s) |

## Cómo usar esta tabla

Cuando alguien pregunte *"¿de dónde saca los datos el tablero X?"*, la respuesta está acá. Para el detalle de columnas de cada tabla fuente, ir a `diccionario-datos.md`; para saber cómo se construye esa tabla (SQL y dependencias), ir a `arquitectura-y-linaje.md`.

**Nota:** esta hoja del directorio solo cubre tableros "Koggi" (13). El directorio general (`Directorio`, 44 tableros: Profiling/KC, FP&A, Dirección, BI, Operaciones) no trae tabla fuente explícita — si se necesita ese nivel de detalle para esos otros tableros, hay que revisarlos uno por uno con quien los mantiene.
