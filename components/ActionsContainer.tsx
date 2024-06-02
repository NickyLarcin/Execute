"use client"

import React, { use, useState, useEffect } from "react"
import { Action } from "./Action"
import { IoChevronForward } from "react-icons/io5"
import { propagateServerField } from "next/dist/server/lib/render-server"
import { SheetTrigger } from "./ui/sheet"

type Props = {
    projectName : string
    actions_prop : Actions[]
    projects : Project[]
}

type Project = {
    id: string
    name: string
}

type Actions = {
    id: string;
    name: string;
    description: string;
    project: string
    urgency: number
    date: Date
    time: number
    isFocused: boolean
    isChecked: boolean

}


export const ActionsContainer : React.FC<Props> = ({projectName, actions_prop, projects}) => {

    const [expanded, setExpanded] = useState(true)
    const [actions, setActions] = useState<Actions[]>(actions_prop)

    useEffect(() => {
        setActions(actions_prop)
    },[actions_prop])


         
          return (
            <div className="mt-2">
              <div className="flex gap-2 mb-2">
                <IoChevronForward onClick={()=>{setExpanded(!expanded)}}className={` transition duration-300 cursor-pointer ${expanded ? "rotate-90" : "" }` } size={20}/>
                <div className="font-semibold text-base ml-1">{projectName}</div>
                <div className="font-semibold text-neutral-400">{actions.length}</div>
              </div>
              <div className={`w-full h-[3px] bg-gradient-to-r from-red-500 to-orange-400 rounded-xl mb-2`}></div>
              <div className={`container p-2 gap-2 ${expanded? "flex flex-col" : "hidden"}`}>
                {actions.map(action => <Action
                  key = {action.id}
                  id={action.id}
                  name={action.name}
                  description={action.description}
                  project={action.project}
                  urgency={action.urgency}
                  date = {action.date}
                  time= {action.time}
                  isFocused = {action.isFocused}
                  isChecked = {action.isChecked}
                  projects = {projects}
                  setActions = {setActions}
                />)}
                
              </div>
            </div>
          );
        }




