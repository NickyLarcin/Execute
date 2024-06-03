'use server'

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const createAction = async (form : FormData) => {

    const user = await currentUser()

    if (!user || !user.id) return null
   
    const name = form.get("name")?.toString() || ""
    const description = form.get("description")?.toString() || ""
    const project = form.get("project")?.toString() || ""
    const urgency = parseInt(form.get("urgency")?.toString() || "")
    const time = parseInt(form.get("time")?.toString() || "")
    const isFocused = form.get("isFocused")?.toString() || ""
    const tag = form.get("tag")?.toString() || ""

    const rawDate = form.get("date")?.toString() || ""
    console.log(rawDate)
    const date = new Date(rawDate)
    console.log(date)

  
    if (!name && !description && !project) return null


    try {

    const ans = db.actions.create({
        data : {
            name  : name,
            description :  description,
            project : project === "" ? "Other" : project,
            urgency : urgency,
            date : date ,
            time : time ,
            people : "String" ,
            isFocused : isFocused === "true" ? true : false,
            isChecked : false,
            userId : user.id,
            tag : tag
          }
        }
    )

    console.log("Entry created")
    
    revalidatePath("/")


    return ans
        
    } catch (error) {

        return NextResponse.json({message : "error creating entry"})

        
    }
 




}