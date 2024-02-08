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
import {
  clearAuthenticationError,
  registerUser,
} from "@/redux/features/userSlice";
import Cookies from "js-cookie";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

// add numbers to username in the regex (remember to do later)
const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(32, "Username must be less than 32 characters.")
    .regex(
      new RegExp("^[a-zA-Z_]+$"),
      "Only alphabetical characters and underscore are allowed."
    ),
  fullname: z
    .string()
    .min(2, "Fullname must be at least 2 characters.")
    .max(32, "Fullname must be less than 32 characters.")
    .regex(
      new RegExp("^[a-zA-Z ]+$"),
      "Only alphabetical characters and space are allowed."
    ),
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

export default function Register({}: Props) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const [loginError, setLoginError] = useState(null);
  // useEffect to set the loginError when the Redux error changes
  useEffect(() => {
    if (error) {
      // Set the loginError state when there is an error from Redux
      setLoginError(error);

      // Set a timer to clear the loginError after 3000 milliseconds (3 seconds)
      const timerId = setTimeout(() => {
        setLoginError(null);
        dispatch(clearAuthenticationError());
      }, 3000);

      // Cleanup function to clear the timer if the component unmounts or error changes
      return () => clearTimeout(timerId);
    }
  }, [error]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  console.log("errors: ", errors);
  // const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    let res = await dispatch(registerUser({ ...data }));
    if (res.payload.user) {
      Cookies.set("usertoken", res.payload.user.token);
      router.push("/challenges");
    }
  };

  // Responsiveness
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });

  return (
    <div className="h-full w-screen bg-[#1a1c22]">
      <div className="max-w-[1366px] mx-auto">
        {/* Navbar */}
        <Navbar lato={lato} />
        {/* Register Title */}
        <div className="w-full flex items-center justify-center py-[64px] px-[32px] bg-[#1a1c22] mb-8">
          <h1
            className={`${chakra_petch.className} ${
              !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
            } text-white tracking-[2px] font-medium`}
          >
            Register
          </h1>
        </div>
        {/* Regiter Form */}
        <div className={`${lato.className} w-full flex justify-center`}>
          <div className="w-[550px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AuthInput
                name="username"
                type="text"
                placeholder="Username"
                register={register}
                error={errors?.username?.message}
              />
              <AuthInput
                name="fullname"
                type="text"
                placeholder="Full Name"
                register={register}
                error={errors?.fullname?.message}
              />
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
              {/* if we have an error */}
              {loginError && (
                <div>
                  <p className=" text-red-400">{loginError}</p>
                </div>
              )}
              <div className="pt-3 mb-12">
                <div className="flex justify-between">
                  <p></p>
                  <button
                    className="text-white bg-[#68C8DE] border-[#68A3DE] rounded-[4px] w-[146px] h-[36px]"
                    type="submit"
                  >
                    {status === "loading" ? (
                      <div className="w-full flex justify-center items-center">
                        <div
                          className="mr-1 inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-[#fff] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        ></div>
                        <div className="text-[14px]">Processing...</div>
                      </div>
                    ) : (
                      "Submit"
                    )}
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
