import React from "react";

import MasterLaout from "@/app/dashboard/layout";
import RegisterCandidate from "@/components/Candidates/RegisterCandidate";

const page = () => {
  return (
    <MasterLaout>
      <RegisterCandidate />
    </MasterLaout>
  );
};

export default page;
