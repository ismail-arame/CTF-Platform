import { Chakra_Petch } from "next/font/google";
import CategoryChallenge from "./CategoryChallenge";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/redux/hooks";

type Props = {
  categoryName: string;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export default function Category({ categoryName }: Props) {
  const { challenges } = useAppSelector((state) => state.challenge);

  //filtering challenges based on the categoryName
  const filteredChallenges = challenges.filter(
    (challenge: any) => challenge.category === categoryName
  );

  const challengesArrayHasCategoryName = challenges.some(
    (challenge: any) => challenge.category === categoryName
  );

  if (challengesArrayHasCategoryName) {
    console.log(
      `challenges array has at least one challenge of : ${categoryName}`
    );
  }

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1200px)",
  });
  const isLaptopOrTablet = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const isTabletOrLargePhone = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const isLargePhoneorPhone = useMediaQuery({
    query: "(max-width: 750px)",
  });
  const isPhoneorSmallPhone = useMediaQuery({
    query: "(max-width: 550px)",
  });
  return (
    <>
      {challengesArrayHasCategoryName && (
        <div
          className={`flex flex-col mx-auto ${
            !isLaptopOrTablet
              ? "px-28"
              : !isTabletOrLargePhone
                ? "px-14"
                : "px-7"
          } mb-[30px]`}
        >
          {/* Category Title */}
          <p className={`${chakra_petch.className} text-3xl text-white mb-4`}>
            {categoryName}
          </p>
          {/* Category Challenges */}
          <div
            className={`mx-8 grid ${
              !isDesktopOrLaptop
                ? "grid-cols-4"
                : !isLaptopOrTablet
                  ? "grid-cols-3"
                  : !isPhoneorSmallPhone
                    ? "grid-cols-2"
                    : "grid-cols-1"
            } gap-y-[9px] gap-x-7`}
          >
            {filteredChallenges &&
              filteredChallenges.length > 0 &&
              filteredChallenges.map((challenge: any) => {
                return (
                  <CategoryChallenge
                    challenge={challenge}
                    challengeName={challenge.name}
                    solvesNumber={challenge.solves.length}
                    key={challenge._id}
                    challengePoints={challenge.points}
                    challengeDifficulty={challenge.difficulty}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
