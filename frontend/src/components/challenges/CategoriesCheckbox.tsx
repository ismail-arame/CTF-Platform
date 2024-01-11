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
          <CategoryCheckbox categoryName="Pwn" challengesNumber={4} />
          <CategoryCheckbox categoryName="Crypto" challengesNumber={3} />
          <CategoryCheckbox categoryName="Web" challengesNumber={6} />
          <CategoryCheckbox categoryName="Rev" challengesNumber={7} />
          <CategoryCheckbox categoryName="Misc" challengesNumber={2} />
          <CategoryCheckbox categoryName="Forensics" challengesNumber={9} />
          <CategoryCheckbox categoryName="Malware" challengesNumber={9} />
        </div>
      ) : (
        <div className="w-full flex flex-wrap px-7 items-center justify-center mb-14">
          <CategoryCheckbox categoryName="Pwn" challengesNumber={4} />
          <CategoryCheckbox categoryName="Crypto" challengesNumber={3} />
          <CategoryCheckbox categoryName="Web" challengesNumber={6} />
          <CategoryCheckbox categoryName="Rev" challengesNumber={7} />
          <CategoryCheckbox categoryName="Misc" challengesNumber={2} />
          <CategoryCheckbox categoryName="Forensics" challengesNumber={9} />
          <CategoryCheckbox categoryName="Malware" challengesNumber={9} />
        </div>
      )}
    </>
  );
}
