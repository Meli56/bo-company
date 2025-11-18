import { useDispatch } from "react-redux";
import { updateDraft } from "../../features/company/companySlice";
import { AppDispatch } from "../../app/store";
import { Company } from "../../types/company.types";

type LegalInfoEditorProps = {
  data: Company;
};

export default function LegalInfoEditor({ data }: LegalInfoEditorProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLegalChange = (field: 'raison_sociale' | 'code_naf' | 'siret' | 'siren', value: string) => {
    dispatch(updateDraft({
      legalInfo: {
        ...data.legalInfo,
        [field]: value,
      }
    }));
  };

  return (
    <div className="border-t py-12 px-8">
      <h3 className="text-xl font-semibold mb-4">Infos légales</h3>
      <p className="text-sm text-gray-600 mb-4">
        Ces informations ne seront pas visibles par les candidats
      </p>

      <div className="space-y-4">
        {/* Raison sociale */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raison sociale*
          </label>
          <input
            type="text"
            value={data.legalInfo?.raison_sociale || ''}
            onChange={(e) => handleLegalChange('raison_sociale', e.target.value)}
            placeholder="Ex: Hellowork SAS"
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Code NAF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code NAF*
          </label>
          <input
            type="text"
            value={data.legalInfo?.code_naf || ''}
            onChange={(e) => handleLegalChange('code_naf', e.target.value)}
            placeholder="Ex: 6201Z"
            className="w-full border rounded-md p-2"
            maxLength={10}
          />
        </div>

        {/* SIRET */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SIRET*
          </label>
          <input
            type="text"
            value={data.legalInfo?.siret || ''}
            onChange={(e) => handleLegalChange('siret', e.target.value)}
            placeholder="Ex: 12345678901234"
            className="w-full border rounded-md p-2"
            maxLength={14}
          />
        </div>

        {/* SIREN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SIREN*
          </label>
          <input
            type="text"
            value={data.legalInfo?.siren || ''}
            onChange={(e) => handleLegalChange('siren', e.target.value)}
            placeholder="Ex: 123456789"
            className="w-full border rounded-md p-2"
            maxLength={9}
          />
        </div>
      </div>
    </div>
  );
}
