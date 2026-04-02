// Individual bubbles (styles differ for "User" vs. "Assistant")
import type { Message } from "../type";

function MessageItem(message: Message){
    const { content, sender } = message;

    return(
        <h1 className="message-item">
            // Little Icon to represent AI goes here
            {sender === 'system' && null}
            {content}
        </h1>
    )
    
}

export default MessageItem