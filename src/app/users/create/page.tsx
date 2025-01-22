import MasterLaout from '@/app/dashboard/layout'
import EmployeeCreate from '@/components/Employees/AddEmployee'
import React from 'react'

const page = () => {
  return (
    <MasterLaout>
        <EmployeeCreate />
    </MasterLaout>
  )
}

export default page