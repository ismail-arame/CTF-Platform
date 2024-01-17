import { SearchIcon } from "@/app/svg";
import { Sansita } from "next/font/google";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

type UsersSearchInputPropsType = {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error: string | undefined;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function UsersSearchInput({
  name,
  type,
  placeholder,
  register,
  error,
}: UsersSearchInputPropsType) {
  // Responsiveness
  const isLaptopOrTablet = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const isTabletOrLargePhone = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });
  const isScreenBelow600px = useMediaQuery({
    query: "(max-width: 600px)",
  });

  return (
    <>
      <div className={`mb-4 w-full flex ${isScreenBelow600px && "flex-col"}`}>
        <input
          className={`w-full ${isScreenBelow700px && "text-[12px]"} ${
            isScreenBelow600px ? "mb-4" : "mr-8"
          } bg-[#282c35] focus:text-[#aaaaaa] text-[#aaaaaa] text-base py-[13px] px-4 rounded-[4px] outline-none border border-solid border-1 border-[#323843] inputfocus transition-all duration-300`}
          type={type}
          {...register(name)}
          placeholder={placeholder}
        />
        <div className="flex items-center justify-center">
          <button
            className={`${sansita.className} flex items-center justify-center ${
              isScreenBelow600px ? "w-full" : "mr-6"
            } px-14 py-[6px] bg-[#68C8DE] rounded-[4px] cursor-pointer`}
            type="submit"
          >
            {/* <i className="fa fa-download" aria-hidden="true"></i> */}
            {/* <i className="fa fa-search" aria-hidden="true"></i> */}
            <SearchIcon className="w-5 fill-[#1a1c22]" />
          </button>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  );
}
