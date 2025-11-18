import { KeyFigures } from "../../types";
import KeyFiguresEditor from "../editor/KeyFiguresEditor";

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

  // const validFigures = figures.filter(f => f.value && f.value.trim() !== "");

  if (figures.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl mb-6">Qui sommes-nous ?</h2>
      <div className="grid grid-cols-3 gap-4">
        {figures.map((figure, index) => {
          const classes = figure.value != "" ? "bg-blue-100" : "bg-white border border-blue-100 border-2 opacity-60";
          return (
            <div key={index} className={classes + " rounded-lg p-4"}>
              <div className="text-3xl mb-2">{figure.icon}</div>
              <div className="text-sm mb-2">{figure.label}</div>
              {figure.value ? (
                <div className="text-sm font-bold">
                  {figure.value}
                </div>
              ) : (
                <div className="w-28 rounded-3xl h-2 bg-gray-200"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
