import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company, RecruitmentStep } from "../../types/company.types";

type RecruitmentProcessEditorProps = {
  data: Company;
};

export default function RecruitmentProcessEditor({ data }: RecruitmentProcessEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleStepAdd = () => {
    const newStep: RecruitmentStep = {
      step_description: '',
      display_order: (data.recruitmentSteps?.length || 0),
    };
    dispatch(updateDraft({
      recruitmentSteps: [...(data.recruitmentSteps || []), newStep]
    }));
  };

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...(data.recruitmentSteps || [])];
    updatedSteps[index] = {
      ...updatedSteps[index],
      step_description: value,
    };
    dispatch(updateDraft({ recruitmentSteps: updatedSteps }));
  };

  const handleStepRemove = (index: number) => {
    const updatedSteps = (data.recruitmentSteps || []).filter((_, i) => i !== index);
    dispatch(updateDraft({ recruitmentSteps: updatedSteps }));
  };

  const handleStepReorder = (index: number, direction: 'up' | 'down') => {
    const steps = [...(data.recruitmentSteps || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= steps.length) return;
    
    [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
    dispatch(updateDraft({ recruitmentSteps: steps }));
  };

  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="text-xl font-semibold mb-4">🎯 Processus de recrutement</h3>
      <p className="text-sm text-gray-600 mb-4">
        Expliquez clairement vos étapes de recrutement. Un parcours limpide rassure et engage les candidats. (2 étapes min - 6 étapes max)
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-start gap-2">
        <span className="text-yellow-600 text-xl">⚠️</span>
        <div className="text-sm text-yellow-800">
          <strong>Rassurez les candidats dès le départ</strong>
          <p className="mt-1">
            90% des candidats souhaitent connaître le processus de recrutement pour postuler
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {(data.recruitmentSteps || []).map((step, index) => (
          <div key={index} className="border rounded-md p-3 bg-gray-50">
            <div className="flex items-start gap-2">
              {/* Boutons de réorganisation */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleStepReorder(index, 'up')}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleStepReorder(index, 'down')}
                  disabled={index === (data.recruitmentSteps?.length || 0) - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              {/* Numéro de l'étape */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                {index + 1}
              </div>

              {/* Contenu */}
              <div className="flex-1">
                <textarea
                  value={step.step_description}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Étape ${index + 1} : Décrivez cette étape du processus`}
                  className="w-full border rounded-md p-2 text-sm resize-none"
                  rows={2}
                  maxLength={200}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {step.step_description.length}/200 caractères
                </div>
              </div>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => handleStepRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {(!data.recruitmentSteps || data.recruitmentSteps.length < 6) && (
        <button
          type="button"
          onClick={handleStepAdd}
          className="mt-3 text-sm text-blue-600 hover:text-blue-800"
        >
          + Ajouter une étape
        </button>
      )}

      {data.recruitmentSteps && data.recruitmentSteps.length > 0 && data.recruitmentSteps.length < 2 && (
        <p className="mt-2 text-sm text-red-600">
          ⚠️ Minimum 2 étapes requises
        </p>
      )}
    </div>
  );
}
