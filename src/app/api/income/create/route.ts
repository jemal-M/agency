import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient, type Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Content type must be multipart/form-data" }, { status: 400 })
  }

  try {
    const formData = await req.formData()

    console.log("Received form data:", Object.fromEntries(formData))

    // Helper function to parse date
    const parseDate = (dateStr: string | null): Date | null => {
      if (!dateStr) return null
      const cleanedDateStr = dateStr.replace(/^"|"$/g, '') // Remove surrounding quotes
      const date = new Date(cleanedDateStr)
      return isNaN(date.getTime()) ? null : date
    }
    

    // Parse form data
    const category = formData.get("category") as string
    const source = formData.get("source") as string
    const amount = formData.get("amount") as string
    const date = parseDate(formData.get("date") as string | null)

    // Validate required fields
    if (!category || !source || !amount || !date) {
   

      
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare income data
    const incomeData: Prisma.IncomeCreateInput = {
      category,
      source,
      amount,
      date,
    }

    console.log("Attempting to create income with data:", incomeData)

    // Create income in the database
    const newIncome = await prisma.income.create({
      data: incomeData,
    })

    console.log("Income created successfully:", newIncome)

    return NextResponse.json(
      {
        message: "Income created successfully",
        income: newIncome,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating income:", error)
    let errorMessage = "An unexpected error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

