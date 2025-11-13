import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCompany, saveCompany } from "../../services/companyService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";
import {
  getCompanyVersions,
  getCompanyVersion,
  saveCompanyVersion,
} from "../../services/companyService";

// Types
interface Version {
  version_number: number;
  created_at: string;
  data: any;
}

interface CompanyState {
  data: Company | null;
  draft: Company | null;
  versions: Version[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

interface CompanyState {
  data: Company | null;
  draft: Company | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}
export interface Company {
  id: string;
  name: string;
  description: string;
  color: string;
  logo?: string;
}

const initialState: CompanyState = {
  data: null,
  draft: null,
  versions: [],
  status: "idle",
};

// 🔄 Thunks asynchrones (appel à Supabase)
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (id: string) => {
    return await getCompany(id);
  }
);

export const saveCompanyData = createAsyncThunk(
  "company/saveCompanyData",
  async (company: Company) => {
    await saveCompany(company);
    return company;
  }
);

// Thunks pour gérer les versions
export const fetchCompanyVersions = createAsyncThunk(
  "company/fetchVersions",
  async (companyId: string) => {
    return await getCompanyVersions(companyId);
  }
);

export const saveNewVersion = createAsyncThunk(
  "company/saveNewVersion",
  async (company: Company) => {
    await saveCompanyVersion(company);
    return company;
  }
  
);

export const restoreCompanyVersion = createAsyncThunk(
  "company/restoreVersion",
  async ({ companyId, versionNumber }: { companyId: string; versionNumber: number }) => {
    return await getCompanyVersion(companyId, versionNumber);
  }
);

/// Reducers + extraReducers
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateDraft: (state, action: PayloadAction<Partial<Company>>) => {
      if (state.draft) {
        state.draft = { ...state.draft, ...action.payload };
      }
    },
    revertDraft: (state) => {
      if (state.data) {
        state.draft = JSON.parse(JSON.stringify(state.data));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Chargement des données de l'entreprise
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.draft = JSON.parse(JSON.stringify(action.payload)); // Initialise draft
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // Sauvegarde des données
      .addCase(saveCompanyData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.draft = JSON.parse(JSON.stringify(action.payload));
      })
      
      // Chargement des versions
      .addCase(fetchCompanyVersions.fulfilled, (state, action) => {
        state.versions = action.payload;
      })
      
      // Sauvegarde d'une nouvelle version
      .addCase(saveNewVersion.fulfilled, (state, action) => {
        // La nouvelle version sera ajoutée par fetchCompanyVersions
      })
      
      // Restauration d'une version
      .addCase(restoreCompanyVersion.fulfilled, (state, action) => {
        state.draft = JSON.parse(JSON.stringify(action.payload));
      });
  },
});

export const { updateDraft, revertDraft } = companySlice.actions;
export default companySlice.reducer;
