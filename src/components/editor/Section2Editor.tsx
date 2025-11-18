import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company, SectionPhoto } from "../../types/company.types";
import PhotoUpload from "../preview/PhotoUpload";

type Section2EditorProps = {
  data: Company;
};

export default function Section2Editor({ data }: Section2EditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSectionChange = (field: 'title' | 'description', value: string) => {
    dispatch(updateDraft({
      section2: {
        ...data.section2,
        section_number: 2,
        title: field === 'title' ? value : (data.section2?.title || ''),
        description: field === 'description' ? value : (data.section2?.description || ''),
      }
    }));
  };

  const handlePhotoAdd = () => {
    const newPhoto: SectionPhoto = {
      photo_url: '',
      photo_name: '',
      display_order: (data.section2Photos?.length || 0),
    };
    dispatch(updateDraft({
      section2Photos: [...(data.section2Photos || []), newPhoto]
    }));
  };

  const handlePhotoChange = (index: number, field: 'photo_url' | 'photo_name', value: string) => {
    const updatedPhotos = [...(data.section2Photos || [])];
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      [field]: value,
    };
    dispatch(updateDraft({ section2Photos: updatedPhotos }));
  };

  const handlePhotoUploadComplete = (index: number, url: string, fileName: string) => {
    const updatedPhotos = [...(data.section2Photos || [])];
    updatedPhotos[index] = {
      ...updatedPhotos[index],
      photo_url: url,
      photo_name: fileName,
    };
    dispatch(updateDraft({ section2Photos: updatedPhotos }));
  };

  const handlePhotoRemove = (index: number) => {
    const updatedPhotos = (data.section2Photos || []).filter((_, i) => i !== index);
    dispatch(updateDraft({ section2Photos: updatedPhotos }));
  };

  const handlePhotoReorder = (index: number, direction: 'up' | 'down') => {
    const photos = [...(data.section2Photos || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= photos.length) return;
    
    [photos[index], photos[newIndex]] = [photos[newIndex], photos[index]];
    dispatch(updateDraft({ section2Photos: photos }));
  };

  return (
    <div className="border-t pt-12 px-8">
      <h3 className="text-xl font-semibold mb-4">Section 2</h3>

      {/* Titre */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titre
        </label>
        <input
          type="text"
          value={data.section2?.title || ''}
          onChange={(e) => handleSectionChange('title', e.target.value)}
          placeholder="Ex: Nos bureaux"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={data.section2?.description || ''}
          onChange={(e) => handleSectionChange('description', e.target.value)}
          placeholder="Décrivez votre section..."
          className="w-full border rounded-md p-2 h-32 resize-none"
          maxLength={1000}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {(data.section2?.description || '').length}/1000 caractères
        </div>
      </div>

      {/* Photos */}
      <div className="border-t py-12">
        <label className="text-xl font-semibold">
          Photos
        </label>
        <p className="text-xs text-gray-500 mb-3 mt-4">
          Montrez l'envers du décor. Des visuels concrets aident les candidats à se projeter dans vos locaux et votre ambiance de travail. (25 max.) (format : 300 × 200 px)
        </p>

        <div className="flex gap-6 flex-col">
          {(data.section2Photos || []).map((photo, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="flex flex-col gap-1 text-xl">
                  <button
                    type="button"
                    onClick={() => handlePhotoReorder(index, 'up')}
                    disabled={index === 0}
                    className="disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePhotoReorder(index, 'down')}
                    disabled={index === (data.section2Photos?.length || 0) - 1}
                    className="disabled:opacity-30"
                  >
                    ↓
                  </button>
              </div>

              <PhotoUpload
                companyId={data.id}
                photoUrl={photo.photo_url}
                photoName={photo.photo_name || ''}
                onUploadComplete={(url, fileName) => handlePhotoUploadComplete(index, url, fileName)}
                onRemove={() => handlePhotoRemove(index)}
              />
            </div>
          ))}
        </div>

        {(!data.section2Photos || data.section2Photos.length < 25) && (
          <button
            type="button"
            onClick={handlePhotoAdd}
            className="mt-3 text-sm hover:text-gray-600"
          >
            + Ajouter des photos
          </button>
        )}
      </div>
    </div>
  );
}
