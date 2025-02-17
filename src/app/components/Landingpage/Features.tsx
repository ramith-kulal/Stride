"use client";
import React, { useState } from "react";
import {
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  Squares2X2Icon,
  ChartBarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left Side - Feature List */}
        <div className="w-full lg:w-1/3 space-y-4">
        <h2 className="text-4xl font-extrabold mb-6">
  Explore <span className="text-green-400">Stride&apos;s Features</span>
</h2>

          {features.map((feature) => (
            <div
              key={feature.title}
              className={`p-4 rounded-lg cursor-pointer flex items-center space-x-4 transition-all border
                ${
                  selectedFeature.title === feature.title
                    ? "border-green-400 bg-gray-900"
                    : "border-gray-700 hover:border-green-400"
                }`}
              onClick={() => setSelectedFeature(feature)}
            >
              <feature.icon className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
          ))}
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center lg:mt-40">
          <div className="flex items-center space-x-4">
            <selectedFeature.icon className="w-12 h-12 text-green-400" />
            <h3 className="text-3xl font-semibold">{selectedFeature.title}</h3>
          </div>
          <p className="text-lg text-gray-300 mt-6 text-center lg:text-left leading-relaxed">
            {selectedFeature.description}
          </p>
        </div>
      </div>
    </section>
  );
}

// Feature Data
const features = [
    {
      title: " Secure Authentication",
      description:
        "Experience seamless authentication with multi-layered security. Our system ensures encrypted data, protected user sessions, and secure access to sensitive information. Say goodbye to unauthorized access with role-based authentication and two-factor security.",
      icon: ShieldCheckIcon,
    },
    {
      title: " Task Management",
      description:
        "Take control of your productivity! Create, update, and delete tasks with ease. Prioritize your work using labels, assign due dates, and receive smart reminders so you never miss an important task again.",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      title: " Organized Projects",
      description:
        "Keep everything structured with project-based task categorization. Assign tasks to different projects, collaborate seamlessly, and ensure your workflow stays smooth and efficient. Perfect for teams and solo productivity enthusiasts.",
      icon: Squares2X2Icon,
    },
    {
      title: " Smart Dashboard",
      description:
        "Gain valuable insights into your workflow. Our interactive dashboard provides visual analytics, task completion trends, upcoming deadlines, and progress tracking, ensuring you're always ahead of your goals.",
      icon: ChartBarIcon,
    },
    {
      title: " Integrated Calendar",
      description:
        "Visualize your tasks in a calendar view, helping you plan ahead efficiently. Set recurring tasks, track upcoming deadlines, and organize your schedule in the most intuitive way possible.",
      icon: CalendarDaysIcon,
    },
  ];
  