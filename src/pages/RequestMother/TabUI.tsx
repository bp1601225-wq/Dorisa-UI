
import { Button } from "@mui/material";
import { CheckCircle, ClipboardList, FolderKanban } from "lucide-react";

export type RequestReviewTab = "requests" | "proposals" | "approved" | "projects";

type TabsUIProps = {
  activeTab: RequestReviewTab;
  onChange: (tab: RequestReviewTab) => void;
};

export default function TabsUI({ activeTab, onChange }: TabsUIProps) {
  return (
    <div className="w-full p-4 pb-0">
      <div className="flex flex-wrap gap-3">
        <Button
          variant={activeTab === "requests" ? "contained" : "outlined"}
          startIcon={<ClipboardList size={18} />}
          onClick={() => onChange("requests")}
        >
          Requests
        </Button>

      <Button
          variant={activeTab === "proposals" ? "contained" : "outlined"}
          startIcon={<CheckCircle size={18} />}
          onClick={() => onChange("proposals")}
        >
          proposals
        </Button>



        {/* <Button
          variant={activeTab === "approved" ? "contained" : "outlined"}
          startIcon={<CheckCircle size={18} />}
          onClick={() => onChange("approved")}
        >
          Approved
        </Button> */}

        {/* <Button
          variant={activeTab === "projects" ? "contained" : "outlined"}
          startIcon={<FolderKanban size={18} />}
          onClick={() => onChange("projects")}
        >
          Projects
        </Button> */}
      </div>
    </div>
  );
}
