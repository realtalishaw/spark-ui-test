import React from 'react';
import { Zap, Rocket, Target, Users, Palette, Globe, Sparkles, ArrowRight, BarChart3, Shield, Lightbulb } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">SPARK</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your AI Cofounder for
            <span className="text-yellow-400 block">Startup Success</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your business idea into reality with Spark. We combine AI-powered strategy, 
            automated execution, and expert guidance to help you build and scale your startup.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="bg-yellow-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Launch Faster</h3>
            <p className="text-gray-400">
              Go from idea to launch in days, not months. Our AI automates everything from market research to website creation.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="bg-yellow-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Market Intelligence</h3>
            <p className="text-gray-400">
              Get real-time market insights, competitor analysis, and customer behavior data to make informed decisions.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <div className="bg-yellow-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
            <p className="text-gray-400">
              Understand your audience deeply with AI-driven persona creation and targeted marketing strategies.
            </p>
          </div>
        </div>

        {/* What You Get Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/10 p-2 rounded">
                <Palette className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Brand Development</h3>
                <p className="text-gray-400">Professional logo design, brand guidelines, and visual identity creation.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/10 p-2 rounded">
                <Globe className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Website Creation</h3>
                <p className="text-gray-400">Custom-designed, high-converting landing pages and full website development.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/10 p-2 rounded">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Growth Strategy</h3>
                <p className="text-gray-400">Data-driven marketing plans, SEO optimization, and conversion tracking.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/10 p-2 rounded">
                <Shield className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Setup</h3>
                <p className="text-gray-400">Domain registration, hosting, analytics, and security configuration.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How Spark Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Share Your Vision</h3>
              <p className="text-gray-400">Tell us about your business idea and goals</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-400">Our AI analyzes market opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Strategy Creation</h3>
              <p className="text-gray-400">Get your personalized growth plan</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-400/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Launch & Grow</h3>
              <p className="text-gray-400">Execute and scale with AI guidance</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <div className="bg-gray-900 rounded-2xl p-12 max-w-4xl mx-auto border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Startup?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are building successful businesses with Spark. 
              Get started today and turn your vision into reality.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-800">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">© 2024 Spark AI. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}