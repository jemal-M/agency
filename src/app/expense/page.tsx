"use client"
import type React from "react"
import { useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import type { Income } from "@/types/income"
 import MasterLaout from "../dashboard/layout"
import { fetchExpenseRequest } from "@/lib/reducers/expenseReducer"

const ExpensePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useAppDispatch()
  const expenses = useAppSelector((state) => state.expense.Expenses)
  const status = useAppSelector((state) => state.income.status)
  const totalPages = useAppSelector((state) => state.expense.totalPages)
  const totalCount = useAppSelector((state) => state.expense.totalCount)

  useEffect(() => {
    dispatch(fetchExpenseRequest({ currentPage }))
  }, [dispatch, currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <MasterLaout>

    <div className="container mx-auto px-4 py-3">
      <h1 className="text-l mb-2">Expense List</h1>
      <div className="flex mb-1">
        <Input
          type="text"
          placeholder="Search income..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm mr-2"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-end items-end mb-4">
        <Link href="/expense/create" className="bg-green-500 px-2 py-2 text-sm rounded-lg text-white">
          Add Expense
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Income Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses && expenses.length > 0 ? (
              expenses.map((income: Income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.id}</TableCell>
                  <TableCell>{income.category}</TableCell>
                  <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                  <TableCell>{income.amount}</TableCell>
                  <TableCell>{income.source}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  {status === "Loading" ? "Loading..." : "No income data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Income Entries</TableCell>
              <TableCell className="text-right">{totalCount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <Pagination>
          <PaginationContent className="space-x-3">
            <PaginationItem>
              <Button
                className="px-11"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                size="icon"
              >
                <PaginationPrevious className="h-4 w-4" />
              </Button>
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={`${currentPage === index + 1 ? "bg-green-500 text-white" : ""}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <Button
                className="px-11"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                size="icon"
              >
                <PaginationNext className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
    </MasterLaout>
  )
}

export default ExpensePage

