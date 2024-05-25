import React from "react";
import CosmicCard from "./CosmicCard";
import ClassicCard from "./ClassicCard";
import AtomicCard from "./AtomicCard";

function LotteryCard({
  lottery,
}: {
  lottery: { data: { lotteryName: string } };
}) {
  const { lotteryName } = lottery.data;

  return (
    <div className="w-full flex flex-col bg-white shadow space-y-4">
      {lotteryName === "COSMIC" && <CosmicCard data={lottery.data} />}
      {lotteryName === "CLASSIC" && <ClassicCard data={lottery.data} />}
      {lotteryName === "ATOMIC" && <AtomicCard data={lottery.data} />}
    </div>
  );
}

export default LotteryCard;
