import { Company } from "../../types/company.types";

type RecruitmentProcessPreviewProps = {
  data: Company;
};

export default function RecruitmentProcessPreview({ data }: RecruitmentProcessPreviewProps) {
  if (!data.recruitmentSteps || data.recruitmentSteps.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl mb-4">Notre processus de recrutement</h2>
      <p className="text-sm text-gray-600 mb-6">
        Expliquez clairement vos étapes de recrutement. Un parcours limpide rassure et engage les candidats. (2 étapes min - 6 étapes max)
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start gap-3">
        <span className="text-yellow-600 text-3xl">⚠️</span>
        <div className="text-sm text-yellow-800">
          <strong>Rassurez les candidats dès le départ</strong>
          <p className="mt-1">
            90% des candidats souhaitent connaître le processus de recrutement pour postuler
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.recruitmentSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold shrink-0">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <p className="text-gray-700">{step.step_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
