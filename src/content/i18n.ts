export type Locale = "en" | "pt";

export const locales: Locale[] = ["en", "pt"];

export type SignalKey = "strongBuy" | "buy" | "hold" | "sell" | "strongSell";

const en = {
  meta: {
    title: "EngSchelle — Discrete asset signals at a fraction of the token cost",
    description:
      "An asset classifier for Brazilian equities, REITs (FIIs), fixed income and funds that outputs discrete signals — Strong Buy to Strong Sell — instead of long LLM-generated reports.",
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
    strongBuy: "Strong Buy",
    buy: "Buy",
    hold: "Hold",
    sell: "Sell",
    strongSell: "Strong Sell",
  } satisfies Record<SignalKey, string>,
  hero: {
    eyebrow: "Asset classification · B3 & fixed income",
    title: "Investment signals, not essays.",
    subtitle:
      "We classify Brazilian stocks, FIIs, fixed income and funds into five discrete signals using embeddings from the Jev model — cutting the tokens spent per decision by an order of magnitude compared with LLM-generated analysis.",
    ctaPrimary: "Get in touch",
    ctaSecondary: "See how it works",
    poweredBy: "Powered by Jev (TypeSafe AI)",
  },
  problem: {
    title: "The problem: LLM analysis is expensive to scale",
    intro:
      "Most AI investment tools ask a large language model to read market data and write an analysis. That works for one asset — but it doesn't scale to thousands of assets re-evaluated every day.",
    points: [
      {
        title: "Thousands of tokens per decision",
        body: "A single LLM analysis consumes prompt context plus hundreds of generated tokens, repeated for every asset and every update.",
      },
      {
        title: "Text is hard to act on",
        body: "Free-form reports need to be read, interpreted and compared. Portfolios and alerts need a consistent, machine-readable output.",
      },
      {
        title: "Inconsistent outputs",
        body: "Generated text varies between runs, which makes auditing, back-testing and monitoring difficult.",
      },
    ],
  },
  how: {
    title: "How it works",
    intro:
      "Instead of generating text, we turn market data into dense representations and let a lightweight classifier make the call.",
    steps: [
      {
        title: "Market data",
        body: "Prices, volumes, fundamentals, dividend history and fixed-income curves for B3 equities, FIIs, bonds and funds.",
      },
      {
        title: "Jev embeddings",
        body: "The Jev model (TypeSafe AI) encodes each asset's state into a compact vector — no text generation involved.",
      },
      {
        title: "Classifier",
        body: "A small, GPU-accelerated classification head maps each embedding to a signal with a confidence score.",
      },
      {
        title: "Discrete signal",
        body: "Strong Buy, Buy, Hold, Sell or Strong Sell — consistent, auditable and easy to feed into dashboards and alerts.",
      },
    ],
  },
  demo: {
    title: "Signal demo",
    intro: "A static preview of what the classifier output looks like.",
    columns: { asset: "Asset", type: "Class", signal: "Signal", confidence: "Confidence" },
    types: { stock: "Stock", fii: "FII", fixed: "Fixed income", fund: "Fund" },
    note: "Illustrative sample data only. This is not a real-time output and does not constitute investment advice.",
  },
  tokens: {
    title: "Tokens per decision",
    intro:
      "Estimated tokens consumed to produce one decision for one asset. Illustrative figures based on typical prompt and output sizes.",
    llm: "LLM text analysis",
    jev: "Jev embedding + classifier",
    unit: "tokens",
    footnote:
      "Illustrative estimate: ~4,500 prompt tokens + ~1,500 generated tokens for an LLM report vs. ~500 input tokens and zero generated tokens for an embedding-based signal.",
  },
  tech: {
    title: "Technology",
    intro:
      "Designed from day one for high-throughput GPU inference, so the whole B3 universe can be re-scored in minutes.",
    items: [
      {
        title: "NVIDIA CUDA",
        body: "Batched embedding and classification on NVIDIA GPUs.",
      },
      {
        title: "TensorRT",
        body: "Optimized, low-latency inference for the classification head.",
      },
      {
        title: "Triton Inference Server",
        body: "Scalable model serving with dynamic batching.",
      },
      {
        title: "Jev (TypeSafe AI)",
        body: "Third-party foundation model used to produce asset embeddings.",
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    items: [
      { phase: "Phase 1", title: "Prototype", body: "Data pipeline for B3 equities and FIIs; first classifier trained and back-tested." },
      { phase: "Phase 2", title: "Fixed income & funds", body: "Extend coverage to government bonds, private credit and investment funds." },
      { phase: "Phase 3", title: "GPU inference at scale", body: "TensorRT/Triton deployment with daily re-scoring of the full asset universe." },
      { phase: "Phase 4", title: "API & dashboard", body: "Public API and web dashboard for signals, confidence and history." },
    ],
  },
  team: {
    title: "Team",
    intro: "Built by an engineer focused on efficient machine learning for financial data.",
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
    jev: "Jev is a model developed by TypeSafe AI, a third party not affiliated with us.",
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;

const pt: Dictionary = {
  meta: {
    title: "EngSchelle — Sinais discretos de ativos com uma fração do custo em tokens",
    description:
      "Um classificador de ativos para ações da B3, FIIs, renda fixa e fundos que emite sinais discretos — de Compra Forte a Venda Forte — em vez de longos relatórios gerados por LLM.",
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
    strongBuy: "Compra Forte",
    buy: "Compra",
    hold: "Manter",
    sell: "Venda",
    strongSell: "Venda Forte",
  },
  hero: {
    eyebrow: "Classificação de ativos · B3 e renda fixa",
    title: "Sinais de investimento, não redações.",
    subtitle:
      "Classificamos ações, FIIs, renda fixa e fundos brasileiros em cinco sinais discretos usando embeddings do modelo Jev — reduzindo em uma ordem de grandeza os tokens gastos por decisão em comparação com análises geradas por LLM.",
    ctaPrimary: "Fale conosco",
    ctaSecondary: "Veja como funciona",
    poweredBy: "Powered by Jev (TypeSafe AI)",
  },
  problem: {
    title: "O problema: análise com LLM é cara para escalar",
    intro:
      "A maioria das ferramentas de IA para investimentos pede a um grande modelo de linguagem que leia dados de mercado e escreva uma análise. Funciona para um ativo — mas não escala para milhares de ativos reavaliados todos os dias.",
    points: [
      {
        title: "Milhares de tokens por decisão",
        body: "Uma única análise com LLM consome o contexto do prompt mais centenas de tokens gerados, repetidos para cada ativo e cada atualização.",
      },
      {
        title: "Texto é difícil de usar",
        body: "Relatórios em texto livre precisam ser lidos, interpretados e comparados. Carteiras e alertas precisam de uma saída consistente e legível por máquina.",
      },
      {
        title: "Saídas inconsistentes",
        body: "O texto gerado varia entre execuções, o que dificulta auditoria, back-testing e monitoramento.",
      },
    ],
  },
  how: {
    title: "Como funciona",
    intro:
      "Em vez de gerar texto, transformamos dados de mercado em representações densas e deixamos um classificador leve tomar a decisão.",
    steps: [
      {
        title: "Dados de mercado",
        body: "Preços, volumes, fundamentos, histórico de dividendos e curvas de renda fixa de ações da B3, FIIs, títulos e fundos.",
      },
      {
        title: "Embeddings Jev",
        body: "O modelo Jev (TypeSafe AI) codifica o estado de cada ativo em um vetor compacto — sem geração de texto.",
      },
      {
        title: "Classificador",
        body: "Uma camada de classificação pequena, acelerada por GPU, mapeia cada embedding para um sinal com grau de confiança.",
      },
      {
        title: "Sinal discreto",
        body: "Compra Forte, Compra, Manter, Venda ou Venda Forte — consistente, auditável e fácil de integrar a painéis e alertas.",
      },
    ],
  },
  demo: {
    title: "Demonstração de sinais",
    intro: "Uma prévia estática de como é a saída do classificador.",
    columns: { asset: "Ativo", type: "Classe", signal: "Sinal", confidence: "Confiança" },
    types: { stock: "Ação", fii: "FII", fixed: "Renda fixa", fund: "Fundo" },
    note: "Dados meramente ilustrativos. Não é uma saída em tempo real e não constitui recomendação de investimento.",
  },
  tokens: {
    title: "Tokens por decisão",
    intro:
      "Estimativa de tokens consumidos para produzir uma decisão para um ativo. Números ilustrativos baseados em tamanhos típicos de prompt e resposta.",
    llm: "Análise em texto por LLM",
    jev: "Embedding Jev + classificador",
    unit: "tokens",
    footnote:
      "Estimativa ilustrativa: ~4.500 tokens de prompt + ~1.500 tokens gerados para um relatório de LLM vs. ~500 tokens de entrada e zero tokens gerados para um sinal baseado em embeddings.",
  },
  tech: {
    title: "Tecnologia",
    intro:
      "Projetado desde o início para inferência em GPU de alto throughput, permitindo reclassificar todo o universo da B3 em minutos.",
    items: [
      {
        title: "NVIDIA CUDA",
        body: "Embeddings e classificação em lote em GPUs NVIDIA.",
      },
      {
        title: "TensorRT",
        body: "Inferência otimizada e de baixa latência para o classificador.",
      },
      {
        title: "Triton Inference Server",
        body: "Servir modelos de forma escalável com batching dinâmico.",
      },
      {
        title: "Jev (TypeSafe AI)",
        body: "Modelo fundacional de terceiros usado para gerar os embeddings dos ativos.",
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    items: [
      { phase: "Fase 1", title: "Protótipo", body: "Pipeline de dados para ações da B3 e FIIs; primeiro classificador treinado e validado com back-test." },
      { phase: "Fase 2", title: "Renda fixa e fundos", body: "Expandir a cobertura para títulos públicos, crédito privado e fundos de investimento." },
      { phase: "Fase 3", title: "Inferência em GPU em escala", body: "Deploy com TensorRT/Triton e reclassificação diária de todo o universo de ativos." },
      { phase: "Fase 4", title: "API e painel", body: "API pública e painel web com sinais, confiança e histórico." },
    ],
  },
  team: {
    title: "Equipe",
    intro: "Desenvolvido por um engenheiro focado em machine learning eficiente para dados financeiros.",
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
    jev: "Jev é um modelo desenvolvido pela TypeSafe AI, empresa terceira sem vínculo conosco.",
    rights: "Todos os direitos reservados.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, pt };
