import React from 'react'
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link } from 'react-router-dom';
import axios from "axios";
import {  useCallback, useEffect, useState, useId } from "react";
import "./Addproducts.scss"; 
import { useDispatch } from 'react-redux';
import { addTonot } from '../../Redux/CartReducer';

const Checkbox = ({ title, isChecked, onAddCategory, onRemoveCategory }) => {
  const id = useId();
  return (
    
    <div className="form-group-checkbox">
      <label htmlFor={id}>{title}</label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={isChecked ? onRemoveCategory : onAddCategory}
        name="categories"
        id={id}
      />
    </div>
  );
};

const Addproducts = ()=>{
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const [subcats, setsubcats] = useState([]);
  const dispatch = useDispatch();
  

  const [modifiedData, setModifiedData] = useState({
    categories: [],
    subcats:[],
    description: "",
    title: "",
    price:"0",
    Added:"0",
    BuyP:"0",
    t_S:"0",
    t_M:"0",
    t_L:"0",
    t_XL:"0",
    type:"normal",
    isNew:false,
    Quantity:"0",
  });
  
  

  
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  console.log(modifiedData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios
      .post("http://localhost:1337/api/products", { data: modifiedData })
      .then((response) => {
        console.log(response);
        dispatch(addTonot({
          message:"our dear client we would like to inform you that we added a new product, check it out",
        }));
      })
      .catch((error) => {
        setError(error);
      });
  };
  /*
  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setModifiedData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    formData.append("files.image", modifiedData.img); // Add the image file to the form data
  
    await axios
      .post("http://localhost:1337/api/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(error);
      });
  };*/
  
  
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/categories")
      .then(({ data }) => {
        setAllCategories(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
    
      axios
      .get("http://localhost:1337/api/subcats")
      .then(({ data }) => {
        setsubcats(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
  
    }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }
/*
  
*/ 
  return (
    <div>
      <AdminN/>
      <div className="addproduct">
        <div className="add-left">
          <h1>Menu</h1>
          <button><Link className='link' to="/Admin"> Dashboard </Link></button>
          <button><Link className='link' to="/Admin/Analytics">Analytics </Link></button>
          <button><Link className='link' to="/Admin/Allclient">All Clients </Link></button>
          <button><Link className='link' to="/Admin/Allproducts">All Products available </Link></button>
          <button><Link className='link' to="/Admin/Addproducts">Add Products </Link></button>
        </div>
        <div className="addproduct-right">
          <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
              <div className="wrap">
                <div className="left">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required onChange={handleInputChange} value={modifiedData.title} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="BuyP">Buying Price</label>
                    <input type="text" id="BuyP" name="BuyP" required onChange={handleInputChange} value={modifiedData.BuyP}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="added">Added</label>
                    <input type="datetime-local" id="added" name="Added" required onChange={handleInputChange} value={modifiedData.Added}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="isNew">Type</label>
                    <select id="type" name="type" required onChange={handleInputChange} value={modifiedData.type}>
                      <option value="featured">featured</option>
                      <option value="normal">normal</option>
                      <option value="trending">trending</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_S">Quantity for Size S</label>
                    <input type="text" id="t_S" name="t_S"  onChange={handleInputChange} value={modifiedData.t_S} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_L">Quantity for Size L</label>
                    <input type="text" id="t_L" name="t_L"  onChange={handleInputChange} value={modifiedData.t_L}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Quantity">Quantity</label>
                    <input type="text" id="Quantity" name="Quantity" onChange={handleInputChange} value={modifiedData.Quantity}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cat">Select a category</label>
                    {allCategories.map(({ id, attributes }) => (
                      <Checkbox
                      id="cat"
                        key={id}
                        title={attributes.title}
                        isChecked={modifiedData.categories.includes(id)}
                        onAddCategory={() => {
                          const nextData = {
                            ...modifiedData,
                            categories: [...modifiedData.categories, id],
                          };
                          setModifiedData(nextData);
                        }}
                        onRemoveCategory={() => {
                          const nextData = {
                            ...modifiedData,
                            categories: modifiedData.categories.filter(
                              (catId) => catId !== id
                            ),
                          };
                          setModifiedData(nextData);
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="right">
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" name="description" required onChange={handleInputChange} value={modifiedData.description}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" required onChange={handleInputChange} value={modifiedData.price}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="isNew">Is New</label>
                    <select id="isNew" name="isNew" required value={modifiedData.isNew} onChange={handleInputChange}>
                      <option value="true">is New</option>
                      <option value="false">Not New</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_M">Quantity for Size M</label>
                    <input type="text" id="t_M" name="t_M" required onChange={handleInputChange} value={modifiedData.t_M}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_XL">Quantity for Size XL</label>
                    <input type="text" id="t_XL" name="t_XL" required onChange={handleInputChange} value={modifiedData.t_XL}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor='sub'>select a sub-category</label>
                    {subcats.map(({ id, attributes }) => (
                      <Checkbox
                        id="sub"
                        key={id}
                        title={attributes.title}
                        isChecked={modifiedData.subcats.includes(id)}
                        onAddCategory={() => {
                          const nextData = {
                            ...modifiedData,
                            subcats: [...modifiedData.subcats, id],
                          };
                          setModifiedData(nextData);
                        }}
                        onRemoveCategory={() => {
                          const nextData = {
                            ...modifiedData,
                            subcats: modifiedData.subcats.filter(
                              (catId) => catId !== id
                            ),
                          };
                          setModifiedData(nextData);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
        </div>
      </div>
      <AdFooter/>
    </div>
  )
}

export default Addproducts