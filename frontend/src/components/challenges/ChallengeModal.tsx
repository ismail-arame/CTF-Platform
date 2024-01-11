import { Chakra_Petch, Sansita } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import FlagSubmitForm from "./FlagSubmitForm";
import useClickOutside from "@/helpers/clickOutside";
import { setActiveChallenge } from "@/redux/features/challengeSlice";
import { useAppDispatch } from "@/redux/hooks";

type Props = {
  activeChallenge: any;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });

export default function ChallengeModal({ activeChallenge }: Props) {
  const [isChallengeTabClicked, setIsChallengeTabClicked] = useState(true);
  const dispatch = useAppDispatch();
  //refs
  const modalRef: any = useRef(null);
  const modalBackgroundRef: any = useRef(null);

  useEffect(() => {
    // Trigger the modal animation when the component mounts
    modalRef.current.classList.add("animate-modal");

    // Trigger the background modal animation when the component mounts
    modalBackgroundRef.current.classList.add("animate-bg-modal");
  }, []);

  useClickOutside(modalRef, () => {
    // Trigger the modal removal animation when the component unmounts
    modalRef.current.classList.remove("animate-modal");
    modalRef.current.classList.add("animate-modal-removal");

    // Trigger the background modal removal animation when the component unmounts
    modalBackgroundRef.current.classList.add("animate-bg-modal-removal");

    setTimeout(() => {
      dispatch(
        setActiveChallenge({
          id: "",
          name: "",
          points: "",
          category: "",
          description: "",
          author: "",
          hints: [],
          attachmentZipName: "",
          attachmentUrl: "",
          websiteLink: "",
          difficulty: "",
          solves: [],
        })
      );
    }, 200);
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      ref={modalBackgroundRef}
    >
      <div
        className="flex flex-col absolute w-[500px] max-h-max bg-[#1A1B1E] rounded-lg py-6 px-8"
        ref={modalRef}
      >
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
            {activeChallenge.solves.length} Solves
          </div>
        </div>
        {/* Challenge Model Name and points and Category */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className={`${chakra_petch.className} text-white text-2xl mb-2`}>
            {activeChallenge.name}
          </div>
          <div className={`${chakra_petch.className} text-white text-xl mb-2`}>
            {activeChallenge.points}
          </div>
          <div
            className={`${sansita.className} text-[12px] px-[6px] py-[2px] rounded-md bg-[#68C8DE]`}
          >
            {activeChallenge.category}
          </div>
        </div>
        {/* CHallenge Description, author, Links and Attachements, finally the FLAG Submit INPUT */}
        <div className="flex flex-col justify-start">
          {/* Description */}
          <p className="text-white mb-3">{activeChallenge.description}</p>
          {/* Author */}
          <div className="text-white mb-3 flex">
            Author:{" "}
            <div className={`${sansita.className} ml-1`}>
              {activeChallenge.author}
            </div>
          </div>
          {/* Link and attachment*/}
          <div className="text-[#68A3DE] mb-3 cursor-pointer transition-all duration-200 ease hover:text-[#688fde]">
            {activeChallenge.websiteLink}
          </div>
        </div>
        <div className="flex justify-start items-start mb-3">
          <div className="flex items-center justify-center px-3 py-2 bg-[#68C8DE] rounded-lg cursor-pointer mr-2 transition-all duration-200 ease hover:bg-[#68b4de]">
            <div className="mr-2">
              <i className="fa fa-download" aria-hidden="true"></i>
            </div>
            <div className="text-[12px] font-semibold">
              {activeChallenge.attachmentZipName}
            </div>
          </div>
        </div>
        {/* Flag Submit */}
        <FlagSubmitForm />
      </div>
    </div>
  );
}
