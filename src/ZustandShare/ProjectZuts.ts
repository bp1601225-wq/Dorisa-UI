import { create } from "zustand";
import type { MilestoneType, ProjectType } from "../../GlobalTypes";
import api from "../api";
import { toast } from "sonner";


// A project cannot be marked “COMPLETED” if any milestone is still “PENDING”
// A milestone cannot exceed the total project budget
// When all milestones = COMPLETE → project auto-completes
// Only admin can approve milestone completion

type ProjectStoreType = {
  projects: ProjectType[];
  mileStone: MilestoneType[]

  fetchProjects: () => Promise<void>;
  createProjects: (project: ProjectType) => Promise<ProjectType | undefined>;
  updateProjects: (project: ProjectType) => Promise<void>;
  deleteProjects: (id: string) => void;
  updateProjectProgressAPI: (id: string, progress: number) => Promise<void>;

  // MileStone
  fetchMileStone:()=>Promise<void>
  createMileStone:(mileStone:MilestoneType) => void
  updateMileStoneStatus: (MileStoneId:string, status:string) => Promise<void>


  
};

export const useProjectStore = create<ProjectStoreType>((set, get) => ({
  projects: [],

  // GET ALL
  fetchProjects: async () => {
    try {
      const response = await api.get("/get-all-projects");

      set({
        projects: response.data.data, // adjust depending on backend shape
      });


    //   toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch projects");
    }
  },

  // CREATE
  createProjects: async (project: ProjectType) => {
    try {
      const response = await api.post("/create-projects", project);

      set((state) => ({
        projects: [...state.projects, response.data.data],
      }));

      toast.success(response.data.message);

      get().fetchProjects()
      
    } catch (error:any) {
      console.log(error.response.data);
      toast.error("Failed to create project");
    }
  },

  // UPDATE (not done yet)
  updateProjects: async (_UpdatedProject: ProjectType) => {

  },

  // DELETE (not done yet)
  deleteProjects: async (_id: string) => {

  },

updateProjectProgressAPI: async (projectId: string, progress: number) => {
  try {
    const response = await api.patch(
      `/update-project-progress/${projectId}/progress`,
      { progress }
    );

    const updatedProject = response.data?.data ?? response.data;

    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ?

      // take old project, overide with new data if it does match leave
       { ...project, ...updatedProject } : project
      ),
    }));


    get().fetchProjects()
  } catch (error: any) {
    console.log(error.response?.data);
  }
},


// Project MileStone attained
mileStone:[],

fetchMileStone:async () => {
try {
const response = await api.get("/get-all-milestone")

const data = response.data?.data ?? response.data;
set({
  mileStone: Array.isArray(data) ? data : [],
});

toast.success(response.data.message)
console.log(response.data.message)
} catch (error:any){
    const message = error.response.data.message
    toast.error(message)
    console.log(message)
}

 },

createMileStone: async (createdStone:MilestoneType) => {

  try {
      // make an API call
  const response = await api.post("/create-milestone", createdStone)

set ((state)=>({
  mileStone: [...state.mileStone, response.data?.data ?? response.data]
}))

toast.success(response.data.message)

} catch (error:any){
    const message = error.response.data.error
    toast.error(message)
    console.log(message)
  }

},

// MileStone status
updateMileStoneStatus: async (MileStoneId, status) => {

  try {

    // make API call
    const response = await api.patch(
      `/update-milestone-routes/${MileStoneId}`,
      { status }
    );

    const updatedMilestone: Partial<MilestoneType> =
      response.data?.data ?? response.data ?? {};

    const updatedStatus =
      (updatedMilestone as any).status ?? response.data?.data?.status ?? status;

    // update UI
    // The UI renders milestones from `projects[].MileStone`, not `mileStone`,
    // so update both slices for instant UI updates.

set((state) => ({
  mileStone: state.mileStone.map((stones) =>
    stones.id === MileStoneId ? { ...stones, status: updatedStatus } : stones
  ),
  
  projects: state.projects.map((project) => {
    const milestones = project.MileStone ?? [];
    const hasMilestone = milestones.some((m) => m.id === MileStoneId);
    if (!hasMilestone) return project;

    return {
      ...project,
      MileStone: milestones.map((m) =>
        m.id === MileStoneId ? { ...m, status: updatedStatus } : m
      ),
    };
  }),
}));

    // Your backend may also update projectStatus/progress in the same transaction,
    // but if the API returns only the milestone, the frontend can't know the new project fields.
    // Refetch projects to sync projectStatus/progress immediately.
    await get().fetchProjects();

    toast.success(response.data.message)

  } catch (error: any) {
toast.error(error.response.data.message)
    console.log(error.response.data.message);

  }
}



}));
