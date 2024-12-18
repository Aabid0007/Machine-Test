import React from 'react'

import './Footer.css'
const Footer = () => {
  return (
    <footer>
        <div className="container">
            <div className="footer_section">
                <span className='footer_text_large_screen'>© 2024 Deepnetsoft Solutions. All rights reserved.</span>
                <span className='footer_text_mobile_screen'>© 2024 42 Bar & Grill. Developed by Deepnetsoft Solutions.</span>
                <div className='footer_text'>
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer