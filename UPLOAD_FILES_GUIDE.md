# Guide d'Upload de Fichiers - Vidéos et Photos

## ✅ Ce qui a été implémenté

### 1. **Extensions du Service de Stockage** (`storageService.ts`)

Nouvelles fonctions ajoutées :
- `uploadVideo(file, companyId)` : Upload de vidéos (max 100MB)
- `uploadPhoto(file, companyId)` : Upload de photos (max 5MB)
- `deleteMedia(url)` : Suppression de médias

### 2. **Composants d'Upload**

#### **VideoUpload.tsx**
- Upload de vidéos depuis l'ordinateur
- Formats acceptés : MP4, MOV, etc.
- Taille max : 100MB
- Preview avec nom de fichier
- Boutons "Changer" et "Supprimer"
- État de chargement pendant l'upload

#### **PhotoUpload.tsx**
- Upload d'images depuis l'ordinateur
- Formats acceptés : JPG, PNG, etc.
- Taille max : 5MB
- Preview visuel de l'image
- Boutons "Changer" et "Supprimer" en overlay
- État de chargement pendant l'upload

### 3. **Intégration dans les Éditeurs**

#### **Section1Editor.tsx** (Vidéos)
- Remplacé les inputs URL par le composant `VideoUpload`
- Chaque vidéo a son propre bouton d'upload
- Boutons de réorganisation (↑↓) conservés
- Limite : 4 vidéos maximum

#### **Section2Editor.tsx** (Photos)
- Remplacé les inputs URL par le composant `PhotoUpload`
- Affichage en grille 2 colonnes
- Chaque photo a son propre bouton d'upload
- Boutons de réorganisation (↑↓) conservés
- Numérotation automatique (#1, #2, etc.)
- Limite : 25 photos maximum

## 🔧 Configuration Supabase Requise

### ⚠️ IMPORTANT - Solution à l'erreur RLS

Si vous obtenez l'erreur **"new row violates row-level security policy"**, vous devez configurer les politiques de sécurité.

### Étape 1 : Créer le Bucket de Stockage

Dans Supabase Dashboard → Storage, créez un nouveau bucket :

**Nom du bucket** : `company-media`

**Configuration** :
- Public bucket : ✅ **OUI** (OBLIGATOIRE pour que les URLs soient accessibles)
- File size limit : 100 MB
- Allowed MIME types : `video/*`, `image/*`

### Étape 2 : Configurer les Politiques RLS (OBLIGATOIRE)

**Exécutez le fichier `SUPABASE_STORAGE_SETUP.sql` dans le SQL Editor de Supabase**

Ou copiez-collez ces commandes SQL :

```sql
-- 1. Politique pour UPLOAD (INSERT)
CREATE POLICY "Allow authenticated uploads to company-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'company-media');

-- 2. Politique pour LECTURE (SELECT)
CREATE POLICY "Allow public read access to company-media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'company-media');

-- 3. Politique pour SUPPRESSION (DELETE)
CREATE POLICY "Allow authenticated deletes from company-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'company-media');

-- 4. Politique pour MISE À JOUR (UPDATE)
CREATE POLICY "Allow authenticated updates to company-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'company-media');
```

### Vérification

Après avoir exécuté le SQL, vérifiez que les politiques sont bien créées :

```sql
SELECT * FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%company-media%';
```

Vous devriez voir 4 politiques listées.

### Étape 3 : Structure des Dossiers

Le service créera automatiquement :
- `company-media/videos/` : Vidéos de Section 1
- `company-media/photos/` : Photos de Section 2

Format des noms de fichiers : `{companyId}-{timestamp}.{extension}`

Exemple : `f1ef1c6f-aea7-4ded-a294-b08abe85f0a0-1700000000000.mp4`

## 📋 Utilisation

### Pour les Vidéos (Section 1)

1. Cliquez sur "📢 Section 1" dans l'éditeur
2. Cliquez sur "+ Ajouter des vidéos" (max 4)
3. Cliquez sur la zone "🎥 Cliquez pour ajouter une vidéo"
4. Sélectionnez un fichier vidéo depuis votre ordinateur
5. L'upload démarre automatiquement
6. Une fois terminé, la vidéo apparaît avec son nom
7. Utilisez ↑↓ pour réorganiser
8. Cliquez "🗑️" pour supprimer

### Pour les Photos (Section 2)

1. Cliquez sur "📸 Section 2" dans l'éditeur
2. Cliquez sur "+ Ajouter des photos" (max 25)
3. Cliquez sur la zone "📷 Ajouter une photo"
4. Sélectionnez une image depuis votre ordinateur
5. L'upload démarre automatiquement
6. Une fois terminée, l'image s'affiche en preview
7. Utilisez ↑↓ pour réorganiser
8. Cliquez "🗑️" pour supprimer

## 🎨 Interface Utilisateur

### Zones d'Upload Vides
```
┌─────────────────────────────────┐
│  🎥 Cliquez pour ajouter        │
│  MP4, MOV jusqu'à 100MB         │
└─────────────────────────────────┘
```

### Pendant l'Upload
```
┌─────────────────────────────────┐
│  ⏳ Upload en cours...          │
└─────────────────────────────────┘
```

### Après l'Upload (Vidéo)
```
┌─────────────────────────────────┐
│ 🎥 ma_video.mp4                 │
│ https://...supabase.co/...      │
│           [Changer]  [🗑️]       │
└─────────────────────────────────┘
```

### Après l'Upload (Photo)
```
┌─────────────────────┐
│  [Image Preview]    │
│  [Changer]  [🗑️]    │
│  ma_photo.jpg       │
└─────────────────────┘
```

## 🔐 Validation et Sécurité

### Validation Côté Client

**Vidéos** :
- Type de fichier : `video/*` uniquement
- Taille maximale : 100 MB
- Message d'erreur si fichier invalide

**Photos** :
- Type de fichier : `image/*` uniquement
- Taille maximale : 5 MB
- Message d'erreur si fichier invalide

### Stockage Sécurisé

- Nommage unique avec timestamp (pas d'écrasement)
- Option `upsert: true` pour remplacer si même nom
- Cache control : 3600 secondes (1 heure)

## 🚀 Flux Complet

```
1. Utilisateur clique sur la zone d'upload
   ↓
2. Sélectionne un fichier
   ↓
3. Validation (type + taille)
   ↓
4. Upload vers Supabase Storage
   ↓
5. Récupération de l'URL publique
   ↓
6. Mise à jour du state Redux
   ↓
7. Affichage du preview
   ↓
8. Sauvegarde en base lors du clic "Enregistrer"
```

## 📊 Données Stockées

### Dans Supabase Storage
- Fichiers binaires (vidéos, images)
- Organisation : `/videos/` et `/photos/`

### Dans PostgreSQL
```typescript
// section_videos
{
  id: uuid,
  company_id: uuid,
  section_id: uuid,
  video_url: "https://...supabase.co/storage/v1/object/public/company-media/videos/...",
  video_name: "ma_video.mp4",
  display_order: 0
}

// section_photos
{
  id: uuid,
  company_id: uuid,
  section_id: uuid,
  photo_url: "https://...supabase.co/storage/v1/object/public/company-media/photos/...",
  photo_name: "ma_photo.jpg",
  display_order: 0
}
```

## ⚙️ Améliorations Possibles

1. **Compression automatique** : Réduire la taille des fichiers avant upload
2. **Miniatures** : Générer des thumbnails pour les vidéos
3. **Redimensionnement** : Forcer 300×200px pour les photos
4. **Drag & Drop** : Permettre de glisser-déposer les fichiers
5. **Barre de progression** : Afficher le % d'upload
6. **Multi-upload** : Sélectionner plusieurs fichiers à la fois
7. **Preview vidéo** : Lecteur vidéo intégré dans l'éditeur
8. **Validation serveur** : Double vérification côté backend

## 🐛 Gestion d'Erreurs

### Messages d'Erreur Affichés

- "Veuillez sélectionner une vidéo" → Fichier n'est pas une vidéo
- "Veuillez sélectionner une image" → Fichier n'est pas une image
- "La vidéo ne doit pas dépasser 100MB" → Fichier trop volumineux
- "L'image ne doit pas dépasser 5MB" → Fichier trop volumineux
- "Erreur lors de l'upload de la vidéo/photo" → Erreur Supabase

### Logs Console

Tous les uploads sont loggés avec `console.error` en cas d'échec.

## ✅ Checklist de Déploiement

- [ ] Créer le bucket `company-media` dans Supabase
- [ ] Configurer les 4 politiques (INSERT, SELECT, DELETE, UPDATE)
- [ ] Vérifier que le bucket est public
- [ ] Tester l'upload d'une vidéo
- [ ] Tester l'upload d'une photo
- [ ] Vérifier que les URLs sont accessibles
- [ ] Tester la suppression de médias
- [ ] Vérifier que les fichiers sont bien stockés dans les bons dossiers

## 📝 Notes Importantes

- Les URLs générées sont **publiques** (accessibles sans authentification)
- Les fichiers restent en storage même si supprimés de l'interface (nettoyage manuel requis)
- Le nom de fichier affiché est celui du fichier original
- L'URL contient un timestamp pour éviter les conflits
- Les anciens fichiers ne sont PAS supprimés automatiquement lors du remplacement

## 🔗 Références

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Upload Files with React](https://supabase.com/docs/guides/storage/uploads/standard-uploads)
- [Storage Policies](https://supabase.com/docs/guides/storage/security/access-control)
