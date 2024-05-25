"use client";

import Link from "next/link";
import React, { useState } from "react";
import Modal from "./Modal";

function LotteryCardHeader({ headerData = {} }: { headerData: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-3">
      <div className="container mx-auto flex justify-between items-end">
        <div className="text-3xl font-bold flex-shrink-0 text-fuchsia-800">
          {headerData.lotteryName}
        </div>

        <div className="flex-grow text-center text-sm">
          {headerData.roundNumber ? (
            <p className="font-bold text-gray-900">
              No.{headerData.roundNumber}
            </p>
          ) : (
            <p>Past 5 results</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-700 focus:outline-none"
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
                d="M10 6a4 4 0 100 8 4 4 0 000-8zM21 21l-4.35-4.35"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        headerData={headerData.data}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default LotteryCardHeader;
