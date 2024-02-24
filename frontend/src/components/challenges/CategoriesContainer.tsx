import Category from "./Category";

type Props = { challenges: any; categoryClicked: string };

export default function CategoriesContainer({
  challenges,
  categoryClicked,
}: Props) {
  return (
    <>
      {categoryClicked ? (
        <Category categoryName={categoryClicked} challenges={challenges} />
      ) : (
        <>
          <Category categoryName="Web" challenges={challenges} />
          <Category categoryName="Pwn" challenges={challenges} />
          <Category categoryName="Crypto" challenges={challenges} />
          <Category categoryName="Rev" challenges={challenges} />
          <Category categoryName="Osint" challenges={challenges} />
          <Category categoryName="Misc" challenges={challenges} />
          <Category categoryName="Forensics" challenges={challenges} />
          <Category categoryName="Steganography" challenges={challenges} />
          <Category categoryName="Malware Analysis" challenges={challenges} />
        </>
      )}
    </>
  );
}

{
  /* <>
<Category categoryName="Pwn" challenges={challenges} />;
<Category categoryName="Crypto" challenges={challenges} />;
<Category categoryName="Web" challenges={challenges} />;
<Category categoryName="Rev" challenges={challenges} />;
<Category categoryName="Misc" challenges={challenges} />;
<Category categoryName="Forensics" challenges={challenges} />;
<Category categoryName="Malware Analysis" challenges={challenges} />;
</> */
}
