// A scrollable area that maps through the messages
import { useEffect, useRef } from "react";
import type { Message } from "../type";
import MessageItem from "./MessageItem";

function MessageList(MessageInfo: {messages: Message[]}){
     // Ref to dummy div at end of message list
     const messagesEndRef = useRef<HTMLDivElement | null>(null);

     const scrollToBottom = () => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     };

     // UseEffect used to scroll to dummy div when messaage list changes
     useEffect(() => {
          scrollToBottom();
     }, [MessageInfo.messages]); 

     console.log("Message List:", MessageInfo.messages); // Check if messsages update correctly

     let messageItems = MessageInfo.messages.map((message, index) => <MessageItem key={index} message={message}/>)

     return(
          <div className="message-list">
               {messageItems}

               <div ref={messagesEndRef} />
          </div>  
     )

}

export default MessageList