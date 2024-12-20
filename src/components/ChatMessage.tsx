import React from 'react';
import { ChatMessageProps } from '../types';
import { Zap } from 'lucide-react';

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  const isSpark = message.sender === 'spark';

  return (
    <div
      className={`flex ${isSpark ? 'justify-start' : 'justify-end'} items-start`}
    >
      {isSpark && (
        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
          <Zap className="w-5 h-5 text-black" />
        </div>
      )}
      <div className="max-w-[80%]">
        <div
          className={`rounded-lg p-4 ${
            isSpark
              ? 'bg-gray-800 text-white'
              : 'bg-yellow-400 text-black ml-auto'
          }`}
        >
          {message.text}
          {message.note && (
            <div className="mt-2 text-sm text-gray-400">{message.note}</div>
          )}
        </div>
        {message.options && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.options.map((option) => (
              <button
                key={option}
                onClick={() => onOptionSelect?.(option)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {message.type === 'boolean' && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onOptionSelect?.('Yes')}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => onOptionSelect?.('No')}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}