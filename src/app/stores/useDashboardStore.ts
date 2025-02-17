import { create } from "zustand";

interface DashboardState {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  projects: number;
  totalProjects:number;
  setDashboardData: (data: Partial<DashboardState>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  projects: 0,
  totalProjects: 0,
  setDashboardData: (data) => {
    console.log("Updating Zustand state with:", data); // ✅ Debugging log
    set((state) => ({ ...state, ...data })); // ✅ Ensure state is merged correctly
  },
}));
