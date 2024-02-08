import { Chakra_Petch, Sansita } from "next/font/google";
import FlagSubmitForm from "./FlagSubmitForm";
import Link from "next/link";

type Props = {
  activeChallenge: any;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });

export default function ChallengeModalChallengeInfo({
  activeChallenge,
}: Props) {
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

  return (
    <>
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
        {/* Link*/}
        <Link href={activeChallenge.websiteLink} target="_blank">
          <div className="text-[#68A3DE] mb-3 cursor-pointer transition-all duration-200 ease hover:text-[#427D9D]">
            {activeChallenge.websiteLink}
          </div>
        </Link>
      </div>
      {/* attachment */}
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
      {/* Flag Submit */}
      <FlagSubmitForm />
    </>
  );
}
