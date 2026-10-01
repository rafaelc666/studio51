/* ═══ STUDIO51 — estúdio virtual v2 (cenário fotográfico + HUD) ═══ */
"use strict";

/* cenário: recortes da foto real do hangar (img/) com tratamento distinto */
const CENARIO_BASE = "img/hangar.jpg";
const CENARIOS = {
  bbs:        { img: "img/setores/bluebookstudio.webp", filtro: "saturate(1.05) contrast(1.06)", pos: "center 40%" },
  mcs:          { img: "img/setores/mcs.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 55%" },
  terabrain:    { img: "img/setores/terabrain.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 30%",
                  video: "img/setores/tb_brain.mp4", videoMonitor: "img/setores/tb_chip.mp4" },
  confidencial: { img: "img/setores/confidencial.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  freedark:   { img: "img/setores/freedarkstudio.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  maestro:      { img: "img/setores/maestro.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 60%" },
  dna:          { img: "img/setores/dna.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 30%" },
  laboratorio:  { img: "img/setores/laboratorio.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 40%" },
  /* studios com arte própria (capa = apresentação da tela) */
  social:     { img: "img/setores/social-media.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 42%" },
  "007":      { img: "img/setores/007.webp",          filtro: "saturate(1.1) contrast(1.06)", pos: "center 38%" },
  "009":      { img: "img/setores/009.webp",      filtro: "saturate(1.06) contrast(1.04)", pos: "center 55%" },
  cia:        { img: "img/setores/cia.webp",       filtro: "saturate(1.06) contrast(1.04)", pos: "center 35%" },
  route66:    { img: "img/setores/route66.webp",   filtro: "saturate(1.06) contrast(1.04)", pos: "center 50%" },
  lr:         { img: "img/setores/lr.webp",        filtro: "saturate(1.06) contrast(1.04)", pos: "center 60%" },
  ycut:       { img: "img/setores/ycut.webp",      filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  abc:        { img: "img/setores/abc.webp",       filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  studio10:   { img: "img/setores/studio10.webp",  filtro: "saturate(1.06) contrast(1.04)", pos: "center 30%" },
  studio34:   { img: "img/setores/studio34.webp",  filtro: "saturate(1.06) contrast(1.04)", pos: "center 65%" },
  carousel99:   { img: "img/setores/carousel99.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 55%" },
  bigt:         { img: "img/setores/bigt.webp",      filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  studio369:  { img: "img/setores/studio369.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 40%" },
  royalmint:  { img: "img/setores/royalmint.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 50%" },
  byok:       { img: "img/setores/byok.webp",      filtro: "saturate(1.06) contrast(1.04)", pos: "center 35%" },
  studiodb:   { img: "img/setores/studiodb.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 50%" },
  /* placeholders — trocar img pelo arquivo da arte (img/setores/NOME.webp) quando ficar pronta */
  mega:         { img: "img/setores/mega.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 40%" },
  radio:        { img: "img/setores/radio.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 35%" },
  montagem:     { img: "img/setores/montagem.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 60%" },
  directors:    { img: "img/setores/directors.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 45%" },
  ajustes:      { img: "img/setores/ajustes.webp", filtro: "saturate(1.06) contrast(1.04)", pos: "center 50%" },
};

const ESTUDIOS = {
  bbs: {
    setor: "SETOR B · BLUE BOOK", nome: "BlueBookStudio", sigla: "OPR-B/8600",
    status: "OPERACIONAL",
    modulos: [
      ["AGENTES", "<b>faculdade</b> 7 equipes ativas<br><b>pipeline</b> roteiro→cena→vídeo<br><b>DNA</b> limiar 0.94 ✓"],
      ["GERAÇÃO", "<b>imagens</b> validadas por embedding<br><b>vídeos</b> fila do flow (8760)<br><b>montagem</b> automática"],
      ["SAÍDA", "<b>canais</b> 4 veículos<br><b>formato</b> 16:9 · 9:16<br><b>legendas</b> automáticas"],
    ],
    log: [
      "[cam-01] pavilhão B em operação",
      "[dna] fichas canônicas carregadas: <b>bibliotecario</b>",
      "[agentes] equipe <b>manga</b> em sessão",
      "[fila] 3 jobs de imagem aguardando validação",
    ],
    acoes: [["⤓ Baixar o wallpaper (tamanho total)", "img/setores/bluebookstudio.webp", "baixar"]],
  },
  mcs: {
    setor: "SETOR M · FREQUÊNCIA", nome: "MusicClipStudio", sigla: "OPR-M/3100",
    status: "OPERACIONAL",
    frase: "A cabine de som: trilha, voz e corte nascem aqui.",
    modulos: [
      ["ACE-STEP", "<b>motor</b> trilha por prompt<br><b>fila</b> sob demanda<br><b>saída</b> wav/stem"],
      ["VOZ", "<b>TTS</b> narração pt-BR<br><b>estilos</b> em expansão<br><b>próximo</b> GPT-SoVITS/RVC"],
      ["CORTE", "<b>clipes</b> automáticos<br><b>efeitos</b> lib de casa<br><b>render</b> 9:16 e 16:9"],
    ],
    log: [
      "[cabine] monitores de nível em -6dB",
      "[ace-step] último prompt: <b>trilha épica UFO</b>",
      "[voz] narração pronta pra revisão",
    ],
    acoes: [["⤓ Baixar o MusicClipStudio (GitHub)", "https://github.com/rafaelc666/MusicClipStudio"]],
  },
  terabrain: {
    setor: "SETOR TB · MEMÓRIA", nome: "TeraBrain", sigla: "TB-Σ/MCP",
    status: "ACERVO CONSULTÁVEL",
    frase: "O cérebro de memória: 120+ volumes que respondem perguntas.",
    modulos: [
      ["ACERVO", "<b>volumes</b> ~120 (meta 500)<br><b>índice</b> chromadb<br><b>busca</b> semântica"],
      ["MCP", "<b>protocolo</b> tools/resources<br><b>clientes</b> Claude Desktop<br><b>versão</b> 4.0.10 ✓"],
      ["REGRAS", "<b>citação</b> sempre direta<br><b>sem fonte</b> = refaz<br><b>público</b> leigo"],
    ],
    log: [
      "[estante] último handshake: <b>OK v4.0.10</b>",
      "[busca] 'arquétipos gnósticos' → 7 trechos",
      "[citação] fonte obrigatória em toda seção",
    ],
    acoes: [["⤓ Baixar o TeraBrain (GitHub)", "https://github.com/rafaelc666/biblioteca-sophia"]],
  },
  freedark: {
    setor: "SETOR FD · CANAIS DARK", nome: "FreeDarkStudio", sigla: "FDK-S51/DARK",
    status: "INTEGRAÇÃO EM CURSO",
    modulos: [
      ["PRODUÇÃO", "<b>edição</b> de vídeos<br><b>narração</b> de locução<br><b>pipeline</b> do estúdio"],
      ["CRESCIMENTO", "<b>análise</b> de métricas<br><b>SEO</b> otimizado<br><b>performance</b> monitorada"],
      ["PUBLICAÇÃO", "<b>canais</b> YouTube · Rumble<br><b>monetização</b> ativada<br><b>integração</b> em curso"],
    ],
    log: [
      "[canais] grade de publicação: <b>2 veículos</b>",
      "[seo] otimização de metadados: ativa",
      "[integração] aguardando gancho no programa",
    ],
    acoes: [["⟵ arquivo de estúdios", "index.html"]],
  },
  confidencial: {
    setor: "SETOR A · RESTRITO", nome: "Confidencial", sigla: "VIG-A/XXX",
    status: "EM EXPANSÃO",
    frase: "Projeto em andamento — nome e missão retidos pela operação.",
    modulos: [
      ["MAPAS", "<b>camadas</b> tráfego/aero/CCTV<br><b>motor</b> gods-eye-view<br><b>notas</b> anotações vivas"],
      ["FONTES", "<b>resolução</b> automática<br><b>fallback</b> multi-provider<br><b>latência</b> monitorada"],
      ["SHELL", "<b>plugins</b> anatomia mapeada<br><b>widgets</b> QML quickshell<br><b>docs</b> técnicas prontas"],
    ],
    log: [
      "[setor] operação em expansão silenciosa",
      "[acesso] nível de sigilo: alto",
      "[liberação] nome e missão sob autorização",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=confidencial"]],
  },
  maestro: {
    setor: "SETOR Ω · ORQUESTRA", nome: "Maestro", sigla: "ORQ-Ω/80",
    status: "REGENDO",
    frase: "O fosso da orquestra: 80 músicos digitais sob uma batuta.",
    modulos: [
      ["ORQUESTRA", "<b>músicos</b> 80 ativos<br><b>formato</b> base+deltas<br><b>peso</b> 16 KB cada"],
      ["REGÊNCIA", "<b>agente</b> sound design fable<br><b>fila</b> gpu.lock ativa<br><b>motor</b> maestro.py"],
      ["ECONOMIA", "<b>vs JPEGs</b> 2.259× menor<br><b>tráfego</b> 6072×<br><b>reroll</b> 35%→7%"],
    ],
    log: [
      "[fosso] 80 músicos afinados: <b>prontos</b>",
      "[batuta] próximo movimento: trilha do canal",
      "[fila] lock de GPU respeitado",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=maestro"]],
  },
  dna: {
    setor: "SETOR DNA · HÍBRIDOS", nome: "Character DNA", sigla: "HÍBR/0.94",
    status: "FASE 2",
    frase: "A câmara dos espécimes: identidade como estado puro.",
    modulos: [
      ["ESPÉCIMES", "<b>ativo</b> bibliotecario<br><b>exemplo</b> luna_v1<br><b>peso</b> ~2 KB cada"],
      ["VALIDAÇÃO", "<b>embedding</b> CLIP 512d<br><b>limiar</b> 0.94<br><b>drift</b> alerta automático"],
      ["PROMPT", "<b>agente</b> por cena/motor<br><b>ficha</b> gemini vision<br><b>paleta</b> dos pixels"],
    ],
    log: [
      "[câmara] espécime <b>bibliotecario</b>: 0.9923 ✓",
      "[alerta] espécime luna_v1: DRIFT 0.4757 ⚠",
      "[ponte] roteiro citou personagem → ficha injetada",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=dna"]],
  },
  laboratorio: {
    setor: "SETOR R · P&D", nome: "Laboratório", sigla: "P&D-R/PLASMA",
    status: "EXPERIMENTAL",
    frase: "A ala de plasma: onde o impossível fica possível.",
    modulos: [
      ["PLASMA", "<b>codeRLC</b> reforço de código<br><b>crewai</b> esquadrões<br><b>status</b> aprendendo"],
      ["VOZ", "<b>moss-tts</b> nano em ensaio<br><b>harmonic</b> core sonoro<br><b>uso</b> futuro Setor M"],
      ["VISÃO", "<b>see-through</b> camadas<br><b>aplicação</b> setor confidencial"],
    ],
    log: [
      "[plasma] experimento codeRLC: iteração 47",
      "[esquadrão] crewai: 3 agentes colaborando",
      "[promoção] nenhum protótipo pronto ainda",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=laboratorio"]],
  },
  social: {
    setor: "STUDIO SM · VIRALIZAÇÃO", nome: "Social Media Studio51", sigla: "OPR-SM/VIRAL",
    status: "OPERACIONAL",
    frase: "Do conteúdo à viralização: ideias, vídeos, audiência e resultados.",
    modulos: [
      ["PRODUÇÃO", "<b>planejamento</b> calendário editorial<br><b>roteiros</b> hooks prontos<br><b>edição</b> corte vertical"],
      ["PACOTE", "<b>legendas</b> queimadas<br><b>thumbnails</b> A/B<br><b>publicação</b> multi-rede"],
      ["MÉTRICA", "<b>analytics</b> por plataforma<br><b>cases</b> estratégia→crescimento<br><b>loop</b> engajamento"],
    ],
    log: [
      "[set] wall de monitores: <b>conectado</b>",
      "[fila] 3 verticals aguardando corte",
      "[analytics] último case: estratégia → crescimento",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=social"]],
  },
  byok: {
    setor: "STUDIO BYOK · CHAVES", nome: "BYOK", sigla: "KEY-BYOK/OWN",
    status: "OPERACIONAL",
    frase: "Bring your own key: suas chaves, seus créditos, seu controle.",
    modulos: [
      ["CHAVES", "<b>provider</b> próprio<br><b>custo</b> direto, sem intermediário<br><b>troca</b> a qualquer momento"],
      ["USO", "<b>setores</b> todos consomem<br><b>fila</b> local<br><b>fallback</b> por chave"],
      ["SEGURANÇA", "<b>.env</b> local<br><b>nada</b> em nuvem<br><b>rotação</b> manual"],
    ],
    log: [
      "[cofre] chaves carregadas: <b>OK</b>",
      "[uso] última chamada faturada na sua chave",
      "[nuvem] nenhum segredo enviado",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  studiodb: {
    setor: "STUDIO DB · BANCO", nome: "StudioDB", sigla: "DB-S51/SQL",
    status: "OPERACIONAL",
    frase: "A memória estruturada da operação: projetos, fontes e agências num banco só.",
    modulos: [
      ["DADOS", "<b>projetos</b> arquivos e recursos<br><b>busca</b> global do topo<br><b>agências</b> Instagram · YouTube"],
      ["REGISTRO", "<b>achados</b> fonte + URL + data<br><b>compliance</b> por nicho<br><b>arquivo</b> manual ao vivo"],
      ["SAÍDA", "<b>relatório</b> por agência<br><b>exporta</b> quando pedir"],
    ],
    log: [
      "[banco] última entrada: compliance Instagram",
      "[busca] índice global respondendo",
      "[fonte] URL anexada ao achado",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  "009": {
    setor: "STUDIO 009 · AGENT STUDIO", nome: "009AgentStudio", sigla: "ESP-009/DOS",
    status: "OPERACIONAL",
    frase: "A sala dos dossiês: microfilmes, pastas sigilosas e o neon do 9.",
    modulos: [
      ["DOSSIÊS", "<b>agentes</b> perfis completos<br><b>telas</b> pastas vigiadas<br><b>neon</b> 9 aceso"],
      ["ARQUIVO", "<b>microfilmes</b> leitura pronta<br><b>pastas</b> classificadas<br><b>spot</b> na mesa"],
      ["MISSÃO", "<b>alvo</b> história em capítulos<br><b>fonte</b> arquivo interno<br><b>saída</b> série documental"],
    ],
    log: [
      "[leitor] microfilme carregado",
      "[neon] número 9: <b>aceso</b>",
      "[pasta] próxima missão em análise",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  "007": {
    setor: "STUDIO 007 · GOV AGENCY", nome: "007GovAgency", sigla: "GOV-007/51",
    status: "OPERACIONAL",
    frase: "Informação também é poder — do briefing ao impacto.",
    modulos: [
      ["INVESTIGAÇÃO", "<b>pesquisas</b> fontes confiáveis<br><b>análise</b> qualidade e conformidade<br><b>verdade</b> rastreada"],
      ["ARSENAL", "<b>roteiros</b> estratégia de comunicação<br><b>arte</b> imagens e vídeos oficiais<br><b>tradução</b> multilíngue + localização"],
      ["ALCANCE", "<b>SEO</b> visibilidade<br><b>distribuição</b> multi-plataforma<br><b>facilidade</b> Project Bluebook"],
    ],
    log: [
      "[war room] mapa global: <b>projetado</b>",
      "[facilidade] placa PROJECT BLUEBOOK 51: confirmada",
      "[protocolo] operações reais · resultados reais",
    ],
    acoes: [["📄 Ver dossiê", "dossie.html?f=007"]],
  },
  cia: {
    setor: "STUDIO CIA · INTELIGÊNCIA", nome: "CIA", sigla: "INT-CIA/FIO",
    status: "OPERACIONAL",
    frase: "Fios conectando notas: inteligência de fontes públicas e o radar de nicho moram aqui.",
    modulos: [
      ["MURO", "<b>documentos</b> fontes abertas<br><b>fios</b> conexões visíveis<br><b>recortes</b> jornais antigos"],
      ["PESQUISA DE NICHO", "<b>radar</b> tema e tendência<br><b>concorrentes</b> mapeados<br><b>público</b> idade · região · hábito<br><b>lacuna</b> identificada"],
      ["MESA", "<b>lupa</b> sobre a prova<br><b>lâmpadas</b> âmbar<br><b>café</b> sempre quente"],
      ["SAÍDA", "<b>briefing</b> pronto pros roteiristas<br><b>relatório</b> investigativo<br><b>formato</b> série"],
    ],
    log: [
      "[muro] 14 documentos pendurados",
      "[fio] conexão nova: suspect → movimento",
      "[radar] nicho confirmado: lacuna no vertical",
      "[lupa] analisando recorte de 1969",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  route66: {
    setor: "STUDIO 66 · ROTA", nome: "RouteStudio66", sigla: "RT-66/VAN",
    status: "OPERACIONAL",
    frase: "Neon de motel, van de broadcast vintage e a rodovia no horizonte.",
    modulos: [
      ["SET", "<b>neon</b> motel laranja<br><b>van</b> broadcast vintage<br><b>deserto</b> na porta do hangar"],
      ["VIAGEM", "<b>episódios</b> estrada afora<br><b>estética</b> americana retrô<br><b>trilha</b> rádio AM"],
      ["DESTINO", "<b>formato</b> série de viagem<br><b>ritmo</b> quilômetro por minuto"],
    ],
    log: [
      "[neon] motel: <b>aceso</b>",
      "[van] motor quente, antena erguida",
      "[rota] próxima parada: episódio 3",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  mega: {
    setor: "STUDIO BIGT · MEGA PRODUÇÕES", nome: "MegaProductions", sigla: "MEGA-BT/DNA",
    status: "OPERACIONAL",
    frase: "A mega produção dos espécimes: ficha canônica, paleta e rosto validado entre cenas.",
    modulos: [
      ["FICHA", "<b>canônica</b> descrição travada<br><b>paleta</b> extraída dos pixels<br><b>embedding</b> CLIP 512d"],
      ["VALIDAÇÃO", "<b>limiar</b> 0.94<br><b>drift</b> alerta automático<br><b>injeção</b> no roteiro"],
      ["USO", "<b>qualquer</b> pavilhão consulta<br><b>rostos</b> idênticos entre cenas"],
    ],
    log: [
      "[mega] produção aberta: <b>bibliotecario</b>",
      "[carimbo] espécime validado 0.9923 ✓",
      "[paleta] 6 cores canônicas",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  directors: {
    setor: "STUDIO BIGT · DIREÇÃO", nome: "Director's Cut", sigla: "DIR-BT/CUT",
    status: "OPERACIONAL",
    frase: "A cadeira de diretor: decisão final de corte, tom e ritmo.",
    modulos: [
      ["CADEIRA", "<b>corte</b> final aprovado aqui<br><b>tom</b> e ritmo sob comando"],
      ["REVISÃO", "<b>frame</b> a frame quando precisa<br><b>veto</b> devolve pra montagem"],
      ["SAÍDA", "<b>master</b> pronto pro canal"],
    ],
    log: [
      "[cadeira] ocupada",
      "[veto] cena 4 devolvida ao corte",
      "[master] último cut: aprovado",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  lr: {
    setor: "STUDIO LR · RACIONADO", nome: "StudiosLR — Limited Resources", sigla: "LIM-LR/1LUZ",
    status: "MODO ESCURO",
    frase: "Um terminal velho, uma lâmpada prática, zero desperdício.",
    modulos: [
      ["SET", "<b>concreto</b> canto nu do hangar<br><b>terminal</b> antigo e confiável<br><b>luz</b> 1 lâmpada prática"],
      ["DISCIPLINA", "<b>tudo</b> racionado<br><b>estética</b> realismo cru<br><b>regra</b> menos é mais"],
      ["SAÍDA", "<b>conteúdo</b> com cara de verdade<br><b>custo</b> próximo de zero"],
    ],
    log: [
      "[set] luz única: acesa",
      "[terminal] boot concluído em 42s",
      "[inventário] nada sobrando — como planejado",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  ycut: {
    setor: "STUDIO Y · FITAS", nome: "StudioYcuT", sigla: "ARC-Y/REEL",
    status: "OPERACIONAL",
    frase: "O arquivo de fitas com o set de Reactions: racks verticais, playback e sombras profundas.",
    modulos: [
      ["ARQUIVO", "<b>racks</b> verticais de bobinas<br><b>etiquetas</b> todas catalogadas<br><b>sombra</b> industrial"],
      ["REACTIONS", "<b>playback</b> na parede<br><b>câmera</b> apontada pra cadeira<br><b>carimbo</b> STUDIO51 na moldura"],
      ["MOVIMENTO", "<b>worklight</b> única em deslocamento<br><b>busca</b> por fita e por data"],
      ["SAÍDA", "<b>cut</b> vertical pra rede<br><b>bruto</b> para remontagens"],
    ],
    log: [
      "[rack] fita #0442 localizada",
      "[worklight] varrendo corredor C",
      "[reactions] playback carregado · câmera focada",
      "[etiqueta] catálogo em ordem",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  abc: {
    setor: "STUDIO ABC · MUNDO", nome: "ABC WorldStudio", sigla: "ABC-W/GLOBO",
    status: "EM MONTAGEM",
    frase: "O estúdio do mundo: janelas globais e as antenas que ainda vão acender.",
    modulos: [
      ["SET", "<b>escopo</b> aberto ao mundo<br><b>pavilhão</b> em montagem<br><b>janelas</b> sendo instaladas"],
      ["PLATAFORMAS · BREVE", "<b>bilibili</b> antena oriental<br><b>dailymotion</b> segunda onda<br><b>rumble</b> terceira antena<br><b>chave</b> de API pendente"],
      ["MISSÃO", "<b>temas</b> globais<br><b>formato</b> a definir em breve"],
      ["STATUS", "<b>ficha</b> aguardando briefing do dono"],
    ],
    log: [
      "[pavilhão] andaimes erguidos",
      "[plataformas] bilibili · dailymotion · rumble: aguardando liberação",
      "[briefing] aguardando o dono",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  radio: {
    setor: "STUDIO RÁDIO · ANTENA", nome: "Rádio", sigla: "RAD-S51/ONAIR",
    status: "NO AR",
    frase: "A antena do complexo: transmissão contínua de voz e trilha.",
    modulos: [
      ["ANTENA", "<b>transmissão</b> contínua<br><b>voz</b> sintética do set<br><b>trilha</b> do Setor M"],
      ["PROGRAMAÇÃO", "<b>blocos</b> por tema<br><b>loop</b> sem repetição imediata"],
      ["USO", "<b>fundos</b> de transmissão ao vivo"],
    ],
    log: [
      "[antena] no ar",
      "[bloco] próximo: mistério noturno",
      "[volume] -6dB constante",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  montagem: {
    setor: "STUDIO MONTAGEM · CORTE", nome: "Montagem", sigla: "MON-S51/TIMELINE",
    status: "OPERACIONAL",
    frase: "A ilha de edição: timeline, cortes e ritmo do material bruto.",
    modulos: [
      ["ILHA", "<b>timeline</b> multi-trilha<br><b>cortes</b> no ritmo<br><b>transições</b> de casa"],
      ["BRUTO", "<b>material</b> chega dos studios<br><b>ordem</b> por prioridade do canal"],
      ["SAÍDA", "<b>cut</b> pronto pro Director's Cut"],
    ],
    log: [
      "[ilha] timeline carregada",
      "[corte] último material: 3 versões",
      "[fila] 2 montagens em curso",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  studio10: {
    setor: "STUDIO 10 · AO VIVO", nome: "Studio10 — Live Show & Lessons", sigla: "LIVE-10/ONAIR",
    status: "NO AR",
    frase: "O palco ao vivo: paredão de LED, plateia nas sombras e o ON AIR aceso.",
    modulos: [
      ["PALCO", "<b>LED</b> parede inteira<br><b>plateia</b> nas sombras<br><b>ON AIR</b> vermelho pulsando"],
      ["RIG", "<b>iluminação</b> de show<br><b>câmeras</b> multi-ângulo<br><b>áudio</b> ao vivo"],
      ["CONTEÚDO", "<b>shows</b> e <b>aulas</b> gravadas<br><b>formato</b> live + replay"],
    ],
    log: [
      "[palco] LED: <b>calibrado</b>",
      "[on-air] sinal vermelho ativo",
      "[plateia] silêncio — começa em 3… 2…",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  studio34: {
    setor: "STUDIO ¾ · MINIATURAS", nome: "Studio3/4", sigla: "MIN-3:4/DIO",
    status: "OPERACIONAL",
    frase: "A oficina em miniatura: dioramas ¼ de ruas e salas sob luz quente.",
    modulos: [
      ["OFICINA", "<b>dioramas</b> ruas e quartos<br><b>escala</b> ¼ detalhada<br><b>obra</b> prédios em construção"],
      ["LUZ", "<b>task lights</b> quentes<br><b>macro</b> câmera próxima"],
      ["USO", "<b>cenas</b> impossíveis em escala real<br><b>efeito</b> prático barato"],
    ],
    log: [
      "[bancada] diorama da rua: 80% pronto",
      "[luz] quente acesa",
      "[câmera] macro focada no prédio 3",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  carousel99: {
    setor: "STUDIO 99 · CARROSSEL", nome: "Carousel Studio 99", sigla: "CRSL-99/SLIDE",
    status: "PROJETANDO",
    frase: "A mesa de luz: slides espalhados, poeira no feixe e memória em 35mm.",
    modulos: [
      ["CARROSSEL", "<b>projetor</b> girando<br><b>slides</b> dezenas na mesa<br><b>poeira</b> no feixe de luz"],
      ["MEMÓRIA", "<b>arquivo</b> visual em 35mm<br><b>narrativa</b> slide a slide"],
      ["USO", "<b>aberturas</b> nostálgicas<br><b>transições</b> de época"],
    ],
    log: [
      "[projetor] carrossel: <b>girando</b>",
      "[mesa] 27 slides espalhados",
      "[feixe] poeira em dança",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  bigt: {
    setor: "STUDIO BIGT · PALCO GRANDE", nome: "BigTStudios", sigla: "BGT-S51/TITA",
    status: "EM MONTAGEM",
    frase: "O palco dos grandes: cenário imponente, luz de cinema e produção em escala máxima.",
    modulos: [
      ["SET", "<b>palco</b> estrutura gigante<br><b>cenografia</b> monumental<br><b>plató</b> em nível de cinema"],
      ["LUZ & CÂMERA", "<b>rigging</b> de teto carregado<br><b>câmeras</b> em multi-ângulo<br><b>grua</b> pra plano aéreo"],
      ["PRODUÇÃO", "<b>escalas</b> grandes por natureza<br><b>temporadas</b> em série<br><b>estúdio</b> reservado por projeto"],
    ],
    log: [
      "[palco] montagem: <b>nível 3</b>",
      "[luz] rig de teto: carregado",
      "[câmera] grua posicionada",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  studio369: {
    setor: "STUDIO 369 · NÚMEROS", nome: "Studio 369", sigla: "ESO-369/LUZ",
    status: "RESONANDO",
    frase: "3 · 6 · 9 de luz suspensa, bobinas de Tesla e geometria sagrada no chão.",
    modulos: [
      ["SET", "<b>números</b> 3, 6 e 9 gigantes<br><b>material</b> luz suspensa<br><b>tesla</b> bobinas em exibição"],
      ["CHÃO", "<b>geometria</b> sagrada projetada<br><b>frequência</b> em ressonância"],
      ["CONTEÚDO", "<b>esotérico</b> com estética científica<br><b>formato</b> documental visual"],
    ],
    log: [
      "[números] 3 · 6 · 9: <b>suspensos</b>",
      "[tesla] bobina em carga",
      "[chão] geometria: projetada",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  royalmint: {
    setor: "STUDIO 8 · CASA DA MOEDA", nome: "Royal Mint Studio 8", sigla: "RMS-8/AU",
    status: "CUNHANDO",
    frase: "A casa da moeda do hangar: onde cada canal ganha rosto cunhado e emblema real.",
    modulos: [
      ["PRENSAS", "<b>coining</b> moedas brilhantes<br><b>bandejas</b> cheias<br><b>emblema</b> número 8"],
      ["IDENTIDADES DE CANAIS", "<b>rosto</b> avatar e banner<br><b>voz</b> tom de narração<br><b>passado</b> lore do canal<br><b>checklist</b> antes de publicar"],
      ["OURO", "<b>lingotes</b> empilhados<br><b>brilho</b> sob luz de banca"],
      ["USO", "<b>pipeline</b> consulta o selo antes de produzir<br><b>estética</b> real e pesada"],
    ],
    log: [
      "[prensa] cunhagem: <b>em curso</b>",
      "[selo] identidade carimbada: canal ativo",
      "[cofre] lingotes conferidos",
      "[emblema] 8 carimbado a ouro",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
  ajustes: {
    setor: "STUDIO SET · CONTAS", nome: "Senhas & Ajustes", sigla: "SET-S51/CONT",
    status: "OPERACIONAL",
    frase: "A sala do cadeado: usuário e senha do estúdio sob seu controle — troque quando quiser.",
    modulos: [
      ["CONTA", "<b>usuário</b> do set<br><b>senha</b> trocável a qualquer momento<br><b>acesso</b> só o dono"],
      ["ENTRADA", "<b>login</b> na porta 8600<br><b>sessão</b> encerra pelo botão Sair<br><b>chave</b> nunca sai da máquina"],
      ["REGISTRO", "<b>trocas</b> anotadas no arquivo<br><b>ajustes</b> aplicados na hora"],
    ],
    log: [
      "[cadeado] conta carregada: <b>studio51</b>",
      "[senha] última troca registrada",
      "[ajustes] nada pendente",
    ],
    acoes: [["⟵ arquivo de studios", "index.html"]],
  },
};

/* Salas que saíram do ar por decisão dele (30/09/2026): sophia era a
   mesma sala que terabrain (nome, sigla e setor idênticos -- repetição não fica
   no site), e vimana / extensoes / screenrec eram criação da IA pro protótipo.
   Link antigo não pode abrir casca vazia: sophia herda a sucessora, o resto
   volta pro arquivo. */
const SALAS_FORA_DO_AR = { sophia: "terabrain" };

/* ── render ── */
function render_estudio(id) {
  if (SALAS_FORA_DO_AR[id]) { location.replace('estudio.html?s=' + SALAS_FORA_DO_AR[id]); return; }
  const e = ESTUDIOS[id];
  if (!e) { location.replace('index.html'); return; }
  document.title = "ESTÚDIO " + e.nome + " — STUDIO51";
  const set = (i, v) => { const el = document.getElementById(i); if (el) el.innerHTML = v; };

  /* cenário fotográfico */
  const c = CENARIOS[id] || CENARIOS.bbs;
  const foto = document.getElementById("palco-foto");
  foto.style.backgroundImage = `url('${c.img}')`;
  foto.style.filter = c.filtro;
  foto.style.backgroundPosition = c.pos;

  /* vídeo de cenário (só onde existe ANIMA + ativo): o palco vira o filme;
     se o navegador recusar autoplay, a foto estática continua de pé */
  const palco = document.querySelector(".palco");
  const vpalco = document.getElementById("palco-video");
  if (vpalco) {
    if (c.video) {
      vpalco.hidden = false;
      palco.classList.add("tem-video");
      vpalco.src = c.video;
      const rodou = vpalco.play();
      if (rodou && rodou.catch) rodou.catch(() => {
        vpalco.hidden = true;
        palco.classList.remove("tem-video");
      });
    } else {
      vpalco.pause();
      vpalco.hidden = true;
      palco.classList.remove("tem-video");
    }
  }

  set("e-setor", e.setor);
  /* nome grande do palco removido (pedido do dono, 01/10/2026): em todas as
     salas o título virava uma caixa azul sobre a arte — o nome da sala segue
     existindo no chip do setor, na aba do navegador e no dossiê */
  const en = document.getElementById("e-nome");
  if (en) en.hidden = true;
  /* a frase em branco por cima da foto pesava visualmente (BBS e FreeDark):
     sala sem frase some com a linha em vez de deixar aspas vazias */
  const ef = document.getElementById("e-frase");
  if (ef) {
    if (e.frase) { ef.textContent = "“" + e.frase + "”"; ef.hidden = false; }
    else { ef.textContent = ""; ef.hidden = true; }
  }
  set("e-status", e.status);
  set("e-sigla", e.sigla);

  /* módulos nos monitores (grade dinâmica — nasce conforme o nº de módulos) */
  const LETRAS = ["A", "B", "C", "D", "E", "F"];
  const grid = document.getElementById("painel-grid");
  if (grid) {
    /* monitor de vídeo extra (chip) — só onde o cenário manda vídeo */
    const monVideo = c.videoMonitor ? `
    <div class="monitor monitor-video">
      <span class="mon-rot">MÓDULO ∞ · <b>FLUXO AO VIVO</b></span>
      <video src="${c.videoMonitor}" muted loop autoplay playsinline preload="auto"
             aria-label="Animação: chip processando energia"></video>
    </div>` : "";
    grid.innerHTML = monVideo + e.modulos.map((m, i) => `
    <div class="monitor">
      <span class="mon-rot">MÓDULO ${LETRAS[i] || i + 1} · <b>${m[0]}</b></span>
      <div class="mon-tela">${m[1]}</div>
    </div>`).join("");
  }

  /* log digitando linha a linha */
  const logBox = document.getElementById("e-log");
  logBox.innerHTML = "";
  let li = 0;
  (function digita() {
    if (li >= e.log.length) {
      logBox.insertAdjacentHTML("beforeend", '<span class="ln"><span class="cursor"></span></span>');
      return;
    }
    const ln = document.createElement("span");
    ln.className = "ln";
    ln.innerHTML = "&gt; " + e.log[li];
    logBox.appendChild(ln);
    li++;
    setTimeout(digita, 560);
  })();

  /* ações: links externos, botões de download (artefato/repo) + selo
     confidencial (o dossiê fica retido). Terceiro elemento da ação = tipo:
     "baixar" força o download do arquivo em tamanho total em vez de abrir. */
  const funcs = (e.acoes || []).filter(([, u]) => u.startsWith("http"))
    .map(([t, u]) => `<a class="btn btn-neon" href="${u}" target="_blank" rel="noopener">${t}</a>`).join("");
  const baixaveis = (e.acoes || []).filter(([, , f]) => f === "baixar")
    .map(([t, u]) => `<a class="btn btn-ghost" href="${u}" download>${t}</a>`).join("");
  set("e-acoes", funcs + baixaveis +
    `<button class="btn-confidencial" id="btn-confidencial" type="button"
             aria-haspopup="dialog" aria-expanded="false">
       📄 Ver dossiê
     </button>`);
  /* a folha A4 branca com o carimbo de ✕ CONFIDENCIAL e a data de liberação.
     um botão só pra todo estúdio — o dado é o que já está na tela. */
  const bc = document.getElementById("btn-confidencial");
  if (bc) bc.addEventListener("click", () => {
    if (typeof window.abrir_folha_A4 !== "function") {
      bc.classList.toggle("aberto");
      bc.setAttribute("aria-expanded", String(bc.classList.contains("aberto")));
      return;                                    // módulo ausente: botão não mente
    }
    window.abrir_folha_A4(e, bc);
    bc.setAttribute("aria-expanded", "true");
  });

  /* dossiê correspondente — arquivo vira index (dossiês retidos) */
  const voltar = document.getElementById("hud-voltar");
  if (voltar) voltar.href = "index.html";

  /* claquete com take incremental por setor */
  const clap = document.getElementById("e-clap");
  if (clap) {
    const chave = "s51_take_" + id;
    const n = (parseInt(sessionStorage.getItem(chave) || "0", 10) % 9) + 1;
    sessionStorage.setItem(chave, n);
    clap.textContent = "🎬 TAKE " + n;
  }
}

/* ═══ TeraBrain — memória viva ═══
   Cérebro de pontos girando em canvas puro (sem libs/CDN), igual constelação:
   ~450 neurônios distribuídos em 2 hemisférios + sinapses + poeira de fundo.
   Arraste gira; chips filtram grupos; reduced-motion desenha 1 quadro só. */
const TB = {
  titulo: 'A memória que <em>responde</em>.',
  lede: 'Tudo que a operação aprende mora aqui — gnóstica, hermética, cosmologia, \noperações — indexado por significado em ChromaDB e servido por MCP pra qualquer \nIA da casa consultar antes de escrever. Este mapa é a memória viva do setor.',
  bullets: [
    'Memória permanente — nada se apaga num reset',
    'Busca por significado, não só pela palavra exata',
    'Mapa de sentidos girando — o que pertence junto, se vê',
    '~120 volumes hoje (meta: 500) — cada um citando a fonte',
    'Sem fonte citada, o parágrafo é refeito — regra da casa',
    'Arraste o cérebro — isto é uma simulação viva',
  ],
  grupos: [
    { id: 'gnostica',  nome: 'Gnóstica',   cor: '#ffb420' },
    { id: 'hermetica', nome: 'Hermética',  cor: '#57ff9e' },
    { id: 'cosmos',    nome: 'Cosmologia', cor: '#4fc9ff' },
    { id: 'operacao',  nome: 'Operações',  cor: '#ff4fd8' },
    { id: 'veiculos',  nome: 'Veículos',   cor: '#b48cff' },
  ],
  acoes: [
    ['⟵ voltar ao arquivo', 'index.html'],
  ],
  links: [
    'Como a busca semântica encontra por sentido, em 5 passos',
    'Parte 1 — por que memória de IA não é pasta de arquivos',
    'Parte 2 — quando a memória cresce, entra o vetor',
    'Parte 3 — quem consulta a memória antes de escrever',
  ],
};

function monta_memoria_terabrain() {
  const sec = document.getElementById('tb-memoria');
  if (!sec) return;
  document.getElementById('tb-h2').innerHTML = TB.titulo;
  document.getElementById('tb-lede').textContent = TB.lede;
  document.getElementById('tb-lista').innerHTML = TB.bullets.map(b => `<li>${b}</li>`).join('');
  document.getElementById('tb-acoes').innerHTML = TB.acoes.map(([t, u]) =>
    `<a class="btn ${u.startsWith('http') ? 'btn-neon' : 'btn-ghost'}" href="${u}">${t}</a>`).join('');
  document.getElementById('tb-links').innerHTML = TB.links.map(t =>
    `<span class="tb-link" title="em breve no canal">▸ ${t} <b style="color:var(--texto-2)">›</b></span>`).join('');
  document.getElementById('tb-chips').innerHTML = TB.grupos.map(g =>
    `<button class="tb-chip" data-g="${g.id}" style="--c:${g.cor}" aria-pressed="true">` +
    `<span class="cor" aria-hidden="true"></span>${g.nome}</button>`).join('');
}

function cerebro_terabrain() {
  const cv = document.getElementById('tb-brain');
  if (!cv || cv.dataset.ok) return;
  cv.dataset.ok = '1';
  const ctx = cv.getContext('2d');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── geometria: córtex procedural ──────────────────────────────────────────
     O ponto nasce numa esfera espalhada em ângulo áureo; o raio é ondulado por
     ruído 3D (giros) mais uma crista 1-|ruído| (sulcos). Junto com cada ponto
     vai a NORMAL -- é ela que faz a borda acender no fresnel do render, do jeito
     que o brain deles faz no shader. Os números ficam juntos porque foi mexendo
     neles que a forma parou de ser balão e ganhou silhueta. */
  const AR = (Math.sqrt(5) - 1) / 2;                 // ângulo áureo
  const CEREBRO = {
    esc: { x: .92, y: .46, z: 1.02 },   // largo, baixo, comprido pra trás
    piso: .26,                         // base chata: cérebro não termina em bola
    cava: .26, cava_w: .135,             // fissura: vinco, não abismo (o .34/.10
                                         //   do rascunho abriu duas bolas tipo coração)
    amp: .09, sulco_a: 1.15,             // altura dos giros / peso dos sulcos
    ambar: .62,                          // o quanto a cor do lobo puxa pro âmbar
    n: 900                               // densidade pra dobra aparecer
  };
  function hash3(i, j, k) {
    let n = (i | 0) * 374761393 + (j | 0) * 668265263 + (k | 0) * 1442695040;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967295;
  }
  const alisa = t => t * t * (3 - 2 * t);            // Interpolant, sem degraus
  function ruido3(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const xf = alisa(x - xi), yf = alisa(y - yi), zf = alisa(z - zi);
    let s = 0;
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) {
      const p = (a ? xf : 1 - xf) * (b ? yf : 1 - yf) * (c ? zf : 1 - zf);
      if (p) s += p * hash3(xi + a, yi + b, zi + c);
    }
    return s * 2 - 1;
  }
  function fbm(x, y, z, oitavas) {
    let amp = 1, freq = 1, soma = 0, norm = 0;
    for (let o = 0; o < oitavas; o++) {
      soma += amp * ruido3(x * freq, y * freq, z * freq);
      norm += amp; amp *= .5; freq *= 2.05;
    }
    return soma / norm;
  }
  /* Uma casca. +y é PRA BAIXO no canvas: o topo do cérebro é y negativo (a cava
     desce) e a base chata é o y grande. rotulo recebe as coordenadas da forma. */
  function casca(n, esc, centro, semente, amp, sulco_f, sulco_a, cava, cava_w, rotulo) {
    for (let i = 0; i < n; i++) {
      const y0 = 1 - (i / (n - 1)) * 2;
      const r0 = Math.sqrt(Math.max(0, 1 - y0 * y0));
      const th = 2 * Math.PI * i * AR;
      const dx = Math.cos(th) * r0, dy = y0, dz = Math.sin(th) * r0;
      const giros = fbm(dx * 3.2 + semente, dy * 3.2, dz * 3.2, 4);
      const sulcos = 1 - Math.abs(fbm(dx * sulco_f, dy * sulco_f - semente, dz * sulco_f, 3));
      const r = 1 + amp * giros + amp * sulco_a * (sulcos - .58);
      let x = dx * esc.x * r, y = dy * esc.y * r, z = dz * esc.z * r;
      const zn = z / esc.z;                            // -1 nuca .. 1 testa
      x *= 1 - .18 * Math.max(0, zn);                  // testa mais estreita
      y *= 1 - .14 * Math.max(0, zn);                  // ... e mais baixa
      if (cava > 0) {                                  // racha entre os hemisférios
        const f = Math.exp(-(x / cava_w) * (x / cava_w));
        y += f * cava * Math.max(0, -y / esc.y);
        z += f * cava * .3 * Math.sign(z) * Math.max(0, Math.abs(zn) - .3);
      }
      if (centro.piso < 9 && y > centro.piso) y = centro.piso + (y - centro.piso) * .18;
      const comp = Math.hypot(x, y, z) || 1;           // normal ~ direção do ponto
      nos.push({                                       //   vista do centro da casca
        x: x + centro.x, y: y + centro.y, z: z + centro.z, g: rotulo(x, y, z, zn),
        nx: x / comp, ny: y / comp, nz: z / comp,
        r: .85 + Math.random() * 1.15, tw: Math.random() * Math.PI * 2
      });
    }
  }
  const GRUPOS = TB.grupos;
  const nos = [];
  /* lobos: o chip deixa de ser confete e passa a filtrar anatomia */
  const lobo = (x, y, z, zn) =>
    zn > .34 ? 'operacao' : y < -.16 ? 'cosmos' : y > .16 ? 'gnostica'
             : zn < -.30 ? 'hermetica' : 'gnostica';
  const C = CEREBRO;
  casca(C.n, C.esc, { x: 0, y: -.04, z: 0, piso: C.piso }, 7.3, C.amp, C.sulco_f,
        C.sulco_a, C.cava, C.cava_w, lobo);
  /* cerebelo: ATRÁS e embaixo, colado na nuca -- centrado embaixo ele vira um
     segundo andar de bolo, que é o que a v3 tinha ficado */
  casca(170, { x: .40, y: .14, z: .28 }, { x: 0, y: .50, z: -1.02, piso: 9 }, 3.1,
        .04, 12.5, 1.4, .10, .08, () => 'veiculos');
  for (let i = 0; i < 18; i++) {                       // tronco: coluna que desce
    const t = i / 17, raio = .055 - .028 * t;          //  reta -- a hélice do rascunho
    nos.push({                                         //  o fazia virar minhoca
      x: .02 * Math.sin(t * 2.2) + Math.cos(i * 2.4) * raio * .5,
      y: .46 + t * .30, z: -.62 + .10 * t + raio * Math.cos(t * 3.1), g: 'veiculos',
      nx: 0, ny: .35, nz: -.94,
      r: .7 + Math.random() * .7, tw: Math.random() * Math.PI * 2
    });
  }
  /* sinapses: vizinhos de casca. Subamostra + índice guardado junto do ponto --
     indexOf dentro do laço duplo daria milhões de operações só pra montar. */
  const arestas = [];
  const sin = nos.map((n, i) => ({ n, i })).filter((_, i) => i % 4 === 0);
  for (let a = 0; a < sin.length; a++) for (let b = a + 1; b < sin.length; b++) {
    const dx = sin[a].n.x - sin[b].n.x, dy = sin[a].n.y - sin[b].n.y, dz = sin[a].n.z - sin[b].n.z;
    if (dx * dx + dy * dy + dz * dz < .0038 && arestas.length < 1400) arestas.push([sin[a].i, sin[b].i]);
  }
  /* o miolo: a luz por dentro. Um radial âmbar atrás dos pontos -- com a
     composição aditiva embaixo é isso que faz o objeto parecer translúcido. */
  const NUCLEO = { x: 0, y: .02, z: 0 };
  /* halo em sprite, a ideia do glowSprite deles: um radial de 64px POR COR em
     cache, desenhado com drawImage. Mais macio que shadowBlur e muito mais
     barato -- shadowBlur sai do laço de desenho e o quadro cai de custo. */
  const SPRITES = new Map();
  function sprite(cor) {
    let s = SPRITES.get(cor);
    if (s) return s;
    s = document.createElement('canvas'); s.width = s.height = 64;
    const g = s.getContext('2d');
    const r = parseInt(cor.slice(1, 3), 16), j = parseInt(cor.slice(3, 5), 16), a = parseInt(cor.slice(5, 7), 16);
    const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rad.addColorStop(0, `rgba(255,255,255,.95)`);
    rad.addColorStop(.16, `rgba(${r},${j},${a},.9)`);
    rad.addColorStop(.42, `rgba(${r},${j},${a},.32)`);
    rad.addColorStop(1, `rgba(${r},${j},${a},0)`);
    g.fillStyle = rad; g.fillRect(0, 0, 64, 64);
    SPRITES.set(cor, s);
    return s;
  }
  const BRUNA = '#ff7220';        // vec3(1.0,.45,.12) do fresnel deles -> 255,114,30
  /* as 5 cores são dado da casa (os chips filtram por elas), mas o print é âmbar:
     misturo CEREBRO.ambar do laranja em cada cor. O grupo continua se distinguindo
     -- o conjunto passa a ler como UM objeto iluminado, não como confete. É knob:
     zerar a mistura devolve as cores puras. */
  const hex2rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const COR = {};
  { const b = hex2rgb(BRUNA);
    GRUPOS.forEach(g => { const a = hex2rgb(g.cor), m = CEREBRO.ambar;
      COR[g.id] = '#' + a.map((v, i) => Math.round(v * (1 - m) + b[i] * m)
        .toString(16).padStart(2, '0')).join(''); }); }
  sprite(BRUNA);
  /* poeira de fundo */
  const poeira = Array.from({ length: 130 }, () => ({
    x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1, r: Math.random() * 1.1 + .3
  }));

  const corDe = g => (GRUPOS.find(x => x.id === g) || { cor: '#ffb420' }).cor;
  const ativos = new Set(GRUPOS.map(g => g.id));

  let rotY = 0, rotX = -.18, alvoY = 0, alvoX = -.18, velY = RM ? 0 : .0016;
  let arrastando = false, px = 0, py = 0;

  function dimensiona() {
    const r = cv.getBoundingClientRect();
    cv.width = Math.round(r.width * devicePixelRatio);
    cv.height = Math.round(r.height * devicePixelRatio);
  }
  dimensiona();
  addEventListener('resize', dimensiona);

  cv.addEventListener('pointerdown', e => {
    arrastando = true; px = e.clientX; py = e.clientY;
    try { cv.setPointerCapture(e.pointerId); } catch { /* sintético/sem captura */ }
  });
  addEventListener('pointermove', e => {
    if (!arrastando) return;
    alvoY += (e.clientX - px) * .005;
    alvoX += (e.clientY - py) * .004;
    alvoX = Math.max(-1.1, Math.min(1.1, alvoX));
    px = e.clientX; py = e.clientY;
    quadro(performance.now());   /* redesenha no próprio arrasto: responsivo mesmo com timer estrangulado */
  });
  addEventListener('pointerup', () => { arrastando = false; });
  addEventListener('pointercancel', () => { arrastando = false; });

  document.getElementById('tb-chips').addEventListener('click', e => {
    const chip = e.target.closest('.tb-chip');
    if (!chip) return;
    const g = chip.dataset.g;
    if (ativos.has(g) && ativos.size > 1) { ativos.delete(g); chip.classList.add('off'); chip.setAttribute('aria-pressed', 'false'); }
    else { ativos.add(g); chip.classList.remove('off'); chip.setAttribute('aria-pressed', 'true'); }
  });

  function quadro(ts) {
    const W = cv.width, H = cv.height, S = Math.min(W, H) * .95;
    ctx.clearRect(0, 0, W, H);
    rotY += (alvoY - rotY) * .07 + (!arrastando ? velY : 0);
    rotX += (alvoX - rotX) * .07;
    const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
    const proj = p => {
      let x = p.x * cy + p.z * sy, z1 = -p.x * sy + p.z * cy;
      let y = p.y * cx - z1 * sx; z1 = p.y * sx + z1 * cx;
      const esc = 1 / (1 + (z1 + 1.1) * .18);
      return { X: W / 2 + x * S * .5 * esc, Y: H / 2 + y * S * .5 * esc, E: esc, Z: z1 };
    };
    /* poeira: gira no SENTIDO CONTRÁRIO do cérebro, como a casca de pontos do
       brain deles -- é a paralaxe que separa o objeto do fundo */
    ctx.globalCompositeOperation = 'source-over';
    const dv = -rotY * .55, cdv = Math.cos(dv), sdv = Math.sin(dv);
    for (const p of poeira) {
      const q = proj({ x: p.x * cdv - p.z * sdv, y: p.y, z: p.x * sdv + p.z * cdv });
      ctx.globalAlpha = .13 + Math.max(0, (q.Z + 1)) * .09;
      ctx.fillStyle = '#9db8d2';
      ctx.fillRect(q.X, q.Y, p.r * devicePixelRatio, p.r * devicePixelRatio);
    }
    /* aditivo daqui pra frente: onde a casca curva se acumula na tela a luz
       soma e vira âmbar -- o holograma de vidro que eles têm no material
       (opacity .3 + AdditiveBlending + depthWrite:false) */
    ctx.globalCompositeOperation = 'lighter';
    {
      const q = proj(NUCLEO);
      const R = Math.min(W, H) * .42 * q.E;
      const g = ctx.createRadialGradient(q.X, q.Y, 0, q.X, q.Y, R);
      g.addColorStop(0, 'rgba(255,120,20,.30)');
      g.addColorStop(.55, 'rgba(255,90,16,.12)');
      g.addColorStop(1, 'rgba(255,80,0,0)');
      ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }
    /* sinapses */
    ctx.lineWidth = devicePixelRatio * .6;
    for (const [a, b] of arestas) {
      const A = nos[a], B = nos[b];
      if (!ativos.has(A.g) || !ativos.has(B.g)) continue;
      const qa = proj(A), qb = proj(B);
      ctx.globalAlpha = .05 + Math.max(0, (qa.E + qb.E) / 2 - .75) * .5;
      ctx.strokeStyle = corDe(A.g);
      ctx.beginPath(); ctx.moveTo(qa.X, qa.Y); ctx.lineTo(qb.X, qb.Y); ctx.stroke();
    }
    /* neurônios (de trás pra frente) */
    const ordem = nos.map((n, i) => ({ n, q: proj(n), i })).sort((a, b) => a.q.Z - b.q.Z);
    for (const { n, q } of ordem) {
      if (!ativos.has(n.g)) continue;
      const puls = .72 + Math.sin(ts * .0011 + n.tw) * .28;
      /* fresnel: giro a normal pela MESMA matriz da câmera e olho o quanto ela
         aponta pra mim. Aponta -> é frente, fica translúcida. Foge -> é borda,
         acende em laranja. É uma linha de matemática pelo efeito inteiro do print. */
      let nx = n.nx * cy + n.nz * sy, nz = -n.nx * sy + n.nz * cy;
      const ny = n.ny * cx - nz * sx; nz = n.ny * sx + nz * cx;
      const fres = Math.pow(1 - Math.min(1, Math.abs(nz)), 2.2);
      const base = Math.min(1, .3 + (q.E - .8) * 1.6) * (RM ? 1 : (.55 + puls * .45));
      const raio = n.r * devicePixelRatio * q.E * (RM ? 1 : puls) * 3.0;
      ctx.globalAlpha = base * (.06 + fres * .50);          // a borda acesa
      ctx.drawImage(sprite(BRUNA), q.X - raio * 1.8, q.Y - raio * 1.8, raio * 3.6, raio * 3.6);
      ctx.globalAlpha = base * .48;                         // halo da cor do lobo
      ctx.drawImage(sprite(corDe(n.g)), q.X - raio, q.Y - raio, raio * 2, raio * 2);
      ctx.globalAlpha = Math.min(1, base * 1.45);           // o núcleo do ponto
      ctx.fillStyle = corDe(n.g);
      ctx.beginPath(); ctx.arc(q.X, q.Y, n.r * devicePixelRatio * q.E * .8, 0, 7); ctx.fill();

    }
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
  /* driver por setInterval (e não rAF): dispara até em webview não-composto;
     33ms ≈ 30fps, custo ok num canvas pequeno. Pausa com aba oculta. */
  let timer = 0, ultimo_ts = 0;
  const quadro_carimba = ts => { ultimo_ts = ts; quadro(ts); };
  /* loop por setTimeout RECURSIVO (não setInterval): em alguns webviews o
     interval congela mas o timeout não — e fora daí é o mesmo custo. */
  const tique = () => {
    if (RM || document.hidden) { timer = 0; return; }
    quadro_carimba(performance.now());
    timer = setTimeout(tique, 33);
  };
  const inicia = () => { if (!timer) timer = setTimeout(tique, 33); };
  const para = () => { clearTimeout(timer); timer = 0; };
  quadro_carimba(performance.now());   /* 1º quadro síncrono: garante pintura */
  inicia();
  /* heartbeat de segurança: se o timer for estrangulado (webview congelado,
     aba esquecida), este garante ≥2fps; arrasto redesenha na hora. */
  if (!RM) setInterval(() => { if (performance.now() - ultimo_ts > 350) quadro_carimba(performance.now()); }, 420);
  document.addEventListener('visibilitychange', () => { if (RM) return; document.hidden ? para() : inicia(); });
  cv.__redesenha = () => quadro_carimba(performance.now());   /* gancho de teste/robustez */
}  /* boot: na sala terabrain a memória viva é a sala — a ficha completa mora
     no dossiê (botão 📄 Ver dossiê). Na 1ª visita a página desce guiada até a
     memória; nas outras, abre normal no topo. Botões antigos (Ver o dossiê do
     setor / voltar ao arquivo) saíram — dono 01/10/2026. */
render_estudio(new URLSearchParams(location.search).get("s") || "bbs");
if (new URLSearchParams(location.search).get("s") === "terabrain") {
  monta_memoria_terabrain();
  document.getElementById('tb-memoria').hidden = false;
  cerebro_terabrain();
  try {
    if (!sessionStorage.getItem('s51_tb_tour_visto')) {
      sessionStorage.setItem('s51_tb_tour_visto', '1');
      const mem = document.getElementById('tb-memoria');
      if (mem) requestAnimationFrame(() => mem.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  } catch (err) { /* sessionStorage pode faltar — sala normal */ }
}
