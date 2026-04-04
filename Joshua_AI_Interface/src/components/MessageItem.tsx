// Individual bubbles (styles differ for "User" vs. "Assistant")
import type { Message } from "../type";

function MessageItem(message: {message: Message}){
    const { content, sender, timestamp } = message.message;

    return(
        // Little Icon to represent AI goes here
        <h1 className="message-item">           
            {sender === 'system' && null}
            {content}. {timestamp}
        </h1>
    )
    
}

export default MessageItem