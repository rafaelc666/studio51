/* STUDIO51 — trilha instrumental de cada tela
 *
 * Uma faixa de 30 s por estúdio, gerada no ACE-Step do BBS, em loop.
 *
 * O pedido dele: "a musica pode rodar automatico em cada sala que entra".
 * Então o padrão é LIGADO: a sala tenta tocar sozinha no carregar, e a faixa é
 * a da sala aberta (estudio.html?s=radio -> audio/radio.mp3).
 *
 * Por que ainda tem botão: a política do navegador, não opinião minha --
 * Audio.play() com volume > 0 sem gesto do usuário vira rejection
 * (NotAllowedError). Quando o carregar é negado não aparece aviso nem o chip
 * acende mentindo: a mesma tentativa fica armada pro primeiro toque/tecla da
 * página e a música entra com fade. Onde o navegador já conhece o site ela
 * entra direto, sem clique nenhum.
 *
 * Continuidade: trocar de sala é uma página nova, então a posição do loop mora
 * em sessionStorage e a sala seguinte retoma de onde a anterior parou. "O que
 * entra substitui o que saiu" vale pro som também.
 *
 * Se o mp3 não existe ainda, o chip não aparece -- botão morto é pior que
 * botão ausente.
 */
(function () {
  "use strict";

  var VOL = 0.22;          // cama, não protagonista: a tela tem texto pra ler
  var FADE_DENTRO = 1400;  // ms — entrar do nada estoura o ouvido
  var FADE_FORA = 700;
  var CHAVE = "s51_trilha";       // "on" | "off" — quem nunca viu quer dizer on
  var FIADA = "s51_trilha_pos";   // onde o loop parou, nesta aba

  var pag = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var q = new URLSearchParams(location.search);
  var id = "home";
  if (pag.indexOf("estudio.") === 0) id = q.get("s") || "bbs";
  else if (pag.indexOf("dossie.") === 0) id = q.get("f") || "bbs";

  var url = "audio/" + id + ".mp3";
  var som = new Audio();
  som.loop = true;
  som.preload = "none";
  som.volume = 0;

  var tocando = false, pedindo = false, fade = null, armada = false;

  // modo privado e file:// fazem storage lançar: a trilha é enfeite,
  // não pode derrubar a página inteira por causa de uma preferência
  function lem() {
    try { return localStorage.getItem(CHAVE) === "off" ? "off" : "on"; }
    catch (e) { return "on"; }
  }
  function grava(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  // posição do loop na aba; a faixa tem ~30 s e o resto é 0
  function guarda_pos() {
    if (!tocando) return;
    try { sessionStorage.setItem(FIADA, String(som.currentTime || 0)); } catch (e) {}
  }
  function retoma() {
    var t = 0;
    try { t = parseFloat(sessionStorage.getItem(FIADA)) || 0; } catch (e) {}
    if (!(t > 0)) return;
    var aplica = function () {
      var d = som.duration;
      try { som.currentTime = (isFinite(d) && d > 0) ? t % d : t; } catch (e) {}
    };
    if (isFinite(som.duration)) aplica();
    else som.addEventListener("loadedmetadata", aplica, { once: true });
  }

  function existe(cb) {
    fetch(url, { method: "HEAD" })
      .then(function (r) { cb(r.ok && +(r.headers.get("content-length") || 1) > 10000); })
      .catch(function () { cb(true); });   // servidor sem HEAD: mostra e tenta
  }

  function cruzar(para, ms, fim) {
    if (fade) clearInterval(fade);
    var de = som.volume, passos = Math.max(1, Math.round(ms / 60)), i = 0;
    fade = setInterval(function () {
      i++;
      var k = Math.min(i / passos, 1);
      som.volume = Math.max(0, Math.min(1, de + (para - de) * k));
      if (k >= 1) { clearInterval(fade); fade = null; if (fim) fim(); }
    }, 60);
  }

  /* ── abertura: o radar antes da música ──
     O pedido dele na tela de entrada: primeiro o som de radar, depois a trilha.
     O radar é um sting de 8,4 s; quando acaba, a trilha entra. Se o radar não
     puder tocar -- arquivo fora, navegador barrando -- a trilha vai direto: a
     abertura não pode ficar muda por causa da ordem das coisas. */
  var RADAR = "audio/radar.mp3";
  var radar = null;

  function desliga_radar() {
    if (!radar) return;
    radar.pause();
    radar = null;
  }

  function comeca_trilha(motivo) {
    pedindo = true;
    som.src = url;
    som.play().then(function () {
      pedindo = false;
      tocando = true;
      retoma();
      cruzar(VOL, FADE_DENTRO);
      pintar();
    }).catch(function () {
      // não tocou: "carregamento"/"gesto" são tentativas silenciosas, só o
      // clique no botão merece o aviso -- gesto ainda não valeu (ou o arquivo
      // sumiu) e o chip não pode dizer ON com a sala muda
      pedindo = false;
      tocando = false;
      if (motivo === "botao") { pintar(true); }
      else { arma(); }
    });
  }

  function ligar(motivo) {
    // O primeiro toque da página vale pras duas rotas de uma vez: o pointerdown
    // que resgata a preferência antiga e o click no próprio botão. Sem esta
    // trava as duas chamavam play() e a primeira Promise era abortada -- o chip
    // ficava ON e o aviso "só toca depois de um clique" aparecia junto. Medido.
    if (tocando || pedindo) return;
    if (id !== "home") { comeca_trilha(motivo); return; }

    pedindo = true;
    var r = new Audio(RADAR);
    r.preload = "auto";
    r.volume = VOL;
    var emenda = function () {
      if (radar !== r) return;          // foi desligado no meio do ping
      radar = null;
      comeca_trilha(motivo);
    };
    r.addEventListener("ended", emenda);
    r.addEventListener("error", function () {
      radar = null; pedindo = false; comeca_trilha(motivo);
    });
    r.play().then(function () {
      radar = r;
      pedindo = false;
      tocando = true;                   // está saindo som: o chip pode dizer ON
      pintar();
    }).catch(function () {
      radar = null;
      pedindo = false;
      comeca_trilha(motivo);            // sem radar, a trilha tenta do jeito velho
    });
  }

  // o gesto que destrava o autoplay é o primeiro da página, qualquer que seja
  function arma() {
    if (armada) return;
    armada = true;
    var tenta = function () {
      document.removeEventListener("pointerdown", tenta);
      document.removeEventListener("keydown", tenta);
      if (lem() === "on") ligar("gesto");
    };
    document.addEventListener("pointerdown", tenta);
    document.addEventListener("keydown", tenta);
  }

  function desligar() {
    if (!tocando) { grava("off"); desliga_radar(); return; }
    desliga_radar();
    guarda_pos();
    cruzar(0, FADE_FORA, function () { som.pause(); som.currentTime = 0; });
    tocando = false;
    grava("off");
    pintar();
  }

  var botao, aviso;
  function pintar(sem_som) {
    if (!botao) return;
    botao.setAttribute("aria-pressed", tocando ? "true" : "false");
    botao.classList.toggle("ligada", tocando);
    botao.querySelector(".tr-txt").textContent = tocando ? "TRILHA ON" : "TRILHA OFF";
    if (sem_som && !tocando) {     // ON e "não toca" na mesma tela é contradição
      aviso.hidden = false;
      setTimeout(function () { aviso.hidden = true; }, 3200);
    }
  }

  function montar() {
    botao = document.createElement("button");
    botao.type = "button";
    botao.id = "trilha";
    botao.className = "trilha";
    botao.setAttribute("aria-pressed", "false");
    botao.innerHTML =
      '<span class="tr-ico" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
      '<span class="tr-txt">TRILHA OFF</span>' +
      '<span class="tr-que" id="tr-que">' + id + "</span>";
    aviso = document.createElement("span");
    aviso.id = "trilha-aviso";
    aviso.className = "trilha-aviso";
    aviso.hidden = true;
    aviso.textContent = "o navegador só deixa tocar depois de um clique";
    document.body.appendChild(botao);
    document.body.appendChild(aviso);

    botao.addEventListener("click", function () {
      if (tocando) { guarda_pos(); desligar(); }
      else { grava("on"); ligar("botao"); }
    });

    som.addEventListener("timeupdate", guarda_pos);
    addEventListener("pagehide", guarda_pos);

    // padrão ligado: tenta agora; se o navegador negar, arma pro primeiro gesto
    if (lem() === "on") { ligar("carregamento"); arma(); }

    // aba em segundo plano não precisa de música
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && tocando) { desliga_radar(); guarda_pos(); cruzar(0, 400, function () { som.pause(); }); }
      else if (!document.hidden && lem() === "on" && som.src) {
        som.play().then(function () { tocando = true; cruzar(VOL, FADE_DENTRO); pintar(); })
                 .catch(function () { tocando = false; pintar(); });
      }
    });
  }

  existe(function (ok) { if (ok) montar(); });
})();
