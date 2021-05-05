import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import UserWindow from './userWindow';
import MessageWindow from './messageWindow';

import '../styles/chatPage.css';

const qs=require('query-string');


const ChatPage = ({location,socket}) => {
    const {username,room}= qs.parse(location.search)
    const history=useHistory();
    useEffect(()=>{
        socket.emit('join',{username,room},(error)=>{
            if(error){
                alert(error);
                // history.push('/');
                history.goBack();
            }
        });
    },[])

    return (
        <div className="chatPage">
            <UserWindow socket={socket}/>
            <MessageWindow socket={socket} />
        </div>
    )
}

export default ChatPage
