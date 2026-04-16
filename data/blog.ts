export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'pourquoi-poster-sans-strategie-ne-donne-pas-resultats',
    title: 'Pourquoi poster sans stratégie ne donnera jamais de résultats',
    excerpt:
      'La différence entre avoir une page Facebook et avoir une présence digitale qui génère des clients.',
    content: 'Article à venir prochainement.',
    coverImage: '/blog/post-1.jpg',
    date: 'Bientôt',
    author: 'Digiflex',
    readTime: '5 min',
    category: 'Stratégie',
  },
  {
    id: '2',
    slug: 'vrai-cout-ne-pas-investir-image',
    title: 'Le vrai coût de ne pas investir dans votre image',
    excerpt:
      'Chaque jour sans communication professionnelle est un jour où vos concurrents avancent et vous reculez.',
    content: 'Article à venir prochainement.',
    coverImage: '/blog/post-2.jpg',
    date: 'Bientôt',
    author: 'Digiflex',
    readTime: '4 min',
    category: 'Branding',
  },
  {
    id: '3',
    slug: '4-millions-burkinabe-facebook',
    title: '4,4 millions de Burkinabè sur Facebook — et vous n\'y êtes pas ?',
    excerpt:
      'Les chiffres du digital au Burkina Faso qui devraient convaincre tout entrepreneur d\'investir dans sa visibilité.',
    content: 'Article à venir prochainement.',
    coverImage: '/blog/post-3.jpg',
    date: 'Bientôt',
    author: 'Digiflex',
    readTime: '6 min',
    category: 'Marché',
  },
];
