import InfoSection from "./preview/InfoSection";
import StrengthsSection from "./preview/StrengthsSection";
import KeyFiguresSection from "./preview/KeyFiguresSection";

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
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            {data.status && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">{data.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Ville et employés */}
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          {data.city && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>Mis à jour il y a 2h</span>
            </div>
          )}
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

      {/* Informations générales */}
      <div className="mb-6">
        <InfoSection data={data} />
      </div>
    </div>
  );
}