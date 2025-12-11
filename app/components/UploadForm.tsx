'use client';

import { useState } from 'react';
import { Upload, DollarSign, Palette } from 'lucide-react';

type Style = 'Boho' | 'Modern' | 'Minimalist';

interface Transformation {
  item: string;
  action: string;
  cost: string;
}

interface AnalysisResult {
  title: string;
  transformations: Transformation[];
  total_cost: string;
  difficulty: string;
}

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<Style>('Modern');
  const [budget, setBudget] = useState<number>(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');

  const styles: Style[] = ['Boho', 'Modern', 'Minimalist'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setResult(null);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please upload an image first!');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Remove the data:image/...;base64, prefix
        const base64Image = base64String.split(',')[1];

        try {
          const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Image,
              style: selectedStyle,
              budget: budget,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to analyze image');
          }

          setResult(data);
          setIsAnalyzing(false);
        } catch (err) {
          console.error('Error analyzing image:', err);
          setError(err instanceof Error ? err.message : 'Failed to analyze image. Please try again.');
          setIsAnalyzing(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read image file. Please try again.');
        setIsAnalyzing(false);
      };
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Upload Furniture Photo
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-emerald-500/30 rounded-xl cursor-pointer bg-gray-900/50 hover:bg-gray-900/70 hover:border-emerald-500/50 transition-all"
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-white font-medium">Change Image</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <Upload className="w-12 h-12 text-emerald-500" />
                <span className="text-gray-300 font-medium">
                  Click to upload or drag and drop
                </span>
                <span className="text-gray-500 text-sm">
                  PNG, JPG, JPEG up to 10MB
                </span>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Style Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Preferred Style
        </label>
        <div className="grid grid-cols-3 gap-3">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                selectedStyle === style
                  ? 'bg-emerald-500 text-black border-2 border-emerald-400'
                  : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-emerald-500/50'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Slider */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Budget: ${budget}
        </label>
        <input
          type="range"
          min="25"
          max="500"
          step="25"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>$25</span>
          <span>$500</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedImage || isAnalyzing}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
          !selectedImage || isAnalyzing
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-black hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-500/50'
        }`}
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Analyzing...
          </span>
        ) : (
          'Get AI Suggestions'
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Info Text */}
      <p className="text-center text-sm text-gray-500">
        🔒 Your photos are processed securely and never stored
      </p>

      {/* Results Section */}
      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-500/30 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-emerald-400">{result.title}</h3>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
              {result.difficulty}
            </span>
          </div>

          <div className="space-y-3">
            {result.transformations.map((transformation, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-emerald-500/20">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{transformation.item}</h4>
                    <p className="text-gray-300 text-sm">{transformation.action}</p>
                  </div>
                  <span className="text-emerald-400 font-bold whitespace-nowrap">{transformation.cost}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-emerald-500/20 flex justify-between items-center">
            <span className="text-gray-300 font-medium">Total Estimated Cost:</span>
            <span className="text-2xl font-bold text-emerald-400">{result.total_cost}</span>
          </div>

          <button
            onClick={() => {
              setResult(null);
              setSelectedImage(null);
              setPreviewUrl('');
            }}
            className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
          >
            Try Another Image
          </button>
        </div>
      )}
    </form>
  );
}
