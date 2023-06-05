import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import AdFooter  from '../../Components/AdFooter/AdFooter';
import AdminN from '../../Components/AdminNavbar/AdminN';
import { Link , useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { groupBy } from "lodash";
import Graph from '../../Components/Graph/Graph';
//import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


const Analytics = () => {
  const products = useSelector((state) => state.cart.products);
  const [allClients, setAllClients] = useState([]);
  const [error, setError] = useState(null);
  const [histo,sethisto]= useState([]);
  const [hehe,sethe] = useState([]);
  const chartRef = useRef(null);
  const navigate=useNavigate();

  /*const [state, setState] = React.useState({
    Menu: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Dashboard', 'Analytics', 'Add products'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All Products', 'All Clients'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index ===0
                ?<InboxIcon/>
                :<span></span>
                
                  
                } 
                
                }
                {index === 1 ? <MailIcon/> :<span></span>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
  
           

          </ListItem>
        ))}
      </List>
    </Box>
  );*/

  const today = new Date().toISOString()
  const clients = allClients.map(option =>( 
    { 
      id:option.id,
      email: option.attributes.email,
      username:option.attributes.username,
      fullName:option.attributes.fullName,
      phone:option.attributes.phone,
    }
  ));
  const dash = histo.map(option =>( 
    { 
      id:option.id,
      userId:option.attributes.userId,
      added:option.attributes.added,
      recipe:option.attributes.recipe,
      profit:option.attributes.profit,
    }
  ));
  
  console.log(dash) 
  console.log(clients)
    useEffect(() => {
      axios
        .get("http://localhost:1337/api/clients")
        .then(({ data }) => {
          setAllClients(data.data);
          console.log(data.data);
        })
        .catch((error) => setError(error));

      axios  
        .get("http://localhost:1337/api/historiques")
        .then(({ data }) => {
          sethisto(data.data);
          console.log(data.data);
        })
        .catch((error) => setError(error));
    }, []);

  console.log(today)
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [...new Set(dash.map(option => new Date(option.added).getFullYear()))];
  const months = [...new Set(dash.map(option => (new Date(option.added).getMonth()+1).toString().padStart(2, "0")))];
  /*const monthWithNames = months
  .sort((a, b) => a - b)
  .map(m => monthNames[parseInt(m) - 1]);
  */
  const monthWithNames = [...new Set(dash.map(option => (new Date(option.added).getMonth() + 1).toString().padStart(2, "0") + "-" + new Date(option.added).getFullYear()))]
  .sort((a, b) => {
    const [monthA, yearA] = a.split("-");
    const [monthB, yearB] = b.split("-");
    return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
  })
  .map(monthYear => {
    const [month, year] = monthYear.split("-");
    return monthNames[parseInt(month) - 1] + " " + year;
  });


  console.log(monthWithNames); // output the resulting month names array
  
  console.log(years)
  console.log(months)
  const total =()=>{
    let t =0 ;
    dash.map((e)=>{
      t = t + parseInt(e.recipe);
    });
    return t;
  };  
  
  const groupedData = groupBy(dash, (item) => {
    const date = new Date(item.added);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
  });
  console.log(groupedData)
  let ex;
  
  let year;
  const toP =()=>{
    let p =0 ;
    dash.map((e)=>{
      p +=parseInt(e.profit);
    });
    return p;
  };  
  let i=toP();
  console.log(i)


  const profitByMonth = {};
  const recipeByMonth = {};



dash.forEach((option) => {
  const monthYear = new Date(option.added).toLocaleString('en-us', { month: 'long', year: 'numeric' });
  if (profitByMonth[monthYear]) {
    profitByMonth[monthYear] += parseInt(option.profit);
  } else {
    profitByMonth[monthYear] = parseInt(option.profit);
  }

  if (recipeByMonth[monthYear]) {
    recipeByMonth[monthYear] += parseInt(option.recipe);
  } else {
    recipeByMonth[monthYear] = parseInt(option.recipe);
  }
});

const chartData = {
  labels: Object.keys(profitByMonth),
  datasets: [
    {
      label: 'Total Profit',
      data: Object.values(profitByMonth),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      
    },
    {
      label: 'Total Recipe',
      data: Object.values(recipeByMonth),
      fill: false,
      borderColor: 'rgb(192, 75, 192)',
      tension: 0.1,
      
    },
  ],
};



  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  
    const ctx = document.getElementById('myChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        // Set the chart options here
      },
    });
  
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);
  
  
  
  return (
    <div>
      <AdminN/>
      <div className='admin'>
        <div className="left">
          

          {/*['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
          ))*/}
          <h1>Menu</h1>
          <button><Link className='link' to="/Admin"> Dashboard </Link></button>
          <button><Link className='link' to="/Admin/Analytics">Analytics </Link></button>
          <button><Link className='link' to="/Admin/Allclient">All Clients </Link></button>
          <button><Link className='link' to="/Admin/Allproducts">All Products available </Link></button>
          <button><Link className='link' to="/Admin/Addproducts">Add Products </Link></button>
        
        </div>
        <div className="center">
          <h2>Analytics</h2>
          <TableContainer component={Paper}>
          <Table className='table' sx={{ minWidth: 250,padding:120 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='title' align="left">Year</TableCell>
                  <TableCell className='title' align="left">Month&nbsp;</TableCell>
                  <TableCell className='title'>id</TableCell>
                  <TableCell className='title' align="left">Added</TableCell>
                  <TableCell className='title' align="left">Name&nbsp;</TableCell>
                  <TableCell className='title' align="left">E_mail&nbsp;</TableCell>
                  <TableCell className='title' align="left">User-id&nbsp;</TableCell>
                  <TableCell className='title' align="left">Recipe&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Object.entries(groupedData).map(([group, items]) => {
                  const [year, month] = group.split("-");
                  const total = items.reduce((acc, item) => acc + parseInt(item.recipe), 0);

                  const sortedItems = items.sort((a, b) => {
                    const dateA = new Date(a.added);
                    const dateB = new Date(b.added);
                    return dateA - dateB;
                  });
                  return (
                    <React.Fragment key={group}>
                      <TableRow>
                        <TableCell className='rest' rowSpan={items.length} align="left">{year}</TableCell>
                        <TableCell className='rest' align="left">{monthNames[parseInt(month) - 1]}</TableCell>
                        <TableCell className='rest' >{items[0].id}</TableCell>
                        <TableCell className='rest' align="left">{items[0].added}</TableCell>
                        {
                        ex = clients.find((client) =>client.id === items[0].userId),
                        ex
                        ?<TableCell className='rest' align="left">{ex.username}</TableCell>
                        :<span></span>
                        }
                        <TableCell className='rest' align="left">{ex?.email}</TableCell>
                        <TableCell className='rest' align="left">{items[0].userId}</TableCell>
                        <TableCell className='rest' align="left">{items[0].recipe}</TableCell>
                      </TableRow>
                      {items.slice(1).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className='rest' align="left">{monthNames[parseInt(month) - 1]}</TableCell>
                          <TableCell className='rest' >{item.id}</TableCell>
                          <TableCell className='rest' align="left">{item.added}</TableCell>
                          {
                          ex = clients.find((client) =>client.id === item.userId),
                          ex
                          ?
                          <TableCell className='rest' align="left">{ex.username}</TableCell>
                          :<span></span>
                          }
                          {
                          ex = clients.find((client) =>client.id === item.userId),
                          ex
                          ?
                          <TableCell className='rest' align="left">{ex.email}</TableCell>
                          :<span></span>
                          }
                          <TableCell className='rest'align="left">{item.userId}</TableCell>
                          <TableCell className='rest' align="left">{item.recipe}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className='rest' colSpan={7} align="right">Month incomes:</TableCell>
                        <TableCell className='rest' align="left">{total}</TableCell>
                      </TableRow>
                    </React.Fragment>
                    );
                })}
              </TableBody>
              <TableHead>
                <TableRow>  
                  <TableCell className='rest'>Total</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className='rest' align="left">{total()}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell className='rest' >Total Profits</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className='rest' align="left">{toP()}</TableCell>
                </TableRow>
            </TableHead>
            </Table>
          </TableContainer>
          <canvas id="myChart" />
        </div>
      </div>
      
      
    </div>
  )
}

export default Analytics