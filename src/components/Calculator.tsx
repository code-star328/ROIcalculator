import React from 'react';
import { ROIData } from '../App';
import { Calculator as CalculatorIcon, TrendingUp } from 'lucide-react';

interface CalculatorProps {
  data: ROIData;
  setData: (data: ROIData) => void;
  results: {
    paybackPeriod: number;
    roi5Year: number;
    annualSavings: number;
    totalSavings5Year: number;
    breakEvenPoint: number;
  };
}

const Calculator: React.FC<CalculatorProps> = ({ data, setData, results }) => {
  const handleInputChange = (field: keyof ROIData, value: number) => {
    setData({ ...data, [field]: value });
  };

  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;

  const inputFields = [
    {
      key: 'initialInvestment' as keyof ROIData,
      label: 'Initial Investment',
      unit: '£',
      description: 'Total cost of HPP equipment and installation',
      placeholder: '250,000',
    },
    {
      key: 'annualSavings' as keyof ROIData,
      label: 'Annual Savings',
      unit: '£',
      description: 'Expected annual savings from HPP implementation',
      placeholder: '75,000',
    },
    {
      key: 'operationalCosts' as keyof ROIData,
      label: 'Annual Operational Costs',
      unit: '£',
      description: 'Additional costs for running HPP equipment',
      placeholder: '25,000',
    },
    {
      key: 'productionVolume' as keyof ROIData,
      label: 'Production Volume',
      unit: 'tonnes/year',
      description: 'Annual production volume to be processed',
      placeholder: '1,000',
    },
    {
      key: 'processingCostReduction' as keyof ROIData,
      label: 'Processing Cost Reduction',
      unit: '%',
      description: 'Percentage reduction in processing costs',
      placeholder: '15',
    },
    {
      key: 'shelfLifeExtension' as keyof ROIData,
      label: 'Shelf Life Extension',
      unit: '%',
      description: 'Percentage increase in product shelf life',
      placeholder: '200',
    },
    {
      key: 'wasteReduction' as keyof ROIData,
      label: 'Waste Reduction',
      unit: '%',
      description: 'Percentage reduction in product waste',
      placeholder: '30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center mb-2">
          <CalculatorIcon className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">ROI Calculator</h1>
        </div>
        <p className="text-purple-100">
          Calculate the return on investment for your HPP technology implementation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Investment Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={data[field.key]}
                      onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder={field.placeholder}
                    />
                    <span className="absolute right-3 top-3 text-gray-500 text-sm">
                      {field.unit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Results</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">5-Year ROI</p>
                <p className="text-2xl font-bold text-green-700">
                  {results.roi5Year.toFixed(1)}%
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Payback Period</p>
                <p className="text-2xl font-bold text-blue-700">
                  {results.paybackPeriod.toFixed(1)} years
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Annual Net Savings</span>
                  <span className="font-semibold">{formatCurrency(results.annualSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">5-Year Total Savings</span>
                  <span className="font-semibold">{formatCurrency(results.totalSavings5Year)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Break-even Point</span>
                  <span className="font-semibold">{results.breakEvenPoint.toFixed(1)} years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
            <h4 className="font-semibold text-amber-800 mb-3">Optimization Tips</h4>
            <ul className="text-sm text-amber-700 space-y-2">
              <li>• Higher production volumes improve ROI</li>
              <li>• Focus on products with premium markets</li>
              <li>• Consider energy efficiency improvements</li>
              <li>• Factor in reduced insurance costs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;