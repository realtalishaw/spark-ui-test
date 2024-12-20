import React from 'react';
import { Zap } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
      <h2 className="mt-4 text-2xl font-bold text-white">Analyzing your business...</h2>
      <p className="mt-2 text-gray-400">We're preparing your personalized growth strategy</p>
    </div>
  );
}