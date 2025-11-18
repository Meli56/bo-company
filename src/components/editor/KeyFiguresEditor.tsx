import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { KeyFigures } from "../../types";

type KeyFiguresEditorProps = {
  data: KeyFigures;
};

export default function KeyFiguresEditor({ data }: KeyFiguresEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (key: string, value: string) => {
    dispatch(updateDraft({ [key]: value }));
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-xl font-semibold mb-4">Chiffres clés</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Année de fondation
          </label>
          <input
            type="text"
            value={data.foundation_year || ""}
            onChange={(e) => handleChange("foundation_year", e.target.value)}
            placeholder="Ex: 2000"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Chiffre d'affaires
          </label>
          <input
            type="text"
            value={data.revenue || ""}
            onChange={(e) => handleChange("revenue", e.target.value)}
            placeholder="Ex: 100 Millions"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salaires
          </label>
          <input
            type="text"
            value={data.salaries || ""}
            onChange={(e) => handleChange("salaries", e.target.value)}
            placeholder="Ex: 250 à 1000"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Politique de télétravail
          </label>
          <input
            type="text"
            value={data.salary_policy || ""}
            onChange={(e) => handleChange("salary_policy", e.target.value)}
            placeholder="Ex: Non spécifié"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ancienneté moyenne
          </label>
          <input
            type="text"
            value={data.avg_seniority || ""}
            onChange={(e) => handleChange("avg_seniority", e.target.value)}
            placeholder="Ex: 4 ans"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Moyenne d'âge
          </label>
          <input
            type="text"
            value={data.avg_age || ""}
            onChange={(e) => handleChange("avg_age", e.target.value)}
            placeholder="Ex: 35 ans"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Indice de parité
          </label>
          <input
            type="text"
            value={data.gender_parity_index || ""}
            onChange={(e) => handleChange("gender_parity_index", e.target.value)}
            placeholder="Ex: 85 / 100"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
           Répartition H/F
          </label>
          <input
            type="text"
            value={data.gender_men_percentage || ""}
            onChange={(e) => handleChange("gender_men_percentage", e.target.value)}
            placeholder="Ex: 40% - 60%"
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}
