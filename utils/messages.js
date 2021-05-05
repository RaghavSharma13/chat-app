const moment=require('moment');

const generateMessage=(username,text)=>{
    return {
        username,
        msg:text,
        createdAt:moment(new Date().getTime()).format('h:mm a')
    }
}
module.exports={
    generateMessage
}