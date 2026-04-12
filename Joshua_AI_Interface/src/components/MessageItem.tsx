// Individual bubbles (styles differ for "User" vs. "Assistant")
import "../index.css"
import type { Message } from "../type";

function MessageItem(message: {message: Message}){
    const { content, sender, timestamp } = message.message;
    // Add an icon to determine who is user and who is system
    if (sender == "system"){ 
        return( <div className="message-item-system">
        <h3>{content}</h3>
        </div>)
    } 

    return(<div className="message-item-user">
        <h3>{content}</h3>
        </div>
    )
}

export default MessageItem