import { Chakra_Petch, Sansita } from "next/font/google";
import Link from "next/link";

type Props = {
  filteredUsers: any;
};

const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "600" });
const sansita = Sansita({ subsets: ["latin"], weight: "400" });

export default function ListUsers({ filteredUsers }: Props) {
  return (
    <div className="flex flex-col">
      <div
        className={`${chakra_petch.className} text-white font-semibold text-lg mb-4`}
      >
        <span className="pl-4 text-[#68C8DE]">Users</span>
      </div>
      {filteredUsers &&
        filteredUsers.length > 0 &&
        filteredUsers.map((user: any) => {
          return (
            <div
              key={user._id}
              className="flex flex-col py-3 border-t border-[#282c35]"
            >
              <div
                className={`${sansita.className} text-lg text-[#DDF2FD] hover:text-[#68A3DE] cursor-pointer`}
              >
                <Link href={`/user/${user._id}`} className="pl-4">
                  {user.username}
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
}
