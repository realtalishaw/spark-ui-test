import React from 'react';
import { StepIndicatorProps } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={`h-0.5 w-4 ${
                index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          )}
          {index < currentStep ? (
            <CheckCircle2 className="w-6 h-6 text-blue-500" />
          ) : index === currentStep ? (
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
              {index + 1}
            </div>
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}