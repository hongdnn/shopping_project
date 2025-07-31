"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', password)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/users/login`,
        formData,
      );
      console.log(response.data['access_token'])
      localStorage.setItem('token', response.data['access_token'])
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="blocktext-sm mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
