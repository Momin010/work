
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
      <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800">
        <div className="flex items-center justify-center space-x-4">
          <AlertTriangle className="h-10 w-10 text-red-500 dark:text-red-400" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 text-left">Processing Failed</h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300 text-left">{message}</p>
          </div>
        </div>
        <button
          onClick={onRetry}
          className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
