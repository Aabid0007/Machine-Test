import React, { useState } from 'react'


import Logo from '../../../../assets/Logo.png'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
const Header = () => {
    const [openMenu, setOpenMenu ] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    const navigate = useNavigate();
    return (
        <header>
            <div className='container'>
            <Sidebar isOpen={openMenu} toggleMenu={toggleMenu} />
                <div className='Main_Heading'>
                    <div className='Header_section'>
                        <div className='Logo'>
                            <div className='Logo_image'>
                                <img src={Logo} alt="" />
                            </div>
                            <div className='Logo_heading'>
                                <span className='deepNet'><span className='deep_name_color'>DEEP</span> NET </span>
                                <span className='soft_name_color'>SOFT</span>
                            </div>
                        </div>
                        <nav>
                          <ul>
                          <li>HOME</li>
                            <li>MENU</li>
                            <li>MAKE A RESERVATION</li>
                            <li>CONTACT US</li>
                            <li><button className='Admin_panel_btn' onClick={() => navigate('/admin')}> ADMIN PANEl</button></li>
                          </ul>
                        </nav>
                        <button className='hamburger' onClick={toggleMenu}>
                            <span className="material-symbols-outlined" >
                                {openMenu ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header