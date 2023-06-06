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
import { removenot, removenotif, removeuser, resetCart, resetLike } from '../../Redux/CartReducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useFetch from '../../hooks/useFetch';

const Profile = () => {
  const products = useSelector((state) => state.cart.products);
  const like = useSelector((state) => state.cart.like);
  const current= useSelector((state)=> state.cart.current);
  const dispatch=useDispatch();
  const userId=current[0].id;
  const {data,loading,errore} = useFetch(
    `/clients/${userId}?populate=products`
    );
  const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());
  const pr = useSelector((state) => state.cart.notif);
  const p = useSelector((state) => state.cart.ungoingnotif);
  console.log(pr)
  const op=pr.map(op=>(
  {
    notif:op.message,
  }
  ))

  const o=p.map(op=>(
    {
      notif:op.message,
    }
    ))

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
          {data?.attributes.products.data.map(product=>(
                  <div className="item">
                      <p>Title</p>
                        <FormControl disabled variant="standard">
                        <Input defaultValue={product.attributes.title} />
                        </FormControl>
                  </div>
                ))} 
          </ul>
        </div>
        <div className="profile-notif">
          <h3>Notifications</h3>
            <ul>
              {
              op.length !== 0 || o.length !== 0 
              ? (
                <div>
                  {op?.map((message) => (
                    <div key={message.id}>
                      <h5>{message.notif}</h5>
                    </div>
                  ))}
                  {o?.map((message) => (
                      <div key={message.id}>
                        <h5>{message.notif}</h5>
                      </div>
                    ))}
                  </div>
                  )
              : <h5>no notifications for the moment </h5>
              }
            </ul>
        </div>
      </div>
      <div className="profile-footer">
        <button><Link className="link" to="/Login" onClick={()=>{
            dispatch(removeuser())
            dispatch(resetCart())
            dispatch(removenotif())
        }}>Logout</Link></button>
      </div>
  </div>
  <AdFooter/>
  </div>

  )
}

export default Profile