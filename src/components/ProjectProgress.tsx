import React from 'react';
import { Lock, CheckCircle, Circle, ArrowRight, MessageSquare } from 'lucide-react';
import { ProjectStatus } from '../types';

interface ProjectProgressProps {
  statuses: ProjectStatus[];
  currentIndex: number;
  onStatusClick: (status: ProjectStatus) => void;
}

export function ProjectProgress({ statuses, currentIndex, onStatusClick }: ProjectProgressProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Project Progress</h2>
      <div className="space-y-4">
        {statuses.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLocked = index > currentIndex;

          return (
            <div
              key={status.name}
              className={`relative flex items-center ${
                isLocked ? 'opacity-50' : ''
              }`}
            >
              {/* Status Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-500'
                    : isCurrent
                    ? 'bg-yellow-400'
                    : 'bg-gray-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : isLocked ? (
                  <Lock className="w-6 h-6 text-gray-400" />
                ) : (
                  <Circle className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Status Content */}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {status.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {isCurrent && (
                      <button
                        onClick={() => onStatusClick(status)}
                        className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        title="Open chat for this section"
                      >
                        <MessageSquare className="w-4 h-4 text-yellow-400" />
                      </button>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {isCompleted
                        ? 'Completed'
                        : isCurrent
                        ? 'In Progress'
                        : 'Locked'}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-1">{status.description}</p>
                {!isLocked && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-500 w-full'
                          : isCurrent
                          ? 'bg-yellow-400'
                          : ''
                      }`}
                      style={{
                        width: isCompleted
                          ? '100%'
                          : isCurrent
                          ? `${status.progress}%`
                          : '0%',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {index < statuses.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-600 -mb-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}