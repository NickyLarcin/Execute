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
import { orderBy } from "lodash";
import OrderPane from "./OrderPane";



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
  id: string
  name: string
}


export default async function Home({searchParams}) {


  const orderVariable = searchParams.order || "urgency"
  const tagCondition = searchParams.tag ? { tag: searchParams.tag } : {};


  const user = await currentUser()
  if (!user || !user.id) return (<div>Error Fetching User</div>)

  const actions = await db.actions.findMany({ where: { userId: user.id, history: false, ...tagCondition }, orderBy: { [orderVariable] : "desc" } })
  const projects = await db.projects.findMany()




  return (
    <div className="relative w-full flex flex-col lg:flex-row justify-center items-center lg:items-start">

      <div className="lg:max-w-[424px] max-w-[724px] flex-col w-full relative m-2 bg-zinc-50 flex lg:hidden ">
        <div className="lg:max-w-[424px] max-w-[724px] w-full h-full border rounded-md  ">
          <FilterPane></FilterPane>
        </div>

      </div>



      <div className=" lg:ml-12 max-w-[724px] flex flex-col w-full relative pt-8 pb-20  rounded-md m-2 p-4">
        <div className="flex w-full justify-between relative">
          <div className="flex flex-col ">
            <div className="font-semibold text-xl">Entries</div>
            <div className="font-base text-neutral-400">Consult your entries here</div>
          </div>

          <ActionForm project={""}>
            <div className="h-14 w-14 hover:bg-orange-200 transition text-2xl rounded-md flex justify-center items-center border border-orange-500 text-orange-500 ">+</div>
          </ActionForm>

        </div>
        <hr className="w-full my-5"></hr>

        <ActionsDisplay actions={actions} projects={projects} />

      </div>
      <div className="max-w-[424px] flex-col w-full relative mt-8 bg-zinc-50 lg:flex hidden ">
        <div className="max-w-[424px] w-full h-full fixed flex flex-col border rounded-md">
        <div className="max-w-[424px] w-full">
          <FilterPane></FilterPane>
        </div>
        <div className="max-w-[424px] w-full">
          <OrderPane></OrderPane>
        </div>
        </div>

      </div>

    </div>
  );
}
