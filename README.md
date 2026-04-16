# Digiflex — Site Web

Site vitrine de Digiflex, agence de branding, marketing et communication premium à Ouagadougou.

**Stack :** Next.js 14 · React 18 · Tailwind CSS · Framer Motion · TypeScript

---

## Prérequis

- **Node.js 18+** — Télécharger sur [nodejs.org](https://nodejs.org)
- **Git** — Télécharger sur [git-scm.com](https://git-scm.com)
- **Un compte GitHub** — [github.com](https://github.com)
- **Un compte Vercel** — [vercel.com](https://vercel.com) (créer avec GitHub)

---

## Installation en local

```bash
# 1. Décompresser le zip et entrer dans le dossier
cd digiflex-website

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# → http://localhost:3000
```

---

## Déploiement sur Vercel

### Étape 1 — Push sur GitHub

```bash
# Initialiser le repo Git
git init
git add .
git commit -m "Initial commit - Digiflex website"

# Créer un repo sur GitHub (via github.com ou CLI)
# Puis connecter et push :
git remote add origin https://github.com/TON-USERNAME/digiflex-website.git
git branch -M main
git push -u origin main
```

### Étape 2 — Connecter à Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "Add New Project"
3. Importer le repo `digiflex-website` depuis GitHub
4. Laisser les paramètres par défaut (Vercel détecte Next.js automatiquement)
5. Cliquer "Deploy"
6. Le site est en ligne en ~60 secondes sur une URL Vercel temporaire

### Étape 3 — Connecter le domaine Hostinger

1. Dans Vercel → Settings → Domains → Ajouter `digiflex-burkina.com`
2. Vercel te donne des enregistrements DNS à configurer
3. Aller dans le panneau Hostinger → DNS Zone Editor
4. Ajouter les enregistrements fournis par Vercel :
   - Type A : `76.76.21.21`
   - Type CNAME : `cname.vercel-dns.com` pour le `www`
5. Attendre la propagation DNS (quelques minutes à 24h)
6. Le site est live sur `digiflex-burkina.com`

---

## Structure du projet

```
digiflex-website/
├── app/                    # Pages (routing Next.js App Router)
│   ├── layout.tsx          # Layout global (fonts, nav, footer)
│   ├── page.tsx            # Page d'accueil
│   ├── services/page.tsx   # Page services
│   ├── portfolio/page.tsx  # Page portfolio
│   ├── blog/page.tsx       # Page blog
│   ├── about/page.tsx      # Page à propos
│   └── contact/page.tsx    # Page contact
├── components/             # Composants réutilisables
├── data/                   # Données en dur (portfolio, blog, services)
├── lib/                    # Configuration (numéros, URLs, etc.)
├── public/                 # Images et fichiers statiques
│   ├── logo-white.png      # Logo blanc (transparent)
│   ├── logo-black.png      # Logo noir (transparent)
│   ├── icon.png            # Monogramme
│   ├── clients/            # Logos des clients (à ajouter)
│   ├── projects/           # Images du portfolio (à ajouter)
│   └── team/               # Photos équipe (à ajouter)
└── tailwind.config.ts      # Design system Digiflex
```

---

## Personnalisation

### Modifier les informations de l'agence
→ `lib/config.ts` : numéro, email, URLs réseaux sociaux

### Ajouter un projet au portfolio
→ `data/portfolio.ts` : ajouter un objet au tableau `projects`
→ Placer l'image cover dans `public/projects/`

### Ajouter un article de blog
→ `data/blog.ts` : ajouter un objet au tableau `blogPosts`
→ Placer l'image cover dans `public/blog/`

### Modifier les services
→ `data/services.ts`

### Ajouter un logo client
→ `data/portfolio.ts` : modifier le tableau `clients`
→ Placer le logo dans `public/clients/`

### Ajouter la photo du fondateur
→ Placer la photo dans `public/team/carlos-ky.jpg`
→ Mettre à jour les composants `AboutPreview.tsx` et `app/about/page.tsx`

---

## Palette Digiflex

| Couleur | Hex | Usage |
|---------|-----|-------|
| Noir | `#0E0E0E` | Fond principal, texte |
| Blanc cassé | `#F8F6F0` | Fond clair, texte sur noir |
| Gris graphite | `#4A4A4A` | Texte secondaire |
| Gris moyen | `#9A9A9A` | Labels, sous-titres |
| Gris clair | `#E8E8E8` | Bordures, séparateurs |

**Aucune autre couleur ne doit être utilisée sur le site.**

---

## Phase 2 (à venir)

- Dashboard admin avec Supabase
- Portfolio et blog dynamiques
- Formulaire de contact fonctionnel
- Optimisation SEO avancée
- Analytics

---

© 2026 Digiflex — Build bold. Grow real.
