import StrengthsSection from "./preview/StrengthsSection";
import KeyFiguresSection from "./preview/KeyFiguresSection";
import PresentationSection from "./preview/PresentationSection";
import CompanySectionsPreview from "./preview/CompanySectionsPreview";
import AdvantagesPreview from "./preview/AdvantagesPreview";
import RecruitmentProcessPreview from "./preview/RecruitmentProcessPreview";
import { Company } from "../types/company.types";

type PreviewProps = {
  data: Company;
};

export default function PreviewPanel({ data }: PreviewProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Bannière */}
      {data.banner_url && (
        <div className="w-full h-48 mb-6 rounded-lg overflow-hidden shadow-md">
          <img
            src={data.banner_url}
            alt="Bannière de l'entreprise"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="px-6">
        {/* En-tête avec logo et nom */}
        <div className="flex items-start gap-4">
          {/* Nom et statut */}
          <div className="flex-1">
            <h1 className="text-4xl">{data.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              {data.city && (<span className="text-gray-600">{data.city}</span>)}
              {data.city && data.subsector && (<span className="text-gray-600">|</span>)}
              {data.subsector && (<span className="text-gray-600">{data.subsector}</span>)}
            </div>
          </div>
        </div>

        {/* Points forts */}
        <StrengthsSection />

        {/* Chiffres clés */}
        <KeyFiguresSection data={data} />
        {/* Présentation */}
        <PresentationSection data={data} />

        {/* Sections 1, 2, 3 */}
        <CompanySectionsPreview data={data} />

        {/* Avantages */}
        <AdvantagesPreview data={data} />

        {/* Processus de recrutement */}
        <RecruitmentProcessPreview data={data} />
      </div>
    </div>
  );
}