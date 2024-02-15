import CategoryCheckbox from "./CategoryCheckbox";
import { useMediaQuery } from "react-responsive";

type Props = { challenges: any };

export default function CategoriesCheckbox({ challenges }: Props) {
  const isScreenBelow1050px = useMediaQuery({
    query: "(max-width: 1050px)",
  });

  // Step 1: Extract unique categories from challenges
  const uniqueCategories = Array.from(
    new Set(challenges.map((challenge: any) => challenge.category))
  );

  // Step 2: Count the number of challenges in each category
  const categoryCounts: { [category: string]: number } = {};
  challenges.forEach((challenge: any) => {
    categoryCounts[challenge.category] =
      (categoryCounts[challenge.category] || 0) + 1;
  });

  return (
    <>
      {!isScreenBelow1050px ? (
        <div className="w-full flex items-center justify-center mb-14">
          {uniqueCategories.map((category: any, i: any) => (
            <CategoryCheckbox
              key={i}
              categoryName={category as string}
              challengesNumber={categoryCounts[category as string] || 0}
            />
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap px-7 items-center justify-center mb-14">
          {uniqueCategories.map((category: any, i: any) => (
            <CategoryCheckbox
              key={i}
              categoryName={category as string}
              challengesNumber={categoryCounts[category as string] || 0}
            />
          ))}
        </div>
      )}
    </>
  );
}

{
  /* <CategoryCheckbox categoryName="Pwn" challengesNumber={4} />
<CategoryCheckbox categoryName="Crypto" challengesNumber={3} />
<CategoryCheckbox categoryName="Web" challengesNumber={6} />
<CategoryCheckbox categoryName="Rev" challengesNumber={7} />
<CategoryCheckbox categoryName="Misc" challengesNumber={2} />
<CategoryCheckbox categoryName="Forensics" challengesNumber={9} />
<CategoryCheckbox categoryName="Malware" challengesNumber={9} /> */
}
