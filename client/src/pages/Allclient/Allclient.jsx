import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { removeuser } from '../../Redux/CartReducer';
import UserInfo from '../UserInfo/UserInfo';

const Allclient = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch=useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const clients = allClients.map(option =>( 
    { 
      id:option.id,
      email: option.attributes.email,
      password: option.attributes.password,
      username:option.attributes.username,
      fullName:option.attributes.fullName,
      phone:option.attributes.phone,
      admin:option.attributes.admin,
    }
  ));
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/clients")
      .then(({ data }) => {
        setAllClients(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));

  }, []);
  
  const handleDelete = (id) => {
    const select = clients.find(client => client.id === id );
    if(select.admin === true){alert("can't delete the admin")}
    else{
        axios.delete(`http://localhost:1337/api/clients/${id}`)
          .then(() => {
            setAllClients(allClients.filter((client) => client.id !== id));
            alert(`Client ${id} has been deleted`);
            navigate('/admin/Allclient')
          })
          .catch((error) => setError(error));
        };
  }
  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  const totalqnt = () => {
    let totalqnt = 0;
    products.forEach((item) => {
      totalqnt += item.quantity;
    });
    return totalqnt;
  };
  const totalProfit = () => {
    let totalP = 0;
    products.forEach((item) => {
      totalP += item.price-item.BuyP;
    });
    return totalP;
  };
  const article=()=>{
    let total=0;
    clients?.map((item)=>{
      total =total+1 ;
    });
    return total;
  };
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
          <h2>All Client</h2>
          <TableContainer component={Paper}>
            <Table className='table' sx={{ minWidth: 250,padding:120 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='title'>id</TableCell>
                  <TableCell className='title' align="left">User Name</TableCell>
                  <TableCell className='title' align="left">email&nbsp;</TableCell>
                  <TableCell className='title' align="left">phone&nbsp;</TableCell>
                  <TableCell className='title' align="left">Fullname&nbsp;</TableCell>
                  <TableCell className='title' align="left">Delete user&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => {
                      setSelectedUserId(row.id);
                      navigate(`/userInfo/${row.id}`);
                    }}
                  >
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.fullName}</TableCell>
                    <TableCell align="left">&nbsp;<DeleteIcon onClick={() => handleDelete(row.id)}/></TableCell>
                  </TableRow>
                ))}
                  <TableRow>
                  <TableCell>Total </TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left"></TableCell>
                  <TableCell className='title' align="left">{article()}&nbsp;Total Client(s)</TableCell>
                  </TableRow>
                </TableBody>    
              
            </Table>
          </TableContainer>
        
        </div>
        <div className="right">

        </div>
      </div>
      <AdFooter/>
    </div>
  )
}

export default Allclient