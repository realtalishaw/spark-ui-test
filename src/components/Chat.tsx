import React, { useEffect, useRef } from 'react';
import { ChatProps } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export function Chat({ messages, onSend, onOptionSelect }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onOptionSelect={onOptionSelect}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
}