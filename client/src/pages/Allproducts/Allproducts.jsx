import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { padding } from '@mui/system';
import useFetch from '../../hooks/useFetch';
import { TableFooter } from '@mui/material';



const Allproducts = () => {
  
  const navigate=useNavigate();
  const {data,loading,error}=useFetch(
    `/products?populate=*`
  );
  



  const article=()=>{
    let total=0;
    data?.map((item)=>{
      total =total+1 ;
    });
    return total;
  };
  
  console.log(data);
  return (
    <div>
      <AdminN/>
      <div className='admin'>
        <div className="left">
          <h1>Menu</h1>
          <button><Link className='link' to="/Admin"> Dashboard </Link></button>
          <button><Link className='link' to="/Admin/Analytics">Analytics </Link></button>
          <button><Link className='link' to="/Admin/Allclient">All Clients </Link></button>
          <button><Link className='link' to="/Admin/Allproducts">All Products available </Link></button>
          <button><Link className='link' to="/Admin/Addproducts">Add Products </Link></button>
        </div>
        <div className="center">
          <h2>All Products Availlable</h2>
          <TableContainer component={Paper}>
            <Table className='table' sx={{ minWidth: 250,padding:120 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='title'>id</TableCell>
                  <TableCell className='title' align="left">Title</TableCell>
                  <TableCell className='title' align="left">Price&nbsp;</TableCell>
                  <TableCell className='title' align="left">Quantity&nbsp;</TableCell>
                  <TableCell className='title' align="left">Added&nbsp;</TableCell>
                  <TableCell className='title' align="left">Profit&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => {
                      navigate(`/ProductInfo/${row.id}`);
                    }}
                  >
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell align="left">{row.attributes.title}</TableCell>
                    <TableCell align="left">{row.attributes.price}</TableCell>
                    <TableCell align="left">{(parseInt(row.attributes.t_S) + parseInt(row.attributes.t_M) + parseInt(row.attributes.t_L) + parseInt(row.attributes.t_XL) )|| parseInt(row.attributes.Quantity)}</TableCell>
                    <TableCell align="left">{row.attributes.Added}</TableCell>
                    <TableCell align="left">{row.attributes.price - row.attributes.BuyP}</TableCell>
                  </TableRow>
                ))}
                  <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left">{article()}&nbsp;Total Article(s)</TableCell>
                  </TableRow>
                </TableBody>    
              
            </Table>
          </TableContainer>
        
        </div>
        <div className="right">

        </div>
      </div>
    </div>
  )
}

export default Allproducts