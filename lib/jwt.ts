import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';


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

  } catch(error) {
    console.log("error==",error);
    return false;
  }
}

export async function decodeToken(token: string) {
  try {
    //const decoded = jwt.decode(token);
    //console.log("decoded:",decoded);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
    const {payload} = await jwtVerify(token,secret);
    //console.log("payload",payload);
    return payload;
  } catch(error) {
    return null;
  }
}
