import React from "react";
import "./Notification.scss";
import { useNotification } from '../../NotificationContext/NotificationContext';
import { useDispatch, useSelector } from "react-redux";
import { removenot, removenotif } from "../../Redux/CartReducer";

const Notification = () => {
  const { notifications, removeNotification } = useNotification();
  const pr = useSelector((state) => state.cart.notif);
  const p = useSelector((state) => state.cart.ungoingnotif);
  const dispatch = useDispatch();
  console.log(pr)
  const op=pr.map(op=>(
  {
    notif:op.message,
  }
  ))

  const o=p.map(op=>(
    {
      notif:op.message,
    }
    ))
  console.log(op)
  console.log(o)
  return (
    <div className="notif">
      <h1>Notifications</h1>
      {
      op.length !== 0 || o.length !== 0 
      ? (
        <div>
          {op?.map((message) => (
            <div key={message.id}>
              <h5>{message.notif}</h5>
            </div>
          ))}
          {o?.map((message) => (
              <div key={message.id}>
                <h5>{message.notif}</h5>
              </div>
            ))}
          </div>
          )
      : <h5>no notifications for the moment </h5>
      }
      
      

      <span className="reset" onClick={() => 
      {
        dispatch(removenotif())
        dispatch(removenot())
      }
        }>
        Clear All
      </span>
    </div>
  );
};

export default Notification;
