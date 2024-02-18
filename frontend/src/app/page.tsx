"use client";

import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import {
  Chakra_Petch,
  Lato,
  Cinzel,
  Fredericka_the_Great,
  Rubik_Glitch,
} from "next/font/google";
import Cookies from "js-cookie";
import Navbar from "@/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { IoLogoDiscord } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCompetitionDate } from "@/redux/features/competitionDateSlice";
import { Triangle } from "react-loader-spinner";

// const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const Fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
});
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
// const chakra_petch = Rubik_Glitch({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const userCookie = Cookies.get("usertoken");
  const dispatch = useAppDispatch();
  const { activeChallenge } = useAppSelector((state) => state.challenge);
  const { competitionStartDate, competitionEndDate } = useAppSelector(
    (state) => state.competitionDate
  );
  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Responsiveness
  const isScreenBelow700px = useMediaQuery({
    query: "(max-width: 700px)",
  });

  // get challenges and get competitionDate
  useEffect(() => {
    dispatch(getCompetitionDate());
    // Calculate countdown timer
    // const countDownDate = new Date("2024-02-16T21:15:00.000Z").getTime();
    let countDownDate: any = "";
    if (new Date() <= new Date(competitionStartDate)) {
      countDownDate = new Date(competitionStartDate).getTime();
    } else if (new Date() >= new Date(competitionStartDate)) {
      countDownDate = new Date(competitionEndDate).getTime();
    }
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        // If the countdown has reached or gone below zero, set to 0d 0h 0m 0s
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(intervalId);
      } else {
        // Calculate and update the countdown timer
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [competitionStartDate, competitionEndDate]);

  return (
    <div className="relative h-screen w-screen bg-[#1a1c22] overflow-y-hidden">
      <div className={`${!activeChallenge._id && "scanline"}`}></div>
      <div
        className={`${
          !activeChallenge._id && "flicker-animation"
        } max-w-[1366px] mx-auto`}
      >
        {userCookie ? <LoggedinNavbar lato={lato} /> : <Navbar lato={lato} />}
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-[64px] pb-[32px] px-[32px] bg-[#1a1c22]">
        <h1
          className={`${Fredericka.className} ${
            !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
          } text-white tracking-[2px] font-medium forbidden`}
        >
          ENSAO CTF 2024
        </h1>
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center mr-10">
            <Image
              src="/LOGO_WHITE.png"
              alt="logo img"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col">
            <div
              className={`${chakra_petch.className} text-[22px] text-white mb-2`}
            >
              Welcome to Defensys Club CTF 2024 {`  <`}3
            </div>
            <div className="flex flex-col items-center justify-center">
              <div
                className={`${chakra_petch.className} text-[22px] text-white mb-2`}
              >
                Follow us on social media:
              </div>
              <div className="flex justify-center items-center">
                <Link
                  href="https://www.instagram.com/defensys_ensao/"
                  target="_blank"
                >
                  <IoLogoDiscord size={60} color="#fff" className="mr-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/defensys_ensao/"
                  target="_blank"
                >
                  <FaInstagram size={60} color="#fff" className="mr-4" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/defensys-ensao-456377203"
                  target="_blank"
                >
                  <FaLinkedin size={60} color="#fff" />
                </Link>
              </div>
            </div>
            {/* Countdown Timer */}
            {!competitionStartDate || !competitionEndDate ? (
              <div className="w-full flex justify-center items-center mt-6">
                <div
                  className="mr-1 inline-block h-7 w-7 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-[#68C8DE] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              </div>
            ) : (
              <div
                className={`flex-col justify-center items-center text-white mt-6`}
              >
                <div
                  className={`${chakra_petch.className} text-[22px] text-white mt-2`}
                >
                  {new Date() <= new Date(competitionStartDate)
                    ? "CTF Starts in :"
                    : "CTF Ends in :"}
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center mr-8">
                    <div
                      className={`${Fredericka.className} text-[48px] forbidden`}
                    >
                      {countdown.days}
                    </div>
                    <div className={`${chakra_petch.className}`}>Days</div>
                  </div>
                  <div className="flex flex-col justify-center items-center mr-8">
                    <div
                      className={`${Fredericka.className} text-[48px] forbidden`}
                    >
                      {countdown.hours}
                    </div>
                    <div className={`${chakra_petch.className}`}>Hours</div>
                  </div>
                  <div className="flex flex-col justify-center items-center mr-8">
                    <div
                      className={`${Fredericka.className} text-[48px] forbidden`}
                    >
                      {countdown.minutes}
                    </div>
                    <div className={`${chakra_petch.className}`}>Minutes</div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div
                      className={`${Fredericka.className} text-[48px] forbidden`}
                    >
                      {countdown.seconds}
                    </div>
                    <div className={`${chakra_petch.className}`}>Seconds</div>
                  </div>
                </div>
              </div>
            )}
            {/* Countdown Timer */}
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <a href="https://discord.gg/dHnzAcadX2">
  <i className="fab fa-discord fa-2x" aria-hidden="true"></i>
</a> */
}
