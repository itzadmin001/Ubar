import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <div className='bg-[url("src/assets/ubar-bg.avif")] bg-cover bg-center w-full h-[100vh] flex flex-col justify-between'>
                <img src="/Ubar.webp" alt="" className='w-[26vw] p-4' />
                <div className='bg-white py-8 px-4 '>
                    <h1 className='font-bold text-[7vw] py-3'>Get Started With Ubar</h1>
                    <Link to={"/user-login"} className='flex items-center justify-center bg-black py-4 px-5 text-white font-bold rounded-lg '>Continue</Link>
                </div>

            </div>
        </div >
    )
}

export default Home
