# BO Company - Admin Preview

Application de gestion et prévisualisation des fiches entreprise avec interface d'édition complète et stockage Supabase.

## 📋 Description

Cette application permet aux administrateurs de créer, modifier et prévisualiser en temps réel les fiches descriptives d'entreprises. Elle offre une interface complète pour gérer toutes les informations d'une entreprise : informations de base, chiffres clés, structure organisationnelle, présentation, points forts, sections multimédias, avantages, processus de recrutement et informations légales.

## 🚀 Technologies

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Redux Toolkit** - Gestion d'état globale
- **Supabase** - Base de données PostgreSQL et stockage de fichiers
- **Tailwind CSS** - Framework CSS utilitaire
- **Create React App** - Configuration et build

## 🏗️ Architecture

### Frontend
- **React** avec composants fonctionnels et hooks
- **Redux** pour la gestion centralisée de l'état
- **Architecture Editor/Preview** : modification en temps réel avec prévisualisation

### Backend
- **Supabase PostgreSQL** avec 11 tables normalisées
- **Supabase Storage** pour les médias (bannières, photos, vidéos)
- **Row-Level Security (RLS)** pour la sécurité des données

### Structure des données
```
companies (table principale)
├── business_info (informations métier)
├── corporate_structure (structure corporate)
├── key_figures (chiffres clés)
├── presentations (présentation avec réseaux sociaux)
├── strengths (points forts)
├── company_sections (3 sections de contenu)
│   ├── section_videos (vidéos pour Section 1)
│   └── section_photos (photos pour Section 2)
├── company_advantages (avantages catégorisés)
├── recruitment_process (étapes de recrutement)
└── legal_info (informations légales)
```

## 📦 Installation

### Prérequis
- Node.js 16+
- npm ou yarn
- Compte Supabase

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/Meli56/bo-company.git
cd bo-company
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Supabase**

Créez un fichier `.env.local` à la racine :
```env
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_cle_anon
```

4. **Créer la base de données**

Exécutez les scripts SQL dans Supabase SQL Editor :
- `NEW_SECTIONS_SCHEMA.sql` - Création des tables
- `SUPABASE_STORAGE_SETUP.sql` - Configuration du storage

5. **Démarrer l'application**
```bash
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎯 Fonctionnalités

### Édition complète
- ✅ **Informations de base** : Nom, logo, bannière, description
- ✅ **Chiffres clés** : Effectifs, CA, fondation, sites
- ✅ **Structure** : Maison mère et filiales
- ✅ **Présentation** : Description, labels RSE/RH, réseaux sociaux, temps de réactivité
- ✅ **Points forts** : Liste de points clés
- ✅ **Section 1** : Titre, description, vidéos (max 4)
- ✅ **Section 2** : Titre, description, photos (max 25)
- ✅ **Section 3** : Titre et description
- ✅ **Avantages** : 6 catégories, max 60 avantages
- ✅ **Processus de recrutement** : 2-6 étapes
- ✅ **Informations légales** : Raison sociale, NAF, SIRET, SIREN

### Upload de fichiers
- 📤 **Bannières** : PNG, JPG jusqu'à 5MB
- 🎥 **Vidéos** : MP4, MOV jusqu'à 100MB
- 📷 **Photos** : JPG, PNG jusqu'à 5MB
- Drag & drop et sélection depuis l'ordinateur
- Preview en temps réel
- Réorganisation par glisser-déposer (↑↓)

### Prévisualisation
- 👁️ Vue en temps réel des modifications
- Mise en page responsive
- Sections conditionnelles (masquées si vides)
- Gestion de l'historique des versions

### Versioning
- 💾 Sauvegarde de versions datées
- Timeline des modifications
- Restauration de versions antérieures

## 📝 Scripts disponibles

### `npm start`
Lance l'application en mode développement sur [http://localhost:3000](http://localhost:3000)

### `npm run build`
Compile l'application pour la production dans le dossier `build/`

### `npm test`
Lance les tests en mode interactif

## 🔧 Configuration Supabase

### 1. Créer les tables
Exécutez `NEW_SECTIONS_SCHEMA.sql` dans le SQL Editor

### 2. Configurer le Storage
Créez le bucket `company-media` (PUBLIC) et exécutez `SUPABASE_STORAGE_SETUP.sql`

### 3. Politiques RLS
Les politiques permettent :
- Upload pour utilisateurs authentifiés
- Lecture publique des fichiers
- Suppression/modification pour utilisateurs authentifiés

Voir `SUPABASE_STORAGE_SETUP.sql` pour les détails

## 📚 Documentation complémentaire

- `NOUVELLES_SECTIONS_README.md` - Guide des nouvelles sections
- `UPLOAD_FILES_GUIDE.md` - Guide d'upload de fichiers
- `SUPABASE_STORAGE_SETUP.sql` - Configuration Storage

## 🏛️ Structure du projet

```
src/
├── app/
│   └── store.ts                    # Configuration Redux
├── components/
│   ├── EditorPanel.tsx            # Panel d'édition principal
│   ├── PreviewPanel.tsx           # Panel de prévisualisation
│   ├── editor/                    # Composants d'édition
│   │   ├── BasicInfoEditor.tsx
│   │   ├── KeyFiguresEditor.tsx
│   │   ├── Section1Editor.tsx
│   │   ├── Section2Editor.tsx
│   │   ├── AdvantagesEditor.tsx
│   │   └── ...
│   └── preview/                   # Composants de preview
│       ├── BannerUpload.tsx
│       ├── VideoUpload.tsx
│       ├── PhotoUpload.tsx
│       └── ...
├── features/
│   └── company/
│       └── companySlice.ts        # State management
├── services/
│   ├── companyService.ts          # API Supabase
│   └── storageService.ts          # Upload fichiers
├── types/
│   ├── company.types.ts           # Types TypeScript
│   └── index.ts
└── pages/
    └── AdminPage.tsx              # Page principale
```

## 🐛 Résolution de problèmes

### Erreur RLS sur upload
```
StorageApiError: new row violates row-level security policy
```
**Solution** : Exécutez `SUPABASE_STORAGE_SETUP.sql` pour créer les politiques RLS

### Les données ne se chargent pas
- Vérifiez la connexion Supabase dans `.env.local`
- Vérifiez que les tables existent dans Supabase
- Consultez la console du navigateur pour les erreurs

### Build échoue
```bash
npm run build
```
Vérifiez les erreurs TypeScript et corrigez-les

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est privé et propriétaire.

## 👥 Auteurs

- Équipe BO Company

## 🔗 Liens utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation React](https://react.dev)
- [Documentation Redux Toolkit](https://redux-toolkit.js.org)
- [Documentation Tailwind CSS](https://tailwindcss.com)
