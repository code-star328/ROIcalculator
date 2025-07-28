import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ROIChartProps {
  results: {
    paybackPeriod: number;
    roi5Year: number;
    annualSavings: number;
    totalSavings5Year: number;
    breakEvenPoint: number;
  };
}

const ROIChart: React.FC<ROIChartProps> = ({ results }) => {
  const data = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Annual Savings (£)',
        data: [
          results.annualSavings,
          results.annualSavings,
          results.annualSavings,
          results.annualSavings,
          results.annualSavings,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Cumulative Savings (£)',
        data: [
          results.annualSavings,
          results.annualSavings * 2,
          results.annualSavings * 3,
          results.annualSavings * 4,
          results.annualSavings * 5,
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '£' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ROIChart;