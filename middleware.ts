// middleware.ts  (use jwt on edge runtime with jose library)

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { JOSEError } from 'jose/errors';

// ระบุ secret key
// const SECRET = process.env.JWT_SECRET || 'supersecretkey';
const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'supersecretkey');

// เส้นทางที่เข้าถึงได้โดยไม่ต้อง auth
const publicPaths = ['/signin', '/home','/'];

// หน้าที่ต้องการ role แต่ละระดับ
const rolePaths: Record<string, string[]> = {
  guest: ['/profile'],
  member: ['/dashboard', '/product', '/profile','/dashboard/profile'],
  admin: ['/dashboard', '/product', '/profile', '/setting'],
};

// Middleware หลัก
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("current path: ",pathname);

  // ถ้าเป็นเส้นทาง public ก็อนุญาตให้ผ่านได้เลย
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  // หากไม่มี token ให้ redirect ไปหน้า signin
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }


  try {
    // ตรวจสอบ token
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;
    console.log("role :",role);

    const allowedPaths = rolePaths[role] || [];

    // ตรวจสอบว่าสิทธิ์เข้าถึง route ได้หรือไม่
    if (!allowedPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    // ผ่านการตรวจสอบ
    return NextResponse.next();

  } catch (error) {
    console.error('middleware found JWT verification failed : ', (error as any)?.code);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

// ให้ middleware ทำงานกับเส้นทางทั้งหมด ยกเว้น static files
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};





//   // middleware.ts
// import { NextRequest, NextResponse } from 'next/server';
// //import { verifyToken } from '@/lib/jwt';

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;
//   const path = req.nextUrl.pathname;



//   // เส้นทางที่เข้าถึงได้โดยไม่ต้อง auth
//   const publicPaths = ['/home', '/signin'];


//   if (publicPaths.includes(path)) return NextResponse.next();
//   console.log("middleware token==",token);
//   //const user = token ? verifyToken(token) as any : null;   

 
//   if (!user) return NextResponse.redirect(new URL('/signin', req.url));

//   const role = user.role;
//   console.log("role=",user);



// // หน้าที่ต้องการ role แต่ละระดับ
//   const accessMap: Record<string, string[]> = {
//     '/profile': ['GUEST', 'MEMBER', 'ADMIN'],
//     '/dashboard': ['MEMBER', 'ADMIN'],
//     '/product': ['MEMBER', 'ADMIN'],
//     '/setting': ['ADMIN'],
//   };

//   for (const [route, allowedRoles] of Object.entries(accessMap)) {
//     if (path.startsWith(route) && !allowedRoles.includes(role)) {
//       return NextResponse.redirect(new URL('/home', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/product/:path*', '/profile/:path*', '/setting/:path*'],
// };