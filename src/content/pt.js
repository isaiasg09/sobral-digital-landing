import { PROJECT_METRICS, SOCIAL_LINKS } from '../config';

function resolveMetric(id, name, defaultBadge) {
  if (PROJECT_METRICS && typeof PROJECT_METRICS === 'object') {
    const candidate = PROJECT_METRICS[id] || PROJECT_METRICS[name] || null;
    if (
      typeof candidate === 'string' &&
      candidate.trim().length > 0 &&
      !candidate.includes('[')
    ) {
      return candidate.trim();
    }
  }
  return defaultBadge || null;
}

export const ptContent = {
  brand: {
    name: 'Sobral Digital',
    tagline: 'Estúdio de Posicionamento & Vendas Locais',
    fullTitle: 'Sobral Digital | Estruturas Digitais de Alta Conversão'
  },
  nav: {
    skipToContent: 'Pular para o conteúdo principal',
    views: [
      { id: 'home', label: 'Início' },
      { id: 'portfolio', label: 'Portfólio & Projetos' },
      { id: 'process', label: 'Nosso Processo & Contato' }
    ],
    ctaLabel: 'Solicitar Diagnóstico Gratuito'
  },
  hero: {
    eyebrow: 'ESTÚDIO DE ELITE PARA NEGÓCIOS LOCAIS',
    h1Part1: 'Pare de Perder Clientes no Google.',
    h1Shimmer: 'Transforme Sua Empresa na Escolha Nº 1 da Sua Cidade.',
    subtitle:
      'Criamos vitrines digitais de alto padrão que fazem o seu negócio parecer dez vezes mais valioso, geram confiança nos primeiros 3 segundos e levam clientes decididos direto para o seu WhatsApp todos os dias.',
    primaryCta: 'Explorar Vitrine de Projetos Ao Vivo',
    secondaryCta: 'Solicitar Diagnóstico Gratuito no WhatsApp',
    floatingBadges: [
      {
        id: 'badge-whatsapp',
        label: '+140% em Agendamentos no WhatsApp',
        sub: 'Fluxo comercial direto sem intermediários',
        accent: 'emerald'
      },
      {
        id: 'badge-google',
        label: 'Posicionamento nº 1 no Google Local',
        sub: 'Sua marca dominando as buscas da região',
        accent: 'indigo'
      },
      {
        id: 'badge-speed',
        label: 'Carregamento Instantâneo',
        sub: 'Nenhum cliente desiste esperando abrir',
        accent: 'emerald'
      }
    ],
    studioMetrics: [
      {
        value: '3 Segundos',
        label: 'Para conquistar a confiança do visitante logo no primeiro acesso'
      },
      {
        value: '48 Horas',
        label: 'Prazo ágil entre aprovação do protótipo e seu site publicado no ar'
      },
      {
        value: '24h / 7 Dias',
        label: 'Apresentando seu espaço, preços e diferenciais mesmo de portas fechadas'
      },
      {
        value: '100% Direto',
        label: 'Cliente chega no seu WhatsApp pronto para agendar ou fazer pedido'
      }
    ]
  },
  problemAuthority: {
    h2: 'A Diferença Entre Ser Ignorado no Google e Dominar o Seu Mercado Local',
    subtitle:
      'Quando um cliente pesquisa pelo seu serviço na cidade, ele compara você com o concorrente em segundos. Veja o que acontece com quem depende só de rede social versus quem possui uma Flagship Digital própria.',
    withoutHeader: {
      badge: 'Cenário Comum',
      title: 'Sem Landing Page de Alta Conversão',
      caption: 'Dependência de Instagram bagunçado e cliques perdidos no Google Maps.'
    },
    withHeader: {
      badge: 'Padrão Sobral Digital',
      title: 'Flagship Digital 24/7 de Alta Autoridade',
      caption: 'Estrutura comercial própria que justifica seu preço e direciona para o WhatsApp.'
    },
    pairs: [
      {
        id: 'first-impression',
        dimension: 'Primeira Impressão no Google Maps',
        withoutTitle: 'Cliques perdidos para o concorrente ao lado',
        withoutDesc:
          'O cliente encontra apenas um número solto ou um link confuso, fica em dúvida se o local é realmente bom e volta para escolher outro na lista.',
        withTitle: 'Impacto visual que encerra a comparação',
        withDesc:
          'Ao tocar no seu link, o cliente entra em um ambiente digno de grande marca que transmite segurança e faz qualquer concorrente parecer amador.'
      },
      {
        id: 'contact-friction',
        dimension: 'Caminho Até o Fechamento',
        withoutTitle: 'Cliente perdido em links e perguntas repetitivas',
        withoutDesc:
          'O interessado precisa caçar destaques antigos, mandar "oi, qual o valor?" e esperar horas sem saber quais serviços você realmente oferece.',
        withTitle: 'Direcionamento para WhatsApp com intenção clara',
        withDesc:
          'O visitante já viu seus melhores serviços, entendeu seu diferencial e clica para abrir o WhatsApp com a mensagem certa para agendar.'
      },
      {
        id: 'brand-trust',
        dimension: 'Percepção de Valor e Preço',
        withoutTitle: 'Guerra de descontos por parecer igual a todos',
        withoutDesc:
          'Sem uma vitrine que mostre o verdadeiro nível do seu trabalho, o cliente acha tudo parecido e decide unicamente pelo mais barato.',
        withTitle: 'Autoridade imediata que valoriza o seu ticket',
        withDesc:
          'Apresentação impecável das suas especialidades, ambiente e depoimentos faz o cliente perceber que o seu serviço vale cada centavo.'
      },
      {
        id: 'availability',
        dimension: 'Vendas Fora do Horário Comercial',
        withoutTitle: 'Atendimento travado quando você fecha as portas',
        withoutDesc:
          'À noite ou no fim de semana, quando o cliente finalmente tem tempo de procurar, ele não encontra informações claras e esfria a compra.',
        withTitle: 'Seu melhor vendedor trabalhando dia e noite',
        withDesc:
          'Sua página responde às dúvidas principais, apresenta o cardápio ou catálogo completo e deixa o pedido engatilhado no seu WhatsApp.'
      }
    ]
  },
  anatomy: {
    eyebrow: 'ENGENHARIA DE VENDAS SEM COMPLICAÇÃO',
    h2: 'A Anatomia de um Site que Vende Sozinho',
    subtitle:
      'Você não precisa entender nada de programação. Nós construímos uma máquina comercial dividida em 4 etapas psicológicas que transformam curiosos da sua cidade em clientes reais no seu balcão.',
    steps: [
      {
        id: 'step-capture',
        stepNumber: '01',
        timeTag: 'Segundo 0 ao 1',
        title: 'Captura Magnética nas Buscas do Google',
        shortLabel: '1. Captura no Google',
        headline: 'Quando procuram pelo seu serviço no bairro ou na cidade, sua empresa aparece com postura de líder.',
        description:
          'Estruturamos todos os títulos, endereços e palavras-chave do seu negócio para que o Google entenda exatamente o que você vende e destaque sua marca para quem já está com o cartão na mão.',
        bulletPoints: [
          'Presença profissional conectada ao seu perfil do Google Maps',
          'Abertura imediata no celular mesmo no 4G da rua',
          'Resumo claro de especialidades e localização logo no topo'
        ],
        visualStats: {
          metric: '1º Clique',
          detail: 'Visitante encontra sua empresa com clareza total'
        }
      },
      {
        id: 'step-desire',
        stepNumber: '02',
        timeTag: 'Primeiros 3 Segundos',
        title: 'Desejo Imediato e Percepção de Alto Padrão',
        shortLabel: '2. Desejo em 3 Segundos',
        headline: 'Nos primeiros 3 segundos, o cliente decide se a sua empresa é de confiança ou mais uma opção comum.',
        description:
          'Usamos contraste escuro de cinema, tipografia imponente e vitrines visuais dos seus melhores produtos ou procedimentos. O cliente sente na hora que está diante do melhor estabelecimento da região.',
        bulletPoints: [
          'Destaque visual para os seus serviços ou pratos de maior margem',
          'Acabamento de marca grande que elimina pedidos de desconto',
          'Leitura rápida e agradável pensada para quem está no celular'
        ],
        visualStats: {
          metric: '3 Segundos',
          detail: 'Tempo para encantar o olhar e prender a atenção'
        }
      },
      {
        id: 'step-trust',
        stepNumber: '03',
        timeTag: 'Segundos 4 a 15',
        title: 'Quebra de Objeções e Prova de Autoridade',
        shortLabel: '3. Quebra de Objeções',
        headline: 'Eliminamos todas as dúvidas que impediriam o cliente de entrar em contato com você.',
        description:
          'Antes mesmo de falar com sua equipe, o visitante vê seus diferenciais, conhece seu espaço, entende como funciona o atendimento e sente total segurança para dar o próximo passo.',
        bulletPoints: [
          'Apresentação transparente de benefícios e diferenciais da casa',
          'Destaques de qualidade, higiene, tradição ou tecnologia',
          'Respostas diretas para as dúvidas mais comuns do seu público'
        ],
        visualStats: {
          metric: 'Zero Dúvida',
          detail: 'Objeções resolvidas antes mesmo da conversa começar'
        }
      },
      {
        id: 'step-whatsapp',
        stepNumber: '04',
        timeTag: 'Momento da Decisão',
        title: 'Disparo Direto para o WhatsApp Pronto para Fechar',
        shortLabel: '4. Cliente no WhatsApp',
        headline: 'Sem cadastros longos ou carrinhos confusos: um toque leva o cliente decidido direto ao seu WhatsApp.',
        description:
          'Possuímos botões inteligentes acompanhando toda a leitura. Quando o desejo atinge o pico, o cliente clica e já abre o seu WhatsApp com uma mensagem clara dizendo exatamente o que deseja agendar ou pedir.',
        bulletPoints: [
          'Mensagem personalizada pronta para agilizar sua recepção',
          'Botão flutuante sempre ao alcance do polegar no smartphone',
          'Mais tempo para você atender bem quem realmente quer comprar'
        ],
        visualStats: {
          metric: 'Venda Direta',
          detail: 'Lead qualificado chamando no seu WhatsApp comercial'
        }
      }
    ]
  },
  portfolio: {
    eyebrow: 'PORTFÓLIO REAL • PROJETOS NO AR',
    h2: 'Estruturas Reais Que Transformaram Negócios Locais',
    subtitle:
      'Não trabalhamos com moldes genéricos. Explore abaixo nossos projetos em produção, entenda a estratégia aplicada e clique para navegar no site real em uma nova guia.',
    liveBadge: 'Site Ao Vivo',
    openCaseStudyLabel: 'Abrir em Nova Guia',
    openExternalLabel: 'Abrir em Nova Guia',
    viewAllPortfolioCta: 'Ver Vitrine Completa de Projetos',
    caseStudyModal: {
      backLabel: 'Voltar para a Vitrine',
      desktopView: 'Visão Computador',
      mobileView: 'Visão Celular',
      challengeHeading: 'O Desafio do Negócio (Por que perdia vendas)',
      solutionHeading: 'A Solução Sobral Digital (Como multiplicamos a autoridade)',
      resultsHeading: 'Impacto Comercial Direto',
      ctaButton: 'Quero uma estrutura desse nível para o meu negócio'
    },
    items: [
      {
        id: 'cafe-e-prosa',
        name: 'Café & Prosa',
        aliases: 'Cafeteria & Cozinha de Tradição',
        niche: 'Cafeteria & Cozinha de Tradição',
        url: 'https://caepro.vercel.app/',
        metric: resolveMetric(
          'cafe-e-prosa',
          'Café & Prosa',
          'Vitrine Gastronômica Digital 24/7'
        ),
        accentColor: 'emerald',
        headline: 'Transformando tradição gastronômica em desejo imediato na tela do celular.',
        summary:
          'Uma experiência acolhedora e sofisticada que apresenta o cardápio artesanal, conta a história da casa e convida famílias e clientes locais a visitarem o espaço.',
        challenge:
          'Muitos clientes pesquisavam cafeterias na região pelo celular, mas não conseguiam sentir o aconchego do ambiente nem visualizar as opções de cafés especiais e pratos da casa antes de sair de casa, acabando em redes de fast-food comuns.',
        solution:
          'Desenvolvemos uma vitrine digital envolvente que destaca os grãos selecionados, a confeitaria artesanal e o ambiente familiar logo na primeira dobra, com acesso rápido ao cardápio, localização exata e contato direto via WhatsApp para reservas e encomendas.',
        highlights: [
          'Cardápio visual organizado por momentos do dia',
          'Rota direta integrada para atrair visitantes próximos',
          'Atmosfera aconchegante que aumenta o ticket médio por mesa'
        ]
      },
      {
        id: 'gauchos-hair',
        name: "Gauchos's Hair",
        aliases: 'Barbearia Premium / Estilo Trust Barbershop',
        niche: 'Barbearia Premium',
        url: 'https://gauhair.vercel.app/',
        metric: resolveMetric(
          'gauchos-hair',
          "Gauchos's Hair",
          'Fluxo Direto de Agendamento VIP'
        ),
        accentColor: 'indigo',
        headline: 'Posicionamento masculino de alto padrão que lota a agenda sem depender de descontos.',
        summary:
          'Identidade imponente para barbearia clássica e moderna, desenhada para valorizar combos de barba e cabelo e levar o cliente direto ao agendamento no WhatsApp.',
        challenge:
          'No mercado de barbearias, quem não transmite exclusividade acaba refém de clientes que só perguntam preço. Além disso, o atendimento perdia muito tempo respondendo dúvidas básicas sobre valores de corte, barba e horários disponíveis.',
        solution:
          'Construímos uma Flagship Digital com estética de clube exclusivo, apresentando cada serviço e ritual de barbearia com clareza, destacando a maestria dos profissionais e integrando botões de agendamento rápido que já iniciam a conversa no WhatsApp.',
        highlights: [
          'Apresentação clara de cortes, barba terapia e pacotes VIP',
          'Redução drástica de mensagens curiosas sem intenção de agendar',
          'Imagem de marca forte que fideliza o público masculino exigente'
        ]
      },
      {
        id: 'estacao-da-comida',
        name: 'Estação da Comida Sorocaba',
        aliases: 'Gastronomia Regional / Estilo Artisan Food',
        niche: 'Gastronomia',
        url: 'https://etcs-dun.vercel.app/',
        metric: resolveMetric(
          'estacao-da-comida',
          'Estação da Comida Sorocaba',
          'Canal Próprio de Pedidos & Presença Local'
        ),
        accentColor: 'emerald',
        headline: 'Despertando apetite nos primeiros segundos e levando pedidos direto para o balcão.',
        summary:
          'Plataforma gastronômica vibrante criada para destacar o sabor caseiro, facilitar a escolha dos pratos do dia e converter fome em pedidos rápidos pelo WhatsApp.',
        challenge:
          'Restaurantes locais sofrem com taxas abusivas de aplicativos de entrega ou cardápios em PDF que demoram para baixar e são impossíveis de ler no celular na hora do almoço.',
        solution:
          'Criamos uma página ultrarrápida com foco visual nos pratos principais, informações claras de horário de funcionamento, endereço em Sorocaba e atalhos diretos para o cliente fazer seu pedido ou tirar dúvidas no WhatsApp em poucos toques.',
        highlights: [
          'Leitura instantânea no celular na hora de pico do almoço',
          'Vendas diretas no WhatsApp sem pagar comissões para terceiros',
          'Destaque para pratos executivos e especialidades da casa'
        ]
      },
      {
        id: 'dluxo-hair',
        name: "D'luxo Hair",
        aliases: 'Estética & Beleza Avançada / Estilo Clínica Prime',
        niche: 'Estética',
        url: 'https://dlux-liart.vercel.app/',
        metric: resolveMetric(
          'dluxo-hair',
          "D'luxo Hair",
          'Captação de Procedimentos de Alto Ticket'
        ),
        accentColor: 'indigo',
        headline: 'Elegância e confiança clínica para atrair clientes de procedimentos de alto valor.',
        summary:
          'Design sofisticado para estética e beleza, projetado para transmitir segurança técnica, valorizar resultados e conduzir clientes a uma avaliação personalizada no WhatsApp.',
        challenge:
          'Procedimentos estéticos e capilares de maior valor exigem extrema confiança. Quando a cliente encontra apenas fotos soltas nas redes sociais, ela sente insegurança sobre a estrutura do espaço e adia o agendamento.',
        solution:
          'Entregamos um ambiente digital luxuoso que apresenta os tratamentos com delicadeza e autoridade, explica os cuidados de cada protocolo e convida a visitante para uma consultoria individual via WhatsApp com a equipe especialista.',
        highlights: [
          'Visual de clínica e salão boutique que atrai público qualificado',
          'Jornada consultiva que prepara a cliente para tratamentos completos',
          'Atendimento humanizado iniciado com um clique no celular'
        ]
      }
    ]
  },
  process: {
    eyebrow: 'MÉTODO RÁPIDO E SEM DOR DE CABEÇA',
    h2: 'Do Diagnóstico à Publicação Sem Burocracia',
    subtitle:
      'Sabemos que você não tem tempo a perder com reuniões intermináveis. Cuidamos de 100% do texto comercial, do visual e da configuração técnica em 3 passos simples:',
    steps: [
      {
        number: '01',
        title: '1. Diagnóstico & Protótipo Sem Compromisso',
        description:
          'Analisamos como sua empresa aparece hoje na sua cidade, identificamos onde você está perdendo clientes e desenhamos a proposta visual ideal para o seu negócio.'
      },
      {
        number: '02',
        title: '2. Refinamento Personalizado',
        description:
          'Escrevemos os textos persuasivos focados em vendas, organizamos seus melhores serviços e ajustamos cada botão de WhatsApp para funcionar exatamente como sua equipe atende.'
      },
      {
        number: '03',
        title: '3. Publicação em 48h',
        description:
          'Colocamos sua nova estrutura no ar em tempo recorde, pronta para receber clientes do Google Maps, do Instagram e de campanhas de anúncios com velocidade máxima.'
      }
    ],
    finalCta: {
      title: 'Pronto para ter uma estrutura desse nível trabalhando pelo seu negócio?',
      subtitle:
        'Chame nossa equipe no WhatsApp agora mesmo e solicite um diagnóstico gratuito da presença digital da sua empresa.',
      buttonText: 'Solicitar Diagnóstico Gratuito no WhatsApp'
    }
  },
  faq: {
    eyebrow: 'TRANSPARÊNCIA TOTAL PARA O EMPRESÁRIO',
    h2: 'Perguntas Frequentes Antes de Começar',
    subtitle:
      'Tire suas dúvidas sobre prazos, funcionamento no celular e como cuidamos de tudo para você focar apenas em atender seus clientes.',
    items: [
      {
        question: 'Eu preciso entender de tecnologia ou programação para ter esse site?',
        answer:
          'Absolutamente nada. Nós entregamos tudo 100% pronto, configurado e funcionando. Você não precisa mexer em código nem em ferramentas complicadas — sua única função será responder os novos clientes que chegarem no seu WhatsApp.'
      },
      {
        question: 'Em quanto tempo meu novo site fica pronto e publicado no ar?',
        answer:
          'Nosso processo é focado em agilidade comercial. Após alinharmos os detalhes do seu negócio no diagnóstico e aprovarmos o refinamento, realizamos a publicação oficial em até 48 horas.'
      },
      {
        question: 'Como o site funciona para quem acessa pelo celular?',
        answer:
          'Mais de 85% das buscas locais acontecem pelo smartphone. Por isso, desenhamos cada tela pensando primeiro na experiência do polegar no celular: letras nítidas, carregamento instantâneo no 4G/5G e botão de WhatsApp sempre visível.'
      },
      {
        question: 'E se eu precisar atualizar um telefone, endereço ou serviço depois?',
        answer:
          'Você conta com suporte direto da nossa equipe pelo WhatsApp. Sempre que precisar ajustar uma informação comercial, horário de atendimento ou destaque de serviço, basta nos mandar uma mensagem que resolvemos rapidamente.'
      },
      {
        question: 'Eu já tenho Instagram. Por que preciso de uma página própria de alta conversão?',
        answer:
          'No Instagram o cliente se distrai com vídeos, notificações e concorrentes a cada segundo, além de não aparecer no topo para quem pesquisa um serviço urgente no Google. Sua página própria é o seu território exclusivo: sem distrações, feita com um único objetivo — fazer o visitante chamar você no WhatsApp.'
      }
    ]
  },
  floatingWhatsApp: {
    label: 'Diagnóstico Gratuito',
    ariaLabel: 'Conversar no WhatsApp e solicitar diagnóstico gratuito'
  },
  footer: {
    h2: 'Canais Oficiais & Navegação',
    portfolioTitle: 'Projetos Ao Vivo (Estudos de Caso)',
    navigationTitle: 'Navegação do Estúdio',
    contactTitle: 'Atendimento Executivo',
    contactDescription:
      'Transformamos negócios locais em marcas digitais de elite com foco total em geração de clientes no WhatsApp.',
    contactButton: 'Falar com Especialista no WhatsApp',
    rightsReserved: 'Todos os direitos reservados.'
  }
};

export function getActiveSocialLinks() {
  if (!SOCIAL_LINKS || typeof SOCIAL_LINKS !== 'object') {
    return [];
  }
  return Object.entries(SOCIAL_LINKS)
    .filter(
      ([, url]) =>
        typeof url === 'string' &&
        url.trim().length > 0 &&
        !url.includes('[')
    )
    .map(([platform, url]) => ({
      platform,
      url: url.trim()
    }));
}

export function useContent() {
  return ptContent;
}
