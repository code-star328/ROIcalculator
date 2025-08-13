import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import SustainabilityCalculator from './components/SustainabilityCalculator';
import Reports from './components/Reports';

export interface ROIData {
  initialInvestment: number;
  annualSavings: number;
  operationalCosts: number;
  productionVolume: number;
  processingCostReduction: number;
  shelfLifeExtension: number;
  wasteReduction: number;
  // Product Details
  productName: string;
  currentProductionVolume: number;
  currentSellingPrice: number;
  currentCOGS: number;
  currentSpoilageRate: number;
  operatingDaysPerYear: number;
  // HPP Scenario
  projectedSpoilageRate: number;
  hppCostPerUnit: number;
  targetShelfLifeExtension: number;
}

export interface SustainabilityData {
  preHPPWasteRate: number;
  postHPPWasteRate: number;
  productionVolume: number;
  productionPeriod: 'batch' | 'week' | 'month' | 'year';
  wasteDisposalCost: number;
  co2PerTonne: number;
}

export interface CalculationResults {
  roi: {
    paybackPeriod: number;
    roi5Year: number;
    annualSavings: number;
    totalSavings5Year: number;
    breakEvenPoint: number;
  };
  sustainability: {
    wasteAvoided: number;
    costSavings: number;
    co2Reduction: number;
    wasteAvoidedAnnual: number;
    costSavingsAnnual: number;
    co2ReductionAnnual: number;
  };
}

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator' | 'sustainability' | 'reports'>('dashboard');
  const [roiData, setROIData] = useState<ROIData>({
    initialInvestment: 250000,
    annualSavings: 75000,
    operationalCosts: 25000,
    productionVolume: 1000,
    processingCostReduction: 15,
    shelfLifeExtension: 200,
    wasteReduction: 30,
    // Product Details
    productName: 'Cold-Pressed Juice',
    currentProductionVolume: 1000,
    currentSellingPrice: 4.50,
    currentCOGS: 2.20,
    currentSpoilageRate: 15,
    operatingDaysPerYear: 250,
    // HPP Scenario
    projectedSpoilageRate: 3,
    hppCostPerUnit: 0.35,
    targetShelfLifeExtension: 14,
  });
  
  const [sustainabilityData, setSustainabilityData] = useState<SustainabilityData>({
    preHPPWasteRate: 15,
    postHPPWasteRate: 5,
    productionVolume: 1000,
    productionPeriod: 'year',
    wasteDisposalCost: 120,
    co2PerTonne: 1000,
  });

  const calculateResults = (): CalculationResults => {
    // Calculate based on product details
    const annualProductionVolume = roiData.currentProductionVolume * roiData.operatingDaysPerYear;
    const currentAnnualWaste = annualProductionVolume * (roiData.currentSpoilageRate / 100);
    const projectedAnnualWaste = annualProductionVolume * (roiData.projectedSpoilageRate / 100);
    const wasteReduction = currentAnnualWaste - projectedAnnualWaste;
    
    // Revenue from reduced waste (units that would have been wasted can now be sold)
    const revenueFromWasteReduction = wasteReduction * roiData.currentSellingPrice;
    
    // Cost savings from reduced waste disposal and raw materials
    const costSavingsFromWaste = wasteReduction * roiData.currentCOGS;
    
    // Additional HPP processing costs
    const additionalHPPCosts = annualProductionVolume * roiData.hppCostPerUnit;
    
    // Net annual savings
    const netAnnualSavings = revenueFromWasteReduction + costSavingsFromWaste - additionalHPPCosts;
    
    // ROI Calculations
    const paybackPeriod = roiData.initialInvestment / netAnnualSavings;
    const totalSavings5Year = netAnnualSavings * 5;
    const roi5Year = ((totalSavings5Year - roiData.initialInvestment) / roiData.initialInvestment) * 100;
    
    // Sustainability Calculations
    const wasteReductionRate = sustainabilityData.preHPPWasteRate - sustainabilityData.postHPPWasteRate;
    const periodMultiplier = {
      batch: 1,
      week: 52,
      month: 12,
      year: 1
    }[sustainabilityData.productionPeriod];
    
    const wasteAvoided = (sustainabilityData.productionVolume * wasteReductionRate / 100);
    const wasteAvoidedAnnual = wasteAvoided * periodMultiplier;
    const costSavings = wasteAvoided * sustainabilityData.wasteDisposalCost;
    const costSavingsAnnual = costSavings * periodMultiplier;
    const co2Reduction = wasteAvoided * sustainabilityData.co2PerTonne / 1000;
    const co2ReductionAnnual = co2Reduction * periodMultiplier;

    return {
      roi: {
        paybackPeriod,
        roi5Year,
        annualSavings: netAnnualSavings,
        totalSavings5Year,
        breakEvenPoint: paybackPeriod,
      },
      sustainability: {
        wasteAvoided,
        costSavings,
        co2Reduction,
        wasteAvoidedAnnual,
        costSavingsAnnual,
        co2ReductionAnnual,
      },
    };
  };

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard results={results} />
        )}
        
        {activeTab === 'calculator' && (
          <Calculator 
            data={roiData} 
            setData={setROIData} 
            results={results.roi}
          />
        )}
        
        {activeTab === 'sustainability' && (
          <SustainabilityCalculator 
            data={sustainabilityData} 
            setData={setSustainabilityData} 
            results={results.sustainability}
          />
        )}
        
        {activeTab === 'reports' && (
          <Reports 
            roiData={roiData}
            sustainabilityData={sustainabilityData}
            results={results}
          />
        )}
      </main>
    </div>
  );
}

export default App;