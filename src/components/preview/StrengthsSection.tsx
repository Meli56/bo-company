type StrengthsSectionProps = {
  strengths?: string[];
};

export default function StrengthsSection() {
  return (
    <div className="bg-blue-100 rounded-lg p-6 border border-blue-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Les salariés dévoilent les points forts de l'entreprise
      </h3>
      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            className="bg-white rounded-[4px] h-6 w-40"
          ></div>
        ))}
      </div>
    </div>
  );
}
