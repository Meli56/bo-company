import { supabase } from "../lib/supabaseClient";

export async function uploadBanner(file: File, companyId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${companyId}-${Date.now()}.${fileExt}`;
  const filePath = `banners/${fileName}`;

  // Upload le fichier
  const { error: uploadError } = await supabase.storage
    .from('company-banners')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) throw uploadError;

  // Récupère l'URL publique
  const { data } = supabase.storage
    .from('company-banners')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteBanner(url: string): Promise<void> {
  // Extrait le chemin du fichier de l'URL
  const path = url.split('/company-banners/')[1];
  
  if (!path) return;

  const { error } = await supabase.storage
    .from('company-banners')
    .remove([path]);

  if (error) throw error;
}

// Upload vidéo
export async function uploadVideo(file: File, companyId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${companyId}-${Date.now()}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  // Upload le fichier
  const { error: uploadError } = await supabase.storage
    .from('company-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) throw uploadError;

  // Récupère l'URL publique
  const { data } = supabase.storage
    .from('company-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Upload photo
export async function uploadPhoto(file: File, companyId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${companyId}-${Date.now()}.${fileExt}`;
  const filePath = `photos/${fileName}`;

  // Upload le fichier
  const { error: uploadError } = await supabase.storage
    .from('company-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) throw uploadError;

  // Récupère l'URL publique
  const { data } = supabase.storage
    .from('company-media')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Supprimer média (vidéo ou photo)
export async function deleteMedia(url: string): Promise<void> {
  // Extrait le chemin du fichier de l'URL
  const path = url.split('/company-media/')[1];
  
  if (!path) return;

  const { error } = await supabase.storage
    .from('company-media')
    .remove([path]);

  if (error) throw error;
}
