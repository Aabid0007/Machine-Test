import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import ProductList from './ProductList/ProductList'

const AdminCategoryWiseProducts = () => {


    return (
        <div className="AdminPage">
          
            <AdminHeader />
            <>
                <ProductList />
            </>
        </div>
    )
}

export default AdminCategoryWiseProducts