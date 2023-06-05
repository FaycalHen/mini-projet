import React from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../Card/Card';
import "./Featured.scss";

const Featured = ({type}) => {
  
  const {data,loading,error} = useFetch(
    `/Products?populate=*&[filters][type][$eq]=${type}`
    );
   
  return (
    <div className='featured'>
        <div className="top">
            <h1>{type} Products</h1>
            <p>
            Introducing our latest collection of stylish and comfortable clothing, perfect for any occasion! Made from high-quality materials and designed with the latest fashion trends in mind.
            Browse our collection today and discover your new favorite pieces. With a variety of colors, styles, and sizes available.
            </p>
        </div>
        <div className="bottom">
            {error
            ?"something went wrong!!"
            :loading 
            ?"loading..."
            :data?.map((item)=><Card item={item} key={item.id}/>)
            }
        </div>
    </div>
  )
}

export default Featured;