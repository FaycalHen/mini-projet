import {React, useEffect, useState} from 'react'; 
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import "./Navbar.scss";
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { height, sizeHeight } from '@mui/system';
import { colors, createTheme } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { removenotif, removeuser, resetCart, resetLike } from '../../Redux/CartReducer';
import Notification from '../Notification/Notification';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LoginIcon from '@mui/icons-material/Login';


const Navbar =()=>{
    const [isAdmin, setAdmin] = useState (null)
    const [isUser, setUser] = useState (null)
    const current= useSelector((state)=> state.cart.current);
    const notif= useSelector((state)=> state.cart.notif);
    useEffect(() => {
        if (current.length === 1 && current[0].admin === true) {
          console.log('Admin is true');
          setAdmin(true);
        } else {
          console.log('Admin is false');
        }
      }, [current]);
    useEffect(() => {
    if (current.length === 1 ) {
        console.log('User is loged in ');
    } else {
        setUser(true);
        console.log('User is not loged in');
    }
    }, [current]);
    const dispatch=useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(null);
    const [options,setOption] = useState([]);
    const formattedOptions = options.map(option =>( 
        { label: option.attributes.title, id:option.id}
    ));
    const [value, setValue] = useState(formattedOptions);
    const [inputValue, setInputValue] = useState(''); 
    const products =useSelector((state)=>state.cart.products)
    const[openn,setOpen]=useState(false)
    const[ope,setOpe]=useState(false)
    const navigate=useNavigate();
    useEffect(() => {
        axios
          .get("http://localhost:1337/api/products")
          .then(({ data }) => {
            setOption(data.data);
            console.log(data.data);
          })
          .catch((error) => setError(error));
      
        }, []);
      if (error) {
        // Print errors if any
        return <div>An error occured: {error.message}</div>;
      }
    console.log(value)
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());

    return(
        <div className='navbar'>
            <div className='wrapper'>
           <div className="item">
                        <div className="logo"> <CheckroomIcon sx={{ fontSize: 35 }}/> </div>
                        <div className="item">
                    <Stack direction="row" spacing={0}>
                    {current?.map((cur, index) => (
                        <Avatar sx={{ bgcolor: deepOrange[290] ,width: 35, height: 35, fontSize:20}}
                        fontSize="large"
                        key={cur.id}
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >{name[index]}
                        </Avatar>
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
                        <MenuItem onClick={handleClose}><Link className="link" to="/Modify">Modify profile</Link></MenuItem>
                        <MenuItem onClick={()=>{
                                handleClose() 
                                dispatch(removeuser())
                                dispatch(resetCart())
                                dispatch(removenotif())
                                }
                                }>
                            <Link className="link" to="/Login">Logout</Link>
                        </MenuItem></Menu>
                    </div>
                    </div>  
                <div className="left">
                    
                    <div className="item">
                        <Link className="link" to="/Products/1">Women</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/Products/2">Men</Link>
                    </div>
                    
                    <div className="item">
                        <Link className="link" to="/Products/4">Accessories</Link>
                    </div>
                </div>
                <div className="center">
                    <Link className="link"  to="/">F A C O store</Link>
                </div>
                <div className="right">
                    
                    <br />
                    <Autocomplete
                    size="small"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    
                    id="controllable-states-demo"
                    options={formattedOptions} // use the formattedOptions array
                    sx={{ width: 250 ,backgroundSize: 10}}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                    />
                    
                    
                    <div className="icons">
                        <Link className='link' to={`/product/${value.id}`}><SearchIcon sx={{ fontSize: 25 }}/></Link>
                        <div className="item">
                            <FavoriteIcon className='likeicon' sx={{ fontSize: 25 }}
                                onClick={()=>{
                                if (current.length === 0) {
                                    navigate('/login');
                                    alert("please log-in first")
                                }
                                else {
                                    navigate('/Likes')
                                }
                            }}/>
                        </div>    
                        <div className="carticon" onClick={()=>setOpen(!openn)}>
                            <LocalMallIcon sx={{ fontSize: 25 }}/>
                            <span>{products.length}</span>    
                        </div>
                        <div className="notificon" onClick={()=>setOpe(!ope)}>
                        <NotificationsActiveIcon sx={{ fontSize: 25 }}/>
                        <span>{notif.length}</span>    
                        </div>
                        {isAdmin && (
                        <div className="item">
                            <Link className="link" to="/admin">
                            <PersonIcon sx={{ fontSize: 25 }}/>
                            </Link>
                        </div>
                        )}
                        {isUser && (
                            <div className="login">
                                <Link className="link" to="/Login">
                                <LoginIcon sx={{ fontSize: 25 }}/>
                                </Link>
                            </div>
                            )}
                    </div>
                    
                </div>
            </div>
           {openn && <Cart/>}
           {ope && <Notification/>}
        </div>
    );
}
export default Navbar;