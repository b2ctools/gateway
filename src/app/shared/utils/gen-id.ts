import crypto from "crypto";
import { ID } from "../abstract-repository/repository.interface";

/** tool to generate ramdom ids. */
export const genId = (email: string = null) => {
  if (email === "elmer@email.com") return "11111";
  if (email === "yoennis@email.com") return "22222";
  if (email === "leo@email.com") return "33333";
  return crypto.randomBytes(16).toString("hex");
};

export const codeFromId = (id: ID) => {
  return (id as string).slice(-9);
};
