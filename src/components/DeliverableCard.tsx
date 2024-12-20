import React from 'react';
import { FileText, Image, Link } from 'lucide-react';
import { DeliverableProps } from '../types';

export function DeliverableCard({
  title,
  type,
  date,
  description,
  onClick,
}: DeliverableProps) {
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-yellow-400" />;
      case 'image':
        return <Image className="w-5 h-5 text-yellow-400" />;
      case 'link':
        return <Link className="w-5 h-5 text-yellow-400" />;
      default:
        return <FileText className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors text-left"
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div className="flex-1">
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
          <span className="text-xs text-gray-500 mt-1 block">{date}</span>
        </div>
      </div>
    </button>
  );
}