# BO Company - Admin Preview

Application de gestion et prévisualisation des fiches entreprise avec interface d'édition complète et stockage Supabase.

## 📋 Description

Cette application permet aux administrateurs de créer, modifier et prévisualiser en temps réel les fiches descriptives d'entreprises. Elle offre une interface complète pour gérer toutes les informations d'une entreprise : informations de base, chiffres clés, structure organisationnelle, présentation, points forts, sections multimédias, avantages, processus de recrutement et informations légales.

L'interface est divisée en deux panneaux : **Édition** (gauche) et **Prévisualisation** (droite), permettant de voir instantanément les modifications.

## 📚 Table des Matières

- [🚀 Technologies](#-technologies)
- [🏗️ Architecture](#️-architecture)
- [📦 Installation](#-installation)
- [🎯 Fonctionnalités](#-fonctionnalités)
- [📝 Scripts disponibles](#-scripts-disponibles)
- [🔧 Configuration Supabase](#-configuration-supabase)
- [📚 Documentation et Ressources](#-documentation-et-ressources)
- [💻 Types TypeScript](#-types-typescript)
- [🏛️ Structure du projet](#️-structure-du-projet)
- [🐛 Résolution de problèmes](#-résolution-de-problèmes)
- [🔄 Gestion d'État avec Redux](#-gestion-détat-avec-redux)
- [🎨 Styling avec Tailwind CSS](#-styling-avec-tailwind-css)
- [🤝 Contribution](#-contribution)
- [🔗 Ressources & Liens Utiles](#-ressources--liens-utiles)

## 🚀 Technologies

- **React 19** - Framework frontend avec hooks modernes
- **TypeScript** - Typage statique pour une meilleure maintenabilité
- **Redux Toolkit** - Gestion d'état globale avec Redux store
- **Supabase** - Base de données PostgreSQL et stockage de fichiers
- **Tailwind CSS** - Framework CSS utilitaire pour le styling
- **React Hot Toast** - Système de notifications modernes et non-bloquantes
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

- **Node.js 16+** (recommandé : Node.js 18 ou 20)
- **npm** ou **yarn**
- **Compte Supabase** (le projet utilise une instance configurée, mais vous pouvez utiliser la vôtre)

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone <votre-repository>
cd bo-company
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration Supabase**

⚠️ **Important** : Le projet contient actuellement des credentials Supabase directement dans le code source (`src/lib/supabaseClient.ts`). Pour la production, il est recommandé de :

- Utiliser des variables d'environnement
- Ne jamais commiter les credentials dans Git
- Configurer Row-Level Security (RLS) sur Supabase

**Pour utiliser votre propre instance Supabase** :

Créez un fichier `.env.local` (méthode recommandée) :

```env
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_cle_anon
```

Puis ajoutez à `supabaseClient.ts` :

```typescript
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;
```

4. **Créer la structure de base de données**

Dans votre dashboard Supabase (SQL Editor), créez les **11 tables** suivantes :

**Tables principales** :

- `companies` - Informations de base (nom, logo, bannière, description)
- `business_info` - Secteur d'activité, ville, effectifs
- `corporate_structure` - Maison mère, groupe parent
- `key_figures` - Chiffres clés (CA, année de fondation, parité)
- `presentations` - Description, labels RSE/RH, réseaux sociaux
- `strengths` - Liste des points forts
- `legal_info` - SIRET, SIREN, raison sociale

**Tables de contenu** :

- `company_sections` - 3 sections de contenu personnalisables
- `section_videos` - Vidéos de la Section 1 (max 4)
- `section_photos` - Photos de la Section 2 (max 25)

**Tables avancées** :

- `company_advantages` - Avantages par catégories (max 60)
- `recruitment_process` - Étapes de recrutement (2-6 étapes)

5. **Configurer le Storage Supabase**

Dans votre dashboard Supabase, créez un bucket :

- **Nom** : `company-media`
- **Visibilité** : PUBLIC
- **Types de fichiers** : Images (PNG, JPG), Vidéos (MP4, MOV)

Configurez les politiques RLS pour autoriser :

- ✅ Upload pour utilisateurs authentifiés
- ✅ Lecture publique
- ✅ Suppression/modification pour utilisateurs authentifiés

6. **Démarrer l'application**

```bash
npm start
```

L'application sera accessible sur **[http://localhost:3000](http://localhost:3000)**

## 🎯 Fonctionnalités

### Édition complète

#### 📝 Informations Générales

- ✅ **Informations de base** : Nom, logo, bannière, description, couleur
- ✅ **Chiffres clés** : Effectifs, CA, fondation, parité, ancienneté moyenne, âge moyen
- ✅ **Structure corporate** : Maison mère, groupe parent, filiales
- ✅ **Présentation** : Description détaillée, labels RSE/RH, réseaux sociaux, temps de réactivité
- ✅ **Points forts** : Liste de points clés (ordre personnalisable)
- ✅ **Informations légales** : Raison sociale, code NAF, SIRET, SIREN

#### 🎬 Sections de Contenu

- ✅ **Section 1 (Vidéos)** : Titre, description + jusqu'à **4 vidéos** avec titres
- ✅ **Section 2 (Photos)** : Titre, description + jusqu'à **25 photos** avec légendes
- ✅ **Section 3 (Texte)** : Titre et description uniquement

#### 🎁 Avantages Entreprise (6 Catégories)

Gestion complète des avantages avec **6 catégories** prédéfinies (max 60 avantages) :

1. **💰 Rémunération** - Primes, intéressement, participation, bonus
2. **🛋️ Confort** - Télétravail, horaires flexibles, parking, équipements
3. **🎉 Vie d'entreprise** - Événements, team building, afterworks, clubs
4. **🏥 Santé & Bien-être** - Mutuelle, sport, massages, conciergerie
5. **📚 Formation** - Formations professionnelles, certifications, mentorat
6. **🎁 Avantages sociaux** - RTT, titres restaurant, CE, tickets cinéma

#### 📋 Processus de Recrutement

- ✅ **2 à 6 étapes** personnalisables avec numéro, titre et description

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

```bash
npm start
```

Lance l'application en **mode développement** sur [http://localhost:3000](http://localhost:3000)

- ⚡ Hot reload automatique
- 🔍 Source maps pour le debugging
- ⚠️ Affichage des erreurs en temps réel
- 🌐 Accessible depuis le réseau local

### `npm run build`

```bash
npm run build
```

Compile l'application pour la **production** dans le dossier `build/`

- 📦 Minification du code
- 🗜️ Compression des assets
- ⚡ Optimisation des performances
- 📊 Bundle analysis disponible
- ✅ Code prêt pour le déploiement

### `npm run eject`

```bash
npm run eject
# ⚠️ Opération irréversible !
```

Éjecte la configuration CRA pour un contrôle total

- ⚠️ **Attention** : Cette opération est irréversible
- 🔧 Accès complet à Webpack, Babel, ESLint
- 💡 Recommandé uniquement si absolument nécessaire

## 🔧 Configuration Supabase

### Structure de la base de données

Le projet utilise **11 tables normalisées** pour une architecture scalable et maintenable :

```sql
-- Exemple de structure (à adapter selon vos besoins)

-- Table principale
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  logo TEXT,
  banner_url TEXT,
  status TEXT,
  plan TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Autres tables reliées par company_id (foreign key)
-- business_info, corporate_structure, key_figures, etc.
```

### Configuration du Storage

**Bucket requis** : `company-media` (PUBLIC)

**Structure des dossiers** :

```
company-media/
├── banners/          # Bannières d'entreprise (5MB max)
├── logos/            # Logos d'entreprise
├── videos/           # Vidéos Section 1 (100MB max)
└── photos/           # Photos Section 2 (5MB max)
```

**Politiques RLS recommandées** :

- ✅ Lecture publique pour tous les fichiers
- ✅ Upload/Update/Delete pour utilisateurs authentifiés uniquement

### Client Supabase

Le client est configuré dans `src/lib/supabaseClient.ts` :

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hadkaxjamiencndrmcrf.supabase.co";
const supabaseAnonKey = "eyJhbGci..."; // Clé anonyme

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

⚠️ **Sécurité** : Pour la production, utilisez des variables d'environnement et ne commitez jamais les credentials.

## 📚 Documentation et Ressources

### Documentation du Projet

#### TOAST_MIGRATION.md

Guide complet du système de notifications avec React Hot Toast :

- Migration de `alert()` vers `toast()`
- Configuration du Toaster
- Types de toasts (succès, erreur, loading, custom)
- Personnalisation et styling
- Exemples d'utilisation avancés

### 📖 Tutoriels React (dossier `/learn`)

Le projet inclut **4 guides React complets** (2,671 lignes au total) pour apprendre et maîtriser les concepts avancés :

#### 1. ReactComponentJsx.md (712 lignes)

Fondamentaux React et JSX :

- 📦 Création de composants fonctionnels
- 🎨 Syntaxe JSX et expressions
- 🔄 Props et composition de composants
- 📋 Listes et keys
- 🎯 Conditional rendering
- 🏗️ Structure d'une application React moderne

#### 2. ReactUseEffect.md (400 lignes)

Gestion des effets de bord :

- 🔄 Hook useEffect en détail
- ⏰ Cycles de vie des composants
- 🌐 Appels API et fetch de données
- 🧹 Cleanup et nettoyage
- ⚠️ Pièges courants et solutions
- 🎯 Dependency array expliqué

#### 3. ReactUseContext.md (785 lignes)

Gestion d'état global :

- 🌍 Context API de React
- 🚀 Introduction à Zustand (alternative à Redux)
- 🔗 Éviter le prop drilling
- 💾 Patterns de state management
- 🎨 Bonnes pratiques d'architecture
- ⚡ Comparaison Context vs Redux vs Zustand

#### 4. ReactOptimisation.md (774 lignes)

Performance et optimisation :

- ⚡ useMemo pour mémoriser les calculs
- 🎯 useCallback pour mémoriser les fonctions
- 🔒 React.memo pour éviter les re-renders
- 📊 Mesure de performance (React DevTools)
- 🐛 Identifier les problèmes de performance
- ✅ Checklist d'optimisation

**💡 Ces guides sont parfaits pour** :

- Débutants voulant comprendre React en profondeur
- Développeurs intermédiaires cherchant à optimiser leur code
- Référence rapide pour les concepts avancés

## 💻 Types TypeScript

Le projet utilise **TypeScript** avec des interfaces complètes définies dans `src/types/company.types.ts` :

```typescript
// Interfaces principales
interface BasicInfo { name, description, logo, banner, color... }
interface BusinessInfo { city, employees, sector, subsector... }
interface CorporateStructure { parent_company, parent_group... }
interface KeyFigures { foundation_year, revenue, salaries... }
interface Presentation { labels_rse, labels_rh, social_networks... }
interface Strength { strength, display_order... }
interface CompanySection { section_number, title, description... }
interface SectionVideo { video_url, video_title, display_order... }
interface SectionPhoto { photo_url, photo_caption, display_order... }
interface CompanyAdvantage { category, advantage, display_order... }
interface RecruitmentStep { step_number, title, description... }
interface LegalInfo { legal_name, siret, siren, naf_code... }

// Type principal consolidé
interface Company extends BasicInfo {
  businessInfo?: BusinessInfo;
  corporateStructure?: CorporateStructure;
  keyFigures?: KeyFigures;
  presentation?: Presentation;
  strengths?: Strength[];
  sections?: CompanySection[];
  advantages?: CompanyAdvantage[];
  recruitmentProcess?: RecruitmentStep[];
  legalInfo?: LegalInfo;
}
```

**Avantages** :

- ✅ Autocomplétion dans l'IDE
- ✅ Détection d'erreurs à la compilation
- ✅ Documentation du code auto-générée
- ✅ Refactoring sécurisé


✅ **Services** (companyService, storageService)

- Appels API Supabase avec mocks
- Upload/suppression de fichiers
- Gestion des erreurs

✅ **Redux Slice** (companySlice)

- Actions synchrones (updateDraft, revertDraft)
- Actions asynchrones (fetchCompany, saveCompanyData)
- Workflow complet d'édition

✅ **Composants Éditeurs**

- BasicInfoEditor, KeyFiguresEditor, AdvantagesEditor
- Rendu et interactions
- Validation des entrées

✅ **Composants Preview**

- BannerUpload, VideoUpload, PhotoUpload
- Validation fichiers (type, taille)
- Drag & drop

✅ **Tests d'Intégration**

- App, AdminPage
- Workflow complet
- Sauvegarde et notifications

📖 **Documentation complète** : Consultez [TESTING.md](./TESTING.md) pour le guide détaillé.

## 🏛️ Structure du projet

```
bo-company/
├── src/
│   ├── app/
│   │   └── store.ts                           # Configuration Redux store
│   │
│   ├── components/
│   │   ├── EditorPanel.tsx                   # Panel d'édition (gauche)
│   │   ├── PreviewPanel.tsx                  # Panel de prévisualisation (droite)
│   │   │
│   │   ├── editor/                           # 11 composants d'édition
│   │   │   ├── BasicInfoEditor.tsx           # Nom, logo, description
│   │   │   ├── KeyFiguresEditor.tsx          # Chiffres clés
│   │   │   ├── ParentCompanyEditor.tsx       # Structure corporate
│   │   │   ├── PresentationEditor.tsx        # Présentation & labels
│   │   │   ├── StrengthsEditor.tsx           # Points forts
│   │   │   ├── Section1Editor.tsx            # Section 1 + vidéos
│   │   │   ├── Section2Editor.tsx            # Section 2 + photos
│   │   │   ├── Section3Editor.tsx            # Section 3
│   │   │   ├── AdvantagesEditor.tsx          # Avantages (6 catégories)
│   │   │   ├── RecruitmentProcessEditor.tsx  # Processus de recrutement
│   │   │   └── LegalInfoEditor.tsx           # Informations légales
│   │   │
│   │   └── preview/                          # 10 composants de prévisualisation
│   │       ├── BannerUpload.tsx              # Upload bannière (5MB max)
│   │       ├── KeyFiguresSection.tsx         # Affichage chiffres clés
│   │       ├── PresentationSection.tsx       # Affichage présentation
│   │       ├── StrengthsSection.tsx          # Affichage points forts
│   │       ├── CompanySectionsPreview.tsx    # Affichage 3 sections
│   │       ├── VideoUpload.tsx               # Upload vidéos (100MB max)
│   │       ├── PhotoUpload.tsx               # Upload photos (5MB max)
│   │       ├── AdvantagesPreview.tsx         # Affichage avantages
│   │       ├── RecruitmentProcessPreview.tsx # Affichage processus
│   │       └── VersionTimeline.tsx           # Timeline des versions
│   │
│   ├── features/
│   │   └── company/
│   │       └── companySlice.ts               # Redux slice (state management)
│   │
│   ├── services/
│   │   ├── companyService.ts                 # API Supabase (CRUD operations)
│   │   └── storageService.ts                 # Upload/delete fichiers
│   │
│   ├── lib/
│   │   └── supabaseClient.ts                 # Configuration client Supabase
│   │
│   ├── types/
│   │   ├── company.types.ts                  # Types TypeScript (interfaces)
│   │   └── index.ts                          # Export types
│   │
│   ├── pages/
│   │   └── AdminPage.tsx                     # Page principale (editor + preview)
│   │
│   ├── App.tsx                                # Composant racine + Toaster
│   ├── index.tsx                              # Point d'entrée React
│   └── index.css                              # Styles Tailwind CSS
│
├── learn/                                     # 📚 Tutoriels React
│   ├── ReactComponentJsx.md                  # Composants & JSX (712 lignes)
│   ├── ReactUseEffect.md                     # useEffect & effets (400 lignes)
│   ├── ReactUseContext.md                    # Context API & Zustand (785 lignes)
│   └── ReactOptimisation.md                  # Optimisation & perf (774 lignes)
│
├── public/                                    # Fichiers statiques
├── .vscode/                                   # Configuration VS Code
│   └── settings.json                          # Paramètres Jest, ESLint, Prettier
├── package.json                               # Dépendances npm
├── jest.config.js                             # Configuration Jest
├── tailwind.config.js                         # Configuration Tailwind
├── tsconfig.json                              # Configuration TypeScript
├── README.md                                  # Documentation projet
└── TOAST_MIGRATION.md                        # Guide React Hot Toast
```

## 🐛 Résolution de problèmes

### Erreur de connexion Supabase

```
Error: Invalid Supabase URL or API key
```

**Solution** :

- Vérifiez les credentials dans `src/lib/supabaseClient.ts`
- Assurez-vous que l'URL et la clé API sont correctes
- Vérifiez votre connexion internet

### Erreur RLS sur upload

```
StorageApiError: new row violates row-level security policy
```

**Solution** :

- Allez dans votre dashboard Supabase → Storage → Policies
- Créez des politiques pour autoriser les uploads :
  - `Enable insert for authenticated users only`
  - `Enable read for all users` (pour les fichiers publics)
  - `Enable update/delete for authenticated users only`

### Les données ne se chargent pas

**Diagnostic** :

1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs dans l'onglet Console
3. Vérifiez les requêtes réseau dans l'onglet Network

**Solutions** :

- ✅ Vérifiez que les **11 tables** existent dans Supabase
- ✅ Vérifiez la connexion dans `src/lib/supabaseClient.ts`
- ✅ Vérifiez que le bucket `company-media` existe et est PUBLIC
- ✅ Testez la connexion Supabase avec une requête simple

### Erreur TypeScript au build

```bash
npm run build
# Erreur: Type 'X' is not assignable to type 'Y'
```

**Solution** :

- Vérifiez les types dans `src/types/company.types.ts`
- Assurez-vous que tous les composants utilisent les bons types
- Utilisez `npm run build` pour identifier toutes les erreurs

### Les toasts ne s'affichent pas

**Solution** :

- Vérifiez que `<Toaster />` est bien dans `App.tsx`
- Vérifiez l'import : `import { Toaster } from 'react-hot-toast';`
- Consultez `TOAST_MIGRATION.md` pour plus de détails

### Erreur d'upload de fichiers

```
Error: File size exceeds limit
```

**Limites de taille** :

- Bannières : **5 MB** max (PNG, JPG)
- Vidéos : **100 MB** max (MP4, MOV)
- Photos : **5 MB** max (JPG, PNG)

**Solution** : Compressez vos fichiers avant upload

### Application ne démarre pas

```bash
npm start
# Error: Cannot find module 'react'
```

**Solution** :

```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
npm start
```

## 🔄 Gestion d'État avec Redux

Le projet utilise **Redux Toolkit** pour la gestion d'état globale :

### Configuration du Store

```typescript
// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/company/companySlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});
```

### Company Slice

Le slice Redux (`src/features/company/companySlice.ts`) gère toutes les données de l'entreprise :

**State** :

```typescript
{
  company: Company | null,        // Données complètes de l'entreprise
  loading: boolean,               // État de chargement
  error: string | null,           // Gestion des erreurs
  isDirty: boolean,               // Modifications non sauvegardées
}
```

**Actions principales** :

- `setCompany()` - Définir les données de l'entreprise
- `updateBasicInfo()` - Mettre à jour les infos de base
- `updateKeyFigures()` - Mettre à jour les chiffres clés
- `updatePresentation()` - Mettre à jour la présentation
- `addStrength()` / `removeStrength()` - Gérer les points forts
- `addAdvantage()` / `removeAdvantage()` - Gérer les avantages
- `updateSection()` - Mettre à jour une section
- Et bien d'autres...

**Avantages de Redux Toolkit** :

- ✅ State global accessible partout
- ✅ DevTools pour debugger
- ✅ Immutabilité automatique (Immer)
- ✅ Actions typées avec TypeScript

## 🎨 Styling avec Tailwind CSS

Le projet utilise **Tailwind CSS** pour le styling :

**Configuration** : `tailwind.config.js`

**Classes couramment utilisées** :

- Layout : `flex`, `grid`, `space-y-4`, `gap-4`
- Couleurs : `bg-blue-500`, `text-gray-700`, `border-gray-300`
- Responsive : `sm:`, `md:`, `lg:`, `xl:`
- Hover/Focus : `hover:bg-blue-600`, `focus:ring-2`

**Exemple de composant** :

```tsx
<div className="bg-white rounded-lg shadow-md p-6 space-y-4">
  <h2 className="text-2xl font-bold text-gray-800">Titre</h2>
  <p className="text-gray-600">Description</p>
</div>
```

## 📄 Licence

Ce projet est **privé et propriétaire**.

Tous droits réservés © 2025 BO Company

## 👥 Auteurs & Crédits

- **Équipe BO Company** - Développement et maintenance
- **Technologies Open Source** - React, Redux, Tailwind, Supabase

## 🔗 Ressources & Liens Utiles

### Documentation Officielle

- 📘 [React 19 Documentation](https://react.dev) - Framework frontend
- 📕 [Redux Toolkit](https://redux-toolkit.js.org) - State management
- 📗 [TypeScript](https://www.typescriptlang.org/docs) - Typage statique
- 📙 [Tailwind CSS](https://tailwindcss.com/docs) - Framework CSS
- 📓 [Supabase Docs](https://supabase.com/docs) - Backend as a Service
- 🍞 [React Hot Toast](https://react-hot-toast.com) - Notifications

### Tutoriels Intégrés (dossier `/learn`)

- 📖 **ReactComponentJsx.md** - Composants et JSX
- 📖 **ReactUseEffect.md** - Effets de bord
- 📖 **ReactUseContext.md** - State management global
- 📖 **ReactOptimisation.md** - Performance

### Outils de Développement

- 🔧 [React DevTools](https://react.dev/learn/react-developer-tools) - Debugger React
- 🔧 [Redux DevTools](https://github.com/reduxjs/redux-devtools) - Debugger Redux
- 🔧 [VS Code](https://code.visualstudio.com/) - Éditeur recommandé

### Ressources Supabase

- 🗄️ [SQL Editor](https://supabase.com/docs/guides/database) - Création de tables
- 📦 [Storage](https://supabase.com/docs/guides/storage) - Upload de fichiers
- 🔒 [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) - Sécurité
