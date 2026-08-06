# Manual: Clonar y compilar el Data Warehouse de Koggi con Dataform en Cloud Shell

Este manual documenta el proceso para clonar el repositorio del Data Warehouse, instalar el CLI de Dataform y compilar el grafo del proyecto usando Google Cloud Shell.

## Requisitos previos

- Acceso a **Google Cloud Shell** con el proyecto `davinci-onegroup-prod` configurado.
- Un **usuario de GitHub** con permisos sobre el repositorio `koggi-bi-data/koggi-data-warehouse`.
- Un **Personal Access Token (PAT)** de GitHub, ya que GitHub no admite autenticación por contraseña para operaciones Git.

> ⚠️ **Importante sobre el token**: el token de GitHub utilizado como contraseña en el `git clone` **no debe escribirse a mano ni guardarse en texto plano**. Debe extraerse del **secreto configurado en Dataform** (Secret Manager) asociado a la conexión del repositorio, y pegarse únicamente en el prompt interactivo de la terminal cuando se solicite.

## Pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/koggi-bi-data/koggi-data-warehouse.git
```

Cuando se solicite, ingresar:
- **Username**: el usuario de GitHub (ej. `bikoggialex`)
- **Password**: el **token** obtenido del secreto de Dataform (no la contraseña de la cuenta)

### 2. Entrar al directorio del proyecto

```bash
cd koggi-data-warehouse
```

### 3. Instalar el CLI de Dataform y dependencias

```bash
npm install -g @dataform/cli
npm i
```

### 4. Verificar la versión instalada

```bash
dataform --version
```

### 5. Compilar el grafo del proyecto en formato JSON

```bash
dataform compile --json > compiled_graph.json
```

Este comando genera el archivo `compiled_graph.json`, que contiene la definición completa del grafo de tablas, dependencias y consultas SQL del proyecto Dataform.

### 6. Inspeccionar el resultado

```bash
cat compiled_graph.json | head -50
```

Esto muestra las primeras líneas del JSON compilado, incluyendo definiciones de tablas como `calculator_table_lite`, sus consultas SQL, particionamiento, clustering y dependencias.

## Notas

- El proyecto usa `workflow_settings.yaml`, por lo que **no es necesario** ejecutar `dataform install`; las dependencias se instalan en tiempo de ejecución.
- El archivo `compiled_graph.json` se genera en el directorio raíz del proyecto (`koggi-data-warehouse/`), por lo que debe referenciarse como `compiled_graph.json` (sin repetir el nombre del directorio) si ya se está posicionado dentro de él.