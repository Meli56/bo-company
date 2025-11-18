# Guide de Migration - Architecture Normalisée

## ✅ Changements Effectués

### 1. Types TypeScript (`src/types/company.types.ts`)
- ✅ Ajout des interfaces pour chaque table
- ✅ Interface `Company` mise à jour avec tous les champs en camelCase
- ✅ Nouvelle interface `CompanyData` pour les données brutes

### 2. Service Layer (`src/services/companyService.ts`)
- ✅ `getCompany()` : Récupère depuis 6 tables et combine les résultats
- ✅ `saveCompany()` : Divise et sauvegarde dans les tables appropriées
- ✅ Mapping automatique snake_case ↔ camelCase pour presentations

### 3. Redux (`src/features/company/companySlice.ts`)
- ✅ Aucun changement nécessaire (déjà compatible)

### 4. Composants React
- ✅ Aucun changement nécessaire
- ✅ Tous les composants utilisent l'interface `Company` unifiée

## 🗄️ Étapes de Migration de la Base de Données

### Étape 1 : Créer les nouvelles tables

Exécutez ce SQL dans Supabase SQL Editor :

```sql
-- Créer toutes les nouvelles tables
-- (Utilisez le script SQL fourni précédemment)
```

### Étape 2 : Migrer les données existantes

```sql
-- Migrer business_info
INSERT INTO public.business_info (company_id, city, employees, sector, subsector)
SELECT id, city, employees, sector, subsector
FROM public.companies
WHERE id IS NOT NULL;

-- Migrer corporate_structure
INSERT INTO public.corporate_structure (company_id, parent_group, parent_company)
SELECT id, parent_group, parent_company
FROM public.companies
WHERE id IS NOT NULL;

-- Migrer key_figures
INSERT INTO public.key_figures (
  company_id, foundation_year, revenue, salaries, salary_policy,
  avg_seniority, avg_age, gender_parity_index, 
  gender_men_percentage, gender_women_percentage
)
SELECT 
  id, foundation_year, revenue, salaries, salary_policy,
  avg_seniority, avg_age, gender_parity_index, 
  gender_men_percentage, gender_women_percentage
FROM public.companies
WHERE id IS NOT NULL;

-- Migrer presentations
INSERT INTO public.presentations (company_id, labels_rse, labels_rh, social_networks, reactivity_time)
SELECT id, "labelsRse", "labelsRh", "socialNetworks", "reactivityTime"
FROM public.companies
WHERE id IS NOT NULL;

-- Migrer strengths (depuis jsonb vers table)
INSERT INTO public.strengths (company_id, strength, display_order)
SELECT 
  c.id,
  elem.value::text,
  elem.ordinality - 1
FROM public.companies c
CROSS JOIN LATERAL jsonb_array_elements_text(c.strengths) WITH ORDINALITY AS elem
WHERE c.strengths IS NOT NULL;
```

### Étape 3 : Nettoyer l'ancienne structure

**⚠️ ATTENTION : Faites une sauvegarde avant !**

```sql
-- Créer une table de backup
CREATE TABLE companies_backup AS SELECT * FROM companies;

-- Supprimer les colonnes migrées
ALTER TABLE public.companies
DROP COLUMN IF EXISTS city,
DROP COLUMN IF EXISTS employees,
DROP COLUMN IF EXISTS sector,
DROP COLUMN IF EXISTS subsector,
DROP COLUMN IF EXISTS parent_group,
DROP COLUMN IF EXISTS parent_company,
DROP COLUMN IF EXISTS foundation_year,
DROP COLUMN IF EXISTS revenue,
DROP COLUMN IF EXISTS salaries,
DROP COLUMN IF EXISTS salary_policy,
DROP COLUMN IF EXISTS avg_seniority,
DROP COLUMN IF EXISTS avg_age,
DROP COLUMN IF EXISTS gender_parity_index,
DROP COLUMN IF EXISTS gender_men_percentage,
DROP COLUMN IF EXISTS gender_women_percentage,
DROP COLUMN IF EXISTS "labelsRse",
DROP COLUMN IF EXISTS "labelsRh",
DROP COLUMN IF EXISTS "socialNetworks",
DROP COLUMN IF EXISTS "reactivityTime",
DROP COLUMN IF EXISTS strengths;
```

## 🧪 Tests

### Test 1 : Vérifier la lecture
```typescript
// Dans la console du navigateur (après login)
const company = await getCompany('votre-company-id');
console.log(company);
// Devrait afficher toutes les données combinées
```

### Test 2 : Vérifier l'écriture
1. Modifiez des données dans l'interface
2. Cliquez sur "Enregistrer"
3. Vérifiez dans Supabase que les données sont dans les bonnes tables

### Test 3 : Vérifier les versions
1. Sauvegardez plusieurs versions
2. Vérifiez que `company_versions.data` contient le snapshot complet

## 📊 Vérification dans Supabase

```sql
-- Vérifier qu'une entreprise a bien toutes ses données
SELECT 
  c.name,
  bi.city,
  cs.parent_group,
  kf.revenue,
  p.labels_rse,
  COUNT(s.id) as nb_strengths
FROM companies c
LEFT JOIN business_info bi ON bi.company_id = c.id
LEFT JOIN corporate_structure cs ON cs.company_id = c.id
LEFT JOIN key_figures kf ON kf.company_id = c.id
LEFT JOIN presentations p ON p.company_id = c.id
LEFT JOIN strengths s ON s.company_id = c.id
WHERE c.id = 'votre-company-id'
GROUP BY c.id, c.name, bi.city, cs.parent_group, kf.revenue, p.labels_rse;
```

## 🔄 Rollback (en cas de problème)

```sql
-- Restaurer depuis le backup
DROP TABLE companies;
ALTER TABLE companies_backup RENAME TO companies;
```

## 📝 Notes Importantes

1. **Performances** : Les requêtes font 6 JOINs. Pour optimiser, vous pouvez :
   - Ajouter des index sur les foreign keys (déjà fait)
   - Utiliser une vue matérialisée si nécessaire

2. **Transactions** : Les sauvegardes font plusieurs requêtes. Envisagez d'utiliser des transactions Supabase si nécessaire.

3. **Null Safety** : Toutes les tables liées utilisent `maybeSingle()` pour gérer les cas où les données n'existent pas encore.

4. **Mapping** : Le mapping snake_case ↔ camelCase est géré dans `companyService.ts` uniquement pour `presentations`.

## 🚀 Prochaines Étapes

1. ✅ Code TypeScript adapté
2. ⏳ Créer les tables dans Supabase
3. ⏳ Migrer les données
4. ⏳ Tester l'application
5. ⏳ Nettoyer l'ancienne structure
6. ⏳ Déployer en production
