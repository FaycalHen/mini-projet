import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../Redux/CartReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const current = useSelector((state) => state.cart.current);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
          {products.length===0
          ?<h6>your cart is empty ! try buying something first</h6>
          :products?.map((item) => (
            <div className="item" key={item.id}>
              <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
              <div className="details">
                <h1>{item.title}</h1>
                <p>{item.description?.substring(0, 100)}</p>
                <div className="price">
                  {item.quantity} x {item.price}DA
                </div>
                <div className="taille">
                  {item.tai} and 
                  {item.qt}
                </div>  
              </div>
              <DeleteOutlinedIcon
                className="delete"
                onClick={() => dispatch(removeItem({ id: item.id, tai: item.tai }))}
              />
            </div>
          ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>{totalPrice()}DA</span>
      </div>
          <button onClick={()=>{
              if (current.length === 0) {
                  navigate('/login');
                  alert("please log-in first !")
              }
              else {
                if(products.length === 0){
                  alert('please buy something first !')
                }
                else{
                navigate('/Payement')
                }
              }
          }}>PROCEED TO CHECKOUT</button>
        
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;