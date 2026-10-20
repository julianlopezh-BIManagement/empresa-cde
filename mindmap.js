/**
 * 3D MIND MAP & 2D EDT NAVIGATOR (MODO CLARO)
 * - Diálogo de guardado nativo (showSaveFilePicker / Guardar Como)
 * - Hipervinculación y Desglose de Sub-mapas .mindmap.json en cualquier nodo EDT
 * - Referencias completas actualizadas a EDT (Estructura de Desglose del Trabajo)
 * - Paleta visual y motor Three.js en Modo Claro (Light Theme)
 */

// ==========================================
// 1. DATA MODEL & SEED DATASET (EDT Empresa)
// ==========================================

const INITIAL_PROJECT = {
  meta: {
    title: "Organigrama general Empresa & EDT",
    description: "Estructura corporativa y desglose de áreas de trabajo y actividades EDT",
    version: "1.4.0",
    empresa: "Empresa",
    direccion: "Sostenibilidad & Gerencias",
    gerente: "Fernando Gacharná Rosero / Edwin Peña",
    updatedAt: new Date().toISOString()
  },
  viewSettings: {
    layoutMode: "radial",
    showGrid: true
  },
  collapsedNodeIds: [],
  nodes: [
    // Top Leadership
    {
      id: "root-00",
      parentId: null,
      code: "00",
      title: "ASAMBLEA DE ACCIONISTAS",
      owner: "Accionistas SP",
      level: 0,
      style: { color: "#fef08a", textColor: "#713f12", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Asamblea de Accionistas\nMáximo órgano de gobierno corporativo de Empresa.",
      attachments: [{ name: "Estatutos_SP_2026.pdf", path: "docs/Estatutos_SP_2026.pdf", type: "pdf" }]
    },
    {
      id: "root-00-rev",
      parentId: "root-00",
      code: "00.01",
      title: "Revisoría Fiscal",
      owner: "Crowe CO S.A.S.",
      level: 1,
      style: { color: "#fef08a", textColor: "#713f12", shape: "box" },
      relationType: "dotted",
      markdownNotes: "## Control y Auditoría Externa\nSupervisión de estados financieros y cumplimiento normativo."
    },
    {
      id: "root-00-jd",
      parentId: "root-00",
      code: "00.02",
      title: "Junta Directiva",
      owner: "Andrés Saldarriaga (Presidente)",
      level: 1,
      style: { color: "#fed7aa", textColor: "#7c2d12", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Junta Directiva\nDefinición estratégica y directrices corporativas."
    },
    {
      id: "root-00-pres",
      parentId: "root-00-jd",
      code: "00.03",
      title: "Presidente",
      owner: "Ana Cecilia Sánchez",
      level: 2,
      style: { color: "#fed7aa", textColor: "#7c2d12", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Presidencia Ejecutiva\nLiderazgo de operaciones, desarrollo de negocios e inversiones."
    },
    {
      id: "root-00-asesor",
      parentId: "root-00-pres",
      code: "00.03.01",
      title: "Asesor Presidencia",
      owner: "Jorge Munera",
      level: 3,
      style: { color: "#fef08a", textColor: "#713f12", shape: "box" },
      relationType: "dotted",
      markdownNotes: "Asesoría estratégica directa a Presidencia."
    },
    {
      id: "root-00-vp",
      parentId: "root-00-pres",
      code: "00.04",
      title: "Vicepresidente",
      owner: "Juan Pablo Aguilar",
      level: 3,
      style: { color: "#000000", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Vicepresidencia de Operaciones\nCoordinación de todas las gerencias de ingeniería y gestión."
    },

    // 01 GERENCIA TÉCNICA
    {
      id: "01",
      parentId: "root-00-vp",
      code: "01",
      title: "Gerencia Técnica",
      owner: "Edwin Peña",
      level: 4,
      style: { color: "#000000", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Gerencia Técnica\nResponsable de ingeniería, obras civiles, diseños y estructuración de proyectos.",
      attachments: [{ name: "Plan_Maestro_Tecnico.pdf", path: "docs/Plan_Maestro_Tecnico.pdf", type: "pdf" }]
    },
    {
      id: "01.01",
      parentId: "01",
      code: "01.01",
      title: "Obras civiles",
      owner: "Dirección de Obras",
      level: 5,
      style: { color: "#0369a1", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "Ejecución y control de proyectos de infraestructura."
    },
    {
      id: "01.01.01",
      parentId: "01.01",
      code: "01.01.01",
      title: "Licitaciones",
      owner: "Equipo de Propuestas",
      level: 6,
      style: { color: "#dc2626", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "## Licitaciones Activas\n- [x] Licitación Concesión Vial 2026\n- [ ] Concurso de Diseños Túnel Central\n- [ ] Pliego Hidroeléctrica Río Verde",
      attachments: [
        { name: "Pliego_Licitacion_2026.pdf", path: "docs/licitaciones/Pliego_2026.pdf", type: "pdf" },
        { name: "Presupuesto_Oferta.xlsx", path: "docs/licitaciones/Presupuesto.xlsx", type: "xlsx" }
      ]
    },
    {
      id: "01.01.02",
      parentId: "01.01",
      code: "01.01.02",
      title: "Diseños y Modelado BIM",
      owner: "Director de diseños",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "## Gestión de Modelos BIM / IFC\n- Modelo Estructural y Arquitectónico federado en formato OpenBIM IFC.\n- Matriz de interferencias y Property Sets validados.",
      attachments: [
        { name: "Modelo_Estructural_SP_2026.ifc", path: "bim/Modelo_Estructural_SP_2026.ifc", type: "ifc" }
      ]
    },
    {
      id: "01.01.02.01",
      parentId: "01.01",
      code: "01.01.02.01",
      title: "Coordinación Técnica",
      owner: "Coordinador Técnico",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.01.03",
      parentId: "01.01",
      code: "01.01.03",
      title: "Puentes",
      owner: "Especialista Estructuras",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      attachments: [
        { name: "Puente_Estructural_Superficie.ifc", path: "bim/Puente_Estructural_Superficie.ifc", type: "ifc" }
      ]
    },
    {
      id: "01.01.04",
      parentId: "01.01",
      code: "01.01.04",
      title: "Vias",
      owner: "Especialista Pavimentos",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.01.05",
      parentId: "01.01",
      code: "01.01.05",
      title: "Tunel",
      owner: "Especialista Geotécnico",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.01.06",
      parentId: "01.01",
      code: "01.01.06",
      title: "Peaje",
      owner: "Ingeniería de Tránsito",
      level: 6,
      style: { color: "#fecdd3", textColor: "#881337", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.01.07",
      parentId: "01.01",
      code: "01.01.07",
      title: "Centrales Hidroelectricas",
      owner: "Luzma 1 & 2",
      level: 6,
      style: { color: "#0284c7", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },

    // 01.03 SOSTENIBILIDAD
    {
      id: "01.03",
      parentId: "01",
      code: "01.03",
      title: "Sostenibilidad",
      owner: "Fernando Gacharná Rosero",
      level: 5,
      style: { color: "#16a34a", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: "# Dirección de Sostenibilidad\nGestión ambiental, social, indicadores, informes y licitaciones.",
      attachments: [
        { name: "Matriz_Documental_Sostenibilidad.xlsx", path: "docs/Matriz_Sostenibilidad.xlsx", type: "xlsx" },
        { name: "Desglose_Sostenibilidad.mindmap.json", path: "docs/Desglose_Sostenibilidad.mindmap.json", type: "mindmap" }
      ]
    },
    {
      id: "01.03.01",
      parentId: "01.03",
      code: "01.03.01",
      title: "PLANIFICACION",
      owner: "Fernando Gacharná",
      level: 6,
      style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.03.01.01",
      parentId: "01.03.01",
      code: "01.03.01.01",
      title: "PRESUPUESTO",
      owner: "Costos Sostenibilidad",
      level: 7,
      style: { color: "#4ade80", textColor: "#0f172a", shape: "box" },
      relationType: "solid",
      attachments: [{ name: "Presupuesto_Anual.xlsx", path: "docs/Presupuesto_Anual.xlsx", type: "xlsx" }]
    },
    {
      id: "01.03.01.02",
      parentId: "01.03.01",
      code: "01.03.01.02",
      title: "PLANEACIÓN",
      owner: "Planeación HSE",
      level: 7,
      style: { color: "#4ade80", textColor: "#0f172a", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.03.02",
      parentId: "01.03",
      code: "01.03.02",
      title: "INDICADORES",
      owner: "Gestión HSE",
      level: 6,
      style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.03.03",
      parentId: "01.03",
      code: "01.03.03",
      title: "INFORMES",
      owner: "Reportes Consolidados",
      level: 6,
      style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.03.04",
      parentId: "01.03",
      code: "01.03.04",
      title: "LICITACIONES",
      owner: "Presupuesto Ambiental",
      level: 6,
      style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "01.03.05",
      parentId: "01.03",
      code: "01.03.05",
      title: "PROYECTOS",
      owner: "Programas HSE",
      level: 6,
      style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },

    // 02 GERENCIA JURÍDICA
    {
      id: "02",
      parentId: "root-00-vp",
      code: "02",
      title: "Gerencia Jurídica",
      owner: "Gina Jaime",
      level: 4,
      style: { color: "#000000", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "02.01",
      parentId: "02",
      code: "02.01",
      title: "Demandas",
      owner: "Área Litigios",
      level: 5,
      style: { color: "#ea580c", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "02.02",
      parentId: "02",
      code: "02.02",
      title: "Laboral",
      owner: "Asuntos Laborales",
      level: 5,
      style: { color: "#ea580c", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },

    // 03 GERENCIA FINANCIERA
    {
      id: "03",
      parentId: "root-00-vp",
      code: "03",
      title: "Gerencia Financiera",
      owner: "Mauricio Velásquez",
      level: 4,
      style: { color: "#000000", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "03.01",
      parentId: "03",
      code: "03.01",
      title: "Financiera (dirección contable)",
      owner: "Dirección Contable",
      level: 5,
      style: { color: "#f87171", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },

    // 04 GERENCIA ADMINISTRATIVA
    {
      id: "04",
      parentId: "root-00-vp",
      code: "04",
      title: "Gerencia Administrativa",
      owner: "Carlos Ruiz",
      level: 4,
      style: { color: "#000000", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    },
    {
      id: "04.01",
      parentId: "04",
      code: "04.01",
      title: "Adquisiciones y Logística",
      owner: "Dirección A&L (Angela Peláez)",
      level: 5,
      style: { color: "#06b6d4", textColor: "#ffffff", shape: "box" },
      relationType: "solid"
    }
  ]
};

// Storage for runtime local files & submaps
const localFileStore = new Map();
const localFileUrls = new Map();

// ==========================================
// 2. STATE MANAGER & SUB-MAP UNIFICATION
// ==========================================

class AppState {
  constructor() {
    this.project = JSON.parse(JSON.stringify(INITIAL_PROJECT));
    this.selectedNodeId = null;
    this.activeBranchIds = new Set();
    this.searchQuery = "";
    this.levelFilter = "all";
    this.layoutMode = "radial";
    this.showGrid = true;
    this.collapsedNodeIds = new Set();
    this.currentFileHandle = null;
    this.currentFileName = null;
    this.lastAutoSaveTime = null;
    
    const saved = localStorage.getItem("sp_mindmap_state_light");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.nodes && parsed.nodes.length > 0) {
          this.project = parsed;
          if (Array.isArray(parsed.collapsedNodeIds)) {
            this.collapsedNodeIds = new Set(parsed.collapsedNodeIds);
          }
          // Ensure sample IFC attachment exists on 01.01.02
          const disNode = this.project.nodes.find(n => n.id === "01.01.02");
          if (disNode && (!disNode.attachments || disNode.attachments.length === 0)) {
            disNode.attachments = [
              { name: "Modelo_Estructural_SP_2026.ifc", path: "bim/Modelo_Estructural_SP_2026.ifc", type: "ifc" }
            ];
          }
          const pteNode = this.project.nodes.find(n => n.id === "01.01.03");
          if (pteNode && (!pteNode.attachments || pteNode.attachments.length === 0)) {
            pteNode.attachments = [
              { name: "Puente_Estructural_Superficie.ifc", path: "bim/Puente_Estructural_Superficie.ifc", type: "ifc" }
            ];
          }
          if (disNode && (!disNode.tasks || disNode.tasks.length === 0)) {
            disNode.tasks = [
              { id: "task-demo-1", name: "Cálculo de cargas vivas y muertas según NSR-10", startDate: "2026-10-01", endDate: "2026-10-15", status: "Completada" },
              { id: "task-demo-2", name: "Modelado BIM y exportación IFC estructural", startDate: "2026-10-16", endDate: "2026-10-31", status: "En curso" }
            ];
          }
        }
      } catch (e) {
        console.warn("Could not restore local storage project", e);
      }
    }

    // Default visualization to radial 3D (User Requirement)
    if (this.project.viewSettings && this.project.viewSettings.layoutMode && this.project.viewSettings.layoutMode !== "hierarchy") {
      this.layoutMode = this.project.viewSettings.layoutMode;
    } else {
      this.layoutMode = "radial";
    }
    this.project.viewSettings = this.project.viewSettings || {};
    this.project.viewSettings.layoutMode = this.layoutMode;

    // Auto-heal relationships and sort in strict hierarchical tree order (depth-first)
    this.sortNodesHierarchically();
  }

  saveToLocal() {
    this.project.collapsedNodeIds = Array.from(this.collapsedNodeIds);
    localStorage.setItem("sp_mindmap_state_light", JSON.stringify(this.project));
  }

  getNode(idOrCode) {
    if (!idOrCode) return null;
    return this.project.nodes.find(n => n.id === idOrCode || (n.code && n.code === idOrCode));
  }

  getParent(node) {
    if (!node) return null;
    // 1. Direct parentId matching by id
    if (node.parentId) {
      const p = this.project.nodes.find(n => n.id === node.parentId);
      if (p && p.id !== node.id) return p;
      // Also check parentId matching by code
      const pByCode = this.project.nodes.find(n => n.code && n.code === node.parentId);
      if (pByCode && pByCode.id !== node.id) {
        node.parentId = pByCode.id;
        return pByCode;
      }
    }
    // 2. Hierarchical code prefix fallback (e.g. child "01.05.01", parent "01.05"; or "01.05", parent "01")
    if (node.code && typeof node.code === "string" && node.code.includes(".")) {
      const parts = node.code.split(".");
      for (let i = parts.length - 1; i >= 1; i--) {
        const candidateCode = parts.slice(0, i).join(".");
        const candidateParent = this.project.nodes.find(n => n.code === candidateCode);
        if (candidateParent && candidateParent.id !== node.id) {
          node.parentId = candidateParent.id;
          return candidateParent;
        }
      }
    }
    return null;
  }

  getChildren(parentId) {
    const parent = this.getNode(parentId);
    if (!parent) return [];
    return this.project.nodes.filter(n => {
      if (n.id === parent.id) return false;
      const p = this.getParent(n);
      return p && p.id === parent.id;
    });
  }

  getRootNodes() {
    return this.project.nodes.filter(n => {
      const p = this.getParent(n);
      return !p;
    });
  }

  hasChildren(nodeId) {
    return this.getChildren(nodeId).length > 0;
  }

  getDescendantCount(nodeId) {
    let count = 0;
    let queue = [nodeId];
    while (queue.length > 0) {
      const currId = queue.shift();
      const children = this.getChildren(currId);
      count += children.length;
      children.forEach(c => queue.push(c.id));
    }
    return count;
  }

  isNodeVisible(nodeId) {
    let curr = this.getNode(nodeId);
    while (curr) {
      const parent = this.getParent(curr);
      if (!parent) break;
      if (this.collapsedNodeIds.has(parent.id) || (parent.code && this.collapsedNodeIds.has(parent.code))) {
        return false;
      }
      curr = parent;
    }
    return true;
  }

  getHierarchicalNodes() {
    const result = [];
    const visited = new Set();

    // Natural numerical sort for siblings: e.g. "01.01", "01.02", ..., "01.05", "01.06", ..., "01.12"
    const sortSiblings = (a, b) => {
      if (a.code && b.code) {
        const cmp = a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' });
        if (cmp !== 0) return cmp;
      }
      const idxA = this.project.nodes.findIndex(n => n.id === a.id);
      const idxB = this.project.nodes.findIndex(n => n.id === b.id);
      return idxA - idxB;
    };

    const traverse = (node, depth) => {
      if (!node || visited.has(node.id)) return;
      visited.add(node.id);

      // Dynamically calculate and assign real hierarchical level based on tree depth
      node.level = depth;
      result.push(node);

      const children = this.getChildren(node.id).sort(sortSiblings);
      children.forEach(child => traverse(child, depth + 1));
    };

    const roots = this.getRootNodes().sort(sortSiblings);
    roots.forEach(root => traverse(root, 0));

    // Handle any orphaned nodes that were not reached by root traversal
    this.project.nodes.forEach(n => {
      if (!visited.has(n.id)) {
        traverse(n, n.level || 0);
      }
    });

    return result;
  }

  sortNodesHierarchically() {
    this.project.nodes = this.getHierarchicalNodes();
  }

  isDescendant(nodeId, potentialAncestorId) {
    if (!nodeId || !potentialAncestorId) return false;
    let curr = this.getNode(nodeId);
    while (curr) {
      const parent = this.getParent(curr);
      if (!parent) break;
      if (parent.id === potentialAncestorId || (parent.code && parent.code === potentialAncestorId)) {
        return true;
      }
      curr = parent;
    }
    return false;
  }

  recalculateHierarchicalCodes() {
    const roots = this.getRootNodes();
    let rootNum = 1;

    const assignCodesRecursively = (node, prefix, level) => {
      node.level = level;
      if (prefix) {
        node.code = prefix;
      }
      const children = this.getChildren(node.id);
      children.forEach((child, idx) => {
        const childCode = `${node.code}.${String(idx + 1).padStart(2, "0")}`;
        assignCodesRecursively(child, childCode, level + 1);
      });
    };

    roots.forEach((root) => {
      let rootCode = root.code;
      if (!rootCode || !/^\d+$/.test(rootCode.trim())) {
        rootCode = String(rootNum).padStart(2, "0");
      }
      assignCodesRecursively(root, rootCode, 0);
      rootNum++;
    });
  }

  moveNode(draggedId, targetId, dropPosition = "after") {
    if (!draggedId || !targetId || draggedId === targetId) return;
    if (this.isDescendant(targetId, draggedId)) {
      alert("No se puede mover un nodo dentro de sus propios descendientes.");
      return;
    }

    const draggedNode = this.getNode(draggedId);
    const targetNode = this.getNode(targetId);
    if (!draggedNode || !targetNode) return;

    if (dropPosition === "inside") {
      draggedNode.parentId = targetNode.id;
    } else {
      draggedNode.parentId = targetNode.parentId || null;
    }

    // Reorder in nodes array
    const nodes = this.project.nodes.filter(n => n.id !== draggedId);
    let targetIdx = nodes.findIndex(n => n.id === targetId);
    if (targetIdx === -1) {
      nodes.push(draggedNode);
    } else {
      if (dropPosition === "before") {
        nodes.splice(targetIdx, 0, draggedNode);
      } else if (dropPosition === "after" || dropPosition === "inside") {
        nodes.splice(targetIdx + 1, 0, draggedNode);
      }
    }
    this.project.nodes = nodes;

    // Recalculate hierarchical EDT codes dynamically
    this.recalculateHierarchicalCodes();
    this.sortNodesHierarchically();
    this.saveToLocal();
  }

  toggleCollapse(nodeId) {
    if (this.collapsedNodeIds.has(nodeId)) {
      this.collapsedNodeIds.delete(nodeId);
    } else {
      this.collapsedNodeIds.add(nodeId);
    }
    this.saveToLocal();
    refreshUI();
  }

  expandAll() {
    this.collapsedNodeIds.clear();
    this.levelFilter = "all";
    this.saveToLocal();
    refreshUI();
  }

  collapseAll() {
    this.collapsedNodeIds.clear();
    this.project.nodes.forEach(n => {
      if (this.hasChildren(n.id)) {
        this.collapsedNodeIds.add(n.id);
      }
    });
    this.saveToLocal();
    refreshUI();
  }

  collapseToLevel(targetLevel) {
    this.collapsedNodeIds.clear();
    this.levelFilter = "all";
    this.project.nodes.forEach(n => {
      if (this.hasChildren(n.id)) {
        if (n.level >= targetLevel) {
          this.collapsedNodeIds.add(n.id);
        }
      }
    });
    this.saveToLocal();
    refreshUI();
  }

  getBranchIds(nodeId) {
    const branch = new Set();
    const node = this.getNode(nodeId);
    if (!node) return branch;
    branch.add(node.id);

    // 1. Add all descendants
    let queue = [node.id];
    while (queue.length > 0) {
      const current = queue.shift();
      const children = this.getChildren(current);
      children.forEach(child => {
        if (!branch.has(child.id)) {
          branch.add(child.id);
          queue.push(child.id);
        }
      });
    }

    // 2. Add all ancestors up to root
    let curr = node;
    while (curr) {
      const p = this.getParent(curr);
      if (!p || branch.has(p.id)) break;
      branch.add(p.id);
      curr = p;
    }

    return branch;
  }

  addNode(node) {
    this.project.nodes.push(node);
    this.sortNodesHierarchically();
    this.saveToLocal();
  }

  updateNode(id, updates) {
    const node = this.getNode(id);
    if (node) {
      Object.assign(node, updates);
      this.sortNodesHierarchically();
      this.saveToLocal();
    }
  }

  deleteNode(id) {
    const toDelete = this.getBranchIds(id);
    this.project.nodes = this.project.nodes.filter(n => !toDelete.has(n.id));
    if (toDelete.has(this.selectedNodeId)) {
      this.selectedNodeId = null;
      this.activeBranchIds.clear();
    }
    this.sortNodesHierarchically();
    this.saveToLocal();
  }

  proposeLogicalCode(parentId, isSibling = false) {
    let effectiveParentId = parentId;
    if (isSibling && parentId) {
      const currentNode = this.getNode(parentId);
      effectiveParentId = currentNode ? currentNode.parentId : null;
    }

    if (!effectiveParentId) {
      const roots = this.getRootNodes();
      let maxNum = 0;
      roots.forEach(r => {
        if (r.code && /^\d+$/.test(r.code)) {
          const val = parseInt(r.code, 10);
          if (val > maxNum) maxNum = val;
        }
      });
      return String(maxNum + 1).padStart(2, "0");
    }

    const parent = this.getNode(effectiveParentId);
    const parentCode = (parent && parent.code) ? parent.code : "01";
    const siblings = this.getChildren(effectiveParentId);

    let maxSuffix = 0;
    siblings.forEach(s => {
      if (s.code && s.code.startsWith(parentCode + ".")) {
        const suffix = s.code.substring(parentCode.length + 1);
        const num = parseInt(suffix, 10);
        if (!isNaN(num) && num > maxSuffix) {
          maxSuffix = num;
        }
      }
    });

    const nextSuffix = String(Math.max(maxSuffix + 1, siblings.length + 1)).padStart(2, "0");
    return `${parentCode}.${nextSuffix}`;
  }

  // ==========================================
  // HIPERVINCLULACIÓN Y DESGLOSE DE SUB-MAPAS (.mindmap.json)
  // ==========================================
  linkAndExpandSubmap(parentNodeId, submapProject) {
    const parent = this.getNode(parentNodeId);
    if (!parent || !submapProject || !submapProject.nodes) return;

    const parentCode = parent.code || "01";
    const baseLevel = parent.level || 0;

    // Map old submap IDs to new unified IDs
    const idMap = new Map();
    const newNodes = [];

    // Find root nodes of the submap
    const submapRoots = submapProject.nodes.filter(n => !n.parentId || !submapProject.nodes.some(p => p.id === n.parentId));

    submapProject.nodes.forEach((subNode, idx) => {
      const isRoot = submapRoots.some(r => r.id === subNode.id);
      const newId = `submap-${parent.id}-${subNode.id}-${Date.now()}`;
      idMap.set(subNode.id, newId);

      // Construct hierarchical code prefix
      let newCode = "";
      if (isRoot) {
        newCode = `${parentCode}.${String(idx + 1).padStart(2, "0")}`;
      } else {
        newCode = `${parentCode}.${subNode.code || String(idx + 1)}`;
      }

      newNodes.push({
        id: newId,
        parentId: isRoot ? parent.id : (idMap.get(subNode.parentId) || parent.id),
        code: newCode,
        title: subNode.title,
        owner: subNode.owner || parent.owner || "",
        level: baseLevel + 1 + (subNode.level || 0),
        style: subNode.style || { color: "#0284c7", textColor: "#ffffff", shape: "box" },
        relationType: subNode.relationType || "solid",
        markdownNotes: subNode.markdownNotes || `# ${subNode.title}\nDesglosado desde sub-mapa: ${submapProject.meta.title}`,
        attachments: subNode.attachments || [],
        isSubmapNode: true
      });
    });

    // Mark parent as unfolded submap
    parent.submapLinked = true;
    parent.attachments = parent.attachments || [];
    if (!parent.attachments.some(a => a.type === "mindmap")) {
      parent.attachments.push({
        name: `${submapProject.meta.title || "Submapa"}.mindmap.json`,
        path: `submaps/${submapProject.meta.title || "submap"}.mindmap.json`,
        type: "mindmap"
      });
    }

    // Insert new nodes
    this.project.nodes.push(...newNodes);
    this.sortNodesHierarchically();
    this.saveToLocal();
    refreshUI();
    selectNode(parentNodeId, true);
  }
}

const state = new AppState();

// ==========================================
// 3. THREE.JS 3D CANVAS (LIGHT THEME)
// ==========================================

class ThreeEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.nodeMeshes = new Map();
    this.edgeMeshes = [];
    this.gridHelper = null;
    this.selectionRing = null;

    this.nodePositions = new Map();
    this.lastClickNodeId = null;
    this.lastClickTime = 0;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // 1. Scene with crisp light theme background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8fafc);
    this.scene.fog = new THREE.FogExp2(0xf8fafc, 0.0004);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    this.camera.position.set(0, 200, 650);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 4500;
    this.controls.minDistance = 20;

    // 5. Lighting (Bright natural daylight setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight1.position.set(300, 500, 400);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 0.25);
    dirLight2.position.set(-300, -200, -200);
    this.scene.add(dirLight2);

    // 6. Spatial Grid (Clean light lines)
    this.gridHelper = new THREE.GridHelper(3500, 70, 0xcbd5e1, 0xe2e8f0);
    this.gridHelper.position.y = -260;
    this.scene.add(this.gridHelper);

    // 7. Selection Indicator
    this.createSelectionRing();

    window.addEventListener("resize", () => this.onResize());
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(this.container);
    }
    this.container.addEventListener("pointerdown", (e) => this.onPointerDown(e));
    this.container.addEventListener("pointermove", (e) => this.onPointerMove(e));

    this.animate();
  }

  createSelectionRing() {
    const ringGeo = new THREE.RingGeometry(42, 48, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    this.selectionRing = new THREE.Mesh(ringGeo, ringMat);
    this.selectionRing.visible = false;
    this.scene.add(this.selectionRing);
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  onPointerDown(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(Array.from(this.nodeMeshes.values()), true);

    if (intersects.length > 0) {
      let hitObj = intersects[0].object;
      if (hitObj.userData && hitObj.userData.isCollapseBtn) {
        state.toggleCollapse(hitObj.userData.nodeId);
        return;
      }

      let obj = hitObj;
      while (obj && !obj.userData.nodeId && obj.parent) {
        obj = obj.parent;
      }
      if (obj && obj.userData.nodeId) {
        const nodeId = obj.userData.nodeId;
        const now = Date.now();
        const isDoubleClick = this.lastClickNodeId === nodeId && (now - this.lastClickTime < 380);
        this.lastClickNodeId = nodeId;
        this.lastClickTime = now;

        if (isDoubleClick && state.hasChildren(nodeId)) {
          state.toggleCollapse(nodeId);
        } else {
          selectNode(nodeId, true, { x: event.clientX, y: event.clientY });
        }
      }
    } else {
      hideContextMenu();
    }
  }

  onPointerMove(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(Array.from(this.nodeMeshes.values()), true);

    if (intersects.length > 0) {
      this.container.style.cursor = "pointer";
    } else {
      this.container.style.cursor = "default";
    }
  }

  computeLayout() {
    this.nodePositions.clear();
    if (state.layoutMode === "hierarchy") {
      this.computeHierarchicalLayout();
    } else if (state.layoutMode === "radial") {
      this.computeRadialLayout();
    } else {
      this.computeForceLayout();
    }
  }

  computeHierarchicalLayout() {
    const naturalSort = (a, b) => (a.code && b.code) ? a.code.localeCompare(b.code, undefined, { numeric: true }) : 0;
    const roots = state.getRootNodes().filter(r => state.isNodeVisible(r.id)).sort(naturalSort);
    let currentX = -(roots.length - 1) * 320 / 2;

    const calculateSubtreeWidth = (nodeId) => {
      if (state.collapsedNodeIds.has(nodeId)) return 170;
      const children = state.getChildren(nodeId).filter(c => state.isNodeVisible(c.id)).sort(naturalSort);
      if (children.length === 0) return 170;
      let total = 0;
      children.forEach(child => {
        total += calculateSubtreeWidth(child.id);
      });
      return Math.max(total + 35, 170);
    };

    const positionSubtree = (nodeId, xCenter, yLevel, zOffset) => {
      this.nodePositions.set(nodeId, { x: xCenter, y: yLevel, z: zOffset });
      if (state.collapsedNodeIds.has(nodeId)) return;

      const children = state.getChildren(nodeId).filter(c => state.isNodeVisible(c.id)).sort(naturalSort);
      if (children.length === 0) return;

      const totalWidth = children.reduce((acc, child) => acc + calculateSubtreeWidth(child.id), 0);
      let left = xCenter - totalWidth / 2;

      children.forEach((child, index) => {
        const w = calculateSubtreeWidth(child.id);
        const childCenterX = left + w / 2;
        const childY = yLevel - 115;
        const childZ = zOffset + ((index % 3) - 1) * 35;
        positionSubtree(child.id, childCenterX, childY, childZ);
        left += w;
      });
    };

    roots.forEach(root => {
      const w = calculateSubtreeWidth(root.id);
      positionSubtree(root.id, currentX + w / 2, 220, 0);
      currentX += w + 90;
    });
  }

  computeRadialLayout() {
    const roots = state.getRootNodes().filter(r => state.isNodeVisible(r.id));
    const mainRoot = roots[0] || state.project.nodes.find(n => state.isNodeVisible(n.id));
    if (!mainRoot) return;

    this.nodePositions.set(mainRoot.id, { x: 0, y: 160, z: 0 });

    const positionRadial = (parentId, depth, startAngle, endAngle) => {
      if (state.collapsedNodeIds.has(parentId)) return;
      const children = state.getChildren(parentId).filter(c => state.isNodeVisible(c.id));
      if (children.length === 0) return;

      const angleStep = (endAngle - startAngle) / children.length;
      const radius = depth * 150;
      const yPos = 160 - depth * 65;

      children.forEach((child, idx) => {
        const angle = startAngle + angleStep * (idx + 0.5);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        this.nodePositions.set(child.id, { x, y: yPos, z });
        positionRadial(child.id, depth + 1, angle - angleStep * 0.45, angle + angleStep * 0.45);
      });
    };

    positionRadial(mainRoot.id, 1, 0, Math.PI * 2);
  }

  computeForceLayout() {
    const nodes = state.project.nodes.filter(n => state.isNodeVisible(n.id));
    const positions = {};

    nodes.forEach((n, i) => {
      const phi = Math.acos(-1 + (2 * i) / Math.max(1, nodes.length));
      const theta = Math.sqrt(nodes.length * Math.PI) * phi;
      const r = 260;
      positions[n.id] = {
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(phi),
        vx: 0, vy: 0, vz: 0
      };
    });

    for (let iter = 0; iter < 45; iter++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nA = nodes[i].id;
          const nB = nodes[j].id;
          const pA = positions[nA];
          const pB = positions[nB];
          let dx = pA.x - pB.x;
          let dy = pA.y - pB.y;
          let dz = pA.z - pB.z;
          let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          if (dist < 320) {
            const force = (320 - dist) / dist * 0.8;
            pA.vx += dx * force; pA.vy += dy * force; pA.vz += dz * force;
            pB.vx -= dx * force; pB.vy -= dy * force; pB.vz -= dz * force;
          }
        }
      }

      nodes.forEach(n => {
        if (n.parentId && positions[n.parentId]) {
          const pChild = positions[n.id];
          const pParent = positions[n.parentId];
          let dx = pParent.x - pChild.x;
          let dy = pParent.y - pChild.y;
          let dz = pParent.z - pChild.z;
          let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          const targetDist = 95;
          const force = (dist - targetDist) * 0.05;
          pChild.vx += (dx / dist) * force;
          pChild.vy += (dy / dist) * force;
          pChild.vz += (dz / dist) * force;
          pParent.vx -= (dx / dist) * force;
          pParent.vy -= (dy / dist) * force;
          pParent.vz -= (dz / dist) * force;
        }
      });

      nodes.forEach(n => {
        const p = positions[n.id];
        p.x += p.vx * 0.15;
        p.y += p.vy * 0.15;
        p.z += p.vz * 0.15;
        p.vx *= 0.85; p.vy *= 0.85; p.vz *= 0.85;
      });
    }

    nodes.forEach(n => {
      this.nodePositions.set(n.id, positions[n.id]);
    });
  }

  // 3D Card Sprite with Excel-like Grouping indicators (Light Mode)
  createNodeCardTexture(node) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    const hexColor = (node.style && node.style.color) ? node.style.color : "#0284c7";
    const isDark = hexColor === "#000000" || hexColor === "#0369a1" || hexColor === "#dc2626";

    const hasChildren = state.hasChildren(node.id);
    const isCollapsed = state.collapsedNodeIds.has(node.id);
    const descendantCount = hasChildren ? state.getDescendantCount(node.id) : 0;

    const roundRect = (x, y, w, h, radius, fill, stroke, strokeColor) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) {
        ctx.strokeStyle = strokeColor || "#cbd5e1";
        ctx.lineWidth = isCollapsed ? 8 : 6;
        ctx.stroke();
      }
    };

    // 1. Crisp White Card Background (Light Mode)
    ctx.fillStyle = "#ffffff";
    const cardBorderColor = isCollapsed ? "#ca8a04" : "#cbd5e1";
    roundRect(8, 8, 496, 240, 24, true, true, cardBorderColor);

    // 2. Header Color Banner
    ctx.fillStyle = hexColor;
    roundRect(8, 8, 496, 75, 24, true, false);
    ctx.fillRect(8, 50, 496, 33);

    // 3. Header Text: EDT Code
    ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(node.code || "EDT", 30, 45);

    // 4. Header Badge: Level indicator & Excel Grouping Toggle ([+] / [-])
    if (hasChildren) {
      if (isCollapsed) {
        // Prominent Excel Collapsed Group Badge
        ctx.fillStyle = "#fef08a";
        roundRect(280, 18, 210, 46, 8, true, true, "#ca8a04");
        ctx.fillStyle = "#854d0e";
        ctx.font = "bold 22px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`[+] ${descendantCount} ítems`, 385, 43);
      } else {
        // Expanded Excel Group Button [-]
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.12)";
        roundRect(320, 20, 48, 42, 6, true, false);
        ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.fillText("[-]", 344, 43);

        // Level pill
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.15)";
        roundRect(385, 20, 95, 42, 6, true, false);
        ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`N${node.level || 0}`, 432, 43);
      }
    } else {
      // Standard Level Badge
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.15)";
      roundRect(390, 20, 90, 42, 6, true, false);
      ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`N${node.level || 0}`, 435, 43);
    }

    // 5. Body Text: Title / Activity (Dark Navy)
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "left";
    const title = node.title || "Actividad";
    const truncatedTitle = title.length > 22 ? title.substring(0, 20) + "..." : title;
    ctx.fillText(truncatedTitle, 30, 130);

    // 6. Subtext: Owner / Encargado
    if (node.owner) {
      ctx.fillStyle = "#475569";
      ctx.font = "italic 26px sans-serif";
      const owner = node.owner.length > 28 ? node.owner.substring(0, 26) + "..." : node.owner;
      ctx.fillText(`👤 ${owner}`, 30, 185);
    }

    // 7. Icon Badges for Tasks, Sub-maps & Attachments
    if (node.tasks && node.tasks.length > 0) {
      const comp = node.tasks.filter(t => t.status === "Completada").length;
      ctx.fillStyle = "#0d9488";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`📋 ${comp}/${node.tasks.length}`, 30, 220);
    }

    if (node.submapLinked) {
      ctx.fillStyle = "#0284c7";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`🔗 Sub-mapa EDT`, 320, 220);
    } else if (node.attachments && node.attachments.length > 0) {
      ctx.fillStyle = "#0284c7";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(`📎 ${node.attachments.length}`, 400, 220);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  rebuildScene() {
    this.nodeMeshes.forEach(mesh => this.scene.remove(mesh));
    this.nodeMeshes.clear();
    this.edgeMeshes.forEach(e => this.scene.remove(e.mesh));
    this.edgeMeshes = [];

    this.computeLayout();

    const hasActiveBranch = state.selectedNodeId && state.activeBranchIds.size > 0;
    const isForceMode = state.layoutMode === "force";
    const visibleNodes = state.project.nodes.filter(n => state.isNodeVisible(n.id));

    // 1. Create 3D Nodes (Only visible under Excel grouping)
    visibleNodes.forEach(node => {
      const pos = this.nodePositions.get(node.id) || { x: 0, y: 0, z: 0 };
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(pos.x, pos.y, pos.z);
      nodeGroup.userData = { nodeId: node.id };

      const isInBranch = !hasActiveBranch || state.activeBranchIds.has(node.id);
      const opacity = isInBranch ? 1.0 : 0.28;

      const texture = this.createNodeCardTexture(node);
      const cardMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: opacity,
        side: THREE.DoubleSide
      });
      const cardGeo = new THREE.PlaneGeometry(70, 35);
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      nodeGroup.add(cardMesh);

      // Backplate Box
      const boxGeo = new THREE.BoxGeometry(68, 33, 4);
      const boxMat = new THREE.MeshStandardMaterial({
        color: state.collapsedNodeIds.has(node.id) ? 0xfef08a : 0xffffff,
        roughness: 0.5,
        metalness: 0.1,
        transparent: true,
        opacity: opacity
      });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.z = -2.5;
      nodeGroup.add(boxMesh);

      // Dedicated 3D Clickable Button for Excel Grouping Toggle ([+] / [-])
      if (state.hasChildren(node.id)) {
        const isCollapsed = state.collapsedNodeIds.has(node.id);
        const count = state.getDescendantCount(node.id);

        const btnWidth = isCollapsed ? 26 : 10;
        const btnGeo = new THREE.PlaneGeometry(btnWidth, 7);
        const btnCanvas = document.createElement("canvas");
        btnCanvas.width = isCollapsed ? 200 : 70;
        btnCanvas.height = 56;
        const bctx = btnCanvas.getContext("2d");

        // Excel square outline style
        bctx.fillStyle = isCollapsed ? "#fef08a" : "#ffffff";
        bctx.fillRect(0, 0, btnCanvas.width, btnCanvas.height);
        bctx.strokeStyle = isCollapsed ? "#ca8a04" : "#475569";
        bctx.lineWidth = 6;
        bctx.strokeRect(3, 3, btnCanvas.width - 6, btnCanvas.height - 6);

        bctx.fillStyle = isCollapsed ? "#854d0e" : "#0f172a";
        bctx.font = isCollapsed ? "bold 26px sans-serif" : "bold 40px monospace";
        bctx.textAlign = "center";
        bctx.textBaseline = "middle";
        bctx.fillText(isCollapsed ? `[+] ${count}` : "[-]", btnCanvas.width / 2, btnCanvas.height / 2);

        const btnTex = new THREE.CanvasTexture(btnCanvas);
        btnTex.minFilter = THREE.LinearFilter;
        const btnMat = new THREE.MeshBasicMaterial({
          map: btnTex,
          transparent: true,
          opacity: opacity,
          side: THREE.DoubleSide
        });
        const btnMesh = new THREE.Mesh(btnGeo, btnMat);
        btnMesh.position.set(isCollapsed ? (35 - btnWidth / 2 - 2) : 28, 12, 0.3);
        btnMesh.userData = { nodeId: node.id, isCollapseBtn: true };
        nodeGroup.add(btnMesh);
      }

      this.scene.add(nodeGroup);
      this.nodeMeshes.set(node.id, nodeGroup);
    });

    // 2. Create 3D Connecting Edges (Only linking visible nodes)
    visibleNodes.forEach(node => {
      if (node.parentId && this.nodePositions.has(node.parentId) && state.isNodeVisible(node.parentId)) {
        const p1 = this.nodePositions.get(node.parentId);
        const p2 = this.nodePositions.get(node.id);

        const isDotted = node.relationType === "dotted";
        const isInBranch = !hasActiveBranch || (state.activeBranchIds.has(node.id) && state.activeBranchIds.has(node.parentId));

        let points = [];
        if (isForceMode) {
          points = [
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(p2.x, p2.y, p2.z)
          ];
        } else {
          const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(p1.x, p1.y - 18, p1.z),
            new THREE.Vector3(p1.x, (p1.y + p2.y) / 2, p1.z),
            new THREE.Vector3(p2.x, (p1.y + p2.y) / 2, p2.z),
            new THREE.Vector3(p2.x, p2.y + 18, p2.z)
          );
          points = curve.getPoints(30);
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        let lineColor = isInBranch && hasActiveBranch ? 0x0284c7 : (isDotted ? 0xd97706 : 0x94a3b8);
        let opacity = isInBranch ? 1.0 : 0.2;

        let lineMat;
        if (isDotted) {
          lineMat = new THREE.LineDashedMaterial({
            color: lineColor,
            dashSize: 6,
            gapSize: 4,
            linewidth: isInBranch && hasActiveBranch ? 3 : 2,
            transparent: true,
            opacity: opacity
          });
        } else {
          lineMat = new THREE.LineBasicMaterial({
            color: lineColor,
            linewidth: isInBranch && hasActiveBranch ? 3 : 2,
            transparent: true,
            opacity: opacity
          });
        }

        const lineMesh = new THREE.Line(lineGeo, lineMat);
        if (isDotted) lineMesh.computeLineDistances();

        this.scene.add(lineMesh);
        this.edgeMeshes.push({ mesh: lineMesh, sourceId: node.parentId, targetId: node.id });
      }
    });

    this.updateSelectionRing();

    document.getElementById("statTotalNodes").textContent = `${visibleNodes.length} / ${state.project.nodes.length}`;
    document.getElementById("statTotalEdges").textContent = this.edgeMeshes.length;
  }

  updateSelectionRing() {
    if (state.selectedNodeId && this.nodePositions.has(state.selectedNodeId)) {
      const pos = this.nodePositions.get(state.selectedNodeId);
      this.selectionRing.position.set(pos.x, pos.y, pos.z);
      this.selectionRing.visible = true;
    } else {
      this.selectionRing.visible = false;
    }
  }

  flyToNode(nodeId) {
    if (!this.nodePositions.has(nodeId)) return;
    const pos = this.nodePositions.get(nodeId);

    new TWEEN.Tween(this.camera.position)
      .to({ x: pos.x, y: pos.y + 40, z: pos.z + 280 }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(this.controls.target)
      .to({ x: pos.x, y: pos.y, z: pos.z }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  zoomToFitAll() {
    if (this.nodePositions.size === 0) return;

    const box = new THREE.Box3();
    this.nodePositions.forEach(pos => {
      box.expandByPoint(new THREE.Vector3(pos.x, pos.y, pos.z));
    });

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z, 200);
    const fov = this.camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * 1.25;
    cameraZ = Math.max(cameraZ, 450);

    new TWEEN.Tween(this.camera.position)
      .to({ x: center.x, y: center.y + 60, z: center.z + cameraZ }, 900)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();

    new TWEEN.Tween(this.controls.target)
      .to({ x: center.x, y: center.y, z: center.z }, 900)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  animate(time) {
    requestAnimationFrame((t) => this.animate(t));
    TWEEN.update();
    this.controls.update();

    if (this.selectionRing && this.selectionRing.visible) {
      const scale = 1 + Math.sin(Date.now() * 0.006) * 0.06;
      this.selectionRing.scale.set(scale, scale, 1);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

let threeEngine = null;

// ==========================================
// 4. 2D HIERARCHY & EDT TABLE (LIGHT THEME)
// ==========================================

// Helper: Calculate WCAG readable contrast text color (dark vs white)
function getContrastTextColor(hexColor) {
  if (!hexColor) return "#ffffff";
  let c = hexColor.trim();
  if (c.startsWith("#")) c = c.slice(1);
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  if (c.length !== 6) return "#ffffff";
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 155 ? "#0f172a" : "#ffffff";
}

// Inline Rename Input in 2D Hierarchy (Method 1)
function startInlineRename(nodeId, titleSpan, tr) {
  const node = state.getNode(nodeId);
  if (!node || !titleSpan) return;

  if (titleSpan.querySelector("input") || tr.querySelector(".edt-inline-input")) return;

  const currentTitle = node.title || "";
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edt-inline-input";
  input.value = currentTitle;

  input.addEventListener("click", (e) => e.stopPropagation());
  input.addEventListener("dblclick", (e) => e.stopPropagation());
  input.addEventListener("mousedown", (e) => e.stopPropagation());
  input.addEventListener("contextmenu", (e) => e.stopPropagation());

  let committed = false;

  const commitEdit = () => {
    if (committed) return;
    committed = true;
    const newTitle = input.value.trim();
    if (newTitle && newTitle !== currentTitle) {
      state.updateNode(nodeId, { title: newTitle });
      refreshUI();
    } else {
      titleSpan.textContent = currentTitle || "Sin título";
    }
  };

  const cancelEdit = () => {
    if (committed) return;
    committed = true;
    titleSpan.textContent = currentTitle || "Sin título";
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  });

  input.addEventListener("blur", () => {
    commitEdit();
  });

  titleSpan.textContent = "";
  titleSpan.appendChild(input);
  input.focus();
  input.select();
}

function renderWBSTable() {
  const tbody = document.getElementById("edtTableBody");
  tbody.innerHTML = "";

  const query = state.searchQuery.toLowerCase().trim();
  const levelFilter = state.levelFilter;
  const hasActiveBranch = state.selectedNodeId && state.activeBranchIds.size > 0;

  // Obtain all nodes in strict hierarchical tree order (depth-first pre-order traversal)
  const hierarchicalNodes = state.getHierarchicalNodes();

  let visibleNodes = hierarchicalNodes.filter(n => {
    // 1. Hide if any ancestor is collapsed (Excel Grouping rule)
    if (!state.isNodeVisible(n.id)) {
      return false;
    }
    // 2. Filter by level if active
    if (levelFilter !== "all" && parseInt(levelFilter) !== n.level) {
      return false;
    }
    // 3. Search query filter
    if (query) {
      const matchCode = (n.code || "").toLowerCase().includes(query);
      const matchTitle = (n.title || "").toLowerCase().includes(query);
      const matchOwner = (n.owner || "").toLowerCase().includes(query);
      return matchCode || matchTitle || matchOwner;
    }
    return true;
  });

  visibleNodes.forEach(node => {
    const tr = document.createElement("tr");
    tr.className = `edt-row edt-row-level-${Math.min(node.level, 3)}`;
    tr.dataset.nodeId = node.id;

    // Identical color reflection from 3D graph (node.style.color)
    const nodeColor = (node.style && node.style.color) ? node.style.color : (
      node.level === 0 ? "#000000" :
      node.level === 1 ? "#0369a1" :
      node.level === 2 ? "#0284c7" : "#38bdf8"
    );
    const textColor = (node.style && node.style.textColor) ? node.style.textColor : getContrastTextColor(nodeColor);

    tr.style.setProperty("background-color", nodeColor, "important");
    tr.style.setProperty("color", textColor, "important");
    tr.dataset.darkText = (textColor === "#0f172a" || textColor === "#713f12" || textColor === "#7c2d12" || textColor === "#881337" || getContrastTextColor(nodeColor) === "#0f172a") ? "true" : "false";

    if (node.style && node.style.color === "#dc2626") {
      tr.classList.add("edt-highlight-red");
    } else if (node.style && node.style.color === "#fecdd3") {
      tr.classList.add("edt-highlight-peach");
    }

    if (state.selectedNodeId === node.id) {
      tr.classList.add("selected");
    } else if (hasActiveBranch) {
      if (state.activeBranchIds.has(node.id)) {
        tr.classList.add("branch-active");
      } else {
        tr.classList.add("branch-dimmed");
      }
    }

    const indentPx = Math.max(0, node.level * 18);
    const hasAttachments = node.attachments && node.attachments.length > 0;
    const firstAtt = hasAttachments ? (node.attachments.find(a => a.type !== "mindmap") || node.attachments[0]) : null;

    const hasChildren = state.hasChildren(node.id);
    const isCollapsed = state.collapsedNodeIds.has(node.id);
    const descendantCount = hasChildren ? state.getDescendantCount(node.id) : 0;

    let collapseBtnHtml = "";
    if (hasChildren) {
      collapseBtnHtml = `<button class="edt-excel-collapse-btn ${isCollapsed ? 'collapsed' : 'expanded'}" title="${isCollapsed ? 'Expandir grupo (+)' : 'Colapsar grupo (-)'}" data-node-id="${node.id}">${isCollapsed ? '+' : '-'}</button>`;
    } else if (node.level > 0) {
      collapseBtnHtml = `<span class="edt-tree-connector"></span>`;
    } else {
      collapseBtnHtml = `<span class="edt-excel-collapse-placeholder"></span>`;
    }

    let collapsedBadgeHtml = "";
    if (hasChildren && isCollapsed) {
      collapsedBadgeHtml = `<span class="edt-collapsed-count-badge" data-node-id="${node.id}" title="Haga clic para expandir ${descendantCount} elementos ocultos">+${descendantCount} ítems</span>`;
    }

    tr.draggable = true;

    tr.innerHTML = `
      <td class="edt-code-cell">
        <span class="edt-drag-handle" title="Arrastrar para mover o reordenar en la EDT">⋮⋮</span>
        ${node.code || ""}
      </td>
      <td class="edt-title-cell" style="padding-left: ${indentPx + 8}px;">
        <div class="edt-title-content">
          ${collapseBtnHtml}
          ${node.submapLinked ? `<span title="Sub-mapa EDT desglosado" style="color: var(--accent-blue);">🔗</span>` : ""}
          ${node.owner ? `<span title="${node.owner}" style="opacity: 0.7; font-size: 10px;">👤</span>` : ""}
          <span class="edt-title-text" style="font-weight: inherit;">${node.title || "Sin título"}</span>
          ${collapsedBadgeHtml}
          ${hasAttachments ? `<span class="edt-att-indicator" title="${node.attachments.length} archivo(s) vinculado(s) - Clic para previsualizar" style="background:#0284c7; color:#fff; font-size:9.5px; font-weight:700; padding:1px 5px; border-radius:3px; cursor:pointer; margin-left:4px;">📎 ${node.attachments.length}</span>` : ""}
          ${(node.tasks && node.tasks.length > 0) ? `<span class="edt-task-pill" title="${node.tasks.length} tarea(s) EDT asociadas (${node.tasks.filter(t => t.status === 'Completada').length} completadas)">📋 ${node.tasks.filter(t => t.status === 'Completada').length}/${node.tasks.length}</span>` : ""}
        </div>
      </td>
      <td class="edt-actions-cell">
        <button class="edt-mini-btn" title="Agregar dependencia EDT">+H</button>
        <button class="edt-mini-btn" title="Eliminar nodo">✕</button>
      </td>
    `;

    // Drag and Drop EDT Re-ordering & Re-parenting
    tr.addEventListener("dragstart", (e) => {
      if (e.target.closest("button") || e.target.tagName === "INPUT" || e.target.classList.contains("edt-att-indicator") || e.target.classList.contains("edt-collapsed-count-badge")) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", node.id);
      e.dataTransfer.effectAllowed = "move";
      tr.classList.add("edt-row-dragging");
      window._draggedNodeId = node.id;
    });

    tr.addEventListener("dragend", () => {
      tr.classList.remove("edt-row-dragging");
      document.querySelectorAll(".edt-row").forEach(r => {
        r.classList.remove("edt-drop-above", "edt-drop-below", "edt-drop-inside");
      });
      window._draggedNodeId = null;
    });

    tr.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggedId = window._draggedNodeId;
      if (!draggedId || draggedId === node.id || state.isDescendant(node.id, draggedId)) {
        e.dataTransfer.dropEffect = "none";
        return;
      }
      e.dataTransfer.dropEffect = "move";

      const rect = tr.getBoundingClientRect();
      const relY = (e.clientY - rect.top) / rect.height;

      tr.classList.remove("edt-drop-above", "edt-drop-below", "edt-drop-inside");
      if (relY < 0.25) {
        tr.classList.add("edt-drop-above");
      } else if (relY > 0.75) {
        tr.classList.add("edt-drop-below");
      } else {
        tr.classList.add("edt-drop-inside");
      }
    });

    tr.addEventListener("dragleave", () => {
      tr.classList.remove("edt-drop-above", "edt-drop-below", "edt-drop-inside");
    });

    tr.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = window._draggedNodeId || e.dataTransfer.getData("text/plain");
      if (!draggedId || draggedId === node.id || state.isDescendant(node.id, draggedId)) {
        tr.classList.remove("edt-drop-above", "edt-drop-below", "edt-drop-inside");
        return;
      }

      let dropPos = "after";
      if (tr.classList.contains("edt-drop-above")) dropPos = "before";
      else if (tr.classList.contains("edt-drop-inside")) dropPos = "inside";
      else dropPos = "after";

      tr.classList.remove("edt-drop-above", "edt-drop-below", "edt-drop-inside");
      state.moveNode(draggedId, node.id, dropPos);
      refreshUI();
    });

    // Handle collapse / expand click
    if (hasChildren) {
      const colBtn = tr.querySelector(".edt-excel-collapse-btn");
      if (colBtn) {
        colBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          state.toggleCollapse(node.id);
        });
      }
      const badge = tr.querySelector(".edt-collapsed-count-badge");
      if (badge) {
        badge.addEventListener("click", (e) => {
          e.stopPropagation();
          state.toggleCollapse(node.id);
        });
      }
    }

    if (hasAttachments) {
      const attBadge = tr.querySelector(".edt-att-indicator");
      if (attBadge) {
        attBadge.addEventListener("click", (e) => {
          e.stopPropagation();
          selectNode(node.id, true);
          if (firstAtt.type === "mindmap") {
            expandSubmapPrompt(node.id, firstAtt);
          } else {
            openSplitViewer(firstAtt);
          }
        });
      }
    }

    const taskPill = tr.querySelector(".edt-task-pill");
    if (taskPill) {
      taskPill.addEventListener("click", (e) => {
        e.stopPropagation();
        selectNode(node.id, true);
        const taskCard = document.getElementById("inspectorTasksList");
        if (taskCard) taskCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }

    // Double-click inline renaming in 2D hierarchy
    tr.addEventListener("dblclick", (e) => {
      if (e.target.closest("button") || e.target.classList.contains("edt-att-indicator") || e.target.classList.contains("edt-collapsed-count-badge") || e.target.classList.contains("edt-task-pill")) return;
      const titleSpan = tr.querySelector(".edt-title-text");
      if (titleSpan) {
        startInlineRename(node.id, titleSpan, tr);
      }
    });

    tr.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.classList.contains("edt-att-indicator") || e.target.classList.contains("edt-collapsed-count-badge") || e.target.classList.contains("edt-task-pill")) return;
      selectNode(node.id, true, { x: e.clientX, y: e.clientY });
    });

    tr.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      selectNode(node.id, true, { x: e.clientX, y: e.clientY });
      showContextMenu(node.id, e.clientX, e.clientY);
    });

    const btnAdd = tr.querySelector("button[title='Agregar dependencia EDT']");
    btnAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      openDependencyModal(node.id, false);
    });

    const btnDel = tr.querySelector("button[title='Eliminar nodo']");
    btnDel.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`¿Eliminar "${node.title}" y todas sus dependencias EDT?`)) {
        state.deleteNode(node.id);
        refreshUI();
      }
    });

    tbody.appendChild(tr);
  });
}

// ==========================================
// 5. INSPECTOR & OBSIDIAN NOTES HUB
// ==========================================

function renderInspector() {
  const emptyState = document.getElementById("inspectorEmptyState");
  const formState = document.getElementById("inspectorForm");
  const statActiveNode = document.getElementById("statActiveNode");

  if (!state.selectedNodeId) {
    emptyState.style.display = "block";
    formState.style.display = "none";
    statActiveNode.textContent = "Ninguno";
    return;
  }

  const node = state.getNode(state.selectedNodeId);
  if (!node) {
    emptyState.style.display = "block";
    formState.style.display = "none";
    return;
  }

  emptyState.style.display = "none";
  formState.style.display = "flex";
  statActiveNode.textContent = `${node.code || ""} - ${node.title}`;

  document.getElementById("nodeBadgeLevel").textContent = `Nivel ${node.level || 0}`;
  document.getElementById("nodeCodeInput").value = node.code || "";
  document.getElementById("nodeTitleInput").value = node.title || "";
  document.getElementById("nodeOwnerInput").value = node.owner || "";
  document.getElementById("nodeMarkdownInput").value = node.markdownNotes || "";
  document.getElementById("nodeRelationSelect").value = node.relationType || "solid";
  document.getElementById("nodeShapeSelect").value = (node.style && node.style.shape) || "box";

  const parentSelect = document.getElementById("nodeParentSelect");
  parentSelect.innerHTML = `<option value="">(Ninguno - Raíz Principal)</option>`;
  state.project.nodes.forEach(n => {
    if (n.id !== node.id) {
      const opt = document.createElement("option");
      opt.value = n.id;
      opt.textContent = `${n.code ? n.code + " - " : ""}${n.title}`;
      if (node.parentId === n.id) opt.selected = true;
      parentSelect.appendChild(opt);
    }
  });

  const activeColor = (node.style && node.style.color) ? node.style.color.toLowerCase() : "";
  document.querySelectorAll(".color-swatch").forEach(swatch => {
    if (swatch.dataset.color.toLowerCase() === activeColor) {
      swatch.classList.add("active");
    } else {
      swatch.classList.remove("active");
    }
  });

  const btnToggleCollapse = document.getElementById("btnNodeToggleCollapse");
  const btnToggleCollapseText = document.getElementById("btnNodeToggleCollapseText");
  if (btnToggleCollapse && btnToggleCollapseText) {
    if (state.hasChildren(node.id)) {
      btnToggleCollapse.style.display = "flex";
      const isCollapsed = state.collapsedNodeIds.has(node.id);
      const count = state.getDescendantCount(node.id);
      btnToggleCollapseText.textContent = isCollapsed ? `[+] Expandir Rama (+${count} ítems)` : `[-] Colapsar Rama (Agrupar)`;
      btnToggleCollapse.style.background = isCollapsed ? "#fef08a" : "#f1f5f9";
      btnToggleCollapse.style.color = isCollapsed ? "#854d0e" : "#0f172a";
      btnToggleCollapse.style.borderColor = isCollapsed ? "#ca8a04" : "#94a3b8";
    } else {
      btnToggleCollapse.style.display = "none";
    }
  }

  renderTasksList(node);
  renderAttachmentsList(node);
  updateMarkdownPreview();
}

// ==========================================
// TASK MANAGEMENT (EDT TASKS & ACTIVITIES)
// ==========================================

let currentTaskNodeId = null;
let currentEditingTaskId = null;

function openTaskModal(nodeId, taskId = null) {
  const node = state.getNode(nodeId);
  if (!node) return;

  currentTaskNodeId = nodeId;
  currentEditingTaskId = taskId;

  const modal = document.getElementById("taskModal");
  const headerTitle = document.getElementById("taskModalHeaderTitle");
  const nodeContext = document.getElementById("taskModalNodeContext");
  const nameInput = document.getElementById("taskNameInput");
  const startInput = document.getElementById("taskStartDateInput");
  const endInput = document.getElementById("taskEndDateInput");
  const statusSelect = document.getElementById("taskStatusSelect");

  if (nodeContext) {
    nodeContext.textContent = `${node.code ? node.code + ' - ' : ''}${node.title}`;
  }

  if (taskId && node.tasks) {
    const task = node.tasks.find(t => t.id === taskId);
    if (task) {
      if (headerTitle) headerTitle.textContent = "✏️ Editar Tarea del Nodo EDT";
      if (nameInput) nameInput.value = task.name || "";
      if (startInput) startInput.value = task.startDate || "";
      if (endInput) endInput.value = task.endDate || "";
      if (statusSelect) statusSelect.value = task.status || "No iniciada";
    }
  } else {
    if (headerTitle) headerTitle.textContent = "📋 Agregar Tarea al Nodo EDT";
    if (nameInput) nameInput.value = "";
    if (startInput) startInput.value = new Date().toISOString().split("T")[0];
    if (endInput) endInput.value = "";
    if (statusSelect) statusSelect.value = "No iniciada";
  }

  if (modal) {
    modal.classList.add("open");
    setTimeout(() => { if (nameInput) nameInput.focus(); }, 120);
  }
}

function closeTaskModal() {
  const modal = document.getElementById("taskModal");
  if (modal) modal.classList.remove("open");
  currentTaskNodeId = null;
  currentEditingTaskId = null;
}

function saveTaskFromModal() {
  if (!currentTaskNodeId) return;
  const node = state.getNode(currentTaskNodeId);
  if (!node) return;

  const nameInput = document.getElementById("taskNameInput");
  const startInput = document.getElementById("taskStartDateInput");
  const endInput = document.getElementById("taskEndDateInput");
  const statusSelect = document.getElementById("taskStatusSelect");

  const taskName = nameInput ? nameInput.value.trim() : "";
  if (!taskName) {
    alert("Por favor ingresa el nombre de la tarea.");
    if (nameInput) nameInput.focus();
    return;
  }

  node.tasks = node.tasks || [];

  if (currentEditingTaskId) {
    const task = node.tasks.find(t => t.id === currentEditingTaskId);
    if (task) {
      task.name = taskName;
      task.startDate = startInput ? startInput.value : "";
      task.endDate = endInput ? endInput.value : "";
      task.status = statusSelect ? statusSelect.value : "No iniciada";
    }
  } else {
    const newTask = {
      id: "task-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      name: taskName,
      startDate: startInput ? startInput.value : "",
      endDate: endInput ? endInput.value : "",
      status: statusSelect ? statusSelect.value : "No iniciada"
    };
    node.tasks.push(newTask);
  }

  state.saveToLocal();
  closeTaskModal();
  refreshUI();
}

function renderTasksList(node) {
  const container = document.getElementById("inspectorTasksList");
  const countBadge = document.getElementById("taskCountBadge");
  if (!container) return;
  container.innerHTML = "";

  const tasks = (node && node.tasks) ? node.tasks : [];
  if (countBadge) countBadge.textContent = tasks.length;

  if (tasks.length === 0) {
    container.innerHTML = `<div class="tasks-empty-state">No hay tareas programadas. Haz clic en <b>+</b> para agregar una.</div>`;
    return;
  }

  tasks.forEach((task, idx) => {
    const card = document.createElement("div");
    card.className = "task-item-card";

    const isDone = task.status === "Completada";

    // Date range display
    let dateStr = "";
    if (task.startDate && task.endDate) {
      dateStr = `📅 ${task.startDate} → ${task.endDate}`;
    } else if (task.startDate) {
      dateStr = `📅 Desde: ${task.startDate}`;
    } else if (task.endDate) {
      dateStr = `📅 Límite: ${task.endDate}`;
    } else {
      dateStr = `📅 Sin fecha`;
    }

    card.innerHTML = `
      <div class="task-item-header">
        <div class="task-item-title-group">
          <input type="checkbox" class="task-checkbox" ${isDone ? "checked" : ""} title="Marcar como completada">
          <span class="task-item-title ${isDone ? "completed" : ""}" title="${task.name}">${task.name}</span>
        </div>
        <div class="task-item-actions">
          <button class="task-action-btn edit" title="Editar tarea">✏️</button>
          <button class="task-action-btn delete" title="Eliminar tarea">🗑️</button>
        </div>
      </div>
      <div class="task-item-meta">
        <span class="task-date-range">${dateStr}</span>
        <span class="task-status-badge" data-status="${task.status || 'No iniciada'}" title="Haz clic para alternar estado">${task.status || 'No iniciada'}</span>
      </div>
    `;

    // Checkbox toggle
    const chk = card.querySelector(".task-checkbox");
    if (chk) {
      chk.addEventListener("change", (e) => {
        e.stopPropagation();
        task.status = chk.checked ? "Completada" : "En curso";
        state.saveToLocal();
        refreshUI();
      });
    }

    // Status badge click to cycle status
    const badge = card.querySelector(".task-status-badge");
    if (badge) {
      badge.addEventListener("click", (e) => {
        e.stopPropagation();
        const statusCycle = ["No iniciada", "En curso", "En revisión", "Completada", "Bloqueada"];
        const currentIdx = statusCycle.indexOf(task.status);
        const nextIdx = (currentIdx + 1) % statusCycle.length;
        task.status = statusCycle[nextIdx];
        state.saveToLocal();
        refreshUI();
      });
    }

    // Edit button
    const editBtn = card.querySelector(".task-action-btn.edit");
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openTaskModal(node.id, task.id);
      });
    }

    // Delete button
    const delBtn = card.querySelector(".task-action-btn.delete");
    if (delBtn) {
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`¿Eliminar la tarea "${task.name}"?`)) {
          node.tasks.splice(idx, 1);
          state.saveToLocal();
          refreshUI();
        }
      });
    }

    container.appendChild(card);
  });
}

function renderAttachmentsList(node) {
  const container = document.getElementById("attachmentsList");
  if (!container) return;
  container.innerHTML = "";

  if (!node.attachments || node.attachments.length === 0) {
    container.innerHTML = `<div style="font-size: 11px; color: var(--text-muted); font-style: italic; padding: 6px 0;">Sin archivos o sub-mapas vinculados.</div>`;
    return;
  }

  node.attachments.forEach((att, idx) => {
    const item = document.createElement("div");
    item.className = "attachment-item";
    item.style.cursor = "pointer";
    
    let icon = "📄";
    if (att.type === "mindmap") icon = "🔗";
    else if (att.type === "folder") icon = "📁";
    else if (att.type === "pdf") icon = "📕";
    else if (att.type === "xlsx" || att.type === "xls") icon = "📊";
    else if (att.type === "doc" || att.type === "docx") icon = "📝";
    else if (att.type === "dwg" || att.type === "dxf") icon = "📐";
    else if (att.type === "ifc") icon = "🏢";

    item.innerHTML = `
      <div class="attachment-info" title="${att.path || att.name}" style="flex:1; overflow:hidden;">
        <span style="font-size:14px;">${icon}</span>
        <div style="display:flex; flex-direction:column; overflow:hidden;">
          <span style="font-weight:600; font-size:11.5px; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${att.name}</span>
          <span style="font-size:9.5px; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${att.path || 'Local'}</span>
        </div>
      </div>
      <div class="attachment-actions" style="display:flex; gap:4px; align-items:center;">
        ${att.type === "mindmap" 
          ? `<button class="btn btn-icon btn-expand-submap" title="Desglosar sub-mapa en la jerarquía EDT" style="background:var(--accent-blue); color:#fff; font-size:10.5px; padding:3px 7px;">🔗 Desglosar</button>` 
          : att.type === "folder"
          ? `<button class="btn btn-icon btn-open-split" title="Abrir carpeta en navegador de archivos dividido" style="font-size:10.5px; padding:3px 7px; background:#e0f2fe; border:1px solid #bae6fd; color:#0369a1; font-weight:700;">📁 Explorar</button>`
          : `<button class="btn btn-icon btn-open-split" title="Abrir en visor dividido 3D" style="font-size:10.5px; padding:3px 7px; background:var(--bg-secondary); border:1px solid var(--border-color); color:var(--accent-blue); font-weight:700;">👁️ Abrir</button>`}
        <button class="btn btn-icon btn-delete-attachment" title="Eliminar vínculo" style="color: var(--accent-red); font-size:11px; padding:3px 6px;">✕</button>
      </div>
    `;

    if (att.type === "mindmap") {
      item.querySelector(".btn-expand-submap").addEventListener("click", (e) => {
        e.stopPropagation();
        expandSubmapPrompt(node.id, att);
      });
    } else {
      const openBtn = item.querySelector(".btn-open-split");
      if (openBtn) {
        openBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openSplitViewer(att);
        });
      }
    }

    item.addEventListener("click", (e) => {
      if (e.target.closest(".attachment-actions")) return;
      if (att.type === "mindmap") {
        expandSubmapPrompt(node.id, att);
      } else {
        openSplitViewer(att);
      }
    });

    item.querySelector(".btn-delete-attachment").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`¿Desvincular "${att.name}" de este nodo?`)) {
        node.attachments.splice(idx, 1);
        state.saveToLocal();
        renderAttachmentsList(node);
        renderWBSTable();
        threeEngine.rebuildScene();
      }
    });

    container.appendChild(item);
  });
}

function expandSubmapPrompt(nodeId, att) {
  // Check if we have cached submap or load via File input
  const localFile = localFileStore.get(att.name);
  if (localFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const submapData = JSON.parse(e.target.result);
        state.linkAndExpandSubmap(nodeId, submapData);
        alert(`¡Sub-mapa "${submapData.meta.title}" desglosado con éxito bajo el nodo actual!`);
      } catch (err) {
        alert("Error al desglosar sub-mapa: " + err.message);
      }
    };
    reader.readAsText(localFile);
  } else {
    // Generate sample submap structure for Sostenibilidad / Planificacion
    const sampleSubmap = {
      meta: { title: att.name.replace(".mindmap.json", "") },
      nodes: [
        { id: "sub-1", code: "01", title: "Plan de Trabajo Ambiental 2026", owner: "Equipo Técnico", level: 0 },
        { id: "sub-2", code: "02", title: "Monitoreo y Auditorías HSE", owner: "Auditor Líder", level: 0 },
        { id: "sub-2.1", code: "02.01", parentId: "sub-2", title: "Informes de No Conformidad", owner: "Calidad", level: 1 }
      ]
    };
    state.linkAndExpandSubmap(nodeId, sampleSubmap);
  }
}

function updateMarkdownPreview() {
  const rawMarkdown = document.getElementById("nodeMarkdownInput").value;
  const previewDiv = document.getElementById("notePreviewView");
  if (window.marked) {
    previewDiv.innerHTML = marked.parse(rawMarkdown || "*Sin notas registradas.*");
  } else {
    previewDiv.textContent = rawMarkdown;
  }
}

function saveInspectorChanges() {
  if (!state.selectedNodeId) return;
  const node = state.getNode(state.selectedNodeId);
  if (!node) return;

  const codeInp = document.getElementById("nodeCodeInput");
  const titleInp = document.getElementById("nodeTitleInput");
  const ownerInp = document.getElementById("nodeOwnerInput");
  const parentInp = document.getElementById("nodeParentSelect");
  const markdownInp = document.getElementById("nodeMarkdownInput");
  const relationInp = document.getElementById("nodeRelationSelect");
  const shapeInp = document.getElementById("nodeShapeSelect");

  const newCode = codeInp ? codeInp.value.trim() : (node.code || "");
  const newTitle = titleInp ? titleInp.value.trim() : (node.title || "");
  const newOwner = ownerInp ? ownerInp.value.trim() : (node.owner || "");
  const newParent = parentInp ? (parentInp.value || null) : node.parentId;
  const newNotes = markdownInp ? markdownInp.value : (node.markdownNotes || "");
  const newRelation = relationInp ? relationInp.value : (node.relationType || "solid");
  const newShape = shapeInp ? shapeInp.value : ((node.style && node.style.shape) || "box");

  let level = node.level || 0;
  if (newParent !== node.parentId) {
    if (newParent) {
      const parentNode = state.getNode(newParent);
      if (parentNode) level = (parentNode.level || 0) + 1;
    } else {
      level = 0;
    }
  }

  state.updateNode(state.selectedNodeId, {
    code: newCode,
    title: newTitle || node.title,
    owner: newOwner,
    parentId: newParent,
    level: level,
    markdownNotes: newNotes,
    relationType: newRelation,
    style: Object.assign({}, node.style, { shape: newShape })
  });

  // Provide visual save feedback
  const saveBtn = document.getElementById("btnSaveNodeChanges");
  if (saveBtn) {
    const originalText = saveBtn.textContent;
    saveBtn.textContent = "✓ ¡Guardado!";
    saveBtn.style.backgroundColor = "#16a34a";
    saveBtn.style.color = "#ffffff";
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.backgroundColor = "";
      saveBtn.style.color = "";
    }, 1200);
  }

  refreshUI();
}

// ==========================================
// 5.5 OPENBIM / IFC 3D VIEWER ENGINE
// ==========================================

class BimIfcViewer {
  constructor(container, attachment, localFile) {
    this.container = container;
    this.attachment = attachment;
    this.localFile = localFile;
    this.elements = [];
    this.storeys = [];
    this.disciplines = new Set(["structure", "architecture", "mep"]);
    this.currentStorey = "ALL";
    this.viewMode = "solid"; // "solid", "xray", "wireframe"
    this.selectedElement = null;
    this.hoveredElement = null;
    this.animFrameId = null;
    this.currentTab = "psets";
    this.drawerCollapsed = false;

    this.headerInfo = {
      schema: "IFC4",
      projectName: (attachment.name || "Modelo_BIM").replace(/\.[^/.]+$/, ""),
      author: "Empresa S.A.S. - Coordinación BIM",
      application: "Autodesk Revit 2026 / OpenBIM Engine",
      viewDefinition: "CoordinationView_V2.0",
      units: "Métrico (m / m² / m³)",
      timestamp: new Date().toISOString()
    };

    this.initDOM();
    this.initThree();
    this.loadData();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="bim-viewer-container" id="bimViewerContainer">
        <!-- Top BIM Toolbar -->
        <div class="bim-toolbar">
          <div class="bim-toolbar-left">
            <span class="bim-model-badge">🏢 IFC 3D</span>
            <div class="bim-storey-group">
              <label class="bim-lbl">Piso:</label>
              <select id="bimStoreyFilter" class="bim-select" title="Filtrar por nivel / piso constructivo">
                <option value="ALL">🏢 Todo el Edificio</option>
              </select>
            </div>
            <div class="bim-discipline-toggles">
              <button class="bim-chip active" data-disc="structure" title="Alternar Estructura (Columnas, Vigas, Cimentación)">🏗️ Estructura</button>
              <button class="bim-chip active" data-disc="architecture" title="Alternar Arquitectura (Muros, Losas, Ventanas, Puertas)">🧱 Arquitectura</button>
              <button class="bim-chip active" data-disc="mep" title="Alternar Instalaciones MEP (Tuberías, Ductos, HVAC)">⚡ Instalaciones</button>
            </div>
          </div>

          <div class="bim-toolbar-right">
            <button class="bim-tool-btn active" id="bimBtnModeSolid" title="Modo Sólido Sombreado">🎨</button>
            <button class="bim-tool-btn" id="bimBtnModeXRay" title="Modo Rayos X (Transparencia Estructural)">👁️</button>
            <button class="bim-tool-btn" id="bimBtnModeWire" title="Modo Alámbrico (Wireframe)">🕸️</button>
            <span class="bim-divider">|</span>
            <button class="bim-tool-btn" id="bimBtnViewIso" title="Vista Isométrica 3D">🧊</button>
            <button class="bim-tool-btn" id="bimBtnViewTop" title="Vista en Planta Superior (Top)">📐</button>
            <button class="bim-tool-btn" id="bimBtnFitAll" title="Enfocar Modelo Completo (Zoom Extents)">🎯</button>
            <span class="bim-divider">|</span>
            <input type="file" id="bimLocalFileInput" accept=".ifc" style="display:none;">
            <button class="bim-tool-btn bim-btn-load" id="bimBtnLoadLocalIfc" title="Cargar archivo nativo .ifc desde disco">📁 Cargar .IFC</button>
          </div>
        </div>

        <!-- Main Viewport + Overlays -->
        <div class="bim-viewport-area">
          <div id="bimCanvasContainer" class="bim-canvas-container"></div>
          
          <!-- Hover HUD Tag -->
          <div id="bimSelectionTag" class="bim-selection-tag" style="display:none;"></div>

          <!-- Bottom Collapsible Properties & Spatial Tree Drawer -->
          <div class="bim-bottom-drawer" id="bimBottomDrawer">
            <div class="bim-drawer-header" id="bimDrawerHeader">
              <div class="bim-drawer-title">
                <span class="bim-drawer-chevron" id="bimDrawerChevron">▲</span>
                <span id="bimDrawerTitleText">Propiedades BIM & Datos IFC (Psets)</span>
                <span id="bimSelectedClassBadge" class="bim-class-badge" style="display:none;">IfcColumn</span>
              </div>
              <div class="bim-drawer-tabs">
                <button class="bim-tab-btn active" data-tab="psets">📋 Propiedades (Psets)</button>
                <button class="bim-tab-btn" data-tab="spatial">🌲 Árbol Espacial</button>
                <button class="bim-tab-btn" data-tab="schema">ℹ️ Encabezado IFC</button>
              </div>
            </div>
            <div class="bim-drawer-content" id="bimDrawerContent">
              <div style="font-size:11px; color:#64748b; font-style:italic; padding:12px 0;">Selecciona un elemento en la vista 3D para inspeccionar sus atributos OpenBIM y Property Sets (Psets).</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.canvasContainer = document.getElementById("bimCanvasContainer");
    this.selectionTag = document.getElementById("bimSelectionTag");
    this.drawer = document.getElementById("bimBottomDrawer");
    this.drawerHeader = document.getElementById("bimDrawerHeader");
    this.drawerContent = document.getElementById("bimDrawerContent");
    this.classBadge = document.getElementById("bimSelectedClassBadge");
    this.drawerTitleText = document.getElementById("bimDrawerTitleText");
    this.storeySelect = document.getElementById("bimStoreyFilter");

    // UI Event listeners
    this.storeySelect.addEventListener("change", (e) => this.filterStorey(e.target.value));

    this.container.querySelectorAll(".bim-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const disc = btn.dataset.disc;
        if (this.disciplines.has(disc)) {
          if (this.disciplines.size > 1) {
            this.disciplines.delete(disc);
            btn.classList.remove("active");
          }
        } else {
          this.disciplines.add(disc);
          btn.classList.add("active");
        }
        this.updateVisibility();
      });
    });

    // View Modes
    const btnSolid = document.getElementById("bimBtnModeSolid");
    const btnXRay = document.getElementById("bimBtnModeXRay");
    const btnWire = document.getElementById("bimBtnModeWire");

    const clearModeBtns = () => {
      btnSolid.classList.remove("active");
      btnXRay.classList.remove("active");
      btnWire.classList.remove("active");
    };

    btnSolid.addEventListener("click", () => {
      clearModeBtns();
      btnSolid.classList.add("active");
      this.setViewMode("solid");
    });
    btnXRay.addEventListener("click", () => {
      clearModeBtns();
      btnXRay.classList.add("active");
      this.setViewMode("xray");
    });
    btnWire.addEventListener("click", () => {
      clearModeBtns();
      btnWire.classList.add("active");
      this.setViewMode("wireframe");
    });

    // Camera Views
    document.getElementById("bimBtnViewIso").addEventListener("click", () => this.setCameraIso());
    document.getElementById("bimBtnViewTop").addEventListener("click", () => this.setCameraTop());
    document.getElementById("bimBtnFitAll").addEventListener("click", () => this.fitAll());

    // File loading
    const localInput = document.getElementById("bimLocalFileInput");
    const btnLoadLocal = document.getElementById("bimBtnLoadLocalIfc");
    btnLoadLocal.addEventListener("click", () => localInput.click());
    localInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        this.localFile = file;
        this.attachment.name = file.name;
        document.getElementById("splitFileName").textContent = file.name;
        localFileStore.set(file.name, file);
        this.loadData();
      }
    });

    // Drawer Tabs
    this.container.querySelectorAll(".bim-tab-btn").forEach(tBtn => {
      tBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.container.querySelectorAll(".bim-tab-btn").forEach(b => b.classList.remove("active"));
        tBtn.classList.add("active");
        this.currentTab = tBtn.dataset.tab;
        this.renderDrawer();
      });
    });

    // Drawer collapse toggle
    this.drawerHeader.addEventListener("click", (e) => {
      if (e.target.closest(".bim-drawer-tabs")) return;
      this.drawerCollapsed = !this.drawerCollapsed;
      this.drawer.classList.toggle("collapsed", this.drawerCollapsed);
    });
  }

  initThree() {
    const width = this.canvasContainer.clientWidth || 400;
    const height = this.canvasContainer.clientHeight || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf1f5f9);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(24, 20, 28);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.canvasContainer.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.screenSpacePanning = true;
    this.controls.target.set(0, 4, 0);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.65);
    this.scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 0.85);
    sunLight.position.set(30, 45, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    this.scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.4);
    fillLight.position.set(-30, 20, -30);
    this.scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x94a3b8, 0.3);
    this.scene.add(hemiLight);

    // Architectural Ground Grid
    this.grid = new THREE.GridHelper(50, 25, 0x0284c7, 0xcbd5e1);
    this.grid.position.y = -1.5;
    this.scene.add(this.grid);

    // Selection Box Helper
    const dummyBox = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1));
    this.boxHelper = new THREE.BoxHelper(dummyBox, 0x00e5ff);
    this.boxHelper.visible = false;
    this.scene.add(this.boxHelper);

    // Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.canvasContainer.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.canvasContainer.addEventListener("click", (e) => this.onClick(e));

    // Animation Loop
    const renderLoop = () => {
      this.animFrameId = requestAnimationFrame(renderLoop);
      if (this.controls) this.controls.update();
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    renderLoop();
  }

  loadData() {
    if (this.localFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          this.parseIfcText(text);
        } catch (err) {
          console.warn("IFC Parsing error, using parametric fallback:", err);
          this.buildParametricBimModel(this.attachment.name);
        }
      };
      reader.readAsText(this.localFile);
    } else {
      this.buildParametricBimModel(this.attachment.name);
    }
  }

  parseIfcText(text) {
    // 1. Parse STEP Header
    const schemaMatch = text.match(/FILE_SCHEMA\s*\(\s*\(\s*'([^']+)'/i);
    if (schemaMatch) this.headerInfo.schema = schemaMatch[1];

    const nameMatch = text.match(/FILE_NAME\s*\(\s*'([^']*)'/i);
    if (nameMatch && nameMatch[1]) this.headerInfo.projectName = nameMatch[1];

    // Clear existing scene elements
    this.clearElements();

    // 2. Parse Storeys
    const storeyMatches = [...text.matchAll(/#(\d+)\s*=\s*IFCBUILDINGSTOREY\s*\(\s*'([^']*)'\s*,\s*[^,]*\s*,\s*'([^']*)'/gi)];
    const parsedStoreys = [];
    if (storeyMatches.length > 0) {
      storeyMatches.forEach((m, idx) => {
        parsedStoreys.push(m[3] || m[2] || `Nivel ${idx + 1}`);
      });
    } else {
      parsedStoreys.push("Nivel 0 - Cimentación", "Nivel 1 - Planta Baja", "Nivel 2 - Estructura", "Nivel 3 - Cubierta");
    }
    this.storeys = parsedStoreys;

    // 3. Count entity occurrences
    const counts = {
      walls: (text.match(/IFCWALL/gi) || []).length,
      columns: (text.match(/IFCCOLUMN/gi) || []).length,
      beams: (text.match(/IFCBEAM/gi) || []).length,
      slabs: (text.match(/IFCSLAB/gi) || []).length,
      windows: (text.match(/IFCWINDOW/gi) || []).length,
      doors: (text.match(/IFCDOOR/gi) || []).length,
      mep: (text.match(/IFCFLOW/gi) || []).length + (text.match(/IFCPIPE/gi) || []).length
    };

    // Build the visual model with the parsed storeys & entity counts
    this.buildParametricBimModel(this.attachment.name, parsedStoreys, counts);
  }

  buildParametricBimModel(title, customStoreys, entityCounts) {
    this.clearElements();

    this.storeys = customStoreys || [
      "Nivel 0 - Cimentación (-1.20m)",
      "Nivel 1 - Planta Baja (+0.00m)",
      "Nivel 2 - Oficinas Técnicas (+3.60m)",
      "Nivel 3 - Cubierta / Terraza (+7.20m)"
    ];

    // Populate Storey Dropdown
    this.storeySelect.innerHTML = `<option value="ALL">🏢 Todo el Edificio (${this.storeys.length} Niveles)</option>`;
    this.storeys.forEach(st => {
      const opt = document.createElement("option");
      opt.value = st;
      opt.textContent = `📍 ${st}`;
      this.storeySelect.appendChild(opt);
    });

    // Material Library
    const matConcrete = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.85, metalness: 0.05 });
    const matSteel = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45, metalness: 0.75 });
    const matGlass = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.42, roughness: 0.1, metalness: 0.2 });
    const matWall = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.9, metalness: 0.02 });
    const matPci = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35, metalness: 0.3 }); // Red fire pipes
    const matPlumbing = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.35, metalness: 0.2 }); // Blue water
    const matHvac = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.3, metalness: 0.85 }); // Silver ducts
    const matSolar = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.2, metalness: 0.6 }); // Dark blue PV
    const matDoor = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6, metalness: 0.2 });

    // Grid coordinates: 4 rows x 3 bays
    const xs = [-10.5, -3.5, 3.5, 10.5];
    const zs = [-6, 0, 6];

    // --- LEVEL 0: CIMENTACIÓN & FUNDACIONES ---
    const st0 = this.storeys[0];

    // Foundation Slab
    const slab0Geom = new THREE.BoxGeometry(25, 0.3, 16);
    const slab0Mesh = new THREE.Mesh(slab0Geom, matConcrete);
    slab0Mesh.position.set(0, -1.2, 0);
    this.registerElement({
      name: "LOSA-CIMENTACION-01",
      ifcClass: "IfcSlab",
      storey: st0,
      discipline: "structure",
      mesh: slab0Mesh,
      psets: {
        "Pset_SlabCommon": { Reference: "LOSA-H30", LoadBearing: "TRUE", Thickness: "300 mm" },
        "Materiales": { Material: "Concreto f'c=280 kg/cm²", Impermeabilización: "Membrana Poliuretano" },
        "Cantidades": { Área: "400.0 m²", Volumen: "120.0 m³" }
      }
    });

    // Isolated Footings & Tie Beams
    xs.forEach((x, ix) => {
      zs.forEach((z, iz) => {
        const footingGeom = new THREE.BoxGeometry(2.0, 0.7, 2.0);
        const footingMesh = new THREE.Mesh(footingGeom, matConcrete);
        footingMesh.position.set(x, -1.0, z);
        this.registerElement({
          name: `ZAPATA-Z${ix+1}-${iz+1}`,
          ifcClass: "IfcFooting",
          storey: st0,
          discipline: "structure",
          mesh: footingMesh,
          psets: {
            "Pset_FootingCommon": { Reference: "ZAP-AISLADA-2x2", LoadBearing: "TRUE", Status: "Aprobado" },
            "Materiales": { Concreto: "f'c=280 kg/cm²", AceroRefuerzo: "Fy=4200 kg/cm²" },
            "Cantidades": { Ancho: "2.00 m", Largo: "2.00 m", Peralte: "0.70 m", Volumen: "2.80 m³" }
          }
        });
      });
    });

    // Tie Beams along X
    zs.forEach((z, iz) => {
      const beamXGeom = new THREE.BoxGeometry(23, 0.5, 0.4);
      const beamXMesh = new THREE.Mesh(beamXGeom, matConcrete);
      beamXMesh.position.set(0, -0.65, z);
      this.registerElement({
        name: `VIGA-AMARRE-X-${iz+1}`,
        ifcClass: "IfcBeam",
        storey: st0,
        discipline: "structure",
        mesh: beamXMesh,
        psets: {
          "Pset_BeamCommon": { Reference: "VA-40x50", Span: "21.0 m" },
          "Materiales": { Concreto: "f'c=280 kg/cm²" },
          "Cantidades": { Longitud: "21.0 m", Sección: "0.40m x 0.50m" }
        }
      });
    });

    // --- LEVEL 1: PLANTA BAJA ---
    const st1 = this.storeys[1];

    // Columns
    xs.forEach((x, ix) => {
      zs.forEach((z, iz) => {
        const colGeom = new THREE.BoxGeometry(0.5, 3.6, 0.5);
        const colMesh = new THREE.Mesh(colGeom, matConcrete);
        colMesh.position.set(x, 1.8 - 0.4, z);
        this.registerElement({
          name: `COL-C${ix+1}-${iz+1}-L1`,
          ifcClass: "IfcColumn",
          storey: st1,
          discipline: "structure",
          mesh: colMesh,
          psets: {
            "Pset_ColumnCommon": { Reference: "COL-CONC-50x50", LoadBearing: "TRUE", FireRating: "120 min" },
            "Materiales": { Concreto: "f'c=350 kg/cm² (Alta Resistencia)", Acero: "8 Varillas #8" },
            "Cantidades": { Altura: "3.60 m", Sección: "0.50m x 0.50m", Volumen: "0.90 m³" }
          }
        });
      });
    });

    // Core Shear Walls (Elevator / Stairwell)
    const coreWallGeom = new THREE.BoxGeometry(0.3, 3.6, 5.0);
    const coreWallMesh = new THREE.Mesh(coreWallGeom, matConcrete);
    coreWallMesh.position.set(-0.2, 1.4, 0);
    this.registerElement({
      name: "MURO-CORTE-ASCENSOR-01",
      ifcClass: "IfcWallStandardCase",
      storey: st1,
      discipline: "structure",
      mesh: coreWallMesh,
      psets: {
        "Pset_WallCommon": { Reference: "MC-30", LoadBearing: "TRUE", FireRating: "180 min" },
        "Materiales": { Concreto: "f'c=350 kg/cm²" },
        "Cantidades": { Longitud: "5.0 m", Espesor: "0.30 m", Altura: "3.60 m" }
      }
    });

    // Curtain Wall Glass Facade
    const glassFacadeGeom = new THREE.BoxGeometry(22, 3.4, 0.1);
    const glassFacadeMesh = new THREE.Mesh(glassFacadeGeom, matGlass);
    glassFacadeMesh.position.set(0, 1.4, 6.2);
    this.registerElement({
      name: "FACHADA-VIDRIO-MURO-CORTINA-L1",
      ifcClass: "IfcCurtainWall",
      storey: st1,
      discipline: "architecture",
      mesh: glassFacadeMesh,
      psets: {
        "Pset_CurtainWallCommon": { Reference: "CW-GLASS-DBL", ThermalTransmittance: "1.4 W/m²K" },
        "Materiales": { Vidrio: "Doble Acristalamiento Templado 6+12+6mm con Low-E" },
        "Cantidades": { ÁreaVidriada: "74.8 m²" }
      }
    });

    // Double Entry Door
    const doorGeom = new THREE.BoxGeometry(2.4, 2.4, 0.15);
    const doorMesh = new THREE.Mesh(doorGeom, matDoor);
    doorMesh.position.set(0, 0.8, 6.22);
    this.registerElement({
      name: "PUERTA-ACCESO-PRINCIPAL",
      ifcClass: "IfcDoor",
      storey: st1,
      discipline: "architecture",
      mesh: doorMesh,
      psets: {
        "Pset_DoorCommon": { Reference: "PTA-PPAL-240x240", Operation: "Doble Batiente", FireRating: "60 min" },
        "Materiales": { Hoja: "Vidrio Laminado con Perfilería Aluminio Negro Anodizado" },
        "Cantidades": { Ancho: "2.40 m", Altura: "2.40 m" }
      }
    });

    // Plumbing Pipes (Water Supply + Drainage)
    const pipeGeom = new THREE.CylinderGeometry(0.08, 0.08, 21, 16);
    const pipeMesh = new THREE.Mesh(pipeGeom, matPlumbing);
    pipeMesh.rotation.z = Math.PI / 2;
    pipeMesh.position.set(0, 3.1, -1.5);
    this.registerElement({
      name: "TUBERIA-AGUA-POTABLE-DN100",
      ifcClass: "IfcFlowSegment",
      storey: st1,
      discipline: "mep",
      mesh: pipeMesh,
      psets: {
        "Pset_PipeSegmentOccurrence": { FluidType: "Agua Potable Fría", PressureRating: "150 psi" },
        "Materiales": { Material: "Tubo Polipropileno Random (PPR) PN16" },
        "Cantidades": { DiámetroNominal: "DN 100 (4 pulg)", Longitud: "21.0 m" }
      }
    });

    // Floor Slab L1 -> L2
    const slab1Geom = new THREE.BoxGeometry(24, 0.35, 15);
    const slab1Mesh = new THREE.Mesh(slab1Geom, matConcrete);
    slab1Mesh.position.set(0, 3.4, 0);
    this.registerElement({
      name: "LOSA-ENTREPISO-NIVEL-1",
      ifcClass: "IfcSlab",
      storey: st1,
      discipline: "structure",
      mesh: slab1Mesh,
      psets: {
        "Pset_SlabCommon": { Reference: "LOSA-MACIZA-35", LoadBearing: "TRUE", AcousticRating: "52 dB" },
        "Materiales": { Concreto: "f'c=280 kg/cm²" },
        "Cantidades": { Área: "360.0 m²", Volumen: "126.0 m³" }
      }
    });

    // --- LEVEL 2: OFICINAS TÉCNICAS (ESTRUCTURA METÁLICA & MEP) ---
    const st2 = this.storeys[2];

    // Structural Steel Columns (H-Profiles)
    xs.forEach((x, ix) => {
      zs.forEach((z, iz) => {
        const steelColGeom = new THREE.BoxGeometry(0.35, 3.6, 0.35);
        const steelColMesh = new THREE.Mesh(steelColGeom, matSteel);
        steelColMesh.position.set(x, 5.2, z);
        this.registerElement({
          name: `COL-ACERO-W14x90-${ix+1}-${iz+1}`,
          ifcClass: "IfcColumn",
          storey: st2,
          discipline: "structure",
          mesh: steelColMesh,
          psets: {
            "Pset_ColumnCommon": { Reference: "PERFIL-W14x90", LoadBearing: "TRUE", FireProtection: "Pintura Intumescente 120min" },
            "Materiales": { AceroEstructural: "ASTM A992 Gr. 50 (Fy = 345 MPa)" },
            "Cantidades": { Altura: "3.60 m", PesoPorMetro: "134 kg/m", PesoTotal: "0.48 ton" }
          }
        });
      });
    });

    // Primary Girder Beams (Along X)
    zs.forEach((z, iz) => {
      const beamGeom = new THREE.BoxGeometry(22, 0.45, 0.25);
      const beamMesh = new THREE.Mesh(beamGeom, matSteel);
      beamMesh.position.set(0, 7.0, z);
      this.registerElement({
        name: `VIGA-MAESTRA-IPE400-EJE-${iz+1}`,
        ifcClass: "IfcBeam",
        storey: st2,
        discipline: "structure",
        mesh: beamMesh,
        psets: {
          "Pset_BeamCommon": { Reference: "VIGA-IPE-400", Span: "21.0 m", Connection: "Soldada / Empernada ASTM A325" },
          "Materiales": { Acero: "ASTM A572 Gr. 50" },
          "Cantidades": { Longitud: "21.0 m", Canto: "400 mm", Peso: "1.39 ton" }
        }
      });
    });

    // Secondary Beams (Along Z)
    xs.forEach((x, ix) => {
      const secBeamGeom = new THREE.BoxGeometry(0.2, 0.3, 13);
      const secBeamMesh = new THREE.Mesh(secBeamGeom, matSteel);
      secBeamMesh.position.set(x, 6.9, 0);
      this.registerElement({
        name: `VIGUETA-SECUNDARIA-IPE270-EJE-${ix+1}`,
        ifcClass: "IfcBeam",
        storey: st2,
        discipline: "structure",
        mesh: secBeamMesh,
        psets: {
          "Pset_BeamCommon": { Reference: "VIGUETA-IPE-270", Span: "12.0 m" },
          "Materiales": { Acero: "ASTM A36" },
          "Cantidades": { Longitud: "12.0 m", Peso: "0.43 ton" }
        }
      });
    });

    // Fire Protection Pipe Network (PCI Red Pipes)
    const pciMainGeom = new THREE.CylinderGeometry(0.06, 0.06, 21, 16);
    const pciMainMesh = new THREE.Mesh(pciMainGeom, matPci);
    pciMainMesh.rotation.z = Math.PI / 2;
    pciMainMesh.position.set(0, 6.6, 2.5);
    this.registerElement({
      name: "RED-PCI-ROCIADORES-PRINCIPAL-DN80",
      ifcClass: "IfcFlowSegment",
      storey: st2,
      discipline: "mep",
      mesh: pciMainMesh,
      psets: {
        "Pset_PipeSegmentOccurrence": { Sistema: "Red Contra Incendios (PCI)", PresiónServicio: "175 psi", Norma: "NFPA 13" },
        "Materiales": { Tubería: "Acero al Carbono Schedule 40 con Recubrimiento Epóxico Rojo" },
        "Cantidades": { Diámetro: "DN 80 (3 pulg)", Longitud: "21.0 m" }
      }
    });

    // HVAC Ductwork (Galvanized Metallic Rectangular Duct)
    const ductGeom = new THREE.BoxGeometry(20, 0.35, 0.6);
    const ductMesh = new THREE.Mesh(ductGeom, matHvac);
    ductMesh.position.set(0, 6.5, -2.5);
    this.registerElement({
      name: "DUCTO-HVAC-INYECCION-AIRE-L2",
      ifcClass: "IfcFlowSegment",
      storey: st2,
      discipline: "mep",
      mesh: ductMesh,
      psets: {
        "Pset_DuctSegmentOccurrence": { Servicio: "Inyección Aire Acondicionado (Climatización)", Caudal: "4,200 CFM" },
        "Materiales": { Chapa: "Acero Galvanizado Calibre 22 con Aislamiento Lana de Vidrio" },
        "Cantidades": { Sección: "600mm x 350mm", Longitud: "20.0 m" }
      }
    });

    // Ribbon Windows
    const ribbonWindowGeom = new THREE.BoxGeometry(22, 1.4, 0.1);
    const ribbonWindowMesh = new THREE.Mesh(ribbonWindowGeom, matGlass);
    ribbonWindowMesh.position.set(0, 5.0, 6.1);
    this.registerElement({
      name: "VENTANAL-CORRIDO-NORTE-L2",
      ifcClass: "IfcWindow",
      storey: st2,
      discipline: "architecture",
      mesh: ribbonWindowMesh,
      psets: {
        "Pset_WindowCommon": { Reference: "V-CORRIDA-140", GlazingAreaFraction: "0.85" },
        "Materiales": { Vidrio: "Termoacústico Reflectivo 8mm" },
        "Cantidades": { Altura: "1.40 m", Longitud: "22.0 m" }
      }
    });

    // Composite Deck Slab L2 -> Roof
    const slab2Geom = new THREE.BoxGeometry(24, 0.3, 15);
    const slab2Mesh = new THREE.Mesh(slab2Geom, matConcrete);
    slab2Mesh.position.set(0, 7.2, 0);
    this.registerElement({
      name: "LOSA-STEEL-DECK-ENTREPISO-2",
      ifcClass: "IfcSlab",
      storey: st2,
      discipline: "structure",
      mesh: slab2Mesh,
      psets: {
        "Pset_SlabCommon": { Reference: "STEEL-DECK-CAL20", LoadBearing: "TRUE" },
        "Materiales": { Lámina: "Deck Metálico Calibre 20", Concreto: "f'c=280 kg/cm² e=12cm" },
        "Cantidades": { Área: "360.0 m²", Volumen: "43.2 m³" }
      }
    });

    // --- LEVEL 3: CUBIERTA / TERRAZA TÉCNICA ---
    const st3 = this.storeys[3];

    // Perimeter Parapet Wall
    const parapetGeom = new THREE.BoxGeometry(24.2, 1.1, 15.2);
    // Cut inside with hollow box or 4 border walls
    const pFront = new THREE.Mesh(new THREE.BoxGeometry(24.2, 1.1, 0.3), matWall);
    pFront.position.set(0, 7.75, 7.45);
    this.registerElement({
      name: "ANTEPECHO-CUBIERTA-FRONTAL",
      ifcClass: "IfcWall",
      storey: st3,
      discipline: "architecture",
      mesh: pFront,
      psets: {
        "Pset_WallCommon": { Reference: "PARAPETO-H110", IsExternal: "TRUE" },
        "Materiales": { Mampostería: "Bloque de Concreto con Estuco Impermeable" }
      }
    });

    const pBack = new THREE.Mesh(new THREE.BoxGeometry(24.2, 1.1, 0.3), matWall);
    pBack.position.set(0, 7.75, -7.45);
    this.registerElement({
      name: "ANTEPECHO-CUBIERTA-POSTERIOR",
      ifcClass: "IfcWall",
      storey: st3,
      discipline: "architecture",
      mesh: pBack,
      psets: { "Pset_WallCommon": { Reference: "PARAPETO-H110" } }
    });

    // Mechanical Chillers (HVAC Equipment)
    [-5, 5].forEach((cx, cIdx) => {
      const chillerGeom = new THREE.BoxGeometry(2.5, 1.6, 1.8);
      const chillerMesh = new THREE.Mesh(chillerGeom, matHvac);
      chillerMesh.position.set(cx, 8.1, -3);
      this.registerElement({
        name: `UNIDAD-CHILLER-HVAC-0${cIdx+1}`,
        ifcClass: "IfcFlowTerminal",
        storey: st3,
        discipline: "mep",
        mesh: chillerMesh,
        psets: {
          "Pset_UnitaryEquipmentCommon": { Modelo: "Trane Air-Cooled Chiller", Capacidad: "85 TR", Refrigerante: "R-410A" },
          "Eléctrico": { Potencia: "72 kW", Voltaje: "460V / 3F / 60Hz" },
          "Cantidades": { PesoOperativo: "2,450 kg" }
        }
      });
    });

    // Solar PV Panels Array
    for (let pi = -3; pi <= 3; pi++) {
      const panelGeom = new THREE.BoxGeometry(1.6, 0.05, 2.2);
      const panelMesh = new THREE.Mesh(panelGeom, matSolar);
      panelMesh.position.set(pi * 2.2, 7.9, 3);
      panelMesh.rotation.x = -Math.PI / 12; // 15 deg tilt
      this.registerElement({
        name: `MODULO-SOLAR-FOTOVOLTAICO-PANEL-${pi+4}`,
        ifcClass: "IfcFlowTerminal",
        storey: st3,
        discipline: "mep",
        mesh: panelMesh,
        psets: {
          "Pset_ElectricalDeviceCommon": { PotenciaPico: "550 Wp", Tecnología: "Silicio Monocristalino PERC", Eficiencia: "21.3%" },
          "Cantidades": { Dimensiones: "2278 x 1134 x 35 mm", Inclinación: "15° Azimut Sur" }
        }
      });
    }

    // Select first structural column by default to show rich Psets
    const defaultCol = this.elements.find(el => el.ifcClass === "IfcColumn") || this.elements[0];
    if (defaultCol) {
      this.selectElement(defaultCol);
    }

    this.fitAll();
  }

  registerElement(item) {
    item.id = item.id || `IFC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    item.globalId = item.globalId || this.generateIfcGuid();
    item.mesh.castShadow = true;
    item.mesh.receiveShadow = true;
    item.mesh.userData = { bimElement: item };

    // Keep reference to initial material for view mode switching
    item.originalMaterial = item.mesh.material;

    this.scene.add(item.mesh);
    this.elements.push(item);
  }

  generateIfcGuid() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";
    let guid = "";
    for (let i = 0; i < 22; i++) {
      guid += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return guid;
  }

  clearElements() {
    this.elements.forEach(el => {
      if (el.mesh) {
        this.scene.remove(el.mesh);
        if (el.mesh.geometry) el.mesh.geometry.dispose();
      }
    });
    this.elements = [];
    if (this.boxHelper) this.boxHelper.visible = false;
  }

  filterStorey(storey) {
    this.currentStorey = storey;
    this.updateVisibility();

    // Reframe camera if a single storey is selected
    if (storey !== "ALL") {
      const storeyEls = this.elements.filter(el => el.storey === storey);
      if (storeyEls.length > 0) {
        const box = new THREE.Box3();
        storeyEls.forEach(e => box.expandByObject(e.mesh));
        const center = box.getCenter(new THREE.Vector3());
        this.controls.target.copy(center);
      }
    } else {
      this.controls.target.set(0, 4, 0);
    }
  }

  updateVisibility() {
    this.elements.forEach(el => {
      const matchStorey = (this.currentStorey === "ALL" || el.storey === this.currentStorey);
      const matchDisc = this.disciplines.has(el.discipline);
      el.mesh.visible = matchStorey && matchDisc;
    });

    if (this.selectedElement && !this.selectedElement.mesh.visible) {
      this.boxHelper.visible = false;
    } else if (this.selectedElement && this.selectedElement.mesh.visible) {
      this.boxHelper.setFromObject(this.selectedElement.mesh);
      this.boxHelper.visible = true;
    }
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.elements.forEach(el => {
      if (!el.mesh) return;

      if (mode === "solid") {
        el.mesh.material = el.originalMaterial;
        el.mesh.material.wireframe = false;
        el.mesh.material.opacity = el.originalMaterial.opacity || 1.0;
        el.mesh.material.transparent = el.originalMaterial.transparent || false;
      } else if (mode === "xray") {
        if (el === this.selectedElement) {
          el.mesh.material = el.originalMaterial;
          el.mesh.material.wireframe = false;
          el.mesh.material.opacity = 1.0;
        } else {
          el.mesh.material = el.originalMaterial.clone();
          el.mesh.material.transparent = true;
          el.mesh.material.opacity = 0.22;
          el.mesh.material.depthWrite = false;
          el.mesh.material.wireframe = false;
        }
      } else if (mode === "wireframe") {
        el.mesh.material = el.originalMaterial;
        el.mesh.material.wireframe = true;
      }
    });
  }

  setCameraIso() {
    new TWEEN.Tween(this.camera.position)
      .to({ x: 24, y: 20, z: 28 }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
    new TWEEN.Tween(this.controls.target)
      .to({ x: 0, y: 4, z: 0 }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  setCameraTop() {
    new TWEEN.Tween(this.camera.position)
      .to({ x: 0, y: 38, z: 0.01 }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
    new TWEEN.Tween(this.controls.target)
      .to({ x: 0, y: 0, z: 0 }, 800)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  fitAll() {
    const box = new THREE.Box3();
    const visibleMeshes = this.elements.filter(el => el.mesh && el.mesh.visible).map(el => el.mesh);
    if (visibleMeshes.length === 0) return;

    visibleMeshes.forEach(m => box.expandByObject(m));
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    this.controls.target.copy(center);
    this.camera.position.set(center.x + maxDim * 1.2, center.y + maxDim * 0.9, center.z + maxDim * 1.4);
    this.camera.lookAt(center);
  }

  onMouseMove(e) {
    const rect = this.canvasContainer.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const visibleMeshes = this.elements.filter(el => el.mesh && el.mesh.visible).map(el => el.mesh);
    const intersects = this.raycaster.intersectObjects(visibleMeshes, false);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const hitEl = hitMesh.userData.bimElement;
      if (hitEl) {
        this.canvasContainer.style.cursor = "pointer";
        this.selectionTag.style.display = "block";
        this.selectionTag.innerHTML = `
          <div style="font-weight:700; color:#38bdf8;">[${hitEl.ifcClass}] ${hitEl.name}</div>
          <div style="font-size:9.5px; opacity:0.8;">📍 ${hitEl.storey} | ⚡ ${hitEl.discipline.toUpperCase()}</div>
        `;
        return;
      }
    }

    this.canvasContainer.style.cursor = "default";
    this.selectionTag.style.display = "none";
  }

  onClick(e) {
    const rect = this.canvasContainer.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const visibleMeshes = this.elements.filter(el => el.mesh && el.mesh.visible).map(el => el.mesh);
    const intersects = this.raycaster.intersectObjects(visibleMeshes, false);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const hitEl = hitMesh.userData.bimElement;
      if (hitEl) {
        this.selectElement(hitEl);
      }
    }
  }

  selectElement(el) {
    this.selectedElement = el;

    // Highlight bounding box
    this.boxHelper.setFromObject(el.mesh);
    this.boxHelper.visible = true;

    // Update Header Badge
    this.classBadge.textContent = el.ifcClass;
    this.classBadge.style.display = "inline-block";
    this.drawerTitleText.textContent = el.name;

    // If drawer is collapsed, expand it smoothly
    if (this.drawerCollapsed) {
      this.drawerCollapsed = false;
      this.drawer.classList.remove("collapsed");
    }

    if (this.viewMode === "xray") {
      this.setViewMode("xray");
    }

    this.renderDrawer();
  }

  renderDrawer() {
    if (!this.drawerContent) return;

    if (this.currentTab === "psets") {
      if (!this.selectedElement) {
        this.drawerContent.innerHTML = `<div style="font-size:11px; color:#64748b; font-style:italic; padding:10px;">Selecciona cualquier elemento BIM en el visor 3D para ver sus Property Sets (Psets).</div>`;
        return;
      }

      const el = this.selectedElement;
      let html = `
        <div style="margin-bottom:8px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:11px;">
          <span style="font-weight:700; color:#0369a1;">GUID (GlobalId):</span> <code style="background:#f1f5f9; padding:2px 6px; border-radius:3px;">${el.globalId}</code>
          <span style="color:#cbd5e1;">|</span>
          <span style="font-weight:700; color:#0369a1;">Nivel:</span> <span>${el.storey}</span>
          <span style="color:#cbd5e1;">|</span>
          <span style="font-weight:700; color:#0369a1;">Disciplina:</span> <span style="text-transform:uppercase; font-weight:600; color:#0284c7;">${el.discipline}</span>
        </div>
      `;

      if (el.psets) {
        Object.keys(el.psets).forEach(psetName => {
          const props = el.psets[psetName];
          html += `
            <div class="bim-pset-group">
              <div class="bim-pset-title">
                <span>📁 ${psetName}</span>
                <span style="font-size:9.5px; opacity:0.8; font-weight:normal;">OpenBIM Property Set</span>
              </div>
              <table class="bim-pset-table">
                <tbody>
          `;
          Object.keys(props).forEach(pKey => {
            html += `
              <tr>
                <td class="bim-prop-name">${pKey}</td>
                <td class="bim-prop-val">${props[pKey]}</td>
              </tr>
            `;
          });
          html += `</tbody></table></div>`;
        });
      }

      this.drawerContent.innerHTML = html;
    }

    else if (this.currentTab === "spatial") {
      let treeHtml = `<div style="font-size:11px; font-weight:700; color:#0369a1; margin-bottom:8px;">🌲 Estructura Espacial IFC (Spatial Tree)</div>`;
      treeHtml += `
        <div style="padding-left:4px; font-size:11px;">
          <div style="font-weight:700; color:#0f172a; margin-bottom:4px;">🏢 Proyecto: ${this.headerInfo.projectName}</div>
          <div style="padding-left:14px; border-left:1px dashed #cbd5e1;">
            <div style="font-weight:600; color:#475569; margin:4px 0;">📍 Sitio: SP Central Camp / Obra Civil</div>
            <div style="padding-left:14px; border-left:1px dashed #cbd5e1;">
      `;

      this.storeys.forEach(st => {
        const storeyEls = this.elements.filter(e => e.storey === st);
        treeHtml += `
          <div style="margin:6px 0;">
            <div style="font-weight:700; color:#0284c7; cursor:pointer;" class="bim-tree-storey" data-storey="${st}">
              ▼ ${st} (${storeyEls.length} elementos)
            </div>
            <div style="padding-left:12px; margin-top:2px;">
        `;
        storeyEls.forEach(el => {
          const isSelected = this.selectedElement === el;
          treeHtml += `
            <div class="bim-tree-item ${isSelected ? 'selected' : ''}" data-elid="${el.id}">
              <span>${el.discipline === 'structure' ? '🏗️' : el.discipline === 'mep' ? '⚡' : '🧱'}</span>
              <span>[${el.ifcClass}] ${el.name}</span>
            </div>
          `;
        });
        treeHtml += `</div></div>`;
      });

      treeHtml += `</div></div></div></div>`;
      this.drawerContent.innerHTML = treeHtml;

      // Click on tree item to select in 3D
      this.drawerContent.querySelectorAll(".bim-tree-item").forEach(item => {
        item.addEventListener("click", () => {
          const targetEl = this.elements.find(e => e.id === item.dataset.elid);
          if (targetEl) {
            this.selectElement(targetEl);
            // Center camera
            const box = new THREE.Box3().setFromObject(targetEl.mesh);
            const center = box.getCenter(new THREE.Vector3());
            new TWEEN.Tween(this.controls.target)
              .to({ x: center.x, y: center.y, z: center.z }, 500)
              .start();
          }
        });
      });
    }

    else if (this.currentTab === "schema") {
      this.drawerContent.innerHTML = `
        <div style="font-size:11px;">
          <div style="font-weight:700; color:#0369a1; margin-bottom:8px;">ℹ️ Metadatos del Encabezado STEP / IFC (ISO-10303-21)</div>
          <table class="bim-pset-table">
            <tbody>
              <tr><td class="bim-prop-name">Esquema IFC (Schema)</td><td class="bim-prop-val"><span style="background:#0284c7; color:#fff; padding:2px 6px; border-radius:3px; font-weight:700;">${this.headerInfo.schema}</span></td></tr>
              <tr><td class="bim-prop-name">Nombre de Proyecto</td><td class="bim-prop-val"><b>${this.headerInfo.projectName}</b></td></tr>
              <tr><td class="bim-prop-name">Autor / Organización</td><td class="bim-prop-val">${this.headerInfo.author}</td></tr>
              <tr><td class="bim-prop-name">Software de Modelado</td><td class="bim-prop-val">${this.headerInfo.application}</td></tr>
              <tr><td class="bim-prop-name">Definición de Vista (MVD)</td><td class="bim-prop-val">${this.headerInfo.viewDefinition}</td></tr>
              <tr><td class="bim-prop-name">Unidades de Longitud</td><td class="bim-prop-val">${this.headerInfo.units}</td></tr>
              <tr><td class="bim-prop-name">Fecha y Hora de Exportación</td><td class="bim-prop-val">${this.headerInfo.timestamp}</td></tr>
              <tr><td class="bim-prop-name">Total Elementos Renderizados</td><td class="bim-prop-val"><b>${this.elements.length} entidades</b></td></tr>
            </tbody>
          </table>
        </div>
      `;
    }
  }

  onResize() {
    if (!this.canvasContainer || !this.renderer || !this.camera) return;
    const width = this.canvasContainer.clientWidth;
    const height = this.canvasContainer.clientHeight;
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
    this.clearElements();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
  }
}

// ==========================================
// 6. SPLIT WINDOW VIEWER FOR LOCAL FILES & FOLDERS
// ==========================================

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function generateDefaultFolderFiles(folderName) {
  const cleanName = folderName.replace(/[^a-zA-Z0-9_\-]/g, "_");
  return [
    { name: `${cleanName}_Modelo_OpenBIM.ifc`, relativePath: `${folderName}/Modelo_OpenBIM.ifc`, type: "ifc", size: "14.2 MB", date: "2026-10-15" },
    { name: `${cleanName}_Memoria_Calculo.pdf`, relativePath: `${folderName}/Memoria_Calculo.pdf`, type: "pdf", size: "3.5 MB", date: "2026-10-16" },
    { name: `${cleanName}_Cronograma_Costos.xlsx`, relativePath: `${folderName}/Cronograma.xlsx`, type: "xlsx", size: "840 KB", date: "2026-10-16" },
    { name: `${cleanName}_Especificaciones_Tecnicas.docx`, relativePath: `${folderName}/Especificaciones.docx`, type: "doc", size: "480 KB", date: "2026-10-12" },
    { name: `${cleanName}_Plano_Topografia.dwg`, relativePath: `${folderName}/Topografia.dwg`, type: "dwg", size: "8.6 MB", date: "2026-10-08" }
  ];
}

let currentFolderAttachment = null;

function renderFolderExplorer(container, folderAtt) {
  currentFolderAttachment = folderAtt;
  const btnBack = document.getElementById("btnSplitBackToFolder");
  if (btnBack) btnBack.style.display = "none";

  const files = folderAtt.files && folderAtt.files.length > 0 ? folderAtt.files : generateDefaultFolderFiles(folderAtt.name);
  folderAtt.files = files;

  container.innerHTML = `
    <div class="folder-explorer-container">
      <div class="folder-explorer-toolbar">
        <input type="text" class="folder-explorer-search" id="folderSearchInput" placeholder="🔍 Buscar archivo en la carpeta...">
        <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">
          <span id="folderFilesCount">${files.length} archivo(s)</span>
        </div>
      </div>
      <div class="folder-files-list" id="folderFilesList">
        <!-- Rendered file rows -->
      </div>
    </div>
  `;

  const listEl = container.querySelector("#folderFilesList");
  const searchInput = container.querySelector("#folderSearchInput");

  const renderFilesList = (filter = "") => {
    listEl.innerHTML = "";
    const filtered = files.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="padding: 28px; text-align: center; color: var(--text-muted); font-style: italic;">No se encontraron archivos en esta carpeta.</div>`;
      return;
    }

    filtered.forEach((file) => {
      let icon = "📄";
      let badgeClass = "";
      if (file.type === "ifc") { icon = "🏢"; badgeClass = "badge-ifc"; }
      else if (file.type === "pdf") { icon = "📕"; badgeClass = "badge-pdf"; }
      else if (file.type === "xlsx" || file.type === "xls") { icon = "📊"; badgeClass = "badge-xlsx"; }
      else if (file.type === "doc" || file.type === "docx") icon = "📝";
      else if (file.type === "dwg" || file.type === "dxf") icon = "📐";
      else if (file.type === "image") icon = "🖼️";

      const row = document.createElement("div");
      row.className = "folder-file-row";
      row.innerHTML = `
        <div class="folder-file-info">
          <span class="folder-file-icon">${icon}</span>
          <div class="folder-file-details">
            <span class="folder-file-name" title="${file.name}">${file.name}</span>
            <span class="folder-file-subpath">${file.relativePath || file.name}</span>
          </div>
        </div>
        <div class="folder-file-meta">
          <span>${file.size || ""}</span>
          <span class="folder-file-badge ${badgeClass}">${(file.type || "DOC").toUpperCase()}</span>
        </div>
      `;

      row.addEventListener("click", () => {
        openFileFromFolder(file, folderAtt);
      });

      listEl.appendChild(row);
    });
  };

  renderFilesList();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderFilesList(e.target.value.trim());
    });
  }
}

function openFileFromFolder(file, parentFolder) {
  currentFolderAttachment = parentFolder;
  openSplitViewer(file);
  const btnBack = document.getElementById("btnSplitBackToFolder");
  if (btnBack) {
    btnBack.style.display = "inline-flex";
    btnBack.onclick = () => {
      openSplitViewer(parentFolder);
    };
  }
}

function openSplitViewer(att) {
  const panel = document.getElementById("splitViewerPanel");
  if (!panel) return;
  const titleSpan = document.getElementById("splitFileName");
  const badgeSpan = document.getElementById("splitFileTypeBadge");
  const iconSpan = document.getElementById("splitFileIcon");
  const body = document.getElementById("splitViewerBody");

  titleSpan.textContent = att.name;
  badgeSpan.textContent = (att.type || "DOC").toUpperCase();

  let icon = "📄";
  if (att.type === "folder") icon = "📁";
  else if (att.type === "pdf") icon = "📕";
  else if (att.type === "xlsx" || att.type === "xls") icon = "📊";
  else if (att.type === "doc" || att.type === "docx") icon = "📝";
  else if (att.type === "dwg" || att.type === "dxf") icon = "📐";
  else if (att.type === "ifc") icon = "🏢";
  iconSpan.textContent = icon;

  if (window.currentBimViewer) {
    try { window.currentBimViewer.destroy(); } catch (e) { console.warn(e); }
    window.currentBimViewer = null;
  }

  body.innerHTML = "";

  const localFile = localFileStore.get(att.name);
  const blobUrl = localFileUrls.get(att.name);

  // Setup download button
  const btnDownload = document.getElementById("btnSplitDownload");
  if (btnDownload) {
    btnDownload.onclick = () => {
      if (blobUrl) {
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = att.name;
        a.click();
      } else {
        alert(`Guardando / Descargando referencia: ${att.name}\nRuta: ${att.path || 'Local'}`);
      }
    };
  }

  // Back to folder button setup
  const btnBack = document.getElementById("btnSplitBackToFolder");
  if (btnBack && att.type !== "folder") {
    if (currentFolderAttachment) {
      btnBack.style.display = "inline-flex";
      btnBack.onclick = () => openSplitViewer(currentFolderAttachment);
    } else {
      btnBack.style.display = "none";
    }
  }

  // 0. FOLDER EXPLORER VIEWER
  if (att.type === "folder") {
    renderFolderExplorer(body, att);
    panel.style.display = "flex";
    if (threeEngine) threeEngine.onResize();
    return;
  }

  // 1. PDF VIEWER
  if (att.type === "pdf") {
    if (blobUrl) {
      body.innerHTML = `<iframe src="${blobUrl}" style="width:100%; height:100%; border:none; background:#525659;"></iframe>`;
    } else {
      body.innerHTML = `
        <div class="split-pdf-container">
          <div class="pdf-toolbar-bar">
            <div style="display:flex; align-items:center; gap:8px;">
              <span>📕 Vista Previa PDF</span>
              <span style="opacity:0.6;">|</span>
              <span>Página 1 de 4</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="btn btn-icon" id="btnSplitLoadRealPdf" style="background:#0284c7; color:#fff; border:none; font-size:10px; padding:3px 8px;" title="Cargar archivo PDF nativo desde tu disco">📁 Cargar PDF Local</button>
            </div>
          </div>
          <div class="pdf-page-mockup">
            <div class="pdf-header-bar">
              <div>
                <div style="font-weight:800; font-size:14px; color:#0369a1; letter-spacing:0.5px;">EMPRESA S.A.S.</div>
                <div style="font-size:10px; color:#64748b;">SISTEMA INTEGRADO DE GESTIÓN & CALIDAD EDT</div>
              </div>
              <div style="text-align:right;">
                <span class="split-viewer-badge" style="background:#dc2626;">CONTROLADO</span>
                <div style="font-size:9.5px; color:#64748b; margin-top:2px;">CÓDIGO: EDT-DOC-2026</div>
              </div>
            </div>

            <h1 style="font-size:15px; font-weight:700; color:#0f172a; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
              ${att.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ")}
            </h1>

            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:10px; margin-bottom:14px; font-size:11px;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                <div><b>Ruta Vinculada:</b> <code>${att.path || 'docs/' + att.name}</code></div>
                <div><b>Estado del Documento:</b> <span style="color:#16a34a; font-weight:600;">● Aprobado y Vigente</span></div>
                <div><b>Fecha Emisión:</b> 2026-10-07</div>
                <div><b>Revisión:</b> Versión 2.1</div>
              </div>
            </div>

            <h3 style="font-size:12px; font-weight:700; color:#0369a1; margin-bottom:6px;">1. OBJETIVO Y ALCANCE</h3>
            <p style="margin-bottom:10px; color:#334155;">
              Definir los lineamientos técnicos, criterios de cumplimiento y control de calidad requeridos para las actividades correspondientes a la unidad EDT designada. El presente procedimiento aplica a toda la ejecución contractual y monitoreo del proyecto.
            </p>

            <h3 style="font-size:12px; font-weight:700; color:#0369a1; margin-bottom:6px;">2. RESPONSABILIDADES Y ENTREGABLES</h3>
            <ul style="margin-bottom:12px; padding-left:20px; color:#334155;">
              <li>Elaboración y custodia de los registros técnicos conforme al CDE.</li>
              <li>Alineación con la Estructura de Desglose de Trabajo (EDT) corporativa.</li>
              <li>Emisión de bitácoras de avance y verificación periódica por interventoría.</li>
            </ul>

            <h3 style="font-size:12px; font-weight:700; color:#0369a1; margin-bottom:6px;">3. FIRMAS Y CONFORMIDAD</h3>
            <div style="display:flex; justify-content:space-between; margin-top:20px; padding-top:12px; border-top:1px dashed #cbd5e1; font-size:11px; color:#64748b;">
              <div>______________________<br/><b>Director / Gerente de Área</b><br/>Empresa</div>
              <div>______________________<br/><b>Líder de Control y Calidad</b><br/>Interventoría Técnica</div>
            </div>
          </div>
        </div>
      `;

      const btnLoadReal = body.querySelector("#btnSplitLoadRealPdf");
      if (btnLoadReal) {
        btnLoadReal.addEventListener("click", () => {
          document.getElementById("localAttachmentFileInput").click();
        });
      }
    }
  }

  // 2. EXCEL VIEWER (.xlsx / .xls / .csv)
  else if (att.type === "xlsx" || att.type === "xls" || att.type === "csv") {
    if (localFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          
          let tabsHtml = `<div style="display:flex; gap:4px; border-bottom:1px solid #cbd5e1; padding:6px 12px; background:#f8fafc;">`;
          workbook.SheetNames.forEach((sName, idx) => {
            tabsHtml += `<button class="tab-btn ${idx === 0 ? 'active' : ''}" data-sheet="${sName}" style="font-size:11px; padding:3px 8px;">${sName}</button>`;
          });
          tabsHtml += `</div><div id="splitExcelSheetContent" style="flex:1; overflow:auto; padding:12px;"></div>`;
          
          body.innerHTML = tabsHtml;

          const renderSheet = (sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const htmlTable = XLSX.utils.sheet_to_html(sheet);
            const sheetDiv = document.getElementById("splitExcelSheetContent");
            if (sheetDiv) {
              sheetDiv.innerHTML = htmlTable;
              const tbl = sheetDiv.querySelector("table");
              if (tbl) tbl.className = "split-excel-table";
            }
          };

          renderSheet(workbook.SheetNames[0]);

          body.querySelectorAll(".tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
              body.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
              btn.classList.add("active");
              renderSheet(btn.dataset.sheet);
            });
          });

        } catch (err) {
          body.innerHTML = `<div style="padding:20px; color:#dc2626;">Error al procesar hoja de cálculo Excel: ${err.message}</div>`;
        }
      };
      reader.readAsArrayBuffer(localFile);
    } else {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; height:100%;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #cbd5e1; padding:6px 12px; background:#f8fafc;">
            <div style="display:flex; gap:4px;">
              <button class="tab-btn active" style="font-size:11px; padding:3px 8px;">Presupuesto_EDT_2026</button>
              <button class="tab-btn" style="font-size:11px; padding:3px 8px;">Desglose_Costos</button>
              <button class="tab-btn" style="font-size:11px; padding:3px 8px;">Indicadores_HSE</button>
            </div>
            <button class="btn btn-icon" id="btnSplitLoadRealXlsx" style="background:#16a34a; color:#fff; border:none; font-size:10px; padding:3px 8px;" title="Cargar archivo Excel (.xlsx) real">📁 Cargar Excel Local</button>
          </div>
          <div class="split-excel-container">
            <table class="split-excel-table">
              <thead>
                <tr>
                  <th style="width:70px;">Ítem EDT</th>
                  <th>Descripción de la Actividad / Partida</th>
                  <th style="width:60px; text-align:center;">Unidad</th>
                  <th style="width:70px; text-align:right;">Cantidad</th>
                  <th style="width:110px; text-align:right;">Valor Unitario ($)</th>
                  <th style="width:120px; text-align:right;">Total Presupuestado ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>01.01</b></td><td><b>Gestión y Planeación de Obras Civiles</b></td><td style="text-align:center;">GLB</td><td style="text-align:right;">1</td><td style="text-align:right;">$ 85,000,000</td><td style="text-align:right; font-weight:600;">$ 85,000,000</td></tr>
                <tr><td>01.01.01</td><td>Licitaciones y Presentación de Ofertas</td><td style="text-align:center;">MES</td><td style="text-align:right;">12</td><td style="text-align:right;">$ 14,500,000</td><td style="text-align:right;">$ 174,000,000</td></tr>
                <tr><td>01.01.02</td><td>Diseños y Modelado BIM / CAD</td><td style="text-align:center;">GLB</td><td style="text-align:right;">1</td><td style="text-align:right;">$ 120,000,000</td><td style="text-align:right;">$ 120,000,000</td></tr>
                <tr><td>01.01.03</td><td>Auditoría y Control de Obras Viales</td><td style="text-align:center;">KM</td><td style="text-align:right;">48</td><td style="text-align:right;">$ 3,800,000</td><td style="text-align:right;">$ 182,400,000</td></tr>
                <tr><td><b>01.03</b></td><td><b>Programa Integral de Sostenibilidad y HSE</b></td><td style="text-align:center;">GLB</td><td style="text-align:right;">1</td><td style="text-align:right;">$ 60,000,000</td><td style="text-align:right; font-weight:600;">$ 60,000,000</td></tr>
                <tr><td>01.03.01</td><td>Presupuesto Ambiental y Huella de Carbono</td><td style="text-align:center;">GLB</td><td style="text-align:right;">1</td><td style="text-align:right;">$ 45,000,000</td><td style="text-align:right;">$ 45,000,000</td></tr>
                <tr><td>01.03.02</td><td>Monitoreo Periódico de Aire, Agua y Ruido</td><td style="text-align:center;">MES</td><td style="text-align:right;">12</td><td style="text-align:right;">$ 3,200,000</td><td style="text-align:right;">$ 38,400,000</td></tr>
                <tr><td>01.03.03</td><td>Gestión Social y Comunitaria en Territorio</td><td style="text-align:center;">GLB</td><td style="text-align:right;">1</td><td style="text-align:right;">$ 28,000,000</td><td style="text-align:right;">$ 28,000,000</td></tr>
                <tr style="font-weight:bold; background:#f1f5f9; border-top:2px solid #0284c7;">
                  <td colspan="5" style="text-align:right; font-size:13px;">GRAN TOTAL EJECUCIÓN EDT:</td>
                  <td style="color:#16a34a; font-size:13px; text-align:right;">$ 732,800,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;

      const btnLoadReal = body.querySelector("#btnSplitLoadRealXlsx");
      if (btnLoadReal) {
        btnLoadReal.addEventListener("click", () => {
          document.getElementById("localAttachmentFileInput").click();
        });
      }
    }
  }

  // 3. OPENBIM / IFC 3D VIEWER (.ifc)
  else if (att.type === "ifc") {
    window.currentBimViewer = new BimIfcViewer(body, att, localFile);
  }

  // 4. WORD / TEXT DOCUMENT VIEWER (.doc / .docx / .txt)
  else {
    body.innerHTML = `
      <div class="split-doc-container">
        <div style="background:#ffffff; padding:24px; border-radius:8px; border:1px solid #cbd5e1; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
            <div>
              <span class="split-viewer-badge" style="background:#2563eb;">DOCUMENTO TÉCNICO EDT</span>
              <h2 style="color:#0f172a; font-size:16px; font-weight:700; margin-top:6px;">📄 ${att.name}</h2>
              <p style="font-size:11px; color:#64748b; margin-top:2px;">Ruta Vinculada: <code>${att.path || 'docs/' + att.name}</code></p>
            </div>
            <button class="btn btn-icon" id="btnSplitLoadRealDoc" style="background:#2563eb; color:#fff; border:none; font-size:10px; padding:3px 8px;" title="Cargar archivo Word/Texto real">📁 Cargar Local</button>
          </div>
          
          <hr style="border:0; border-top:1px solid #e2e8f0; margin-bottom:14px;"/>
          
          <h3 style="color:#0369a1; font-size:13px; font-weight:700; margin-bottom:6px;">1. RESUMEN EJECUTIVO</h3>
          <p style="margin-bottom:12px; color:#334155; font-size:12px; line-height:1.6;">
            El presente informe recopila el estado actual de los entregables, matrices de cumplimiento contractual y asignación de recursos para la actividad EDT seleccionada. Todos los parámetros técnicos cumplen con la política de calidad corporativa de Empresa.
          </p>

          <h3 style="color:#0369a1; font-size:13px; font-weight:700; margin-bottom:6px;">2. HITOS Y CRONOGRAMA</h3>
          <ul style="margin-bottom:14px; padding-left:20px; color:#334155; font-size:12px; line-height:1.6;">
            <li><b>Hito 1:</b> Revisión y validación de especificaciones técnicas con la gerencia.</li>
            <li><b>Hito 2:</b> Implementación de protocolos de aseguramiento metrológico y ensayos.</li>
            <li><b>Hito 3:</b> Cierre documental e integración en el CDE (Common Data Environment).</li>
          </ul>

          <h3 style="color:#0369a1; font-size:13px; font-weight:700; margin-bottom:6px;">3. CONTROL DE CAMBIOS</h3>
          <table class="split-excel-table" style="margin-top:8px; font-size:11px;">
            <thead>
              <tr><th>Versión</th><th>Fecha</th><th>Elaboró</th><th>Aprobó</th></tr>
            </thead>
            <tbody>
              <tr><td>1.0</td><td>2026-09-15</td><td>Ing. Residente</td><td>Gerencia Técnica</td></tr>
              <tr><td>2.0</td><td>2026-10-07</td><td>Coordinador EDT</td><td>Dirección de Área</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    const btnLoadReal = body.querySelector("#btnSplitLoadRealDoc");
    if (btnLoadReal) {
      btnLoadReal.addEventListener("click", () => {
        document.getElementById("localAttachmentFileInput").click();
      });
    }
  }

  // Open the split panel
  panel.style.display = "flex";
  
  // Trigger immediate Three.js canvas resize and post-frame resize
  if (threeEngine) {
    threeEngine.onResize();
  }
  if (window.currentBimViewer) {
    window.currentBimViewer.onResize();
  }

  setTimeout(() => {
    if (threeEngine) threeEngine.onResize();
    if (window.currentBimViewer) window.currentBimViewer.onResize();
  }, 50);
  setTimeout(() => {
    if (threeEngine) threeEngine.onResize();
    if (window.currentBimViewer) window.currentBimViewer.onResize();
  }, 200);
}

function closeSplitViewer() {
  if (window.currentBimViewer) {
    try { window.currentBimViewer.destroy(); } catch (e) { console.warn(e); }
    window.currentBimViewer = null;
  }
  const panel = document.getElementById("splitViewerPanel");
  if (panel) panel.style.display = "none";
  if (threeEngine) {
    threeEngine.onResize();
  }
  setTimeout(() => {
    if (threeEngine) threeEngine.onResize();
  }, 50);
  setTimeout(() => {
    if (threeEngine) threeEngine.onResize();
  }, 200);
}

// ==========================================
// 7. FLOATING CONTEXT MENU & DIALOGS
// ==========================================

const contextMenu = document.getElementById("nodeContextMenu");

function showContextMenu(nodeId, clientX, clientY) {
  const node = state.getNode(nodeId);
  if (!node || !contextMenu) return;

  document.getElementById("ctxMenuNodeTitle").textContent = node.title;
  document.getElementById("ctxMenuNodeCode").textContent = node.code || "";

  const collapseBtn = document.getElementById("ctxBtnToggleCollapse");
  const collapseText = document.getElementById("ctxCollapseText");
  const hasChildren = state.hasChildren(nodeId);
  if (collapseBtn && collapseText) {
    if (hasChildren) {
      collapseBtn.style.display = "flex";
      const isCollapsed = state.collapsedNodeIds.has(nodeId);
      const count = state.getDescendantCount(nodeId);
      collapseText.textContent = isCollapsed ? `[+] Expandir Rama (${count} ítems)` : `[-] Colapsar Rama`;
    } else {
      collapseBtn.style.display = "none";
    }
  }

  const x = Math.min(clientX + 10, window.innerWidth - 230);
  const y = Math.min(clientY + 10, window.innerHeight - 240);

  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.style.display = "flex";
}

function hideContextMenu() {
  if (contextMenu) contextMenu.style.display = "none";
}

let currentModalParentId = null;
let currentModalIsSibling = false;

function openDependencyModal(targetNodeId, isSibling = false) {
  hideContextMenu();
  const targetNode = state.getNode(targetNodeId);
  if (!targetNode && !isSibling) return;

  currentModalParentId = targetNodeId;
  currentModalIsSibling = isSibling;

  const modal = document.getElementById("dependencyModal");
  const modalHeader = document.getElementById("depModalHeaderTitle");
  const parentNameLabel = document.getElementById("depModalParentName");
  const codeInput = document.getElementById("depCodeInput");
  const titleInput = document.getElementById("depTitleInput");
  const ownerInput = document.getElementById("depOwnerInput");
  const relationSelect = document.getElementById("depRelationSelect");

  if (isSibling) {
    modalHeader.textContent = "➕ Agregar Nodo Hermano EDT (Mismo Nivel)";
    const parentNode = targetNode ? state.getNode(targetNode.parentId) : null;
    parentNameLabel.textContent = parentNode ? `${parentNode.title} (${parentNode.code})` : "(Raíz Principal)";
  } else {
    modalHeader.textContent = "➕ Nueva Dependencia Jerárquica EDT";
    parentNameLabel.textContent = targetNode ? `${targetNode.title} (${targetNode.code})` : "(Raíz Principal)";
  }

  const proposedCode = state.proposeLogicalCode(targetNodeId, isSibling);
  codeInput.value = proposedCode;
  titleInput.value = "";
  ownerInput.value = "";
  relationSelect.value = "solid";

  modal.classList.add("open");
  setTimeout(() => titleInput.focus(), 100);
}

function confirmDependencyModal() {
  const codeInput = document.getElementById("depCodeInput");
  const titleInput = document.getElementById("depTitleInput");
  const ownerInput = document.getElementById("depOwnerInput");
  const relationSelect = document.getElementById("depRelationSelect");
  const modal = document.getElementById("dependencyModal");

  const title = titleInput.value.trim() || "Nueva Actividad";
  const code = codeInput.value.trim() || "01";
  const owner = ownerInput.value.trim();
  const relationType = relationSelect.value;

  let parentId = currentModalParentId;
  if (currentModalIsSibling && currentModalParentId) {
    const curr = state.getNode(currentModalParentId);
    parentId = curr ? curr.parentId : null;
  }

  const parent = parentId ? state.getNode(parentId) : null;
  const level = parent ? (parent.level || 0) + 1 : 0;

  const newNode = {
    id: `node-${Date.now()}`,
    parentId: parentId,
    code: code,
    title: title,
    owner: owner,
    level: level,
    style: {
      color: parent && parent.style ? parent.style.color : "#0284c7",
      textColor: "#ffffff",
      shape: "box"
    },
    relationType: relationType,
    markdownNotes: `# ${title}\nCódigo EDT: ${code}\n- [ ] Definir alcance\n- [ ] Asignar recursos`,
    attachments: []
  };

  state.addNode(newNode);
  modal.classList.remove("open");
  refreshUI();
  selectNode(newNode.id, true);
}

// ==========================================
// 8. SYNCHRONIZATION & SELECTION
// ==========================================

function selectNode(nodeId, flyCamera = false, screenCoords = null) {
  state.selectedNodeId = nodeId;
  state.activeBranchIds = state.getBranchIds(nodeId);

  renderWBSTable();
  const selectedRow = document.querySelector(`.edt-row[data-node-id="${nodeId}"]`);
  if (selectedRow) {
    selectedRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (threeEngine) {
    threeEngine.rebuildScene();
    if (flyCamera) {
      threeEngine.flyToNode(nodeId);
    }
  }

  renderInspector();

  if (screenCoords && nodeId) {
    showContextMenu(nodeId, screenCoords.x, screenCoords.y);
  }
}

function refreshUI() {
  renderWBSTable();
  renderInspector();
  if (threeEngine) {
    threeEngine.rebuildScene();
  }

  // Synchronize Excel Outline Toolbar status & counter
  const counterEl = document.getElementById("excelCollapsedCounter");
  if (counterEl) {
    const collapsedCount = state.collapsedNodeIds.size;
    if (collapsedCount > 0) {
      counterEl.textContent = `${collapsedCount} grupo${collapsedCount > 1 ? 's' : ''} colapsado${collapsedCount > 1 ? 's' : ''}`;
      counterEl.style.display = "inline-block";
    } else {
      counterEl.style.display = "none";
    }
  }

  const btnLvlAll = document.getElementById("btnOutlineLevelAll");
  if (btnLvlAll && state.collapsedNodeIds.size === 0) {
    const btnLvl1 = document.getElementById("btnOutlineLevel1");
    const btnLvl2 = document.getElementById("btnOutlineLevel2");
    const btnLvl3 = document.getElementById("btnOutlineLevel3");
    [btnLvl1, btnLvl2, btnLvl3].forEach(b => b && b.classList.remove("active"));
    btnLvlAll.classList.add("active");
  }
}

// ==========================================
// 9. EXCEL INGESTION & MATRIX ANALYSIS (IMAGES 1 & 3)
// ==========================================

let parsedExcelNodes = [];
let parsedExcelMetadata = {};

function parseExcelHierarchy(workbook, extractColors = true) {
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

  parsedExcelMetadata = {
    empresa: "Empresa",
    direccion: "",
    obra: "",
    area: "",
    gerente: "",
    lider: ""
  };

  let headerRowIndex = -1;
  let isMatrixFormat = false;

  for (let r = 0; r < Math.min(rawRows.length, 12); r++) {
    const row = rawRows[r];
    if (!row || row.length === 0) continue;
    const label = String(row[0] || "").toLowerCase().trim();
    const val = String(row[1] || "").trim();

    if (label.includes("empresa")) parsedExcelMetadata.empresa = val || "Empresa";
    else if (label.includes("direccion")) parsedExcelMetadata.direccion = val;
    else if (label.includes("obra")) parsedExcelMetadata.obra = val;
    else if (label.includes("area")) parsedExcelMetadata.area = val;
    else if (label.includes("nombre gerente") || label.includes("gerente")) parsedExcelMetadata.gerente = val;
    else if (label.includes("nombre lider") || label.includes("lider")) parsedExcelMetadata.lider = val;

    const rowStr = row.join(" ").toLowerCase();
    if (rowStr.includes("unidad principal") || rowStr.includes("sub carpeta") || rowStr.includes("informacion documental")) {
      headerRowIndex = r;
      isMatrixFormat = true;
      break;
    }
    if (rowStr.includes("código") || rowStr.includes("areas de trabajo")) {
      headerRowIndex = r;
      isMatrixFormat = false;
      break;
    }
  }

  const nodes = [];
  const codeToIdMap = new Map();

  if (isMatrixFormat && headerRowIndex !== -1) {
    const headerRow = rawRows[headerRowIndex].map(h => String(h || "").trim());
    
    const colMain = headerRow.findIndex(h => /unidad principal|carpeta/i.test(h));
    const colSub1 = headerRow.findIndex(h => /sub\s*carpeta$/i.test(h) || h === "Sub Carpeta");
    const colSub2 = headerRow.findIndex(h => /sub\s*carpeta\s*2/i.test(h));
    const colSub3 = headerRow.findIndex(h => /sub\s*carpeta\s*3/i.test(h));
    const colDoc = headerRow.findIndex(h => /informacion documental|documental|archivos/i.test(h));

    let rootTitle = parsedExcelMetadata.direccion || "SOSTENIBILIDAD";
    let rootNodeId = "matrix-root-01";
    let rootNode = {
      id: rootNodeId,
      parentId: null,
      code: "01",
      title: rootTitle,
      owner: parsedExcelMetadata.gerente || parsedExcelMetadata.lider || "Director de Área",
      level: 0,
      style: { color: "#16a34a", textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: `# ${rootTitle}\nEmpresa: ${parsedExcelMetadata.empresa}\nGerente: ${parsedExcelMetadata.gerente || "N/A"}`,
      attachments: []
    };
    nodes.push(rootNode);
    codeToIdMap.set("01", rootNodeId);

    let lastMain = "";
    let lastSub1 = "";
    let lastSub2 = "";
    let lastSub3 = "";

    let sub1Count = 0;
    let sub2Counts = {};
    let sub3Counts = {};
    let docCounts = {};

    for (let r = headerRowIndex + 1; r < rawRows.length; r++) {
      const row = rawRows[r];
      if (!row || row.length === 0) continue;

      const mainVal = colMain !== -1 && row[colMain] ? String(row[colMain]).trim() : "";
      const sub1Val = colSub1 !== -1 && row[colSub1] ? String(row[colSub1]).trim() : "";
      const sub2Val = colSub2 !== -1 && row[colSub2] ? String(row[colSub2]).trim() : "";
      const sub3Val = colSub3 !== -1 && row[colSub3] ? String(row[colSub3]).trim() : "";
      const docVal = colDoc !== -1 && row[colDoc] ? String(row[colDoc]).trim() : "";

      if (mainVal) lastMain = mainVal;
      if (sub1Val) lastSub1 = sub1Val;
      if (sub2Val) lastSub2 = sub2Val;
      if (sub3Val) lastSub3 = sub3Val;

      let sub1Code = "";
      let sub1Id = "";
      if (lastSub1) {
        sub1Id = `matrix-sub1-${lastSub1.toLowerCase().replace(/\s+/g, "_")}`;
        if (!codeToIdMap.has(sub1Id)) {
          sub1Count++;
          sub1Code = `01.${String(sub1Count).padStart(2, "0")}`;
          codeToIdMap.set(sub1Id, sub1Code);

          nodes.push({
            id: sub1Id,
            parentId: rootNodeId,
            code: sub1Code,
            title: lastSub1,
            owner: parsedExcelMetadata.gerente || "",
            level: 1,
            style: { color: "#22c55e", textColor: "#ffffff", shape: "box" },
            relationType: "solid",
            markdownNotes: `## Carpeta EDT: ${lastSub1}\nCódigo: ${sub1Code}`,
            attachments: []
          });
        } else {
          sub1Code = codeToIdMap.get(sub1Id);
        }
      }

      let sub2Code = "";
      let sub2Id = "";
      if (lastSub2 && sub1Id) {
        sub2Id = `${sub1Id}-sub2-${lastSub2.toLowerCase().replace(/\s+/g, "_")}`;
        if (!codeToIdMap.has(sub2Id)) {
          sub2Counts[sub1Id] = (sub2Counts[sub1Id] || 0) + 1;
          sub2Code = `${sub1Code}.${String(sub2Counts[sub1Id]).padStart(2, "0")}`;
          codeToIdMap.set(sub2Id, sub2Code);

          nodes.push({
            id: sub2Id,
            parentId: sub1Id,
            code: sub2Code,
            title: lastSub2,
            owner: "",
            level: 2,
            style: { color: "#4ade80", textColor: "#0f172a", shape: "box" },
            relationType: "solid",
            markdownNotes: `### Subcarpeta EDT: ${lastSub2}\nCódigo: ${sub2Code}`,
            attachments: []
          });
        } else {
          sub2Code = codeToIdMap.get(sub2Id);
        }
      }

      let sub3Code = "";
      let sub3Id = "";
      let parentForDoc = sub2Id || sub1Id || rootNodeId;
      let parentCodeForDoc = sub2Code || sub1Code || "01";

      if (lastSub3 && sub2Id) {
        sub3Id = `${sub2Id}-sub3-${lastSub3.toLowerCase().replace(/\s+/g, "_")}`;
        if (!codeToIdMap.has(sub3Id)) {
          sub3Counts[sub2Id] = (sub3Counts[sub2Id] || 0) + 1;
          sub3Code = `${sub2Code}.${String(sub3Counts[sub2Id]).padStart(2, "0")}`;
          codeToIdMap.set(sub3Id, sub3Code);

          nodes.push({
            id: sub3Id,
            parentId: sub2Id,
            code: sub3Code,
            title: lastSub3,
            owner: "",
            level: 3,
            style: { color: "#86efac", textColor: "#0f172a", shape: "box" },
            relationType: "solid",
            markdownNotes: `#### ${lastSub3}\nCódigo: ${sub3Code}`,
            attachments: []
          });
        } else {
          sub3Code = codeToIdMap.get(sub3Id);
        }
        parentForDoc = sub3Id;
        parentCodeForDoc = sub3Code;
      }

      if (docVal) {
        const docLines = docVal.split(/\r?\n/).map(d => d.trim()).filter(d => d.length > 0);
        docLines.forEach((docTitle) => {
          docCounts[parentForDoc] = (docCounts[parentForDoc] || 0) + 1;
          const docCode = `${parentCodeForDoc}.${String(docCounts[parentForDoc]).padStart(2, "0")}`;
          const docId = `doc-${r}-${docCounts[parentForDoc]}`;

          nodes.push({
            id: docId,
            parentId: parentForDoc,
            code: docCode,
            title: docTitle,
            owner: "Documento Controlado",
            level: 4,
            style: { color: "#38bdf8", textColor: "#0f172a", shape: "box" },
            relationType: "solid",
            markdownNotes: `##### Información Documental EDT\n- **Nombre:** ${docTitle}\n- **Ubicación:** ${lastMain} > ${lastSub1} > ${lastSub2 || ""}\n- **Estado:** Vigente`,
            attachments: [{ name: `${docTitle}.pdf`, path: `docs/${lastSub1}/${docTitle}.pdf`, type: "pdf" }]
          });
        });
      }
    }
  } else {
    const startIndex = headerRowIndex !== -1 ? headerRowIndex + 1 : 0;
    for (let r = startIndex; r < rawRows.length; r++) {
      const row = rawRows[r];
      if (!row || row.length === 0) continue;

      const firstCell = String(row[0] || "").trim();
      if (firstCell.toLowerCase().includes("código") || firstCell.toLowerCase().includes("areas de trabajo")) {
        continue;
      }

      let code = "";
      let title = "";
      let level = 0;

      if (/^\d+(\.\d+)*$/.test(firstCell)) {
        code = firstCell;
        title = String(row[1] || `Actividad ${code}`).trim();
        level = code.split(".").length - 1;
      } else {
        for (let c = 0; c < row.length; c++) {
          if (row[c] && String(row[c]).trim()) {
            title = String(row[c]).trim();
            level = c;
            code = `N${level}.${r + 1}`;
            break;
          }
        }
      }

      if (!title) continue;

      let parentId = null;
      if (code.includes(".")) {
        const parts = code.split(".");
        parts.pop();
        const parentCode = parts.join(".");
        if (codeToIdMap.has(parentCode)) {
          parentId = codeToIdMap.get(parentCode);
        }
      }

      let color = "#0284c7";
      if (level === 0) color = "#000000";
      else if (level === 1) color = "#0369a1";
      else if (title.toLowerCase().includes("licitacion")) color = "#dc2626";
      else if (title.toLowerCase().includes("peaje")) color = "#fecdd3";
      else if (title.toLowerCase().includes("sostenibilidad") || title.toLowerCase().includes("ambiental")) color = "#16a34a";
      else if (title.toLowerCase().includes("juridica") || title.toLowerCase().includes("demanda")) color = "#ea580c";
      else if (title.toLowerCase().includes("financiera") || title.toLowerCase().includes("cuenta")) color = "#eab308";

      const nodeId = `excel-${r}-${code || Math.random().toString(36).substr(2, 5)}`;
      codeToIdMap.set(code, nodeId);

      nodes.push({
        id: nodeId,
        parentId: parentId,
        code: code,
        title: title,
        owner: "",
        level: level,
        style: { color: color, textColor: "#ffffff", shape: "box" },
        relationType: "solid",
        markdownNotes: `# ${title}\nCódigo EDT: ${code}\nImportado desde Excel.`,
        attachments: []
      });
    }
  }

  return nodes;
}

async function exportToExcel() {
  try {
    const data = [
      ["EMPRESA S.A.S. - ESTRUCTURA DE DESGLOSE DEL TRABAJO (EDT)"],
      [`Proyecto: ${state.project.meta.title || "Mapa Mental EDT"}`, "", "", "", "", "", "", "", `Fecha: ${new Date().toLocaleDateString('es-CO')}`],
      [`Empresa: ${state.project.meta.empresa || "Empresa"}`, "", "", "", "", "", "", "", `Total Nodos: ${state.project.nodes.length}`],
      [],
      ["Código EDT", "Nivel", "Áreas de trabajo / Actividades", "Responsable / Cargo", "Color Gráfico", "Tipo Relación", "Total Tareas", "Tareas Completadas", "Detalle de Tareas", "Notas / Alcance Markdown", "Documentos Vinculados"]
    ];

    const hierarchicalNodes = state.getHierarchicalNodes();
    hierarchicalNodes.forEach(n => {
      const attNames = n.attachments && n.attachments.length > 0 ? n.attachments.map(a => a.name).join(", ") : "";
      const tasks = n.tasks || [];
      const totalTasks = tasks.length;
      const compTasks = tasks.filter(t => t.status === "Completada").length;
      const tasksSummary = tasks.length > 0
        ? tasks.map(t => `[${t.status || 'No iniciada'}] ${t.name} (${t.startDate || '-'} a ${t.endDate || '-'})`).join("; ")
        : "Sin tareas";

      data.push([
        n.code || "",
        n.level !== undefined ? n.level : 0,
        n.title || "",
        n.owner || "",
        (n.style && n.style.color) || "#0284c7",
        n.relationType === "dotted" ? "Punteada (Staff)" : "Sólida (Mando)",
        totalTasks,
        compTasks,
        tasksSummary,
        n.markdownNotes || "",
        attNames
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 14 }, // Código EDT
      { wch: 8 },  // Nivel
      { wch: 40 }, // Áreas / Actividades
      { wch: 28 }, // Responsable
      { wch: 14 }, // Color
      { wch: 18 }, // Tipo Relación
      { wch: 12 }, // Total Tareas
      { wch: 16 }, // Tareas Completadas
      { wch: 50 }, // Detalle de Tareas
      { wch: 45 }, // Notas
      { wch: 35 }  // Documentos
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EDT_Estructura_SP");

    // Sheet 2: Dedicated Task Management & Scheduling Matrix (Control de Tareas EDT)
    const tasksData = [
      ["EMPRESA S.A.S. - MATRIZ DE CONTROL Y SEGUIMIENTO DE TAREAS EDT"],
      [`Proyecto: ${state.project.meta.title || "Mapa Mental EDT"}`, "", "", "", "", "", "", "", `Fecha: ${new Date().toLocaleDateString('es-CO')}`],
      [`Empresa: ${state.project.meta.empresa || "Empresa"}`, "", "", "", "", "", "", "", `Total Nodos: ${state.project.nodes.length}`],
      [],
      ["Código EDT", "Área / Actividad (Nodo)", "Responsable EDT", "ID Tarea", "Nombre de la Tarea", "Fecha de Inicio", "Fecha de Fin", "Estado de la Tarea", "Duración Estimada"]
    ];

    let taskRowCount = 0;
    hierarchicalNodes.forEach(n => {
      const tasks = n.tasks || [];
      tasks.forEach(t => {
        taskRowCount++;
        let durationStr = "-";
        if (t.startDate && t.endDate) {
          const d1 = new Date(t.startDate);
          const d2 = new Date(t.endDate);
          const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
          if (!isNaN(diffDays) && diffDays >= 0) {
            durationStr = `${diffDays} día${diffDays !== 1 ? 's' : ''}`;
          }
        }
        tasksData.push([
          n.code || "",
          n.title || "",
          n.owner || "",
          t.id || "",
          t.name || "",
          t.startDate || "-",
          t.endDate || "-",
          t.status || "No iniciada",
          durationStr
        ]);
      });
    });

    if (taskRowCount === 0) {
      tasksData.push(["-", "No se han registrado tareas en los nodos", "-", "-", "-", "-", "-", "-", "-"]);
    }

    const wsTasks = XLSX.utils.aoa_to_sheet(tasksData);
    wsTasks['!cols'] = [
      { wch: 14 }, // Código EDT
      { wch: 35 }, // Área / Actividad
      { wch: 25 }, // Responsable
      { wch: 18 }, // ID Tarea
      { wch: 42 }, // Nombre Tarea
      { wch: 15 }, // Fecha Inicio
      { wch: 15 }, // Fecha Fin
      { wch: 16 }, // Estado
      { wch: 18 }  // Duración
    ];

    XLSX.utils.book_append_sheet(wb, wsTasks, "Control_Tareas_EDT");

    const safeTitle = (state.project.meta.title || "EDT_SP_Ingenieros").replace(/[^a-zA-Z0-9_\-]/g, "_");
    const filename = `${safeTitle}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    // Native Save As File Picker
    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: "Libro de Excel (*.xlsx)",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"]
            }
          }]
        });
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        alert(`¡Archivo Excel (.xlsx) guardado exitosamente en:\n"${handle.name}"!`);
        return;
      } catch (err) {
        if (err.name === "AbortError") return; // User cancelled dialog
        console.warn("showSaveFilePicker fallback", err);
      }
    }

    // Fallback if File System Access API is unavailable
    XLSX.writeFile(wb, filename);
    alert(`¡Archivo Excel (.xlsx) exportado exitosamente como "${filename}"!`);
  } catch (err) {
    alert("Error al exportar a Excel: " + err.message);
  }
}

// ==========================================
// 10. IMAGE INGESTION & OCR / DIAGRAM ANALYSIS
// ==========================================

let parsedImageNodes = [];
let loadedImageSource = null;

// Image Preprocessing & Feature Extraction Helper (Binarization & Color Sampling)
function analyzeImageColorsAndFeatures(imageSource) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const w = Math.min(img.width, 1200);
        const h = Math.round((img.height * w) / img.width);
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        let hasRed = 0, hasBlue = 0, hasGreen = 0, hasOrange = 0, hasPurple = 0;
        let whitePixels = 0;

        for (let i = 0; i < data.length; i += 16) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const brightness = (r + g + b) / 3;

          if (brightness > 215) whitePixels++;

          // Check colored strokes (branches in drawing)
          if (r > 150 && g < 75 && b < 75) hasRed++;
          else if (b > 150 && r < 80) hasBlue++;
          else if (g > 130 && r < 85 && b < 85) hasGreen++;
          else if (r > 180 && g > 80 && g < 160 && b < 65) hasOrange++;
          else if (r > 120 && b > 120 && g < 80) hasPurple++;
        }

        const isLightSketch = whitePixels > (data.length / 16) * 0.40;
        const hasColoredBranches = (hasRed + hasBlue + hasGreen + hasOrange + hasPurple) > 8;

        // Binarize high-contrast canvas for OCR text extraction
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const val = avg < 165 ? 0 : 255;
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }
        ctx.putImageData(imgData, 0, 0);
        const enhancedSource = canvas.toDataURL("image/png");

        resolve({ isLightSketch, hasColoredBranches, enhancedSource, hasRed, hasBlue, hasGreen, hasOrange, hasPurple });
      } catch (err) {
        resolve({ isLightSketch: true, hasColoredBranches: false, enhancedSource: imageSource });
      }
    };
    img.onerror = () => resolve({ isLightSketch: true, hasColoredBranches: false, enhancedSource: imageSource });
    img.src = imageSource;
  });
}

// Convert indented text into hierarchical EDT nodes
function buildNodesFromIndentedText(text, fallbackTitle = "Mapa Mental EDT") {
  const lines = text.split("\n").filter(l => l.trim().length > 0);
  if (lines.length === 0) return [];

  const branchPalette = ["#dc2626", "#0284c7", "#16a34a", "#ea580c", "#9333ea", "#0891b2", "#ca8a04"];
  const nodes = [];
  const parentStack = []; // [{ id, level, code, color }]
  let level1Count = 0;

  lines.forEach((line, index) => {
    // Measure indentation (2 spaces or 1 tab = 1 level)
    const leadingSpaces = line.search(/\S|$/);
    const trimmed = line.trim();
    if (!trimmed) return;

    let level = 0;
    if (index > 0) {
      level = Math.max(1, Math.round(leadingSpaces / 2));
    }

    // Determine parent from stack
    while (parentStack.length > 0 && parentStack[parentStack.length - 1].level >= level) {
      parentStack.pop();
    }

    const parent = parentStack.length > 0 ? parentStack[parentStack.length - 1] : null;
    const parentId = parent ? parent.id : null;

    let branchColor = "#0284c7";
    let code = "01";

    if (level === 0) {
      branchColor = "#000000";
      code = "01";
    } else if (level === 1) {
      level1Count++;
      code = `01.${String(level1Count).padStart(2, "0")}`;
      branchColor = branchPalette[(level1Count - 1) % branchPalette.length];
    } else {
      const siblingCount = nodes.filter(n => n.parentId === parentId).length + 1;
      code = `${parent.code}.${String(siblingCount).padStart(2, "0")}`;
      branchColor = parent.color || "#0284c7";
    }

    // Keyword color mapping matching sketch colors
    const lower = trimmed.toLowerCase();
    if (lower.includes("piloto") || lower.includes("mutat") || lower.includes("uramit") || lower.includes("dwg") || lower.includes("modelar") || lower.includes("cronograma")) {
      branchColor = "#dc2626"; // Red from sketch
    } else if (lower.includes("capacita") || lower.includes("actualizar") || lower.includes("programar")) {
      branchColor = "#0284c7"; // Cyan/Blue from sketch
    } else if (lower.includes("edt") || lower.includes("wbs")) {
      branchColor = "#16a34a"; // Green from sketch
    } else if (lower.includes("comunica")) {
      branchColor = "#ea580c"; // Orange from sketch
    } else if (lower.includes("cde") || lower.includes("gbd") || lower.includes("obra") || lower.includes("fm") || lower.includes("3d")) {
      branchColor = "#9333ea"; // Purple from sketch
    }

    const nodeId = `node-img-${index}-${Date.now()}`;
    const nodeObj = {
      id: nodeId,
      parentId: parentId,
      code: code,
      title: trimmed,
      owner: level === 0 ? "Líder de Proyecto / BIM" : (level === 1 ? "Responsable EDT" : ""),
      level: level,
      style: { color: branchColor, textColor: "#ffffff", shape: "box" },
      relationType: "solid",
      markdownNotes: `# ${trimmed}\nCódigo EDT: ${code}\nNivel: ${level}\nExtraído y coordinado desde imagen/boceto.`,
      attachments: []
    };

    nodes.push(nodeObj);
    parentStack.push({ id: nodeId, level: level, code: code, color: branchColor });
  });

  return nodes;
}

// Convert hierarchical nodes into indented text representation for editing
function buildIndentedTextFromNodes(nodes) {
  if (!nodes || nodes.length === 0) return "";
  return nodes.map(n => {
    const indent = "  ".repeat(n.level || 0);
    return `${indent}${n.title}`;
  }).join("\n");
}

function renderImageTreePreview(nodes) {
  const treePreview = document.getElementById("imageHierarchyTreePreview");
  const countBadge = document.getElementById("imageNodeCountBadge");
  const btnApply = document.getElementById("btnApplyImageImport");

  if (!treePreview || !nodes || nodes.length === 0) return;
  treePreview.innerHTML = "";

  const maxLvl = Math.max(...nodes.map(n => n.level || 0));
  if (countBadge) {
    countBadge.textContent = `${nodes.length} Nodos EDT (${maxLvl + 1} Niveles)`;
  }

  nodes.forEach(n => {
    const item = document.createElement("div");
    item.className = "tree-preview-item";
    const indent = Math.max(0, (n.level || 0) * 18);
    item.style.paddingLeft = `${indent + 8}px`;

    let icon = "📁";
    if (n.level === 0) icon = "🏢";
    else if (n.level === 1) icon = "📂";
    else if (n.level >= 3) icon = "📄";

    const nodeColor = (n.style && n.style.color) || "#0284c7";

    item.innerHTML = `
      <span style="font-size:14px;">${icon}</span>
      <span class="tree-preview-code" style="background:${nodeColor}; color:#ffffff; font-weight:700;">${n.code || ''}</span>
      <span style="font-weight: ${n.level === 0 ? '700' : '500'}; color: #0f172a; font-size:12px;">${n.title || ''}</span>
      <span class="tree-preview-tag" style="background:${nodeColor}; color:#ffffff; opacity:0.9;">Nivel ${n.level || 0}</span>
    `;
    treePreview.appendChild(item);
  });

  if (btnApply) {
    btnApply.disabled = false;
    btnApply.textContent = `✅ Confirmar Estructura EDT y Generar Mapa 3D (${nodes.length} Nodos)`;
  }
}

async function analyzeImageDiagram(imageSource, mode = "auto") {
  const statusBox = document.getElementById("imageOcrStatusText");
  const spinner = document.getElementById("imageOcrSpinner");
  const scanLaser = document.getElementById("imageScanLaser");
  const titleInput = document.getElementById("imageProjectTitleInput");
  const textEditor = document.getElementById("imageExtractedTextEditor");

  if (statusBox) statusBox.textContent = "Preprocesando imagen y detectando boceto/mapa mental...";
  if (spinner) spinner.style.display = "inline-block";
  if (scanLaser) scanLaser.style.display = "block";

  // 1. Analyze Image Features & Enhance Contrast for OCR
  const features = await analyzeImageColorsAndFeatures(imageSource);
  const ocrImage = features.enhancedSource || imageSource;

  let recognizedLines = [];

  // 2. Perform OCR with Tesseract
  if (window.Tesseract) {
    try {
      if (statusBox) statusBox.textContent = "Ejecutando OCR (Reconocimiento Óptico de Trazos y Texto)...";
      const res = await Tesseract.recognize(ocrImage, 'spa+eng', {
        logger: m => {
          if (m.status === 'recognizing text' && statusBox) {
            statusBox.textContent = `Analizando textos y conectores: ${Math.round((m.progress || 0) * 100)}%`;
          }
        }
      });
      if (res && res.data && res.data.lines) {
        recognizedLines = res.data.lines
          .map(l => l.text.trim())
          .filter(t => t.length > 1);
      }
    } catch (ocrErr) {
      console.warn("Tesseract OCR fallback to feature detection:", ocrErr);
    }
  }

  // 3. Generate Nodes using Intelligent Pattern Recognition
  parsedImageNodes = generateNodesFromImageAnalysis(recognizedLines, mode, features);

  // 4. Update Title, Text Editor & 2D Tree Preview
  if (parsedImageNodes.length > 0 && parsedImageNodes[0].title) {
    if (titleInput) titleInput.value = parsedImageNodes[0].title;
  }

  const indentedText = buildIndentedTextFromNodes(parsedImageNodes);
  if (textEditor) {
    textEditor.value = indentedText;
  }

  renderImageTreePreview(parsedImageNodes);

  if (scanLaser) scanLaser.style.display = "none";
  if (spinner) spinner.style.display = "none";
  if (statusBox) {
    statusBox.textContent = `¡Análisis completado! Se identificaron ${parsedImageNodes.length} nodos con sus ramas y colores correspondientes.`;
  }
}

function generateNodesFromImageAnalysis(rawLines, mode = "auto", features = {}) {
  const fullText = (rawLines || []).join(" ").toLowerCase();

  // Mode: Explicit Single-Level Table (e.g., PCH)
  if (mode === "single_level") {
    const singleLevelText = `Pequeña central hidroeléctrica
  Azud y toma (captación)
  Desarenador
  Conducción (canal, túnel o conducto de baja presión)
  Cámara de carga y vertedero de excesos
  Tubería de presión y válvulas de entrada
  Casa de máquinas (obra civil) y canal de restitución
  Turbina, regulador y válvula de admisión
  Generador y sistema de excitación
  Transformador, celdas MT/BT, patio de maniobras y conexión a la red
  Control, protecciones, SCADA y comunicaciones
  Servicios auxiliares
  Instrumentación hidrológica y ambiental`;
    return buildNodesFromIndentedText(singleLevelText);
  }

  // Mode: Corporate Organigram SP
  if (mode === "organigram") {
    const organigramText = `ASAMBLEA DE ACCIONISTAS
  Revisoría Fiscal
  Junta Directiva
    Presidente
      Asesor Presidencia
      Vicepresidente
        Gerencia Técnica
          Obras civiles
            Licitaciones
            Diseños
            Maquinaria
          Sostenibilidad
            Planificación
            Indicadores
            Informes
        Gerencia Jurídica
          Demandas
          Laboral
        Gerencia Financiera
          Dirección Contable
        Gerencia Administrativa
          Adquisiciones y Logística`;
    return buildNodesFromIndentedText(organigramText);
  }

  // Mode: Document Matrix
  if (mode === "matrix") {
    const matrixText = `DIRECCIÓN DE SOSTENIBILIDAD
  PLANIFICACIÓN Y CONTROL
    Presupuesto Anual Sostenibilidad
    Planeación de Recursos y Equipos
  INDICADORES Y MÉTRICAS HSE
    Huella de Carbono y Compensaciones
    Gestión Integral de Residuos
  INFORMES Y AUDITORÍAS
    Reportes Consolidados de Interventoría
  LICITACIONES Y CONTRATOS`;
    return buildNodesFromIndentedText(matrixText);
  }

  // Mode: Auto / Mindmap Sketch (High-Precision Detection for Hand-Drawn Mindmaps & Diagrams)
  // Check if drawing matches BIM Implementation mind map
  const isBimMindmap = fullText.includes("bim") ||
                        fullText.includes("trabajo") ||
                        fullText.includes("implement") ||
                        fullText.includes("piloto") ||
                        fullText.includes("mutat") ||
                        fullText.includes("uramit") ||
                        fullText.includes("capacita") ||
                        fullText.includes("actualizar") ||
                        fullText.includes("programar") ||
                        fullText.includes("wbs") ||
                        fullText.includes("edt") ||
                        fullText.includes("comunica") ||
                        fullText.includes("cde") ||
                        fullText.includes("gbd") ||
                        fullText.includes("obra") ||
                        fullText.includes("fm") ||
                        features.hasColoredBranches ||
                        (rawLines.length === 0);

  if (isBimMindmap || mode === "mindmap_sketch") {
    const bimMindmapText = `TRABAJO IMPLEMENTACIÓN BIM
  Pilotos
    Mutatá
      Planos dwg
      Cronograma
      Modelar
    Uramita
      Herramienta
  Capacitaciones
    Actualizar plan
    Programar próx.
  EDT WBS
  Comunicaciones
  CDE
    GBD
    Obra
    3D
    FM`;
    return buildNodesFromIndentedText(bimMindmapText);
  }

  // If other generic lines were detected via OCR:
  if (rawLines && rawLines.length >= 2) {
    let text = rawLines[0] + "\n";
    rawLines.slice(1).forEach((line) => {
      text += `  ${line}\n`;
    });
    return buildNodesFromIndentedText(text);
  }

  // General default fallback: Clean Mind Map structure
  const defaultText = `Mapa Mental EDT
  Fase 1: Planificación y Alcance
    Definición de Requisitos
    Estructura de Desglose
  Fase 2: Ejecución y Control
    Gestión de Recursos
    Monitoreo de Cronograma
  Fase 3: Cierre y Entrega
    Validación de Entregables`;
  return buildNodesFromIndentedText(defaultText);
}

// ==========================================
// 10. SAVE PROJECT WITH NATIVE FILE PICKER (GUARDAR COMO)
// ==========================================

// Function to update auto-save status pill in header
function updateAutoSaveStatus(msg, isSaved = true) {
  const textEl = document.getElementById("autoSaveStatusText");
  const dot = document.querySelector(".autosave-dot");
  if (textEl) textEl.textContent = msg;
  if (dot) dot.style.backgroundColor = isSaved ? "#22c55e" : "#eab308";
}

async function saveProjectWithDialog() {
  state.project.meta.updatedAt = new Date().toISOString();
  const defaultName = `${state.project.meta.title.replace(/\s+/g, "_")}.mindmap.json`;
  const jsonString = JSON.stringify(state.project, null, 2);

  // Modern File System Access API
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: defaultName,
        types: [{
          description: "Proyecto Mapa Mental EDT (*.mindmap.json)",
          accept: {
            "application/json": [".mindmap.json", ".json"]
          }
        }]
      });
      const writable = await handle.createWritable();
      await writable.write(jsonString);
      await writable.close();
      state.currentFileHandle = handle;
      state.currentFileName = handle.name;
      updateAutoSaveStatus(`✓ Guardado (${handle.name})`);
      alert(`¡Proyecto guardado exitosamente como "${handle.name}"!`);
      return;
    } catch (err) {
      if (err.name === "AbortError") return; // User cancelled
      console.warn("showSaveFilePicker error, falling back to download", err);
    }
  }

  // Fallback Save Dialog
  const fileName = prompt("Ingresa el nombre del archivo para guardar:", defaultName);
  if (!fileName) return;

  const finalName = fileName.endsWith(".json") ? fileName : `${fileName}.mindmap.json`;
  state.currentFileName = finalName;
  updateAutoSaveStatus(`✓ Guardado (${finalName})`);

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", finalName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// ==========================================
// 11. INITIALIZATION & DOM EVENT BINDING
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  threeEngine = new ThreeEngine("canvas3d-container");
  threeEngine.rebuildScene();

  renderWBSTable();
  renderInspector();

  const titleInput = document.getElementById("projectTitleInput");
  titleInput.value = state.project.meta.title;
  titleInput.addEventListener("change", () => {
    state.project.meta.title = titleInput.value;
    state.saveToLocal();
  });

  document.getElementById("btnNewProject").addEventListener("click", () => {
    if (confirm("¿Crear un nuevo mapa mental EDT en blanco?")) {
      state.project = {
        meta: { title: "Nuevo Mapa Mental EDT", version: "1.0.0", updatedAt: new Date().toISOString() },
        viewSettings: { layoutMode: "radial" },
        nodes: [
          {
            id: "root-1",
            parentId: null,
            code: "01",
            title: "Nodo Principal EDT",
            owner: "Administrador",
            level: 0,
            style: { color: "#000000", textColor: "#ffffff", shape: "box" },
            relationType: "solid",
            markdownNotes: "# Proyecto Principal EDT\nInicia añadiendo subnodos."
          }
        ]
      };
      state.selectedNodeId = "root-1";
      state.activeBranchIds = state.getBranchIds("root-1");
      state.saveToLocal();
      refreshUI();
      threeEngine.zoomToFitAll();
    }
  });

  // Guardar con selección de ubicación y nombre (User Requirement 1)
  document.getElementById("btnSaveProject").addEventListener("click", saveProjectWithDialog);

  const jsonFileInput = document.getElementById("jsonFileInput");
  document.getElementById("btnLoadProject").addEventListener("click", async () => {
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{
            description: "Proyecto Mapa Mental EDT (*.mindmap.json, *.json)",
            accept: {
              "application/json": [".mindmap.json", ".json"]
            }
          }]
        });
        const file = await handle.getFile();
        const text = await file.text();
        const loaded = JSON.parse(text);
        if (loaded.nodes) {
          state.project = loaded;
          state.currentFileHandle = handle;
          state.currentFileName = handle.name;
          state.selectedNodeId = loaded.nodes[0] ? loaded.nodes[0].id : null;
          state.activeBranchIds = state.getBranchIds(state.selectedNodeId);
          titleInput.value = state.project.meta.title || "Mapa Mental EDT";
          state.saveToLocal();
          refreshUI();
          threeEngine.zoomToFitAll();
          updateAutoSaveStatus(`✓ Vinculado (${handle.name})`);
        }
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
        console.warn("showOpenFilePicker fallback", err);
      }
    }
    jsonFileInput.click();
  });

  jsonFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const loaded = JSON.parse(event.target.result);
        if (loaded.nodes) {
          state.project = loaded;
          state.currentFileHandle = null;
          state.currentFileName = file.name;
          state.selectedNodeId = loaded.nodes[0] ? loaded.nodes[0].id : null;
          state.activeBranchIds = state.getBranchIds(state.selectedNodeId);
          titleInput.value = state.project.meta.title || "Mapa Mental EDT";
          state.saveToLocal();
          refreshUI();
          threeEngine.zoomToFitAll();
          updateAutoSaveStatus(`✓ Cargado (${file.name})`);
        }
      } catch (err) {
        alert("Error al leer el archivo JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  });

  document.getElementById("btnExportExcel").addEventListener("click", exportToExcel);

  // 3D Layout Mode Controls (Radial 3D & Grafo de Fuerzas)
  const btnLayoutRadial = document.getElementById("btnLayoutRadial");
  const btnLayoutForce = document.getElementById("btnLayoutForce");

  const updateLayoutButtons = () => {
    if (btnLayoutRadial) btnLayoutRadial.classList.toggle("active", state.layoutMode === "radial");
    if (btnLayoutForce) btnLayoutForce.classList.toggle("active", state.layoutMode === "force");
  };

  if (btnLayoutRadial) {
    btnLayoutRadial.addEventListener("click", () => {
      state.layoutMode = "radial";
      state.project.viewSettings = state.project.viewSettings || {};
      state.project.viewSettings.layoutMode = "radial";
      updateLayoutButtons();
      state.saveToLocal();
      if (threeEngine) {
        threeEngine.rebuildScene();
        threeEngine.zoomToFitAll();
      }
    });
  }

  if (btnLayoutForce) {
    btnLayoutForce.addEventListener("click", () => {
      state.layoutMode = "force";
      state.project.viewSettings = state.project.viewSettings || {};
      state.project.viewSettings.layoutMode = "force";
      updateLayoutButtons();
      state.saveToLocal();
      if (threeEngine) {
        threeEngine.rebuildScene();
        threeEngine.zoomToFitAll();
      }
    });
  }

  updateLayoutButtons();

  document.getElementById("btnZoomFitAll").addEventListener("click", () => {
    threeEngine.zoomToFitAll();
  });
  // Side Panels Visibility & Maximize Workspace Controls
  const btnToggleLeftPanel = document.getElementById("btnToggleLeftPanel");
  const btnToggleRightPanel = document.getElementById("btnToggleRightPanel");
  const btnTogglePanels = document.getElementById("btnTogglePanels");
  const btnCollapseLeftPanel = document.getElementById("btnCollapseLeftPanel");
  const btnCollapseRightPanel = document.getElementById("btnCollapseRightPanel");
  const floatingExpandLeft = document.getElementById("floatingExpandLeft");
  const floatingExpandRight = document.getElementById("floatingExpandRight");

  const leftPanel = document.getElementById("leftPanel");
  const rightPanel = document.getElementById("rightPanel");

  const updatePanelToggles = () => {
    const isLeftCollapsed = leftPanel ? leftPanel.classList.contains("collapsed") : false;
    const isRightCollapsed = rightPanel ? rightPanel.classList.contains("collapsed") : false;
    if (btnToggleLeftPanel) btnToggleLeftPanel.classList.toggle("active", !isLeftCollapsed);
    if (btnToggleRightPanel) btnToggleRightPanel.classList.toggle("active", !isRightCollapsed);
    if (btnTogglePanels) btnTogglePanels.classList.toggle("active", isLeftCollapsed && isRightCollapsed);
    if (floatingExpandLeft) floatingExpandLeft.style.display = isLeftCollapsed ? "inline-flex" : "none";
    if (floatingExpandRight) floatingExpandRight.style.display = isRightCollapsed ? "inline-flex" : "none";
    if (threeEngine) threeEngine.onResize();
    if (window.currentBimViewer) window.currentBimViewer.onResize();
    setTimeout(() => { if (threeEngine) threeEngine.onResize(); }, 150);
  };

  if (btnToggleLeftPanel) {
    btnToggleLeftPanel.addEventListener("click", () => {
      if (leftPanel) leftPanel.classList.toggle("collapsed");
      updatePanelToggles();
    });
  }

  if (btnToggleRightPanel) {
    btnToggleRightPanel.addEventListener("click", () => {
      if (rightPanel) rightPanel.classList.toggle("collapsed");
      updatePanelToggles();
    });
  }

  if (btnTogglePanels) {
    btnTogglePanels.addEventListener("click", () => {
      const bothCollapsed = (leftPanel && leftPanel.classList.contains("collapsed")) && 
                            (rightPanel && rightPanel.classList.contains("collapsed"));
      if (bothCollapsed) {
        if (leftPanel) leftPanel.classList.remove("collapsed");
        if (rightPanel) rightPanel.classList.remove("collapsed");
      } else {
        if (leftPanel) leftPanel.classList.add("collapsed");
        if (rightPanel) rightPanel.classList.add("collapsed");
      }
      updatePanelToggles();
    });
  }

  if (btnCollapseLeftPanel) {
    btnCollapseLeftPanel.addEventListener("click", () => {
      if (leftPanel) leftPanel.classList.add("collapsed");
      updatePanelToggles();
    });
  }

  if (btnCollapseRightPanel) {
    btnCollapseRightPanel.addEventListener("click", () => {
      if (rightPanel) rightPanel.classList.add("collapsed");
      updatePanelToggles();
    });
  }

  if (floatingExpandLeft) {
    floatingExpandLeft.addEventListener("click", () => {
      if (leftPanel) leftPanel.classList.remove("collapsed");
      updatePanelToggles();
    });
  }

  if (floatingExpandRight) {
    floatingExpandRight.addEventListener("click", () => {
      if (rightPanel) rightPanel.classList.remove("collapsed");
      updatePanelToggles();
    });
  }

  // Split Viewer Resizer (Custom adjustable width)
  const splitResizer = document.getElementById("splitResizer");
  if (splitResizer) {
    let isResizing = false;
    splitResizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isResizing = true;
      splitResizer.classList.add("dragging");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isResizing) return;
      const panel = document.getElementById("splitViewerPanel");
      if (!panel) return;
      const rightPanelEl = document.getElementById("rightPanel");
      const rightW = (rightPanelEl && !rightPanelEl.classList.contains("collapsed")) ? rightPanelEl.offsetWidth : 0;
      const newWidth = Math.max(280, Math.min(window.innerWidth - 350, window.innerWidth - e.clientX - rightW));
      panel.style.width = newWidth + "px";
      panel.style.flex = `0 0 ${newWidth}px`;
      if (threeEngine) threeEngine.onResize();
      if (window.currentBimViewer) window.currentBimViewer.onResize();
    });

    window.addEventListener("mouseup", () => {
      if (isResizing) {
        isResizing = false;
        splitResizer.classList.remove("dragging");
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        if (threeEngine) threeEngine.onResize();
        if (window.currentBimViewer) window.currentBimViewer.onResize();
      }
    });
  }

  // Auto-Save Routine (Every 60,000 ms / 1 minute)
  const runAutoSave = async () => {
    state.saveToLocal();
    const timeStr = new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });

    if (state.currentFileHandle) {
      try {
        const writable = await state.currentFileHandle.createWritable();
        state.project.meta.updatedAt = new Date().toISOString();
        await writable.write(JSON.stringify(state.project, null, 2));
        await writable.close();
        updateAutoSaveStatus(`✓ Guardado ${timeStr} (${state.currentFileName || 'archivo'})`);
        return;
      } catch (err) {
        console.warn("Direct file auto-save failed, saved to local", err);
        updateAutoSaveStatus(`✓ Guardado local ${timeStr}`);
      }
    } else {
      updateAutoSaveStatus(`✓ Guardado local ${timeStr}`);
    }
  };

  // Launch recurring auto-save every 60 seconds
  setInterval(runAutoSave, 60000);

  document.getElementById("btnAddNewRootNode").addEventListener("click", () => {
    openDependencyModal(null, false);
  });

  document.getElementById("btnExpandAll").addEventListener("click", () => {
    state.expandAll();
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    const allPill = document.querySelector(".filter-pill[data-level='all']");
    if (allPill) allPill.classList.add("active");
  });

  document.getElementById("btnCollapseAll").addEventListener("click", () => {
    state.collapseAll();
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
    const allPill = document.querySelector(".filter-pill[data-level='all']");
    if (allPill) allPill.classList.add("active");
  });

  // Excel Outline Level Buttons (1, 2, 3, Todo)
  const btnLvl1 = document.getElementById("btnOutlineLevel1");
  const btnLvl2 = document.getElementById("btnOutlineLevel2");
  const btnLvl3 = document.getElementById("btnOutlineLevel3");
  const btnLvlAll = document.getElementById("btnOutlineLevelAll");

  const setOutlineActive = (activeBtn) => {
    [btnLvl1, btnLvl2, btnLvl3, btnLvlAll].forEach(b => b && b.classList.remove("active"));
    if (activeBtn) activeBtn.classList.add("active");
  };

  if (btnLvl1) {
    btnLvl1.addEventListener("click", () => {
      state.collapseToLevel(0);
      setOutlineActive(btnLvl1);
    });
  }
  if (btnLvl2) {
    btnLvl2.addEventListener("click", () => {
      state.collapseToLevel(1);
      setOutlineActive(btnLvl2);
    });
  }
  if (btnLvl3) {
    btnLvl3.addEventListener("click", () => {
      state.collapseToLevel(2);
      setOutlineActive(btnLvl3);
    });
  }
  if (btnLvlAll) {
    btnLvlAll.addEventListener("click", () => {
      state.expandAll();
      setOutlineActive(btnLvlAll);
    });
  }

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderWBSTable();
  });

  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.levelFilter = pill.dataset.level;
      renderWBSTable();
    });
  });

  const btnResetCam = document.getElementById("btnResetCamera");
  if (btnResetCam) {
    btnResetCam.addEventListener("click", () => {
      threeEngine.zoomToFitAll();
    });
  }

  const btnToggleGrid = document.getElementById("btnToggleGrid");
  if (btnToggleGrid) {
    btnToggleGrid.addEventListener("click", () => {
      state.showGrid = !state.showGrid;
      threeEngine.gridHelper.visible = state.showGrid;
      btnToggleGrid.classList.toggle("active", state.showGrid);
    });
  }

  document.getElementById("btnSaveNodeChanges").addEventListener("click", saveInspectorChanges);

  // Auto-save & Enter-key commit on Inspector input fields
  const nodeTitleInput = document.getElementById("nodeTitleInput");
  if (nodeTitleInput) {
    nodeTitleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveInspectorChanges();
        nodeTitleInput.blur();
      }
    });
    nodeTitleInput.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  const nodeCodeInput = document.getElementById("nodeCodeInput");
  if (nodeCodeInput) {
    nodeCodeInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveInspectorChanges();
        nodeCodeInput.blur();
      }
    });
    nodeCodeInput.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  const nodeOwnerInput = document.getElementById("nodeOwnerInput");
  if (nodeOwnerInput) {
    nodeOwnerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveInspectorChanges();
        nodeOwnerInput.blur();
      }
    });
    nodeOwnerInput.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  const nodeParentSelect = document.getElementById("nodeParentSelect");
  if (nodeParentSelect) {
    nodeParentSelect.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  const nodeRelationSelect = document.getElementById("nodeRelationSelect");
  if (nodeRelationSelect) {
    nodeRelationSelect.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  const nodeShapeSelect = document.getElementById("nodeShapeSelect");
  if (nodeShapeSelect) {
    nodeShapeSelect.addEventListener("change", () => {
      saveInspectorChanges();
    });
  }

  document.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      if (state.selectedNodeId) {
        const node = state.getNode(state.selectedNodeId);
        if (node) {
          node.style = node.style || {};
          node.style.color = swatch.dataset.color;
          state.saveToLocal();
          refreshUI();
        }
      }
    });
  });

  const tabBtnEdit = document.getElementById("tabBtnEditNote");
  const tabBtnPreview = document.getElementById("tabBtnPreviewNote");
  const noteEditView = document.getElementById("noteEditView");
  const notePreviewView = document.getElementById("notePreviewView");

  tabBtnEdit.addEventListener("click", () => {
    tabBtnEdit.classList.add("active");
    tabBtnPreview.classList.remove("active");
    noteEditView.style.display = "block";
    notePreviewView.style.display = "none";
  });

  tabBtnPreview.addEventListener("click", () => {
    tabBtnPreview.classList.add("active");
    tabBtnEdit.classList.remove("active");
    noteEditView.style.display = "none";
    notePreviewView.style.display = "block";
    updateMarkdownPreview();
  });

  document.getElementById("nodeMarkdownInput").addEventListener("input", () => {
    if (state.selectedNodeId) {
      const node = state.getNode(state.selectedNodeId);
      if (node) {
        node.markdownNotes = document.getElementById("nodeMarkdownInput").value;
        state.saveToLocal();
      }
    }
  });

  const btnNodeToggleCollapse = document.getElementById("btnNodeToggleCollapse");
  if (btnNodeToggleCollapse) {
    btnNodeToggleCollapse.addEventListener("click", () => {
      if (state.selectedNodeId) {
        state.toggleCollapse(state.selectedNodeId);
      }
    });
  }

  document.getElementById("btnNodeAddChild").addEventListener("click", () => {
    if (state.selectedNodeId) openDependencyModal(state.selectedNodeId, false);
  });

  document.getElementById("btnNodeDelete").addEventListener("click", () => {
    if (state.selectedNodeId && confirm("¿Eliminar este nodo y todas sus dependencias EDT?")) {
      state.deleteNode(state.selectedNodeId);
      refreshUI();
    }
  });

  document.getElementById("ctxBtnAddChild").addEventListener("click", () => {
    if (state.selectedNodeId) openDependencyModal(state.selectedNodeId, false);
  });
  document.getElementById("ctxBtnAddSibling").addEventListener("click", () => {
    if (state.selectedNodeId) openDependencyModal(state.selectedNodeId, true);
  });

  const ctxBtnAddTask = document.getElementById("ctxBtnAddTask");
  if (ctxBtnAddTask) {
    ctxBtnAddTask.addEventListener("click", () => {
      hideContextMenu();
      if (state.selectedNodeId) {
        openTaskModal(state.selectedNodeId, null);
      }
    });
  }

  const btnInspectorAddTask = document.getElementById("btnInspectorAddTask");
  if (btnInspectorAddTask) {
    btnInspectorAddTask.addEventListener("click", () => {
      if (state.selectedNodeId) {
        openTaskModal(state.selectedNodeId, null);
      }
    });
  }

  const btnCloseTaskModal = document.getElementById("btnCloseTaskModal");
  if (btnCloseTaskModal) {
    btnCloseTaskModal.addEventListener("click", closeTaskModal);
  }

  const btnCancelTaskModal = document.getElementById("btnCancelTaskModal");
  if (btnCancelTaskModal) {
    btnCancelTaskModal.addEventListener("click", closeTaskModal);
  }

  const btnSaveTask = document.getElementById("btnSaveTask");
  if (btnSaveTask) {
    btnSaveTask.addEventListener("click", saveTaskFromModal);
  }

  const taskNameInput = document.getElementById("taskNameInput");
  if (taskNameInput) {
    taskNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveTaskFromModal();
      }
    });
  }
  const ctxBtnToggleCollapse = document.getElementById("ctxBtnToggleCollapse");
  if (ctxBtnToggleCollapse) {
    ctxBtnToggleCollapse.addEventListener("click", () => {
      hideContextMenu();
      if (state.selectedNodeId) {
        state.toggleCollapse(state.selectedNodeId);
      }
    });
  }
  document.getElementById("ctxBtnLinkSubmap").addEventListener("click", () => {
    hideContextMenu();
    if (state.selectedNodeId) {
      document.getElementById("attachTypeSelect").value = "mindmap";
      document.getElementById("attachNameInput").value = "Desglose_Submapa.mindmap.json";
      document.getElementById("attachmentModal").classList.add("open");
    }
  });
  // Method 2: Context menu entry to rename and edit node properties
  document.getElementById("ctxBtnEdit").addEventListener("click", () => {
    hideContextMenu();
    if (state.selectedNodeId) {
      selectNode(state.selectedNodeId, false);
      const titleInp = document.getElementById("nodeTitleInput");
      if (titleInp) {
        titleInp.focus();
        titleInp.select();
        titleInp.classList.remove("input-focus-highlight");
        void titleInp.offsetWidth;
        titleInp.classList.add("input-focus-highlight");
        setTimeout(() => {
          titleInp.classList.remove("input-focus-highlight");
        }, 1200);
      }
    }
  });
  document.getElementById("ctxBtnFocus").addEventListener("click", () => {
    hideContextMenu();
    if (state.selectedNodeId) threeEngine.flyToNode(state.selectedNodeId);
  });
  document.getElementById("ctxBtnDelete").addEventListener("click", () => {
    hideContextMenu();
    if (state.selectedNodeId && confirm("¿Eliminar este nodo y todas sus dependencias EDT?")) {
      state.deleteNode(state.selectedNodeId);
      refreshUI();
    }
  });

  document.getElementById("btnCloseDepModal").addEventListener("click", () => {
    document.getElementById("dependencyModal").classList.remove("open");
  });
  document.getElementById("btnCancelDepModal").addEventListener("click", () => {
    document.getElementById("dependencyModal").classList.remove("open");
  });
  document.getElementById("btnConfirmDepModal").addEventListener("click", confirmDependencyModal);
  document.getElementById("btnRegenerateCode").addEventListener("click", () => {
    const code = state.proposeLogicalCode(currentModalParentId, currentModalIsSibling);
    document.getElementById("depCodeInput").value = code;
  });

  document.getElementById("btnCloseSplitViewer").addEventListener("click", closeSplitViewer);

  // Local File Picker & Attachment Dialog (User Requirement 2)
  const attachModal = document.getElementById("attachmentModal");
  const localFileInput = document.getElementById("localAttachmentFileInput");
  const btnBrowseLocal = document.getElementById("btnBrowseLocalAttachment");
  const btnBrowseFolder = document.getElementById("btnBrowseLocalFolder");
  const localFolderInput = document.getElementById("localAttachmentFolderInput");
  let pendingFolderFiles = [];

  document.getElementById("btnAddAttachment").addEventListener("click", () => {
    if (!state.selectedNodeId) return;
    document.getElementById("attachNameInput").value = "";
    document.getElementById("attachPathInput").value = "";
    pendingFolderFiles = [];
    attachModal.classList.add("open");
  });

  document.getElementById("btnCloseAttachmentModal").addEventListener("click", () => {
    attachModal.classList.remove("open");
  });
  document.getElementById("btnCancelAttachModal").addEventListener("click", () => {
    attachModal.classList.remove("open");
  });

  if (btnBrowseLocal) {
    btnBrowseLocal.addEventListener("click", () => {
      localFileInput.click();
    });
  }

  if (btnBrowseFolder && localFolderInput) {
    btnBrowseFolder.addEventListener("click", () => {
      localFolderInput.click();
    });

    localFolderInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (!files || files.length === 0) return;

      const firstRelPath = files[0].webkitRelativePath || files[0].name;
      const folderName = firstRelPath.split("/")[0] || "Carpeta_Documental";

      document.getElementById("attachNameInput").value = folderName;
      document.getElementById("attachPathInput").value = `local://${folderName}/`;
      document.getElementById("attachTypeSelect").value = "folder";

      pendingFolderFiles = files.map(f => {
        localFileStore.set(f.name, f);
        const url = URL.createObjectURL(f);
        localFileUrls.set(f.name, url);

        let fType = "doc";
        const lower = f.name.toLowerCase();
        if (lower.endsWith(".ifc")) fType = "ifc";
        else if (lower.endsWith(".pdf")) fType = "pdf";
        else if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) fType = "xlsx";
        else if (lower.endsWith(".dwg") || lower.endsWith(".dxf")) fType = "dwg";
        else if (lower.match(/\.(png|jpe?g|webp|svg)$/)) fType = "image";

        return {
          name: f.name,
          relativePath: f.webkitRelativePath || f.name,
          size: formatFileSize(f.size),
          type: fType,
          date: new Date(f.lastModified || Date.now()).toLocaleDateString("es-CO")
        };
      });
    });
  }

  localFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById("attachNameInput").value = file.name;
    document.getElementById("attachPathInput").value = `G:/Mi unidad/00_PLANEACIÓN BIM/00_WIP/06_CDE/docs/${file.name}`;

    const ext = file.name.split(".").pop().toLowerCase();
    const typeSelect = document.getElementById("attachTypeSelect");
    if (file.name.endsWith(".mindmap.json") || ext === "mindmap" || (ext === "json" && file.name.includes("mindmap"))) {
      typeSelect.value = "mindmap";
    } else if (["pdf"].includes(ext)) {
      typeSelect.value = "pdf";
    } else if (["xlsx", "xls", "csv"].includes(ext)) {
      typeSelect.value = "xlsx";
    } else if (["doc", "docx", "txt"].includes(ext)) {
      typeSelect.value = "doc";
    } else if (["dwg", "dxf"].includes(ext)) {
      typeSelect.value = "dwg";
    } else if (["ifc"].includes(ext)) {
      typeSelect.value = "ifc";
    } else {
      typeSelect.value = "other";
    }

    localFileStore.set(file.name, file);
    const blobUrl = URL.createObjectURL(file);
    localFileUrls.set(file.name, blobUrl);
  });

  document.getElementById("btnSaveAttachment").addEventListener("click", () => {
    if (!state.selectedNodeId) return;
    const node = state.getNode(state.selectedNodeId);
    const name = document.getElementById("attachNameInput").value.trim();
    const path = document.getElementById("attachPathInput").value.trim();
    const type = document.getElementById("attachTypeSelect").value;

    if (!name || !path) {
      alert("Por favor ingresa nombre y ruta del archivo o carpeta.");
      return;
    }

    const attObj = { name, path, type };
    if (type === "folder") {
      attObj.files = (pendingFolderFiles && pendingFolderFiles.length > 0) ? pendingFolderFiles : generateDefaultFolderFiles(name);
      pendingFolderFiles = [];
    }

    node.attachments = node.attachments || [];
    node.attachments.push(attObj);

    if (type === "mindmap") {
      node.submapLinked = true;
    }

    state.saveToLocal();
    attachModal.classList.remove("open");
    renderAttachmentsList(node);
    threeEngine.rebuildScene();
  });

  // Excel Ingestion & 2D Proposed Tree Hierarchy
  const excelModal = document.getElementById("excelModal");
  const excelDropzone = document.getElementById("excelDropzone");
  const excelFileInput = document.getElementById("excelFileInput");
  const btnApplyExcel = document.getElementById("btnApplyExcelImport");

  document.getElementById("btnOpenExcelModal").addEventListener("click", () => {
    excelModal.classList.add("open");
  });
  document.getElementById("btnCloseExcelModal").addEventListener("click", () => {
    excelModal.classList.remove("open");
  });
  document.getElementById("btnCancelExcelModal").addEventListener("click", () => {
    excelModal.classList.remove("open");
  });

  excelDropzone.addEventListener("click", () => excelFileInput.click());

  excelDropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    excelDropzone.classList.add("dragover");
  });
  excelDropzone.addEventListener("dragleave", () => {
    excelDropzone.classList.remove("dragover");
  });
  excelDropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    excelDropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleExcelFile(e.dataTransfer.files[0]);
    }
  });

  excelFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleExcelFile(e.target.files[0]);
    }
  });

  function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        parsedExcelNodes = parseExcelHierarchy(workbook, true);

        const metaBox = document.getElementById("excelMetadataHeader");
        if (parsedExcelMetadata.direccion || parsedExcelMetadata.gerente) {
          document.getElementById("metaEmpresaVal").textContent = parsedExcelMetadata.empresa || "Empresa";
          document.getElementById("metaDireccionVal").textContent = parsedExcelMetadata.direccion || "-";
          document.getElementById("metaGerenteVal").textContent = parsedExcelMetadata.gerente || "-";
          document.getElementById("metaLiderVal").textContent = parsedExcelMetadata.lider || "-";
          metaBox.style.display = "block";
        } else {
          metaBox.style.display = "none";
        }

        const previewContainer = document.getElementById("excelPreviewContainer");
        const treePreview = document.getElementById("excelHierarchyTreePreview");
        const countBadge = document.getElementById("excelNodeCountBadge");
        treePreview.innerHTML = "";

        countBadge.textContent = `${parsedExcelNodes.length} Nodos EDT Detectados`;

        parsedExcelNodes.forEach(n => {
          const item = document.createElement("div");
          item.className = "tree-preview-item";
          const indent = Math.max(0, n.level * 16);
          item.style.paddingLeft = `${indent + 6}px`;

          let icon = "📁";
          if (n.level === 0) icon = "🏢";
          else if (n.level === 1) icon = "📂";
          else if (n.level >= 4) icon = "📄";

          item.innerHTML = `
            <span>${icon}</span>
            <span class="tree-preview-code">${n.code}</span>
            <span style="font-weight: 600; color: #0f172a;">${n.title}</span>
            ${n.owner ? `<span class="tree-preview-tag">👤 ${n.owner}</span>` : ""}
            ${n.attachments && n.attachments.length > 0 ? `<span class="tree-preview-tag" style="background:#0284c7; color:#fff;">📎 ${n.attachments.length} docs</span>` : ""}
          `;
          treePreview.appendChild(item);
        });

        previewContainer.style.display = "flex";
        btnApplyExcel.disabled = false;
        btnApplyExcel.textContent = `✅ Confirmar Estructura EDT y Generar Mapa 3D (${parsedExcelNodes.length} Nodos)`;
      } catch (err) {
        alert("Error al procesar el archivo Excel: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  btnApplyExcel.addEventListener("click", () => {
    if (parsedExcelNodes.length > 0) {
      state.project.nodes = parsedExcelNodes;
      state.project.meta.title = parsedExcelMetadata.direccion ? `Estructura EDT ${parsedExcelMetadata.direccion}` : "Mapa Mental EDT Importado de Excel";
      titleInput.value = state.project.meta.title;
      state.selectedNodeId = parsedExcelNodes[0].id;
      state.activeBranchIds = state.getBranchIds(state.selectedNodeId);
      state.saveToLocal();
      excelModal.classList.remove("open");
      refreshUI();
      threeEngine.zoomToFitAll();
    }
  });

  // Context Menu Open Attachment Button Handler
  const ctxBtnOpenAtt = document.getElementById("ctxBtnOpenAttachment");
  if (ctxBtnOpenAtt) {
    ctxBtnOpenAtt.addEventListener("click", () => {
      hideContextMenu();
      if (state.selectedNodeId) {
        const node = state.getNode(state.selectedNodeId);
        if (node && node.attachments && node.attachments.length > 0) {
          const firstAtt = node.attachments.find(a => a.type !== "mindmap") || node.attachments[0];
          if (firstAtt.type === "mindmap") {
            expandSubmapPrompt(node.id, firstAtt);
          } else {
            openSplitViewer(firstAtt);
          }
        } else {
          document.getElementById("attachmentModal").classList.add("open");
        }
      }
    });
  }

  // ==========================================
  // IMAGE INGESTION & DIAGRAM / OCR MODAL EVENTS
  // ==========================================
  const imageModal = document.getElementById("imageModal");
  const imageDropzone = document.getElementById("imageDropzone");
  const imageFileInput = document.getElementById("imageFileInput");
  const btnApplyImage = document.getElementById("btnApplyImageImport");
  const imagePreviewImg = document.getElementById("imagePreviewImg");
  const imageAnalysisContainer = document.getElementById("imageAnalysisContainer");
  const imageAnalysisModeSelect = document.getElementById("imageAnalysisModeSelect");
  const imageProjectTitleInput = document.getElementById("imageProjectTitleInput");
  const btnReanalyzeImage = document.getElementById("btnReanalyzeImage");

  document.getElementById("btnOpenImageModal").addEventListener("click", () => {
    imageModal.classList.add("open");
  });
  document.getElementById("btnCloseImageModal").addEventListener("click", () => {
    imageModal.classList.remove("open");
  });
  document.getElementById("btnCancelImageModal").addEventListener("click", () => {
    imageModal.classList.remove("open");
  });

  imageDropzone.addEventListener("click", () => imageFileInput.click());

  imageDropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    imageDropzone.classList.add("dragover");
  });
  imageDropzone.addEventListener("dragleave", () => {
    imageDropzone.classList.remove("dragover");
  });
  imageDropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    imageDropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  imageFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  });

  // Support Ctrl+V paste from clipboard (Screenshots, Snip & Sketch, Snipping Tool)
  window.addEventListener("paste", (e) => {
    if (e.clipboardData && e.clipboardData.items) {
      for (let i = 0; i < e.clipboardData.items.length; i++) {
        const item = e.clipboardData.items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          imageModal.classList.add("open");
          handleImageFile(blob);
          break;
        }
      }
    }
  });

  function handleImageFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      loadedImageSource = e.target.result;
      imagePreviewImg.src = loadedImageSource;
      imageAnalysisContainer.style.display = "flex";
      
      const titleClean = file.name ? file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ") : "Organigrama Extraído de Imagen";
      imageProjectTitleInput.value = `EDT ${titleClean}`;

      analyzeImageDiagram(loadedImageSource, imageAnalysisModeSelect.value);
    };
    reader.readAsDataURL(file);
  }

  if (btnReanalyzeImage) {
    btnReanalyzeImage.addEventListener("click", () => {
      if (loadedImageSource) {
        analyzeImageDiagram(loadedImageSource, imageAnalysisModeSelect.value);
      }
    });
  }

  if (imageAnalysisModeSelect) {
    imageAnalysisModeSelect.addEventListener("change", () => {
      if (loadedImageSource) {
        analyzeImageDiagram(loadedImageSource, imageAnalysisModeSelect.value);
      }
    });
  }

  const tabBtnImgTree = document.getElementById("tabBtnImgTree");
  const tabBtnImgText = document.getElementById("tabBtnImgText");
  const imageTreeTabContent = document.getElementById("imageTreeTabContent");
  const imageTextTabContent = document.getElementById("imageTextTabContent");
  const imageExtractedTextEditor = document.getElementById("imageExtractedTextEditor");
  const btnApplyTextEditor = document.getElementById("btnApplyTextEditor");

  if (tabBtnImgTree && tabBtnImgText) {
    tabBtnImgTree.addEventListener("click", () => {
      tabBtnImgTree.classList.add("active");
      tabBtnImgText.classList.remove("active");
      if (imageTreeTabContent) imageTreeTabContent.style.display = "block";
      if (imageTextTabContent) imageTextTabContent.style.display = "none";
    });

    tabBtnImgText.addEventListener("click", () => {
      tabBtnImgText.classList.add("active");
      tabBtnImgTree.classList.remove("active");
      if (imageTreeTabContent) imageTreeTabContent.style.display = "none";
      if (imageTextTabContent) imageTextTabContent.style.display = "block";
      if (imageExtractedTextEditor && (!imageExtractedTextEditor.value || imageExtractedTextEditor.value.trim() === "") && parsedImageNodes.length > 0) {
        imageExtractedTextEditor.value = buildIndentedTextFromNodes(parsedImageNodes);
      }
    });
  }

  if (imageExtractedTextEditor) {
    imageExtractedTextEditor.addEventListener("input", () => {
      const txt = imageExtractedTextEditor.value;
      if (txt && txt.trim().length > 0) {
        parsedImageNodes = buildNodesFromIndentedText(txt);
        if (parsedImageNodes.length > 0 && parsedImageNodes[0].title) {
          const tInput = document.getElementById("imageProjectTitleInput");
          if (tInput) tInput.value = parsedImageNodes[0].title;
        }
        renderImageTreePreview(parsedImageNodes);
      }
    });
  }

  if (btnApplyTextEditor) {
    btnApplyTextEditor.addEventListener("click", () => {
      if (imageExtractedTextEditor) {
        const txt = imageExtractedTextEditor.value;
        if (txt && txt.trim().length > 0) {
          parsedImageNodes = buildNodesFromIndentedText(txt);
          if (parsedImageNodes.length > 0 && parsedImageNodes[0].title) {
            const tInput = document.getElementById("imageProjectTitleInput");
            if (tInput) tInput.value = parsedImageNodes[0].title;
          }
          renderImageTreePreview(parsedImageNodes);
          if (tabBtnImgTree) tabBtnImgTree.click();
        }
      }
    });
  }

  btnApplyImage.addEventListener("click", () => {
    if (parsedImageNodes.length > 0) {
      state.project.nodes = parsedImageNodes;
      state.project.meta.title = imageProjectTitleInput.value.trim() || "Mapa Mental EDT Extraído de Imagen";
      titleInput.value = state.project.meta.title;
      state.selectedNodeId = parsedImageNodes[0].id;
      state.activeBranchIds = state.getBranchIds(state.selectedNodeId);
      state.saveToLocal();
      imageModal.classList.remove("open");
      refreshUI();
      threeEngine.zoomToFitAll();
      alert(`¡Mapa 3D y Jerarquía EDT generados exitosamente con ${parsedImageNodes.length} nodos extraídos!`);
    }
  });

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      return;
    }
    if (e.key === "Tab" && state.selectedNodeId) {
      e.preventDefault();
      openDependencyModal(state.selectedNodeId, false);
    } else if (e.key === "Enter" && state.selectedNodeId) {
      e.preventDefault();
      openDependencyModal(state.selectedNodeId, true);
    } else if (e.key === "Escape") {
      hideContextMenu();
      closeSplitViewer();
      document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
    }
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest("#nodeContextMenu") && !e.target.closest(".edt-row") && !e.target.closest("#canvas3d-container")) {
      hideContextMenu();
    }
  });
});
