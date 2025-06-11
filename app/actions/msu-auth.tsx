"use server"
import { signToken } from '@/lib/jwt';
import { User } from '@/types';
//import { cookies } from "next/headers";

export const msu_auth = async (username: string, password: string) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //<-- ปิดการตรวจสอบ SSL
    try {
        const response = await fetch("https://data.msu.ac.th/api/authmsu/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        //const cookieStore = await cookies();
        const data = await response.json();
        console.log("msu authen response =", data);

        if (!data.access_token) {
            return ({ "message":"Login failed" });
        }

        // const token = signToken({
        //     id:1,
        //     username:data.username,
        //     fullname:data.fullname,
        //     faculty:data.faculty,
        //     email:data.mail,
        //     role:'member',
        // });

        if(data){
        const userdata:User = {
            id:'0',
            username:data.username,
            name:data.fullname,
            faculty:data.faculty,
            email:data.mail,
            role:'member',
        };  
            const token = signToken(userdata); 
            console.log('token: ',token);
            //cookieStore.set('token', token); 
            return {user:userdata,token:token};        
        }

        //return data;
        //return {user:{id:1,username:data.username},token:token};
       
    } catch (error) {
        console.log(error)
        return ({ "message": error || "Login failed" })
    }    
}