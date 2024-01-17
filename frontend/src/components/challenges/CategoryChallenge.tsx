// import { Chakra_Petch } from "next/font/google";
import { setActiveChallenge } from "@/redux/features/challengeSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Chakra_Petch, Sansita } from "next/font/google";
import { useMediaQuery } from "react-responsive";

type Props = {
  challenge: any;
  challengeName: string;
  solvesNumber: number;
  challengePoints: number;
  challengeDifficulty: "very easy" | "easy" | "medium" | "hard";
  isUserSolved: boolean;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function CategoryChallenge({
  challenge,
  challengeName,
  solvesNumber,
  challengePoints,
  challengeDifficulty,
  isUserSolved,
}: Props) {
  const dispatch = useAppDispatch();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1200px)",
  });

  return (
    <div
      className={`${!isDesktopOrLaptop ? "max-w-[260px]" : "w-full"} h-32 ${
        isUserSolved
          ? "bg-[#164863] hover:bg-[#153f55]"
          : "bg-[#24272A] hover:bg-[#1A1C21]"
      } border border-[#373A3D] rounded-lg relative px-[18px] py-3 cursor-pointer transition-all duration-200 ease`}
    >
      <div
        className="flex flex-col"
        onClick={() => {
          dispatch(setActiveChallenge(challenge));
        }}
      >
        {/* Challenge Title */}
        <div
          className={`${sansita.className} text-white text-[20px] font-semibold mb-5`}
        >
          {challengeName}
        </div>
        {/* Challenge Solves */}
        <div
          className={`${chakra_petch.className} text-[#DDF2FD] text-xs font-medium`}
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
        className={`${sansita.className} absolute bottom-4 right-4 ${
          isUserSolved ? "bg-[#9BBEC8]" : "bg-[#9BBEC8]"
        } px-1 py-[2px] rounded-md text-[13px] font-semibold`}
      >
        {challengeDifficulty}
      </div>
    </div>
  );
}

// #427D9D || #164863  || #9BBEC8 || #DDF2FD
