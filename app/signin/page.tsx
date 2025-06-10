"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'
import { msu_auth } from '../actions/msu-auth'
import Link from 'next/link'
import { useSession } from '@/context/SessionContext';
//import { User } from '@/types'
import Image from 'next/image'
import { LuBug } from 'react-icons/lu'
import { EyeIcon, EyeOffIcon } from 'lucide-react'


const SigninPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useSession();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        console.log("Submit Signin form");
        if (!username || !password) return;
        const data = await msu_auth(username, password);
        console.log("msu_auth() :", data);


        if(data?.user && data?.token){
            login(data.user,data.token);

        }
        


    }


    return (
        <div className='w-full bg-[url("/signin_bg.jpg")] bg-cover bg-center'>
            <div className='absolute opacity-30 right-[24px]'>
                <Image src='/msu_logo_white.png' width={200} height={200} alt='' />
            </div>
            <div className='absolute flex flex-col bottom-[20px]  w-full justify-center text-white opacity-50 text-sm'>
                <span className='w-fit mx-auto'>สงวนลิขสิทธิ์ &copy;2025 มหาวิทยาลัยมหาสารคาม</span> <span className='w-fit mx-auto'>All rights reserved. Powered By Mahasarakham University</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center min-h-screen z-30">
                    <div className="w-[350px] bg-gray-50 flex flex-col text-center p-8 rounded-lg shadow-2xl gap-4">
                        <div className='flex items-center gap-5'>
                            <div className='w-16 h-16 bg-primary flex items-center justify-center rounded-full'>
                                <LuBug className='w-10 h-10 text-white' />
                            </div>
                            <div className='text-4xl font-bold'>
                                Data MSU
                            </div>
                        </div>


                        <h1 className=" text-xl">ลงชื่อเข้าใช้งาน</h1>
                        <Input name="username" type="text" placeholder="Username" />
                        <div className="relative">
                            <Input name="password" type={showPassword ? "text" : "password"} placeholder="Password" />
                            {showPassword ?
                                (
                                    <EyeIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <EyeOffIcon size={20} className='absolute top-[0.5rem] right-2 cursor-pointer text-muted-foreground' onClick={() => setShowPassword(!showPassword)} />
                                )
                            }
                        </div>
                        {/* {errorMessage && <div className='text-red-600 text-sm'>{errorMessage}</div>} */}
                        <Button variant={"default"}>เข้าสู่ระบบ</Button>
                        {/* <Button variant={"secondary"}>Sign Up</Button> */}
                        {/* <div className='text-sm'>หรือ</div>
                        <div className='hover:bg-slate-100 rounded-md'>
                            <Link href={""}  className='flex gap-2 justify-center p-1 border rounded-md items-center text-sm'>
                                <Image src="/thaid_logo.jpg" width={"32"} height={"32"} alt={"ThaiD"} className='rounded' />
                                เข้าสู่ระบบด้วย ThaiD
                            </Link>
                        </div> */}
                        <div>or</div>
                        <Button variant={"secondary"} className='bg-blue-200 hover:bg-blue-100'>เข้าสู่ระบบ ด้วย MSU mail</Button>
                        <div className='flex justify-between'>
                        <Link href={"/"} className='text-sm py-2 px-4 rounded-lg hover:bg-gray-100'>กลับหน้าหลัก</Link>

                        </div>

                    </div>
                    {/* <Button
                        variant="outline"
                        onClick={() =>
                            toast("Event has been created", {
                                description: "Sunday, December 03, 2023 at 9:00 AM",
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    >
                        Show Toast
                    </Button> */}



                </div>
            </form>


        </div>

    )
}

export default SigninPage