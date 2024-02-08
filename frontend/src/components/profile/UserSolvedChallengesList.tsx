import { FirstBloodIcon } from "@/app/svg";
import { Chakra_Petch, Sansita } from "next/font/google";

type Props = {
  userInfo: any;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function UserSolvedChallengesList({ userInfo }: Props) {
  // date formatting function
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
    <>
      {userInfo.solves && userInfo.solves.length > 0 ? (
        <div className="flex flex-col">
          <div
            className={`${chakra_petch.className} text-[#68C8DE] font-semibold text-[26px] mb-4 tracking-[1px]`}
          >
            Solves
          </div>
          <div className="grid grid-cols-4 place-items-center">
            <div
              className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
            >
              <span className="pl-4">Challenge</span>
            </div>
            <div
              className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
            >
              <span className="pl-4">Category</span>
            </div>
            <div
              className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
            >
              <span className="pl-4">Value</span>
            </div>
            <div
              className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
            >
              <span className="pl-4">Time</span>
            </div>
          </div>
          {userInfo.solves &&
            userInfo.solves.length > 0 &&
            userInfo.solves.map((solve: any) => {
              const isFirstBlood = userInfo.firstBlood.some(
                (firstBloodItem: any) =>
                  firstBloodItem.challenge === solve.challenge?._id
              );
              return (
                <div
                  key={solve._id}
                  className="grid grid-cols-4 place-items-center py-3 border-t border-[#282c35]"
                >
                  <div
                    className={`${sansita.className}  text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
                  >
                    <span className="pl-4">{solve.challenge?.name}</span>
                  </div>
                  <div
                    className={`${sansita.className}  text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
                  >
                    <span className="pl-4">{solve.challenge?.category}</span>
                  </div>
                  <div
                    className={`${sansita.className}  text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
                  >
                    <span className="pl-4">{solve.challenge?.points}</span>
                  </div>
                  <div
                    className={`${sansita.className}  text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
                  >
                    <div
                      className={`flex items-center pl-4 ${
                        isFirstBlood ? "text-[#FC3535] ml-4" : "text-white"
                      }`}
                    >
                      {formatDate(new Date(solve.solvedAt))}
                      <div className="ml-1">
                        {isFirstBlood && <FirstBloodIcon />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-3xl text-[#68A3DE]">No Solves Yet</div>
        </div>
      )}
    </>
  );
}
