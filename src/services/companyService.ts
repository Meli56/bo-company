import { supabase } from "../lib/supabaseClient";

export async function getCompany(id: string) {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
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

export async function saveCompany(company: any) {
  const { id, ...data } = company;
  const { data: existing } = await supabase
    .from("companies")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("companies")
      .update(data)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("companies").insert([{ id, ...data }]);
    if (error) throw error;
  }
}
export async function saveCompanyVersion(company: any) {
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