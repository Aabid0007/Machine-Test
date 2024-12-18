import React from 'react'

import Header from '../../Common/Header/Header'
import MainBanner from '../MainBanner/MainBanner'
import UserCategory from '../UserCategory/UserCategory'
import UserCategoryWiseProductList from '../UserCategoryWiseProductList/UserCategoryWiseProductList'
import ContactDetails from '../ContactDetails/ContactDetails'
import Footer from '../Footer/Footer'

import '../../Common/UserMediaQuery.css'
const UserMainLayouts = () => {
    return (
        <div className='MainPage'>
            <Header />
            <>
                <MainBanner />
                <UserCategory />
                <UserCategoryWiseProductList />
                <ContactDetails />
                <Footer />
            </>
        </div>
    )
}

export default UserMainLayouts