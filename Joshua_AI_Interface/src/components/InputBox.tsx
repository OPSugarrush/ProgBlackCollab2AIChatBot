import { useEffect, useState, type ChangeEvent } from 'react';
import type { Message } from '../type';
import type { InputBoxProps } from '../type';
import { v4 as uuid } from 'uuid';
import sendButtonImage from '../assets/paperplane.png';

function InputBox(inputProps: InputBoxProps){

    const [text, setText] = useState('');

    // Button style changes when loading state changes
    useEffect(() => {
        changeButtonDesign();
    }, [inputProps.isLoading])

    const changeButtonDesign = () => {
        const sendButton = document.querySelector('.sendButton') as HTMLButtonElement | null;
        if (sendButton) {
            if (inputProps.isLoading) {
                sendButton.style.backgroundColor = '#ccc'; 
                sendButton.style.cursor = 'not-allowed';
            } else {
                sendButton.style.backgroundColor = '#4CAF50';
                sendButton.style.cursor = 'pointer';
            }
        }
    }
    // Handling sending messages
    const handleSend = () => {        
        const newMessage: Message = { 
            id: uuid(),
            sender: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString()
        }
        
        inputProps.onSendMessage(newMessage)
        inputProps.setLoading(true)
        setText("") // Clear input box after sending
    }

    // Handles keypresses in textarea
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Handling text change in input box
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => 
        { 
            const target = e.target;           

            setText(target.value);

            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
        }

    return(
        <div className = "input-container">
            <textarea 
                className="chat-textarea" 
                placeholder="Type a message..."
                rows={1}
                value={text}
                maxLength={500}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={inputProps.isLoading}/>

            <button 
                className="sendButton" 
                onClick={handleSend}
                disabled={inputProps.isLoading || text.trim() === ""}>
                <img src={sendButtonImage} alt="Send" className='send-button-img' height={50} width={50}/>
            </button>
        </div>     
    );
}

export default InputBox