import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { Message } from '../type';
import InputBox from './InputBox';
import MessageList from './MessageList';

const CHAT_API_URL = 'http://127.0.0.1:8000/chat';

/** Owns the conversation state and coordinates requests to the FastAPI server. */
function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /** Replace the placeholder at the exact position where it was added. */
  const replacePendingMessage = (messageId: string, replacement: Message) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.id === messageId ? replacement : message,
      ),
    );
  };

  const onSendMessage = async (content: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      content,
      timestamp,
      status: 'sent',
    };
    // A temporary entry is replaced once the request finishes, which prevents
    // the loading spinner from being left behind after an error.
    const pendingMessage: Message = {
      id: uuidv4(),
      sender: 'system',
      content: '',
      timestamp,
      status: 'sending',
    };

    setMessages((previousMessages) => [...previousMessages, userMessage, pendingMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: { response?: string } = await response.json();
      if (!data.response) {
        throw new Error('Server response did not contain chatbot text');
      }

      replacePendingMessage(pendingMessage.id, {
        ...pendingMessage,
        content: data.response,
        timestamp: new Date().toLocaleTimeString(),
        status: 'sent',
      });
    } catch (error) {
      console.error('Unable to contact the chatbot API:', error);
      replacePendingMessage(pendingMessage.id, {
        ...pendingMessage,
        content: 'Sorry, I could not communicate with the server. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="chat-container">
      <MessageList messages={messages} />
      <InputBox onSendMessage={onSendMessage} isLoading={isLoading} />
    </main>
  );
}

export default ChatContainer;
