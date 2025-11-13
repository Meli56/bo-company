import { useDispatch } from "react-redux";
import { updateDraft } from "../features/company/companySlice";
import { AppDispatch } from "../app/store";
import { supabase } from "../lib/supabaseClient";
export default function EditorPanel({ data }: { data: any }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (key: string, value: string) => {
    dispatch(updateDraft({ [key]: value }));
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="mt-1 w-full border rounded-md p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Couleur principale</label>
        <input
          type="color"
          value={data.color}
          onChange={(e) => handleChange("color", e.target.value)}
          className="mt-1 w-full h-10 border rounded-md p-1"
        />
      </div>
    </form>
  );
}
