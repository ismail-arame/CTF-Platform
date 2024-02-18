"use client";

import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import UserSolvedChallengesList from "@/components/profile/UserSolvedChallengesList";
import ListUsersRank from "@/components/scoreboard/ListUsersRank";
import {
  getScoreboard,
  getUserById,
  getUsers,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Chakra_Petch,
  Fredericka_the_Great,
  Lato,
  Sansita,
} from "next/font/google";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";

type Props = {};

// const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const Fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
});
const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Scoreboard({}: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { status } = useAppSelector((state) => state.user);
  const { activeChallenge } = useAppSelector((state) => state.challenge);
  const [users, setUsers] = useState(null);
  // const [loading, setLoading] = useState(false);

  // calculates the rank of users based on their scores and updates the rank in databse accordingly
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      if (user?.token) {
        const res = await dispatch(getScoreboard(user?.token));
        setUsers(res.payload);
      }
      // setLoading(false);
    };
    fetchData();
  }, [user]);

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
  return (
    <div className="min-h-screen w-screen bg-[#1a1c22]">
      <div className="max-w-[1366px] mx-auto">
        <LoggedinNavbar lato={lato} />
        <div
          className={`${
            !isLaptopOrTablet
              ? "px-28"
              : !isTabletOrLargePhone
                ? "px-14"
                : "px-7"
          }`}
        >
          <div className="w-full pt-[64px] pb-[32px] bg-[#1a1c22]">
            <div
              className={`flex flex-col items-center ${
                status !== "loading" && "mb-16"
              }`}
            >
              <div
                className={`${Fredericka.className} ${
                  !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
                } text-white tracking-[2px] font-medium mb-2 forbidden`}
              >
                Scoreboard
              </div>
            </div>
          </div>
          {!users ? (
            <div className="w-full flex justify-center items-center">
              <Triangle
                visible={true}
                height="80"
                width="80"
                color="#68C8DE"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <ListUsersRank users={users} />
          )}
        </div>
      </div>
    </div>
  );
}
