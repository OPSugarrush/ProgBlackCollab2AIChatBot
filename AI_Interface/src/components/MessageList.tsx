import { useEffect, useRef } from 'react';

import type { Message } from '../type';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
}

/** Displays messages and keeps the newest reply in view. */
function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="message-list" aria-live="polite" aria-label="Conversation">
      {messages.length === 0 && (
        <p className="start-typing">Start typing to chat with the bot...</p>
      )}
      {messages.map((message) => (
        // The generated ID is a stable key when a pending response is replaced.
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </section>
  );
}

export default MessageList;
