"use client"

import React, { use, useState, useEffect } from "react"
import { Action } from "./Action"
import { IoChevronForward } from "react-icons/io5"
import { propagateServerField } from "next/dist/server/lib/render-server"
import { SheetTrigger } from "./ui/sheet"
import { ActionForm } from "./ActionForm"

type Props = {
  projectName: string
  actions_prop: Actions[]
  projects: Project[]
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
  tag: string
  history: boolean

}


export const ActionsContainer: React.FC<Props> = ({ projectName, actions_prop, projects }) => {

  const [expanded, setExpanded] = useState(true)
  const [actions, setActions] = useState<Actions[]>(actions_prop)

  useEffect(() => {
    setActions(actions_prop)
  }, [actions_prop])



  return (
    <div className="mt-2">
      <div className="flex justify-between border rounded-t-md p-1 text-white bg-gradient-to-r from-red-500 to-orange-400">
        <div className="flex gap-2">
          <IoChevronForward onClick={() => { setExpanded(!expanded) }} className={` transition duration-300 cursor-pointer ${expanded ? "rotate-90" : ""}`} size={20} />
          <div className="font-semibold text-base ml-1 tracking-wide">{projectName}</div>
          <div className=" ">{actions.length}</div>
        </div>
        <div>
          <ActionForm project={projectName}>
            <div className="h-4 w-14 hover:bg-orange-200 transition text-xl rounded-md flex justify-center items-center   text-white ">+</div>
          </ActionForm>
        </div>
      </div>

      <div className={`container p-2 gap-2 ${expanded ? "flex flex-col" : "hidden"} border `}>
        {actions.map(action => <Action
          key={action.id}
          id={action.id}
          name={action.name}
          description={action.description}
          project={action.project}
          urgency={action.urgency}
          date={action.date}
          time={action.time}
          isFocused={action.isFocused}
          isChecked={action.isChecked}
          projects={projects}
          setActions={setActions}
          tag={action.tag}
          history = {action.history}
        />)}

      </div>
    </div>
  );
}




