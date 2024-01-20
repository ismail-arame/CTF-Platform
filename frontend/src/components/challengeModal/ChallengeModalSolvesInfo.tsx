import { useAppSelector } from "@/redux/hooks";
import { challengeType } from "@/types/challengeType";
import { Chakra_Petch, Raleway, Sansita } from "next/font/google";

type Props = {};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function ChallengeModalSolvesInfo({}: Props) {
  const challegeState = useAppSelector((state) => state.challenge);

  const activeChallenge: challengeType = challegeState.activeChallenge;

  console.log("activeChallenge : ", activeChallenge);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Add ordinal suffix to the day
    const day = date.getDate();
    const dayWithOrdinal =
      day +
      (day % 10 === 1 && day !== 11 && day != 21 && day != 31
        ? "st"
        : day % 10 === 2 && day !== 12 && day != 22
          ? "nd"
          : day % 10 === 3 && day !== 13 && day != 23
            ? "rd"
            : "th");

    const formattedWithOrdinal = formattedDate.replace(/\d+/, dayWithOrdinal);

    // Replace "at" with ","
    return formattedWithOrdinal.replace(" at", "");
  };

  return (
    <div className="overflow-y-scroll scrollbar">
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
      {activeChallenge.solves &&
        activeChallenge.solves.length > 0 &&
        activeChallenge.solves
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort(
            (a, b) =>
              new Date(a.solvedAt).getTime() - new Date(b.solvedAt).getTime()
          )
          .map((solve: any, i: number) => {
            return (
              <>
                <div
                  key={i}
                  className="grid grid-cols-2 place-items-center py-3 border-t border-[#282c35]"
                >
                  <div
                    className={`${sansita.className} text-lg text-[#68C8DE] hover:text-[#68A3DE] cursor-pointer`}
                  >
                    {solve.user?.username}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {formatDate(new Date(solve.solvedAt))}
                  </div>
                </div>
              </>
            );
          })}
    </div>
  );
}
