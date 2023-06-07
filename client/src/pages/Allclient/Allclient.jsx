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
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // Track confirmation pop-up state
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Track user ID to delete
  const navigate = useNavigate();
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
    const select = clients.find(client => client.id === id);
    if (select.admin === true) {
      alert("Can't delete the admin");
    } else {
      setUserIdToDelete(id); // Set the user ID to delete
      setShowConfirmation(true); // Show the confirmation pop-up
    }
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:1337/api/clients/${userIdToDelete}`)
      .then(() => {
        setAllClients(allClients.filter((client) => client.id !== userIdToDelete));
        alert(`Client ${userIdToDelete} has been deleted`);
        navigate('/admin/Allclient');
      })
      .catch((error) => setError(error));

    // Reset state after deleting the user
    setShowConfirmation(false);
    setUserIdToDelete(null);
  };

  const cancelDelete = () => {
    // Reset state without deleting the user
    setShowConfirmation(false);
    setUserIdToDelete(null);
  };
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
                    <TableCell align="left">&nbsp;<DeleteIcon onClick={(e) => {
                      e.stopPropagation(); // Prevent event propagation
                      handleDelete(row.id);
                    }}/></TableCell>
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
        {/* Confirmation pop-up */}
        {showConfirmation && (
            <div className="confirmation">
              <div className="confirmation-content">
                <h3>Are you sure you want to delete this user?</h3>
                <div className="confirmation-buttons">
                  <button onClick={confirmDelete}>Yes</button>
                  <button onClick={cancelDelete}>No</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right">

        </div>
      </div>
    </div>
  )
}

export default Allclient