import InputBox from "./InputBox";
import MessageList from "./MessageList";
import type { Message } from "../type";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

function ChatContainer(){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Updating message list 
    const onSendMessage = (message: Message) => {
        console.log("New Message:", message); // Debugging log
        setMessages(prevMessages => [...prevMessages, message])

        // Simulate system response after user sends a message
        setIsLoading(true)
        setTimeout(() => {
            const systemMessage: Message = {
                id: uuidv4(),
                sender: 'system',
                content: `Echo: ${message.content}`,
                timestamp: new Date().toISOString(),
            }
            setMessages(prevMessage => [...prevMessage, systemMessage])
            setIsLoading(false)
        }, 1000) // Delay to simulate response time
    } 

    return(<div className="chat-container">
        <MessageList messages={messages}></MessageList>
        <InputBox onSendMessage={onSendMessage} isLoading={isLoading} setLoading={setIsLoading}></InputBox>
    </div>)
}

export default ChatContainer