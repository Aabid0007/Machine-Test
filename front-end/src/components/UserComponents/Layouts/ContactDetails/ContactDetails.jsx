import React from 'react'

import logoImg from '../../../../assets/Logo.png'
import './ContactDetails.css'
const ContactDetails = () => {
    return (
        <div className='contact_details'>
            <div className='container'>
                <div className="contacts_section">
                    <div className="contact_card">
                        <h6 className='contact_card_header'>Connect with Us</h6>
                        <div className='contact_text'>
                            <span className='contact_card_text'><span className="fa-solid fa-tty demo_icon"></span> +91 9567843340</span>
                            <span className='contact_card_text'><span className="fa-regular fa-envelope demo_icon"></span>info@deenetsoft.com</span>
                        </div>
                    </div>
                    <div className="contact_card text">
                        <span className='logo_img'>
                            <img src={logoImg} alt="" />
                        </span>
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
                    </div>
                    <div className="contact_card">
                        <span className='contact_card_header'>Find us</span>
                        <div className='contact_text'>
                            <span className='contact_card_text location_icon'><span className="fa-solid fa-location-dot demo_icon"></span> First floor, Geo infopark, Infopark EXPY, Kakkanad</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactDetails