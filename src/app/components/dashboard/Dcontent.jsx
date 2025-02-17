"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useDashboardStore } from "../../stores/useDashboardStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTasks, FaCheckCircle, FaClock, FaProjectDiagram } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import React from 'react';

export default function Dcontent() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useDashboardData();
  const { totalTasks, completedTasks, pendingTasks, totalProjects, setDashboardData } = useDashboardStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks
  const { data: tasksData } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/core/tasks");
      return res.data;
    },
  });

  // Fetch projects
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/core/projects");
      return res.data;
    },
  });

  // Mutation for updating task completion status
  const { mutate: markAsComplete } = useMutation({
    mutationFn: async (taskId) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.put("/api/core/tasks", { id: taskId, completed: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  useEffect(() => {
    if (data) {
      setDashboardData(data);
    }
  }, [data, setDashboardData]);

  if (isLoading) return <p className="text-center text-gray-600">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500">Error loading dashboard</p>;

  // Filter tasks based on search term
  const filteredTasks = tasksData
    ?.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    ?.sort((a, b) => Number(a.completed) - Number(b.completed))
    .slice(0, 6); // Show only 5-6 tasks

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Tasks" value={totalTasks} icon={<FaTasks />} />
        <StatCard title="Completed" value={completedTasks} icon={<FaCheckCircle />} />
        <StatCard title="Pending" value={pendingTasks} icon={<FaClock />} />
        <StatCard title="Projects" value={totalProjects} icon={<FaProjectDiagram />} />
      </div>

      {/* Task List */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaTasks className="text-gray-700" /> Tasks Overview
        </h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-2 pl-10 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MdSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
        </div>

        {filteredTasks?.length ? (
          <ul className="space-y-4">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projectsData={projectsData}
                markAsComplete={markAsComplete} // Pass the mutate function here
                isLoading={false}                
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-green-600" /> Progress Overview
        </h2>
        <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
      </div>
    </div>
  );
}

// Task Item Component
function TaskItem({ task, projectsData, markAsComplete, isLoading }) {
  const project = projectsData?.find((p) => p.id === task.projectId);

  const priorityText = task.priority === 3 ? "High" : task.priority === 2 ? "Medium" : "Low";
  const daysLeft = Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const timeText = daysLeft > 0 ? `${daysLeft} days left` : "Due today or overdue";

  return (
    <li className={`p-4 rounded-lg shadow-md flex justify-between items-center border ${task.completed ? "bg-gray-200 border-gray-400" : "bg-gray-50 border-gray-300"}`}>
      <div>
        <p className="text-lg font-medium">{task.title}</p>
        <p className="text-sm text-gray-600">
          Priority: <span className={`font-bold ${task.priority === 3 ? "text-red-600" : task.priority === 2 ? "text-yellow-500" : "text-green-500"}`}>
            {priorityText}
          </span> • {timeText} • Project: {project?.name}
        </p>
      </div>
      {task.completed ? (
        <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
          <FaCheckCircle /> Completed
        </span>
      ) : (
        <button
          onClick={() => markAsComplete(task.id)}
          disabled={isLoading}
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition duration-200 flex items-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Marking...
            </>
          ) : (
            <>✅ Mark as Complete</>
          )}
        </button>
      )}
    </li>
  );
}

// Stats Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg text-center flex flex-col items-center">
      <div className="text-3xl text-gray-700 mb-2">{icon}</div>
      <h3 className="text-md font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ completedTasks, totalTasks }) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-6">
      <div
        className="h-6 bg-green-500 rounded-full text-white text-sm font-bold flex items-center justify-center"
        style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
      >
        {progress.toFixed(0)}%
      </div>
    </div>
  );
}
