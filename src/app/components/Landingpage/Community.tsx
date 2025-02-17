"use client";
import React from "react";
import { FaDiscord, FaQuestionCircle, FaUsers } from "react-icons/fa";

export default function CommunitySupport() {
  return (
    <section className="bg-black text-white py-20 px-6 text-center">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Heading */}
        <h2 className="text-4xl lg:text-5xl font-extrabold">
          Be Part of the <span className="text-green-400">Stride Community</span>
        </h2>
        <p className="text-lg text-gray-300">
          Join <span className="text-green-400 font-semibold">50,000+</span> like-minded professionals  
          collaborating, sharing insights, and staying productive together.
        </p>

        {/* Key Benefits */}
        <div className="flex flex-col md:flex-row justify-center gap-6 text-left">
          {/* Networking */}
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <FaUsers className="text-green-400 text-3xl" />
            <div>
              <h3 className="text-xl font-bold text-green-400">Network & Grow</h3>
              <p className="text-gray-300">
                Connect with industry experts, learn new skills, and grow your productivity mindset.
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="bg-gray-900 p-6 rounded-lg flex items-center gap-4">
            <FaQuestionCircle className="text-green-400 text-3xl" />
            <div>
              <h3 className="text-xl font-bold text-green-400">24/7 Support</h3>
              <p className="text-gray-300">
                Need help? Our community and support team are always ready to assist.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {/* Join Discord */}
          <a
            href="https://discord.com/invite/stride"
            target="_blank"
            className="flex items-center justify-center gap-2 bg-green-500 text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-green-400 transition w-full sm:w-auto"
          >
            <FaDiscord className="text-xl" /> Join Our Discord
          </a>

          {/* Help Center */}
          <a
            href="/help"
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition w-full sm:w-auto"
          >
            <FaQuestionCircle className="text-xl" /> Visit Help Center
          </a>
        </div>

        {/* Closing Message */}
        <p className="text-sm text-gray-400 mt-6">
  Your productivity journey starts here. Let&apos;s achieve more, together! 🚀
</p>
      </div>
    </section>
  );
}
