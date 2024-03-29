import { useMediaQuery } from "react-responsive";
import { Chakra_Petch, Sansita } from "next/font/google";
import { FaCheck } from "react-icons/fa";

type Props = {
  categoryName: string;
  challengesNumber: number;
  solvedChallengesNumber: number;
  setCategoryCliked: any;
  categoryClicked: string;
  // categoryName: any;
  // challengesNumber: any;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function CategoryCheckbox({
  categoryName,
  challengesNumber,
  solvedChallengesNumber,
  setCategoryCliked,
  categoryClicked,
}: Props) {
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });
  return (
    <div className="flex items-center justify-center mb-2">
      <div
        className={`${
          !isScreenBelow700px ? "h-[26px] w-[26px]" : "h-[22px] w-[22px]"
        } rounded-md border-2 border-[#68C8] mr-2 cursor-pointer ${
          categoryClicked === categoryName
            ? "transition-all duration-100 ease bg-[#68C8]"
            : ""
        }`}
        onClick={() => {
          if (categoryName === categoryClicked) {
            setCategoryCliked("");
          } else {
            setCategoryCliked(categoryName);
          }
          console.log("category : ", categoryName);
        }}
      >
        {categoryName === categoryClicked && (
          <div
            className={`flex justify-center items-center transform ${
              !isScreenBelow700px ? "translate-y-[60%]" : "translate-y-[57%]"
            }`}
          >
            <FaCheck size={!isScreenBelow700px ? 9 : 8} color="#fff" />
          </div>
        )}
      </div>
      <div
        className={`${sansita.className} font-semibold text-white ${
          !isScreenBelow700px ? "text-[16px]" : "text-[14px]"
        } mr-8 mb-[4px]`}
      >
        {categoryName} ({solvedChallengesNumber}/{challengesNumber})
      </div>
    </div>
  );
}
