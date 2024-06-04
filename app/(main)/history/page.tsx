'use server'

import { Action } from "@/components/Action";
import { db } from "@/lib/db"
import React from "react"

type Action = {
    id: string;
    name: string;
    description: string;
    project: string;
    urgency: number;
    date: Date;
    time: number;
    people: string;
    isFocused: boolean;
    isChecked: boolean;
    userId: string;
    tag: string;
    history : boolean;
}



export default async function Page() {


    const actions : Action[] = await db.actions.findMany({where : {history : true}})

    const displayActions = actions.map( (action : Action) => 
    
        {return (<Action id={action.id} name={action.name} description={action.description} project={action.project} urgency={action.urgency} 
            date={action.date} time={action.time} isFocused={action.isFocused} isChecked={action.isChecked} setActions={undefined} key={action.id} 
            tag={action.tag} projects={[]} history={action.history}></Action>)}
    
    )

    return (
        <div>

            {displayActions}





        </div>
    )
}