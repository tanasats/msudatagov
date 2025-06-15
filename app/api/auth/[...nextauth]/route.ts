//import { authConfig } from '@/lib/auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'; // สำหรับจัดการ cookies ใน App Router Server Components/API Routes

// const handler = NextAuth(authConfig)
// export { handler as GET, handler as POST}

// กำหนดชื่อ custom cookies ที่ต้องการลบ
const CUSTOM_COOKIES_TO_DELETE = ['token', 'user'];

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({ user }) {
            console.log("NextAuth Sign callback user = ", user);
            return true;
        },


    },
    events: {
        async signOut({ session, token }) {
            console.log('NextAuth signOut event triggered!');
            console.log('Session:', session);
            console.log('Token:', token);

            try {
                // ลบ Custom Cookies เมื่อมีการ Sign Out
                CUSTOM_COOKIES_TO_DELETE.forEach(async cookieName => {
                    (await cookies()).delete(cookieName);
                    console.log(`Deleted custom cookie: ${cookieName}`);
                });

                // คุณสามารถเพิ่ม Logic อื่นๆ ที่เกี่ยวข้องกับการ Sign Out ตรงนี้ได้
                // เช่น การลบข้อมูลใน Database ที่ผูกกับ Session ของ Custom Cookies เหล่านี้
                // หรือส่ง Log ไปยังระบบ Monitoring ของคุณ

            } catch (error) {
                console.error('Error deleting custom cookies in signOut event:', error);
            }
        },
        // สามารถเพิ่ม events อื่นๆ ได้ที่นี่ เช่น signIn, createUser, updateUser, linkAccount, session
        // async signIn({ user, account, profile, email, credentials }) {
        //   console.log('signIn event');
        //   return true;
        // },

    }
})

export { handler as GET, handler as POST }