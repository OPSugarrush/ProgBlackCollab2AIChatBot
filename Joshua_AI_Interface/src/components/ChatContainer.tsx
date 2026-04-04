import InputBox from "./InputBox";
import MessageList from "./MessageList";
import type { Message } from "../type";
import { useState } from "react";

function ChatContainer(){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Updating message list 
    const onSendMessage = (message: Message) => {
        setMessages([...messages, message])
    } 

    return(<>
        <MessageList messages={messages}></MessageList>
        <InputBox onSendMessage={onSendMessage}></InputBox>
    </>)
}

export default ChatContainer