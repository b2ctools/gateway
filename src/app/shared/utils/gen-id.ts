import crypto from "crypto";

/** tool to generate ramdom ids. */
export const genId = (email : string = null) => {
  if (email === 'elmer@email.com') return '11111';
  if (email === 'yoennis@email.com') return '22222';
  if (email === 'leo@email.com') return '33333';
  return crypto.randomBytes(16).toString("hex");
};
