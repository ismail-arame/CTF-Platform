import { useMediaQuery } from "react-responsive";
import { Chakra_Petch, Sansita } from "next/font/google";

type Props = {
  categoryName: string;
  challengesNumber: number;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function CategoryCheckbox({
  categoryName,
  challengesNumber,
}: Props) {
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });
  return (
    <div className="flex items-center justify-center mb-2">
      <div
        className={`${
          !isScreenBelow700px ? "h-[26px] w-[26px]" : "h-[22px] w-[22px]"
        } rounded-md border-2 border-[#68C8DE] mr-2 cursor-pointer`}
      ></div>
      <div
        className={`${sansita.className} font-semibold text-white ${
          !isScreenBelow700px ? "text-[16px]" : "text-[14px]"
        } mr-8 mb-[4px]`}
      >
        {categoryName} (0/{challengesNumber})
      </div>
    </div>
  );
}
