// Servidor Local CDE Empresa - Gdrive Proxy
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS y JSON parsing
app.use(cors());
app.use(express.json());

// Directorios de GDrive Proxy
const PROXY_DIR = 'G:/Mi unidad/CDE _PRUEBA';
const CONTRACT_DIR = path.join(PROXY_DIR, 'GE_SPI_0001', 'SPI_2026_001');
const STATES = ['1T', '2C', '3P', '4A'];

// Ruta al archivo de metadatos
const METADATA_FILE = path.join(PROXY_DIR, 'metadata.json');

// Multer configurado en memoria temporal para re-guardar los archivos con su nombre final en la ruta final
const upload = multer({ storage: multer.memoryStorage() });

// Semilla de archivos iniciales
const seedFiles = [
  {
    id: 'f1',
    projectId: 'GE_SPI_0001',
    phase: 'F8',
    division: 'LZ001',
    location: 'CP001',
    specialty: 'CIV',
    docType: 'PLA',
    consecutivo: '0001',
    description: 'DISENO_REJA',
    version: 1,
    state: '1T',
    originalName: 'plano_rejas_v1_borrador.dwg',
    extension: 'dwg',
    uploadDate: new Date().toISOString(),
    sizeBytes: 15420
  },
  {
    id: 'f2',
    projectId: 'GE_SPI_0001',
    phase: 'F8',
    division: 'LZ001',
    location: 'CM001',
    specialty: 'MEC',
    docType: 'MAN',
    consecutivo: '0001',
    description: 'MANUAL_TURBINA_H1',
    version: 1,
    state: '2C',
    originalName: 'L1_turbine_manual_draft.pdf',
    extension: 'pdf',
    uploadDate: new Date().toISOString(),
    sizeBytes: 42104
  },
  {
    id: 'f3',
    projectId: 'GE_SPI_0001',
    phase: 'F8',
    division: 'LZ002',
    location: 'UG201',
    specialty: 'ELE',
    docType: 'PLA',
    consecutivo: '0001',
    description: 'DIAGRAMA_UNIFILAR',
    version: 2,
    state: '3P',
    originalName: 'L2-UG2-elec-unifilar-v2.pdf',
    extension: 'pdf',
    uploadDate: new Date().toISOString(),
    sizeBytes: 12504
  },
  {
    id: 'f4',
    projectId: 'GE_SPI_0001',
    phase: 'F8',
    division: 'LZ001',
    location: 'TC001',
    specialty: 'CIV',
    docType: 'PLA',
    consecutivo: '0001',
    description: 'EXCAVACION_TANQUE',
    version: 1,
    state: '4A',
    originalName: 'tanque_carga_excav_old.dwg',
    extension: 'dwg',
    uploadDate: new Date().toISOString(),
    sizeBytes: 18902
  }
];

// Garantizar la existencia de un directorio
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Cargar metadatos desde JSON
function readMetadata() {
  if (!fs.existsSync(METADATA_FILE)) {
    return {};
  }
  try {
    const data = fs.readFileSync(METADATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error al leer metadata.json, reiniciando:", err);
    return {};
  }
}

// Guardar metadatos en JSON
function writeMetadata(metadata) {
  try {
    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2), 'utf8');
  } catch (err) {
    console.error("Error al escribir metadata.json:", err);
  }
}

// Inicializar base de datos y árbol de directorios físicos
function initializeWorkspace() {
  console.log("Inicializando árbol de directorios CDE _PRUEBA...");
  ensureDirSync(PROXY_DIR);
  
  // Crear las carpetas de estado Nivel 3 en el disco
  STATES.forEach(state => {
    const statePath = path.join(CONTRACT_DIR, state);
    ensureDirSync(statePath);
  });
  
  // Cargar o inicializar metadata
  let metadata = readMetadata();
  const hasMetadata = Object.keys(metadata).length > 0;
  
  if (!hasMetadata) {
    console.log("Creando archivos semilla iniciales físicos...");
    metadata = {};
    seedFiles.forEach(file => {
      const cdeName = `${file.projectId}_${file.phase}_${file.division}_${file.location}_${file.specialty}_${file.docType}_${file.consecutivo}.${file.extension}`;
      const stateFolder = path.join(CONTRACT_DIR, file.state);
      const filePath = path.join(stateFolder, cdeName);
      
      // Escribir archivo semilla físico
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `Archivo CDE Empresa - Luzma. Original: ${file.originalName}`, 'utf8');
      }
      
      // Registrar metadata
      metadata[file.id] = file;
    });
    writeMetadata(metadata);
  } else {
    // Si hay metadatos registrados, verificar que los archivos físicos existan en disco.
    // Si no existen (por ejemplo, porque el usuario limpió las carpetas pero no el JSON), se vuelven a escribir
    Object.values(metadata).forEach(file => {
      const cdeName = `${file.projectId}_${file.phase}_${file.division}_${file.location}_${file.specialty}_${file.docType}_${file.consecutivo}.${file.extension}`;
      const filePath = path.join(CONTRACT_DIR, file.state, cdeName);
      if (!fs.existsSync(filePath)) {
        ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, `Archivo CDE Empresa - Luzma. Original: ${file.originalName}`, 'utf8');
      }
    });
  }
  console.log("Workspace inicializado con éxito.");
}

// --- APIS ---

// 1. Obtener lista de todos los archivos físicos sincronizados con sus metadatos
app.get('/api/files', (e, res) => {
  const metadata = readMetadata();
  const activeFiles = [];
  
  // Escanear físicamente los directorios 1T, 2C, 3P, 4A para asegurar sincronización 1:1 con el disco
  STATES.forEach(state => {
    const stateFolder = path.join(CONTRACT_DIR, state);
    if (!fs.existsSync(stateFolder)) return;
    
    const files = fs.readdirSync(stateFolder);
    files.forEach(fileName => {
      // Buscar coincidencia en metadatos por la ruta del archivo física
      // Para encontrarlo, buscaremos un registro que coincida con el nombre y estado
      const fileRecord = Object.values(metadata).find(f => {
        const expectedName = `${f.projectId}_${f.phase}_${f.division}_${f.location}_${f.specialty}_${f.docType}_${f.consecutivo}.${f.extension}`;
        return expectedName === fileName && f.state === state;
      });
      
      if (fileRecord) {
        activeFiles.push(fileRecord);
      } else {
        // Archivo huérfano (creado en la carpeta directamente). Intentamos parsear para no romper
        const parts = fileName.split('.');
        const nameWithoutExt = parts[0];
        const ext = parts.pop();
        const codeFields = nameWithoutExt.split('_');
        
        if (codeFields.length >= 7) {
          const orphanRecord = {
            id: 'orphan_' + Date.now() + Math.random(),
            projectId: codeFields.slice(0, 3).join('_'), // GE_SPI_0001
            phase: codeFields[3], // F8
            division: codeFields[4],
            location: codeFields[5],
            specialty: codeFields[6],
            docType: codeFields[7],
            consecutivo: codeFields[8] || '0001',
            description: 'MIGRADO_CDE',
            version: 1,
            state: state,
            originalName: fileName,
            extension: ext,
            uploadDate: new Date().toISOString(),
            sizeBytes: 1024
          };
          // Agregar a metadata dinámicamente
          metadata[orphanRecord.id] = orphanRecord;
          writeMetadata(metadata);
          activeFiles.push(orphanRecord);
        }
      }
    });
  });
  
  res.json(activeFiles);
});

// 2. Cargar físicamente un archivo en la ruta correspondiente
app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No se ha proporcionado ningún archivo.' });
  }

  const {
    projectId,
    phase,
    division,
    location,
    specialty,
    docType,
    consecutivo,
    description,
    version,
    state
  } = req.body;

  if (!division || !location || !specialty || !docType || !consecutivo || !description || !state) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para configurar el archivo.' });
  }

  // Nombre de archivo CDE
  const originalName = file.originalname;
  const ext = originalName.split('.').pop().toLowerCase();
  const cdeBaseName = `${projectId}_${phase}_${division}_${location}_${specialty}_${docType}_${consecutivo}`;
  const cdeFileName = `${cdeBaseName}.${ext}`;

  // Ruta física final
  const stateFolder = path.join(CONTRACT_DIR, state);
  ensureDirSync(stateFolder);
  const finalFilePath = path.join(stateFolder, cdeFileName);

  // Escribir el buffer del archivo en la ruta física de Gdrive_Proxy
  try {
    fs.writeFileSync(finalFilePath, file.buffer);
    
    // Guardar metadatos en JSON
    const metadata = readMetadata();
    const newId = 'f_' + Date.now();
    const newRecord = {
      id: newId,
      projectId,
      phase,
      division,
      location,
      specialty,
      docType,
      consecutivo,
      description: description.toUpperCase().replace(/\s+/g, '_'),
      version: parseInt(version, 10) || 1,
      state,
      originalName,
      extension: ext,
      uploadDate: new Date().toISOString(),
      sizeBytes: file.size
    };

    // Si ya existe un registro idéntico en el CDE con la misma firma y versión, lo sobreescribimos
    // De lo contrario, lo añadimos
    metadata[newId] = newRecord;
    writeMetadata(metadata);

    console.log(`[CDE] Archivo copiado físicamente a CDE _PRUEBA: ${cdeFileName} en la carpeta ${state}`);
    res.json({ success: true, file: newRecord });
  } catch (err) {
    console.error("Error al escribir el archivo:", err);
    res.status(500).json({ error: 'Error interno del servidor al escribir el archivo en el proxy.' });
  }
});

// 3. Descargar archivo concatenando metadatos en el nombre al vuelo
app.get('/api/download/:id', (req, res) => {
  const id = req.params.id;
  const metadata = readMetadata();
  const fileRecord = metadata[id];

  if (!fileRecord) {
    return res.status(404).json({ error: 'Archivo no encontrado en los metadatos.' });
  }

  const cdeBaseName = `${fileRecord.projectId}_${fileRecord.phase}_${fileRecord.division}_${fileRecord.location}_${fileRecord.specialty}_${fileRecord.docType}_${fileRecord.consecutivo}`;
  const cdeFileName = `${cdeBaseName}.${fileRecord.extension}`;
  const physicalPath = path.join(CONTRACT_DIR, fileRecord.state, cdeFileName);

  if (!fs.existsSync(physicalPath)) {
    return res.status(404).json({ error: 'El archivo físico no existe en la carpeta CDE _PRUEBA.' });
  }

  // Nombre formateado de descarga: [BaseName]_[Description]_V[Version].[ext]
  const downloadName = `${cdeBaseName}_${fileRecord.description}_V${fileRecord.version}.${fileRecord.extension}`;

  console.log(`[CDE] Exportando archivo físico: ${cdeFileName} -> Descarga: ${downloadName}`);
  
  res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  
  const fileStream = fs.createReadStream(physicalPath);
  fileStream.pipe(res);
});

// 4. Eliminar físicamente un archivo
app.delete('/api/files/:id', (req, res) => {
  const id = req.params.id;
  const metadata = readMetadata();
  const fileRecord = metadata[id];

  if (!fileRecord) {
    return res.status(404).json({ error: 'Archivo no encontrado en los metadatos.' });
  }

  const cdeFileName = `${fileRecord.projectId}_${fileRecord.phase}_${fileRecord.division}_${fileRecord.location}_${fileRecord.specialty}_${fileRecord.docType}_${fileRecord.consecutivo}.${fileRecord.extension}`;
  const physicalPath = path.join(CONTRACT_DIR, fileRecord.state, cdeFileName);

  // Borrar de disco
  if (fs.existsSync(physicalPath)) {
    try {
      fs.unlinkSync(physicalPath);
      console.log(`[CDE] Archivo físico eliminado de CDE _PRUEBA: ${cdeFileName}`);
    } catch (err) {
      console.error("Error al borrar archivo físico:", err);
      return res.status(500).json({ error: 'No se pudo eliminar el archivo físico del disco.' });
    }
  }

  // Borrar de metadatos
  delete metadata[id];
  writeMetadata(metadata);
  res.json({ success: true });
});

// 5. Reiniciar a valores por defecto (Borrar todo el disco físico y restablecer la semilla)
app.post('/api/reset', (req, res) => {
  try {
    console.log("[CDE] Petición de reinicio recibida. Limpiando directorios...");
    
    // Eliminar carpeta de metadatos si existe
    if (fs.existsSync(METADATA_FILE)) {
      fs.unlinkSync(METADATA_FILE);
    }
    
    // Eliminar contenido de carpetas físicas
    STATES.forEach(state => {
      const statePath = path.join(CONTRACT_DIR, state);
      if (fs.existsSync(statePath)) {
        const files = fs.readdirSync(statePath);
        files.forEach(f => fs.unlinkSync(path.join(statePath, f)));
      }
    });
    
    // Reinicializar
    initializeWorkspace();
    res.json({ success: true });
  } catch (err) {
    console.error("Error al reiniciar workspace:", err);
    res.status(500).json({ error: 'Error al reiniciar la base de datos física del proxy.' });
  }
});

// Servir frontend de forma estática
app.use(express.static(__dirname));

// Arrancar e inicializar
app.listen(PORT, () => {
  initializeWorkspace();
  console.log(`Servidor CDE Empresa corriendo en: http://localhost:${PORT}`);
});
