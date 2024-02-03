import { Request } from 'express';
export const fetchTokenFromRequest = (req: Request): string => {
  const bearerPrefix = 'Bearer ';
  const header = req.headers['authorization'] as string;
  const token = header ? header.slice(bearerPrefix.length) : "";
  
  return token;
};
