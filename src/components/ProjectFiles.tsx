import React from 'react';
import { FileText, Upload } from 'lucide-react';

interface ProjectFilesProps {
  deliverables: any[];
}

export function ProjectFiles({ deliverables }: ProjectFilesProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Project Files</h2>
      
      {deliverables.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No files yet</h3>
          <p className="text-gray-400 mb-4">
            Upload files or wait for Spark to generate project deliverables
          </p>
          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors inline-flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {deliverables.map((file) => (
            <div
              key={file.id}
              className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
              <FileText className="w-5 h-5 text-yellow-400 mr-3" />
              <div>
                <h3 className="text-white font-medium">{file.name}</h3>
                <p className="text-sm text-gray-400">{file.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}