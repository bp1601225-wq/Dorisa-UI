import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import {
type MilestoneType,
type ProjectType,
type ProposalVersionType,
} from "../../../../GlobalTypes";

import ProjectlLeftPanel from "./leftPanel";

import { Button } from "@mui/material";

import { useForm } from "react-hook-form";

import { InputText } from "../../utils/utils";

import { zodResolver } from "@hookform/resolvers/zod";

import {
MileStoneSchema,
type MileStoneField,
} from "../../../Zod_Schema/schemaValidations";

import { useProjectStore } from "../../../ZustandShare/ProjectZuts";

import { Loader2 } from "lucide-react";

function ProjectReviews() {
const { id } = useParams();

const [selected, setSelected] = useState<ProjectType | null>(null);

const [Isloading, setIsLoading] = useState<boolean>(false);

const [showInput, setShowInput] = useState<boolean>(false);

// show between previous and new version
const [showVersion, setShowVersion] = useState<
"new" | "prev" | ""
>("new");

const {
register,
handleSubmit,
formState: { errors },
} = useForm<MileStoneField>({
resolver: zodResolver(MileStoneSchema),
});

const { createMileStone } = useProjectStore();

async function BuildMileStones(data: MileStoneField) {
try {
setIsLoading(true);

if (!selected) return;

const NewBuildMileStonesObject: MilestoneType = {
...data,
projectId: selected.id!,
status: "pending",
};

await createMileStone(NewBuildMileStonesObject);
} catch (error) {
console.log(error);
} finally {
setIsLoading(false);
}
}

useEffect(() => {
const fetchProject = async () => {
try {
const results = await api.get(`/get-projects-by-id/${id}`);

setSelected(results.data.data);
} catch (error) {
console.error(error);
}
};

if (id) fetchProject();
}, [id]);

if (!selected) return null;

// check if proposal has versions
const IsversionIncluded = selected.proposal?.versions;

return (



<div className="flex gap-6 mt-4 ">
{/* LEFT PANEL */}


<div className="w-[35%] h-screen overflow-y-auto pr-2">
<div className="flex flex-col ">
<span className="mb-1">
you can view old and new update of suggested proposals
</span>

<select
className="w-70 border p-2 mb-3 rounded-md outline-none"
value={showVersion}
onChange={(e) =>
  setShowVersion(e.target.value as "new" | "prev")
}
>
<option value="new">New Version</option>

<option value="prev">Previous Version</option>
</select>

<hr className="border border-gray-200 mb-3" />

{IsversionIncluded && showVersion === "new" ? (
<>
  <div className="space-y-4">
    {/* HEADER */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <h1 className="font-semibold text-blue-700 text-sm tracking-wide">
        You are currently viewing the latest proposal version
      </h1>

      <p className="text-gray-600 text-sm mt-1">
        Compare updated proposal details, pricing, and revision
        notes.
      </p>
    </div>

    {/* VERSION CARDS */}
    {IsversionIncluded.map(
      (value: ProposalVersionType, index: number) => {
        const { version, amount, message } = value;

        return (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Proposal Version
                </p>

                <h2 className="font-bold text-lg text-gray-800">
                  v{version}
                </h2>
              </div>

              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                Latest
              </span>
            </div>

            {/* BODY */}
            <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">
                  Updated Amount
                </p>

                <h1 className="text-xl font-bold text-gray-800">
                  ${amount}
                </h1>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">
                  Revision Message
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
          </div>
        );
      }
    )}
  </div>
</>
) : (
<>

  <ProjectlLeftPanel selected={selected} />
</>
)}
</div>
</div>

{/* RIGHT PANEL */}
<div className="w-[65%] space-y-4">
{/* HEADER CARD */}
<div className="bg-green-50 p-4 border-l-4 border-green-500 rounded-xl flex items-start gap-3">
<div>
<h1 className="text-lg">
  Project Review & Milestone Creation
</h1>

<p className="text-sm text-gray-600 mt-1">
  Track changes between proposal versions and define project
  milestones clearly.
</p>
</div>
</div>

{/* SHOW FORM BUTTON */}
<Button
variant="contained"
color="primary"
onClick={() => setShowInput(true)}
sx={{
backgroundColor:"black"
}}
>
Open Milestone Form
</Button>

{/* FORM */}
{showInput && (
<>
<form onSubmit={handleSubmit(BuildMileStones)}>
  <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 space-y-4 mt-3">
    <h2 className="font-semibold text-gray-800">
      Project Milestones
    </h2>

    {/* TITLE */}
    <div className="flex flex-col gap-1">
      <InputText
        text={"Title"}
        placeholder={"eg: Business Assessment"}
        register={register("title")}
      />
    </div>

    {errors.title && (
      <p className="text-red-500 text-sm">
        {errors.title.message}
      </p>
    )}

    {/* DESCRIPTION */}
    <label>Description</label>

    <textarea
      {...register("description")}
      className="outline-none border border-gray-400 min-w-[400px] p-1 min-h-[200px]"
      placeholder={`Milestone 1: Business Assessment
• Review the client's business situation
• Identify challenges and opportunities

Milestone 2: Strategy Planning
• Create a clear business improvement plan
• Define goals and success direction

Milestone 3: Advisory Implementation
• Guide client through recommended changes
• Support decision-making and execution

Milestone 4: Review & Growth Plan
• Evaluate results and improvements
• Provide long-term growth recommendations`}
    />

    {errors.description && (
      <p className="text-red-500 text-sm">
        {errors.description.message}
      </p>
    )}

    {/* AMOUNT */}
    <div className="flex flex-col gap-1">
      <InputText
        text="Amount"
        placeholder="Enter amount"
        register={register("amount", {
          valueAsNumber: true,
        })}
      />

      {errors.amount && (
        <p className="text-red-500 text-sm">
          {errors.amount.message}
        </p>
      )}
    </div>
  </div>

  {/* SUBMIT BUTTON */}
  <Button
    variant="contained"
    color="primary"
    type="submit"
    disabled={Isloading}
    sx={{
      textTransform: "capitalize",
      marginTop: "10px",
    }}
  >
    {Isloading ? (
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin w-4 h-4" />
        Submitting...
      </div>
    ) : (
      "Establish milestones"
    )}
  </Button>
</form>
</>
)}

{/* LOADER */}
{Isloading && (
<div className="flex items-center gap-2 text-sm text-gray-600">
<Loader2 className="animate-spin w-4 h-4" />
Loading...
</div>
)}
</div>
</div>
);
}

export default ProjectReviews;