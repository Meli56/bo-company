type PresentationSectionProps = {
  data: {
    description?: string;
    labelsRse?: string[];
    labelsRh?: string[];
    socialNetworks?: string[];
  };
};

export default function PresentationSection({ data }: PresentationSectionProps) {
  const { description, labelsRse, labelsRh, socialNetworks } = data;

  // Filtrer les réseaux sociaux qui ont des valeurs
  const activeSocialNetworks = (socialNetworks || []).filter(link => link && link.trim() !== '');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border flex flex-col gap-4">
      <h2 className="text-2xl font-semibold mb-4">Présentation</h2>
      
      {/* Description */}
      <div>
        {description ? (
            <div className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
            {description}
            </div>
        ) : (
            <>
            <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
            <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
            <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
            <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
            </>
        )}
      </div>
      

        {/* Labels RSE */}
        <h3 className="text-sm font-medium text-gray-700 flex gap-2 place-items-baseline">Nos labels RSE : 
            {labelsRse && labelsRse.length > 0 ? (
                labelsRse.join(', ')
            ) : (
                <div className="rounded-3xl h-2 bg-gray-200 w-8 mb-2"></div>
            )}
        </h3>

      {/* Labels RH */}
        <h3 className="text-sm font-medium text-gray-700 flex gap-2 place-items-baseline">Nos labels RH : 
            {labelsRh && labelsRh.length > 0 ? (
                labelsRh.join(', ')
            ) : (
                <div className="rounded-3xl h-2 bg-gray-200 w-8 mb-2"></div>
            )}
        </h3>

      {/* Réseaux sociaux */}
      {activeSocialNetworks.length > 0 && (
        <h3 className="text-sm font-medium text-gray-700">
        Nos réseaux : 
        {activeSocialNetworks.map((link, index) => {
            // Déterminer l'icône selon l'index
            let icon = '🔗';
            if (link.includes('facebook') || index === 0) icon = 'F';
            else if (link.includes('twitter') || link.includes('x.com') || index === 1) icon = '𝕏';
            else if (link.includes('youtube') || index === 2) icon = '▶';
            else if (link.includes('instagram') || index === 3) icon = '📱';
            else if (link.includes('tiktok') || index === 4) icon = '♪';

            return (
            <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-2 hover:opacity-70 transition-opacity"
                title={link}
            >
                {icon}
            </a>
            );
        })}
        </h3>
      )}
    </div>
  );
}
