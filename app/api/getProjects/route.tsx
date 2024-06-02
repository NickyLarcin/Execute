'use server'

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    
 
   try {

    const data = await db.projects.findMany()
   
   
    return NextResponse.json({success: true, data: data})

   } catch (error) {
    return NextResponse.json({message: "fail to fetch projects"})
   }



}