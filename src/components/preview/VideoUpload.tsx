import { useRef, useState } from "react";
import { uploadVideo } from "../../services/storageService";

type VideoUploadProps = {
  companyId: string;
  videoUrl?: string;
  videoName?: string;
  onUploadComplete: (url: string, fileName: string) => void;
  onRemove: () => void;
};

export default function VideoUpload({
  companyId,
  videoUrl,
  videoName,
  onUploadComplete,
  onRemove,
}: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('video/')) {
      alert('Veuillez sélectionner une vidéo');
      return;
    }

    // Vérification de la taille (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('La vidéo ne doit pas dépasser 100MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadVideo(file, companyId);
      onUploadComplete(url, file.name);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload de la vidéo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {videoUrl ? (
        <div className="relative border rounded-md p-2 bg-white">
          <div className="flex items-center gap-2">
            <div className="flex-1 text-sm">
              <div className="font-medium">🎥 {videoName || 'Vidéo'}</div>
              <div className="text-xs text-gray-500">{videoUrl}</div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border rounded"
              >
                Changer
              </button>
              <button
                type="button"
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition"
        >
          {uploading ? (
            <p className="text-gray-500">⏳ Upload en cours...</p>
          ) : (
            <>
              <p className="text-gray-500">🎥 Cliquez pour ajouter une vidéo</p>
              <p className="text-xs text-gray-400 mt-1">MP4, MOV jusqu'à 100MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}
