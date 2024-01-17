import { userSolvesType } from "./UserSolvesType";

export type userType = {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  picture: string;
  solves: userSolvesType[];
  token: string;
};
