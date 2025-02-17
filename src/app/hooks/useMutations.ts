import { useMutation, useQueryClient } from "@tanstack/react-query";

// Define the expected task structure
interface Task {
  id?: string; // Optional because it's not present before creation
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  priority?: "low" | "medium" | "high";
}

// Define the context type with the previous tasks
interface MutationContext {
  previousTasks?: Task[];
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task, MutationContext>({
    mutationFn: async (newTask: Task) => {
      const response = await fetch("/api/core/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      return response.json();
    },
    // ✅ Optimistic update
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [...old, newTask]);

      return { previousTasks };
    },
    // ✅ Rollback on error
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    // ✅ Refetch tasks after mutation
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
