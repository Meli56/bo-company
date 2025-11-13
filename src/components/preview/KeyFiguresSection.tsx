import { KeyFigures } from "../../types";

type KeyFiguresSectionProps = {
  data: KeyFigures;
};

export default function KeyFiguresSection({ data }: KeyFiguresSectionProps) {
  const figures = [
    {
      icon: "📅",
      label: "Année de fondation",
      value: data.foundation_year,
    },
    {
      icon: "€",
      label: "Chiffre d'affaires",
      value: data.revenue,
      suffix: "d'euros",
    },
    {
      icon: "💰",
      label: "Salaires",
      value: data.salaries,
    },
    {
      icon: "💼",
      label: "Politique de télétravail",
      value: data.salary_policy,
    },
    {
      icon: "📊",
      label: "Ancienneté moyenne",
      value: data.avg_seniority,
    },
    {
      icon: "🎂",
      label: "Moyenne d'âge",
      value: data.avg_age,
    },
    {
      icon: "⚖️",
      label: "Indice de parité",
      value: data.gender_parity_index,
    },
    {
      icon: "🧑",
      label: "Répartition H/F",
      value: data.gender_men_percentage,
    },
  ];

  const validFigures = figures.filter(f => f.value && f.value.trim() !== "");

  if (validFigures.length === 0) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Qui sommes-nous ?</h2>

      <div className="grid grid-cols-3 gap-4">
        {validFigures.map((figure, index) => (
          <div key={index} className="bg-blue-100 rounded-lg p-4">
            <div className="text-2xl mb-2">{figure.icon}</div>
            <div className="text-sm text-gray-600 mb-1">{figure.label}</div>
            <div className="text-lg font-bold text-gray-900">
              {figure.value}
              {figure.suffix && (
                <div className="text-xs font-normal text-gray-600 mt-1">
                  {figure.suffix}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
