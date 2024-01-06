// import { Chakra_Petch } from "next/font/google";
import { Chakra_Petch, Sansita } from "next/font/google";
import { useMediaQuery } from "react-responsive";

type Props = {
  challengeName: string;
  solvesNumber: number;
  challengePoints: number;
  challengeDifficulty: "easy" | "medium" | "hard";
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function CategoryChallenge({
  challengeName,
  solvesNumber,
  challengePoints,
  challengeDifficulty,
}: Props) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  return (
    <div
      className={`${
        !isDesktopOrLaptop ? "max-w-[260px]" : "w-full"
      } h-32 bg-[#24272A] border border-[#373A3D] rounded-lg relative px-[18px] py-3 cursor-pointer transition-all duration-200 ease hover:bg-[#1A1C21]`}
    >
      <div className="flex flex-col">
        {/* Challenge Title */}
        <div
          className={`${sansita.className} text-white text-[20px] font-semibold mb-5`}
        >
          {challengeName}
        </div>
        {/* Challenge Solves */}
        <div
          className={`${chakra_petch.className} text-white text-xs font-medium`}
        >
          {solvesNumber} solves
        </div>
        {/* Challenge Points */}
        <div
          className={`${chakra_petch.className} text-[#68A3DE] text-[21px] font-semibold`}
        >
          {challengePoints}
        </div>
        {/* Challenge Difficulty Level */}
      </div>
      <div
        className={`${sansita.className} absolute bottom-4 right-4 bg-[#68C8DE] px-1 py-[2px] rounded-md text-[13px] font-semibold`}
      >
        {challengeDifficulty}
      </div>
    </div>
  );
}
