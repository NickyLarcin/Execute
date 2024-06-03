'use client'

import React from "react";
import { Link } from "@nextui-org/react";
import { Avatar as Ava, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MdAddTask } from "react-icons/md";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";


export default function App() {

    const currentRoute = usePathname()
    console.log(currentRoute)

    return (
        <div className="h-14 z-50 fixed w-full flex justify-between items-center shadow-sm px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <div className="w-40">


                <p className="font-bold text-inherit text-white text-2xl cursor-pointer">Execute.now</p>
            </div>


            <div className="hidden sm:flex gap-4">
                <div>
                    <Link color="foreground" href="/actions" className={cn(currentRoute === "/actions" ? "border border-white" : "", "text-white hover:bg-orange-300", "rounded-xl p-2 transition")}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em"

                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M21 2.992v18.016a1 1 0 01-.993.992H3.993A.993.993 0 013 21.008V2.992A1 1 0 013.993 2h16.014c.548 0 .993.444.993.992zm-9.707 10.13l-2.475-2.476-1.414 1.415 3.889 3.889 5.657-5.657-1.414-1.414-4.243 4.242z" />
                        </svg>
                    </Link>
                </div>
                <div>
                    <Link href="/viz" aria-current="page" color="secondary" className={cn(currentRoute === "/viz" ? "border border-white" : "", "text-white hover:bg-orange-300", "rounded-xl p-2 transition")}>
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"

                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M15 13v4M13 15h4" />
                            <path d="M20 15 A5 5 0 0 1 15 20 A5 5 0 0 1 10 15 A5 5 0 0 1 20 15 z" />
                            <path d="M22 22l-3-3M6 18H5a2 2 0 01-2-2v-1M3 11v-1M3 6V5a2 2 0 012-2h1M10 3h1M15 3h1a2 2 0 012 2v1" />
                        </svg>
                    </Link>
                </div>
                <div>
                    <Link color="foreground" href="/focus" className={cn(currentRoute === "/today" ? "border border-white" : "", "text-white hover:bg-orange-300", "rounded-xl p-2 transition")}>
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"

                        >
                            <path d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7z" />
                        </svg>
                    </Link>
                </div>
            </div>


            <div >
                <ClerkLoading>
                    <Loader className="h-6 w-6 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <div className=""><UserButton afterSignOutUrl="/" /></div>
                </ClerkLoaded>

            </div>
        </div>
    );
}
