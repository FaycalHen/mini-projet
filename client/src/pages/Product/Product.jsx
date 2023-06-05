
import {React, useEffect, useState} from 'react';
import "./Product.scss";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { useParams ,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,addToWishlist,removeLike} from '../../Redux/CartReducer';
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import axios from 'axios';
import List from '../../Components/List/List';
import Suggested from '../../Components/Suggested/Suggested';
import Rating from 'react-rating';
//import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import Rate from '../../Components/Rate/Rate';




const Product =()=>{
    const id = useParams().id;
    const [selectedImg, setSelectedImg] = useState("img");
    const [quantity, setQuantity] = useState(1);
    const [like, setLike] = useState([]);
    const [err, setError] = useState(null);
    const [selected, setSelected] = useState([]);
    const [sort, setSort] = useState("t_S");
    const [all, setAll] = useState([]);
    const current = useSelector((state) => state.cart.current);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(`/Products/${id}?populate=*`);
    const qnt = data?.attributes?.Quantity;
    const catID = data?.attributes.categories.data[0].id;
    const subcats = data?.attributes.subcats.data[0].id;
    const IDD = data?.id;
    const clientID = current[0].id;
    console.log(qnt)
    const isLiked = like.map((opt) => ({
    id: opt.id,
    liked: opt.like,
    }));

    const prodID = all?.map((li) => ({
    id: li.id,
    likes: li.attributes.products.data.map((product) => ({
        productID: product.id,
    })),
    }));

    const cliID = all?.map((li) => ({
    id: li.id,
    likes: li.attributes.clients.data.map((product) => ({
        clientID: product.id,
    })),
    }));

    const hehe = cliID.flatMap((item) =>
    item.likes.map((like) => like.clientID)
    );
    const heh = prodID.flatMap((item) =>
    item.likes.map((like) => like.productID)
    );

    const user = hehe.includes(clientID);
    const prod = heh.includes(IDD);

    const filteredIDs = all
    .filter((item) =>
        item.attributes.clients.data.some((client) => client.id === clientID)
    )
    .map((item) => item.id);

    const handleChange = (e) => {
    const value = e.target.value;
    if (value === sort) {
        // Uncheck the selected size if it's clicked again
        setSort("");
    } else {
        setSort(value);
    }
    };


    const t_S = data?.attributes?.t_S;
    const t_M = data?.attributes?.t_M;
    const t_L = data?.attributes?.t_L;
    const t_XL = data?.attributes?.t_XL;
    const tai = sort;

    const taille = () => {
    let qt = 1;
    if (sort === "t_S") {
        qt = t_S - quantity;
    }
    if (sort === "t_M") {
        qt = t_M - quantity;
    }
    if (sort === "t_L") {
        qt = t_L - quantity;
    }
    if (sort === "t_XL") {
        qt = t_XL - quantity;
    }
    return qt;
    };

useEffect(() => {
  axios
    .get("http://localhost:1337/api/likes")
    .then(({ data }) => {
      setLike(data.data);
      console.log(data.data);
    })
    .catch((error) => setError(error));
}, []);

useEffect(() => {
  axios
    .get("http://localhost:1337/api/likes?populate=products,clients")
    .then(({ data }) => {
      setAll(data.data);
      console.log(data.data);
    })
    .catch((error) => setError(error));
}, []);
console.log(all);

    return(
        <div>
            <Navbar/>
            <div className='product'>
            {loading
            ?"loading..."
            :(
            <>
                <div className="wrap">
                <div className="left">
                    <div className="images">
                        <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes?.img?.data?.attributes?.url} alt="" onClick={(e)=>setSelectedImg("img")} />
                        <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes?.img2?.data?.attributes?.url} alt="" onClick={(e)=>setSelectedImg("img2")}/>
                    </div>
                    <div className="mainImg">
                        <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes[selectedImg]?.data?.attributes?.url} alt="" />
                    </div>
                </div>
                <div className="right">
                    <h1>{data?.attributes?.title}</h1>
                    <span className='price'>{data?.attributes?.price}DA</span>
                    <p>{data?.attributes?.description}</p>
                    <div className="qnt">
                        <button onClick={()=>setQuantity((prev)=>prev === 1 ? 1 : prev-1)}>-</button>
                        {quantity}
                        <button onClick={()=>setQuantity((prev)=>prev+1)}>+</button>
                    </div>
                    {qnt===null
                    ?
                    taille()<=0
                        ?<div>
                        {taille()}
                        </div>
                        :
                        <div className="inputItem">
                        <input type="radio" id="S" value="t_S" name="size" onChange={handleChange} checked={sort === "t_S"} />
                        <label htmlFor="S">S</label>
                    
                        <input type="radio" id="M" value="t_M" name="size" onChange={handleChange} checked={sort === "t_M"} />
                        <label htmlFor="M">M</label>
                    
                        <input type="radio" id="L" value="t_L" name="size" onChange={handleChange} checked={sort === "t_L"} />
                        <label htmlFor="L">L</label>
                
                        <input type="radio" id="XL" value="t_XL" name="size" onChange={handleChange} checked={sort === "t_XL"} />
                        <label htmlFor="XL">XL</label>
                    </div>
                    :<span>hh</span>
                    }
                    {taille()<=0
                    ?<h5>out of stock</h5>
                    :
                    <div>
                        {taille()}
                    </div> 
                }
                    <button className="add" onClick={() => {
                        if (current.length === 0 || taille()<=0 ) {
                            if(taille()<=0 )
                            {
                            alert("OUT OF STOCK !!")
                            }
                            else{
                            navigate('/login');
                            alert("please log-in first")}
                        } 
                        else {
                            if(qnt===null){
                                dispatch(addToCart({
                                    id:data.id,
                                    title:data.attributes.title,
                                    description:data.attributes.description,
                                    price:data.attributes.price,
                                    img:data.attributes.img.data.attributes.url,
                                    tai,
                                    qt:taille(),
                                    t_M:data.attributes.t_M,
                                    t_S:data.attributes.t_S,
                                    t_L:data.attributes.t_L,
                                    t_XL:data.attributes.t_XL,
                                    quantity,
                                    BuyP:data.attributes.BuyP,
                                    Added:data.attributes.Added,
                                }));
                            }
                            else{
                                dispatch(addToCart({
                                    id:data.id,
                                    title:data.attributes.title,
                                    description:data.attributes.description,
                                    price:data.attributes.price,
                                    img:data.attributes.img.data.attributes.url,
                                    quantity,
                                    BuyP:data.attributes.BuyP,
                                    Added:data.attributes.Added,
                                }));
                            }
                        }
                    }}>
                        <AddShoppingCartIcon/> 
                        ADD TO CART
                    </button>
                    

                    <div className="link">
                        <div className="item">
                        <button onClick={() => {
                            if (current.length === 0) {
                                navigate('/login');
                                alert("please log-in first");
                            } else {
                                if (user) {
                                if (prod) {
                                    axios
                                    .put(`http://localhost:1337/api/likes/${filteredIDs}`, {
                                        data: {
                                        products: {
                                            disconnect: [IDD],
                                        },
                                        },
                                    })
                                    .then(() => {
                                        setLike(like.filter(item => item.id !== id));
                                        alert("supriminaha");
                                        window.location.reload(); // Refresh the page
                                    })
                                    .catch((error) => setError(error));
                                } else {
                                    // Add product to the "liked" database and connect the relationship
                                    const newProduct = {
                                    like: true,
                                    products: {
                                        connect: [IDD],
                                    },
                                    };
                                    console.log(newProduct);
                                    axios
                                    .put(`http://localhost:1337/api/likes/${filteredIDs}`, { data: newProduct })
                                    .then(() => {
                                        setLike([...like, newProduct]);
                                        alert("Added");
                                        window.location.reload(); // Refresh the page
                                    })
                                    .catch((error) => setError(error));
                                }
                                } else {
                                // Add product to the "liked" database and connect the relationship
                                const newProduct = {
                                    like: true,
                                    products: {
                                    connect: [IDD],
                                    },
                                    clients: {
                                    connect: [clientID],
                                    },
                                };
                                console.log(newProduct);
                                axios
                                    .post("http://localhost:1337/api/likes", { data: newProduct })
                                    .then(() => {
                                    setLike([...like, newProduct]);
                                    alert("Added");
                                    window.location.reload(); // Refresh the page
                                    })
                                    .catch((error) => setError(error));
                                }
                            }
                            }}>
                            {user && prod ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            ADD TO WISHLIST
                            </button>




                        </div>
                        {<div className="item">
                        <Rate id={IDD} cliID={clientID}/>
                        
                        </div>}
                    </div>
                    <div className="info">
                        <span>Vendor: Polo</span>
                        <span>Product Type: T-Shirt</span>
                        <span>Tag: T-Shirt, Women, Top</span>
                    </div>
                    <hr />
                    <div className="info">
                        <span>DESCRIPTION</span>
                        <hr />
                        <span>ADDITIONAL INFORMATION</span>
                        <hr />
                        <span>FAQ</span>
                    </div>
                </div>
                </div>
                <div className="bottom">
                {error
                    ?"something went wrong!!"
                    :loading 
                    ?"loading..."
                    :<div>
                    <h2> Suggested Products :</h2>
                    <Suggested catId={catID} sub={subcats}/></div>
                    }
                </div>
            </>)}
            </div>  
            <Footer/> 
        </div>
        
    )
}
export default Product;