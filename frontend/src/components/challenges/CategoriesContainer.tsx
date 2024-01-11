import Category from "./Category";

type Props = {};

export default function CategoriesContainer({}: Props) {
  return (
    <>
      <Category categoryName="Pwn" />;
      <Category categoryName="Crypto" />;
      <Category categoryName="Web" />;
      <Category categoryName="Rev" />;
      <Category categoryName="Misc" />;
      <Category categoryName="Forensics" />;
      <Category categoryName="Malware Analysis" />;
    </>
  );
}
