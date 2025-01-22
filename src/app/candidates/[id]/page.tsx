import React from "react";

import MasterLaout from "@/app/dashboard/layout";
import CandidateDetail from "@/components/Candidates/[id]/CandidateDetail";

const page = () => {
  return (
    <MasterLaout>
      <CandidateDetail />
    </MasterLaout>
  );
};

export default page;
