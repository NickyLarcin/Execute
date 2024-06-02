'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { useRouter } from "next/navigation"

export const DELETE = async (req: NextRequest) => {

  

   
    const body = await req.json()
    const id = body.id

    try {

        const ans = await db.actions.delete({
            where: {id:id}
        })

        revalidatePath("/")
       

        return NextResponse.json({message: "action deleted"})
        
    } catch (error) {
        return NextResponse.json({message: error})
    }


}