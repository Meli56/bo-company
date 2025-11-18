import BannerUpload from "./preview/BannerUpload";
import BasicInfoEditor from "./editor/BasicInfoEditor";
import ParentCompanyEditor from "./editor/ParentCompanyEditor";
import StrengthsEditor from "./editor/StrengthsEditor";
import KeyFiguresEditor from "./editor/KeyFiguresEditor";
import PresentationEditor from "./editor/PresentationEditor";
import Section1Editor from "./editor/Section1Editor";
import Section2Editor from "./editor/Section2Editor";
import Section3Editor from "./editor/Section3Editor";
import AdvantagesEditor from "./editor/AdvantagesEditor";
import RecruitmentProcessEditor from "./editor/RecruitmentProcessEditor";
import LegalInfoEditor from "./editor/LegalInfoEditor";

export default function EditorPanel({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <BannerUpload companyId={data.id} currentBannerUrl={data.banner_url} />

      <div className="border pt-12 rounded-lg">
        <BasicInfoEditor data={data} />
        <ParentCompanyEditor data={data} />
        <StrengthsEditor strengths={data.strengths} />
        <KeyFiguresEditor data={data} />
        <PresentationEditor data={data} />
        <Section1Editor data={data} />
        <Section2Editor data={data} />
        <Section3Editor data={data} />
        <AdvantagesEditor data={data} />
        <RecruitmentProcessEditor data={data} />
        <LegalInfoEditor data={data} />
      </div>
    </div>
  );
}
