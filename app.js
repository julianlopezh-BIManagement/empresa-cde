// 3D Mind Mapping CDE
// Lógica de Negocio y Controladores de Interfaz - Integración Backend Gdrive_Proxy

// Base de datos local (Sincronizada con el backend)
let appState = {
  activeFolder: '1T', // Carpeta seleccionada por defecto (Nivel 3)
  files: [],
  selectedFileForUpload: null
};

// Datos maestros de localización por división (Nivel 4 condicionado)
const locationData = {
  'LZ001': [
    { code: 'CP001', name: 'Captación (CP001)' },
    { code: 'TC001', name: 'Tanque de Carga (TC001)' },
    { code: 'CD001', name: 'Conducción Luzma 1 (CD001)' },
    { code: 'CM001', name: 'Casa de Máquinas Luzma 1 (CM001)' },
    { code: 'SE001', name: 'Subestación Luzma 1 (SE001)' },
    { code: 'UG101', name: 'Unidades Generación Luzma 1 (UG101)' }
  ],
  'LZ002': [
    { code: 'CP001', name: 'Captación (CP001)' },
    { code: 'TC001', name: 'Tanque de Carga (TC001)' },
    { code: 'CD002', name: 'Conducción Luzma 2 (CD002)' },
    { code: 'CM002', name: 'Casa de Máquinas Luzma 2 (CM002)' },
    { code: 'SE002', name: 'Subestación Luzma 2 (SE002)' },
    { code: 'UG201', name: 'Unidades Generación Luzma 2 (UG201)' }
  ]
};

// Nombres descriptivos para los códigos
const codeNames = {
  // Divisiones
  'LZ001': 'Luzma 1',
  'LZ002': 'Luzma 2',
  // Localizaciones
  'CP001': 'Captación',
  'TC001': 'Tanque de carga',
  'CD001': 'Conducción L1',
  'CD002': 'Conducción L2',
  'CM001': 'Casa de máquinas L1',
  'CM002': 'Casa de máquinas L2',
  'SE001': 'Subestación L1',
  'SE002': 'Subestación L2',
  'UG101': 'Unidades Gen L1',
  'UG201': 'Unidades Gen L2',
  // Especialidades
  'MEC': 'Mecánica',
  'CIV': 'Civiles',
  'ELE': 'Eléctrica',
  'AMB': 'Ambiental',
  // Tipos
  'MAN': 'Manual',
  'PLA': 'Plano',
  'M3D': 'Modelo 3D',
  // Carpetas / Estados
  '1T': 'Trabajo en progreso',
  '2C': 'Compartido',
  '3P': 'Publicado',
  '4A': 'Archivado'
};

// Elementos del DOM
const elements = {
  // Navegación
  folderNavButtons: document.querySelectorAll('.folder-nav-btn'),
  activeBreadcrumb: document.querySelector('.path-breadcrumbs'),
  activeFolderTitle: document.getElementById('activeFolderTitle'),
  btnCleanStorage: document.getElementById('btnCleanStorage'),
  
  // Archivos
  emptyState: document.getElementById('emptyState'),
  filesContainer: document.getElementById('filesContainer'),
  filesTableBody: document.getElementById('filesTableBody'),
  
  // GDrive Status
  storageBarFill: document.getElementById('storageBarFill'),
  storageUsedText: document.getElementById('storageUsedText'),
  
  // Formulario
  namingForm: document.getElementById('namingForm'),
  folderTabs: document.getElementById('folderTabs'),
  divisionSelect: document.getElementById('divisionSelect'),
  locationSelect: document.getElementById('locationSelect'),
  locationStatusLabel: document.getElementById('locationStatusLabel'),
  locationGuidanceTip: document.getElementById('locationGuidanceTip'),
  specialtySelect: document.getElementById('specialtySelect'),
  docTypeSelect: document.getElementById('docTypeSelect'),
  consecutivoInput: document.getElementById('consecutivoInput'),
  descInput: document.getElementById('descInput'),
  descCharCount: document.getElementById('descCharCount'),
  
  // Sandbox Previews
  cdeNamePreview: document.getElementById('cdeNamePreview'),
  downloadNamePreview: document.getElementById('downloadNamePreview'),
  previewLengthBadge: document.getElementById('previewLengthBadge'),
  
  // Upload Area
  dropArea: document.getElementById('dropArea'),
  realFileInput: document.getElementById('realFileInput'),
  uploaderText: document.getElementById('uploaderText'),
  btnUpload: document.getElementById('btnUpload'),
  
  // Modal de Detalle
  detailModal: document.getElementById('detailModal'),
  btnModalClose: document.getElementById('btnModalClose'),
  btnModalClose2: document.getElementById('btnModalClose2'),
  btnModalDownload: document.getElementById('btnModalDownload'),
  mdState: document.getElementById('mdState'),
  mdCdeName: document.getElementById('mdCdeName'),
  mdDivision: document.getElementById('mdDivision'),
  mdLocation: document.getElementById('mdLocation'),
  mdSpecialty: document.getElementById('mdSpecialty'),
  mdDocType: document.getElementById('mdDocType'),
  mdConsecutivo: document.getElementById('mdConsecutivo'),
  mdDesc: document.getElementById('mdDesc'),
  mdVersion: document.getElementById('mdVersion'),
  mdDownloadName: document.getElementById('mdDownloadName'),
  mdDate: document.getElementById('mdDate'),
  
  // General Nodes to bind event effects
  rootFolderNode: document.getElementById('rootFolderNode'),
  contractFolderNode: document.getElementById('contractFolderNode'),
  rootChildren: document.getElementById('rootChildren'),
  contractChildren: document.getElementById('contractChildren')
};

// URL Base de la API (Apunta al puerto del servidor local por defecto si se abre mediante file://)
const API_BASE = (window.location.origin && window.location.origin.startsWith('http')) 
  ? window.location.origin 
  : 'http://localhost:3000';

// --- INICIALIZACIÓN ---
async function init() {
  // Cargar estado inicial desde el servidor backend físico
  await fetchFilesFromServer();
  
  // Vincular eventos de UI
  setupEventHandlers();
  
  // Renderizar la interfaz
  renderFolder(appState.activeFolder);
  updateStorageMetrics();
}

// Obtiene los datos de archivos reales desde el backend en Gdrive_Proxy
async function fetchFilesFromServer() {
  try {
    const response = await fetch(`${API_BASE}/api/files`);
    if (!response.ok) throw new Error('Error al consultar archivos del proxy backend');
    appState.files = await response.json();
  } catch (err) {
    console.error('Error al contactar con el backend local:', err);
    // Mostrar un error discreto o fallback de desarrollo
  }
}

function saveStateToStorage() {
  // Ahora manejado físicamente en disco a través del servidor. 
  // No requiere guardar nada en localStorage.
}

// --- CONTROLADORES DE EVENTOS ---
function setupEventHandlers() {
  // Evitar duplicar binds si init se corre múltiples veces
  // Navegación de carpetas (Sidebar)
  elements.folderNavButtons.forEach(button => {
    // Limpiar listener anterior clonando el nodo o simplemente sobreescribiendo
    const newBtn = button.cloneNode(true);
    button.parentNode.replaceChild(newBtn, button);
    
    newBtn.addEventListener('click', (e) => {
      const targetState = newBtn.getAttribute('data-state');
      setActiveStateFolder(targetState);
    });
  });
  
  // Actualizar las referencias de los botones después del clonado
  elements.folderNavButtons = document.querySelectorAll('.folder-nav-btn');
  
  // Reset de base de datos física (Servidor)
  const newBtnClean = elements.btnCleanStorage.cloneNode(true);
  elements.btnCleanStorage.parentNode.replaceChild(newBtnClean, elements.btnCleanStorage);
  elements.btnCleanStorage = newBtnClean;
  elements.btnCleanStorage.addEventListener('click', async () => {
    if (confirm('¿Estás seguro de reiniciar la carpeta CDE _PRUEBA? Se borrarán todos los archivos físicos y se recrearán las muestras.')) {
      try {
        const response = await fetch(`${API_BASE}/api/reset`, { method: 'POST' });
        if (response.ok) {
          appState.activeFolder = '1T';
          await fetchFilesFromServer();
          renderFolder(appState.activeFolder);
          updateStorageMetrics();
          alert('¡CDE _PRUEBA y metadatos restablecidos con éxito!');
        } else {
          alert('Error al reiniciar el proxy.');
        }
      } catch (err) {
        console.error(err);
        alert('Error de red al intentar reiniciar.');
      }
    }
  });

  // Contraer/Expandir árbol de carpetas
  const newRootFolderNode = elements.rootFolderNode.cloneNode(true);
  elements.rootFolderNode.parentNode.replaceChild(newRootFolderNode, elements.rootFolderNode);
  elements.rootFolderNode = newRootFolderNode;
  
  const newContractFolderNode = elements.contractFolderNode.cloneNode(true);
  elements.contractFolderNode.parentNode.replaceChild(newContractFolderNode, elements.contractFolderNode);
  elements.contractFolderNode = newContractFolderNode;
  
  // Re-vincular elementos de árbol clonados
  elements.rootChildren = document.getElementById('rootChildren');
  elements.contractChildren = document.getElementById('contractChildren');

  elements.rootFolderNode.addEventListener('click', () => {
    elements.rootChildren.classList.toggle('expanded');
    setActiveStateFolder('N1');
  });
  elements.contractFolderNode.addEventListener('click', (e) => {
    e.stopPropagation();
    elements.contractChildren.classList.toggle('expanded');
    setActiveStateFolder('N2');
  });
  
  // Navegación mediante tabs en el formulario (Paso 1)
  const tabs = elements.folderTabs.querySelectorAll('.folder-tab');
  tabs.forEach(tab => {
    // Clonar tab para evitar duplicaciones de click listeners
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    newTab.addEventListener('click', () => {
      const activeTabs = elements.folderTabs.querySelectorAll('.folder-tab');
      activeTabs.forEach(t => t.classList.remove('active'));
      newTab.classList.add('active');
      const targetState = newTab.getAttribute('data-state');
      setActiveStateFolder(targetState);
      updateConsecutiveAndPreview();
    });
  });
  
  // Selector de División desencadena Localizaciones (Paso 2)
  const newDivSelect = elements.divisionSelect.cloneNode(true);
  elements.divisionSelect.parentNode.replaceChild(newDivSelect, elements.divisionSelect);
  elements.divisionSelect = newDivSelect;
  elements.divisionSelect.addEventListener('change', () => {
    const division = elements.divisionSelect.value;
    populateLocations(division);
    updateConsecutiveAndPreview();
  });
  
  // Re-vincular y actualizar selectores dependientes
  const newLocSelect = elements.locationSelect.cloneNode(true);
  elements.locationSelect.parentNode.replaceChild(newLocSelect, elements.locationSelect);
  elements.locationSelect = newLocSelect;
  elements.locationSelect.addEventListener('change', updateConsecutiveAndPreview);

  const newSpecSelect = elements.specialtySelect.cloneNode(true);
  elements.specialtySelect.parentNode.replaceChild(newSpecSelect, elements.specialtySelect);
  elements.specialtySelect = newSpecSelect;
  elements.specialtySelect.addEventListener('change', updateConsecutiveAndPreview);

  const newDocSelect = elements.docTypeSelect.cloneNode(true);
  elements.docTypeSelect.parentNode.replaceChild(newDocSelect, elements.docTypeSelect);
  elements.docTypeSelect = newDocSelect;
  elements.docTypeSelect.addEventListener('change', updateConsecutiveAndPreview);
  
  // Entrada de Descripción: Sanitizar en tiempo real (Paso 3)
  const newDescInput = elements.descInput.cloneNode(true);
  elements.descInput.parentNode.replaceChild(newDescInput, elements.descInput);
  elements.descInput = newDescInput;
  elements.descInput.addEventListener('input', (e) => {
    let rawVal = e.target.value;
    rawVal = rawVal.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_\-]/g, '');
    e.target.value = rawVal;
    elements.descCharCount.textContent = `${rawVal.length}/20`;
    updateNamingPreview();
    validateFormCompletion();
  });
  
  // Drag & Drop
  const newDropArea = elements.dropArea.cloneNode(true);
  elements.dropArea.parentNode.replaceChild(newDropArea, elements.dropArea);
  elements.dropArea = newDropArea;
  elements.dropArea.addEventListener('click', () => {
    elements.realFileInput.click();
  });
  
  const newRealFileInput = elements.realFileInput.cloneNode(true);
  elements.realFileInput.parentNode.replaceChild(newRealFileInput, elements.realFileInput);
  elements.realFileInput = newRealFileInput;
  elements.realFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleSelectedFile(e.target.files[0]);
    }
  });
  
  elements.dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.dropArea.classList.add('dragover');
  });
  
  elements.dropArea.addEventListener('dragleave', () => {
    elements.dropArea.classList.remove('dragover');
  });
  
  elements.dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.dropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleSelectedFile(e.dataTransfer.files[0]);
    }
  });
  
  // Botón de Carga
  const newBtnUpload = elements.btnUpload.cloneNode(true);
  elements.btnUpload.parentNode.replaceChild(newBtnUpload, elements.btnUpload);
  elements.btnUpload = newBtnUpload;
  elements.btnUpload.addEventListener('click', executeUpload);
  
  // Controladores del Modal de Detalle
  const newBtnClose1 = elements.btnModalClose.cloneNode(true);
  elements.btnModalClose.parentNode.replaceChild(newBtnClose1, elements.btnModalClose);
  elements.btnModalClose = newBtnClose1;
  elements.btnModalClose.addEventListener('click', closeModal);

  const newBtnClose2 = elements.btnModalClose2.cloneNode(true);
  elements.btnModalClose2.parentNode.replaceChild(newBtnClose2, elements.btnModalClose2);
  elements.btnModalClose2 = newBtnClose2;
  elements.btnModalClose2.addEventListener('click', closeModal);

  const newBtnModDown = elements.btnModalDownload.cloneNode(true);
  elements.btnModalDownload.parentNode.replaceChild(newBtnModDown, elements.btnModalDownload);
  elements.btnModalDownload = newBtnModDown;
  elements.btnModalDownload.addEventListener('click', () => {
    const fileId = elements.btnModalDownload.getAttribute('data-file-id');
    downloadFile(fileId);
    closeModal();
  });
  
  // Cerrar modal haciendo click afuera
  elements.detailModal.addEventListener('click', (e) => {
    if (e.target === elements.detailModal) {
      closeModal();
    }
  });
}

// --- NAVEGACIÓN Y RENDERIZADO DE CARPETAS ---
function setActiveStateFolder(state) {
  appState.activeFolder = state;
  
  // Actualizar menú activo en Sidebar
  elements.folderNavButtons.forEach(btn => {
    if (btn.getAttribute('data-state') === state) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Actualizar clases activas en los nodos padre del árbol
  if (state === 'N1') {
    elements.rootFolderNode.classList.add('active');
    elements.contractFolderNode.classList.remove('active');
  } else if (state === 'N2') {
    elements.rootFolderNode.classList.remove('active');
    elements.contractFolderNode.classList.add('active');
  } else {
    elements.rootFolderNode.classList.remove('active');
    elements.contractFolderNode.classList.remove('active');
  }
  
  // Sincronizar los tabs del formulario con la carpeta activa por comodidad
  const tabs = elements.folderTabs.querySelectorAll('.folder-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-state') === state) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  renderFolder(state);
  updateConsecutiveAndPreview();
}
window.setActiveStateFolder = setActiveStateFolder;

function renderFolder(state) {
  const folderNameMap = {
    'N1': 'GE_SPI_0001',
    'N2': 'GE_SPI_0001/SPI_2026_001',
    '1T': '1T_Trabajo_Progreso',
    '2C': '2C_Compartido',
    '3P': '3P_Publicado',
    '4A': '4A_Archivado'
  };
  
  // Renderizar Breadcrumbs y Título
  if (state === 'N1') {
    elements.activeBreadcrumb.innerHTML = `<span class="breadcrumb-item active">GE_SPI_0001</span>`;
    elements.activeFolderTitle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      Proyecto (GE_SPI_0001)
    `;
  } else if (state === 'N2') {
    elements.activeBreadcrumb.innerHTML = `
      <span class="breadcrumb-item clickable-breadcrumb" onclick="setActiveStateFolder('N1')">GE_SPI_0001</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">SPI_2026_001</span>
    `;
    elements.activeFolderTitle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      Contrato (SPI_2026_001)
    `;
  } else {
    elements.activeBreadcrumb.innerHTML = `
      <span class="breadcrumb-item clickable-breadcrumb" onclick="setActiveStateFolder('N1')">GE_SPI_0001</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item clickable-breadcrumb" onclick="setActiveStateFolder('N2')">SPI_2026_001</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">${folderNameMap[state]}</span>
    `;
    elements.activeFolderTitle.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      ${codeNames[state] || state} (${state})
    `;
  }

  // Renderizar la tabla de contenidos si es N1 o N2
  if (state === 'N1') {
    elements.emptyState.style.display = 'none';
    elements.filesContainer.style.display = 'block';
    elements.filesTableBody.innerHTML = `
      <tr class="folder-row" onclick="setActiveStateFolder('N2')">
        <td>
          <div class="file-name-cell">
            <span class="file-icon" style="color: var(--color-accent);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </span>
            <div>
              <span class="file-cde-name" style="font-weight: 600;">SPI_2026_001</span>
              <div class="file-subtext">Carpeta de Contrato (Nivel 2)</div>
            </div>
          </div>
        </td>
        <td><span class="badge-folder">Carpeta</span></td>
        <td><span style="color: var(--color-text-secondary);">N/A</span></td>
        <td><span>-</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); setActiveStateFolder('N2')">Abrir</button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  if (state === 'N2') {
    elements.emptyState.style.display = 'none';
    elements.filesContainer.style.display = 'block';
    elements.filesTableBody.innerHTML = '';
    
    const states = ['1T', '2C', '3P', '4A'];
    states.forEach(st => {
      const row = document.createElement('tr');
      row.className = 'folder-row';
      row.addEventListener('click', () => setActiveStateFolder(st));
      row.innerHTML = `
        <td>
          <div class="file-name-cell">
            <span class="file-icon" style="color: var(--color-accent);">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </span>
            <div>
              <span class="file-cde-name" style="font-weight: 600;">${folderNameMap[st]}</span>
              <div class="file-subtext">${codeNames[st]}</div>
            </div>
          </div>
        </td>
        <td><span class="badge-folder">Carpeta</span></td>
        <td><span style="color: var(--color-text-secondary);">N/A</span></td>
        <td><span>-</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); setActiveStateFolder('${st}')">Abrir</button>
          </div>
        </td>
      `;
      elements.filesTableBody.appendChild(row);
    });
    return;
  }

  // Filtrar archivos del estado actual
  const filteredFiles = appState.files.filter(f => f.state === state);
  
  if (filteredFiles.length === 0) {
    elements.emptyState.style.display = 'flex';
    elements.filesContainer.style.display = 'none';
  } else {
    elements.emptyState.style.display = 'none';
    elements.filesContainer.style.display = 'block';
    
    elements.filesTableBody.innerHTML = '';
    
    filteredFiles.forEach(file => {
      const cdeName = buildCdeBaseName(file);
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>
          <div class="file-name-cell">
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span>
            <div>
              <span class="file-cde-name" title="${cdeName}">${cdeName}</span>
              <div class="file-subtext">Original: ${file.originalName} | Descripción: ${file.description || 'S/D'}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight: 500;">${codeNames[file.docType]}</span>
        </td>
        <td>
          <span style="color: var(--color-text-secondary);">${codeNames[file.specialty]}</span>
        </td>
        <td>
          <span class="badge-version">V${file.version}</span>
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-detail" data-file-id="${file.id}" title="Ver detalles y metadatos">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </button>
            <button class="btn-icon btn-download" data-file-id="${file.id}" title="Descargar con Metadatos Externos">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
            <button class="btn-icon btn-danger-hover btn-delete" data-file-id="${file.id}" title="Eliminar archivo físico de CDE _PRUEBA">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      `;
      
      elements.filesTableBody.appendChild(row);
    });
    
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', () => showFileDetails(btn.getAttribute('data-file-id')));
    });
    document.querySelectorAll('.btn-download').forEach(btn => {
      btn.addEventListener('click', () => downloadFile(btn.getAttribute('data-file-id')));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => deleteFile(btn.getAttribute('data-file-id')));
    });
  }
}

// --- DINÁMICA DE FORMULARIO DE NOMENCLATURA ---

function populateLocations(division) {
  elements.locationSelect.innerHTML = '';
  
  if (!division) {
    elements.locationSelect.disabled = true;
    elements.locationSelect.innerHTML = '<option value="" disabled selected>Selecciona primero una división</option>';
    return;
  }
  
  elements.locationSelect.disabled = false;
  elements.locationStatusLabel.textContent = 'OBLIGATORIO';
  elements.locationStatusLabel.className = 'text-danger';
  
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.disabled = true;
  defaultOpt.selected = true;
  defaultOpt.textContent = 'Selecciona Localización';
  elements.locationSelect.appendChild(defaultOpt);
  
  const locations = locationData[division] || [];
  locations.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc.code;
    opt.textContent = loc.name;
    elements.locationSelect.appendChild(opt);
  });
  
  elements.locationGuidanceTip.innerHTML = `
    <strong>Localización de ${division === 'LZ001' ? 'Luzma 1' : 'Luzma 2'}:</strong> Elige el área de infraestructura hidráulica o eléctrica específica. Los códigos terminan en ${division === 'LZ001' ? '001 o 101' : '002 o 201'}.
  `;
}

function calculateConsecutive(division, location, specialty, docType) {
  if (!division || !location || !specialty || !docType) {
    return '----';
  }
  
  // Buscar archivos que coincidan con la misma estructura (en la lista obtenida del servidor)
  const matches = appState.files.filter(f => 
    f.division === division &&
    f.location === location &&
    f.specialty === specialty &&
    f.docType === docType
  );
  
  if (matches.length === 0) {
    return '0001';
  }
  
  const consecutivos = matches.map(m => parseInt(m.consecutivo, 10));
  const maxConsecutivo = Math.max(...consecutivos);
  return String(maxConsecutivo + 1).padStart(4, '0');
}

function buildCdeBaseName(file) {
  return `${file.projectId}_${file.phase}_${file.division}_${file.location}_${file.specialty}_${file.docType}_${file.consecutivo}`;
}

function updateConsecutiveAndPreview() {
  const division = elements.divisionSelect.value;
  const location = elements.locationSelect.value;
  const specialty = elements.specialtySelect.value;
  const docType = elements.docTypeSelect.value;
  
  const consecutivo = calculateConsecutive(division, location, specialty, docType);
  elements.consecutivoInput.value = consecutivo;
  
  updateNamingPreview();
  validateFormCompletion();
}

function updateNamingPreview() {
  const proj = 'GE_SPI_0001';
  const phase = 'F8';
  const div = elements.divisionSelect.value || 'XXXXX';
  const loc = elements.locationSelect.value || 'XXXXX';
  const esp = elements.specialtySelect.value || 'XXX';
  const tip = elements.docTypeSelect.value || 'XXX';
  const cons = elements.consecutivoInput.value || 'XXXX';
  const desc = elements.descInput.value || '[DESCRIPCION]';
  
  const cdeName = `${proj}_${phase}_${div}_${loc}_${esp}_${tip}_${cons}`;
  elements.cdeNamePreview.textContent = cdeName;
  
  let activeLength = 0;
  if (elements.divisionSelect.value) activeLength += 5;
  if (elements.locationSelect.value) activeLength += 5;
  if (elements.specialtySelect.value) activeLength += 3;
  if (elements.docTypeSelect.value) activeLength += 3;
  
  const totalBaseLength = 11 + 2 + activeLength + (elements.consecutivoInput.value !== '----' ? 4 : 0);
  elements.previewLengthBadge.textContent = `${totalBaseLength} / 33 Caracteres Base`;
  
  if (totalBaseLength === 33) {
    elements.previewLengthBadge.className = 'tree-badge text-success';
    elements.previewLengthBadge.style.backgroundColor = 'var(--color-success-bg)';
  } else {
    elements.previewLengthBadge.className = 'tree-badge badge-root';
    elements.previewLengthBadge.style.backgroundColor = '';
  }
  
  const ext = appState.selectedFileForUpload ? appState.selectedFileForUpload.ext : 'pdf';
  const cleanDesc = desc && desc !== '[DESCRIPCION]' ? desc : 'DESCRIPCION';
  const version = detectDocumentVersion(div, loc, esp, tip, cleanDesc);
  
  elements.downloadNamePreview.textContent = `${cdeName}_${cleanDesc}_V${version}.${ext}`;
}

function detectDocumentVersion(div, loc, esp, tip, desc) {
  if (div === 'XXXXX' || loc === 'XXXXX' || esp === 'XXX' || tip === 'XXX') {
    return 1;
  }
  
  const matches = appState.files.filter(f => 
    f.division === div &&
    f.location === loc &&
    f.specialty === esp &&
    f.docType === tip &&
    f.description === desc
  );
  
  if (matches.length === 0) {
    return 1;
  }
  
  const versions = matches.map(m => m.version);
  return Math.max(...versions) + 1;
}

function validateFormCompletion() {
  const isFormComplete = 
    elements.divisionSelect.value &&
    elements.locationSelect.value &&
    elements.specialtySelect.value &&
    elements.docTypeSelect.value &&
    elements.consecutivoInput.value !== '----' &&
    elements.descInput.value.trim().length > 0 &&
    appState.selectedFileForUpload !== null;
    
  elements.btnUpload.disabled = !isFormComplete;
  
  if (isFormComplete) {
    elements.btnUpload.classList.add('pulse-target');
  } else {
    elements.btnUpload.classList.remove('pulse-target');
  }
}

// --- GESTIÓN DE ARCHIVOS Y COMUNICACIÓN API ---

function handleSelectedFile(file) {
  const fileName = file.name;
  const parts = fileName.split('.');
  const ext = parts.length > 1 ? parts.pop().toLowerCase() : 'pdf';
  
  // Guardamos el objeto archivo real para enviarlo por HTTP multipart
  appState.selectedFileForUpload = {
    fileObject: file,
    originalName: fileName,
    ext: ext,
    sizeBytes: file.size
  };
  
  elements.uploaderText.innerHTML = `
    <span class="text-success" style="font-weight: 600;">Archivo seleccionado:</span><br>
    <span style="font-family: monospace; font-size: 11px;">${fileName}</span>
  `;
  
  updateNamingPreview();
  validateFormCompletion();
}

// Helper para convertir archivo a base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}

async function executeUpload() {
  const division = elements.divisionSelect.value;
  const location = elements.locationSelect.value;
  const specialty = elements.specialtySelect.value;
  const docType = elements.docTypeSelect.value;
  const desc = elements.descInput.value.trim().toUpperCase();
  
  const activeTab = elements.folderTabs.querySelector('.folder-tab.active');
  const targetState = activeTab ? activeTab.getAttribute('data-state') : '1T';
  
  // Identificar si existe algún archivo con el mismo código base y descripción para incrementar versión
  const existingDoc = appState.files.find(f => 
    f.division === division &&
    f.location === location &&
    f.specialty === specialty &&
    f.docType === docType &&
    f.description === desc
  );
  
  let finalConsecutivo = elements.consecutivoInput.value;
  let finalVersion = 1;
  
  if (existingDoc) {
    finalConsecutivo = existingDoc.consecutivo;
    const siblingVersions = appState.files
      .filter(f => 
        f.division === division &&
        f.location === location &&
        f.specialty === specialty &&
        f.docType === docType &&
        f.consecutivo === finalConsecutivo
      )
      .map(f => f.version);
    
    finalVersion = Math.max(...siblingVersions) + 1;
  }
  
  try {
    elements.btnUpload.disabled = true;
    elements.btnUpload.textContent = 'Sincronizando con Gdrive...';
    
    // Convertir el archivo a base64 para envío seguro en JSON
    const base64Data = await fileToBase64(appState.selectedFileForUpload.fileObject);
    
    const payload = {
      projectId: 'GE_SPI_0001',
      phase: 'F8',
      division: division,
      location: location,
      specialty: specialty,
      docType: docType,
      consecutivo: finalConsecutivo,
      description: desc,
      version: finalVersion,
      state: targetState,
      originalName: appState.selectedFileForUpload.originalName,
      extension: appState.selectedFileForUpload.ext,
      fileBase64: base64Data
    };
    
    const response = await fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Error al subir el archivo');
    }
    
    const result = await response.json();
    
    // Resetear formulario de carga
    appState.selectedFileForUpload = null;
    elements.namingForm.reset();
    elements.descInput.value = '';
    elements.descCharCount.textContent = '0/20';
    elements.uploaderText.innerHTML = 'Arrastra un archivo aquí o haz click para explorar';
    elements.locationSelect.disabled = true;
    elements.locationSelect.innerHTML = '<option value="" disabled selected>Selecciona primero una división</option>';
    elements.locationStatusLabel.textContent = 'CONDICIONADO';
    elements.locationStatusLabel.className = 'text-warning';
    
    // Sincronizar archivos locales con el servidor físico y mover vista
    await fetchFilesFromServer();
    setActiveStateFolder(targetState);
    updateStorageMetrics();
    
    alert(`Cargado físicamente en CDE _PRUEBA (${targetState}):\n${buildCdeBaseName(result.file)}`);
  } catch (err) {
    console.error(err);
    alert('Error al realizar la carga física: ' + err.message);
  } finally {
    elements.btnUpload.textContent = 'Cargar y Sincronizar en CDE';
    validateFormCompletion();
  }
}

async function deleteFile(fileId) {
  const file = appState.files.find(f => f.id === fileId);
  if (!file) return;
  
  if (confirm(`¿Estás seguro de eliminar el archivo físico ${buildCdeBaseName(file)} de la carpeta CDE _PRUEBA?`)) {
    try {
      const response = await fetch(`${API_BASE}/api/files/${fileId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchFilesFromServer();
        renderFolder(appState.activeFolder);
        updateStorageMetrics();
      } else {
        alert('No se pudo borrar el archivo físico.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al comunicar con el servidor.');
    }
  }
}

// Llama al API que devuelve el archivo físico renombrado al vuelo con los metadatos
function downloadFile(fileId) {
  const file = appState.files.find(f => f.id === fileId);
  if (!file) return;
  
  // Abrimos directamente el endpoint de descarga en el navegador con query params
  window.open(`${API_BASE}/api/download?id=${fileId}`, '_blank');
}

// --- MODAL DE DETALLE Y METADATOS ---
function showFileDetails(fileId) {
  const file = appState.files.find(f => f.id === fileId);
  if (!file) return;
  
  const cdeBase = buildCdeBaseName(file);
  const downloadName = `${cdeBase}_${file.description}_V${file.version}.${file.extension}`;
  
  elements.mdState.textContent = `${codeNames[file.state]} (${file.state})`;
  elements.mdCdeName.textContent = cdeBase;
  elements.mdDivision.textContent = `${codeNames[file.division]} (${file.division})`;
  elements.mdLocation.textContent = `${codeNames[file.location]} (${file.location})`;
  elements.mdSpecialty.textContent = `${codeNames[file.specialty]} (${file.specialty})`;
  elements.mdDocType.textContent = `${codeNames[file.docType]} (${file.docType})`;
  elements.mdConsecutivo.textContent = file.consecutivo;
  elements.mdDesc.textContent = file.description;
  elements.mdVersion.textContent = `V${file.version}`;
  elements.mdDownloadName.textContent = downloadName;
  
  const date = new Date(file.uploadDate);
  elements.mdDate.textContent = date.toLocaleString('es-CO');
  
  elements.btnModalDownload.setAttribute('data-file-id', file.id);
  elements.detailModal.classList.add('open');
}

function closeModal() {
  elements.detailModal.classList.remove('open');
}

// --- METRICAS DE STORAGE ---
function updateStorageMetrics() {
  const totalBytes = appState.files.reduce((acc, curr) => acc + (curr.sizeBytes || 0), 0);
  
  let sizeText = '';
  let percentage = 5;
  
  // Límite de 15 GB
  const limitBytes = 15 * 1024 * 1024 * 1024;
  
  if (totalBytes > 1024 * 1024) {
    const mb = (totalBytes / (1024 * 1024)).toFixed(1);
    sizeText = `${mb} MB usados`;
    percentage = Math.min(100, Math.max(5, (totalBytes / limitBytes) * 100));
  } else {
    const kb = (totalBytes / 1024).toFixed(1);
    sizeText = `${kb} KB usados`;
    percentage = Math.min(100, Math.max(5, (totalBytes / limitBytes) * 100));
  }
  
  elements.storageUsedText.textContent = sizeText;
  elements.storageBarFill.style.width = `${percentage}%`;
}

// Arrancar la app
window.addEventListener('DOMContentLoaded', init);
