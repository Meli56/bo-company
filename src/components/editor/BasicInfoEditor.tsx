import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { BasicInfo, BusinessInfo } from "../../types";

type BasicInfoEditorProps = {
  data: BasicInfo & Partial<BusinessInfo>;
};

export default function BasicInfoEditor({ data }: BasicInfoEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (key: string, value: string) => {
    dispatch(updateDraft({ [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom de l'entreprise
        </label>
        <input
          type="text"
          value={data.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <input
          type="text"
          value={data.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
          placeholder="Ex: Forfait - Premium"
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ville / Siège social
        </label>
        <input
          type="text"
          value={data.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Ex: Rennes (35000)"
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>
    </div>
  );
}
