"use client"

import React, { useState } from "react"

type Props = {
    tagFilter : string
    setTagFilter : (tag : string) => void
}

export default function Page({tagFilter, setTagFilter}: Props) {




    const handleClick = (origin) => {
        (tagFilter === origin && tagFilter !== "") ? setTagFilter("") : setTagFilter(origin)

    }

    return (

       
        <div>
            <div className="fixed top-1/2 left-10 rounded-md border flex p-2 text-sm gap-2 bg-gradient-to-r from-red-500 to-orange-500 opacity-70">
                <div onClick={()=>{handleClick('action')}} className={`${tagFilter === 'action' ? "border-orange-500 text-orange-500" : ""} rounded-md border-2 h-20 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Actions</div>
                <div onClick={()=>{handleClick('monitor')}} className={`${tagFilter === 'monitor' ? "border-purple-500 text-purple-500" : ""} rounded-md border-2 h-20 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Monitors</div>
            </div>
        </div>
    )
}