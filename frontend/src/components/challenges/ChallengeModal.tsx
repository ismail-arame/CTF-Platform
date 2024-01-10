import { Chakra_Petch, Sansita } from "next/font/google";
import { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import FlagSubmitForm from "./FlagSubmitForm";

type Props = {};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });

export default function ChallengeModal({}: Props) {
  const [isChallengeTabClicked, setIsChallengeTabClicked] = useState(true);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-[2px] backdrop-filter">
      <div className="flex flex-col absolute w-[500px] max-h-max bg-[#1A1B1E] rounded-lg py-6 px-8">
        {/* Challenge Model Header */}
        <div
          className={`${sansita.className} flex items-center justify-center mb-5`}
        >
          {/* challenge */}
          <div
            className={`mr-4 ${
              isChallengeTabClicked
                ? "bg-[#68C8DE] px-4 py-2 rounded-xl"
                : "text-white"
            } cursor-pointer`}
            onClick={() => {
              if (!isChallengeTabClicked) {
                setIsChallengeTabClicked(true);
              }
            }}
          >
            challenge
          </div>
          {/* solves */}
          <div
            className={`${
              !isChallengeTabClicked
                ? "bg-[#68C8DE] px-4 py-2 rounded-xl"
                : "text-white"
            } cursor-pointer`}
            onClick={() => {
              if (isChallengeTabClicked) {
                setIsChallengeTabClicked(false);
              }
            }}
          >
            39 Solves
          </div>
        </div>
        {/* Challenge Model Name and points and Category */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className={`${chakra_petch.className} text-white text-2xl mb-2`}>
            Degital DFIR
          </div>
          <div className={`${chakra_petch.className} text-white text-xl mb-2`}>
            500
          </div>
          <div
            className={`${sansita.className} text-[12px] px-[6px] py-[2px] rounded-md bg-[#68C8DE]`}
          >
            crypto
          </div>
        </div>
        {/* CHallenge Description, author, Links and Attachements, finally the FLAG Submit INPUT */}
        <div className="flex flex-col justify-start">
          {/* Description */}
          <p className="text-white mb-3">
            We’ve tried really hard to come up with a sort order that is easy to
            understand and communicates the most important information as fast
            as possible.
          </p>
          {/* Author */}
          <div className="text-white mb-3 flex">
            Author: <div className={`${sansita.className} ml-1`}>Sayonara</div>
          </div>
          {/* Link and attachment*/}
          <div className="text-[#68A3DE] mb-3 cursor-pointer transition-all duration-200 ease hover:text-[#688fde]">
            https://ctfc.ctf.intigriti.io:30019
          </div>
        </div>
        <div className="flex justify-start items-start mb-3">
          <div className="flex items-center justify-center px-3 py-2 bg-[#68C8DE] rounded-lg cursor-pointer mr-2 transition-all duration-200 ease hover:bg-[#68b4de]">
            <div className="mr-2">
              <i className="fa fa-download" aria-hidden="true"></i>
            </div>
            <div className="text-[12px] font-semibold">proxed.zip</div>
          </div>
        </div>
        {/* Flag Submit */}
        <FlagSubmitForm />
      </div>
    </div>
  );
}
