"use client";

import Navbar from "@/components/navbar/Navbar";
import { Raleway, Lato, Chakra_Petch } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/auth/AuthInput";
import Cookies from "js-cookie";
import { loginUser } from "@/redux/features/userSlice";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password must be less than 32 characters."),
});
type FormSchemaType = z.infer<typeof formSchema>;
type Props = {};

// const raleway = Raleway({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Login({}: Props) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let res = await dispatch(loginUser({ ...data }));
    if (res.payload.user) {
      Cookies.set("usertoken", res.payload.user.token);
      router.push("/challenges");
    }
  };

  return (
    <div className="h-screen w-screen bg-[#1a1c22] overflow-y-hidden">
      <div className="max-w-[1366px] mx-auto">
        {/* Navbar */}
        <Navbar lato={lato} />
        {/* Login Title */}
        <div className="w-full flex items-center justify-center py-[64px] px-[32px] bg-[#1a1c22] mb-8">
          <h1
            className={`${chakra_petch.className} text-[42px] text-white tracking-[2px] font-medium`}
          >
            Login
          </h1>
        </div>
        {/* Login Form */}
        <div className={`${lato.className} w-full flex justify-center`}>
          <div className="w-[550px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AuthInput
                name="email"
                type="text"
                placeholder="Email address"
                register={register}
                error={errors?.email?.message}
              />
              <AuthInput
                name="password"
                type="password"
                placeholder="Password"
                register={register}
                error={errors?.password?.message}
              />
              <div className="pt-3 mb-12">
                <div className="flex justify-between">
                  <p className="text-[#68C8DE] cursor-pointer">
                    Forgot you password?
                  </p>
                  <button
                    className="text-white bg-[#68C8DE] border-[#68A3DE] rounded-[4px] px-12 py-[6px]"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
