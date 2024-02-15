import { Sansita } from "next/font/google";
import { UseFormRegister, FieldValues } from "react-hook-form";

type FlagInputPropsType = {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error: string | undefined;
  istheFlagCorrect: boolean;
  flagSubmitResponse: string;
};

const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function FlagInput({
  name,
  type,
  placeholder,
  register,
  error,
  istheFlagCorrect,
  flagSubmitResponse,
}: FlagInputPropsType) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className={`w-full bg-[#282c35] focus:text-[#aaaaaa] text-[#aaaaaa] text-base py-[13px] px-4 outline-none rounded-lg border border-solid border-1 ${
            error
              ? "border-red-500"
              : flagSubmitResponse
                ? istheFlagCorrect
                  ? "border-[#0CCA4A]"
                  : "border-red-500"
                : "border-[#323843]"
          } focus:border-[#68C8DE] mt-2 transition-all duration-300`}
          type={type}
          {...register(name)}
          placeholder={placeholder}
        />
        <button
          className={`${sansita.className} absolute px-4 py-[13px] bg-[#68C8DE] right-[0px] top-[9px] border border-solid border-[#68C8DE] rounded-r-lg transform translate-y-[-1px] cursor-pointer`}
          type="submit"
        >
          Submit
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
