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
    <div className="border-t py-12 px-8">
      <h3 className="text-xl font-semibold mb-4">Avantages</h3>
      <p className="text-sm text-gray-600 mb-4">
        Valorisez ce que vous offrez à vos équipes. Les bénéfices concrets font souvent la différence. (60 max.)
      </p>

      <div className="">
        {(data.advantages || []).map((advantage, index) => (
          <div key={index} className="p-3">
            <div className="flex items-center gap-2">
              {/* Boutons de réorganisation */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleAdvantageReorder(index, 'up')}
                  disabled={index === 0}
                  className="disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleAdvantageReorder(index, 'down')}
                  disabled={index === (data.advantages?.length || 0) - 1}
                  className="disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              {/* Contenu */}
              <div className="flex w-full items-center gap-4">
                <select
                  value={advantage.category}
                  onChange={(e) => handleAdvantageChange(index, 'category', e.target.value)}
                  className="w-1/3 border rounded-lg px-4 py-1 text-sm bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryIcons[cat] || '📋'} {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={advantage.advantage_text}
                  onChange={(e) => handleAdvantageChange(index, 'advantage_text', e.target.value)}
                  placeholder="Ex: Prime de participation aux bénéfices"
                  className="w-full border rounded-lg px-4 py-1 text-sm"
                  maxLength={100}
                />
              </div>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => handleAdvantageRemove(index)}
              className="text-red-500 hover:text-white border rounded-full px-2.5 py-1 hover:border-red-500 hover:bg-red-500"
              >
               X
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
