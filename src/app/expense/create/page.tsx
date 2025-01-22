"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { registerIncomeRequest } from "@/lib/reducers/incomereducer"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import MasterLaout from "@/app/dashboard/layout"
import { registerExpenseRequest } from "@/lib/reducers/expenseReducer"

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  source: z.string().min(2, {
    message: "Source must be at least 2 characters.",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  date: z.date({
    required_error: "A date of income is required.",
  }),
})

export default function CreateIncomePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ExpenseCreated=useAppSelector((state)=>state.expense.ExpenseCreated)
  const { toast } = useToast()
  const dispatch = useAppDispatch()
useEffect(()=>{
if(ExpenseCreated!=null){
    toast({
        title: "Expense Created",
        description: "Your new Expense entry has been successfully added.",
      })
      router.push("/expense")
}
 
},[dispatch,ExpenseCreated])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      source: "",
      amount: "",
      date: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      dispatch(registerExpenseRequest(values));
    } catch (error) {
        toast({
            title: "Income Coud not be Created",
            description: "Your new income entry has not  been successfully added.",
            variant: "destructive",
          })
      console.error("Error creating income:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was a problem creating your income entry.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <MasterLaout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Expense Entry</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Salary, Freelance" {...field} />
                </FormControl>
                <FormDescription>Enter the category of your income.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Employer name, Client name" {...field} />
                </FormControl>
                <FormDescription>Enter the source of your income.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormDescription>Enter the amount of income.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Income</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select the date when you received this income.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Income Entry"}
          </Button>
        </form>
      </Form>
    </div>
    </MasterLaout>
  )
}

