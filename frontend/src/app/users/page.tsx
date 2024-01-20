"use client";

import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import ListUsers from "@/components/users/ListUsers";
import UsersSearchForm from "@/components/users/usersSearchForm";
import { getUsers } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Chakra_Petch, Lato } from "next/font/google";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

type Props = {};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Users({}: Props) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // get users
  useEffect(() => {
    const fetchData = async () => {
      if (user?.token) {
        const res = await dispatch(getUsers(user.token));
        setUsers(res.payload); //array of user objects
        setFilteredUsers(res.payload);
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
          <div className="w-full flex items-center justify-center pt-[64px] pb-[32px] px-[32px] bg-[#1a1c22]">
            <h1
              className={`${chakra_petch.className} ${
                !isScreenBelow700px ? "text-[42px]" : "text-[38px]"
              } text-white tracking-[2px] font-medium`}
            >
              Users
            </h1>
          </div>
          <div className={`flex flex-col mb-8 `}>
            <UsersSearchForm
              users={users}
              setFilteredUsers={setFilteredUsers}
            />
          </div>
          <ListUsers filteredUsers={filteredUsers} />
        </div>
      </div>
    </div>
  );
}
