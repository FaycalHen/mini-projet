import React, { useCallback, useEffect, useState } from 'react';
import "./Login.scss";
import axios from "axios";
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addcurrent } from '../../Redux/CartReducer';
import useFetch from '../../hooks/useFetch';


const Login = () => {
  
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(null);
  const [exist,setexist]= useState(false);
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
  console.log(clients)
  
    useEffect(() => {
      axios
        .get("http://localhost:1337/api/clients")
        .then(({ data }) => {
          setAllClients(data.data);
          console.log(data.data);
        })
        .catch((error) => setError(error));
    }, []);
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const handleLogin = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const existingClient = clients.find(client => client.email === email && client.password === password);
      if (existingClient) {
        const username=existingClient.username;
        const fullName= existingClient.fullName;
        const phone =existingClient.phone;
        const id=existingClient.id;
        const admin=existingClient.admin;
        setexist(true)
        dispatch(addcurrent({
          email,
          password,
          username,
          fullName,
          phone,
          id,
          admin,
        }))  
        navigate('/');
      }
      else {
        alert("Wrong email/password ")
        setexist(false)
      }
      console.log(existingClient)
    }
    console.log(exist)
    console.log(clients)
  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required/>
        </div>

        <Link className='link' to="/Sign">Don't have an account yet ? Sign-in</Link>
        <button type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default Login;