import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { User } from '@/types';


const SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
    const {payload} = await jwtVerify(token,secret);
    //console.log("payload",payload);
    //return payload;
    
    return payload?true:false;

  } catch {
    //console.log("error==",error);
    return false;
  }
}

export async function decodeToken(token: string):Promise<User | null> {
  try {
    //const decoded = jwt.decode(token);
    //console.log("decoded:",decoded);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
    const {payload} = await jwtVerify(token,secret);
    //console.log("payload",payload);

      const user = payload as {
        id: string;
        username: string;
        name: string;
        email: string;
        faculty: string;
        role: string;
      };
    
    return user;
  } catch{
    //console.log("error==",error);
    return null;
  }
}
