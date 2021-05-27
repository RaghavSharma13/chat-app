import React, { useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import UserWindow from './userWindow';
import MessageWindow from './messageWindow';

import '../styles/chatPage.css';

const qs=require('query-string');


const ChatPage = ({socket}) => {
    const location = useLocation();
    const {username,room,mode}= qs.parse(location.search);
    const history=useHistory();
    useEffect(()=>{
        socket.emit('join',{username,room},(error)=>{
            if(error){
                alert(error);
                // history.push('/');
                history.goBack();
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="chatPage">
            <UserWindow socket={socket}/>
            <MessageWindow socket={socket} />
        </div>
    )
}

export default ChatPage
