"use server"
import { cookies } from 'next/headers';
import { decodeToken } from "./jwt";
import { User } from "@/types"

export async function xgetCurrentUser():Promise<User|null>{
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  //return verifyToken(token);
  const decode = decodeToken(token);
  const user = decode;
  return user;
}

