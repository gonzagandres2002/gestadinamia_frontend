export interface Section {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  dateLabel: string;
  readTime: string;
  cover: string;
  videoId?: string;
  sections: Section[];
}

// Ordered newest first.
export const posts: Post[] = [
  {
    slug: "tienes-riesgo-de-preeclampsia",
    title: "¿Tienes riesgo de preeclampsia?",
    cover: "/images/tienes_riesgo_de_preeclampsia.avif",
    videoId: "94l1lSiwt9s",
    excerpt:
      "Las principales condiciones que pueden aumentar el riesgo de preeclampsia durante el embarazo, y cuándo acudir al médico para prevenir complicaciones.",
    dateISO: "2025-11-06",
    dateLabel: "6 de noviembre de 2025",
    readTime: "1 min de lectura",
    sections: [
      {
        paragraphs: [
          "Durante el embarazo, la salud cardiovascular de la madre es fundamental para garantizar el bienestar tanto de ella como del bebé. Sin embargo, existen ciertas condiciones que pueden aumentar el riesgo de desarrollar preeclampsia, una complicación caracterizada por el aumento de la presión arterial durante la gestación.",
          "En Gestadinamia queremos ayudarte a reconocer a tiempo los factores que pueden predisponerte a esta condición, para que puedas recibir una atención preventiva adecuada.",
        ],
      },
      {
        heading: "Factores de riesgo más importantes",
        paragraphs: [
          "Si presentas alguna de las siguientes condiciones, es recomendable consultar a tu médico para diseñar una estrategia de prevención:",
        ],
        list: [
          "Preeclampsia en un embarazo anterior.",
          "Hipertensión arterial crónica.",
          "Diabetes (pregestacional o gestacional).",
          "Enfermedad renal previa.",
          "Embarazo múltiple (gemelar o más).",
          "Primer embarazo, o un intervalo largo entre embarazos.",
          "Edad menor de 20 o mayor de 35 años.",
          "Obesidad o antecedentes familiares de preeclampsia.",
        ],
      },
      {
        heading: "¿Qué hacer si tienes varios factores de riesgo?",
        paragraphs: [
          "Si identificas dos o más de estas condiciones, es fundamental acudir a tu médico. Existen medidas de prevención basadas en evidencia científica que pueden marcar una gran diferencia en tu salud y la de tu bebé.",
        ],
      },
      {
        heading: "Mensaje final",
        paragraphs: [
          "Detectar a tiempo los factores de riesgo es clave. En Gestadinamia contamos con un equipo multidisciplinario preparado para acompañarte en cada etapa de tu embarazo, con una atención personalizada y segura. Tu salud y la de tu bebé son nuestra prioridad.",
        ],
      },
    ],
  },
  {
    slug: "habitos-alimentarios",
    title: "¿Estás comiendo bien durante el embarazo?",
    cover: "/images/tienes_buenos_habitos_alimentarios.avif",
    videoId: "Wiw4M4DdyZY",
    excerpt:
      "La nutrición en el embarazo es clave para el desarrollo del bebé y el bienestar de la madre. Un test rápido para revisar tus hábitos alimentarios.",
    dateISO: "2025-06-25",
    dateLabel: "25 de junio de 2025",
    readTime: "2 min de lectura",
    sections: [
      {
        paragraphs: [
          "La nutrición en el embarazo es clave para el desarrollo del bebé y el bienestar de la madre. Durante esta etapa, el cuerpo aumenta su demanda de nutrientes esenciales como el calcio, el hierro y el ácido fólico. Muchas veces, sin embargo, no somos conscientes de si realmente nos estamos alimentando de forma adecuada.",
          "Desde Gestadinamia te invitamos a realizar un test rápido, diseñado por nuestra nutricionista y dietista Alejandra, para ayudarte a identificar si tus hábitos alimentarios son saludables durante la gestación.",
        ],
      },
      {
        heading: "¿Cómo funciona el test?",
        paragraphs: [
          "El test incluye una serie de preguntas simples sobre tu alimentación diaria y semanal. Por cada respuesta positiva sumas 2 puntos; si la respuesta es negativa, no sumas puntos. Al final, sumas tus puntos y consultas tu nivel.",
        ],
        list: [
          "¿Consumes frutas y verduras todos los días?",
          "¿Incluyes fuentes de proteína y de hierro en tus comidas principales?",
          "¿Tomas suficiente agua a lo largo del día?",
          "¿Limitas los ultraprocesados, el azúcar y el exceso de sal?",
        ],
      },
      {
        heading: "Recomendaciones finales",
        paragraphs: [
          "Si tu puntaje no fue el mejor, no te preocupes: el primer paso es reconocerlo. Pequeños cambios pueden tener un gran impacto en tu salud y la de tu bebé. En Gestadinamia te acompañamos con orientación profesional basada en evidencia científica.",
        ],
      },
    ],
  },
  {
    slug: "como-se-pone-el-mapa",
    title: "¿Cómo se pone el MAPA?",
    cover: "/images/como_se_pone_el_mapa.avif",
    videoId: "p4BPXGY24ZQ",
    excerpt:
      "Así instalamos el Monitor Ambulatorio de Presión Arterial para monitorear la presión durante la gestación a lo largo de 24 horas.",
    dateISO: "2025-06-12",
    dateLabel: "12 de junio de 2025",
    readTime: "1 min de lectura",
    sections: [
      {
        paragraphs: [
          "En Gestadinamia seguimos comprometidos con acompañar y entender a profundidad los procesos del embarazo. Hoy queremos contarte cómo se instala un equipo médico clave en nuestra investigación: el MAPA, sigla de Monitoreo Ambulatorio de Presión Arterial.",
          "Este procedimiento lo realizamos en nuestro laboratorio de reproducción, donde también se procesan las muestras de nuestras gestantes, con el acompañamiento de una de ellas para mostrar cómo funciona el proceso.",
        ],
      },
      {
        heading: "¿Qué es el MAPA y para qué sirve?",
        paragraphs: [
          "El MAPA es un dispositivo portátil, más pequeño que un teléfono, que mide la presión arterial de manera automática. Su función es registrar la presión a lo largo de 24 horas, incluso mientras duermes, lo que nos permite tener una visión completa y precisa del comportamiento cardiovascular durante la gestación. Esta información es esencial para detectar posibles riesgos y tomar decisiones clínicas a tiempo.",
        ],
      },
      {
        heading: "¿Qué sucede después?",
        paragraphs: [
          "Al completar las 24 horas, el equipo se retira y los datos recogidos los interpreta el equipo médico de Gestadinamia. Esta información permite evaluar el estado cardiovascular de la persona gestante y tomar medidas si es necesario.",
          "Este tipo de herramientas son fundamentales para entender el embarazo de forma dinámica y profunda. En Gestadinamia, cada paso cuenta, y cada dato nos ayuda a cuidar mejor la salud de quienes hacen parte de nuestro estudio.",
        ],
      },
    ],
  },
  {
    slug: "cambios-durante-la-gestacion",
    title: "Cambios durante la gestación",
    cover: "/images/cambios_durante_la_gestacion.avif",
    videoId: "iHs8gdQzQkg",
    excerpt:
      "La gestación se divide en tres trimestres, y en cada uno tu cuerpo y tus emociones atraviesan cambios profundos. Un recorrido por cada etapa.",
    dateISO: "2025-06-05",
    dateLabel: "5 de junio de 2025",
    readTime: "1 min de lectura",
    sections: [
      {
        paragraphs: [
          "La gestación es uno de los procesos más complejos y asombrosos que existen. Se divide en tres fases: el primer trimestre, el segundo y el tercero, que se acerca al momento del parto. En cada una de estas etapas, tu cuerpo y tus emociones atraviesan cambios profundos.",
        ],
      },
      {
        heading: "Primer trimestre: el inicio de todo",
        paragraphs: [
          "Durante este periodo es común experimentar náuseas y vómitos, debidos principalmente al aumento de una hormona clave del embarazo: la gonadotropina coriónica humana (hCG). Tu cuerpo se adapta rápidamente al nuevo proceso, y eso puede provocar también cambios en tu estado de ánimo y tu energía. Es completamente normal.",
        ],
      },
      {
        heading: "Segundo trimestre: el corazón y la placenta",
        paragraphs: [
          "En esta etapa intermedia, la placenta empieza a crecer y a asumir sus funciones principales: nutrir, oxigenar y proteger a tu bebé. Por eso es tan importante cuidar la alimentación con una dieta balanceada y rica en nutrientes. Además, entre las semanas 18 y 20 muchas personas sienten por primera vez los movimientos del bebé, un momento único que marca un nuevo vínculo.",
        ],
      },
      {
        heading: "Tercer trimestre: el cuerpo se prepara",
        paragraphs: [
          "Al acercarse el parto, tu cuerpo comienza a generar contracciones preparatorias. No son las definitivas, pero forman parte del proceso natural que te alista para el gran momento. Es importante estar atenta a los cambios físicos y emocionales.",
        ],
      },
      {
        heading: "Acompaña tu proceso",
        paragraphs: [
          "Todos estos cambios son normales. Por eso te animamos a llevar un diario: escribe lo que sientes, los síntomas nuevos, los movimientos del bebé. Ese registro te conectará con tu proceso y será una guía para entender mejor tu propia evolución.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
