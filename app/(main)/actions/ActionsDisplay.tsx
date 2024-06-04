
"use client"

import { ActionsContainer } from '@/components/ActionsContainer'
import React, { useEffect, useState } from 'react'
import FilterPane from './FilterPane'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
    actions: Action[]
    projects: Project[]
}

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
    history: boolean
}

type Project = {
    id: string;
    name: string;
}

export default function Page(props : Props) {

    const [actions, setActions] = useState<Action[]>([])
    

    const router = useRouter()
    const searchParams = useSearchParams()
    const pahtname = usePathname()

    const tagFilter = searchParams.get("tag")


    console.log("tagFilter")
    console.log(searchParams.get("tag"))


    useEffect(()=>{

            console.log(tagFilter)
            setActions(props.actions.filter(action => !tagFilter || action.tag === tagFilter ))

    },[props.actions, tagFilter])




    


    const actionsOfProject = (projectName: string, action: Action[]) => {

        const data = action.filter(action => action.project === projectName)

        return data
    }

    const displayActions = props.projects.map((project: Project) => {

        const actionsPerProject = actionsOfProject(project.name, actions)

        return (<ActionsContainer projectName={project.name} actions_prop={actionsPerProject} projects={props.projects} key={project.id} />)

    })

    return (

        <>
        {displayActions}
        </>


    )
}