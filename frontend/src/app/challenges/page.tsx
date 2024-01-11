"use client";

import CategoriesCheckbox from "@/components/challenges/CategoriesCheckbox";
import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import { Chakra_Petch, Lato } from "next/font/google";
import CategoriesContainer from "@/components/challenges/CategoriesContainer";
import { useMediaQuery } from "react-responsive";
import ChallengeModal from "@/components/challenges/ChallengeModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getChallenges } from "@/redux/features/challengeSlice";

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

type Props = {};

// when we have challenges and screen is above h-screen change h-screen to h-full
export default function Challenges({}: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeChallenge } = useAppSelector((state) => state.challenge);

  // get challenges
  useEffect(() => {
    if (user?.token) {
      dispatch(getChallenges(user.token));
    }
  }, [user]);

  // Responsiveness
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });
  return (
    <div className="min-h-screen w-screen bg-[#1a1c22] overflow-y-hidden">
      {activeChallenge._id && (
        <ChallengeModal activeChallenge={activeChallenge} />
      )}
      <div className="max-w-[1366px] mx-auto">
        <LoggedinNavbar lato={lato} />
        <div className="w-full flex items-center justify-center pt-[64px] pb-[32px] px-[32px] bg-[#1a1c22]">
          <h1
            className={`${chakra_petch.className} ${
              !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
            } text-white tracking-[2px] font-medium`}
          >
            Challenges
          </h1>
        </div>
        {/* Categories Checkbox List*/}
        <CategoriesCheckbox />
        {/* Categories Challenges */}
        <CategoriesContainer />
      </div>
    </div>
  );
}
