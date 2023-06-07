import React, { useCallback, useEffect, useState } from 'react';
import "./Modify.scss";
import AdFooter from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Modify = () => {
  const products = useSelector((state) => state.cart.products);
  const current = useSelector((state) => state.cart.current);
  const dispatch = useDispatch();
  const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());

  const [error, setError] = useState(null);
  const [clientinfo, setinfo] = useState([]);
  console.log(current)
  const [modifiedData, setModifiedData] = useState({
    email: current[0].email,
    password: current[0].password,
    username: current[0].username,
    fullName: current[0].fullName,
    phone: current[0].phone,
    admin: null,
    historiques:[],
    notification:[],
    products:[],
    likes:[],
  });
  
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(modifiedData);
    axios
      .put(`http://localhost:1337/api/clients/${current[0].id}`, modifiedData)
      .then((response) => {
        console.log(response);
        alert('Your profile has been modified');
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/clients/${current[0].id}`)
      .then(({ data }) => {
        setinfo(data.data);
      })
      .catch((error) => setError(error));
  }, []);

  return (
    <div>
      <AdminN />
      <div className="modify-container">
        <div className="modify-wrap">
          <div className="modify-leftheader">
            <div className="modify-iconh">
              <ArrowBackIcon />
            </div>
            <div className="modify-item">
              <Link className="modify-link" to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="modify-profile-header">
          <div className="modify-profile-image">
            {current?.map((cur, index) => (
              <Avatar
                key={cur.id}
                sx={{ bgcolor: deepOrange[500], width: 40, height: 40, fontSize: 20 }}
                id="demo-positioned-button"
              >
                {name[index]}
              </Avatar>
            ))}
          </div>
          <div className="modify-profile-info">
            {current?.map((cur) => (
              <h2 key={cur.id}>{cur.fullName}</h2>
            ))}
          </div>
        </div>
        <div className="modify-profile-body">
          <div className="modify-profile-about">
            <h3>Account</h3>
            {current?.map((cur) => (
              <form key={cur.id} onSubmit={handleSubmit}>
                <div className="modify-form-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" onChange={handleInputChange} value={modifiedData.email} />
                </div>
                <div className="modify-form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" onChange={handleInputChange} value={modifiedData.username} />
                </div>
                <div className="modify-form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" onChange={handleInputChange} value={modifiedData.fullName} />
                </div>
                <div className="modify-form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" onChange={handleInputChange} value={modifiedData.password} />
                </div>
                <div className="modify-form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" name="phone" onChange={handleInputChange} value={modifiedData.phone} />
                </div>
                <button type="submit" className="modify-submit-button">Submit</button>
              </form>
            ))}
          </div>
          
        </div>
        
      </div>
      <AdFooter />
    </div>
  );
}

export default Modify;
