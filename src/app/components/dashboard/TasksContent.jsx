import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    projectId: "",
  });

  
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [projectFormVisible, setProjectFormVisible] = useState(false);
  const [addingProject, setAddingProject] = useState(false);
  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      // ✅ Ensure cookies are sent
      const res = await axios.get("/api/core/projects", { withCredentials: true });
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };
  const handleAddProject = async () => {
    if (!newProject.name) return;
    setAddingProject(true);
    try {
      await axios.post("/api/core/projects", newProject, { withCredentials: true });
      setNewProject({ name: "", description: "" });
      fetchProjects();
      setProjectFormVisible(false);
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setAddingProject(false);
    }
  };

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await axios.get("/api/core/tasks", { withCredentials: true }); // ✅ Include cookies
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    setDeletingProjectId(projectId);
    try {
      await axios.delete("/api/core/projects", {
        withCredentials: true, // ✅ Include cookies
        data: { id: projectId },
      });
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeletingProjectId(null);
    }
  };
  

  const handleDeleteTask = async (taskId) => {
    setDeletingTaskId(taskId);
    try {
      await axios.delete("/api/core/tasks", {
        withCredentials: true, // ✅ Include cookies
        data: { id: taskId },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeletingTaskId(null);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.projectId || !newTask.dueDate) return;
    setAddingTask(true);
    try {
      await axios.post(
        "/api/core/tasks",
        {
          ...newTask,
          projectId: Number(newTask.projectId),
        },
        { withCredentials: true } // ✅ Include cookies
      );
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "", projectId: "" });
      fetchTasks();
      setTaskFormVisible(false);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setAddingTask(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Projects Section */}
        <div className="bg-white p-5 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Projects</h2>
          {loadingProjects ? (
            <p>Loading Projects...</p>
          ) : (
            <div className="space-y-2">
             {projects.map((project) => (
  <div
    key={project.id}
    className={`p-3 rounded-lg border transition-shadow cursor-pointer ${
      selectedProject === project.id
        ? "bg-gray-400 shadow-sm"
        : "bg-white hover:bg-gray-50"
    }`}
    onClick={() => setSelectedProject(project.id)}
  >
                  <h3 className="text-md font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <button
                    className="mt-2 bg-black text-white px-3 py-1 rounded flex items-center gap-2 justify-center hover:bg-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                    disabled={deletingProjectId === project.id}
                  >
                    {deletingProjectId === project.id ? "Deleting..." : <><FaTrash /> Delete</>}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Tasks</h2>
          {loadingTasks ? (
            <p>Loading Tasks...</p>
          ) : (
            <div className="space-y-3">
              {tasks
                .filter(task => selectedProject === null || task.projectId === selectedProject)
                .map(task => (
                  <div key={task.id} className="p-3 border-b">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <button
                      className="mt-2 bg-black text-white px-3 py-1 rounded flex items-center gap-2 justify-center hover:bg-gray-800 transition-colors"
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={deletingTaskId === task.id}
                    >
                      {deletingTaskId === task.id ? "Deleting..." : <><FaTrash /> Delete</>}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Task Button */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        onClick={() => setTaskFormVisible(true)}
      >
        <FaPlus /> Create Task
      </button>

      {taskFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Task</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setTaskFormVisible(false)}
              >
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mt-2 rounded"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 w-full mt-2 rounded"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <select
              className="border p-2 w-full mt-2 rounded"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              className="border p-2 w-full mt-2 rounded"
              value={newTask.projectId}
              onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ))}
</select>
            <input
              type="date"
              className="border p-2 w-full mt-2 rounded"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 transition-colors"
              onClick={handleAddTask}
              disabled={addingTask}
            >
              {addingTask ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button
          className="bg-black text-white p-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          onClick={() => setProjectFormVisible(true)}
        >
          <FaPlus /> Create Project
        </button>
        <button
          className="bg-black text-white p-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          onClick={() => setTaskFormVisible(true)}
        >
          <FaPlus /> Create Task
        </button>
      </div>

      {/* Add Project Modal */}
      {projectFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Project</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setProjectFormVisible(false)}
              >
                <FaTimes />
              </button>
            </div>
            <input
              type="text"
              placeholder="Project Name"
              className="border p-2 w-full mt-2 rounded"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="border p-2 w-full mt-2 rounded"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 transition-colors"
              onClick={handleAddProject}
              disabled={addingProject}
            >
              {addingProject ? "Adding..." : "Add Project"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}