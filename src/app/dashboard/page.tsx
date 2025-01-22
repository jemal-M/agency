"use client"

import React, { useState } from "react"
import { Users, Plane } from 'lucide-react'
import { DateRange } from "react-day-picker"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { DateRangePicker } from "@/components/DateRangePicker"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import TicketData from "@/components/Dashbaord/TicketDashboard/TicketDashboard"

// New data for the partners' bar chart
const partnersData = [
  { partner: "Partner A", accepted: 150, paid: 120, unpaid: 30, sent: 200 },
  { partner: "Partner B", accepted: 200, paid: 180, unpaid: 20, sent: 250 },
  { partner: "Partner C", accepted: 100, paid: 80, unpaid: 20, sent: 150 },
  { partner: "Partner D", accepted: 180, paid: 150, unpaid: 30, sent: 220 },
  { partner: "Partner E", accepted: 120, paid: 100, unpaid: 20, sent: 180 },
  { partner: "Partner F", accepted: 120, paid: 100, unpaid: 20, sent: 180 },
  { partner: "Partner G", accepted: 120, paid: 100, unpaid: 20, sent: 180 },
  { partner: "Partner H", accepted: 120, paid: 100, unpaid: 20, sent: 180 },
  { partner: "Partner I", accepted: 120, paid: 100, unpaid: 20, sent: 180 },
]

export default function Page() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [hoveredBar, setHoveredBar] = React.useState<string | null>(null)

  return (
    <div className="mt-4 flex-col md:flex">
      <div className="flex-1 space-y-4">
        <div className="flex-col items-center justify-between space-y-2 md:flex md:flex-row">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker
              selectedRange={selectedRange}
              onChangeRange={setSelectedRange}
            />            <Button className="bg-green-800 hover:bg-green-500 text-white">Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                  <Users className="size-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,231</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Selected</CardTitle>
                  <Users className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Arrived</CardTitle>
                  <Plane className="size-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-red-500">Total Returned</CardTitle>
                  <Plane className="size-5 text-muted-foreground -rotate-180 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">573</div>
                </CardContent>
              </Card>
            </div>
            <TicketData />



          </TabsContent>

        </Tabs>
      </div>
      <Card className="w-full ">
  <CardHeader>
    <CardTitle>Partners Overview</CardTitle>
    <CardDescription>Candidate status across different partners</CardDescription>
  </CardHeader>
  <CardContent className="pl-3">
    <ChartContainer
      config={{
        accepted: {
          label: "Accepted",
          color: "hsl(var(--chart-1))",
        },
        paid: {
          label: "Paid",
          color: "hsl(var(--chart-2))",
        },
        unpaid: {
          label: "Unpaid",
          color: "hsl(var(--chart-3))",
        },
        sent: {
          label: "Sent",
          color: "hsl(var(--chart-4))",
        },
      }}
      className="h-[500px] w-full"
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={partnersData}
          className="w-full"
          barCategoryGap="20%" // Adjust spacing between groups of bars
          barGap={5} // Adjust spacing between individual bars within a group
        >
          <XAxis
            dataKey="partner"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {["accepted", "paid", "unpaid", "sent"].map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              barSize={30} // Adjust bar thickness
              radius={[8, 8, 0, 0]}
              fill={`hsl(var(--chart-${index + 1}))`}
              onMouseEnter={() => setHoveredBar(key)}
              onMouseLeave={() => setHoveredBar(null)}
              opacity={hoveredBar === null || hoveredBar === key ? 0.9 : 0.5}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>

    <div className="mt-6 flex justify-center flex-wrap gap-4">
      {["accepted", "paid", "unpaid", "sent"].map((key, index) => (
        <div
          key={key}
          className="flex cursor-pointer items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors"
          onMouseEnter={() => setHoveredBar(key)}
          onMouseLeave={() => setHoveredBar(null)}
          style={{
            backgroundColor: hoveredBar === key ? `hsl(var(--chart-${index + 1}))` : "transparent",
            color: hoveredBar === key ? "#fff" : "inherit",
          }}
        >
          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: `hsl(var(--chart-${index + 1}))`,
              opacity: hoveredBar === null || hoveredBar === key ? 1 : 0.5,
            }}
          ></div>
          <span className="text-sm font-medium">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

    </div>
  )
}

