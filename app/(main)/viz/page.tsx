'use client'

import React, { useEffect } from "react";
import { db } from "@/lib/db";
import { Card, EventProps } from "@tremor/react";
import { ScatterChart } from "@tremor/react"
import { Skeleton } from "@/components/ui/skeleton"






export default function Page() {

  const [actions, setActions] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getActions");
        const result = await response.json();
        const data = result.data;

        setActions(data);
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

  return (
    <div className="w-screen flex justify-center items-center ">


      <Card className="mx-10 mb-10 mt-10 p-10  ">
        <p className="text-lgdark:text-dark-tremor-content-strong font-semibold text-xl text-orange-500">Tasks Overview</p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content leading-6">Vizualize your actions and select focus actions </p>
        <ScatterChart
          className="-ml-2 mt-6 h-80"
          yAxisWidth={40}
          data={actions}
          category="project"
          x="time"
          y="urgency"
          size="time"
          showOpacity={true}
          intervalType={"preserveStartEnd"}
          showGridLines = {true}
          enableLegendSlider
          showLegend={false}
          maxXValue={200}
          maxYValue={100}
          valueFormatter={{
            x: (time) => `${(time).toFixed(1)}min`,
            y: (urgency) => `${urgency}`,
            size: (time) =>
              `${(time / 60).toFixed(1)}hours`,
          }}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
    </div>

  );
}