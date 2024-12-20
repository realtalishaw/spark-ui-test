import React from 'react';
import { FormStepProps } from '../types';

export function FormStep({
  section,
  formData,
  onChange,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
}: FormStepProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {section.title}
      </h2>
      <div className="space-y-6">
        {section.questions.map((q, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {q.question}
              {q.note && (
                <span className="ml-2 text-sm text-gray-500">({q.note})</span>
              )}
            </label>
            {q.type === 'boolean' ? (
              <div className="flex space-x-4">
                <button
                  onClick={() => onChange(`${section.title}_${idx}`, true)}
                  className={`px-4 py-2 rounded-md ${
                    formData[`${section.title}_${idx}`] === true
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => onChange(`${section.title}_${idx}`, false)}
                  className={`px-4 py-2 rounded-md ${
                    formData[`${section.title}_${idx}`] === false
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            ) : q.options ? (
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => onChange(`${section.title}_${idx}`, option)}
                    className={`px-4 py-2 rounded-md text-left ${
                      formData[`${section.title}_${idx}`] === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type={q.type || 'text'}
                value={formData[`${section.title}_${idx}`] || ''}
                onChange={(e) =>
                  onChange(`${section.title}_${idx}`, e.target.value)
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter your ${q.question.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {!isFirstStep && (
          <button
            onClick={onPrev}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
        )}
        <button
          onClick={onNext}
          className="ml-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {isLastStep ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}