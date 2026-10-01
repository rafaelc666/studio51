/* STUDIO51 — a folha A4 do dossiê
 *
 * Um único módulo, usado por qualquer tela que tenha um estúdio pra documentar.
 * Papel BRANCO em proporção A4 real (210×297), com o carimbo de ✕ CONFIDENCIAL
 * batido junto da data de liberação do Governo Federal.
 *
 * Chama-se abrir_folha_A4({...}) passando os dados do estúdio. Não lê global
 * nenhuma: quem tem o dado é quem chama, senão o módulo vira refém de um arquivo.
 */
(function () {
  "use strict";

  var LIBERACAO = "25/12/2026";
  /* A campanha: o laudo só sai do prédio no dia da liberação. Antes disso o
     botao aparece TRANCADO de proposito -- a pecas faltando e o anuncio.
     Contamos o relogio do visitante: isso e marketing, nao cofre. */
  var DIA_LIBERACAO = new Date(2026, 11, 25);      /* mes 11 = dezembro */
  function liberado() { return new Date() >= DIA_LIBERACAO; }


  var atual = null, abridor = null;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function montar(d) {
    var tela = document.createElement("div");
    tela.className = "folha-a4-tela";
    tela.id = "folha-a4-tela";

    var modulos = (d.modulos || []).map(function (m) {
      return '<div class="a4-mod"><h4>' + esc(m[0]) + "</h4><p>" + (m[1] || "") + "</p></div>";
    }).join("");

    // as linhas do log trazem <b> de propósito (21 das 100 da tabela) — do
    // mesmo jeito que o html dos módulos: escapá-las imprime a tag na cara do
    // operador em vez de destacar a palavra
    var log = (d.log || []).map(function (l) { return "<li>" + l + "</li>"; }).join("");

    tela.innerHTML =
      '<div class="folha-a4" role="dialog" aria-modal="true" aria-labelledby="a4-titulo" tabindex="-1">' +
        '<button class="a4-fechar" type="button" aria-label="Fechar a folha">&#x2715;</button>' +

        '<div class="a4-membrura">' +
          '<span>GOVERNO FEDERAL &middot; ARQUIVO NACIONAL</span>' +
          '<span>BLUEBOOKSTUDIO &middot; OPERA&Ccedil;&Atilde;O PROJETO STUDIO 51</span>' +
          '<span>REGISTRO N&ordm; ' + esc(d.sigla || d.registro || "S/N") + "</span>" +
        "</div>" +

        '<p class="a4-setor">' + esc(d.setor || "") + "</p>" +
        '<h2 class="a4-titulo" id="a4-titulo">' + esc(d.nome || "") + "</h2>" +
        '<p class="a4-frase">' + esc(d.frase || d.lema || "") + "</p>" +

        '<div class="a4-ficha">' +
          "<div><span>ESTADO</span><b>" + esc(d.status || "-") + "</b></div>" +
          "<div><span>SIGLA</span><b>" + esc(d.sigla || "-") + "</b></div>" +
          "<div><span>SIGILO</span><b>" + esc(d.classe || "RESTRITO") + "</b></div>" +
        "</div>" +

        // o carimbo mora AQUI de propósito: logo abaixo da ficha, antes da
        // descrição. Em fluxo do documento a posição dele é a mesma página tanto
        // num monitor 1080p quanto num laptop de 720 — ancorado em percentual do
        // papel, ele caía por cima da ficha em toda janela mais baixa.
        '<div class="a4-carimbo" aria-hidden="true">' +
          '<span class="a4-x">&#x2715;</span>' +
          "<span class=\"a4-palavra\">CONFIDENCIAL</span>" +
          "<span class=\"a4-data\">LIBERADO PELO GOVERNO FEDERAL<br><b>" + LIBERACAO + "</b></span>" +
        "</div>" +

        (modulos ? '<h3 class="a4-secao">DESCRI&Ccedil;&Atilde;O DOS COMPONENTES</h3>' +
                  '<div class="a4-mods">' + modulos + "</div>" : "") +

        (log ? '<h3 class="a4-secao">REGISTRO DE OPERA&Ccedil;&Atilde;O</h3>' +
               '<ul class="a4-log">' + log + "</ul>" : "") +

        '<div class="a4-rodape">' +
          (liberado()
            ? '<button class="a4-baixar" type="button">&#x2913; baixar laudo (.txt)</button>'
            : '<button class="a4-baixar bloqueado" type="button" disabled' +
              ' aria-disabled="true" title="liberacao em ' + LIBERACAO + '">' +
              '\u{1F512} laudo retido at\u00e9 ' + LIBERACAO + '</button>') +
          "<span>documento recolhido ap&oacute;s a leitura</span>" +
        "</div>" +
      "</div>";

    return tela;
  }

  function laudo_texto(d) {
    var L = [
      "GOVERNO FEDERAL - ARQUIVO NACIONAL",
      "liberado pelo governo federal em " + LIBERACAO,
      "",
      (d.nome || "").toUpperCase(),
      d.setor || "",
      "sigla: " + (d.sigla || d.registro || "-"),
      "estado: " + (d.status || "-"),
      "",
      d.frase || d.lema || "",
      "",
      "DESCRICAO DOS COMPONENTES",
    ];
    (d.modulos || []).forEach(function (m) {
      L.push("[" + m[0] + "] " + String(m[1] || "").replace(/<br\s*\/?>/g, " / ").replace(/<[^>]+>/g, ""));
    });
    if ((d.log || []).length) {
      L.push("", "REGISTRO DE OPERACAO");
      // o .txt não tem negrito: a marcação sai, a palavra fica
      d.log.forEach(function (l) { L.push("  " + String(l).replace(/<[^>]+>/g, "")); });
    }
    L.push("", "BlueBookStudio - operacao Projeto Studio 51 - arquivo n 1951");
    return L.join("\n");
  }

  function baixar(d) {
    /* segundo andar da trava: com o botao reabilitado no console, o arquivo
       mesmo assim nao sai antes da data -- a campanha nao e enfeite */
    if (!liberado()) return;
    var blob = new Blob([laudo_texto(d)], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (d.sigla || d.nome || "dossie").replace(/[^\w.-]+/g, "_") + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }

  function fechar() {
    if (!atual) return;
    var t = atual;
    atual = null;
    t.classList.add("saindo");
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 180);
    document.removeEventListener("keydown", no_teclado);
    if (abridor) {
      if (abridor.hasAttribute("aria-expanded")) abridor.setAttribute("aria-expanded", "false");
      if (abridor.focus) abridor.focus();
    }
  }

  function no_teclado(ev) { if (ev.key === "Escape") fechar(); }

  window.abrir_folha_A4 = function (dados, de_onde) {
    if (atual) fechar();
    abridor = de_onde || document.activeElement;
    var tela = montar(dados);
    document.body.appendChild(tela);
    atual = tela;

    var folha = tela.querySelector(".folha-a4");
    requestAnimationFrame(function () { folha.focus(); });

    tela.addEventListener("click", function (ev) {
      if (ev.target === tela) fechar();                       // clicou fora do papel
      if (ev.target.closest(".a4-fechar")) fechar();
      if (ev.target.closest(".a4-baixar")) baixar(dados);
    });
    document.addEventListener("keydown", no_teclado);
  };

  window.fechar_folha_A4 = fechar;
})();
