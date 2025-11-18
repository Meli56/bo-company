-- ============================================
-- CONFIGURATION STORAGE SUPABASE
-- ============================================
-- Exécutez ce script dans le SQL Editor de Supabase
-- pour résoudre l'erreur "violates row-level security policy"
-- ============================================

-- ÉTAPE 1 : Créer le bucket (si pas encore fait)
-- Allez dans Storage → Create bucket
-- Nom : company-media
-- Public : OUI
-- Ou utilisez cette commande :

INSERT INTO storage.buckets (id, name, public)
VALUES ('company-media', 'company-media', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ÉTAPE 2 : Configurer les politiques RLS
-- ============================================

-- 1. Politique pour UPLOAD (INSERT)
-- Permet aux utilisateurs authentifiés d'uploader des fichiers
CREATE POLICY "Allow authenticated uploads to company-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'company-media');

-- 2. Politique pour LECTURE (SELECT)
-- Permet à TOUT LE MONDE de lire les fichiers (public)
CREATE POLICY "Allow public read access to company-media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'company-media');

-- 3. Politique pour SUPPRESSION (DELETE)
-- Permet aux utilisateurs authentifiés de supprimer
CREATE POLICY "Allow authenticated deletes from company-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'company-media');

-- 4. Politique pour MISE À JOUR (UPDATE)
-- Permet aux utilisateurs authentifiés de mettre à jour
CREATE POLICY "Allow authenticated updates to company-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'company-media');

-- ============================================
-- VÉRIFICATION
-- ============================================

-- Vérifier que le bucket existe
SELECT * FROM storage.buckets WHERE id = 'company-media';

-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%company-media%';

-- ============================================
-- SI VOUS AVEZ DÉJÀ DES POLITIQUES EXISTANTES
-- ============================================
-- Supprimez-les d'abord avec :
-- DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;

-- Puis réexécutez les CREATE POLICY ci-dessus

-- ============================================
-- ALTERNATIVE : POLITIQUES PLUS PERMISSIVES
-- ============================================
-- Si vous voulez permettre l'upload même sans authentification (pour tests)
-- Utilisez ces politiques à la place :

/*
DROP POLICY IF EXISTS "Allow authenticated uploads to company-media" ON storage.objects;

CREATE POLICY "Allow all uploads to company-media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'company-media');
*/

-- ============================================
-- NOTES IMPORTANTES
-- ============================================
-- 1. Assurez-vous d'être connecté avec un utilisateur authentifié
-- 2. Le bucket doit être PUBLIC pour que les URLs soient accessibles
-- 3. Si l'erreur persiste, vérifiez votre authentification Supabase
-- 4. Les politiques s'appliquent à la table storage.objects, pas au bucket directement
