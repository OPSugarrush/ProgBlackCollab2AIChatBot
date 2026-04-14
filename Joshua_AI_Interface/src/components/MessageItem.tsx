// Individual bubbles (styles differ for "User" vs. "Assistant")
import "../index.css"
import type { Message } from "../type";
import systemIcon from "../assets/system-icon.jpg";
import userIcon from "../assets/user-icon.jpg";

function MessageItem(message: {message: Message}){
    const { content, sender, timestamp } = message.message;

    // Add an icon to determine who is user and who is system
    if (sender == "system"){ 
        return( <div className="message-item-system">
            <img src={systemIcon} alt="System Icon" className="system-icon" />
            <p>{content}</p>
        </div>)
    } 

    return(<div className="message-item-user">           
            <p>{content}</p>
            <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
    )
}

export default MessageItem