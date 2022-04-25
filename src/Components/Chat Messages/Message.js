import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const Message = ({ messages, userID }) => {


  return (
    <div>
      <ul className="Messages-list">
        {messages.map((key) => {
          const timeStamp = { 
            hours: key.timeStamp.getHours(),
            minutes: key.timeStamp.getMinutes() < 10 ? '0' + key.timeStamp.getMinutes() : key.timeStamp.getMinutes()
          }
          return(
          <div key={messages.indexOf(key)} className={(key.chatUserID === userID) 
            ? "Messages-message currentMember"
            : "Messages-message otherMember"}>
            {}
            <img src={key.userAvatar} alt=" " className="avatar" style={{backgroundColor: `${key.userColor}`}}/>
            <div className="Message-content">
              <div className="username">{key.username}</div>
              <div className="timestamp">{timeStamp.hours}:{timeStamp.minutes}</div>
              <div className="text">{key.text}</div>
            </div>
            
          </div>
          )
        })}
      </ul>
    </div>
  );
};

export default Message;