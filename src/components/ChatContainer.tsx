import InputBox from "./InputBox";
import type { Message } from "../type";
import { useState } from "react";

function ChatContainer(){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Updating message list 
    const addMessage = (message: Message) => setMessages([...messages, message])

    return(<InputBox></InputBox>)
}

export default ChatContainer