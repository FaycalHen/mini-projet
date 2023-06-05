import "./Home.scss";
import {React} from 'react';
import Slider from '../../Components/Slider/Slider';
import Featured from "../../Components/Featured/Featured";
import Categories from "../../Components/Categories/Categories";
import Contact from "../../Components/Contact/Contact";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";




const Home =()=>{
    return(
        <div className='home'>
            <Navbar/>
            <Slider/>
            <Featured type="featured"/>
            <Categories/>
            <Featured type="trending"/>
            <Contact/>
            <Footer/>
        </div>
    )
}
export default Home;