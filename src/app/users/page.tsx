import React from "react";

import MasterLaout from "../dashboard/layout";
import Employees from "@/components/Employees/Employees";

const page = () => {
  return <MasterLaout>
    <Employees/>
    </MasterLaout>;
};

export default page;
