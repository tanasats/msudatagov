"use server"
//import jwt from 'jsonwebtoken';
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { User } from '@/types';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey");

export async function signToken(payload: object, expiresIn = "1h") {
  console.log("lib/jws.ts ->signToken() = ", payload);
  //console.log("with secret = ", new TextDecoder().decode(secret));
  //console.log(".env JWT_SECRET = ", process.env.JWT_SECRET);
  //console.log("payload.email= ",(payload as User).email);
  const email = (payload as User).email;
  const regex = /@msu\.ac\.th$/;
  console.log("email @msu.ac.th test = ", regex.test(email));

  if (regex.test(email)) {
    const jwt = await new SignJWT(payload as JWTPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn) // "1h", "2d", etc.
      .sign(secret);
    return jwt;
  } else {
    return "";
  }

}


export async function verifyToken(token: string) {
  try {
    //const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
    const { payload } = await jwtVerify(token, secret);
    //console.log("payload",payload);
    //return payload;

    return payload ? true : false;

  } catch {
    //console.log("error==",error);
    return false;
  }
}

export async function decodeToken(token: string): Promise<User | null> {
  try {
    //const decoded = jwt.decode(token);
    //console.log("decoded:",decoded);
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');
    const { payload } = await jwtVerify(token, secret);
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
  } catch {
    //console.log("error==",error);
    return null;
  }
}
