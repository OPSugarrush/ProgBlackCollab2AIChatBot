export interface Message {
  id: string;
  sender: 'user' | 'system';
  content: string;
  timestamp: string;
  // Optional: For handling errors or "retry" logic
  status?: 'sending' | 'sent' | 'error';
}

export interface InputBoxProps {
  // Attributes passed to InputBox component
    onSendMessage: (message: Message) => void;
    isLoading?: boolean
    placeholder?: string
    setLoading: (loading: boolean) => void;
}