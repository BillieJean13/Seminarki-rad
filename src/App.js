import './App.css';
import { useState, useEffect } from "react";

import Input from "./Components/Input";
import Message from "./Components/Message";
import Login from './Components/Login/Login/Login';

import avatarAstronaut from "./Components/Assets/avatarAstronaut.svg"
import avatarNinja from "./Components/Assets/avatarNinja.svg"
import avatarDetective from "./Components/Assets/avatarDetective.svg"



function randomColor() { 
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {

  const [user, setUser] = useState({
    username: '',
    randomColor: randomColor(),
    avatar: avatarNinja, 
    avatarId: 0
  });

  const [messages, setMessages] = useState([]); 
  const [drone, setDrone] = useState(); 
  const [users, setUsers] = useState(); 

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)


  useEffect(() => {
    if(usernameSubmitted){
      console.log(`ovo je to ${usernameSubmitted}`)
      const drone = new window.Scaledrone("feNvXbkiduwaGrAy", { 
        data: user,
      });
      setDrone(drone);
    }
    
  }, [usernameSubmitted]); 

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
         setUsers(drone.clientId);
        

        const username = chatUser.clientData.username; 
        const chatUserID = chatUser.id;
        const userColor = chatUser.clientData.randomColor;
        const userAvatar = chatUser.clientData.avatar;
        const timeStamp = new Date()

        console.log(`text je ${text}`)
        
        setMessages((oldArray) => [
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

  const loginHandler = (avatar, username) => {
    setUser(() => {
      return { id: drone.clientId, avatar: avatar, username: username }; 
    }); 
    setIsLoggedIn(true); 
    console.log('User', username, 'connected!');
  };

  

  useEffect(() => {
    console.log("user")
    console.log(user)
    }, [user]) 

  return (
    <div className="App">
    {!isLoggedIn && <Login user={user} setUser={setUser} usernameSubmitted={usernameSubmitted} setUsernameSubmitted={setUsernameSubmitted} onLogin={loginHandler}/>} 
    {isLoggedIn && 
      
      <>
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <div>
          <Message messages={messages} users={users}/>
          <Input onSendMessage={onSendMessage} />
        </div>
      </>
    } 
    </div> 
  );
}

export default App;
