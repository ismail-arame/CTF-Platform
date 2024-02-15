import { Chakra_Petch, Sansita } from "next/font/google";
import Link from "next/link";
import { ChallengeIcon, FirstBloodIcon, PointsIcon } from "@/app/svg";

type Props = { users: any };

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function ListUsersRank({ users }: Props) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 place-items-center">
        <div className="w-full flex items-center">
          <div
            className={`${chakra_petch.className} text-[#68C8DE] font-semibold mb-4 mr-10 w-[40px]`}
          >
            Rank
          </div>
          <div
            className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
          >
            <span className="">Player</span>
          </div>
        </div>
        <div
          className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
        >
          <span className="">Points</span>
        </div>
        <div
          className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
        >
          <span className="">Challenges</span>
        </div>
        <div
          className={`${chakra_petch.className} text-[#68C8DE] font-semibold  mb-4`}
        >
          <span className="">First Bloods</span>
        </div>
      </div>
      {users &&
        users.length > 0 &&
        users.map((user: any) => {
          return (
            <div
              key={user._id}
              className="grid grid-cols-4 place-items-center py-3 border-t border-[#282c35]"
            >
              <div className="w-full flex items-center">
                <div
                  className={`${sansita.className} flex justify-center items-center text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer mr-10 w-[40px]`}
                >
                  {user.rank}
                </div>
                <div
                  className={`${sansita.className}  text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer mr-auto`}
                >
                  <Link href={`/user/${user._id}`}>{user.username}</Link>
                </div>
              </div>
              <div
                className={`${sansita.className} flex items-center justify-center text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
              >
                <PointsIcon />
                <div className="ml-[6px] w-[26px]">{user.score}</div>
              </div>
              <div
                className={`${sansita.className} flex items-center justify-center text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
              >
                <ChallengeIcon />
                <span className="ml-[8px] w-[18px]">{user.solves.length}</span>
              </div>
              <div
                className={`${sansita.className} flex items-center justify-center text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
              >
                <FirstBloodIcon />
                <span className="ml-[6px] w-[18px]">
                  {user.firstBlood.length}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}
