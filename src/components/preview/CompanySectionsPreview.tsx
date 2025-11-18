import { Company } from "../../types/company.types";

type CompanySectionsPreviewProps = {
  data: Company;
};

export default function CompanySectionsPreview({ data }: CompanySectionsPreviewProps) {
  const hasSection1 = data.section1?.title || data.section1?.description || (data.section1Videos && data.section1Videos.length > 0);
  const hasSection2 = data.section2?.title || data.section2?.description || (data.section2Photos && data.section2Photos.length > 0);
  const hasSection3 = data.section3?.title || data.section3?.description;

  if (!hasSection1 && !hasSection2 && !hasSection3) return null;

  return (
    <div className="flex flex-col gap-12 mt-12">
        {/* Section 1 */}
        <section>
            {data.section1?.title ? (
                <h2 className="text-3xl mb-4">{data.section1.title}</h2>
            ) : ( 
                <h2 className="text-3xl mb-4 opacity-40">Section 1</h2>
            )}
            {data.section1?.description ? (
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {data.section1.description}
                </div>
            ) : (
                <div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                </div>
            )}
            {data.section1Videos && data.section1Videos.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-12">
                {data.section1Videos.map((video, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-center justify-center aspect-video">
                    <div className="text-center">
                        <div className="text-4xl mb-2">▶</div>
                        <p className="text-sm text-gray-600">{video.video_name || 'Vidéo'}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </section>

        {/* Section 2 */}
        <section>
            {data.section2?.title ? (
                <h2 className="text-3xl mb-4">{data.section2.title}</h2>
            ) : ( 
                <h2 className="text-3xl mb-4 opacity-40">Section 2</h2>
            )}
            {data.section2?.description ? (
                <div className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {data.section2.description}
                </div>
            ) : (
                <div>
                <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                </div>
            )}
            {data.section2Photos && data.section2Photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-12">
                    {data.section2Photos.map((photo, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg aspect-[3/2] overflow-hidden">
                        {photo.photo_url ? (
                        <img 
                            src={photo.photo_url} 
                            alt={photo.photo_name || `Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">📷</span>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            )}
        </section>

        {/* Section 3 */}
        <section>
          {data.section3?.title ? (
                <h2 className="text-3xl mb-4">{data.section3.title}</h2>
            ) : ( 
                <h2 className="text-3xl mb-4 opacity-40">Section 3</h2>
            )}
            {data.section3?.description ? (
                <div className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {data.section3.description}
                </div>
            ) : (
                <div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-4/5 mb-2"></div>
                    <div className="rounded-3xl h-2 bg-gray-200 w-3/5 mb-2"></div>
                </div>
            )}
        </section>
    </div>
  );
}
