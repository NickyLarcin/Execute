"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Page() {

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const tag = getQueryParam('tag');

    console.log(tag)

    const [tagFilter, setTagFilter] = useState(tag || "")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const currentTag = getQueryParam('tag');
        if (currentTag) {
            setTagFilter(currentTag);
        }
    }, [searchParams]);

    const handleClick = (origin) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (tagFilter === origin && tagFilter !== "") {
            setTagFilter("");
            urlParams.delete('tag');
        } else {
            setTagFilter(origin);
            urlParams.set('tag', origin);
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    return (
        <div className="m-2 flex flex-col">
            <div className="p-2 font-semibold">
                Tag Filters
            </div>
            <div className="top-1/2 left-10 rounded-md border flex p-2 text-sm gap-2 opacity-70">
                <div onClick={() => { handleClick('action') }} className={`${tagFilter === 'action' ? "border-orange-500 text-orange-500" : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Actions</div>
                <div onClick={() => { handleClick('monitor') }} className={`${tagFilter === 'monitor' ? "border-purple-500 text-purple-500" : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Monitors</div>
            </div>
        </div>
    )
}
