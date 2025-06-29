"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Replace with your backend endpoint
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Sora', sans-serif !important; }`}</style>
      </Head>
      <div className="min-h-screen flex">
        {/* Left: Image, logo, text */}
        <div className="hidden md:flex w-1/2 h-screen relative items-start justify-start bg-black">
          <img src="/bg-construction.jpg" alt="Construction" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="relative z-10 flex flex-col items-start justify-start h-full p-16">
            <img src="/vikasana-logo.png.png" alt="Vikasana Logo" className="w-20 h-20 mb-6" />
            <h1 className="text-white text-4xl font-bold mb-2 tracking-wide">VIKASANA</h1>
            <span className="text-white text-2xl font-normal mb-2">Construction site</span>
          </div>
        </div>
        {/* Right: Login form */}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-black">
          <form className="w-full max-w-lg px-8 flex flex-col gap-10" onSubmit={handleLogin}>
            <h2 className="text-white text-4xl font-semibold mb-8" style={{fontFamily: 'Sora'}}>Welcome mate,</h2>
            <div className="flex flex-col gap-8">
              <div>
                <label className="block text-white text-2xl mb-2" style={{fontFamily: 'Sora'}}>Username</label>
                <input
                  type="text"
                  className="w-full bg-black border border-gray-400 rounded-2xl px-6 py-5 text-white text-xl focus:outline-none focus:border-white transition"
                  placeholder=""
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  style={{fontFamily: 'Sora'}}
                />
              </div>
              <div>
                <label className="block text-white text-2xl mb-2" style={{fontFamily: 'Sora'}}>Password</label>
                <input
                  type="password"
                  className="w-full bg-black border border-gray-400 rounded-2xl px-6 py-5 text-white text-xl focus:outline-none focus:border-white transition"
                  placeholder=""
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  style={{fontFamily: 'Sora'}}
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-600/80 text-white text-base rounded-lg px-4 py-2 text-center border border-red-700 animate-pulse">{error}</div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-white text-black text-xl font-semibold rounded-2xl px-10 py-3 shadow-md hover:bg-gray-100 transition border border-white focus:outline-none"
                disabled={loading}
                style={{fontFamily: 'Sora'}}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
