import {React, useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useParams } from 'react-router-dom';
import "./AdminN.scss";
/*import { addCart } from '../../Redux/CartReducer';*/
import { useDispatch, useSelector } from 'react-redux';
/*import useFetch from '../../hooks/useFetch';*/
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '../../hooks/useFetch';
import { removenot, removenotif, removeuser, resetCart, resetLike } from '../../Redux/CartReducer';

const AdminN =()=>{
    const dispatch=useDispatch()
    const current= useSelector((state)=> state.cart.current);
    const title=useParams().title
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const products =useSelector((state)=>state.cart.products)
    /*const[open,setOpen]=useState(false)*/
    const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());

    return(
        <div className='navbarr'>
            <div className='wrapper'>
                <div className="left">
                    <div className="lefticon">    
                        <CheckroomIcon/>
                    </div>
                    <div className="item">    
                        <Link className="link"  to="/">F A C O store</Link>
                    </div>
                </div>
                
                <div className="right">
                    
                    <div className="icons">
                    <Stack direction="row" spacing={0}>
                    {current?.map((cur, index) => (  
                        <Avatar sx={{ bgcolor: deepOrange[290] }}
                        key={cur.id}
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >{name[index]}</Avatar>
                    ))}
                    </Stack>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><Link className="link" to="/Profile">Profile</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link className="link" to="/Modify">Modify</Link></MenuItem>
                        <MenuItem onClick={()=>{
                                handleClose() 
                                dispatch(removeuser())
                                dispatch(resetCart())
                                dispatch(removenotif())
                                }
                                }>
                            <Link className="link" to="/Login">Logout</Link>
                        </MenuItem>
                    </Menu>  
                    </div>
                </div>
            </div>     
        </div>
    );
}
export default AdminN;