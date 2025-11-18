import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { CorporateStructure } from "../../types";

type ParentCompanyEditorProps = {
  data: CorporateStructure;
};

export default function ParentCompanyEditor({ data }: ParentCompanyEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (key: string, value: string) => {
    dispatch(updateDraft({ [key]: value }));
  };

  return (
    <div className="px-8 pb-12 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Appartient au groupe
        </label>
        <input
          type="text"
          value={data.parent_group || ""}
          onChange={(e) => handleChange("parent_group", e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mt-4">
          Entreprise parente
        </label>
        <input
          type="text"
          value={data.parent_company || ""}
          onChange={(e) => handleChange("parent_company", e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>
    </div>
  );
}
