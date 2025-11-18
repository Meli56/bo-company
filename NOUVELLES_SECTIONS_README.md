# Guide Complet - Nouvelles Sections

## ✅ Ce qui a été fait

### 1. **Architecture SQL** (`NEW_SECTIONS_SCHEMA.sql`)

Nouvelles tables créées :
- `company_sections` : Stocke les 3 sections de contenu (titre + description)
- `section_videos` : Vidéos pour Section 1 (max 4)
- `section_photos` : Photos pour Section 2 (max 25, format 300x200px)
- `company_advantages` : Avantages avec catégories (max 60)
- `recruitment_process` : Étapes de recrutement (2-6 étapes)
- `legal_info` : Informations légales (raison sociale, NAF, SIRET, SIREN)

### 2. **Types TypeScript** (`src/types/company.types.ts`)

Nouvelles interfaces ajoutées :
- `CompanySection` : Section avec titre et description
- `SectionVideo` : Vidéo avec URL et nom
- `SectionPhoto` : Photo avec URL et nom
- `CompanyAdvantage` : Avantage avec catégorie et texte
- `RecruitmentStep` : Étape du processus
- `LegalInfo` : Informations légales

Interface `Company` étendue avec :
- `section1`, `section1Videos`
- `section2`, `section2Photos`
- `section3`
- `advantages`
- `recruitmentSteps`
- `legalInfo`

### 3. **Service Layer** (`src/services/companyService.ts`)

**getCompany()** : Récupère depuis 12 tables différentes
**saveCompany()** : Sauvegarde dans toutes les tables avec gestion de l'ordre

### 4. **Composants Editor** (6 nouveaux)

✅ **Section1Editor.tsx**
- Titre + Description (max 1000 caractères)
- Gestion des vidéos (ajout, suppression, réorganisation)
- Limite : 4 vidéos max

✅ **Section2Editor.tsx**
- Titre + Description (max 1000 caractères)
- Gestion des photos (ajout, suppression, réorganisation)
- Limite : 25 photos max

✅ **Section3Editor.tsx**
- Titre + Description (max 1000 caractères)

✅ **AdvantagesEditor.tsx**
- Select de catégories (6 catégories disponibles)
- Input pour le texte (max 100 caractères)
- Icônes dynamiques selon la catégorie
- Réorganisation (up/down)
- Limite : 60 avantages max

✅ **RecruitmentProcessEditor.tsx**
- Textarea pour chaque étape (max 200 caractères)
- Numérotation automatique
- Réorganisation (up/down)
- Limite : 2-6 étapes
- Avertissement si moins de 2 étapes

✅ **LegalInfoEditor.tsx**
- 4 inputs text (raison sociale, code NAF, SIRET, SIREN)
- Note : "Ces informations ne seront pas visibles par les candidats"

### 5. **Composants Preview** (3 nouveaux)

✅ **CompanySectionsPreview.tsx**
- Affiche les 3 sections avec leurs contenus
- Grid de vidéos (2 colonnes)
- Grid de photos (3 colonnes)

✅ **AdvantagesPreview.tsx**
- Groupement par catégorie
- Badges avec icônes

✅ **RecruitmentProcessPreview.tsx**
- Étapes numérotées
- Message d'avertissement

### 6. **Intégration**

✅ **EditorPanel.tsx** : 6 nouveaux composants ajoutés
✅ **PreviewPanel.tsx** : 3 nouveaux composants ajoutés

## 📋 Instructions pour Déployer

### Étape 1 : Créer les tables dans Supabase

```bash
# Dans Supabase SQL Editor, exécutez le contenu de :
NEW_SECTIONS_SCHEMA.sql
```

### Étape 2 : Vérifier que les tables existent

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'company_sections', 
    'section_videos', 
    'section_photos',
    'company_advantages',
    'recruitment_process',
    'legal_info'
  );
```

### Étape 3 : Initialiser les données pour une entreprise

```sql
-- Remplacez 'your-company-id' par votre ID réel
INSERT INTO company_sections (company_id, section_number, title, description)
VALUES 
  ('your-company-id', 1, NULL, NULL),
  ('your-company-id', 2, NULL, NULL),
  ('your-company-id', 3, NULL, NULL)
ON CONFLICT (company_id, section_number) DO NOTHING;

INSERT INTO legal_info (company_id)
VALUES ('your-company-id')
ON CONFLICT (company_id) DO NOTHING;
```

### Étape 4 : Tester l'application

1. Démarrez l'application : `npm start`
2. Vérifiez que les nouvelles sections apparaissent dans l'éditeur
3. Ajoutez du contenu dans chaque section
4. Cliquez sur "Enregistrer"
5. Vérifiez que les données sont bien dans Supabase
6. Rechargez la page pour vérifier la persistance

## 🎨 Catégories d'Avantages Disponibles

1. **Rémunération** 💰 - Primes, participation, salaires
2. **Confort** 🛋️ - Télétravail, horaires flexibles
3. **Vie d'entreprise** 🎉 - Team building, événements
4. **Santé & Bien-être** 🏥 - Mutuelle, sport
5. **Formation** 📚 - Formations continues, certifications
6. **Avantages sociaux** 🎁 - Tickets restaurant, CE

## 🔧 Fonctionnalités Implémentées

### Réorganisation (Drag-like)
- Boutons ↑ et ↓ pour réorganiser les éléments
- Sauvegarde automatique de l'ordre (display_order)

### Validation
- Limites de caractères avec compteurs
- Limites du nombre d'éléments
- Messages d'avertissement

### Gestion des Médias
- URLs pour les vidéos et photos
- Noms de fichiers optionnels
- Placeholder visuels dans le preview

### État Vide
- Les sections vides ne s'affichent pas dans le preview
- Messages d'aide dans l'éditeur

## 📊 Structure de Données

```typescript
Company {
  // ... autres champs ...
  
  section1: {
    title: string,
    description: string,
    section_number: 1
  },
  section1Videos: [
    { video_url: string, video_name: string, display_order: 0 }
  ],
  
  section2: {
    title: string,
    description: string,
    section_number: 2
  },
  section2Photos: [
    { photo_url: string, photo_name: string, display_order: 0 }
  ],
  
  section3: {
    title: string,
    description: string,
    section_number: 3
  },
  
  advantages: [
    { 
      category: "Rémunération",
      advantage_text: "Prime de participation",
      display_order: 0
    }
  ],
  
  recruitmentSteps: [
    {
      step_description: "Entretien téléphonique",
      display_order: 0
    }
  ],
  
  legalInfo: {
    raison_sociale: "Company SAS",
    code_naf: "6201Z",
    siret: "12345678901234",
    siren: "123456789"
  }
}
```

## 🚀 Prochaines Étapes Possibles

1. **Upload de fichiers** : Implémenter l'upload réel de vidéos/photos vers Supabase Storage
2. **Rich text editor** : Ajouter un éditeur WYSIWYG pour les descriptions
3. **Prévisualisation médias** : Afficher les vraies vidéos/photos dans le preview
4. **Drag & Drop** : Remplacer les boutons ↑↓ par du vrai drag & drop
5. **Validation avancée** : Vérifier les URLs, les formats de fichiers, etc.
6. **Catégories personnalisées** : Permettre d'ajouter des catégories d'avantages

## 📝 Notes Importantes

- Les informations légales ne sont **jamais affichées** aux candidats
- Le processus de recrutement doit avoir **minimum 2 étapes**
- Les sections vides ne s'affichent pas dans le preview
- L'ordre des éléments est géré via `display_order`
- Tous les champs sont optionnels sauf ceux marqués avec *

## ✅ Build Status

**Compilation réussie** avec seulement des warnings ESLint (variables non utilisées).
Aucune erreur TypeScript.

Taille du bundle : 123.76 kB (gzipped)
