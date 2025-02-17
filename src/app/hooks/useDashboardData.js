import { useQuery } from "@tanstack/react-query";
import { useDashboardStore } from "../stores/useDashboardStore";

// Define the expected shape of dashboard data


const fetchDashboardData = async () => {
  const res = await fetch("/api/core/dashboard");
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  console.log("Fetched from API:", data); // ✅ Log before returning
  return data;
};

export function useDashboardData() {
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);

  return useQuery<setDashboardData>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    onSuccess: (data) => {
      console.log("Updating Zustand with API data:", data);
      setDashboardData(data);
    },
  });
}
