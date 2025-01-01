import React from 'react'

import './Sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, toggleMenu }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`mobile_menu ${isOpen ? "active" : ''}`} onClick={toggleMenu}>
                <div className='mobile_menu_container' onClick={(e) => e.stopPropagation()}>
                    <div className='contact_logo_text'>
                        <span className='logo_text'><span className='deep_name_color'>DEEP</span> NET <span className='soft_name_color'>SOFT</span></span>
                        <span className='contact_card_text icon'>
                            <span className="fa-brands fa-facebook-f">
                            </span>
                            <span className="fa-brands fa-twitter icon"></span>
                            <span className="fa-brands fa-youtube icon"></span>
                            <span className="fa-brands fa-instagram icon"></span>
                        </span>
                    </div>
                    <nav>
                        <ul>
                            <li>HOME</li>
                            <li>MENU</li>
                            <li>MAKE A RESERVATION</li>
                            <li>CONTACT US</li>
                            <li><button className='Admin_panel_btn' onClick={() => navigate('/admin')}> ADMIN PANEL</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar