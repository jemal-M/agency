import React from "react";

import Candidates from "@/components/Candidates/Candidates";

import MasterLaout from "../dashboard/layout";

const page = () => {
  return (
    <MasterLaout>
      <Candidates />
    </MasterLaout>
  );
};

export default page;
