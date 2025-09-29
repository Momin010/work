
import React from 'react';
import { DashboardData } from '../types';
import WidgetRenderer from './WidgetRenderer';
import { RefreshCcw, FileText } from 'lucide-react';

interface DashboardProps {
  data: DashboardData;
  fileName: string;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, fileName, onReset }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
          <p className="mt-2 text-md text-gray-600 dark:text-gray-300 max-w-4xl">{data.summary}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FileText className="w-4 h-4 mr-2" />
            <span>Source: {fileName}</span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-950 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Analyze New Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {data.widgets.map((widget) => (
          <WidgetRenderer key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
