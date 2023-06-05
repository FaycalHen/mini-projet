import React from 'react';
import "./Contact.scss";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import {Link} from "react-router-dom";

const Contact = () => {
  return (
    <div className='contact'>
        <div className='wrapper'>
            <span>CONTACT US:</span>
            <div className='mail'>
                <input type="text" placeholder='ENTER YOUR E-MAIL' />
                <button><Link className="link" to="/">JOIN US</Link></button>
            </div>
            <div className='icons'>
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <GoogleIcon/>
                </div>
        </div>
    </div>
  )
}

export default Contact;