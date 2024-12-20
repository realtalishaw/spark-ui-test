import React from 'react';
import { ExternalLink, Globe, Clock } from 'lucide-react';
import { PreviewSectionProps } from '../types';

export function PreviewSection({ previewUrl, deploymentUrl, lastPublished, isPublished }: PreviewSectionProps) {
  if (!previewUrl && !deploymentUrl) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Site Preview"
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div>
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isPublished ? 'bg-green-500' : 'bg-yellow-400'}`} />
            <span className="text-white">{isPublished ? 'Published' : 'Draft'}</span>
          </div>
          {lastPublished && (
            <div className="flex items-center space-x-1 text-sm text-gray-400 mt-1">
              <Clock className="w-4 h-4" />
              <span>Last published {lastPublished}</span>
            </div>
          )}
        </div>
      </div>
      
      {deploymentUrl && (
        <a
          href={deploymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span>View Live Site</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}