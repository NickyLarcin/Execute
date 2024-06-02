'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {



    const body = await req.json()
    const { id, type, edit } = body



    try {

        if (type === "title") {

            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    name: edit
                }

            })

            return NextResponse.json({ success: true, data: ans })

        } else if (type === "description") {

            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    description: edit
                }

            })

            return NextResponse.json({ success: true, data: ans })

        } else if (type === "isFocused") {



            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    isFocused: edit === "true" ? true : false
                }

            })

            return NextResponse.json({ success: true, data: ans })
        } else if (type === "project") {



            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    project: edit
                }

            })



            return NextResponse.json({ success: true, data: ans })
        } else if (type === "isChecked") {

            console.log(edit)

            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    isChecked: edit === "true" ? true : false
                }

            })

            console.log(ans)



            return NextResponse.json({ success: true, data: ans })
        } else if (type === "urgency") {


            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    urgency: edit 
                }

            })

            console.log(ans)



            return NextResponse.json({ success: true, data: ans })
        } else if (type === "time") {


            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    time: edit 
                }

            })

            console.log(ans)



            return NextResponse.json({ success: true, data: ans })
        } else if (type === "date") {


            const ans = await db.actions.update({
                where: {
                    id: id
                },
                data: {
                    date: edit 
                }

            })

            console.log(ans)



            return NextResponse.json({ success: true, data: ans })
        } 


        revalidatePath("/")

        return NextResponse.json({ message: "no update made" })
    } catch (error) {
        return NextResponse.json({ message: error })
    }


}