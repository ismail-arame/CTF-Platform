import { Chakra_Petch, Sansita } from "next/font/google";
import FlagSubmitForm from "./FlagSubmitForm";
import Link from "next/link";
import { useState } from "react";

type Props = {
  activeChallenge: any;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });

export default function ChallengeModalChallengeInfo({
  activeChallenge,
}: Props) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleTextClick = () => {
    if (activeChallenge.websiteLink.startsWith("nc")) {
      // Create a temporary input element
      const tempInput = document.createElement("input");
      // Set its value to the text you want to copy
      tempInput.value = activeChallenge.websiteLink;
      // Append it to the document
      document.body.appendChild(tempInput);
      // Select the text in the input
      tempInput.select();
      // Execute the copy command
      document.execCommand("copy");
      // Remove the temporary input
      document.body.removeChild(tempInput);

      // Set a state to indicate successful copy
      setCopySuccess(true);

      // Reset the success state after a brief period
      setTimeout(() => {
        setCopySuccess(false);
      }, 1200);
    }
  };

  //handling ctf attachment files downloading
  const handleDownload = () => {
    const attachmentUrl = activeChallenge.attachmentUrl;

    // Create an anchor element
    const link = document.createElement("a");
    link.href = attachmentUrl;
    link.download = activeChallenge.attachmentZipName; // Specify the desired file name

    // Append the anchor element to the document body
    document.body.appendChild(link);

    // Trigger the click event to start the download
    link.click();

    // Remove the anchor element from the document body
    document.body.removeChild(link);
  };

  const [showHints, setShowHints] = useState(
    Array(activeChallenge.hints.length).fill(false)
  );

  const toggleHintVisibility = (index: any) => {
    const updatedHints = [...showHints];
    updatedHints[index] = !updatedHints[index];
    setShowHints(updatedHints);
  };

  return (
    <div className="overflow-y-scroll scrollbar">
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
        {activeChallenge.description && (
          <p className="text-white mb-3">{activeChallenge.description}</p>
        )}
        {/* Author */}
        <div className="text-white mb-3 flex">
          Author:{" "}
          <div className={`${sansita.className} ml-1`}>
            {activeChallenge.author}
          </div>
        </div>
        {/* Link*/}
        {activeChallenge.websiteLink && (
          <div className="text-[#68A3DE] mb-3">
            {activeChallenge.websiteLink.startsWith("nc") ? (
              <span
                className={`text-[#68A3DE] cursor-pointer ${
                  copySuccess
                    ? "text-[#68C8DE] font-medium"
                    : "hover:text-[#427D9D]"
                } inline-block transition-all duration-200 ease`}
                onClick={handleTextClick}
              >
                {activeChallenge.websiteLink}{" "}
                {copySuccess && (
                  <span className="text-[#68C8DE] font-medium">Copied!</span>
                )}
              </span>
            ) : (
              <Link href={activeChallenge.websiteLink} target="_blank">
                <span className="text-[#68A3DE] hover:text-[#427D9D] cursor-pointer inline-block transition-all duration-200 ease">
                  {activeChallenge.websiteLink}
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
      {/* attachment */}
      {activeChallenge.attachmentUrl && activeChallenge.attachmentZipName && (
        <div className="flex justify-start items-start mb-3">
          <a
            href={activeChallenge.attachmentUrl}
            download={activeChallenge.attachmentZipName}
            target="_blank"
            // onClick={handleDownload}
            className="flex items-center justify-center px-3 py-2 bg-[#68C8DE] rounded-lg cursor-pointer mr-2 transition-all duration-200 ease hover:bg-[#427D9D]"
          >
            <div className="mr-2">
              <i className="fa fa-download" aria-hidden="true"></i>
            </div>
            <div className="text-[12px] font-semibold">
              {activeChallenge.attachmentZipName}
            </div>
          </a>
        </div>
      )}
      {/* Hints */}
      {activeChallenge.hints && activeChallenge.hints.length > 0 && (
        <div className="flex flex-col text-white">
          {activeChallenge.hints.map((hint: any, index: any) => (
            <div
              key={index}
              className="pl-0 pr-2 py-1 rounded cursor-pointer"
              onClick={() => toggleHintVisibility(index)}
            >
              {showHints[index] ? hint : `Click to reveal hint ${index + 1}`}
            </div>
          ))}
        </div>
      )}
      {/* Flag Submit */}
      <FlagSubmitForm />
    </div>
  );
}
