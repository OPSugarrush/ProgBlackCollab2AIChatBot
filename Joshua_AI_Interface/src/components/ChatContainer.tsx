import InputBox from "./InputBox";
import MessageList from "./MessageList";
import type { Message } from "../type";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

function ChatContainer(){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showStartTyping, setShowStartTyping] = useState(true);
    const [messageReceived, setMessageReceived] = useState(false);

    useEffect(() => {
        if(messages.length > 0){
            setShowStartTyping(false);
        }
    }, [messages]);

    // Updating message list 
    const onSendMessage = async (message: Message) => {
        setMessageReceived(false);
        console.log("New Message:", message); // Debugging log
        setMessages(prevMessages => [...prevMessages, message])

        // Add loading message to message list
        const loadingMessage: Message = {
            id: uuidv4(),
            sender: 'system',
            content: '',
            timestamp: new Date().toLocaleTimeString(),
        }
        setMessages(prevMessages => [...prevMessages, loadingMessage]);

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
                setMessageReceived(true);

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
               

                setMessages(prevMessages => {
                    const updatedMessages = prevMessages.map(msg => 
                    msg.id === loadingMessage.id ? systemMessage : msg);
                    return updatedMessages;
                });
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        } catch (error) {
            setMessageReceived(true);

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
        <MessageList messages={messages} showStartTyping={showStartTyping} messageReceived={messageReceived}></MessageList>
        <InputBox onSendMessage={onSendMessage} isLoading={isLoading} setLoading={setIsLoading}></InputBox>
    </div>)
}

export default ChatContainer