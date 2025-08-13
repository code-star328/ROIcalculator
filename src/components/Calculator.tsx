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
  const handleInputChange = (field: keyof ROIData, value: number | string) => {
    setData({ ...data, [field]: field === 'productName' ? value : (parseFloat(value as string) || 0) });
  };

  const formatCurrency = (value: number) => `£${value.toLocaleString()}`;

  const inputFields = [
    // Product Details Section
    {
      key: 'productName' as keyof ROIData,
      label: 'Product Name/Type',
      unit: '',
      description: 'Name or type of your product',
      placeholder: 'Cold-Pressed Juice',
      type: 'text',
      section: 'product',
    },
    {
      key: 'currentProductionVolume' as keyof ROIData,
      label: 'Current Production Volume',
      unit: 'units/day',
      description: 'Daily production volume in units',
      placeholder: '1,000',
      type: 'number',
      section: 'product',
    },
    {
      key: 'currentSellingPrice' as keyof ROIData,
      label: 'Current Selling Price per Unit',
      unit: '£',
      description: 'Selling price per unit',
      placeholder: '4.50',
      type: 'number',
      section: 'product',
    },
    {
      key: 'currentCOGS' as keyof ROIData,
      label: 'Current COGS per Unit',
      unit: '£',
      description: 'Cost of raw materials, packaging, direct labour before HPP',
      placeholder: '2.20',
      type: 'number',
      section: 'product',
    },
    {
      key: 'currentSpoilageRate' as keyof ROIData,
      label: 'Current Spoilage/Waste Percentage',
      unit: '%',
      description: 'Current percentage of production lost to spoilage',
      placeholder: '15',
      type: 'number',
      section: 'product',
    },
    {
      key: 'operatingDaysPerYear' as keyof ROIData,
      label: 'Operating Days per Year',
      unit: 'days',
      description: 'Number of production days per year',
      placeholder: '250',
      type: 'number',
      section: 'product',
    },
    // HPP Scenario Section
    {
      key: 'projectedSpoilageRate' as keyof ROIData,
      label: 'Projected Spoilage/Waste with HPP',
      unit: '%',
      description: 'Expected spoilage percentage after HPP implementation',
      placeholder: '3',
      type: 'number',
      section: 'hpp',
    },
    {
      key: 'hppCostPerUnit' as keyof ROIData,
      label: 'Estimated Cost of HPP per Unit',
      unit: '£',
      description: 'Consider toll processing fees or amortised equipment/operational costs',
      placeholder: '0.35',
      type: 'number',
      section: 'hpp',
    },
    {
      key: 'targetShelfLifeExtension' as keyof ROIData,
      label: 'Target Shelf Life Extension with HPP',
      unit: 'days',
      description: 'Additional shelf life days expected from HPP',
      placeholder: '14',
      type: 'number',
      section: 'hpp',
    },
    // Investment Parameters Section
    {
      key: 'initialInvestment' as keyof ROIData,
      label: 'Initial Investment',
      unit: '£',
      description: 'Total cost of HPP equipment and installation',
      placeholder: '250,000',
      type: 'number',
      section: 'investment',
    },
  ];

  // Group fields by section
  const productFields = inputFields.filter(field => field.section === 'product');
  const hppFields = inputFields.filter(field => field.section === 'hpp');
  const investmentFields = inputFields.filter(field => field.section === 'investment');

  // Calculate key metrics for display
  const annualProductionVolume = data.currentProductionVolume * data.operatingDaysPerYear;
  const currentAnnualWaste = annualProductionVolume * (data.currentSpoilageRate / 100);
  const projectedAnnualWaste = annualProductionVolume * (data.projectedSpoilageRate / 100);
  const wasteReduction = currentAnnualWaste - projectedAnnualWaste;
  const revenueFromWasteReduction = wasteReduction * data.currentSellingPrice;

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
          {/* Product Details Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Current Product Details</h3>
            <p className="text-sm text-gray-600 mb-6">Enter details about your current production and costs</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      value={data[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder={field.placeholder}
                    />
                    {field.unit && (
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">
                        {field.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HPP Scenario Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your HPP Scenario</h3>
            <p className="text-sm text-gray-600 mb-6">Project the impact of HPP on your production</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hppFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      value={data[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder={field.placeholder}
                    />
                    {field.unit && (
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">
                        {field.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Parameters Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Investment Parameters</h3>
            <p className="text-sm text-gray-600 mb-6">HPP equipment and setup costs</p>
            <div className="grid grid-cols-1 gap-6">
              {investmentFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      value={data[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      placeholder={field.placeholder}
                    />
                    {field.unit && (
                      <span className="absolute right-3 top-3 text-gray-500 text-sm">
                        {field.unit}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Key Metrics Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Production</span>
                <span className="font-medium">{annualProductionVolume.toLocaleString()} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Annual Waste</span>
                <span className="font-medium text-red-600">{currentAnnualWaste.toLocaleString()} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Annual Waste</span>
                <span className="font-medium text-orange-600">{projectedAnnualWaste.toLocaleString()} units</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600 font-medium">Units Saved</span>
                <span className="font-semibold text-green-600">{wasteReduction.toLocaleString()} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Revenue from Saved Units</span>
                <span className="font-semibold text-green-600">{formatCurrency(revenueFromWasteReduction)}</span>
              </div>
            </div>
          </div>

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
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h4 className="font-semibold text-blue-800 mb-3">HPP Benefits for Cold-Pressed Juice</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Extended shelf life (14-21+ days typical)</li>
              <li>• Maintains fresh taste and nutrients</li>
              <li>• Reduces spoilage and waste significantly</li>
              <li>• Enables wider distribution reach</li>
              <li>• Premium positioning opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;