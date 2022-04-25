import React, { useEffect, useState } from 'react';

import avatarWoman from "../Assets/Avatar04.svg"
import avatarMan from "../Assets/Avatar06.svg"
import avatarGirl from "../Assets/Avatar07.svg"
import avatarBoy from "../Assets/Avatar05.svg"

import adjectives from './adjectives';
import nouns from './nouns';



export default function Login(props) {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(1); 
    
    const [avatar, setAvatar] = useState(avatarMan);

    function randomName() {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      return adjective + noun;
    }

useEffect(() => {
console.log(props.user);
}, [props.user])

    
    const handleAddUser = (event) => {
      console.log("ovo je user")
      console.log(props.user)
        event.preventDefault();
        if (props.user.username.trim().length === 0) { 
          setUsernameIsValid(false); 
          alert("Incorrect username")
          return;
        }
        setUsernameIsValid(true);
        props.onLogin(props.user.username); 
      };

      
      const handleUsernameChange = (event) => { 
        props.setUser(prevValues => (
          {...prevValues,  username: event.target.value})
          )
      };

      
      const handleColorChange = (event) => {
        props.setUser(prevValues => (
          {...prevValues,  color: event.target.value})
          )
      }

      const handleRandomUsername = (event) => { 
        props.setUser(prevValues => (
          {...prevValues,  username: randomName()})
          )
      };

      const handleRandomColor = (event) => { 
        props.setUser(prevValues => (
          {...prevValues,  color: props.randomColor()})
          )
      };

      const handleAvatar = (avatar) => {
        console.log(avatar);
        let userAvatar
    
        switch (avatar) {
          case 1: userAvatar = avatarWoman; break;
          case 2: userAvatar = avatarMan; break;
          case 3: userAvatar = avatarGirl; break;
          case 4: userAvatar = avatarBoy; break;
          default: console.log("Greška kod odabira avatara")
        }
    
        props.setUser(prevValues => ({ ...prevValues, avatar: userAvatar, avatarId: avatar}))
      }
    

    return(
        <div
            className={
                !usernameIsValid ? "card login invalid" : "card login"  
            }
            >
          <form onSubmit={handleAddUser}>
              <h1>Chat Application</h1>
              <label>Type Your Nickname</label>
              <input className="inputText"
              type='text'
              placeholder='Your Nickname'
              onChange={handleUsernameChange}
              value={props.user.username}
              /> 
              <h5 onClick={handleRandomUsername}>Random Nickname</h5>
              <label>Choose Your Avatar</label>
              <div className="avatars">
                <div className={`item ${props.user.avatarId === 1 ? 'active' : ''}`} onClick={() => handleAvatar(1)}>
                  <img src={avatarWoman} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 2 ? 'active' : ''}`} onClick={() => handleAvatar(2)}>
                  <img src={avatarMan} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 3 ? 'active' : ''}`} onClick={() => handleAvatar(3)}>
                  <img src={avatarGirl} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 4 ? 'active' : ''}`} onClick={() => handleAvatar(4)}>
                  <img src={avatarBoy} alt="" />
                </div>
              </div>
              
              <label>Select Your Color</label>
              <input className="inputColor" type="color" onChange={handleColorChange} value={props.user.color}></input>
              <h5 onClick={handleRandomColor}>Random Color</h5>
              
              <button type='submit' disabled={props.user.username.length <3}>Join Chat</button>
          </form>
        </div>
    )
}