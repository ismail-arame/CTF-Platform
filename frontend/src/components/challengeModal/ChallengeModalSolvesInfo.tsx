import { Chakra_Petch, Raleway, Sansita } from "next/font/google";

type Props = {};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function ChallengeModalSolvesInfo({}: Props) {
  return (
    <div className="">
      <div className="grid grid-cols-2 place-items-center mb-4">
        <div
          className={`${chakra_petch.className} text-white font-semibold text-lg`}
        >
          Name
        </div>
        <div
          className={`${chakra_petch.className} text-white font-semibold text-lg`}
        >
          Date
        </div>
      </div>

      {/* Example data row 1 */}
      <div className="grid grid-cols-2 place-items-center py-3 border-t border-[#282c35]">
        <div
          className={`${sansita.className} text-lg text-[#68C8DE] hover:text-[#68A3DE] cursor-pointer`}
        >
          Sayonara
        </div>
        <div className="text-white text-sm font-medium">in 2 minutes</div>
      </div>
    </div>
  );
}
