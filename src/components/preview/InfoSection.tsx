import { BusinessInfo, CorporateStructure } from "../../types";

type InfoSectionProps = {
  data: BusinessInfo & CorporateStructure;
};

export default function InfoSection({ data }: InfoSectionProps) {
  const infoItems = [
    { label: "Siège social", value: data.city },
    { label: "Secteur", value: data.sector },
    { label: "Sous-secteur", value: data.subsector },
    { label: "Appartient au groupe", value: data.parent_group },
    { label: "Entreprise parente", value: data.parent_company },
  ];

  const hasInfo = infoItems.some(item => item.value);

  if (!hasInfo) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 flex items-center justify-center">
          <span className="text-lg">ℹ️</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Informations générales</h2>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Mettez en avant les vals de vos collaborateurs. Les avis renforcent la confiance et crédibilisent votre discours.
      </p>

      <div className="space-y-3">
        {infoItems.map((item, index) => (
          item.value && (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="text-sm font-medium text-gray-700">{item.label}*</div>
              <div className="text-sm text-gray-900">{item.value}</div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
