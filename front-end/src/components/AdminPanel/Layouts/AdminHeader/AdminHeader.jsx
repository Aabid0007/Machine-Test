import React from 'react'

import './AdminHeader.css'
import { useNavigate } from 'react-router-dom'
const AdminHeader = () => {
    const navigate = useNavigate()
  return (
    <header>
        <div className="container">
            <div className="admin_header_section">
               <button className='Admin_panel_btn' onClick={() => navigate('/')}> USER PAGE </button>
            </div>
        </div>
    </header>
  )
}

export default AdminHeader