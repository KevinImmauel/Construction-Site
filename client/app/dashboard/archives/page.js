"use client";
import Head from "next/head";

export default function Archives() {
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
            <span className="text-lg">Document Archives / Research</span>
          </div>
        </div>
        {/* Archives List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-[#181818] rounded-2xl p-6 flex flex-col gap-4">
              <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-xl text-gray-400">[Doc Thumbnail]</div>
              <div className="text-lg font-semibold mt-2">Document {i}</div>
              <div className="text-gray-400 text-sm">Uploaded: 2024-06-01</div>
              <div className="text-blue-400 cursor-pointer">Download</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 