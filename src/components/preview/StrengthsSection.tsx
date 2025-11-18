type StrengthsSectionProps = {
  strengths?: string[];
};

export default function StrengthsSection() {
  return (
    <div className="bg-blue-100 rounded-lg p-6 border border-blue-100 my-12">
      <h3 className="text-base mb-3 flex flex-col">
        Les salariés dévoilent 
        <span className="font-bold">les points forts de l'entreprise</span>
      </h3>
      <div className="flex gap-3 flex-wrap h-[60px]">
        {Array.from({ length: 7 }).map((_, i) => {
          const randomWidth = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
          return (
            <div
              key={i}
              className="bg-gray-50 rounded-[4px] h-6"
              style={{ width: `${randomWidth}px` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
