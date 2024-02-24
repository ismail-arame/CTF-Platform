"use client";

import CategoriesCheckbox from "@/components/challenges/CategoriesCheckbox";
import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import {
  Chakra_Petch,
  Fredericka_the_Great,
  Lato,
  Black_Ops_One,
} from "next/font/google";
import CategoriesContainer from "@/components/challenges/CategoriesContainer";
import { useMediaQuery } from "react-responsive";
import ChallengeModal from "@/components/challengeModal/ChallengeModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getChallenges } from "@/redux/features/challengeSlice";
import { Triangle } from "react-loader-spinner";
import { getCompetitionDate } from "@/redux/features/competitionDateSlice";

const blackOpsOne = Black_Ops_One({ subsets: ["latin"], weight: "400" });
const Fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
});
const lato = Lato({ subsets: ["latin"], weight: "400" });

type Props = {};

// when we have challenges and screen is above h-screen change h-screen to h-full
export default function Challenges({}: Props) {
  const dispatch: any = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { activeChallenge } = useAppSelector((state) => state.challenge);
  const { challenges } = useAppSelector((state) => state.challenge);
  const { competitionStartDate, competitionEndDate } = useAppSelector(
    (state) => state.competitionDate
  );
  const [categoryClicked, setCategoryCliked] = useState("");
  console.log("categ : ", categoryClicked);

  // get challenges and get competitionDate
  useEffect(() => {
    dispatch(getCompetitionDate());
    if (user?.token) {
      dispatch(getChallenges(user.token));
    }
  }, [user]);

  // Responsiveness
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });

  // Assuming the competition end date is "2024-03-09T00:00:00.000Z"
  // const competitionStartDate = new Date("2024-02-15T15:18:00.000Z");
  // const competitionEndDate = new Date("2024-02-16T18:00:00.000Z");

  // const isDateWithinCompetitionInterval =
  // new Date() >= competitionStartDate && new Date() <= competitionEndDate;
  const isDateWithinCompetitionInterval =
    new Date() >= new Date(competitionStartDate) &&
    new Date() <= new Date(competitionEndDate);

  // Check if the current date is after the competition end date
  const isCompetitionStarted = new Date() < new Date(competitionStartDate);
  const isCompetitionEnded = new Date() > new Date(competitionEndDate);
  console.log(
    `new Date() => ${new Date()} and start date ${competitionStartDate} and end Date => ${competitionEndDate}`
  );
  console.log(
    "is competition within interval : ",
    isDateWithinCompetitionInterval
  );
  return (
    <div className="min-h-screen w-screen bg-[#1a1c22] overflow-y-hidden">
      {activeChallenge._id && (
        <ChallengeModal activeChallenge={activeChallenge} />
      )}
      <div className="max-w-[1366px] mx-auto">
        <LoggedinNavbar lato={lato} />
        <div className="w-full flex items-center justify-center pt-[64px] pb-[32px] px-[32px] bg-[#1a1c22]">
          <h1
            className={`${Fredericka.className} ${
              !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
            } text-white tracking-[2px] font-medium forbidden`}
          >
            {/* {isDateWithinCompetitionInterval ? "Challenges" : "Forbidden"} */}
            Challenges
          </h1>
        </div>
        {!competitionStartDate || !competitionEndDate || !challenges ? (
          <div className="w-full flex justify-center items-center">
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#68C8DE"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : isCompetitionStarted ? (
          <h2
            className={`${
              blackOpsOne.className
            } flex justify-center items-center ${
              isScreenBelow700px ? "text-[24px]" : "text-[34px]"
            } text-white`}
          >
            SICSCTF 2024 has not started yet
          </h2>
        ) : (
          <div className="">
            {/* Categories Checkbox List*/}
            <CategoriesCheckbox
              challenges={challenges}
              categoryClicked={categoryClicked}
              setCategoryCliked={setCategoryCliked}
            />
            {/* Categories Challenges */}
            <CategoriesContainer
              challenges={challenges}
              categoryClicked={categoryClicked}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// {!challenges ? (
//   <div className="w-full flex justify-center items-center">
//     <Triangle
//       visible={true}
//       height="80"
//       width="80"
//       color="#68C8DE"
//       ariaLabel="triangle-loading"
//       wrapperStyle={{}}
//       wrapperClass=""
//     />
//   </div>
// ) : (
//   <div className="">
//     {/* Categories Checkbox List*/}
//     <CategoriesCheckbox challenges={challenges} />
//     {/* Categories Challenges */}
//     <CategoriesContainer challenges={challenges} />
//   </div>
// )}
