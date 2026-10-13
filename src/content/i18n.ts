export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

export type SignalKey = "strong" | "neutral" | "weak";

const en = {
  meta: {
    title: "EngSchelle — Fundamentals-based B3 signals, auditable to the number",
    description:
      "A rule-based classifier for Brazilian (B3) stocks. Real fundamentals from Fundamentus scored across four pillars into three discrete signals — Strong, Neutral, Weak — on a local pipeline that mirrors an AWS data stack, with LLM news screening that can only add caution.",
  },
  nav: {
    how: "How it works",
    demo: "Demo",
    tech: "Technology",
    roadmap: "Roadmap",
    team: "Team",
    contact: "Contact",
  },
  signals: {
    strong: "Strong",
    neutral: "Neutral",
    weak: "Weak",
  } satisfies Record<SignalKey, string>,
  hero: {
    eyebrow: "Fundamentals classification · B3 equities",
    title: "Signals you can audit down to the line item.",
    subtitle:
      "We pull real fundamentals for Brazilian stocks and score them with transparent rules across four pillars — valuation, profitability, solidity and dividends — into a 0–100 score and one of three signals. Every number traces back to its source. An LLM reads the news, but only to add caution.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "See how it works",
    poweredBy: "Open data from Fundamentus & brapi · news screening by Claude (Anthropic)",
  },
  problem: {
    title: "The problem: asset ratings you can't check",
    intro:
      "Most tools hand you a star rating or an AI-written essay with no way to see why — and often on data you can't verify. A confident output built on bad inputs is still wrong.",
    points: [
      {
        title: "Opaque scores",
        body: "A letter or a number with no breakdown. You can't tell whether a stock rates well on price, on profitability or on its balance sheet.",
      },
      {
        title: "Unverifiable data",
        body: "If the inputs are estimated, stale or synthetic, the rating looks authoritative and is still built on sand. The source has to be checkable.",
      },
      {
        title: "Hard to compare",
        body: "Free-form AI reports vary from run to run. Portfolios, filters and alerts need a consistent, structured output you can rank and monitor.",
      },
    ],
  },
  how: {
    title: "How it works",
    intro:
      "No text generation in the scoring path. Real fundamentals go in, deterministic rules decide, and every output points back to the indicator it came from.",
    steps: [
      {
        title: "Real fundamentals",
        body: "The full indicator table from Fundamentus — price multiples, margins, ROE/ROIC, leverage — plus sector and a 3-month price series from brapi.",
      },
      {
        title: "Four-pillar score",
        body: "Transparent rules grade Valuation, Profitability, Solidity and Dividends against sector peers, into a 0–100 score and an A–E grade.",
      },
      {
        title: "News screening",
        body: "Claude Opus classifies recent headlines per ticker. A material, negative event can lower a signal one step — it can only add caution, never upgrade.",
      },
      {
        title: "Discrete signal",
        body: "Strong, Neutral or Weak — consistent, auditable to the line item, and easy to feed into dashboards, filters and alerts.",
      },
    ],
  },
  demo: {
    title: "Signal demo",
    intro: "A snapshot from a recent run on public data.",
    columns: { asset: "Asset", grade: "Grade", score: "Score", signal: "Signal" },
    note: "Sample snapshot on public data — not a real-time output and not investment advice. “Weak” is a reading of the fundamentals, not a sell order.",
  },
  tokens: {
    title: "The score costs no LLM tokens",
    intro:
      "The rating itself is pure rules — it generates nothing. An LLM is used only to screen news, once per run for the whole universe, not once per asset.",
    llm: "LLM report, per asset",
    system: "This system (rules + shared news pass)",
    unit: "tokens",
    footnote:
      "Illustrative: a per-asset LLM report runs ~4,500 prompt + ~1,500 generated tokens. The rule-based score generates none; Claude screens the news once per run (≈ US$1 for the entire universe), so the token cost per asset is a small shared fraction.",
  },
  tech: {
    title: "Technology",
    intro:
      "A local stack that mirrors a real AWS data platform — the same shapes you would deploy on S3, Glue, Athena and managed Airflow, running end-to-end on one machine.",
    items: [
      {
        title: "Apache Airflow",
        body: "Orchestrates the daily pipeline: collect, process, score and publish, with every task observable.",
      },
      {
        title: "Spark + Trino",
        body: "PySpark builds the bronze/silver/gold layers as partitioned Parquet; Trino queries them like a warehouse.",
      },
      {
        title: "MinIO + Hive Metastore",
        body: "S3-compatible object storage and a Hive catalog — an AWS data lake reproduced locally.",
      },
      {
        title: "Claude Opus (Anthropic)",
        body: "Classifies news headlines with structured output. Used sparingly, and only to flag risk.",
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    items: [
      { phase: "Now", title: "Real data & model", body: "Synthetic data replaced by real Fundamentus fundamentals; four-pillar score, Strong/Neutral/Weak signal and LLM news screening, all running on the local pipeline." },
      { phase: "Next", title: "FIIs & fixed income", body: "Extend coverage beyond B3 equities to real-estate funds (FIIs), government bonds and funds." },
      { phase: "Later", title: "Cloud deployment", body: "Lift the local stack onto managed AWS — S3, Glue, Athena and managed Airflow — for scheduled daily re-scoring." },
      { phase: "Later", title: "API & dashboard", body: "Public API and a hosted web dashboard for signals, grades, pillar breakdowns and history." },
    ],
  },
  team: {
    title: "Team",
    intro: "Built by an engineer focused on transparent, data-engineering-driven investment tooling.",
  },
  contact: {
    title: "Contact",
    intro: "Interested in the project, a partnership or early access? Send us a message.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
    sending: "Sending…",
    success: "Thanks! Your message has been sent.",
    error: "Something went wrong. Please try again or email us directly.",
  },
  footer: {
    disclaimer:
      "The information on this website is for informational purposes only and does not constitute an investment recommendation, offer or solicitation (CVM Resolution 20/2021). Past performance does not guarantee future results.",
    attribution:
      "Fundamentals come from Fundamentus and brapi; news screening uses Claude (Anthropic). These are third-party sources, not affiliated with us.",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;

const pt: Dictionary = {
  meta: {
    title: "EngSchelle — Sinais da B3 por fundamentos, auditáveis até o número",
    description:
      "Um classificador por regras para ações da B3. Fundamentos reais do Fundamentus pontuados em quatro pilares e resumidos em três sinais discretos — Forte, Neutro, Fraco — sobre um pipeline local que simula uma stack de dados AWS, com triagem de notícias por LLM que só adiciona cautela.",
  },
  nav: {
    how: "Como funciona",
    demo: "Demo",
    tech: "Tecnologia",
    roadmap: "Roadmap",
    team: "Equipe",
    contact: "Contato",
  },
  signals: {
    strong: "Forte",
    neutral: "Neutro",
    weak: "Fraco",
  },
  hero: {
    eyebrow: "Classificação por fundamentos · ações da B3",
    title: "Sinais que você audita até o número.",
    subtitle:
      "Coletamos fundamentos reais de ações brasileiras e os pontuamos com regras transparentes em quatro pilares — valuation, rentabilidade, solidez e dividendos — num score de 0 a 100 e um de três sinais. Cada número volta à sua origem. Um LLM lê as notícias, mas só para adicionar cautela.",
    ctaPrimary: "Fale conosco",
    ctaSecondary: "Veja como funciona",
    poweredBy: "Dados abertos do Fundamentus e brapi · triagem de notícias pela Claude (Anthropic)",
  },
  problem: {
    title: "O problema: notas de ativos que você não consegue conferir",
    intro:
      "A maioria das ferramentas entrega uma nota em estrelas ou um texto escrito por IA, sem como ver o porquê — e muitas vezes sobre dados que você não consegue verificar. Uma saída confiante sobre dados ruins continua errada.",
    points: [
      {
        title: "Notas opacas",
        body: "Uma letra ou um número sem abertura. Você não sabe se a ação vai bem em preço, em rentabilidade ou no balanço.",
      },
      {
        title: "Dados não verificáveis",
        body: "Se os insumos são estimados, defasados ou sintéticos, a nota parece confiável e ainda assim é construída sobre areia. A fonte precisa ser conferível.",
      },
      {
        title: "Difícil de comparar",
        body: "Relatórios de IA em texto livre variam entre execuções. Carteiras, filtros e alertas precisam de uma saída estruturada e consistente, que dê para ranquear e monitorar.",
      },
    ],
  },
  how: {
    title: "Como funciona",
    intro:
      "Nenhuma geração de texto no caminho da pontuação. Entram fundamentos reais, regras determinísticas decidem, e cada saída aponta de volta para o indicador de origem.",
    steps: [
      {
        title: "Fundamentos reais",
        body: "A tabela completa de indicadores do Fundamentus — múltiplos de preço, margens, ROE/ROIC, endividamento — mais o setor e uma série de 3 meses da brapi.",
      },
      {
        title: "Score em quatro pilares",
        body: "Regras transparentes avaliam Valuation, Rentabilidade, Solidez e Dividendos contra os pares do setor, num score de 0 a 100 e nota de A a E.",
      },
      {
        title: "Triagem de notícias",
        body: "A Claude Opus classifica as manchetes recentes de cada ativo. Um evento material e negativo pode rebaixar o sinal um degrau — só adiciona cautela, nunca promove.",
      },
      {
        title: "Sinal discreto",
        body: "Forte, Neutro ou Fraco — consistente, auditável até o indicador, e fácil de integrar a painéis, filtros e alertas.",
      },
    ],
  },
  demo: {
    title: "Demonstração de sinais",
    intro: "Um retrato de uma execução recente sobre dados públicos.",
    columns: { asset: "Ativo", grade: "Nota", score: "Score", signal: "Sinal" },
    note: "Retrato sobre dados públicos — não é saída em tempo real nem recomendação de investimento. “Fraco” é uma leitura dos fundamentos, não uma ordem de venda.",
  },
  tokens: {
    title: "O score não gasta tokens de LLM",
    intro:
      "A nota em si é pura regra — não gera nada. Um LLM é usado só para triar notícias, uma vez por execução para todo o universo, não uma vez por ativo.",
    llm: "Relatório de LLM, por ativo",
    system: "Este sistema (regras + uma passada de notícias)",
    unit: "tokens",
    footnote:
      "Estimativa ilustrativa: um relatório de LLM por ativo gasta ~4.500 tokens de prompt + ~1.500 gerados. O score por regras não gera nenhum; a Claude tria as notícias uma vez por execução (≈ US$ 1 para o universo inteiro), então o custo em tokens por ativo é uma pequena fração compartilhada.",
  },
  tech: {
    title: "Tecnologia",
    intro:
      "Uma stack local que simula uma plataforma de dados AWS real — os mesmos formatos que você implantaria em S3, Glue, Athena e Airflow gerenciado, rodando de ponta a ponta numa máquina.",
    items: [
      {
        title: "Apache Airflow",
        body: "Orquestra o pipeline diário: coletar, processar, pontuar e publicar, com cada task observável.",
      },
      {
        title: "Spark + Trino",
        body: "O PySpark monta as camadas bronze/silver/gold em Parquet particionado; o Trino as consulta como um data warehouse.",
      },
      {
        title: "MinIO + Hive Metastore",
        body: "Armazenamento de objetos compatível com S3 e um catálogo Hive — um data lake AWS reproduzido localmente.",
      },
      {
        title: "Claude Opus (Anthropic)",
        body: "Classifica manchetes com saída estruturada. Usada com parcimônia, e só para sinalizar risco.",
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    items: [
      { phase: "Agora", title: "Dados reais e modelo", body: "Dado sintético substituído por fundamentos reais do Fundamentus; score em quatro pilares, sinal Forte/Neutro/Fraco e triagem de notícias por LLM, tudo rodando no pipeline local." },
      { phase: "A seguir", title: "FIIs e renda fixa", body: "Expandir a cobertura para além das ações da B3: fundos imobiliários (FIIs), títulos públicos e fundos." },
      { phase: "Depois", title: "Deploy em nuvem", body: "Levar a stack local para a AWS gerenciada — S3, Glue, Athena e Airflow gerenciado — com reclassificação diária agendada." },
      { phase: "Depois", title: "API e painel", body: "API pública e painel web hospedado com sinais, notas, abertura por pilar e histórico." },
    ],
  },
  team: {
    title: "Equipe",
    intro: "Desenvolvido por um engenheiro focado em ferramentas de investimento transparentes e orientadas a engenharia de dados.",
  },
  contact: {
    title: "Contato",
    intro: "Tem interesse no projeto, em uma parceria ou em acesso antecipado? Envie uma mensagem.",
    name: "Nome",
    email: "Email",
    message: "Mensagem",
    submit: "Enviar mensagem",
    sending: "Enviando…",
    success: "Obrigado! Sua mensagem foi enviada.",
    error: "Algo deu errado. Tente novamente ou envie um email diretamente.",
  },
  footer: {
    disclaimer:
      "As informações deste site têm caráter exclusivamente informativo e não constituem recomendação, oferta ou solicitação de investimento (Resolução CVM 20/2021). Rentabilidade passada não é garantia de rentabilidade futura.",
    attribution:
      "Os fundamentos vêm do Fundamentus e da brapi; a triagem de notícias usa a Claude (Anthropic). São fontes de terceiros, sem vínculo conosco.",
    rights: "Todos os direitos reservados.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };
