import Link from "next/link";

type Props = {
  lato: any;
};

export default function Navbar({ lato }: Props) {
  return (
    <nav>
      <div
        className={`${lato.className} flex justify-between items-center px-28 py-4 bg-[#1a1c22] h-14`}
      >
        {/* left side */}
        <div className="flex justify-center">
          <ul className="list-none flex">
            <li className="nav_items">
              <Link href="/">sicsCTF</Link>
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
