import { supabase } from "../lib/supabaseClient";
import { 
  Company, 
  CompanySection, 
  SectionVideo, 
  SectionPhoto,
  CompanyAdvantage,
  RecruitmentStep,
  LegalInfo
} from "../types/company.types";

/**
 * Récupère toutes les données d'une entreprise depuis les tables normalisées
 */
export async function getCompany(id: string): Promise<Company> {
  // 1. Récupérer les infos de base
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();
  
  if (companyError) throw companyError;

  // 2. Récupérer business_info
  const { data: businessInfo } = await supabase
    .from("business_info")
    .select("*")
    .eq("company_id", id)
    .maybeSingle();

  // 3. Récupérer corporate_structure
  const { data: corporateStructure } = await supabase
    .from("corporate_structure")
    .select("*")
    .eq("company_id", id)
    .maybeSingle();

  // 4. Récupérer key_figures
  const { data: keyFigures } = await supabase
    .from("key_figures")
    .select("*")
    .eq("company_id", id)
    .maybeSingle();

  // 5. Récupérer presentation
  const { data: presentation } = await supabase
    .from("presentations")
    .select("*")
    .eq("company_id", id)
    .maybeSingle();

  // 6. Récupérer strengths
  const { data: strengths } = await supabase
    .from("strengths")
    .select("*")
    .eq("company_id", id)
    .order("display_order", { ascending: true });

  // 7. Récupérer les sections
  const { data: sections } = await supabase
    .from("company_sections")
    .select("*")
    .eq("company_id", id)
    .order("section_number", { ascending: true });

  // 8. Récupérer les vidéos (Section 1)
  const { data: videos } = await supabase
    .from("section_videos")
    .select("*")
    .eq("company_id", id)
    .order("display_order", { ascending: true });

  // 9. Récupérer les photos (Section 2)
  const { data: photos } = await supabase
    .from("section_photos")
    .select("*")
    .eq("company_id", id)
    .order("display_order", { ascending: true });

  // 10. Récupérer les avantages
  const { data: advantages } = await supabase
    .from("company_advantages")
    .select("*")
    .eq("company_id", id)
    .order("display_order", { ascending: true });

  // 11. Récupérer le processus de recrutement
  const { data: recruitmentSteps } = await supabase
    .from("recruitment_process")
    .select("*")
    .eq("company_id", id)
    .order("display_order", { ascending: true });

  // 12. Récupérer les infos légales
  const { data: legalInfo } = await supabase
    .from("legal_info")
    .select("*")
    .eq("company_id", id)
    .maybeSingle();

  // Combiner toutes les données dans un objet Company plat
  return {
    ...company,
    city: businessInfo?.city,
    employees: businessInfo?.employees,
    sector: businessInfo?.sector,
    subsector: businessInfo?.subsector,
    parent_group: corporateStructure?.parent_group,
    parent_company: corporateStructure?.parent_company,
    foundation_year: keyFigures?.foundation_year,
    revenue: keyFigures?.revenue,
    salaries: keyFigures?.salaries,
    salary_policy: keyFigures?.salary_policy,
    avg_seniority: keyFigures?.avg_seniority,
    avg_age: keyFigures?.avg_age,
    gender_parity_index: keyFigures?.gender_parity_index,
    gender_men_percentage: keyFigures?.gender_men_percentage,
    gender_women_percentage: keyFigures?.gender_women_percentage,
    labelsRse: presentation?.labels_rse,
    labelsRh: presentation?.labels_rh,
    socialNetworks: presentation?.social_networks,
    reactivityTime: presentation?.reactivity_time,
    strengths: strengths?.map(s => s.strength) || [],
    section1: sections?.find(s => s.section_number === 1),
    section1Videos: videos || [],
    section2: sections?.find(s => s.section_number === 2),
    section2Photos: photos || [],
    section3: sections?.find(s => s.section_number === 3),
    advantages: advantages || [],
    recruitmentSteps: recruitmentSteps || [],
    legalInfo: legalInfo || undefined,
  };
}

/**
 * Sauvegarde les données d'une entreprise dans les tables normalisées
 */
export async function saveCompany(company: Company) {
  const { id } = company;

  // 1. Sauvegarder les infos de base dans companies
  const { error: companyError } = await supabase
    .from("companies")
    .upsert({
      id,
      name: company.name,
      description: company.description,
      color: company.color,
      logo: company.logo,
      banner_url: company.banner_url,
      status: company.status,
      plan: company.plan,
      updated_at: new Date().toISOString(),
    });

  if (companyError) throw companyError;

  // 2. Sauvegarder business_info
  if (company.city || company.employees || company.sector || company.subsector) {
    const { error: businessError } = await supabase
      .from("business_info")
      .upsert({
        company_id: id,
        city: company.city,
        employees: company.employees,
        sector: company.sector,
        subsector: company.subsector,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id'
      });
    
    if (businessError) throw businessError;
  }

  // 3. Sauvegarder corporate_structure
  if (company.parent_group || company.parent_company) {
    const { error: structureError } = await supabase
      .from("corporate_structure")
      .upsert({
        company_id: id,
        parent_group: company.parent_group,
        parent_company: company.parent_company,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id'
      });
    
    if (structureError) throw structureError;
  }

  // 4. Sauvegarder key_figures
  if (company.foundation_year || company.revenue || company.salaries) {
    const { error: figuresError } = await supabase
      .from("key_figures")
      .upsert({
        company_id: id,
        foundation_year: company.foundation_year,
        revenue: company.revenue,
        salaries: company.salaries,
        salary_policy: company.salary_policy,
        avg_seniority: company.avg_seniority,
        avg_age: company.avg_age,
        gender_parity_index: company.gender_parity_index,
        gender_men_percentage: company.gender_men_percentage,
        gender_women_percentage: company.gender_women_percentage,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id'
      });
    
    if (figuresError) throw figuresError;
  }

  // 5. Sauvegarder presentation
  if (company.labelsRse || company.labelsRh || company.socialNetworks || company.reactivityTime) {
    const { error: presentationError } = await supabase
      .from("presentations")
      .upsert({
        company_id: id,
        labels_rse: company.labelsRse || [],
        labels_rh: company.labelsRh || [],
        social_networks: company.socialNetworks || [],
        reactivity_time: company.reactivityTime,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id'
      });
    
    if (presentationError) throw presentationError;
  }

  // 6. Sauvegarder strengths
  if (company.strengths && company.strengths.length > 0) {
    // Supprimer les anciens strengths
    await supabase
      .from("strengths")
      .delete()
      .eq("company_id", id);

    // Insérer les nouveaux
    const strengthsData = company.strengths.map((strength, index) => ({
      company_id: id,
      strength,
      display_order: index,
    }));

    const { error: strengthsError } = await supabase
      .from("strengths")
      .insert(strengthsData);
    
    if (strengthsError) throw strengthsError;
  }

  // 7. Sauvegarder Section 1
  if (company.section1) {
    const { error: section1Error } = await supabase
      .from("company_sections")
      .upsert({
        company_id: id,
        section_number: 1,
        title: company.section1.title,
        description: company.section1.description,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id,section_number'
      });
    
    if (section1Error) throw section1Error;
  }

  // 8. Sauvegarder les vidéos de Section 1
  if (company.section1Videos && company.section1Videos.length > 0) {
    await supabase.from("section_videos").delete().eq("company_id", id);
    
    const videosData = company.section1Videos.map((video, index) => ({
      company_id: id,
      video_url: video.video_url,
      video_name: video.video_name,
      display_order: index,
    }));

    const { error: videosError } = await supabase
      .from("section_videos")
      .insert(videosData);
    
    if (videosError) throw videosError;
  }

  // 9. Sauvegarder Section 2
  if (company.section2) {
    const { error: section2Error } = await supabase
      .from("company_sections")
      .upsert({
        company_id: id,
        section_number: 2,
        title: company.section2.title,
        description: company.section2.description,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id,section_number'
      });
    
    if (section2Error) throw section2Error;
  }

  // 10. Sauvegarder les photos de Section 2
  if (company.section2Photos && company.section2Photos.length > 0) {
    await supabase.from("section_photos").delete().eq("company_id", id);
    
    const photosData = company.section2Photos.map((photo, index) => ({
      company_id: id,
      photo_url: photo.photo_url,
      photo_name: photo.photo_name,
      display_order: index,
    }));

    const { error: photosError } = await supabase
      .from("section_photos")
      .insert(photosData);
    
    if (photosError) throw photosError;
  }

  // 11. Sauvegarder Section 3
  if (company.section3) {
    const { error: section3Error } = await supabase
      .from("company_sections")
      .upsert({
        company_id: id,
        section_number: 3,
        title: company.section3.title,
        description: company.section3.description,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id,section_number'
      });
    
    if (section3Error) throw section3Error;
  }

  // 12. Sauvegarder les avantages
  if (company.advantages && company.advantages.length > 0) {
    await supabase.from("company_advantages").delete().eq("company_id", id);
    
    const advantagesData = company.advantages.map((adv, index) => ({
      company_id: id,
      category: adv.category,
      advantage_text: adv.advantage_text,
      display_order: index,
    }));

    const { error: advantagesError } = await supabase
      .from("company_advantages")
      .insert(advantagesData);
    
    if (advantagesError) throw advantagesError;
  }

  // 13. Sauvegarder le processus de recrutement
  if (company.recruitmentSteps && company.recruitmentSteps.length > 0) {
    await supabase.from("recruitment_process").delete().eq("company_id", id);
    
    const stepsData = company.recruitmentSteps.map((step, index) => ({
      company_id: id,
      step_description: step.step_description,
      display_order: index,
    }));

    const { error: stepsError } = await supabase
      .from("recruitment_process")
      .insert(stepsData);
    
    if (stepsError) throw stepsError;
  }

  // 14. Sauvegarder les infos légales
  if (company.legalInfo) {
    const { error: legalError } = await supabase
      .from("legal_info")
      .upsert({
        company_id: id,
        raison_sociale: company.legalInfo.raison_sociale,
        code_naf: company.legalInfo.code_naf,
        siret: company.legalInfo.siret,
        siren: company.legalInfo.siren,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'company_id'
      });
    
    if (legalError) throw legalError;
  }
}


export async function getCompanyVersions(companyId: string) {
  const { data, error } = await supabase
    .from("company_versions")
    .select("*")
    .eq("company_id", companyId)
    .order("version_number", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCompanyVersion(companyId: string, versionNumber: number) {
  const { data, error } = await supabase
    .from("company_versions")
    .select("data")
    .eq("company_id", companyId)
    .eq("version_number", versionNumber)
    .single();
  if (error) throw error;
  return data.data;
}

export async function saveCompanyVersion(company: Company) {
  // Récupère le dernier numéro de version
  const { data: latest, error: fetchError } = await supabase
    .from("company_versions")
    .select("version_number")
    .eq("company_id", company.id)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) throw fetchError;

  const nextVersion = latest ? latest.version_number + 1 : 1;

  // Insère la nouvelle version
  const { data, error } = await supabase.from("company_versions").insert([
    {
      company_id: company.id,
      version_number: nextVersion,
      data: company,
    },
  ])
  .select()
  .single();

  if (error) throw error;
  return data;
}