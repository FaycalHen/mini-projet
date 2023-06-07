import React, { useCallback, useState } from 'react';
import "./Profile.scss";
import AdFooter from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { addTonot, removenot, removenotif, removeuser, resetCart, resetLike } from '../../Redux/CartReducer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';


const Profile = () => {
  const products = useSelector((state) => state.cart.products);
  const like = useSelector((state) => state.cart.like);
  const current = useSelector((state) => state.cart.current);
  const dispatch = useDispatch();
  const userId = current[0].id;
  const { data, loading, errore } = useFetch(`/historiques?populate=products`);
  const [notif, setnotif] = useState({
    message: "",
  });
  const isAdmin = current[0].admin;
  const name = current?.map((cur) => cur.fullName.split(" ").map((n) => n[0]).join("").toUpperCase());
  const pr = useSelector((state) => state.cart.notif);
  const p = useSelector((state) => state.cart.ungoingnotif);

  const op = pr.map(op => ({
    notif: op.message,
  }));

  const o = p.map(op => ({
    notif: op.message,
    date: op.time,
  }));
  
// Filter the data based on userId
  const filteredData = data?.filter((item) => item.attributes.userId === userId);
  console.log(filteredData)

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setnotif({ message: value });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const notification = {
      message: notif.message,
      time: currentTime,
    };

    if (notification.message === "") {
      alert("Please enter a notification first");
    } else {
      dispatch(addTonot(notification));
      setnotif({ message: '' });
    }

  }, [dispatch, notif.message]);

  return (
    <div>
      <AdminN />
      <div className="profile-container">
        <div className="wrapp">
          <div className="leftheader">
            <div className="iconh">
              <ArrowBackIcon />
            </div>
            <div className="item">
              <Link className="link" to="/">Back</Link>
            </div>
          </div>
        </div>
        <div className="profile-header">
          <div className="profile-image">
            {current?.map((cur, index) => (
              <Avatar
                key={cur.id}
                sx={{ bgcolor: deepOrange[290], width: 40, height: 40, fontSize: 20 }}
                id="demo-positioned-button"
              >{name[index]}</Avatar>
            ))}
          </div>
          <div className="profile-info">
            {current?.map((cur) => (
              <h2 key={cur.id}>{cur.fullName}</h2>
            ))}
          </div>
        </div>
        <div className="profile-body">
          <div className="profile-content">
            <div className="profile-left">
            <div className="profile-about">
              <h3>Account</h3>
              {current?.map((cur) => (
                <div className="item" key={cur.id}>
                  <div className="item-label">
                    <p>Email</p>
                  </div>
                  <div className="item-value">
                    <FormControl disabled variant="standard">
                      <Input defaultValue={cur.email} />
                    </FormControl>
                  </div>
                </div>
              ))}
              {current?.map((cur) => (
                <div className="item" key={cur.id}>
                  <div className="item-label">
                    <p>Full UserName</p>
                  </div>
                  <div className="item-value">
                    <FormControl disabled variant="standard">
                      <Input defaultValue={cur.username} />
                    </FormControl>
                  </div>
                </div>
              ))}
              {current?.map((cur) => (
                <div className="item" key={cur.id}>
                  <div className="item-label">
                    <p>Password</p>
                  </div>
                  <div className="item-value">
                    <FormControl disabled variant="standard">
                      <Input defaultValue={cur.password} />
                    </FormControl>
                  </div>
                </div>
              ))}
              {current?.map((cur) => (
                <div className="item" key={cur.id}>
                  <div className="item-label">
                    <p>Full Name</p>
                  </div>
                  <div className="item-value">
                    <FormControl disabled variant="standard">
                      <Input defaultValue={cur.fullName} />
                    </FormControl>
                  </div>
                </div>
              ))}
              {current?.map((cur) => (
                <div className="item" key={cur.id}>
                  <div className="item-label">
                    <p>Phone Number</p>
                  </div>
                  <div className="item-value">
                    <FormControl disabled variant="standard">
                      <Input defaultValue={cur.phone} />
                    </FormControl>
                  </div>
                </div>
              ))}
            </div>

              <div className="profile-purchases">
                <h3>Purchased Products</h3>
                <ul>
                {filteredData?.map((product) => (
                  <div className="item-value" key={product.id}>
                    <p>Commande {product.id}</p>
                    <FormControl disabled variant="standard">
                      <Input defaultValue={product.attributes.userId} />
                      <Input defaultValue={product.attributes.recipe} />
                      <Input defaultValue={product.attributes.added} />
                    </FormControl>
                  </div>
                ))}

                </ul>
              </div>
            </div>

              <div className="divider"></div> {/* Add the divider here */}
              <div className="profile-right">
              <div className="profile-notif">
                <h3>Notifications</h3>
                <ul>
                  {op.length !== 0 || o.length !== 0 ? (
                    <div>
                      {op?.map((message) => (
                        <div key={message.id} className="notification">
                          <h4>{message.notif}</h4>
                          <h5>Time: {message.date}</h5>
                        </div>
                      ))}
                      {o?.map((message) => (
                        <div key={message.id} className="notification">
                          <h4>{message.notif}</h4>
                          <h5>Time: {message.date}   ::from Admin</h5>
                        </div>
                      ))}
                    </div>
                  ) : <h3>No notifications at the moment</h3>}
                </ul>
              </div>

              </div>
                {isAdmin && (
                  <div className="item">
                    <label htmlFor="ajout">Ajouter un notification</label>
                    <input type="text" id="ajout" required name="message" onChange={handleInputChange} value={notif.message} />
                    <button className='button-op' onClick={handleSubmit}>Ajouter</button>
                  </div>
                )}
            </div>    
        </div>
          <div className="profile-footer">
            <button className='button-op'>
              <Link className="link" to="/Login" onClick={() => {
                dispatch(removeuser());
                dispatch(resetCart());
                dispatch(removenotif());
              }}>Logout</Link>
            </button>
          </div>
      </div>
      <AdFooter />
    </div>
  );
}

export default Profile;
