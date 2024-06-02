"use client"

import React, { SetStateAction, useCallback, useEffect, useState } from 'react'
import { SiSpeedtest } from "react-icons/si";
import { FaFastForward, FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

import { useRouter } from 'next/navigation';
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { getTailwindRedColor } from '@/lib/utils';
import { IoCloseOutline } from "react-icons/io5";
import { cn } from '@/lib/utils';
import { AiFillThunderbolt } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Icon from '@mdi/react';
import { mdiFastForward } from '@mdi/js';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { CalendarPop } from './CalendarPop';
import { CalendarIcon } from 'lucide-react';
import { debounce } from 'lodash';
import { IoIosTime } from 'react-icons/io';

type Props = {
    id: string;
    name: string;
    description: string;
    project: string
    urgency: number
    date: Date
    time: number
    isFocused: boolean
    isChecked: boolean
    projects: Project[]
    setActions: any
}

type Project = {
    id: string
    name: string
}

export const Action: React.FC<Props> = (props) => {

    const router = useRouter()

    const id = props.id
    const [name, setTitle] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [project, setProject] = useState(props.project)
    const [urgency, setUrgency] = useState<number>(props.urgency)
    const [isFading, setIsFading] = useState(false);
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const [isFocused, setIsFocused] = useState(props.isFocused);
    const [projects, setProjects] = useState<Project[]>(props.projects)
    const [time, setTime] = useState<number>(props.time)
    const [date, setDate] = React.useState<Date>(new Date())




    const urgencyColor = getTailwindRedColor(urgency)




    const debouncedEdit = useCallback(
        debounce(async (type: string, edit: string | number | Date | undefined) => {
            if (!edit) return null;

            await fetch("api/editAction", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type, edit })
            });
            router.refresh();
        }, 500), [id, router]
    );

    const handleEdit = (type: string, edit: string | number | Date | undefined) => {
        if (!edit) return null;

        if (type === "title") {
            setTitle(edit.toString());
        } else if (type === "description") {
            setDescription(edit.toString());
        } else if (type === "isFocused") {
            setIsFocused(!isFocused);
        } else if (type === "project") {
            setProject(edit.toString());
        } else if (type === "isChecked") {
            setIsChecked(!isChecked);
        } else if (type === "urgency" && typeof edit === "number") {
            setUrgency(edit);
        } else if (type === "time" && typeof edit === "number") {
            setTime(edit);
        } else if (type === "date" && edit instanceof Date) {
            setDate(edit);
        }

        debouncedEdit(type, edit);
    }
    const handleDelete = async () => {
        setIsFading(true);
        setTimeout(async () => {
            await fetch("api/deleteAction", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            try {
                props?.setActions((actions: any) => actions.filter((action: any) => action.id !== id))
            } catch (error) {

            }

            router.refresh();
            setIsFading(false)
        }, 100); // Duration of the fade-out effect

    }




    const colorVariants: { [key: number]: string } = {
        10: 'text-red-100 ',
        20: 'text-red-200 ',
        30: 'text-red-300 ',
        40: 'text-red-400 ',
        50: 'text-red-500 ',
        60: 'text-red-600 ',
        70: 'text-red-700 ',
        80: 'text-red-800 ',
        90: 'text-red-900 ',
        100: 'text-red-900 ',
    };

    return (

        <div className={`flex flex-col w-full relative group transition hover:shadow-sm duration-400 ${isFading ? 'opacity-0 scale-y-0 origin-top -z-50' : 'opacity-100'}`}>

            <div className='pt-2 px-2 flex w-full cursor-pointer'>
                <div className='flex flex-col mt-[2px] mr-2'>


                    <input type="checkbox" onChange={() => { handleEdit("isChecked", (!isChecked).toString()) }} checked={isChecked} className={cn("appearance-none border-orange-500 border-2 checked:bg-orange-500 transition duration-200 h-5 w-5 rounded-full cursor-pointer")}>
                    </input>

                </div>
                <div className='flex flex-col w-full border-none'>
                    <div className='flex w-full h-6 items-center gap-2 justify-between font-semibold border-none'>
                        <div className='flex items-center gap-2 w-full'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => { handleEdit("title", e.target.value) }}
                                placeholder={name}
                                className={cn("inline bg-transparent text-sm duration-300 w-full border-none focus:outline-none focus:ring-transparent ", isChecked ? "line-through decoration-2 text-neutral-300" : "text-black")}
                            />

                        </div>
                        <AiFillThunderbolt onClick={() => { handleEdit("isFocused", (!isFocused).toString()) }} className={cn("transition duration-300 hover:cursor-pointer group-hover:visible hover:bg-accent rounded-md  text-yellow-500 top-1/3 left-80 0", isFocused ? "opacity-100 visible" : "opacity-50 invisible")} size={20} />
                        <div className='' onClick={() => { handleDelete() }}>
                            <IoCloseOutline size={20} className='cursor-pointer text-neutral-400 invisible group-hover:visible hover:bg-accent rounded-md hover:text-red-800' />
                        </div>
                    </div>
                    <div className='flex w-full h-6 items-center  text-neutral-400'>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => { handleEdit("description", e.target.value) }}
                            placeholder={description}
                            className="inline bg-transparent border-none focus:outline-none text-xs w-full focus:ring-transparent mb-1 text-neutral-400"
                        />
                    </div>
                    <div className='flex w-full h-6 justify-between text-xs items-center text-neutral-400'>
                        <div className='flex gap-2 items-center h-6'>
                            <div className='flex gap-2 h-6 items-center'>
                                <div className='flex gap-2 border-none h-6 hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md'>
                                    <svg
                                        viewBox="0 0 576 512"
                                        fill="currentColor"
                                        height="2em"
                                        width="2em"
                                        {...props}
                                    >
                                        <path d="M0 80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v16h192V80c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-16H192v16c0 1.7-.1 3.4-.3 5L272 288h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-96c-26.5 0-48-21.5-48-48v-96c0-1.7.1-3.4.3-5L144 224H48c-26.5 0-48-21.5-48-48V80z" />
                                    </svg>
                                    <Select name="project" onValueChange={(value) => { handleEdit("project", value) }}>
                                        <SelectTrigger className="w-full h-full border-none focus:border-none focus:ring-offset-0 focus:ring-transparent">
                                            <SelectValue placeholder={project} className='text-xs' />
                                        </SelectTrigger>
                                        <SelectContent className='text-xs'>
                                            {projects.map(project => (<SelectItem value={`${project.name}`} className='text-xs'>{project.name}</SelectItem>))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            &bull;
                            <div className='flex gap-1'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className='flex gap-2 border-none h-6 text-xs'>
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                
                                            >
                                                <path d="M793.8 499.3L506.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.6c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8a16.14 16.14 0 000-25.4zm-320 0L186.4 273.5c-10.7-8.4-26.4-.8-26.4 12.7v451.5c0 13.5 15.7 21.1 26.4 12.7l287.4-225.8c4.1-3.2 6.2-8 6.2-12.7 0-4.6-2.1-9.4-6.2-12.6zM857.6 248h-51.2c-3.5 0-6.4 2.7-6.4 6v516c0 3.3 2.9 6 6.4 6h51.2c3.5 0 6.4-2.7 6.4-6V254c0-3.3-2.9-6-6.4-6z" />
                                            </svg>
                                            {urgency}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <Slider defaultValue={[props.urgency]} max={100} step={10} name="urgency" onValueChange={(value) => { handleEdit("urgency", value[0]) }} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            &bull;
                            <div className='flex'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className='flex gap-1 border-none h-6 text-xs'>
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="2em"
                                                width="2em"
                                                
                                            >
                                                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                                                <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
                                            </svg>  {time}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <Slider defaultValue={[props.time]} max={200} step={10} name="time" onValueChange={(value) => { handleEdit("time", value[0]) }} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            &bull;
                            <div className='flex gap-2 hover:bg-accent hover:text-accent-foreground px-2 rounded-md h-6 items-center'>
                                <div className='flex gap-2 border-none h-6 text-xs items-center'>

                                    <CalendarIcon className=" h-5 w-5" />
                                    <CalendarPop date={props.date} setDate={(newDate) => { handleEdit("date", newDate) }} />

                                </div>
                            </div>


                        </div>
                        <div className=''>
                            <div>
                                <div className='w-16 h-4 rounded-full border border-orange-500 text-orange-500 bg-white text-[10px] text-center font-semibold'>
                                    Action
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr className='w-full mt-1'>
            </hr>

        </div>
    )
}