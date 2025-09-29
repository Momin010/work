
export enum ChartType {
  Bar = 'bar',
  Pie = 'pie',
  Stat = 'stat',
  Line = 'line',
}

export interface BarChartData {
  name: string;
  [key: string]: number | string;
}

export interface PieChartData {
  name:string;
  value: number;
}

export interface LineChartData {
  name: string;
  [key: string]: number | string;
}

export interface StatWidgetData {
  value: string;
  description: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export interface BaseWidget {
  id: string;
  title: string;
  gridSpan: number; // 1, 2, or 3
}

export interface BarChartWidget extends BaseWidget {
  type: ChartType.Bar;
  data: BarChartData[];
  dataKeys: string[];
}

export interface PieChartWidget extends BaseWidget {
  type: ChartType.Pie;
  data: PieChartData[];
}

export interface LineChartWidget extends BaseWidget {
  type: ChartType.Line;
  data: LineChartData[];
  dataKeys: string[];
}

export interface StatWidget extends BaseWidget {
  type: ChartType.Stat;
  data: StatWidgetData;
}

export type Widget = BarChartWidget | PieChartWidget | StatWidget | LineChartWidget;

export interface DashboardData {
  title: string;
  summary: string;
  widgets: Widget[];
}
