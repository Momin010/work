
import React, { useState, useCallback } from 'react';
import { DashboardData } from './types';
import { processDataWithGemini } from './services/geminiService';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Loader from './components/ui/Loader';
import Header from './components/ui/Header';
import ErrorMessage from './components/ui/ErrorMessage';

type AppState = 'upload' | 'loading' | 'dashboard' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = useCallback(async (file: File) => {
    setAppState('loading');
    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) {
        setError('Failed to read file content.');
        setAppState('error');
        return;
      }

      try {
        const data = await processDataWithGemini(content);
        setDashboardData(data);
        setAppState('dashboard');
      } catch (err) {
        console.error(err);
        setError('Failed to process data. The AI model could not structure the provided file. Please try a different file or check the data format.');
        setAppState('error');
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
      setAppState('error');
    };
    reader.readAsText(file);
  }, []);
  
  const handleReset = useCallback(() => {
    setAppState('upload');
    setDashboardData(null);
    setError(null);
    setFileName('');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'upload':
        return <FileUpload onFileUpload={handleFileUpload} />;
      case 'loading':
        return <Loader text="Analyzing your data and generating visualizations..." />;
      case 'dashboard':
        return dashboardData && <Dashboard data={dashboardData} fileName={fileName} onReset={handleReset} />;
      case 'error':
        return <ErrorMessage message={error || 'An unknown error occurred.'} onRetry={handleReset} />;
      default:
        return <FileUpload onFileUpload={handleFileUpload} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-xs text-gray-400 dark:text-gray-600">
        <p>Powered by Google Gemini. Not for production use.</p>
      </footer>
    </div>
  );
};

export default App;
