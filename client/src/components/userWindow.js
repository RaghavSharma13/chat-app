import React, { useEffect, useState } from 'react';
import dropdownIcon from '../assets/icon-arrow.svg';
import '../styles/userWindow.css';

const UserWindow = ({socket}) => {
    const [room,setRoom]=useState();
    const [userList,setUserList]=useState([]);
    const [drop,setDrop]=useState(false);
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
            <div className="userList">
            <h3 className="listTitle">Users</h3>
            <img className={`dropDown ${drop?"active":""}`} src={dropdownIcon} alt="See Users" onClick={()=>setDrop(!drop)} />
            </div>
            <ul className={`users ${drop?"active":""}`}>
                {renderUserList()}
            </ul>
        </div>
    )
}

export default UserWindow
