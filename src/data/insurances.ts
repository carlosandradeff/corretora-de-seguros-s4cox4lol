import {
  Activity,
  BriefcaseBusiness,
  Car,
  Cat,
  Cross,
  Factory,
  Gavel,
  HeartPulse,
  Home,
  Laptop,
  Leaf,
  Plane,
  ShieldCheck,
  Stethoscope,
  Truck,
  type LucideIcon,
} from 'lucide-react'

export type Insurance = {
  slug: string
  type: string
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  intro: string
  image: string
  icon: LucideIcon
  covers: string[]
  exclusions: string[]
  benefits: string[]
  faqs: { question: string; answer: string }[]
}

const sharedFaq = (title: string) => [
  {
    question: `Como é calculado o valor do ${title.toLowerCase()}?`,
    answer:
      'O preço considera seu perfil, limites de cobertura, franquias e características do risco. A Stop Seguros compara diferentes seguradoras e apresenta opções claras para você decidir com segurança.',
  },
  {
    question: 'Posso personalizar as coberturas?',
    answer:
      'Sim. Montamos a proposta de acordo com sua realidade, incluindo somente as proteções e assistências que fazem sentido para você, sua família ou sua empresa.',
  },
  {
    question: 'Como funciona o atendimento em caso de sinistro?',
    answer:
      'Nossa equipe orienta a abertura do aviso, confere os documentos e acompanha o processo junto à seguradora até a conclusão. Você não precisa enfrentar esse momento sozinho.',
  },
]

export const insurances: Insurance[] = [
  {
    slug: 'planos-de-saude',
    type: 'saude',
    title: 'Planos de Saúde',
    shortTitle: 'Saúde',
    eyebrow: 'Cuidado em todos os momentos',
    icon: Stethoscope,
    description:
      'Planos individuais, familiares e empresariais com redes adequadas ao seu dia a dia.',
    intro:
      'Escolher um plano de saúde exige mais do que comparar mensalidades. Analisamos rede credenciada, abrangência, coparticipação, carências e perfil de uso para indicar uma solução que cuide de você com previsibilidade.',
    image: 'https://img.usecurling.com/p/1200/800?q=family%20health&color=blue&dpr=2',
    covers: [
      'Consultas e exames conforme o rol contratado',
      'Internações hospitalares e cirurgias',
      'Atendimento de urgência e emergência',
      'Opções com obstetrícia e cobertura nacional',
      'Planos empresariais para equipes e dependentes',
    ],
    exclusions: [
      'Procedimentos fora do rol e do contrato',
      'Atendimento durante carências vigentes',
      'Serviços em rede não credenciada sem reembolso previsto',
    ],
    benefits: [
      'Comparativo entre operadoras',
      'Análise da rede em Goiânia',
      'Suporte na contratação e pós-venda',
    ],
    faqs: [
      ...sharedFaq('plano de saúde'),
      {
        question: 'Existe plano sem coparticipação?',
        answer:
          'Sim. Há modalidades com e sem coparticipação. Apresentamos o impacto de cada formato no valor mensal e no uso para você escolher conscientemente.',
      },
    ],
  },
  {
    slug: 'planos-odontologicos',
    type: 'outro',
    title: 'Planos Odontológicos',
    shortTitle: 'Odontológico',
    eyebrow: 'Seu sorriso bem cuidado',
    icon: Cross,
    description: 'Prevenção e tratamento odontológico com ampla rede de profissionais.',
    intro:
      'Um plano odontológico facilita o cuidado preventivo e reduz o impacto financeiro de tratamentos. Encontramos alternativas individuais, familiares e empresariais com rede credenciada e coberturas compatíveis com sua rotina.',
    image: 'https://img.usecurling.com/p/1200/800?q=dental%20care&color=cyan&dpr=2',
    covers: [
      'Consultas, limpeza e prevenção',
      'Tratamento de cáries e restaurações',
      'Urgências odontológicas',
      'Tratamento de canal conforme o plano',
      'Radiografias e procedimentos diagnósticos',
    ],
    exclusions: [
      'Procedimentos estéticos não contratados',
      'Implantes quando não previstos',
      'Tratamentos iniciados antes da vigência',
    ],
    benefits: [
      'Rede credenciada ampla',
      'Opções sem burocracia',
      'Planos para empresas e famílias',
    ],
    faqs: sharedFaq('plano odontológico'),
  },
  {
    slug: 'seguro-automovel',
    type: 'auto',
    title: 'Seguro Automóvel',
    shortTitle: 'Automóvel',
    eyebrow: 'Tranquilidade em cada trajeto',
    icon: Car,
    description: 'Proteção para seu veículo, você e terceiros, com assistência quando precisar.',
    intro:
      'Seu carro faz parte da sua rotina. Com uma análise completa do perfil e do uso, encontramos proteção contra os principais imprevistos e assistência para que você siga seu caminho com tranquilidade.',
    image: 'https://img.usecurling.com/p/1200/800?q=serene%20road&color=blue&dpr=2',
    covers: [
      'Colisão, capotamento e incêndio',
      'Roubo e furto do veículo',
      'Danos materiais e corporais a terceiros',
      'Assistência 24 horas e guincho',
      'Vidros, faróis e carro reserva conforme contratação',
    ],
    exclusions: [
      'Uso do veículo fora do declarado',
      'Condução sem habilitação válida',
      'Danos intencionais ou desgaste natural',
    ],
    benefits: [
      'Comparação entre seguradoras',
      'Coberturas sob medida',
      'Apoio completo em sinistros',
    ],
    faqs: sharedFaq('seguro automóvel'),
  },
  {
    slug: 'seguro-residencial',
    type: 'residencial',
    title: 'Seguro Residencial',
    shortTitle: 'Residencial',
    eyebrow: 'Seu lar protegido',
    icon: Home,
    description: 'Coberturas para casa ou apartamento e assistências úteis no dia a dia.',
    intro:
      'Sua casa guarda histórias, planos e tudo o que importa. O seguro residencial protege o imóvel e os bens contra imprevistos e ainda oferece serviços práticos para pequenas emergências domésticas.',
    image: 'https://img.usecurling.com/p/1200/800?q=cozy%20home&color=blue&dpr=2',
    covers: [
      'Incêndio, raio e explosão',
      'Danos elétricos e vendaval',
      'Roubo ou furto qualificado',
      'Responsabilidade civil familiar',
      'Chaveiro, eletricista e encanador 24h',
    ],
    exclusions: [
      'Desgaste e falta de manutenção',
      'Bens não declarados quando exigido',
      'Danos por reformas sem cobertura específica',
    ],
    benefits: [
      'Proteção acessível',
      'Assistências residenciais',
      'Cobertura para imóvel e conteúdo',
    ],
    faqs: sharedFaq('seguro residencial'),
  },
  {
    slug: 'seguro-de-vida',
    type: 'vida',
    title: 'Seguro de Vida',
    shortTitle: 'Vida',
    eyebrow: 'Cuidado que permanece',
    icon: HeartPulse,
    description: 'Segurança financeira para você e para quem depende dos seus planos.',
    intro:
      'O seguro de vida é uma decisão de cuidado. Ele ajuda a preservar a estabilidade financeira da família e pode oferecer apoio ao próprio segurado em situações delicadas de saúde ou incapacidade.',
    image: 'https://img.usecurling.com/p/1200/800?q=happy%20family&color=blue&dpr=2',
    covers: [
      'Morte natural ou acidental',
      'Invalidez permanente por acidente',
      'Doenças graves conforme contratação',
      'Diárias por incapacidade temporária',
      'Assistência funeral familiar',
    ],
    exclusions: [
      'Riscos excluídos expressamente na apólice',
      'Informações incorretas na declaração de saúde',
      'Eventos durante prazo de carência previsto',
    ],
    benefits: [
      'Capital adequado à família',
      'Beneficiários escolhidos por você',
      'Coberturas para usar em vida',
    ],
    faqs: sharedFaq('seguro de vida'),
  },
  {
    slug: 'seguro-empresarial',
    type: 'empresarial',
    title: 'Seguro Empresarial',
    shortTitle: 'Empresarial',
    eyebrow: 'Continuidade para seu negócio',
    icon: BriefcaseBusiness,
    description:
      'Proteção patrimonial e operacional personalizada para empresas de todos os portes.',
    intro:
      'Cada empresa possui riscos próprios. Avaliamos instalações, atividade, equipamentos e exposição para construir uma apólice que preserve o patrimônio e ajude o negócio a continuar mesmo diante de imprevistos.',
    image: 'https://img.usecurling.com/p/1200/800?q=modern%20office&color=blue&dpr=2',
    covers: [
      'Incêndio, explosão e danos elétricos',
      'Roubo de bens e mercadorias',
      'Lucros cessantes',
      'Responsabilidade civil de operações',
      'Equipamentos e assistências emergenciais',
    ],
    exclusions: [
      'Prejuízos por gestão ou mercado',
      'Riscos não informados na proposta',
      'Danos graduais por falta de manutenção',
    ],
    benefits: ['Diagnóstico de riscos', 'Coberturas por atividade', 'Suporte técnico em sinistros'],
    faqs: sharedFaq('seguro empresarial'),
  },
  {
    slug: 'seguro-viagem',
    type: 'viagem',
    title: 'Seguro Viagem',
    shortTitle: 'Viagem',
    eyebrow: 'O mundo com mais tranquilidade',
    icon: Plane,
    description:
      'Assistência médica e apoio para imprevistos em viagens nacionais e internacionais.',
    intro:
      'Viajar deve ser leve. Com o seguro adequado ao destino, à duração e ao perfil dos viajantes, você conta com suporte para emergências médicas, bagagem e outros contratempos longe de casa.',
    image: 'https://img.usecurling.com/p/1200/800?q=calm%20travel&color=cyan&dpr=2',
    covers: [
      'Despesas médicas e hospitalares',
      'Atendimento odontológico emergencial',
      'Extravio e atraso de bagagem',
      'Traslado médico e repatriação',
      'Cancelamento ou interrupção conforme plano',
    ],
    exclusions: [
      'Doenças preexistentes fora das condições',
      'Esportes de risco não contratados',
      'Eventos sem comunicação à assistência',
    ],
    benefits: [
      'Planos por destino',
      'Atendimento internacional 24h',
      'Certificado emitido rapidamente',
    ],
    faqs: sharedFaq('seguro viagem'),
  },
  {
    slug: 'seguro-pet',
    type: 'outro',
    title: 'Seguro Pet',
    shortTitle: 'Pet',
    eyebrow: 'Cuidado para seu melhor amigo',
    icon: Cat,
    description: 'Assistência veterinária e proteção para cães e gatos em todas as fases.',
    intro:
      'Seu pet faz parte da família. Encontramos planos e seguros com atendimento veterinário, assistência em emergências e serviços que ajudam a cuidar da saúde dele com mais previsibilidade.',
    image: 'https://img.usecurling.com/p/1200/800?q=family%20dog&color=blue&dpr=2',
    covers: [
      'Consultas veterinárias conforme rede',
      'Exames e procedimentos contratados',
      'Atendimento emergencial',
      'Cirurgias e internações conforme plano',
      'Assistências e orientação veterinária',
    ],
    exclusions: [
      'Condições preexistentes não aceitas',
      'Procedimentos estéticos',
      'Atendimento fora da rede sem reembolso',
    ],
    benefits: [
      'Planos para diferentes idades',
      'Rede veterinária parceira',
      'Previsibilidade de custos',
    ],
    faqs: sharedFaq('seguro pet'),
  },
  {
    slug: 'seguro-transporte',
    type: 'outro',
    title: 'Seguro Transporte',
    shortTitle: 'Transporte',
    eyebrow: 'Sua carga segue protegida',
    icon: Truck,
    description: 'Cobertura para mercadorias em trânsito nacional e internacional.',
    intro:
      'Do embarque à entrega, a carga está exposta a acidentes, roubos e avarias. Estruturamos proteção compatível com a operação logística, os modais utilizados e a natureza das mercadorias.',
    image: 'https://img.usecurling.com/p/1200/800?q=cargo%20transport&color=blue&dpr=2',
    covers: [
      'Acidentes com o veículo transportador',
      'Roubo e desaparecimento de carga',
      'Avarias durante o percurso',
      'Operações nacionais e internacionais',
      'Coberturas adicionais por tipo de mercadoria',
    ],
    exclusions: [
      'Embalagem inadequada',
      'Mercadorias não declaradas',
      'Rotas ou condições fora do gerenciamento acordado',
    ],
    benefits: ['Análise da logística', 'Apólices avulsas ou abertas', 'Gestão de riscos'],
    faqs: sharedFaq('seguro transporte'),
  },
  {
    slug: 'seguro-rural',
    type: 'outro',
    title: 'Seguro Rural',
    shortTitle: 'Rural',
    eyebrow: 'Proteção para quem produz',
    icon: Leaf,
    description: 'Soluções para lavouras, máquinas, propriedades e atividades do agronegócio.',
    intro:
      'O campo depende de planejamento e está sujeito a fatores imprevisíveis. Reunimos soluções para proteger produção, patrimônio e continuidade da atividade rural de acordo com cada ciclo.',
    image: 'https://img.usecurling.com/p/1200/800?q=green%20farm&color=green&dpr=2',
    covers: [
      'Eventos climáticos na lavoura',
      'Máquinas e implementos agrícolas',
      'Benfeitorias e instalações rurais',
      'Rebanho conforme modalidade',
      'Responsabilidade civil da atividade',
    ],
    exclusions: [
      'Manejo inadequado comprovado',
      'Riscos não previstos no zoneamento',
      'Perdas por variação de preço sem cobertura',
    ],
    benefits: [
      'Análise por cultura',
      'Proteção do investimento',
      'Soluções para diferentes ciclos',
    ],
    faqs: sharedFaq('seguro rural'),
  },
  {
    slug: 'seguro-garantia',
    type: 'outro',
    title: 'Seguro Garantia',
    shortTitle: 'Garantia',
    eyebrow: 'Compromissos com credibilidade',
    icon: ShieldCheck,
    description: 'Garantia de obrigações contratuais com menor impacto no caixa da empresa.',
    intro:
      'O seguro garantia demonstra capacidade de cumprir contratos sem comprometer limites bancários. Estruturamos a modalidade adequada para licitações, obras, fornecimentos e processos judiciais.',
    image: 'https://img.usecurling.com/p/1200/800?q=business%20agreement&color=blue&dpr=2',
    covers: [
      'Garantia do licitante',
      'Execução de contratos',
      'Adiantamento de pagamentos',
      'Retenção de pagamentos',
      'Garantia judicial e aduaneira',
    ],
    exclusions: [
      'Obrigações fora do contrato garantido',
      'Alterações sem anuência da seguradora',
      'Multas sem previsão na modalidade',
    ],
    benefits: ['Preserva linhas de crédito', 'Agilidade na análise', 'Modalidades sob medida'],
    faqs: sharedFaq('seguro garantia'),
  },
  {
    slug: 'riscos-operacionais',
    type: 'outro',
    title: 'Riscos Operacionais',
    shortTitle: 'Riscos Operacionais',
    eyebrow: 'Operações mais resilientes',
    icon: Factory,
    description: 'Proteção ampla para grandes instalações, equipamentos e interrupções.',
    intro:
      'Operações complexas precisam de uma visão integrada dos riscos. A cobertura de riscos operacionais protege ativos físicos e pode reduzir o impacto financeiro de paralisações relevantes.',
    image: 'https://img.usecurling.com/p/1200/800?q=clean%20industry&color=blue&dpr=2',
    covers: [
      'Danos materiais de causa súbita',
      'Quebra de máquinas',
      'Danos elétricos',
      'Lucros cessantes por evento coberto',
      'Despesas extraordinárias de continuidade',
    ],
    exclusions: [
      'Desgaste natural e corrosão',
      'Falhas conhecidas sem correção',
      'Perdas financeiras sem dano material coberto',
    ],
    benefits: ['Inspeção técnica', 'Limites adequados à operação', 'Plano de continuidade'],
    faqs: sharedFaq('seguro de riscos operacionais'),
  },
  {
    slug: 'riscos-de-engenharia',
    type: 'outro',
    title: 'Riscos de Engenharia',
    shortTitle: 'Engenharia',
    eyebrow: 'Obras protegidas do início ao fim',
    icon: Gavel,
    description: 'Coberturas para obras civis, instalações, montagens e equipamentos.',
    intro:
      'Durante uma obra, muitos eventos podem comprometer prazo e orçamento. O seguro de riscos de engenharia acompanha o projeto e protege os trabalhos, materiais e responsabilidades envolvidas.',
    image: 'https://img.usecurling.com/p/1200/800?q=modern%20construction&color=blue&dpr=2',
    covers: [
      'Danos à obra civil em execução',
      'Montagem e instalação de equipamentos',
      'Erro de projeto conforme adicional',
      'Responsabilidade civil cruzada',
      'Despesas de desentulho e salvamento',
    ],
    exclusions: [
      'Defeitos preexistentes',
      'Multas por atraso contratual',
      'Desgaste de ferramentas e equipamentos',
    ],
    benefits: [
      'Cobertura por fase',
      'Análise técnica do projeto',
      'Proteção de contratantes e executores',
    ],
    faqs: sharedFaq('seguro de riscos de engenharia'),
  },
  {
    slug: 'riscos-ciberneticos',
    type: 'outro',
    title: 'Riscos Cibernéticos',
    shortTitle: 'Riscos Cibernéticos',
    eyebrow: 'Confiança no ambiente digital',
    icon: Laptop,
    description: 'Resposta financeira e especializada a vazamentos, ataques e indisponibilidade.',
    intro:
      'Dados e sistemas são vitais para qualquer negócio. O seguro cibernético reúne cobertura financeira e especialistas para responder a incidentes, reduzir danos e restaurar a operação com agilidade.',
    image: 'https://img.usecurling.com/p/1200/800?q=cybersecurity%20office&color=blue&dpr=2',
    covers: [
      'Resposta a incidentes e perícia digital',
      'Vazamento de dados pessoais',
      'Interrupção do negócio por ataque',
      'Responsabilidade perante terceiros',
      'Extorsão cibernética conforme condições',
    ],
    exclusions: [
      'Falhas conhecidas sem correção',
      'Atos deliberados da alta gestão',
      'Infrações e multas não seguráveis por lei',
    ],
    benefits: ['Equipe de resposta 24h', 'Proteção financeira', 'Apoio jurídico e reputacional'],
    faqs: sharedFaq('seguro de riscos cibernéticos'),
  },
  {
    slug: 'responsabilidade-civil',
    type: 'outro',
    title: 'Responsabilidade Civil',
    shortTitle: 'Responsabilidade Civil',
    eyebrow: 'Proteção diante de terceiros',
    icon: Activity,
    description:
      'Cobertura para prejuízos involuntários causados a terceiros no exercício da atividade.',
    intro:
      'Mesmo com todo cuidado, uma falha pode gerar danos e uma obrigação de indenizar. Estruturamos proteção para profissionais, empresas, administradores e diferentes atividades expostas a terceiros.',
    image: 'https://img.usecurling.com/p/1200/800?q=professional%20meeting&color=blue&dpr=2',
    covers: [
      'Danos materiais e corporais a terceiros',
      'Custos de defesa conforme apólice',
      'Erros e omissões profissionais',
      'Responsabilidade de administradores',
      'Riscos de operações e produtos',
    ],
    exclusions: [
      'Atos dolosos',
      'Obrigações assumidas sem previsão',
      'Danos conhecidos antes da vigência',
    ],
    benefits: ['Modalidade por profissão', 'Defesa e indenização', 'Preservação patrimonial'],
    faqs: sharedFaq('seguro de responsabilidade civil'),
  },
]

export const findInsurance = (slug?: string) => insurances.find((item) => item.slug === slug)
