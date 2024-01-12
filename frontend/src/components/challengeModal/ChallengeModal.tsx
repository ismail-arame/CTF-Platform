import { Chakra_Petch, Sansita } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import FlagSubmitForm from "./FlagSubmitForm";
import useClickOutside from "@/helpers/clickOutside";
import { setActiveChallenge } from "@/redux/features/challengeSlice";
import { useAppDispatch } from "@/redux/hooks";
import ChallengeModalSolvesInfo from "./ChallengeModalSolvesInfo";
import ChallengeModalChallengeInfo from "./ChallengeModalChallengeInfo";

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
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      ref={modalBackgroundRef}
    >
      <div
        className={`flex flex-col absolute w-[500px] ${
          isChallengeTabClicked ? "max-h-max" : "h-[458px]"
        } bg-[#1A1B1E] rounded-lg py-6 px-8`}
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
        {isChallengeTabClicked ? (
          <ChallengeModalChallengeInfo activeChallenge={activeChallenge} />
        ) : (
          <ChallengeModalSolvesInfo />
        )}
      </div>
    </div>
  );
}
