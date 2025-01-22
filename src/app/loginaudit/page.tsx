import React from 'react'
import MasterLaout from '../dashboard/layout'
import LoginAudit from '@/components/loginAudit/LoginAudit'

const page = () => {
  return (
    <MasterLaout>
        <LoginAudit />
    </MasterLaout>
  )
}

export default page