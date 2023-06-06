import React from 'react'
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import {  useCallback, useEffect, useState, useId } from "react";
import "./ProductInfo.scss"; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addTonot, removenot, resetCart } from '../../Redux/CartReducer';

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


const ProductInfo = ()=>{
    const prodId= parseInt(useParams().id);
    const [prodInfo, setProdInfo] = useState(null);
    const [error, setError] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [subcats, setsubcats] = useState([]);
    const [select, setselected] = useState([]);
    const [allproducts, setAllproducts] = useState([]);
    const dispatch = useDispatch();

    const products = allproducts.map(option =>( 
      { 
        id:option.id,
        name:option.attributes.name,
    }
    ));
    
    const [modifiedData, setModifiedData] = useState({
        categories: [],
        subcats:[],
        description: "",
        title: "",
        price:"",
        Added:"",
        BuyP:"",
        t_S:"",
        t_M:"",
        t_L:"",
        t_XL:"",
        type:"",
        isNew:"",
    });

    const handleInputChange = useCallback(({ target: { name, value } }) => {
        setModifiedData((prevData) => ({ ...prevData, [name]: value }));
      }, []);
      const handleDelete = (prodId) => {
        const selected =products.find(client => client.id === prodId ); 
            axios.delete(`http://localhost:1337/api/products/${prodId}`)
              .then(() => {
                setAllproducts(allproducts.filter((client) => client.id !== prodId));
                alert(`product ${prodId} has been deleted`);
              })
              .catch((error) => setError(error));
            
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        await axios
          .put(`http://localhost:1337/api/products/${prodId}`, { data: modifiedData })
          .then((response) => {
            console.log(response);
            dispatch(addTonot({
              message:"Dear client some changes happend to product :"+prodId+", check it out",
            }));
            alert(`product ${prodId} has been modified`);

          })
          .catch((error) => {
            setError(error);
          });
      };  
    useEffect(() => {
      axios
        .get(`http://localhost:1337/api/products/${prodId}&populate=*`)
        .then(({ data }) => {
          setProdInfo(data.data);
          const cur = data.data; // Assuming the fetched data is the user's data
          setModifiedData({
            categories:[],
            subcats:[],
            description: cur.attributes.description,
            title: cur.attributes.title,
            price:cur.attributes.price,
            Added:cur.attributes.Added,
            BuyP:cur.attributes.BuyP,
            t_S:cur.attributes.t_S,
            t_M:cur.attributes.t_M,
            t_L:cur.attributes.t_L,
            t_XL:cur.attributes.t_XL,
            type:cur.attributes.type,
            isNew:cur.attributes.isNew,
          })
          console.log(data.data);
        })
        .catch((error) => setError(error));

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

        axios
      .get("http://localhost:1337/api/products")
      .then(({ data }) => {
        setAllproducts(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));

    }, [prodId],[]);
  
    if (error) {
      return <div className="error">An error occurred: {error.message}</div>;
    }
  
    if (!prodInfo) {
      return <div className="loading">Loading...</div>;
    }

    
    
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
          <h1>Product N°{prodId} ({prodInfo.attributes.title})</h1>
            <form onSubmit={handleSubmit}>
              <div className="wrap">
                <div className="left">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" onChange={handleInputChange} value={modifiedData.title} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="BuyP">Buying Price</label>
                    <input type="text" id="BuyP" name="BuyP"  onChange={handleInputChange} value={modifiedData.BuyP}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="added">Added</label>
                    <input type="datetime-local" id="added" name="Added" onChange={handleInputChange} value={modifiedData.Added}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="isNew">Type</label>
                    <select id="type" name="type" onChange={handleInputChange} value={modifiedData.type}>
                      <option value="featured">featured</option>
                      <option value="normal">normal</option>
                      <option value="trending">trending</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_S">Quantity for Size S</label>
                    <input type="text" id="t_S" name="t_S" onChange={handleInputChange} value={modifiedData.t_S} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="t_L">Quantity for Size L</label>
                    <input type="text" id="t_L" name="t_L" onChange={handleInputChange} value={modifiedData.t_L}/>
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
                    <input type="text" id="description" defaultValue={prodInfo.attributes.description || "hehehe"} name="description" onChange={handleInputChange}  value={modifiedData.description}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" defaultValue={prodInfo.attributes.price} onChange={handleInputChange} value={modifiedData.price}/>
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
                    <label htmlFor="Quantity">Quantity(for Accessories)</label>
                    <input type="text" id="Quantity" name="Quantity" onChange={handleInputChange} value={modifiedData.Quantity}/>
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
              <DeleteIcon onClick={() => handleDelete(prodId)}/>
            </form>
        </div>
      </div>
      <AdFooter/>
    </div>
  )
}

export default ProductInfo