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
      projectSummary: 'GameVault demuestra ejecución full-stack: frontend en React, backend en Laravel, arquitectura limpia, despliegue en contenedores e integración con APIs externas.',
    },
    about: {
      title: 'Sobre mí',
      subtitle: 'Liderazgo de tecnología · Arquitectura · Cloud · IA',
      summary: 'Líder tecnológico ejecutivo con 18+ años impulsando organizaciones de software, arquitectura empresarial, transformación cloud e iniciativas prácticas de IA en fintech, banca y telecomunicaciones.',
      skillsTitle: 'Habilidades técnicas',
      experienceTitle: 'Experiencia',
      projectTitle: 'Este proyecto',
      projectSummary: 'GameVault muestra ejecución práctica full-stack con React, Laravel, arquitectura limpia, despliegue contenedorizado e integración real con APIs.',
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
      projectSummary: 'GameVault showcases practical full-stack execution: React frontend, Laravel backend, clean architecture, containerized deployment and external API integration.',
    },
    about: {
      title: 'About',
      subtitle: 'Technology leadership · Architecture · Cloud · AI',
      summary: 'Executive technology leader with 18+ years driving software organizations, enterprise architecture, cloud transformation and practical AI initiatives across fintech, banking and telecommunications.',
      skillsTitle: 'Technical Skills',
      experienceTitle: 'Experience',
      projectTitle: 'This Project',
      projectSummary: 'GameVault demonstrates practical full-stack execution with React, Laravel, clean architecture, containerized deployment and real API integration.',
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
