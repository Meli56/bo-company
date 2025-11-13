type PreviewProps = {
  data: {
    name: string;
    description: string;
    color: string;
    logo?: string;
  };
};

export default function PreviewPanel({ data }: PreviewProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center gap-6">
      {/* Logo */}
      {/* {data.logo && (
        <img
          src={data.logo}
          alt="Logo de l'entreprise"
          className="w-40 h-24 object-cover rounded-full shadow-md"
        />
      )} */}

      {/* Nom */}
      <h1 className="text-4xl font-bold" style={{ color: data.color }}>
        {data.name}
      </h1>

      {/* Description */}
      <p className="text-gray-700 max-w-md">{data.description}</p>
    </div>
  );
}