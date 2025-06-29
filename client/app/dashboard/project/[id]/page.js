"use client";
import Head from "next/head";

export default function ProjectDetails() {
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
            <span className="text-lg">Project Details</span>
          </div>
        </div>
        {/* Project Info */}
        <div className="bg-[#232323] rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-40 h-40 bg-gray-700 rounded-xl flex items-center justify-center text-2xl font-bold">[Project Img]</div>
          <div className="flex-1">
            <div className="text-3xl font-bold mb-2">Project Name</div>
            <div className="text-lg text-gray-300 mb-2">Division: Onyx</div>
            <div className="text-base text-gray-400 mb-2">Status: <span className="text-yellow-400 font-semibold">Ongoing</span></div>
            <div className="text-base text-gray-400">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.</div>
          </div>
        </div>
        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Updates */}
          <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-lg font-semibold mb-2">Updates</div>
            <div className="text-gray-300">- Update 1: Project started</div>
            <div className="text-gray-300">- Update 2: Initial planning complete</div>
            <div className="text-gray-300">- Update 3: Materials ordered</div>
          </div>
          {/* Team */}
          <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-lg font-semibold mb-2">Team</div>
            <div className="text-gray-300">- Alice (Lead)</div>
            <div className="text-gray-300">- Bob (Engineer)</div>
            <div className="text-gray-300">- Carol (Designer)</div>
          </div>
          {/* Documents */}
          <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-lg font-semibold mb-2">Documents</div>
            <div className="text-blue-400 cursor-pointer">Project_Plan.pdf</div>
            <div className="text-blue-400 cursor-pointer">Blueprints.png</div>
            <div className="text-blue-400 cursor-pointer">Budget.xlsx</div>
          </div>
        </div>
      </div>
    </>
  );
} 