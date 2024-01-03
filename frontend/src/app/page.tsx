"use client";

import { logout } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    Cookies.remove("usertoken");
    await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`);
    router.push("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
      <h1>welcome Home</h1>
    </div>
  );
}
