"use client";

import { JSX, useState } from "react";
import { FiHome, FiClipboard, FiCalendar, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import Dcontent from "@/app/components/dashboard/Dcontent";
import TasksContent from "@/app/components/dashboard/TasksContent";
import Calender from "@/app/components/dashboard/Calender";
import Settings from "@/app/components/dashboard/Settings";
import Link from "next/link";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dcontent />;
      case "Tasks":
        return <TasksContent/>;
      case "Calendar":
        return <Calender/>;
      case "Settings":
        return <Settings/>
      default:
        return <Dcontent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed on the left */}
      <aside className="w-64 bg-white text-gray-900 shadow-lg flex flex-col py-6 px-4 fixed top-0 left-0 h-screen">
        {/* Title */}
        <Link href="/" className="text-4xl font-extrabold text-gray-900 hidden lg:block">
  Stride.
  <span className="block w-14 h-[2px] bg-gray-900 rounded-full mt-1"></span>
</Link>

        {/* Sidebar Links */}
        <nav className="mt-10 space-y-4">
          <SidebarItem icon={<FiHome size={22} />} text="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FiClipboard size={22} />} text="Tasks" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FiCalendar size={22} />} text="Calendar" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarItem icon={<FiSettings size={22} />} text="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>

        {/* User Profile & Logout */}
        <div className="mt-auto flex flex-col items-center">
          <button className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400 transition">
            <FiUser size={22} />
          </button>
          <button className="mt-3 text-gray-600 hover:text-red-500 transition flex items-center gap-2">
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col p-8 bg-gray-50 text-gray-900 ml-64 overflow-auto">
        <h1 className="text-3xl font-bold">{activeTab}</h1>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, text, activeTab, setActiveTab }: { icon: JSX.Element; text: string; activeTab: string; setActiveTab: (text: string) => void }) {
  const isActive = activeTab === text;

  return (
    <button
      onClick={() => setActiveTab(text)}
      className={`flex items-center gap-4 py-3 px-3 rounded-md cursor-pointer transition ${
        isActive ? "bg-gray-900 text-white" : "hover:bg-gray-200"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
