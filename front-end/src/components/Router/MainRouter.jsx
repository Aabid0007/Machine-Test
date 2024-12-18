import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserMainLayouts from '../UserComponents/Layouts/UserMainLayouts/UserMainLayouts';
import { AdminLayouts } from '../AdminPanel/Layouts/AdminLayouts';
import AdminCategoryWiseProducts from '../AdminPanel/Layouts/AdminCategoryWiseProduct/AdminCategoryWiseProducts';
const MainRouter = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<UserMainLayouts />}/>
        <Route path='/admin' element={<AdminLayouts />}/>
        <Route path='/admin/category/product' element={<AdminCategoryWiseProducts />}/>
    </Routes>
    </>
  )
}

export default MainRouter