/* STUDIO51 — arquivo confidencial · V2
   Contadores animados + título máquina de escrever + status das portas + patrocinadores */
"use strict";

/* 📡 LINK DO CANAL — troque pela URL real */
const CANAL_URL = "https://www.youtube.com/@projetostudio51";

/* 💎 PATROCINADORES — 12 banners; link vazio = vaga "coloque sua marca aqui" */
const PATROCINADORES = [
  {
    nome: "FreeBuff",
    link: "https://freebuff.com",
    banner: "img/patrocinadores/freebuff.webp",
    neon: "rgba(255,176,60,.55)",
    icone: "🦬",
    desc: "O agente de código gratuito: CLI e builder full-stack sem assinatura, sem cartão. O par de mãos que monta o hangar.",
    tag: "frequência terminal"
  },
  {
    nome: "Z.ai",
    link: "https://z.ai",
    banner: "img/patrocinadores/zai.webp",
    neon: "rgba(57,255,142,.55)",
    icone: "⚡",
    desc: "Os modelos GLM que raciocinam fundo e escrevem rápido — cérebro de apoio nos setores de roteiro e código.",
    tag: "frequência GLM"
  },
  {
    nome: "ZSky AI",
    link: "https://zsky.ai",
    banner: "img/patrocinadores/zsky.webp",
    neon: "rgba(86,164,255,.55)",
    icone: "🎬",
    desc: "Imagem e vídeo 1080p com áudio gerados por IA — o estúdio de criação visual dos pavilhões.",
    tag: "frequência 1080p"
  },
  { nome: "Vaga aberta", link: "", icone: "➕",
    banner: "img/patrocinadores/vaga.webp", neon: "rgba(57,255,142,.55)", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" },
  { nome: "Vaga aberta", link: "", icone: "➕", desc: "coloque sua marca aqui — patrocine a operação e apareça no hangar.", tag: "frequência disponível" }
];

/* ── contadores animados (quando entram na tela) ── */
function anima_contadores() {
  const cont = document.querySelector(".hero-count");
  if (!cont) return;
  const nums = [...cont.querySelectorAll("b")];
  const alvos = nums.map(n => parseInt(n.textContent, 10) || 0);
  if (reduz_movimento()) return;   /* texto final já está no DOM */
  const obs = new IntersectionObserver((entradas) => {
    if (!entradas[0].isIntersecting) return;
    obs.disconnect();
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      nums.forEach((n, i) => { n.textContent = Math.round(alvos[i] * ease); });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: .4 });
  obs.observe(cont);
}

/* movimento reduzido pedido pelo SO */
function reduz_movimento() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ── título: efeito máquina de escrever ──
   NUNCA apaga o H1: o texto final fica no DOM desde o 1º paint e cada
   caractere é revelado com span visibility:hidden → animado. Sem layout
   shift, leitor de tela lê o título completo, e reduced-motion desliga. */
function maquina_escrever() {
  const t = document.querySelector(".hero-titulo");
  if (!t || reduz_movimento()) return;
  const nos = [];
  const walker = document.createTreeWalker(t, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) nos.push(walker.currentNode);
  let i = 0;
  for (const no of nos) {
    const frag = document.createDocumentFragment();
    for (const ch of no.textContent) {
      const s = document.createElement("span");
      s.className = "dig";
      s.style.animationDelay = (i * 42) + "ms";
      s.textContent = ch;
      frag.appendChild(s);
      i++;
    }
    no.parentNode.replaceChild(frag, no);
  }
}

/* ── status das portas ──
   Sonda same-origin no servidor do site (servidor_site.py → /sonda_porta).
   O fetch cross-origin direto pra 127.0.0.1:N era bloqueado quando o
   serviço devolve Cross-Origin-Resource-Policy: same-origin (ex.: 9301) —
   browser logava ERR_BLOCKED_BY_RESPONSE no console a cada 20s e a
   lâmpada ficava apagada mesmo com o serviço no ar. */
/* devolve o PING em ms (number) ou null se o serviço não respondeu —
   o servidor mede o tempo do TCP connect e devolve {ok, ms} */
async function checa_porta(porta) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 3000);
    const r = await fetch(`/sonda_porta?porta=${encodeURIComponent(porta)}`,
                          { signal: ctl.signal, cache: "no-store" });
    clearTimeout(t);
    const j = await r.json();
    return j.ok ? (typeof j.ms === "number" ? j.ms : 0) : null;
  } catch {
    return null;
  }
}
async function pinta_status() {
  // só sonda o que tem porta: sem data-servico o fetch pediria
  // `/sonda_porta?porta=undefined` e a lâmpada acenderia vermelha
  // mentindo que um serviço respondeu
  const itens = [...document.querySelectorAll(".status-item[data-servico]")];
  const results = await Promise.all(itens.map(it => checa_porta(it.dataset.servico)));
  itens.forEach((it, idx) => {
    const lamp = it.querySelector(".lampada");
    const rot = it.querySelector("span");
    const ms = results[idx];                       // number = no ar, null = fora
    const ok = ms !== null;
    lamp.classList.toggle("on", ok);
    lamp.classList.toggle("off", !ok);
    lamp.title = ok ? `no ar · ${ms} ms` : "em descanso (on-demand — o atalho do menu acorda)";
    /* :porta + ping ao lado (o texto base fica guardado na 1ª passada) */
    if (rot) {
      if (!rot.dataset.base) rot.dataset.base = rot.textContent;
      rot.textContent = ok ? `${rot.dataset.base} · ${ms} ms`
                           : `${rot.dataset.base} · sem resposta`;
    }
  });
}

/* ── foto do hangar: card classificado abre a foto em tela cheia ──
   vale pra qualquer [data-foto]; sem JS o href leva à imagem do mesmo jeito,
   e Ctrl/clique do meio continuam abrindo em aba nova (não sequestra atalho) */
function liga_fotos() {
  let tela = null, gatilho = null;
  const fecha = () => {
    if (!tela) return;
    const velha = tela;
    velha.classList.add("saindo");
    setTimeout(() => velha.remove(), 190);
    tela = null;
    if (gatilho) gatilho.focus();
    gatilho = null;
  };
  const abre = (el) => {
    if (tela) tela.remove();
    const legenda = el.dataset.legenda || "foto do hangar";
    tela = document.createElement("div");
    tela.className = "foto-tela";
    tela.setAttribute("role", "dialog");
    tela.setAttribute("aria-modal", "true");
    tela.setAttribute("aria-label", legenda);
    tela.innerHTML =
      '<figure class="foto-quadro">' +
        '<img src="' + el.dataset.foto + '" alt="' + (el.dataset.alt || legenda) + '">' +
        '<figcaption class="foto-rodape"><span><b>' + legenda + '</b>' +
        ' · clique fora ou esc para voltar</span>' +
        '<button class="foto-fechar" type="button">✕ fechar</button>' +
      '</figcaption></figure>';
    document.body.appendChild(tela);
    tela.addEventListener("click", (ev) => {
      if (ev.target === tela || ev.target.closest(".foto-fechar")) fecha();
    });
    tela.querySelector(".foto-fechar").focus();
  };
  document.querySelectorAll("[data-foto]").forEach((el) => {
    el.addEventListener("click", (ev) => {
      if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
      ev.preventDefault();
      gatilho = el;
      abre(el);
    });
  });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") fecha(); });
}

/* ── renderizar patrocinadores ── */
/* 🏷️ VEÍCULOS — as 16 salas que já têm banner próprio (estudio.js · CENARIOS).
   O mural abaixo dos patrocinadores é onde a porta aparece antes do clique:
   id = chave da tela, banner = a mesma arte que forra o fundo do estúdio.
   Sem arte própria não entra: nada de card vazio inventado. */
const VEICULOS = [
  { id: "bbs",          sigla: "OPR-B/8600",       nome: "BlueBookStudio",                 banner: "img/setores/bluebookstudio.webp" },
  { id: "freedark",     sigla: "FDK-S51/DARK",     nome: "FreeDarkStudio",                 banner: "img/setores/freedarkstudio.webp" },
  { id: "social",       sigla: "OPR-SM/VIRAL",     nome: "Social Media Studio51",          banner: "img/setores/social-media.webp" },
  { id: "007",          sigla: "GOV-007/51",       nome: "007GovAgency",                   banner: "img/setores/007.webp" },
  { id: "009",          sigla: "ESP-009/DOS",      nome: "009AgentStudio",                 banner: "img/setores/009.webp" },
  { id: "cia",          sigla: "INT-CIA/FIO",      nome: "CIA",                            banner: "img/setores/cia.webp" },
  { id: "route66",      sigla: "RT-66/VAN",        nome: "RouteStudio66",                  banner: "img/setores/route66.webp" },
  { id: "lr",           sigla: "LIM-LR/1LUZ",      nome: "StudiosLR — Limited Resources",  banner: "img/setores/lr.webp" },
  { id: "ycut",         sigla: "ARC-Y/REEL",       nome: "StudioYcuT",                     banner: "img/setores/ycut.webp" },
  { id: "abc",          sigla: "ABC-W/GLOBO",      nome: "ABC WorldStudio",                banner: "img/setores/abc.webp" },
  { id: "studio10",     sigla: "LIVE-10/ONAIR",    nome: "Studio10 — Live Show & Lessons", banner: "img/setores/studio10.webp" },
  { id: "studio34",     sigla: "MIN-3:4/DIO",      nome: "Studio3/4",                      banner: "img/setores/studio34.webp" },
  { id: "studio369",    sigla: "ESO-369/LUZ",      nome: "Studio 369",                     banner: "img/setores/studio369.webp" },
  { id: "royalmint",    sigla: "RMS-8/AU",         nome: "Royal Mint Studio 8",            banner: "img/setores/royalmint.webp" },
  { id: "byok",         sigla: "KEY-BYOK/OWN",     nome: "BYOK",                           banner: "img/setores/byok.webp" },
  { id: "studiodb",     sigla: "DB-S51/SQL",       nome: "StudioDB",                       banner: "img/setores/studiodb.webp" },
  { id: "mcs",          sigla: "OPR-M/3100",       nome: "MusicClipStudio",                banner: "img/setores/mcs.webp" },
  { id: "terabrain",    sigla: "TB-Σ/MCP",         nome: "TeraBrain",                      banner: "img/setores/terabrain.webp" },
  { id: "confidencial", sigla: "VIG-A/XXX",        nome: "Confidencial",                   banner: "img/setores/confidencial.webp" },
  { id: "maestro",      sigla: "ORQ-Ω/80",         nome: "Maestro",                        banner: "img/setores/maestro.webp" },
  { id: "dna",          sigla: "HÍBR/0.94",        nome: "Character DNA",                  banner: "img/setores/dna.webp" },
  { id: "laboratorio",  sigla: "P&D-R/PLASMA",     nome: "Laboratório",                    banner: "img/setores/laboratorio.webp" },
  { id: "carousel99",   sigla: "CRSL-99/SLIDE",    nome: "Carousel Studio 99",             banner: "img/setores/carousel99.webp" },
  { id: "bigt",         sigla: "BGT-S51/TITA",     nome: "BigTStudios",                    banner: "img/setores/bigt.webp" },
];

/* ── sem repetidos na página ──
   O estúdio que já tem card nas seções de cima (Operação, Studios, Hangar)
   NÃO volta no mural: fica a PRIMEIRA ocorrência na página — a de cima.
   Vale por id do link (estudio.html?s=…) e por nome (cards de foto como o
   Confidencial também contam). */
function salas_ja_na_pagina() {
  const ids = new Set(), nomes = new Set();
  document.querySelectorAll("a[href*='estudio.html?s=']").forEach(a => {
    const m = a.getAttribute("href").match(/[?&]s=([^&]+)/);
    if (m) ids.add(decodeURIComponent(m[1]).toLowerCase());
  });
  document.querySelectorAll(".card-setor h3, .card-pavilhao h3").forEach(h =>
    nomes.add(h.textContent.trim().toLowerCase()));
  return { ids, nomes };
}

function renderiza_veiculos() {
  const mural = document.getElementById("veiculos-mural");
  if (!mural) return;
  const { ids: jaIds, nomes: jaNomes } = salas_ja_na_pagina();
  const vistos = new Set();
  const lista = VEICULOS.filter(v => {
    if (jaIds.has(v.id.toLowerCase()) || jaNomes.has(v.nome.trim().toLowerCase()))
      return false;                        // já aparece lá em cima — não repete
    if (vistos.has(v.id)) return false;    // duplicado na própria lista — fica o 1º
    vistos.add(v.id);
    return true;
  });
  mural.innerHTML = lista.map(v => `
    <a class="veiculo-tile" href="estudio.html?s=${encodeURIComponent(v.id)}">
      <span class="veiculo-luz" aria-hidden="true"></span>
      <img class="veiculo-banner" src="${v.banner}" alt="Banner de ${v.nome}"
           width="800" height="450" loading="lazy">
      <span class="veiculo-pe"><b>${v.nome}</b><i>${v.sigla}</i></span>
      <span class="veiculo-entra">entrar ⟶</span>
    </a>`).join("");
}

/* ── voltar ao mesmo ponto ──
   Saiu pra um estúdio e voltou (link do arquivo ou voltar do navegador)?
   A página reabre no MESMO ponto onde estava — não no topo. A posição
   fica no sessionStorage e é restaurada depois do mural montar (o mural
   injeta cards e empurra o layout, então restaura agora e de novo depois
   de assentar, quando as imagens já ocuparam o lugar). */
const CHAVE_SCROLL = "s51_scroll_y";
/* a restauração NATIVA do Chrome dispara tarde (quando o layout assenta) e
   sobrescreve a nossa com uma posição velha do histórico — então quem manda
   no scroll aqui é só o nosso código */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
let _restaurado_em = 0;   /* timestamp da última restauração (0 = nenhuma) */
function guarda_scroll() {
  const y = Math.round(window.scrollY);
  /* logo após restaurar, um scroll espúrio pra 0 (layout nascendo, reset
     nativo atrasado) NÃO pode apagar a posição verdadeira da sessão */
  if (y === 0 && _restaurado_em && Date.now() - _restaurado_em < 1500) return;
  try { sessionStorage.setItem(CHAVE_SCROLL, String(y)); } catch {}
}
let _scroll_timer;
addEventListener("scroll", () => {
  clearTimeout(_scroll_timer);
  _scroll_timer = setTimeout(guarda_scroll, 120);
}, { passive: true });
addEventListener("pagehide", guarda_scroll);
document.addEventListener("visibilitychange", () => { if (document.hidden) guarda_scroll(); });

function volta_ao_ponto() {
  let nav;
  try { nav = performance.getEntriesByType("navigation")[0]; } catch {}
  const doEstudio = document.referrer.includes("estudio.html");
  const voltando = doEstudio || (nav && (nav.type === "back_forward" ||
                                         nav.type === "reload"));
  if (!voltando) return;                      // visita nova: começa do topo mesmo
  let y = parseInt(sessionStorage.getItem(CHAVE_SCROLL) || "", 10);
  if (!Number.isFinite(y) || y <= 0) return;
  const vai = () => window.scrollTo({ top: y, left: 0, behavior: "instant" });
  _restaurado_em = Date.now();
  requestAnimationFrame(vai);
  setTimeout(vai, 400);
  setTimeout(vai, 1200);                      // imagens empurrando o layout
  setTimeout(() => { _restaurado_em = 0; }, 2000);
}
addEventListener("pageshow", (ev) => { if (ev.persisted) volta_ao_ponto(); });

function renderiza_patrocinadores() {
  const container = document.querySelector(".patrocinadores-grid");
  if (!container) return;

  container.innerHTML = PATROCINADORES.map(p => {
    const moldura = p.banner ? `
      <div class="patrocinador-moldura" style="--neon:${p.neon}">
        <img class="patrocinador-banner" src="${p.banner}" alt="Banner de ${p.nome}"
             width="800" height="435" loading="lazy">
      </div>` : "";
    const corpo = `${moldura}
      <div class="patrocinador-logo">
        <span class="patrocinador-icon">${p.icone}</span>
        <span class="patrocinador-nome">${p.nome}</span>
      </div>
      <p class="patrocinador-desc">${p.desc}</p>
      <span class="patrocinador-tag">${p.tag}</span>`;
    // banner = marca de verdade; link = a porta abre. Sem os dois, é vaga tracejada.
    if (p.link)
      return `<a class="patrocinador-card" href="${p.link}" target="_blank" rel="noopener">${corpo}</a>`;
    if (p.banner)
      return `<div class="patrocinador-card patrocinador-marca">${corpo}</div>`;
    return `<div class="patrocinador-card patrocinador-vago">${corpo}</div>`;
  }).join("");
}

/* ── menu mobile: abre/fecha o dropdown da nav (≤860px) ── */
function alterna_nav() {
  const nav = document.querySelector(".nav");
  const btn = document.getElementById("nav-abrir");
  if (!nav || !btn) return;
  const aberto = nav.classList.toggle("aberto");
  btn.setAttribute("aria-expanded", String(aberto));
  btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  btn.textContent = aberto ? "✕" : "☰";
}
function fecha_nav() {
  const nav = document.querySelector(".nav");
  const btn = document.getElementById("nav-abrir");
  if (nav && nav.classList.contains("aberto")) {
    nav.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menu");
    btn.textContent = "☰";
  }
}

/* ── cadastro: usuário gratuito / interessado (POST /cadastro) ── */
function liga_cadastro() {
  const msg = document.getElementById("cad-msg");
  if (!msg) return;
  document.querySelectorAll(".cad-form").forEach(form => {
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const telefone = form.telefone.value.trim();
      const plano = form.dataset.plano || "gratuito";
      if (!nome || !email || !telefone) {
        msg.textContent = "⚠ nome, e-mail e telefone são obrigatórios.";
        msg.className = "cad-nota erro";
        return;
      }
      const botao = form.querySelector("button");
      botao.disabled = true;
      msg.textContent = "enviando…";
      msg.className = "cad-nota";
      try {
        const r = await fetch("/cadastro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, telefone, plano })
        });
        const j = await r.json();
        if (!r.ok || !j.ok) throw new Error(j.erro || r.status);
        msg.textContent = plano === "interessado"
          ? "✓ dados recebidos! A operação entra em contato quando as vagas abrirem."
          : "✓ cadastro criado! Bom voo pela operação.";
        msg.className = "cad-nota ok";
        form.reset();
      } catch (e) {
        msg.textContent = "⚠ " + e.message;
        msg.className = "cad-nota erro";
      }
      botao.disabled = false;
    });
  });
}

/* ── boot ── */
maquina_escrever();
anima_contadores();
pinta_status();
renderiza_patrocinadores();
renderiza_veiculos();
liga_fotos();
liga_cadastro();

/* links do canal: o CTA "Inscrever-se" e o aviso da comunidade apontam pro
   mesmo URL configurável (CANAL_URL) — antes o href ficava em "#" morto */
["link-canal", "link-comunidade"].forEach((id) => {
  const a = document.getElementById(id);
  if (a) a.href = CANAL_URL;
});
volta_ao_ponto();
/* aba oculta: não fica batendo nas portas à toa; ao voltar, atualiza já */
setInterval(() => { if (!document.hidden) pinta_status(); }, 20000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) pinta_status();
});
document.getElementById("nav-abrir")?.addEventListener("click", alterna_nav);
document.querySelector(".nav")?.addEventListener("click", e => {
  if (e.target.tagName === "A") fecha_nav();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") fecha_nav(); });
