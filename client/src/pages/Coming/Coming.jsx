import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import HandymanIcon from '@mui/icons-material/Handyman';
import "./Coming.scss"
import useFetch from '../../hooks/useFetch';


const Coming = () => {
  const {data,loading,errore} = useFetch(
    `/clients/5?populate=products`
    );
  console.log(data)

  const client = data?.attributes.products.data.map(product =>( 
    { 
      id:product.id,
      price: product.attributes.price,
      title: product.attributes.title,
      
    }
  ));
  console.log(client)
  return (
    <div>
        <Navbar/>
            <div className='Main'>
            <h1>Coming Soon</h1>
            <HandymanIcon sx={{ fontSize: 35 }}/>
            </div>
        <Footer/>
    </div>
  )
}

export default Coming