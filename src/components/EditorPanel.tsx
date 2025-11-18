import BannerUpload from "./preview/BannerUpload";
import BasicInfoEditor from "./editor/BasicInfoEditor";
import ParentCompanyEditor from "./editor/ParentCompanyEditor";
import StrengthsEditor from "./editor/StrengthsEditor";
import KeyFiguresEditor from "./editor/KeyFiguresEditor";
import PresentationEditor from "./editor/PresentationEditor";

export default function EditorPanel({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <BannerUpload companyId={data.id} currentBannerUrl={data.banner_url} />

      <BasicInfoEditor data={data} />

      <ParentCompanyEditor data={data} />

      <StrengthsEditor strengths={data.strengths} />

      <KeyFiguresEditor data={data} />

      <PresentationEditor data={data} />
    </div>
  );
}
