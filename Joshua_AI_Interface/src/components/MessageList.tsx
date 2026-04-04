// A scrollable area that maps through the messages
import type { Message } from "../type";
import MessageItem from "./MessageItem";

function MessageList(MessageInfo: {messages: Message[]}){
     // Use MessageItem for each message
     let messageItems = MessageInfo.messages.map(mesg => <MessageItem message={mesg}/>)

     return(
          <div className="message-list">
               {messageItems}
          </div>
     )

}

export default MessageList