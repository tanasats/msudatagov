"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent } from 'react'
import { msu_auth } from '../actions/msu-auth'
import Link from 'next/link'
import { useSession } from '@/context/SessionContext';
//import { User } from '@/types'
import { useRouter } from 'next/router'


const SigninPage = () => {
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
        <div className='w-full'>
            <div className="w-[350px] mx-auto min-h-screen my-auto">
                <div className='mt-4'>
                    <h1 className='text-2xl'>Signin</h1>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col item-center gap-4">
                            <div>
                                <label >username</label>
                                <Input name='username' type='text' placeholder='username' />
                            </div>
                            <div>
                                <label >password</label>
                                <Input name='password' type="password" placeholder='password' />
                            </div>
                            <Button variant={"default"}>Sign</Button>
                            <Button className=" text-white bg-blue-500 hover:bg-blue-400" variant={"default"}>Signin with mail @msu.ac.th</Button>
                            <div className='text-sm'>
                                <Link className="hover:text-blue-600" href="/">หน้าหลัก</Link>
                            </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default SigninPage