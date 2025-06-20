"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useState } from 'react'
import { msu_auth } from '../actions/msu-auth'
import Link from 'next/link'
import { useSessionContext } from '@/context/SessionContext';
import Image from 'next/image'
import { LuBug } from 'react-icons/lu'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

const SigninPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useSessionContext();
    const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        if (!(username && password)) {
            toast.error("โปรดกรอก username/password ให้ครบ");
            return
        }
        if (!username || !password) return;
        const data = await msu_auth(username, password);

        if (data?.user && data?.token) {
            login(data.user, data.token);
            toast.success("สวัสดี " + data.user.name);
        } else {
            toast.error("ชื่อผู้ใช้งาน หรือรหัสผ่าน ไม่ถูกต้อง")
        }
    }

    return (
        <div className='w-full bg-[url("/signin_bg.jpg")] bg-cover bg-center'>
            <div className='absolute opacity-30 right-[24px]'>
                <Image src='/msu_logo_white.png' width={200} height={200} alt='' />
            </div>

            <div className="flex flex-col justify-center items-center min-h-screen z-30">
                <div className="w-[360px] bg-gray-50 flex flex-col text-center p-8 rounded-lg shadow-2xl gap-4">
                    {/* Icon Header */}
                    <div className='flex items-center gap-5'>
                        <div className='w-16 h-16 bg-primary flex items-center justify-center rounded-full'>
                            <LuBug className='w-10 h-10 text-white' />
                        </div>
                        <div className='text-3xl font-bold'>
                            {APP_NAME}
                        </div>
                    </div>

                    {/* Signin Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
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
                            {/* <Button variant={"secondary"}>Sign Up</Button> */}
                            {/* <div className='text-sm'>หรือ</div>
                            <div className='hover:bg-slate-100 rounded-md'>
                                <Link href={""}  className='flex gap-2 justify-center p-1 border rounded-md items-center text-sm'>
                                    <Image src="/thaid_logo.jpg" width={"32"} height={"32"} alt={"ThaiD"} className='rounded' />
                                    เข้าสู่ระบบด้วย ThaiD
                                </Link>
                            </div> */}
                            <Button variant={"default"}>เข้าสู่ระบบ</Button>
                        </div>
                    </form>

                    {/* Other Signin */}
                    <div>or</div>
                    <Button onClick={() => signIn("google", { callbackUrl: "/" })} variant={"secondary"} className='bg-blue-100 hover:bg-blue-50'>เข้าสู่ระบบ ด้วย MSU mail</Button>

                    <div className='flex justify-between'>
                        <Link href={"/"} className='text-sm py-2 px-4 rounded-lg hover:bg-gray-100'>กลับหน้าหลัก</Link>
                    </div>

                </div>
            </div>

            {/* Footer Signin page */}
            <div className='absolute flex flex-col bottom-[20px]  w-full justify-center text-white opacity-50 text-sm'>
                <span className='w-fit mx-auto'>สงวนลิขสิทธิ์ &copy;2025 มหาวิทยาลัยมหาสารคาม</span> <span className='w-fit mx-auto'>All rights reserved. Powered By Mahasarakham University</span>
            </div>




        </div>

    )
}

export default SigninPage