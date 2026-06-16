import { useAppStore } from '@/store'

type Language = 'es' | 'en'

type TranslationMap = {
  header: {
    home: string
    explore: string
    popular: string
    topRated: string
    upcoming: string
    compare: string
    favorites: string
    about: string
    contact: string
    donate: string
    search: string
    searchPlaceholder: string
    menu: string
    themeLight: string
    themeDark: string
    languageEs: string
    languageEn: string
  }
  footer: {
    discover: string
    explore: string
    about: string
    poweredBy: string
    aboutMe: string
    contact: string
    trending: string
    popular: string
    topRated: string
    upcoming: string
    allGames: string
    compare: string
    favorites: string
    description: string
  }
  home: {
    trendingNow: string
    hottest: string
    viewAll: string
    allTimePopular: string
    defined: string
    topRated: string
    highest: string
    upcoming: string
    anticipated: string
    exploreAll: string
    viewGame: string
    aboutThisProject: string
    projectSummary: string
  }
  about: {
    title: string
    subtitle: string
    summary: string
    skillsTitle: string
    experienceTitle: string
    projectTitle: string
    projectSummary: string
    viewResume: string
    years: string
    teams: string
    projects: string
    solutions: string
  }
  contact: {
    title: string
    summary: string
    email: string
    location: string
    github: string
    linkedin: string
    availability: string
    availabilityNote: string
  }
  donate: {
    title: string
    subtitle: string
    summary: string
    selectAmount: string
    customAmount: string
    oneTime: string
    monthly: string
    donateButton: string
    thankYouTitle: string
    thankYouMessage: string
    donateAgain: string
    whyDonate: string
    whyDonateText: string
  }
  pages: {
    gamesTitle: string
    popularTitle: string
    topRatedTitle: string
    upcomingTitle: string
    searchTitle: string
    compareTitle: string
  }
}

const TEXT: Record<Language, TranslationMap> = {
  es: {
    header: {
      home: 'Inicio',
      explore: 'Explorar',
      popular: 'Populares',
      topRated: 'Mejor valorados',
      upcoming: 'Próximos',
      compare: 'Comparar',
      favorites: 'Favoritos',
      about: 'Sobre mí',
      contact: 'Contacto',
      donate: 'Donar',
      search: 'Buscar juegos',
      searchPlaceholder: 'Buscar juegos…',
      menu: 'Abrir menú',
      themeLight: 'Cambiar a modo claro',
      themeDark: 'Cambiar a modo oscuro',
      languageEs: 'ES',
      languageEn: 'EN',
    },
    footer: {
      discover: 'Descubrir',
      explore: 'Explorar',
      about: 'Acerca de',
      poweredBy: 'Impulsado por',
      aboutMe: 'Sobre mí',
      contact: 'Contacto',
      trending: 'Tendencias',
      popular: 'Populares',
      topRated: 'Mejor valorados',
      upcoming: 'Próximos',
      allGames: 'Todos los juegos',
      compare: 'Comparar',
      favorites: 'Favoritos',
      description: 'Tu plataforma para descubrir videojuegos. Explora miles de juegos, guarda favoritos y compara títulos lado a lado.',
    },
    home: {
      trendingNow: 'Tendencias ahora',
      hottest: 'Los juegos más populares del momento',
      viewAll: 'Ver todo',
      allTimePopular: 'Más populares',
      defined: 'Juegos que marcaron generaciones',
      topRated: 'Mejor valorados',
      highest: 'Las puntuaciones más altas de Metacritic',
      upcoming: 'Próximos lanzamientos',
      anticipated: 'Los juegos más esperados',
      exploreAll: 'Explorar todo',
      viewGame: 'Ver juego',
      aboutThisProject: 'Sobre este proyecto',
      projectSummary: 'GameVault demuestra arquitectura frontend moderna: React 19, Vite, Zustand, TanStack Query, localStorage cache y conexion directa a RAWG API sin backend.',
    },
    about: {
      title: 'Sobre mí',
      subtitle: 'Liderazgo de tecnología · Arquitectura · Cloud · IA',
      summary: 'Líder tecnológico ejecutivo con 18+ años impulsando organizaciones de software, arquitectura empresarial, transformación cloud e iniciativas prácticas de IA en fintech, banca y telecomunicaciones.',
      skillsTitle: 'Habilidades técnicas',
      experienceTitle: 'Experiencia',
      projectTitle: 'Este proyecto',
      projectSummary: 'GameVault muestra ejecución práctica: React 19, Zustand para estado persistente en localStorage, cache con TTL y consumo directo de RAWG API.',
      viewResume: 'Ver resumen',
      years: 'Años de experiencia',
      teams: 'Equipos liderados',
      projects: 'Proyectos empresariales',
      solutions: 'Soluciones entregadas',
    },
    contact: {
      title: 'Hablemos',
      summary: 'Abierto a conversaciones de liderazgo de ingeniería, arquitectura y roles tipo CTO. Conectemos estrategia con resultados medibles.',
      email: 'Correo',
      location: 'Ubicación',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      availability: 'Disponible para proyectos',
      availabilityNote: 'Disponible para iniciativas de liderazgo, modernización, arquitectura y transformación con IA.',
    },
    donate: {
      title: 'Apoya este proyecto',
      subtitle: 'Tu contribución mantiene GameVault vivo',
      summary: 'GameVault es un proyecto gratuito y de código abierto. Si encuentras valor en esta plataforma, considera apoyar su desarrollo con una donación única o recurrente.',
      selectAmount: 'Selecciona un monto',
      customAmount: 'Monto personalizado',
      oneTime: 'Una vez',
      monthly: 'Mensual',
      donateButton: 'Donar',
      thankYouTitle: '¡Gracias por tu apoyo!',
      thankYouMessage: 'Tu generosidad ayuda a mantener GameVault gratuito, rápido y en mejora constante. Cada contribución, por pequeña que sea, marca la diferencia.',
      donateAgain: 'Hacer otra donación',
      whyDonate: '¿Por qué donar?',
      whyDonateText: 'Tu apoyo cubre costos de infraestructura, APIs, dominio y permite dedicar tiempo a nuevas funcionalidades, mejoras de rendimiento y mantenimiento continuo. GameVault no tiene anuncios ni vende datos — solo existe gracias a usuarios como tú.',
    },
    pages: {
      gamesTitle: 'Explorar juegos',
      popularTitle: 'Juegos populares',
      topRatedTitle: 'Juegos mejor valorados',
      upcomingTitle: 'Próximos lanzamientos',
      searchTitle: 'Buscar juegos',
      compareTitle: 'Comparar juegos',
    },
  },
  en: {
    header: {
      home: 'Home',
      explore: 'Explore',
      popular: 'Popular',
      topRated: 'Top Rated',
      upcoming: 'Upcoming',
      compare: 'Compare',
      favorites: 'Favorites',
      about: 'About Me',
      contact: 'Contact',
      donate: 'Donate',
      search: 'Search games',
      searchPlaceholder: 'Search games…',
      menu: 'Open menu',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      languageEs: 'ES',
      languageEn: 'EN',
    },
    footer: {
      discover: 'Discover',
      explore: 'Explore',
      about: 'About',
      poweredBy: 'Powered by',
      aboutMe: 'About Me',
      contact: 'Contact',
      trending: 'Trending',
      popular: 'Popular',
      topRated: 'Top Rated',
      upcoming: 'Upcoming',
      allGames: 'All Games',
      compare: 'Compare',
      favorites: 'Favorites',
      description: 'Your video game discovery platform. Explore thousands of games, track favorites, and compare titles side by side.',
    },
    home: {
      trendingNow: 'Trending Now',
      hottest: 'The hottest games everyone is playing',
      viewAll: 'View All',
      allTimePopular: 'All-Time Popular',
      defined: 'Games that defined generations',
      topRated: 'Top Rated',
      highest: 'Highest metacritic scores of all time',
      upcoming: 'Upcoming Releases',
      anticipated: 'Most anticipated games coming soon',
      exploreAll: 'Explore All',
      viewGame: 'View Game',
      aboutThisProject: 'About This Project',
      projectSummary: 'GameVault showcases modern frontend architecture: React 19, Vite, Zustand, TanStack Query, localStorage cache and direct RAWG API integration — no backend required.',
    },
    about: {
      title: 'About',
      subtitle: 'Technology leadership · Architecture · Cloud · AI',
      summary: 'Executive technology leader with 18+ years driving software organizations, enterprise architecture, cloud transformation and practical AI initiatives across fintech, banking and telecommunications.',
      skillsTitle: 'Technical Skills',
      experienceTitle: 'Experience',
      projectTitle: 'This Project',
      projectSummary: 'GameVault demonstrates practical frontend execution with React 19, Zustand persistent state in localStorage, TTL cache and direct RAWG API integration.',
      viewResume: 'View Resume',
      years: 'Years Experience',
      teams: 'Teams Led',
      projects: 'Enterprise Projects',
      solutions: 'Solutions Delivered',
    },
    contact: {
      title: 'Let\'s Talk',
      summary: 'Open to engineering leadership, architecture and CTO-track conversations. Let\'s turn strategy into measurable outcomes.',
      email: 'Email',
      location: 'Location',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      availability: 'Available for projects',
      availabilityNote: 'Available for leadership, modernization, architecture and AI transformation initiatives.',
    },
    donate: {
      title: 'Support this project',
      subtitle: 'Your contribution keeps GameVault alive',
      summary: 'GameVault is a free, open-source project. If you find value in this platform, consider supporting its development with a one-time or recurring donation.',
      selectAmount: 'Select an amount',
      customAmount: 'Custom amount',
      oneTime: 'One-time',
      monthly: 'Monthly',
      donateButton: 'Donate',
      thankYouTitle: 'Thank you for your support!',
      thankYouMessage: 'Your generosity helps keep GameVault free, fast, and constantly improving. Every contribution, no matter how small, makes a difference.',
      donateAgain: 'Make another donation',
      whyDonate: 'Why donate?',
      whyDonateText: 'Your support covers infrastructure costs, APIs, domain, and allows dedicating time to new features, performance improvements, and ongoing maintenance. GameVault has no ads and sells no data — it only exists thanks to users like you.',
    },
    pages: {
      gamesTitle: 'Explore Games',
      popularTitle: 'Popular Games',
      topRatedTitle: 'Top Rated Games',
      upcomingTitle: 'Upcoming Releases',
      searchTitle: 'Search Games',
      compareTitle: 'Compare Games',
    },
  },
}

export function useI18n() {
  const language = useAppStore((s) => s.language)
  return TEXT[language]
}

export function getLanguage() {
  return useAppStore.getState().language
}

export type { Language }
