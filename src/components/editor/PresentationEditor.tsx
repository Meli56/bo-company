import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Presentation } from "../../types/company.types";

type PresentationEditorProps = {
  data: Presentation;
};

export default function PresentationEditor({ data }: PresentationEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  // Listes des labels disponibles
  const availableLabelsRse = [
    "Engagé RSE",
    "BCorp",
    "Lucie 26000",
    "ISO 26000",
    "Ecovadis",
    "Label Positive Workplace",
    "Bilan Carbone",
  ];

  const availableLabelsRh = [
    "Best Workplaces",
    "Great Place to Work",
    "Happy at Work",
    "Top Employer",
    "Entreprise où il fait bon travailler",
  ];

  const handleChange = (key: string, value: string | string[]) => {
    dispatch(updateDraft({ [key]: value }));
  };

  const handleLabelRemove = (type: 'labelsRse' | 'labelsRh', indexToRemove: number) => {
    const currentLabels = data[type] || [];
    const updatedLabels = currentLabels.filter((_, index) => index !== indexToRemove);
    handleChange(type, updatedLabels);
  };

  const handleLabelAdd = (type: 'labelsRse' | 'labelsRh', label: string) => {
    const currentLabels = data[type] || [];
    if (!currentLabels.includes(label)) {
      handleChange(type, [...currentLabels, label]);
    }
  };

  const handleSocialNetworkChange = (index: number, value: string) => {
    const updatedNetworks = [...(data.socialNetworks || [])];
    updatedNetworks[index] = value;
    handleChange("socialNetworks", updatedNetworks);
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-xl font-semibold mb-4">Présentation</h3>
      <div>
        <textarea
          name=""
          id=""
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Présentez votre entreprise en quelques lignes..."
          className="mt-1 w-full border rounded-md p-2 h-40"
        />
        {/* Réactivité recruteur */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
          Réactivité recruteur
        </label>
        <select
          value={data.reactivityTime || ""}
          onChange={(e) => handleChange("reactivityTime", e.target.value)}
          className="w-full border rounded-md p-2 bg-white"
        >
          <option value="">Sélectionner...</option>
          <option value="Moins de 7 jours">Moins de 7 jours</option>
          <option value="7 à 14 jours">7 à 14 jours</option>
          <option value="Plus de 14 jours">Plus de 14 jours</option>
        </select>
      </div>

      {/* Labels RSE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
          Labels RSE
        </label>
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              handleLabelAdd('labelsRse', e.target.value);
              e.target.value = ""; // Reset select
            }
          }}
          className="w-full border rounded-md p-2 bg-white mb-2"
        >
          <option value="">Sélectionner un label...</option>
          {availableLabelsRse
            .filter(label => !(data.labelsRse || []).includes(label))
            .map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
        </select>
        <div className="border rounded-md p-2 min-h-[42px] bg-white">
          {/* Affichage des labels sélectionnés */}
          <div className="flex flex-wrap gap-2">
            {(data.labelsRse || []).map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-sm"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleLabelRemove('labelsRse', index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Labels RH */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
          Labels RH
        </label>
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              handleLabelAdd('labelsRh', e.target.value);
              e.target.value = ""; // Reset select
            }
          }}
          className="w-full border rounded-md p-2 bg-white mb-2"
        >
          <option value="">Sélectionner un label...</option>
          {availableLabelsRh
            .filter(label => !(data.labelsRh || []).includes(label))
            .map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
        </select>
        <div className="border rounded-md p-2 min-h-[42px] bg-white">
          <div className="flex flex-wrap gap-2">
            {(data.labelsRh || []).map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-sm"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleLabelRemove('labelsRh', index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Réseaux sociaux */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
          Réseaux sociaux
        </label>
        <div className="space-y-2">
          {/* Facebook */}
          <div className="flex items-center gap-2">
            <span className="text-blue-600">F</span>
            <input
              type="text"
              placeholder="Lien Facebook"
              value={data.socialNetworks?.[0] || ""}
              onChange={(e) => handleSocialNetworkChange(0, e.target.value)}
              className="flex-1 border rounded-md p-2 text-gray-400"
            />
          </div>

          {/* Twitter */}
          <div className="flex items-center gap-2">
            <span className="text-black font-bold">𝕏</span>
            <input
              type="text"
              placeholder="Lien Twitter"
              value={data.socialNetworks?.[1] || ""}
              onChange={(e) => handleSocialNetworkChange(1, e.target.value)}
              className="flex-1 border rounded-md p-2 text-gray-400"
            />
          </div>

          {/* YouTube */}
          <div className="flex items-center gap-2">
            <span className="text-red-600">▶</span>
            <input
              type="text"
              placeholder="Lien Youtube"
              value={data.socialNetworks?.[2] || ""}
              onChange={(e) => handleSocialNetworkChange(2, e.target.value)}
              className="flex-1 border rounded-md p-2 text-gray-400"
            />
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-2">
            <span className="text-pink-600">📱</span>
            <input
              type="text"
              placeholder="Lien Instagram"
              value={data.socialNetworks?.[3] || ""}
              onChange={(e) => handleSocialNetworkChange(3, e.target.value)}
              className="flex-1 border rounded-md p-2"
            />
          </div>

          {/* TikTok */}
          <div className="flex items-center gap-2">
            <span className="text-black">♪</span>
            <input
              type="text"
              placeholder="Lien Tiktok"
              value={data.socialNetworks?.[4] || ""}
              onChange={(e) => handleSocialNetworkChange(4, e.target.value)}
              className="flex-1 border rounded-md p-2 text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
