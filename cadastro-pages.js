/* ═══ STUDIO51 — cadastro na versão hospedada (GitHub Pages) ═══
   Local (servidor_site.py): POST /cadastro → cadastros.json (app.js cuida).
   GitHub Pages não tem backend: aqui o cadastro vai direto pra PLANILHA do
   dono (Google Apps Script — APP-SCRIPT-STUDIO51-CADASTRO.gs), que grava a
   linha e manda o e-mail de aviso. Se a planilha não responder, cai no
   fallback honesto: e-mail pré-preenchido pro dono. */
"use strict";

const S51_PAGES = location.hostname.endsWith(".github.io");
const S51_SHEET_URL = "https://script.google.com/macros/s/AKfycbzkV82_R_rZ77IbmFoI9luNkHehJIOX36HRwfckxmPikAFvYUxxBuFoO7Z1IHz64mZQcg/exec";
const S51_TOKEN = "s51-fila-1951";
const EMAIL_DONO = "rafaelc666@gmail.com";

if (S51_PAGES) {
  const msg = document.getElementById("cad-msg");
  const avisa = (texto, classe) => {
    if (msg) { msg.textContent = texto; msg.className = "cad-nota " + (classe || ""); }
  };

  /* a planilha se apresenta no carregamento (GET); sem resposta = modo e-mail */
  let MODO = null;
  const pronto = fetch(S51_SHEET_URL)
    .then(r => r.json())
    .then(d => { MODO = (d && d.ok) ? "planilha" : "email"; })
    .catch(() => { MODO = "email"; });

  function dados_do_form(form) {
    const f = new FormData(form);
    const pega = k => (f.get(k) || "").toString().trim();
    return {
      nome: pega("nome"), email: pega("email"), telefone: pega("telefone"),
      plano: form.dataset.plano || "gratuito", origem: location.href,
    };
  }

  function envia_email(dados) {
    const assunto = encodeURIComponent(
      "Cadastro Studio51 — " + (dados.plano === "interessado"
        ? "Habilitação de Operador" : "Usuário Gratuito"));
    const corpo = encodeURIComponent(
      "nome: " + dados.nome +
      "\ne-mail: " + dados.email +
      "\ntelefone: " + dados.telefone +
      "\nplano: " + dados.plano);
    window.location.href =
      "mailto:" + EMAIL_DONO + "?subject=" + assunto + "&body=" + corpo;
    avisa("✓ abri seu e-mail com o cadastro pronto — é só enviar. " +
      (dados.plano === "interessado"
        ? "A operação responde quando as vagas abrirem."
        : "Sem custo e sem cartão."), "ok");
  }

  function liga(form) {
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const dados = dados_do_form(form);
      if (!dados.nome || !dados.email || !dados.telefone) {
        avisa("⚠ nome, e-mail e telefone são obrigatórios.", "erro");
        return;
      }
      const botao = form.querySelector("button");
      if (botao) botao.disabled = true;
      const modo = MODO || await pronto;
      if (modo === "planilha") {
        avisa("enviando…");
        try {
          /* no-cors + text/plain: requisição simples, sem preflight — o Apps
             Script recebe o JSON no doPost. A resposta é opaca (não dá pra
             ler), então a confirmação real é a linha na planilha + o e-mail */
          await fetch(S51_SHEET_URL, {
            method: "POST", mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(Object.assign({ token: S51_TOKEN }, dados)),
          });
          avisa(dados.plano === "interessado"
            ? "✓ dados recebidos! A operação entra em contato quando as vagas abrirem."
            : "✓ cadastro criado! Bom voo pela operação.", "ok");
          form.reset();
        } catch (e) {
          envia_email(dados);
        }
      } else {
        envia_email(dados);
      }
      if (botao) botao.disabled = false;
    });
  }

  /* o clone descarta os listeners que o app.js registrou (o POST /cadastro
     não existe no Pages) — quem manda no form nesta versão é este módulo */
  document.querySelectorAll("form.cad-form").forEach((form) => {
    const clone = form.cloneNode(true);
    form.replaceWith(clone);
    liga(clone);
  });

  /* só no modo e-mail o visitante precisa saber que o envio sai dele */
  pronto.then(() => {
    if (MODO !== "email") return;
    document.querySelectorAll(".cadastro-card").forEach((card) => {
      const nota = document.createElement("p");
      nota.className = "cad-nota";
      nota.textContent =
        "versão hospedada: o cadastro sai pelo seu e-mail — nada é enviado pra um servidor.";
      card.appendChild(nota);
    });
  });
}
