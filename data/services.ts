export interface Service {
  number: string;
  name: string;
  description: string;
  includes: string[];
}

export const services: Service[] = [
  {
    number: '01',
    name: 'Brand Book',
    description:
      'Votre identité visuelle complète, pensée pour durer. Du logo à la charte graphique, chaque élément raconte qui vous êtes.',
    includes: [
      'Diagnostic de marque',
      'Identité visuelle complète',
      'Charte graphique & guidelines',
      'Applications & déclinaisons',
    ],
  },
  {
    number: '02',
    name: 'Site Web',
    description:
      'Un site qui ne fait pas que exister — il convertit. Design premium, responsive, optimisé pour transformer vos visiteurs en clients.',
    includes: [
      'Conception UX/UI sur mesure',
      'Développement responsive',
      'Optimisation SEO',
      'Formation à la prise en main',
    ],
  },
  {
    number: '03',
    name: 'Social Media',
    description:
      'Votre présence sur les réseaux, construite avec stratégie. Pas juste des posts — une machine d\'attraction qui travaille pour vous 24h/24.',
    includes: [
      'Stratégie de contenu',
      'Création graphique & vidéo',
      'Gestion & publication',
      'Reporting & optimisation',
    ],
  },
  {
    number: '04',
    name: 'Publicité Digitale',
    description:
      'Des campagnes publicitaires qui atteignent les bonnes personnes, au bon moment, avec le bon message. Chaque franc investi compte.',
    includes: [
      'Stratégie & ciblage',
      'Création des annonces',
      'Gestion des budgets',
      'Suivi & optimisation des résultats',
    ],
  },
];
