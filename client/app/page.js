"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // or 'next/router' in older Next.js

export default function Home() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        username,
        password,
      }, {
        withCredentials: true,
      });

      setMessage(`Welcome, ${response.data.username}`);
      router.push("/dashboard"); // ⬅ Redirect here
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="your_username"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
          <label htmlFor="remember" className="text-sm font-medium text-gray-700">Remember me</label>
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="rounded-lg border bg-primary-500 px-5 py-2.5 text-sm font-medium text-white"
        >
          Submit
        </button>
        {message && (
          <p className="mt-4 text-sm text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
