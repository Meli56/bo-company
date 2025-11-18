# Mapping Base de Données - Interface TypeScript

## Architecture

L'application utilise une architecture normalisée avec des tables séparées reliées par des foreign keys.

## Tables et Mapping

### 1. `companies` (Table principale)
**Interface TypeScript:** `BasicInfo`

| Colonne DB | Propriété TS | Type | Description |
|------------|--------------|------|-------------|
| id | id | uuid | Identifiant unique |
| name | name | string | Nom de l'entreprise |
| description | description | string | Description |
| color | color | string | Couleur de branding |
| logo | logo | string | URL du logo |
| banner_url | banner_url | string | URL de la bannière |
| status | status | string | Statut de l'entreprise |
| plan | plan | string | Plan de l'entreprise |

### 2. `business_info`
**Interface TypeScript:** `BusinessInfo`

| Colonne DB | Propriété TS | Type | Description |
|------------|--------------|------|-------------|
| company_id | company_id | uuid | FK vers companies |
| city | city | string | Ville |
| employees | employees | string | Nombre d'employés |
| sector | sector | string | Secteur |
| subsector | subsector | string | Sous-secteur |

### 3. `corporate_structure`
**Interface TypeScript:** `CorporateStructure`

| Colonne DB | Propriété TS | Type | Description |
|------------|--------------|------|-------------|
| company_id | company_id | uuid | FK vers companies |
| parent_group | parent_group | string | Groupe parent |
| parent_company | parent_company | string | Société mère |

### 4. `key_figures`
**Interface TypeScript:** `KeyFigures`

| Colonne DB | Propriété TS | Type | Description |
|------------|--------------|------|-------------|
| company_id | company_id | uuid | FK vers companies |
| foundation_year | foundation_year | string | Année de création |
| revenue | revenue | string | Chiffre d'affaires |
| salaries | salaries | string | Salaires |
| salary_policy | salary_policy | string | Politique salariale |
| avg_seniority | avg_seniority | string | Ancienneté moyenne |
| avg_age | avg_age | string | Âge moyen |
| gender_parity_index | gender_parity_index | string | Index de parité |
| gender_men_percentage | gender_men_percentage | string | % hommes |
| gender_women_percentage | gender_women_percentage | string | % femmes |

### 5. `presentations`
**Interface TypeScript:** `Presentation`

| Colonne DB | Propriété TS (UI) | Type | Description |
|------------|-------------------|------|-------------|
| company_id | company_id | uuid | FK vers companies |
| labels_rse | labelsRse | string[] | Labels RSE |
| labels_rh | labelsRh | string[] | Labels RH |
| social_networks | socialNetworks | string[] | Réseaux sociaux |
| reactivity_time | reactivityTime | string | Temps de réponse |

**Note:** Le mapping snake_case (DB) → camelCase (TS) est géré dans `companyService.ts`

### 6. `strengths`
**Interface TypeScript:** `Strength`

| Colonne DB | Propriété TS | Type | Description |
|------------|--------------|------|-------------|
| company_id | company_id | uuid | FK vers companies |
| strength | strength | string | Point fort |
| display_order | display_order | number | Ordre d'affichage |

**Note:** Pour l'UI, les strengths sont transformés en `string[]`

### 7. `company_versions`
Table de versioning stockant un snapshot complet dans le champ `data` (JSONB).

## Service Layer

### `getCompany(id: string): Promise<Company>`
- Récupère les données depuis toutes les tables
- Combine les résultats en un objet `Company` plat
- Transforme snake_case → camelCase pour les presentations

### `saveCompany(company: Company): Promise<void>`
- Divise l'objet `Company` en plusieurs enregistrements
- Utilise `upsert` pour créer ou mettre à jour
- Transforme camelCase → snake_case pour les presentations
- Gère les strengths en supprimant et recréant les enregistrements

## Interface Unifiée `Company`

L'interface `Company` combine toutes les données dans un format plat pour simplifier l'utilisation dans les composants React :

```typescript
interface Company {
  // De companies
  id, name, description, color, logo, banner_url, status, plan
  
  // De business_info
  city, employees, sector, subsector
  
  // De corporate_structure
  parent_group, parent_company
  
  // De key_figures
  foundation_year, revenue, salaries, salary_policy, avg_seniority,
  avg_age, gender_parity_index, gender_men_percentage, gender_women_percentage
  
  // De presentations (avec mapping camelCase)
  labelsRse, labelsRh, socialNetworks, reactivityTime
  
  // De strengths (simplifié en tableau de strings)
  strengths: string[]
}
```

## Avantages de cette Architecture

✅ **Normalisation** : Pas de redondance de données
✅ **Performance** : Requêtes optimisées avec foreign keys
✅ **Maintenabilité** : Structure claire et modulaire
✅ **Simplicité UI** : Interface `Company` plate pour les composants
✅ **Versioning** : Snapshots complets dans `company_versions`
