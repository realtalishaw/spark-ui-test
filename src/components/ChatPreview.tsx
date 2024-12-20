import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Message } from '../types';
import { ChatInput } from './ChatInput';

interface ChatPreviewProps {
  messages: Message[];
  isOpen: boolean;
  onToggle: () => void;
  onSend: (message: string) => void;
}

export function ChatPreview({ messages, isOpen, onToggle, onSend }: ChatPreviewProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 w-96 bg-gray-800 rounded-lg shadow-xl transition-transform ${
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'
      }`}
    >
      <div
        className="p-4 border-b border-gray-700 flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-yellow-400" />
          <span className="font-medium text-white">Chat with Spark</span>
        </div>
        <button className="p-1 hover:bg-gray-700 rounded-full transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {isOpen && (
        <>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'spark' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'spark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-yellow-400 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-700">
            <ChatInput onSend={onSend} placeholder="Type a message..." />
          </div>
        </>
      )}
    </div>
  );
}