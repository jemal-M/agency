"use client"

import React from "react"
import { Line, AreaChart, ResponsiveContainer, XAxis, YAxis, Area } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

// Dummy data for the line chart (representing a time series)
const ticketData = [
  { date: "2023-01", paid: 150, unpaid: 100 },
  { date: "2023-02", paid: 180, unpaid: 120 },
  { date: "2023-03", paid: 200, unpaid: 110 },
  { date: "2023-04", paid: 220, unpaid: 130 },
  { date: "2023-05", paid: 240, unpaid: 125 },
  { date: "2023-06", paid: 260, unpaid: 140 },
  { date: "2023-07", paid: 280, unpaid: 135 },
  { date: "2023-08", paid: 265, unpaid: 135 },
]

// Dummy data for the payments list
const paymentsData = [
  { id: 1, name: "Alice Johnson", amount: 500, date: "2023-08-15" },
  { id: 2, name: "Bob Smith", amount: 750, date: "2023-08-14" },
  { id: 3, name: "Charlie Brown", amount: 1000, date: "2023-08-13" },
  { id: 4, name: "Diana Ross", amount: 250, date: "2023-08-12" },
  { id: 5, name: "Ethan Hunt", amount: 1500, date: "2023-08-11" },
  { id: 6, name: "Fiona Apple", amount: 800, date: "2023-08-10" },
]

export default function TicketData() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Ticket Overview</CardTitle>
          <CardDescription>Paid vs Unpaid tickets over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              paid: {
                label: "Paid Tickets",
                color: "#32a852",
              },
              unpaid: {
                label: "Unpaid Tickets",
                color: "#a83832",
              },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ticketData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.split("-")[1]}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="paid"
                  stroke="#32a852"
                  fillOpacity={0.2}
                  fill="#32a852"
                />
                <Area
                  type="monotone"
                  dataKey="unpaid"
                  stroke="#a83832"
                  fillOpacity={0.2}
                  fill="#a83832"
                />
                <Line
                  type="monotone"
                  dataKey="paid"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="basis"
                  dataKey="unpaid"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest ticket payments</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-4">
            {paymentsData.map((payment) => (
              <div key={payment.id} className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${payment.name}`} alt={payment.name} />
                  <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{payment.name}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
                <div className="font-medium">${payment.amount}</div>
              </div>
            ))}
            <div className="flex justify-end items-end ">
              
            <Link href="/" className="text-purple-950">
            View All
            </Link>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

