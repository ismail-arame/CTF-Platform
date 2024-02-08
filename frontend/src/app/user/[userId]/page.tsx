"use client";

import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import UserSolvedChallengesList from "@/components/profile/UserSolvedChallengesList";
import {
  getScoreboard,
  getUserById,
  getUsers,
} from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Chakra_Petch, Lato, Sansita } from "next/font/google";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "next/navigation";
import { Triangle } from "react-loader-spinner";

type Props = {};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function User({}: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState<any>();
  // Get User_Id from the Pathname
  const params = useParams();
  // console.log("pathname : ", params); params = {userId: "xxxxxxxxxxxxxxxxxxxxxxxx"}
  const values = { userId: params.userId, token: user.token };
  // get users
  useEffect(() => {
    const fetchData = async () => {
      if (user?.token) {
        // to update the rank of the user
        await dispatch(getScoreboard(user?.token));
        const res = await dispatch(getUserById(values));
        setUserInfo(res.payload);
        console.log("getUserById res : ", res);
      }
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
    <>
      {!userInfo ? (
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
              <div className="w-full flex justify-center items-center pt-[159px]">
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
            </div>
          </div>
        </div>
      ) : (
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
                <div className="flex flex-col items-center mb-16">
                  <div
                    className={`${chakra_petch.className} ${
                      !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
                    } text-white tracking-[2px] font-medium mb-2`}
                  >
                    {userInfo.username}
                  </div>
                  <h3
                    className={`${sansita.className} ${
                      !isScreenBelow700px ? "text-[26px]" : "text-[22px]"
                    } text-white tracking-[1px] font-medium`}
                  >
                    {userInfo?.rank}
                    {userInfo?.rank === 1
                      ? "st"
                      : userInfo?.rank === 2
                        ? "nd"
                        : "th"}{" "}
                    place
                  </h3>
                  <h3
                    className={`${sansita.className} ${
                      !isScreenBelow700px ? "text-[26px]" : "text-[22px]"
                    } text-white tracking-[1px] font-medium`}
                  >
                    {userInfo.score} points
                  </h3>
                </div>
                <UserSolvedChallengesList userInfo={userInfo} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
