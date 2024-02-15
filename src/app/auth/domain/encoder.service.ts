import * as bcrypt from "bcryptjs";

const defaultPassword = "Testing1234!";

/** Encoding password function */
export const encodePassword = (password: string = defaultPassword) => {
  return bcrypt.hashSync(password, 10); //v4();
};

/** Password verifier */
export const isValidPassword = async (password: string, encoded: string) => {
  return await bcrypt.compare(password, encoded);
};
