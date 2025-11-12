import { useState, useEffect } from "react";
import PreviewPanel from "../components/PreviewPanel";
import EditorPanel from "../components/EditorPanel";

export default function AdminPage() {
  const [savedData, setSavedData] = useState(() => {
    const stored = localStorage.getItem("companyData");
    return stored
        ? JSON.parse(stored)
        : {
            name: "Ma Super Entreprise",
            description: "Nous faisons des choses incroyables !",
            color: "#2563eb",
            logo: "", // 👈 ajout du logo
        };
    });


  const [draftData, setDraftData] = useState(savedData);

  // 🔄 Sauvegarde automatique du brouillon (facultatif)
  useEffect(() => {
    const draft = localStorage.getItem("companyDraft");
    if (draft) {
        setDraftData(JSON.parse(draft));
    }
  }, []);

  // ✅ Fonctions de gestion
  const handleSave = () => {
    setSavedData(draftData);
    localStorage.setItem("companyData", JSON.stringify(draftData));
    alert("✅ Données enregistrées !");
  };

  const handleRevert = () => {
    setDraftData(savedData);
    alert("↩️ Revenu à la dernière version enregistrée !");
  };

  return (
    <div className="flex h-screen">
      {/* Preview */}
      <div className="flex-1 bg-gray-50 p-8">
        <PreviewPanel data={draftData} />
      </div>

      {/* Éditeur */}
      <div className="w-2/5 bg-white border-l p-8 shadow-lg flex flex-col justify-between">
        <EditorPanel data={draftData} setData={setDraftData} />

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={handleRevert}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Revenir à l'état enregistré
          </button>

          <button
            onClick={() => {
                localStorage.setItem("companyDraft", JSON.stringify(draftData));
                alert("📝 Brouillon sauvegardé !");
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Sauvegarder en tant que brouillon 
            </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
