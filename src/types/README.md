# Types d'entreprise

Ce dossier contient les types TypeScript pour l'entité Company, organisés de manière modulaire pour faciliter la maintenance et la réutilisation.

## Structure des types

### `BasicInfo`
Informations de base de l'entreprise
- `id`: Identifiant unique
- `name`: Nom de l'entreprise
- `description`: Description
- `color`: Couleur principale
- `status`: Statut (ex: "Forfait - Premium")
- `plan`: Plan tarifaire

### `BrandingInfo`
Éléments visuels et branding
- `logo`: URL du logo
- `banner_url`: URL de la bannière

### `BusinessInfo`
Informations métier
- `city`: Ville/Siège social
- `employees`: Nombre d'employés
- `sector`: Secteur d'activité
- `subsector`: Sous-secteur

### `CorporateStructure`
Structure corporate
- `parent_group`: Groupe parent
- `parent_company`: Entreprise parente

### `CompanyStrengths`
Points forts
- `strengths`: Tableau des points forts (max 3)

### `KeyFigures`
Chiffres clés
- `foundation_year`: Année de fondation
- `revenue`: Chiffre d'affaires
- `salaries`: Salaires
- `salary_policy`: Politique de télétravail
- `avg_seniority`: Ancienneté moyenne
- `avg_age`: Moyenne d'âge
- `gender_parity_index`: Indice de parité
- `gender_men_percentage`: % d'hommes
- `gender_women_percentage`: % de femmes

### `Company`
Interface complète qui hérite de tous les types ci-dessus

## Utilisation

```typescript
import { Company, BasicInfo, KeyFigures } from "@/types";

// Utiliser l'interface complète
const company: Company = { ... };

// Ou utiliser des types partiels pour des composants spécifiques
const BasicInfoEditor = ({ data }: { data: BasicInfo }) => { ... };
```

## Avantages

✅ **Séparation des responsabilités** - Chaque type représente une catégorie logique d'informations

✅ **Réutilisabilité** - Les types peuvent être utilisés indépendamment dans les composants

✅ **Maintenabilité** - Plus facile d'ajouter/modifier des champs dans une catégorie spécifique

✅ **Lisibilité** - La structure est claire et auto-documentée

✅ **Type safety** - TypeScript valide l'utilisation correcte des propriétés
