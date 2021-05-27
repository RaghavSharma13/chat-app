import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/home.css';
import ToggleSwitch from './toggleSwitch';

const Home = ({roomPassword, setRoomPass}) => {
    const [username,setUsername]=useState('');
    const [room,setRoom]=useState('');
    const [checked, setChecked]=useState(false);
    const [mode,setMode]=useState('join');
    useEffect(()=>{
        setMode(checked?"create":"join");
    },[checked])
    return (
        <div className="home">
            <div className="main">
                <div className="main-header">
                    <h1>{checked?"Create":"Join"}</h1>
                    <ToggleSwitch name="Type" checked={checked} change={setChecked} />
                </div>
                <form className="main-joiningForm">
                    <label>username</label>
                    <input type="text" placeholder="username..." value={username} onChange={(e)=>setUsername(e.target.value)} required={true}/>
                    <label>Room</label>
                    <input type="text" placeholder="Room..." value={room} onChange={(e)=>setRoom(e.target.value)} requried="true" />
                    <label>Password</label>
                    <input type="password" placeholder="Password..." value={roomPassword} onChange={(e)=>setRoomPass(e.target.value)} requried="true" />
                    <Link className="btn join" to={{
                        pathname:"/chatpage",
                        search:`?mode=${mode}&username=${username}&room=${room}`
                    }} >{checked?"Create":"Join"}</Link>
                </form>
            </div>
        </div>
    )
}

export default Home
