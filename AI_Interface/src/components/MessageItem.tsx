// Individual bubbles (styles differ for "User" vs. "Assistant")
import "../index.css"
import type { Message } from "../type";
import systemIcon from "../assets/system-icon.jpg";
import userIcon from "../assets/user-icon.jpg";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function MessageItem(message: {message: Message, index: number, messageListLength: number, messageReceived: boolean}) {
    const { content, sender, timestamp } = message.message;
    console.log("Conditions met for loader:", message.index == message.messageListLength - 1 && !message.messageReceived); // Check if conditions for loader are correct

    // Add an icon to determine who is user and who is system
    if (sender == "system"){ 
        return( 
        <div className="message-item-system">
            <div className="message-contents-system">
                <img src={systemIcon} alt="System Icon" className="system-icon" />
                {(message.index == message.messageListLength - 1 && message.messageReceived == false) ? <div className="loader"></div> : null}
                <div className="message-text-system">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                        // This "code" function handles syntax highlighting for code blocks
                        code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                            ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                            );
                        },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="message-timestamp-system">
                <p>{timestamp}</p>
            </div>         
        </div>)
    } 

    return(<div className="message-item-user">  
        <div className="message-contents-user">
            <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                    // This "code" function handles syntax highlighting for code blocks
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                        <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                        ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        );
                    },
                    }}
                >
                    {content}
            </ReactMarkdown>
            <img src={userIcon} alt="User Icon" className="user-icon" />
        </div>
        <div className="message-timestamp-user">
            <p>{timestamp}</p>
        </div>
        </div>
    )
}

export default MessageItem