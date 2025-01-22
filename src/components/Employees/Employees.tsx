"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { User } from '@/types/user'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchUserRequest } from '@/lib/reducers/userReducer'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
// Updated Employee interface with `role`


// Updated employee data with roles


const EmployeesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const dispatch = useAppDispatch();
  const employees: User[] = useAppSelector((state) => state.userData.users);
  const status = useAppSelector((state) => state.userData.status);
   const [currentPage,setPage]=useState(1);
    const totalPages = useAppSelector(
      (state) => state.userData.totalPages
    );
      const totalCount = useAppSelector(
        (state) => state.userData.totalCount
      );
  useEffect(() => {
    dispatch(fetchUserRequest({
      currentPage:currentPage

    }))
  }, [dispatch])
  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handlePageChange = (newPage: number) => {
     setPage(newPage); // Updates the state, but this is asynchronous
     dispatch(fetchUserRequest({
       currentPage: newPage, // This still uses the previous state value
     }));
   };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-3">
      <h1 className="text-l mb-2">Employee List</h1>
      <div className="flex mb-1">
        <Input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-end items-end">
        <Link href='/users/create' className='bg-green-500 px-2 py-2 text-sm rounded-lg text-white'>
          Add Employee
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.firstName} {'  '} {employee.lastName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  {employee.startDate ? new Date(employee.startDate).toDateString() : ""}
                </TableCell>

                <TableCell>{employee.role}</TableCell>
                <TableCell className="text-right">${employee.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TableCell colSpan={9}>Total Candidates</TableCell>
            <TableCell className="text-right">
              {totalCount}
            </TableCell>
          </TableRow>
        </TableFooter>
        </Table>
         <Pagination>
              <PaginationContent className='space-x-3'>
                <PaginationItem>
                  <Button className="px-11"
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
                      className={`${currentPage === index + 1 ? 'bg-green-500 text-white' : ''
                        }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <Button className="px-11"
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
  )
}

export default EmployeesTable
