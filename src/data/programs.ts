export type Program = {
  slug: string; title: string; seoTitle: string; description: string; intro: string;
  sections: { title: string; body: string }[]; icon: string;
};

export const programs: Program[] = [
  {
    "slug": "doencas-fibrosantes",
    "title": "Doenças Fibrosantes",
    "seoTitle": "Doenças Pulmonares Fibrosantes em Maringá | Dr. Sergio Grava, Pneumologista",
    "description": "Diagnóstico e acompanhamento de doenças pulmonares fibrosantes em Maringá, com pneumologista e equipe multiprofissional.",
    "intro": "São doenças pulmonares que afetam o tecido pulmonar. Podem ser agudas ou crônicas, levando a uma inflamação persistente que pode deixar o pulmão mais rígido e prejudicar a captação de oxigênio. As causas mais comuns são as doenças reumatológicas (artrite reumatoide, doenças do colágeno, entre outras), mas elas também podem estar associadas ao tabagismo, ao uso de medicamentos, à inalação crônica de partículas diversas (pneumonite de hipersensibilidade), à fibrose familiar e à fibrose pulmonar idiopática.",
    "sections": [
      {
        "title": "Sintomas comuns",
        "body": "Falta de ar progressiva e lenta, tosse crônica persistente, perda da capacidade de exercício e emagrecimento."
      },
      {
        "title": "Diagnóstico",
        "body": "Avaliação clínica detalhada, exames de imagem (tomografia de tórax de alta resolução), exames laboratoriais e provas de função pulmonar. Pode ser necessária a avaliação do reumatologista."
      },
      {
        "title": "Plano de tratamento",
        "body": "Nosso programa de atendimento é sempre individualizado e multiprofissional, com medicamentos, tratamento da doença reumatológica (quando associada), fisioterapia respiratória e acompanhamento nutricional. É direcionado para aumentar a capacidade respiratória e a qualidade de vida."
      }
    ],
    "icon": "01"
  },
  {
    "slug": "tabagismo",
    "title": "Programa de Cessação do Tabagismo",
    "seoTitle": "Programa para Parar de Fumar em Maringá | Dr. Sergio Grava, Pneumologista",
    "description": "Programa de cessação do tabagismo em Maringá: 12 semanas de acompanhamento com médico, enfermagem e psicólogo.",
    "intro": "",
    "sections": [
      {
        "title": "Para quem é indicado",
        "body": "Abandonar o tabagismo significa melhorar a qualidade de vida e a respiração, e evitar doenças e complicações causadas pelo cigarro. Qualquer fumante que queira parar, que já tenha tentado sem sucesso ou que tenha problemas de saúde agravados pelo cigarro pode, e deve, persistir em deixar essas substâncias que fazem tanto mal ao organismo."
      },
      {
        "title": "Como funciona",
        "body": "Um programa de 12 semanas, com acompanhamento individualizado e multiprofissional: suporte médico, de enfermagem e de psicólogo, voltado para os principais problemas enfrentados durante o processo de parar de fumar, como a fissura e a ansiedade. Também podem ser usadas medicações e reposição de nicotina durante o tratamento."
      }
    ],
    "icon": "02"
  },
  {
    "slug": "dpoc",
    "title": "DPOC: Doença Pulmonar Obstrutiva Crônica",
    "seoTitle": "Tratamento de DPOC em Maringá | Dr. Sergio Grava, Pneumologista",
    "description": "Diagnóstico e acompanhamento da DPOC (enfisema e bronquite crônica) em Maringá, com pneumologista e equipe multidisciplinar.",
    "intro": "",
    "sections": [
      {
        "title": "O que é a DPOC?",
        "body": "A DPOC é uma doença respiratória crônica causada principalmente pelo tabagismo ou pela inalação persistente de fumaça. É formada basicamente pela bronquite crônica e pelo enfisema (destruição dos alvéolos pulmonares), em graus variados."
      },
      {
        "title": "Sinais e sintomas",
        "body": "Falta de ar progressiva, chiado no peito, expectoração e fraqueza muscular são alguns exemplos de achados nesta doença."
      },
      {
        "title": "Diagnóstico",
        "body": "O diagnóstico é feito pela história clínica, pelo exame físico, pela tomografia de tórax e pelos exames de função pulmonar."
      },
      {
        "title": "Plano de acompanhamento",
        "body": "Parar de fumar é a primeira providência. Em quem não fuma, deixar de se expor à fumaça e a vapores é fundamental. O tratamento pode ser complementado com medicação, fisioterapia, avaliação nutricional e oxigenoterapia.\n\nNosso plano de acompanhamento da DPOC envolve uma equipe multidisciplinar, com médico, enfermagem, psicologia, fisioterapia e nutrição, para uma abordagem ampla, individual e que respeita as condições clínicas de cada pessoa. O objetivo é diminuir a fraqueza muscular, melhorar as atividades do dia a dia e durante o exercício, e cuidar do estado nutricional."
      }
    ],
    "icon": "03"
  },
  {
    "slug": "asma",
    "title": "Asma",
    "seoTitle": "Tratamento de Asma em Maringá | Dr. Sergio Grava, Pneumologista",
    "description": "Diagnóstico e tratamento de asma em adultos em Maringá: prova de função pulmonar, abordagem da alergia e acompanhamento individualizado.",
    "intro": "",
    "sections": [
      {
        "title": "Definição",
        "body": "Doença inflamatória crônica e reversível das vias aéreas, principalmente associada à alergia respiratória. Geralmente começa na infância, mas pode se manifestar só na idade adulta."
      },
      {
        "title": "Sintomas",
        "body": "Falta de ar, sensação de aperto no peito, chiado, tosse persistente e acordar com falta de ar durante a noite são sintomas típicos desta doença."
      },
      {
        "title": "Diagnóstico",
        "body": "A história clínica e o exame físico detalhado são fundamentais. As provas de função pulmonar ajudam no diagnóstico e no acompanhamento do tratamento. Diagnosticar a alergia também é fundamental."
      },
      {
        "title": "Tratamento",
        "body": "Nosso plano de acompanhamento e tratamento é individualizado. Ele inclui medicamentos para o controle dos sintomas e um planejamento para lidar com a alergia, seja com mudanças no ambiente em relação aos fatores que desencadeiam as crises, seja com medicamentos e/ou imunoterapia. O controle do peso e os exercícios físicos são fundamentais para o bom manejo da doença."
      }
    ],
    "icon": "04"
  }
];

export const getProgram = (slug: string) => programs.find(program => program.slug === slug);
