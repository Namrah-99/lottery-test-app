"use client";

import React, { useState } from "react";
import LotteryCardHeader from "./LotteryCardHeader";
import { TfiTimer } from "react-icons/tfi";
import ShowPoolDetail from "./ShowPoolDetail";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

function AtomicCard({ data }: any) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // console.log(JSON.stringify(data, null, 2));
  const {
    lotteryName,
    roundNumber,
    previousWinningticket,
    poolAmount,
    winningPot,
    nextDraw,
    showPoolDetail,
    formattedNextDraw,
  } = data;

  const handlePlayClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      alert("You are logged in!");
    }
  };

  return (
    <div className="space-y-4 bg-teal-50 rounded-md">
      <LotteryCardHeader headerData={{ lotteryName, roundNumber, data }} />
      <div className="p-3 flex gap-4">
        {previousWinningticket.map((ticketNum: number, index: number) => (
          <p
            key={`${index}-ticketNum`}
            className={`py-2 px-4 rounded-full text-lg text-slate-50 ${
              index === previousWinningticket.length - 1
                ? "bg-teal-400"
                : "bg-gray-500"
            }`}
          >
            {ticketNum}
          </p>
        ))}
      </div>
      <div className="p-3 flex justify-between items-center">
        <p>Winning Pot</p>
        <h3 className="text-2xl font-bold">
          {winningPot} &nbsp; <span className="text-xs">LUCKI</span>
        </h3>
      </div>
      <div className="p-3 flex justify-between items-center bg-teal-400 text-slate-50">
        <div className="flex items-center gap-4">
          <p>Next Draw</p>
          <TfiTimer />
          <p>{formattedNextDraw}</p>
        </div>
        <button
          className="w-1/6 px-3 py-2 rounded-md font-semibold bg-slate-50 text-teal-400"
          // disabled={isNaN(nextDraw) || nextDraw < 0}
          onClick={handlePlayClick}
        >
          Play
        </button>
      </div>
      <ShowPoolDetail showPoolDetail={showPoolDetail} poolAmount={poolAmount} />
    </div>
  );
}

export default AtomicCard;
