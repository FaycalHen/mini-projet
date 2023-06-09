import React from 'react';
import "./Categories.scss";
import {Link} from "react-router-dom";


const Categories = () => {
  return (
    <div className='categories'>
        <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <button>
            <Link className="link" to="/products/1">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
          <button>
            <Link to="/products/1" className="link">
              Women
            </Link>
          </button>
        </div>
      </div>
        <div className="col">
            <div className="row">
                <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <button>
                            <Link className="link" to="/Products/6">New season</Link>
                </button>
            </div>
        </div>
        <div className="col col-l" >
            <div className="row">
                <div className="col">
                    <div className="row">
                        <img src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <button>
                            <Link className="link" to="/Products/1">Men</Link>
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <img src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <button>
                            <Link className="link" to="/Products/4">Accessoire</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                        <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <button>
                            <Link className="link" to="/Products/1">Sale</Link>
                        </button>
            </div>
        </div>
    </div>
  )
}

export default Categories;