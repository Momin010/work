
import React from 'react';
import { StatWidgetData } from '../../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatWidgetProps {
  data: StatWidgetData;
}

const StatWidget: React.FC<StatWidgetProps> = ({ data }) => {
  const isIncrease = data.changeType === 'increase';
  
  return (
    <div className="flex flex-col justify-center h-full">
      <p className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{data.value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{data.description}</p>
      {data.change && (
        <div className={`mt-4 flex items-center text-sm font-medium ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          {isIncrease ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          <span>{data.change}</span>
        </div>
      )}
    </div>
  );
};

export default StatWidget;
