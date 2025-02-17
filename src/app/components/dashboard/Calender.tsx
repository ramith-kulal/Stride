import { useState, useMemo } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";

// Define Task Type
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

// Fetch Tasks
const fetchTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch("/api/core/tasks");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
    // ✅ Fetch tasks using React Query at the top level
    const { data: tasks = [], isLoading } = useQuery<Task[]>({
      queryKey: ["tasks"],
      queryFn: fetchTasks,
    });
  
    // ✅ Memoized grouping of tasks by date (before loops)
    const tasksByDate = useMemo(() => {
      return tasks.reduce((acc, task) => {
        const dueDate = format(new Date(task.dueDate), "yyyy-MM-dd");
        if (!acc[dueDate]) acc[dueDate] = [];
        acc[dueDate].push(task);
        return acc;
      }, {} as Record<string, Task[]>);
    }, [tasks]);
   
    // ✅ Memoized upcoming tasks (before loops)
    const nextThreeTasks = useMemo(() => {
      return tasks
        .filter((task) => new Date(task.dueDate) >= new Date())
        .slice(0, 3);
    }, [tasks]);
  
    // ✅ Generate calendar days (ensure no hooks inside loops)
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    // Move array initialization outside the loop
    const days = useMemo(() => {
        const daysArr: Date[] = [];

      for (let day = startDate; day <= endDate; day = addDays(day, 1)) {
        daysArr.push(day);
      }
      return daysArr;
    }, [currentDate]);
  
    return (
      <div className="grid grid-cols-12 gap-8 max-w-5xl mx-auto py-10 px-4 lg:px-8">
        {/* Sidebar - Upcoming Tasks */}
        <div className="col-span-12 md:col-span-4 bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Upcoming Tasks</h2>
          <p className="text-sm text-gray-600 mb-4">Next 3 tasks due</p>
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-gray-500 text-sm">Loading tasks...</p>
            ) : nextThreeTasks.length > 0 ? (
              nextThreeTasks.map((task) => (
                <div key={task.id} className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(task.dueDate), "MMM dd, yyyy - HH:mm")}
                  </p>
                  <h3 className="text-lg font-semibold text-black">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming tasks</p>
            )}
          </div>
        </div>
  
        {/* Calendar */}
        <div className="col-span-12 md:col-span-8 bg-white shadow-lg p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="text-gray-500 hover:text-black"
            >
              &lt;
            </button>
            <h2 className="text-lg font-semibold">{format(currentDate, "MMMM yyyy")}</h2>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="text-gray-500 hover:text-black"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm text-gray-700 font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2">{day}</div>
            ))}
          </div>
  
          {/* Render Calendar Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {days.map((day, index) => {
              const formattedDate = format(day, "yyyy-MM-dd");
              const hasTask = tasksByDate[formattedDate]?.length > 0;
  
              return (
                <div key={index} className="relative group">
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      isSameMonth(day, currentDate) ? "text-black" : "text-gray-400"
                    } ${
                      isSameDay(day, new Date()) ? "bg-blue-400 text-white font-bold" : "hover:bg-gray-100"
                    }`}
                  >
                    {format(day, "d")}
                    {hasTask && <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>}
                  </div>
  
                  {/* Task Tooltip on Hover */}
                  {hasTask && (
                    <div className="absolute z-10 hidden group-hover:block bg-white text-black p-3 shadow-lg rounded-md w-44 top-full left-1/2 transform -translate-x-1/2">
                      <p className="text-xs font-semibold mb-1">{format(day, "MMM dd, yyyy")}</p>
                      {tasksByDate[formattedDate].map((task) => (
                        <div key={task.id} className="border-b border-gray-300 last:border-none pb-1 mb-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-gray-600">{task.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  

export default Calendar;
