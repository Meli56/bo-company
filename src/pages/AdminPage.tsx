import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  fetchCompany,
  saveCompanyData,
  revertDraft,
  saveNewVersion,
  fetchCompanyVersions,
} from "../features/company/companySlice";
import PreviewPanel from "../components/PreviewPanel";
import EditorPanel from "../components/EditorPanel";
import VersionTimeline from "../components/VersionTimeline";

const COMPANY_ID = "8b9d08ac-3aae-4314-ae05-096615c71395"; 

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { draft, status } = useSelector((state: RootState) => state.company);

  useEffect(() => {
    dispatch(fetchCompany(COMPANY_ID));
  }, [dispatch]);

  const handleSave = async () => {
    if (draft) {
      try {
        await dispatch(saveCompanyData(draft)).unwrap();
        await dispatch(saveNewVersion(draft)).unwrap();
        // Recharge les versions après sauvegarde
        await dispatch(fetchCompanyVersions(COMPANY_ID)).unwrap();
        alert("✅ Données et version enregistrées avec succès !");
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        alert("❌ Erreur lors de la sauvegarde: " + (error as Error).message);
      }
    }
  };

  const handleRevert = () => {
    dispatch(revertDraft());
  };

  if (status === "loading") return <div className="p-10 text-gray-500">Chargement...</div>;
  if (!draft) return <div className="p-10 text-gray-500">Aucune donnée disponible</div>;

  return (
    <div className="flex h-screen p-8 bg-gray-100 gap-6">
      <div className="flex-1 p-6 bg-white shadow-lg">
        <PreviewPanel data={draft} />
      </div>
      <div className="w-1/2 bg-white border-l p-8 shadow-lg flex flex-col justify-between">
        <EditorPanel data={draft} />

        <VersionTimeline companyId={COMPANY_ID} />

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={handleRevert}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ↩️ Revenir
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            💾 Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}