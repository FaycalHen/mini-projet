import React, { useEffect, useState } from 'react';
import "./Payement.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../../Redux/CartReducer';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useNotification } from '../../NotificationContext/NotificationContext';


const Payement = () => {
  const user = useSelector((state) => state.cart.current);
  const productB = useSelector((state) => state.cart.products);
  const pr = useSelector((state) => state.cart.notif);
  console.log(productB)
  console.log(pr)
  const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);
  
  const timestamp = new Date().toISOString();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [allproducts,setproducts]=useState([]);
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [city, setCity] = useState('');
const [postalCode, setPostalCode] = useState('');
const [address, setAddress] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [cardholderName, setCardholderName] = useState('');
const [cardNumber, setCardNumber] = useState('');
const [expireMonth, setExpireMonth] = useState('');
const [expireYear, setExpireYear] = useState('');
const [formErrors, setFormErrors] = useState({});

  const [updated,setupdated]=useState({
    t_M:"",
    t_S:"",
    t_L:"",
    t_XL:"",
    Quantity:"",
  });
  const { addNotification , notifications }  = useNotification();
  const client = user.map(option =>( 
    { 
      id:option.id,
      email: option.email,
      password: option.password,
      username:option.username,
      fullName:option.fullName,
      phone:option.phone,
      admin:option.admin,
    }
  ));
  console.log(notifications)
  const prod = productB.map(option =>( 
    { 
      qnt:option.qnt,
      id:option.id,
      quantity:option.quantity,
      price:option.price,
      taille:option.tai,
      qt:option.qt,
      t_M:option.t_M,
      t_S:option.t_S,
      t_L:option.t_L,
      t_XL:option.t_XL,
    }
  ));
  console.log(updated)
  const clientID = client[0].id;
  console.log(prod)
  const {data,loading,errore} = useFetch(
    `/clients/${clientID}?populate=products`
    );
  console.log(data)
  const recipe = data?.attributes.products.data.map(product =>( 
    { 
      id:product.id,
      price: product.attributes.price,
      title: product.attributes.title,
      
    }
  ));
  
  console.log(recipe)
  const totalPrice = () => {
    let total = 0;
    productB.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
    let P=0;  
    allproducts.map((produit)=>{
      productB.find(item=>item.id === produit.id)
      ?P += produit.attributes.price-produit.attributes.BuyP
      :<span></span>
    });
    
  console.log(P)
  const historicData={
    recipe: totalPrice(),
    added: timestamp,
    userId:clientID,
    profit:P,
  };
  console.log(notifications)
  console.log(historicData)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = validateForm();
  
    if (isValid) {
      if (prod.length === 0) {
        alert("I'm sorry, your cart is empty. Please try to add something.");
        navigate('/');
      } else {
        for (let i = 0; i < prod.length; i++) {
          const existing = recipe.find((produit) => produit.id === prod[i].id);
          console.log(existing);
          if (!existing) {
            await axios
              .put(`http://localhost:1337/api/clients/${clientID}`, {
                data: {
                  products: {
                    connect: [prod[i].id],
                  },
                },
              })
              .then((response) => {
                console.log(response);
                dispatch(resetCart());
              })
              .catch((error) => {
                setError(error);
              });
          }
  
          let taille = prod[i].taille;
          if (taille === 't_S') {
            updated.t_S = prod[i].qt;
          } else {
            updated.t_S = prod[i].t_S;
          }
          if (taille === 't_M') {
            updated.t_M = prod[i].qt;
          } else {
            updated.t_M = prod[i].t_M;
          }
          if (taille === 't_L') {
            updated.t_L = prod[i].qt;
          } else {
            updated.t_L = prod[i].t_L;
          }
          if (taille === 't_XL') {
            updated.t_XL = prod[i].qt;
          } else {
            updated.t_XL = prod[i].t_XL;
          }
          updated.Quantity = prod[i].qnt - prod[i].quantity;
          await axios
            .put(`http://localhost:1337/api/products/${prod[i].id}`, { data: updated })
            .then((response) => {
              console.log(response);
              dispatch(resetCart());
            })
            .catch((error) => {
              setError(error);
            });
        }
        totalPrice();
        dispatch(resetCart());
      }
      await axios
        .post(`http://localhost:1337/api/historiques`, { data: historicData })
        .then((response) => {
          console.log(response);
          addNotification('Your payment was successful! We will reach out to you.');
          setIsPurchaseSuccessful(true);
        })
        .catch((error) => {
          setError(error);
        });
      setIsNavigationEnabled(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  };
  
  
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products")
      .then(({ data }) => {
        setproducts(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
    
    }, []);

    const validateForm = () => {
      const errors = {};
    
      // Validate email
      if (!email.includes('gmail.com') && !email.includes('yahoo.fr') && user[0].email===email) {
        errors.email = 'Invalid email domain. Please use gmail.com or yahoo.fr.';
      }
    
      // Validate password
      if (user[0].password===password) {
        errors.password = 'Invalid password';
      }
      // Add your password validation logic here
    
      // Validate postal code
      if (/[^\d]/.test(postalCode)) {
        errors.postalCode = 'Postal code should only contain digits.';
      }
    
      // Validate phone number
      if (user[0].phone===phoneNumber) {
        errors.phone = 'Invalid phone, use your personal number';
      }
      // Add your phone number validation logic here
    
      // Validate cardholder name
      if (cardholderName !== user[0].fullName) {
        errors.cardholderName = 'Cardholder name should match your full name.';
      }
    
      // Validate card number
      if (cardNumber.length !== 10 || isNaN(cardNumber)) {
        errors.cardNumber = 'Card number should be 10 digits.';
      }
    
      // Validate expire month
      if (!['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].includes(expireMonth)) {
        errors.expireMonth = 'Invalid expiration month.';
      }
    
      // Validate expire year
      if (expireYear.length !== 4 || isNaN(expireYear) || parseInt(expireYear) < 2023) {
        errors.expireYear = 'Invalid expiration year.';
      }
    
      setFormErrors(errors);
    
      return Object.keys(errors).length === 0;
    };
  
  
  return (
      <div className="paiment-container">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
          <div className="wrap">
            <div className="left">
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required value={email} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setEmail(e.target.value)} />
                {formErrors.email && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setPassword(e.target.value)} />
                {formErrors.password && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" required value={city} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                 
                }} onChange={(e) => setCity(e.target.value)} />
                {formErrors.city && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.city}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="codepostal">Postal Code</label>
                <input type="text" id="codepostal" name="codepostal" required value={postalCode} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setPostalCode(e.target.value)} />
                {formErrors.postalCode && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.postalCode}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <input type="text" id="adresse" name="adresse" required value={address} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                 
                }} onChange={(e) => setAddress(e.target.value)} />
              </div>

            </div>
            <div className="right">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" required value={phoneNumber} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setPhoneNumber(e.target.value)} />
                {formErrors.phoneNumber && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.phoneNumber}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cardname">Cardholder Name</label>
                <input type="text" id="cardname" name="cardname" required value={cardholderName} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                 
                }} onChange={(e) => setCardholderName(e.target.value)} />
                {formErrors.cardholderName && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.cardholderName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cardnum">Card Number</label>
                <input type="text" id="cardnum" name="cardnum" required value={cardNumber} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setCardNumber(e.target.value)} />
                {formErrors.cardNumber && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.cardNumber}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="ex">Expire Month</label>
                <input type="text" id="ex" name="ex" required value={expireMonth} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setExpireMonth(e.target.value)} />
                {formErrors.expireMonth && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.expireMonth}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="exy">Expire Year</label>
                <input type="text" id="exy" name="exy" required value={expireYear} style={{
                  border: formErrors.expireMonth ? '1px solid red' : '1px solid #ccc',
                  fontSize: '12px',
                  
                }} onChange={(e) => setExpireYear(e.target.value)} />
                {formErrors.expireYear && <p style={{ fontSize: '12px', color: 'red', fontSize: 'small' }}>{formErrors.expireYear}</p>}
              </div>
              </div>
          </div>
          <button
            type="submit"
            className={isPurchaseSuccessful ? "success" : ""}
            onClick={handleSubmit}
            disabled={isNavigationEnabled}
          >
            {isPurchaseSuccessful ? "Successful" : "Purchase"}
          </button>
      </form>
    </div>
  )
}
export default Payement