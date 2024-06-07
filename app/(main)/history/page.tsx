'use server'

import { ActionHistory } from "@/components/ActionHistory";
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
    historyDate : Date | null;
}



export default async function Page() {


    const actions : Action[] = await db.actions.findMany({where : {history : true}, orderBy: {historyDate : "desc"}})

    const displayActions = actions.map( (action : Action) => 
    
        {return (<ActionHistory id={action.id} name={action.name} description={action.description} project={action.project} urgency={action.urgency} 
            date={action.date} time={action.time} isFocused={action.isFocused} isChecked={action.isChecked} setActions={undefined} key={action.id} 
            tag={action.tag} projects={[]} history={action.history} historyDate={action.historyDate}></ActionHistory>)}
    
    )

    return (
        <div className="relative w-full flex justify-center">

      
      
    
    <div className="ml-12 max-w-[724px] flex flex-col w-full relative pt-10 pb-20 border rounded-md m-2 p-4">
      <div className="flex w-full justify-between relative">
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">History</div>
            <div className="font-base text-neutral-400">Consult previous activity</div>
          </div>
          
         
          
        </div>
        <hr className="w-full my-5"></hr>

        {displayActions}

    </div>
    <div className="max-w-[424px] flex flex-col w-full relative m-2 ">
      <div className="max-w-[424px] w-full h-full border rounded-md fixed">
      </div>

    </div>
    
    </div>
    )
}