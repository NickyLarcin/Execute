"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"



export default function Page() {

    const [tagFilter, setTagFilter] = useState("")

    const pathname = usePathname()
    const router = useRouter()




    const handleClick = (origin) => {


        if (tagFilter === origin && tagFilter !== "") {
            setTagFilter("");
            router.push(pathname)
        } else {
            setTagFilter(origin);
            router.push(pathname+"?tag="+origin)
        }
        


    }

    return (

       
        <div className="m-2 flex flex-col">
            <div className="p-2 font-semibold   ">
                Tag Filters 
            </div>
            <div className="top-1/2 left-10 rounded-md border flex p-2 text-sm gap-2  opacity-70">
                <div onClick={()=>{handleClick('action')}} className={`${tagFilter === 'action' ? "border-orange-500 text-orange-500 " : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Actions</div>
                <div onClick={()=>{handleClick('monitor')}} className={`${tagFilter === 'monitor' ? "border-purple-500 text-purple-500" : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Monitors</div>
            </div>
        </div>
    )
}