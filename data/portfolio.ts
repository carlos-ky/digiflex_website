export type PortfolioCategory =
  | 'Social Media'
  | 'Événementiel'
  | 'Shooting'
  | 'Branding'
  | 'Web';

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  category: PortfolioCategory;
  excerpt: string;
  description: string;
  coverImage: string;
  images?: string[];
  year: string;
  sector?: string;
}

export const clients = [
  { name: 'Coca-Cola BF', initials: 'CC' },
  { name: 'SODIBO Brakina', initials: 'SB' },
  { name: 'DIO BTP', initials: 'D' },
  { name: '4MAT Group', initials: '4M' },
  { name: 'IFMAT Burkina', initials: 'IF' },
  { name: 'La Compétence', initials: 'LC' },
  { name: 'PACSA Trading', initials: 'PT' },
  { name: 'Aqua Faso', initials: 'AF' },
  { name: 'Welahoore', initials: 'W' },
  { name: 'Boima TV', initials: 'BT' },
  { name: 'ECODEV', initials: 'ED' },
  { name: 'TTGI', initials: 'TT' },
];

export const projects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'dio-btp',
    name: 'DIO BTP',
    category: 'Social Media',
    excerpt:
      'Construction d\'une présence digitale complète pour une entreprise BTP.',
    description:
      'Accompagnement complet de DIO BTP sur ses réseaux sociaux : stratégie de contenu, création graphique, shooting photo sur chantier (images drone à Niankorodougou), portraits équipe, affiches publicitaires et d\'engagement, carrousels éducatifs, vidéos de présentation.',
    coverImage: '/projects/dio-btp-cover.jpg',
    year: '2025',
    sector: 'BTP',
  },
  {
    id: '2',
    slug: '4mat-group',
    name: '4MAT Group',
    category: 'Social Media',
    excerpt:
      'Présence digitale et couverture événementielle pour un acteur de l\'énergie solaire.',
    description:
      'Gestion complète des réseaux sociaux de 4MAT Group : affiches produits (onduleurs), couverture de l\'événement iTel Energy, shooting équipe, interviews directeur, témoignages clients.',
    coverImage: '/projects/4mat-cover.jpg',
    year: '2025',
    sector: 'Énergie',
  },
  {
    id: '3',
    slug: 'afro-model-look',
    name: 'Afro Model Look',
    category: 'Branding',
    excerpt:
      '20 books professionnels et comp cards pour une agence de mannequins.',
    description:
      'Création de 20 books de mannequins complets : shooting ranch cowboys, shooting fashion studio, polaroids, portraits. Design et mise en page des comp cards et books finalisés.',
    coverImage: '/projects/afro-cover.jpg',
    year: '2025',
    sector: 'Mode',
  },
  {
    id: '4',
    slug: 'coca-cola-bf',
    name: 'Coca-Cola BF',
    category: 'Événementiel',
    excerpt:
      'Couverture photo et vidéo de la campagne MARK 2025.',
    description:
      'Couverture complète de la campagne MARK 2025 de Coca-Cola Burkina : accompagnement terrain sur une semaine, captation photo et vidéo, production des contenus.',
    coverImage: '/projects/coca-cover.jpg',
    year: '2025',
    sector: 'Boisson',
  },
  {
    id: '5',
    slug: 'lepiphanie',
    name: 'L\'Épiphanie',
    category: 'Shooting',
    excerpt:
      'Du shooting produit à l\'ouverture de boutique.',
    description:
      'Accompagnement complet pour L\'Épiphanie : shooting produit (chaussures femmes), reels produits, vidéo teaser d\'ouverture de boutique, couverture photo et vidéo de la cérémonie d\'ouverture.',
    coverImage: '/projects/epiphanie-cover.jpg',
    year: '2025',
    sector: 'Mode',
  },
  {
    id: '6',
    slug: 'aqua-faso',
    name: 'Aqua Faso',
    category: 'Social Media',
    excerpt:
      'Construire une présence dans un secteur de niche : l\'aquariophilie.',
    description:
      'Construction de la présence digitale d\'Aqua Faso : vidéos de présentation des aquariums, série éducative présentée par un modèle pour démystifier l\'aquariophilie et créer l\'attraction.',
    coverImage: '/projects/aqua-cover.jpg',
    year: '2025',
    sector: 'Aquariophilie',
  },
];
