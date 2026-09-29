/**
 * @license
 * SYNTREVA — Future Technology Ecosystem
 * Master Vanilla JavaScript Experience Controller
 * Sage Green + Charcoal Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive systems
  initLoadingScreen();
  initCustomCursor();
  initStickyHeader();
  initScrollTracker();
  initHeroCore3D();
  initTechnologyUniverse();
  initIntelligencePipeline();
  initExploreCards();
  initBuildShowcase();
  initResearchCards();
  initFutureSignals();
  initEcosystemNavigator();
  initMagneticButtons();
  initModalControllers();
  initMobileMenu();
});

/* ==========================================================================
   1. Loading Experience (Short charcoal + sage light sweep, 1.2s max)
   ========================================================================== */
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  const fill = document.getElementById('loader-progress-fill');
  if (!loader || !fill) return;

  // Animate progress bar fill smoothly
  setTimeout(() => {
    fill.style.width = '100%';
  }, 100);

  // Transition into main content smoothly
  setTimeout(() => {
    loader.classList.add('loaded');
  }, 1200);
}

/* ==========================================================================
   2. Custom Cursor System (Sage highlight, desktop only)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Touch device check
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth ring lerp loop
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Interactive element hover detection
  const interactiveSelector = 'a, button, input, textarea, [data-interactive], .explore-card, .research-card, .build-project-card, .pipeline-stage-node, .universe-cat-btn';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
      ring.style.borderColor = 'rgba(218, 215, 205, 0.85)';
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.backgroundColor = 'rgba(163, 177, 138, 0.09)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
      ring.style.borderColor = 'rgba(163, 177, 138, 0.5)';
      ring.style.width = '38px';
      ring.style.height = '38px';
      ring.style.backgroundColor = 'rgba(163, 177, 138, 0.03)';
    }
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });

  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

/* ==========================================================================
   3. Sticky Header & Mobile Drawer
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  if (!btn || !drawer) return;

  const toggle = (open) => {
    if (open) {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  btn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => toggle(false));
  });
}

/* ==========================================================================
   4. Scroll Tracker & Section Spy
   ========================================================================== */
function initScrollTracker() {
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.querySelector('.tracker-progress-bar');
  const activeNum = document.querySelector('.active-num');
  const activeName = document.querySelector('.active-name');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionMetadata = [
    { id: 'hero', num: '01', name: 'CORE' },
    { id: 'universe', num: '02', name: 'UNIVERSE' },
    { id: 'intelligence', num: '03', name: 'PIPELINE' },
    { id: 'explore', num: '04', name: 'DOMAINS' },
    { id: 'build', num: '05', name: 'SYSTEMS' },
    { id: 'research', num: '06', name: 'RESEARCH' },
    { id: 'signals', num: '07', name: 'SIGNALS' },
    { id: 'philosophy', num: '08', name: 'VISION' },
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));

    if (progressBar) {
      progressBar.style.height = `${progress}%`;
    }

    let currentSectionId = 'hero';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 220;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    const meta = sectionMetadata.find((m) => m.id === currentSectionId) || sectionMetadata[0];
    if (activeNum) activeNum.textContent = meta.num;
    if (activeName) activeName.textContent = meta.name;

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Hero 3D Syntreva Intelligence Core (Sage + Charcoal Geometry)
   ========================================================================== */
function initHeroCore3D() {
  const canvas = document.getElementById('hero-core-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  let currentMode = 'mesh';
  const modeButtons = document.querySelectorAll('.core-mode-btn');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      modeButtons.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentMode = e.target.dataset.mode || 'mesh';
    });
  });

  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  };
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouse.targetX = (e.clientX - cx) / (rect.width / 2);
      mouse.targetY = (e.clientY - cy) / (rect.height / 2);
    }
  }, { passive: true });

  // 3D Particles
  const numParticles = 130;
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const radius = 95 + Math.random() * 80;
    particles.push({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
      baseRadius: radius,
      speed: 0.003 + Math.random() * 0.007,
      size: 1.2 + Math.random() * 2.0,
      pulse: Math.random() * Math.PI,
    });
  }

  // Orbital Rings with Sage Green & Mist tones
  const rings = [
    { radius: 112, tiltX: 0.55, tiltZ: 0.25, speed: 0.01, color: 'rgba(163, 177, 138, 0.75)' },
    { radius: 138, tiltX: -0.45, tiltZ: 0.75, speed: -0.007, color: 'rgba(88, 129, 87, 0.65)' },
    { radius: 162, tiltX: 0.85, tiltZ: -0.35, speed: 0.005, color: 'rgba(218, 215, 205, 0.55)' },
    { radius: 82, tiltX: -0.75, tiltZ: -0.55, speed: -0.012, color: 'rgba(184, 197, 162, 0.85)' }
  ];

  let rotationAngle = 0;

  function render() {
    // Smoothed mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    rotationAngle += currentMode === 'quantum' ? 0.018 : 0.007;

    const displayW = width / (window.devicePixelRatio || 1);
    const displayH = height / (window.devicePixelRatio || 1);
    const centerX = displayW / 2;
    const centerY = displayH / 2;

    ctx.clearRect(0, 0, displayW, displayH);

    // Subtle Core Sage Glow
    const coreGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 150);
    coreGlow.addColorStop(0, 'rgba(163, 177, 138, 0.22)');
    coreGlow.addColorStop(0.5, 'rgba(88, 129, 87, 0.08)');
    coreGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = coreGlow;
    ctx.fillRect(0, 0, displayW, displayH);

    // 3D Matrix Math
    const rotX = mouse.y * 0.45;
    const rotY = rotationAngle + mouse.x * 0.55;

    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);

    // Project and render orbital rings
    rings.forEach((ring, idx) => {
      ctx.beginPath();
      const points = 72;
      let firstPoint = true;

      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        let px = ring.radius * Math.cos(theta);
        let py = ring.radius * Math.sin(theta) * Math.cos(ring.tiltX);
        let pz = ring.radius * Math.sin(theta) * Math.sin(ring.tiltX);

        const pzX = px * Math.cos(ring.tiltZ) - py * Math.sin(ring.tiltZ);
        const pzY = px * Math.sin(ring.tiltZ) + py * Math.cos(ring.tiltZ);
        px = pzX;
        py = pzY;

        const x1 = px * cosY + pz * sinY;
        const z1 = -px * sinY + pz * cosY;
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const fov = 400;
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        if (firstPoint) {
          ctx.moveTo(projX, projY);
          firstPoint = false;
        } else {
          ctx.lineTo(projX, projY);
        }
      }

      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 1.3;
      if (idx % 2 === 1) {
        ctx.setLineDash([8, 6]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
    });

    ctx.setLineDash([]);

    // Project & render 3D Particles
    const projectedParticles = [];

    particles.forEach((p) => {
      p.pulse += 0.025;
      const rx = p.x * cosY + p.z * sinY;
      const rz = -p.x * sinY + p.z * cosY;
      const ry = p.y * cosX - rz * sinX;
      const finalZ = p.y * sinX + rz * cosX;

      const fov = 400;
      const scale = fov / (fov + finalZ);
      const projX = centerX + rx * scale;
      const projY = centerY + ry * scale;

      projectedParticles.push({
        x: projX,
        y: projY,
        z: finalZ,
        scale: scale,
        size: p.size * scale * (1 + 0.15 * Math.sin(p.pulse)),
      });
    });

    // Interconnected lines in neural/mesh mode
    if (currentMode === 'neural' || currentMode === 'mesh') {
      const maxDist = currentMode === 'neural' ? 60 : 42;
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const dx = projectedParticles[i].x - projectedParticles[j].x;
          const dy = projectedParticles[i].y - projectedParticles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(projectedParticles[i].x, projectedParticles[i].y);
            ctx.lineTo(projectedParticles[j].x, projectedParticles[j].y);
            ctx.strokeStyle = `rgba(163, 177, 138, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    // Particle dots
    projectedParticles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
      const alpha = Math.min(1, Math.max(0.2, (p.z + 200) / 400));
      ctx.fillStyle = p.z > 0 ? `rgba(218, 215, 205, ${alpha})` : `rgba(163, 177, 138, ${alpha * 0.85})`;
      ctx.fill();
    });

    // Center Core Spherical Emblem
    ctx.beginPath();
    ctx.arc(centerX, centerY, 13, 0, Math.PI * 2);
    ctx.fillStyle = '#F4F3EE';
    ctx.shadowColor = '#A3B18A';
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   6. Technology Universe (Topology & Dynamic Inspector)
   ========================================================================== */
function initTechnologyUniverse() {
  const canvas = document.getElementById('universe-interactive-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  const universeNodes = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      category: 'AI / ML / Deep Learning / GenAI / Agents',
      description: 'Foundational models, multi-agent swarms, generative reasoning, vision-language architectures, and autonomous decision systems.',
      angle: 0,
      radius: 190,
      subtopics: ['Agentic Workflows & Swarm Protocols', 'Generative Vision & Diffusion Architectures', 'Reinforcement Learning & Policy Optimization', 'Multimodal LLMs & Cross-Attention Systems'],
      color: '#A3B18A'
    },
    {
      id: 'data',
      name: 'Data Platforms & Fabrics',
      category: 'Science / Analytics / Engineering / Warehousing',
      description: 'Distributed real-time data lakes, streaming ETL/ELT, vector embeddings, synthetic data pipelines, and metadata governance.',
      angle: (Math.PI / 4) * 1,
      radius: 200,
      subtopics: ['Planetary-Scale Vector Indices', 'Zero-ETL Event Meshes & Streaming', 'Synthetic Data Generation & Curation', 'Automated Semantic Governance'],
      color: '#B8C5A2'
    },
    {
      id: 'engineering',
      name: 'Software Engineering & Cloud',
      category: 'Full Stack / Web / APIs / Cloud / DevOps',
      description: 'Fault-tolerant distributed architectures, edge microservices, low-latency RPC backbones, and autonomous cloud compute.',
      angle: (Math.PI / 4) * 2,
      radius: 180,
      subtopics: ['Autonomous Infrastructure Scaling', 'WASM Edge Computation Engines', 'Zero-Trust Distributed Mesh Protocols', 'High-Throughput Concurrency Systems'],
      color: '#DAD7CD'
    },
    {
      id: 'intelligence',
      name: 'Intelligence Systems',
      category: 'LLMs / RAG / Knowledge Graphs / Multimodal',
      description: 'Hierarchical memory systems, neuro-symbolic reasoning, GraphRAG architectures, and deterministic verification runtimes.',
      angle: (Math.PI / 4) * 3,
      radius: 195,
      subtopics: ['Hybrid Graph-Vector Hybrid Retrieval', 'Constraint-Verified Planning Systems', 'Stateful Context Memory Horizons', 'Dynamic Cognitive Arbitration'],
      color: '#A3B18A'
    },
    {
      id: 'automation',
      name: 'Automation & Autonomous Systems',
      category: 'AI Automation / Agents / Robotics',
      description: 'Closed-loop enterprise operations, self-healing software pipelines, robotic motion planning, and sensory feedback loops.',
      angle: (Math.PI / 4) * 4,
      radius: 185,
      subtopics: ['Self-Correcting CI/CD Pipelines', 'Spatial Intelligence & Kinematics', 'Continuous Anomaly Healing Meshes', 'Robotic Vision-Language-Action Models'],
      color: '#8F9E77'
    },
    {
      id: 'research',
      name: 'Research & Emerging Tech',
      category: 'AI Research / Emerging Technology / Experiments',
      description: 'Exploratory investigations into neural plasticity, emergent agency, non-transformer topologies, and cognitive architectures.',
      angle: (Math.PI / 4) * 5,
      radius: 210,
      subtopics: ['Sparse State Space Models (SSMs)', 'Self-Evolving Representation Latents', 'Mathematical Alignment Proving', 'Neuromorphic Spiking Networks'],
      color: '#588157'
    },
    {
      id: 'infrastructure',
      name: 'MLOps & AI Infrastructure',
      category: 'Infrastructure / MLOps / AI Security',
      description: 'Sub-millisecond model quantization, dynamic GPU orchestration, continuous evaluation gates, and red-teaming harnesses.',
      angle: (Math.PI / 4) * 6,
      radius: 175,
      subtopics: ['Speculative Decoding & Quantization', 'Adversarial Jailbreak Shielding', 'Decentralized Model Serving Nodes', 'Real-Time Drift & Hallucination Gates'],
      color: '#6E8C6A'
    },
    {
      id: 'future',
      name: 'Future Computing & Technology',
      category: 'Future Computing / Human-AI / Autonomous Tech',
      description: 'Next-generation human-machine interfaces, spatial computing canvases, and quantum computing foundations.',
      angle: (Math.PI / 4) * 7,
      radius: 195,
      subtopics: ['Spatial Multi-Agent Operating Systems', 'Fluid Brain-Computer Interaction Primitives', 'Quantum-Ready Vector Algorithms', 'Ambient Spatial Awareness'],
      color: '#DAD7CD'
    },
  ];

  let activeNodeId = 'ai';
  let hoveredNodeId = null;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  };
  window.addEventListener('resize', resize);
  resize();

  const updateInspector = (node) => {
    const badge = document.querySelector('.inspector-badge');
    const title = document.querySelector('.inspector-title');
    const desc = document.querySelector('.inspector-desc');
    const list = document.querySelector('.inspector-subtopics-list');
    if (!badge || !title || !desc || !list) return;

    badge.textContent = node.category;
    title.textContent = node.name;
    desc.textContent = node.description;

    list.innerHTML = node.subtopics
      .map((st, i) => `
        <div class="inspector-subtopic-item">
          <span class="item-marker">0${i + 1}</span>
          <span>${st}</span>
        </div>
      `)
      .join('');
  };

  updateInspector(universeNodes[0]);

  const catButtons = document.querySelectorAll('.universe-cat-btn');
  catButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      catButtons.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      const targetId = e.target.dataset.node;
      const targetNode = universeNodes.find((n) => n.id === targetId);
      if (targetNode) {
        activeNodeId = targetId;
        updateInspector(targetNode);
      }
    });
  });

  let mouse = { x: -1000, y: -1000 };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    const displayW = width / (window.devicePixelRatio || 1);
    const displayH = height / (window.devicePixelRatio || 1);
    const cx = displayW / 2;
    const cy = displayH / 2;

    hoveredNodeId = null;
    universeNodes.forEach((node) => {
      const nx = cx + Math.cos(node.angle + universeAngle) * node.radius;
      const ny = cy + Math.sin(node.angle + universeAngle) * node.radius;
      const dist = Math.hypot(mouse.x - nx, mouse.y - ny);
      if (dist < 26) {
        hoveredNodeId = node.id;
      }
    });
  }, { passive: true });

  canvas.addEventListener('click', () => {
    if (hoveredNodeId) {
      activeNodeId = hoveredNodeId;
      const node = universeNodes.find((n) => n.id === activeNodeId);
      if (node) {
        updateInspector(node);
        catButtons.forEach((b) => {
          b.classList.toggle('active', b.dataset.node === activeNodeId);
        });
      }
    }
  });

  let universeAngle = 0;

  function renderUniverse() {
    universeAngle += 0.0018;

    const displayW = width / (window.devicePixelRatio || 1);
    const displayH = height / (window.devicePixelRatio || 1);
    const cx = displayW / 2;
    const cy = displayH / 2;

    ctx.clearRect(0, 0, displayW, displayH);

    // Orbit rings
    [120, 185, 230].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(218, 215, 205, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Connecting lines & active energy paths
    universeNodes.forEach((node) => {
      const nx = cx + Math.cos(node.angle + universeAngle) * node.radius;
      const ny = cy + Math.sin(node.angle + universeAngle) * node.radius;
      const isSelected = node.id === activeNodeId;
      const isHovered = node.id === hoveredNodeId;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);

      if (isSelected || isHovered) {
        ctx.strokeStyle = '#A3B18A';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#A3B18A';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        ctx.strokeStyle = 'rgba(218, 215, 205, 0.09)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw Nodes
    universeNodes.forEach((node) => {
      const nx = cx + Math.cos(node.angle + universeAngle) * node.radius;
      const ny = cy + Math.sin(node.angle + universeAngle) * node.radius;
      const isSelected = node.id === activeNodeId;
      const isHovered = node.id === hoveredNodeId;

      ctx.beginPath();
      ctx.arc(nx, ny, isSelected || isHovered ? 20 : 12, 0, Math.PI * 2);
      ctx.fillStyle = isSelected || isHovered ? 'rgba(163, 177, 138, 0.22)' : 'rgba(218, 215, 205, 0.04)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nx, ny, isSelected || isHovered ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isSelected || isHovered ? '#A3B18A' : '#DAD7CD';
      ctx.fill();

      ctx.font = `600 ${isSelected || isHovered ? '12px' : '11px'} 'Plus Jakarta Sans', sans-serif`;
      ctx.fillStyle = isSelected || isHovered ? '#F4F3EE' : '#DAD7CD';
      ctx.textAlign = 'center';
      ctx.fillText(node.name.split(' ')[0], nx, ny + 24);
    });

    // Central SYNTREVA Hub
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#141816';
    ctx.strokeStyle = '#A3B18A';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#A3B18A';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = "800 10px 'Syne', sans-serif";
    ctx.fillStyle = '#F4F3EE';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SYNTREVA', cx, cy);

    requestAnimationFrame(renderUniverse);
  }

  renderUniverse();
}

/* ==========================================================================
   7. Intelligence Pipeline (From Data to Intelligence)
   ========================================================================== */
function initIntelligencePipeline() {
  const canvas = document.getElementById('pipeline-particle-canvas');
  const stageNodes = document.querySelectorAll('.pipeline-stage-node');
  if (!canvas || !stageNodes.length) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  };
  window.addEventListener('resize', resize);
  resize();

  const stageData = {
    data: {
      title: '01. High-Fidelity Data Ingestion & Synthesis',
      desc: 'Heterogeneous multimodal signals, unstructured sensory feeds, vector indices, and curated synthetic streams are ingested with real-time provenance tracking.',
      tags: ['Multimodal Ingestion', 'Streaming Lakehouse', 'Zero-ETL Event Mesh', 'Synthetic Augmentation'],
      logState: 'INGESTING 1.4TB/s HETEROGENEOUS STREAMS'
    },
    understand: {
      title: '02. Contextual Perception & Semantic Parsing',
      desc: 'Signals undergo cross-attention embedding, entity extraction, structural alignment, and noise attenuation across multimodal latent spaces.',
      tags: ['Cross-Attention Tokenizer', 'Latent Alignment', 'Entity Resolution', 'Contrastive Filtering'],
      logState: 'PARSING 84,000 MULTIMODAL TOKENS/SEC'
    },
    reason: {
      title: '03. Multi-Step Deliberation & Graph Reasoning',
      desc: 'Dynamic Tree-of-Thought search, neuro-symbolic knowledge verification, GraphRAG retrieval, and counterfactual constraint solvers deliberate optimal pathways.',
      tags: ['Tree-of-Thought Search', 'GraphRAG Traversal', 'Neuro-Symbolic Prover', 'Counterfactual Solver'],
      logState: 'EVALUATING 16 BRANCHED HYPOTHESIS TREES'
    },
    generate: {
      title: '04. Deterministic & Stochastic Synthesis',
      desc: 'Synthesizes verified source code, structured API payloads, natural language explanations, or spatial actuation plans bounded by formal safety invariants.',
      tags: ['Speculative Decoding', 'Safety Guardrails', 'AST Code Generation', 'Multimodal Synthesis'],
      logState: 'SYNTHESIZING ZERO-ERROR PRODUCTION AST'
    },
    act: {
      title: '05. Autonomous Tool Execution & Orchestration',
      desc: 'Dispatches validated transactions, invokes external APIs, coordinates multi-agent subroutines, and drives physical/digital actuator interfaces.',
      tags: ['Atomic Tool Calling', 'Idempotent Execution', 'Multi-Agent Dispatch', 'Actuation Interface'],
      logState: 'DISPATCHING ATOMIC ORCHESTRATION EVENT'
    },
    learn: {
      title: '06. Continuous Closed-Loop Adaptation',
      desc: 'Telemetry outcomes and human-in-the-loop feedback are distilled into persistent memory models, fine-tuning policies, and dynamic routing matrices.',
      tags: ['Direct Preference Alignment', 'Dynamic Memory Cache', 'Loss Calibration', 'Self-Healing Policy'],
      logState: 'UPDATING CLOSED-LOOP KNOWLEDGE EMBEDDINGS'
    }
  };

  const updatePipelineInspector = (stageKey) => {
    const data = stageData[stageKey] || stageData.data;
    const heading = document.querySelector('.pipeline-inspector-card .col-heading');
    const desc = document.querySelector('.pipeline-inspector-card .col-desc');
    const tagsContainer = document.querySelector('.pipeline-components-tags');
    const logStateBadge = document.querySelector('.signal-log-line .state-badge');

    if (heading) heading.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (logStateBadge) logStateBadge.textContent = data.logState;

    if (tagsContainer) {
      tagsContainer.innerHTML = data.tags
        .map((t) => `
          <div class="component-tag">
            <span class="tag-dot"></span>
            <span>${t}</span>
          </div>
        `)
        .join('');
    }
  };

  stageNodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      stageNodes.forEach((n) => n.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      const stageKey = target.dataset.stage;
      updatePipelineInspector(stageKey);
    });
  });

  // Animated sage particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * 1200,
      y: 40 + Math.random() * 40,
      speed: 1.4 + Math.random() * 2.2,
      size: 1.5 + Math.random() * 2,
      color: i % 2 === 0 ? '#A3B18A' : '#DAD7CD'
    });
  }

  function renderPipelineStream() {
    const displayW = width / (window.devicePixelRatio || 1);
    const displayH = height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, displayW, displayH);

    particles.forEach((p) => {
      p.x += p.speed;
      if (p.x > displayW) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(renderPipelineStream);
  }
  renderPipelineStream();
}

/* ==========================================================================
   8. What Syntreva Explores (Interactive 3D Cards & Category Filter)
   ========================================================================== */
function initExploreCards() {
  const cards = document.querySelectorAll('.explore-card');
  const filterBtns = document.querySelectorAll('.explore-filter-btn');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    card.addEventListener('click', () => {
      const title = card.querySelector('.explore-card-title')?.textContent || 'Architecture Domain';
      const category = card.querySelector('.explore-card-category')?.textContent || 'SYNTREVA DOMAIN';
      const desc = card.querySelector('.explore-card-desc')?.textContent || '';
      openArchitectureModal(title, category, desc);
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;

      cards.forEach((card) => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   9. What We Build (From Ideas to Systems)
   ========================================================================== */
function initBuildShowcase() {
  const projectButtons = document.querySelectorAll('.build-explore-btn');
  projectButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.build-project-card');
      const title = card.querySelector('.build-project-title')?.textContent || 'System Platform';
      const category = card.querySelector('.build-project-index')?.textContent || 'PRODUCTION SYSTEM';
      const desc = card.querySelector('.build-project-desc')?.textContent || '';
      openArchitectureModal(title, category, desc);
    });
  });
}

/* ==========================================================================
   10. Research Section (Questions Before Answers)
   ========================================================================== */
function initResearchCards() {
  const researchCards = document.querySelectorAll('.research-card');
  researchCards.forEach((card) => {
    card.addEventListener('click', () => {
      const question = card.querySelector('.research-question-title')?.textContent || 'Research Inquiry';
      const domain = card.querySelector('.research-domain-label')?.textContent || 'RESEARCH THEME';
      const brief = card.querySelector('.research-brief-col p')?.textContent || '';
      openArchitectureModal(question, `RESEARCH INQUIRY · ${domain}`, `${brief} Syntreva maintains an open testbed and mathematical framework validating this hypothesis against empirical benchmark models.`);
    });
  });
}

/* ==========================================================================
   11. Future Signals (Timeline & Horizon Filter)
   ========================================================================== */
function initFutureSignals() {
  const signalCards = document.querySelectorAll('.signal-item-card');
  const horizonBtns = document.querySelectorAll('.horizon-filter-btn');

  horizonBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      horizonBtns.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      const horizon = e.target.dataset.horizon;

      signalCards.forEach((card) => {
        if (horizon === 'all' || card.dataset.horizon === horizon) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   12. Interactive Ecosystem Navigator
   ========================================================================== */
function initEcosystemNavigator() {
  const input = document.getElementById('navigator-search-input');
  const vectorBtns = document.querySelectorAll('.quick-vector-btn');
  const outputDomain = document.getElementById('nav-output-domain');
  const outputSystem = document.getElementById('nav-output-system');
  const outputResearch = document.getElementById('nav-output-research');

  if (!input || !outputDomain || !outputSystem || !outputResearch) return;

  const vectorDatabase = [
    {
      keywords: ['agent', 'agentic', 'swarm', 'autonomous', 'workflow'],
      domain: 'Artificial Intelligence · Multi-Agent Orchestration & Policy Networks',
      system: 'SYNTREVA CORE-1 (Multi-Agent Reasoning Engine) & Syntreva Dispatch Mesh',
      research: 'Theme 01: Autonomous agent governance under non-deterministic failure modes'
    },
    {
      keywords: ['rag', 'retrieval', 'vector', 'knowledge', 'graph', 'database'],
      domain: 'Intelligence Systems · Neuro-Symbolic Retrieval & GraphRAG',
      system: 'SYNAPSE GRAPH (Multi-Modal Knowledge & Vector Mesh)',
      research: 'Theme 02: Bridging symbolic knowledge structures with neural latent spaces'
    },
    {
      keywords: ['data', 'streaming', 'lakehouse', 'etl', 'big data', 'analytics'],
      domain: 'Data Platforms & Fabric · Zero-ETL Planetary Mesh',
      system: 'CHRONOS FABRIC (Real-Time Event & Data Processing Engine)',
      research: 'Theme 04: Planetary-scale data meshes with dynamic synthetic feedback'
    },
    {
      keywords: ['cloud', 'devops', 'infrastructure', 'mlops', 'serverless', 'scaling'],
      domain: 'Engineering & Cloud · Autonomous Infrastructure Orchestration',
      system: 'AETHER CLOUD (Dynamic AI-Native Compute & Autoscaler)',
      research: 'Theme 03: Autonomous compilation and self-healing CI/CD runtimes'
    },
    {
      keywords: ['security', 'safety', 'alignment', 'jailbreak', 'red team'],
      domain: 'MLOps & Security · Continuous Verification & Safety Gates',
      system: 'LATTICE GUARD (Continuous AI Red-Teaming & Invariant Prover)',
      research: 'Theme 01: Formal mathematical verification of generative policy outputs'
    },
    {
      keywords: ['interface', 'spatial', 'ui', 'human-ai', 'canvas', 'bci'],
      domain: 'Future Technology · Spatial Computing & Fluid Cognitive Canvases',
      system: 'OMNIVECTOR UI (Spatial Multi-Agent Spatial Interface)',
      research: 'Theme 02: Fluid human-in-the-loop cognitive arbitration interfaces'
    }
  ];

  const updateSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      outputDomain.textContent = 'Artificial Intelligence & Multi-Agent Reasoning Foundations';
      outputSystem.textContent = 'SYNTREVA CORE-1 (Multi-Agent Cognitive Framework)';
      outputResearch.textContent = 'Inquiry 01: Autonomous Agent Non-Deterministic Invariants';
      return;
    }

    const match = vectorDatabase.find((item) =>
      item.keywords.some((kw) => q.includes(kw))
    ) || {
      domain: `Ecosystem Vector: Comprehensive analysis of "${query}" across Syntreva's 8 core pillars.`,
      system: 'Integrated Platform Service Mesh (Chronos + Core-1 + Synapse)',
      research: 'Exploratory Benchmark Matrix & Empirical Frontier Modeling'
    };

    outputDomain.textContent = match.domain;
    outputSystem.textContent = match.system;
    outputResearch.textContent = match.research;
  };

  input.addEventListener('input', (e) => updateSearch(e.target.value));

  vectorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const val = e.target.textContent.trim();
      input.value = val;
      updateSearch(val);
    });
  });
}

/* ==========================================================================
   13. Magnetic Button Physics
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .brand-link');

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   14. Modal Dialogs & Architectural Inspector
   ========================================================================== */
let modalOverlay;

function initModalControllers() {
  modalOverlay = document.getElementById('architecture-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const inquiryForm = document.getElementById('inquiry-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Inquiry Form validation & feedback
  if (inquiryForm && feedbackMsg) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('inquiry-email')?.value;
      if (email && email.includes('@')) {
        feedbackMsg.textContent = 'Transmission received. A Syntreva systems architect will connect with you shortly.';
        feedbackMsg.className = 'form-feedback-message success';
        inquiryForm.reset();
      }
    });
  }

  const openInquireBtns = document.querySelectorAll('.open-inquiry-modal-btn');
  openInquireBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      openArchitectureModal(
        'Engage With Syntreva',
        'COLLABORATION & RESEARCH INQUIRY',
        'Connect with our engineering and research teams to explore joint technological initiatives, ecosystem integration, or architectural consulting.'
      );
    });
  });
}

function openArchitectureModal(title, category, description) {
  if (!modalOverlay) return;

  const modalCategory = document.getElementById('modal-topic-category');
  const modalTitle = document.getElementById('modal-topic-title');
  const modalDesc = document.getElementById('modal-topic-desc');

  if (modalCategory) modalCategory.textContent = category;
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = description;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
