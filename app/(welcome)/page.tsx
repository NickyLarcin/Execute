"use client"

import { ClerkLoaded, ClerkLoading, SignIn, SignInButton, SignedOut } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image"
import React from "react"
import Typed, { ReactTyped } from 'react-typed';


export default function Page() {


   



    return(
        <div className="flex flex-col lg:flex-row w-full h-full bg-gradient-to-b from-white to-slate-200 justify-center items-center ">
            <div className="w-[75%] flex   justify-center">
                <div className=" w-[50%] flex justify-center items-center drop-shadow-xl">

                    <Image src={"/file.png"} alt={""} width={400} height={400} className=""/>
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <div className="font-bold text-6xl w-full flex justify-center tracking-wider	 mt-5 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400">Execute</div>
                    <ReactTyped 
                    strings={['Analytical Task Tracker ']}
                    typeSpeed={20}
                    startWhenVisible
                    showCursor={false}
                    className="text-2xl font-semibold w-full flex  justify-center items-center tracking-tight mt-10"
                    />
                    <ReactTyped 
                    strings={['to boost your productivity']}
                    typeSpeed={20}
                    startDelay={800}
                    startWhenVisible
                    className="text-2xl font-semibold w-full flex justify-center items-center tracking-tight mb-10"
                    />
                    <SignedOut>
                    <SignInButton>
                    <div className="w-[50%] rounded-full border-2 hover:bg-orange-500 hover:text-white hover:translate-y-[2px] flex justify-center mx-4 my-2 font-semibold p-2 cursor-pointer shadow-sm transition text-orange-500 border-orange-500">Get Started</div>
                    </SignInButton>
                    </SignedOut>


                </div>
            </div>
            
              
        </div>
    )


}