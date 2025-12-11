'use client';

import { useState } from 'react';
import UploadForm from './components/UploadForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-black"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-sm font-medium">AI-Powered Sustainability</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Transform Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                Furniture
              </span>
              <br />
              <span className="text-white">The Sustainable Way</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
              Upload a photo of your rental furniture and get instant AI-powered DIY transformation ideas. 
              Budget-friendly, renter-friendly, and planet-friendly solutions in seconds.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="text-sm text-gray-400">Renter-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">AI</div>
                <div className="text-sm text-gray-400">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">♻️</div>
                <div className="text-sm text-gray-400">Sustainable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Form Section */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-emerald-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              Start Your Transformation
            </h2>
            <p className="text-gray-400">
              Upload your furniture photo and let AI work its magic
            </p>
          </div>
          
          <UploadForm />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          How It <span className="text-emerald-400">Works</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Upload Photo',
              description: 'Take a photo of your furniture that needs a refresh'
            },
            {
              step: '02',
              title: 'Choose Style & Budget',
              description: 'Select your preferred style and set your budget limit'
            },
            {
              step: '03',
              title: 'Get AI Suggestions',
              description: 'Receive personalized DIY transformation ideas instantly'
            }
          ].map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-gray-900/50 border border-emerald-500/20 rounded-xl p-8 hover:border-emerald-500/40 transition-all">
                <div className="text-5xl font-bold text-emerald-500/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>Built with 💚 for sustainable living | UpcycleAI 2025</p>
        </div>
      </footer>
    </div>
  );
}
