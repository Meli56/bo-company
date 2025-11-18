import StrengthsSection from "./preview/StrengthsSection";
import KeyFiguresSection from "./preview/KeyFiguresSection";
import PresentationSection from "./preview/PresentationSection";

type PreviewProps = {
  data: {
    name: string;
    description: string;
    color: string;
    logo?: string;
    banner_url?: string;
    city?: string;
    employees?: string;
    sector?: string;
    subsector?: string;
    parent_group?: string;
    parent_company?: string;
    strengths?: string[];
    status?: string;
    foundation_year?: string;
    revenue?: string;
    salaries?: string;
    salary_policy?: string;
    avg_seniority?: string;
    avg_age?: string;
    gender_parity_index?: string;
    gender_men_percentage?: string;
    gender_women_percentage?: string;
    labelsRse?: string[];
    labelsRh?: string[];
    socialNetworks?: string[];
  };
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

      {/* En-tête avec logo et nom */}
      <div className="mb-6">
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
      </div>

      {/* Points forts */}
      <div className="mb-6">
        <StrengthsSection />
      </div>

      {/* Chiffres clés */}
      <div className="mb-6">
        <KeyFiguresSection data={data} />
      </div>

      {/* Présentation */}
      <div className="mb-6">
        <PresentationSection data={data} />
      </div>
    </div>
  );
}