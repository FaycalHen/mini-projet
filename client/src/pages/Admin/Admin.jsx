import React, { useEffect, useState } from 'react';
import "./Admin.scss";
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { padding } from '@mui/system';
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { tooltipClasses } from '@mui/material';


  
  
const Admin = () => {
  const products = useSelector((state) => state.cart.products);
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(null);
  const [histo,sethisto]= useState([]);
  const [hehe,sethe] = useState([]);
  const today = new Date().toISOString()
  const clients = allClients.map(option =>( 
    { 
      id:option.id,
      email: option.attributes.email,
      username:option.attributes.username,
      fullName:option.attributes.fullName,
      phone:option.attributes.phone,
    }
  ));
  const dash = histo.map(option =>( 
    { 
      id:option.id,
      userId:option.attributes.userId,
      added:option.attributes.added,
      recipe:option.attributes.recipe,
    }
  ));
  
  console.log(dash) 
  console.log(clients)
    useEffect(() => {
      axios
        .get("http://localhost:1337/api/clients")
        .then(({ data }) => {
          setAllClients(data.data);
          console.log(data.data);
        })
        .catch((error) => setError(error));

      axios  
        .get("http://localhost:1337/api/historiques")
        .then(({ data }) => {
          sethisto(data.data);
          console.log(data.data);
        })
        .catch((error) => setError(error));
    }, []);

  console.log(today)
  
  const hoho = [];
  const d = dash.filter((ele)=>ele.added.substring(0,10)=== today.substring(0,10))
  console.log(d)
  const total =()=>{
    let t =0 ;
    d.map((e)=>{
      t = t + parseInt(e.recipe);
    });
    return t;
  };  
  let ex;
  let e ;
  return (
    <div>
      <AdminN/>
      <div className='admin'>
        <div className="left">
          <h1>Menu</h1>
          <button><Link className='link' to="/Admin"> Dashboard </Link></button>
          <button><Link className='link' to="Analytics">Analytics </Link></button>
          <button><Link className='link' to="Allclient">All Clients </Link></button>
          <button><Link className='link' to="Allproducts">All Products available </Link></button>
          <button><Link className='link' to="Addproducts">Add Products </Link></button>
        </div>
        <div className="center">
          <h2>Dashboard</h2>
          <TableContainer component={Paper}>
          <Table className='table' sx={{ minWidth: 250,padding:120 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className='title'>id</TableCell>
                <TableCell className='title' align="left">Added</TableCell>
                <TableCell className='title' align="left">Name&nbsp;</TableCell>
                <TableCell className='title' align="left">E_mail&nbsp;</TableCell>
                <TableCell className='title' align="left">User-id&nbsp;</TableCell>
                <TableCell className='title' align="left">Recipe&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dash?.map((row) => ( 
                today,
                ex =  clients.find((client) =>client.id === row.userId),
                row.added.substring(0,10) === today.substring(0,10) 
                ?
                  ex 
                  ?
                  <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell align="left">{row.added.substring(0,10)}</TableCell>
                      <TableCell align="left">{ex.fullName}</TableCell>
                      <TableCell align="left">{ex.email}</TableCell>
                      <TableCell align="left">{row.userId}</TableCell>
                      <TableCell align="left">{row.recipe}</TableCell>
                    </TableRow>
                  : 
                  <span></span>
                :
                <span></span>
              ))}
            </TableBody>
            <TableHead>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className='title' align="left">{total()}</TableCell>
            </TableHead>
          </Table>
        </TableContainer>
        </div>
      </div>
      
    </div>
  )
}

export default Admin
