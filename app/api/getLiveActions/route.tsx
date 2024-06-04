
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {


    try {
 
    const data = await db.actions.findMany({where : {history : false}})
    


  
    return NextResponse.json({success: true, data: data})

    } catch(error) {

        return NextResponse.json({message: "fail to fetch actions"})   
    
    }

   


}