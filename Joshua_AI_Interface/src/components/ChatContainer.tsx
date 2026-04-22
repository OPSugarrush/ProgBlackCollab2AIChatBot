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
         try {
            const response = await fetch('http://127.0.0.1:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message.content })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Response from backend:", data);

                // Create the bot message and add it to the message list
                const systemMessage: Message = {
                    id: uuidv4(),
                    sender: 'system',
                    content: data.response,
                    timestamp: new Date().toLocaleTimeString(),
                    status: 'sent'
                };
               
                setMessages(prevMessage => [...prevMessage, systemMessage]);
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to fetch response from backend", error);
            const errorMessage: Message = {
                id: uuidv4(),
                sender: 'system',
                content: `Error: Failed to communicate with the server.`,
                timestamp: new Date().toLocaleTimeString(),
                status: 'error'
            };
            setMessages(prevMessage => [...prevMessage, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    } 

    return(<div className="chat-container">
        <MessageList messages={messages}></MessageList>
        <InputBox onSendMessage={onSendMessage} isLoading={isLoading} setLoading={setIsLoading}></InputBox>
    </div>)
}

export default ChatContainer