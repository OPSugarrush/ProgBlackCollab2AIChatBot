import { useState } from 'react';
import type { InputBoxProps } from '../type';

function InputBox(inputProps: InputBoxProps){

    const [text, setText] = useState('');

    // Handling sending messages
    const sendMessage = () => {}

    // Handling text change in input box
    const addToText = () => {}

    return(
        <div className = "input-container">
            <textarea 
                className="chat-textarea" 
                placeholder="Type a message..."
                rows={1}
                value={text}
                maxLength={500}
                onChange={addToText}
                disabled={inputProps.disabled}/>

            <button 
                className="sendButton" 
                onClick={sendMessage}>
                Send
            </button>
        </div>     
    );
}

export default InputBox