import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { uploadCompanyBanner } from "../../features/company/companySlice";
import { updateDraft } from "../../features/company/companySlice";

type Props = {
  companyId: string;
  currentBannerUrl?: string;
};

export default function BannerUpload({ companyId, currentBannerUrl }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    // Vérification de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    try {
      const bannerUrl = await dispatch(uploadCompanyBanner({ file, companyId })).unwrap();
      console.log('Bannière uploadée:', bannerUrl);
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload de la bannière');
    }
  };

  const handleRemoveBanner = () => {
    dispatch(updateDraft({ banner_url: undefined }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Bannière
      </label>

      {currentBannerUrl ? (
        <div className="relative">
          <img
            src={currentBannerUrl}
            alt="Bannière"
            className="w-full h-32 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveBanner}
            className="absolute top-2 right-2 bg-[#df0505] text-white py-2 px-3 rounded-md text-sm hover:bg-[#cc0000]"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <p className="text-gray-500">📸 Cliquez pour ajouter une bannière</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {currentBannerUrl && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm"
        >
          Changer la bannière
        </button>
      )}
    </div>
  );
}
