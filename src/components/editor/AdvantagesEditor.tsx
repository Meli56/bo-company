import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company, CompanyAdvantage } from "../../types/company.types";

type AdvantagesEditorProps = {
  data: Company;
};

export default function AdvantagesEditor({ data }: AdvantagesEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const categories = [
    "Rémunération",
    "Confort",
    "Vie d'entreprise",
    "Santé & Bien-être",
    "Formation",
    "Avantages sociaux",
  ];

  const categoryIcons: { [key: string]: string } = {
    "Rémunération": "💰",
    "Confort": "🛋️",
    "Vie d'entreprise": "🎉",
    "Santé & Bien-être": "🏥",
    "Formation": "📚",
    "Avantages sociaux": "🎁",
  };

  const handleAdvantageAdd = () => {
    const newAdvantage: CompanyAdvantage = {
      category: categories[0],
      advantage_text: '',
      display_order: (data.advantages?.length || 0),
    };
    dispatch(updateDraft({
      advantages: [...(data.advantages || []), newAdvantage]
    }));
  };

  const handleAdvantageChange = (index: number, field: 'category' | 'advantage_text', value: string) => {
    const updatedAdvantages = [...(data.advantages || [])];
    updatedAdvantages[index] = {
      ...updatedAdvantages[index],
      [field]: value,
    };
    dispatch(updateDraft({ advantages: updatedAdvantages }));
  };

  const handleAdvantageRemove = (index: number) => {
    const updatedAdvantages = (data.advantages || []).filter((_, i) => i !== index);
    dispatch(updateDraft({ advantages: updatedAdvantages }));
  };

  const handleAdvantageReorder = (index: number, direction: 'up' | 'down') => {
    const advantages = [...(data.advantages || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= advantages.length) return;
    
    [advantages[index], advantages[newIndex]] = [advantages[newIndex], advantages[index]];
    dispatch(updateDraft({ advantages }));
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-xl font-semibold mb-4">⭐ Avantages</h3>
      <p className="text-sm text-gray-600 mb-4">
        Valorisez ce que vous offrez à vos équipes. Les bénéfices concrets font souvent la différence. (60 max.)
      </p>

      <div className="space-y-3">
        {(data.advantages || []).map((advantage, index) => (
          <div key={index} className="border rounded-md p-3 bg-gray-50">
            <div className="flex items-start gap-2">
              {/* Boutons de réorganisation */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleAdvantageReorder(index, 'up')}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleAdvantageReorder(index, 'down')}
                  disabled={index === (data.advantages?.length || 0) - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              {/* Icône de la catégorie */}
              <div className="text-3xl">
                {categoryIcons[advantage.category] || '📋'}
              </div>

              {/* Contenu */}
              <div className="flex-1 space-y-2">
                <select
                  value={advantage.category}
                  onChange={(e) => handleAdvantageChange(index, 'category', e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={advantage.advantage_text}
                  onChange={(e) => handleAdvantageChange(index, 'advantage_text', e.target.value)}
                  placeholder="Ex: Prime de participation aux bénéfices"
                  className="w-full border rounded-md p-2 text-sm"
                  maxLength={100}
                />
                <div className="text-right text-xs text-gray-500">
                  {advantage.advantage_text.length}/100 caractères
                </div>
              </div>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => handleAdvantageRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {(!data.advantages || data.advantages.length < 60) && (
        <button
          type="button"
          onClick={handleAdvantageAdd}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800"
        >
          + Ajouter un avantage
        </button>
      )}
    </div>
  );
}
