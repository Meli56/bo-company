/**
 * Informations de base de l'entreprise
 */
export interface BasicInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  status?: string;
  plan?: string;
}

/**
 * Informations visuelles et branding
 */
export interface BrandingInfo {
  logo?: string;
  banner_url?: string;
}

/**
 * Informations business
 */
export interface BusinessInfo {
  city?: string;
  employees?: string;
  sector?: string;
  subsector?: string;
}

/**
 * Informations sur la structure corporate
 */
export interface CorporateStructure {
  parent_group?: string;
  parent_company?: string;
}

/**
 * Points forts de l'entreprise
 */
export interface CompanyStrengths {
  strengths?: string[];
}

/**
 * Chiffres clés de l'entreprise
 */
export interface KeyFigures {
  foundation_year?: string;
  revenue?: string;
  salaries?: string;
  salary_policy?: string;
  avg_seniority?: string;
  avg_age?: string;
  gender_parity_index?: string;
  gender_men_percentage?: string;
  gender_women_percentage?: string;
}
/**
 * Présentation de l'entreprise
 */
export interface Presentation {
  description: string;
  labelsRse: string[];
  labelsRh: string[];
  socialNetworks: string[];
  reactivityTime: string;
}
/**
 * Interface complète de l'entreprise combinant tous les types
 */
export interface Company
  extends BasicInfo,
    BrandingInfo,
    BusinessInfo,
    CorporateStructure,
    CompanyStrengths,
    KeyFigures {}
