import React from 'react';
import { TrendingUp, DollarSign, Leaf, Clock } from 'lucide-react';
import { CalculationResults } from '../App';
import ROIChart from './charts/ROIChart';
import SustainabilityChart from './charts/SustainabilityChart';

interface DashboardProps {
  results: CalculationResults;
}

const Dashboard: React.FC<DashboardProps> = ({ results }) => {
  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;
  const formatNumber = (value: number, decimals = 1) => value.toFixed(decimals);

  const kpiCards = [
    {
      title: 'ROI (5 Years)',
      value: `${formatNumber(results.roi.roi5Year)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: results.roi.roi5Year > 100 ? 'Excellent Return' : 'Good Return',
    },
    {
      title: 'Payback Period',
      value: `${formatNumber(results.roi.paybackPeriod)} years`,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: results.roi.paybackPeriod < 3 ? 'Fast Payback' : 'Standard Payback',
    },
    {
      title: 'Annual Savings',
      value: formatCurrency(results.roi.annualSavings),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+' + formatNumber((results.roi.annualSavings / 50000) * 100) + '% vs baseline',
    },
    {
      title: 'CO₂ Reduced (Annual)',
      value: `${formatNumber(results.sustainability.co2ReductionAnnual)} tonnes`,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: 'Sustainability Impact',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">HPP Investment Dashboard</h1>
        <p className="text-blue-100">
          Comprehensive ROI and sustainability impact analysis for High Pressure Processing technology
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Analysis</h3>
          <ROIChart results={results.roi} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Impact</h3>
          <SustainabilityChart results={results.sustainability} />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Impact</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">5-Year Total Savings</span>
              <span className="font-semibold">{formatCurrency(results.roi.totalSavings5Year)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Annual Net Savings</span>
              <span className="font-semibold">{formatCurrency(results.roi.annualSavings)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Break-even Point</span>
              <span className="font-semibold">{formatNumber(results.roi.breakEvenPoint)} years</span>
            </div>
          </div>
        </div>

        {/* Environmental Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Annual Waste Avoided</span>
              <span className="font-semibold">{formatNumber(results.sustainability.wasteAvoidedAnnual)} tonnes</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Annual Cost Savings</span>
              <span className="font-semibold">{formatCurrency(results.sustainability.costSavingsAnnual)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">CO₂ Reduction/Year</span>
              <span className="font-semibold">{formatNumber(results.sustainability.co2ReductionAnnual)} tonnes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;