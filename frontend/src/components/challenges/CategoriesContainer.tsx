import Category from "./Category";

type Props = { challenges: any };

export default function CategoriesContainer({ challenges }: Props) {
  return (
    <>
      <Category categoryName="Pwn" challenges={challenges} />;
      <Category categoryName="Crypto" challenges={challenges} />;
      <Category categoryName="Web" challenges={challenges} />;
      <Category categoryName="Rev" challenges={challenges} />;
      <Category categoryName="Misc" challenges={challenges} />;
      <Category categoryName="Forensics" challenges={challenges} />;
      <Category categoryName="Malware Analysis" challenges={challenges} />;
    </>
  );
}
