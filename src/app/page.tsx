import Header from "@/components/Header";
import LotteryCard from "@/components/LotteryCard";

const apiBaseUrl =
  "https://testing-luckito-backend.rnssol.com/api/luckito/lottery/get-lottery?lotteryType=";

const fetchCoinList = async () => {
  const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
  if (!response.ok) {
    throw new Error("Failed to fetch coin list");
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Coin list is not an array");
  }
  return data;
};

const fetchCoinData = async (coinId: string) => {
  // https://api.coingecko.com/api/v3/coins/ripple

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data for coin ID: ${coinId}`);
  }
  const data = await response.json();
  return data.image;
};

const getImages = async (coinNames: string[]) => {
  let coinList;
  try {
    coinList = await fetchCoinList();
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return [];
  }

  if (!Array.isArray(coinList)) {
    console.error("Coin list is not an array");
    return [];
  }

  // Create a Map from the coin list for quick lookup by name
  const coinMap = new Map(
    coinList.map((coin: any) => [coin.name.toLowerCase(), coin.id])
  );

  // Map coinNames to coin IDs using the Map
  const coinIds = coinNames.map(
    (coinName: string) => coinMap.get(coinName.toLowerCase()) || null
  );

  const imagePromises = coinIds
    .filter((coinId): coinId is string => coinId !== null)
    .map(async (coinId) => {
      try {
        return await fetchCoinData(coinId);
      } catch (error) {
        console.error(`Error fetching image for coin ID: ${coinId}`, error);
        return null;
      }
    });

  const results = await Promise.allSettled(imagePromises);
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<any>).value);
};

const getLotteryInfo = async (lotteryType: string): Promise<any> => {
  const res = await fetch(`${apiBaseUrl}${lotteryType}`);
  const data = await res.json();
  return data;
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) {
    console.error("Invalid seconds value:", seconds);
    return "Invalid time";
  }

  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const h = Math.floor(absSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((absSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (absSeconds % 60).toString().padStart(2, "0");
  return isNegative ? `${h}:${m}:${s} ago` : `${h}:${m}:${s}`;
};

export default async function Home() {
  const cosmicLotteryData = getLotteryInfo("COSMIC");
  const classicLotteryData = getLotteryInfo("CLASSIC");
  const atomicLotteryData = getLotteryInfo("ATOMIC");
  const [cosmic, classic, atomic] = await Promise.all([
    cosmicLotteryData,
    classicLotteryData,
    atomicLotteryData,
  ]);

  const cosmicCoinNames =
    cosmic.data.poolAmount?.map((pool: any) => pool.coinName.toLowerCase()) ||
    [];
  const classicCoinNames =
    classic.data.poolAmount?.map((pool: any) => pool.coinName.toLowerCase()) ||
    [];
  const atomicCoinNames =
    atomic.data.poolAmount?.map((pool: any) => pool.coinName.toLowerCase()) ||
    [];

  const cosmicImages = await getImages(cosmicCoinNames);
  const classicImages = await getImages(classicCoinNames);
  const atomicImages = await getImages(atomicCoinNames);

  const validateNextDraw = (nextDraw: any) => {
    return typeof nextDraw === "number" ? nextDraw : NaN;
  };
  const defaultImage =
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png";

  const lotteries = [
    {
      ...cosmic,
      data: {
        ...cosmic.data,
        formattedNextDraw: formatTime(validateNextDraw(cosmic.data.nextDraw)),
        poolAmount: cosmic.data.poolAmount?.map((pool: any) => {
          return {
            ...pool,
            image:
              cosmicImages
                .map((image: any) => image?.large)
                .find((image: any) =>
                  image?.toLowerCase().includes(pool.coinName.toLowerCase())
                ) || defaultImage,
          };
        }),
      },
    },
    {
      ...classic,
      data: {
        ...classic.data,
        formattedNextDraw: formatTime(validateNextDraw(classic.data.nextDraw)),

        poolAmount: classic.data.poolAmount?.map((pool: any) => {
          return {
            ...pool,
            image:
              classicImages
                .map((image: any) => image?.large)
                .find((image: any) =>
                  image?.toLowerCase().includes(pool.coinName.toLowerCase())
                ) || defaultImage,
          };
        }),
      },
    },
    {
      ...atomic,
      data: {
        ...atomic.data,
        formattedNextDraw: formatTime(validateNextDraw(atomic.data.nextDraw)),
        poolAmount: atomic.data.poolAmount?.map((pool: any) => {
          return {
            ...pool,
            image:
              atomicImages
                .map((image: any) => image?.large)
                .find((image: any) =>
                  image?.toLowerCase().includes(pool.coinName.toLowerCase())
                ) || defaultImage,
          };
        }),
      },
    },
  ];

  return (
    <div className="min-h-screen px-96">
      <Header />
      <h1 className="py-5 text-2xl font-semibold">Latest Results</h1>
      <div className="font-mono flex flex-col gap-20">
        {lotteries.map((lottery, index) => (
          <LotteryCard key={`key-${index}`} lottery={lottery} />
        ))}
      </div>
    </div>
  );
}
