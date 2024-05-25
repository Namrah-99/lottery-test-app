"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

export default function Login() {
  const [value, setValue] = useState("");
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Enter Your Name
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            placeholder="Type something..."
          />
          <button
            type="submit"
            className="w-full p-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
