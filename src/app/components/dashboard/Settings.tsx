import { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 lg:px-8 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Settings</h2>

      {/* Profile Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full bg-gray-50 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full bg-gray-50 text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
