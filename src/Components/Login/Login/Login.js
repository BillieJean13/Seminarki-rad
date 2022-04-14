import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';

import blankAvatar from '../../Assets/blankAvatar.png';
import Card from '../Card/Card';

import avatarAstronaut from "../../Assets/avatarAstronaut.svg"
import avatarNinja from "../../Assets/avatarNinja.svg"
import avatarDetective from "../../Assets/avatarDetective.svg"



export default function Login(props) {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(1); 
    
    const [avatar, setAvatar] = useState(blankAvatar);
useEffect(() => {
console.log(props.user);
}, [props.user])

    
    const handleAddUser = (event) => {
      console.log("ovo je user")
      console.log(props.user)
        event.preventDefault();
        if (props.user.username.trim().length === 0) { 
          setUsernameIsValid(false); 
          return;
        }
        setUsernameIsValid(true);
        props.onLogin(avatar, props.user.username); 
      };

      
      const handleUsernameChange = (event) => { 
        props.setUser(prevValues => (
          {...prevValues,  username: event.target.value})
          )
      };

      
      const handleColorChange = (event) => {
        props.setUser(prevValues => (
          {...prevValues,  randomColor: event.target.value})
          )
      }
      const submitUser = () => {
        props.setUsernameSubmitted(true)
      }

      
      const handleAvatar = (avatar) => {
        console.log(avatar);
        let userAvatar
    
        switch (avatar) {
          case 1: userAvatar = avatarAstronaut; break;
          case 2: userAvatar = avatarNinja; break;
          default: userAvatar = avatarDetective; break;
        }
    
        props.setUser(prevValues => ({ ...prevValues, avatar: userAvatar, avatarId: avatar}))
      }
    

    return(
        <Card
            className={
                !usernameIsValid ? "login invalid" : "login"  
            }
            >
          <form onSubmit={handleAddUser}>
              <h1>Chat Application</h1>
              <label>Your Nickname</label>
              <input className="inputText"
              type='text'
              placeholder='Nickname'
              onChange={handleUsernameChange}
              /> 
              <label>Your Avatar</label>
              <div className="avatars">
                <div className={`item ${props.user.avatarId === 1 ? 'active' : ''}`} onClick={() => handleAvatar(1)}>
                  <img src={avatarAstronaut} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 2 ? 'active' : ''}`} onClick={() => handleAvatar(2)}>
                  <img src={avatarNinja} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 3 ? 'active' : ''}`} onClick={() => handleAvatar(3)}>
                  <img src={avatarDetective} alt="" />
                </div>
              </div>
              
              <label>Select Color</label>
              <input className="inputColor" type="color" onChange={handleColorChange}></input>
              
              <Button type='submit' onClick={submitUser}>Join Chat</Button>
          </form>
        </Card>
    )
}