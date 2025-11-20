import { Company } from "../../types/company.types";

type RecruitmentProcessPreviewProps = {
  data: Company;
};

export default function RecruitmentProcessPreview({ data }: RecruitmentProcessPreviewProps) {
  if (!data.recruitmentSteps || data.recruitmentSteps.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl mb-4">Notre processus de recrutement</h2>

      <div className="bg-purple-50 rounded-lg p-6 space-y-4">
        {data.recruitmentSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            <div className="absolute left-[3px] top-4 -bottom-6 w-[2px] bg-purple-400"></div>
            <div className="flex gap-2 ">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-gray-800">{step.step_description}</p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
