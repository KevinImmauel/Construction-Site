"use client";
import Head from "next/head";

export default function Profile() {
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
            <span className="text-lg">User Profile</span>
          </div>
        </div>
        {/* Profile Info */}
        <div className="bg-[#232323] rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold">[Avatar]</div>
          <div className="flex-1">
            <div className="text-2xl font-bold mb-2">Username</div>
            <div className="text-lg text-gray-300 mb-2">Email: user@email.com</div>
            <div className="text-base text-gray-400 mb-2">Role: Member</div>
            <div className="text-base text-gray-400">Bio: Short user bio goes here.</div>
          </div>
        </div>
        {/* Settings & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Settings */}
          <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-lg font-semibold mb-2">Settings</div>
            <div className="text-gray-300">- Change password</div>
            <div className="text-gray-300">- Notification preferences</div>
            <div className="text-gray-300">- Account privacy</div>
          </div>
          {/* Activity */}
          <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
            <div className="text-lg font-semibold mb-2">Recent Activity</div>
            <div className="text-gray-300">- Joined project "Cnat"</div>
            <div className="text-gray-300">- Uploaded document "Blueprints.png"</div>
            <div className="text-gray-300">- Commented on update</div>
          </div>
        </div>
      </div>
    </>
  );
} 