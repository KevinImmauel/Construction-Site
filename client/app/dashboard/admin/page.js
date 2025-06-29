"use client";
import Head from "next/head";

export default function Admin() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Sora', sans-serif !important; }`}</style>
      </Head>
      <div className="min-h-screen bg-black text-white px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img src="/vikasana-logo.png.png" alt="Vikasana Logo" className="w-10 h-10" />
            <div>
              <div className="font-bold text-xl tracking-wide">VIKASANA</div>
              <div className="text-sm text-gray-300">Construction site</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-lg">Admin Panel</span>
          </div>
        </div>
        {/* User Management */}
        <div className="bg-[#232323] rounded-2xl p-8 mb-8">
          <div className="text-2xl font-bold mb-4">User Management</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-[#181818] rounded-xl p-4 mb-2">
              <span className="font-semibold">priyanshu5ingh</span>
              <span className="text-gray-400">Admin</span>
              <button className="bg-red-500 text-white rounded px-4 py-1">Remove</button>
            </div>
            <div className="flex justify-between items-center bg-[#181818] rounded-xl p-4 mb-2">
              <span className="font-semibold">testuser</span>
              <span className="text-gray-400">Member</span>
              <button className="bg-red-500 text-white rounded px-4 py-1">Remove</button>
            </div>
          </div>
        </div>
        {/* Project Approvals */}
        <div className="bg-[#232323] rounded-2xl p-8 mb-8">
          <div className="text-2xl font-bold mb-4">Project Approvals</div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center bg-[#181818] rounded-xl p-4 mb-2">
              <span className="font-semibold">Project X</span>
              <span className="text-yellow-400">Pending</span>
              <button className="bg-green-500 text-white rounded px-4 py-1">Approve</button>
            </div>
            <div className="flex justify-between items-center bg-[#181818] rounded-xl p-4 mb-2">
              <span className="font-semibold">Project Y</span>
              <span className="text-yellow-400">Pending</span>
              <button className="bg-green-500 text-white rounded px-4 py-1">Approve</button>
            </div>
          </div>
        </div>
        {/* Site Settings */}
        <div className="bg-[#232323] rounded-2xl p-8">
          <div className="text-2xl font-bold mb-4">Site Settings</div>
          <div className="text-gray-300">- Maintenance mode</div>
          <div className="text-gray-300">- Theme selection</div>
          <div className="text-gray-300">- System logs</div>
        </div>
      </div>
    </>
  );
} 