import { challengeSolvesType } from "./challengeSolvesType";

export type challengeType = {
  _id: string;
  name: string;
  points: number;
  category:
    | "Pwn"
    | "Crypto"
    | "Web"
    | "Rev"
    | "Misc"
    | "Forensics"
    | "Malware Analysis";
  description: string;
  flagFormat?: string;
  flagExemple?: string;
  author: string;
  hints: string[];
  attachmentZipName: string;
  attachmentUrl: string;
  websiteLink: string;
  difficulty: "very easy" | "easy" | "medium" | "hard";
  solves: challengeSolvesType[];
};
