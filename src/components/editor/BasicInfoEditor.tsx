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
    <div className="space-y-4 px-8">
      <h3 className="text-xl font-semibold mb-4">Informations générales</h3>
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
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Secteur
            </label>
            <input
              type="text"
              value={data.sector || ""}
              onChange={(e) => handleChange("sector", e.target.value)}
              placeholder="Ex: Internet - Web"
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sous-secteur
            </label>
            <input
              type="text"
              value={data.subsector || ""}
              onChange={(e) => handleChange("subsector", e.target.value)}
              placeholder="Ex: Web / Recrutement - Placement"
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre d'employés
          </label>
          <input
            type="text"
            value={data.employees || ""}
            onChange={(e) => handleChange("employees", e.target.value)}
            placeholder="Ex: 35"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}
