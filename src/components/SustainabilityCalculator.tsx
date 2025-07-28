import React from 'react';
import { SustainabilityData } from '../App';
import { Leaf, Recycle } from 'lucide-react';

interface SustainabilityCalculatorProps {
  data: SustainabilityData;
  setData: (data: SustainabilityData) => void;
  results: {
    wasteAvoided: number;
    costSavings: number;
    co2Reduction: number;
    wasteAvoidedAnnual: number;
    costSavingsAnnual: number;
    co2ReductionAnnual: number;
  };
}

const SustainabilityCalculator: React.FC<SustainabilityCalculatorProps> = ({ data, setData, results }) => {
  const handleInputChange = (field: keyof SustainabilityData, value: number | string) => {
    setData({ ...data, [field]: value });
  };

  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex items-center mb-2">
          <Leaf className="w-8 h-8 mr-3" />
          <h1 className="text-2xl font-bold">Sustainability Impact Calculator</h1>
        </div>
        <p className="text-emerald-100">
          Measure the environmental impact and waste reduction benefits of HPP technology
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sustainability Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pre-HPP Food Waste Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.preHPPWasteRate}
                    onChange={(e) => handleInputChange('preHPPWasteRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="15"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
                </div>
                <p className="text-xs text-gray-500">Waste percentage before HPP implementation</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Post-HPP Food Waste Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.postHPPWasteRate}
                    onChange={(e) => handleInputChange('postHPPWasteRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="5"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
                </div>
                <p className="text-xs text-gray-500">Waste percentage after HPP implementation</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Production Volume
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.productionVolume}
                    onChange={(e) => handleInputChange('productionVolume', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="1000"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">tonnes</span>
                </div>
                <p className="text-xs text-gray-500">Production volume per period</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Production Period
                </label>
                <select
                  value={data.productionPeriod}
                  onChange={(e) => handleInputChange('productionPeriod', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="batch">Per Batch</option>
                  <option value="week">Per Week</option>
                  <option value="month">Per Month</option>
                  <option value="year">Per Year</option>
                </select>
                <p className="text-xs text-gray-500">Time period for production volume</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Waste Disposal Cost
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.wasteDisposalCost}
                    onChange={(e) => handleInputChange('wasteDisposalCost', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="120"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">£/tonne</span>
                </div>
                <p className="text-xs text-gray-500">Cost of waste disposal per tonne</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  CO₂ per Tonne (Optional)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.co2PerTonne}
                    onChange={(e) => handleInputChange('co2PerTonne', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="1000"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">kg CO₂/tonne</span>
                </div>
                <p className="text-xs text-gray-500">CO₂ emissions per tonne of landfill waste</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Recycle className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Impact Results</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-600 font-medium">Annual Waste Avoided</p>
                <p className="text-2xl font-bold text-emerald-700">
                  {results.wasteAvoidedAnnual.toFixed(1)} tonnes
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Annual Cost Savings</p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatCurrency(results.costSavingsAnnual)}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Annual CO₂ Reduction</p>
                <p className="text-2xl font-bold text-green-700">
                  {results.co2ReductionAnnual.toFixed(1)} tonnes
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900">Per Period Impact</h4>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Waste Avoided</span>
                  <span className="font-semibold">{results.wasteAvoided.toFixed(1)} tonnes</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Cost Savings</span>
                  <span className="font-semibold">{formatCurrency(results.costSavings)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">CO₂ Reduction</span>
                  <span className="font-semibold">{results.co2Reduction.toFixed(1)} tonnes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Benefits */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <h4 className="font-semibold text-green-800 mb-3">Environmental Benefits</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• Reduced landfill burden</li>
              <li>• Lower carbon footprint</li>
              <li>• Extended product shelf life</li>
              <li>• Improved food security</li>
              <li>• Enhanced sustainability credentials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityCalculator;