import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { addnotif, removenotif } from '../Redux/CartReducer';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const dispatch=useDispatch();

  const addNotification = (message) => {
    setNotifications([...notifications,message]);
    const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const notification = {
      message: message,
      time: currentTime,
    };
    dispatch(addnotif(notification));
  };

  const removeNotification = (index) => {
    setNotifications([...notifications.slice(0, index), ...notifications.slice(index + 1)]);
    dispatch(removenotif())
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
