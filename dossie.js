/* ═══ STUDIO51 — dossiês internos (dados dos 12 setores) ═══ */
"use strict";

const DOSSIES = {
  bbs: {
    nome: "BlueBookStudio",
    codigo: "DOSSIÊ B-1951/8600",
    registro: "B-8600-S51",
    carimbo: "SETOR B",
    classe: "SIGILO: ORGANIZACIONAL — homólogo do Projeto Blue Book",
    lema: "O cérebro-mor da operação.",
    sigilo: 62,
    cor: "var(--verde)",
    local: "dev-projetos/BlueBookStudio · acesso restrito",
    estado: "OPERACIONAL",
    mob: "24/7 · on-demand",
    link: "",
    notas: [
      "Função primária: transformar dossiês em roteiro, roteiro em cena, cena em vídeo final. Pipeline completo de produção audiovisual operado por faculdade de agentes (007GovAgency).",
      "O programa Character DNA opera integrado: a identidade dos personagens é mantida por embedding canônico (limiar 0.94) e toda imagem gerada é validada contra o arquivo — drift é sinalizado em tempo real.",
      "Equipes especializadas estudam nichos por demanda (Dark, Mangá, Vox, Bíblico, Meditação, Analista Gráfico, Dorama). A extensão de flow alimenta o setor com capturas externas.",
    ],
    timeline: [
      ["fase 1", "pipeline de agentes + geradores de imagem/vídeo"],
      ["fase 2", "faculdade de equipes 007GovAgency + grupo M&S"],
      ["fase 3", "Character DNA integrado ao pipeline (fichas canônicas + validação)"],
      ["próximo", "ponte total roteiro→DNA→fila validada + veículo de publicação"],
    ],
    caps: ["agentes especializados por nicho", "geração de imagem com validação por embedding", "geração de vídeo (imagens e flow)", "montagem e legendas automáticas", "Character DNA com fichas canônicas"],
  },

  mcs: {
    nome: "MusicClipStudio",
    codigo: "DOSSIÊ M-1951/8300",
    registro: "M-3100-S51",
    carimbo: "SETOR M",
    classe: "SIGILO: FREQUÊNCIA CONTROLADA — transmissões audíveis",
    lema: "O ouvido do setor.",
    sigilo: 48,
    cor: "var(--ambar)",
    local: "dev-projetos/MusicClipStudio · portas 3100/8300",
    estado: "OPERACIONAL",
    mob: "sob demanda · venv compartilhado",
    link: "",
    notas: [
      "Trilhas geradas por ACE-Step sob comando, vozes sintéticas para narração e cortes automatizados — o setor fornece toda a camada sonora da operação.",
      "Além da função criativa, o setor mantém o ambiente Python (venv) utilizado por outros setores da casa, incluindo o servidor do Setor B.",
    ],
    timeline: [
      ["fase 1", "backend + RUN_WEB (portas 8300/3100)"],
      ["fase 2", "ACE-Step integrado como motor de trilha"],
      ["próximo", "pilar de voz do spec (GPT-SoVITS/RVC) — biblioteca de estilos"],
    ],
    caps: ["trilhas por ACE-Step", "narração TTS", "cortes e clipes", "venv Python compartilhado da casa"],
  },

  /* TeraBrain: dossiê próprio apagado em 01/10/2026 — ordem do dono. A ficha
     completa da sala mora na folha A4 do botão "📄 Ver dossiê" (folha-a4.js,
     alimentado pelo ESTUDIOS do estudio.js). Quem cair aqui por link antigo
     (dossie.html?f=terabrain) é levado pra sala do estúdio. */
  confidencial: {
    nome: "Confidencial",
    codigo: "DOSSIÊ A-1951/EYE",
    registro: "A-EYE-S51",
    carimbo: "SETOR A",
    classe: "SIGILO: NÍVEL ALTO — nome e missão retidos",
    lema: "Em andamento. A operação autoriza quando for a hora.",
    sigilo: 76,
    cor: "var(--magenta)",
    local: "acesso restrito",
    estado: "EM EXPANSÃO",
    mob: "contínua · dashboards",
    link: "#",
    notas: [
      "Projeto em andamento com nível de sigilo alto — nome, missão e escopo ficam retidos até a operação autorizar a desclassificação.",
      "Núcleo de monitoramento e visualização de dados: mapas em camadas, anotações vivas e detecção automática de fontes. Tudo que se move, aparece.",
      "Guarda também as técnicas de plugin do shell (docs/OMARCHY_PLUGINS_TECHNICAS.md) — anatomia completa pra replicar widgets nativos.",
    ],
    timeline: [
      ["fase 1", "gods-eye-view: mapa + providers + anotações"],
      ["fase 2", "dashboards e vigilância de dados da operação"],
      ["próximo", "widgets de shell próprios + integração com os veículos"],
    ],
    caps: ["mapas em camadas em tempo real", "providers de tráfego/aeronaves/CCTV", "dashboards de monitoramento", "engenharia reversa de UI (plugins)"],
  },


  maestro: {
    nome: "Maestro",
    codigo: "DOSSIÊ Ω-1951/ORQ",
    registro: "Ω-ORQ-S51",
    carimbo: "SETOR Ω",
    classe: "SIGILO: FREQUÊNCIA HARMÔNICA — 80 instrumentos",
    lema: "A batuta digital da orquestra infinita.",
    sigilo: 55,
    cor: "var(--azul)",
    local: "dev-projetos/maestro",
    estado: "EM REGENTE DE TESTES",
    mob: "orquestra · fila",
    link: "#",
    notas: [
      "Orquestra de 80 músicos digitais no formato Orchestra base+deltas: cada músico ocupa ~16 KB (2.259× menor que JPEGs) — uma orquestra inteira cabe num disquete.",
      "Agente de sound design (Fable 5) define trilha, timbre e momento — o Maestro executa e regula as entradas.",
      "A fila (maestro.py + gpu.lock) escala a execução de.jobs musicais sem pisar no próprio dedo.",
    ],
    timeline: [
      ["fase 1", "formato Orchestra base+deltas validado"],
      ["fase 2", "economia comprovada (relatório de vendas: 6072× tráfego)"],
      ["próximo", "regência por agente de sound design + integração com o Setor M"],
    ],
    caps: ["80 músicos em 163 KB totais", "formato delta incremental", "fila com lock de GPU", "relatório de economia para vendas"],
  },

  dna: {
    nome: "Character DNA",
    codigo: "DOSSIÊ DNA-1951/HÍBR",
    registro: "DNA-HÍBR-S51",
    carimbo: "SETOR DNA",
    classe: "SIGILO: PROGRAMA HÍBRIDO — fase 2 de contenção",
    lema: "A identidade como estado puro.",
    sigilo: 70,
    cor: "var(--verde)",
    local: "~/personagem_expressivo + data/characters",
    estado: "FASE 2 · OPERANTE",
    mob: "integrado ao pipeline",
    link: "",
    notas: [
      "Cada personagem é um espécime: embedding CLIP canônico (512-dim) + ficha estruturada (rosto/corpo/roupa/estilo) + paleta de pixels. Tudo em ~2 KB por indivíduo.",
      "Prompts nascem amarrados à ficha (Prompt Agent prioriza campos por cena) e toda imagem gerada é validada por similaridade — limiar 0.94 calibrado entre espécimes distintos (0.89) e mesma identidade (0.99).",
      "A ponte Analista Gráfico → Livro injeta as fichas no roteiro inteiro: o pipeline inteiro obedece ao mesmo rosto.",
    ],
    timeline: [
      ["fase 1", "extrator CLIP + manager + testes (19 checks)"],
      ["fase 2", "integração BBS: rotas, Livro de Personagens, validação E2E"],
      ["próximo", "banco de espécimes + geração em lote validada"],
    ],
    caps: ["embedding canônico por personagem", "ficha via Gemini vision", "prompt agent por cena/motor", "validação automática com badge DRIFT", "orquestro com 80 músicos de identidade"],
  },


  laboratorio: {
    nome: "Laboratório",
    codigo: "DOSSIÊ R-1951/P&D",
    registro: "R-P&D-S51",
    carimbo: "SETOR R",
    classe: "SIGILO: PESQUISA — protótipos de plasma",
    lema: "Onde o impossível fica possível.",
    sigilo: 82,
    cor: "var(--violeta)",
    local: "dev-projetos/{codeRLC, crewai, MOSS-TTS-Nano, HarmonicCore, see-through}",
    estado: "EXPERIMENTAL",
    mob: "intermitente · inspiração",
    link: "#",
    notas: [
      "codeRLC: aprendizado por reforço aplicado a código — a IA que melhora a IA.",
      "MOSS-TTS-Nano: voz sintética compacta em ensaio; HarmonicCore: núcleo de harmonia para os setores sonoros; see-through: visão através de camadas.",
      "crewai em aprendizado: esquadrões de agentes colaborativos em treinamento antes da promoção pra faculdade.",
    ],
    timeline: [
      ["fase 1", "protótipos isolados"],
      ["fase 2", "avaliação de viabilidade por setor"],
      ["próximo", "promoção de protótipos pra produção"],
    ],
    caps: ["RL aplicado a código", "TTS nano em ensaio", "núcleo harmônico", "esquadrões colaborativos"],
  },


  openshorts: {
    nome: "OpenShorts",
    codigo: "DOSSIÊ SHR-1951/VERT",
    registro: "SHR-VERT-S51",
    carimbo: "VEÍCULO SHR",
    classe: "SIGILO: TRANSMISSÃO ABERTA — onda curta vertical",
    lema: "Onda curta, penetração profunda.",
    sigilo: 20,
    cor: "var(--magenta)",
    local: "dev-projetos/openshorts · canal YouTube",
    estado: "NO AR",
    mob: "contínua · vertical",
    link: "#",
    notas: [
      "Shorts em escala industrial: captura, corte, legenda e publicação automáticas — o pipeline inteiro comprimido em formato vertical de 60 segundos.",
      "O render-service e o dashboard próprios (veja .freebuff/openshorts_ref) mostram a maturidade do veículo: fila de processamento, cards de resultado e tradução.",
    ],
    timeline: [
      ["fase 1", "captura e corte automático"],
      ["fase 2", "dashboard + fila de render + tradução"],
      ["próximo", "publicação agendada por nicho"],
    ],
    caps: ["pipeline vertical automático", "fila de render", "legenda e tradução", "publicação programada"],
  },

  agentes: {
    nome: "Agentes & Equipes",
    codigo: "DOSSIÊ MS-1951/FROTA",
    registro: "MS-FROTA-S51",
    carimbo: "VEÍCULO M&S",
    classe: "SIGILO: FROTA ATIVA — operação contínua",
    lema: "A faculdade secreta das máquinas.",
    sigilo: 66,
    cor: "var(--violeta)",
    local: "dev-projetos/{AgentsHub, AgenteManga, jarvis-mark-li, youtube-automation-agent}",
    estado: "FROTA EM ÓRBITA",
    mob: "contínua · multi-canal",
    link: "#",
    notas: [
      "AgentsHub coordena a frota; AgenteManga opera o nicho mangá/anime; jarvis-mark-li é o assistente de marketing; youtube-automation-agent gerencia publicação e métricas.",
      "A faculdade de equipes (007GovAgency no Setor B) é a academia: cada equipe estuda seu nicho com diretrizes injetadas no prompt — e o grupo M&S (Analista Gráfico + Dorama) é a turma mais recente.",
    ],
    timeline: [
      ["fase 1", "agentes individuais por tarefa"],
      ["fase 2", "faculdade de equipes + grupos (Faculdade/M&S)"],
      ["próximo", "orçamentação por equipe + metas de canal"],
    ],
    caps: ["frota de agentes por nicho", "coordenação central (AgentsHub)", "equipes com diretrizes injetadas", "operação multi-canal"],
  },

  cosmometria: {
    nome: "Cosmometria",
    codigo: "DOSSIÊ COS-1951/144",
    registro: "COS-144-S51",
    carimbo: "VEÍCULO COS",
    classe: "SIGILO: TRANSMISSÃO ABERTA — frequência 144",
    lema: "O veículo-mãe da operação.",
    sigilo: 20,
    cor: "var(--ambar)",
    local: "canal YouTube · cosmometria",
    estado: "NO AR",
    mob: "contínua · semanal",
    link: "#",
    notas: [
      "A transmissão mais antiga da operação: consciência, geometria sagrada, ciclos cósmicos e a cosmologia que os antigos gravaram em pedra.",
      "Todo o aparato dos setores existe, no fim, pra alimentar este veículo — do roteiro ao corte, do rosto à trilha.",
    ],
    timeline: [
      ["origem", "primeira transmissão da casa"],
      ["agora", "produção assistida pela operação completa"],
      ["próximo", "escala com pipeline automático"],
    ],
    caps: ["produção assistida ponta a ponta", "temática: consciência/cosmologia", "frequência 144"],
  },

  gabriel: {
    nome: "Canal Gabriel",
    codigo: "DOSSIÊ GAB-1951/ARC",
    registro: "GAB-ARC-S51",
    carimbo: "VEÍCULO GAB",
    classe: "SIGILO: TRANSMISSÃO ABERTA — mensageiro",
    lema: "A voz do mensageiro.",
    sigilo: 20,
    cor: "var(--azul)",
    local: "canal YouTube · gabriel",
    estado: "PREPARANDO TRANSMISSÃO",
    mob: "por missão",
    link: "#",
    notas: [
      "O agente Gabriel (pesquisador socrático multidimensional) vira veículo: investiga,questiona e apresenta — com marcadores de certeza (✓ ◎ ◈ ∿) e triangulação de fontes.",
      "A Biblioteca Σ é a fonte primária; o pipeline do Setor B é a fábrica.",
    ],
    timeline: [
      ["fase 1", "persona Gabriel definida (AGENTS.md)"],
      ["próximo", "primeira investigação em vídeo"],
    ],
    caps: ["persona socrática em vídeo", "fontes citadas da Biblioteca Σ", "graus de certeza sinalizados"],
  },
};

/* ── render do dossiê ── */
/* TeraBrain não tem dossiê próprio: caiu um link antigo, vai pra sala. */
const DOSSIES_PARA_SALA = { terabrain: "estudio.html?s=terabrain" };

function render_dossie(id) {
  if (DOSSIES_PARA_SALA[id]) { location.replace(DOSSIES_PARA_SALA[id]); return; }
  const d = DOSSIES[id];
  if (!d) { location.replace('index.html#veiculos'); return; }
  document.title = d.codigo + " — STUDIO51";
  const set = (idEl, v) => { const el = document.getElementById(idEl); if (el) el.innerHTML = v; };

  set("dossie-codigo", d.codigo);
  set("d-carimbo", d.carimbo);
  set("d-classe", d.classe);
  set("d-nome", d.nome);
  set("d-lema", "“" + d.lema + "”");
  set("d-local", d.local);
  set("d-estado", d.estado);
  set("d-mob", d.mob);
  set("d-reg", d.registro);  const barra = document.getElementById("d-sigilo");
  if (barra) {
    barra.style.width = "0%";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      barra.style.transition = "width 1.1s cubic-bezier(.2,.8,.2,1)";
      barra.style.width = d.sigilo + "%";
    }));
  }
  set("d-sigilo-valor", d.sigilo + "/100");

  set("d-notas", d.notas.map(n => `<p class="dossie-nota">${n}</p>`).join(""));
  set("d-timeline", d.timeline.map(([f, t]) =>
    `<div class="tl-item"><span class="tl-fase">${f}</span><span class="tl-texto">${t}</span></div>`).join(""));
  set("d-caps", d.caps.map(c => `<span class="cap">${c}</span>`).join(""));

  const link = document.getElementById("d-link");
  if (link) {
    if (d.link.startsWith("http")) { link.href = d.link; link.style.display = ""; }
    else link.style.display = "none";
  }

  // carimbo com a cor do setor
  const car = document.getElementById("d-carimbo");
  if (car) { car.style.color = d.cor; car.style.borderColor = d.cor; car.style.textShadow = `0 0 16px ${d.cor}`; }

  // navegação entre dossiês
  const ids = Object.keys(DOSSIES);
  const nav = document.getElementById("d-nav");
  if (nav) {
    const idx = ids.indexOf(id);
    const antes = DOSSIES[ids[(idx - 1 + ids.length) % ids.length]];
    const depois = DOSSIES[ids[(idx + 1) % ids.length]];
    nav.innerHTML = `
      <a class="dnav" href="dossie.html?f=${ids[(idx - 1 + ids.length) % ids.length]}">← ${antes.nome}</a>
      <a class="dnav" href="index.html">▣ arquivo</a>
      <a class="dnav" href="dossie.html?f=${ids[(idx + 1) % ids.length]}">${depois.nome} →</a>`;
  }

  /* o papel nasce limpo. o carimbo e a data de liberação batem só no clique
     em DOSSIÊ ⤓ — junto com o download do arquivo. */
  const btn = document.getElementById("d-baixar");
  if (btn) btn.addEventListener("click", () => {
    const car = document.getElementById("d-carimbo");
    const lib = document.getElementById("d-liberacao");
    if (car) {
      car.classList.remove("retido");
      car.style.animation = "none"; void car.offsetWidth; car.style.animation = "";
    }
    if (lib) lib.classList.remove("retido");
    /* o carimbo continua saindo no clique -- o que a trava segura é só a
       saida do arquivo. Sem laudo baixado, a promessa da data fica na tela. */
    if (!liberado_arquivo()) {
      btn.classList.add("retido");
      btn.textContent = "\u{1F512} liberado em 25/12/2026";
      return;
    }
    baixar_dossie(d);
  });
  if (btn && !liberado_arquivo()) {
    btn.textContent = "DOSSI\u00ca \u{1F512} 25/12";
    btn.title = "o arquivo abre no dia da liberação: 25/12/2026";
  }
}

/* A mesma trava da folha A4 (folha-a4.js): o documento e do publico, o
   arquivo so no dia. Funcao separada aqui porque este arquivo nao importa o
   outro -- os dois relogios tem que dizer a mesma data por construção, e a
   conferência compara as duas. */
var DIA_LIBERACAO_ARQUIVO = new Date(2026, 11, 25);
function liberado_arquivo() { return new Date() >= DIA_LIBERACAO_ARQUIVO; }

/* dossiê em texto puro: o que está na tela vira arquivo, sem servidor */
function baixar_dossie(d) {
  if (typeof liberado_arquivo === "function" && !liberado_arquivo()) return;
  const L = [
    "GOVERNO FEDERAL - LIBERACAO PARCIAL DE ARQUIVO",
    "data de liberacao: 25/12/2026",
    "",
    d.codigo,
    d.nome.toUpperCase(),
    d.lema,
    "",
    "CLASSE:  " + d.classe,
    "SIGILO:  " + d.sigilo + "/100",
    "LOCAL:   " + d.local,
    "ESTADO:  " + d.estado,
    "REGISTRO: " + d.registro,
    "",
    "RELATORIO DE OPERACAO",
  ];
  d.notas.forEach(n => L.push("- " + n));
  L.push("", "LINHA DO TEMPO");
  d.timeline.forEach(([f, t]) => L.push("  [" + f + "]  " + t));
  L.push("", "CAPACIDADES VERIFICADAS");
  d.caps.forEach(c => L.push("- " + c));
  L.push("", "BlueBookStudio - operacao Projeto Studio 51 - arquivo n 1951");

  const blob = new Blob([L.join("\n")], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = (d.registro || d.codigo).replace(/[^\w.-]+/g, "_") + ".txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/* boot: pega ?f= da URL */
const params = new URLSearchParams(location.search);
render_dossie(params.get("f") || "bbs");
