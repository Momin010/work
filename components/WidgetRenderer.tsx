
import React from 'react';
import { Widget, ChartType } from '../types';
import BarChartWidget from './charts/BarChartWidget';
import PieChartWidget from './charts/PieChartWidget';
import StatWidget from './charts/StatWidget';
import LineChartWidget from './charts/LineChartWidget';
import Card from './ui/Card';

interface WidgetRendererProps {
  widget: Widget;
}

const gridSpanClasses: { [key: number]: string } = {
  1: 'lg:col-span-2',
  2: 'lg:col-span-3',
  3: 'lg:col-span-6',
};

const WidgetRenderer: React.FC<WidgetRendererProps> = ({ widget }) => {
  const className = `md:col-span-1 ${gridSpanClasses[widget.gridSpan] || 'lg:col-span-2'}`;
  
  const renderWidget = () => {
    switch (widget.type) {
      case ChartType.Bar:
        return <BarChartWidget data={widget.data} dataKeys={widget.dataKeys} />;
      case ChartType.Pie:
        return <PieChartWidget data={widget.data} />;
      case ChartType.Stat:
        return <StatWidget data={widget.data} />;
       case ChartType.Line:
        return <LineChartWidget data={widget.data} dataKeys={widget.dataKeys} />;
      default:
        return <div>Unsupported widget type</div>;
    }
  };

  return (
    <Card title={widget.title} className={className}>
      {renderWidget()}
    </Card>
  );
};

export default WidgetRenderer;
