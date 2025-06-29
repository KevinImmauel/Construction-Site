"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const updates = [
  { title: "Proposal of new project", desc: "Click here to know more" },
  { title: "New Hackathon coming up", desc: "Click here to signup" },
  { title: "Workshop mania", desc: "Click here to signup" },
  { title: "Welcome your new Head of research", desc: "Click here to know more" },
];

const assigned = [1, 2, 3];
const completed = [1, 2, 3, 4];
const archives = [
  { status: "Completed" },
  { status: "Ongoing" },
  { status: "Yet To Start" },
  { status: "Completed" },
];

function ProjectCard({ status, onClick }) {
  let color = "";
  if (status === "Completed") color = "bg-green-500";
  else if (status === "Ongoing") color = "bg-yellow-400";
  else color = "bg-gray-400";
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-4 w-40 h-48 flex flex-col justify-between shadow-md cursor-pointer hover:scale-105 transition">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs font-semibold ${color} text-white rounded-full px-2 py-0.5`}>{status}</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-24 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 text-center">Project Thumbnail</div>
      </div>
      <div className="mt-2">
        <div className="font-semibold text-black text-sm">Cnat</div>
        <div className="text-xs text-gray-500">Onyx division</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [username, setUsername] = useState("User");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://127.0.0.1:5000/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "User");
        }
      } catch (e) {
        setUsername("User");
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Sora', sans-serif !important; }`}</style>
      </Head>
      <div className="min-h-screen bg-black text-white px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push("/dashboard") }>
            <img src="/vikasana-logo.png.png" alt="Vikasana Logo" className="w-10 h-10" />
            <div>
              <div className="font-bold text-xl tracking-wide">VIKASANA</div>
              <div className="text-sm text-gray-300">Construction site</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-lg">Welcome <span className="text-blue-300 font-semibold cursor-pointer" onClick={() => router.push("/dashboard/profile")}>{username}</span></span>
            <span className="bg-gray-800 rounded-full p-2 cursor-pointer" onClick={() => router.push("/dashboard/archives") }><svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg></span>
            <span className="bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2 font-semibold cursor-pointer" onClick={() => router.push("/dashboard/admin") }><svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="white">S</text></svg> 512</span>
          </div>
        </div>
        {/* Main grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Banner and projects */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            {/* Banner */}
            <div className="bg-[#232323] rounded-2xl p-8 flex items-center gap-8 min-h-[180px]">
              <div>
                <div className="text-4xl font-bold mb-2">TECH<br/>FUTURE</div>
                <div className="text-lg text-gray-300 mb-2">5 trends that will<br/>change the world</div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="w-40 h-32 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">[Banner Img]</span>
                </div>
              </div>
            </div>
            {/* Assigned to you */}
            <div>
              <div className="flex items-center mb-4 gap-2">
                <div className="text-xl font-semibold">Assigned to you</div>
                <button className="ml-2 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold" onClick={() => router.push("/dashboard/project/new")}>+</button>
              </div>
              <div className="flex gap-6 flex-wrap">
                {assigned.map((_, i) => <ProjectCard key={i} status="Ongoing" onClick={() => router.push(`/dashboard/project/${i+1}`)} />)}
              </div>
            </div>
            {/* Completed Projects */}
            <div className="mt-8">
              <div className="text-xl font-semibold mb-4">Completed Projects</div>
              <div className="flex gap-6 flex-wrap">
                {completed.map((_, i) => <ProjectCard key={i} status="Completed" onClick={() => router.push(`/dashboard/project/${i+10}`)} />)}
              </div>
            </div>
            {/* Document Archives/research */}
            <div className="mt-8">
              <div className="text-xl font-semibold mb-4">Document Archives/research</div>
              <div className="flex gap-6 flex-wrap">
                {archives.map((a, i) => <ProjectCard key={i} status={a.status} onClick={() => router.push(`/dashboard/archives`)} />)}
              </div>
            </div>
          </div>
          {/* Right: Division Updates */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <div className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">Division Updates</div>
                <button className="text-gray-400 text-sm">Hide</button>
              </div>
              {updates.map((u, i) => (
                <div key={i} className="border border-blue-500 rounded-xl p-3 mb-2 cursor-pointer hover:bg-blue-900/20 transition" onClick={() => router.push(`/dashboard/archives`)}>
                  <div className="text-blue-400 font-semibold text-base">{u.title}</div>
                  <div className="text-xs text-gray-300">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 