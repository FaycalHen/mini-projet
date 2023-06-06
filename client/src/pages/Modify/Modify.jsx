import React, { useCallback, useEffect, useState } from 'react'
import "./Modify.scss"
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
import { removenotif, removeuser, resetCart, resetLike } from '../../Redux/CartReducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Modify = () => {
  const products = useSelector((state) => state.cart.products);
  const like = useSelector((state) => state.cart.like);
  const current= useSelector((state)=> state.cart.current);
  const dispatch=useDispatch();
  const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());

  const [error, setError] = useState(null);
  const [clientinfo, setinfo]=useState([]);
  const [modifiedData, setModifiedData] = useState({
    email:"",
    password:"",
    username: "",
    fullName: "",
    phone:"",
    isAdmin:"",

  }); 
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(modifiedData)
    axios
      .put(`http://localhost:1337/api/clients/${current[0].id}`, modifiedData)
      .then((response) => {
        console.log(response);
        alert(`your profile has been modified`);
      })
      .catch((error) => {
        setError(error);
      });
  };

  
  console.log(current)
  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/clients/${current[0].id}`)
      .then(({ data }) => {
        setinfo(data.data);
        const cur = data.data; // Assuming the fetched data is the user's data
        setModifiedData({
          email: cur.attributes.email,
          password: cur.attributes.password,
          username: cur.attributes.username,
          fullName: cur.attributes.fullName,
          phone: cur.attributes.phone,
          isAdmin:cur.attributes.isAdmin,
        });
      })
      .catch((error) => setError(error));
  }, []);
  console.log(modifiedData)
  return (
    <div><AdminN/>
  <div className="modify-container">
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
                <form key={cur.id} onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">E_mail</label>
                      <input key={cur.id} type="email" id="email" name="email" onChange={handleInputChange} value={modifiedData.email}  />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">User name</label>
                      <input key={cur.id} type="text" id="username" name="username"  onChange={handleInputChange} value={modifiedData.username}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input key={cur.id} type="text" id="fullName" name="fullName" onChange={handleInputChange} value={modifiedData.fullName}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input key={cur.id} type="text" id="password" name="password" onChange={handleInputChange} value={modifiedData.password} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input key={cur.id} type="text" id="phone" name="phone" onChange={handleInputChange} value={modifiedData.phone} />
                    </div>             
                <button type="submit">Submit</button>
              </form>
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
            dispatch(removenotif())
        }}>Logout</Link></button>
      </div>
  </div>
  <AdFooter/>
  </div>

  )
}

export default Modify