import React from "react";
import "./Notification.scss";
import { useNotification } from '../../NotificationContext/NotificationContext';
import { useDispatch, useSelector } from "react-redux";
import { removenotif } from "../../Redux/CartReducer";

const Notification = () => {
  const { notifications, removeNotification } = useNotification();
  const pr = useSelector((state) => state.cart.notif);
  const dispatch = useDispatch();
  console.log(pr)
  const op=pr.map(op=>(
  {
    notif:op.message,
  }
  ))
  console.log(op)
  return (
    <div className="notif">
      <h1>Notifications</h1>
      {op.length!==0
      ?op?.map((message) => (
                    <div>
                        <h5>{message.notif}</h5>
                    </div>
      ))
      :<h5>no notifications for the moment </h5>
      }
      <span className="reset" onClick={() => dispatch(removenotif())}>
        Clear All
      </span>
    </div>
  );
};

export default Notification;
