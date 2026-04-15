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
            <div className="message-contents-system">
                <img src={systemIcon} alt="System Icon" className="system-icon" />
                <p>{content}</p>
            </div>
            <div className="message-timestamp-system">
                <p>{timestamp}</p>
            </div>         
        </div>)
    } 

    return(<div className="message-item-user">  
        <div className="message-contents-user">
            <p>{content}</p>
            <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
        <div className="message-timestamp-user">
            <p>{timestamp}</p>
        </div>
        </div>
    )
}

export default MessageItem