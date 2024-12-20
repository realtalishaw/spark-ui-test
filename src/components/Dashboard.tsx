import React, { useState } from 'react';
import { ProjectStatus } from '../types';
import { Lock, CheckCircle, Circle, Zap, Settings, CreditCard, LogOut, Upload, Edit2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ProjectFiles } from './ProjectFiles';
import { StatusDetails } from './StatusDetails';

interface DashboardProps {
  companyName: string;
  projectStatuses: ProjectStatus[];
  deliverables: any[];
  onUpdateCompanyName: (name: string) => void;
}

export function Dashboard({ companyName, projectStatuses, deliverables, onUpdateCompanyName }: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(companyName);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim()) {
      await onUpdateCompanyName(editedName.trim());
      setIsEditing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Circle className="w-6 h-6 text-yellow-400" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            {isEditing ? (
              <form onSubmit={handleNameSubmit} className="flex items-center">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-1 rounded-lg focus:ring-2 focus:ring-yellow-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-2 text-yellow-400 hover:text-yellow-300"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">{companyName}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-gray-400 hover:text-yellow-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700"
            >
              <span className="text-lg">A</span>
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1">
                <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Project Status</h2>
              <div className="space-y-4">
                {projectStatuses.map((status, index) => (
                  <button
                    key={status.name}
                    onClick={() => status.status !== 'locked' && setSelectedStatus(status.name)}
                    className={`w-full flex items-center p-4 rounded-lg transition-colors ${
                      status.status === 'locked'
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="mr-4">{getStatusIcon(status.status)}</div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white">{status.name}</h3>
                      <p className="text-sm text-gray-400">{status.description}</p>
                      {status.status !== 'locked' && (
                        <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              status.status === 'completed'
                                ? 'bg-green-500'
                                : 'bg-yellow-400'
                            }`}
                            style={{ width: `${status.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {status.status === 'in-progress' && (
                      <div className="ml-4 text-yellow-400 text-sm">In Progress</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <ProjectFiles deliverables={deliverables} />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </button>
                <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {selectedStatus && (
              <StatusDetails
                status={projectStatuses.find((s) => s.name === selectedStatus)!}
                onClose={() => setSelectedStatus(null)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}