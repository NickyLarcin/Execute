'use server'

import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Action } from "@/components/Action";
import { ActionForm } from "@/components/ActionForm";
import { db } from "@/lib/db";
import { colorsHr, getTailwindRedColor } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { ActionsContainer } from "@/components/ActionsContainer";
import { currentUser } from "@clerk/nextjs/server";



type Action = {
  id: string;
  name: string;
  description: string;
  project: string;
  urgency: string;
  date: Date;
  time: string;
  people: string;
  isFocused: boolean;
  ischecked: boolean;
};


export default async function Home() {

  const user = await currentUser()
  if ( !user || !user.id ) return (<div>Error Fetching User</div>)

  
  const projects = await db.projects.findMany()


 


  const actionsOfProject = async (project: string, userId : string) => {
    const data = await db.actions.findMany({
      where: { project: project,
        userId : user.id
       }
    })

    return data
  }



  const  displayActions = projects.map( async project=> {

      const actions = await actionsOfProject(project.name, user.id)

      return (<ActionsContainer projectName={project.name} actions_prop={actions} projects={projects} key={project.id}/>)

    })


  
  return (
    <div>
    <Sheet>
    <div className="max-w-[624px] flex flex-col w-full relative pt-10 pb-20">
      <div className="flex w-full justify-between ">
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">Actions</div>
            <div className="font-base text-neutral-400">Consult your actions here</div>
          </div>
          <SheetTrigger>
            <div className="h-14 w-14 hover:bg-orange-200 transition text-2xl rounded-md flex justify-center items-center border border-orange-500 text-orange-500 ">
              +
            </div>
          </SheetTrigger>
        </div>
        <hr className="w-full my-5"></hr>

     {displayActions}

      <div className="fixed top-32 right-[15%]">
        
        
          

          
          <SheetContent>
            <ActionForm />


          </SheetContent>
        
      </div>
    </div>
    </Sheet>
    </div>
  );
}
