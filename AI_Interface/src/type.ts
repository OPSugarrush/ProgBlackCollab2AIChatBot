/** A single entry shown in the conversation window. */
export interface Message {
  id: string;
  sender: 'user' | 'system';
  content: string;
  timestamp: string;
  /** Used to show the in-progress state and API errors in the UI. */
  status?: 'sending' | 'sent' | 'error';
}

/** Props required by the component that collects a new user message. */
export interface InputBoxProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}
