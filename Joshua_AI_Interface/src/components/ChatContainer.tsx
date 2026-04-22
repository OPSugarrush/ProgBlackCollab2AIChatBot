import InputBox from "./InputBox";
import MessageList from "./MessageList";
import type { Message } from "../type";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

function ChatContainer(){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Updating message list 
    const onSendMessage = async (message: Message) => {
        console.log("New Message:", message); // Debugging log
        setMessages(prevMessages => [...prevMessages, message])

        // Get response from backend
        const response = fetch('http://127.0.0.1:8000/chat', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message.content)
            })
            
        if ((await response).ok) 
            {
                const responseData = (await response).text()
                console.log("Response from backend:", responseData); 

                setIsLoading(true)
                setTimeout(() => {
                    const systemMessage: Message = {
                        id: uuidv4(),
                        sender: 'system',
                        content: `Echo: ${message.content}`,
                        timestamp: new Date().toLocaleTimeString(),
                    }
                    setMessages(prevMessage => [...prevMessage, systemMessage])
                    setIsLoading(false)
                }, 1000) // Delay to simulate response time
            }
        else {
            console.error("Failed to fetch response from backend");
            setIsLoading(true)

            setTimeout(() => {
                const errorMessage: Message = {
                    id: uuidv4(),
                    sender: 'system',
                    content: `Error: Failed to fetch response from backend`,
                    timestamp: new Date().toLocaleTimeString(),
                    status: 'error'
                }
                setMessages(prevMessage => [...prevMessage, errorMessage])
                setIsLoading(false)
            }, 200)
        }
    } 

    return(<div className="chat-container">
        <MessageList messages={messages}></MessageList>
        <InputBox onSendMessage={onSendMessage} isLoading={isLoading} setLoading={setIsLoading}></InputBox>
    </div>)
}

export default ChatContainer