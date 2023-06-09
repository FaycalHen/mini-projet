import {React} from 'react';
import  "./Footer.scss";
const Footer =()=>{
    return(
        <div className='footer'>
            <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <span>Women</span>
                    <span>Men</span>
                    <span>Shoes</span>
                    <span>Accessories</span>
                    <span>New Arrivals</span>
                </div>
                <div className="item">
                <h1>Links</h1>
                    <span>FAQ</span>
                    <span>Pages</span>
                    <span>Stores</span>
                    <span>Compare</span>
                    <span>Cookies</span>
                </div>
                <div className="item">
                    <h1>About</h1>
                    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis quisquam qui sed, veritatis facilis vero accusantium, mollitia ea laudantium nemo similique nobis voluptates numquam consequuntur dolorum dolores libero! Odit, porro?</span>
                </div>
                <div className="item">
                    <h1>Contact</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore quis exercitationem eveniet? Qui maiores sequi expedita, rem corrupti magnam illo facilis ea ipsum temporibus dolores. Sunt impedit dolorem facere!</span>
                    
                </div>
            </div>
            <div className="bottom">
                <div className="right">
                    <img src="/img/payment.png" alt="" />
                </div>
                <div className="left">
                    <span className="logo">F A C O store</span>
                    <span className="Copyright">Copyright 2023,Mini Projet</span>
                </div>
            </div>
        </div>
    ) 
}
export default Footer;