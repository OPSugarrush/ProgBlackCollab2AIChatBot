import type { Message } from '../type';
import systemIcon from '../assets/system-icon.jpg';
import userIcon from '../assets/user-icon.jpg';

interface MessageItemProps {
  message: Message;
}

/** Renders one user or assistant chat bubble. */
function MessageItem({ message }: MessageItemProps) {
  const isSystemMessage = message.sender === 'system';
  const bubbleClassName = isSystemMessage
    ? `message-item-system ${message.status === 'error' ? 'message-error' : ''}`
    : 'message-item-user';

  return (
    <article className={bubbleClassName}>
      <div className={isSystemMessage ? 'message-contents-system' : 'message-contents-user'}>
        {isSystemMessage && <img src={systemIcon} alt="Chatbot" className="system-icon" />}
        {message.status === 'sending' ? (
          <div className="loader" role="status" aria-label="The chatbot is responding" />
        ) : (
          // Plain text avoids extra rendering dependencies and remains safe for
          // messages returned by the external AI service.
          <p className="message-text">{message.content}</p>
        )}
        {!isSystemMessage && <img src={userIcon} alt="User" className="user-icon" />}
      </div>
      <time className={isSystemMessage ? 'message-timestamp-system' : 'message-timestamp-user'}>
        {message.timestamp}
      </time>
    </article>
  );
}

export default MessageItem;
