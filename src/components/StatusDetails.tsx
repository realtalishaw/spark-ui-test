import React from 'react';
import { X } from 'lucide-react';
import { ProjectStatus } from '../types';

interface StatusDetailsProps {
  status: ProjectStatus;
  onClose: () => void;
}

export function StatusDetails({ status, onClose }: StatusDetailsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">{status.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Description</h3>
          <p className="text-white mt-1">{status.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400">Progress</h3>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                status.status === 'completed' ? 'bg-green-500' : 'bg-yellow-400'
              }`}
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-400 mt-1">
            {status.progress}% Complete
          </span>
        </div>

        {status.status === 'completed' && (
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Deliverables</h3>
            {/* Add deliverables list here */}
          </div>
        )}
      </div>
    </div>
  );
}