export type QuestionType = 'text' | 'email' | 'phone' | 'url' | 'boolean' | 'multiple';

export interface Question {
  question: string;
  type?: QuestionType;
  options?: string[];
  note?: string;
  section?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'spark';
  options?: string[];
  type?: QuestionType;
  note?: string;
}

export interface ChatProps {
  messages: Message[];
  onSend: (message: string) => void;
  onOptionSelect?: (option: string) => void;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface ChatMessageProps {
  message: Message;
  onOptionSelect?: (option: string) => void;
}

export interface ProjectStatus {
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}