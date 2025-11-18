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
 * Section de contenu (table: company_sections)
 */
export interface CompanySection {
  id?: string;
  company_id?: string;
  section_number: number; // 1, 2, or 3
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Vidéo de section (table: section_videos)
 */
export interface SectionVideo {
  id?: string;
  company_id?: string;
  video_url: string;
  video_name?: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Photo de section (table: section_photos)
 */
export interface SectionPhoto {
  id?: string;
  company_id?: string;
  photo_url: string;
  photo_name?: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Avantage entreprise (table: company_advantages)
 */
export interface CompanyAdvantage {
  id?: string;
  company_id?: string;
  category: string; // 'Rémunération', 'Confort', 'Vie d'entreprise', etc.
  advantage_text: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Étape du processus de recrutement (table: recruitment_process)
 */
export interface RecruitmentStep {
  id?: string;
  company_id?: string;
  step_description: string;
  display_order?: number;
  created_at?: string;
}

/**
 * Informations légales (table: legal_info)
 */
export interface LegalInfo {
  id?: string;
  company_id?: string;
  raison_sociale?: string;
  code_naf?: string;
  siret?: string;
  siren?: string;
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
  
  // Sections
  section1?: CompanySection;
  section1Videos?: SectionVideo[];
  section2?: CompanySection;
  section2Photos?: SectionPhoto[];
  section3?: CompanySection;
  
  // Advantages & Recruitment
  advantages?: CompanyAdvantage[];
  recruitmentSteps?: RecruitmentStep[];
  
  // Legal
  legalInfo?: LegalInfo;
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
  sections?: CompanySection[];
  videos?: SectionVideo[];
  photos?: SectionPhoto[];
  advantages?: CompanyAdvantage[];
  recruitmentSteps?: RecruitmentStep[];
  legalInfo?: LegalInfo;
}
