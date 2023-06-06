import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import List from '../../Components/List/List';
import Navbar from '../../Components/Navbar/Navbar';
import useFetch from '../../hooks/useFetch';
import "./Products.scss";
import axios from 'axios';




const Products =()=>{
    const catId= parseInt(useParams().id);
    const [maxPrice,setmaxPrice]= useState(50000);
    const [sort,setSort]=useState("asc");
    const [selected,setSelected]=useState([]);

    const {data,loading,error} = useFetch(
        `/subcats?[filters][categories][id][$eq]=${catId}`
        );

        const [allCat, setAllCat] = useState([]);
        const [er, setEr] = useState(null);
        const catname = allCat.map(option =>( 
            { 
              id:option.id,
              title: option.attributes.title,
            }
          ));
        const name = catname.find(client => client.id === catId);
        console.log(name)  
        useEffect(() => {
            axios
              .get("http://localhost:1337/api/categories")
              .then(({ data }) => {
                setAllCat(data.data);
                console.log(data.data);
              })
              .catch((er) => setEr(er));
      
          }, []);    
          if (er) {
            // Print errors if any
            return <div>An error occured: {error.message}</div>;
          }




    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        
            setSelected(
              isChecked
            ? [...selected, value]
            : selected.filter((item) => item !== value)
        );
    };
    const images=[
        "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3811977/pexels-photo-3811977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10330423/pexels-photo-10330423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/15862184/pexels-photo-15862184.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/15862184/pexels-photo-15862184.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600", 
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600", 
    ];
    console.log(images)
    return(
        <div >
            <Navbar/>
            <div className="Products">
            <div className="left">
                <div className="filterItem">
                    <h2>Product Categories</h2>
                    {data?.map((item) => (
                        <div className="inputItem" key={item.id}>
                        <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
                        <label htmlFor={item.id}>{item.attributes.title}</label>
                    </div>
                    ))}
                </div>
                <div className="filterItem">
                    <h2>Filter by price</h2>
                    <div className="input">
                        <span>0</span>
                        <input type="range" min={1000} max={50000} onChange={(e)=>setmaxPrice(e.target.value)}/>
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className="filterItem">
                    <h2>Sort by</h2>
                    <div className="inputItem">
                        <input type="radio" id='asc' value='asc' name='price' onChange={(e)=>setSort("asc")}/>
                        <label htmlFor="asc">Price (Lowest first)</label>
                    </div>
                    <div className="inputItem">
                        <input type="radio" id='desc' value='desc' name='price' onChange={(e)=>setSort("desc")}/>
                        <label htmlFor="desc">Price (Highest first)</label>
                    </div>
                </div>
            </div>
            <div className="right">
                {error
            ?"something went wrong!!"
            :loading 
            ?"loading..."
            :<div>
                <h2>{name && name.title} Products :</h2>
                <img 
                    className="catImg" 
                    src={images[catId]} 
                    alt="image" 
                />
                <List catId={catId} maxPrice={maxPrice} sort={sort} sub={selected}/></div>
            }
            </div>
            </div>
            <Footer/>
        </div>
    ) 
}
export default Products;