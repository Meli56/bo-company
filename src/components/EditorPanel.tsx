type EditorProps = {
  data: {
    name: string;
    description: string;
    color: string;
    logo?: string;
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
};

export default function EditorPanel({ data, setData }: EditorProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 w-full border rounded-md p-2"
        />

        {/* Preview mini du logo dans l'éditeur */}
        {data.logo && (
          <div className="mt-2 flex justify-center">
            <img
              src={data.logo}
              alt="Preview logo"
              className="w-28 h-16 object-cover rounded-full border"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="mt-1 w-full border rounded-md p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Couleur principale</label>
        <input
          type="color"
          value={data.color}
          onChange={(e) => setData({ ...data, color: e.target.value })}
          className="mt-1 w-full h-10 border rounded-md p-1"
        />
      </div>
    </form>
  );
}
