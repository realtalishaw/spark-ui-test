import React from 'react';
import { X } from 'lucide-react';
import { Deliverable } from '../types';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliverable: Deliverable;
}

export function PDFViewerModal({ isOpen, onClose, deliverable }: PDFViewerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{deliverable.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="flex-1 p-4">
          {deliverable.type === 'pdf' ? (
            <iframe
              src={deliverable.url}
              className="w-full h-full rounded"
              title={deliverable.title}
            />
          ) : deliverable.type === 'image' ? (
            <img
              src={deliverable.url}
              alt={deliverable.title}
              className="max-w-full max-h-full mx-auto"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <a
                href={deliverable.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Open Link
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}