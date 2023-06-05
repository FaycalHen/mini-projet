import React from 'react'
import "./Profile.scss"
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { removeuser, resetCart, resetLike } from '../../Redux/CartReducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Profile = () => {
  const products = useSelector((state) => state.cart.products);
  const like = useSelector((state) => state.cart.like);
  const current= useSelector((state)=> state.cart.current);
  const dispatch=useDispatch();

  const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());

  console.log(current)
  return (
    <div><AdminN/>
  <div className="profile-container">
    <div className="wrap"> 
        <div className="leftheader">
            <div className="iconh">    
              <ArrowBackIcon/>
            </div>
            <div className="item">    
              <Link className="link"  to="/">Back</Link>
            </div>
        </div>
    </div>    
      <div className="profile-header">
        <div className="profile-image">
          {current?.map((cur, index) => (
            <Avatar 
              key={cur.id}
              sx={{ bgcolor: deepOrange[290] ,width: 40, height: 40, fontSize:20}}
              id="demo-positioned-button"
              >{name[index]}
            </Avatar>
          ))}
        </div>
        <div className="profile-info">
          {current?.map((cur) => (
            <h2 key={cur.id} > {cur.fullName} </h2>
          ))}
        </div>
      </div>
      <div className="profile-body">
      <div className="profile-about">
          <h3>Account</h3>
            {current?.map((cur) => (
                <div className='infor'>
                  <div className="item">
                    <p>Email</p>
                    <FormControl  disabled variant="standard">
                      <Input key={cur.id} defaultValue={cur.email} />
                    </FormControl>
                  </div>
                  <div className="item">  
                    <p>Full UserName</p>
                    <FormControl disabled variant="standard">
                      <Input key={cur.id} defaultValue={cur.username} />
                    </FormControl>
                  </div> 
                  <div className="item">
                  <p>Password</p>
                    <FormControl disabled variant="standard">
                      <Input key={cur.id} defaultValue={cur.password} />
                    </FormControl>
                  </div>
                  <div className="item">
                  <p>Full Name</p>
                    <FormControl disabled variant="standard">
                      <Input key={cur.id} defaultValue={cur.fullName} />
                    </FormControl>
                  </div>  
                  <div className="item">
                    <p>Phone Number</p>
                    <FormControl disabled variant="standard">
                      <Input key={cur.id} defaultValue={cur.phone} />
                    </FormControl>
                  </div>
                </div>
            ))}    
        </div>
        <div className="profile-purchases">
          <h3>Purchased Products</h3>
          <ul>
            {products?.map((product) => (
              <li key={product.id}>{product.title}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;price:&nbsp;&nbsp;{product.price}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;quantity:&nbsp;&nbsp;{product.quantity}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="profile-footer">
        <button><Link className="link" to="/Login" onClick={()=>{
            dispatch(removeuser())
            dispatch(resetCart())
            dispatch(resetLike())
        }}>Logout</Link></button>
      </div>
  </div>
  <AdFooter/>
  </div>

  )
}

export default Profile