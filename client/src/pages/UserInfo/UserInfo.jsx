import React, { useEffect, useState } from 'react';
import './UserInfo.scss';
import axios from 'axios';
import Allclient from '../Allclient/Allclient';
import { useParams } from 'react-router-dom';
import AdminN from '../../Components/AdminNavbar/AdminN';
import AdFooter from '../../Components/AdFooter/AdFooter';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useFetch from '../../hooks/useFetch';

const UserInfo = () => {
  const userId= parseInt(useParams().id);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const {data,loading,errore} = useFetch(
    `/clients/${userId}?populate=products`
    );
  console.log(data)
  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/clients/${userId}`)
      .then(({ data }) => {
        setUserInfo(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));

  }, [userId]);

  if (error) {
    return <div className="error">An error occurred: {error.message}</div>;
  }

  if (!userInfo) {
    return <div className="loading">Loading...</div>;
  }/*
<ul>
        {userInfo.products.data.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} - Date: {order.attributes.Added}
          </li>
        ))}
      </ul>/*
      <div className="userInfo__content__item userInfo__content__products">
              <span className="userInfo__content__label">Products bought:</span>
              <ul className="userInfo__content__products__list">
                {userInfo.products.data.map((order) => (
                  <li key={order.id} className="userInfo__content__products__list__item">
                    Order ID: {order.id} - Date: {order.attributes.Added}
                  </li>
                ))}
              </ul>
            </div>*/


            /*<div className="userInfo">
          <h2 className="userInfo__title">User Info</h2>
          <div className="userInfo__content">
            <p className="userInfo__content__item">
              <span className="userInfo__content__label">Username:</span>
              {userInfo.attributes.username}
            </p>
            <p className="userInfo__content__item">
              <span className="userInfo__content__label">Email:</span>
              {userInfo.attributes.email}
            </p>
            <p className="userInfo__content__item">
              <span className="userInfo__content__label">Phone:</span>
              {userInfo.attributes.phone}
            </p>
            <p className="userInfo__content__item">
              <span className="userInfo__content__label">Full Name:</span>
              {userInfo.attributes.fullName}
            </p>
            
          </div>
        </div>*/
        return (
        
        <div><AdminN/>
        <div className="profile-container">
            <div className="wrap"> 
                <div className="leftheader">
                    <div className="iconh">    
                    <ArrowBackIcon/>
                    </div>
                    <div className="item">    
                    <Link className="link"  to="/Admin/Allclient">Back</Link>
                    </div>
                </div>
            </div>    
            <div className="profile-header">
              <div className="profile-info">
                  <h2> {userInfo.attributes.fullName} </h2>
              </div>
            </div>
            <div className="profile-body">
            <div className="profile-about">
                <h3>Account</h3>
                      <div className='infor'>
                        <div className="item">
                          <p>Email</p>
                          <FormControl  disabled variant="standard">
                            <Input  defaultValue={userInfo.attributes.email} />
                          </FormControl>
                        </div>
                        <div className="item">  
                          <p>Full UserName</p>
                          <FormControl disabled variant="standard">
                            <Input  defaultValue={userInfo.attributes.username} />
                          </FormControl>
                        </div> 
                        <div className="item">
                        <p>Full Name</p>
                          <FormControl disabled variant="standard">
                            <Input  defaultValue={userInfo.attributes.fullName} />
                          </FormControl>
                        </div>  
                        <div className="item">
                          <p>Phone Number</p>
                          <FormControl disabled variant="standard">
                            <Input defaultValue={userInfo.attributes.phone} />
                          </FormControl>
                        </div>
                      </div>
              </div>
              <div className="profile-purchases">
                <h3>Purchased Products</h3>
                {data?.attributes.products.data.map(product=>(
                  <div className="item">
                      <p>Title</p>
                        <FormControl disabled variant="standard">
                        <Input defaultValue={product.attributes.title} />
                        </FormControl>
                  </div>
                ))} 
              </div>
            </div>
        </div>
        <AdFooter/>
        </div>
      );
    };
    
    export default UserInfo;