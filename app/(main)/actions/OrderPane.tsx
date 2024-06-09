"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Page() {

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const orderParam = getQueryParam('order');

    const [order, setOrder] = useState(orderParam || "")

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const currentOrder = getQueryParam('order');
        if (currentOrder) {
            setOrder(currentOrder);
        }
    }, [searchParams]);

    const handleClick = (origin) => {
        const urlParams = new URLSearchParams(window.location.search);

        if (order === origin && order !== "") {
            setOrder("");
            urlParams.delete('order');
        } else {
            setOrder(origin);
            urlParams.set('order', origin);
        }

        router.push(`${pathname}?${urlParams.toString()}`)
    }

    return (
        <div className="m-2 flex flex-col">
            <div className="p-2 font-semibold">
                Order Priority
            </div>
            <div className="top-1/2 left-10 rounded-md border flex p-2 text-sm gap-2 opacity-70">
                <div onClick={() => { handleClick('time') }} className={`${order === 'time' ? "border-orange-500 text-orange-500" : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Time</div>
                <div onClick={() => { handleClick('urgency') }} className={`${order === 'urgency' ? "border-purple-500 text-purple-500" : ""} rounded-md border-2 h-10 w-20 flex justify-center items-center cursor-pointer bg-white shadow-lg`}>Urgency</div>
            </div>
        </div>
    )
}
