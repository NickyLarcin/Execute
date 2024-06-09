'use client'

import React, { ReactNode, useEffect, useState } from "react"
import { FaFolderOpen } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CalendarPop } from "./CalendarPop";
import { MdOutlineTimer } from "react-icons/md";
import { create } from "domain";
import { createAction } from "@/app/ServerActions/createAction";
import { TbUrgent } from "react-icons/tb";
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from "sonner"
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoIosTime } from "react-icons/io";

import { Slider } from "@/components/ui/slider"

import { FaFastForward } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CalendarIcon } from "lucide-react";

import { Toaster } from "./ui/sonner";
import { cn } from "@/lib/utils";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { AiFillThunderbolt } from "react-icons/ai";
import { useFormStatus } from "react-dom";



type Props = {
  children : ReactNode
  project : string
  isFocused_p? : boolean
}

type Project = {
  id: string
  name: string
}

export const ActionForm: React.FC<Props> = ({children, project, isFocused_p}) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState<Project[]>([])



  useEffect(() => {

    const fetchData = async () => {

      try {

        const data = await fetch("/api/getProjects").then(res => res.json()).then(res => res.data)

        setProjects(data)
        setLoading(false)

      } catch (error) {

      }


    }


    fetchData()

  }, []);

  const [action, setAction] = useState('');
  const [urgency, setUrgency] = useState<number[]>([50]);
  const [timeEstimate, setTimeEstimate] = useState<number[]>([50]);
  const [people, setPeople] = useState('');
  const [sideNotes, setSideNotes] = useState('');
  const [date, setDate] = React.useState<Date>(new Date())
  const [isFocused, setIsFocused] = React.useState(isFocused_p? isFocused_p : false)  
  const [tag, setTag] = React.useState<string>("action")

  if (loading) return <div>Loading...</div>

  return (
    <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className="h-4/5 w-full max-w-[780px]">
    <form className="p-4 h-full w-full bg-white text-xs flex flex-col content-between" action={createAction}>
      <div className="flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex">
            <div>
              <div className='flex flex-col pt-[6px] mr-2'>
              <AiFillThunderbolt onClick={() => { setIsFocused(!isFocused) }} className={cn("transition duration-300 hover:cursor-pointer visible hover:bg-accent rounded-md  text-yellow-500", isFocused ? "opacity-100 visible" : "opacity-50")} size={25} />
              <input value={isFocused.toString()} name="isFocused" className="hidden"/>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="name"
                className="w-full mb-1 bg-transparent font-semibold text-black text-lg focus:ring-0 border-none focus:bg-transparent focus:outline-none"
                placeholder="Action..."
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
            </div>
          </div>


        </div>
        <textarea
          className="w-full p-2 h-40 mb-4 border border-gray-300 rounded focus:bg-transparent focus:outline-none focus:ring-transparent focus:border-gray-300"
          name="description"
          placeholder="Side Notes"
          value={sideNotes}
          onChange={(e) => setSideNotes(e.target.value)}
        />


        <div className="flex flex-col mb-4 gap-2">

          <div className="flex gap-2 w-full">
          <div onClick={()=>{setTag("action")}}
          className={`${tag === "action" ? "border-orange-500 text-orange-500" : "border-neutral-500"} hover:border-orange-500 hover:bg-orange-500 hover:text-white w-16 h-6 rounded-full border  bg-white text-[10px] font-semibold flex items-center justify-center cursor-pointer`}>
          Action
          </div>
          <div onClick={()=>{setTag("monitor")}}
          className={`${tag === "monitor" ? "border-purple-500 text-purple-500" : "border-neutral-500"} hover:border-purple-500 hover:bg-purple-500 hover:text-white w-16 h-6 rounded-full border  bg-white text-[10px] font-semibold flex items-center justify-center cursor-pointer`}>
          Monitor
          </div>
          <input value={tag} name="tag" className="hidden"/>
          </div>




          <div className="w-full flex gap-2 items-center justify-between border rounded-md px-2 py-1 h-8 text-neutral-400">
            <svg
              viewBox="0 0 576 512"
              fill="currentColor"
              height="1.5em"
              width="1.5em"

            >
              <path d="M0 80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v16h192V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-16H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-96c0-1.7.1-3.4.3-5L144 224H48c-26.5 0-48-21.5-48-48V80z" />
            </svg>
            <Select name="project">
              <SelectTrigger className="w-full h-6 border-none focus:border-none">
                <SelectValue placeholder={ project === "" ? "Select Project" : project } />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (<SelectItem value={`${project.name}`} key={project.id}>{project.name}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex gap-2 items-center justify-between border rounded-md px-2 h-8 cursor-pointer text-neutral-400">
            <div>
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="2em"
                width="2em"

              >
                <path d="M793.8 499.3L506.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.6c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8a16.14 16.14 0 000-25.4zm-320 0L186.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.5c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8c4.1-3.2 6.2-8 6.2-12.7 0-4.6-2.1-9.4-6.2-12.6zM857.6 248h-51.2c-3.5 0-6.4 2.7-6.4 6v516c0 3.3 2.9 6 6.4 6h51.2c3.5 0 6.4-2.7 6.4-6V254c0-3.3-2.9-6-6.4-6z" />
              </svg>
        
            </div>
            <Slider defaultValue={[50]} max={100} step={10} name="urgency" onValueChange={(value) => { setUrgency(value) }} />

            <div className="text-sm m-2 text-neutral-600 flex">{urgency}</div>
          </div>

          <div className="w-full flex items-center gap-2 justify-between border rounded-md px-2 h-8 text-neutral-400"><CalendarIcon className="mr-2 h-6 w-6" /><CalendarPop date={date} setDate={(newDate) => setDate(newDate || new Date())} /></div>

          <input className="hidden" name="date" type="text" value={date?.toISOString()} />

          {tag === "action" && <div className="w-full flex gap-2 items-center justify-between border rounded-md px-2 h-8 cursor-pointer text-neutral-400">
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"

              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
              </svg>
            </div>
            <Slider defaultValue={[50]} max={200} step={10} name="time" onValueChange={(val) => { setTimeEstimate(val) }} />

            <div className="text-sm m-2 text-neutral-600 flex">{timeEstimate}</div>
          </div>}
        </div>


        


      </div>
      <div className="flex flex-grow w-full flex-col justify-end">
        <div className="flex flex-col justify-between">
          <button type="submit" onClick={() => { toast("task Created"), setAction(""), setSideNotes("") }} className="w-full shadow-md bg-gradient-to-r from-red-500 to-orange-500 text-white p-2 rounded-md">Add Action</button>
          <hr className="w-full px-10 border border-neutral-200 my-3"></hr>
          <div className="text-neutral-400 w-full text-center">Updated on Date of Month</div>
        </div>
      </div>

    </form>
    </DialogContent>
</Dialog>
  );
}
