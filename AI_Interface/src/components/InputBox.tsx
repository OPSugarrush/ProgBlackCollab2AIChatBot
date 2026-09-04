import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import type { InputBoxProps } from '../type';
import sendButtonImage from '../assets/paperplane.png';

/** Collects a message and lets the parent component send it to the API. */
function InputBox({ onSendMessage, isLoading }: InputBoxProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const message = text.trim();
    if (!message || isLoading) return;

    onSendMessage(message);
    setText('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits, while Shift + Enter keeps the standard multiline input.
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    // Resize only this component's textarea instead of querying the document.
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 90)}px`;
    }
  };

  return (
    <section className="input-container" aria-label="Send a message">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder="Type a message..."
        rows={1}
        value={text}
        maxLength={500}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button
        className="sendButton"
        type="button"
        onClick={handleSend}
        disabled={isLoading || !text.trim()}
        aria-label="Send message"
      >
        <img src={sendButtonImage} alt="" className="send-button-img" height={32} width={32} />
      </button>
    </section>
  );
}

export default InputBox;
