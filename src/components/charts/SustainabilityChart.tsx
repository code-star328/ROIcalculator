import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SustainabilityChartProps {
  results: {
    wasteAvoided: number;
    costSavings: number;
    co2Reduction: number;
    wasteAvoidedAnnual: number;
    costSavingsAnnual: number;
    co2ReductionAnnual: number;
  };
}

const SustainabilityChart: React.FC<SustainabilityChartProps> = ({ results }) => {
  const data = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Waste Avoided (tonnes)',
        data: [
          results.wasteAvoidedAnnual,
          results.wasteAvoidedAnnual * 2,
          results.wasteAvoidedAnnual * 3,
          results.wasteAvoidedAnnual * 4,
          results.wasteAvoidedAnnual * 5,
        ],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.1,
      },
      {
        label: 'CO₂ Reduction (tonnes)',
        data: [
          results.co2ReductionAnnual,
          results.co2ReductionAnnual * 2,
          results.co2ReductionAnnual * 3,
          results.co2ReductionAnnual * 4,
          results.co2ReductionAnnual * 5,
        ],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.1,
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
            return value.toFixed(1) + ' tonnes';
          },
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default SustainabilityChart;