import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import Likes from "./pages/Likes/Likes";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile"
import Payement from "./pages/Payement/Payement";
import Addproducts from "./pages/Addproducts/Addproducts";
import Allclient from "./pages/Allclient/Allclient";
import Allproducts from "./pages/Allproducts/Allproducts";
import Analytics from "./pages/Analytics/Analytics";
import Dashboard from "./pages/Dashboard/Dashboard";
import Coming from "./pages/Coming/Coming";
import Sign from "./pages/Signin/Sign";
import "./App.scss";
import UserInfo from "./pages/UserInfo/UserInfo";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import { NotificationProvider } from './NotificationContext/NotificationContext';
import MyComponent from "./pages/MyComponent/MyComponent";
import Modify from "./pages/Modify/Modify";


const Layout =()=>{
  return(
    <div className="app">      
      <Outlet/>
    </div>
    
  )
}

const router= createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {path:"/",
      element:<Home/>,
      },
      {path:"/Product/:id",
      element:<Product/>,
      },
      {path:"/Products/:id",
      element:<Products/>
      },
      {path:"/Admin/",
      element:<Admin/>
      },
      {path:"Admin/Likes",
      element:<Likes/>
      },
      {path:"/Likes",
      element:<Likes/>
      },
      {path:"/Login",
      element:<Login/>
      },
      {path:"/Payement",
      element:<Payement/>
      },
      {path:"Admin/Dashboard",
      element:<Dashboard/>
      },
      {path:"Admin/Addproducts",
      element:<Addproducts/>
      },
      {path:"Admin/MyComponent",
      element:<MyComponent/>
      },
      {path:"Admin/Allclient",
      element:<Allclient/>
      },
      {path:"Admin/Allproducts",
      element:<Allproducts/>
      },
      {path:"Admin/Analytics",
      element:<Analytics/>
      },
      {path:"/Profile",
      element:<Profile/>
      },
      {path:"/Coming",
      element:<Coming/>
      },
      {path:"/Sign",
      element:<Sign/>
      },
      {path:"/UserInfo/:id",
      element:<UserInfo/>
      },
      {path:"/ProductInfo/:id",
      element:<ProductInfo/>,
      },
      {path:"/Modify",
      element:<Modify/>,
      },
    ]
  },
 
])

function App() {
  return (
    <NotificationProvider>
    <div>
      <RouterProvider router={router} />
    </div>
    </NotificationProvider>
  );
}

export default App;
