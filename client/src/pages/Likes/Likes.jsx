import React, { useEffect, useState } from 'react';
import "./Likes.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { removeLike} from "../../Redux/CartReducer";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const Likes = () => {
  const [all,setall] = useState([]);
  const [likes,setlikes] = useState([]);
  const [Data,setdata] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [err, setError] = useState(null);
  console.log(all)
  const navigate=useNavigate();
  const current = useSelector((state) => state.cart.current);
  const clientID = current[0].id;
  const filteredIDs = all
    .filter((item) => item.attributes.clients.data.some((client) => client.id === clientID))
    .map((item) => item.id);

  console.log(filteredIDs);
  const id = filteredIDs[0];
  console.log(id)
  const {data,loading,error} = useFetch(
    `/likes/${id}?populate=*`
);
  console.log(data)
  console.log(Data)
  
  const products = data?.attributes.products.data.map(product =>( 
    { 
      id:product.id,
      price: product.attributes.price,
      title: product.attributes.title,
    }
  ));
  console.log(products)
  const prod = Data.map(product =>(
    { 
      id:product.id,
      img: product.attributes.img,
      title: product.attributes.title,
      price: product.attributes.price,
      title: product.attributes.title,
    }
  ));
  console.log(prod)



  const display = prod.filter((item) => products.some((product) => product.id === item.id));
console.log(display);

const displayObject = display.reduce((acc, item, index) => {
  acc[index] = { id: item.id, attributes: item };
  return acc;
}, {});

console.log(displayObject);



  useEffect(() => {
    axios
      .get("http://localhost:1337/api/likes?populate=products,clients")
      .then(({ data }) => {
        setall(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
  }, []);
  useEffect(()=>{
    axios  
      .get(`http://localhost:1337/api/likes/${id}?populate=*`)
      .then(({ data }) => {
        setlikes(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
     
  }, []);
  useEffect(()=>{
    axios  
      .get(`http://localhost:1337/api/products?populate=*`)
      .then(({ data }) => {
        setdata(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
     
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="centerl">
      <h1>Products Liked</h1>
      {Object.values(displayObject).map((item) => (
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.img?.data?.attributes?.url} alt="" />
          <div className="details">
            <h1>{item.attributes.title}</h1>
            <p>{item.attributes.description?.substring(0, 100)}</p>
            <div className="price">{item.attributes.price}DA</div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={()=>{
              axios
              .put(`http://localhost:1337/api/likes/${id}`, {
                  data: {
                  products: {
                      disconnect: [item.id],
                  },
                  },
              })
              .then(() => {
                  setlikes(likes.filter(item => item.id !== id));
                  alert("supriminaha");
                  
                  window.location.reload(); // Refresh the page
              })
              .catch((error) => setError(error));}}
          />
          
        </div>
      ))}
      </div>
      <Footer/>
    </div>
  )
}

export default Likes