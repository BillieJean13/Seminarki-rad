import './App.css';
import { useState, useEffect } from "react";

import Input from "./Components/Chat Messages/Input";
import Message from "./Components/Chat Messages/Message";
import Login from './Components/Login/Login';

import avatarWoman from "./Components/Assets/Avatar04.svg"
import avatarMan from "./Components/Assets/Avatar06.svg"
import avatarGirl from "./Components/Assets/Avatar07.svg"
import avatarBoy from "./Components/Assets/Avatar05.svg"


function randomColor() { 
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {

  const [user, setUser] = useState({
    username: '',
    color: randomColor(),
    avatar: avatarMan, 
    avatarId: 0
  });

  const [messageArray, setMessageArray] = useState([]); 
  const [drone, setDrone] = useState(); 
  const [userID, setUserID] = useState(); 

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  


  useEffect(() => {
    if(isLoggedIn){
      const drone = new window.Scaledrone("feNvXbkiduwaGrAy", { 
        data: user,
      });
      setDrone(drone);
    }
    
  }, [isLoggedIn]); 

useEffect(() => {
  if (drone) {  
    drone.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }

     

      const chatRoom = drone.subscribe("observable-room"); 

      chatRoom.on("open", (error) => { 
        if (error) {
          return console.error(error);
        }
        
      });

      chatRoom.on("data", (text, chatUser) => { 
         setUserID(drone.clientId);
        

        const username = chatUser.clientData.username; 
        const chatUserID = chatUser.id;
        const userColor = chatUser.clientData.color;
        const userAvatar = chatUser.clientData.avatar;
        const timeStamp = new Date()

        console.log(`text je ${text}`)
        
        setMessageArray((oldArray) => [
          ...oldArray,
          { text, username, userColor, chatUserID, user, timeStamp, userAvatar }, 
        ]);
      });
    });
  }
}, [drone])

  const onSendMessage = (message) => { 
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const loginHandler = (username) => {
    setIsLoggedIn(true); 
    console.log('User', username, 'connected!');
  };

  

  useEffect(() => {
    console.log("user")
    console.log(user)
    }, [user]) 

  return (
    <div className="App">
    {!isLoggedIn && <Login user={user} setUser={setUser} randomColor={randomColor} onLogin={loginHandler}/>} 
    {isLoggedIn && 
      
      <>
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <div>
          <Message messages={messageArray} userID={userID}/>
          <Input onSendMessage={onSendMessage} />
        </div>
      </>
    } 
    </div> 
  );
}

export default App;
