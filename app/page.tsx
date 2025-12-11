"use client"; // <--- THIS IS LIKELY WHAT WAS MISSING

import { useState } from "react";
// If you have a separate ResultDisplay component, import it. 
// If not, we can render it simply right here to be safe.

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [style, setStyle] = useState("Modern");
  const [budget, setBudget] = useState(50);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload an image first!");
    
    setLoading(true);
    
    try {
      // Convert image to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result;
        
        // Send to API
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            image: base64Image, 
            style, 
            budget 
          }),
        });

        const data = await response.json();
        setResult(data);
        setLoading(false);
      };
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-green-400">UpcycleAI</h1>
          <p className="text-xl text-gray-300">Turn ugly furniture into luxury for cheap.</p>
        </div>

        {/* INPUT FORM */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 space-y-6">
          
          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
            <input type="file" onChange={handleFileChange} className="text-white" />
            <p className="mt-2 text-sm text-gray-500">Upload your furniture photo</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Style</label>
              <select 
                value={style} 
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-gray-800 p-3 rounded-lg text-white"
              >
                <option>Modern</option>
                <option>Boho</option>
                <option>Industrial</option>
                <option>Minimalist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Budget: ${budget}</label>
              <input 
                type="range" 
                min="10" 
                max="200" 
                value={budget} 
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-all"
          >
            {loading ? "Analyzing with AI..." : "Get Renovations"}
          </button>
        </div>

        {/* RESULTS DISPLAY */}
        {result && (
          <div className="bg-gray-800 p-6 rounded-2xl border border-green-500/30 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4">{result.title}</h2>
            
            <div className="flex gap-4 mb-6">
              <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm">
                Cost: {result.total_cost}
              </span>
              <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                Difficulty: {result.difficulty}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-300">Steps:</h3>
              <ul className="space-y-3">
                {result.transformations?.map((t: any, i: number) => (
                  <li key={i} className="flex items-start gap-3 bg-gray-900 p-3 rounded-lg">
                    <span className="text-green-400 font-bold">✓</span>
                    <div>
                      <span className="block font-bold text-white">{t.item}</span>
                      <span className="text-gray-400 text-sm">{t.action}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}