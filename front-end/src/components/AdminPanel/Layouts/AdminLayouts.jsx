import React from 'react'
import AdminHeader from './AdminHeader/AdminHeader'
import AdminCategory from './AdminCategory/AdminCategory'


export const AdminLayouts = () => {
    return (
        <div className='AdminPage'>
           
            <AdminHeader />
            <>
            <AdminCategory />
            </>
        </div>
    )
}
