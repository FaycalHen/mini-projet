import React from 'react';
import { Link } from "react-router-dom";
import "./Contact.scss";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const Contact = () => {
  const handleJoinUsClick = () => {
    const emailAddress = 'faycalhenaoui1@gmail.com';
    const subject = 'Joining request';
    const body = 'I would like to join.';
    
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className='contact'>
      <div className='wrapper'>
        <span>CONTACT US:</span>
        <div className='mail'>
          <input type="text" placeholder='ENTER YOUR E-MAIL' />
          <button onClick={handleJoinUsClick}>JOIN US</button>
        </div>
        <div className='icons'>
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <GoogleIcon/>
                </div>
      </div>
    </div>
  );
};

export default Contact;
