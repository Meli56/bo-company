import BannerUpload from "./preview/BannerUpload";
import BasicInfoEditor from "./editor/BasicInfoEditor";
import BusinessInfoEditor from "./editor/BusinessInfoEditor";
import ParentCompanyEditor from "./editor/ParentCompanyEditor";
import StrengthsEditor from "./editor/StrengthsEditor";
import KeyFiguresEditor from "./editor/KeyFiguresEditor";

export default function EditorPanel({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <BannerUpload companyId={data.id} currentBannerUrl={data.banner_url} />

      <BasicInfoEditor data={data} />

      <BusinessInfoEditor data={data} />

      <ParentCompanyEditor data={data} />

      <StrengthsEditor strengths={data.strengths} />

      <KeyFiguresEditor data={data} />
    </div>
  );
}
