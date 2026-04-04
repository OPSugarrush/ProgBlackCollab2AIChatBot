import { useState, type ChangeEvent } from 'react';
import type { Message } from '../type';
import type { InputBoxProps } from '../type';

function InputBox(inputProps: InputBoxProps){

    const [text, setText] = useState('');

    // Handling sending messages
    const handleSend = () => {
        let dateTime = new Date()

        const newMessage: Message = { 
            id: "CHANGE SOON",
            sender: "user",
            content: text,
            timestamp: dateTime.toLocaleTimeString()
        }
        
        inputProps.onSendMessage(newMessage)
        setText("") // Clear input box after sending
    }

    // Handling text change in input box
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => { setText(e.target.value) }

    return(
        <div className = "input-container">
            <textarea 
                className="chat-textarea" 
                placeholder="Type a message..."
                rows={1}
                value={text}
                maxLength={500}
                onChange={handleChange}
                disabled={inputProps.disabled}/>

            <button 
                className="sendButton" 
                onClick={handleSend}>
                Send
            </button>
        </div>     
    );
}

export default InputBox