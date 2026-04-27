import { create } from "zustand";
import type { ProjectType } from "../../GlobalTypes";
import api from "../api";
import { toast } from "sonner";

type ProjectStoreType = {
  projects: ProjectType[];

  fetchProjects: () => Promise<void>;
  createProjects: (project: ProjectType) =>  Promise<void>;
  updateProjects: (project: ProjectType) => Promise<void>;
  deleteProjects: (id: string) => void;
  updateProjectProgressAPI: (id:string, progress:number) => Promise<void>
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
    } catch (error:any) {
      console.log(error.response.data);
      toast.error("Failed to create project");
    }
  },

  // UPDATE (not done yet)
  updateProjects: async (UpdatedProject: ProjectType) => {

  },

  // DELETE (not done yet)
  deleteProjects: async (id: string) => {

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
        project.id === projectId ? { ...project, ...updatedProject } : project
      ),
    }));


    get().fetchProjects()
  } catch (error: any) {
    console.log(error.response?.data);
  }
}


}));
