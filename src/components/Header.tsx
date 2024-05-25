"use client";
import React from "react";
import { useAuth } from "./context/AuthContext";

function Header() {
  const { logout } = useAuth();
  return (
    <header className="w-full bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => {
              logout();
            }}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className="flex-grow text-center">
          <h1 className="text-xl font-bold text-gray-900">Lottery</h1>
        </div>

        <div className="flex-shrink-0 w-6"></div>
      </div>
    </header>
  );
}

export default Header;
