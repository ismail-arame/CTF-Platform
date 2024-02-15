import { UseFormRegister, FieldValues } from "react-hook-form";

type AuthInputPropsType = {
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error: string | undefined;
};

export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
}: AuthInputPropsType) {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="text-base font-bold tracking-wide text-white"
      >
        {placeholder}
      </label>
      <input
        className="w-full bg-[#282c35] focus:text-[#aaaaaa] text-[#aaaaaa] text-base py-[13px] px-4 rounded-[4px] outline-none border border-solid border-1 border-[#323843] mt-2 inputfocus transition-all duration-300"
        type={type}
        {...register(name)}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
