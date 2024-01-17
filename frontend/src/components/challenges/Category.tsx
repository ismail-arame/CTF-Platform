import { Chakra_Petch } from "next/font/google";
import CategoryChallenge from "./CategoryChallenge";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/redux/hooks";
import { challengeType } from "../../types/challengeType";

type Props = {
  categoryName: string;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export default function Category({ categoryName }: Props) {
  const { challenges } = useAppSelector((state) => state.challenge);
  const { user } = useAppSelector((state) => state.user);

  //filtering challenges based on the categoryName
  const filteredChallenges = challenges.filter(
    (challenge: challengeType) => challenge.category === categoryName
  );

  const challengesArrayHasCategoryName = challenges.some(
    (challenge: challengeType) => challenge.category === categoryName
  );

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
              filteredChallenges.map((challenge: challengeType) => {
                const isUserSolved = challenge.solves.some(
                  (solve) => solve.user._id === user._id
                );
                return (
                  <CategoryChallenge
                    challenge={challenge}
                    challengeName={challenge.name}
                    solvesNumber={challenge.solves.length}
                    key={challenge._id}
                    challengePoints={challenge.points}
                    challengeDifficulty={challenge.difficulty}
                    isUserSolved={isUserSolved}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

// solves = [{user:"65a13dd2410183c4e2640f93", solvedAt:"2024-01-12T14:33:40.029Z"}, {user:"65a13dd24101356c4e2640f93", solvedAt:"2023-01-12T14:33:40.029Z"}]
