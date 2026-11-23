export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  content: { heading?: string; paragraphs: string[]; bullets?: string[] }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-escolher-seguro-auto-sem-pagar-por-coberturas-desnecessarias',
    title: 'Como escolher o seguro auto sem pagar por coberturas desnecessárias',
    excerpt:
      'Entenda o que realmente influencia sua cotação e como equilibrar proteção, franquia e assistência.',
    category: 'Seguro Auto',
    date: '12 de março de 2026',
    readTime: '6 min de leitura',
    image: 'https://img.usecurling.com/p/1200/700?q=car%20road&color=blue&dpr=2',
    content: [
      {
        paragraphs: [
          'Contratar seguro auto não é escolher o menor número em uma tabela. Uma proposta barata pode deixar de fora proteções importantes; outra, mais completa, pode incluir serviços que você dificilmente usará. A melhor decisão nasce do equilíbrio entre seu perfil, a rotina do veículo e sua capacidade financeira diante de um imprevisto.',
        ],
      },
      {
        heading: 'Comece pelo seu uso real',
        paragraphs: [
          'Informe corretamente quem dirige, onde o carro pernoita, a quilometragem e o tipo de uso. Esses dados ajudam a seguradora a medir o risco e evitam problemas na análise de um sinistro. Quem circula todos os dias em vias movimentadas precisa de uma configuração diferente de quem usa o carro apenas aos fins de semana.',
        ],
      },
      {
        heading: 'Compare além do preço',
        paragraphs: [
          'Observe o limite para danos a terceiros, a abrangência da assistência 24 horas, o prazo do carro reserva e a franquia. Um limite baixo de responsabilidade civil pode ser insuficiente em um acidente grave. Já uma franquia maior reduz o prêmio, mas exige reserva para pequenos reparos.',
        ],
        bullets: [
          'Cobertura compreensiva para colisão, incêndio, roubo e furto',
          'Danos materiais, corporais e morais a terceiros',
          'Quilometragem do guincho e serviços de assistência',
          'Cobertura para vidros, faróis, retrovisores e acessórios',
        ],
      },
      {
        heading: 'Use a corretora a seu favor',
        paragraphs: [
          'Uma corretora independente consulta diferentes seguradoras e traduz as condições de cada proposta. Na Stop Seguros, mostramos diferenças relevantes, explicamos exclusões e ajustamos os limites antes da contratação. Assim, você escolhe com clareza e conta com apoio também quando precisar acionar a apólice.',
        ],
      },
    ],
  },
  {
    slug: 'seguro-residencial-custa-menos-do-que-voce-imagina',
    title: 'Seguro residencial: uma proteção que custa menos do que você imagina',
    excerpt:
      'Veja por que proteger sua casa vai além de incêndio e pode facilitar muitas emergências do dia a dia.',
    category: 'Seguro Residencial',
    date: '26 de fevereiro de 2026',
    readTime: '5 min de leitura',
    image: 'https://img.usecurling.com/p/1200/700?q=peaceful%20home&color=blue&dpr=2',
    content: [
      {
        paragraphs: [
          'A casa é um dos patrimônios mais importantes de uma família, mas muita gente ainda acredita que o seguro residencial é caro ou serve apenas para grandes incêndios. Na prática, há opções acessíveis e personalizáveis, com coberturas para eventos frequentes e assistências que podem ser usadas ao longo do ano.',
        ],
      },
      {
        heading: 'O que pode ser protegido',
        paragraphs: [
          'A cobertura básica normalmente contempla incêndio, raio e explosão. A partir dela, é possível incluir danos elétricos, vendaval, roubo, quebra de vidros, responsabilidade civil familiar e proteção para bens específicos. O capital segurado deve refletir o custo de reconstrução e reposição, não apenas o valor de mercado do imóvel.',
        ],
      },
      {
        heading: 'Assistência também é proteção',
        paragraphs: [
          'Chaveiro, eletricista, encanador e reparos emergenciais são serviços comuns nas apólices. Dependendo da frequência de uso, só essas assistências já podem representar uma economia relevante. Antes de contratar, confira limites, quantidade de acionamentos e prestadores disponíveis em sua região.',
        ],
        bullets: [
          'Mapeie os bens de maior valor',
          'Considere os riscos do condomínio e da vizinhança',
          'Leia franquias e limites de cada cobertura',
          'Revise a apólice após reformas ou novas aquisições',
        ],
      },
      {
        heading: 'Uma proposta para cada lar',
        paragraphs: [
          'Casa, apartamento próprio e imóvel alugado possuem necessidades distintas. A Stop Seguros avalia essas diferenças e apresenta uma composição objetiva, sem excessos e sem lacunas importantes.',
        ],
      },
    ],
  },
  {
    slug: 'seguro-de-vida-protecao-que-voce-usa-em-vida',
    title: 'Seguro de vida: proteção para a família e benefícios que você usa em vida',
    excerpt:
      'Conheça coberturas para doenças graves, invalidez e renda temporária, além da indenização aos beneficiários.',
    category: 'Seguro de Vida',
    date: '8 de fevereiro de 2026',
    readTime: '7 min de leitura',
    image: 'https://img.usecurling.com/p/1200/700?q=family%20sunset&color=blue&dpr=2',
    content: [
      {
        paragraphs: [
          'Seguro de vida é planejamento financeiro. Ele cria uma reserva imediata para quem depende da sua renda e pode ajudar o próprio segurado durante um período de tratamento, incapacidade ou afastamento. Por isso, a escolha deve considerar responsabilidades reais e objetivos de longo prazo.',
        ],
      },
      {
        heading: 'Quanto capital contratar?',
        paragraphs: [
          'Não existe um valor único. Some despesas familiares por um período de adaptação, dívidas, educação dos filhos e custos de inventário. Depois, desconte reservas e patrimônios com liquidez. Essa conta indica uma base, que deve caber de forma sustentável no orçamento mensal.',
        ],
      },
      {
        heading: 'Coberturas que podem ser usadas em vida',
        paragraphs: [
          'Além da indenização por morte, há coberturas para diagnóstico de doenças graves, invalidez, diárias por internação e incapacidade temporária. Profissionais autônomos podem se beneficiar especialmente de proteções ligadas à renda, pois um afastamento afeta diretamente o orçamento.',
        ],
        bullets: [
          'Doenças graves conforme lista contratada',
          'Invalidez permanente total ou parcial',
          'Diária por incapacidade temporária',
          'Assistência funeral individual ou familiar',
        ],
      },
      {
        heading: 'Mantenha os beneficiários atualizados',
        paragraphs: [
          'Mudanças familiares e patrimoniais pedem revisão. Confirme beneficiários, percentuais e dados de contato periodicamente. Nossa equipe acompanha esse cuidado e explica cada condição para que a apólice cumpra exatamente o papel esperado.',
        ],
      },
    ],
  },
]

export const findPost = (slug?: string) => blogPosts.find((post) => post.slug === slug)
