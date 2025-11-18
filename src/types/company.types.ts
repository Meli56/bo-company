/**
 * Informations de base de l'entreprise (table: companies)
 */
export interface BasicInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  status?: string;
  plan?: string;
  logo?: string;
  banner_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Informations business (table: business_info)
 */
export interface BusinessInfo {
  id?: string;
  company_id?: string;
  city?: string;
  employees?: string;
  sector?: string;
  subsector?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Informations sur la structure corporate (table: corporate_structure)
 */
export interface CorporateStructure {
  id?: string;
  company_id?: string;
  parent_group?: string;
  parent_company?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Point fort individuel (table: strengths)
 */
export interface Strength {
  id?: string;
  company_id?: string;
  strength: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Points forts de l'entreprise
 */
export interface CompanyStrengths {
  strengths?: Strength[];
}

/**
 * Chiffres clés de l'entreprise (table: key_figures)
 */
export interface KeyFigures {
  id?: string;
  company_id?: string;
  foundation_year?: string;
  revenue?: string;
  salaries?: string;
  salary_policy?: string;
  avg_seniority?: string;
  avg_age?: string;
  gender_parity_index?: string;
  gender_men_percentage?: string;
  gender_women_percentage?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Présentation de l'entreprise (table: presentations)
 */
export interface Presentation {
  id?: string;
  company_id?: string;
  labels_rse?: string[];
  labels_rh?: string[];
  social_networks?: string[];
  reactivity_time?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface complète de l'entreprise combinant tous les types
 * Cette interface représente les données dénormalisées pour l'interface utilisateur
 */
export interface Company extends BasicInfo {
  // Business Info
  city?: string;
  employees?: string;
  sector?: string;
  subsector?: string;
  
  // Corporate Structure
  parent_group?: string;
  parent_company?: string;
  
  // Strengths (format simplifié pour l'UI)
  strengths?: string[];
  
  // Key Figures
  foundation_year?: string;
  revenue?: string;
  salaries?: string;
  salary_policy?: string;
  avg_seniority?: string;
  avg_age?: string;
  gender_parity_index?: string;
  gender_men_percentage?: string;
  gender_women_percentage?: string;
  
  // Presentation
  labelsRse?: string[];
  labelsRh?: string[];
  socialNetworks?: string[];
  reactivityTime?: string;
}

/**
 * Données complètes de l'entreprise avec toutes les tables liées
 */
export interface CompanyData {
  company: BasicInfo;
  businessInfo?: BusinessInfo;
  corporateStructure?: CorporateStructure;
  strengths?: Strength[];
  keyFigures?: KeyFigures;
  presentation?: Presentation;
}
