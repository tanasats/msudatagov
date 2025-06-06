import Link from 'next/link'
import React from 'react'

const TopNav = () => {
    return (
        <nav className='bg-slate-100'>
            <div className="mx-auto px-2">
                <div className='relative flex justify-between h-16 items-center'>
                    <div>
                        <Link href="/">Dashboard</Link>
                    </div>
                    <div>
                        <Link href="/signin">Signin</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNav