"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCandidateRequest, reregisterCandidateState } from "@/lib/reducers/candidateReducer";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Loader2 } from 'lucide-react';

const statusColors: Record<string, string> = {
  Hired: "bg-green-500",
  "In Review": "bg-yellow-500",
  Rejected: "bg-red-500",
};

const Candidate = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const candidates = useAppSelector(
    (state) => state.candidate.candidates || []
  );
  const status = useAppSelector(
    (state) => state.candidate.status
  );
  const totalPages = useAppSelector(
    (state) => state.candidate.totalPages
  );
  const totalCount = useAppSelector(
    (state) => state.candidate.totalCount
  );

  const [currentPage, setPage] = useState(1);

  const checkboxRef = useRef<HTMLButtonElement>(null); // Ref for the checkbox
  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Updates the state, but this is asynchronous
    dispatch(fetchCandidateRequest({
      currentPage: newPage, // This still uses the previous state value
    }));
  };

  useEffect(() => {
    dispatch(fetchCandidateRequest({
      currentPage: currentPage
    }));


  }, [dispatch, currentPage]);

  const filteredCandidates = candidates.filter((candidate) =>
    [candidate.firstName, candidate.lastName, candidate.passportNumber]
      .filter(Boolean)
      .some((field) =>
        field!.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const navigateToCandidateDetails = (id: string) => {
    router.push(`/candidates/${id}`);
  };

  const handleRowSelection = (checked: boolean, id: string) => {
    setSelectedRows((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(
      checked ? filteredCandidates.map((candidate) => candidate.id || "") : []
    );
  };

  const isAllSelected = selectedRows.length === filteredCandidates.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < filteredCandidates.length;


  return (
    <div className="mt-11 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          onClick={() => router.push("/candidates/register")}
          className="bg-green-800 hover:bg-green-500 text-white"
        >
          Add Candidate
        </Button>
      </div>

      <Table>
        <TableCaption>A list of candidate applications.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                ref={checkboxRef} // Attach the ref to the checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                aria-label="Select all candidates"
              />
            </TableHead>
            <TableHead>Passport Number</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Application Status</TableHead>
            <TableHead>COC</TableHead>
            <TableHead>Medical</TableHead>
            <TableHead>Embassy Status</TableHead>
            <TableHead>LMIS Status</TableHead>
            <TableHead>Visa Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        {status == "Loading" && (
          <TableRow>
            <TableRow>
              <Loader2 />
            </TableRow>
          </TableRow>

        )}
        {status == 'Success' ? (
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigateToCandidateDetails(candidate.id || "")}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedRows.includes(candidate.id || "")}
                    onCheckedChange={(checked) =>
                      handleRowSelection(checked as boolean, candidate.id || "")
                    }
                    aria-label={`Select ${candidate.firstName} ${candidate.lastName}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {candidate.passportNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {candidate.firstName} {candidate.secondName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${statusColors[candidate.address || ""] || "bg-gray-500"
                      } text-white`}
                  >
                    {candidate.address || ""}
                  </Badge>
                </TableCell>
                <TableCell>{candidate.hasCoc || ""}</TableCell>
                <TableCell className="text-right">
                  {candidate.medical ? `${candidate.medical}` : ""}
                </TableCell>
                <TableCell className="text-right">
                  {candidate.embassy ? `${candidate.embassy}` : ""}
                </TableCell>
                <TableCell className="text-right">
                  {candidate.lmis ? `${candidate.lmis}` : ""}
                </TableCell>
                <TableCell className="text-right">
                  {candidate.lmis ? `${candidate.lmis}` : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : <div>No data</div>}
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
  );
};

export default Candidate;
