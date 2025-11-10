import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { AppTheme, Color, COLORS } from './types';
import { generateArtImage } from './services/geminiService';
import Spinner from './components/Spinner';
import { SunIcon, MoonIcon, UploadIcon } from './components/Icons';

// Helper Components (defined in the same file for simplicity)

interface ApiKeyModalProps {
  onSave: (key: string) => void;
  isOpen: boolean;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, isOpen }) => {
  const [key, setKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enter Gemini API Key</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          To use Heart Beats Art, you need a Google Gemini API key. Your key is stored locally and never sent to our servers.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Your API Key"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onSave(key)}
          disabled={!key}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [apiKey, setApiKey] = useLocalStorage<string | null>('gemini-api-key', null);
  const [theme, setTheme] = useLocalStorage<AppTheme>('app-theme', AppTheme.LIGHT);
  const [selectedColor, setSelectedColor] = useState<Color>('Blue');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (theme === AppTheme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCsvFile(event.target.files[0]);
      setError(null);
      setGeneratedImage(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!apiKey) {
      setError("Please set your API Key first.");
      return;
    }
    if (!csvFile) {
      setError("Please upload a CSV file with BPM data.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const csvContent = await csvFile.text();
      if (!csvContent.trim()) {
        throw new Error("The selected CSV file is empty.");
      }
      const imageB64 = await generateArtImage(apiKey, csvContent, selectedColor);
      setGeneratedImage(`data:image/jpeg;base64,${imageB64}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, csvFile, selectedColor]);

  const colorClasses: { [key in Color]: string } = {
    Blue: 'bg-blue-heart',
    Green: 'bg-green-heart',
    Red: 'bg-red-heart',
    Yellow: 'bg-yellow-heart',
    Purple: 'bg-purple-heart',
    Orange: 'bg-orange-heart',
    Pink: 'bg-pink-heart',
  };

  return (
    <>
      <ApiKeyModal isOpen={!apiKey} onSave={setApiKey} />
      <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Header */}
        <header className="p-4 flex justify-between items-center shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg sticky top-0 z-10">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            HeartBeatsArt
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setApiKey(null)}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Manage Key
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === AppTheme.LIGHT ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="container mx-auto p-4 md:p-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">❤️ Heart 🎵 Beats Art 🎨</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the color that best represents your emotion, upload a CSV file with your heart rate data (BPMs), and let Google Gemini AI create a unique masterpiece — a visual portrait of a moment in time that will never leave your memory!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-8">
              {/* Step 1: Color */}
              <div>
                <h3 className="text-xl font-semibold mb-4">1. Choose a Favorite Color</h3>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-14 w-14 rounded-full transition-all duration-300 ${colorClasses[color]} ${
                        selectedColor === color ? 'ring-4 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900 ring-blue-500 scale-110' : 'hover:scale-110'
                      }`}
                      aria-label={`Select ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 2: Upload */}
              <div>
                <h3 className="text-xl font-semibold mb-4">2. Upload Heart Rate Data</h3>
                <p>A column with BPMs data is required!</p>
                <a
                  className="inline-block px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 text-white font-semibold rounded-lg shadow-md hover:from-teal-300 hover:via-teal-400 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  href="https://ik.imagekit.io/fredsrocha/github/rp/cloud-run-2025/Wearable-Dataset_2025-11-08_18-29-40.CSV?updatedAt=1762800183413"
                  target="_blank">Download Wareable data (example)</a>
                <br/>
                <br/>
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {csvFile ? <span className="font-semibold text-green-500">{csvFile.name}</span> : 'Click to upload a .csv file'}
                  </p>
                  <p className="text-xs text-gray-500">Any CSV with heart rate values</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv,text/csv"
                    className="hidden"
                  />
                </div>
              </div>

              {/* Step 3: Generate */}
              <div>
                <button
                  onClick={handleGenerateClick}
                  disabled={isLoading || !csvFile}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-4 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Creating Magic...' : 'Generate Art'}
                </button>
              </div>
            </div>

            {/* Display */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg aspect-square flex items-center justify-center">
              {isLoading && <Spinner />}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {generatedImage && !isLoading && !error && (
                <img src={generatedImage} alt="Generated abstract art from heart beats" className="rounded-lg object-contain w-full h-full" />
              )}
              {!isLoading && !error && !generatedImage && (
                <div className="text-center text-gray-500">
                  <p className="text-2xl font-semibold">Your Art Will Appear Here</p>
                  <p>Follow the steps to create your masterpiece.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
