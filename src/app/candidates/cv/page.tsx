
"use client"
import MasterLaout from "@/app/dashboard/layout";
import { CandidateCard } from "@/components/Candidates/cv";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCandidateRequest } from "@/lib/reducers/candidateReducer";
import { useEffect, useState } from "react";

 
export default function CandidatesPage() {
  const totalPages = useAppSelector(
    (state) => state.candidate.totalPages
  );
    const candidates = useAppSelector(
      (state) => state.candidate.candidates || []
    );
  const totalCount = useAppSelector(
    (state) => state.candidate.totalCount
  );
  const [currentPage, setPage] = useState(1);
    const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchCandidateRequest({
        currentPage: currentPage
      }));
  
  
    }, [dispatch, currentPage]);
  return (
    <MasterLaout>
      <div className="container mx-auto py-10 ">
        <h1 className="text-xl font-bold mb-8">Candidate CVs</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </MasterLaout>
  );
}
