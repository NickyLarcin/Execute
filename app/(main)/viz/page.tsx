'use client'

import React, { useEffect } from "react";
import { db } from "@/lib/db";
import { Card, EventProps } from "@tremor/react";
import { ScatterChart } from "@tremor/react"
import { Skeleton } from "@/components/ui/skeleton"
import { Item } from "@radix-ui/react-select";


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



export default function Page() {

  const [actions, setActions] = React.useState<Action[]>([])
  const [loading, setLoading] = React.useState(true);
  const [projectList, setProjectList] = React.useState<string[]>([])


  useEffect(() => {

    console.log("hi3")
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getActions");
        const result = await response.json();
        const data : Action[] = result.data;

        const projectList = data.map(item => {
          return item.project

        }).filter((value, index, self) => self.indexOf(value) === index)

        setProjectList(projectList)

        const updatedData = data.map(item => {
          return {
            ...item,
            size: item.urgency + item.time,
            urgency : (1+(Math.random()-0.5)*0.1)*item.urgency,
            time : (1+(Math.random()-0.5)*0.1)*item.time,
            projectX : ((Math.random()-0.5)*0.3)+projectList.indexOf(item.project)+1
          };
        });

        

        console.log(projectList)
        
        setActions(updatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = React.useState<EventProps>(null);





  if (loading) return <div className="w-screen flex justify-center items-center "><Skeleton className="mx-10 mb-10 mt-10 p-10"></Skeleton></div>


  
    type CustomTooltipTypeScatter = {
      payload: any;
      active: boolean | undefined;
      label: any;
    };
  

  const customTooltip = (props: CustomTooltipTypeScatter) => {
    const { payload, active, label } = props;
    if (!active || !payload) return null;
    return (
      <div className="w-48 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${payload[0]?.color}-500 rounded`}
          />
          <div className="w-full">
            <p className="mb-2 font-medium text-tremor-content-emphasis">
              {label}
            </p>
            {payload.map((payloadItem: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-6"
              >
                <span className="text-tremor-content">{payloadItem.name}</span>
                <span className="font-medium tabular-nums text-tremor-content-emphasis">
                  {Math.round(payloadItem.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }











  return (
    <div className="w-screen flex justify-center items-center ">


      <Card className="mx-10 mb-10 mt-10 p-10  ">
        <p className="text-lgdark:text-dark-tremor-content-strong font-semibold text-xl text-orange-500">Tasks Overview</p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content leading-6">Vizualize your actions and select focus actions </p>
        <ScatterChart
          className="-ml-2 mt-6 h-80"
          yAxisWidth={40}
          data={actions}
          category="name"
          x="projectX"
          y="urgency"
          size="size"
          showOpacity={true}
          intervalType={"preserveStartEnd"}
          showGridLines = {true}
          enableLegendSlider
          showLegend={false}
          customTooltip={customTooltip}
          maxXValue={4}
          maxYValue={100}
          valueFormatter={{
            x: (time) => `${projectList[(Math.round(time))-1]}`,
            y: (urgency) => `${urgency}`,
            size: (size) =>
              `${(size / 60).toFixed(1)}hours`,
          }}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </div>

  );
}