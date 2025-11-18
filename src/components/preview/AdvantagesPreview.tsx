import { Company } from "../../types/company.types";

type AdvantagesPreviewProps = {
  data: Company;
};

export default function AdvantagesPreview({ data }: AdvantagesPreviewProps) {
  if (!data.advantages || data.advantages.length === 0) return null;

  // Grouper les avantages par catégorie
  const advantagesByCategory = data.advantages.reduce((acc, advantage) => {
    if (!acc[advantage.category]) {
      acc[advantage.category] = [];
    }
    acc[advantage.category].push(advantage.advantage_text);
    return acc;
  }, {} as Record<string, string[]>);

  const categoryIcons: { [key: string]: string } = {
    "Rémunération": "💰",
    "Confort": "🛋️",
    "Vie d'entreprise": "🎉",
    "Santé & Bien-être": "🏥",
    "Formation": "📚",
    "Avantages sociaux": "🎁",
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl mb-6">Raisons de nous rejoindre</h2>
      <div className="flex flex-wrap gap-4 p-4 bg-blue-50 rounded-lg">
        {Object.entries(advantagesByCategory).map(([category, advantages]) =>
            advantages.map((advantage: string, index: number) => (
                <span
                    key={`${category}-${index}`}
                    className="flex items-center gap-3"
                >
                    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.20588 8.75694C4.00418 8.75412 3.81178 8.67325 3.67059 8.53194L0.305882 5.30694C0.218234 5.24246 0.145734 5.16027 0.0932917 5.06593C0.0408498 4.97158 0.00969059 4.86729 0.00192392 4.7601C-0.00584276 4.65292 0.00996452 4.54535 0.0482753 4.44468C0.0865861 4.34401 0.146506 4.25259 0.223977 4.17661C0.301449 4.10062 0.394663 4.04186 0.497307 4.00428C0.599952 3.96671 0.70963 3.95121 0.818915 3.95882C0.928201 3.96644 1.03454 3.997 1.13074 4.04843C1.22693 4.09987 1.31073 4.17097 1.37647 4.25694L4.20588 6.95694L11.0118 0.206936C11.0871 0.137992 11.1755 0.0842723 11.272 0.0488447C11.3685 0.013417 11.4711 -0.00302513 11.5741 0.000457069C11.6771 0.00393926 11.7783 0.0272777 11.8721 0.0691396C11.9659 0.111002 12.0503 0.170567 12.1206 0.244436C12.1909 0.318304 12.2457 0.405029 12.2818 0.499658C12.3179 0.594288 12.3347 0.694969 12.3311 0.795952C12.3276 0.896936 12.3038 0.996245 12.2611 1.08821C12.2184 1.18017 12.1577 1.26299 12.0824 1.33194L4.74118 8.53194C4.59999 8.67325 4.40759 8.75412 4.20588 8.75694Z" fill="#5C99FF"/>
                    </svg>
                    {advantage}
                </span>
            ))
        )}
      </div>
    </div>
  );
}
