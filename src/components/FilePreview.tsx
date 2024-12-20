import React from 'react';
import { X } from 'lucide-react';
import { FilePreviewProps } from '../types';

export function FilePreview({ files, onRemove }: FilePreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {files.map((file) => (
        <div
          key={file.name}
          className="relative group bg-gray-800 rounded-lg p-2 flex items-center"
        >
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center bg-gray-700 rounded">
              <span className="text-xs text-white text-center break-words p-1">
                {file.name}
              </span>
            </div>
          )}
          <button
            onClick={() => onRemove(file)}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}