import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchCompanyVersions,
  restoreCompanyVersion,
} from "../../features/company/companySlice";
import React from "react";

type Props = {
  companyId: string;
};

export default function VersionTimeline({ companyId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { versions } = useSelector((state: RootState) => state.company);

  // Charger les versions au montage
  React.useEffect(() => {
    dispatch(fetchCompanyVersions(companyId));
  }, [companyId, dispatch]);

  return (
    <div className="border-t mt-6 pt-4">
      <h2 className="text-lg font-semibold mb-2">🕓 Historique des versions</h2>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {versions.map((v) => (
          <li
            key={v.version_number}
            className="flex items-center justify-between border rounded-lg p-2 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium">Version {v.version_number}</p>
              <p className="text-sm text-gray-500">
                {new Date(v.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() =>
                dispatch(restoreCompanyVersion({ companyId, versionNumber: v.version_number }))
              }
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Restaurer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
