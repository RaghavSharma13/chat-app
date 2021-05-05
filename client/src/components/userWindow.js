import React, { useEffect, useState } from 'react';
import '../styles/userWindow.css';

const UserWindow = ({socket}) => {
    const [room,setRoom]=useState();
    const [userList,setUserList]=useState([]);

    const renderUserList=()=>{
        return userList.map((user)=>{
            return <li key={user.id}>{user.username}</li>
        })
    }

    useEffect(()=>{
        socket.on('roomData',({room,userList})=>{
            setRoom(room);
            setUserList(userList);
        })
    },[])
    return (
        <div className="userWindow">
            <h2 className="room">{room}</h2>
            <h3 className="listTitle">Users</h3>
            <ul className="users">
                {renderUserList()}
            </ul>
        </div>
    )
}

export default UserWindow
