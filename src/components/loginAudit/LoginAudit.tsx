"use client";

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Loader2 } from 'lucide-react';

interface Audit {
  id: string;
  email_or_phone: string;
  status: 'success' | 'failure';
  latitude: string;
  longitude: string;
  createdAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

const LoginAudit = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAudits = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/loginAudits', {
        params: { page, limit: pagination.limit, search: searchTerm },
      });
      setAudits(response.data.audits);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to fetch login audits.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudits();
  }, [searchTerm]);

  const handlePageChange = (newPage: number) => {
    fetchAudits(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-sans">Login Audits</h1>
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search by email or phone"
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
    
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email/Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Latitude</TableHead>
                  <TableHead>Longitude</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
              <TableBody>
                {audits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell>{audit.email_or_phone}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${
                        audit.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {audit.status}
                      </span>
                    </TableCell>
                    <TableCell>{audit.latitude}</TableCell>
                    <TableCell>{audit.longitude}</TableCell>
                    <TableCell>{new Date(audit.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
      )}

            </Table>
          </div>
          <Pagination>
            <PaginationContent className='space-x-3'>
              <PaginationItem>
                <Button className="px-11"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  variant="outline"
                  size="icon"
                >
                  <PaginationPrevious className="h-4 w-4" />
                </Button>
              </PaginationItem>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={pagination.currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <Button className="px-11"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  variant="outline"
                  size="icon"
                >
                  <PaginationNext className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
    </div>
  );
};

export default LoginAudit;

