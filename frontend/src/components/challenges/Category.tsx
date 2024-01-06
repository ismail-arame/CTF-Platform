import { Chakra_Petch } from "next/font/google";
import CategoryChallenge from "./CategoryChallenge";
import { useMediaQuery } from "react-responsive";

type Props = {
  categoryName: string;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });

export default function Category({ categoryName }: Props) {
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
    <div
      className={`flex flex-col mx-auto ${
        !isLaptopOrTablet ? "px-28" : !isTabletOrLargePhone ? "px-14" : "px-7"
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
        <CategoryChallenge
          challengeName="Crackd JWT"
          solvesNumber={274}
          challengePoints={100}
          challengeDifficulty="easy"
        />
        <CategoryChallenge
          challengeName="Malicious PDF"
          solvesNumber={124}
          challengePoints={200}
          challengeDifficulty="easy"
        />
        <CategoryChallenge
          challengeName="Broken PNG"
          solvesNumber={97}
          challengePoints={200}
          challengeDifficulty="medium"
        />
        <CategoryChallenge
          challengeName="Degital DFIR"
          solvesNumber={55}
          challengePoints={300}
          challengeDifficulty="hard"
        />
        <CategoryChallenge
          challengeName="Degital DFIR"
          solvesNumber={13}
          challengePoints={500}
          challengeDifficulty="hard"
        />
        <CategoryChallenge
          challengeName="Degital DFIR"
          solvesNumber={50}
          challengePoints={500}
          challengeDifficulty="hard"
        />
      </div>
    </div>
  );
}
