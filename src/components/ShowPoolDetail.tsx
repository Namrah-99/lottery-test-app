"use client";
import React, { useEffect, useState } from "react";
import { BiSolidChevronUp, BiSolidChevronDown } from "react-icons/bi";
import Image from "next/image";
interface Pool {
  poolId: string;
  coinName: string;
  coinSymbol: string;
  poolAmount: number;
  image: string;
}

export default function ShowPoolDetail({
  showPoolDetail,
  poolAmount,
}: {
  showPoolDetail: boolean;
  poolAmount: Pool[];
}) {
  const [coinImages, setCoinImages] = useState<{ [key: string]: string }>({});
  const [isExpanded, setIsExpanded] = useState(showPoolDetail);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const totalPoolAmount = poolAmount?.reduce(
    (total, pool) => total + parseFloat(pool.poolAmount.toString()),
    0
  );

  return (
    <div className="p-3">
      {isExpanded &&
        (poolAmount ? (
          <div className="mt-2 space-y-3">
            <h2 className="font-semibold">Current Pool Status</h2>
            {poolAmount.map((pool) => (
              <div
                key={pool.poolId}
                className="text-sm flex justify-between items-center gap-4"
              >
                <Image
                  src={pool.image}
                  alt={pool.coinName}
                  width={24}
                  height={24}
                />
                <p>
                  {pool.poolAmount} &nbsp;{pool.coinName}
                </p>
              </div>
            ))}
            <div className="text-4xl flex justify-end items-end gap-4 py-8 font-bold">
              <span className="text-3xl text-gray-400">&asymp;</span>
              {totalPoolAmount.toFixed(8)}
              <span className="text-lg">LUCKI</span>
            </div>
          </div>
        ) : (
          <p className="text-center py-3">No Pool Details Available</p>
        ))}
      <div onClick={handleToggle} className="cursor-pointer flex items-center">
        {isExpanded ? (
          <p className="flex justify-center items-center w-full gap-4">
            <BiSolidChevronUp className="w-5 h-5" />
            <span>Close</span>
          </p>
        ) : (
          <p className="flex justify-center items-center w-full gap-4">
            <BiSolidChevronDown className="w-5 h-5" />{" "}
            <span>Current Pool Status</span>
          </p>
        )}
      </div>
    </div>
  );
}
