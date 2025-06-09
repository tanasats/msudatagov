import { cookies } from 'next/headers';
import { decodeToken } from "./jwt";
import { User } from "@/types"


export async function getCurrentUser():Promise<User|null>{
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  //return verifyToken(token);
  const decode = decodeToken(token);
  const user = decode;
  return user;
}

// export const simulatedLogin = async (username: string, password: string): Promise<{ user: User; token: string } | null> => {
//   // จำลองการตรวจสอบข้อมูล
//   if (username === 'test' && password === 'password') {
//     const user: User = {
//       id: '123',
//       username: 'test',
//       name: 'Test User',
//       email: '_test@example.com_',
//       faculty: '_faculty_',
//       role:'member',
//     };
//     const token = 'fake-jwt-token-12345';
//     return { user, token };
//   }
//   return null;
// };

// export const simulatedLogout = async (): Promise<boolean> => {
//   // จำลองการล้าง token หรือ session บน server
//   return true;
// };