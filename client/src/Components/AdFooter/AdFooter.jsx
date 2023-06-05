import {React} from 'react';
import  "./AdFooter.scss";
const AdFooter =()=>{
    return(
        <div className='footer'>
           
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
export default AdFooter;