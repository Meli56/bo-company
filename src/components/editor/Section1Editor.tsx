import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company, SectionVideo } from "../../types/company.types";
import VideoUpload from "../preview/VideoUpload";

type Section1EditorProps = {
  data: Company;
};

export default function Section1Editor({ data }: Section1EditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSectionChange = (field: 'title' | 'description', value: string) => {
    dispatch(updateDraft({
      section1: {
        ...data.section1,
        section_number: 1,
        title: field === 'title' ? value : (data.section1?.title || ''),
        description: field === 'description' ? value : (data.section1?.description || ''),
      }
    }));
  };

  const handleVideoAdd = () => {
    const newVideo: SectionVideo = {
      video_url: '',
      video_name: '',
      display_order: (data.section1Videos?.length || 0),
    };
    dispatch(updateDraft({
      section1Videos: [...(data.section1Videos || []), newVideo]
    }));
  };

  const handleVideoChange = (index: number, field: 'video_url' | 'video_name', value: string) => {
    const updatedVideos = [...(data.section1Videos || [])];
    updatedVideos[index] = {
      ...updatedVideos[index],
      [field]: value,
    };
    dispatch(updateDraft({ section1Videos: updatedVideos }));
  };

  const handleVideoUploadComplete = (index: number, url: string, fileName: string) => {
    const updatedVideos = [...(data.section1Videos || [])];
    updatedVideos[index] = {
      ...updatedVideos[index],
      video_url: url,
      video_name: fileName,
    };
    dispatch(updateDraft({ section1Videos: updatedVideos }));
  };

  const handleVideoRemove = (index: number) => {
    const updatedVideos = (data.section1Videos || []).filter((_, i) => i !== index);
    dispatch(updateDraft({ section1Videos: updatedVideos }));
  };

  const handleVideoReorder = (index: number, direction: 'up' | 'down') => {
    const videos = [...(data.section1Videos || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= videos.length) return;
    
    [videos[index], videos[newIndex]] = [videos[newIndex], videos[index]];
    dispatch(updateDraft({ section1Videos: videos }));
  };

  return (
    <div className="border-t py-12 px-8">
      <h3 className="text-xl font-semibold mb-4">Section 1</h3>
      <p className="text-sm text-gray-600 mb-4">
        Profitez de cette section pour mettre en avant les valeurs de votre entreprise, la vie aux bureaux
      </p>

      {/* Titre */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titre
        </label>
        <input
          type="text"
          value={data.section1?.title || ''}
          onChange={(e) => handleSectionChange('title', e.target.value)}
          placeholder="Ex: Notre culture"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={data.section1?.description || ''}
          onChange={(e) => handleSectionChange('description', e.target.value)}
          placeholder="Décrivez votre section..."
          className="w-full border rounded-md p-2 h-32 resize-none"
          maxLength={1000}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {(data.section1?.description || '').length}/1000 caractères
        </div>
      </div>

      {/* Vidéos */}
      <div className="border-t pt-12">
        <label text-xl font-semibold>
          Vidéos
        </label>
        <p className="text-xs text-gray-500 mb-3 mt-4">
          Faites passer vos messages en images. Une vidéo dynamique capte l'attention et renforce l'authenticité de votre marque employeur. (4 max.)
        </p>

        <div className="space-y-6">
          {(data.section1Videos || []).map((video, index) => (
            <div key={index} >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1 text-xl">
                  <button
                    type="button"
                    onClick={() => handleVideoReorder(index, 'up')}
                    disabled={index === 0}
                    className="disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVideoReorder(index, 'down')}
                    disabled={index === (data.section1Videos?.length || 0) - 1}
                    className="disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>

                <div className="flex-1">
                  <VideoUpload
                    companyId={data.id}
                    videoUrl={video.video_url}
                    videoName={video.video_name || ''}
                    onUploadComplete={(url, fileName) => handleVideoUploadComplete(index, url, fileName)}
                    onRemove={() => handleVideoRemove(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!data.section1Videos || data.section1Videos.length < 4) && (
          <button
            type="button"
            onClick={handleVideoAdd}
            className="mt-3 text-sm hover:text-gray-600"
          >
            + Ajouter des vidéos
          </button>
        )}
      </div>
    </div>
  );
}
