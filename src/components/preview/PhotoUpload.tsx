import { useRef, useState } from "react";
import { uploadPhoto } from "../../services/storageService";
import toast from 'react-hot-toast';

type PhotoUploadProps = {
  companyId: string;
  photoUrl?: string;
  photoName?: string;
  onUploadComplete: (url: string, fileName: string) => void;
  onRemove: () => void;
};

export default function PhotoUpload({
  companyId,
  photoUrl,
  photoName,
  onUploadComplete,
  onRemove,
}: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    // Vérification de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadPhoto(file, companyId);
      onUploadComplete(url, file.name);
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error('Erreur lors de l\'upload de la photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-between gap-4 w-full items-center">
      {photoUrl ? (
        <>
          <img
            src={photoUrl}
            alt={photoName || 'Photo'}
            className="w-auto h-24 object-cover"
          />
          <div className="flex-1 text-sm">
              <div className="font-medium">{photoName || 'Photo'}</div>
            </div>
          <div className="flex gap-2 h-fit">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 text-xs px-2 py-1 rounded-full border hover:bg-black hover:text-white hover:border-black"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-white border rounded-full px-2.5 py-1 hover:border-red-500 hover:bg-red-500"
            >
              X
            </button>
          </div>
        </>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition h-24 flex flex-col items-center justify-center"
        >
          {uploading ? (
            <p className="text-gray-500 text-sm">⏳ Upload...</p>
          ) : (
            <>
              <p className="text-gray-500 text-sm">📷 Ajouter une photo</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG jusqu'à 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}
