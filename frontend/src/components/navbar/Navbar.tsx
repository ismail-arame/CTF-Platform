import Link from "next/link";
import { Chakra_Petch, Sansita } from "next/font/google";
import { useMediaQuery } from "react-responsive";

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "500" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

type Props = {
  lato: any;
};

export default function Navbar({ lato }: Props) {
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
        <div className="flex justify-center">
          <ul className="list-none flex">
            <li
              className={`${chakra_petch.className} nav_items transform translate-y-[-1px]`}
            >
              <Link href="/" className="text-xl font-semibold text-white mb-1 ">
                SicsCTF 2024
              </Link>
            </li>
            <li className="nav_items">
              <Link href="/login">Users</Link>
            </li>
            <li className="nav_items">
              <Link href="/login">Scoreboard</Link>
            </li>
            <li className="nav_items">
              <Link href="/login">Challenges</Link>
            </li>
          </ul>
        </div>
        {/* Right side */}
        <div className="flex justify-center">
          <ul className="list-none flex">
            <li className="nav_items">
              <Link href="/register">Register</Link>
            </li>
            <li className="nav_items">
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
