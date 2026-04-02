export interface Message {
  id: string;
  sender: 'user' | 'system';
  content: string;
  timestamp: number;
  // Optional: For handling errors or "retry" logic
  status?: 'sending' | 'sent' | 'error';
}

export interface InputBoxProps {
  // Attributes passed to InputBox component
    onSendMessage: (message: string) => void;
    disabled?: boolean
    placeholder?: string
}