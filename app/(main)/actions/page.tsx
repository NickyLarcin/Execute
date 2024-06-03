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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Action } from "@/components/Action";
import { ActionForm } from "@/components/ActionForm";
import { db } from "@/lib/db";
import { colorsHr, getTailwindRedColor } from "@/lib/utils";
import { revalidateTag } from "next/cache";
import { ActionsContainer } from "@/components/ActionsContainer";
import { currentUser } from "@clerk/nextjs/server";
import FilterPane from "./FilterPane";
import ActionsDisplay from "./ActionsDisplay";



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
};
type Project = {
  id : string
  name : string
}


export default async function Home() {

  const user = await currentUser()
  if ( !user || !user.id ) return (<div>Error Fetching User</div>)

  const actions = await db.actions.findMany({ where : { userId : user.id}})
  const projects = await db.projects.findMany()

  

  
  return (
    <div className="relative w-full flex justify-center">

      
      
    
    <div className="max-w-[624px] flex flex-col w-full relative pt-10 pb-20">
      <div className="flex w-full justify-between relative">
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">Actions</div>
            <div className="font-base text-neutral-400">Consult your actions here</div>
          </div>
          
          <ActionForm
            children = {(<div className="h-14 w-14 hover:bg-orange-200 transition text-2xl rounded-md flex justify-center items-center border border-orange-500 text-orange-500 ">+</div>)}
            project = {""}
            />
          
        </div>
        <hr className="w-full my-5"></hr>

        <ActionsDisplay actions={actions} projects={projects} />

      <div className="fixed top-32 right-[15%]">
        
        
          

          
         
           


         
        
      </div>

      
    </div>
    
    </div>
  );
}
