import CategoryCheckbox from "./CategoryCheckbox";
import { useMediaQuery } from "react-responsive";

type Props = {};

export default function CategoriesCheckbox({}: Props) {
  const isScreenBelow1050px = useMediaQuery({
    query: "(max-width: 1050px)",
  });

  return (
    <>
      {!isScreenBelow1050px ? (
        <div className="w-full flex items-center justify-center mb-14">
          <CategoryCheckbox categoryName="pwn" challengesNumber={4} />
          <CategoryCheckbox categoryName="web" challengesNumber={6} />
          <CategoryCheckbox categoryName="crypto" challengesNumber={3} />
          <CategoryCheckbox categoryName="rev" challengesNumber={7} />
          <CategoryCheckbox categoryName="forensics" challengesNumber={9} />
          <CategoryCheckbox categoryName="jailbreak" challengesNumber={2} />
        </div>
      ) : (
        <div className="w-full flex flex-wrap px-7 items-center justify-center mb-14">
          <CategoryCheckbox categoryName="pwn" challengesNumber={4} />
          <CategoryCheckbox categoryName="web" challengesNumber={6} />
          <CategoryCheckbox categoryName="crypto" challengesNumber={3} />
          <CategoryCheckbox categoryName="rev" challengesNumber={7} />
          <CategoryCheckbox categoryName="forensics" challengesNumber={9} />
          <CategoryCheckbox categoryName="jailbreak" challengesNumber={2} />
        </div>
      )}
    </>
  );
}
