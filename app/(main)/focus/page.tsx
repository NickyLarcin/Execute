'use server'


import { Action } from "@/components/Action";
import { db } from "@/lib/db";
import React from "react";
import { Card, ProgressBar } from '@tremor/react';
import { sum } from "d3";
import { currentUser } from "@clerk/nextjs/server";


export default async function Page() {


  const user = await currentUser()
  if ( !user || !user.id ) return (<div>Error Fetching User</div>)

  
  const focusedActions = await db.actions.findMany({
    where : { isFocused : true,
      userId : user.id
     }
  })

  const actionsDisplay = focusedActions.map(action => {
    return (<Action id={action.id} name={action.name} description={action.description} project={action.project} urgency={action.urgency} date={action.date

    } time={action.time} isFocused={action.isFocused} isChecked={action.isChecked} projects={[]} setActions={undefined}></Action>)
  })

  const sumActionTime = focusedActions.reduce((acc, action) => acc + action.time, 0)
  const sumActionTimeifChcked = focusedActions.reduce((acc, action) => action.isChecked ? acc + action.time : acc, 0)





  const workDone = Math.round(sumActionTimeifChcked*10 / 60) / 10
  const totalWork = Math.round(sumActionTime*10 / 60) / 10
  const workRemaining = totalWork - workDone
  const progressPercentage = Math.round(workDone / totalWork * 100)
  const leftIndent = `left-[${progressPercentage}%]`


  return (
    <div className="w-screen h-screen flex flex-col items-center pt-10">
      <div className="flex flex-col items-center max-w-[624px] w-full gap-2">
        <div className="flex flex-col w-full ">
          <div className="font-semibold text-xl">Focused Actions</div>
          <div className="font-base text-neutral-400">Track your focused actions here</div>
        </div>
        <hr className="w-full"></hr>
        <div className="w-full py-5 flex">
        <div className="text-sm flex flex-col">
          <span className="text-base font-bold">{workDone} hours</span> of work achieved
        </div>
        <div className="flex-grow px-5 relative">
          <div className={`relative left-[47%] text-sm text-neutral-600`}>{progressPercentage}%</div>
          <ProgressBar value={progressPercentage} color="orange" className="mt-3" />
        </div>
        <div className="text-sm flex flex-col">
          <span className="text-base font-bold">{totalWork} hours</span> of total work identified
        </div>

        </div>
        <hr className="w-full"></hr>
        {actionsDisplay}
      </div>
    </div>
  );
}