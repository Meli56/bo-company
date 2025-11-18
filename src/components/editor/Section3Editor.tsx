import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company } from "../../types/company.types";

type Section3EditorProps = {
  data: Company;
};

export default function Section3Editor({ data }: Section3EditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleSectionChange = (field: 'title' | 'description', value: string) => {
    dispatch(updateDraft({
      section3: {
        ...data.section3,
        section_number: 3,
        title: field === 'title' ? value : (data.section3?.title || ''),
        description: field === 'description' ? value : (data.section3?.description || ''),
      }
    }));
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-xl font-semibold mb-4">⭐ Section 3</h3>

      {/* Titre */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Titre
        </label>
        <input
          type="text"
          value={data.section3?.title || ''}
          onChange={(e) => handleSectionChange('title', e.target.value)}
          placeholder="Ex: Raisons de nous rejoindre"
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={data.section3?.description || ''}
          onChange={(e) => handleSectionChange('description', e.target.value)}
          placeholder="Décrivez votre section..."
          className="w-full border rounded-md p-2 h-32 resize-none"
          maxLength={1000}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {(data.section3?.description || '').length}/1000 caractères
        </div>
      </div>
    </div>
  );
}
