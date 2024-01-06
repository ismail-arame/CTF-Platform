import Category from "./Category";

type Props = {};

export default function CategoriesContainer({}: Props) {
  return (
    <>
      <Category categoryName="Binary Exploitation" />;
      <Category categoryName="Crypto" />;
    </>
  );
}
