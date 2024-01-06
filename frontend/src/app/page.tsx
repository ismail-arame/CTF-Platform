"use client";

import LoggedinNavbar from "@/components/navbar/LoggedinNavbar";
import { Lato } from "next/font/google";
import Cookies from "js-cookie";
import Navbar from "@/components/navbar/Navbar";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const userCookie = Cookies.get("usertoken");
  return (
    <div className="h-screen w-screen bg-[#1a1c22] overflow-y-hidden">
      <div className="max-w-[1366px] mx-auto">
        {userCookie ? <LoggedinNavbar lato={lato} /> : <Navbar lato={lato} />}
      </div>
    </div>
  );
}
