import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "../app/stores/useDashboardStore";

const fetchDashboardData = async () => {
  const res = await fetch("/api/core/dashboard");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}; 
 
export function useDashboardData() {
  const updateStats = useDashboardStore((state) => state.updateStats);
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    onSuccess: (data) => updateStats(data),
  });
}

// Example mutation for updating dashboard stats
export function useUpdateDashboard() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newData) => {
      const res = await fetch("/api/core/dashboard", {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update dashboard");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard"]); // Refetch dashboard data after update
    },
  });
}
