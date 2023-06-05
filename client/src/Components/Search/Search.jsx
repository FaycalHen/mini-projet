import React from 'react'
import React, { useState } from "react";


const Search = () => {
    return (
        <div className="cart">
          <h1>Products in your cart</h1>
          {products?.map((item) => (
            <div className="item" key={item.id}>
              <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
              <div className="details">
                <h1>{item.title}</h1>
                <p>{item.description?.substring(0, 100)}</p>
                <div className="price">
                  {item.quantity} x {item.price}DA
                </div>
              </div>
              <DeleteOutlinedIcon
                className="delete"
                onClick={() => dispatch(removeItem(item.id))}
              />
            </div>
          ))}
          <div className="total">
            <span>SUBTOTAL</span>
            <span>{totalPrice()}DA</span>
          </div>
          <Link className="link" to="/Payement">
            <button >PROCEED TO CHECKOUT</button>
          </Link>  
          <span className="reset" onClick={() => dispatch(resetCart())}>
            Reset Cart
          </span>
        </div>
      );
  };
  
  export default Search;
