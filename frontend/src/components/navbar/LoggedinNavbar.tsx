import Link from "next/link";
import { logout } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { Chakra_Petch, Sansita } from "next/font/google";
import { useMediaQuery } from "react-responsive";
import {
  clearChallenges,
  setActiveChallenge,
} from "@/redux/features/challengeSlice";

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

type Props = {
  lato: any;
};

export default function LoggedinNavbar({ lato }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("usertoken");
    await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`);
    router.push("/login");
    dispatch(
      setActiveChallenge({
        id: "",
        name: "",
        points: "",
        category: "",
        description: "",
        author: "",
        hints: [],
        attachmentZipName: "",
        attachmentUrl: "",
        websiteLink: "",
        difficulty: "",
        solves: [],
      })
    );
    dispatch(clearChallenges());
  };

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
    <nav>
      <div
        className={`${sansita.className} ${
          !isScreenBelow700px ? "" : "text-[14px]"
        } flex justify-between items-center ${
          !isLaptopOrTablet ? "px-28" : !isTabletOrLargePhone ? "px-14" : "px-7"
        } py-4 bg-[#1a1c22] h-14`}
      >
        {/* left side */}
        <div className="flex justify-center relative ml-[126px]">
          <ul className="list-none flex">
            <li
              className={`${chakra_petch.className} nav_items ${
                !isScreenBelow700px
                  ? "left-[-138px] translate-y-[-2px]"
                  : "left-[-127px] translate-y-[-3px]"
              } transform absolute `}
            >
              <Link
                href="/"
                className={`${
                  !isScreenBelow700px ? "text-xl" : "text-lg"
                } font-semibold text-white mb-1`}
              >
                SicsCTF 2024
              </Link>
            </li>
            <li className="nav_items">
              <Link href="/users">Users</Link>
            </li>
            <li className="nav_items">
              <Link href="/scoreboard">Scoreboard</Link>
            </li>
            <li className="nav_items">
              <Link href="/challenges">Challenges</Link>
            </li>
          </ul>
        </div>
        {/* Right side */}
        <div className="flex justify-center">
          <ul className="list-none flex">
            <li className="nav_items">
              <Link href="/user">Profile</Link>
            </li>
            <li className="nav_items" onClick={handleLogout}>
              <Link href="/">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
