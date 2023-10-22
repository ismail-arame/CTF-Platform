"use client";

import { logout } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <button onClick={() => dispatch(logout())}>LogOut</button>
      <h1>welcome Home</h1>
    </div>
  );
}
