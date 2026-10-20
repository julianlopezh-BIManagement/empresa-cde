# CDE / EDT Visualizador 3D

Proyecto de gestión documental y estructura de trabajo (EDT) con visualización 3D, mapa mental, explorador de archivos y panel de seguimiento para un entorno de coordinación BIM / CDE.

## Descripción

Este repositorio contiene una aplicación web estática y un backend local para gestionar documentos, organizarlos por proyecto y visualizarlos con una vista jerárquica y tridimensional de la estructura EDT.

Incluye:

- Navegador de archivos tipo CDE
- Visualización 3D de estructura organizacional / EDT
- Vista 2D jerárquica
- Soporte para archivos IFC, Excel, PDF y documentos de proyecto
- Exportación de matrices y estructura EDT a Excel
- Integración con proxy local de Google Drive
- Interfaz para visualización de documentos y mapas mentales

## Estructura del proyecto

```text
.
├── app.js
├── index.html
├── mindmap.html
├── mindmap.css
├── mindmap.js
├── package.json
├── server.js
├── server.ps1
├── styles.css
├── .gitignore
├── README.md
├── bim/
│   ├── Modelo_Estructural_SP_2026.ifc
│   └── Puente_Estructural_Superficie.ifc
├── Gdrive_Proxy/
│   ├── metadata.json
│   └── GE_SPI_0001/
│       └── SPI_2026_001/
│           ├── 1T/
│           ├── 2C/
│           ├── 3P/
│           └── 4A/
└── 00_Plan/
    └── documentos y archivos de planeación
```

## Requisitos

- Node.js 18+
- Navegador moderno
- Git para control de versiones

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/julianlopezh-BIManagement/empresa-cde.git
cd empresa-cde
```

2. Instala dependencias:

```bash
npm install
```

3. Inicia el servidor local:

```bash
npm start
```

4. Abre en el navegador:

```text
http://localhost:3000
```

## Uso

- Abre la aplicación principal desde `index.html` o iníciala por el servidor local.
- Usa la vista 3D para navegar por la estructura de trabajo del proyecto.
- Explora documentos y archivos del CDE desde el panel lateral.
- Importa información desde Excel para generar o actualizar una EDT.
- Exporta la estructura a Excel para clientes, gerencia o coordinación.

## Backend local

El proyecto cuenta con un backend basado en Node.js/Express para servir archivos y simular un entorno CDE con proxy de documentos.

Para levantarlo:

```bash
node server.js
```

## Consideraciones

- Este repositorio está pensado como un entorno de trabajo local y prototipo de gestión documental.
- Algunos archivos de ejemplo y metadata están incluidos para visualizar el comportamiento del sistema.
- El proyecto puede adaptarse a otros contratos o estructuras corporativas.

## Licencia

Este proyecto se entrega como repositorio de trabajo interno / prototipo de coordinación BIM y CDE. Ajusta la licencia según el uso final que requieras.

## Contacto

Proyecto desarrollado para coordinación de gestión documental, EDT y visualización BIM.
