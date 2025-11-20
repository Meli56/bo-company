import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import toast from 'react-hot-toast';
import {
  fetchCompany,
  saveCompanyData,
  revertDraft,
  saveNewVersion,
  fetchCompanyVersions,
} from "../features/company/companySlice";
import PreviewPanel from "../components/PreviewPanel";
import EditorPanel from "../components/EditorPanel";

const COMPANY_ID = "f1ef1c6f-aea7-4ded-a294-b08abe85f0a0"; 

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
        toast.success('Données et version enregistrées avec succès !', {
          duration: 4000,
          position: 'top-right',
        });
      } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        toast.error('Erreur lors de la sauvegarde: ' + (error as Error).message, {
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  };

  const handleRevert = () => {
    dispatch(revertDraft());
  };

  if (status === "loading") return <div className="p-10 text-gray-500">Chargement...</div>;
  if (!draft) return <div className="p-10 text-gray-500">Aucune donnée disponible</div>;

  return (
    <div className="p-8 bg-gray-100">
      <div className="mt-6 flex gap-3 justify-end py-4">
          <button
            onClick={handleRevert}
            className="px-4 py-2  hover:bg-black hover:text-white rounded-full border border-black border-1"
          >
            Revenir à la dernière version sauvegardée (annule les modifications en cours)
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#E90A5D] text-white rounded-full hover:bg-pink-700"
          >
            Enregistrer
          </button>
        </div>
        <div className="flex gap-6 ">
          <div className="flex-1 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between h-fit">
            <PreviewPanel data={draft} />
          </div>
          <div className="w-1/2 bg-white border-l p-6 shadow-lg flex flex-col justify-between rounded-lg">
            <EditorPanel data={draft} />

            {/* <VersionTimeline companyId={COMPANY_ID} /> */}
          </div>
        </div>
    </div>
  );
}