import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
    const [username,setUsername]=useState('');
    const [room,setRoom]=useState('');

    return (
        <div className="home">
            <form className="joiningForm">
                <h1>Join</h1>
                <label>username</label>
                <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} required={true}/>
                <label>Room</label>
                <input type="text" placeholder="Room" value={room} onChange={(e)=>setRoom(e.target.value)} requried="true" />
                <Link className="btn join" to={{
                    pathname:"/chatpage",
                    search:`?username=${username}&room=${room}`
                }} >Join</Link>
            </form>
        </div>
    )
}

export default Home
