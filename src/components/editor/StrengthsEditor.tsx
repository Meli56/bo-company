import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";

type StrengthsEditorProps = {
  strengths?: string[];
};

export default function StrengthsEditor({ strengths }: StrengthsEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleStrengthsChange = (index: number, value: string) => {
    const newStrengths = [...(strengths || ["", "", ""])];
    newStrengths[index] = value;
    dispatch(updateDraft({ strengths: newStrengths }));
  };

  return (
    <div className="border-t py-12 px-8">
      <h3 className="text-xl font-semibold mb-4">
        Aviz
      </h3>
      <p>Renforcez votre marque employeur et inspirez confiance aux candidats. Aviz vous permet de mettre en avant des témoignages de vos collaborateurs.</p>
    </div>
  );
}
